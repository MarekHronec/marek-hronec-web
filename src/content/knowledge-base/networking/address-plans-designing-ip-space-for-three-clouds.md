---
title: "Address Plans — Designing IP Space for Three Clouds and a Future You Cannot See"
category: networking
tags: ["Azure", "OCI", "Networking", "Address Planning", "CIDR"]
date: 2026-04-30
updated: 2026-05-13
readTime: 15
level: intermediate
excerpt: "IPAM tracks allocations. An address plan decides what to allocate and what to reserve. Most orgs skip the plan and pay for it in months of remediation later."
references:
  - title: "RFC 1918 — Address Allocation for Private Internets"
    url: "https://www.rfc-editor.org/rfc/rfc1918"
    description: "The foundational IETF standard defining the three private IPv4 address ranges used in all enterprise and cloud network design — the starting constraint for every corporate IP envelope."
    domain: "rfc-editor.org"
  - title: "Azure CAF — plan for IP addressing"
    url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/plan-for-ip-addressing"
    description: "Microsoft's Cloud Adoption Framework guidance on IP address planning for Azure: recommended ranges, hub and spoke sizing, service-specific subnet constraints, and non-routable design patterns."
    domain: "learn.microsoft.com"
  - title: "OCI VCN and subnet overview"
    url: "https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingVCNs_topic-Overview_of_VCNs_and_Subnets.htm"
    description: "Oracle's reference for VCN CIDR constraints, subnet types (regional vs AD-specific), reserved IP addresses per subnet, and the multiple-CIDR-block-per-VCN model relevant to address plan design."
    domain: "docs.oracle.com"
  - title: "Azure IPAM — open source reference implementation"
    url: "https://github.com/Azure/ipam"
    description: "Microsoft's open-source IPAM tool for Azure: auto-discovers VNet usage, exposes a REST API and UI, and supports T-shirt size CIDR requests — the recommended starting point before AVNM native IPAM was widely available."
    domain: "github.com"
---

If IPAM is bookkeeping, the address plan is the strategy that bookkeeping is supposed to follow. The plan answers questions like "what range do we use for production in Frankfurt?" and "how much do we reserve for the cloud we have not adopted yet?" These questions sound boring; they shape the next decade of network architecture.

Most organisations have IPAM (in some form) and do not have an address plan (in any form). The result is allocations that work, individually, but do not compose. The hub-and-spoke summary route is impossible because the spokes are scattered across non-contiguous /22s. The DR region needs entirely different addressing because the primary region was allocated without DR in mind. The new cloud cannot get a clean /14 because the IPv4 namespace was filled with /16s in a random order.

The address plan prevents these failures. This article is about what one looks like and how to build it.

## What goes in a plan

Six things, in order:

**1. The corporate envelope.** What ranges does the entire enterprise use, including on-prem, all clouds, M&A networks, partner networks? Often this is a curated subset of 10.0.0.0/8 with explicit carve-outs.

**2. Per-cloud allocation.** Which slice of the corporate envelope is reserved for each cloud, with explicit headroom for growth.

**3. Per-region allocation within each cloud.** Each region gets a contiguous block. Contiguity matters for route summarisation later.

**4. Per-tier within each region.** Hubs, spoke pools, sandboxes, DR — each gets a known place.

**5. Per-environment within spoke pools.** Production, non-production, sandbox.

**6. Reserved ranges.** Future regions, future clouds, future M&A. This is the part most plans skip and most plans wish they had.

A worked example for a mid-size enterprise:

```
Corporate envelope: 10.0.0.0/8 (RFC 1918)

On-prem (legacy): 10.0.0.0/12 (10.0–10.15)
  - Existing branches, datacenters, lab networks

Azure: 10.100.0.0/14 (10.100–10.103)
  - Region 1 (West Europe):    10.100.0.0/16
    - Hub:                      10.100.0.0/22
    - Spoke prod pool:          10.100.16.0/20
    - Spoke non-prod pool:      10.100.32.0/20
    - Sandbox pool:             10.100.48.0/22
    - Reserved future:          10.100.64.0/18
  - Region 2 (North Europe):   10.101.0.0/16
    (same shape as Region 1)
  - Reserved future Azure regions: 10.102.0.0/15

OCI: 10.150.0.0/14 (10.150–10.153)
  - Region 1 (Frankfurt):      10.150.0.0/16
    (same shape as Azure regions)
  - Reserved future OCI:       10.152.0.0/15

DR / cross-cloud failover: 10.200.0.0/16

Reserved (M&A, future cloud, future regions): 10.250.0.0/15
```

The pattern: every region in every cloud has the same internal shape. Predictable. New regions slot into reserved space without redesign. M&A and future-cloud needs are explicitly out of the way.

## The contiguity argument

Why does contiguity matter? **Route summarisation.**

If your spoke pool in West Europe is 10.100.16.0/20, the on-prem firewall can advertise a single route — 10.100.16.0/20 → Azure ExpressRoute — and reach every spoke. If the spokes are 10.100.16.0/22, 10.100.20.0/22, 10.100.40.0/22, 10.100.55.0/22, scattered across the /16, the firewall needs four separate routes. Multiply this across regions, clouds, and tiers and the routing table becomes unmanageable.

Route summarisation is not a hypothetical concern. ExpressRoute, FastConnect, and most enterprise routers have route limits. Hitting them is a real production-affecting event.

The address plan that supports summarisation:

- Per-region blocks are contiguous (10.100.0.0/16, 10.101.0.0/16, no gaps).
- Per-tier within a region is contiguous (spoke prod is one /20, not four /22s).
- New allocations come *from* the contiguous pool, not interleaved with existing allocations.

The discipline: when allocating a new spoke, take the next contiguous /22 from the spoke pool. Do not assign to a leftover slot in the middle of the range. Leftovers happen — they are usable for future small allocations, but not for the current one.

## T-shirt sizing — the request interface

The interface that workload teams should see is not "what /22 do you want?" It is "what size do you need?"

A standard T-shirt size table:

| Size | CIDR | Usable IPs | Use case |
|---|---|---|---|
| XS | /26 | ~59 | Tiny workload, side project |
| S | /24 | ~250 | Small workload, single tier |
| M | /22 | ~1000 | Standard workload, multi-tier |
| L | /20 | ~4000 | Large workload, many environments |
| XL | /18 | ~16000 | Very large workload, multiple subnets, AKS at scale |

The team requests M for their payments service; the platform team allocates the next available /22. The team does not need to understand /22 vs /20; they request a T-shirt size that matches their needs, and the IPAM allocates from the contiguous pool.

This is the interface Microsoft's CAF guidance recommends, and it works. Workload teams stop debating CIDR sizes and start describing actual needs.

## Service-specific subnet constraints

Before committing to T-shirt sizes for hub VNets and VCNs, the platform team must account for service-specific subnet requirements. These are non-negotiable: miss them and either the initial deployment fails or you face a renumber within months.

**Azure fixed-size requirements:**

- **Azure Firewall subnet (`AzureFirewallSubnet`)**: must be /26 minimum (64 IPs). Deployments expecting zone-redundant scaling benefit from /25.
- **Gateway Subnet (`GatewaySubnet`)**: Microsoft recommends /27 minimum for VPN and ExpressRoute gateways. /29 is the absolute minimum but leaves no room for co-located resources or dual-gateway deployments.
- **Azure Bastion subnet (`AzureBastionSubnet`)**: /26 is a hard platform requirement, not a recommendation.
- **AKS with Azure CNI**: pods receive IPs directly from the VNet subnet. A node pool with 30 nodes and a 30-pod maximum consumes 900 IPs — a /22 (1,022 usable) fills quickly with a single medium cluster. Azure CNI Overlay and Cilium-based networking decouple pod IPs from VNet address space and deserve evaluation before sizing. With traditional CNI, overestimate generously.
- **Azure reserved IPs per subnet**: Azure reserves 5 IPs in every subnet (network address, default gateway, two Azure DNS IPs, broadcast). A /29 subnet has only 3 usable addresses.

**OCI constraints:**

- **OCI reserved IPs per subnet**: 2 IPs reserved (network address and broadcast equivalent). Less than Azure's 5, but still relevant in small subnets.
- **OCI load balancer subnets**: public and private load balancers each need a dedicated subnet; Oracle recommends /24 per load balancer subnet in production environments for scalability.
- **OCI private endpoints**: each private endpoint for a managed service (Autonomous Database, Object Storage, etc.) consumes a private IP from the subnet. High-density environments consume /24s faster than expected.

The practical consequence: a hub VNet carrying an Azure Firewall, VPN Gateway, Bastion, and load balancer consumes most of a /23 before a single workload VM exists. Allocate hub address space with service-specific constraints as the input, not the T-shirt table.

## Private Link and service networking

Azure Private Endpoints and OCI Private Access Gateways change the east-west IP calculus in ways worth planning around.

When a PaaS service (storage account, database, service bus) is accessed via a private endpoint, traffic stays on the VNet fabric and the public endpoint is removed from the routing picture. This has two address planning implications:

**It reduces cross-cloud IP pressure.** If an Azure application accesses an OCI Autonomous Database via Oracle Private Access Channel plus a private endpoint, neither VNet nor VCN needs to route to the other cloud's service IP range. The private endpoint consumes a single IP from the local VNet. For multicloud designs where east-west routable address space is already constrained, this is a meaningful lever.

**It creates a new class of IP consumers.** A mid-size PaaS estate — 15 databases, 8 storage accounts, several service bus namespaces — can consume 25–30 IPs in private endpoint subnets. Plan a dedicated /24 or /23 per hub region for private endpoints if you expect more than a handful of managed services.

Private Link is not a substitute for an address plan. But it is a design lever worth including in the plan early, both to document where private endpoint IPs come from and to reduce the need for routable east-west space between clouds.

## The reservation discipline

The reservation discipline is the part most plans skip. The headroom for things you do not yet know.

What to reserve:

- **30–50% of the corporate envelope** for things not yet decided. Large enterprises commonly land in this range based on growth models, acquisition likelihood, and cloud expansion scenarios. Conservative organisations plan at 30%; those expecting M&A or multi-cloud expansion should target 50% or more. This is a heuristic, not a rule — model your own trajectory.
- **At least one /16 per cloud** beyond current regions. New regions launch; you will use them.
- **A /16 for each future cloud you might adopt.** AWS, GCP, even if you have no current plans. Adoption happens.
- **A /14 or /15 for M&A.** When the company you acquire shows up with their own 10.x.x.x ranges that overlap, having pre-reserved space to renumber into is the difference between a manageable migration and a renumbering nightmare.

The objection is always: "but we won't use this for years, why reserve now?" The answer is that allocating later, after the IPv4 space has been carved up, requires re-doing the carve-up. The technical cost of reserving space in a planning document is near zero. The governance cost depends on your organisational structure — in a CCoE or centralised network authority model, reserving large blocks is straightforward. In a federated model where business units own address space, reserving large blocks triggers negotiation about who can use what. Factor the governance cost into the decision, but lean toward reserving. The cost of re-shaping an existing allocation is months of effort.

One distinction worth making explicit: the reservation discipline applies to *planning blocks* — the regional containers in your plan. Large planning blocks (a /16 per region) are correct. Individual workload VNets and OCI VCNs should be right-sized to what the workload needs, not allocated as large blocks by default. A production payments VNet probably needs a /22; allocating a /16 "just in case" wastes space and creates fragmentation. Reserve aggressively at the plan level; allocate tightly at the workload level.

:::tip[Architectural Pro Tip]
Reserve aggressively at the corporate level. Allocate conservatively at the workload level. The corporate envelope should look mostly empty for years; the workload allocations should be tight. The opposite — corporate envelope looks tight, workloads have huge allocations — is the failure mode that produces fragmentation and forces renumbering down the line.
:::

## NAT and address overlap mitigation

No address plan survives contact with M&A or partner integrations entirely clean. When two organisations connect, address space collisions are common — both sides often use 10.x.x.x, frequently overlapping.

Two platform-level NAT capabilities exist for exactly this scenario:

**Azure VPN Gateway NAT rules.** Azure VPN Gateway supports static NAT rules that translate addresses on ingress and egress. If the acquired company uses 10.100.0.0/16 and your Azure VNet is also 10.100.0.0/16, NAT rules at the VPN Gateway allow both networks to coexist with translated address spaces while the renumbering program runs. This is a bridge pattern — the intent is to maintain connectivity during migration, not to operate overlapping spaces indefinitely.

**OCI DRG static NAT.** The OCI Dynamic Routing Gateway supports equivalent static NAT for VCN attachments. If two compartments or connected networks have overlapping CIDRs, NAT at the DRG provides coexistence. Same capability, same temporal limitation.

**The M&A coexistence sequence:**

1. Connect the acquired network via VPN or ExpressRoute/FastConnect with NAT translation at the gateway.
2. Map overlapping ranges into pre-reserved M&A address space (the /14 or /15 you reserved for this purpose).
3. Migrate workloads from the old range to the new range over time.
4. Remove NAT rules once migration is complete.

Organisations that have pre-reserved M&A address space can execute step 2 in days. Organisations that have not reserved the space discover the problem when they try to connect — resulting in either a rushed renumber under pressure or a permanent NAT-at-the-boundary that everyone eventually forgets is there.

:::warning[Reality Check]
NAT-at-the-boundary is a crutch, not an architecture. It hides address overlap rather than resolving it. The longer it stays in place, the more operational complexity accumulates around it — firewall rules, DNS overrides, monitoring exclusions. Treat every NAT-for-overlap deployment as a time-bounded remediation with a committed sunset date. Without that commitment, it will still be running five years later.
:::

## IPv6 — dual-stack readiness

Both Azure and OCI support IPv6 dual-stack in VNets/VCNs. Adoption in enterprise internal networking remains predominantly IPv4, but the expectation landscape is changing faster than most address plans reflect.

**Where dual-stack matters now:**

- Internet-facing services increasingly encounter IPv6 connections. The US federal government IPv6 mandate (internal networks required to be IPv6-capable) has created real compliance pressure in that ecosystem, and it influences how commercial vendors and integrators build.
- Microsoft 365, Google Workspace, and major CDN providers have native IPv6 support. Applications proxying through these services already handle IPv6 at the edge even when the internal stack is IPv4-only.
- Container orchestration — AKS and OCI Container Engine for Kubernetes — benefits from dual-stack as pod count grows, reducing pressure on private IPv4 ranges.

**The practical position for new services:**

Design new internet-facing services as dual-stack-capable from the start. This is not a migration program; it is a design choice made at the VNet/VCN and subnet level that avoids retrofit costs when IPv6 becomes operationally necessary. Azure supports dual-stack VNets with IPv4 and IPv6 CIDRs assigned simultaneously; OCI supports the same model. The additional configuration cost at creation time is low.

For internal-only services, IPv4 remains the practical default. The pressure to change will increase over the next few years, particularly for environments where mobile client connectivity, partner networks, or containerisation introduce IPv6-only sources.

The address plan should designate IPv6 CIDR prefixes alongside the IPv4 plan — even where not immediately deployed. Both Azure and OCI assign IPv6 ranges from provider-managed space; the organisation does not own the IPv6 prefix the way it owns RFC 1918 space. This difference in ownership model is worth documenting so the team that inherits the plan understands the distinction.

## Governance ownership

The address plan requires a named owner and a clear escalation path for allocation requests. This sounds obvious; in practice, it is the part that breaks.

**Platform team (single-cloud or small multi-cloud estates).** Works well for organisations with a single cloud team managing all platform infrastructure. The team allocates VNets/VCNs from the plan; the plan lives in the platform team's Git repository. Fast decisions, clear authority.

**CCoE — Cloud Centre of Excellence.** The CCoE owns the plan and the allocation policy. Individual cloud teams request allocations from the CCoE. The CCoE maintains the master document. Slower than the single-team model but appropriate where multiple cloud teams operate semi-independently. For most organisations building a multicloud estate from scratch, the CCoE model is the right default.

**Network Architecture Authority / Network Governance Board.** Appropriate for large enterprises with a pre-existing network architecture function, often part of the CISO or CTO organisation. The address plan is a formal architecture document, versioned and signed off. Allocations flow through a lightweight change request. This model works well when the cloud estate coexists with a large on-prem network that the same team manages.

**Federated model (delegated per business unit).** Each BU owns a slice of the corporate envelope and manages allocations within it. Coordination happens at the boundary — the BU must not use ranges outside its allocated slice. This model scales but produces islands and makes cross-BU connectivity harder to govern. Use it only when the organisation genuinely cannot centralise network authority.

Regardless of model, the plan document should capture who owns each allocation, when it was allocated, and what it is used for. This is the minimum metadata for a plan that remains useful as the team that wrote it turns over.

## Enterprise IPAM — one authority, multiple clouds

An address plan document without an IPAM platform enforcing it is a policy without controls. The plan says one thing; allocations drift another way. Choosing the right IPAM model is as important as writing the plan.

**The two-layer model:**

**Authoritative layer — enterprise IPAM.** One platform owns allocation authority across all clouds and on-prem. Common choices: Infoblox, BlueCat Networks, NetBox Labs (open-source NetBox or its commercial successor), or a CMDB-backed solution for smaller estates. All allocation requests flow through this system. No VNet, VCN, or subnet is provisioned without a record here.

**Operational layer — cloud-native tooling.** Azure VNet Manager, OCI Network Visualizer, and equivalent native tools are excellent for operational visibility, automation, and local troubleshooting within each provider. They are not the allocation authority. They consume records from the enterprise IPAM and reflect them — they do not drive them.

The failure mode of separating IPAM by cloud is the same failure mode the article warns against for separate address plans: Azure uses one source, OCI uses another, on-prem uses a spreadsheet. Allocations drift. Naming conventions diverge. Duplicate ranges appear. The plan still says the right things; the operational reality has split. One plan requires one allocation authority.

**When per-cloud IPAM is acceptable:**

- Highly decentralised business units with genuine regulatory or ownership separation.
- Acquired companies in transition, before integration.
- Temporary coexistence during mergers.

In these cases, federation — each domain IPAM syncing to a central record — is better than isolation. The central record remains authoritative; the per-domain instances are delegates. Isolation is not a model; it is a temporary state en route to federation.

## Multicloud factor

A multicloud address plan is the same plan, with explicit per-cloud sections. The principles are identical; the implementation diverges only at the cloud-specific allocation level.

The shared layer:
- Corporate envelope, on-prem boundary, M&A reservations.
- Per-cloud allocations, including reservations for future clouds.
- The T-shirt size catalogue.
- The governance ownership model and escalation path.
- The enterprise IPAM as the single allocation authority.

The per-cloud layer:
- Region allocations within each cloud.
- Tier allocations within each region.
- Cloud-native operational tooling per provider (visibility, automation, local troubleshooting — not allocation authority).
- Service-specific subnet constraints per cloud.

The trap: building two address plans, one per cloud, that drift. Inevitably, six months in, the two plans use overlapping ranges because nobody coordinated. The single-document model prevents this — but only if the IPAM enforcing it is also singular.

## Closing checklist

- One version-controlled enterprise address strategy with clear ownership and governance authority — the accountable role matters; the team label (platform team, CCoE, network architecture function) depends on organisational scale.
- Maintain a centralised IPAM as the allocation authority across on-prem and all clouds. Use cloud-native tooling for operational visibility and automation within each provider; it is subordinate to the central record, not independent of it.
- Reserve substantial headroom in the corporate envelope — commonly 30–50%, but calibrated to projected growth, M&A likelihood, and multi-cloud expansion plans. This is a planning heuristic, not a fixed rule.
- Distinguish planning blocks from deployed workloads: reserve generously at the regional container level; allocate tightly for individual workload VNets/VCNs.
- Per-cloud allocations are contiguous. Per-region allocations within each cloud are contiguous. Per-tier allocations within each region are contiguous. This is the structural discipline that makes route summarisation and future scaling possible.
- Provide a standardised, business-friendly request model — T-shirt sizing or equivalent — to abstract CIDR selection from workload teams.
- Account for managed services, gateways, and container platforms in subnet sizing: Azure Firewall /26, GatewaySubnet /27, Bastion /26, AKS CNI pod-IP consumption; OCI load balancer and private endpoint subnets.
- Define an overlap mitigation approach before you need it. Pre-reserve M&A address space. NAT (Azure VPN Gateway, OCI DRG) buys time during overlap — treat it as a time-bounded bridge, not a permanent design.
- Evaluate Private Link / Private Endpoints early — they reduce east-west routable address pressure and create a new class of IP consumers to plan for.
- Document the on-prem boundary explicitly. Both sides respect it; define ownership, routing expectations, and overlap rules.
- Include IPv6 readiness in the strategy. Design new internet-facing services as dual-stack-capable from the start; designate IPv6 prefixes in the plan even where deployment is deferred.
- Multicloud requires one enterprise-wide strategy with provider-specific implementation patterns and centralised allocation governance — one plan that does not drift.
- Name who owns the plan and the escalation path for allocation requests before you need them under pressure.
