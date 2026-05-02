---
title: "Tenant, Subscription, Management Group, Compartment — and What Actually Owns the Bill"
category: multicloud
tags: ["Azure", "OCI", "Governance", "Landing Zones", "Billing", "Tenancy"]
date: 2026-04-30
readTime: 13
level: beginner
excerpt: "Most cloud chaos starts with a wrong mental model on day one. Three boundaries — organisational, billing, and governance — collapse or separate in different ways across Azure and OCI. Get this wrong and you spend years undoing it."
---

The cloud has three different kinds of boundary, and almost everyone confuses them. There is the *organisational* boundary, which is "where do my resources live in the org chart." There is the *billing* boundary, which is "who pays for what and how do we attribute it." And there is the *governance* boundary, which is "where do my policies, RBAC, and quotas apply."

In Azure these boundaries are spread across several constructs. In OCI they are collapsed into fewer constructs: the tenancy owns the contract, identity root, billing relationship, and service limits; compartments carry most of the organisational, access-control, quota, and governance structure. This is one of the few places where a side-by-side comparison genuinely matters, because Azure architects walk into OCI and try to recreate the Azure shape, and OCI architects walking into Azure assume there is one obvious unit of organisation when there are three. Both end up with broken landing zones.

## Azure: tenant, management group, subscription, resource group

The Azure hierarchy looks like this:

```
Microsoft Entra Tenant (the identity boundary)
└── Tenant Root Management Group
    └── Management Group (policy/RBAC scope, up to 6 levels deep)
        └── Subscription (billing + quota + security boundary)
            └── Resource Group (lifecycle + RBAC scope)
                └── Resource
```

Each layer does a different job. The **tenant** is the identity boundary — one Entra directory, one set of users. **Management groups** are a tree of policy and RBAC scopes. They aggregate subscriptions for governance but do not bill anything and do not own resources directly. **Subscriptions** are the unit where Azure resources accrue cost, consume quotas, and form a major governance and isolation boundary. The commercial invoice can sit above the subscription in EA or MCA billing structures, but the subscription is still the practical cloud-scale unit. **Resource groups** are lifecycle containers — you delete a resource group, you delete everything in it.

The depth limit is six levels of management groups, not counting the subscription itself. That sounds like a lot. In practice, Microsoft's Cloud Adoption Framework reference architecture uses four to five levels, and most enterprises run out of organisational reasons to subdivide before they run out of levels.

What matters operationally is which of these boundaries actually moves money or breaks workloads. The answer is the **subscription**. Quotas are per-subscription. The 250-storage-account limit, the 5,000-disk-encryption-set limit, the vCPU-per-family-per-region limit — all subscription-scoped. The subscription is also where Microsoft's classic security boundary lives. For governed enterprise estates, do not put production and non-production in the same subscription. Wiring them together for blast-radius, IAM, and quota creates three different kinds of pain at once.

The CAF recommendation, which is right on this point, is *subscription democratization* — many subscriptions, governed via management groups. The platform team carves them out from a pipeline (Microsoft calls this "subscription vending"); workload teams get one or more subscriptions per workload-environment combination, and the management-group hierarchy keeps governance consistent across the lot.

## OCI: tenancy, compartments, and the collapsed model

OCI has fewer constructs and they do more work each:

```
Tenancy (contract, identity root, billing relationship, and service-limit boundary)
└── Root Compartment (= the tenancy itself)
    └── Compartment (RBAC + quota + organisation, up to 6 levels deep)
        └── Resource
```

The **tenancy** is your contract with Oracle. One tenancy, one bill, one set of service limits. There is no equivalent to "many subscriptions in one tenant." If you want a separate billing scope for an acquired company, you need a separate tenancy and OCI Organization Management to link them. That is not the common pattern; the common pattern is one tenancy.

**Compartments** are where the fun starts. A compartment is simultaneously the organisational container, the policy scope, the RBAC scope, and (with compartment quotas) the resource-cap scope. A compartment takes on governance roles that in Azure are spread across management groups, subscriptions, and resource groups — but it is not a billing unit, and it is not a lifecycle container in the way a resource group is. Compartments can nest up to six levels deep, just like Azure's management groups.

This is the place Azure architects break their first OCI design. They look at compartments and think "those are subscriptions." So they make one compartment per workload-environment, hit the policy complexity wall by month three, and end up with a compartment tree that mirrors a subscription estate that did not need to exist. The right OCI mental model is closer to "compartments are heavy-duty resource groups with policy attached" — they are organisational and governance containers, not billing units. The billing unit is the tenancy. Cost attribution comes from tags and from compartment-scoped Cost Analysis, not from compartment isolation.

OCI service limits still exist at the tenancy level; compartment quotas do not create more capacity, they allocate or restrict consumption of the capacity available to the tenancy.

The other thing Azure people miss: **compartments are global**. A compartment exists across every region your tenancy is subscribed to. If you put production in a compartment, that compartment lives in Frankfurt, Ashburn, and Tokyo simultaneously. You do not create a compartment per region. You create one production compartment, and you put resources in it from whichever region you need.

## The mapping table that will save you a project

| Concept | Azure | OCI | Notes |
|---|---|---|---|
| Identity boundary | Entra Tenant | Tenancy (with Identity Domains for IAM) | Both can federate to external IdPs. |
| Practical cost / quota boundary | Subscription | Tenancy service limits + compartment cost visibility | Azure costs and quotas are commonly managed at subscription level; OCI billing sits at tenancy level, with compartment-based cost analysis and quotas. |
| Policy/RBAC tree | Management Groups | Compartments | Both 6 levels deep. |
| Workload container | Subscription + Resource Group | Compartment | OCI collapses two layers into one. |
| Lifecycle container | Resource Group | (no direct equivalent — use compartment + tags) | This is the most missed difference. |
| Quota boundary | Subscription | Tenancy (service limits) + Compartment (declarative quotas) | OCI compartment quotas are more flexible than Azure's per-subscription limits. |

Resource groups are the construct OCI has no exact equivalent for, and it shows. In Azure, a resource group is a practical lifecycle boundary: resources that share a lifecycle can be deployed, updated, and deleted together. You can `az group delete` a resource group and watch every dependent resource go with it — clean teardown of an environment in one command. In OCI, compartments are stronger governance and access-control containers, but they are not a clean teardown primitive. A compartment must be emptied before deletion, so lifecycle cleanup usually belongs in Terraform / Resource Manager, scripts, or resource-specific delete flows. This bites people moving the other direction: OCI architects look at Azure resource groups and either use them as governance scopes (wrong) or ignore them entirely (also wrong).

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>When designing a multicloud landing zone, do not try to map Azure management groups one-to-one onto OCI compartments. A typical Azure ALZ has four to six management group levels. The equivalent OCI design is two to three compartment levels, max. Document the mapping in a single ADR before either side starts deploying.</p>
  </div>
</div>

## How to subdivide — the patterns that hold up

The subdivision question is the same on both clouds even though the mechanism differs: split by what you actually want isolated.

**Always-separate (different blast-radius, different security profile):**

- Identity workloads (Entra Connect, ADFS, Identity Domains) — their own subscription/compartment, their own RBAC.
- Connectivity (hubs, ExpressRoute/FastConnect, firewalls) — central, shared across spokes.
- Management/observability (Log Analytics, OCI Logging) — central, write-heavy, billed visibly.
- Security (Sentinel, Cloud Guard) — separate so security operations do not depend on workload teams.
- Sandboxes — heavily restricted, auto-cleanup, never connected to production.

**Workload-level (one per business-critical workload, per environment):**

- Production
- Pre-production / staging
- Development

**Optional (some orgs want this, many do not):**

- Per-business-unit subscriptions/compartments above the workload level. Useful for chargeback in big enterprises. Pure overhead in smaller ones.

The pattern that always fails: putting everything in one subscription "to keep it simple," then hitting subscription limits or making one mistake that takes everything down at once. A single mis-scoped Azure Policy at the management group level can brick onboarding for a whole BU. The fix can take hours and a Microsoft support escalation. The original "simplification" has a way of costing two years of slow accumulation of policies that, once they all move together, become unmovable.

## Subscription vending, compartment vending, and why you need it

By the time an organisation has more than ten subscriptions or compartments, manual creation has stopped working. People forget to apply the baseline policy. They assign Owner to themselves "for now." They miss the network peering. They put production in the wrong management group. Each individual mistake costs an hour to fix; the aggregate costs quarters.

The fix is automation. The pattern is the same on both clouds:

```hcl
# Azure: subscription vending using the AVM subscription vending pattern module
# Verify the current parameter names against the module version you pin.
module "subscription_vending" {
  source  = "Azure/avm-ptn-alz-sub-vending/azure"
  version = "<pin-current-version>"

  # Example intent:
  # - create or associate subscription
  # - place it under the correct management group
  # - apply tags, RBAC, budgets, resource providers, and optional networking
}
```

```hcl
# OCI: compartment vending pattern
resource "oci_identity_compartment" "workload" {
  compartment_id = var.parent_compartment_ocid
  name           = "payments-prod"
  description    = "Payments production workload"
  defined_tags = {
    "Operations.Workload"    = "payments"
    "Operations.Environment" = "prod"
    "Operations.CostCenter"  = "FIN-101"
    "Operations.Owner"       = "payments-platform@example.com"
  }
}

resource "oci_limits_quota" "workload_compute" {
  compartment_id = var.tenancy_ocid
  name           = "payments-prod-compute-cap"
  description    = "Cap compute usage in payments-prod"
  statements = [
    # Verify the exact service family and quota name in the OCI quota reference
    # before turning this into a reusable module.
    "set compute-core quota standard-e4-core-count to 100 in compartment payments-prod"
  ]
}
```

Both achieve the same intent: a workload team requests a landing zone, the pipeline creates the right container with the right baseline, and nothing depends on a human remembering to do step seven correctly.

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Operational Warning</p>
    <p>The single most expensive Azure governance mistake is "we'll just use one subscription for everything to keep it simple." It works until the day you hit a per-subscription quota — the default 250 standard storage accounts per region, 5,000 disk encryption sets per region, or the vCPU cap on a specific VM family — and the only fix is splitting the estate, which means renaming, redeploying, repointing every dependency, and absorbing the egress cost of cross-subscription data motion. The simplification was always borrowing time from your future self.</p>
  </div>
</div>

## Multicloud factor

The shape that holds up across both clouds:

- **One identity plane outside both clouds.** Entra ID, Okta, Ping, whatever — but not "Entra in Azure, Identity Domains in OCI" as separate islands. Federate both back to the corporate IdP.
- **One workload taxonomy.** `<bu>-<workload>-<env>` works on both sides. The same string appears as a tag, a name component, a cost-attribution key. Define it once, use it everywhere.
- **Shallower compartment trees on OCI than management-group trees on Azure.** Two to three OCI compartment levels typically map to four to six Azure MG levels because OCI compartments are doing more per layer.
- **Vending pipelines on both sides.** Same input form, different backend implementation. The platform team owns the pipeline; the workload team consumes it.

The mistake to avoid: trying to make the two clouds *symmetric*. They are not symmetric. Azure separates identity, billing, governance, and lifecycle into distinct constructs because that is the historical Microsoft model. OCI collapses them because Oracle came at it later and chose simpler primitives. Both work. What does not work is forcing one into the other's shape.

## Closing checklist

- Write down the three boundaries — organisational, billing, governance — for your estate. State which Azure or OCI construct represents each.
- Limit OCI compartment depth to two or three levels by default. Add more only when there is a documented governance reason.
- Use Azure management groups for policy inheritance, not for organisational reporting. Reporting belongs in tags and Resource Graph.
- For governed estates, keep production and non-production in separate Azure subscriptions. Quota collisions and one-policy-blast-radius are the two worst-case scenarios; both become more likely when you share the boundary.
- Vend subscriptions and compartments from a pipeline. Manual creation of either is a deferred outage.
- For multicloud: one shared workload taxonomy, one shared tag schema, one shared identity plane. Different mechanisms below; identical intent above.
