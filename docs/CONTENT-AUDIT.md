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
   checklist still stated the error the body explicitly refutes. Found again in X1,
   in an unrelated article — so this is now **also** protocol item 5 below, and
   belongs in every review brief rather than only in the hands of whoever applies
   the fix.
6. **A reviewer saying it checked propagation is not a substitute for running the
   grep.** B6a’s reviewer stated positively that no further propagation existed;
   grepping the retired product name found two more articles using it as current.
   Ask reviewers to *show the searches they ran, including the empty ones* — B6b
   did, and its claim was checkable.
7. **A citation that resolves has not been checked.** B6b found a live, current,
   topically adjacent Microsoft page cited for a claim it does not contain — zero
   occurrences of the term across 61,586 characters. Grep the fetched page.
   B6c then found four more this way, all in reference descriptions rather than
   article prose. Ask for a table: URL, resolves, supports the claim, what was
   grepped, hit count.
9. **When a reviewer’s count cannot be reproduced, check your extraction before
   doubting the count.** The strip-tags helper deletes `<script>` blocks, so any
   page rendering data from embedded JSON reads as empty. B6c’s 428 hits were real
   and my zero was the artefact.
8. **Where a claim can be checked by computation, write the check down and keep
   it.** `scripts/check-cidr-alignment.py` came out of B6b and found an error the
   reviewer missed. Mechanical invariants do not decay; fetched sources do.
   B7a added `scripts/check-code-fences.py` the same way. **When a reviewer finds
   one instance of a rule violation, sweep the corpus for the rule.** Six reported
   unlabeled fences turned into nineteen.
10. **A correct finding does not make the proposed fix correct.** B7a's reviewer was
    right that a figure was incomplete and wrong about its replacement, and right
    that a quota family was inconsistent while wrong about what the vendor page says.
    Verify the replacement against a source, not just the defect.
11. **When a batch reports nothing wrong, verify what it passed, not what it found.**
    B7b returned 0 WRONG. Re-deriving a sample of the claims it cleared is the only
    way to tell a clean corpus from a lax review.
12. **Ask what happens if the reader follows the advice and it is wrong.** B7c found a
    Prometheus metric that does not exist. A malformed CIDR fails loudly at apply time;
    a phantom metric fails *silently* — the alert never fires and looks like health.
    Weight silent-failure defects above loud ones in operational articles.
13. **Do not prime a reviewer for a pattern.** B7c’s brief mentioned a defect type from
    earlier batches; the reviewer correctly reported it could not reproduce it here.
    Describe the *method*, not the expected finding.
14. **Watch for a correct fact over-generalised.** B7d found a certification renewal
    cadence that is right for two vendors and wrong for the third — the one the article
    leads with. Wherever an article gives one rule for several vendors, check each.
15. **Verify the premise of a batch before dispatching it.** B8’s six articles were
    queued as unsourced; they carried fifteen inline citations and were the best-cited
    in the corpus. The tracker’s own framing was the error.
16. **Do not leave working notes in an article.** B8 found "the earlier suggestion …
    was incorrect" in shipped prose, referring to something no version of the corpus
    ever said. Sweep for editorial residue in X1. `git show
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
5. **Read every article's own checklist, excerpt and frontmatter against its
   body.** An article that debunks a claim in its prose and restates it in its
   closing checklist is wrong for a reader who skims — which is most readers of
   a checklist. This has now been found twice, in unrelated articles: B5b caught a
   body corrected in B1 whose checklist kept the error, and X1 caught an article
   that refutes the "24 / 72 / one month" DORA clock at three separate points and
   then states it in its own summary. Twice makes it a pattern, and the pattern is
   structural: a fix lands where the reviewer was reading, and summaries are written
   once and never re-read.

   **This is a reviewing instruction, not just a fixing one.** It was previously
   filed under bulk-edit discipline (rule 5 above), which only helps someone already
   applying a correction — it never told a reviewer to go looking. Compare the
   body against the summary for every article in the batch, as a first-class check,
   and report a body/summary disagreement as `INTERNAL` even when the body is right.
6. Slovak and other national sources may need native-language search terms.

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
| **Content-audited and corrected** (read end to end, claims checked against fetched sources, findings applied) | **57 — all of them** |
| Citation repointed only, content never examined | 8 |
| Touched by a single verified correction, rest of the article unexamined | 2 (`rbac-and-iam-authorisation-models-that-look-similar`, `sandboxes-environments-you-will-probably-set-up-wrong`) |
| Inventoried and link-checked only | all 57 |
| **Never opened** | **0** |

So: **every article has now been audited.** What remains is cross-cutting: X1 and X3. B2–B8 is not a formality; it is
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
| B6b | Networking and addressing | 4 | sonnet | **applied** | [12 findings](audit/B6b-networking.md) | 10 + 1 found by sweep |
| B6c | Regions and service availability | 2 | sonnet | **applied** | [5 findings](audit/B6c-regions-availability.md) | 4 + 2 carried-over closed |
| B7a | Governance and access control | 3 | sonnet | **applied** | [14 findings](audit/B7a-governance-access.md) | 9 + 13 fences swept |
| B7b | Service models and ownership | 3 | sonnet | **applied** | [3 findings](audit/B7b-service-models.md) | 3 + 1 open |
| B7c | DevOps toolchain | 3 | sonnet | **applied** | [6 findings](audit/B7c-devops-toolchain.md) | 4 applied |
| B7d | Operating model and learning | 3 | sonnet | **applied** | [8 findings](audit/B7d-operating-model.md) | 6 applied |
| B8 | Short-form and FinOps | 6 | sonnet | **applied** | [1 finding](audit/B8-short-form.md) | 1 + 6 refs blocks, 3 dates |
| X1 | Cross-cutting consistency | all | opus | **applied** | [11 findings](audit/X1-cross-cutting.md) | 11 + 265 URLs swept |
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

### B7a — Governance and access control (sonnet)
`security/policy-as-code-and-quotas-where-governance-stops-being-wiki` ·
`identity/rbac-and-iam-authorisation-models-that-look-similar` ·
`multicloud/sandboxes-environments-you-will-probably-set-up-wrong`

8,251 words, and the code-heaviest group in the corpus: 8 and 14 fenced blocks
in the first two. Policy and IAM syntax is checkable the way CIDR arithmetic
was — it either parses against the vendor's grammar or it does not.

### B7b — Service models and ownership (sonnet)
`multicloud/iaas-paas-saas-without-marketing-layer` ·
`multicloud/shared-responsibility-for-people-who-stopped-believing-marketing` ·
`multicloud/tagging-metadata-earn-their-keep`

7,552 words. Conceptual, so the risk is service-model boundaries that have
moved and tag/label limits that have changed.

### B7c — DevOps toolchain (sonnet)
`devops/gitops-with-argocd` · `devops/source-of-truth-where-does-your-cloud-actually-live` ·
`devops/status-pages-service-health-things-they-wont-show`

5,234 words. `gitops-with-argocd` is **the oldest article in the corpus**
(2024-11-15) and carries Kubernetes API versions in its examples, which either
still exist or do not.

### B7d — Operating model and learning (sonnet)
`multicloud/documentation-ccoe-why-both-decay-faster-than-you-think` ·
`multicloud/how-to-learn-azure-and-oci-without-stale-lists` ·
`bpm/introduction-to-bpm-solutions`

6,654 words. The learning article names certifications and learning paths,
which rename and retire often; the BPM article is the only one of its kind in
the corpus.

**Why B7 was split four ways.** Twelve articles and 27,691 words, half again
the size of B6 before its own split, and more than twice the 3–5 article cap.
The four groups divide by subject so a fact checked once serves its whole group.

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

## Session 11 — B6b applied (2026-09-13)

**Networking and addressing.** Four articles, 12 findings, 10 applied.
Detail in [B6b](audit/B6b-networking.md).

### Numbers a reader copies

Four CIDR prefixes did not sit on their own prefix boundary. `10.150.0.0/14`
normalises to `10.148.0.0/14`, so the block spans 148–151, not the 150–153
the article states. `10.100.0.0/12` normalises to `10.96.0.0/12`, sixteen /16s
instead of four — and it sits inside a Terraform resource formatted for
copy-paste.

This is a different severity class from a stale date. A reader does not
paraphrase an address plan; they type it in. Verified every replacement for
alignment, containment and overlap before writing it.

### The first mechanical invariant

Extracting **every** CIDR literal in the corpus and testing each found a fifth
error, in prose, that the reviewer's computation had not covered — its script
checked the worked plan and the sizing table only.

That sweep is now `scripts/check-cidr-alignment.py`. It scans the knowledge
base and exits non-zero on any misaligned literal. All 51 currently pass.
**Run it before any networking edit.** Where a claim can be checked by
computation rather than by fetching, write the check down and keep it — it
costs nothing to re-run and it does not decay the way a fetched source does.

### Checking a citation resolves is not checking it supports the claim

The hybrid-connectivity article cited Microsoft's ExpressRoute FAQ for a
MACsec claim. That page is live, current and topically adjacent — and
contains **zero** occurrences of "MACsec" or "encrypt" across 61,586
characters. Every citation check in this audit until now tested whether a URL
resolves. This one failed only because the page was fetched and grepped for
the term it was cited for.

Add to the standing rules: **a citation that resolves has not been checked.
Grep the fetched page for the claim.**

### The propagation instruction worked

Asked to show its greps rather than assert completeness — an instruction
written directly out of B6a's failure — the reviewer listed eleven searches
**including those that returned nothing**. That is what made the claim
checkable, and it held up. Keep that wording in future briefs.

## Session 12 — B6c applied, B6 complete (2026-09-13)

**Regions and service availability.** Two articles, 5 findings, 4 applied, plus
both carried-over Oracle questions closed. Detail in
[B6c](audit/B6c-regions-availability.md).

### Every finding was in a citation

Both article bodies came through clean — every mechanism claim confirmed,
several verbatim. The paired-region framing is not merely correct but ahead of
the vendor: Microsoft's current guidance now says "Newer Azure regions aren't
paired" and recommends zone redundancy as the default, which is where the
article already pointed.

All four findings were in reference descriptions and URLs. That is a first,
and it happened only because the brief made citation-checking the deliverable
rather than a side check. Of twelve URLs fetched and grepped:

- Azure's "canonical table" of services by region: **zero** region names in the
  landing page. The `/table` URL below it has 428.
- OCI's "authoritative table": the cited `#Services` anchor does not exist, and
  the section is one paragraph pointing off-domain. The real matrix is two hops
  away.
- "Home region semantics": zero occurrences of "home region" on the cited page.
- "Three zones per region": the page states no zone count at all, and the
  article body never claimed one — the number lived only in the description.

### A method note worth more than the findings

The reviewer reported 428 hits where my own check returned zero, which looked
like a fabricated number. **It was my extraction.** The matrix is delivered as
script-embedded data, and the HTML-stripping helper used throughout this audit
deletes `<script>` blocks before matching. The raw file reproduces 428 exactly.

**When a reviewer's count cannot be reproduced, check the extraction before
doubting the count.** The stripped-text helper is right for prose and wrong for
anything rendered from embedded data. The 20-fold size difference between the
two pages was the tell.

### Carried-over questions: one correction, one confirmation

Folding B6b's two unresolved Oracle questions into this small batch worked, and
is worth repeating. Oracle publishes no recommended prefix for load balancer
subnets — zero occurrences of "/24" on the page — so that claim was corrected.
And service limits give five DRGs per region with no asterisk, which confirmed
the hub-and-spoke article was right; it now names the figure.

**A small batch with spare budget is the right place to close open items**
rather than letting them accumulate to the end.

### B6 complete

Ten articles across three passes: 28 findings, 23 applied, 3 spillovers, one
mechanical invariant added to the repo.

## Session 13 — B7a applied (2026-09-14)

**Governance and access control.** Three articles, 14 findings, 9 applied.
Detail in [B7a](audit/B7a-governance-access.md).

### Code that would not apply

Fifteen fenced blocks checked, twelve clean. The important defect:
`oci_identity_tag_default` omitted `value`, which the provider documents as
"(Required) (Updatable)". Neither copy would pass `terraform plan`, and the
snippet had been reused in a second article **without** even the hedging
comment the first one carried. Grepping the resource name rather than the
article is what found the second copy.

### Where the reviewer's reasoning was wrong

It reported that Oracle's syntax page uses `compute-core` throughout and
"never bare `compute`". Oracle's own worked example on that page reads
`set compute quota standard-e4-core-count …`. **Oracle's documentation
contradicts itself**, and neither of the two reference pages that could
arbitrate is usable — one 404s, the other is a 13 KB stub with no quota names
in it at all.

The edit still stands, because the corpus had two files using each form and a
grammar definition outranks an example. But the finding is "the corpus
disagreed with itself and the vendor is no help", not "the article was wrong".

It also got the Always Free finding right and the replacement figure wrong:
blocked by a 403, it proposed a core count from search synthesis, where
Oracle's own docs give 1,500 OCPU hours and 9,000 GB hours a month.

**Both are the same lesson: a correct finding does not make the proposed fix
correct. Verify the replacement, not just the defect.**

### The reviewer corrected my brief

I told it the articles carried 26 code blocks. It opened by pointing out that
8 and 14 count fence *delimiters* while 4 counts *blocks*, so the numbers were
not computed the same way, and the real total is 15. It was right —
`grep -c '^```'` counts opening and closing fences separately.

Second batch running where a reviewer has argued with the brief and won. Worth
keeping the instruction that invites it.

### Third mechanical invariant

The reviewer cited `.claude/rules/content-files.md` — "Code blocks must specify
language" — for six unlabeled fences. Sweeping the corpus found **thirteen
more** in nine articles it was not auditing. All nineteen are now tagged, and
`scripts/check-code-fences.py` enforces the rule.

**When a reviewer finds one instance of a rule violation, check the rule across
the corpus, then write the check down.** Two of these scripts now exist.

### Deliberately not resolved

Two articles use different names for the same object-storage quota. I could not
settle which is right — the reference page is a stub — so both stay. Picking
one to tidy away a contradiction without evidence is the failure this audit
exists to prevent.

## Session 14 — B7b applied (2026-09-14)

**Service models and ownership.** Three articles, 3 findings applied, 1 left
open. Detail in [B7b](audit/B7b-service-models.md).

### The first clean batch, and how I tested that

**0 WRONG, 0 STALE, 0 INTERNAL.** A nil result is the one that most needs
checking, because it looks identical whether the articles are sound or the
reviewer was lax. So I re-derived a sample of what it *passed* rather than only
its findings: all four hard tagging limits, quoted from vendor pages I fetched
myself. Every one correct, including the tag-key case-sensitivity claim, which
is the kind of detail that is usually backwards.

**When a batch reports nothing wrong, verify what it passed, not what it
found.**

### Fourth batch running where the only defects are citations

One reference was cited for a claim the article never makes — two occurrences
in frontmatter, zero in the body. The other described its page as underpinning
a cross-cloud approach; that page has zero occurrences of cross-cloud,
multicloud or multi-cloud, in stripped text and raw HTML alike.

Citation hygiene is now clearly the corpus's weakest dimension. X1 should
sweep every reference description in all 57 articles against its page, not just
check that the URLs resolve.

### One addition worth more than the fixes

The SLA section explained credit size but never said credits must be
**claimed**. Oracle: service credits are "the exclusive remedy" and "we require
customers to file for the SLA claim". A reader who assumes credits arrive
automatically never claims one.

The reviewer also offered a 60-day window. Not on the page I fetched, so not
published — the same rule that B7a established.

### Still open

OCI's 10-per-tenancy cost-tracking tag limit. Seven URLs between us: the
dedicated topic 404s and four others resolve with zero cost-tracking content.
Oracle has reorganised those pages. The claim is probably right and stated
consistently, so it stands. Settled by `oci limits value list --service-name
tagging` against a live tenancy.

## Session 15 — B7c applied (2026-09-14)

**DevOps toolchain.** Three articles, 6 findings, 4 applied. Detail in
[B7c](audit/B7c-devops-toolchain.md). Every defect was in the oldest article
in the corpus; the two newer ones came through clean.

### A new severity class: the defect that fails silently

The article told readers to alert on `argocd_app_sync_status`. **That metric
does not exist** — zero occurrences in Argo CD's metrics reference. Sync state
is a *label* on the `argocd_app_info` gauge.

This is worse than an ordinary error and deserves its own name. A malformed
CIDR (B6b) fails loudly at apply time. A wrong metric name **fails silently**:
the alert returns no series, never fires, and the absence of alerts is
indistinguishable from health. The article's own closing line — "drift that is
not surfaced is drift that accumulates" — describes exactly what its
instruction would cause.

**When auditing operational advice, ask what happens if the reader follows it
and it is wrong.** Loud failures are self-correcting; silent ones are not.

### The claim in the same sentence

"Surfaces drift in real time." Argo CD polls every three minutes by default
(120s + up to 60s jitter). The sentence continued into SLA threshold advice,
so the error propagated directly into how a reader would size alerts.

### Citations again

Third defect was a reference promising "progressive delivery with Argo
Rollouts" from a page whose only use of the word concerns sync hooks — Argo
Rollouts being a separate project entirely. That left a real gap, since the
article teaches canary steps with nothing backing them; the Rollouts project's
own docs are now cited.

The same description advertised RBAC and SSO coverage. Those two words appear
in the **entire corpus** only inside that one description and in no article
body — a reference selling content nobody uses.

### What the reviewer did well

It went looking for a defect in the ApplicationSet manifest, found the article
was right, and said so: the official example uses `goTemplate: true` with
dotted syntax, the article uses the undotted legacy form, and that is correct
because `goTemplate` defaults to false and the article never mixes the two.

It also **refused to reproduce a pattern I had primed it for.** My brief
mentioned that recent batches found references supporting no claim at all; it
reported plainly that it could not reproduce that here. A reviewer that
declines to find what you suggested is worth more than one that obliges.

## Session 16 — B7d applied, B7 complete (2026-09-14)

**Operating model and learning.** Three articles, 8 findings, 6 applied. Detail
in [B7d](audit/B7d-operating-model.md). **All long-form content batches are now
done** — only the six short-form articles and the two cross-cutting passes
remain.

### The primary target was correct

The BPM article's three dated Camunda lifecycle claims all verified against
Camunda's own pages, tense included. The reviewer noted that the October 2025
cutoff has since passed and the article was written after it, so **time made
the wording more accurate, not less** — the opposite of the usual direction.

### A rule true of some vendors, stated as true of all

"Refresh roughly every two years" is right for Oracle and the CNCF Kubernetes
certifications and **wrong for Microsoft**, which is annual with a six-month
renewal window — and Microsoft Learn is the baseline the article leads with.
Fundamentals-level certifications do not expire at all.

That is a distinct error shape worth naming: not a stale fact, but a correct
fact over-generalised. Worth watching for wherever an article gives one rule
for multiple vendors.

### Consolidated, not dead

Kogito's runtimes repository is archived and the code moved into the Apache KIE
monorepo seven weeks before the audit. The reviewer was careful not to call the
technology dead — it is consolidated — and the article now says that, and
points readers at Apache KIE's activity rather than Kogito's own site, whose
getting-started guide still asks for JDK 11.

### Sixth consecutive batch with reference defects

Two more references that support no claim in their articles: Flowable in an
engine-comparison article that never compares it, and Diátaxis in an article
that builds its own taxonomy and never maps to it. Both found by grepping each
article's body for its own referenced term.

**X1 must sweep every reference description against its page and against its
own article body.** Six batches is no longer a pattern, it is the corpus's
defining weakness.

### The reviewer found no error in my brief

First time in five batches — and it said so explicitly, listing what it had
checked. Reporting that the instructions were right is as useful as reporting
they were wrong, because it shows the check happened.

It also declined the bait a second time: told not to treat prior batches'
reference defects as expected, it found two anyway and stated they were
"independently observed via grep — not manufactured to match the brief's hint".

## Session 17 — B8 applied. **All 57 articles audited** (2026-09-14)

**Short-form FinOps and recovery.** Six articles, 1 defect, plus the corpus
standard finally met everywhere. Detail in [B8](audit/B8-short-form.md).

### The weakest cohort had the cleanest citations

These six were queued as the corpus's weak point because none had a frontmatter
`references:` block. Checking before dispatch showed that framing was wrong:
**they carry fifteen citations inline in the prose.** Sourced all along, just
structured differently.

All fifteen resolve and support the sentence they sit in. After six consecutive
batches where citations were the only defect, the articles flagged as unsourced
turned out to be the best-cited in the corpus. **Verify the premise of a batch
before dispatching it** — the tracker's own framing was the error here.

### Second nil result, tested the same way

Re-derived what the reviewer passed rather than what it found. The three
savings-plan mechanics matter most, because the article's break-even table is
built on them and a wrong one would mislead a purchase: "unused commitment for
an hour expires and does not roll over" and "savings plan purchases can't be
canceled or refunded", both verbatim. Support severities and Oracle's forecast
alerts likewise.

### A new defect type: editorial residue

The budgets article said "The earlier suggestion that OCI has no native
forecast budget alerts was incorrect." The fact is right; the sentence is not
publishable, because "the earlier suggestion" means nothing to a reader. The
reviewer checked `git log -p --follow` and confirmed **no version of any file
in this corpus ever made that claim** — so it is not correcting anything the
reader could have seen. It reads as a fact-check note left in shipped prose.

**An audit that leaves its own working notes in an article is worse than one
that changes nothing.** X1 should sweep for editorial residue: phrases
addressed to an editor rather than a reader.

### The corpus standard is now met everywhere

- **57 of 57** articles have a `references:` block.
- **57 of 57** have an `updated:` date; three had none at all.
- Both mechanical checks pass: every CIDR literal aligned, every code fence
  tagged.

### Reviewer notes

Second running to check the brief and report no error, listing what it had
verified — including a fact I handed it as established context, which it
confirmed rather than accepted.

It also diagnosed its own false alarm: four pages returned zero bytes, looking
exactly like the JSON-rendering trap, but the cause was a console encoding
error on a non-breaking space. It re-ran with encoding forced and **reported
the false alarm instead of filing four spurious findings.**

## Session 18 — X1 applied (2026-09-14)

**Cross-cutting consistency.** Six contradictions, one shipped-widget defect,
four minor items. Detail in [X1](audit/X1-cross-cutting.md).

### Extract the recurring facts mechanically, then reason over the list

The pass only became tractable because the seed list was built by script:
every date, legal instrument and version string appearing in **more than one
article**, ranked by how many restate it. That turns "read 57 articles and
compare everything" into about ninety ranked items.

**A fact restated in a second place is where contradictions live.** One fell
out of the extraction before any agent ran — three places citing a standard
edition that does not exist.

### The body-versus-checklist failure is now a pattern, not an incident

The DORA reporting clock: the owning article debunks the "24 / 72 / one month
from classification" formulation at three separate points, and then states it
in its own closing checklist. B5b found exactly this shape in a different
article. Twice is a pattern.

Settled against Delegated Regulation (EU) 2025/301 itself: four hours from
classification, 24 hours only as an awareness backstop, 72 hours **from the
initial notification**, one month **after the intermediate report**. The
popular version is wrong on all three stages, and it had spread to five places
across three articles.

**Standing rule 5 already says to check an article's own checklist when
correcting it. It needs to be applied at review time, not just at fix time.**

### A tool presenting its coverage as the law's scope

The compliance calculator said "Of the 17 measures under §20 of Act 69/2018".
It models 16 of the 18 areas in ods. 2, plus one requirement from ods. 4. The
data file's own provenance comment already recorded the two gaps. Same class as
a citation overselling its page — but in a live tool where a reader counts
controls off the number.

### The mechanical half is now three scripts

`check-cidr-alignment.py`, `check-code-fences.py` and `check-internal-links.py`
all pass. Between them they cover every address literal, every fenced block and
all 377 internal links. **These are the part of this audit that does not decay.**

Reference liveness was also swept exhaustively: 265 distinct URLs, exactly one
dead, now repointed.

---

## Session 19 — X1 follow-up and a rule promotion (2026-09-14)

### The follow-up found nothing where it was looking, and four things where it was not

X1 left one item open: the overlap between the address-plan, address-management
and topology articles. Done directly rather than by an agent — four articles,
~7,100 words, and the shared claims are nearly all numeric, so checking them
against vendor documentation is faster than writing a brief.

**The overlap is clean.** Every restated number agrees across the two addressing
articles and every subtraction of Azure's five reserved addresses checks out;
the worked /16 carve-up has no overlaps and every block is boundary-aligned;
OCI's three reserved addresses and its /16–/30 VCN range match Oracle verbatim.

The four defects were all in claims that appear **once**. That is the argument
against treating cross-article comparison as the whole audit: a fact restated
twice is where contradictions live, but a fact stated once is where an
uncorrected error lives undisturbed.

1. **A hard requirement published as a recommendation.** "Microsoft recommends
   /27 minimum … /29 is the absolute minimum" — Microsoft's actual text is
   "all other SKUs require a gateway subnet of size /27 or larger", with /29
   reserved to the Basic SKU. A reader following the article into a /29 with any
   modern SKU gets a deployment failure, not a tight fit.
2. **A sizing figure counting half the consumers.** 30 nodes at 30 pods was
   given as 900 IPs. Microsoft's formula counts node IPs and the upgrade surge
   node too: (31) + (31 × 30) = 961.
3. **Two defects in one Terraform block.** The `azurerm_network_manager_ipam_pool`
   snippet omits `location`, which the provider marks Required — it cannot apply
   as printed. And `cidrcontains()` was presented beside the genuine
   `cidrsubnet()`; it is not a Terraform built-in at all, only a third-party
   provider-defined function.
4. **A citation that had become a page of links.** The OCI reference promised
   four specific things; the URL 301-redirects to 1,178 characters of navigation
   carrying none of them.

**Finding 4 is the one worth generalising.** X1 checked all 265 reference URLs
for liveness and this one passed — a 301 to a real page is not a dead link.
*Live* and *still carries what the citation claims* are different tests, and only
the first is mechanisable. `check-internal-links.py` cannot catch this class; a
human reading the description against the page can.

### The rule the user asked to promote

Standing rule 5 — check an article's own checklist and excerpt when you correct
its body — was filed under bulk-edit discipline. That only ever helps someone
already applying a fix; it never told a reviewer to go looking.

It is now **also protocol item 5**, in the list every review brief is built from,
with the instruction to report a body/summary disagreement as `INTERNAL` even
where the body is right. The evidence for promoting it is that it has appeared
twice in unrelated articles (B5b, X1), and the mechanism is structural rather
than accidental: corrections land where the reviewer was reading, and summaries
are written once and never re-read.

The rule was applied immediately — the running X3 reviewer was sent the check
mid-flight, since its brief predated the promotion.

### State

Six edits across two articles. All three mechanical invariants re-run clean:
**378** internal links, **51** CIDR literals, **57** fenced blocks. Site builds,
57 pages indexed.
