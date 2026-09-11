# Cost guide and recovery articles

Branch: feature/cost-guide. Local merge to main only; no push or deployment.

/cost extends the existing editorial marine guide system. Four finite demonstrations use the shared panel, playback controller and existing marine assets. The checklist validates five answers in a pure model, displays measurement gaps and priorities, and provides two reset controls with a stable result toolbar. It makes no provider calls and stores no answers.

Navigation and result offers connect all four guides. /guides uses a balanced two-column desktop grid. Three new resilience articles implement the previously documented briefs and link from /resilience.

Fact-check scope: all new content and the three FinOps articles reused by /cost. Revised budget/forecast/quotas claims, removed unsupported universal spending ceilings and shutdown promises, replaced generic discount percentages with explicit hypothetical break-even math, and corrected Azure support severity and delivery-manager distinctions. Current primary sources are linked at the point of use and in the cost sources panel. No blanket claim is made about the entire Knowledge Base.

## Verification and independent review

Two independent reviews completed: code/interaction/accessibility and factual/pedagogical content. Both passed after re-review.

- Accepted P2: initially enabled Replay had no animation to restart. Replay now starts an inactive finite demonstration through its existing action handler; Pause is disabled until motion exists. The reviewer caught an initial edit that had not applied; the corrected edit was re-read and browser-tested.
- Accepted content finding: budgets article omitted Azure’s named credit-linked Spending Limit. Added its eligibility, fixed credit amount, shutdown behaviour and charge exclusions, independently checked against Microsoft’s current documentation.
- No remaining actionable reviewer concerns. No findings were dismissed.

Validation: all 243 cost-checklist combinations, invalid/partial inputs and uncertainty branches; all 288 recovery-planner combinations; Chromium checks for initial Replay, running Replay/Pause/reset across four cost scenes, four resilience scenes, reduced motion, both checklist reset controls, gaps, result toolbar, related-guide links, mobile menu and widths 375/768/1024/1200/1440. All three new article routes return successfully; no-JavaScript cost explanations remain readable. Screenshots were inspected for each cost concept and mobile checklist. This is not Safari or screen-reader certification.

Astro check: 127 files, zero errors/warnings/hints. Production build: 71 pages and successful Pagefind indexing. Existing build notices concern Markdown plugin configuration deprecation and a large Knowledge Base client chunk, outside this change.

Published locally on main after verification; nothing pushed or deployed.

## Visible charge comparisons

feature/cost-bill-motion adds an illustrative monthly ledger to every cost scene. Line items, total, delta and bars follow the existing scene timeline, including pause, replay, reset and reduced motion. Invented rates and assumptions are visible. Idle compares a full future month; scaling and transfer add charges this month; operations separates provider invoice from valued staff time. Reset is a scenario reset, not a refund.

Both independent reviewers rechecked the implementation. Accepted fixes: sum rounded displayed rows to prevent intermediate discrepancies; distinguish one-time charges from recurring monthly changes; label static outcome text as prospective. No remaining findings. Browser checks cover all four endpoint and reset totals, paused arithmetic, existing controls, mobile widths, reduced motion and no-JavaScript fallback. Astro check: 130 files, no errors/warnings/hints. Production build: 71 pages. Local merge only; no push.
