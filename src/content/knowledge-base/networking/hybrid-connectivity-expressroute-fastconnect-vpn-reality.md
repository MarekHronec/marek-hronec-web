---
title: "Hybrid Connectivity — ExpressRoute, FastConnect and VPN in Practice"
category: networking
tags: ["Azure", "OCI", "Networking", "Connectivity"]
date: 2026-04-30
updated: 2026-09-13
readTime: 4
level: intermediate
excerpt: "Compare private circuits and VPN against measured traffic, encryption requirements and the failures the complete path must survive."
references:
  - title: "ExpressRoute encryption"
    url: "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-about-encryption"
    description: "Microsoft's page on ExpressRoute encryption, covering MACsec at layer 2 and IPsec at layer 3 — the distinction that private connectivity alone does not encrypt application traffic."
    domain: "learn.microsoft.com"
  - title: "Designing for disaster recovery with ExpressRoute private peering"
    url: "https://learn.microsoft.com/en-us/azure/expressroute/designing-for-disaster-recovery-with-expressroute-privatepeering"
    description: "Microsoft's guidance on redundancy and failure domains for ExpressRoute private peering — why two circuits at one location is not the same as two locations."
    domain: "learn.microsoft.com"
  - title: "OCI FastConnect overview"
    url: "https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/fastconnectoverview.htm"
    description: "Oracle's FastConnect reference, including the cross-connect group definition — a link aggregation group for bandwidth, with no stated guarantee of location diversity."
    domain: "docs.oracle.com"
---

## Start with the connection, not the circuit

Write down the source, destination, protocols, permitted audience and business operation. Then record peak traffic, acceptable latency, interruption tolerance and operating owners. Those requirements determine whether a connection is suitable; a “production” label alone does not select ExpressRoute or FastConnect.

| Approach | What to evaluate |
|---|---|
| Site-to-site VPN | Tunnel endpoints, encryption, internet or underlying transport, gateway capacity and route convergence |
| Private connectivity | Provider path, circuit and gateway limits, lead time, reachability, encryption and recurring charges |
| Multiple paths | Shared failure points, surviving capacity, routing preference, failover and failback |

A VPN can support production when it meets the requirements. A private circuit can still be the wrong fit if its cost, provisioning dependencies or recovery behaviour do not.

## Private does not mean application-to-application encryption

ExpressRoute keeps the supported connection off the public internet, but confidentiality still depends on the chosen protection. Application TLS, IPsec and supported MACsec designs protect different parts of the path. MACsec does not by itself promise encryption between the application endpoints. Check the current [ExpressRoute FAQ](https://learn.microsoft.com/en-us/azure/expressroute/expressroute-about-encryption) and the selected service configuration.

Specify the endpoints of encryption in the design. “Encrypted network” is incomplete if data is decrypted at a gateway and crosses another unprotected segment.

## Understand the provider’s actual connection model

OCI FastConnect has partner, third-party-provider and colocation models. Private and public peering serve different destinations. A cross-connect group aggregates physical links; it should not be described as a guarantee that links span independent locations. Select redundancy at the appropriate devices, sites and carrier paths. [Oracle’s FastConnect overview](https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/fastconnectoverview.htm) defines those constructs.

Obtain lead times and charges for the actual arrangement. Internet egress allowances should not be used as a shortcut for FastConnect pricing. Include provider services, ports, gateways, processing and the supported data-transfer meters for that route.

## Count failure domains, not lines

A pair of logical connections might share your edge router, the building entrance, a duct, carrier equipment or a peering location. Ask which failure each additional path is intended to survive.

Microsoft’s [ExpressRoute disaster-recovery guidance](https://learn.microsoft.com/en-us/azure/expressroute/designing-for-disaster-recovery-with-expressroute-privatepeering) considers geographically redundant circuits and customer-side diversity. A single circuit’s built-in redundancy and protection from losing a whole location are different claims.

Use a failure matrix:

| Simulated failure | Evidence to collect |
|---|---|
| One edge device unavailable | Surviving forwarding path and application result |
| Primary transport unavailable | Detection and convergence times, new and existing sessions |
| Primary location unavailable | Alternate location and its dependencies remain usable |
| Reduced backup capacity | Priority transactions still meet the agreed degraded-service target |

Treat failure injection as an approved exercise. A route change can affect workloads outside the one you intended to test.

## Measure the end-to-end chain

Circuit speed, gateway capacity, firewall throughput, VM networking and destination-service limits all matter. Test representative transaction sizes, concurrent connections and encryption settings. Observe single-flow behaviour separately from aggregate throughput.

For an illustrative file-transfer workload, record bytes delivered and elapsed time at the application. Compare a quiet period with a busy period and repeat through the backup path. Do not infer the application result from a carrier port counter alone.

## Make the fallback operational

An ExpressRoute-to-VPN backup is a supported Azure pattern, but the passive path needs active maintenance. Check the documented [VPN backup behaviour](https://learn.microsoft.com/en-us/azure/expressroute/use-s2s-vpn-as-backup-for-expressroute-privatepeering), route preferences and actual reachable prefixes.

Record who owns DNS, route advertisements, inspection rules and carrier escalation. Test failback as well as failover; a restored primary connection should not create unexpected asymmetric flows.

Prepare the [connectivity brief](/connectivity#connectivity-planner), agree the [recovery target](/resilience), and include both paths in the [cost estimate](/cost).
