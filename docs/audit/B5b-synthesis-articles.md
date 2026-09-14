# Batch B5b — Overview and decision framework

Reviewer: Sonnet (research agent), reported 2026-09-13. **Reviewer did not edit any file.**
Verified and applied by Opus the same day.

Articles: `cloud-data-security-eu-national-frameworks-overview` · `cloud-compliance-decision-framework`

Reviewer totals: 12 INTERNAL, 1 UNVERIFIED, 1 external check (correct), ~14 checked-and-correct.

**Verification result: all 12 internal contradictions confirmed by reading both sides.
Nothing mischaracterised.** One finding exposed a contradiction inside an article audited
back in B1.

---

## Why this batch was almost entirely internal

These two are synthesis pieces. They tabulate and cross-reference claims that other
articles own, and they were written before those owners were corrected. The brief told
the reviewer to grep the corpus rather than the web, and that where the two sides disagree
the audited owner is almost certainly right. That held: **zero WRONG findings from
fetches**, twelve internal contradictions, and the one claim owned by nobody (Gaia-X's
Porto Summit catalogue figures) checked out externally.

This is the shape X1 was created for, arriving early because these two articles are
themselves aggregators.

## The findings

| # | Contradiction | Owner | Verdict |
|---|---|---|---|
| 1 | U1–U4 relied on with no mention of the 1 Jan 2027 repeal, in **10 places** across both files | `slovakia-ksvc-mirri-government-cloud` L68 | **Confirmed** |
| 2 | ENS has 74 controls | Spain article: 73 (4 org + 33 op + 36 mp, counted from the BOE XML in B3b) | **Confirmed** |
| 3 | Authenticity and traceability are the "fifth and sixth" dimensions | Spain article: there are **five** dimensions, so they are the fourth and fifth | **Confirmed** |
| 4 | Bleu presented as a live SecNumCloud route, 3 places | France, EU-native and sovereign-products articles all agree Bleu is unqualified | **Confirmed** |
| 5 | AWS listed as an EU Cloud Code of Conduct adopter | `gdpr-article-28-and-eu-cloud-code-of-conduct` L117: "**AWS is not on this register**" | **Confirmed — and the owner contradicts itself, see below** |
| 6 | CTPP designation framed as hypothetical | CTPP article: 19 designated 18 Nov 2025 | **Confirmed** |
| 7 | Dutch tiers routed to BBN1/BBN2 | `netherlands-bio2-baseline` L84: "BIO2 abolished the BBNs" | **Confirmed** |
| 8 | "ENS High" instead of Alta | Spain article uses Alta throughout | **Confirmed, and a third occurrence found in a fourth article** |
| 9 | EUCS narrative silent on the CADA pivot | `eucs-watch-political-tracking-2026` L117: "Watch those two instruments, not the EUCS drafting process" | **Confirmed** |
| 10 | Adjacent-jurisdiction section predates the UK, Swiss and Norwegian corrections | Those three country articles | **Confirmed** |
| 11 | "Full ISO stack including 27701" implies a dependency chain | ISO article L90: "27001 is no longer a prerequisite" | **Confirmed** |
| 12 | Act 215/2004 cited as the basis for personal data | Slovakia article L114 puts it at U4 as the classified-information statute; the personal-data law is Act 18/2018 | **Confirmed** |

## The one that mattered most

Finding 4 is the only one where the error would have changed what a reader *does*. Worked
example 3 routes a French defence-adjacent SaaS provider to "sovereignty-grade cloud
(Bleu, S3NS, OVHcloud, 3DS Outscale)" — four names in a flat list, one of which cannot
satisfy the requirement the sentence is about. A reader following that decision tree would
shortlist an unqualified provider for exactly the workload class where qualification is
mandatory.

Stale prose is a nuisance. A decision tree that routes to the wrong instrument is a defect,
and it is worth weighting these articles' findings accordingly in future passes.

## A contradiction inside an already-audited article

The reviewer noticed that the *owner* of the EU Cloud Code of Conduct claim disagrees with
itself:

- L117: "**AWS is not on this register.** It adheres to a different Article 40 instrument,
  the **CISPE Data Protection Code of Conduct** … pointing at the wrong register is a fast
  way to lose credibility in a supplier assessment."
- L200, closing checklist: "Adopted by AWS, Microsoft Azure, Google Cloud, IBM, Oracle,
  SAP, Salesforce, Alibaba, and many others."

The body is a deliberate, explained correction; the checklist is a stale summary bullet
that nobody updated when the body was fixed. That article was audited in **B1**. So a
correction can land in an article's body and leave its own checklist contradicting it —
a variant of the partial-application failure, discovered from outside rather than inside.
Both are now fixed, along with the propagation into the overview.

## Found while applying, not in the report

- A **third** "ENS High" in `hyperscaler-eu-data-boundary-commitments`, which was not in
  this batch's scope. Fixed.
- A **third** overview location for the Slovak U-scheme gap, in the closing checklist. The
  reviewer had already added this one itself, having been given only two.

## Not applied

- **UNVERIFIED — CCN-STIC 800 updated June 2025** (overview NIS2 table, Spain row). The
  Spain article does not carry this sub-claim, so nothing in the repo confirms or
  contradicts it. This is the same item left open in B3b, where `ccn-cert.cni.es` served a
  bot check to curl and 403'd WebFetch. Still needs a browser session against CCN's STIC
  800 revision history.

## Notes on the reviewer

The best-calibrated report of the audit so far. It quoted both sides of every
contradiction with file paths and line numbers, so verification was reading rather than
re-research. Three things worth recording:

- It **checked its own instructions against reality**: given seven Slovak locations, it
  found and reported an eighth.
- It **distinguished silence from contradiction**, explicitly noting that several
  corrections on the established list produce no finding because these articles simply
  never mention them. That is the right call and it is rarer than it should be.
- It **flagged a defect in the owning article** rather than assuming the owner was right
  because the brief said owners are usually right.
