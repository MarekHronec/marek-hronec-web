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

## Connectivity visual redesign

Replaced the repeated vessel/harbour scenes with four different mechanisms in the marine palette: three staged network/identity tests; a route selector with request and reply inspection receipts; a DNS lookup returning an address before a separate application connection; and a cable break with a delivery record that retains the interruption after recovery. Each scene has its own choreography and visible outcome. Updated the surrounding explanations and controls to match.

Shared ConnectivityFigure keeps labels readable on phones with a 560-unit scrollable figure, a visible scroll instruction and a keyboard-focusable region. Scene typography is tokenised; all motion remains on the existing explainer timeline, with no extra client controller or dependencies.

Two independent reviews identified and resolved three issues: service-specific public-access wording, preserving earlier delivery history, and mobile label size. Follow-up reviews confirmed the fixes. Browser checks passed for all four timelines, replay/pause/reset, reduced motion, no-JavaScript content and five viewport widths. Additional timeline assertions verified ordered access outcomes, request/reply receipts, DNS answer before connection and retained missed-delivery marks after recovery. Desktop scene screenshots and a phone screenshot were inspected; keyboard scrolling was verified independently. The pause test now awaits Animation.ready rather than assuming the asynchronous browser pause has settled after a fixed delay.

Final validation: Astro check 146 files, zero errors/warnings/hints; production build 72 pages and successful Pagefind indexing. Existing Markdown deprecation and Knowledge Base chunk-size notices remain. Locally merged after verification; no push.

## Marine storytelling correction

The network-diagram redesign did not satisfy the intended naval visual language. Rebuilt all four illustrations around concrete marine mechanisms: a closing harbour boom and cargo permits; a customs quay with outward cargo and a return manifest; harbour radio updating a captain's berth note before sailing; and separate passages around a headland with a persistent arrivals log. Reused the site's drawn vessel, chart water and harbour vocabulary alongside new quay, warehouse, crane, customs and cargo geometry. Copy explicitly maps each analogy to its network meaning.

Two independent source reviews found the analogies and timing sound. Removed an unexplained second arrival from the log and an obsolete cable selector. Browser QA after restarting the preview (which had retained old CSS movement paths) passed all four controls, reduced motion, no-JavaScript content and five viewport widths. Inspected all four final scene screenshots. Staged assertions confirmed ordered permit outcomes, customs checks, berth answer before sailing, and missed arrivals remaining after recovery. Astro check: 146 files, no errors/warnings/hints. Production build: 72 pages, successful search index. No push.
