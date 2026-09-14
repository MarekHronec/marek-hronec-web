# Batch B8 — Short-form FinOps and recovery

Reviewer: Sonnet (research agent), reported 2026-09-14. **Reviewer did not edit any file.**
Verified and applied by Opus the same day. **Completes the article corpus: 57 of 57.**

Articles: `finops/budgets-cost-caps-and-the-lie-of-spending-limits` ·
`finops/cloud-support-what-you-are-actually-paying-for` ·
`finops/discounts-and-commitments-math-the-salespeople-hope-you-wont-do` ·
`multicloud/backups-replication-point-in-time-recovery` ·
`multicloud/recovery-exercise-failover-validation-failback` ·
`multicloud/rto-rpo-from-business-impact-to-tested-recovery`

Reviewer totals: **0 WRONG, 0 STALE, 0 UNVERIFIED, 0 INTERNAL**, 1 editorial defect,
15 of 15 citations sound.

---

## The framing was wrong before the batch started

These six were queued as the corpus's weak cohort because none carried a frontmatter
`references:` block, against 51 of 57 that do. Checking before dispatching showed that was
the wrong conclusion: **they carry fifteen external citations inline in the prose.** They
were sourced all along, just structured differently.

That mattered for the audit, because it turned the batch from "find what is unsupported"
into "check fifteen citations whose claim is in the same sentence as the link" — a sharper
test than usual, since there is no ambiguity about what each reference is meant to support.

**All fifteen resolve, all serve the claim they are attached to.** After six consecutive
batches where citations were the only defect found, the corpus's supposedly weakest articles
turned out to have its cleanest.

## Testing a second nil result

The rule from B7b applies: when a batch reports nothing wrong, verify what it passed. I
re-derived the highest-consequence claims rather than the findings, since there were none.

| Claim | Vendor text |
|---|---|
| Unused hourly commitment is lost | "Unused commitment for an hour expires and does not roll over" |
| Savings plans cannot be exited | "Savings plan purchases can't be canceled or refunded" |
| Commitment is an hourly amount | "You agree to spend a fixed dollar amount per hour for a set period (1 or 3 years)" |
| Support response commitments | Sev C "Within eight business hours", Sev A "Within one hour", Sev 1 "Within 15 mins for Azure" |
| Oracle forecast alerts exist | "can be triggered when your actual or forecasted spending hits either a percentage of your budget or a specified set amount" |

The savings-plan trio is the set that matters most: the article's break-even table is built
directly on "no rollover, no refund", and if either were wrong the arithmetic would mislead
someone into a purchase. Both verbatim.

## The one defect, and it is editorial

The budgets article contained:

> "OCI Budgets also provide soft spending limits, including actual and forecast alerts.
> **The earlier suggestion that OCI has no native forecast budget alerts was incorrect.**"

The fact is right. The sentence is not publishable: "the earlier suggestion" has no
referent for a reader. The reviewer went further than flagging it and checked the history —
`git log -p --follow` shows the sentence was introduced whole, and no version of this file
or any other in the corpus ever claimed OCI lacked forecast alerts. So it is not a
correction of anything the reader could have seen. It reads as a fact-check note pasted
into shipped prose.

Rewritten to state the fact plainly, with Oracle's own wording for what triggers an alert.

**Worth generalising:** an audit that leaves its own working notes in the article is worse
than one that changes nothing. This is the first instance found, and it argues for a sweep
in X1 for editorial residue — phrases addressed to an editor rather than a reader.

## What was applied

- The editorial sentence, rewritten.
- **References blocks added to all six**, promoting the inline citations already present and
  verified. Every article in the corpus now has one.
- **Three articles had no `updated:` field at all.** They do now.

## Notes on the reviewer

The second reviewer running to check the brief and report finding no error — and it did so
by name, listing what it had verified: the six word counts against `wc -w`, the "15 distinct
URLs" count, the "51 of 57" figure by grepping for the frontmatter key, the arithmetic I said
I had already checked, and the Blueprints retirement date from the established context. That
last one is notable: it verified a fact I had handed it as given rather than accepting it.

It also caught its own extraction failure honestly. Four pages returned zero bytes on its
first pass, which looks exactly like the JSON-rendering trap the brief warns about. The real
cause was a Windows console encoding error on a non-breaking space. It diagnosed that,
re-ran with the encoding forced, got full text, and **reported the false alarm rather than
filing four spurious "page is empty" findings.**

And it flagged a genuine extraction hazard: the Azure support page renders its severity table
twice, once for desktop and once for mobile, so a naive text flatten shows duplicated rows
with inconsistent capitalisation. It cross-checked with a second independent pass before
trusting the mapping.
