# Batch B7d — Operating model and learning

Reviewer: Sonnet (research agent), reported 2026-09-14. **Reviewer did not edit any file.**
Verified and applied by Opus the same day. **Completes B7 and all long-form content batches.**

Articles: `bpm/introduction-to-bpm-solutions` ·
`multicloud/how-to-learn-azure-and-oci-without-stale-lists` ·
`multicloud/documentation-ccoe-why-both-decay-faster-than-you-think`

Reviewer totals: 1 WRONG, 3 STALE, 2 UNVERIFIED, 0 INTERNAL, 2 reference-body mismatches,
~20 checked-and-correct.

**Verification result: all findings confirmed.**

---

## The primary target came back clean

The BPM article's three dated lifecycle claims were the reason this batch existed, because
someone picks a workflow engine on them. All three are correct, including tense:

| Claim | Camunda's own text |
|---|---|
| 7.24 is the final feature release | "Camunda 7.24 LTS … is the last minor release of Camunda 7. No new feature-adding releases of Camunda 7 will be built anymore" |
| Community Edition updates ended October 2025 | "After this date, no further releases, including security patches, will be made for Camunda 7 Community Edition" |
| Enterprise supported through 2030 | "New EoL Date: April 9, 2030" |

The reviewer added a nice observation: the October 2025 cutoff has now passed, and the
article's present-tense framing was written after it, so **the passage of time made the
wording more accurate rather than less**. It also caught that Camunda's own two pages
disagree by four days on the enterprise end date, and correctly judged that irrelevant to a
claim that says "through 2030".

## What was wrong

**A certification cadence that is wrong for the vendor the article leads with.** The
article said refresh "roughly every two years". Microsoft's renewal page: a "Six-month
renewal window", passing "will be extended one year from the expiration date", and the page
itself calls this "the annual renewal process". Fundamentals-level certifications do not
expire at all.

Two years is right for Oracle and for the CNCF Kubernetes certifications, which is what
makes this the interesting kind of error: a rule that is true of some vendors, stated as
though it were true of all, in an article whose stated baseline is Microsoft Learn.

**A project that stopped existing independently seven weeks before the audit.** Kogito's
runtimes repository is archived — confirmed through the GitHub API, not inference — and the
code now lives in the Apache KIE incubator monorepo with Drools, jBPM and OptaPlanner. The
article's framing of it as young and improving was true when written.

The reviewer handled this well: it did **not** call the technology dead. It is consolidated,
not abandoned, and the article now says exactly that, while pointing readers at Apache KIE's
activity rather than Kogito's own site, whose getting-started guide still specifies JDK 11
for a stack that requires Java 17.

**A specification URL pointing at an archival version.** The cited BPMN 2.0 page carries
OMG's own notice that it "was superseded by a newer inventory". Following the chain, 2.0.2
carries no supersession notice and is the current formal text. Low practical severity, since
the notation is unchanged across 2.0.x, but the cited page announces its own obsolescence.

## Two more references that support nothing

Sixth batch running. Both found by the reviewer grepping each article's body for its own
referenced term:

- **Flowable** appears three times in the BPM article, all in frontmatter, never in the body
  — in an article whose entire purpose is comparing engines.
- **Diátaxis** appears twice in the documentation article, both in frontmatter. That article
  builds its own five-category taxonomy and never maps it to Diátaxis's four types.

Both reframed as further reading. The Flowable entry now notes it is the most actively
developed of the open-source Java engines, which the reviewer established from the GitHub
API: not archived, pushed the day of the audit, 9,537 stars.

## A table that undercut its own prose

The competency matrix defines four levels — aware, working, proficient, expert — and the
example table used only three. **"Proficient" never appeared once**, while the surrounding
text explains how to read "multiple proficient" people off the matrix. Fixed, and the header
row realigned to the widened columns.

Small, but it is the kind of thing that makes a reader distrust the rest: the illustration
cannot demonstrate what the prose says to look for.

## Not applied

- **Microsoft ESI eligibility mechanism.** The 50% voucher figure is corroborated, but the
  specific "Enterprise Agreement with Software Assurance" gate could not be confirmed
  against Microsoft's own text — the portal is a sign-in-gated single-page app with no
  extractable content. Left as written.
- **The Flowable "continuation of Activiti 5" framing.** Historically accurate, and the
  reviewer flagged honestly that its 0-hit grep on Flowable's own site was inconclusive
  because the page renders from embedded JSON. Correctly downgraded rather than asserted.

## Notes on the reviewer

**The first reviewer in five batches to find no error in my brief** — and it said so
explicitly, having checked the line number, the reference counts, the "~54 other articles"
figure and whether any inline body URLs existed beyond frontmatter. Reporting that the
instructions were right is as useful as reporting that they were wrong; it means the check
happened.

It also declined the bait a second time. My brief mentioned prior batches' reference defects
and told it not to treat them as expected. It found two anyway, and stated plainly that both
were "genuine, independently observed via grep — not manufactured to match the brief's hint".
That is exactly the right way to report a finding that happens to match a primed pattern.
