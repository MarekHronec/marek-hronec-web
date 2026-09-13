---
title: "Service Availability by Region — Why You Cannot Trust the Map"
category: multicloud
tags: ["Azure", "OCI", "Service Availability", "Governance", "Region Selection"]
date: 2026-04-30
updated: 2026-09-13
readTime: 5
level: beginner
excerpt: "Verify exact service features, quotas and recovery capacity in the regions your workload depends on."
references:
  - title: "Azure products available by region"
    url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/table"
    description: "Microsoft's canonical table of which Azure services are available in which regions — the first source to check before committing to a region or service. Note this is the /table URL: the landing page above it carries no region data."
    domain: "azure.microsoft.com"
  - title: "Azure service-specific reliability guides"
    url: "https://learn.microsoft.com/en-us/azure/reliability/overview-reliability-guidance"
    description: "Per-service reliability documentation that covers AZ support, region-pair behaviour, and service-specific resilience patterns — the detail layer beneath the products-by-region table."
    domain: "learn.microsoft.com"
  - title: "OCI service availability by region and realm"
    url: "https://www.oracle.com/cloud/distributed-cloud/service-availability/"
    description: "Oracle's per-realm service availability matrix, including the list of services not available in the EU Sovereign Cloud — the equivalent of Azure's products-by-region for OCI workload design."
    domain: "oracle.com"
  - title: "Azure Availability Zone support by service and region"
    url: "https://learn.microsoft.com/en-us/azure/reliability/availability-zones-service-support"
    description: "Which Azure services support Availability Zone deployment and in which regions — the table that determines whether a given resilience design is actually achievable in your chosen region."
    domain: "learn.microsoft.com"
---

A provider's region map is a useful starting point. It does not prove that a particular service tier, deployment shape or recovery configuration is available to your subscription.

For recovery planning, verify the destination as carefully as production. A backup in another region is not enough if the application cannot be deployed or operated there.

## Separate four different questions

| Check | Evidence to collect |
|---|---|
| Service and feature support | Current documentation for the exact region, service, tier and feature |
| Access and eligibility | Subscription, account, commercial and preview requirements |
| Quota | Approved limits sufficient for production and recovery |
| Capacity | Evidence that the needed resources can be allocated, including any applicable reservation |

These are distinct checks. A quota increase is permission to consume more resources; it is not a blanket capacity reservation. Review the resource-specific limits and allocation behavior. [Azure limits and quotas](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits)

## Start with provider sources

For Azure, start with [Products available by region](https://azure.microsoft.com/en-us/explore/global-infrastructure/products-by-region/). Follow that with the [service reliability guide](https://learn.microsoft.com/en-us/azure/reliability/overview-reliability-guidance) and the service's tier, SKU and deployment documentation.

For OCI, use the [regions and service availability documentation](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm), followed by the particular service's limits and recovery documentation. Check the intended realm and region, not an apparently comparable commercial location.

Record source links and a review date. Where documentation leaves uncertainty, confirm it with the provider and test a representative deployment in the intended account. A successful small test does not reserve future recovery capacity.

## Check the recovery configuration, not just the service name

A useful register describes a concrete requirement: the database tier, required storage features, zone support, replication method, recovery destination and network connectivity. “Managed database available” is too broad.

Record the primary and recovery configurations side by side. Feature differences may require a different recovery pattern, a different location or a revised business requirement. Include keys, private endpoints, DNS, identity and monitoring in the comparison.

A supported region pair does not automatically configure disaster recovery. Verify each service's actual behavior and the application's recovery steps. [Azure region-pair limitations](https://learn.microsoft.com/en-us/azure/reliability/regions-paired)

## Treat preview status as an explicit decision

Read the terms for the specific preview: production permission, support, SLA, data handling, breaking changes and a migration path. Do not infer suitability from how long a feature has been in preview or from a case study.

Record the accepted limitations and the fallback if the feature changes or disappears. Where the provider excludes production use, respect that restriction. A generic label such as “preview” or “sovereign” is not a substitute for the applicable service terms.

## Inventory helps find drift, not prove availability

An inventory query shows resources that exist and that the caller can see. It does not prove that new resources of the same kind can be deployed during an outage.

For Azure Resource Graph, an inventory can group deployed resource types by location:

```kql
Resources
| summarize resourceCount=count() by subscriptionId, location, type
| order by location asc
```

For OCI, Search only covers supported resource types and the resources visible under the caller's permissions. Review its coverage before treating it as an estate-wide inventory. [OCI Search overview](https://docs.oracle.com/en-us/iaas/Content/Search/Concepts/queryoverview.htm)

Compare the inventory with the approved register. Investigate unexpected resources and missing dependencies; do not turn an inventory into an availability guarantee.

## A practical review record

Keep one row for each required primary or recovery configuration:

- Business operation and technical owner.
- Region, account, service, tier and required features.
- Eligibility, quotas and capacity assumptions.
- Data location and key-access requirements.
- Provider references and verification date.
- Deployment and recovery test evidence.
- Open gaps, accepted risks and the next review trigger.

Revisit the record after a material architecture change, a provider announcement that affects it or a failed exercise. Use the [resilience planner](/resilience#recovery-planner) to establish the targets the register must support, and the [platform guide](/platform) to clarify who operates the chosen services.
