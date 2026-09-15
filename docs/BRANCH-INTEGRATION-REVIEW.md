# Branch integration review — 15 September 2026

The review started from main `67a7a62`. Every one of the 17 existing local feature branches was already an ancestor of main, with zero unique commits. After fetching origin, the six remote feature branches also had zero unique commits. No historical draft needed another merge. The main and marine-polish worktrees were clean at the start.

An independent ancestry review confirmed that the final marine artwork, compact explainers, guide pages, interaction scripts and styles from `e6593de` remained intact. Later differences were the content audit, corrected notices and citations, aligned cost fallback and PWA assets. This review did not independently repeat the full 57-article audit.

## Integration corrections

A second independent review found two gaps in how the audit changes integrated with the guides:

1. The standalone compliance verdict qualified its limited control coverage, but the combined guide and downloaded brief did not carry those limitations or the framework transition. A shared `classification-limits.ts` now supplies the notice and published result gaps; the summary explicitly calls the counts “modelled control areas.” No classification thresholds or control obligations changed.
2. The compliance notice had become long again. The essential warning and January 2027 date remain visible; the complete coverage limitations, transition detail and source list use a native disclosure.

The [official MIRRI cybersecurity portal notice](https://kyberportal.slovensko.sk/aktuality/nov%C3%A1-vyhl%C3%A1%C5%A1ka-k-bezpe%C4%8Dnostn%C3%BDm-opatreniam-itvs-menej-formality-viac-re%C3%A1lnej-bezpe%C4%8Dnosti/) confirms the January 2027 commencement and transitional recognition of existing measures through June 2027. Both dates travel with the exported result. Re-review found both issues resolved.

## Verification

- Initial main build passed: 72 pages and successful search index; type check passed with 154 files and no diagnostics.
- Existing model tests passed 243 connectivity, 186 billing, 243 cost and 288 resilience combinations, plus their boundary and invalid-input checks.
- After the corrections, build passed again and type check passed with 155 files and no diagnostics.
- Browser checks passed both classification scopes, all five combined-guide stages, retained answers, invalidation, resets, four responsive widths and no-JavaScript links. The assessed ISVS final result and downloaded text explicitly contain the coverage gaps, modelled-control wording and both transition dates.
- The compact notice was visually inspected; its collapsed height is under 240 pixels at 1440-pixel width, and its native disclosure opens correctly.

The focused correction is integrated locally. Existing historical branch names are retained; only the temporary review branch is removed after merging. No push or deployment is part of this task.
