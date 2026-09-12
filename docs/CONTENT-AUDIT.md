# Content audit — knowledge base

Rolling review of all 57 knowledge-base articles for **consistency, accuracy,
truthfulness, and currency** against legislative and conceptual change.

Opened 2026-09-12. Expect this to run across several sessions — the state below
is the handover. **Start a session by reading the batch table, not the corpus.**

---

## Why now

The corpus is 57 articles / ~127k words. 29 of them are compliance pieces last
touched in April–May 2026; in EU cloud regulation four months is a long time.
The trigger was finding that `/platform` had misattributed DORA's exit-plan
*testing* requirement to Article 30 when it belongs to Article 28(8) — while
`compliance/dora-article-30-...md` had it right all along. Derived pages drift
from source articles, and nobody had checked either against the current text.

## What "audited" means here

Four dimensions, all four required before an article is marked done:

| Dimension | Question |
|---|---|
| **Truthful** | Is every factual claim correct as stated? Any overstatement? |
| **Current** | Has the law, standard, product or consensus moved since `updated:`? |
| **Consistent** | Does it contradict another article, or a derived page (`/compliance`, `/platform`)? |
| **Complete** | Metadata present and honest — `updated:`, `references:`, `level`, `readTime`? |

## Protocol — read this before running a batch

The failure mode that matters is **a confident wrong correction**. Replacing an
accurate regulatory statement with an inaccurate one is worse than leaving it
stale, and it is exactly what an eager model does when it half-remembers a
directive. So:

1. **Reviewers report; they never edit.** Findings come back as a list. Edits
   are applied in the main session, after review.
2. **Every currency claim cites a URL that was actually fetched.** "I believe
   this changed" is not a finding. No source, no finding.
3. **Findings carry a confidence label**, and they are not equal:
   - `WRONG` — a fetched source contradicts the article. Quote both.
   - `STALE` — a date has passed or a phase has commenced since `updated:`.
   - `UNVERIFIED` — could not confirm either way. Says what would settle it.
   - `INTERNAL` — contradiction with another file in this repo. No web needed.
4. **Model knowledge cutoff is May 2026 and the corpus was written up to
   May 2026.** Anything after that *must* come from search, not recall. This is
   the single biggest trap in this audit: a reviewer's memory and the article's
   text are from the same period, so they will agree with each other and both
   be out of date.
5. Slovak and other national sources may need native-language search terms.

## Model per batch

Per instruction: cheap models for lookup, expensive ones where being wrong is
costly.

- **Opus** — batches where the finding is a legal reading (B1–B3), plus the
  final cross-cutting pass and every apply decision.
- **Sonnet** — factual lookup and product/landscape currency (B4–B8).
- **Haiku** — mechanical sweeps only: link liveness, metadata gaps, terminology
  drift. No judgement calls.

---

## Batch table

Status: `todo` · `running` · `reported` (findings in, not yet applied) · `done`

| # | Batch | Articles | Model | Status | Findings | Applied |
|---|---|---|---|---|---|---|
| B1 | EU-level instruments | 7 | opus | **reported** | [12 findings](audit/B1-eu-instruments.md) | 4 of 12 |
| B2 | National frameworks, CZ–IT | 5 | opus | todo | — | — |
| B3 | National frameworks, NL–UK | 7 | opus | todo | — | — |
| B4 | Assurance and attestation | 5 | sonnet | todo | — | — |
| B5 | Market and sovereignty | 5 | sonnet | todo | — | — |
| B6 | Cloud platform and network | 10 | sonnet | todo | — | — |
| B7 | Practice and operations | 12 | sonnet | todo | — | — |
| B8 | Short-form and FinOps | 6 | sonnet | todo | — | — |
| X1 | Cross-cutting consistency | all | opus | todo | — | — |
| X2 | Link liveness + metadata | all | curl + sonnet | **done (links)** | 35 dead refs | 35 |
| X3 | Guide pages absorbed article claims | 3 | sonnet | todo | — | — |

### B1 — EU-level instruments (opus)
`dora-for-cloud-financial-sector-overlay` · `dora-article-30-contracts-and-exit-strategies` ·
`dora-ctpp-regime-direct-esa-supervision` · `nis2-supply-chain-cloud-providers` ·
`eu-ai-act-and-cloud-provider-obligations` · `gdpr-article-28-and-eu-cloud-code-of-conduct` ·
`eucs-watch-political-tracking-2026`

Highest stakes: dated instruments with phased application. Check commencement
dates that have since passed, ESA/Commission implementing acts, and the EUCS
political position, which the article itself frames as moving.

### B2 — National frameworks, CZ–IT (opus)
`czechia-nukib-cybersecurity-act` · `finland-pitukri-cloud-assessment` ·
`france-anssi-secnumcloud-qualification` · `germany-bsi-c5-cloud-attestation` ·
`italy-acn-cloud-qualification`

### B3 — National frameworks, NL–UK (opus)
`netherlands-bio2-baseline` · `norway-nsm-cloud-frameworks` · `poland-ksc-cybersecurity-system` ·
`slovakia-ksvc-mirri-government-cloud` · `spain-ens-national-security-framework` ·
`switzerland-finma-cloud-frameworks` · `united-kingdom-ncsc-cloud-security-principles`

### B4 — Assurance and attestation (sonnet)
`iso-27001-27017-27018-27701-cloud-baselines` · `soc-2-reports-how-to-actually-read-them` ·
`csa-star-registry-cross-cutting-trust-layer` · `reading-cloud-attestation-reports-practitioner-guide` ·
`cloud-encryption-key-custody-byok-hyok`

### B5 — Market and sovereignty (sonnet)
`sovereign-cloud-products-2026-landscape` · `eu-native-cloud-providers-landscape` ·
`hyperscaler-eu-data-boundary-commitments` · `cloud-data-security-eu-national-frameworks-overview` ·
`cloud-compliance-decision-framework`

Product landscape, so the risk is renamed/withdrawn offerings and changed
commitments rather than legal error. `eu-native-cloud-providers-landscape` has
14 references and 5,099 words — the largest single article.

### B6 — Cloud platform and network (sonnet)
`azure/azure-landing-zones` · `multicloud/landing-zones-what-they-solve-and-the-honest-catch` ·
`regions-zones-availability-domains-where-your-data-lives` ·
`service-availability-by-region-why-you-cannot-trust-the-map` ·
`tenant-subscription-management-group-compartment` · `naming-conventions-azure-oci` ·
`hub-and-spoke-virtual-wan-and-drg-three-topology-choices` ·
`hybrid-connectivity-expressroute-fastconnect-vpn-reality` ·
`address-plans-designing-ip-space-for-three-clouds` · `ipam-ip-address-management-...`

Service names, SKUs and limits go stale quietly. `azure-landing-zones` dates
from 2025-01-08, the second-oldest thing in the corpus.

### B7 — Practice and operations (sonnet)
`gitops-with-argocd` · `source-of-truth-...` · `status-pages-...` · `policy-as-code-and-quotas-...` ·
`rbac-and-iam-...` · `shared-responsibility-...` · `iaas-paas-saas-without-marketing-layer` ·
`documentation-ccoe-...` · `sandboxes-...` · `tagging-metadata-...` ·
`how-to-learn-azure-and-oci-...` · `bpm/introduction-to-bpm-solutions`

Mostly conceptual and slow-moving. `gitops-with-argocd` is the oldest article in
the corpus (2024-11-15) and the shortest of the long-form set at 978 words —
check Argo CD version claims specifically.

### B8 — Short-form and FinOps (sonnet)
`finops/budgets-cost-caps-...` · `finops/cloud-support-...` · `finops/discounts-and-commitments-...` ·
`multicloud/backups-replication-point-in-time-recovery` ·
`multicloud/recovery-exercise-failover-validation-failback` ·
`multicloud/rto-rpo-from-business-impact-to-tested-recovery`

A distinct recent cohort: 568–712 words each and **zero references**, against 49
of 57 articles that carry them. Three have no `updated:` field at all. Audit the
claims, but the headline finding is already known — they are inconsistent with
the corpus standard.

### X1 — Cross-cutting consistency (opus)
Not per-article. Look for: the same fact stated differently in two articles;
`/compliance` and `/platform` drifting from their source articles (one instance
already found and fixed); terminology drift; internal links that point at
renamed slugs.

### X3 — Guide pages (sonnet)
`/cost`, `/resilience`, `/connectivity` absorbed ~11k words from seven articles
(see M1). Their claims were never audited as articles and are thinly sourced
(M2). In scope because the content is the corpus, wherever it now lives.

### X2 — Link liveness and metadata (haiku)
~250 reference URLs across 49 articles. Check HTTP status, flag redirects that
change meaning (a spec moved to a new version) and anything dead. Separately:
articles missing `updated:`, `references:`, or with a `readTime` that does not
match word count.

---

## Findings log

Findings are recorded per batch as they come in, then struck through when
applied. Nothing here is applied to the corpus until it appears in a commit.

### Pre-audit findings (2026-09-12, mechanical — no web, no agent)

**Clean.** 357 internal knowledge-base links across the corpus, **zero dead**.
All five standalone pages articles link to (`/compliance`, `/platform`, `/cost`,
`/resilience`, `/connectivity`) exist. Nothing to do here.

**M1 · Seven articles were cut by 62–79% into the new guide pages.**

| Article | now | peak | cut |
|---|---|---|---|
| `finops/cloud-support-what-you-are-actually-paying-for` | 604 | 2,894 | 79% |
| `finops/budgets-cost-caps-and-the-lie-of-spending-limits` | 712 | 3,149 | 77% |
| `finops/discounts-and-commitments-math-...` | 568 | 2,214 | 74% |
| `networking/hybrid-connectivity-expressroute-fastconnect-vpn-reality` | 655 | 2,209 | 70% |
| `multicloud/regions-zones-availability-domains-...` | 836 | 2,518 | 67% |
| `networking/hub-and-spoke-virtual-wan-and-drg-...` | 707 | 2,002 | 65% |
| `multicloud/service-availability-by-region-...` | 851 | 2,236 | 62% |

**This is not content loss** — verified. The ~12,000 words removed are matched by
~11,000 words now in `src/components/{cost,resilience,connectivity}` and
`src/data/{cost,resilience,connectivity}-*.ts`. It is the same architecture as
`/platform`: long article → short article plus an interactive guide. Recorded so
that a later session does not "discover" it and try to restore the text.

**M2 · The sources did not move with the content.** The seven shortened articles
now carry **no `references:`** at all, and the guide data files that absorbed
their claims are unevenly sourced — `cost-examples.ts`, `resilience-concepts.ts`
and `connectivity-concepts.ts` carry no URLs, against 11 source references in the
comparable `security-calculator.ts`. So the corpus moved detail from a sourced
place to a less-sourced one. This is the most substantive structural finding so
far and it is a judgement call for the author, not a defect to silently fix.

**M3 · Eight articles carry no `references:`** — the seven above plus
`finops/*` overlap; the full list is the three `finops/`, the three new
`multicloud/` recovery pieces, and the two `networking/` topology pieces.
Against 49 of 57 that do carry them.

**M4 · Three articles have no `updated:`** — `multicloud/backups-replication-...`,
`multicloud/recovery-exercise-...`, `multicloud/rto-rpo-...`. All three are the
September cohort.

**M5 · `readTime` drift.** `devops/gitops-with-argocd` claims **9 minutes for 791
words** (~4 at 200 wpm) — the clear outlier. `azure/azure-landing-zones` claims 11
for 1,612 (~8); `multicloud/tenant-subscription-...` claims 13 for 2,104 (~10).
The last two are arguable if readTime is meant to cover diagrams; the first is not.

**M6 · `/platform` misattributed DORA Art. 28(8) to Art. 30.** Fixed 2026-09-09.
The source article `compliance/dora-article-30-...` was correct throughout — it
places Art. 28 as general obligations plus the Register of Information, Art. 29
as concentration risk, Art. 30 as contractual arrangements. This is the origin of
the X1 workstream: **derived pages drift from source articles**, and the drift
runs in that direction.

---

## X2 · Link liveness — reported 2026-09-12

237 unique reference URLs checked with `curl`; no agent needed. Every non-200 was
re-tested with browser-like headers, which turned out to matter.

| Result | Count | Meaning |
|---|---|---|
| 200 | 184 | Fine |
| **404** | **35 refs across 22 articles** | **Genuinely dead**, verified |
| 403 → 200 on retry | 4 | iso.org was blocking the plain user agent. Alive. |
| 403 / 000 unresolved | 9 | Bot or geo protection, *not* evidence of death |
| 302 | 2 | Polish ISAP session redirect, fine |
| 504 | 1 | AICPA timeout, transient |

**Three false positives, recorded so a later sweep does not repeat them:**

- The four `iso.org` links returned 403 to plain curl and **200** with a normal
  browser user agent. Any future sweep must retry non-200s with real headers
  before reporting anything.
- Five "connection failures" were `url: "/knowledge-base/..."` entries in
  `cloud-compliance-decision-framework.md` — deliberate internal cross-references
  carrying `domain: "internal"`. Not defects.
- `bleu.fr` and `ens.ccn.cni.es` resolve in DNS but refuse connections from this
  machine — almost certainly geo-blocking. Recorded as unverified, not dead.
  Someone on an EU connection should confirm.

### The 35 dead references

A dead citation is not a wrong claim. These need the URL re-pointed, not the text
rewritten — with two exceptions below. They cluster, because the cause is site
reorganisation rather than rot:

**EU institutions — 13.** Every EBA, ESMA, EIOPA, ENISA and EDPB link in the
corpus is dead. One fix applied thirteen times, not thirteen investigations.
`dora-for-cloud` (4) · `dora-ctpp-regime` (3) · `dora-article-30` (3, including an
ECB banking-supervision press release) · `nis2-supply-chain` (2) · `eu-ai-act` (2) ·
`gdpr-article-28` (1) · `cloud-encryption-key-custody` (1)

**Oracle docs — 4**, including `shared_responsibility.htm`, cited by two articles.
`iaas-paas-saas-without-marketing-layer` · `shared-responsibility-...` ·
`tenant-subscription-management-...` · `policy-as-code-and-quotas-...`

**National authorities — 7.** France ×3 (`numerique.gouv.fr` doctrine,
`cyber.gouv.fr/recyf`, `/monespacenis2`) · Germany BSI NIS-2 · Italy ACN
`normativa` · Netherlands `cyberbeveiligingswet` · Norway NSM `skytenester`.

**Vendors and standards bodies — 11.** Microsoft Learn customer-managed-keys ·
Google Workspace ×2 · AWS EU Sovereign Cloud · CSA CAIQ v4 · IAASB ISAE 3000 ·
FinOps Foundation tagging capability · FINMA 2019 cloud FAQ.

**Two may be substantive rather than cosmetic** — check the claim, not just the URL:

- `aws.amazon.com/eu-sovereign-cloud/`, cited by
  `sovereign-cloud-products-2026-landscape`. The AWS European Sovereign Cloud has
  been moving; if it launched, was renamed, or slipped, the article's text is
  affected and not only its footnote.
- `nsm.no/.../skytenester/`, cited by `norway-nsm-cloud-frameworks`. NSM
  withdrawing or replacing its cloud guidance would change what that article says.

Replacement URLs are being looked up mechanically. Nothing is applied until each
replacement has been fetched and returned 200.

---

## Session log

**2026-09-12.** Opened the audit. Inventory, batch plan, protocol. Mechanical pass
(M1–M6). Link liveness (X2, above). B1 dispatched to opus.

⚠ **A second session works in this repo concurrently.** While this branch was
checked out it committed connectivity work onto it, then cherry-picked that to
`main` and left the tree on `main`. No work was lost — `git rebase main` dropped
the duplicate — but check `git branch --show-current` before committing, and do
not assume the tree is where you left it.

---

## X2 · Replacement URLs — first pass, and a calibration lesson

**Applied (3).** Verified twice: the URL returns 200 *and* its `<title>` names the
same document the reference cites. A live page is not the same as the right page.

| Article | Reference | New URL |
|---|---|---|
| `dora-for-cloud-...` | EBA DORA hub | `/activities/direct-supervision-and-oversight/digital-operational-resilience-act` |
| `dora-article-30-...` | EBA/GL/2019/04 | `/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-ict-and-security-risk-management` |
| `dora-article-30-...` | EBA/GL/2019/02 | `/activities/single-rulebook/regulatory-activities/internal-governance/guidelines-outsourcing-arrangements` |

EBA moved `/regulation-and-policy/…` → `/activities/…`. The other EU agencies
probably did something similar.

**Held (1).** `numerique.gouv.fr/doctrine-cloud-au-centre/` → `/cloud/` returns
200, but the reference is titled *"Cloud at the Centre Doctrine (DINUM)"* and the
replacement is a general cloud landing page whose title is empty (JS-rendered).
That is a weaker target than the citation claims. Not applied until the doctrine
document itself is located.

### Calibration: what the cheap model was and was not good for

Haiku was given all 35. It returned **4 correct replacements and 30 "NOT FOUND"**.
The four positives were right — all verified 200. The negatives were close to
worthless: two were disproved on the first guess, by hand, in seconds —
`aws.amazon.com/compliance/europe-digital-sovereignty/` (200) and
`docs.oracle.com/en-us/iaas/Content/Security/Concepts/security_overview.htm` (200),
both of which it declared nonexistent.

It also volunteered a substantive factual claim nobody asked it for: *"As of 2026,
AWS has not launched a dedicated European Sovereign Cloud product."* That is
precisely the confident-wrong-answer this audit's protocol exists to catch, and it
would have propagated into an article had it been trusted.

**Rule for the rest of the audit:** a cheap model may *verify* a URL — a mechanical
yes/no — but must not be asked to *find* one, and its negative results are not
evidence. Absence of a search result is not absence of a page. The remaining 31
went to sonnet with the two counterexamples quoted in the brief.

---

## X2 · Replacements applied — 2026-09-12

**All 35 dead references are fixed.** Sonnet resolved 28 of 28 it was given; I
re-fetched every replacement myself and all 27 distinct targets returned 200
before anything was written. 31 substitutions across 22 files (some URLs were
cited by two articles). Grepped afterwards: no old URL survives anywhere.

Patterns worth knowing, because the rest of the corpus will hit them:

- EBA `regulation-and-policy/…` → `activities/…`
- ESMA `policy-activities/…` → `esmas-activities/…`
- ENISA abandoned topic-tag URLs; publications now have their own pages
- EDPB collapsed the codes-of-conduct register into one paginated page — the EU
  Cloud CoC entry has no permalink any more and sits on page 3
- Oracle merged shared-responsibility into `security_overview.htm`, moved
  service limits and Security Zones
- ANSSI folded ReCyF and MonEspaceNIS2 into one **MesServicesCyber** portal
- CSA renamed CAIQ v4 → *STAR Level 1 Security Questionnaire (CAIQ v4)*
- FinOps folded the tagging capability into **Allocation**

One trap avoided: the URL search engines offer as the EDPB guidelines successor
302-redirects to a *different* page (public consultations). The unified
`documents_en` hub is the right target.

### Two substantive answers, not just link fixes

**AWS European Sovereign Cloud is live** — general availability January 2026,
first region Brandenburg. The article said "under construction … not yet
operational" as of mid-2026. Corrected. I verified operability independently of
the reviewer: AWS's own page carries a customer story about it, and
`ec2.eusc-de-east-1.amazonaws.eu` answers on the dedicated `.eu` domain AWS
reserved for the sovereign cloud. *Caveat: the precise GA date comes from the
reviewer's fetch of the Amazon press release; I corroborated that it is
operational and that the launch was January 2026, not the exact day.*

Note this also disposes of the haiku claim that AWS "has not launched a
dedicated European Sovereign Cloud product" — it was wrong, and it was the sort
of claim that would have gone straight into an article.

**Norway's NSM has not withdrawn its cloud guidance.** The page was renamed and
broadened from *skytenester* to *Bruk av tjenesteutsetting og skytjenester* and
renested. `norway-nsm-cloud-frameworks` needs no text change — only the URL,
which is done. The 403 was bot detection, as suspected.

### Metadata

`updated:` bumped to 2026-09-12 on the 22 articles touched. This closes M4 for
those files; the three September-cohort articles still carry no `updated:` and
are handled in B8.
