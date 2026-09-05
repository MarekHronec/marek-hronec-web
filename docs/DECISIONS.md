# Architecture Decision Records

Every significant technical choice is captured here in ADR format: context, options considered, decision made, and consequences. Records are numbered in rough chronological order by when the decision was made. For the resulting system these decisions produced, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## ADR-001: Framework — Astro over Next.js and Hugo

**Status:** Accepted  
**Date:** 2025-03-15

**Context.**  
A static portfolio requires: zero client-side JS by default, file-based routing, TypeScript support, and content validation. Three frameworks are in common use for this category of site.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Next.js 15 | Rich ecosystem; React Server Components; familiar | Ships React runtime even for static pages; SSG is secondary to SSR; operational complexity unnecessary for a portfolio |
| Hugo | Fastest static build times; mature; large theme library | Go templating; no TypeScript; no built-in schema validation; poor fit for a bespoke design system |
| Astro 6 | Zero JS by default; Content Collections with Zod; TypeScript-first; island architecture available for future needs | Newer ecosystem; smaller community than Next.js |

**Decision.** Astro 6 with `output: 'static'`.

**Consequences.**  
All pages are pre-rendered to HTML at build time. No server runtime. Island architecture is available if client-side interactivity is needed later without requiring a full rewrite. Build times are measured in seconds for the current content volume.

---

## ADR-002: Styling — Vanilla CSS with Custom Properties over Tailwind and CSS-in-JS

**Status:** Accepted  
**Date:** 2025-03-15

**Context.**  
The visual design system ("The Architectural Monograph") requires a bespoke token hierarchy: 5 tonal surface tiers, a precise typographic scale across 3 fonts, and glassmorphism scoped to exactly 2 elements. The question is how to implement it.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Tailwind CSS | Fast to prototype; large community | Utility-class stacks fight editorial intent; custom token integration requires config overhead; produces verbose markup; hard to read component structure at a glance |
| CSS Modules | Scoped by default; standard CSS | Adds build complexity; no inherent token system |
| CSS-in-JS (e.g. Stitches) | Co-located styles; TypeScript-typed tokens | Runtime dependency; complicates static output; unnecessary overhead |
| Vanilla CSS + custom properties | Zero runtime; full cascade control; named tokens; Astro provides native `<style>` scoping | Verbose for repeated patterns |

**Decision.** Vanilla CSS with CSS custom properties. All tokens live in `src/styles/tokens.css`. Astro's built-in `<style>` scoping handles per-component isolation.

**Consequences.**  
Styles are readable, debuggable in browser devtools without source maps, and produce no runtime overhead. Adding a new design token is one line in `tokens.css`. The tradeoff is slightly more typing for repeated patterns — accepted given the quality of control it provides.

---

## ADR-003: Content — Astro Content Collections over `import.meta.glob`

**Status:** Accepted  
**Date:** 2025-03-17

**Context.**  
Content (articles, case studies) is authored in Markdown with structured frontmatter. The question is how to load and validate it.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| `import.meta.glob` | Ships with Astro; zero config | Untyped; no frontmatter validation; errors appear at runtime or render time |
| Astro Content Collections + Zod | Compile-time validation; TypeScript types generated; clean query API | Requires schema definition upfront |
| Headless CMS (Contentful, Sanity) | Author-friendly UI; real-time previews | Network dependency at build time; operational overhead; cost; content lives outside the repo |

**Decision.** Astro Content Collections with Zod schemas defined in `src/content.config.ts`.

**Consequences.**  
A malformed `category` value causes `astro build` to fail with a clear error message, never a silent mis-render. `readTime` is optional — if omitted, it is calculated automatically at build time from word count using per-category reading speeds defined in `src/utils/readTime.ts`. TypeScript types for content entries are generated automatically. The content repository is the CMS — no external dependency.

---

## ADR-004: CSS Architecture — Tonal Layering over 1px Borders

**Status:** Accepted  
**Date:** 2025-03-20

**Context.**  
Section and card boundaries need visual separation. The conventional approach is `1px solid border`. The design system requires a different approach.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| `1px solid` borders | Universally understood; easy to implement | "Bootstrap-era" appearance; adds visual noise; interrupts the editorial grid |
| `box-shadow` | Soft; implies depth | Overused; associated with material design; inconsistent with the "stacked sheets of paper" metaphor |
| Background-colour shifts (tonal layering) | Invisible separation; tactile feel; matches the Architectural Monograph aesthetic | Requires a defined surface tier system; less obvious to implement |

**Decision.** Background-colour shifts across 5 surface tiers: `surface` → `surface-container-lowest` → `surface-container-low` → `surface-container` → `surface-container-high`. A `1px solid` border is permitted only for the header's glass border (at 8% opacity, it is effectively invisible) and explicit hairlines at 10% opacity where structural context demands a line.

**Consequences.**  
The layout reads as a series of stacked paper surfaces, consistent with the physical monograph metaphor. Components use `background-color` instead of `border` to establish boundaries. Adding a new card means choosing the correct surface tier, not adding a border.

---

## ADR-005: Glassmorphism — Scoped to Navigation and TOC Only

> **Status:** Superseded by ADR-029 — the header is now opaque; glass is scoped to the article TOC and the mobile filter sheet.

**Status:** Accepted  
**Date:** 2025-03-20

**Context.**  
Glassmorphism (frosted glass: semi-transparent surface + backdrop blur) is a legitimate design tool when used with restraint. The question is where to apply it.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Apply broadly (cards, modals, all overlays) | Visually rich | Reduces perceptual impact of the effect; expensive `backdrop-filter` calculations on every scrollable card |
| Apply only to structural chrome | Glass effect remains distinctive; low `backdrop-filter` cost | Requires discipline to resist adding it elsewhere |

**Decision.** Glass effects applied to exactly two elements: the sticky navigation header and the floating article TOC. Both receive `background: rgba(252,249,248, 0.80)` and `backdrop-filter: blur(24px)`.

**Consequences.**  
The nav and TOC feel like they float above content, which is appropriate for elements that persist during scroll. The effect reads clearly because it appears nowhere else. `backdrop-filter` is only active on two elements, not on every card in a scrolling grid.

---

## ADR-006: Fonts — Google Fonts CDN over Self-Hosted

**Status:** Superseded by ADR-025  
**Date:** 2025-03-22

**Context.**  
Three typefaces are needed: a display font (Manrope), a body font (Inter), and a monospace font (JetBrains Mono). These can be self-hosted or loaded from a CDN.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Self-hosted fonts | No external dependency; no privacy concerns; no CDN round-trip | Requires downloading, managing, and serving font files; more build complexity |
| Google Fonts CDN | Zero build complexity; strong CDN coverage; `display=swap` for FOUT control; fonts are often cached from other sites | External network dependency; Google can observe font load requests |

**Decision.** Google Fonts CDN with `<link rel="preconnect">` hints to `fonts.googleapis.com` and `fonts.gstatic.com`.

**Consequences.**  
Font loading is handled by the CDN. Preconnect hints reduce DNS and TLS handshake latency. `display=swap` prevents invisible text during font load. If self-hosting becomes a requirement (privacy policy, offline capability), the font files can be moved to `public/fonts/` and `global.css` updated with `@font-face` declarations — a contained change.

---

## ADR-007: Deployment — GitHub Pages over Vercel and Netlify

**Status:** Accepted  
**Date:** 2025-03-22

**Context.**  
The site is a static build. Several zero-config deployment platforms are available.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Vercel | Excellent DX; preview deployments; edge functions | Free tier has usage limits; slightly over-engineered for a static portfolio |
| Netlify | Feature-rich; form handling; identity | Similar concerns to Vercel; more platform than needed |
| GitHub Pages | Free; no usage limits on static sites; integrates directly with the source repository; custom domain support | No preview deployments; no edge functions; requires the official deploy action |

**Decision.** GitHub Pages via the `withastro/action`-equivalent GitHub Actions workflow (`actions/deploy-pages@v4`). Custom domain: `www.marekhronec.com`.

**Consequences.**  
Deployment is zero-cost and zero-dependency on third-party platforms. The source and the deployment are in the same GitHub account. No external service credentials to manage. Preview deployments are not available — changes are validated locally with `npm run build && npm run preview` before merging to `main`.

---

## ADR-008: TypeScript — Strict Mode

**Status:** Accepted  
**Date:** 2025-03-15

**Context.**  
TypeScript can be used in lenient mode (gradual adoption) or strict mode (full type safety). For a codebase where content schemas, component props, and routing must align precisely, the question is how much type safety to enforce.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Permissive TypeScript | Faster initial development; fewer type errors to resolve | Silent null reference bugs; frontmatter type mismatches only caught at runtime; props that accept `any` |
| Strict TypeScript | Catches null references, undefined access, and type mismatches at compile time | More upfront type annotation work |

**Decision.** TypeScript strict mode. All component props typed with interfaces. All content schemas typed through Zod inference. No `any` in production code.

**Consequences.**  
The Astro type checker (`npx astro check`) catches prop mismatches and schema violations before deployment. Category enum values (`'azure' | 'networking' | ...`) are validated at both the Zod layer (frontmatter parsing) and the TypeScript layer (component props). This eliminates an entire class of "why isn't this article showing in the right category" bugs.

---

## ADR-009: Typography — Manrope + Inter + JetBrains Mono

**Status:** Accepted  
**Date:** 2025-03-22

**Context.**  
Typography carries a significant portion of the editorial character of the design. A single-font stack is limiting; a four-font stack adds loading overhead without clear differentiation. The goal is to map typefaces to content roles with precision.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Single font (e.g. Inter for everything) | Minimal loading; simple system | Headlines lack the character needed for the Architectural Monograph aesthetic |
| Manrope only | Display font has the right weight for headlines; loads one font | Poor legibility for long-form body text at small sizes |
| Manrope + Inter + JetBrains Mono | Each font has a distinct role; Inter optimised for screen body text; JetBrains Mono built for code | Three font requests |

**Decision.** Three-font system:
- **Manrope** — display font for headlines, logo, case study titles; bold weights, tight tracking
- **Inter** — body font for all running copy, UI labels, metadata; optimised for screen legibility
- **JetBrains Mono** — monospace for all code blocks; designed for developer readability

**Consequences.**  
The typographic hierarchy is legible and intentional. Each content register has a visual signature. All three typefaces are self-hosted via fontsource npm packages and bundled by Vite — see ADR-025 for the font loading decision. The weight subset that ships is controlled by which fontsource import files are referenced: only `400.css` and `500.css` are imported for JetBrains Mono; Manrope Variable and Inter Variable load as single variable font files covering the full weight axis.

---

## ADR-010: JavaScript — Zero Client-Side JS Policy

**Status:** Accepted  
**Date:** 2025-03-28

**Context.**  
Modern frameworks default to shipping JavaScript. Astro defaults to shipping none. The question is where to draw the line for this project.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Framework JS (React or Vue islands) | Easy to add interactive components later | Ships a runtime for features that don't need it; slower page load |
| Selective Astro islands | Precise hydration; only interactive components get JS | Requires deliberate decisions per component |
| Zero JS as default | Fastest possible page load; no hydration budget to manage | Must evaluate every interactive requirement carefully |

**Decision.** Zero client-side JavaScript by default. All `.astro` components are server-only. Interactive features are implemented with the minimum JavaScript necessary:

1. **Hamburger menu** (`Header.astro`) — toggles ARIA attributes and a CSS class. No library.
2. **Article TOC scroll-spy** (`ArticleOutline.astro`) — IntersectionObserver watching heading elements; toggles a CSS class. Present only on article pages.
3. **KB filter** (`knowledge-base/index.astro`) — IIFE that reads URL params and shows/hides card wrappers. No library.
4. **Experience expand/collapse** (`ExperienceTimeline.astro`) — toggles `aria-expanded` and a CSS class to reveal additional bullet points per entry. No library.
5. **CategorySidebar mobile sheet** (`CategorySidebar.astro`) — toggles the bottom-sheet drawer on mobile for filter navigation. No library.
6. **KBSearch** (`KBSearch.astro`) — `is:inline` IIFE that dynamically imports the Pagefind bundle from `/pagefind/pagefind.js` on first input focus; runs debounced full-text search and renders results. Present only on the Knowledge Base listing page.

**Consequences.**  
Every page delivers meaningful content with zero JavaScript download and zero hydration latency. The six small scripts that do ship are inlined in their host components, so they incur no additional network round-trips. If a component genuinely needs client-side interactivity in the future, Astro's `client:*` directives can hydrate it without changing the architecture.

---

## ADR-011: SVG Icons — Component Files over Inline SVG or Icon Fonts

**Status:** Accepted  
**Date:** 2025-04-05

**Context.**  
Several UI elements require icons (certifications, tech stack categories, contact service cards). Options for managing them vary from inline SVG in every component to icon font libraries.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Inline SVG in each component | No imports; immediately visible in context | Duplicates SVG code across files; changes require editing every instance |
| Icon font (e.g. Font Awesome) | Easy to use; CSS-controlled size/colour | Loads many unused glyphs; font format; accessibility challenges |
| Standalone `.astro` icon components (`src/components/icons/`) | Single definition per icon; consistent props interface; typed; tree-shakeable at build time | Adds import line to using components |

**Decision.** Standalone `.astro` components in `src/components/icons/`. Each accepts `size`, `class`, and `aria-hidden` props. Icons are based on the Lucide icon set where available, with one custom icon (`BpmMerge.astro`) for the BPM category.

**Consequences.**  
Changing an icon requires editing one file. The props interface is consistent across all icons. TypeScript catches incorrect prop usage at build time. The custom `BpmMerge` icon (two bezier-connected nodes converging to one output) has a single definition that renders at 14px in the sidebar and any other size as needed.

---

## ADR-012: Shared Components Directory — `src/components/shared/`

**Status:** Accepted  
**Date:** 2025-04-15

**Context.**  
The tag badge visual pattern (neutral gray chip, uppercase label, 2px border-radius) was duplicated in `CaseStudyCard.astro` and `ArticleCard.astro` as separate `.cs-card__tag` and `.article-card__tag` CSS classes with identical values. When the `/credentials` page required the same badge for domain labels, a third copy would have been created.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Continue duplicating per-component | No import overhead; component stays self-contained | Three definitions to keep in sync; token drift risk |
| Inline the style in a base CSS file | Single CSS rule | Cannot be composed into arbitrary component trees as an Astro element |
| Extract to `src/components/shared/TagBadge.astro` | Single definition; typed props; importable anywhere | Adds import line to every using component |

**Decision.** `TagBadge.astro` extracted to `src/components/shared/`. The `shared/` directory exists for domain-agnostic components used across more than one page domain.

**Consequences.**  
A single `label: string` prop drives the badge. Any future change to tag styling (colour, font size, radius) is made in one file. `CaseStudyCard`, `ArticleCard`, and `credentials.astro` all import the same component. The `shared/` directory is now the established location for future cross-domain UI primitives.

---

## ADR-013: Credentials Page — Not Linked From Navigation

**Status:** Accepted  
**Date:** 2025-04-15

**Context.**  
A full certification registry page (`/credentials`) was added to list all professional certifications with issuer, year, domain tag, and verification links. The question was where to expose it in the site navigation.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Add to main nav | Maximum discoverability | Main nav already has the correct four items (About, Case Studies, Knowledge Base, Contact); adding a sub-page breaks the information architecture |
| Add to footer | Moderate discoverability | Footer links are for secondary pages (privacy, etc.); credentials is content, not infrastructure |
| Link only from the About certifications card | Contextually correct; the credentials page expands on content already on the About page | Requires a user to reach the About page first |

**Decision.** `/credentials` is linked exclusively from the "View all certifications" text link at the bottom of the certifications card in `CertsStackSection.astro`. The link is not present in `Header.astro` or `Footer.astro`.

**Consequences.**  
The main navigation stays clean and focused. Users who care about certifications find the link in the most contextually relevant place. The page is still crawlable by search engines via the static sitemap.

---

## ADR-014: ArticleCard Layout — Aligned With CaseStudyCard Pattern

**Status:** Accepted  
**Date:** 2025-04-15

**Context.**  
`ArticleCard.astro` had a different internal layout from `CaseStudyCard.astro`. The article card had date and read-time in the footer alongside tags. Case study cards had tags bottom-left and an arrow link bottom-right. This inconsistency was visible when navigating between the two sections.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Keep divergent layouts | Each card is optimised for its content type | Two different interaction patterns across pages; harder to maintain as one evolves |
| Align article card layout to case study card | Consistent card grammar across the site; single pattern to learn | Article card loses the prominent date/read-time position in the footer |

**Decision.** `ArticleCard.astro` restructured to match `CaseStudyCard.astro`: level badge and category label top-left, date and read time top-right, title and excerpt in the body, tags bottom-left, "Read More →" arrow link bottom-right. The card root changed from `<a>` to `<article>` with an explicit link in the footer.

**Consequences.**  
Users see the same card grammar across Case Studies and Knowledge Base. Date and read time moved to the header row, making them visible at a glance without scrolling to the footer. The `<a>`-root pattern was replaced with `<article>` + explicit link — a more semantically correct structure that allows future non-link elements inside the card without nesting interactive elements.

---

## ADR-015: WCAG AA Compliance — Opacity and Colour Fixes

**Status:** Accepted  
**Date:** 2025-04-15

**Context.**  
A Lighthouse accessibility audit identified four WCAG AA contrast failures:
1. `.narrative__expertise-footer` (quote text on dark card) — effective contrast 2.3:1; failed AA
2. `aside.narrative__expertise` (expertise list items on dark card) — failed AA
3. `.cta-banner__body` — body text on mint-green background failed AA
4. `div.cta-banner` — related to above

**Decision.** Four targeted fixes:
1. `--color-on-dark-dim` raised from `rgba(244,241,240,0.40)` to `0.60` — composited contrast on `#0e0e0e` is now 6.6:1 (AA ✓)
2. `--color-on-dark-muted` set to `rgba(244,241,240,0.65)` — 7.6:1 (AA ✓)
3. `.cta-banner__body` colour changed from `rgba(29,92,66,0.8)` to `var(--color-primary-dim)` (fully opaque `#1e5d43`) — 6.0:1 on mint background (AA ✓)
4. New tokens added to `tokens.css` for all values so they are reusable, documented, and not hardcoded inline

**Consequences.**  
All text elements pass WCAG AA (4.5:1 for normal text). The opacity adjustments are imperceptible in the rendered UI — the change from 0.40 to 0.60 reads as the same de-emphasised secondary text. Semantic tokens (`--color-on-dark-dim`, `--color-on-dark-muted`) are now available for any future dark-surface component.

---

## ADR-016: Footer Mobile Padding — Scoped With CSS `:has()`

**Status:** Accepted  
**Date:** 2025-04-15

**Context.**  
The Knowledge Base listing and article pages render a fixed bottom bar (`kb-mobile-bar`) on mobile for category navigation. Without additional padding, this bar overlaps the footer. The initial fix added bottom padding to the footer unconditionally on mobile, which increased footer height on every page.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Duplicate the footer for KB pages | Guaranteed isolation | Violates the single-component principle; two footers to maintain |
| Add a CSS class to `<body>` on KB pages | Straightforward selector | Requires JS or Astro prop threading from every KB page through BaseLayout |
| CSS `:has()` relational selector | Pure CSS; no prop threading; no JS; targets the exact condition | `:has()` is relatively new; supported Chrome 105+, Firefox 121+, Safari 15.4+ |

**Decision.** `body:has(.kb-mobile-bar) .footer` selector scopes the extra padding to pages that contain the KB mobile bar element. No changes to BaseLayout, no JS, no additional props.

**Consequences.**  
Footer height is unchanged on all pages except KB listing and article detail (mobile only). The `:has()` browser support covers all evergreen browsers as of 2024. The pattern is self-documenting — the selector reads as "footer inside a body that contains the KB bar."

---

## ADR-017: CTA Banner Surface — `#dce8e3` over `#b1f0ce`

> **Status:** Superseded by ADR-029 — the CTA banner is now a navy plate; the token was renamed `--color-primary-tint`.

**Status:** Accepted  
**Date:** 2025-04-16

**Context.**  
The CTA banner section on the About page uses a mint-green background (`--color-cta-surface`). The original value `#b1f0ce` is a saturated mint that reads as bright and playful — inconsistent with the premium, restrained editorial tone of the design system.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Keep `#b1f0ce` | Higher tonal contrast against page background | Too saturated; fights the warm-neutral palette; inconsistent with the "muted, sophisticated" aesthetic |
| `#dce8e3` (desaturated sage green) | Harmonises with the warm surface palette; feels premium rather than playful | Slightly lower contrast with the page background |

**Decision.** `--color-cta-surface` changed to `#dce8e3` — a desaturated sage that reads as a subtle tonal accent rather than a colour statement.

**Consequences.**  
The CTA section feels visually consistent with the surface tier system rather than standing out as a decorative block. Text colours on the banner (`--color-primary` for the heading, `--color-primary-dim` for the body) maintain WCAG AA contrast ratios on the new background. The button (`--color-primary` background) still reads clearly against the sage surface.

---

## ADR-018: Read Time — Build-Time Calculation over Manual Frontmatter

**Status:** Accepted  
**Date:** 2026-04-22

**Context.**  
Knowledge Base articles display a read time estimate ("8 min read") on listing and detail pages. Articles are technical, contain diagrams, and vary significantly in reading complexity by category. The question is how to produce this value.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Manual `readTime` frontmatter field (previous approach) | Exact author control | Goes stale as articles are edited; easy to forget; inconsistent across articles |
| Client-side calculation on page load | Always reflects current content | Adds JavaScript; runs on every page visit; inconsistent with zero-JS policy |
| Build-time calculation from word count | Zero runtime cost; always in sync with content; no maintenance | Word count includes markdown syntax (minor overcount); cannot account for subjective complexity |
| CMS-managed field | Author-friendly UI | No CMS in this stack |

**Decision.** Build-time word-count calculation using per-category words-per-minute (WPM) values defined in `src/utils/readTime.ts`. Manual `readTime` in frontmatter takes priority when present — this preserves the escape hatch for authors who want to override the estimate for a specific article.

Technical notes are more complex than narrative content, so KB categories use lower WPM values than case studies. Networking and DevOps articles (diagram-heavy, command-heavy) use lower WPM than FinOps articles (more conceptual prose). Code blocks are included in the word count because readers work through them too.

**Consequences.**  
Read time values stay accurate automatically as articles are edited. Adding a new article requires no manual read-time entry. Per-category WPM values can be tuned in a single config object (`READ_SPEED` in `src/utils/readTime.ts`) without touching any content files or page components. The manual override path is preserved for edge cases.

---

## ADR-019: KB Filter — Multi-Select Panel over Category Link Sidebar

**Status:** Accepted  
**Date:** 2026-04-22

**Context.**  
The original Knowledge Base listing used a link-based sidebar (`CategorySidebar.astro`) where each click navigated to a new URL (`?category=azure`), replacing the active filter entirely. This made it impossible to combine filters (e.g. "show Azure articles about Networking"). The sidebar also conflated platforms and topics into a single flat list.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Keep link-based sidebar | Simple; works without JS | Single active filter at a time; navigation-based (full page reload for each filter change) |
| Multi-select checkboxes | Standard form pattern | More visual weight; requires state management |
| Multi-select toggle buttons | Keyboard accessible; visual active state clear; consistent with editorial aesthetic | Requires JS for filter logic |

**Decision.** Replace the link sidebar with a toggle-button filter panel. Two named groups — **Platforms** (Azure, OCI) and **Topics** (Networking, Identity, Security, FinOps, Landing Zones, DevOps, BPM, Compliance) — use `aria-pressed` toggle buttons. Filter logic is OR within a group, AND across groups. Active filter chips are rendered in a toolbar above the article list. Sort control (Latest first / Oldest first / Title A–Z) added to the toolbar. URL state preserved via `?platforms=&topics=&sort=` query params.

Category data derivation: platform is mapped from the article's `category` field (`azure` → platform `azure`); topics are derived from both the `category` field (for topic-category articles like `devops`, `bpm`) and from specific tags (`Networking`, `Landing Zones`, etc.).

**Consequences.**  
Users can now combine filters — e.g. select Azure (platform) + Networking (topic) to see Azure networking articles only. Dynamic counts on each filter button reflect matching articles given the other group's active selection. Filter and sort state survive browser back/forward navigation. The mobile experience uses the existing bottom-sheet pattern, updated with the same filter groups. `CategorySidebar.astro` is now a pure HTML scaffold with no icon dependencies; all filter logic lives in `knowledge-base/index.astro`.

A known CSS limitation: the `select:hover ~ chevron` sibling selector turns the sort chevron primary green only when hovering over the select text itself, not the chevron — because `<select>` cannot contain children and the chevron is a sibling, not a descendant. Acceptable at this scale.

---

## ADR-020: Full-Text Search — Pagefind over Client-Side Alternatives

**Status:** Accepted  
**Date:** 2026-04-24

**Context.**  
The Knowledge Base listing page needs full-text search so users can find articles by keyword rather than navigating by category alone. The site is static — there is no server to run a search query against.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Algolia / Typesense hosted search | Production-quality relevance; typo tolerance; instant results | External dependency; API key management; cost at any meaningful scale |
| Fuse.js (client-side fuzzy search) | Zero external dependency; simple JS library | Requires loading the entire content index as JSON on every page visit; no excerpt extraction; no highlighted matched terms |
| Lunr.js | Mature client-side search | Similar to Fuse.js; larger bundle; index must be built separately |
| Pagefind | Indexes built HTML at build time; serves as static files alongside the site; ~25 KB JS bundle loaded lazily; returns excerpts with highlighted matches | Index only exists after `npm run build`; not available in dev mode |

**Decision.** Pagefind with a custom UI component (`KBSearch.astro`). The build script (`npm run build`) runs `npx pagefind --site dist` after `astro build` to generate the index in `dist/pagefind/`. Only KB article pages are indexed (via `data-pagefind-body`). The JS bundle is loaded lazily on first input focus to avoid any cost on page load.

**Consequences.**  
Full-text search works with zero runtime dependency and zero server. The Pagefind bundle (~25 KB) is loaded only when the user focuses the search field — all other visitors pay nothing. Results include excerpts with matched terms highlighted in `<mark>` tags. The index is not available in `npm run dev` mode — developers must run `npm run build && npm run preview` to test search locally. The `is:inline` Astro script directive is required to bypass Vite/Rollup resolution of the `/pagefind/pagefind.js` path, which only exists as a build artifact.

---

## ADR-021: WCAG 2.2 AA — Token Contrast, Skip Link Target, Diagram Role

**Status:** Accepted  
**Date:** 2026-04-28

**Context.**  
A full-site WCAG 2.2 Level AA audit (ARC Toolkit + manual review) identified failures not caught by the earlier Lighthouse pass in ADR-015:
1. `--color-meta-label` (`rgba(123,122,122,1)`) rendered at 4.05:1 on the warm surface — marginal fail below the required 4.5:1.
2. `--color-kb-text-muted` (`rgba(161,161,170,1)`) — approximately 2.4:1 on the page surface; used for KB column headers and count labels.
3. The skip link pointed at `<main id="main-content">` but the element lacked `tabindex="-1"`, making it non-programmatically focusable — the skip link had no effect for keyboard users.
4. The featured case study diagram `<div>` carried `aria-label` but no `role`, so the accessible name was ignored — a `role="img"` requirement per ARIA spec.

**Decision.** Four targeted fixes:
1. `--color-meta-label` raised to `rgba(100,100,100,1)` — contrast on `#fcf9f8` is now ~5.4:1 (AA ✓)
2. `--color-kb-text-muted` raised to `rgba(107,107,115,1)` — contrast now ~5.0:1 (AA ✓)
3. `tabindex="-1"` added to `<main id="main-content">` in `BaseLayout.astro`
4. `role="img"` added to the diagram `<div>` in `case-studies/index.astro`

**Consequences.**  
No visual change on any page — the colour shifts are imperceptible at these values. The skip link now correctly moves focus to the main content area. The diagram div's accessible name is now properly exposed to assistive technologies.

---

## ADR-022: WCAG 2.2 AA — Credentials Table Context, Heading Hierarchy, Scroll Offset, Focus Trap

**Status:** Accepted  
**Date:** 2026-04-28

**Context.**  
A structured WCAG 2.2 Level AA audit of the live site identified four issues beyond the contrast and structural failures addressed in ADR-015 and ADR-021:
1. `/credentials` renders cert data in a CSS grid layout using `<li>` + `<span>` elements. The column label row carries `aria-hidden="true"` (correct, as it duplicates visual information). Screen readers received the data values without any column context, violating 1.3.1 (Info and Relationships) and 4.1.2 (Name, Role, Value).
2. The case study detail `<aside>` sidebar contained `<h3>` headings with no `<h2>` ancestor in the same landmark — a hierarchy skip violating 2.4.6 (Headings and Labels).
3. The sticky header (≈4rem) overlaps fragment navigation targets and programmatically focused elements, violating 2.4.11 (Focus Not Obscured, Minimum).
4. The Knowledge Base mobile filter sheet carried `role="dialog"` and `aria-label` but had no focus management — focus did not move into the dialog on open, did not return to the trigger on close, Tab was not trapped, and ESC had no effect, violating 2.1.1 (Keyboard).

**Options considered:**

| Issue | Option A | Option B | Decision |
|---|---|---|---|
| Credentials column context | Convert to `<table>` element | Add `aria-label` to each data `<span>` | B — preserves the responsive CSS grid layout; avoids a structural rewrite |
| Heading hierarchy | Add visually-hidden `<h2>` before `<h3>`s | Promote `<h3>` to `<h2>` | B — the aside has no `<h2>`, so `<h2>` is the correct level |
| Sticky header offset | `scroll-padding-top` on `html` | JavaScript scroll adjustment | A — pure CSS, one line, no runtime cost |
| Focus trap | Add to existing `openSheet`/`closeSheet` | Separate focus manager utility | A — inline, minimal, consistent with the zero-dependency approach |

**Decision.** All four fixes applied:
- `aria-label="Credential: ..."`, `aria-label="Issuer: ..."`, `aria-label="Issued: ..."` added to the three data spans in each cert row in `credentials.astro`
- `<h3 class="cs-sidebar-card__heading">` → `<h2>` for all four sidebar headings in `[slug].astro`
- `scroll-padding-top: 4.5rem` added to the `html` rule in `global.css`
- `openSheet()` moves focus to `#kb-sheet-close`; `closeSheet()` returns focus to `#kb-mobile-trigger`; ESC listener and Tab focus trap added to `CategorySidebar.astro`

**Consequences.**  
No visual change on any page. Screen readers on the credentials page now receive column context alongside each data value. The case study sidebar heading structure is correct at `<h2>` level. Keyboard and focus navigation no longer lands under the sticky header. The mobile filter sheet is now a fully conformant ARIA dialog pattern: focus is managed, ESC works, and Tab does not escape the dialog while it is open.

---

## ADR-023: Knowledge Map Canvas — Cytoscape.js over D3 and Custom SVG

**Status:** Accepted  
**Date:** 2026-05-02

**Context.**  
The Knowledge Base listing page needs an optional "Learning Map" view that renders all articles as nodes in a directed graph, with two edge types: recommended reading-order paths (solid arrows) and conceptual relations (dashed lines). The graph must lay out hierarchically (top-to-bottom learning tracks), support pan/zoom, and render rich HTML node cards (title + difficulty chip + START HERE badge) rather than flat text labels. The feature must not affect page-load performance for users who never open the Map view.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Custom SVG with D3-force | Full control; no runtime dependency | Force layout produces organic cluster graphs, not hierarchical learning tracks; manual edge routing, pan/zoom, and hit-testing require significant custom code |
| D3 + dagre-d3 | Hierarchical layout; D3 ecosystem | dagre-d3 is largely unmaintained; no built-in HTML node labels; pan/zoom requires separate D3 zoom layer; still substantial custom wiring |
| Cytoscape.js + cytoscape-dagre + cytoscape-node-html-label | Production-grade graph library; dagre hierarchical layout built in; HTML labels via plugin; pan/zoom/select built in; declarative style sheets | ~200 KB bundle; `@types/cytoscape` does not fully model all extension APIs (requires `as unknown` casts) |
| React Flow | Excellent DX; built-in node types | Requires React runtime; incompatible with zero-JS Astro architecture |

**Decision.** Cytoscape.js 3.33 with cytoscape-dagre (hierarchical layout) and cytoscape-node-html-label (rich node templates). The entire bundle is dynamically imported (`import()`) only when the user activates the Map tab for the first time — zero cost on initial page load.

**Implementation notes:**
- Cytoscape's `.use()` static method lacks TypeScript declarations; registered via `(cytoscape as unknown as { use: ... }).use(plugin)`.
- Node HTML labels are injected outside the Astro component scope, so their CSS must be `<style is:global>`.
- The `active-bg-opacity: 0` core style suppresses Cytoscape's default gray click indicator (replaced by a custom atom animation).
- `round-taxi` curve style provides orthogonal routing with rounded corners — matching the design system aesthetic better than bezier or straight taxi edges.
- The `display: flex` on `.kbc-panel` overrides the browser's default `display: none` for `[hidden]` — restored with `.kbc-panel[hidden] { display: none }`.
- All data (nodes, edges) is serialised into `data-*` attributes at Astro build time and parsed at runtime, keeping the component interface clean and the Cytoscape bundle entirely out of the SSR path.

**Consequences.**  
Users who never open the Map view download zero additional JavaScript. Users who do open it receive the full interactive graph after a single dynamic import. The dagre layout renders clean top-to-bottom learning tracks automatically without manual node positioning. Build-time validation in `knowledge-graph.ts` (`validateEdges()`) ensures graph edges never reference non-existent articles. The TypeScript casts required for the Cytoscape plugin API are contained to three lines in `canvas.ts` and documented.

---

## ADR-024: Atom Click Indicator — rAF + CSS Transition over Pure CSS Animation

**Status:** Accepted  
**Date:** 2026-05-02

**Context.**  
The canvas needed a custom click indicator to replace Cytoscape's default gray `active-bg` circle. Several approaches were attempted.

**Options considered:**

| Option | Outcome |
|---|---|
| CSS keyframe ripple | Simple; but the two-phase behaviour (ping → atom) requires JS state |
| SVG overlay with rAF | Failed — Cytoscape's `stopPropagation()` on `mousedown` blocked event listeners on the canvas element; SVG appended to the wrapper was occluded by Cytoscape's canvas layers (z-index 4) |
| CSS blob with `border-radius` morphing | Worked; div appended to `canvasEl` (proven z-index 100) avoids the layer occlusion issue; but required separate hold/release class switching with an abrupt square flash on transition |
| Atom: rAF electron positions + CSS transition rings | Selected; JS places electrons each frame via parametric ellipse maths; CSS transitions handle the two-phase appearance (ping ring → orbit rings) cleanly |

**Decision.** rAF loop for per-frame electron positions; CSS custom property `--ring-angle` per ring element so JS passes the tilt angle while CSS owns the full `transform` (enabling `scale` animation in the transition). Two-phase behaviour: sonar ping via `::after` animation for 0–4 s; class `kbc-atom--active` added after 4 s triggers ring/electron fade-in via CSS transitions.

**Key constraint:** elements must be appended to `canvasEl` (the Cytoscape mount point), not to the wrapper, to sit above Cytoscape's canvas layers.

**Consequences.**  
The interaction provides a distinct, branded indicator with zero library dependency. Ping-to-atom continuity is achieved through CSS transitions on `scale` and `opacity` rather than matched sizes, so the animation is robust to timing variability. Quick taps (< 4 s) get a 200 ms fade; held interactions get a 380 ms scale-dissolve. The rAF loop is tied to the atom's lifetime and stops automatically when the container is removed from the DOM.

---

## ADR-025: Fonts — Self-Hosted via Fontsource over Google Fonts CDN

**Status:** Accepted  
**Date:** 2026-05-08

**Context.**  
ADR-006 chose Google Fonts CDN for simplicity. Two issues emerged in practice: (1) browser cache partitioning (implemented in Chrome 86+, Firefox 85+, Safari 13.1+) eliminates the "already cached from another site" benefit — every visitor fetches the fonts from Google's servers; (2) the text rendered in the system fallback font before the custom fonts arrived from the CDN was visibly different in weight and metrics, causing a noticeable FOUT on first load.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Google Fonts CDN (status quo) | Zero build complexity | CDN round-trip on every first visit; cache partitioning removed shared-cache benefit; FOUT from metric mismatch |
| Self-hosted via `public/fonts/` + manual `@font-face` | Full control; no CDN | Requires downloading font files, managing versions, writing `@font-face` declarations manually |
| Self-hosted via fontsource npm packages | Maintained packages with correct `@font-face` declarations; Vite bundles and hashes files automatically; SIL OFL license explicitly permits embedding | Adds npm dependencies (~3 packages) |

**Decision.** Self-hosted via `@fontsource-variable/manrope`, `@fontsource-variable/inter`, and `@fontsource/jetbrains-mono`. Imported in `src/styles/global.css`; Vite bundles the `.woff2` files into `dist/_astro/` with content-hashed filenames.

CSS `@font-face` fallback metric overrides (`ascent-override`, `descent-override`, `line-gap-override`, `size-adjust`) are declared for `ManropeFallback` and `InterFallback` so the system font (Arial/Helvetica) occupies the same layout space as the custom fonts. The font stack in `tokens.css` references the fallback families: `'Manrope Variable', 'ManropeFallback', sans-serif`.

**Consequences.**  
No external DNS lookup, TLS handshake, or CDN latency on any visit. Fonts are served from the same origin as the page — one fewer connection. The metric-matched fallbacks make the font swap imperceptible: layout does not shift when the custom fonts finish loading. All three typefaces are licensed under SIL Open Font License 1.1, which explicitly permits embedding and redistribution. The Google Fonts `<link>` tags and `preconnect` hints were removed from `BaseLayout.astro`.

---

## ADR-026: KB Callout Authoring — Directive Syntax over Raw HTML

**Status:** Accepted  
**Date:** 2026-05-08

**Context.**  
Knowledge Base articles required two types of callout blocks (tip and warning). The original implementation required authors to write raw HTML `<div>` structures with nested icon SVGs directly inside `.md` files. This polluted the Markdown source, made articles harder to read and edit, and created a maintenance burden if the callout HTML structure ever changed.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Raw HTML in Markdown (status quo) | No build config | Verbose; fragile; markup duplicated across 25 articles; hard to read in source |
| Astro component shortcode | Clean authoring | Astro components cannot be imported into `.md` content collection files |
| MDX | Supports component imports in Markdown | Requires switching content files from `.md` to `.mdx`; changes the collection loader pattern; adds complexity |
| `remark-directive` + custom plugin | Clean `:::tip[Label]` syntax; works with `.md` files; HTML generated once in the plugin | Requires two npm packages and a custom plugin file |

**Decision.** `remark-directive` (npm) parses `:::name[label]` container directive syntax in the Markdown AST. A custom plugin (`src/plugins/remark-callouts.mjs`) transforms `:::tip[...]` and `:::warning[...]` nodes into the exact HTML structure matching the existing `.callout-tip` and `.callout-warning` CSS classes. Both plugins are registered in `astro.config.mjs` under `markdown.remarkPlugins`.

Authoring syntax:
```
:::tip[Architectural Pro Tip]
Your tip content here. Standard Markdown inline formatting works.
:::

:::warning[Critical Caveat]
Your warning content here.
:::
```

All 25 existing articles were migrated from the HTML format to directive syntax in a one-shot Node.js script (`scripts/migrate-to-directives.mjs`).

**Consequences.**  
Article source files are readable Markdown again. Changing the callout HTML structure requires editing one plugin file, not 25 article files. The directive syntax is a documented standard (`remark-directive` spec), not a bespoke convention. The CSS classes remain unchanged, so no visual change resulted from the migration.

---

## ADR-027: KB Article References — Frontmatter Array over Inline HTML

**Status:** Accepted  
**Date:** 2026-05-08

**Context.**  
Knowledge Base articles included a "Further Reading" section at the end of the Markdown body, rendered as a `<div class="references">` block containing `<a class="ref-item">` elements with inline styles and structure. This had the same maintenance problems as the callout HTML: raw HTML in Markdown source, structure duplicated across articles, and reference data mixed into prose.

**Options considered:**

| Option | Pros | Cons |
|---|---|---|
| Raw HTML in Markdown (status quo) | No build changes | Verbose; hard to read; duplication; rename of CSS class requires updating every article |
| Markdown link list below content | Simple | No structured metadata (description, domain label); CSS cannot target them distinctly from body links |
| Frontmatter YAML array | Data separated from prose; structured fields; rendered by the page template once; type-validated by Zod | Requires schema extension and template update |

**Decision.** References moved to a `references` YAML array in article frontmatter. Each entry has four fields: `title` (link text), `url` (destination), `description` (one-sentence summary), `domain` (source domain label). The `knowledgeBase` Zod schema in `src/content.config.ts` validates the array. The `knowledge-base/[...slug].astro` page template renders the references section from `entry.data.references` — outside the `.prose` div, after the article body.

All 25 articles were migrated as part of the same one-shot script that handled the callout directive migration (ADR-026). The `## Further Reading` heading and its HTML block were removed from each article body during the same pass.

**Consequences.**  
Article Markdown files contain only prose and directives — no structural HTML. Reference data is queryable as structured data if needed in future (e.g. generating a site-wide reading list). Changing the reference card layout requires editing one template file, not every article. The Zod schema provides build-time validation: a malformed URL in any article's `references` array aborts the build with a clear error.


## ADR-028: remark-directive Text Directives and ISO Cert Notation

**Status:** Accepted  
**Date:** 2026-05-18

**Context.**  
Knowledge Base compliance articles use ISO certification version notation throughout prose (`ISO 27001:2022`, `ISO/IEC 27001:2023`, etc.). The site uses `remark-directive` v4 to parse `:::tip[...]` / `:::warning[...]` callout blocks. It was discovered that `micromark-extension-directive` v4 (the tokeniser underlying `remark-directive`) parses any inline `:name` token as a text directive — including names starting with a digit. The `factoryName` function accepts any character that is not EOF, line ending, punctuation, or whitespace as a valid name starter; digits pass. `remark-directive` therefore consumed `:2022` in `ISO 27001:2022` as a `textDirective` node with name `2022`.

The `remarkCallouts` plugin only handled `containerDirective` nodes (`:::tip` / `:::warning`). Unhandled `textDirective` nodes were left in the MDAST and serialised by rehype into empty `<div>` elements. A block-level `<div>` inside a `<p>` causes browsers to auto-close the paragraph before the div, splitting prose like `ISO 27001:2022, BSI C5 Type 2.` across three separate HTML elements with visible blank gaps.

A second compounding problem: Astro 6 Content Layer stores pre-processed HTML in a persistent cache at `node_modules/.astro/data-store.json`. Deleting `dist/` and `.astro/` does not clear this cache. Plugin changes have no effect on build output until `node_modules/.astro/` is also deleted.

**Decision.**  
Added a `visit(tree, 'textDirective', ...)` handler to `remarkCallouts` (before the existing `containerDirective` handler) that converts any unrecognised `textDirective` node to a plain `text` node with its literal colon-name value. `:2022` becomes the text string `:2022`, preserving the original prose. This covers all articles site-wide without requiring content file changes.

**Consequences.**  
ISO certification notation renders correctly in all prose paragraphs. Any future content using `:YEAR` or other `:word` patterns is handled automatically. The `:::` container directive namespace for callout blocks is unaffected.

**Cache note.** When modifying remark/rehype plugins and build output does not reflect the change: delete `node_modules/.astro/` (the Astro 6 Content Layer data store) in addition to `dist/` and `.astro/`.
## ADR-029: Marine Blue Identity — Drawn Structure, Square Corners, Opaque Header

**Status:** Accepted
**Date:** 2026-08-30
**Supersedes:** ADR-005 (glassmorphism on the header), ADR-017 (mint CTA surface)

**Context.**
The site read as generically machine-generated despite each individual decision being defensible. Four patterns were doing the damage, all of them house style in AI-authored marketing pages:

1. **Muted teal on warm paper.** A green accent over off-white is the single most common palette in generated portfolio sites. The colour carried no connection to the owner or the subject matter.
2. **Tonal blocks everywhere.** The "no-line" rule (ADR-002 / DESIGN.md §2) pushed every separation into a tinted panel. Stacked pastel cards is a recognisable generated-page signature, and the effect compounds down a long page.
3. **Rounded corners on everything.** `--radius-md` (`0.5rem`) on cards and `--radius-lg` (`0.75rem`) on banners produced the soft-bubble look the design system explicitly claimed to reject.
4. **All-caps eyebrow labels above headings.** "INTRODUCTION", "PROVEN CLOUD SOLUTIONS", "DIRECT COMMUNICATIONS", "PROFESSIONAL CREDENTIALS". Each sat above a heading that already said the same thing. They are pure filler and read as machine boilerplate.

A brand mark existed independently of the site — an MH anchor monogram on a deep navy plate — which had never been used anywhere in the design. The site had a latent nautical vocabulary (the ship illustrations, the 404 chart background and compass rose) that the palette and chrome were not supporting.

**Decision.**

*Colour.* One hue carries the whole site, drawn from the mark: `--color-primary` `#1c4d7c` (marine blue, 8.4:1 on the page surface) for links, icons and structural accents; `--color-navy` `#14315c` for brand plates; `--color-primary-tint` `#e3edf6` for active washes. Depth comes from the marine ramp, never from a second hue. `--color-inverse-surface` moved from neutral `#0e0e0e` to `#0b1c2f` so code blocks sit inside the colour story, and `--color-code-accent` moved from emerald to pale sky. The article level badges collapsed from a green/yellow/green set to a single marine ramp, so difficulty reads as depth. `--color-quote-accent` (`#2e5c7a`, previously reserved for blockquote left borders as a deliberate contrast to the teal) was retired: with a marine primary the two hues are indistinguishable, and one hue with one meaning is the stronger rule. Blockquotes now use `--color-primary`.

*Structure.* Hairline rules replace tonal blocks as the primary means of separation. Two weights: `--color-divider` (12%) for rows inside a register, `--color-divider-strong` (22%) for section rules, column splits and icon rings; `--color-on-dark-border` (white 14%) does both jobs on navy. Rules are strategic, not systematic — they never appear between every item of a content list. The About page now carries no tinted panel at all: the process steps, certifications and technical stack sit directly on the page surface, split by one vertical hairline, with a single navy plate beside them.

*Corners.* `--radius-xs/sm/md/lg` all resolve to `0`. `--radius-full` survives for circular marks only. The tokens were kept rather than deleted so each call site's intent stays legible.

*Header.* Glassmorphism removed. The header is opaque `--color-surface` with one `--color-divider` bottom rule, and carries the brand lockup (mark + name + role). Glass remains only on the floating article TOC and the mobile filter sheet — elements that genuinely float over scrolling content. ADR-005 restricted glass to "structural chrome and navigation aids"; the header is chrome, but a blurred bar reads as an application, and this site is a document.

*Eyebrows.* All six removed (hero, case studies listing, case study detail, credentials, contact, knowledge base), along with the two `contact-card__label` chips. The `caseStudyNumber` prop that fed the case study eyebrow was removed from `getStaticPaths`. Small-caps labels survive only where they *name* a section — CERTIFICATIONS, TECHNICAL STACK, HOW I WORK, CORE EXPERTISE — each now underscored by a 2.5rem primary rule.

*Nautical marks.* Four icon components carry the maritime vocabulary into the page: `CompassRose`, `Lighthouse` and `DraftingCompass` are third-party SVGs cleaned of generator comments, DOCTYPE declarations and hardcoded fills, with `currentColor` applied at the root; `ShipsWheel` is hand-drawn to match their optical weight because no suitable source was available. They appear in ringed wells whose geometry is shared between the process steps (5rem) and the credential seals (2.5rem), so the two sections read as one system.

*Brand mark.* The vectorised master artwork is used verbatim. `src/components/layout/Logo.astro` carries the two emblem paths (ring + anchor + monogram) on a square `203 136 845 845` viewBox, painted in `currentColor` so one file serves the navy-on-paper header and any white-on-navy plate.

The trace's thinnest element — the ring — is about 10 units in that 845-unit box, which resolves to under half a CSS pixel at the 38px header size and antialiases to grey. Rather than redraw it, the component strokes the shapes in their own fill colour, which dilates every edge outward, and solves the width per render so the ring never falls below 1.1 CSS px: `max(0, (1.1 x 845) / size - 10)`. At 38px that is a 14.5-unit dilation; past roughly 93px it resolves to zero and the artwork renders exactly as traced. `public/favicon.svg` applies the same trick at a fixed 24-unit dilation, chosen by rendering candidates at 16/32/64px — a browser tab needs a different optical weight than a header lockup.

`public/apple-touch-icon.png` (180px) and `public/images/og-image.png` (1200x630) are generated from the same master with `sharp`, which is already present as an Astro dependency. The share card is the full lockup at true proportions — emblem over the real wordmark glyph paths, not typeset text. `ogImage` became a `BaseLayout` default rather than a prop repeated on seven pages.

*How I Work.* The narrative section was rebuilt as three connected steps — Understand / Design / Enable — each a numbered token above a ringed mark, joined by dotted connectors. Connectors are drawn as a `::before` on every well-row after the first, reaching back across the grid gap; because the well-row is exactly one grid column wide, the `50%` in that calculation resolves to the column centre at any viewport, and the connector is suppressed below 640px where the grid collapses.

**Alternatives considered.**

| Option | Why not |
|---|---|
| Keep the teal, change only the chrome | The palette was the loudest generic signal; changing corners alone would not have moved the page |
| Adopt navy but keep tonal blocks | Navy panels stacked on tinted panels is heavier, not cleaner — the restraint is what makes the one plate read as deliberate |
| Rule every list for consistency | A rule between every item is as noisy as a panel around every section; whitespace still separates content within a block |
| Embed the logo PNG | Vector geometry is crisp at 16px, recolours with `currentColor`, and costs ~2KB against a raster's tens of KB |
| Redraw the ring thicker for small sizes | Two divergent versions of the mark to keep in sync; dilating the real geometry keeps one source of truth |

**Consequences.**
Almost all of the change landed in `src/styles/tokens.css`, because colour and radius were already fully tokenised — no component hardcoded either. The exceptions were `src/scripts/canvas.ts` and `KnowledgeCanvas.astro`, where the Learning Map's categorical branch palette is necessarily literal: `cloud-reality` moved to marine and `governance` moved from slate-blue `#3e6daa` to teal-cyan `#2f7d8c` to stay distinguishable from it.

`BadgeCheck.astro` and `BookOpen.astro` became unused and were deleted. `--color-cta-surface` was renamed `--color-primary-tint`: the CTA banner it was named for is now a navy plate, while its four other call sites were always using it as an active-state wash.

`public/images/og-image.webp` is no longer referenced. It is retained rather than deleted because it contains the ship illustration; it needs recolouring or removal.

**Open follow-up.** No `site.webmanifest` yet — the apple-touch-icon is linked directly from `BaseLayout`.

**Colour note.** The supplied logo file paints its plate `#041f42`, appreciably darker than the `#14315c` this ADR adopts. `#14315c` was sampled from the logo as rendered and is what every contrast ratio here was checked against; the site and the brand assets both use it. If the artwork's value is the canonical one, changing `--color-navy` is a one-token edit, but the on-dark text ratios need re-checking.
