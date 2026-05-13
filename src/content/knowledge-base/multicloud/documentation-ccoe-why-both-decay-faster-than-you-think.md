---
title: "Documentation, the CCoE, and Why Both Decay Faster Than You Think"
category: multicloud
tags: ["Azure", "OCI", "Documentation", "CCoE", "ADR"]
date: 2026-04-30
updated: 2026-05-13
readTime: 11
level: intermediate
excerpt: "Documentation rots. CCoEs drift to meetings. The fix is treating docs as a maintained product and the CCoE as an enabling team with a real charter."
references:
  - title: "Cloud Center of Excellence — CAF"
    url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/organize/cloud-center-of-excellence"
    description: "Microsoft's definition of the CCoE model: its purpose, team composition, responsibilities, and how it differs from a traditional central IT function."
    domain: "learn.microsoft.com"
  - title: "Diátaxis — a documentation framework"
    url: "https://diataxis.fr/"
    description: "A widely-adopted framework for structuring technical documentation into four distinct types (tutorials, how-tos, reference, explanation) — the foundation for writing docs that resist decay."
    domain: "diataxis.fr"
  - title: "Lightweight Architecture Decision Records — Thoughtworks Radar"
    url: "https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records"
    description: "The Thoughtworks Technology Radar entry for ADRs — the technique for capturing architectural decisions as short, versioned documents that stay useful long after the decision is made."
    domain: "thoughtworks.com"
---

Two things every cloud organisation produces and underinvests in: documentation and the Cloud Center of Excellence. Both are visible from the start, both are talked about constantly, both decay faster than anyone budgets for. Six months in, the docs are out of date and the CCoE has become a meeting series.

Neither failure mode is inevitable. Both require treating these as maintained capabilities, not artifacts. Capabilities decay unless maintenance is explicitly budgeted as part of their operating model. This article is about what to build, how to operate it, and how to keep it from rotting.

## Documentation — the categories that matter

Cloud documentation breaks into five categories. They have different audiences, different lifecycles, and different decay rates.

**Architecture decision records (ADRs).** Long-lived, narrative documents that capture a decision and its context: why we chose Azure over GCP for this workload, why we picked one VPC topology over another, why we are using OCI Autonomous Database despite the lock-in. ADRs should be treated as append-only decision records; when decisions change, new ADRs supersede prior ones rather than rewriting history. Decay rate: low, but the *applicability* fades as the world changes.

**Runbooks.** Step-by-step procedures for operational tasks: how to rotate a key, how to recover from a regional failover, how to onboard a new workload. High-decay because the underlying procedures change as services evolve. Should be tested regularly and updated when they fail.

**Reference architectures.** Diagrams and descriptions of canonical patterns — what a "standard payments workload" looks like, what a "secure data lake" looks like. Updated when the canonical pattern changes; otherwise stable.

**Service catalogue / standards.** What services are approved, which versions, with what configuration baselines. High-decay because the cloud catalogue keeps changing.

**Troubleshooting guides.** "Symptom X means cause Y; here is the fix." Built incrementally from incidents. Useful when current; useless when stale because the symptom may have a different cause now.

The mistake most teams make: treating these all the same way, in the same wiki, with the same review cadence. They have different needs.

## Where documentation actually lives

Pick locations carefully. Documentation that lives in the wrong place becomes invisible.

| Type | Lives in | Owned by |
|---|---|---|
| ADRs | The repo with the code/IaC the decision affects | The team that owns the code |
| Runbooks | The on-call team's wiki, indexed in PagerDuty/Opsgenie | The on-call team |
| Reference architectures | A central knowledge base (Confluence, Notion, internal site) | The platform team / CCoE |
| Service catalogue | Backstage, plus a wiki for narrative | The platform team |
| Troubleshooting guides | The on-call team's wiki | The on-call team |

The principle: documentation lives next to the code or system it describes, owned by the team that operates that code or system. Centralised wikis become graveyards because nobody owns them.

The exception: cross-cutting documentation (CAF/landing-zone reference, organisational standards, "how we do cloud here") lives in a central location because no single team owns it. This is the platform team's beat, and it should be a small set of documents that *are* maintained, not a sprawling wiki that *is not*.

## The decay problem

Documentation decays. The decay is invisible until you need it. The team that needs the runbook at 3am during an incident discovers it is six months out of date and the procedure has changed.

Three patterns that fight decay:

**Documentation tied to code.** ADRs in the same repo as the code, runbooks that include code snippets that are tested in CI, reference architectures with associated IaC modules. When the code changes, the docs are visibly stale because the snippets break.

**Tested runbooks.** Run the disaster recovery runbook quarterly. Run the onboarding runbook every time someone new joins. Run the key-rotation runbook every cycle. Runbooks that are never executed are theoretical; runbooks that are executed find their breakages.

**Date stamps with explicit review cadence.** Every document has a "last reviewed" date and an "owner." Documents older than 12 months without a review are flagged. A dashboard shows the most-stale documents owned by each team. The team has a quarterly chore: review the staleness list, update or retire.

Without these patterns, the docs that matter most decay first because they are the ones you do not look at until you need them — and by the time you need them, you are already in a crisis.

:::tip[Architectural Pro Tip]
Documentation rot is usually a governance failure disguised as a tooling problem — rot happens when there is no ownership, no review process, and no consequence for stale content. For engineering-owned technical documentation, docs-as-code in Git provides exactly those controls: reviewability, explicit ownership, and change history. For operational content used broadly across mixed teams, the right platform is one that enforces review discipline while remaining accessible to non-engineering audiences. The tool is a means; the governance is the point.
:::

## Cloud Center of Excellence — the version that works

The Cloud Center of Excellence (CCoE) is a team or a coordinating function whose job is to make cloud adoption sustainable. The shape varies. The version that works has a small, clear charter:

**1. Define and own the platform standards.** Naming conventions, tagging schema, policy baselines, allowed regions, allowed services. The CCoE writes these and publishes them.

**2. Run the landing zone and platform services.** Subscription/compartment vending, hub networking, central observability, IAM federation. The platform team is the operational arm of the CCoE for these services.

**3. Enable workload teams.** Office hours, internal training, paired sessions for new workloads onboarding. Lower friction for teams who want to do the right thing.

**4. Steward the architecture review process.** New workloads above a complexity threshold get reviewed against the standards. The review is supportive, not gatekeeping — fast no, faster yes.

**5. Maintain the cross-cutting documentation.** The reference architectures, the platform docs, the "how we do cloud here" guidance.

That is the job: a deliberately constrained set of responsibilities. The function should remain intentionally small relative to its remit; scale through enablement and automation rather than headcount.

The version that does *not* work:

- **CCoE as a committee.** Meetings, slides, no execution. Standards proposed and never enforced. After a year, the CCoE is a meeting series with no output.
- **CCoE as a gatekeeper.** Architecture reviews that block instead of enable. Workload teams route around the CCoE because it is faster than going through it. The CCoE complains about lack of compliance; the teams complain about lack of speed. Both are right.
- **CCoE as a lone hero.** One person hired to "lead cloud" with no team, no authority, no budget. The role becomes performative because there is nothing to back it up.
- **CCoE without a platform team.** Standards without an operational arm. Documents nobody implements.

The pattern that works has explicit authority over the platform, explicit budget for the team, explicit charter, and an explicit relationship to the workload teams. Without these, the CCoE drifts.

## Office hours — the highest-leverage CCoE activity

The single highest-leverage CCoE activity is weekly office hours. Open to anyone, calendar-published, drop-in. A workload team brings a question, an architecture, a problem. The CCoE engineer working that hour helps in real time.

What office hours produce:

- Workload teams get unblocked faster. The question that would have taken two weeks of email gets answered in 30 minutes.
- The CCoE sees the actual problems teams are hitting. Pattern recognition across teams informs the next round of platform improvements.
- Trust builds. Teams come back. The CCoE stops being a roadblock and becomes a resource.

What office hours cost: 2–4 engineer-hours a week. The leverage comes from preventing repeated mistakes before they scale across teams.

The variant that works less well: office hours staffed by junior engineers who can answer simple questions but not architectural ones. The hour becomes triage, not engagement. Staff office hours with senior people; the time is well spent.

## The CCoE-vs-platform-team distinction

These are sometimes the same team and sometimes different. The distinction:

- **CCoE** sets the standards, runs governance, owns the architecture review function.
- **Platform team** operates the landing zone, vends subscriptions, runs the central network, manages the IAM federation.

In small orgs, one team does both. In bigger orgs, they split. The CCoE typically reports closer to architecture or strategy; the platform team reports closer to engineering or operations.

The split that works has tight communication. The CCoE writes the policy that the platform team enforces. The platform team feeds operational signal back into CCoE planning. Without the loop, you get standards that cannot be operationalised, or operations without strategic direction.

:::warning[Reality Check]
CCoEs founded with great enthusiasm and a large remit typically drift into ineffectuality within 18 months. The pattern is consistent: the team is small, the remit is huge, the political support is mid-level, and the workload teams develop habits of routing around the CCoE because it is slow. By the time the CCoE realises the workloads have stopped engaging, the damage is done. The fix is not "more authority" — it is a smaller charter, a faster cycle time, and a focus on enablement over enforcement. CCoEs that expand scope faster than execution capacity lose credibility; CCoEs that pick five things and execute them visibly gain it.
:::

## Multicloud factor

Multicloud documentation and CCoE require explicit framing. Most documentation pretends to be cloud-agnostic and is implicitly Azure-shaped (or OCI-shaped, depending on which cloud the author works with most). New team members reading this confuse Azure-isms for general truths.

The discipline:

- Every cross-cutting document explicitly states whether it is Azure-specific, OCI-specific, or shared.
- Cloud-specific patterns live in cloud-specific sections.
- The shared sections are genuinely shared — no Azure-shaped assumptions sneaking in.

The CCoE charter for multicloud is to maintain the *intent* across both clouds and document the *implementation* per cloud. The unified shared layer is the contract; the cloud-specific layers are the implementations.

In multicloud, intent is designed once, but implementation often diverges by cloud. The discipline is worth it because the alternative — Azure CCoE and OCI CCoE running independently — produces conflicting standards within a year.

## Closing checklist

- Treat documentation as a maintained product with explicit governance: named owners, review cadence, and accountability for stale content. Format follows governance requirements — not the other way around.
- Documentation that nobody owns is documentation that will be wrong when you need it. Ownership is the bedrock.
- Differentiate the categories: ADRs, runbooks, reference architectures, service catalogue, troubleshooting. Each lives in a different place and decays at a different rate.
- Test runbooks regularly. Untested runbooks are theoretical.
- Date-stamp every document with last-reviewed and owner. Run a quarterly staleness review.
- A working CCoE has a small charter, executes it visibly, has authority and budget. CCoEs that expand scope faster than execution capacity lose credibility.
- Office hours are the highest-leverage CCoE activity. Senior engineers, weekly, drop-in.
- Distinguish the CCoE (sets standards) from the platform team (operates the landing zone). Tight communication between the two.
- For multicloud, label every cross-cutting document by cloud applicability. Shared content is shared deliberately, not by accident.
