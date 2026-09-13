---
title: "Regions, Zones, Availability Domains — Where Your Data Actually Lives"
category: multicloud
tags: ["Azure", "OCI", "Regions", "Availability Zones", "Data Residency"]
date: 2026-04-30
updated: 2026-09-13
readTime: 5
level: beginner
excerpt: "Region choice locks in data residency, resilience, and service availability for years. The portal calls it a dropdown. It is an architectural decision."
references:
  - title: "Azure Availability Zones overview"
    url: "https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview"
    description: "Microsoft's reference for AZ architecture, zonal versus zone-redundant services, and how physical separation is delivered, including that logical zone numbers map differently between subscriptions."
    domain: "learn.microsoft.com"
  - title: "Azure global infrastructure — geographies"
    url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/"
    description: "The full map of Azure geographies, regions, and data residency boundaries — the starting point for data sovereignty and region-pair decisions."
    domain: "azure.microsoft.com"
  - title: "OCI regions and availability domains"
    url: "https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm"
    description: "Oracle's reference for OCI regions, availability domain counts per region, and realms. Note that many regions have a single availability domain, and each AD contains three fault domains."
    domain: "docs.oracle.com"
  - title: "OCI — Managing Regions and the home region"
    url: "https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingregions.htm"
    description: "Where Oracle defines home region semantics — the region holding your tenancy’s IAM resources, where users, groups, policies and compartments can be created and updated."
    domain: "docs.oracle.com"
  - title: "Data residency in Azure"
    url: "https://azure.microsoft.com/en-us/explore/global-infrastructure/data-residency/"
    description: "Microsoft's overview of Azure data residency; verify the commitments and exceptions for each service and recovery configuration."
    domain: "azure.microsoft.com"
---

A region choice defines more than a location. It constrains failure isolation, service features and where recovery copies can live. Make the choice against a named business operation and its recovery requirements.

Use the [resilience guide](/resilience) to frame recovery time, recovery point and the failure boundary you need to survive. Then validate the actual services and configurations.

## Choose the failure boundary first

| Boundary | What it separates | What it does not establish |
|---|---|---|
| Instance or host | Individual compute resources | Independent storage, routing or identity |
| Azure availability zone | Datacenter groups within a region | Protection against a complete regional outage |
| OCI availability domain | One or more datacenters isolated from other ADs | Protection against a complete regional outage |
| OCI fault domain | Hardware and infrastructure groupings within an AD | Protection against loss of that entire AD |
| Another region | A separate regional deployment | Automatic application recovery or independent global dependencies |

An Azure zonal resource runs in a selected zone. To tolerate that zone failing, the application needs healthy capacity and its dependencies elsewhere. Zone-redundant managed services distribute resources across zones, but their supported tiers and configuration requirements vary. Azure logical zone numbers can map differently between subscriptions. Check the physical mappings when placement across subscriptions matters. [Microsoft availability-zone documentation](https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview)

OCI regions contain one or more availability domains; verify the count for the chosen region. Each availability domain contains three fault domains. Fault-domain distribution is useful within an AD, but does not turn a single-AD region into a multi-AD deployment. An AD can include multiple datacenters, so avoid describing it simply as one building. [Oracle regions and availability domains](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm)

## A region pair is not a recovery plan

Some Azure regions have a paired region. Others do not. Pairing affects particular platform behaviors and services; deploying in a paired region does not configure application failover. Even when a storage service replicates to another region, compute, networking, permissions, application state and traffic routing need their own recovery design. [Microsoft region-pair guidance](https://learn.microsoft.com/en-us/azure/reliability/regions-paired)

Choose the destination supported by your services and permitted by your requirements. Document how data reaches it, who can activate it, what capacity exists and how users reach the recovered operation. Treat failback as a separate procedure.

## Residency applies to the recovery design too

Record the allowed locations for production records, backups, replicas, logs, keys and support-related processing. A regional resource label alone does not describe every data flow or contractual commitment. Global services and managed backup settings need specific review.

If the workload must remain in one region, zone redundancy and protected recovery points may still be appropriate. They cannot keep the operation available during loss of that entire region. Record that limitation and align the recovery target with the permitted design. [Microsoft guidance on regional constraints](https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview)

Use the [cloud compliance guide](/compliance) to identify questions about placement and protection. It does not replace checking the particular service and contract.

## Validate the whole dependency chain

Two application instances can still share one database, one identity dependency, one deployment pipeline or one route. List what must work for a user to complete the business operation. For each dependency, record its failure scope, recovery mechanism and owner.

A representative recovery exercise should include access to credentials and keys, data consistency, available capacity, traffic changes and a real business transaction. Record elapsed interruption and the age of the recovered data. Restoring a server is only one step. [Microsoft disaster-recovery guidance](https://learn.microsoft.com/en-us/azure/well-architected/reliability/disaster-recovery)

## Before committing to a region

1. Agree the operation, recovery targets and failure scenarios.
2. Verify zone/AD support for each critical service and tier.
3. Check permitted primary and recovery locations.
4. Verify destination features, quotas and capacity.
5. Identify shared dependencies and owners.
6. Exercise recovery and document gaps.

For the service-by-service checks, continue with [Service Availability by Region](/knowledge-base/multicloud/service-availability-by-region-why-you-cannot-trust-the-map).
