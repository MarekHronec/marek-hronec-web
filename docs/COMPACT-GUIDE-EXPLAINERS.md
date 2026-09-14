# Compact marine guide explanations

The cost guide's compact presentation now also applies to platform, resilience, connectivity and compliance onboarding. Each opens with a short concept explanation, an explicit action, a visible consequence, one practical workload question and a native “Details & limits of the example” disclosure. The disclosure preserves the longer marine mapping and important caveats. Questions incorporate the useful next step instead of separate yes/no paragraphs.

The 17 marine scenes retain their distinct drawings and causal animations. Classification and planner models, answers and result calculations are unchanged. U remains explicitly scoped to the Slovak ISVS assessment, distinct from uptime and placement approval.

## Implementation

- `src/styles/compact-explainers.css` holds the shared compact spacing, column proportions and outcome/question treatment. Selectors override scoped defaults without depending on stylesheet order. Cost imports the same rules through ConceptPanel.
- `src/components/shared/ConceptDetails.astro` provides the native, keyboard-accessible supporting disclosure. It works without JavaScript and expands the document normally.
- Platform, resilience and connectivity opt into ConceptPanel's compact variant. Compliance keeps its scene vocabulary and panel markup, with equivalent compact classes.
- Compliance now uses `src/scripts/explainer.ts`; its duplicate controller was removed. The shared controller preserves paused times and finished results across tabs, resets explicitly, supports the continuously moving availability scene and respects reduced motion.

## Review and verification

Two independent reviewers checked content and code. Accepted content corrections: ask whether the newest usable recovery point is recent enough (RPO), rather than how quickly it restores (RTO); retain the explicit warning that adding a private endpoint does not necessarily close public access. The distinction was checked against [AWS recovery objectives](https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_planning_for_recovery_objective_defined_recovery.html) and [Microsoft private endpoint security](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview#network-security-of-private-endpoints). Shared CSS specificity was strengthened after review so future stylesheet order cannot undo the compact layout.

Chromium checks passed all 17 concepts: action, pause, replay, reset, paused/completed tab retention, keyboard tabs, native disclosures, reduced motion, four responsive widths and no-JavaScript fallback. Compliance availability's ship and beam restart after reset. Cost's four total endpoints also passed after extracting its shared styles. Desktop and phone renders were inspected; final copy and computed spacing were checked again after the review fixes.

At 1280 × 800, default complete explainer heights are 627 pixels for platform, resilience and compliance; 700 for connectivity; and 657 for cost. Expanded details and phone layouts remain naturally scrollable. Astro check passed with 153 files and zero diagnostics. The production build generated 72 pages and the search index successfully. Existing Markdown configuration and large Knowledge Base bundle notices remain unrelated.

Developed in the isolated feature worktree. Local merge only; no push or deployment.
