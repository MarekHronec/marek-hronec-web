# Batch B7b — Service models and ownership

Reviewer: Sonnet (research agent), reported 2026-09-14. **Reviewer did not edit any file.**
Verified and applied by Opus the same day.

Articles: `multicloud/iaas-paas-saas-without-marketing-layer` ·
`multicloud/shared-responsibility-for-people-who-stopped-believing-marketing` ·
`multicloud/tagging-metadata-earn-their-keep`

Reviewer totals: **0 WRONG, 0 STALE, 0 INTERNAL**, 1 UNVERIFIED, 2 citation defects,
~40 checked-and-correct.

**Verification result: the nil result is real. I re-checked a sample of what the reviewer
passed and it holds.**

---

## Testing a clean report

A batch that reports no errors is the one that most needs checking, because it looks the
same whether the articles are sound or the reviewer was lax. So rather than only verifying
the findings, I re-derived a sample of the claims it *passed*.

Every hard tagging limit, quoted from the vendor pages I fetched myself:

| Article claim | Vendor text |
|---|---|
| 50 tags per Azure resource | "Each resource, resource group, and subscription can have a maximum of **50 tag name-value pairs**" |
| Value limit 256 characters | "The tag name has a limit of 512 characters and the tag **value has a limit of 256 characters**" |
| Keys case-insensitive on lookup, case preserved on storage | "Tag names are **case-insensitive for operations**… However, the resource provider might keep the casing you provide" |
| OCI: 10 free-form, 64 defined, 5 KB | "Tags per resource: **10 free-form tags and 64 defined tags**" / "Total tag data size: **5 K (JSON)**" |

All four correct, including the case-sensitivity claim being the right way round, which is
the sort of detail that is usually backwards. The reviewer had earned the benefit of the
doubt.

## The two real defects, both citations

Fourth consecutive batch in which the only defects are citations. Both confirmed:

**A reference cited for nothing.** The Microsoft Cloud Security Benchmark entry was
described as defining "what customer responsibility actually means in practice for each
control domain". The article never mentions it — two occurrences in frontmatter, **zero in
the body**. This is the inverse of the usual failure: not a claim pointing at the wrong
source, but a source supporting no claim. Reframed as further reading.

**A reference whose page does not contain its framing.** The FinOps allocation entry claimed
to underpin "the cross-cloud tag schema approach described in this article". That page has
**zero** occurrences of cross-cloud, multicloud or multi-cloud — checked in stripped text
*and* raw HTML, since a recent batch showed the stripper can hide embedded content. The
cross-cloud framing is the article's own synthesis, and the description now says so.

## One verified addition

The SLA section explains what credits are worth and that they are not damages, but never
says they must be **claimed**. Oracle's own SLA page is unambiguous: service credits are
"the exclusive remedy" and "we require customers to file for the SLA claim by contacting
their account manager and providing the supporting evidence of the SLA breach".

That is a practical gap in an article whose subject is what the SLA does not cover. A
reader who assumes credits arrive automatically never claims one.

**Not published:** the reviewer also offered a 60-day claim window. That figure is not on
the page I fetched, so it stayed out. Same rule as the previous batch — a correct finding
does not make every detail of the proposed fix correct.

## Not applied

- **OCI's 10-per-tenancy cost-tracking tag limit.** The reviewer could not source it and
  neither could I. Between us we tried seven URLs: the dedicated cost-tracking topic 404s,
  and the tagging overview, tag-defaults, free-form-tags and cost-analysis pages all resolve
  with **zero** cost-tracking content. Oracle appears to have reorganised these topics. The
  claim is probably right, is stated consistently in both places the article makes it, and
  general search surfaces text that reads as authentic Oracle documentation. **Left
  unchanged.** Would be settled by `oci limits value list --service-name tagging` against a
  live tenancy.
- The reviewer's observation that a container-service pairing in the comparison table is
  approximate rather than exact. The article already frames the table as "roughly the same
  shape", so the hedge is present.

## Notes on the reviewer

The most disciplined report so far, and the discipline shows in what it declined to claim.
It marked the cost-tracking figure UNVERIFIED despite finding text that corroborated it,
because that text came from search rather than a page it fetched. It flagged its own
container-service observation as an approximation worth naming rather than an error. And
it checked the arithmetic in my brief, confirming the word counts summed correctly and
noting a two-word discrepancy against the tracker as immaterial.

It also answered two questions the brief asked that the articles are simply silent on —
which resource types cannot be tagged, and whether credits are automatic — and reported
them as vendor context rather than dressing silence up as a finding. Silence is not a
contradiction, and a reviewer that knows the difference is worth more than one that
maximises its count.
