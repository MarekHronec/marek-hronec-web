---
title: "Sandboxes — The Environments You Will Probably Set Up Wrong the First Time"
category: multicloud
tags: ["Azure", "OCI", "Sandbox", "Governance", "Cost Control"]
date: 2026-04-30
readTime: 11
level: beginner
excerpt: "Every cloud needs a place where engineers can break things safely. Most orgs either skip sandboxes entirely (and watch developers experiment in production) or build them so locked-down they are useless. Here is how to build one that actually gets used and does not eat the budget."
---

There is a moment in every cloud adoption where someone asks "where do I try things out?" If the answer is silence, you have a problem. Engineers will experiment somewhere. The question is whether that somewhere is a designated environment with guard rails or a forgotten resource group in production where the experiment lives forever as `vm-test01-pleasedontdelete`.

Sandboxes solve this. They are one of the cheapest governance tools in the cloud catalogue and one of the most consistently underused. Done well, they make engineers faster and the production estate calmer. Done badly, they become either a runaway cost centre or so over-controlled that engineers go around them — which is the worst outcome of all.

## What a sandbox is, and what it is not

A sandbox is an isolated environment where someone can deploy, configure, break, and destroy resources without affecting anything else. The defining properties are isolation, ephemerality, and predictable cost.

It is **not** a development environment. Dev environments host the early lifecycle of real workloads — they need to integrate with shared services, persist data, and survive long enough to mature into staging. Sandboxes do not. A sandbox where the data has to survive is a dev environment with the wrong label.

It is **not** a long-lived environment. The whole point is that you can blow it up on a schedule with no regrets. A sandbox that has been alive for 18 months has stopped being a sandbox.

It is **not** a place to skip security. Audit logging stays on. The identity boundary stays real. The fact that you can deploy whatever you want does not mean the platform team gives up oversight of what was deployed.

The Microsoft Cloud Adoption Framework explicitly calls out sandboxes as part of the recommended landing zone hierarchy — they get their own management group, with policies that *specifically* relax some controls (allow more resource types, more regions) while *tightening* others (network isolation, mandatory budgets, cleanup automation, and stricter cost controls). Oracle's CIS Landing Zone does not have an equivalent first-class concept; you build it yourself with a dedicated compartment under the tenancy root.

## The two failure modes

The same two failure modes appear at almost every organisation. They are mirror images of each other.

**Failure mode 1: no sandbox.** The platform team is too busy. The "we'll set one up later" promise lasts indefinitely. Engineers either accept the wait and stop trying new things, or they shadow-IT something into production. Both outcomes are bad. The first kills innovation; the second creates audit findings and incidents.

**Failure mode 2: sandbox so locked-down it is useless.** The platform team treats the sandbox like production: same approval gates, same network restrictions, same RBAC. Engineers cannot install anything they want, cannot try new services, cannot move fast. The sandbox sits empty while engineers still find workarounds. This is the more common failure in regulated industries.

The pattern that works is somewhere in the middle, and it is not a complicated pattern.

## What a working sandbox looks like

The properties of a sandbox that gets used:

**One per engineer or per small team, not one for everyone.** A shared sandbox is a tragedy of the commons waiting to happen — someone leaves a GPU running, someone else cannot create the resource they need because they hit a quota that was filled by a competing experiment. Personal sandboxes scale better.

**Time-boxed by default.** Resources auto-delete after a fixed window. Two weeks is a reasonable default. The engineer can extend if needed, but they have to actively do it. The forcing function does most of the cleanup work for free.

**Hard resource cap or automated cleanup with teeth.** Not "we'll alert at 80% and trust people." A real resource cap or automated cleanup that triggers when thresholds are hit. The cap is small — a few hundred euros per month per engineer is plenty for most experimentation.

**Network isolated from production.** No VNet peering to the hub on Azure, no DRG attachment on OCI. The sandbox cannot route to or from anything that matters. This is the single most important control because it is what stops "I just need a quick test connection to prod" from happening.

**Permissive resource creation, restrictive networking and identity.** Engineers can deploy almost any service. They cannot create public IPs without explicit allowance, they cannot create their own service principals/users with privileged roles, and they cannot peer to anything outside the sandbox.

**Audit logging on, even though no one looks at it daily.** When something does go wrong, you want the trail. Activity logs to a central Log Analytics workspace on Azure, audit logs to a central object storage bucket on OCI. Cheap insurance.

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>The forcing function that works well in practice is automatic teardown on a schedule. Every Friday at 19:00, a script enumerates resource groups in the sandbox subscription that are older than the configured TTL and deletes them. Engineers learn fast that anything they want to keep needs a tag <code>preserve = true</code>. The exception process is low-friction (set a tag) but explicit, which is exactly what governance should be.</p>
  </div>
</div>

## Azure: the implementation

The Azure pattern is well-trodden because Microsoft documents it as part of CAF. The shape:

```
Tenant Root
├── Platform MG
├── Landing Zones MG
│   ├── Corp MG
│   └── Online MG
└── Sandbox MG          <-- separate management group
    ├── sub-sandbox-alice-001
    ├── sub-sandbox-bob-001
    └── sub-sandbox-team-platform-001
```

Sandboxes get their own management group precisely so the policies that apply to the rest of the estate do not apply here, and a different (sometimes more permissive, sometimes more restrictive) set of policies can attach. Specifically, the policies you almost always want at the sandbox MG level:

- **Deny VNet peering to outside subscriptions** — keep the sandbox network island from connecting to production.
- **Deny ExpressRoute / VPN gateway / Virtual WAN** — same reason; no on-prem connectivity from a sandbox.
- **Deny public IP addresses** unless created through an approved exception path — for example, a required approval tag enforced at creation time.
- **Allowed regions narrowed** to one or two regions that match your data residency posture. Engineers do not need to experiment in 30 regions.
- **Activity log diagnostic settings to central workspace** — `DeployIfNotExists` so it is automatic.

```hcl
# Sandbox subscription vending — Azure Verified Module
# The older Azure/lz-vending/azurerm module has been archived.
# Use Azure/avm-ptn-alz-sub-vending/azure and consult the current
# module documentation for the parameter interface.
module "sandbox_alice" {
  source  = "Azure/avm-ptn-alz-sub-vending/azure"
  version = "~> 0.1"

  # subscription_alias_name, subscription_management_group_id,
  # subscription_tags — see current AVM module interface
}
```

The cleanup mechanism is a separate piece. The pattern that works:

1. A scheduled Azure Function or Logic App runs daily.
2. It enumerates resource groups across all sandbox subscriptions.
3. For each resource group, it checks `tags.preserve` — if `true`, skip.
4. It checks the resource group's age (created date or a TTL tag).
5. If older than the configured TTL and not preserved, the function deletes the resource group.

The "nuclear option" Azure scripts for sandbox cleanup that float around in the Microsoft Q&A archives are the right shape for this — a single PowerShell or Bash run that resets a sandbox subscription to empty. Worth keeping one in your platform repo and trusting it.

## OCI: the implementation

OCI does not have a CAF-equivalent reference architecture for sandboxes specifically, but the pattern transposes cleanly:

```
Root Compartment (Tenancy)
├── Platform-Compartment
├── Workloads-Compartment
│   ├── Production
│   └── NonProduction
└── Sandbox-Compartment       <-- separate compartment subtree
    ├── sandbox-alice
    ├── sandbox-bob
    └── sandbox-team-platform
```

The strongest control here is **compartment quotas**. OCI's compartment quota language is more expressive than Azure's per-subscription limits — you can cap specific resource types, specific shapes, specific regions, all at the compartment level, all declaratively.

Quota family and quota names are service-specific; verify the exact names in the OCI quota reference before turning this into a reusable module.

```hcl
# OCI sandbox quota — caps spend by capping resource consumption
resource "oci_limits_quota" "sandbox_alice_quotas" {
  compartment_id = var.tenancy_ocid
  name           = "sandbox-alice-quotas"
  description    = "Caps for Alice's sandbox compartment"
  statements = [
    "set compute quota standard-e4-core-count to 16 in compartment sandbox-alice",
    "set compute quota gpu-a10-count to 0 in compartment sandbox-alice",
    "zero database quotas in compartment sandbox-alice",
    "set object-storage quota standard-storage-bytes to 500000000000 in compartment sandbox-alice"
  ]
}
```

This is the cleanest hard-cap mechanism either cloud offers. The compartment cannot exceed these limits; the platform team does not have to trust the engineer. Combine it with an OCI Budget for alerting and you have both prevention and visibility.

For network isolation on OCI, the sandbox compartment gets its own VCN that is *not* attached to the DRG. No way to reach the hub. No way to connect to FastConnect. The sandbox is an island by construction.

For automated cleanup, use OCI Resource Scheduler to invoke an OCI Function on a schedule. The function enumerates sandbox compartments, checks TTL and preserve tags, and terminates resources older than the allowed window.

## The hard cap problem nobody likes

Here is the reality both clouds share, and it is uncomfortable: **neither Azure nor OCI has a true cloud-wide spend kill switch**.

Azure has a "spending limit" feature, but it only applies to credit-based subscriptions (Free Trial, Visual Studio benefit, MSDN). For Pay-As-You-Go, EA, MCA — the contracts that real organisations actually use — Azure budgets only generate alerts. They do not stop spend. You have to wire up the alert to Logic Apps, an automation runbook, or a function that takes some action: tag resources for deletion, set quotas to zero, suspend identities. None of this is built in.

OCI Budgets are alerting-only as well. Periodic evaluation, email or notification when thresholds are crossed, no automatic action.

The OCI compartment quota mechanism is the closest thing to a hard cap — it caps *resources*, which caps spend by proxy. Azure has nothing equivalent at the subscription level (only per-subscription quotas that you cannot easily lower below defaults).

The practical answer for sandboxes:

- On Azure: budgets for visibility, plus automation triggered by budget alerts that deletes or deallocates sandbox resources, moves the subscription into a locked-down management group, or applies deny policies that prevent further deployment. This is remediation, not a true spend kill switch.
- On OCI: compartment quotas as the real resource cap, plus budgets for alerting and visibility.

The hard cap vendors do not advertise: **deleting the sandbox resources — or retiring the sandbox subscription or compartment entirely — is the only true zero-spend mechanism**. If a sandbox is genuinely runaway, the recovery action is "tear it down, give the engineer a new one." Plan the workflow for that. It happens occasionally.

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Reality Check</p>
    <p>Cost-control features are often read as hard spend limits, but in enterprise contract types they are usually alerting and governance mechanisms, not a true kill switch. Plan for soft caps with automated remediation, not for a button that stops spend cold.</p>
  </div>
</div>

## What goes in the sandbox vs what does not

A surprising amount of policy work is just deciding what is appropriate for sandbox use. The defaults that hold up:

| Allowed | Not allowed |
|---|---|
| Compute, storage, networking, databases, AI services | Public IPs without explicit tag approval |
| Most regions in your geography | Regions outside data residency boundary |
| All low-cost VM SKUs | GPU instances by default (require quota uplift request) |
| Free-tier and pay-as-you-go services | Reserved instances, savings plans, capacity reservations |
| Most managed services (Cosmos DB, OpenAI, etc.) | Anything that takes weeks to delete (paid Microsoft Fabric capacities, Azure Dedicated Hosts) |
| Test data | Real customer data, real PII, real production secrets |

The "no real data" rule is the one that gets violated most often and matters most. A sandbox is a cheap environment with relaxed controls. Putting customer data there means bringing the controls back, at which point it is no longer a sandbox.

## Multicloud factor

Sandboxes are one of the rare cases where the multicloud version is genuinely simpler than per-cloud sandboxes — because you only need one mental model. The shape:

- One sandbox subscription per engineer on Azure.
- One sandbox compartment per engineer on OCI.
- Same TTL on both sides (two weeks, configurable).
- Same cost cap on both sides (configured via the cloud's mechanism — Azure budget+automation, OCI compartment quota+budget).
- Same isolation rule on both sides (no peering, no on-prem connectivity).
- Same vending pipeline that knows which cloud the engineer wants.

The pipeline can be a single piece of automation that takes "engineer name, cloud, duration" and produces a sandbox in the right cloud. Engineers do not care about the cloud-specific mechanics; they want a place to try things, and they want it now.

## Closing checklist

- One sandbox per engineer or small team, not a shared "sandbox subscription."
- Time-boxed by default. Two-week TTL works for most teams; longer if justified, in a tag.
- Hard resource cap via OCI compartment quotas, or budget-triggered automation that deallocates or destroys sandbox resources on Azure.
- Network isolation is the most important control. No peering, no on-prem connectivity, no exceptions.
- Permissive on resource creation, restrictive on identity, networking, and public exposure.
- Audit logging on, sent to a central workspace or bucket. Cheap insurance.
- Automated cleanup on a schedule. The forcing function is what makes the sandbox actually ephemeral.
- Vending pipeline owns the sandbox creation. Manual creation does not scale and never enforces the controls consistently.
- No real data, ever. If real data is needed, the environment is no longer a sandbox.
