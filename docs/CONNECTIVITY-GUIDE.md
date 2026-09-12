# Connectivity guide

feature/connectivity-guide adds /connectivity with access, routing, DNS and redundant-path demonstrations, a pure five-question brief model and the existing shared panel/controller. It connects all five guides through navigation and related offers. No network inspection, persistence or provider calls occur.

Revised two linked networking articles: hybrid connectivity and transit topology. Removed unsupported universal recommendations, fixed conflation of link aggregation with location diversity, separated private paths from encryption, qualified Virtual WAN tier/configuration behaviour and explained routing rather than assuming every flow passes a hub. Sources are linked inline and on the guide. Other networking articles are not represented as re-audited.

Next article briefs (not published links):
- Private DNS Across Cloud and On-Premises — Trace One Query End to End. Cover client resolver, forwarding, private zones, caches/TTL and a diagnostic record of expected versus observed answers. Include safe synthetic-name examples and a checklist for each client location.
- Private Endpoints — Reachability Is Not Authorisation. Cover public access settings, endpoint approval, identity, TLS and positive/negative access tests. Include a service-specific validation sheet rather than universal firewall assumptions.

Two independent reviews completed and passed: code/model/accessibility and factual/pedagogical content. Neither found an actionable defect; no findings were dismissed.

Validation: 243 complete planner combinations plus invalid/partial inputs, requirement-gap counts, private access and redundant-path branches. Chromium browser checks passed for guide routes and cross-links, all four scene controls (initial replay, pause, replay, reset), completed motion endpoints, reduced motion, both brief resets, four unknown-requirement gaps, the sticky result toolbar, desktop/mobile navigation, widths 375/768/1024/1200/1440 and readable no-JavaScript explanations. Screenshots of all scenes and the mobile brief were inspected. Browser automation needed a corrected selector and a render-frame wait before endpoint screenshots; these were test-harness fixes. No Safari or screen-reader certification is claimed.

Astro check: 145 files, zero errors/warnings/hints. Production build and Pagefind succeeded: 72 pages. Existing Markdown configuration deprecation and large Knowledge Base bundle notices remain outside this change.

Merged locally to main after verification. No push or deployment.
