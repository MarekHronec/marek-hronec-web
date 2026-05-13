---
title: "Policy as Code and Quotas — Where Governance Stops Being a Wiki Page"
category: security
tags: ["Azure", "OCI", "Policy as Code", "Governance", "Compliance"]
date: 2026-04-30
updated: 2026-05-13
readTime: 13
level: intermediate
excerpt: "Governance as a wiki page is fiction. Governance is what the platform enforces. EPAC, Security Zones, quotas, Cloud Guard — the gaps and how to combine them."
references:
  - title: "Enterprise Azure Policy as Code (EPAC)"
    url: "https://github.com/Azure/enterprise-azure-policy-as-code"
    description: "Microsoft's open-source solution for managing Azure Policy at scale via a desired-state Git repository — the tool this article recommends for Azure estates above basic scale, with built-in pipelines for Azure DevOps and GitHub Actions."
    domain: "github.com"
  - title: "Azure Policy overview"
    url: "https://learn.microsoft.com/en-us/azure/governance/policy/overview"
    description: "Microsoft's reference for Azure Policy — effects (deny, audit, modify, DINE), built-in definitions, initiative assignments, compliance evaluation, and remediation tasks."
    domain: "learn.microsoft.com"
  - title: "OCI Security Zones"
    url: "https://docs.oracle.com/en-us/iaas/Content/SecurityZones/Concepts/securityzones.htm"
    description: "Oracle's documentation for Security Zones — compartments governed by prescriptive security recipes that prevent insecure configurations — the OCI enforcement mechanism most equivalent to Azure Policy deny effects."
    domain: "docs.oracle.com"
  - title: "Open Policy Agent (OPA) documentation"
    url: "https://www.openpolicyagent.org/docs/latest/"
    description: "The CNCF policy-as-code engine — a general-purpose, vendor-neutral policy framework used for admission control in Kubernetes and for validating Terraform plans before deployment via Conftest."
    domain: "openpolicyagent.org"
  - title: "Conftest — policy testing for configuration files"
    url: "https://www.conftest.dev/"
    description: "The OPA-based tool for writing and evaluating policies against Terraform plans, Kubernetes manifests, and other structured configuration — the pre-deployment policy validation layer that complements cloud-native enforcement."
    domain: "conftest.dev"
---

A policy that lives only on a wiki page is not a policy. It is a hope. The first time a workload team accidentally deploys a public storage account, the wiki page does nothing. The platform either prevented the deployment or it did not.

This is the core distinction in cloud governance: **enforced controls versus documented controls**. Both matter. Documented controls communicate intent and let humans understand the rules. Enforced controls actually stop bad things happening. A mature governance model has both. An immature one has only documentation, and reality outpaces the docs within months.

## The two enforcement engines

Azure and OCI both support enforceable governance, but the enforcement model is very different. Confusing the two is a common source of governance gaps.

**Azure Policy** is a separate, fully-featured policy engine layered on top of Azure Resource Manager. It evaluates resource creation and existing state against rules and produces compliance results. It can deny, audit, modify, deploy, or remediate. It is mature, extensively documented, and has hundreds of built-in policy definitions plus the ability to write custom ones in JSON.

**OCI's policy surface** is split across multiple mechanisms:

- **IAM policies** — *who* can do *what*. Authorisation, not configuration policy.
- **Compartment quotas** — declarative caps on resource counts and types per compartment.
- **Tag defaults** — mandatory tags applied at compartment scope.
- **Cloud Guard configurations** — security findings against best-practice baselines, with auto-remediation options.
- **Security Zones** — compartments with locked-in security policies (cannot disable encryption, cannot create public buckets, etc.).

There is no single "OCI Policy" feature equivalent to Azure Policy. You assemble governance from these primitives. This is structurally simpler in some ways (each piece does one thing well) and more fragmented in others (you have to think about which mechanism applies to which control).

## Azure Policy — what it actually does

The four core effects:

| Effect | What happens |
|---|---|
| **Deny** | Block resource creation or update if the rule does not match |
| **Audit** | Log non-compliance but allow the action |
| **DeployIfNotExists (DINE)** | Deploy a required configuration after the resource create/update succeeds and a configurable delay elapses; existing non-compliant resources require an explicit remediation task |
| **Modify** | Change a property (add a tag, change a SKU) at creation or update |

The flow on a deployment: Azure Policy creates a list of applicable policy assignments for the request and evaluates effects in a defined order. `append` and `modify` run before `deny`; `deny` runs before `audit`; `auditIfNotExists` and `deployIfNotExists` evaluate after the resource provider returns success. Because `modify` runs before `deny`, it can change request properties before the deny check evaluates. If any deny rule matches, the deployment fails. Compliance state is reported back into Azure Policy's compliance dashboard.

Built-in policies cover most common controls — allowed regions, required tags, deny public storage, require diagnostic settings, enforce Defender for Cloud plans. The CIS, NIST 800-53, ISO 27001, PCI DSS, FedRAMP regulatory initiatives bundle hundreds of built-ins into a single assignment.

Custom policies are JSON. They can reference resource properties, tags, related resources, and use logical operators. The expressiveness is high enough that almost anything you want to enforce can be written; the trade is that the JSON gets gnarly.

```json
// Custom policy: deny VM creation without a 'cost-center' tag
{
  "if": {
    "allOf": [
      { "field": "type", "equals": "Microsoft.Compute/virtualMachines" },
      { "field": "tags['cost-center']", "exists": "false" }
    ]
  },
  "then": { "effect": "deny" }
}
```

The thing Azure Policy does well: **broad, mature, well-documented**. The thing it does less well: **managing it at scale becomes its own discipline**. By the time you have hundreds of policy definitions, dozens of initiatives, and assignments at multiple scopes, you need a tool to manage the policies themselves.

## EPAC — managing Azure policy at scale

Microsoft's own answer to this is **Enterprise Azure Policy as Code (EPAC)**, an open-source PowerShell-based solution. Microsoft publishes it on GitHub and references it in the Cloud Adoption Framework as the recommended approach for advanced policy management.

What EPAC adds:

- **Source-controlled policy definitions, initiatives, assignments, and exemptions** in a Git repository.
- **Desired-state model**: if a policy is in the repo, it is in Azure; if it is not in the repo, it can be deleted from Azure. The repo is the single source of truth.
- **Multi-tenant and multi-environment support**: deploy the same policies to dev / test / prod environments with environment-specific parameters.
- **Pipelines for Azure DevOps and GitHub Actions** out of the box.
- **Brownfield support**: import existing policies from Azure into the repo and start managing them as code.

At scale, EPAC should become the source of truth for Azure Policy rather than leaving policy deployment embedded in the ALZ accelerator. Once EPAC is in place, the ALZ accelerator should not be deploying policy; EPAC is. This is documented explicitly in CAF.

Trade-offs of EPAC:

- It is **PowerShell + JSON**, not Terraform or Bicep. If your team is HCL-only, the learning curve is real. There is no Terraform-native Azure Policy management pattern with the same community-standard status as EPAC.
- Desired-state is powerful and dangerous. A misconfigured EPAC repo deploy can delete every policy in production. Backup and review processes matter.
- For very small Azure estates (one or two subscriptions), EPAC is overkill. Use Defender for Cloud's built-in policy assignments or basic Azure Policy directly.

```yaml
# EPAC environment definition (simplified)
pacEnvironments:
  - pacSelector: prod
    cloud: AzureCloud
    tenantId: 11111111-2222-3333-4444-555555555555
    deploymentRootScope: /providers/Microsoft.Management/managementGroups/mg-tenant-root
    desiredState:
      strategy: full   # full = manage everything, ownedOnly = only manage policies tagged as EPAC-managed
```

## OCI's parallel mechanisms

OCI governance is not one policy engine. It is a set of enforcement and detection primitives that overlap:

- IAM policies decide who can call which APIs.
- Compartment quotas cap resource consumption.
- Tag defaults apply required governance metadata at creation time.
- Security Zones enforce prescriptive security-zone recipes on selected compartments.
- Cloud Guard detects and can respond to misconfigurations and risky activity.

The design job is mapping each control to the right primitive. Trying to force every control into IAM or quotas produces gaps.

**Compartment quotas** are the closest equivalent to Azure Policy's deny effect for resource consumption:

```hcl
resource "oci_limits_quota" "workload_caps" {
  compartment_id = var.tenancy_ocid
  name           = "payments-prod-caps"
  description    = "Resource caps for payments-prod"
  statements = [
    "set compute-core quota standard-e4-core-count to 200 in compartment payments-prod",
    "set object-storage quota storage-bytes to 5000000000000 in compartment payments-prod",
    # Add GPU quota statements only after verifying the exact quota name for the target shape.
  ]
}
```

Quota names are service-family-specific; verify exact quota names in the OCI quota reference before using these patterns in reusable modules. The quota syntax is declarative. `Set` declares a positive cap, `Zero` blocks the resource entirely, `Unset` reverts to default. Quotas are evaluated at resource creation and prevent deployment if exceeded. This is an Azure Policy `deny` for resource counts but more declarative.

**Tag defaults** enforce mandatory tagging at compartment level. Combined with `is_required = true`, they force the tag to be specified at creation, not just present. Tag defaults apply at resource creation time; they are not a retroactive cleanup mechanism. This is Azure's "deny if tag missing" pattern, but built into the platform without writing a policy:

```hcl
# Conceptual pattern — verify exact provider syntax for your OCI provider version
resource "oci_identity_tag_default" "cost_center_required" {
  compartment_id    = oci_identity_compartment.workload.id
  tag_definition_id = oci_identity_tag.cost_center.id
  is_required       = true
  # Configure as a user-applied required tag: the creator must supply the value at resource creation.
  # Omit 'value' or set it per your OCI provider version's required-tag documentation.
}
```

**Security Zones** are stronger than ordinary compartment governance. A compartment assigned to a Security Zone is governed by a security-zone recipe. Oracle's Maximum Security Recipe is curated and cannot be modified; custom recipes let you choose policies that match your requirements. Security Zone recipes can enforce prescriptive controls such as restricting public exposure, requiring stronger encryption patterns, and preventing insecure resource movement, depending on the recipe. This is appropriate for production-critical or regulated compartments, but scope it deliberately — Security Zones change what configurations are allowed in that compartment.

**Cloud Guard** is the runtime detection layer — finds drift, misconfigurations, suspicious activity. Comparable to Microsoft Defender for Cloud's posture management. Configure detectors, configure responder recipes for auto-remediation.

The OCI Core Landing Zone wires these together: tag defaults for governance metadata, compartment quotas for spend control, Security Zones for production-critical compartments, Cloud Guard for runtime detection. The whole thing is Terraform-defined.

## Where each cloud's gaps show up

This is the part the marketing pages elide.

**Azure Policy gaps:**

- **Policy evaluation can lag.** A new resource may exist for several minutes before the compliance state updates. For audit policies this matters less; for things you intend to remediate, plan for the delay.
- **DINE remediation is not retroactive without explicit action.** Existing non-compliant resources are not automatically remediated by a new DINE policy. You have to trigger a remediation task explicitly.
- **Custom policies in JSON are powerful but verbose.** Complex logic gets unreadable fast. EPAC helps with management but not with the underlying expressiveness limits.
- **Cross-resource conditions are limited.** "Deny VM unless its NIC is in a specific subnet" is doable but awkward. The policy language is not a general programming language.

**OCI mechanism gaps:**

- **No single Azure Policy-style compliance dashboard across all governance primitives.** Cloud Guard gives security posture visibility, but quotas, tag defaults, Security Zones, and IAM policy conformance still need to be synthesised separately.
- **Compartment quotas are coarse.** They cap counts, not configurations. You cannot use a quota to say "VMs must have specific tags" — that is a tag default. You cannot use a quota to say "buckets must not be public" — that is a Security Zone or a Cloud Guard responder.
- **Cloud Guard responders are powerful but require careful tuning.** Auto-remediation that fires too aggressively can disrupt workloads.
- **Security Zone scope is a design decision.** The Maximum Security Recipe is intentionally strict, and moving away from a Security Zone model is an operational change, not a quick exception. Custom recipes give more flexibility, but changing scope mid-deployment requires planning.

## A pragmatic governance starter set

The minimum viable governance enforcement, on either cloud:

| Control | Azure mechanism | OCI mechanism |
|---|---|---|
| Allowed regions | Azure Policy `allowedLocations` | IAM conditions using `request.region`; build into IAM policy design from the start |
| Mandatory tags at creation | Azure Policy `deny` if tag missing | Tag defaults with `is_required = true` |
| No public storage | Azure Policy `deny` on public access flag | Security Zone, or Cloud Guard responder |
| Diagnostic/log routing | Azure Policy DINE for diagnostic settings | Terraform/landing-zone configuration for Logging + Service Connector Hub |
| Resource type allowlist | Azure Policy `allowedResourceTypes` | Compartment quota `Zero` for unwanted families |
| Spend cap (soft) | Azure Budget + Action Group | OCI Budget + notification |
| Spend cap (hard, by resource limit) | Subscription quota requests (limited) | Compartment quota statements |
| Mandatory encryption | Azure Policy on resource property | Security Zone policy |

OCI region restrictions via IAM conditions are authorization controls, not an Azure Policy-style resource-location compliance policy. They restrict which regional API requests are authorised. Build them into IAM policy design from the start rather than treating them as a later compliance overlay.

This list — call it ten controls — covers most of the regulatory baseline that organisations need. CIS, ISO 27001, NIST 800-53 will all want more, but most of "more" is variations on the same patterns.

:::tip[Architectural Pro Tip]
Default to **audit before deny**. When introducing a new policy, assign it as audit-only first. Watch the compliance state for a sprint or two. Discover the workloads that are non-compliant for legitimate reasons (legacy estates, exceptions you forgot about). Communicate, plan, then flip to deny. Deploying deny-from-day-one regularly breaks production deployments and costs the platform team trust they cannot easily rebuild.
:::

## When to use IaC for policies vs the dedicated tools

A common architectural debate: do you put policies in Terraform alongside the rest of the infrastructure, or in EPAC (Azure) / a dedicated repo (OCI)?

**Putting policies in Terraform alongside infrastructure** is fine for small estates. The Terraform module that creates the subscription/compartment can also assign baseline policies. State is unified. There is no second tool.

**Separating policies into EPAC (Azure) or a dedicated Terraform repo (OCI)** is the right move once:

- You have more than ~30 policies / initiatives.
- The policy lifecycle (who creates, who reviews, who approves) is different from the infrastructure lifecycle.
- You have multiple environments and need consistent policy across them.
- Audit / compliance teams need to see policies as a separate artefact from infrastructure.

A practical boundary: under 50 subscriptions / compartments and a single platform team, policies in Terraform work well. Above that, separate them. The cost of separation is a second tool to maintain. The benefit is a clean audit story and the ability to evolve governance without re-applying infrastructure.

## Drift, exemptions, and the messy real world

Two realities every governance program hits:

**Drift.** Resources that were compliant yesterday are not today. Someone manually changed a setting. A new service version added a property. The policy was updated and the existing resource no longer matches. Drift detection is essential — daily compliance reports, anomaly detection, and where appropriate, auto-remediation.

**Exemptions.** Real workloads sometimes need to break the rules for legitimate reasons. A legacy application that cannot use private endpoints. A test environment that needs a specific region not in the allowed list. The mature governance model has a clear exemption process: written justification, approval, time-bounded, reviewed annually.

Azure Policy supports exemptions natively (a separate resource that exempts a scope from a specific policy assignment, with category, expiration, and reason metadata). EPAC manages exemptions in the same repo as the policies. This is the right pattern.

OCI's mechanisms are less unified. A compartment quota can be raised; a tag default can be removed; a Security Zone violation can be suppressed in Cloud Guard. There is no single "exemption" surface. You document exemptions in the IaC repo (a comment in Terraform, a JIRA reference) and trust the review process.

:::warning[Reality Check]
Policies should not be used to do what RBAC/IAM is for. The Azure governance pattern that goes wrong most often is "deny user X from doing thing Y" via Azure Policy when it should have been "do not grant user X the role for Y" via RBAC. Policy is for "nobody and nothing should do this in this scope." RBAC is for "this principal is allowed / not allowed to do this." Conflating them produces brittle governance and confusing audit trails.
:::

## Multicloud factor

A multicloud governance posture means: same intent, two implementations, one audit story.

The shared layer (lives outside both clouds, in your platform docs / repo):

- The list of controls (allowed regions, mandatory tags, no public storage, etc.).
- The list of exemptions and their justifications.
- The compliance reporting frequency and the team that reviews it.

The cloud-specific layer:

- Azure: Azure Policy via EPAC, with built-in regulatory initiatives (CIS, NIST, ISO) where they fit.
- OCI: Tag defaults + compartment quotas + Security Zones + Cloud Guard, all via Terraform.

The audit story rolls up by mapping cloud-specific compliance reports back to the shared control list. You will not have a single dashboard; you will have two dashboards and a synthesis. That is fine and probably unavoidable.

## Closing checklist

- Treat governance as enforcement, not documentation. Documents support enforcement; they do not replace it.
- Use Azure Policy with EPAC for Azure at scale. For small Azure estates (<30 subscriptions), Azure Policy directly via Terraform works.
- For OCI, assemble governance from compartment quotas, tag defaults, Security Zones, and Cloud Guard. There is no single feature equivalent to Azure Policy.
- Default to audit before deny. Roll out new policies in audit mode, observe compliance state for a sprint, then flip to deny.
- Keep custom policies and custom exceptions minimal. Built-ins cover most common cases and stay maintained without you.
- Have an explicit exemption process. Time-bounded, reviewed annually, documented inline with the policy itself.
- Treat policy and IAM as separate concerns. Policy = "nobody should do this in this scope." IAM = "this principal can / cannot do this." Conflating them is brittle.
- For multicloud, one shared control list, two cloud-specific implementations, one synthesised audit story. Do not try to abstract policy across clouds; the leak always shows up where it matters most.
