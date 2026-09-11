# Architecture guides integration

## Scope

Local integration branch: feature/architecture-guides. Includes feature/platform and feature/compliance-atlas, with main's existing changes preserved. User requested a local merge to main after independent review; no push or deployment is authorized.

Architecture Guides is a native disclosure in the top navigation, with an overview at /guides and links to /platform, /compliance and /resilience. It is also available in the mobile menu. Result areas offer the related guides without transferring answers or implying that a platform choice establishes compliance.

The resilience guide reuses the existing panel, playback controller, sailing vessel and chart-water illustration vocabulary. Its four scenes finish in stable states, support replay/pause and respect reduced motion. The planner is a pure model plus a small browser controller; it never contacts an external service.

## Fact checking and reused articles

Updated these existing articles, including their review dates:
- Regions, Zones, Availability Domains — Where Your Data Actually Lives
- Service Availability by Region — Why You Cannot Trust the Map

Corrected the fault-domain/availability-domain distinction, automatic region-pair recovery implications, static regional claims, quota versus capacity, preview-age heuristics and inventory coverage assumptions. Sources are linked inline and from the resilience guide. The broader Knowledge Base was not represented as comprehensively re-audited.

## Published recovery articles

These three briefs were implemented on feature/cost-guide. Each article is now in the Knowledge Base and linked from /resilience. The scopes below record the original editorial requirements.

1. **RTO and RPO — From Business Impact to a Tested Recovery Target**
   - Published path: multicloud/rto-rpo-from-business-impact-to-tested-recovery
   - Audience: application owners and architects.
   - Explain operation scope, interruption start/end, acknowledged transactions, achievable versus required targets, and why SLA percentages do not specify RTO.
   - Worked example: an order service with a 4-hour RTO and a 15-minute RPO; measure detection, decision, restore, validation and reconciliation.
   - Deliverable: a one-page target agreement and exercise evidence template.
   - Primary sources: Microsoft reliability targets and business-continuity guidance.

2. **Backups, Replication and Point-in-Time Recovery — Three Different Jobs**
   - Published path: multicloud/backups-replication-point-in-time-recovery
   - Explain deletion propagation, retention, consistency across stores, isolation, immutability and key access.
   - Worked example: a bad change reaches both live copies; restore a clean point and reconcile legitimate later transactions.
   - Deliverable: a protection-and-restore checklist with evidence, rather than a product comparison promising universal behavior.
   - Primary sources: the selected Azure and OCI data services' backup and recovery documentation.

3. **Run a Recovery Exercise — Failover, Validation and Safe Failback**
   - Published path: multicloud/recovery-exercise-failover-validation-failback
   - Cover isolated testing, prerequisites, traffic switching, dependencies, split-brain prevention, business validation and failback as a separate operation.
   - Worked example: primary region unavailable with a constrained alternate region.
   - Deliverable: a runbook and results record with owners, measured interruption, recoverable data point, gaps and actions.
   - Primary sources: Microsoft disaster-recovery guidance and Oracle Full Stack Disaster Recovery documentation.

## Verification and independent review

Model test: node tests/resilience-planner.test.cjs.
Browser checks cover guide routes, desktop/mobile menus, the four demonstrations, reduced motion, planner conflict/reset behavior and responsive widths.
Two independent reviews completed on 11 September 2026: one for code, integration and accessibility; one for factual and pedagogical correctness.

Findings and disposition:
- P2: RPO diagram wording mixed an acceptable loss target with restore-history depth. Accepted: label now says maximum acceptable data loss, and the 15-minute gap is explicitly an example.
- P3: Shared question help was not associated with its radio group. Accepted: help IDs are referenced with aria-describedby, benefiting both planners.
- P3: Retained Azure residency reference was uncertain. Accepted after independently opening the replacement: updated URL, domain and description to the current Azure residency overview.
- Neither reviewer found a blocking model or integration defect. Findings were assessed against actual behavior; none required rejection.

Final checks cover all 288 planner combinations, four resilience scenes and their controls, reduced motion, widths 375/768/1024/1200/1440, desktop/mobile navigation, cross-guide links and platform/compliance/resilience interaction regression. The no-JavaScript resilience fallback remains readable. Browser tests used Chromium; this is not a screen-reader or Safari certification.

Production build and Astro type checking are required before the integration commit. Known pre-existing build notices concern deprecated Markdown plugin configuration and the large Knowledge Base graph chunk, outside this guide change.
