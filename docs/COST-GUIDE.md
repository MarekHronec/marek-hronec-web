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

## Billing type and release timing

feature/cost-billing-types adds hourly, fixed monthly (no prorating) and existing commitment scenarios. A 0–720 hour release control separates costs already accrued or owed from later charges. Optional release of the unused storage allocation changes its separate hourly meter. Peak duration and transferred GB control their respective quantity-based charges. All rates are invented, the month is explicitly 720 hours, and rounded amounts are labelled. Reset assumptions restores the input defaults; scene reset restores the comparison state.

Independent content review passed all billing distinctions and arithmetic. Code review identified repeated writes to implicit live output labels; accepted and fixed by updating text only when it changes. Model tests cover 186 billing/time/storage combinations, accrued-plus-remaining reconciliation, boundary and invalid inputs. Chromium checks cover billing selections, storage release, timing endpoints, assumption reset, four scene totals, pause/replay/reset, mobile layouts and existing calculator behaviour. Primary sources for disk meters, VM billing states and reservations are linked in Sources & method. No claim is made that every storage product bills identically.

Final billing update verification: both independent reviews passed after the live-label fix; production build and search indexing succeeded for 71 pages. Existing Markdown configuration and large-chunk notices remain unrelated. No provider prices or external account access were introduced.

## Compact cost explanations

The default explanation now pairs the marine scene with one short explanation, the action, an immediate before/after cost comparison and one practical workload question. Billing modes, timing, storage options, line items and detailed caveats remain available in a native “Billing assumptions & breakdown” disclosure. Removed the duplicate narrative, explicit yes/no branches and per-row bars from the default view. Hourly, monthly and commitment calculations are unchanged. The compact ConceptPanel variant is opt-in; the other guides retain their existing layout.

At a 1280 × 800 viewport, the complete default explainer (heading, tabs and active concept) measures 638–657 CSS pixels high. Desktop and phone images were inspected. Native disclosures expand normally rather than trapping content in an internal scroll area.

Two independent reviewers checked content and implementation. Accepted findings: extra capacity must be released to stop future charges, and a settled cost result needs a polite screen-reader announcement. During browser testing, revisiting a tab restarted completed CSS animations because hiding a panel destroys their timelines. The shared controller now saves elapsed time and completion before hiding, restores them on return, and pauses only running animations. Replays remain explicit; announcements update at settled results rather than every frame. The reviewer rechecked this correction with no remaining findings.

Verification passed: four scene endpoints, pause/replay/reset, paused and completed tab returns, hourly timing boundaries, fixed fees, commitments, storage release, peak duration, transferred volume, assumption reset, keyboard tabs, widths 375/768/1024/1280/1440, reduced motion, no-JavaScript fallback and shared-panel checks on platform, resilience and connectivity. Astro check: 153 files, zero diagnostics. Production build: 72 pages and successful search indexing. No push or deployment.

Billing wording was checked against [Azure VM billing states](https://learn.microsoft.com/en-us/azure/virtual-machines/states-billing), [EC2 On-Demand billing](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-on-demand-instances.html), [Savings Plans commitment application](https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-applying.html) and [VPC pricing components](https://aws.amazon.com/vpc/pricing/). Amounts remain invented teaching examples, not provider quotes.
