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

**Status:** Accepted  
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
The typographic hierarchy is legible and intentional. Each content register has a visual signature. Google Fonts loads all three in a single optimised request. The weight subset (400, 500, 600, 700 for Manrope and Inter; 400, 500 for JetBrains Mono) is defined in the font URL to avoid loading unused weights.

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

**Consequences.**  
Every page delivers meaningful content with zero JavaScript download and zero hydration latency. The three small scripts that do ship are inlined in their host components, so they incur no additional network round-trips. If a component genuinely needs client-side interactivity in the future, Astro's `client:*` directives can hydrate it without changing the architecture.

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

**Decision.** Replace the link sidebar with a toggle-button filter panel. Two named groups — **Platforms** (Azure, OCI) and **Topics** (Networking, Identity, Security, FinOps, Landing Zones, DevOps, BPM) — use `aria-pressed` toggle buttons. Filter logic is OR within a group, AND across groups. Active filter chips are rendered in a toolbar above the article list. Sort control (Latest first / Oldest first / Title A–Z) added to the toolbar. URL state preserved via `?platforms=&topics=&sort=` query params.

Category data derivation: platform is mapped from the article's `category` field (`azure` → platform `azure`); topics are derived from both the `category` field (for topic-category articles like `devops`, `bpm`) and from specific tags (`Networking`, `Landing Zones`, etc.).

**Consequences.**  
Users can now combine filters — e.g. select Azure (platform) + Networking (topic) to see Azure networking articles only. Dynamic counts on each filter button reflect matching articles given the other group's active selection. Filter and sort state survive browser back/forward navigation. The mobile experience uses the existing bottom-sheet pattern, updated with the same filter groups. `CategorySidebar.astro` is now a pure HTML scaffold with no icon dependencies; all filter logic lives in `knowledge-base/index.astro`.

A known CSS limitation: the `select:hover ~ chevron` sibling selector turns the sort chevron primary green only when hovering over the select text itself, not the chevron — because `<select>` cannot contain children and the chevron is a sibling, not a descendant. Acceptable at this scale.
