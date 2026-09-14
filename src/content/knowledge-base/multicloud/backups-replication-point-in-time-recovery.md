---
title: "Backups, Replication and Point-in-Time Recovery — Three Different Jobs"
category: multicloud
tags: ["Resilience", "Disaster Recovery", "Azure", "OCI"]
date: 2026-09-11
updated: 2026-09-14
readTime: 4
level: intermediate
excerpt: "Separate live copies from recoverable history, choose a clean point and reconcile the valid work that came later."
references:
  - title: "Azure — redundancy, replication and backup"
    url: "https://learn.microsoft.com/en-us/azure/reliability/concept-redundancy-replication-backup"
    description: "Microsoft's own statement that replication is not backup: it synchronises every change, so a deletion propagates to all replicas."
    domain: "learn.microsoft.com"
  - title: "Azure SQL — recovery using automated backups"
    url: "https://learn.microsoft.com/en-us/azure/azure-sql/database/recovery-using-backups?view=azuresql"
    description: "Point-in-time restore mechanics, including that it creates a new database on the same server and does not support cross-server, cross-subscription or cross-geo restore."
    domain: "learn.microsoft.com"
---

## A second live copy answers only part of the question

Replication keeps another copy close to the current state. That can help service continuity when infrastructure fails. It can also carry an accidental deletion or harmful update to the other copy.

Backups preserve recoverable states according to their retention and protection settings. Point-in-time recovery uses the selected service’s backup and logging mechanisms to recover to a supported point within its available history. None of these names alone establishes isolation, immutability or recovery time. [Microsoft’s overview](https://learn.microsoft.com/en-us/azure/reliability/concept-redundancy-replication-backup) explains why live redundancy and retained history serve different purposes.

## An illustrative deletion

At 10:00, a mistaken administrative operation deletes a set of customer accounts. The live replica applies the same deletion. At 10:25, the team detects missing accounts; meanwhile, customers have placed valid orders.

Returning the entire database to 09:59 might recover the accounts while removing those later orders from the restored state. Copying every later change back would risk replaying the deletion. Recovery therefore needs two decisions: select a known-good point and identify which subsequent changes are safe to reconcile.

A practical exercise can use synthetic customer and order records:

1. Record a known starting state and a transaction journal.
2. Introduce a controlled bad change in the isolated test system.
3. Identify when corruption began, allowing for uncertainty in discovery.
4. Restore a supported clean point to a separate target.
5. Validate accounts, orders, references and application behaviour together.
6. Reconcile only verified legitimate changes. Check for duplicate effects.
7. Measure the full process, including investigation and validation.

Do not run that exercise against production data without an approved scope and protection plan.

## Check the selected service

For example, Azure SQL Database supports point-in-time restoration to a new database, subject to its available backup history and restore constraints. That does not automatically move application connections or reconstruct external side effects. Check the current [Azure SQL restore documentation](https://learn.microsoft.com/en-us/azure/azure-sql/database/recovery-using-backups?view=azuresql) for the actual database type and restore operation.

Restoring a database does not retract an email, reverse an external payment or remove a message already delivered to another system. Those effects need application-specific reconciliation.

## Build a protection checklist

| Question | Evidence to retain |
|---|---|
| Which failures does this copy cover? | Infrastructure boundaries and deletion/corruption test |
| How far back can we recover? | Actual available history, retention policy and oldest tested point |
| Who can delete or shorten that history? | Effective permissions and any retention-lock configuration |
| Can a compromised production identity damage the copies? | Tested access separation and administrative recovery path |
| Are keys and credentials available during recovery? | Key access test in the recovery environment |
| Do multiple stores agree after restore? | Cross-store consistency and business validation checks |
| How long does recovery take at representative size? | Timed restore, reconciliation and application reopening |

Immutability can protect retained data against modification for a configured period; it does not prove that the retained state was correct or that the application can use it. Confirm the chosen service’s guarantees and configuration.

Use the [RTO and RPO agreement](/knowledge-base/multicloud/rto-rpo-from-business-impact-to-tested-recovery) to decide how much history and how much recovery speed the business needs. Include retained copies, retrieval, temporary restore capacity and exercises in the [cost checklist](/cost#cost-planner).
