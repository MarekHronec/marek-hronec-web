# X1c — Cross-article consistency across the 28 non-compliance articles

Reviewer: Sonnet (research agent), reported 2026-09-14. **Reviewer did not edit any file.**
Verified and applied by Opus the same day. Closes the last item X1 left open.

Scope: every article outside `compliance/` — 28 files, ~51,400 words. These were each
audited individually in B6–B8; what they had never had was a pass comparing them *against
each other*.

Reviewer totals: **2 WRONG, 1 STALE (nine locations), 3 INTERNAL, 0 UNVERIFIED.** All six
verified independently and applied.

---

## The mechanical half said the batch would be empty. It was not.

Before dispatching, I extracted every fact restated in more than one of these articles, the
same method X1 used — but retuned, because a technical article restates a different shape of
fact than a compliance article. The result argued for closing the item without a batch:

| Extraction | Result |
|---|---|
| Numeric measures recurring across articles | **5**, and all five are coincidences of number rather than one fact restated twice — "12 months" is a documentation review cadence in one article and Azure's free tier in another; "18 months" is CCoE drift and sandbox lifetime; "30 minutes" is a wait-for-vendor window and a question turnaround |
| SLA percentages recurring | **0** |
| CIDR prefixes | Confined to the two addressing articles, already audited in X1b |
| RTO / RPO | Defined in exactly one article; the other three use them consistently and cross-link to it |
| `CIS Landing Zone` → `OCI Core Landing Zone` | Fully propagated; every remaining mention is correctly historical |

So the numeric and definitional surface was genuinely clean, and X1's reviewer had been right
to judge that these articles rarely restate a fact. **The mistake would have been to stop
there.** Retargeting the batch at what technical articles actually drift on — product names
and service behaviour — produced six findings, one of them the widest-reach defect of the
whole audit.

## STALE — a product rename the corpus missed for eleven months

Oracle renamed the entire Autonomous Database line on **14 October 2025**. Its own release
note:

> "As a result, Oracle Autonomous Database becomes **Oracle Autonomous AI Database**.
> Additionally, Oracle Autonomous Transaction Processing is Oracle Autonomous AI Transaction
> Processing, and Oracle Autonomous JSON Database is Oracle Autonomous AI JSON Database."

The release note sits under the *Dedicated* documentation, so I checked whether it reaches the
Serverless flavour that the articles actually mean. It does: Oracle's serverless guide is now
titled *"Using Oracle Autonomous AI Database Serverless"*.

The corpus used the retired name as current in **nine places across six articles**, none of
them historical. All nine updated, with the rename noted once — in the article that mentions
the product most — rather than nine times.

**The reviewer widened its own brief here, correctly.** My brief listed the term by its exact
phrase count, "OCI Autonomous Database (2)". The reviewer pointed out that the instruction was
to check whether the *name* is current, not to stay inside one phrasing, and found the bare
"Autonomous Database" form in four further articles. It reported the full scope and said why.

## WRONG — two citations that do not describe their page

Both are the failure X3 and X1b already found, now at five instances in three days.

**1. A citation naming the wrong product.** The source-of-truth article cited
`Content/Search/Concepts/queryoverview.htm` as *"OCI Search with OpenSearch — resource query
overview"*. That page opens:

> "Use Search to find resources within a tenancy, Console pages in services, and documentation
> within the Oracle Cloud Infrastructure getting started and user guides."

It is the plain OCI **Search** service and never mentions OpenSearch. *OCI Search with
OpenSearch* is a real but entirely different product — a managed OpenSearch engine. The URL
and the description were both right; only the title had the wrong product bolted on. The
body prose of all three articles that touch this topic says plain "OCI Search", so the error
was isolated to the reference block.

**2. A citation pointing at a retired repository.** The landing-zone article cited
`oracle-quickstart/oci-cis-landingzone-quickstart` as *"Oracle's reference implementation for
the OCI Core Landing Zone"*. That repository's README:

> "This repository is the official home of the CIS Compliance Script. The CIS Landing Zone
> Terraform configuration, is retired as of May 2025… Users looking for a deployment
> experience similar to CIS Landing Zone should now use OCI Core Landing Zone."

So the citation described the retired thing as the current thing — **while the same article's
own body, forty lines below, gets the history right.** Repointed to
`oci-landing-zones/terraform-oci-core-landingzone`.

## INTERNAL — three body/summary disagreements, from the rule promoted this morning

Protocol item 5 was promoted from bulk-edit discipline to reviewer instruction earlier today,
on the strength of two instances. This batch is the first to run with it, and it found three
more in a single pass — which settles the question of whether promoting it was worth doing.

| Article | Body says | Summary said |
|---|---|---|
| `introduction-to-bpm-solutions` | Kogito "is no longer developed as a standalone project: the `kogito-runtimes` repository is **archived**" | The comparison table rated its maturity as "Younger / narrower ecosystem" and the checklist advised evaluating "ecosystem maturity" — neither mentions that the standalone project is gone |
| `how-to-learn-azure-and-oci-without-stale-lists` | "**Microsoft is annual**… Fundamentals-level ones do not expire at all. **Oracle and the CNCF … roughly two years**" | The excerpt: "Certification names expire in 18–24 months" |
| `status-pages-service-health-things-they-wont-show` | "typically **15–60 minutes**" | The excerpt: "The green dot lags reality by 30+ minutes" |

The certification one is the worst for a reader: the excerpt's 18-month floor matches **no**
cadence the body describes, and someone reading only the excerpt would think a Microsoft
role-based certification is safe for a year and a half when it expires at twelve months.

The status-page excerpt had quietly promoted a worst-case anecdote — the "all green for the
first 30+ minutes" line from a passage about historical major outages — into the article's
general rule.

Kogito's archival independently confirmed through the GitHub API: `archived: true`,
description *"Kogito Runtimes has moved to … incubator-kie-drools. This repository is
archived."*

## What checked out

Nineteen product names and nine acronyms checked for currency; **eighteen and nine current**,
with Autonomous Database the sole rename. Worth recording individually because a clean result
on a name we deliberately checked is the point of the exercise: Azure Policy, Azure Arc, Azure
DevOps, Azure Firewall, Azure Local, Azure Monitor, Azure Resource Manager, Azure Resource
Graph, Azure SQL, Azure Verified Modules, Microsoft Defender, Microsoft Fabric, OCI Core
Landing Zone, OCI Search, OCI Budgets, OCI Cloud Guard, OCI DRG, OCI Logging; and AVM, ALZ,
EPAC, DINE, OKE, AKS, CAF, ZPR, ZTLZ.

`Azure Local` was flagged in the brief as a likely trap, since it is a recent rename of Azure
Stack HCI and earlier articles might still use the old name. **Zero occurrences of "Azure
Stack HCI" anywhere in the 28 articles** — that propagation was already complete.

Behavioural agreement also held: Azure Policy is described consistently across all eight
articles that mention it, including an evaluation-order passage that matches Microsoft's docs
exactly; Azure Resource Graph and OCI Search are consistently described as permission-scoped,
coverage-limited inventory tools in all three articles each.

One positive worth recording: the reviewer suspected the OCI Always Free Arm figures were
stale, checked, and found the corpus **already correct past a real mid-2026 vendor change** —
Oracle halved the Ampere A1 allowance on 15 June 2026 and the article reflects it.

## Notes on the reviewer

It checked the brief rather than trusting it, confirmed the pre-verified list I handed it by
independent observation, and found the one place my framing was too narrow — then widened
scope deliberately and explained the reasoning instead of quietly doing it. It resolved two
403/404 fetches with follow-up searches rather than filing them as UNVERIFIED, and reported
two suspicions that it checked and refuted.

Zero findings were rejected on verification. That is the first batch of the audit where every
finding survived.
