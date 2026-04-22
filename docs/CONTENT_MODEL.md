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
readTime: 11
level: advanced          # beginner | intermediate | advanced
excerpt: ""
---
```

### Field reference

| Field | Type | Required | Constraints | Description |
|---|---|---|---|---|
| `title` | string | Yes | — | Full article title as it appears in the card and article header |
| `category` | enum | Yes | One of 8 values | Controls sidebar navigation and filtering. See taxonomy. |
| `tags` | string[] | Yes | At least 1 recommended | Technology and topic keywords. All tags shown on article card. Used for filter chip display and article detail header. |
| `date` | Date | Yes | ISO 8601 string, coerced to Date | Publication date. Articles are sorted newest-first on the listing page. |
| `readTime` | number | Yes | Integer, minutes | Estimated reading time. Displayed in the article card and article header. |
| `level` | enum | Yes | `beginner`, `intermediate`, or `advanced` | Controls the colour-coded level badge on the article card and article header. |
| `excerpt` | string | Yes | ≤160 characters recommended | One-sentence summary. Appears on the article card and in page meta description. |

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
| `networking` | Networking | VNet design, ExpressRoute, hybrid connectivity, network segmentation | Topic |
| `identity` | Identity | Entra ID, RBAC, Zero Trust, conditional access, managed identities | Topic |
| `security` | Security | Posture management, Microsoft Defender, compliance frameworks, threat protection | Topic |
| `finops` | FinOps | Cloud cost optimisation, tagging strategies, showback/chargeback models | Topic |
| `gcp` | GCP | Google Cloud Platform architecture, services, and patterns | Platform |
| `devops` | DevOps | CI/CD pipelines, GitOps, platform engineering, Infrastructure as Code | Topic |
| `bpm` | BPM | Business Process Management, Camunda, Oracle BPM, workflow orchestration | Topic |

The **Filter group** column maps to the KB listing page filter panel. Platform categories (`azure`, `oci`, `gcp`) appear under the **Platforms** group; topic categories appear under **Topics**. Articles whose category is a platform value (e.g. `azure`) also surface under topics if their tags match a topic (e.g. tag `Networking` → Networking filter).

Adding a new category requires:
1. Adding the `category` value to the Zod enum in `src/content.config.ts`
2. Creating the subdirectory `src/content/knowledge-base/<new-category>/`
3. Adding filter buttons to `CategorySidebar.astro` in the correct group (Platforms or Topics), following the `data-filter-group` / `data-filter-value` attribute pattern used by existing buttons
4. If it is a topic category, adding its mapping to the `TOPIC_CATS` set and `LABELS.topic` object in `src/pages/knowledge-base/index.astro`

---

## 5. File Organisation

### Knowledge base directory structure

```
src/content/knowledge-base/
├── azure/
│   ├── azure-landing-zones.md
│   ├── cloud-resource-naming-conventions.md
│   └── event-driven-serverless-patterns.md
├── bpm/
│   └── introduction-to-bpm-solutions.md
└── devops/
    └── gitops-with-argocd.md
```

New category subdirectories (networking/, identity/, etc.) should be created when the first article for that category is added.

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

Two callout types are available. Because `.md` files cannot import Astro components, callouts are written as raw HTML:

**Pro Tip:**
```html
<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Pro Tip</p>
    <p>Your tip content here.</p>
  </div>
</div>
```

**Warning:**
```html
<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5L1.5 14h13L8 1.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M8 6v3.5M8 11.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Warning</p>
    <p>Your warning content here.</p>
  </div>
</div>
```

### Case study section headings

Case study bodies use inline HTML headings for the "The Problem" and "The Outcome" sections, because the detail page applies icon-bearing styles via CSS `:global(h2 svg)`:

```html
<h2><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>The Problem</h2>
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
   | `category` | Must be one of: `azure \| oci \| networking \| identity \| security \| finops \| gcp \| devops \| bpm` |
   | `level` | Must be one of: `beginner \| intermediate \| advanced` |
   | `date` | Must be a valid date string, e.g. `2025-06-01` |
   | `readTime` | Must be a plain number — not a string like `"9 min"` |
   | `excerpt` | Keep under 160 characters |
   | `tags` | Free-form array of strings — no enum constraint |

3. **Write the body.** Start with `##` headings. The `title` from frontmatter is the `<h1>`.

### Adding a new category

To add a category not in the list above:

1. **Extend the enum** in [src/content.config.ts](../src/content.config.ts):
   ```ts
   category: z.enum(['azure', 'oci', 'networking', 'identity', 'security', 'finops', 'gcp', 'devops', 'bpm', 'your-new-category']),
   ```
2. **Add filter buttons** in `src/components/knowledge-base/CategorySidebar.astro`. Find either the Platforms or Topics `<ul>` and add a new `<li>` following the existing pattern:
   ```html
   <li>
     <button class="kb-filter__btn" data-filter-group="topic" data-filter-value="your-new-category" aria-pressed="false">
       <span>Your Category</span><span class="kb-filter__count"></span>
     </button>
   </li>
   ```
   Add the same button to the mobile sheet `<ul>` (same structure, add `kb-mobile-sheet__btn` to the class list).
3. **Register the label** in the `LABELS.topic` object inside the `<script>` block of `src/pages/knowledge-base/index.astro`:
   ```ts
   topic: { ..., 'your-new-category': 'Your Category' }
   ```
4. **Add to `TOPIC_CATS`** if it is a topic (non-platform) category — in the same `<script>` block, `const TOPIC_CATS = new Set([..., 'your-new-category'])`.
5. **Create the subdirectory** and drop your `.md` file in:
   ```
   src/content/knowledge-base/your-new-category/first-article.md
   ```

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

Two files need to change:

**File 1 — `src/content.config.ts`**

Find this line (it's near the top of the file):
```ts
category: z.enum(['azure', 'networking', 'identity', 'security', 'finops', 'gcp', 'devops', 'bpm']),
```
Add your new category name inside the brackets, comma-separated, in lowercase. Example:
```ts
category: z.enum(['azure', 'networking', 'identity', 'security', 'finops', 'gcp', 'devops', 'bpm', 'ai']),
```

**File 2 — `src/components/knowledge-base/CategorySidebar.astro`**

Find either the **Platforms** or **Topics** `<ul class="kb-filter__options">` block. Add a new `<li>` following this pattern:

```html
<li>
  <button class="kb-filter__btn" data-filter-group="topic" data-filter-value="your-category" aria-pressed="false">
    <span>Your Category</span><span class="kb-filter__count"></span>
  </button>
</li>
```

Repeat the same `<li>` inside the matching group in the **mobile sheet** section further down in the same file (add `kb-mobile-sheet__btn` to the class list for mobile).

**File 3 — `src/pages/knowledge-base/index.astro` (script block)**

Add the display label to `LABELS.topic` and the value to `TOPIC_CATS` (if it's a topic, not a platform):
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
azure | networking | identity | security | finops | gcp | devops | bpm
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
  caseStudies: 200,
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

- `caseStudies` — applies to all case study articles
- `knowledgeBase.default` — fallback used when a category has no specific entry
- Each named key under `knowledgeBase` — overrides the default for that category

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
