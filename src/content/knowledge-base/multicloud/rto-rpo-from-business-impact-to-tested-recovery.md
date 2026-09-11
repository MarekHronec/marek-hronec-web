---
title: "RTO and RPO — From Business Impact to a Tested Recovery Target"
category: multicloud
tags: ["Resilience", "Disaster Recovery", "Azure", "OCI"]
date: 2026-09-11
readTime: 4
level: intermediate
excerpt: "Agree what recovery means for one business operation, then measure time and data loss in a representative exercise."
---

## Start with a business operation

“Recover the database” is a technical step. “Accept an order, reserve stock and issue a confirmation” describes an operation that a business owner can validate. Write down that operation before setting recovery targets. Include the identity service, network, keys, queues and external dependencies it needs.

The **recovery time objective (RTO)** is the target time to restore the operation after disruption. The **recovery point objective (RPO)** expresses how much recent data loss is acceptable, usually as a time interval. These are requirements. A measured exercise supplies evidence of whether a particular design can meet them; buying an SLA does not establish either target. [Microsoft’s business-continuity definitions](https://learn.microsoft.com/en-us/azure/reliability/concept-business-continuity-high-availability-disaster-recovery) distinguish recovery objectives from availability.

## A worked target agreement

Consider an illustrative order service. The owner agrees a four-hour RTO and a fifteen-minute RPO. The clock starts when customers can no longer complete orders, not when the engineer opens the incident ticket.

The exercise runs as follows:

| Event | Time | Elapsed since interruption |
|---|---|---|
| Order submission becomes unavailable | 09:00 | 0 minutes |
| Monitoring identifies the incident | 09:08 | 8 minutes |
| Incident lead authorises recovery | 09:20 | 20 minutes |
| Infrastructure and data restored | 10:35 | 95 minutes |
| Application checks pass | 11:00 | 120 minutes |
| Business owner validates an end-to-end order | 11:20 | 140 minutes |

The observed recovery takes two hours and twenty minutes, leaving one hour and forty minutes against the target. Record that margin without promising it will recur for a larger dataset or a different failure.

Suppose the recovered consistent state contains acknowledged orders through 08:50. The recoverable point is ten minutes before disruption. Compare the actual missing order IDs against the transaction journal; a timestamp alone cannot show that every earlier record is present. Recovering individual stores to different points can also leave an inconsistent business state.

## Specify what must be true at the finish

Agree these acceptance criteria before the exercise:

- Customers can complete the named transaction through its normal entry point.
- Identity, authorisation and required integrations work.
- Recovered records are internally consistent, with missing and duplicated transactions identified.
- Remaining backlog and degraded functions are explicitly accepted by the owner.
- Monitoring and incident ownership operate in the recovery location.

If the agreement requires backlog reconciliation before reopening, include it in the RTO measurement. If a limited service can reopen first, document the limit and a separate deadline for clearing the backlog.

## Keep a target and evidence record

Use this template for each critical operation:

| Field | What to record |
|---|---|
| Scope and owner | Named operation, accountable person, dependency list |
| Failure in scope | Host, zone, region, deletion or another defined event |
| Required targets | RTO, RPO and business reason |
| Measurement boundaries | Exact start event, finish transaction and data checks |
| Exercise conditions | Dataset size, capacity, permissions and excluded dependencies |
| Evidence | Timestamps, recovered point, missing records and validation results |
| Follow-up | Gap, owner, due date and next test |

Retest after changes that affect the recovery path. Start with the [recovery planner](/resilience#recovery-planner), then use the [exercise guide](/knowledge-base/multicloud/recovery-exercise-failover-validation-failback) to turn targets into evidence.
