---
title: "Tagging and Metadata That Actually Earn Their Keep"
category: multicloud
tags: ["Azure", "OCI", "Tagging", "FinOps", "Governance"]
date: 2026-04-30
readTime: 12
level: beginner
excerpt: "Names are immutable identifiers; tags are mutable metadata. Most orgs believe their tagging is better than it is. Without enforcement, tagging is fiction. Here is the schema, the enforcement, and the gotchas in both clouds."
---

If naming is the part that gets argued about in workshops, tagging is the part that gets quietly ignored until somebody runs the FinOps report. Then the question becomes "why is so much of our cloud spend unallocated?" and the answer is usually the same: because the unattributed spend sits on resources nobody tagged, with owners who left the company, in subscriptions or compartments that should have been deleted six months ago.

Tagging is the unglamorous backbone of cost allocation, security incident response, and lifecycle management. It is also the discipline that decays fastest. A tag schema designed in a workshop and not enforced through automation has a half-life of about a quarter.

## What tags are for, and what they are not for

Tags answer four questions about a resource:

1. **Who owns it?** (`owner`, `team`)
2. **Who pays for it?** (`cost-center`, `business-unit`)
3. **What is it doing?** (`workload`, `environment`, `application`)
4. **What rules apply to it?** (`data-classification`, `compliance`, `criticality`)

Tags are not for things that belong in the name (the resource type, the cloud, the region — those are *identity*). Tags are not for things that change continuously (CPU usage, last-deploy-time — that is *telemetry*). Tags are also not for secrets, even temporarily. Tags appear in audit logs, billing exports, and third-party tools; treat them as if they were public.

The minimum viable tag set — adopt it before adding anything fancy:

| Tag key | Example value | Why mandatory |
|---|---|---|
| `environment` | `prod`, `dev`, `tst` | Cost grouping, automated cleanup of non-prod, blast-radius marking |
| `cost-center` | `FIN-101` | Chargeback and showback |
| `owner` | `payments-team@example.com` | Who to call at 3 AM |
| `workload` | `payments` | Logical workload grouping across resource types |
| `data-classification` | `public`, `internal`, `confidential`, `restricted` | Determines what security policies apply |

Five tags. That is it for the must-have list. Add more when you have demonstrated you can keep five reliable.

The reason to keep the mandatory list short is that *required* tags become hated tags the moment the team has to fight automation to deploy a resource. Five required tags is sustainable; fifteen is not. Every additional required tag should clear a high bar: does this tag change a decision somewhere in the platform — a policy, a backup rule, a cost report?

## Azure: tags exist, inheritance does not (mostly)

Azure tags are key-value pairs attached to resources, resource groups, and subscriptions. Up to 50 tags per resource. Each value can be up to 256 characters. The keys are case-insensitive on lookup but case-sensitive on storage, which is one of those things that bites you exactly once and then never again because you standardise.

The thing that bites everyone the first time: **tag inheritance is not automatic in Azure**. A tag set on a resource group does not propagate to the resources inside it. You have to enable it. The recommended pattern is Azure Policy with the `inheritTagFromResourceGroup` and `modify` effects:

```json
{
  "if": {
    "allOf": [
      {
        "field": "tags['cost-center']",
        "exists": "false"
      },
      {
        "value": "[resourceGroup().tags['cost-center']]",
        "notEquals": ""
      }
    ]
  },
  "then": {
    "effect": "modify",
    "details": {
      "operations": [
        {
          "operation": "add",
          "field": "tags['cost-center']",
          "value": "[resourceGroup().tags['cost-center']]"
        }
      ]
    }
  }
}
```

This policy says: "if the resource has no `cost-center` tag and the parent resource group has one, copy it down." Apply this at the management group level for every mandatory tag and you stop fighting tag drift on individual resources.

There is one important distinction: Azure resource tags and Cost Management tag inheritance are not the same thing. Azure resources do not automatically inherit tags from subscriptions or resource groups. Cost Management can apply subscription or resource group tags to usage records for reporting, but that does not mean the child resource itself is tagged. For governance automation, policy inheritance still matters.

The Azure Policy effect that actually blocks creation is `deny`:

```json
{
  "if": {
    "allOf": [
      { "field": "type", "equals": "Microsoft.Compute/virtualMachines" },
      { "anyOf": [
          { "field": "tags['cost-center']", "exists": "false" },
          { "field": "tags['owner']", "exists": "false" },
          { "field": "tags['environment']", "exists": "false" }
        ]
      }
    ]
  },
  "then": { "effect": "deny" }
}
```

The pragmatic mix: `modify` for the inheritable tags, `deny` for tags that *must* be specified at creation (because there is no sensible default). Forcing every team to specify `cost-center` at creation works; forcing them to specify `data-classification` may not, because the engineer creating the resource may not know.

Cost Management uses tags to slice billing reports. Crucially, only tags that exist *at the time of usage* count for cost allocation. If you tag a resource on day 30 of a billing period, the first 29 days of usage from that resource are untagged. There is no retroactive re-attribution. This is one of those quirks Microsoft does not advertise, and it is the reason "we'll add tags later" is always more expensive than people think.

## OCI: defined tags, free-form tags, and tag defaults

OCI takes a different shape. There are two tag types:

**Free-form tags** — key-value pairs with no schema. Equivalent to Azure tags. Anyone can write any key, any value. Useful for ad-hoc labelling; weak for governance because there is no schema, no namespace, and no controlled value set.

**Defined tags** — schema-validated tags scoped to a *tag namespace*. You define a namespace (e.g. `Operations`), define tag keys within it (`CostCenter`, `Environment`, `Owner`, `Workload`), and optionally define allowed values for each key. Resources then carry tags like `Operations.CostCenter = "FIN-101"`.

Defined tags are the right answer for governance. They give you:

- A namespace to scope policy against (you can write IAM policies that reference defined tags).
- Allowed-value lists, so `Environment` can only be `prod`, `pre-prod`, `dev`, or `sandbox` — not whatever someone typed.
- A retirement model. You retire a namespace; you do not delete it, because deleting tags would orphan their references.

The other thing OCI gives you that Azure does not: **Tag Defaults**. A tag default at the compartment level says "every resource created in this compartment must have these defined tags, with these values, applied automatically." Combined with the "User-Applied Value" option, it becomes mandatory tagging — the resource cannot be created without the tag, and the user must specify the value.

```hcl
# OCI: define the tag namespace and required tag
resource "oci_identity_tag_namespace" "operations" {
  compartment_id = var.tenancy_ocid
  name           = "Operations"
  description    = "Mandatory operational tags"
}

resource "oci_identity_tag" "cost_center" {
  tag_namespace_id = oci_identity_tag_namespace.operations.id
  name             = "CostCenter"
  description      = "Cost center for chargeback"
  is_cost_tracking = true   # Marks as a formal cost-tracking dimension (limit: 10 per tenancy)
  validator {
    validator_type = "ENUM"
    values         = ["FIN-101", "FIN-102", "ENG-201", "ENG-202"]
  }
}

# Make the tag mandatory for resources created in the workload compartment.
# For user-applied required values, verify the exact Terraform provider syntax
# for your OCI provider version; OCI requires either a default value or a
# user-applied value mode.
resource "oci_identity_tag_default" "cost_center_default" {
  compartment_id    = oci_identity_compartment.workload.id
  tag_definition_id = oci_identity_tag.cost_center.id
  is_required       = true
}
```

The `is_cost_tracking = true` flag marks a defined tag as one of OCI's cost-tracking tags. That matters when you want the tag treated as a formal cost-tracking dimension, but it is not the only way tag data appears in OCI Cost Analysis or Cost and Usage Reports. Oracle exposes defined tag data in cost reporting more broadly; cost-tracking tags are the curated subset you promote for chargeback and showback. Because OCI limits cost-tracking tags to 10 tag key definitions per tenancy, reserve them for the few dimensions that actually drive financial reporting.

## The mapping that confuses everyone

| Concept | Azure | OCI |
|---|---|---|
| Ad-hoc, unstructured | Tags (regular) | Free-form tags |
| Schema-validated | (no native equivalent — use Azure Policy with allowed values) | Defined tags in a namespace |
| Auto-apply at scope | Azure Policy `modify` with inheritance | Tag Defaults at compartment level |
| Mandatory at creation | Azure Policy `deny` | Tag Defaults with `is_required = true` |
| Cost allocation marker | Tag inclusion in Cost Management view | `is_cost_tracking = true` flag |
| Per-resource limit | 50 tags | 10 free-form tags, 64 defined tags, 5 KB total tag data |

The thing Azure does not have: a structured tag namespace with allowed-value validation built in. You can simulate this with Azure Policy and an `in` condition, but it is more brittle than OCI's native model. The thing OCI does not have: a fully clean equivalent of Azure's policy-based tag inheritance from resource groups (because OCI does not have resource groups). The closest equivalent is tag defaults at the compartment level, which is a different mechanism with a similar effect.

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>If you are designing for multicloud, define your tag schema once with allowed values, then implement it twice. On OCI use defined tags with ENUM validators. On Azure use Azure Policy with the <code>in</code> condition matching the same allowed values. The schema lives in a single document; the implementations live in Terraform modules. This is the only way to get a consistent FinOps story across both clouds.</p>
  </div>
</div>

## The 60% problem

Most tagging reviews show the same pattern: organisations believe coverage is high, but the real number is usually much lower once shared services, side-effect resources, old deployments, and ClickOps are included. The gap is concentrated in:

- **Resources created before the tag policy existed.** Backfilling is manual and tedious.
- **Resources created by deployments that bypass the IaC pipeline.** ClickOps, support tickets, "I just needed to test something."
- **Resources that the policy rules forgot.** New resource types appear in the cloud APIs faster than anyone updates the policy. There is a brief window where you can deploy a brand-new service untagged.
- **Side-effect resources.** Disks created by VMs, NICs created by load balancers, public IPs created by VPN gateways. Many of these inherit tags from the parent if the parent has them; many do not. The exceptions are documented but rarely read.

The fix is not "more policies." The fix is two things: continuous reporting and accepting that you will never hit 100%.

A nightly job that runs across both clouds and reports untagged resources, with the report routed to the team that *owns the parent compartment or subscription*, will close most of the gap. Critically, the report has to land in front of someone who can act on it. A weekly email to a shared inbox dies; a daily Slack message to the team channel does not.

```kql
// Azure Resource Graph — find resources missing mandatory tags
Resources
| where isnull(tags['cost-center'])
    or isnull(tags['owner'])
    or isnull(tags['environment'])
| project subscriptionId, resourceGroup, name, type, location, tags
| summarize count() by subscriptionId, type
| order by count_ desc
```

```bash
# OCI — find resources missing a defined tag after querying the estate
oci search resource structured-search \
  --query-text "query all resources" \
  --output json \
  | jq '[.data.items[] | select((."defined-tags".Operations.CostCenter // null) == null)] | length'
```

Exact field casing can vary depending on API vs CLI output; validate the returned JSON shape in your tenancy before turning this into a dashboard query.

Pin these queries to a dashboard. Run them daily. Put the trend on a chart. The chart going up over time is the only signal that matters.

## What does not belong in tags

A few categories that look like they belong in tags and do not:

- **PII or anything that identifies a customer.** Tags are surfaced in too many places.
- **Anything secret.** Tags are not a secrets store.
- **Free-text descriptions.** They drift. Use descriptions on resources where they are supported, or a CMDB.
- **Things that change every deploy.** `last-deployed-by`, `git-commit-sha`. These belong in deployment metadata, not on the resource indefinitely. If you want them, write them to a separate audit store, not as tags.

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Operational Warning</p>
    <p>Tags have been used to store database connection strings, internal hostnames, and in one memorable case, a service account password. Tags are visible in audit logs, ARM exports, OCI Search results, billing exports, and dozens of third-party tools. Anything you put in a tag, assume it leaks. Use Key Vault or OCI Vault Secrets for anything that should not.</p>
  </div>
</div>

## Tagging is not ownership unless someone answers

The `owner` tag is only useful if it routes to someone real. A personal email address decays when people leave. A team mailbox decays when nobody monitors it. The best owner value is a stable group, distribution list, or service catalogue owner that maps to an escalation path.

| Quality | Example |
|---|---|
| Bad | `owner = marek@example.com` |
| Better | `owner = platform-networking@example.com` |
| Best | `owner = payments-team`, resolved through Backstage, CMDB, or your internal platform catalogue |

Review owner values as part of quarterly access reviews. If the address bounces or the distribution list has no active members, the tag is as useful as no tag.

## Multicloud factor

A multicloud tag schema is portable if every key has the same name, the same allowed values, and the same enforcement model on both sides. The schema lives outside both clouds — in your CMDB, your platform docs, or just a YAML file in your platform repo:

```yaml
# tags.yaml — the single source of truth
mandatory:
  - key: environment
    allowed: [dev, tst, stg, prd, sandbox]
  - key: cost-center
    pattern: '^[A-Z]{3}-\d{3}$'
  - key: owner
    pattern: '^[a-z0-9._-]+@example\.com$'
  - key: workload
    pattern: '^[a-z][a-z0-9-]{0,30}$'
  - key: data-classification
    allowed: [public, internal, confidential, restricted]

recommended:
  - key: criticality
    allowed: [tier-1, tier-2, tier-3]
  - key: maintenance-window
    pattern: '^(weekday|weekend)-(morning|evening|overnight)$'
```

This file is the contract. Azure Policy and OCI Tag Defaults are *implementations* of the contract. If the contract changes, both implementations update. If only one implementation updates, you have schema drift, which means cross-cloud cost reports start lying.

The values in the schema are the same across both clouds. `environment = "prd"` means the same thing in Azure as it does in OCI. The team that owns chargeback can write one query against unified billing data and trust the answer. That is the whole point.

## Closing checklist

- Define the mandatory tag set in a single document, version-controlled, outside both clouds.
- Keep the mandatory list at five tags or fewer. Add to it only when each addition changes a decision somewhere.
- On Azure, use Policy with `modify` for inherited tags and `deny` for required ones at creation. Inheritance is not automatic.
- On OCI, use defined tags with allowed-value validators and Tag Defaults at the compartment level. Reserve `is_cost_tracking = true` for the few formal chargeback/showback dimensions you want to promote as cost-tracking tags.
- Run a daily untagged-resource report on both clouds. Route it to the team that owns the scope.
- Treat tags as public data. Never put secrets, PII, or identifying information in them.
- Backfill historical resources where you can. Accept that some untagged spend is unrecoverable; tighten the gates so the gap stops growing.
- Once a year, prune the mandatory list. Every tag that has not been queried, reported on, or driven a decision in the last 12 months is a candidate for retirement.
