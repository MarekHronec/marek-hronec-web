---
title: "Run a Recovery Exercise — Failover, Validation and Safe Failback"
category: multicloud
tags: ["Resilience", "Disaster Recovery", "Azure", "OCI"]
date: 2026-09-11
updated: 2026-09-14
readTime: 4
level: intermediate
excerpt: "A practical exercise record for restoring the business operation, checking data and returning safely after a regional outage."
references:
  - title: "Azure Well-Architected — disaster recovery"
    url: "https://learn.microsoft.com/en-us/azure/well-architected/reliability/disaster-recovery"
    description: "Microsoft's guidance on documented plans, named responsibilities and regular drills — the practice this article argues most teams skip."
    domain: "learn.microsoft.com"
  - title: "OCI Full Stack Disaster Recovery — terminology"
    url: "https://docs.oracle.com/en/cloud/iaas/disaster-recovery/cssgm/disaster-recovery-terminology.html"
    description: "Oracle's definitions of switchover, failover and DR drill, which distinguish a planned transition from an unplanned one and from a rehearsal against a replica stack."
    domain: "docs.oracle.com"
---

## Test a named failure and a named operation

A useful exercise has a narrow claim: under these conditions, this operation recovered in this time with this observed data loss. “Disaster recovery passed” leaves too much unspecified.

Start with an isolated environment and synthetic or appropriately protected test data. Identify what the test cannot reproduce. A successful isolated drill does not establish that public traffic, external providers or production identity will behave the same way during an incident.

[Microsoft’s recovery guidance](https://learn.microsoft.com/en-us/azure/well-architected/reliability/disaster-recovery) recommends documented plans, clear responsibilities and regular validation. Treat the runbook as an operational document with an owner.

## Establish prerequisites and stopping conditions

Before starting, confirm:

- The incident lead, recovery operator and business validator are available.
- The alternate location is permitted for the data and dependencies.
- Required services, quotas, capacity, keys and credentials are usable.
- Test endpoints cannot send real payments, notifications or customer traffic.
- Recovery points are available and the original evidence is preserved.
- Abort conditions and the route back to the initial state are understood.

Define how you prevent two writable primaries. A network partition may leave the original service running even when the recovery team cannot reach it. Traffic switching alone does not fence an old writer. Use the database or application’s supported promotion and fencing procedures.

## Worked example: a constrained alternate region

Imagine a test order service whose primary region is unavailable. The approved alternate region can initially serve only half the normal throughput. The business owner agrees that order submission has priority over reporting.

The exercise runbook should be explicit:

| Step | Owner | Evidence |
|---|---|---|
| Declare the simulated outage and start the clock | Incident lead | Timestamp and failure scope |
| Confirm the usable data point and promotion conditions | Data owner | Recovery point, lag and fencing checks |
| Start dependencies and application capacity | Recovery operator | Deployment results and dependency checks |
| Apply the agreed limited-service configuration | Application owner | Reporting disabled; order path prioritised |
| Switch test traffic | Network owner | Route, name resolution and endpoint checks |
| Submit and reconcile test orders | Business validator | Order IDs, duplicates, missing records and latency |
| Declare the agreed operation restored | Incident lead | Finish time and accepted limitations |

Measure whether that reduced capacity meets the agreed recovery acceptance criteria. Do not silently call a slow, incomplete operation “recovered” because its health endpoint returns success.

## Failback is a separate change

After the primary location becomes usable, the recovered location may hold the newest writes. Reopening the old primary without synchronising and validating data can lose work or create conflicting histories.

Plan the direction of data synchronisation, the write cutover, traffic movement and rollback conditions. Validate the business operation again after returning. Keep recovery protection active while locations change roles.

Oracle Full Stack Disaster Recovery distinguishes planned switchover, unplanned failover and drills that create a replica application stack for validation. Their prerequisites and effects differ; consult the [Oracle terminology and concepts](https://docs.oracle.com/en/cloud/iaas/disaster-recovery/cssgm/disaster-recovery-terminology.html) for the workflow you actually use.

## Publish the result with its limits

Record required RTO/RPO alongside measured interruption, recoverable point, missing transactions, achieved throughput and time to clear the backlog. List exclusions, manual decisions and any temporary access grants. Assign an owner and due date to every gap, then schedule the next representative exercise.

Use the [recovery planner](/resilience#recovery-planner) to prepare requirements and the [cost guide](/cost) to budget for standby resources, retained data and the exercise itself.
