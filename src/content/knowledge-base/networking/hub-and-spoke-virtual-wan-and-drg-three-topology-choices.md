---
title: "Hub-and-Spoke, Virtual WAN and DRG — Choose the Traffic Paths First"
category: networking
tags: ["Azure", "OCI", "Networking", "Connectivity"]
date: 2026-04-30
updated: 2026-09-13
readTime: 4
level: intermediate
excerpt: "Compare transit approaches by permitted flows, inspection, operations and cost rather than assuming the diagram controls routing."
references:
  - title: "Azure Virtual WAN overview"
    url: "https://learn.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about"
    description: "Microsoft's overview of Virtual WAN, including the Basic and Standard tier table — Basic supports site-to-site VPN only, while inter-hub and VNet-to-VNet transit require Standard, because only a Standard hub provisions a router."
    domain: "learn.microsoft.com"
  - title: "Azure virtual network peering overview"
    url: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview"
    description: "The canonical Microsoft page on VNet peering, including its non-transitivity — peering A to B and B to C does not connect A to C."
    domain: "learn.microsoft.com"
  - title: "OCI — Managing Dynamic Routing Gateways"
    url: "https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingDRGs.htm"
    description: "Oracle's reference for DRG attachments, DRG route tables and route distributions — the mechanism by which a DRG learns and redistributes routes."
    domain: "docs.oracle.com"
---

## Topology expresses intent; routes determine traffic

Begin with a flow list: who needs to talk to whom, in which direction, and through which controls. Mark flows that must remain isolated. Only then compare a classic hub, managed transit or a simpler direct connection.

A spoke connected to a hub does not automatically send every packet through the hub firewall. Local traffic, direct peerings, service routes and more specific destinations can take other paths. Verify effective routes and security behaviour.

## Three approaches, with different boundaries

| Approach | What it provides | What you still decide |
|---|---|---|
| Classic hub-and-spoke | A shared network for gateways, DNS or inspection services | Forwarding, spoke transit, inspection placement, capacity and operations |
| Azure Virtual WAN | Managed virtual hubs and supported connectivity capabilities | Service tier, associations, propagation, segmentation, inspection and gateway configuration |
| OCI DRG | A managed virtual router with network attachments and route tables | Which routes each attachment learns and uses, security controls and inspection paths |

These constructs are not interchangeable. A DRG is not an entire managed branch-network service, and a Virtual WAN hub is not an arbitrary workload-hosting VNet.

## Azure peering is not transitive

If A peers with a hub and B peers with the same hub, that alone does not establish A-to-B transit. Depending on the design, you might use direct peering or a supported transit path with forwarding, routes and policy configured.

Check both directions. A stateful firewall can reject traffic when the return flow bypasses the required state. Azure’s [routing documentation](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview) explains route selection; the intended next hop must be confirmed at the relevant interface or subnet.

Do not interpret a route as permission. A correct path can still be blocked by a network rule or application authorisation.

## Virtual WAN reduces infrastructure work, not design responsibility

Azure Virtual WAN capabilities depend on the service tier and configuration. Standard Virtual WAN supports broader transit scenarios than Basic. Associations, propagation and routing policies shape which networks can communicate; inspection must be deliberately configured. Consult the [Virtual WAN overview](https://learn.microsoft.com/en-us/azure/virtual-wan/virtual-wan-about) for current capabilities.

Avoid the blanket statement that managed transit automatically solves every spoke-to-spoke requirement. Also avoid assuming that third-party inspection necessarily rules it out: verify supported integrations against the appliance and features you need.

## OCI DRG routing remains explicit

OCI DRGs use attachments, route tables and route distributions to govern connectivity. A VCN attachment does not remove the need for appropriate VCN routes and security rules. Multiple DRGs can exist in a region — Oracle’s service limits put the default at five per region, and that ceiling is itself raisable — so “one per region” is a design choice, not a platform rule. [Oracle DRG documentation](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/managingDRGs.htm).

Trace traffic entering each attachment and determine which route table applies. If inspection is required, verify the complete supported insertion path and the return flow rather than relying on the firewall’s presence in a hub VCN.

## Compare candidates against the same requirements

Create two candidate designs for an illustrative estate with application, database and management networks. Record allowed flows, operational owners and failure boundaries for each.

| Evaluation | Evidence |
|---|---|
| Segmentation | Permitted connections succeed; prohibited ones fail |
| Inspection | Required traffic traverses the configured control in both directions |
| Performance | Representative transactions meet latency and throughput requirements |
| Recovery | The selected failure leaves a usable path with adequate capacity |
| Operation | Changes, diagnostics and rollback have named owners |
| Cost | Current service charges, traffic meters and team effort |

A managed topology may reduce operating work while increasing provider charges. A classic hub may offer useful control while creating a larger maintenance burden. Neither is universally cheaper.

For multicloud, choose the routing design in each cloud deliberately, then validate the interconnection. Do not assume traffic crosses both hub firewalls unless effective routing proves that it does.

Use the [connectivity guide](/connectivity) to frame the decision and the [cost guide](/cost) to compare the complete operating cost.
