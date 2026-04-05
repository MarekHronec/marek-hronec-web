# Architecture Documentation

## Overview

Personal portfolio for Marek Hronec — Senior Cloud Architect. Static site deployed
to GitHub Pages. Target audience: recruiters and hiring managers.

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Astro 6 (static output) | Zero JS by default, file-based routing, Content Collections |
| Language | TypeScript (strict) | Type-safe props, schemas, utilities |
| Styling | Vanilla CSS + custom properties | No framework overhead; full control over the editorial design |
| Content | Markdown + Zod schemas | Frontmatter validation; author-friendly authoring |
| Fonts | Google Fonts CDN | Manrope (display), Inter (body), JetBrains Mono (code) |
| Deployment | GitHub Actions + GitHub Pages | Zero-cost hosting; push-to-deploy on `main` |

---

## Repository Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer — shared shell
│   ├── about/           # Hero, Narrative, Certs, TechStack, Experience, CTA
│   ├── case-studies/    # CaseStudyCard, MetricsBar, etc.
│   ├── knowledge-base/  # CategorySidebar, ArticleCard, TOC, etc.
│   ├── contact/         # ContactHero, ContactChannels, Services
│   └── shared/          # TagBadge, LevelBadge, etc.
├── content/
│   ├── case-studies/    # *.md — validated by caseStudies schema
│   └── knowledge-base/  # **/*.md — validated by knowledgeBase schema
├── layouts/
│   └── BaseLayout.astro # HTML shell, SEO meta, font loading
├── pages/
│   ├── index.astro              # /
│   ├── case-studies/
│   │   ├── index.astro          # /case-studies
│   │   └── [slug].astro         # /case-studies/:slug
│   ├── knowledge-base/
│   │   ├── index.astro          # /knowledge-base
│   │   └── [...slug].astro      # /knowledge-base/:slug
│   ├── contact.astro            # /contact
│   └── 404.astro                # 404
├── styles/
│   ├── tokens.css       # All CSS custom properties (single source of truth)
│   └── global.css       # Reset, base typography, layout utilities
├── utils/               # TypeScript helpers (formatDate, etc.)
└── content.config.ts    # Astro Content Collections + Zod schemas

docs/                    # Project documentation
.github/workflows/       # CI/CD
public/                  # Static assets (favicon, OG images)
```

---

## Content Model

### Knowledge Base (`src/content/knowledge-base/**/*.md`)

```ts
{
  title:    string
  category: 'azure' | 'networking' | 'identity' | 'security' | 'finops' | 'gcp' | 'devops' | 'bpm'
  tags:     string[]
  date:     Date
  readTime: number       // minutes
  level:    'beginner' | 'intermediate' | 'advanced'
  excerpt:  string
}
```

Organised into subdirectories matching `category`. The glob loader pattern
`**/*.md` picks up all articles recursively.

### Case Studies (`src/content/case-studies/*.md`)

```ts
{
  title:    string
  client:   string
  industry: string
  duration: string       // e.g. "6 months"
  tags:     string[]
  featured: boolean
  metrics:  { label: string; value: string }[]
  excerpt:  string
}
```

---

## Design Decisions

### No Tailwind / No UI Frameworks
Chosen deliberately to enforce the "Architectural Monograph" aesthetic.
Tailwind utility classes would fight the editorial intent; a bespoke token system
gives full control.

### Tonal Layering Over Borders
Per DESIGN.md, section separation is achieved through surface-tier background
shifts (`surface → surface-container-low → surface-container`) rather than
`1px solid` borders.

### Glassmorphism for Navigation & TOC
Header and floating TOC use `backdrop-filter: blur(24px)` with `surface` at
80% opacity. This is the only place glass effects are used.

### Content Collections (not `import.meta.glob`)
Astro Content Collections with Zod schemas provide compile-time validation of
frontmatter, type-safe access to content, and cleaner query APIs
(`getCollection`, `getEntry`).

### Static Output
`output: 'static'` in `astro.config.mjs`. All pages pre-rendered at build time.
No server-side logic. GitHub Pages compatible.

### Zero Client-Side JS by Default
All components are `.astro` (server-only). The only JS shipped is the hamburger
menu toggle in `Header.astro` — a single inline script, no bundle.

---

## Routing

| URL | File | Notes |
|-----|------|-------|
| `/` | `src/pages/index.astro` | About / Landing |
| `/case-studies` | `src/pages/case-studies/index.astro` | Listing |
| `/case-studies/:slug` | `src/pages/case-studies/[slug].astro` | Detail |
| `/knowledge-base` | `src/pages/knowledge-base/index.astro` | Listing |
| `/knowledge-base/:slug` | `src/pages/knowledge-base/[...slug].astro` | Article |
| `/contact` | `src/pages/contact.astro` | Contact |
| `404` | `src/pages/404.astro` | Not found |

---

## Deployment Pipeline

```
git push origin main
        │
        ▼
GitHub Actions (.github/workflows/deploy.yml)
  ├── Checkout
  ├── Node 22 + npm ci
  ├── npm run build  →  dist/
  └── Deploy to GitHub Pages
```

The `deploy.yml` workflow uses the official `withastro/action`-equivalent
`actions/deploy-pages@v4` action with an `upload-pages-artifact` step.

---

## CSS Token Reference

All values live in `src/styles/tokens.css`. Key tokens:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#2c694e` | Links, CTAs, accents |
| `--color-surface` | `#fcf9f8` | Page background |
| `--color-on-surface` | `#323232` | Body text (never pure black) |
| `--color-surface-container-low` | `#f6f3f2` | Card backgrounds |
| `--gradient-cta` | `145deg, primary → primary-dim` | Primary buttons |
| `--glass-bg` | `rgba(252,249,248, 0.80)` | Nav / TOC glass |
| `--ease-standard` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | All transitions |
| `--font-display` | Manrope | Headlines, logo |
| `--font-body` | Inter | Body copy, UI |
| `--font-mono` | JetBrains Mono | Code blocks |