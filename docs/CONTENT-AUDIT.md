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
| B1 | EU-level instruments | 7 | opus | running | — | — |
| B2 | National frameworks, CZ–IT | 5 | opus | todo | — | — |
| B3 | National frameworks, NL–UK | 7 | opus | todo | — | — |
| B4 | Assurance and attestation | 5 | sonnet | todo | — | — |
| B5 | Market and sovereignty | 5 | sonnet | todo | — | — |
| B6 | Cloud platform and network | 10 | sonnet | todo | — | — |
| B7 | Practice and operations | 12 | sonnet | todo | — | — |
| B8 | Short-form and FinOps | 6 | sonnet | todo | — | — |
| X1 | Cross-cutting consistency | all | opus | todo | — | — |
| X2 | Link liveness + metadata | all | haiku | todo | — | — |

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

### X2 — Link liveness and metadata (haiku)
~250 reference URLs across 49 articles. Check HTTP status, flag redirects that
change meaning (a spec moved to a new version) and anything dead. Separately:
articles missing `updated:`, `references:`, or with a `readTime` that does not
match word count.

---

## Findings log

Findings are recorded per batch as they come in, then struck through when
applied. Nothing here is applied to the corpus until it appears in a commit.

### Pre-audit findings (2026-09-12, mechanical)

- **8 articles carry no `references:`** — the six in B8 plus
  `regions-zones-...` and `service-availability-...` lost theirs? (verify: both
  show 4 refs, so no — the eight are the B8 six plus
  `hub-and-spoke-...` and `hybrid-connectivity-...`).
- **3 articles have no `updated:`** — all in B8.
- **`/platform` misattributed DORA Art. 28(8) to Art. 30.** Fixed 2026-09-09 in
  `fix(platform): act on the review`. The source article was correct. Recorded
  here as the origin of the X1 workstream.
