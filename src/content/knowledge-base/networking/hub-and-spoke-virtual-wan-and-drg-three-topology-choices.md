---
title: "Hub-and-Spoke, Virtual WAN, and DRG — Three Topology Choices, Two Clouds, One Conversation"
category: networking
tags: ["Azure", "OCI", "Networking", "Hub-Spoke", "Virtual WAN"]
date: 2026-04-30
readTime: 13
level: intermediate
excerpt: "Hub-and-spoke is the default. Azure Virtual WAN is the managed alternative. OCI's DRG v2 is the OCI-native equivalent. They solve overlapping problems differently, with different trade-offs the marketing pages do not put side by side."
---

Pick a network topology too early and you live with it. Pick it too late and you have already built three workloads on the wrong foundation. Both clouds offer broadly similar topology choices, but the implementation details and pricing models diverge enough to change the recommendation.

This article is about the three patterns — classic hub-and-spoke, Azure Virtual WAN, OCI Dynamic Routing Gateway v2 — what each is for, where each falls down, and how to make the choice without locking yourself into a topology you will regret.

## The three topologies

**Classic hub-and-spoke** — A central hub VNet/VCN hosts shared services (firewalls, gateways, DNS, monitoring). Spoke VNets/VCNs peer to the hub. All cross-spoke traffic transits the hub. This remains the de facto enterprise pattern and the default recommendation in many landing zone designs, including the OCI Core Landing Zone.

**Azure Virtual WAN (vWAN)** — Microsoft-managed hub infrastructure. You create a vWAN resource and deploy virtual hubs in each region; Microsoft manages the routing fabric, transit between hubs, and connectivity options. Less operational overhead, more managed-service cost.

**OCI Dynamic Routing Gateway v2** — A regional virtual router that connects multiple VCNs in a hub-and-spoke fashion *without* requiring a central hub VCN. Each VCN attaches to the DRG; the DRG handles routing between them. Closer to vWAN's "managed routing fabric" model than to classic hub-and-spoke, but still customer-managed at the policy level.

These are not directly equivalent — vWAN is a Microsoft-managed transit hub, DRG v2 is an OCI customer-managed transit element — but they solve overlapping problems.

## Classic hub-and-spoke — what it is

The hub VNet (or VCN) holds:

- A firewall (Azure Firewall, third-party NVA, OCI Network Firewall, or third-party).
- A VPN gateway for site-to-site VPN to on-prem.
- An ExpressRoute / FastConnect gateway for private dedicated connectivity.
- Optionally Bastion / OS Management Hub / management subnets.
- Optionally a DNS resolver.

Spokes peer to the hub. Each peering allows the spoke to reach hub services and, with allowGatewayTransit configured, reach on-prem via the hub's gateways.

The model that works:

```
                    On-prem
                       |
                  ExpressRoute
                       |
                --------+--------
                |   Hub VNet    |
                |  ----------  |
                |  |Firewall|  |
                |  | VPN GW |  |
                |  |  ER GW |  |
                |  ----------  |
                ----+------+--+--
                   |      |  |
        -----------     |  -----------
        |                |            |
   ----------       ----------   ----------
   |Spoke 1 |       |Spoke 2 |   |Spoke 3 |
   |(prod)  |       |(prod)  |   |(non-prod)|
   ----------       ----------   ----------
```

The pros:

- Maximum control. You choose the firewall, the gateway tier, the routing rules.
- Cost predictable. You pay for what you deploy; no platform "managed hub" fee.
- Well-documented patterns. This is what every CAF document, every OCI Core Landing Zone variant, every cloud architect course teaches.

The cons:

- Transit between spokes requires explicit configuration. By default, peerings are non-transitive — Spoke 1 cannot reach Spoke 2 just because both peer to the hub. You configure user-defined routes (UDRs) on Azure or route tables on OCI to force the traffic through the hub firewall.
- Multi-region requires hub-to-hub peering and careful route management. Easy to get wrong; asymmetric routing is a common bug.
- Operations on the hub matter. A misconfiguration on the hub firewall affects every workload.

## Azure Virtual WAN — what it adds

Virtual WAN replaces the customer-managed hub VNet with a Microsoft-managed virtual hub. You still have spokes (your VNets), but the hub is now a service:

- Each virtual hub is in a region. Microsoft manages the routing fabric, the gateways, the high-availability aspects.
- You deploy the gateways inside the virtual hub: VPN gateway, ExpressRoute gateway, optionally Azure Firewall (deployed as part of the virtual hub).
- Hub-to-hub connectivity is automatic. If you have virtual hubs in West Europe and East US, vWAN automatically establishes connectivity between them.
- Spokes connect to a virtual hub via VNet connections (a special form of peering).

The pros:

- Less operational overhead. Microsoft manages the routing engine.
- Multi-region transit is built-in. Hub-to-hub routing happens automatically.
- Branch connectivity (SD-WAN) integration is first-class. If you have hundreds of branch sites connecting via SD-WAN, vWAN scales for this.
- Any-to-any spoke connectivity is built into the managed routing fabric, removing the need for custom UDR patterns for most scenarios.

The cons:

- Cost. The virtual hub has a per-hour platform cost on top of the gateways and traffic charges. For a single region with a few VNets, vWAN is more expensive than self-managed hub-and-spoke.
- Less customisation. You cannot place arbitrary VMs in the virtual hub; the hub is for routing, not for hosting workloads.
- Some features are vWAN-specific and cannot be replicated in classic hub-and-spoke easily (and vice versa).

The CAF guidance: vWAN for organisations with global footprint, branch connectivity at scale, or multi-region managed transit needs. Classic hub-and-spoke for everyone else.

## OCI DRG v2 — the OCI-native pattern

OCI's evolution. The Dynamic Routing Gateway v2 (introduced in 2021) supports multiple VCN attachments per DRG, transit routing between attached VCNs, and integrates with FastConnect for private connectivity.

The shape:

- One DRG per region.
- VCNs attach to the DRG (each attachment is a separate object with its own route policy).
- The DRG routes between attached VCNs based on its route tables.
- FastConnect circuits attach to the DRG.
- Site-to-Site VPN attaches to the DRG.
- DRGs in different regions can be remote-peered for cross-region transit.

```
                    On-prem
                       |
                  FastConnect
                       |
                  ------+-----
                  |   DRG    |
                  ---+--+--+--
                    |  |  |  |
            --------  |  |  --------
            |         |  |         |
       ------------  ------------  ------------
       |  VCN 1   |  |  VCN 2   |  | Hub VCN  |
       |(payments)|  | (orders) |  |(firewall)|
       |   prod   |  |   prod   |  |   ...    |
       ------------  ------------  ------------
```

Note: in OCI, you can choose to put the firewall in a dedicated "hub VCN" attached to the DRG, with route policies forcing inter-VCN traffic through it. This produces something between vWAN (managed transit) and classic hub-and-spoke (customer-managed firewall).

The pros:

- The DRG is OCI-native and integrated with FastConnect, IPSec, and inter-region peering.
- No equivalent of the Azure "non-transitive peering by default" issue — DRG attachments are inherently transit-capable through DRG route policies.
- Cost-effective. The DRG itself is free; you pay for FastConnect, VPN, and traffic.

The cons:

- The surrounding reference architectures and community patterns are less extensive than Azure's ecosystem; DRG v2 itself is production-ready, but you may need to build out more of your own patterns.
- Firewall integration is your problem. OCI Network Firewall or third-party NVAs need explicit placement in a hub VCN attached to the DRG.

## The decision framework

Six questions:

**1. Single region or multi-region?**
Single region: classic hub-and-spoke (Azure or OCI) is fine. Multi-region with global transit: vWAN on Azure, multi-DRG with remote peering on OCI.

**2. Do you have hundreds of branch sites with SD-WAN?**
Yes: vWAN on Azure is the right tool. OCI's branch connectivity story is less developed; if branch SD-WAN is core to your architecture, Azure is structurally better.
No: any topology works.

**3. How customised does your firewall need to be?**
Standard requirements (Azure Firewall, OCI Network Firewall): managed hub options work.
Heavily customised (third-party NGFW with deep packet inspection, advanced threat protection, custom IDS rules): classic hub-and-spoke gives you full control.

**4. What is your operational maturity?**
High: classic hub-and-spoke gives you the most control. You will run it well.
Lower: vWAN reduces the surface area. Microsoft handles the routing fabric.

**5. What is your scale?**
Small (a few VNets / VCNs in one region): classic hub-and-spoke is cheaper and simpler.
Large (hundreds of VNets, multiple regions, branch connectivity): vWAN's cost is justified by the operational savings.

**6. Are you committed to Azure-native vs cloud-agnostic patterns?**
Azure-native: vWAN's managed approach fits. OCI DRG v2 fits similarly on OCI.
Cloud-agnostic: classic hub-and-spoke is more portable in mental model. The patterns transfer to AWS Transit Gateway or GCP NCC.

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>Topology decisions are sticky. A workload that is built on classic hub-and-spoke can move to vWAN, but the migration is a real project — Microsoft documents it in detail and it usually takes a quarter or more. Choose deliberately, with a multi-year horizon. The right answer for the workload you have now may not be the right answer for the workload you will have in three years; choose the one that scales.</p>
  </div>
</div>

## Spoke-to-spoke — the asterisk

A subtle point that bites people on Azure classic hub-and-spoke: **VNet peering is not transitive**. If Spoke 1 peers to Hub, and Spoke 2 peers to Hub, Spoke 1 cannot reach Spoke 2 just because of the two peerings. You need *user-defined routes* on Spoke 1 pointing Spoke 2's CIDR at the hub firewall (and vice versa), plus the hub firewall configured to allow the traffic.

vWAN handles this automatically — any-to-any spoke connectivity is built-in.

OCI DRG v2 handles this through route tables on the DRG itself; you control which attachments can route to which.

The default Azure behaviour catches new architects regularly. Document it; build the UDR pattern as part of your spoke vending; or move to vWAN where the issue does not exist.

## Multicloud factor

For multicloud architectures, the topology choice on each cloud is independent. You have an Azure topology and an OCI topology. The Interconnect bridges them.

The interaction worth thinking about:

- Each cloud's hub becomes the local routing point for that cloud's workloads.
- Cross-cloud traffic transits both hubs (the Azure hub firewall, the OCI hub firewall) typically.
- Cross-cloud routing tables need to know about both clouds' CIDRs (which is why the address plan must be unified).

Architectural symmetry across clouds is aesthetically appealing but often operationally wrong; each cloud should use the topology best aligned to its native strengths. The mistake to avoid: assuming one cloud's hub design dictates the other's. They are independent decisions; choose what fits each cloud's workload best.

## Closing checklist

- Default to classic hub-and-spoke for single-region environments and smaller estates where operational simplicity outweighs managed-transit benefits. It is well-understood and cheaper.
- Move to vWAN when you have global footprint, branch connectivity at scale, or operational simplification is worth the platform cost.
- On OCI, prefer DRG v2 with attached VCNs as the modern pattern. Place firewalls in a dedicated hub VCN attached to the DRG.
- Document spoke-to-spoke connectivity explicitly. Azure non-transitive peering is a footgun; vWAN solves it; OCI DRG v2 handles it via route policies.
- For multicloud, choose each cloud's topology independently. Bridge them via Interconnect, not by forcing symmetry.
- Topology migrations are real projects. Choose with a multi-year horizon.
- Keep address planning and route governance centralised; topology choices fail faster when CIDR ownership is fragmented.
