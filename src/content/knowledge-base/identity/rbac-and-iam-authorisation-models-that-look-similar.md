---
title: "RBAC and IAM — Authorisation Models That Look Similar and Are Not"
category: identity
tags: ["Azure", "OCI", "RBAC", "IAM", "Least Privilege"]
date: 2026-04-30
readTime: 13
level: intermediate
excerpt: "Azure RBAC and OCI IAM both grant 'a principal does an action on a resource at a scope.' That sentence hides structural differences: Azure grants through role assignments, OCI through policy statements; both inherit, but not in the same mental model. Azure deny is rare, OCI deny is explicit but opt-in. Built-in roles bite differently. Get the model wrong and least privilege is fiction."
---

You can describe Azure RBAC and OCI IAM in nearly identical sentences. *A principal is granted permission to perform an action on a resource within a defined scope.* Both have a hierarchy. Both have inheritance, in some sense. Both have built-in and custom roles or policies. Read the marketing pages and you would think they are basically the same.

They are not. The model differences are subtle in language and significant in operation. Architects who learn one cloud's authorisation model and assume the other works the same way produce permission structures that look correct and quietly grant more than they should — or quietly grant less than they need, which is its own debugging nightmare.

## The shared mental model, in one sentence

Both clouds define authorisation as: **"who can do what to which resources where."**

- **Who** = a principal (user, group, service principal in Azure; user, group, dynamic group in OCI).
- **What** = an action (a permission, granted by a role on Azure or by a verb in OCI).
- **Which** = a resource type (Microsoft.Storage/storageAccounts on Azure; object-family on OCI).
- **Where** = a scope (management group / subscription / resource group / resource on Azure; tenancy / compartment on OCI).

The four axes are the same. How they assemble is where the clouds diverge.

## Azure RBAC — additive inheritance with privileged carve-outs

Azure RBAC is built into Azure Resource Manager. Every API call is evaluated against the principal's role assignments at every scope from the tenant root down to the resource itself. Roles aggregate. **Permissions inherit downward**: a role assignment at the management group scope applies to every subscription, resource group, and resource below it.

The model is *additive*. If you have Contributor at subscription scope and Reader at resource group scope, your effective permissions on resources in that resource group are the union — Contributor wins because it includes everything Reader has plus more. You cannot subtract by adding a less-permissive role at a lower scope.

There are exceptions, and they are important:

**Deny assignments** exist but are tightly restricted. You cannot directly create your own deny assignments — they are created and managed by Azure, including through mechanisms such as deployment stacks and managed applications. You cannot easily say "Alice is Contributor on the subscription except not on this one resource group" via normal Azure RBAC design.

**ABAC conditions** can attach to some Azure role assignments, but support is concentrated in specific data-plane scenarios — Azure Storage Blob, Data Lake Storage Gen2, and Queues. It is not a universal deny or subtract mechanism across Azure.

Azure has an extensive built-in role catalogue, split into two categories:

- **Job-function roles** — narrow roles for specific tasks (Storage Blob Data Reader, Virtual Machine Contributor, Key Vault Reader). Grant these by default.
- **Privileged administrator roles** — broad roles like Owner, Contributor, User Access Administrator. Microsoft now explicitly recommends limiting these.

The recommended pattern: assign job-function roles, scope them as narrowly as possible, use Microsoft Entra Privileged Identity Management (PIM) for time-bound elevation when broad permissions are genuinely needed.

```hcl
# Azure: scope-aware least-privilege role assignment
resource "azurerm_role_assignment" "payments_team_storage_reader" {
  scope                = azurerm_storage_account.payments.id
  role_definition_name = "Storage Blob Data Reader"
  principal_id         = azuread_group.payments_team.object_id
}

# Time-bound elevation via PIM is configured separately in Entra ID
```

The thing Azure does well: **clear inheritance and a deep built-in role catalogue**.

The thing Azure does badly: **deny is hard**. If you want exception-based authorisation, you have to design around RBAC's additive model rather than fight it. ABAC conditions help where they exist; for services without ABAC support, you scope role assignments tightly and accept that "subtract permission X" is often unavailable.

## OCI IAM — declarative policies and compartment inheritance

OCI IAM looks superficially similar but operates on a fundamentally different model. Permissions are granted via **policy statements** written in a declarative DSL:

```
Allow group <group-name> to <verb> <resource-type> in <compartment-or-tenancy> [where <condition>]
```

For example:

```
Allow group PaymentsTeam to read objects in compartment payments-prod
Allow group NetworkAdmins to manage virtual-network-family in tenancy
Allow group DBAs to use database-family in compartment Database
```

The verbs go from least to most privileged: **inspect** (list), **read** (inspect + get), **use** (read + most operations), **manage** (everything). This vocabulary is built into the platform; you do not invent verbs. OCI also supports `where` clauses for conditional policies, but the available variables depend on the resource type and operation — treat them as service-specific controls, not a universal policy language.

Crucially, **OCI does inherit policies downward through the compartment hierarchy**, but the way you express scope is different from Azure. Policies are attached to a tenancy or compartment, and compartments inherit applicable policies from their parent compartments. A policy that grants access in `CompartmentA` also applies to child compartments below it.

The part that catches Azure architects is not "no inheritance"; it is **path-aware scope**. If you need to target a nested compartment directly, you reference the compartment path, for example `Workloads:Payments`. If you attach broad policies high in the hierarchy, they can flow farther than intended. If you attach narrow policies too low, users may lack access where you expected it.

The classic pattern: write tenancy-root policies that target specific compartments by path.

```
Allow group PaymentsTeam to manage all-resources in compartment Workloads:Payments
```

This grants PaymentsTeam access to the Workloads:Payments compartment and any child compartments below it through inheritance.

OCI also has a powerful **Deny statement** since 2024:

```
deny group ContractorsTeam to manage object-storage-family in compartment payments-prod
```

Deny is explicit and clean. If a deny matches, access is blocked regardless of allows. This is structurally different from Azure where deny is rare and awkward. However, deny policies are not just another allow with a different word: they must be explicitly enabled, enabling them is permanent and cannot be undone, and the default administrator group is exempt from deny policies to prevent tenancy lockout.

One important caveat: deny metaverbs behave differently from allow metaverbs. In allow policies, `manage` includes lower levels such as `use`, `read`, and `inspect`. In deny policies, denying `manage` blocks manage-level operations but may still leave lower-level access if another allow grants it. If the intent is to block all access to a resource type, deny from the lowest relevant verb — often `inspect` — or deny specific permission strings deliberately.

OCI does not have an Azure-style catalogue of built-in resource roles. A tenancy comes with the default Administrators group and policy; additional groups such as network admins, security admins, app admins, DB admins, and auditors are typically created by your landing zone or platform team. You build the permission model from policy statements. The OCI Core Landing Zone provides a starter set with policies written for each functional group, and you customise from there.

```hcl
# OCI: declarative policy via Terraform
resource "oci_identity_policy" "payments_team_access" {
  compartment_id = var.tenancy_ocid
  name           = "payments-team-access"
  description    = "Payments team access to payments compartment"
  statements = [
    "Allow group PaymentsTeam to manage all-resources in compartment Workloads:Payments",
    "Allow group PaymentsTeam to read audit-events in tenancy",
    "deny group PaymentsTeam to manage policies in tenancy"
  ]
}
```

The thing OCI does well: **clean deny semantics, declarative policies, explicit path-aware scope**. The inheritance model is clear once you understand the compartment hierarchy.

The thing OCI does badly: **no built-in role catalogue**. Every organisation has to build its own permission vocabulary. The CIS Landing Zone helps, but you are still defining policies, not picking from a large catalogue of ready-made Azure roles.

## The mapping nobody puts in a slide

| Concept | Azure RBAC | OCI IAM |
|---|---|---|
| Permission grant | Role assignment | Policy statement |
| Resource hierarchy | Management Group → Subscription → Resource Group → Resource | Tenancy → Compartment → Resource |
| Inheritance | Yes, downward through assignment scope | Yes, through compartment policy hierarchy; scope expressed via tenancy / compartment / compartment path |
| Deny | Rare, hard to use, mostly system-managed | First-class statement, clean semantics; must be explicitly enabled, permanent |
| Built-in roles | Extensive service-specific and privileged administrator catalogue | No equivalent catalogue; verbs (inspect/read/use/manage) are predefined |
| Custom roles | Custom Role with explicit Actions/DataActions | Custom policy statements with verbs |
| Conditions | ABAC conditions, supported on some services | Policy `where` clauses, broader support |
| Time-bound | Entra ID PIM | OCI Identity Domains feature, less mature |

The single biggest source of bugs when moving between the two: **assuming the inheritance model behaves the same way**. Azure architects think in role assignments at management group, subscription, resource group, and resource scope. OCI architects think in policy statements attached to tenancy or compartments, with inheritance through the compartment tree and explicit path syntax for nested compartments. The risk is not that OCI lacks inheritance; the risk is writing broad parent-compartment policies that grant more than intended, or writing narrow path-specific policies that do not cover the compartment you thought they covered.

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>Build a permission decision matrix once, in writing, before assigning anything. Rows: roles in your org (developer, DBA, network admin, security analyst, auditor). Columns: actions they need on each resource type. Cells: yes/no/conditional. The matrix becomes the contract. Then implement it as Azure role assignments and OCI policy statements. The matrix is portable; the implementation is cloud-specific. Do not skip the matrix and try to assemble permissions service-by-service — that is the path to over-permissioned identities.</p>
  </div>
</div>

## Privileged identity — the part where carelessness shows up

One of the most common root causes behind serious cloud security incidents is over-permissioned identities. Not zero-day exploits. Not nation-state actors. Standing access that someone forgot to revoke.

**Azure**: Microsoft Entra Privileged Identity Management (PIM) provides just-in-time access — a user is *eligible* for a role but does not have it active. To activate, they request, optionally with MFA and an approval workflow, and the role is granted for a configurable window (1–8 hours typically). After the window, the role drops. Audit trail intact.

PIM works for both Azure resource roles and Entra directory roles. Microsoft also recommends limiting subscription Owner assignments to no more than 3, monitoring privileged role assignments via Defender for Cloud, and avoiding wildcard (`*`) permissions in custom roles.

**OCI**: OCI does not have an Azure PIM equivalent with the same maturity and native integration for OCI resource roles. The pragmatic pattern is to keep privileged groups small, federate identities from the corporate IdP, use approval workflows outside OCI, and automate time-bound policy or group membership changes where justified. Oracle Access Governance and third-party PAM integrations can help at enterprise scale, but this is not the same operating model as Entra PIM for Azure resource roles.

The pattern that survives audit:

- Standing privileged access for nobody. Not even break-glass accounts (those use a separate, monitored, sealed mechanism).
- Time-bound elevation for anything privileged. Window measured in hours, not days.
- Approval workflow for the most privileged actions (subscription Owner, tenancy Administrator).
- Quarterly access reviews. The list of who has what gets reviewed and pruned.

```hcl
# Conceptual only — exact resource/API depends on the provider and Microsoft Graph/AzureRM version.
# Many teams manage PIM eligibility through Microsoft Graph, Azure portal, or dedicated automation.
resource "azurerm_pim_eligible_role_assignment" "subscription_contributor" {
  scope              = azurerm_subscription.payments_prod.id
  role_definition_id = data.azurerm_role_definition.contributor.id
  principal_id       = azuread_group.payments_lead.object_id
  schedule {
    expiration {
      duration_days = 90
    }
  }
}
```

## The custom role / custom policy trap

Both clouds tempt you to write your own custom permissions to fit specific use cases. Both clouds bite back when you do this carelessly.

**Azure custom roles**: defined as JSON with explicit `Actions`, `NotActions`, `DataActions`, `NotDataActions`. The trap: using wildcards (`Microsoft.Storage/*`). Microsoft now explicitly recommends specifying actions explicitly because wildcards capture future actions you have not seen yet and cannot reason about. A custom role written in 2022 with `Microsoft.Storage/*` may grant 2026 actions you would not have approved.

**OCI custom policies**: written as policy statements. The trap: overly broad `manage all-resources` grants. The verb `manage` is the highest tier; `all-resources` covers every resource type. Together they grant anything anyone can do on any resource — equivalent to Azure Owner but cleaner because you can see it in one statement. The fix is to use specific resource families (`compute-family`, `database-family`, `object-family`) instead of `all-resources`.

The discipline that holds up:

- Default to built-in roles (Azure) or templated policy patterns (OCI Core Landing Zone groups).
- Custom roles/policies only when the built-ins genuinely do not fit. Document why each custom one exists.
- No wildcards on actions in Azure custom roles. Enumerate.
- No `manage all-resources` in OCI policies except for compartment admins.
- Annual review of every custom role/policy. Most exist because of one need from three years ago that nobody re-evaluated.

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Operational Warning</p>
    <p>Custom Azure role sprawl is common — estates with 200+ custom roles and no active maintainer. Most of the custom roles existed because someone needed a permission that an old built-in role did not include — but the built-in role catalogue has expanded since, and the custom role is now an unmaintained subset of a current built-in. The cleanup is grim. Do not start down this path without a plan to maintain it. If you cannot promise quarterly review, do not create the custom role.</p>
  </div>
</div>

## Multicloud factor

Federated identity is the cornerstone. The defensive pattern:

- One identity provider outside both clouds (Entra ID, Okta, Ping).
- Both clouds federate to the IdP. Users authenticate once; cloud-side identities are projections.
- Groups in the IdP map to Azure groups (in Entra ID directly) and OCI groups (via Identity Domains federation).
- The same group `PaymentsTeam-Admins` exists conceptually in both clouds, with cloud-specific permissions but a single source of truth for membership.

What does not work multicloud: a single permission language. There is no cross-cloud authorisation tool that abstracts both Azure RBAC and OCI IAM cleanly. The honest model is two implementations sharing a single identity layer. The permission *intent* is documented once (the matrix); the *implementation* is cloud-specific.

## Closing checklist

- Build a permission decision matrix in writing before assigning permissions. Roles × resource types × actions = yes/no.
- Default to built-in roles (Azure) and templated policies (OCI Core Landing Zone). Custom only with justification.
- No wildcards in Azure custom roles. Enumerate actions explicitly.
- No `manage all-resources` in OCI policies except for narrow admin scopes.
- Privileged access is time-bound. Standing Owner / Administrator on production subscriptions and tenancies is a finding waiting to happen.
- Quarterly access reviews. Who has what; remove what is no longer justified.
- One identity provider outside both clouds. Federate everything back to it.
- Document the cloud-specific authorisation model gotchas in your platform docs. Azure RBAC inherits additive role assignments down the resource scope chain; OCI inherits policies through the compartment hierarchy with path-aware scope. Azure deny is rare; OCI deny is explicit, opt-in, and permanent. New team members will hit the same gotchas unless the docs prevent it.
