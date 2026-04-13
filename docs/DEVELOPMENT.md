# Development Guide

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Setup](#2-setup)
3. [Commands](#3-commands)
4. [Project Conventions](#4-project-conventions)
5. [Component Patterns](#5-component-patterns)
6. [CSS Conventions](#6-css-conventions)
7. [Build and Preview](#7-build-and-preview)
8. [Deployment](#8-deployment)

---

## 1. Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node.js | ≥ 22.12.0 | Specified in `package.json` `engines` field |
| npm | Ships with Node 22 | `npm ci` used in CI — requires `package-lock.json` |

No global Astro CLI installation is required. All commands run through the local project binary via `npm run`.

---

## 2. Setup

```sh
git clone https://github.com/MarekHronec/marek-hronec-web.git
cd marek-hronec-web
npm install
npm run dev
```

The dev server starts at `http://localhost:4321`. Changes to `.astro`, `.ts`, `.css`, and `.md` files trigger hot reload automatically.

---

## 3. Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server at `localhost:4321` |
| `npm run build` | Build the production site to `dist/` |
| `npm run preview` | Serve the `dist/` output locally for production verification |
| `npm run astro` | Access the Astro CLI directly (e.g. `npm run astro check`) |
| `npx astro check` | Run TypeScript type-checking across all `.astro` files |

Run `npm run build` before every commit that will be merged to `main`. The build is the authoritative test: if it passes, the site will deploy correctly.

---

## 4. Project Conventions

### File naming

| Type | Convention | Example |
|---|---|---|
| Astro components | PascalCase.astro | `HeroSection.astro` |
| Layout files | PascalCase.astro | `BaseLayout.astro` |
| Page files | kebab-case.astro | `case-studies.astro` |
| Content files | kebab-case.md | `azure-landing-zones.md` |
| CSS files | kebab-case.css | `tokens.css` |
| TypeScript utilities | camelCase.ts | `formatDate.ts` |

### Component organisation

Components are organised by the page or domain they serve:

```
src/components/
├── about/          ← used only on index.astro
├── case-studies/   ← used on case study listing and detail pages
├── contact/        ← used only on contact.astro
├── icons/          ← standalone SVG icon components, used anywhere
├── knowledge-base/ ← used on KB listing and article detail pages
└── layout/         ← Header, Footer — shared across all pages
```

A component that is used on more than one page and doesn't belong to a domain (e.g. a shared utility component) would go in `src/components/shared/`. Currently no such components exist.

### Component size limit

Components should stay under 150 lines. When a component grows beyond this, extract a logical sub-component. For example, `CertsStackSection.astro` handles both the certifications list and the tech stack grid because they share a card layout — but if either section became significantly more complex, it would be extracted.

### Data flow

All data flows downward through props. There is no global state. Components receive data from:
- Page-level `getCollection()` calls passed as props
- Inline data structures (e.g. the certifications array in `CertsStackSection.astro`)
- `Astro.props` for layout components

---

## 5. Component Patterns

### Astro component structure

```astro
---
/* Block comment explaining non-obvious decisions */

import SomeIcon from '../icons/SomeIcon.astro';

interface Props {
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  optional?: string;
}

const { title, level, optional = 'default' } = Astro.props;
---

<section class="my-component">
  <h2 class="my-component__title">{title}</h2>
</section>

<style>
  .my-component {
    /* component styles — all values from tokens */
  }
</style>
```

Key rules:
- Props must be typed with a TypeScript interface
- Destructure props with defaults in the frontmatter
- Scoped `<style>` tag at the end of the file
- No inline styles in the template
- No `!important`
- All values from `tokens.css` custom properties

### Icon components

All icons in `src/components/icons/` accept this interface:
```ts
interface Props {
  size?: number;
  class?: string;
  'aria-hidden'?: boolean | string;
}
```

Import and use:
```astro
import BadgeCheck from '../icons/BadgeCheck.astro';

<BadgeCheck size={20} aria-hidden="true" />
```

Always set `aria-hidden="true"` on decorative icons. If an icon is the sole content of an interactive element, provide an `aria-label` on the parent.

### Content queries

Content collections are queried at the page level with `getCollection()`:
```ts
import { getCollection } from 'astro:content';
const articles = await getCollection('knowledgeBase');
```

The returned entries are passed as props to components. Components do not call `getCollection()` directly.

---

## 6. CSS Conventions

The full design system rationale — colour philosophy, typography scale, surface tier system, interactive states — is in [DESIGN.md](DESIGN.md). The complete token reference is in [ARCHITECTURE.md — Styling Architecture](ARCHITECTURE.md#7-styling-architecture).

### Token use

Every visual value must reference a CSS custom property from `src/styles/tokens.css`. No hardcoded colours, font sizes, or spacing values in component `<style>` blocks. No hardcoded `rgba()` values that duplicate existing tokens.

```css
/* Correct */
color: var(--color-primary);
padding: var(--space-4);
font-size: var(--text-body-md);

/* Wrong */
color: #2c694e;
padding: 16px;
font-size: 0.9375rem;
```

### BEM-like naming

Class names follow a BEM-like pattern. The block is the component name; elements are separated by `__`; modifiers by `--`:

```css
.article-card { }
.article-card__title { }
.article-card__badge { }
.article-card__badge--advanced { }
```

Component styles are scoped by Astro automatically. The class names do not need globally unique prefixes — but the pattern should still be followed for readability.

### Mobile-first

Base styles target mobile viewports. Larger viewports are progressively enhanced with `min-width` media queries. The project breakpoints are `640px`, `768px`, `1024px`, and `1280px`.

```css
/* Base: mobile */
.grid {
  grid-template-columns: 1fr;
}

/* Enhanced: tablet */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### What not to do

- Never use `!important`
- Never use `1px solid` borders for section separation — use tonal surface shifts
- Never use pure black (`#000`) — use `--color-on-surface` (`#323232`)
- Never use default blue links — use `--color-primary`
- Never add inline styles to template HTML
- Never add Tailwind or any CSS framework

---

## 7. Build and Preview

Before merging any branch to `main`, verify the production build locally:

```sh
npm run build    # Must complete with zero errors and zero TypeScript warnings
npm run preview  # Inspect every changed page at localhost:4321
```

Things to check in preview:
- Navigation links resolve correctly
- New content appears on the listing page
- Dynamic routes resolve (`/case-studies/:slug`, `/knowledge-base/:slug`)
- No console errors in the browser
- Mobile layout at 375px viewport width

TypeScript errors in `.astro` files are reported by `npx astro check`. Run this if the build output is unclear about where a type error originated.

---

## 8. Deployment

Deployment is fully automatic. Push to `main` to deploy:

```sh
git checkout main
git merge feature/your-branch
git push origin main
```

GitHub Actions picks up the push, runs `npm ci && npm run build`, and deploys the `dist/` directory to GitHub Pages under `www.marekhronec.com`. The workflow is defined in `.github/workflows/deploy.yml`.

Deployment status is visible in the Actions tab of the repository. A successful deploy completes in under 60 seconds from push to live.

### Branch strategy

Feature branches follow the pattern `feature/<kebab-case-name>`. No direct commits to `main`. Merge to `main` only after:
1. `npm run build` passes locally
2. `npm run preview` confirms the changes look correct
3. `npx astro check` reports no TypeScript errors
