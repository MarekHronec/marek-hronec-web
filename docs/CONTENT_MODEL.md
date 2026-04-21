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
| `tags` | string[] | Yes | At least 1 recommended | Technology and topic keywords. Shown on article card (first 2) and used for `?tag=` filtering. |
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

| Value | Display label | Topics |
|---|---|---|
| `azure` | Azure | Azure architecture, Landing Zones, Azure services, Microsoft cloud patterns |
| `networking` | Networking | VNet design, ExpressRoute, hybrid connectivity, network segmentation |
| `identity` | Identity | Entra ID, RBAC, Zero Trust, conditional access, managed identities |
| `security` | Security | Posture management, Microsoft Defender, compliance frameworks, threat protection |
| `finops` | FinOps | Cloud cost optimisation, tagging strategies, showback/chargeback models |
| `gcp` | GCP | Google Cloud Platform architecture, services, and patterns |
| `devops` | DevOps | CI/CD pipelines, GitOps, platform engineering, Infrastructure as Code |
| `bpm` | BPM | Business Process Management, Camunda, Oracle BPM, workflow orchestration |

The `CategorySidebar` component hard-codes this taxonomy for the navigation tree. Adding a new category requires:
1. Adding the `category` value to the Zod enum in `src/content.config.ts`
2. Creating the subdirectory `src/content/knowledge-base/<new-category>/`
3. Adding the new category entry to `CategorySidebar.astro`

---

## 5. File Organisation

### Knowledge base directory structure

```
src/content/knowledge-base/
├── azure/
│   ├── azure-landing-zones.md
│   └── event-driven-serverless-patterns.md
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

3. **Write the body.** Start with `##` headings. The `title` from frontmatter is the `<h1>`.

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
   ---
   ```

   If this should be the new featured study, set `featured: true` and change the previous featured study to `featured: false`. Optionally add `heroImage`, `titleHighlight`, and other optional fields.

3. **Write the body.** Structure: problem → architecture decision → implementation → outcome. Use the inline HTML format for "The Problem" and "The Outcome" headings if you want icon decoration.

4. **Validate and preview** with `npm run build && npm run preview`.

5. **Commit and push** to `main`.
