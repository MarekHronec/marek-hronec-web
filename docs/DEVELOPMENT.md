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
9. [Knowledge Base Filter System](#9-knowledge-base-filter-system)
10. [Knowledge Map Canvas](#10-knowledge-map-canvas)

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
| `npm run build` | Build the production site to `dist/`, then run `pagefind --site dist` to generate the full-text search index at `dist/pagefind/` |
| `npm run preview` | Serve the `dist/` output locally for production verification |
| `npm run astro` | Access the Astro CLI directly (e.g. `npm run astro check`) |
| `npx astro check` | Run TypeScript type-checking across all `.astro` files |

Run `npm run build` before every commit that will be merged to `main`. The build is the authoritative test: if it passes, the site will deploy correctly.

> **Search in dev mode.** The Knowledge Base search input renders in `npm run dev` but returns no results — the Pagefind index (`dist/pagefind/`) only exists after a full `npm run build`. Run `npm run build && npm run preview` to test search locally.

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
├── layout/         ← Header, Footer — shared across all pages
└── shared/         ← domain-agnostic components used across multiple page domains
    └── TagBadge.astro  ← neutral tag chip; used by CaseStudyCard, ArticleCard, credentials
```

Components that belong to a single domain stay in their domain folder. A component is moved to `shared/` only when it is used by two or more unrelated domains. `TagBadge.astro` is the first shared component: the identical tag chip pattern appeared independently in Case Studies, Knowledge Base, and the Credentials page.

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
  'aria-hidden'?: boolean | 'true' | 'false';
}
```

Import and use:
```astro
import BadgeCheck from '../icons/BadgeCheck.astro';

<BadgeCheck size={20} aria-hidden="true" />
```

Always set `aria-hidden="true"` on decorative icons. If an icon is the sole content of an interactive element, provide an `aria-label` on the parent.

### Accessibility conventions

- Heading hierarchy must be unbroken within each landmark. An `<aside>` or `<article>` starts its own outline — use `<h2>` as the first heading inside a landmark, not `<h3>`, unless the landmark is nested inside a section that already has an `<h2>`.
- All interactive dialogs must manage focus: move focus into the dialog on open, return it to the trigger on close, trap Tab within the dialog, and close on ESC.
- When a visual column-label row is `aria-hidden`, the corresponding data cells must carry an `aria-label` that includes the column name, so screen readers get context alongside the value.

### Content queries

Content collections are queried at the page level with `getCollection()`:
```ts
import { getCollection } from 'astro:content';
const articles = await getCollection('knowledgeBase');
```

The returned entries are passed as props to components. Components do not call `getCollection()` directly.

---

## 6. CSS Conventions

The full design system rationale — colour philosophy, typography scale, surface tier system, interactive states — is in DESIGN.md. The complete token reference is in [ARCHITECTURE.md — Styling Architecture](ARCHITECTURE.md#7-styling-architecture).

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
- Never apply `letter-spacing` to a `<select>` element with `appearance: none` — Chrome sizes the select box from raw text width (without letter-spacing), so the trailing space is clipped and the last character(s) are cut off. Use `letter-spacing: normal` on styled selects; apply tracking to sibling `<span>` labels instead.

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

Feature branches follow the pattern `feature/<kebab-case-name>`. No direct commits to `main` for code changes — this rule is a safety measure that applies to AI-assisted tooling in particular. Content-only edits by the site owner (Markdown articles, case studies) may be committed straight to `main`; see [CONTENT_MODEL.md §7](CONTENT_MODEL.md#7-adding-a-new-article). Merge code branches to `main` only after:
1. `npm run build` passes locally
2. `npm run preview` confirms the changes look correct
3. `npx astro check` reports no TypeScript errors

---

## 9. Knowledge Base Filter System

The KB listing page (`/knowledge-base`) supports multi-select filtering across three groups: **Platforms**, **Topics**, and **Difficulty**. This section explains how the system works and how to extend it.

### Architecture overview

The filter engine is driven by four data structures. Three live in `CategorySidebar.astro`; the other three are in the `<script>` block of `knowledge-base/index.astro`.

**`filterGroups` — `CategorySidebar.astro` frontmatter**

The single source of truth for what filter groups and values are displayed. Both the desktop sidebar and the mobile bottom sheet iterate over this array — adding a group or a value means editing this array only; no HTML changes are needed.

```js
const filterGroups = [
  { heading: 'Platforms', group: 'platform', items: [
    { value: 'azure', label: 'Azure' }, ...
  ]},
  { heading: 'Topics',    group: 'topic',    items: [...] },
  { heading: 'Difficulty', group: 'level',   items: [...] },
];
```

**`activeFilters` — `index.astro` script**

One `Record<string, Set<string>>` keyed by group name. Every operation — toggle, clear, count, chip list, URL serialise — iterates over this generically. Adding a new group requires one entry here.

```js
const activeFilters = {
  platform: new Set(),
  topic:    new Set(),
  level:    new Set(),
};
```

**`articleValues` — `index.astro` script**

Maps each group name to a function that reads the corresponding `data-*` attribute(s) from a card wrapper element. This is how the filter engine compares a card against a group's active selection.

```js
const articleValues = {
  platform: w => w.dataset.platforms.split(',').filter(Boolean),
  topic:    w => w.dataset.topics.split(',').filter(Boolean),
  level:    w => (w.dataset.level ? [w.dataset.level] : []),
};
```

**`URL_PARAMS` and `LABELS` — `index.astro` script**

`URL_PARAMS` maps group keys to their URL query parameter names. `LABELS` maps group keys to display-name lookup objects (used for chip labels and `aria-label` text).

### Filter evaluation rules

- Selections **within** a group are ORed: "Azure" + "OCI" shows articles tagged with either.
- Selections **across** groups are ANDed: "Azure" (Platform) + "Foundations" (Difficulty) shows only Azure beginner articles.
- An article missing a group's data attribute is **excluded** when that group has an active filter, and **included** when it has none.
- The `[n]` counts next to each button show how many articles would match if that button were the only selection in its group, given current selections in all other groups.

---

### How to add a value to an existing group

Example: add **GCP** to the Platforms group.

**1. `CategorySidebar.astro` — `filterGroups`**

Add one object to the `platform` group's `items` array:

```js
{ value: 'gcp', label: 'GCP' },
```

**2. `index.astro` — `PLATFORM_CATS` (Astro frontmatter)**

Add `'gcp'` to the set so GCP-category articles get the `data-platforms` attribute set:

```js
const PLATFORM_CATS = new Set(['azure', 'oci', 'gcp', 'multicloud']);
```

`'gcp'` is already in `LABELS.platform`. No other changes needed.

---

### How to add a new filter group

Example: add a **Format** group with values `guide` and `reference`.

**Step 1 — Content schema** (`src/content.config.ts`)

Add the field to the `knowledgeBase` Zod schema. Mark it optional so existing articles without the field still build:

```ts
format: z.enum(['guide', 'reference']).optional(),
```

**Step 2 — Article frontmatter**

Add `format: guide` (or `reference`) to the articles you want classified. Articles without the field are included in unfiltered results and excluded only when the Format filter is active.

**Step 3 — Card wrapper data attribute** (`index.astro` — HTML template)

Add a `data-format` attribute to the `kb-card-wrapper` div, alongside the existing `data-platforms`, `data-topics`, and `data-level`:

```astro
data-format={article.data.format ?? ''}
```

**Step 4 — `filterGroups`** (`CategorySidebar.astro` frontmatter)

Add the group entry. Both desktop and mobile update automatically:

```js
{
  heading: 'Format',
  group: 'format',
  items: [
    { value: 'guide',     label: 'Guide' },
    { value: 'reference', label: 'Reference' },
  ],
},
```

**Step 5 — `activeFilters`** (`index.astro` script)

Add the new group's Set:

```js
const activeFilters = {
  platform: new Set(),
  topic:    new Set(),
  level:    new Set(),
  format:   new Set(),   // ← add
};
```

**Step 6 — `articleValues`** (`index.astro` script)

Add the accessor. Single-value fields return a one-element array; absent fields return empty (no match):

```js
const articleValues = {
  ...
  format: w => (w.dataset.format ? [w.dataset.format] : []),  // ← add
};
```

**Step 7 — `URL_PARAMS`** (`index.astro` script)

Add the URL query parameter name:

```js
const URL_PARAMS = {
  platform: 'platforms',
  topic:    'topics',
  level:    'level',
  format:   'format',   // ← add
};
```

**Step 8 — `LABELS`** (`index.astro` script)

Add display labels for chip rendering and `aria-label` text:

```js
const LABELS = {
  ...,
  format: { guide: 'Guide', reference: 'Reference' },  // ← add
};
```

That is all. The toggle logic, `matchesFilter`, `countForBtn`, chip generation, URL serialisation, and "Clear all" handler all iterate over `activeFilters` generically — no further changes are needed in any of those functions.

---

## 10. Knowledge Map Canvas

The Knowledge Base listing page (`/knowledge-base`) includes a **Learning Map** tab — an interactive graph visualisation of all articles and the recommended learning paths between them. This section covers the architecture and everything an author or developer needs to manage it.

### Architecture overview

The canvas is a lazily-loaded Astro island. Cytoscape.js (~200 KB including the dagre layout plugin) is only fetched when the user activates the Map tab for the first time.

```
knowledge-base/index.astro
  └── KnowledgeCanvas.astro          ← HTML wrapper; serialises node/edge data into data-* attributes
      └── <script>                   ← listens for 'kb:canvas-activate' CustomEvent, then:
          └── dynamic import canvas.ts  ← initialises Cytoscape; fires once per page load

src/scripts/canvas.ts                ← Cytoscape init, node HTML templates, detail panel, atom indicator
src/data/knowledge-graph.ts          ← edge definitions; build-time slug validation
```

**Data flow at build time:**
1. `index.astro` queries all `knowledgeBase` content entries via `getCollection()`
2. Each entry is mapped to a `CanvasNode` object: `{ id, label, category, level, excerpt, url, tags }`
3. Edges are imported from `knowledge-graph.ts` and validated against the live slug set — unknown slugs abort the build
4. Both arrays are JSON-serialised into `data-nodes` and `data-edges` attributes on the `#kb-canvas-wrapper` div
5. At runtime, `canvas.ts` reads these attributes and passes them to Cytoscape

**Activation flow at runtime:**
1. User clicks "Map" in the view toggle
2. `index.astro` dispatches `new CustomEvent('kb:canvas-activate')` on `#kb-canvas-wrapper`
3. The `<script>` in `KnowledgeCanvas.astro` handles the event `{ once: true }` — fires exactly once per page load
4. `canvas.ts` is dynamically imported; `initCanvas()` is called with the three element IDs (`'kb-canvas-wrapper'`, `'kb-canvas'`, `'kbc-panel'`)

---

### Managing connections

All edges are defined in `src/data/knowledge-graph.ts` in the `edges` array.

**Edge types:**

| Type | Visual | Meaning |
|---|---|---|
| `path` | Solid teal arrow, orthogonal routing | Recommended reading order — follow this to progress through a learning track |
| `related` | Dashed grey line, orthogonal routing | Conceptual link — articles share context but are not sequential |

**Adding a connection:**

```ts
// src/data/knowledge-graph.ts — add to the edges array:
{ from: 'category/article-slug', to: 'category/other-article-slug', type: 'path' },
```

Slugs use the full Astro content collection ID: `folder/filename-without-extension`. For example, `src/content/knowledge-base/azure/azure-landing-zones.md` → slug `azure/azure-landing-zones`.

**Removing a connection:** delete the object from the `edges` array.

**Changing edge type:** change `type: 'path'` to `type: 'related'` or vice versa.

**Build-time validation:** `validateEdges()` is called from `knowledge-base/index.astro` at build time. It compares every slug in `edges` against all article slugs from `getCollection()`. An unknown slug aborts the build:

```
Knowledge graph — unknown slugs (check filenames match exactly):
  · azure/old-article-name
```

This means renaming an article file requires updating `knowledge-graph.ts` — the build enforces the contract.

---

### Entry nodes (START HERE badge)

The canvas automatically identifies entry nodes — articles with no incoming `path` edges:

```ts
const pathTargets = new Set(edgeList.filter(e => e.type === 'path').map(e => e.to));
const entryIds    = new Set(nodes.filter(n => !pathTargets.has(n.id)).map(n => n.id));
```

Any article that is never the *target* of a `path` edge receives the **START HERE** badge. `related` edges do not affect entry status. To promote an article to a learning-track entry point, remove all `path` edges that point to it.

---

### Adding an article to the canvas

The canvas only displays articles that are explicitly opted in — not every knowledge base article appears there automatically. The curated set is controlled by two records in `src/pages/knowledge-base/index.astro`.

**Step 1 — Write the article as normal** (see CONTENT_MODEL.md §7). The `.md` file and frontmatter are unchanged.

**Step 2 — Add the article to `ARTICLE_BRANCH`** (`src/pages/knowledge-base/index.astro`, Astro frontmatter)

`ARTICLE_BRANCH` maps each canvas article slug to the branch column it belongs to. Add one entry:

```ts
const ARTICLE_BRANCH: Record<string, string> = {
  // ... existing entries ...
  'networking/expressroute-design-patterns': 'network',   // ← add this
};
```

Valid branch values: `'cloud-reality'` | `'governance'` | `'network'` | `'compliance'`.

The article's slug is `category/filename-without-extension`. For example, `src/content/knowledge-base/networking/expressroute-design-patterns.md` → `'networking/expressroute-design-patterns'`.

**Step 3 — Add a node icon (optional)** (`src/scripts/canvas.ts`)

Each article can have a dedicated icon from the `ICONS` record. If omitted the fallback is `book`. Add one entry to `ARTICLE_ICON`:

```ts
const ARTICLE_ICON: Record<string, string> = {
  // ... existing entries ...
  'networking/expressroute-design-patterns': 'arrowsLR',   // ← add this
};
```

Available icon keys: `book`, `box`, `users`, `globe`, `activity`, `building`, `flag`, `server`, `type`, `tag`, `shield`, `file`, `network`, `database`, `share`, `arrowsLR`, `cloud`, `scale`, `layers`.

**Step 4 — Add edges** in `src/data/knowledge-graph.ts` (see "Managing connections" above). At minimum, wire the article into the branch path so it is reachable. Example:

```ts
{ from: 'networking/ipam-ip-address-management-before-you-wish-you-had-done-it',
  to:   'networking/expressroute-design-patterns', type: 'path' },
```

**Step 5 — Validate:**

```sh
npm run build
```

A build error is raised if the slug in `ARTICLE_BRANCH` or `knowledge-graph.ts` does not match a real article file.

**⚠ Silent failure: edges without canvas membership.** If you add an article's slug to `knowledge-graph.ts` edges before (or without) adding it to `ARTICLE_BRANCH`, the build succeeds — `validateEdges()` only checks that slugs match real content files, not that they are registered canvas members. At runtime, Cytoscape receives edges that reference a non-existent node object; the dagre layout algorithm throws and the **entire canvas renders blank** with no browser error message.

Safe order: always add `ARTICLE_BRANCH` (Step 2) before adding edges (Step 4). If the canvas goes blank after adding a new article, the first thing to check is whether the slug is missing from `ARTICLE_BRANCH`.

---

### Tweakable settings

All constants live at module level in `src/scripts/canvas.ts`.

**Zoom**

```ts
// Cytoscape config object inside initCanvas():
wheelSensitivity: 4,   // Mouse-wheel zoom speed (Cytoscape default: 1 — higher is faster)
```

**Zoom button step** — both zoom button listeners use `* 1.3` / `/ 1.3`. Replace `1.3` in both to change the step (e.g. `1.2` for a smaller increment).

**Layout spacing**

```ts
// dagre layout options:
nodeSep: 48,   // Horizontal gap between sibling nodes in the same rank (px)
rankSep: 60,   // Vertical gap between ranks/rows (px)
padding: 72,   // Canvas edge padding (px)
```

**Node card dimensions**

```ts
// Article node:
width: 340, height: 78,   // must match .kbc-node { width/height } in KnowledgeCanvas.astro global CSS

// Group header node:
width: 340, height: 50,   // must match .kbc-node--group { width/height }
```

If you change either value, update the matching rule in the `<style is:global>` block of `KnowledgeCanvas.astro`.

**Branch colours** — `BRANCH_COLORS` in `src/scripts/canvas.ts`:

```ts
const BRANCH_COLORS: Record<string, { border: string; groupBorder: string; bg: string; groupBg: string; icon: string }> = {
  'cloud-reality': { border: '#2c694e', groupBorder: '#83AD9D', bg: '#dce8e3', groupBg: '#F9FAFA', icon: '#2c694e' },
  governance:      { border: '#3e6daa', groupBorder: '#9FB8DA', bg: '#d9e5f4', groupBg: '#F7F8FC', icon: '#3e6daa' },
  network:         { border: '#6354a8', groupBorder: '#9996C8', bg: '#e6e3f4', groupBg: '#F7F6F9', icon: '#6354a8' },
  compliance:      { border: '#b85c20', groupBorder: '#D4956A', bg: '#f5e4d4', groupBg: '#FAFAF9', icon: '#b85c20' },
};
```

Each branch has five colour roles:
- `border` / `bg` — article node card border and icon-circle background
- `groupBorder` / `groupBg` — group header node border and background
- `icon` — icon stroke colour used in both article and group nodes

**Edge colours** — in the Cytoscape style array inside `initCanvas()`:

```ts
// Path edges:
'line-color': '#2c694e',          // = --color-primary (teal)
'target-arrow-color': '#2c694e',

// Related edges:
'line-color': '#b3b2b1',          // neutral grey
```

---

### Atom click indicator settings

The atom (sonar ping → orbiting electrons) is configured by these module-level constants:

| Constant | Default | What it controls |
|---|---|---|
| `ATOM_HALF` | `35` | Half the container size in px — container is `ATOM_HALF * 2 = 70 px` |
| `ATOM_HOLD_MS` | `4000` | How long (ms) to hold the mouse button before orbit rings appear |
| `ORBIT_A` | `26` | Semi-major axis of electron orbits — horizontal reach in px |
| `ORBIT_B` | `9` | Semi-minor axis — controls how flat the orbits are |

The three orbit rings are defined in the `ORBITS` array:

```ts
const ORBITS = [
  { angle:  0, period: 1.8 },   // First ring — 0° tilt,  1.8 s per electron revolution
  { angle: 60, period: 2.4 },   // Second ring — 60° tilt, 2.4 s per revolution
  { angle:-60, period: 2.0 },   // Third ring — −60° tilt, 2.0 s per revolution
] as const;
```

- Decrease `period` to speed up individual electrons.
- Change `angle` to reorient a ring.
- Add or remove objects to change the number of orbit rings (add a matching `nth-child` stagger rule in `KnowledgeCanvas.astro` if adding rings).

**Release animation durations** — inside `spawnAtom()`, in the `frame()` function:

```ts
const duration = atomActivated ? 380 : 200;
//                               ↑        ↑
//               hold release (ms)   tap release (ms)
```

---

### CSS class reference

The atom indicator and node label elements are appended to the DOM by Cytoscape outside the Astro component's scope, so their styles must be in the `<style is:global>` block of `KnowledgeCanvas.astro`.

| Class | Where | Notes |
|---|---|---|
| `.kbc-atom` | Atom container div | `position: absolute` on `#kb-canvas`; `z-index: 100` |
| `.kbc-atom--active` | State class on `.kbc-atom` | Added by JS after `ATOM_HOLD_MS`; triggers ring/electron fade-in |
| `.kbc-atom__nucleus` | Green dot at centre | `::after` pseudo-element provides the sonar ping ring |
| `.kbc-atom__ring` | Elliptical orbit ring | `--ring-angle` CSS variable set per-element by JS; drives `transform: rotate()` |
| `.kbc-atom__electron` | Dot on each ring | Position set each frame by rAF via parametric ellipse maths |
| `.kbc-node` | Node card container | Dimensions must match Cytoscape node width/height |
| `.kbc-node__start` | "START HERE" badge | `position: absolute; top: -26px` — overflows node top edge |
| `.kbc-node__title` | Article title text | 2-line clamp via `-webkit-line-clamp: 2` |
| `.kbc-node__chip` | Difficulty chip | Colour set via `--level` modifier classes |
| `.kbc-panel` | Detail panel aside | `position: absolute; top/right` — floats over canvas |
