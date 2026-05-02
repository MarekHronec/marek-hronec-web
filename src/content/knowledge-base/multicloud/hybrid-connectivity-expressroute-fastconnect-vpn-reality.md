---
title: "Hybrid Connectivity — ExpressRoute, FastConnect, VPN, and the Reality Behind the Glossy Diagrams"
category: networking
tags: ["Azure", "OCI", "Networking", "ExpressRoute", "FastConnect", "VPN", "Hybrid"]
date: 2026-04-30
readTime: 12
level: intermediate
excerpt: "Hybrid connectivity is where marketing diagrams most diverge from reality. Circuit bandwidth is not end-to-end application throughput. Redundancy is rarely as redundant as it looks. The patterns that survive production are simpler and more conservative than the diagrams suggest."
---

Hybrid connectivity is the part of cloud where the on-prem network meets the cloud. It is technically straightforward and operationally treacherous. The marketing diagrams show clean lines between datacenters and cloud regions; the reality involves carrier provisioning timelines, BGP weirdness, redundancy that is not as redundant as it looks, and the discovery that your "10 Gbps" circuit actually delivers 2 Gbps to your specific destination.

This article is about what hybrid connectivity actually does, what the options cost in time and money, and the patterns that survive production.

## The three options

| Option | Best for | Caveat |
|---|---|---|
| **Site-to-Site VPN** | Fast provisioning, lower-cost connectivity, dev/test, branch, backup path | Best-effort internet path; throughput depends on gateway SKU, tunnel count, ISP conditions, and encryption overhead |
| **ExpressRoute / FastConnect** | Production hybrid, predictable latency, high-volume transfer, private connectivity | Carrier lead time, separate gateway bandwidth limits, not automatically end-to-end encrypted |
| **Dedicated + VPN or MACsec** | Regulated environments requiring encryption over private path | Additional routing complexity, MTU and throughput considerations, must be explicitly tested |

VPN is cheap and fast to provision, but throughput is best-effort and gateway-SKU-dependent. Azure VPN Gateway throughput depends on SKU and aggregate tunnel usage; OCI Site-to-Site VPN is commonly planned around hundreds of Mbps per tunnel, not guaranteed gigabit throughput.

Dedicated circuits are private paths — traffic does not traverse the public internet — but privacy is not the same as encryption. That distinction has its own section below.

## Azure ExpressRoute — what you actually get

ExpressRoute connects your on-prem network to Azure via a partner provider (carrier) at an Azure peering location. The connection is private — traffic does not traverse the public internet.

Key concepts:

- **Circuit** — the underlying physical/logical connection. Has a SKU (provider circuits typically 50 Mbps to 10 Gbps; ExpressRoute Direct for higher-capacity dedicated ports), a billing model (metered or unlimited), and a tier (Standard or Premium).
- **Peering** — the BGP relationship between your edge and Microsoft. Two types: Private peering (for VNet connectivity) and Microsoft peering (specialized for Microsoft public services; private peering is the normal path for VNet connectivity).
- **Connection** — the link between an ExpressRoute circuit and a specific Azure VNet via an ExpressRoute Gateway.
- **Global Reach** — a feature that allows two ExpressRoute circuits in different geographies to communicate. Connects branch offices via Microsoft backbone.

The realities:

- **Provisioning takes weeks.** The carrier has to provision the local circuit, you order capacity from Microsoft, BGP gets set up. Plan in weeks — often 4–8 for new circuits, longer when new physical paths or carrier diversity are involved.
- **Bandwidth is from your edge to Microsoft's edge.** Whether you actually achieve the full bandwidth depends on the carrier's path and the destination service. A 10 Gbps ExpressRoute does not guarantee 10 Gbps to a specific Azure VM.
- **Standard reaches Azure services across all regions within the same geopolitical region; Premium extends reach globally across geopolitical regions** and increases scale limits such as VNet counts and route table sizes.
- **Redundancy is on you.** The Microsoft side is highly available; the carrier side and your on-prem side are your responsibility. Redundant ExpressRoute means two circuits at two peering locations with two carriers, ideally diverse physical paths.
- **The Gateway has its own throughput limits.** Older SKUs (ErGw1Az/2Az/3Az) and newer scalable gateway options (ErGwScale) have different bandwidth caps. The gateway is often the bottleneck before the circuit is.

## OCI FastConnect — the equivalents and differences

OCI FastConnect mirrors ExpressRoute conceptually. Colocation port speeds of 1, 10, 100, and 400 Gbps. Provisioning timeline similar. BGP-based.

Differences worth noting:

- **Public peering is more relevant on OCI.** Some OCI public services (Object Storage, Autonomous Database public endpoint) are reachable via FastConnect public peering, which has more use cases than Microsoft's equivalent.
- **FastConnect cross-connect locations** are different physical sites than ExpressRoute peering locations. Multicloud architectures need both, and the diversity of carriers and locations matters.
- **OCI DRG remote peering** provides private cross-region VCN connectivity through OCI's backbone. This is not the same construct as Azure Global Reach, which links ExpressRoute circuits for on-premises network interconnection; DRG remote peering operates at the VCN level.
- **Pricing** is structured differently. OCI's free egress allowance (10 TB/month outbound) makes FastConnect economics different from Azure.

## Example provisioning shapes

These snippets illustrate circuit creation; they are starting points, not production-ready templates.

```hcl
# Azure ExpressRoute circuit — Terraform
resource "azurerm_express_route_circuit" "main" {
  name                  = "exr-corp-weu-001"
  resource_group_name   = azurerm_resource_group.connectivity.name
  location              = "westeurope"
  service_provider_name = "Equinix"
  peering_location      = "Amsterdam"
  bandwidth_in_mbps     = 1000

  sku {
    tier   = "Standard"  # Use Premium only for global reach across geopolitical regions or higher scale limits
    family = "MeteredData"
  }
}
```

```hcl
# OCI FastConnect virtual circuit — Terraform
resource "oci_core_virtual_circuit" "main" {
  compartment_id   = var.connectivity_compartment_id
  type             = "PRIVATE"
  display_name     = "fc-corp-fra-001"
  bandwidth_shape_name = "1 Gbps"
  customer_asn     = 65000
  cross_connect_mappings {
    customer_bgp_peering_ip = "10.0.0.1/30"
    oracle_bgp_peering_ip   = "10.0.0.2/30"
    cross_connect_or_cross_connect_group_id = oci_core_cross_connect.main.id
    vlan = 100
  }
  gateway_id = oci_core_drg.main.id
  region     = "eu-frankfurt-1"
}
```

## VPN as the alternative — and the backup

VPN is often dismissed as second-class. It deserves its own paragraph because it has legitimate uses.

**VPN is the right choice when:**
- Bandwidth requirements are in the hundreds of Mbps, or low aggregate Gbps where the design uses multiple tunnels and best-effort performance is acceptable.
- You need to provision in days, not weeks.
- The workload is non-critical (dev/test, branch offices, low-volume B2B).
- You need encryption end-to-end and dedicated circuit's "private path" is not enough.

**VPN as a backup to ExpressRoute / FastConnect is a real pattern.** The dedicated circuit is the primary; the VPN is a fallback that activates if the circuit fails. Both clouds support this:

- Azure: VPN Gateway and ExpressRoute Gateway in the same VNet, with BGP routing prioritising the ExpressRoute path.
- OCI: FastConnect and IPsec VPN both attached to the same DRG, route policies prioritising FastConnect.

The trap: configuring the failover correctly. Active/active is harder to get right than active/passive. Test the failover. Test it again after every change. The "does our DR connectivity actually work" question should not first be asked during an outage.

## The redundancy diagram nobody draws

A "redundant ExpressRoute" looks like two circuits. Real redundancy involves:

- **Two circuits at different peering locations.** A single peering location is a single failure domain; carrier fibre cuts can take it out.
- **Two different carriers.** A single carrier is a single failure domain; carrier-wide outages happen.
- **Diverse physical paths from your datacenter to each peering location.** Two fibres in the same conduit are not diverse.
- **Multiple ExpressRoute circuits connected to the VNet gateway**, ideally across different peering locations and carriers. The gateway itself is highly available within its SKU; circuit diversity is what protects against location, carrier, and path failures.
- **BGP weight tuning** so traffic prefers one path with the other available as failover, OR active-active with proper load balancing.

Most "redundant" ExpressRoute deployments fail at one of these checks. Often the circuits go to the same peering location with the same carrier. The cost is paid; the redundancy is not delivered.

The same applies to FastConnect on OCI. Cross-connect group with multiple cross-connects, ideally at different cross-connect locations, with different carriers if you can negotiate it.

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Reality Check</p>
    <p>A common finding in connectivity reviews: "redundant ExpressRoute" setups where both circuits go to the same peering location through the same carrier sharing the same fibre conduit. The customer is paying for "redundancy" that is theatre. The fix is typically a quarter-long project to provision a second carrier at a different peering location. Verify actual redundancy by tracing paths end-to-end with the carriers, not by counting circuits in the Azure portal.</p>
  </div>
</div>

## Bandwidth ≠ throughput

A 10 Gbps ExpressRoute circuit has 10 Gbps of capacity from your edge to Microsoft's edge. It does not guarantee 10 Gbps from your VM to a specific Azure service. Bottlenecks include:

- **The ExpressRoute Gateway's bandwidth tier.** ErGw1Az caps at ~1 Gbps. ErGw2Az ~2 Gbps. ErGw3Az ~10 Gbps. The 10 Gbps circuit through a 1 Gbps gateway delivers 1 Gbps.
- **VM SKU network bandwidth.** Smaller VMs have smaller network limits. A D2 has ~1 Gbps; you cannot push more through it.
- **Single-flow vs aggregate bandwidth.** Single TCP flows hit lower limits than aggregate; throughput tools that test single flows under-report aggregate capability.
- **The destination service's bandwidth.** Storage accounts, SQL databases, and other PaaS services have their own bandwidth limits.

Test the actual end-to-end throughput before committing to a design that depends on the headline bandwidth.

## Encryption is not automatic

Dedicated circuits are private paths — they keep your traffic off the public internet — but private does not mean encrypted. Provider isolation is not end-to-end encryption.

If the requirement is encryption in transit over the dedicated circuit, there are three design options:

- **IPsec over ExpressRoute / FastConnect** — VPN tunnel running over the dedicated circuit. Adds encryption at the cost of IPsec overhead: slightly higher latency, reduced effective throughput, MTU considerations (typically 1418–1438 bytes for the inner packet). Azure and OCI both support this pattern.
- **MACsec (Layer 2 encryption)** — Encrypts the link between your CPE and the cloud edge at Layer 2. Available on Azure ExpressRoute Direct ports (not on provider-provisioned ExpressRoute circuits) and on OCI FastConnect colocation ports at eligible speeds. The most transparent option (lowest latency impact), but also the most restricted in availability.
- **Application-layer encryption** — TLS, mTLS, or similar at the application stack. Does not depend on the network layer; works over any connectivity type. The right answer when network-layer encryption is impractical.

Design the encryption requirement before finalising the circuit type. A provider-provisioned ExpressRoute circuit cannot use MACsec; if MACsec is a compliance requirement, ExpressRoute Direct or IPsec over the circuit are the options. This also affects carrier selection, provisioning timeline, and gateway design.

## Multicloud factor

Hybrid connectivity for multicloud is sometimes "two separate hybrid setups," sometimes "one hybrid setup that reaches both clouds via a third party." Both work; they have different cost and operational profiles.

**Two separate setups**: ExpressRoute to Azure, FastConnect to OCI, both terminating at on-prem. Each cloud's hybrid is independent. More circuits, more carriers, more cost. Simpler to reason about.

**Shared transit**: A carrier or third-party service provider that offers connectivity to multiple clouds from a single circuit. Megaport, Equinix Fabric, and similar offer this. One physical connection, virtual circuits to multiple clouds. Cheaper; introduces a vendor dependency on the third party.

For organisations with significant multicloud footprint, the shared-transit model usually wins on cost and complexity. For organisations with one dominant cloud and a smaller secondary, separate setups can be simpler.

The Azure–OCI Interconnect is a fourth option specifically for cross-cloud traffic between Azure and OCI without going through on-prem.

## Closing checklist

- VPN for non-critical, fast provisioning, and backup paths. Throughput is best-effort and SKU-dependent, not a guaranteed pipe.
- ExpressRoute / FastConnect for production-critical, higher bandwidth, predictable latency. Plan in weeks — often 4–8 for new circuits, longer for carrier diversity.
- Real redundancy means diverse peering locations, diverse carriers, diverse physical paths. Verify, do not assume.
- Treat the throughput chain as one unit: circuit, gateway SKU, VM SKU, and target service limits. Any link can be the bottleneck.
- Test actual end-to-end throughput. Circuit bandwidth is not end-to-end application throughput.
- Dedicated circuits are private, not automatically encrypted. Decide whether you need IPsec over the circuit, MACsec, or application-layer encryption before finalising the circuit type.
- Document BGP preferences intentionally: primary path, backup path, failback behaviour, and which routes are advertised. Hybrid connectivity failures are often route-preference failures, not circuit failures.
- VPN as backup to dedicated circuit is a real pattern. Test the failover regularly.
- For multicloud, evaluate shared transit (Megaport, Equinix Fabric) vs separate hybrid setups. Cost typically favours shared transit at scale.
