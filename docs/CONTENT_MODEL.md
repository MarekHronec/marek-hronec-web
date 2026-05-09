# Content Model

## Table of Contents

1. [Overview](#1-overview)
2. [Knowledge Base Schema](#2-knowledge-base-schema)
3. [Case Studies Schema](#3-case-studies-schema)
4. [Category Taxonomy](#4-category-taxonomy)
5. [File Organisation](#5-file-organisation)
6. [Body Content](#6-body-content)
7. [Adding a New Article](#7-adding-a-new-article)
8. [Adding a New Case Study](#8-adding-a-new-case-study)
9. [Quick Reference: Where to Make Common Changes](#9-quick-reference-where-to-make-common-changes)
10. [Read Time: How It Works and How to Tune It](#10-read-time-how-it-works-and-how-to-tune-it)
11. [Updating Site Content Outside of Markdown](#11-updating-site-content-outside-of-markdown)

---

## 1. Overview

Content is managed through Astro Content Collections. The technical architecture of the collections — loader configuration, Zod schema definitions, and how `getCollection` is used in pages — is in [ARCHITECTURE.md — Content Model](ARCHITECTURE.md#5-content-model).

The flow from authoring to publication is:

```
Author writes Markdown (.md file with YAML frontmatter)
        │
        ▼
Zod schema validates every frontmatter field at build time
        │
        ▼
astro build generates static HTML
        │
        ▼
github push deploys to www.marekhronec.com
```

If a required field is missing, a field has the wrong type, or a category value is not in the allowed enum, `astro build` fails with a descriptive error. The error appears in the build log before any page is generated — never silently in the rendered output.

Both collections use glob loaders, so adding a new `.md` file in the correct directory is sufficient to add it to the collection. No registration step is required.

---

## 2. Knowledge Base Schema

**Loader:** `glob({ pattern: '**/*.md', base: 'src/content/knowledge-base' })`

Every article in `src/content/knowledge-base/` and its subdirectories must have this frontmatter:

```yaml
---
title: ""
category: azure          # see taxonomy below for valid values
tags: []
date: 2025-01-08
readTime: 11             # optional — omit to calculate automatically
level: advanced          # beginner | intermediate | advanced
excerpt: ""
# references:            # optional — rendered as a citations section below the article body
#   - title: ""
#     url: ""
#     description: ""
#     domain: ""
---
```

### Field reference

| Field | Type | Required | Constraints | Description |
|---|---|---|---|---|
| `title` | string | Yes | — | Full article title as it appears in the card and article header |
| `category` | enum | Yes | One of 10 values | Controls sidebar navigation and filtering. See taxonomy. |
| `tags` | string[] | Yes | At least 1 recommended | Technology and topic keywords. All tags shown on article card. Used for filter chip display and article detail header. |
| `date` | Date | Yes | ISO 8601 string, coerced to Date | Publication date. Articles are sorted newest-first on the listing page. |
| `readTime` | number | No | Integer, minutes | Estimated reading time. If omitted, calculated automatically at build time from word count. Displayed in the article card and article header. |
| `level` | enum | Yes | `beginner`, `intermediate`, or `advanced` | Controls the colour-coded level badge on the article card and article header. |
| `excerpt` | string | Yes | ≤160 characters recommended | One-sentence summary. Appears on the article card and in page meta description. |
| `references` | `{title, url, description, domain}[]` | No | — | External citations. Each entry renders as a linked card in a References section below the article body. `title` is the link text, `url` the destination, `description` a one-sentence summary, `domain` the display label for the source (e.g. `"docs.microsoft.com"`). |

### Example

```yaml
---
title: "Azure Landing Zones: Scalable Cloud Foundations at Enterprise Scale"
category: azure
tags: ["Azure", "Landing Zones", "Cloud Adoption Framework", "Governance", "IaC"]
date: 2025-01-08
readTime: 11
level: advanced
excerpt: "An Azure landing zone provides the standardised foundation for all cloud adoption at enterprise scale."
---
```

---

## 3. Case Studies Schema

**Loader:** `glob({ pattern: '**/*.md', base: 'src/content/case-studies' })`

Every file in `src/content/case-studies/` must have this frontmatter (optional fields marked):

```yaml
---
title: ""
context: ""
industry: ""
role: ""
tags: []
featured: false
metrics:
  - label: ""
    value: ""
excerpt: ""
# Optional fields:
# heroImage: "/images/case_study_01_detail.webp"
# heroCaption: ""
# heroVersion: ""
# titleHighlight: ""
---
```

### Field reference

| Field | Type | Required | Constraints | Description |
|---|---|---|---|---|
| `title` | string | Yes | — | Full engagement title |
| `context` | string | Yes | — | Client or organisational context shown in the meta band on the detail page |
| `industry` | string | Yes | — | Industry sector shown in the meta band and as the category label on secondary cards |
| `role` | string | Yes | — | Architect's role on the engagement, shown in the meta band |
| `tags` | string[] | Yes | At least 1 recommended | Technology and domain tags shown on secondary cards (first 2) and on the detail page |
| `featured` | boolean | Yes | Exactly one entry should be `true` | The featured study receives the large card treatment on the listing page |
| `metrics` | `{label, value}[]` | Yes | At least 1, typically 2 | Key outcome figures rendered in the metrics bar on both the listing and detail pages |
| `excerpt` | string | Yes | ≤160 characters recommended | One-sentence outcome summary used in cards and page meta description |
| `heroImage` | string | No | Path relative to `public/` | Hero image shown in the info/image panel on the detail page |
| `heroCaption` | string | No | — | Caption for the hero image (stored for future use, not currently rendered) |
| `heroVersion` | string | No | — | Version label for the diagram (stored for future use, not currently rendered) |
| `titleHighlight` | string | No | Must be an exact substring of `title` | Portion of the title rendered in `--color-primary` green on the detail page header |

### Metrics guidance

Metrics can be quantified outcomes or descriptive labels:
```yaml
metrics:
  - label: "Adoption Model"
    value: "Governed"
  - label: "Architecture"
    value: "Cloud-Native"
```

`value` renders large and bold. `label` renders in small all-caps below the value. Keep `value` short — one word, a number, or a short phrase.

### Example

```yaml
---
title: "Cloud Adoption Through Effective Governance in the Public Sector"
context: "Slovak Public Administration"
industry: "Government / Public Sector"
role: "Cloud Architecture & Governance"
tags: ["Cloud Governance", "Microsoft Azure", "Public Sector", "FinOps", "Security"]
featured: true
metrics:
  - label: "Adoption Model"
    value: "Governed"
  - label: "Architecture"
    value: "Cloud-Native"
excerpt: "Public-sector cloud adoption is not only an infrastructure problem. It requires a governed model for service selection, onboarding, identity, network boundaries, cost control and operational responsibility."
heroImage: "/images/case_study_01_detail.webp"
titleHighlight: "Effective Governance"
---
```

---

## 4. Category Taxonomy

The `category` field in knowledge base articles must be one of these exact string values:

| Value | Display label | Topics | Filter group |
|---|---|---|---|
| `azure` | Azure | Azure architecture, Landing Zones, Azure services, Microsoft cloud patterns | Platform |
| `oci` | OCI | Oracle Cloud Infrastructure architecture, services, and patterns | Platform |
| `multicloud` | Multicloud | Cross-cloud architecture, Azure + OCI comparisons, cloud-agnostic patterns and fundamentals | Platform |
| `networking` | Networking | VNet design, ExpressRoute, hybrid connectivity, network segmentation | Topic |
| `identity` | Identity | Entra ID, RBAC, Zero Trust, conditional access, managed identities | Topic |
| `security` | Security | Posture management, Microsoft Defender, compliance frameworks, threat protection | Topic |
| `finops` | FinOps | Cloud cost optimisation, tagging strategies, showback/chargeback models | Topic |
| `gcp` | GCP | Google Cloud Platform architecture, services, and patterns | Platform |
| `devops` | DevOps | CI/CD pipelines, GitOps, platform engineering, Infrastructure as Code | Topic |
| `bpm` | BPM | Business Process Management, Camunda, Oracle BPM, workflow orchestration | Topic |

The **Filter group** column maps to the KB listing page filter panel. Platform categories (`azure`, `oci`, `gcp`, `multicloud`) appear under the **Platforms** group; topic categories appear under **Topics**. Articles whose category is a platform value (e.g. `azure`) also surface under topics if their tags match a topic (e.g. tag `Networking` → Networking filter).

Adding a new category requires:
1. Adding the `category` value to the Zod enum in `src/content.config.ts`
2. Creating the subdirectory `src/content/knowledge-base/<new-category>/`
3. Adding the item to the `filterGroups` array in `CategorySidebar.astro` — no raw HTML needed; both desktop and mobile filter panels update automatically
4. If it is a topic category, adding its mapping to the `TOPIC_CATS` set and `LABELS.topic` object in `src/pages/knowledge-base/index.astro`

The full 8-step procedure is in [DEVELOPMENT.md §9](DEVELOPMENT.md#9-knowledge-base-filter-system).

---

## 5. File Organisation

### Knowledge base directory structure

```
src/content/knowledge-base/
├── azure/
│   └── azure-landing-zones.md
├── bpm/
│   └── introduction-to-bpm-solutions.md
├── devops/
│   ├── gitops-with-argocd.md
│   ├── source-of-truth-where-does-your-cloud-actually-live.md
│   └── status-pages-service-health-things-they-wont-show.md
├── finops/
│   ├── budgets-cost-caps-and-the-lie-of-spending-limits.md
│   ├── cloud-support-what-you-are-actually-paying-for.md
│   └── discounts-and-commitments-math-the-salespeople-hope-you-wont-do.md
├── identity/
│   └── rbac-and-iam-authorisation-models-that-look-similar.md
├── multicloud/       ← largest category; cloud-agnostic foundations + Azure/OCI comparisons
│   ├── how-to-learn-azure-and-oci-without-stale-lists.md
│   ├── iaas-paas-saas-without-marketing-layer.md
│   └── … (10 articles)
├── networking/
│   ├── address-plans-designing-ip-space-for-three-clouds.md
│   ├── hub-and-spoke-virtual-wan-and-drg-three-topology-choices.md
│   ├── hybrid-connectivity-expressroute-fastconnect-vpn-reality.md
│   └── ipam-ip-address-management-before-you-wish-you-had-done-it.md
└── security/
    └── policy-as-code-and-quotas-where-governance-stops-being-wiki.md
```

New category subdirectories should be created when the first article for that category is added.

Subdirectory names should match the `category` value in the frontmatter. This is a human-organisation convention — the glob loader picks up all `.md` files regardless of which subdirectory they are in. The `category` frontmatter field is the authoritative classification.

### File naming

Knowledge base articles: `kebab-case.md`. Use lowercase, hyphens, no underscores. Examples:
- `azure-landing-zones.md`
- `event-driven-serverless-patterns.md`
- `zero-trust-network-access.md`

Case studies: `kebab-case.md`. The filename becomes part of the URL slug.
- `effective-governance-public-sector.md` → `/case-studies/effective-governance-public-sector`

### Image handling

All static images live in `public/images/`. Reference them in Markdown or frontmatter as:
```markdown
![Alt text](/images/filename.webp)
```

Current image conventions:
- **Profile photo:** `public/images/profile.webp` — used in the About page hero
- **Featured case study listing diagram:** `public/images/case_study_01.webp` — displayed in the dark diagram panel on the case studies listing page
- **Case study detail hero:** `public/images/case_study_01_detail.webp` — referenced via `heroImage` frontmatter on the case study `.md` file

Prefer `.webp` format for new images. Use descriptive, kebab-case filenames.

---

## 6. Body Content

### Markdown conventions

Article headings start at `##` — the `<h1>` is generated from the `title` frontmatter field by the article detail page layout. Never use a lone `#` heading inside an article body.

Code blocks must specify a language:
````markdown
```typescript
const entry = await getEntry('knowledgeBase', 'azure/azure-landing-zones');
```
````

### Callout blocks

Two callout types are available, written using container directive syntax. The `remark-directive` + `remark-callouts.mjs` plugin pipeline (configured in `astro.config.mjs`) converts these to the correct HTML at build time.

**Pro Tip:**
```
:::tip[Architectural Pro Tip]
Your tip content here. Standard Markdown inline formatting works: **bold**, `code`, *italic*.
:::
```

**Warning:**
```
:::warning[Critical Caveat]
Your warning content here.
:::
```

Rules:
- The `:::` fences must be on their own lines with no leading whitespace.
- The label in `[...]` is required and becomes the callout heading.
- The body can contain one or more paragraphs separated by a blank line.
- Inline Markdown formatting (`**bold**`, `` `code` ``, `*italic*`) works inside the body.

The rendered HTML matches `.callout-tip` and `.callout-warning` CSS classes defined in `src/pages/knowledge-base/[...slug].astro`.

### Case study section headings

Three special headings in a case study body use inline HTML so the detail page can apply icon-bearing styles and the green "My Role" treatment via CSS `:global(h2 svg)` and `:global(h2.prose-role)`. Icons render at 30×30 (drawn on a 24×24 viewBox).

**My Role** — teal underline via `class="prose-role"`:
```html
<h2 class="prose-role"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>My Role</h2>
```

**The Problem** — info-circle icon:
```html
<h2><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>The Problem</h2>
```

**The Outcome** — check-circle icon:
```html
<h2><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>The Outcome</h2>
```

Standard `##` Markdown headings work fine for all other sections within a case study.

---

## 7. Adding a New Article

1. **Create the file** in the correct category subdirectory:
   ```
   src/content/knowledge-base/networking/expressroute-design-patterns.md
   ```

2. **Add frontmatter** matching the schema:
   ```yaml
   ---
   title: "ExpressRoute Design Patterns for Hybrid Connectivity"
   category: networking
   tags: ["ExpressRoute", "Azure", "Hybrid Cloud", "Networking"]
   date: 2025-06-01
   readTime: 9
   level: intermediate
   excerpt: "Design patterns and failure modes for Azure ExpressRoute in enterprise hybrid connectivity scenarios."
   ---
   ```

   **Field constraints** — the build fails if any of these are violated:

   | Field | Constraint |
   |---|---|
   | `category` | Must be one of: `azure \| oci \| multicloud \| networking \| identity \| security \| finops \| gcp \| devops \| bpm` |
   | `level` | Must be one of: `beginner \| intermediate \| advanced` |
   | `date` | Must be a valid date string, e.g. `2025-06-01` |
   | `readTime` | Optional. If present, must be a plain number — not a string like `"9 min"`. If omitted, calculated automatically. |
   | `excerpt` | Keep under 160 characters |
   | `tags` | Free-form array of strings — no enum constraint |

3. **Write the body.** Start with `##` headings. The `title` from frontmatter is the `<h1>`.

4. **Add to the Learning Map (optional).** The canvas only shows articles that are explicitly opted in. See [DEVELOPMENT.md §10 — Adding an article to the canvas](DEVELOPMENT.md#adding-an-article-to-the-canvas) for the four-step procedure: add the slug to `ARTICLE_BRANCH` in `index.astro` (controls which branch column it appears in), optionally add an icon to `ARTICLE_ICON` in `canvas.ts`, then wire it into the graph with edges in `knowledge-graph.ts`.

### Adding a new category

The full 8-step procedure is in [DEVELOPMENT.md §9](DEVELOPMENT.md#9-knowledge-base-filter-system). Quick summary:

1. **Extend the enum** in `src/content.config.ts`
2. **Add the item** to the correct group in the `filterGroups` array in `CategorySidebar.astro` (both desktop and mobile update automatically — no HTML changes needed)
3. **Add a `data-*` attribute** to the card wrapper div in `knowledge-base/index.astro` (only if adding a new *group*, not just a new value to an existing group)
4. **Register the label** in `LABELS.topic` or `LABELS.platform` and add to `TOPIC_CATS` or `PLATFORM_CATS` in `knowledge-base/index.astro`
5. **Create the subdirectory** and add your `.md` file

See [DEVELOPMENT.md §9](DEVELOPMENT.md#9-knowledge-base-filter-system) for the exact code snippets at each step.

4. **Validate:**
   ```sh
   npm run build
   ```
   A schema error will stop the build with a clear message if any frontmatter field is invalid.

5. **Preview:**
   ```sh
   npm run preview
   ```
   Navigate to `/knowledge-base` and verify the article appears in the correct category.

6. **Commit and push** to `main` to deploy.

---

## 8. Adding a New Case Study

1. **Create the file:**
   ```
   src/content/case-studies/network-segmentation-overhaul.md
   ```

2. **Add frontmatter:**
   ```yaml
   ---
   title: "Zero-Trust Network Segmentation for a Regulated Enterprise"
   context: "European Bank"
   industry: "Financial Services"
   role: "Network Architecture & Security"
   tags: ["Zero Trust", "Azure", "Networking", "NSG"]
   featured: false
   metrics:
     - label: "Attack Surface Reduction"
       value: "83%"
     - label: "Policy Violations"
       value: "-600/mo"
   excerpt: "Redesigned a 15-year-old flat network into a Zero Trust segmented architecture across 12 Azure regions."
   heroImage: "/images/case_study_03_detail.webp"
   heroCaption: "Network segmentation overview"
   heroVersion: "V1.0"
   titleHighlight: "Network Segmentation"
   platform: "Microsoft Azure"
   focus: "Zero Trust network redesign across 12 Azure regions"
   principles:
     - "Least-privilege network access"
     - "Segment by workload criticality"
     - "Policy as code"
   outcomes:
     - title: "Reduced attack surface"
       description: "Lateral movement paths eliminated across all segments."
     - title: "Auditable policy"
       description: "All NSG rules version-controlled and reviewable."
   ---
   ```

   **Required fields:** `title`, `context`, `industry`, `role`, `tags`, `featured`, `metrics`, `excerpt`.

   **Field constraints:**

   | Field | Constraint |
   |---|---|
   | `excerpt` | Keep under 160 characters |
   | `featured` | **Only one file may have `featured: true` at a time.** The listing page uses `.find()` — if two files are featured, the second one silently drops to the regular grid and loses the featured card slot. Always set the previous featured study to `false` before marking a new one. |
   | `heroImage` | Must be a real file path under `public/images/` — a missing image produces no build error but shows a broken image at runtime |
   | `tags` | Free-form array of strings — no enum constraint |

   **Optional fields** — omit any you don't need; the detail page degrades gracefully:
   | Field | Purpose |
   |---|---|
   | `heroImage` | Path to hero image (e.g. `/images/case_study_03_detail.webp`) |
   | `heroCaption` | Caption shown below hero image |
   | `heroVersion` | Version label shown on image frame |
   | `titleHighlight` | Word or phrase in the title to render in `--color-primary` |
   | `platform` | Shown in the Platform meta card in the hero |
   | `focus` | One-line summary shown in the At a Glance sidebar card |
   | `principles` | Array of strings — rendered as a checklist in the sidebar |
   | `outcomes` | Array of `{ title, description }` — rendered as outcome cards in the sidebar |

3. **Write the body.** Structure: problem → architecture decision → implementation → outcome. Use the inline HTML format for "The Problem" and "The Outcome" headings if you want icon decoration.

4. **Validate and preview** with `npm run build && npm run preview`.

5. **Commit and push** to `main`.

---

## 9. Quick Reference: Where to Make Common Changes

This section is for non-code edits — exact file and what to look for.

---

### Add a new Knowledge Base category

The full 8-step procedure is in [DEVELOPMENT.md §9](DEVELOPMENT.md#9-knowledge-base-filter-system). Quick reference:

**File 1 — `src/content.config.ts`**

Find the category enum near the top and add the new value:
```ts
category: z.enum(['azure', 'oci', 'multicloud', 'networking', 'identity', 'security', 'finops', 'gcp', 'devops', 'bpm', 'your-category']),
```

**File 2 — `src/components/knowledge-base/CategorySidebar.astro`**

Find the `filterGroups` array near the top. Add a new entry to the `items` array inside the correct group (Platforms or Topics):
```ts
{ value: 'your-category', label: 'Your Category' }
```
Desktop and mobile filter panels both update automatically — no HTML changes needed.

**File 3 — `src/pages/knowledge-base/index.astro` (script block)**

Add the display label to `LABELS.topic` (or `LABELS.platform`) and the value to `TOPIC_CATS` (or `PLATFORM_CATS`):
```ts
const TOPIC_CATS = new Set(['networking', ..., 'your-category']);
const LABELS = { ..., topic: { ..., 'your-category': 'Your Category' } };
```

Then create the folder `src/content/knowledge-base/your-category/` and drop your `.md` files in.

---

### Replace or add an image (case study hero)

1. **Put the image file** in `public/images/` — this is the folder, not `src/`. Use `.webp` format for best performance.
2. **Reference it** in the case study frontmatter as `/images/your-filename.webp` (note the leading slash — no `public` in the path).

Example:
```yaml
heroImage: "/images/case_study_04_detail.webp"
```

The image is displayed at a 4:3 aspect ratio in the hero. Landscape images work best.

---

### Change read time on a Knowledge Base article

Open the article's `.md` file in `src/content/knowledge-base/`. In the frontmatter at the top, find:
```yaml
readTime: 9
```
Change the number. It must be a plain number — no quotes, no "min" suffix.

---

### Change the featured case study

The featured study is the one displayed in the large card at the top of the Case Studies page.

1. Open the **current** featured study's `.md` file in `src/content/case-studies/` and change:
   ```yaml
   featured: true
   ```
   to:
   ```yaml
   featured: false
   ```
2. Open the **new** featured study's `.md` file and change its `featured` field to `true`.

Only one file should have `featured: true` at a time.

---

### Change the category of an existing article

Open the article's `.md` file and update the `category` field in the frontmatter to one of the valid values:
```
azure | oci | multicloud | networking | identity | security | finops | gcp | devops | bpm
```
The article will automatically move to the new category in the sidebar. The file can stay in its current folder — the folder structure is just for organisation, the `category` field is what the site reads.

---

## 10. Read Time: How It Works and How to Tune It

### How it works

Read time is calculated automatically at build time — no manual entry needed. When `npm run build` runs, Astro reads each article's text, counts the words, divides by the configured reading speed for that category, and bakes the result into the HTML. The visitor never runs any calculation.

If you do set `readTime` manually in an article's frontmatter, that value takes priority and the calculation is skipped for that article.

### Where the config lives

**File:** `src/utils/readTime.ts`

Open it and you will see this object at the top:

```ts
export const READ_SPEED = {
  knowledgeBase: {
    default:    130,
    azure:      120,
    networking: 110,
    identity:   125,
    security:   120,
    finops:     150,
    gcp:        120,
    devops:     115,
    bpm:        140,
  },
};
```

All values are **words per minute**. Higher = shorter read time displayed. Lower = longer read time displayed.

- `knowledgeBase.default` — fallback used when a category has no specific entry (e.g. `oci`, `multicloud`)
- Each named key under `knowledgeBase` — overrides the default for that category

Case study read time is not configurable — case studies use the manual `readTime` frontmatter field if present, otherwise fall back to a fixed 200 WPM default calculated inline.

### How to tune a category's reading speed

Open `src/utils/readTime.ts` and change the number next to the category name. Example — if networking articles are taking too long:
```ts
networking: 110,   // change to e.g. 100 for longer estimates
```
Rebuild and the new values appear across all articles in that category.

### How to add read speed for a new category

When you add a new category (see §7 "Adding a new category"), open `src/utils/readTime.ts` and add one line inside `knowledgeBase`:
```ts
knowledgeBase: {
  default:    130,
  // ... existing entries ...
  myNewCategory: 125,   // add this line
},
```
If you skip this step, the `default` value (130) is used automatically — nothing breaks.

### How to override read time for a single article

Add `readTime` to the article's frontmatter. The calculated value is ignored when this field is present:
```yaml
readTime: 12
```
Remove the field to go back to automatic calculation.

---

## 11. Updating Site Content Outside of Markdown

Not everything on the site lives in `.md` files. This section covers the personal and professional content that lives directly in `.astro` component files. Each task below tells you exactly which file to open and what to look for.

---

### Update your contact email or LinkedIn URL

**File:** `src/components/contact/ContactChannels.astro`

Open the file and find the `channels` array near the top. Each entry has a `label`, `value`, and `href`. Change the `value` and `href` for the Email or LinkedIn entry.

---

### Update the availability notice

**File:** `src/components/contact/ContactHero.astro`

Find the text that says something like "Available from Q3 2025" and update the quarter and year.

---

### Update the profile photo

1. Add your new photo to `public/images/` — use `.webp` format for best performance.
2. **File:** `src/components/about/HeroSection.astro`  
   Find the `<img>` tag with your profile photo and update the `src` attribute to the new filename.

---

### Update the career narrative text (About page)

**File:** `src/components/about/NarrativeSection.astro`

The long-form text about your background and approach lives here. Edit the paragraph content directly. The green expertise card on the right side of that section is also in this file.

---

### Update the certifications summary (About page — short list)

This is the 3-card certifications section on the About page, not the full registry.

**File:** `src/components/about/CertsStackSection.astro`

Find the `certifications` array near the top. Each entry has `name` and `level`. Add, remove, or edit entries here. The "View all certifications →" link at the bottom always points to `/credentials`.

---

### Update the full certifications registry (/credentials page)

**File:** `src/pages/credentials.astro`

Find the `groups` array near the top of the file. It is divided into groups (Microsoft Azure, Oracle Cloud Infrastructure, General, Legacy). Each certification entry has:

| Field | What it is |
|---|---|
| `name` | Certification name |
| `issuer` | Issuing organisation |
| `year` | Year obtained |
| `status` | `active` or `legacy` |
| `verifyUrl` | Verification URL, or `'#'` if not available yet |
| `domain` | One of: `Cloud`, `AI`, `DevOps`, `Networking`, `General` |

Add a new entry in the correct group following the existing pattern.

---

### Update the tech stack grid (About page)

**File:** `src/components/about/CertsStackSection.astro`

Find the `columns` array. Each column has a `title` and an `items` list. Add or remove items within the relevant column. The four columns are: Infrastructure, Containers & Orchestration, Observability, and Modeling.

---

### Update the work experience entries (About page)

**File:** `src/components/about/ExperienceTimeline.astro`

Find the `experiences` array near the top. Each entry has `role`, `org`, `period`, `summary`, and `bullets` (the extra detail that expands on click). Edit the relevant entry directly.
