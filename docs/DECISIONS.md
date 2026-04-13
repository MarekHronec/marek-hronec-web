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
A malformed `category` value or missing `readTime` field causes `astro build` to fail with a clear error message, never a silent mis-render. TypeScript types for content entries are generated automatically. The content repository is the CMS — no external dependency.

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

1. **Hamburger menu** (`Header.astro`) — 10-line inline script toggling ARIA attributes and a CSS class. No library.
2. **Article TOC scroll-spy** (`ArticleOutline.astro`) — IntersectionObserver watching heading elements; toggles a CSS class. Present only on article pages.
3. **KB filter** (`knowledge-base/index.astro`) — IIFE that reads URL params and shows/hides card wrappers. No library.

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
