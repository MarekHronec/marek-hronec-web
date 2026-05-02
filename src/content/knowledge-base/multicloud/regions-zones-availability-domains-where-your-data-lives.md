---
title: "Regions, Zones, Availability Domains — Where Your Data Actually Lives"
category: multicloud
tags: ["Azure", "OCI", "Regions", "Availability Zones", "Data Residency"]
date: 2026-04-30
readTime: 13
level: beginner
excerpt: "'Available in Azure' rarely means 'available in the region you need.' 'Deployed to West Europe' does not always mean 'data stays in West Europe.' Region choice is an architectural decision, not a deployment toggle — and the resilience semantics differ in ways the marketing pages will not tell you."
---

The portal lets you pick a region from a dropdown. That makes it look like a simple choice — pick a city, deploy. It is not a simple choice. The region you choose locks in your data residency, determines your resilience options, constrains which services you can use, and quietly shapes your cost model and disaster recovery story for years. Many of the architectural problems that prove hardest to fix are downstream of a hurried region decision in the first sprint.

This article is about getting that decision right, on either cloud, with eyes open about how the two providers think about the problem differently.

## The vocabulary, before anyone confuses it

Both clouds use the words *region* and *zone* but they do not mean exactly the same thing.

**Azure:**
- **Geography** — a country or region of countries (US, EU, Japan, India). A data residency boundary.
- **Region** — a metropolitan area with one or more datacenters. Azure has over 70 of these globally.
- **Availability Zone (AZ)** — a logical zone number within a region, backed by physically separate datacenter groups with independent power, cooling, and networking. Where supported, regions have a minimum of three AZs, typically separated by several kilometres but staying within ~100 km for low latency.
- **Region pair** — two regions Microsoft has linked for some platform-managed replication and update sequencing. Many newer regions are *non-paired* and rely on AZ redundancy instead.

**OCI:**
- **Realm** — a logical collection of regions. The commercial realm holds public regions; separate realms exist for US Government, UK Government, EU Sovereign, EU Restricted Access, and a few others. Realms do not share data, do not share IAM, and are mutually invisible.
- **Region** — a metropolitan area, like Frankfurt or Ashburn.
- **Availability Domain (AD)** — one or more datacenters within a region. Some OCI regions have multiple ADs; many newer regions have a single AD. Always verify the AD count for the region you intend to use.
- **Fault Domain (FD)** — a hardware grouping inside an AD. Every AD has exactly three FDs. Spreading across FDs gives you anti-affinity within a single datacenter.

The differences that matter operationally:

- **Azure AZ ≠ OCI AD.** An Azure AZ is a logical zone number backed by physically separate datacenter groups with independent power, cooling, and networking. An OCI AD is also one or more datacenters but is treated more like a campus. The fault isolation goal is similar; the granularity is different.
- **OCI Fault Domains do not map cleanly to modern Azure constructs.** The closest is *update domains* on classic Availability Sets (mostly retired now) or implicit hardware separation within a single AZ. If you need three-way anti-affinity within a single zone on Azure, you are largely trusting platform placement.
- **OCI multi-AD vs single-AD regions matter.** Most of OCI's newer regions are single-AD. You get FD-level isolation, which is good but is not the same as AZ-level isolation. Plan accordingly.

## Region pairs: a feature that changed meaning

Azure region pairs used to be the centrepiece of every "design for resilience" conversation. They are not, anymore.

Originally, Azure region pairs were how Microsoft delivered platform-managed cross-region replication: GRS storage replicated to its paired region, planned maintenance was sequenced so a pair never updated simultaneously, and during a major outage Microsoft would prioritise restoring one region per pair. That was useful. It was also a constraint — you did not get to choose which region your geo-redundant data went to.

The current state is more nuanced. Microsoft is opening regions faster than they pair them, and many Azure regions are now non-paired, relying on availability zones as their primary regional redundancy model. Microsoft's recommended resilience pattern for these regions is *availability zones plus your own multi-region replication strategy*, not platform-managed pairing. Region pairs remain useful for the services and geographies that support them, but the forward-looking resilience guidance centres on availability zones for intra-region HA and an explicit multi-region DR strategy. The documentation for newer regions reflects this shift.

The asymmetric pair worth knowing about: **Brazil South is paired with South Central US** — outside the Brazil geography. If you have data residency requirements that pin you to Brazil, GRS storage in Brazil South will replicate your data to the United States. That is not what most architects assume. There are similar quirks documented in Microsoft's regions list; read it before you make a residency commitment.

OCI takes a different approach. Oracle does not publish "pairs." OCI's recommended resilience pattern is multi-region by design — Full Stack Disaster Recovery, Data Guard, Object Storage cross-region replication, all of which let you pick your own pair of regions. This is more flexible and asks more of you. There is no "platform-managed prioritisation" if a major incident affects multiple regions; you implement DR yourself.

## Where your data actually lives — the parts they do not advertise

Three things drive most data-residency surprises:

**Some "global" services have their data closer than you think — and sometimes farther.** Entra ID metadata is global by design. Front Door routes through Microsoft's global edge. Traffic Manager DNS is global. Cosmos DB has a metadata layer that is not strictly per-region. None of this means your transactional data leaves your chosen region, but it does mean some configuration and identity data has a global footprint. For most workloads this is fine. For workloads with strict sovereignty requirements (regulated public-sector, certain financial services, EU sovereign cloud customers), it is a question to ask explicitly before adoption.

**GRS replication paths are the path of least surprise — but they exist.** Geo-redundant storage in Azure replicates to the paired region. If you are in West Europe (paired with North Europe), your blobs land in both Netherlands and Ireland. If you are in Brazil South (paired with South Central US), your blobs leave Brazil. This is documented but not screaming.

**EU Data Boundary is real but not total.** Microsoft has implemented a multi-year programme for in-scope commercial Azure, Microsoft 365, Dynamics 365, and Power Platform data to be stored and processed within the EU Data Boundary. But documented exceptions remain — certain services, support scenarios, diagnostic operations, and non-regional service behaviours are listed explicitly in the EU Data Boundary documentation. If you are an EU customer with strict residency requirements, treat that documentation as a primary source, not a marketing summary.

OCI's sovereign cloud story is structurally simpler — separate realms with no data sharing — and that simplicity is one of OCI's marketing points for sovereignty-conscious customers. The trade-off is that you give up access to services that have not yet shipped in the sovereign realm.

## Choosing a region — the framework

Six considerations, weighted by how often they actually drive the decision:

**Latency to users.** Pick the region closest to where your traffic originates. Two-digit milliseconds of latency from your users to your closest region is the difference between a snappy app and a sluggish one. Tools: ping the regional endpoints, or use synthetic monitoring with checkpoints in your user geographies.

**Data residency requirements.** If GDPR, Schrems II, or sector-specific regulation pins your data to a geography, the residency boundary is non-negotiable and shrinks your candidate list. Match this against the *geography*, not just the *region*.

**Service availability.** Not every service is in every region. Some services launch in a single US region in preview and take 12–18 months to reach Europe. Some services are still not available in sovereign regions years after their commercial launch. Verify before committing.

**Resilience requirements.** Does the region have AZs? Are the AZs supported by the services you need (some services support AZ deployment in some regions and not others)? Is it a paired region (Azure) or a multi-AD region (OCI)? What is your DR target region and how far is it?

**Cost.** Region pricing varies. Western European and US regions tend to be cheapest for compute and storage; Brazil, Australia, Japan, and the Middle East tend to be 10–30% more expensive. OCI publishes consistent commercial pricing across most regions, which is one of its quiet advantages.

**Future capacity.** Some regions are persistently capacity-constrained for certain VM families or GPU types. If you need H100s and you are in a region that has none, you have not fully chosen the region — you have chosen a queue.

```hcl
# Lock down region selection in policy from day one
# Azure: allowedLocations policy assignment
resource "azurerm_management_group_policy_assignment" "allowed_locations" {
  name                 = "restrict-locations"
  policy_definition_id = "/providers/Microsoft.Authorization/policyDefinitions/e56962a6-4747-49cd-b67b-bf8b01975c4c"
  management_group_id  = data.azurerm_management_group.platform.id
  parameters = jsonencode({
    listOfAllowedLocations = {
      value = ["westeurope", "northeurope"]
    }
  })
}
```

```hcl
# OCI: per-compartment IAM policy with request.region condition
resource "oci_identity_policy" "region_lock" {
  compartment_id = var.tenancy_ocid
  name           = "region-lock-eu"
  description    = "Restrict workload deployments to EU regions"
  statements = [
    "Allow group WorkloadAdmins to manage all-resources in compartment Workloads where any { request.region = 'eu-frankfurt-1', request.region = 'eu-amsterdam-1' }"
  ]
}
```

OCI region restrictions through IAM conditions are authorisation controls, not an Azure Policy-style resource-location compliance engine. They restrict which regional API requests a group is authorised to make; they do not produce a compliance report of where resources are deployed.

Pin allowed regions in policy from day one. The marginal cost of doing this on day one is zero. The cost of unwinding accidental deployments to unapproved regions on day 200 is significant.

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>For OCI, the home region is not changeable after the tenancy is provisioned. IAM master definitions live there, and changes to users, groups, policies, compartments, dynamic groups, and federation resources are made in the home region and then propagated to other subscribed regions. Pick the home region deliberately, and pick the one that matches where your operators and identity management work — not just where your workloads run.</p>
  </div>
</div>

## Anti-affinity within a region

Once you have chosen a region, the next question is how to structure resilience inside it. The patterns differ on each cloud.

**Azure, AZ-supported region:** Spread compute across all three zones. Use zone-redundant SKUs where the service offers them (zone-redundant load balancers, zone-redundant Application Gateways, zone-redundant SQL Databases, ZRS storage). For services without zone redundancy, deploy zonal instances and a load balancer that fronts them. For production workloads, the loss of a single zone should not take down an entire tier.

**Azure, no-AZ region:** Use Availability Sets where the service supports them (becoming rarer — many services are AZ-only now). Use multiple regions for HA, not just multiple datacenters in one. This is increasingly the only sensible answer in regions without AZs.

**OCI, multi-AD region:** Spread tier across ADs for the strongest intra-region resilience. Within each AD, spread across all three FDs for hardware-level anti-affinity. Use regional subnets (Oracle's recommendation since 2018) rather than AD-specific subnets so workloads can move ADs without re-addressing.

**OCI, single-AD region:** You have FDs but not ADs. FD spread is your best intra-region resilience. For higher availability, use cross-region replication and DR — there is no equivalent of "two AZs in one region" to fall back on.

The anti-pattern across both clouds: deploying everything to a single zone or AD "to keep latency tight." The savings on intra-zone latency are typically a millisecond or two; the cost of a zone or AD outage taking the whole tier down is hours of revenue. The trade is almost always wrong.

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Reality Check</p>
    <p>OCI Availability Domain numbers are tenancy-specific. AD-1 in one tenancy is not the same physical datacenter as AD-1 in another. Oracle does this deliberately so that customers do not all pile their workloads into the lowest-numbered AD and overload it. The practical implication: when sharing infrastructure setup with other organisations, never refer to "AD-1" as if it means a fixed datacenter. Refer to the AD name from your own tenancy or use the AD's logical name.</p>
  </div>
</div>

## Multicloud factor

Cross-cloud DR only works in regions where both clouds and the necessary connectivity exist. The Azure–OCI Interconnect is available only in specific paired locations, and the list changes over time. If you want a multicloud architecture spanning Azure and OCI, your region choice on each side has to take current Interconnect availability into account rather than assuming every major Azure and OCI region pair is supported.

The portable rules:

- Pick regions in the same geography on both clouds. EU on EU, US on US. Latency, residency, and Interconnect availability all align better.
- Treat home region (OCI) and primary region (Azure) as the same operational geography. Operators should not be context-switching between time zones for routine work.
- Never deploy production to a single zone or AD. The savings are negligible; the risk is unbounded.
- For multicloud DR, pick the secondary region on each cloud deliberately, not by inheritance from a region pair. Pairs were designed for single-cloud DR; multicloud DR has different constraints.
- Pin allowed regions in policy on both clouds, before anyone deploys anything.

## Closing checklist

- Inventory the geographies that have data residency or sovereignty requirements for your business. Match these to allowed Azure geographies and OCI realms.
- Pick the home region on OCI deliberately — it is not changeable.
- Verify AZ support (Azure) or AD count (OCI) for every region you plan to use, for every critical service.
- Verify region pair status (Azure) — many newer regions are non-paired and require explicit cross-region DR.
- Lock allowed regions in Azure Policy and OCI IAM policies before any workload deploys.
- Default to AZ/AD spread for production. Single-zone or single-AD production is a deferred outage.
- Read your service's specific zone behaviour. Some services are auto-zone-redundant; others require explicit configuration; others do not support zones at all.
- For multicloud, design region pairs (Azure region + OCI region in the same geography) into your strategy. Document them. Make them stable.
