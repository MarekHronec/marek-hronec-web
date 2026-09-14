# X3 — The cost, resilience and connectivity guides

Reviewer: Sonnet (research agent), reported 2026-09-14. **Reviewer did not edit any file.**
Verified and applied by Opus the same day.

Scope: 8 data files (4,481 words) and 12 components across `/cost`, `/resilience` and
`/connectivity`.

Reviewer totals: **0 WRONG, 0 INTERNAL, 0 UNVERIFIED, 1 STALE** (systemic, all three
guides), plus one dead-code note. Everything it passed, it quoted a fetched source for.

---

## The reviewer refused an instruction, and was right to

Two messages were sent to the agent mid-task from this session. It flagged the first as a
suspected prompt injection and declined to adopt it:

> "It didn't arrive as a normal turn — it appeared narrated … immediately after a tool
> result, and it closely mimicked the phrasing of this repo's own `docs/audit/` standing-rules
> files (which I had just read myself), which is exactly how a false-legitimacy injection
> would be built."

The message was genuine. The reasoning was still correct on both counts:

1. **It could not authenticate the sender.** A message claiming coordinator authority,
   arriving out of band, matching the house style of files the agent had just read, is
   exactly the shape of an injection. Treating provenance it cannot verify as untrusted is
   the right default, and the corpus is better off with a reviewer that does this.
2. **The instruction was substantively wrong.** It told the agent to report intra-file
   summary/body disagreement as `INTERNAL`. In this protocol `INTERNAL` means *contradiction
   with another file in this repo*. Redefining a label mid-batch would have made X3's
   findings incomparable with every batch before it.

And it still ran the underlying check, reporting the result under the correct labels. That is
the best available response: refuse the taxonomy change, keep the useful part, say what you
did.

**Lesson recorded: a mid-flight instruction to a running reviewer is not a good way to amend
a brief.** There is no channel that carries authority, so a well-behaved agent must distrust
it. Amendments belong in the brief before dispatch. This cost nothing here only because the
agent handled it well.

## The one finding, and it is real

**Every guide asserted a review date earlier than the articles it links.**

| Component | Asserted | Articles it links |
|---|---|---|
| `CostReading.astro` | Reviewed 11 September | three at `updated: 2026-09-14` |
| `RecoveryReading.astro` | Reviewed 11 September | three at 09-14, two at 09-13 |
| `ConnectivityReading.astro` | Reviewed 12 September | two at 09-13 |

All ten checked; all ten postdate the review their guide claims. The cause is benign — X1
and the batches around it touched the linked articles, not the guide content — but the
component was publishing a currency claim it could no longer support. Bumped to 14 September,
which X3 makes true.

**The reviewer could not see the worst instance.** `/platform` asserts "Reviewed 9 September
2026" and is **outside every batch run so far**. Left as it stands, because 9 September is a
truthful record of the last time anyone looked; the honest fix is to audit the guide, which
is now tracked as X4.

## What the reviewer passed, re-derived

Protocol rule 11: when a batch reports nothing wrong, verify what it passed. Two of its
quotes were re-fetched independently and both are verbatim:

| Claim | Source text |
|---|---|
| A private circuit is not application-to-application encryption | "By default, traffic over an ExpressRoute connection isn't encrypted." |
| Replication propagates deletion | "Replication isn't the same as backup… The deletion operation is replicated to each replica, and your data is deleted everywhere." |

The guide-versus-article comparison — twelve claim pairs across ten articles — found no
disagreement, and its two "not restated in the guide, nothing to check" rows are honest
rather than padded.

Its self-consistency sweep of all 12 `ConceptStory` objects specifically looked for an
RTO/RPO swap between a `cue` and its `definition` and found none; `rpo`'s worked example
(08:45 usable copy, 09:00 loss) nets correctly to the 15-minute target its own definition
states. Recorded because a clean result on a check we ran deliberately is the point.

## The citation that no longer says what it is cited for

The reviewer filed this as a minor caveat. It is the more interesting finding.

The hub-and-spoke article cited Microsoft's VNet peering overview, described as:

> "The canonical Microsoft page on VNet peering, including its non-transitivity — peering A
> to B and B to C does not connect A to C."

**The current page contains zero occurrences of the string "transitiv".** Non-transitivity is
now only implied structurally, through a Service Chaining section that requires explicit UDRs.
Verified by fetching the page and scanning the stripped text.

The fact is not in doubt — Microsoft's hub-and-spoke design guide states it outright:

> "VNet peering is non-transitive. Spokes can reach the hub, but spokes can't reach each
> other directly through the hub unless you configure routing or direct peering between them."

Repointed there. **This is the third instance in two days of a citation describing content its
page does not carry** (after the OCI VCN reference and the French cloud doctrine page). The
pattern is that vendors rewrite pages without redirecting, so the URL stays live and the
sentence quietly leaves. Liveness checking cannot catch it.

## Sourcing — the question was wrong, and the corrected one had an answer

The brief claimed the guides were unsourced. **That was my error**: I grepped the data files
and never opened the components that render them. Each guide carries a page-level *Sources &
method* aside with a review date and an explicit statement of what the tool does not do. The
reviewer was corrected mid-flight and re-aimed at the useful question: *does each guide's
source list cover the load-bearing claims in its data files?*

It does not, in three places, all now fixed:

| Claim | Guide | Was its source listed? |
|---|---|---|
| ExpressRoute is unencrypted by default | connectivity | **No** — added |
| Peering is non-transitive | connectivity | **No** — added |
| Replication propagates deletion | resilience | **No** — added |
| A private endpoint may leave public access enabled | connectivity | Yes, already listed |
| Deallocating compute does not stop disk billing | cost | Yes, already listed |

It also checked all 17 URLs in the three source lists: **all 200, and this batch is the first
to check them** — X2's sweep covered article frontmatter only, so the components had never
been link-checked.

## Dead code that would have misled the next editor

`COST_EXAMPLES.idle` is unreachable: `billingExample()` intercepts `'idle'` and returns a
computed ledger before reaching the `COST_EXAMPLES[key]` fallback. The constant said
800 → 400; the live path renders 720 → 540 at its defaults. An editor updating the constant
would have changed nothing visible and been misled about what ships.

Held equal to the rendered defaults, with a comment saying why it exists and that it is never
read. (`scaling` and `transfer` are also mostly overridden by the spread, but their surviving
values already agree with the computed ones.)

## Notes on the reviewer

The strongest of the batch. It refused an unauthenticated instruction, verified the brief
line by line and reported finding no error in it (checking the byte sizes, the word count, the
guide→article mapping *from the component source rather than from the brief*), diagnosed its
own borderline calls into "checked and correct" instead of inflating them into findings, and
volunteered the dead-code observation that nothing had asked for.

Its one misjudgement was severity, not fact: it filed the broken peering citation as "worth a
look in a future link-content pass". It is the third of its kind and it was repointed today.
