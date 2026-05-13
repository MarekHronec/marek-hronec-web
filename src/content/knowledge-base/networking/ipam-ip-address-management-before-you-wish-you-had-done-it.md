---
title: "IPAM — IP Address Management Before You Wish You Had Done It"
category: networking
tags: ["Azure", "OCI", "Networking", "IPAM", "CIDR"]
date: 2026-04-30
updated: 2026-05-13
readTime: 11
level: intermediate
excerpt: "IP space looks infinite until two VNets try to peer with overlapping ranges. By then the fix is renumbering and weeks of work. IPAM costs nothing on day one."
references:
  - title: "Azure Virtual Network Manager — IPAM"
    url: "https://learn.microsoft.com/en-us/azure/virtual-network-manager/concept-ip-address-management"
    description: "Microsoft's native IPAM capability in Azure VNM — creating IP address pools, allocating non-overlapping CIDRs, and combining pools with Azure Policy to prevent teams from creating VNets outside approved space."
    domain: "learn.microsoft.com"
  - title: "Azure IPAM — open source reference implementation"
    url: "https://github.com/Azure/ipam"
    description: "Microsoft's open-source IPAM reference tool: auto-discovers Azure VNet usage, exposes a REST API and UI, and supports T-shirt size requests — recommended in CAF for organisations that need IPAM beyond what VNM native offers."
    domain: "github.com"
  - title: "NetBox documentation"
    url: "https://netboxlabs.com/docs/netbox/en/stable/"
    description: "The open-source network source of truth platform — the most widely adopted community IPAM for multicloud and on-prem estates, with prefix management, VRF support, and a Terraform provider for IaC integration."
    domain: "netboxlabs.com"
  - title: "RFC 1918 — Address Allocation for Private Internets"
    url: "https://www.rfc-editor.org/rfc/rfc1918"
    description: "The IETF standard defining the 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 private ranges — the capacity ceiling that every enterprise IP plan must allocate within."
    domain: "rfc-editor.org"
---

Every cloud architect has had this conversation: "we need to peer your VNet to mine for the new project." "Sure, what's your CIDR?" "10.0.0.0/16." Long pause. "...so is mine." That moment is the punchline of a joke nobody set up deliberately. The setup happened months earlier when someone picked a CIDR without checking, and the punchline arrives the day a peering is needed.

IPAM — IP Address Management — is the discipline that prevents this. It is one of the most boring and most consistently underinvested platform capabilities in cloud architectures. Done well, it is invisible. Done badly, it becomes the reason a migration takes nine months instead of three. The address plan decides the shape of the estate; IPAM is the operating process that keeps allocations inside that shape.

## The problem at scale

Cloud private network spaces use RFC 1918 ranges:
- 10.0.0.0/8 (about 16 million addresses)
- 172.16.0.0/12 (about 1 million addresses)
- 192.168.0.0/16 (about 65,000 addresses)

Sixteen million addresses sounds like infinite. It is not. Three patterns eat IP space faster than expected:

**Workload sprawl.** A typical landing zone allocates /22 or /20 per workload-environment. Twenty workloads × three environments × /20 = 60 /20 blocks = ~245,000 addresses. Doubled for redundant deployments, growth headroom, and DR sites in another region. Suddenly you are using a sizeable chunk of 10.0.0.0/8 just for one cloud.

**On-prem overlap.** Most enterprises have on-prem networks already using 10.x.x.x ranges. If you peer cloud to on-prem (ExpressRoute, FastConnect, VPN), the cloud and on-prem ranges cannot overlap. The available space shrinks to whatever is *not* used on-prem.

**Multicloud coordination.** Once you have Azure and OCI both connecting to on-prem, both clouds and on-prem must use disjoint ranges. The available space for each cloud shrinks again.

By the time you have an enterprise estate with on-prem, Azure, OCI, M&A networks, and partner connectivity, the available IP space feels suddenly tight. The pattern is consistent: organisations underestimate the IP planning need by 5–10x.

## What gets allocated where

The minimum allocation hierarchy:

```
Corporate global IP plan
├── On-prem (existing ranges, often 10.0.0.0/12)
├── Azure
│   ├── Hub region 1 (e.g., 10.100.0.0/16)
│   ├── Hub region 2 (e.g., 10.101.0.0/16)
│   ├── Spoke pool region 1 (e.g., 10.110.0.0/14 — workload subnets here)
│   └── Spoke pool region 2 (e.g., 10.114.0.0/14)
├── OCI
│   ├── Hub region 1 (e.g., 10.150.0.0/16)
│   └── Spoke pool region 1 (e.g., 10.160.0.0/14)
├── DR / failover
└── Reserved / future
```

The principles:

- **Reserve at the planning-pool level.** A /16 to /14 per major cloud region is a common enterprise planning range, depending on scale, growth, Kubernetes density, DR patterns, and how much RFC1918 space is already consumed on-prem; /13 or larger needs clear justification. OCI VCNs can have multiple non-overlapping IPv4 CIDR blocks, but each VCN CIDR block is limited to the /16–/30 range. A /14 regional pool therefore spans multiple VCN CIDR allocations — it is an allocation concept, not a single VCN CIDR. Re-IPing later is more expensive than allocating headroom now.
- **Document everything.** Every CIDR has an owner, a purpose, an allocation date. The alternative is the "I think this is taken but I'm not sure" conversation, which always ends badly.
- **Avoid overlap with anything.** On-prem, M&A targets, partner networks, future acquisitions you can predict. The hardest overlaps to fix are the ones with parties outside your control.

## Subnet sizing — what actually fits

The math people forget:

- Azure reserves **5 IPs per subnet** (network, gateway, DNS x2, broadcast). A /28 has 16 addresses, 11 usable.
- OCI reserves **3 IPs per subnet**. A /28 has 16 addresses, 13 usable.
- AKS and OKE can consume large numbers of subnet IPs depending on CNI mode. Flat / VCN-native networking allocates pod IPs from VNet/VCN space; overlay models reduce pressure on the cloud subnet but change routing and observability behaviour. A /24 subnet for a flat-CNI cluster of 50 pods is exhausted quickly.

Practical subnet sizes:

| Use | Size | Approx. usable |
|---|---|---|
| Small management subnet | /28 | ~11 |
| Application tier (10–50 instances) | /26 | ~59 |
| Application tier (50–200 instances) | /24 | ~250 |
| AKS/OKE workers (with CNI per-pod IPs) | /22 or larger | ~1000+ |
| Gateway subnet (Azure) | /27 minimum | 27 |
| Database tier | /28 | ~11 |

The mistake to avoid: undersized AKS or OKE node subnets. Once the cluster runs out of pod IPs, the fix is rebuilding with a larger subnet. Plan with three to five years of growth headroom.

## Azure IPAM — what is actually available

Microsoft has shipped multiple IPAM offerings over the years; the current state:

**Azure Virtual Network Manager IPAM** is the native built-in IPAM, generally available in most regions. Lets you create IP address pools and allocate non-overlapping CIDRs from those pools. To prevent teams from creating overlapping VNets outside the approved process, combine IPAM pools with Azure Policy. IPAM allocates clean space; policy enforcement makes teams use it. Supports IPv4 and IPv6. Integrates with the AVNM mesh/connectivity policies.

**Azure IPAM (open source)** is a Microsoft-published reference implementation that runs as an App Service in your tenant. Auto-discovers VNet usage, exposes a REST API and UI, supports T-shirt sized CIDR requests. Documented in CAF as the recommended option for organisations that want IPAM before the AVNM IPAM was widely available.

Both are reasonable. AVNM IPAM is cleaner because it is native; the open-source Azure IPAM has more community adoption and a richer UI. Pick based on what your team will actually use.

```hcl
# Azure VNM IPAM pool — Terraform pattern
resource "azurerm_network_manager_ipam_pool" "primary" {
  name               = "ipam-primary"
  network_manager_id = azurerm_network_manager.main.id
  display_name       = "Primary IPv4 Pool"
  address_prefixes   = ["10.100.0.0/12"]
  description        = "Primary IPv4 allocation pool for all workloads"
}
```

## OCI IPAM — the gap

OCI does not have a first-class IPAM service equivalent to Azure VNM IPAM. The patterns:

- Track CIDR allocations in your IaC repo. Terraform with a shared variables file or a CIDR allocation module.
- Use a third-party IPAM (NetBox is popular) with manual entry, manual review.
- Build a thin IPAM service yourself if your scale demands it (rare).

The Terraform-and-discipline approach works for most organisations. The IaC repo becomes the source of truth for allocations; PRs add new allocations; merges happen only after CIDR overlap checks. The check can be automated (a simple script that compares the new CIDR against all existing allocations).

```hcl
# OCI: a CIDR allocation module that enforces non-overlap
locals {
  allocated_cidrs = {
    "hub-fra"             = "10.150.0.0/16"
    "spoke-payments-prod" = "10.160.0.0/22"
    "spoke-orders-prod"   = "10.160.4.0/22"
    "spoke-payments-dev"  = "10.160.8.0/22"
  }
}

# Use cidrsubnet() and cidrcontains() helpers in CI checks
# to validate new allocations don't overlap with existing
```

The discipline is the same on both clouds; only the tooling differs. For enterprise multicloud, OCI allocations should live in the same authoritative IPAM as Azure and on-prem. Terraform-only discipline works at smaller scale, but a central IPAM becomes important once multiple teams allocate address space independently.

:::tip[Architectural Pro Tip]
Treat the global IP plan as a single document, owned by one team, even if the implementations are per-cloud. The document lives in version control. Every CIDR allocation is a PR. A merge requires CI checks against the existing allocations on both clouds and on-prem (where on-prem ranges are documented). Without one document, the team that has 10.50.0.0/16 in Azure will discover a year later that 10.50.0.0/16 in OCI exists and the two cannot be peered.
:::

## The allocation workflow

IPAM is not just a registry — it needs a workflow. Without one, teams allocate CIDRs ad hoc and the registry becomes an audit trail rather than a control.

A usable allocation process has five steps:

1. The team requests a block, specifying size, environment, region, and cloud.
2. IPAM allocates from the correct regional pool.
3. CI checks the proposed allocation against all known cloud and on-prem ranges.
4. The allocation is approved and recorded with owner, workload, purpose, and review date.
5. Terraform consumes the pre-allocated CIDR; teams do not hand-pick ranges.

Every allocation should carry:

| Field | Purpose |
|---|---|
| CIDR | The allocated block |
| Cloud / region / environment | Where it lives |
| Owner / workload | Accountability |
| Allocation date | Audit trail |
| Review date | Reclamation trigger |
| Routable to on-prem | yes / no |
| Routable to other clouds | yes / no |
| Status | reserved / active / deprecated / released |

The status field is what enables reclamation. Deprecated and released CIDRs can be returned to the pool. Without it, allocated IP space only ever grows.

## Adding address space later — the painful path

Both clouds let you add CIDR to an existing VNet or VCN. Both have caveats.

**Azure**: You can add address space to an existing VNet without an outage. Each existing VNet peering needs a *resync* operation — push a button or run a CLI command. If you have many peerings, this is tedious but not technically hard. The trap: forgotten peerings that are not resynced will not see the new addresses, leading to mysterious connectivity failures.

**OCI**: You can add IPv4 CIDR blocks to a VCN. The new range must not overlap with existing or peered VCN ranges, and any route table and security list updates remain your responsibility.

The structural lesson: adding space later is possible but introduces operational risk. Plan with headroom from the start; that headroom costs you nothing.

## The on-prem coordination problem

The hardest IPAM problems are at the boundary with on-prem. The on-prem network was designed before cloud existed, has its own conventions, owns 10.x.x.x ranges that overlap with what the cloud team would naturally pick. The reconciliation:

- Get a complete inventory of on-prem IP usage. Often this requires going through old documentation, ARP tables, switch configs.
- Identify what is *unused* in the on-prem space. There is almost always a /14 or /16 that nobody is using, sitting in the middle of the on-prem range.
- Allocate cloud space *outside* the on-prem range, ideally in a 10.x.x.x block that is reserved at the corporate level for cloud only.
- Document the boundary explicitly. New on-prem allocations cannot encroach on cloud space; new cloud allocations cannot encroach on on-prem space.

Without this boundary, you will eventually get an overlap that requires renumbering. Renumbering is one of the most painful operations in networking; nobody volunteers for it twice.

## When you genuinely have no choice — NAT

In rare cases (M&A, partner connectivity), you cannot avoid overlapping address space. Both clouds support NAT (Network Address Translation) at gateways:

**Azure**: VPN Gateway and Virtual WAN support NAT for connecting overlapping on-prem sites.
**OCI**: overlapping-CIDR scenarios are typically handled with NAT appliances or firewalls, or carefully designed VPN/DRG patterns. Do not assume DRG attachment alone resolves overlap; overlapping prefixes make routing behaviour complex and should be avoided unless you have a deliberate NAT design.

NAT is a tool of last resort. It complicates routing, breaks some application layer protocols, and is harder to debug. Use it only when renumbering is genuinely impossible.

:::warning[Reality Check]
A multicloud migration stalled for six weeks because the chosen Azure VNet CIDR overlapped with an unused-but-reserved OCI tenancy CIDR that nobody knew about. The fix was renumbering forty subnets, updating dozens of NSGs and routing tables, and a long weekend of carefully orchestrated cutover. The original mistake was a 30-second decision on day one to pick the "obvious" 10.0.0.0/16 without checking. IPAM that costs nothing on day one prevents projects of months on day five hundred.
:::

## Multicloud factor

The principle that runs through this article: one IPAM, one authority. Multicloud does not mean two IP plans. It means one plan with dedicated allocations per cloud and per on-prem — and one system that tracks all of them.

In practice, the right tool is a cloud-agnostic IPAM that models all environments in one place:

- **NetBox** is the most widely adopted open-source option. Supports prefixes, IP ranges, VRFs, and custom fields. API-driven; integrates with Terraform via the NetBox provider.
- **The open-source Azure IPAM** (published by Microsoft) is Azure-native and auto-discovers VNets, but OCI and on-prem ranges require manual entry or scripted sync.
- **Commercial platforms** (Infoblox, Men&Mice, SolarWinds IP Address Manager) offer multicloud support and enterprise integrations at enterprise cost.

For most organisations building a greenfield multicloud estate, NetBox with an IaC-backed allocation workflow is the most practical starting point: free, cloud-agnostic, API-driven, and actively maintained.

The structural discipline: both clouds and on-prem allocate from the central IPAM. The platform team owns it, not the Azure team or the OCI team separately. Azure AVNM pools and OCI's IaC-enforced allocation are the per-cloud enforcement layers; the central IPAM is the authority above both.

## Closing checklist

- One global IP plan, version-controlled, owned by one team.
- Reserve regional planning pools based on scale: /16 to /14 is a common enterprise range; larger pools need clear justification from Kubernetes density, DR requirements, or growth projections.
- Document on-prem ranges before allocating any cloud range.
- Use Azure VNM IPAM with Azure Policy for Azure-native enforcement. For multicloud, run a central cloud-agnostic IPAM (NetBox or equivalent) as the single authority; per-cloud tooling enforces allocation, the central IPAM is the source of truth.
- Subnet sizing accounts for AKS/OKE pod IP consumption. Default to larger than you think you need.
- Adding CIDR later is possible but operationally annoying. Plan with headroom.
- NAT is a last resort, not a strategy.
- For multicloud, the IP plan is the contract. Both clouds and on-prem teams reference one source of truth.
