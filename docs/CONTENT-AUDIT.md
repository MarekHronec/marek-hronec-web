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

## A mistake this audit actually made — read it before doing a bulk edit

Fixing the ANSSI/BSI date (B1 finding P8) meant changing "March 2026" to
"November 2025" across five files. I scoped the replacement to *lines
mentioning ANSSI or BSI*, thinking that was safe, and it corrupted three lines:

- ANSSI's **ReCyF** genuinely was published **17 March 2026**. Two lines in
  `france-anssi-secnumcloud-qualification.md` said so, and both mention ANSSI.
- BSI's **C5:2026 catalogue** genuinely was published **March 2026**. Its
  reference description mentions BSI.

The scoping heuristic was wrong because it assumed one organisation has one
event in one month. Two different real events involving the same agencies sat a
few months apart.

**The verification was worse than the edit.** I grepped afterwards for lines
that *still* contained "March 2026" plus ANSSI/BSI, saw only the C5:2026 body
lines, and concluded the scoping had worked. That grep was structurally
incapable of finding the damage: it searched for what remained, not for what
changed. A wrongly-changed line no longer matches the search that would find it.

Two rules follow, and they apply to every batch:

1. **Never bulk-replace a date, name or number on a keyword match.** Read each
   occurrence and decide. Fifteen lines is not too many to look at.
2. **A finding usually occurs more than once. Grep for the claim, not just the
   line the reviewer cited.** B3a's Slovak repeal finding named one line; the
   same claim sat in two more places, and fixing only the cited one left the
   article contradicting itself — "repealed by 184/2026" in one paragraph and
   "no formal repeal has been verified" in two others. Reviewers cite examples,
   not inventories.
3. **After splicing out a section, diff what was removed.** Replacing the Dutch
   BBN section dropped an enumeration of classification levels that had nothing
   to do with BBNs and should have survived. Index-based splices take
   neighbouring content with them silently.
4. **Verify by reading the diff, not by re-grepping the source.**
5. **When you correct a claim, check the article’s own checklist and excerpt too.**
   B5b found an article whose body had been corrected in B1 while its closing
   checklist still stated the error the body explicitly refutes.
6. **A reviewer saying it checked propagation is not a substitute for running the
   grep.** B6a’s reviewer stated positively that no further propagation existed;
   grepping the retired product name found two more articles using it as current. `git show
   --unified=0` on your own commit, every changed line, every time. The
   question is "is each line I changed still true", not "is the old string
   gone".

The corruption was caught by the *next* batch's reviewer, which flagged the
France date as contradicting another file. Without that it would have shipped.

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

## Coverage — read this before claiming anything is done

Honest scorecard as of 2026-09-13. The distinction that matters is between an
article whose **claims were read and verified** and one that merely had a
**citation repointed**. Only the first is an audit.

| | Articles |
|---|---|
| **Content-audited and corrected** (read end to end, claims checked against fetched sources, findings applied) | **33** — B1, B2, B3a, B3b, B4, B5a, B5b, B6a |
| Citation repointed only, content never examined | 8 |
| Touched by a single verified correction, rest of the article unexamined | 2 (`rbac-and-iam-authorisation-models-that-look-similar`, `sandboxes-environments-you-will-probably-set-up-wrong`) |
| Inventoried and link-checked only | all 57 |
| **Never opened** | **33** |

So: **24 of 57 articles have not been audited.** B2–B8 is not a formality; it is
almost all of the work. B2 is running as of 2026-09-12.

**What B1 cost, as a planning input for the rest.** Seven articles produced
twelve findings, of which four were errors that were wrong *when published*
rather than merely aged — the CTPP designations, the NIS2 essential/important
thresholds, the Article 30(2)(f) cost clause, and the exit-plan testing
attribution. If that rate holds, the remaining 22 compliance articles carry
something like a dozen more errors of the same class. Budget accordingly:
this is not a proofread.

**A mistake made and corrected on the first day.** Repointing dead references
bumped `updated:` to today on 22 articles. That was wrong — it told a reader
those articles had been reviewed today, on exactly the compliance pieces whose
claims are known to be four months stale and unexamined. The stamp was reverted
on the 18 that received metadata only; it stands on the four with genuine
content corrections. A repointed footnote is not a review, and the frontmatter
must not imply that it is.

## Batch table

Status: `todo` · `running` · `reported` (findings in, not yet applied) · `done`

| # | Batch | Articles | Model | Status | Findings | Applied |
|---|---|---|---|---|---|---|
| B1 | EU-level instruments | 7 | opus | **applied** | [12 findings](audit/B1-eu-instruments.md) | 8 full, 3 part, 1 open |
| B2 | National frameworks, CZ–IT | 5 | opus | **applied** | [25 findings](audit/B2-national-cz-it.md) | 9 high + 4 med |
| B3a | Slovakia, Poland, Netherlands | 3 | opus | **applied** | [15 findings](audit/B3a-sk-pl-nl.md) | 12 + 2 spillovers |
| B3b | Norway, Spain, Switzerland, UK | 4 | opus | **applied** | [21 findings](audit/B3b-no-es-ch-uk.md) | 21 + 6 spillovers |
| B4 | Assurance and attestation | 5 | sonnet | **applied** | [17 findings](audit/B4-assurance-attestation.md) | 12 + 3 spillovers |
| B5a | Vendor and product landscape | 3 | sonnet | **applied** | [13 findings](audit/B5a-vendor-landscape.md) | 8 + 4 spillovers |
| B5b | Overview and decision framework | 2 | sonnet | **applied** | [13 findings](audit/B5b-synthesis-articles.md) | 12 + 2 spillovers |
| B6a | Platform structure and landing zones | 4 | sonnet | **applied** | [11 findings](audit/B6a-platform-structure.md) | 9 + 2 spillovers |
| B6b | Networking and addressing | 4 | sonnet | todo | — | — |
| B6c | Regions and service availability | 2 | sonnet | todo | — | — |
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

### B3a — Slovakia, Poland, Netherlands (opus)
`slovakia-ksvc-mirri-government-cloud` · `poland-ksc-cybersecurity-system` · `netherlands-bio2-baseline`

Slovakia leads and gets the deepest treatment: home market, and its material
feeds the live ISVS calculator (`src/data/security-calculator.ts`). The reviewer
is asked to diff the article against the calculator — a contradiction between
the two would mean the page and the tool tell a reader different things.

### B3b — Norway, Spain, Switzerland, UK (opus)
`norway-nsm-cloud-frameworks` · `spain-ens-national-security-framework` ·
`switzerland-finma-cloud-frameworks` · `united-kingdom-ncsc-cloud-security-principles`

### Batch sizing — learned the hard way

**B3 was originally seven articles and died on a session rate limit**, right as
it began verification. It returned nothing usable and the tokens were spent for
no output.

The numbers, for planning: B1 consumed ~234k subagent tokens for 7 articles,
B2 ~252k for 5. A seven-article national-framework batch needs ~300k+ because
each country requires native-language searching and primary-source fetching.

**Cap a batch at 3–5 articles.** The marginal cost of an extra batch is one
dispatch; the cost of an over-sized batch that dies at 90% is the whole thing.

### B4 — Assurance and attestation (sonnet)
`iso-27001-27017-27018-27701-cloud-baselines` · `soc-2-reports-how-to-actually-read-them` ·
`csa-star-registry-cross-cutting-trust-layer` · `reading-cloud-attestation-reports-practitioner-guide` ·
`cloud-encryption-key-custody-byok-hyok`

### B5a — Vendor and product landscape (sonnet)
`eu-native-cloud-providers-landscape` · `sovereign-cloud-products-2026-landscape` ·
`hyperscaler-eu-data-boundary-commitments`

Product landscape, so the risk is renamed/withdrawn offerings, changed
ownership and changed commitments rather than legal error.
`eu-native-cloud-providers-landscape` has 14 references and 5,099 words — the
largest single article in the corpus.

**Why B5 was split.** The original five totalled 16,872 words against B4's
12,600, which took 257k subagent tokens. The three vendor articles share their
subject matter, so one reviewer checking a provider once serves all three. The
remaining two are synthesis pieces whose work is mostly internal consistency
against the rest of the corpus — a different job, and one that gets easier
after the vendor facts are settled.

### B5b — Overview and decision framework (sonnet)
`cloud-data-security-eu-national-frameworks-overview` · `cloud-compliance-decision-framework`

Both aggregate claims owned by other articles, so this is chiefly an INTERNAL
consistency pass. Run it **after** B5a so the vendor facts are settled first.
Note both already carry B3b corrections to their country tables.

### B6a — Platform structure and landing zones (sonnet)
`azure/azure-landing-zones` · `multicloud/landing-zones-what-they-solve-and-the-honest-catch` ·
`multicloud/tenant-subscription-management-group-compartment` · `multicloud/naming-conventions-azure-oci`

8,985 words. `azure-landing-zones` dates from 2025-01-08, the second-oldest
article in the corpus. The perishable claims here are **hard platform limits**
— management-group hierarchy depth, resource name-length caps, subscription
counts — and **product names**, which Microsoft renames without notice.

### B6b — Networking and addressing (sonnet)
`networking/address-plans-designing-ip-space-for-three-clouds` ·
`networking/ipam-ip-address-management-before-you-wish-you-had-done-it` ·
`networking/hub-and-spoke-virtual-wan-and-drg-three-topology-choices` ·
`networking/hybrid-connectivity-expressroute-fastconnect-vpn-reality`

7,493 words. Note the last two carry **zero references**, like the B8 cohort.
Gateway SKUs, throughput figures and peering limits are the staleness risk.

### B6c — Regions and service availability (sonnet)
`multicloud/regions-zones-availability-domains-where-your-data-lives` ·
`multicloud/service-availability-by-region-why-you-cannot-trust-the-map`

Only 1,687 words but the most perishable content in the corpus — provider
region footprints change monthly. B5a already established the current AWS
region count and that AWS has announced only Saudi Arabia and Chile.

**Why B6 was split.** Ten articles and 18,165 words, more than B5 before its
own split, and well past the 3–5 cap. The three groups also divide by source:
B6a and B6b check vendor documentation, B6c checks provider region pages.

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

## Session 6 — B3b applied (2026-09-13)

**Norway, Spain, Switzerland, UK.** Four articles, 21 findings, all applied or
recorded. Detail in [B3b](audit/B3b-no-es-ch-uk.md).

The reviewer's record for this batch is **18 of 18 externally checkable
findings confirmed against sources I fetched myself, none hallucinated.** That
is now the pattern across B1, B2, B3a and B3b: reviewers report accurately;
the defects have all come from *my* application of their findings.

### The three that mattered most

**Spain was citing a currency table as a NIS2 transposition.** The reference
`BOE-A-2025-7187` is a Banco de España resolution publishing ECB euro
reference rates for 8 April 2025. The real Real Decreto-ley 7/2025 is
emergency electricity measures, repealed by the Congreso on 22 July 2025. So
the article's whole "dual-track NIS2 regime" framing rested on a decree that
had nothing to do with cybersecurity and no longer existed. Spain has notified
no NIS2 transposition at all.

**The UK CTP regime had made its first designations and the article described
powers nobody had used.** HM Treasury designated AWS, Google Cloud, Microsoft
and Oracle on 10 July 2026, with oversight from 13 July. For an article whose
audience is cloud architects, four named hyperscalers under live FCA/PRA/BoE
oversight was the most consequential missing UK fact.

**Norway had a law that does not exist and a regulation described as pending
that had been in force for ten months.** There is no "NIS-loven from 2018";
the NIS1 implementation is digitalsikkerhetsloven, in force only from
1 October 2025. DORA has applied in Norway since 1 July 2025. The Pro Tip
advised readers to wait for something that had already happened before the
article's own stated update date.

### The CJEU referral, finally published

I had declined this claim twice on the grounds that the presscorner HTML page
is a JavaScript shell. The reviewer found the way through: the **print-PDF
endpoint** returns the real document. I reproduced it and ran two negative
controls — an invented reference 404s, and a different real reference returns
a different real document. Published in the Spain and France articles.

### Method note — a parse is not a source

My first coordinate extraction of the FINMA addressee matrix appeared to
contradict the reviewer, showing marks for FMI columns. Rendering the page as
an image showed my column mapping had bled into an adjacent row; the reviewer
was right. **Before treating your own parse as evidence against a source,
look at the source.**

### A fourth self-inflicted defect, from B3a

Grepping for claims rather than cited lines turned up an incomplete B3a
application: the Dutch Cyberbeveiligingswet was corrected to "in force" in one
bullet while five other places still said "in Senate review". This is the
**third** time partial application has left an article contradicting itself.
The standing rule already covers it; the rule is not the problem, remembering
to apply it is.

## Session 7 — B4 applied (2026-09-13)

**Assurance and attestation.** Five articles, 17 findings, 12 applied and 4
left unverified with what would settle each. Detail in
[B4](audit/B4-assurance-attestation.md).

Reviewer accuracy holds: **10 of 10 externally checkable findings confirmed.**
Across B1–B4 no reviewer has yet fabricated a finding.

### The ISO stack had moved underneath the article

ISO/IEC 27701 is no longer an extension of 27001. The 2025 second edition
"has been redrafted as a stand-alone management system standard" in ISO's own
foreword, and the 2019 edition is withdrawn. ISO's titles say it plainly: the
old one was called "Extension to ISO/IEC 27001 and ISO/IEC 27002", the new one
"Privacy information management systems". The article asserted the extension
relationship in five places, including that 27001 is a prerequisite and that
certification "is granted as an extension". All of that is now wrong.

Three of the four standards in the article's own summary table were on
superseded editions, two of them already superseded *before* the article's
stated update date. 27017:2026 also restructured its controls, so the
"seven additional cloud-specific controls" line no longer describes anything.

### Getting past ISO's bot block

`iso.org` returns 403 to curl and its OBP search widget is a Vaadin shell.
Two routes work and are worth reusing:

- The **SC 27 committee catalogue** at
  `iso.org/committee/45306/x/catalogue/p/1/u/0/w/0/d/0`, loaded in the browser
  pane, lists every standard in the family with `[Withdrawn]` markers. One
  page answers every version question at once.
- The **Online Browsing Platform** serves each standard's foreword and
  introduction free at
  `iso.org/obp/ui/en/#iso:std:iso-iec:<number>:ed-<n>:v1:en`. That is where
  the authoritative "what changed in this edition" wording lives.

### A citation that was right by accident

The reviewer cited `iso.org/standard/27017` for "ISO/IEC 27017:2026". That
path is a catalogue *record id*, not a standard number; with `.html` appended
it resolves to ISO 7547:2002, on ship ventilation. The reviewer's conclusion
was correct but it came from search-engine snippets, not from the page it
cited. Same lesson as B3b's FINMA parse, from the other direction: **a right
answer and a sound citation are separate things, and only the citation
survives into next year.**

### One UNVERIFIED closed by following a redirect

The reviewer could not establish whether Equinix SmartKey still exists as a
product, because Equinix 403s. It correctly refused to call it WRONG.
Following the redirect settles it: Equinix's own product URL now lands on
`fortanix.com/platform/data-security-manager`. The article had been listing
one product twice, under both names.

### Metadata

`updated:` bumped on the five audited articles only. `sovereign-cloud-products-2026-landscape`
and `landing-zones-what-they-solve-and-the-honest-catch` received the Microsoft
Sovereign Cloud rename as propagation and were **not** bumped — one verified
correction is not a review, and both are still due their own batch.

## Session 8 — B5a applied (2026-09-13)

**Vendor and product landscape.** Three articles, 13 findings, 8 applied and 5
left unverified. Detail in [B5a](audit/B5a-vendor-landscape.md).

### The registry beats the press release

The reviewer reported two SecNumCloud qualifications as dated 1 September 2026,
from trade press and a company announcement, and honestly flagged that the
repo's France article said July. **ANSSI's own catalogue gives 31 July 2026 for
both** — OVHcloud SNC Cloud Platform decision 3393, Numspot decision 3395, each
valid to 31 July 2029. September was the announcement. The repo was right.

The general rule this establishes: **for a regulatory decision, the regulator's
register is the source and the company's announcement is downstream of it.**
ANSSI publishes a monthly PDF catalogue with decision numbers and validity
windows for every qualified service. Use it for every future SecNumCloud
question:

`messervices.cyber.gouv.fr/visas/catalogue-produits-services-profils-de-protection-sites-certifies-qualifies-agrees-anssi.pdf`

Two facts fell out of that table that no announcement would have given:
**OVHcloud's original Hosted Private Cloud qualification expires 29 December
2026 and Outscale's expires 30 November 2026.** Both are within months. Neither
is an edit today, but both belong on the next pass. Absence from the catalogue
also proved Bleu and ITS Integra remain unqualified, which is better evidence
than their own progress announcements.

### The corpus contradicted itself about a live product

`hyperscaler-eu-data-boundary-commitments` said the AWS European Sovereign
Cloud was "under construction as of mid-2026; not yet operational". Its sister
article in the same batch said, correctly, that it has been generally available
since January 2026. Both articles carried update stamps that postdate the
launch. A fact can be corrected in one article and left standing in another
for months — this is the same failure the Dutch act showed in B3b, and it is
why X1 exists.

### An error that needed no source

"AWS regions in Europe (Frankfurt, Ireland, London, Paris, Stockholm, Milan,
Zurich, Spain) have always been EU-located." London is in the United Kingdom
and Zurich is in Switzerland. That was wrong on the day it was written, in an
article whose entire subject is the EU boundary. Worth remembering that not
every finding needs a fetch — some need only reading the sentence.

### Cited-line undercount, fourth batch running

The reviewer cited seven locations for the OVHcloud qualification claim. The
real count was eleven, the extras being table cells and a checklist line found
by grepping the claim. **Grep the claim, not the line** has now paid for itself
in four consecutive batches.

## Session 9 — B5b applied (2026-09-13)

**Overview and decision framework.** Two synthesis articles, 13 findings, 12
applied. Detail in [B5b](audit/B5b-synthesis-articles.md).

Twelve of the thirteen were **internal contradictions**, which is what the
brief predicted: these two articles tabulate claims other articles own, and
they predate the corrections applied to twenty-seven of those owners. Zero
WRONG findings came from web fetches this batch. The one claim owned by no
file in the repo was checked externally and was correct.

### A decision tree that routed to an unqualified provider

The severity ranking in these articles is different from the country ones.
Worked example 3 told a French defence-adjacent SaaS provider to use
"sovereignty-grade cloud (Bleu, S3NS, OVHcloud, 3DS Outscale)" — a flat list
of four, one of which is not SecNumCloud-qualified and is still in ANSSI's
audit phase. A reader following that tree would shortlist an unqualified
provider for precisely the workload class where qualification is mandatory.

**Stale prose is a nuisance; a decision tree that names the wrong instrument
is a defect.** Weight findings in routing articles accordingly.

The same article routed Dutch workloads to BBN1 and BBN2 two tiers running,
when BIO2 abolished the BBNs at v1.3 — and its own tier 4 already said so.

### A correction that left its own checklist contradicting it

The reviewer found that `gdpr-article-28-and-eu-cloud-code-of-conduct`, an
article **audited in B1**, disagrees with itself. Its body says plainly that
AWS is not on the SCOPE Europe register and adheres to the CISPE code instead,
and warns that pointing at the wrong register costs credibility. Its closing
checklist still lists AWS as an adopter.

This is a new variant of the partial-application failure. The earlier ones
were a fix landing in one article and not its siblings. This one is a fix
landing in an article's body and not its own summary. **When correcting a
claim, check the article's own checklist and excerpt, not just the passage
that stated it.** Add that to the standing rules.

### What the ten U-scheme locations say about aggregators

The Slovak U1–U4 scheme is relied on in ten places across these two files,
none of which mentioned that its statutory basis is repealed from 1 January
2027 — a fact the owning article has carried since B3a. An aggregator does not
inherit corrections. It has to be walked through them claim by claim, which is
exactly what this batch did and what X1 will have to do for the rest.

## Session 10 — B6a applied (2026-09-13)

**Platform structure and landing zones.** Four articles, 11 findings, 9 applied.
Detail in [B6a](audit/B6a-platform-structure.md).

First non-regulatory batch. Platform facts fail differently from legal ones:
limits get revised, products get renamed while the underlying thing survives,
and reference architectures change their recommended shape between versions.
All three happened here.

### What was wrong

The Azure reference architecture has **four** platform subscriptions, not
three. CAF's own table lists Security alongside Management, Connectivity and
Identity, holding Sentinel and SIEM tooling. The Azure article had three; the
tenancy article already treated Security as always-separate, so the corpus
disagreed with itself.

Landing zones split **three** ways — Corp, Online and Local — not two.

Hierarchy depth was overstated in two places that did not agree with each
other, "four to five" and "four to six", against CAF's "no more than three to
four levels" and a reference hierarchy that is three deep. The six-level
figure the articles cite as the hard limit is correct and stayed.

Oracle's landing zone applies **CIS Benchmark v2.0**. The article had the
versions backwards, presenting v3.0 as current.

### The propagation claim that was not true

The reviewer's coverage statement asserted it had grepped every falsified
claim across the corpus and found no further propagation. Grepping
`CIS Landing Zone` finds two more articles using the retired name as current.

Five batches running, the propagation search has come back short. This is the
first time a reviewer stated positively that it was complete. **A reviewer's
claim to have checked propagation is not a substitute for running the grep**
— add it to the standing rules.

### What the reviewer did unusually well

Its "checked and correct" list is the most valuable part of the report:
roughly twenty hard limits verified against vendor limits pages with quoted
text, several of them not named in the brief. Two details stand out because
references commonly get them wrong:

- It kept the Windows VM **hostname** cap of 15 characters distinct from the
  **resource name** cap of 64, quoting the footnote that separates them.
- It **reported against its own hunch**: it expected a Terraform module path
  to end `/azurerm`, found that 404s, confirmed the article's `/azure` was
  right, and said so explicitly.

A reviewer that documents a suspicion it disproved is worth more than one that
only lists what it found.
