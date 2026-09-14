# Batch B7a — Governance and access control

Reviewer: Sonnet (research agent), reported 2026-09-14. **Reviewer did not edit any file.**
Verified and applied by Opus the same day.

Articles: `security/policy-as-code-and-quotas-where-governance-stops-being-wiki` ·
`identity/rbac-and-iam-authorisation-models-that-look-similar` ·
`multicloud/sandboxes-environments-you-will-probably-set-up-wrong`

Reviewer totals: 4 WRONG, 1 STALE, 4 UNVERIFIED, 5 INTERNAL, ~30 checked-and-correct.

**Verification result: findings confirmed, with two corrections to the reviewer's own
reasoning and one correction to my brief.**

---

## The reviewer corrected my brief, and was right

My brief said the three articles carried 8, 14 and 4 fenced blocks, 26 in total. The
reviewer opened with a scope note: those numbers count *fence delimiter lines* for the
first two articles and *blocks* for the third, so they are not computed the same way. The
real counts are 4, 7 and 4 — **15 blocks**, not 26.

It was right. `grep -c '^```'` counts opening and closing fences separately. A reviewer
that checks the arithmetic in its own instructions instead of adopting it is doing the job
properly, and this is the second batch running where one has argued with the brief and won.

## Code-block audit — the deliverable

Fifteen blocks checked, **twelve clean**, three carrying defects:

| Defect | Consequence |
|---|---|
| `oci_identity_tag_default` omits `value` | **Would fail `terraform plan`.** The provider documents it as "value - (Required) (Updatable)" |
| Same snippet reused in a second article | The copy in the tagging article carried no hedging comment at all, so it read as a verified example |
| `set compute quota …` for the compute family | See the pushback below |

The tag-default defect is the important one. It is not a stylistic issue: a reader copying
that block gets a plan-time failure on a required argument. It had also propagated, which
is why grepping the resource name rather than the article mattered.

## Two pushbacks on the reviewer's reasoning

**The compute quota family.** The reviewer wrote that Oracle's syntax page states the
family is `compute-core` and that "every official `zero`-statement example on the same page
uses `compute-core` — never bare `compute`."

That last part is false, and on the very page it cited. Oracle's own worked example reads:

```text
set compute quota standard-e4-core-count to 10 in compartment parent:child:another_child
```

So **Oracle's documentation contradicts itself**: the grammar section defines the family as
`compute-core`, and an example on the same page uses the bare form. Neither the OCI compute
quotas page nor the Available Quotas by Service page could arbitrate — the first 404s and
the second is a 13 KB stub with no quota names in it at all, raw HTML included.

The article was therefore not plainly wrong; it matched a vendor example. The edit still
stands, because the corpus had two files using each form and internal consistency is worth
having, and because a grammar definition outranks an example. But the finding is "the
corpus disagreed with itself and Oracle is no help" rather than "the article was wrong",
and the record should say so.

**The Always Free figures.** The reviewer flagged that describing the compute allowance as
"two AMD VMs" omits the larger Arm allowance, and was right. But it could not fetch Oracle's
page — 403 on two attempts — and proposed "4 Arm Ampere A1 OCPUs / 24 GB RAM" from search
synthesis. I got through to Oracle's own docs, which give the current figure as **1,500
OCPU hours and 9,000 GB hours per month**. The reviewer's finding was sound and its
replacement number would itself have been stale.

## Confirmed against primary sources

| # | Claim | Source |
|---|---|---|
| W1 | Deny policies shipped **20 November 2025**, not 2024 | Oracle's release note: "Release Date: November 20, 2025" and "IAM **introduces** deny policies" |
| W2 | `value` is Required | Provider docs: "value - (Required) (Updatable) The default value for the tag definition" |
| W4 | Time-bound access is **Oracle Access Governance**, not Identity Domains | The article's own prose sixteen lines below the table already said so |
| S1 | Always Free includes an Arm allowance | Oracle: "the first 1,500 OCPU hours and 9,000 GB hours per month" |

## A repo rule nobody was enforcing

The reviewer found six unlabeled code fences and cited `.claude/rules/content-files.md`:
"Code blocks must specify language". The rule exists.

Sweeping the whole corpus found **thirteen more**, in nine other articles the reviewer was
not auditing. All nineteen were plain-text illustrations — ASCII hierarchies, naming
templates, address plans, a skills matrix — and are now tagged `text`.

`scripts/check-code-fences.py` now enforces it, joining `check-cidr-alignment.py`. Both
scan the corpus and exit non-zero on a violation. **Second mechanical invariant.** The
pattern is worth continuing: when a reviewer finds an instance of a rule violation, check
whether the rule is violated elsewhere, then write the check down.

## Not applied

- **U2/I2 — the object-storage quota name.** Two articles use `storage-bytes` and
  `standard-storage-bytes` for what reads as the same quota. I could not settle it: the
  Available Quotas by Service page is a stub with no quota names, and two guessed
  service-specific paths 404. **Left as-is deliberately.** Picking one to resolve a
  contradiction without evidence would be inventing a fact, which is the failure mode this
  audit exists to prevent. Open item.
- **U1 — whether CAF documents EPAC as replacing accelerator policy deployment.** The
  reviewer could not find a verbatim statement and neither could I.
- **U3 — the `gpu-a10-count` quota name.** Same blocked reference as U2.
- **U4 — Azure Policy regulatory initiative names.** Well-established and search-corroborated,
  but the reviewer honestly declined to file it as verified without a fetched quote. Right call.

## Notes on the reviewer

Two things stand out beyond the block audit. It flagged that one cited reference — a Zero
Trust identity page — supports no claim in the article at all: the terms appear only inside
the reference's own description and never in the prose. That is the citation failure from
B6b inverted, a source cited for nothing rather than a claim citing the wrong source, and
it found it by grepping the article rather than the page.

And it distinguished cleanly between what it fetched and what it got from search, marking
four items UNVERIFIED on sourcing grounds alone even where it believed the underlying facts.
That is the behaviour that makes the rest of the report trustworthy.
