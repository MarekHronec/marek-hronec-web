# Batch B6c — Regions and service availability

Reviewer: Sonnet (research agent), reported 2026-09-13. **Reviewer did not edit any file.**
Verified and applied by Opus the same day.

Articles: `multicloud/regions-zones-availability-domains-where-your-data-lives` ·
`multicloud/service-availability-by-region-why-you-cannot-trust-the-map`

Reviewer totals: 2 WRONG, 2 STALE, 1 UNVERIFIED, 0 INTERNAL, ~20 checked-and-correct,
plus both carried-over Oracle questions answered.

**Verification result: all findings confirmed, including one figure I initially failed to
reproduce and had to re-check my own method for.**

---

## The batch that found nothing wrong with its articles

Both articles' bodies came through clean. Every mechanism claim checked out, several
verbatim against Oracle and Microsoft documentation:

- "Each availability domain contains three fault domains" — exact match.
- Fault-domain distribution "does not turn a single-AD region into a multi-AD deployment" —
  a correct inference from Oracle's scoping of fault domains within one AD.
- "Some Azure regions have a paired region. Others do not" — confirmed, and *ahead* of a
  shift already underway. Microsoft's current Well-Architected guidance says "Newer Azure
  regions aren't paired" and recommends zone-redundant deployment as the default starting
  point, so the article's framing anticipates where the vendor has since moved.
- Zonal versus zone-redundant terminology, and that logical zone numbers map differently
  between subscriptions — both current.

**Every finding in this batch was in a citation, not in the prose.** That is a first, and
it only happened because the brief made citation-checking the primary task rather than a
side check.

## The four bad citations

Applying the rule from B6b — a citation that resolves has not been checked — all twelve
URLs were fetched and grepped for the specific claim each was cited for.

| Cited for | Resolves | Carries the claim | Evidence |
|---|---|---|---|
| Azure's "canonical table" of services by region | 200 | **No** | Zero occurrences of "West Europe" or "East US" in the landing page's raw HTML. The `/table` page below it has **428** and **836** |
| OCI's "authoritative table" of services by region | 200 | **No** | The `#Services` anchor does not exist — zero element ids match. The section is one paragraph pointing elsewhere |
| OCI "home region semantics" | 200 | **No** | Zero occurrences of "home region" on the cited page. It is defined on the IAM `managingregions` page |
| The detail behind "three zones per region" | 200 | **No** | The page states no zone count anywhere. The article body never claimed one either — the number existed only in the reference description |

The second is the most instructive. It is not a dead link and not a shell: it is a real
page, on the right topic, whose entire treatment of the subject is a single paragraph whose
own link leaves the documentation domain for a marketing page. The actual per-realm matrix,
including which services are unavailable in the EU Sovereign Cloud, sits on a third URL.
**Two hops from where the reference pointed.**

## Where I could not reproduce the reviewer, and why it was my fault

The reviewer reported 428 occurrences of "West Europe" on the Azure `/table` page. My first
check returned **zero**, which looked like a fabricated figure.

It was my extraction. The region matrix is delivered inside script-embedded data, and the
HTML-stripping helper I use across this audit deletes `<script>` blocks before matching.
Grepping the raw file reproduced 428 exactly, and 836 for "East US".

Worth recording as a method note: **when a reviewer's count cannot be reproduced, check the
extraction before doubting the count.** The stripped-text helper is right for prose claims
and wrong for anything a page renders from embedded data. The 20-fold size difference
between the two pages, 166 KB against 3.4 MB, was the tell I should have read first.

## The two carried-over questions, both closed

**OCI load balancer subnet sizing.** Oracle publishes no recommended prefix. The load
balancer management page has **zero** occurrences of "/24". It states topology requirements
— one public regional subnet, or two public AD-specific subnets in separate availability
domains, or at least one private subnet — and that each load balancer consumes two or three
private IPs. The article's "Oracle recommends /24 for scalability" appears to have taken a
tutorial's example CIDR for guidance. Corrected to the functional requirements.

**DRGs per region.** Oracle's service limits give:

```
Dynamic routing gateways (DRGs) | Region | 5 | 5
```

No asterisk, which in Oracle's own notation means the ceiling is raisable. This **confirms
the hub-and-spoke article was right** that one per region is a design choice rather than a
platform rule. The article now names the number instead of only asserting the negative.

That is the useful shape for a carried-over question: one article corrected, one confirmed.

## Not applied

- **U1 — the "three zones" claim itself.** The reference description was rewritten to
  describe what the page actually covers, but whether Azure still guarantees a minimum of
  three zones per AZ-enabled region is unresolved. The `regions-list` table that would
  settle it is client-rendered. Since the article body never makes the claim, nothing
  turns on it. A browser session against that table, or the retail API, would close it.

## Notes on the reviewer

Asked to make citation-checking the deliverable, it produced the most useful artefact of
the audit so far: a twelve-row table of URL, resolves, supports the claim, what it grepped
for, and hit counts. That table is re-runnable and it is what made my verification cheap.

It also declined to inflate a finding. One reference describes an index page as covering
"region-pair behaviour" that the index itself does not state, and the reviewer explicitly
declined to file it, reasoning that an index honestly described as "the detail layer"
pointing to child pages is normal practice. That judgment is right, and a reviewer that
argues itself *out* of a finding is more trustworthy than one that maximises the count.
