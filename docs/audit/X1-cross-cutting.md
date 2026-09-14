# X1 — Cross-cutting consistency

Mechanical half by Opus; judgment half by an Opus research agent, reported 2026-09-14.
**Agent did not edit any file.** Verified and applied by Opus the same day.

Scope: all 57 articles, plus `src/pages/` and `src/components/`.

Result: **6 INTERNAL contradictions, 1 shipped-widget defect, 4 minor items.** Every
seed-list date, instrument and version string checked out consistent.

---

## The mechanical half, done before dispatching

Four sweeps I could run exhaustively and more reliably than an agent:

| Sweep | Result |
|---|---|
| All **265 distinct reference URLs** | **1 dead** — the French cloud doctrine page, repointed to its successor, which carries the SecNumCloud mandate verbatim. 238 return 200; 12 bot-blocked on legitimate government and standards domains; 7 are the known EUR-Lex asynchronous response; 5 are internal links whose targets all exist |
| All **377 internal links** | All resolve. Now enforced by `scripts/check-internal-links.py` |
| **Editorial residue** across all 57 | Clean. The apparent hits were "authoritative"/"authority" substrings, and the placeholder table entries carry their own legend |
| **Recurring-fact extraction** | Produced the seed list: every date, legal instrument and version string appearing in more than one article, ranked by how many articles restate it |

That last one is what made the judgment half tractable. **A fact restated in a second place
is where contradictions live**, so extracting them mechanically turns an unbounded "read
everything and compare" into a finite list of about ninety items, ranked by blast radius.

One contradiction fell out of the extraction directly, before any agent ran: three places
said "ISO/IEC 27001:2023", which does not exist. The 2023 designation belongs to the Dutch
adoption, NEN-EN-ISO/IEC 27001:2023; ISO's own edition is 2022. Confirmed against the Dutch
standards body's listing and the baseline's own published document.

## The six contradictions

### 1. A reporting clock the article debunks in its body and restates in its checklist

The single worst finding, and it needed the regulation itself to settle. Delegated
Regulation (EU) 2025/301, fetched through the browser after EUR-Lex returned its
asynchronous status to every direct request:

> "(a) for the initial report: as early as possible, but in any case, **within four hours
> from the classification** of the ICT-related incident as a major ICT-related incident and
> no later than **24 hours from the moment the financial entity has become aware**…
> (b) for the intermediate report: at the latest **within 72 hours from the submission of
> the initial notification**… (c) for the final report: no later than **one month after…
> the intermediate report**."

So the popular "24 / 72 / one month, from classification" is wrong on **all three stages**,
not merely the first. The owning article says so explicitly at three points — and then its
own closing checklist states the myth. Four further instances across two other articles,
one of which also states the correct figure elsewhere in the same file.

**This is the B5b failure again in a new article**: a correction lands in the body and the
summary keeps the error. It is now the second time, which makes it a pattern rather than an
incident.

### 2–6, in brief

| # | Contradiction | Resolution |
|---|---|---|
| 2 | The Netherlands listed among multi-level schemes where data class drives service level | Its own article calls withdrawing those levels the biggest change in the current baseline; two others agree |
| 3 | Italy's top tier described as reserved to the state in three places, not reserved in two | The two cite the provision and a named counter-example; the three assert without support |
| 4 | A cross-reference sending readers elsewhere for a topic covered in place | Both articles pointed at each other for it; neither target covers it |
| 5 | Bleu's qualification stalled at the first milestone in one article | Three others carry the second milestone, which is what opened the audit phase they describe |
| 6 | The Slovak article debunks an 80% audit threshold, then uses it nine lines later | The only published figure is "minimálne 90%?" at U4 |

## The shipped widget

The compliance calculator's result text read "Of the 17 measures under §20 of Act 69/2018".
It models **16 of the 18 areas in ods. 2**, plus the ods. 4 letter a) cyber security manager
requirement. Two ods. 2 areas are unmodelled, which the data file's own provenance comment
already recorded.

So the interface was presenting **the tool's coverage as the statute's scope** — the same
class of error as a citation overselling its page, but in a live compliance tool where a
reader counts controls off it. Corrected to say what it models.

## What checked out consistent

Worth recording, because a clean result on a restated fact is the point of this pass:

- **9 of 9 seed dates.** The designation date of the first critical third-party providers
  appears in 7 articles, all agreeing. The CJEU referral in 3, with matching infringement
  numbers. The Slovak repeal and its parallel-running window in 3 each.
- **6 of 6 seed instruments**, and none described as doing different work in different
  articles.
- **6 of 6 seed version strings**, including ISO editions across 13 articles matching the
  current list exactly.
- **The two NIS2 transposition matrices agree row for row** across all nine states.
- **Counts that match across articles**: the Spanish measure count with its breakdown
  summing correctly, control-catalogue counts, principle counts, sanction ceilings, and a
  table of nineteen designated providers matching its own stated breakdown.
- **No product-name drift**: no stale identity-service name anywhere in the corpus.

## Not reached

The agent covered every seed item but gave the **26 non-compliance articles** targeted greps
rather than a fact-by-fact pass, on the grounds that most of their recurring facts appear in
only one article. It flagged one area worth a short follow-up: the overlap between the
address-plan, address-management and topology articles, which share subnet-sizing and
topology claims.

## Notes on the agent

It answered the question I actually asked. Told that a clean result is a finding and to show
the greps that came back consistent, it produced a verification list longer than its findings
list — which is what makes the findings credible.

It also flagged the calculator defect as UNVERIFIED rather than WRONG, correctly, since no
article stated a competing number. That judgment left the resolution to the data file, which
is where the answer turned out to be.
