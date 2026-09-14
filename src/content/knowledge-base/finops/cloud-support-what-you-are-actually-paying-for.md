---
title: "Cloud Support — What You Are Actually Paying For"
category: finops
tags: ["Azure", "OCI", "FinOps", "Cost Management"]
date: 2026-04-30
updated: 2026-09-14
readTime: 4
level: intermediate
excerpt: "Distinguish initial response from recovery, check the support entitlement and budget the operating work your team still owns."
references:
  - title: "Azure support plan comparison"
    url: "https://azure.microsoft.com/en-us/support/plans/"
    description: "Microsoft's own tier comparison, and the source for the severity and response-time commitments quoted below — including that Unified Enterprise uses Severity 1 terminology rather than Severity A."
    domain: "azure.microsoft.com"
---

## Response is the beginning of the incident

A support response target tells you when the provider aims to engage under the plan’s conditions. It is not a promise that your application will be restored within that interval.

Compare the target with your own incident process: detecting the problem, opening the case, supplying evidence, applying changes and validating the business operation all take time. A provider engineer may need input from someone who understands your application.

## Read the current Azure comparison carefully

As reviewed on 11 September 2026, Microsoft’s [support-plan comparison](https://azure.microsoft.com/en-us/support/plans/) distinguishes these cases:

| Plan | Relevant distinction |
|---|---|
| Basic | Billing and subscription support; no technical break-fix access |
| Developer | Non-production focus; Severity C response within eight business hours |
| Standard | Severity A initial response within one hour |
| Professional Direct | Severity A within one hour; guidance from a pool of delivery managers |
| Unified Enterprise | Azure Severity 1 within fifteen minutes; distinct from Severity A |

Do not describe Developer as providing Severity A coverage, Standard as a queue-dependent one-to-two-hour contractual target, or ProDirect as a guaranteed named individual. Check the actual agreement, severity conditions, availability obligations and current pricing before purchase.

## Compare entitlements rather than tier names

For any provider—including OCI—request the support terms attached to the service and contract. Establish the supported components, hours, languages, severity definitions, escalation route and exclusions. A product subscription, enterprise support contract and separately purchased advisory service can have different scopes.

Use a short evaluation record:

| Question | Evidence needed |
|---|---|
| Can the right person open the case during an outage? | Tested account access and delegated permissions |
| Which component is covered? | Service and software support scope |
| What does “response” mean? | Initial response definition and customer participation conditions |
| How is severity agreed? | Business impact criteria and escalation procedure |
| Who applies and validates changes? | Internal owner or explicit service-provider responsibility |
| What is the recurring cost? | Current offer, billing basis, tax and contractual inclusions |

Do not infer an included entitlement or a response time from another customer’s arrangement.

## Budget the work on your side

Consider an illustrative overnight failure in an order service. Monitoring raises an alert at 02:00. Your engineer needs to establish impact, collect correlation IDs and decide whether to fail over while a provider investigates.

The support plan can help diagnose the provider-side issue. Your team still needs authority to switch traffic, interpret missing orders, communicate with stakeholders and decide when the operation is usable. Those responsibilities should already be assigned.

Estimate time and tools for incident coverage, patching where applicable, application upgrades, access reviews, backup validation and recovery exercises. When comparing a managed service with a self-operated platform, allocate each task once to whoever actually performs it.

## Prepare an incident pack

Keep the service inventory, dependency map, severity criteria, escalation contacts and evidence checklist available through an access path that survives the planned failure. Avoid copying credentials into the document. Practise opening a test or non-urgent case through the supported route.

Use the [platform guide](/platform) to review what remains your responsibility, then the [recovery guide](/resilience) to test the complete operation. Include both provider support and your operating effort in the [cost checklist](/cost#cost-planner).
