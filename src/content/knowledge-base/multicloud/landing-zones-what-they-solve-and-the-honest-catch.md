---
title: "Landing Zones — What They Actually Solve, and the Honest Catch"
category: multicloud
tags: ["Azure", "OCI", "Landing Zones", "Governance", "CAF"]
date: 2026-04-30
readTime: 14
level: intermediate
excerpt: "Landing zones are the most useful concept in modern cloud adoption and the most overengineered. The reference architectures are excellent. The implementations turn into multi-quarter projects that nobody finishes. Here is what to take, what to leave, and what the vendors will not tell you about retrofitting."
references:
  - title: "Azure Landing Zones — CAF"
    url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/"
    description: "Microsoft's definitive reference for the Azure Landing Zones architecture — management group structure, design areas, and the IaC accelerator options using Bicep and Terraform AVM modules."
    domain: "learn.microsoft.com"
  - title: "Azure Landing Zone design areas"
    url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-areas"
    description: "The eight design areas — billing, identity, management group hierarchy, network topology, security, management, governance, and platform automation — that each ALZ deployment must address."
    domain: "learn.microsoft.com"
  - title: "OCI Core Landing Zone — GitHub"
    url: "https://github.com/oracle-quickstart/oci-cis-landingzone-quickstart"
    description: "Oracle's reference implementation for the OCI Core Landing Zone, evolving from the original CIS Landing Zone Quick Start — compartment structure, security services, network patterns, and Terraform source."
    domain: "github.com"
  - title: "Enterprise Azure Policy as Code (EPAC)"
    url: "https://github.com/Azure/enterprise-azure-policy-as-code"
    description: "Microsoft's open-source PowerShell solution for managing Azure Policy at scale via a desired-state Git repository — the recommended approach for policy management in ALZ deployments beyond basic scale."
    domain: "github.com"
---

A landing zone is a pre-built environment that workload teams can deploy into without having to make every architectural decision from scratch. The reference architectures from Microsoft (Azure Landing Zones, formerly Enterprise-Scale) and Oracle (OCI Core Landing Zone, formerly the CIS Landing Zone Quick Start) are genuinely good. They encode years of patterns from real customers. They are also significantly more complex than most organisations need on day one, and that mismatch is where most landing zone projects go wrong.

This article is about taking the right thing from the reference architectures, leaving the parts that do not earn their keep at your scale, and being clear-eyed about the cost of retrofitting versus building right the first time.

## What a landing zone gives you

The honest answer: a landing zone gives you three things that compound over time.

**A consistent governance baseline.** Every workload that lands in the landing zone inherits the same identity model, the same network topology, the same logging and monitoring, the same policy guardrails. This consistency is what makes the platform team's life sustainable. Without it, every new workload becomes a custom configuration project.

**A subscription/compartment vending mechanism.** Workload teams request a new environment through a defined process. The pipeline creates it with the baseline pre-applied. Nobody manually clicks through forty configuration screens; nobody forgets to enable diagnostic settings.

**A clear separation between platform and application concerns.** The landing zone is the platform. The workload deployed inside it is the application. The platform team owns the platform; the workload team owns the application. The boundary is documented and the responsibilities do not blur.

These three together produce a real benefit: workload onboarding goes from weeks to hours. That benefit is real and worth pursuing.

What landing zones do **not** give you, regardless of vendor marketing:

- They do not deploy your workloads. They deploy the environment your workloads land in.
- They do not eliminate the need for architecture decisions. They reduce the number of decisions per workload, which is different.
- They do not make a brownfield estate cleaner. Retrofitting a landing zone over an existing estate is harder than greenfield, every time.
- They do not stay current automatically. The reference architectures evolve; your implementation only evolves if you maintain it.

## The Azure shape

Microsoft's recommended Azure landing zone has a specific structure that has become the de facto standard:

```
Tenant Root MG
├── Platform MG
│   ├── Identity (subscription)
│   ├── Connectivity (subscription)
│   └── Management (subscription)
├── Landing Zones MG
│   ├── Corp MG (subscriptions for connected internal workloads)
│   └── Online MG (subscriptions for internet-facing workloads)
├── Sandboxes MG
│   └── (sandbox subscriptions)
└── Decommissioned MG
    └── (subscriptions staged for deletion)
```

The eight design areas — billing/tenant, identity, MG/subscription organisation, network topology, security, management, governance, platform automation — each map to a set of decisions and a set of policies. The IaC accelerator (Bicep or Terraform, both supported) deploys the management group hierarchy, baseline policies, and the platform subscriptions.

The current recommended deployment path is the **Azure Landing Zones IaC Accelerator** using Bicep or Terraform with Azure Verified Modules. Microsoft still offers the portal accelerator for visual deployment and organisations without IaC capability, but the IaC path is the one to use if the platform will be operated long-term as code. The current AVM platform module is `Azure/avm-ptn-alz/azurerm`; subscription vending is handled through the `Azure/avm-ptn-alz-sub-vending/azure` pattern module.

## The OCI shape

Oracle's equivalent has been through some name changes that are worth tracking. The original "CIS Landing Zone Quick Start Template" was retired in May 2025. Its successor is **OCI Core Landing Zone**, which evolves the same concept. Current OCI Core Landing Zone materials target CIS OCI Foundations Benchmark v3.0, while some older documentation still references v2.0; verify the benchmark version in the release you deploy.

A typical OCI Core Landing Zone shape:

```
Root Compartment (Tenancy)
├── Network compartment       (VCNs, DRGs, gateways)
├── Security compartment      (Vault, Logging, Cloud Guard, scanning)
├── AppDev compartment        (application workloads)
└── Database compartment      (database workloads)
```

Depending on selected configuration, the Core Landing Zone can provision IAM groups and policies for segregation of duties, security services such as Cloud Guard, Flow Logs, Connector Hub, Vault, Vulnerability Scanning, Bastion, and Security Zones, and one or more VCN patterns. Oracle's documentation explicitly describes multiple supported network patterns and notes that no VCNs are provisioned unless selected.

The network topology choice — standalone VCN, three-tier, hub-and-spoke with native OCI Network Firewall, or hub-and-spoke with a third-party NGFW — drives significant downstream complexity. Make it deliberately.

For zero-trust requirements, there is a separate **OCI Zero Trust Landing Zone** (ZTLZ) variant that can add ZPR, Access Governance-related configuration, and optional ZTNA integration patterns, depending on deployment options and realm availability. It supports NIST, CISA, and NCSC zero-trust requirements. Useful if your security posture demands it; overkill if it does not.

## Which approach to take, by organisation size

This is the part the vendor docs are diplomatic about, so here it is plainly.

| Org shape | Azure path | OCI path |
|---|---|---|
| **Small (1–10 subscriptions / compartments)** | Avoid full ALZ unless governance complexity already justifies it. Use AVM modules to build the bits you need (subscription vending, baseline policies). Maybe two MG levels. | OCI Core Landing Zone with minimal configuration. The standard patterns work for many small-to-mid orgs. |
| **Mid-size (10–100 subscriptions / compartments)** | IaC accelerator with AVM modules. Trim the management group hierarchy if it doesn't fit. | OCI Core Landing Zone, customised. Hub-and-spoke if you have multi-VCN requirements. |
| **Enterprise (100+ subscriptions, multiple BUs)** | Full ALZ with EPAC for policy management. Customised MG hierarchy with BU separation. | Full Core Landing Zone, possibly with Operating Entities Landing Zone for multi-stack deployments across BUs. |
| **Regulated / sovereignty-heavy** | ALZ + EPAC + Microsoft Cloud for Sovereignty controls + sovereign region restrictions. | Zero Trust Landing Zone + sovereign realm + Access Governance. |

The trap most mid-size orgs fall into: they read the enterprise reference architecture, build the enterprise version, and discover three quarters in that they have a six-level management group hierarchy with one subscription in each leaf. That is not governance; that is overhead. Right-size for your *current* scale plus 2x headroom, not for the scale described in the reference architecture.

:::tip[Architectural Pro Tip]
Start with the smallest landing zone that meets your *current* needs and one tier of growth. You can always add more management groups, more compartments, more policy initiatives. You can rarely subtract them without a project. The ALZ reference and the OCI Core Landing Zone are *maximalist* by design — they show what is possible, not what is mandatory. Cut what you do not need.
:::

## Greenfield vs brownfield

Both reference architectures assume greenfield. They are designed to deploy into an empty tenancy and produce the canonical structure. They do not deal well with brownfield.

The brownfield scenarios that bite:

**Existing subscriptions outside any management group structure.** Common in Azure when subscriptions were provisioned over years for individual projects. The fix: create the MG hierarchy, move the subscriptions into it. Movement is supported but each move triggers policy re-evaluation and can produce surprises (compliance state changes, DINE deployments triggering on previously-untouched resources). Plan for noise.

**Existing OCI compartments that do not match the recommended hierarchy.** Compartments cannot be moved trivially in OCI. You can move a compartment to a different parent, but resources inside it, IAM policies referencing it by path, and tag namespaces all become questions. Plan for surgery, not refactoring.

**Existing policy assignments that conflict with the new baseline.** If you already have policies in production, the new ALZ baseline may double up or conflict. EPAC handles this well via desired state (if it is not in the EPAC repo, it can be deleted from Azure). Other approaches require manual reconciliation.

**Existing networks that do not match the topology.** This is the biggest one. If you have spoke VNets/VCNs with overlapping CIDRs, addresses that need re-IPing, or hybrid connectivity already established to a hub that does not exist in the new design, the network migration is a multi-quarter project all by itself.

The honest take: **retrofitting a landing zone over a brownfield estate is significantly harder than building greenfield**. If you can avoid it — by using the new landing zone for new workloads and slowly migrating old ones — you should. If you cannot, plan for a multi-quarter program, not a multi-month one.

## Subscription/compartment vending — the part that earns its keep

The single most useful piece of any landing zone is the vending pipeline. This is where the platform team's investment pays back the fastest.

A vending pipeline takes a workload team's request and produces a configured environment. The interface is usually:

- Workload name
- Environment (dev/test/prod)
- Owner contact
- Cost centre
- Network requirements (peer to which hub, what address space)
- Optional: pre-deployed shared services (Key Vault, Log Analytics workspace, etc.)

The pipeline produces:

- A new subscription (Azure) or compartment (OCI), correctly placed in the hierarchy.
- Baseline policies applied via inheritance.
- RBAC/IAM with the right groups assigned.
- Network plumbing — a peered VNet on Azure or attached VCN on OCI.
- Observability hooks — diagnostic settings or audit log routing.
- Tags applied for cost attribution.

The good vending pipelines are boringly predictable. Same input, same output, every time. The bad ones depend on humans remembering to do step seven.

```yaml
# A simple workload request that becomes a vending input
workload:
  name: payments-api
  environment: prod
  owner: payments-team@example.com
  cost_center: FIN-101
  network:
    peer_to: hub-prod-weu
    address_space: 10.50.0.0/22
  pre_deployed:
    - keyvault
    - log_analytics_workspace
  data_classification: confidential
  compliance: pci-dss
```

This is the entire interface a workload team should see. Behind it, the pipeline does the cloud-specific work.

## EPAC and policy management — the next layer

Both clouds let you manage policy as part of the landing zone deployment, but at scale you want policy as code separately from infrastructure as code.

**On Azure**, the pattern is **Enterprise Policy as Code (EPAC)**, an open-source PowerShell-based solution. EPAC manages policy definitions, initiatives, assignments, and exemptions in a Git repository, and uses a desired-state model: if a policy is not in your EPAC repo, it can be deleted from Azure. This is powerful for governance but also dangerous in the wrong hands. Used well, it is the right tool for managing hundreds of policy assignments across a multi-tenant environment. Do not introduce EPAC casually into a brownfield tenant; define deployment root scope and ownership boundaries first.

EPAC integrates with the Azure landing zone reference: the ALZ ships with policies, and you import them into EPAC so EPAC becomes the single source of truth. From that point, the ALZ accelerator should not be deploying policies; EPAC is.

**On OCI**, there is no direct EPAC equivalent because OCI governance is split across IAM policies, compartment quotas, tag defaults, Cloud Guard, Security Zones, and Terraform-managed landing-zone modules. The practical equivalent is Terraform with remote state, clear ownership, and a rule that console changes are not made for resources Terraform manages.

## What to actually deploy on day one

A pragmatic minimum viable landing zone:

1. **One management group hierarchy on Azure** with two or three levels. Identity/connectivity/management subscriptions on Azure, dedicated compartments on OCI. Sandboxes separated.
2. **One hub network** with the right connectivity to on-prem (ExpressRoute / FastConnect) and the firewall positioning that matches your security model.
3. **Baseline policy initiatives** — allowed regions, mandatory tags, deny public storage, require diagnostic settings. Five or six policies, not fifty.
4. **A vending pipeline** that creates new subscriptions/compartments with the baseline applied.
5. **A central observability hub** — Log Analytics workspace on Azure, OCI Logging plus Service Connector Hub.
6. **Documented operating model** — who owns what, where to ask questions, how to escalate.

That is the minimum that earns its keep. Everything else is incremental and can be added when there is a concrete reason.

:::warning[Reality Check]
Enterprise landing zone projects have run for 18+ months without a single workload landing in them. The platform team perfects the management group hierarchy, refines the policy initiatives, debates the network topology. Meanwhile the workloads keep deploying into whatever was already there. The way out: ship a v1 landing zone that has obvious imperfections, get one real workload into it, learn from that experience, iterate. A landing zone with one happy customer is worth more than a perfect landing zone with no customers.
:::

## Multicloud factor

Multicloud landing zones are not "deploy the same landing zone twice." The concepts overlap but the constructs are different enough that you build two distinct landing zones, share what you can at the layer above, and document the asymmetries.

The shared layer:
- One identity plane (Entra ID, Okta, Ping) federated to both clouds.
- One subscription/compartment vending pipeline with cloud-specific backends.
- One workload taxonomy (`<bu>-<workload>-<env>`) used as a tag, name, and policy lookup key on both sides.
- One observability strategy that pulls from both clouds into a single SIEM or analytics platform.
- One CCoE/platform team that owns both implementations.

The cloud-specific layer:
- Azure: ALZ structure, ALZ AVM modules, EPAC for policy.
- OCI: Core Landing Zone, OCI Logging + Service Connector Hub, Terraform-native policy.

The trap to avoid: trying to build a "unified" landing zone deployment tool that abstracts both clouds. The abstraction always leaks, and the leak is exactly where you have to debug. Better to have two clean implementations behind a shared workload-request interface than one unified mess.

## Closing checklist

- Adopt the smallest landing zone shape that meets your current scale plus one tier of growth. Trim the reference architecture; do not bolt on what you do not need.
- Use the IaC accelerator on Azure (AVM modules), OCI Core Landing Zone on OCI. Avoid portal-based deployment for anything you intend to operate at scale.
- The vending pipeline is the part that earns its keep first. Ship a basic version early.
- Do not expect to retrofit cleanly over a brownfield estate. Plan for multi-quarter migration; do not promise multi-month.
- For Azure at scale, separate policy management into EPAC. The ALZ accelerator should not be the source of truth for policy long-term.
- Keep the management group hierarchy shallow. Three or four levels for almost everyone.
- One real workload in your landing zone is worth more than a perfect landing zone with no workloads. Ship.
- For multicloud, build two clean landing zones with a shared workload-request interface above them. Do not try to abstract the clouds into one deployment tool.
