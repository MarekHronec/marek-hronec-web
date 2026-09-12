# B1 · EU-level instruments — findings

Reported 2026-09-12 (opus, web-verified). Seven articles read end to end.
Index: [../CONTENT-AUDIT.md](../CONTENT-AUDIT.md)

Status key: ☐ open · ◐ part-applied · ☑ applied · ⊘ rejected on review

**Applied 2026-09-12:** P4, P5, P6(b), P7, plus all dead reference URLs
across the batch (see X2 in the index) and the AWS sovereign-cloud status in
`sovereign-cloud-products-2026-landscape`. P4, P5, P6(b), P7 — the four that are settled by the
regulation text alone and needed no judgement about current events.

**Independently re-verified in the main session before applying anything:** P1
(fetched the EBA press release — it does publish the designated CTPP list) and
P2 (Gibson Dunn confirms Annex I high-risk deferred to 2 August 2028). The rest
carry the reviewer's fetched sources; each is checked again at apply time.

---

## P1 ☑ APPLIED — WRONG — CTPPs have been designated. The article says they have not.

`dora-ctpp-regime-direct-esa-supervision.md` L74, L110–116, L214, L219

> "the ESAs have not formally designated any provider as of mid-2026"

The ESAs designated the **first 19 CTPPs on 18 November 2025** under Art. 31(9) —
eleven months *before* this article's `updated` date. It was wrong when
published, not merely stale. This is the most damaging finding in the batch: a
financial-sector reader knows this off the top of their head.

The 19: Accenture, Amazon Web Services EMEA Sarl, Bloomberg, Capgemini, Colt,
Deutsche Telekom, Equinix (EMEA), FIS, Google Cloud EMEA, IBM, InterXion HQ,
Kyndryl, LSEG Data and Risk, Microsoft Ireland Operations, NTT DATA, Oracle
Nederland, Orange, SAP, TCS.

Knock-on: the article's *speculative* "expected first wave" names Salesforce,
Workday, ServiceNow, Murex, Calypso, Fiserv, Temenos, Akamai, Cloudflare — none
designated — and misses twelve that were. The "parent vs subsidiary" open
question is now answered by fact: hyperscalers designated at EU/EMEA entity
level, IBM/Bloomberg/Kyndryl/NTT DATA/FIS at US-parent level.

Also touches `dora-for-cloud-financial-sector-overlay.md` L39, which frames
direct ESA supervision as something that *can* happen rather than has.

Source: [EBA](https://www.eba.europa.eu/publications-and-media/press-releases/european-supervisory-authorities-designate-critical-ict-third-party-providers-under-digital) ·
[EIOPA](https://www.eiopa.europa.eu/european-supervisory-authorities-designate-critical-ict-third-party-providers-under-digital-2025-11-18_en)

## P2 ☐ WRONG — AI Act high-risk dates were moved by the AI Omnibus

`eu-ai-act-and-cloud-provider-obligations.md` L9, 21, 33, 117, 118, 122, 207, 232, 268

> "2 August 2026 | Most other obligations apply, including high-risk AI provider obligations"

**Regulation (EU) 2026/1744** (Digital Omnibus on AI, OJ 24 July 2026, in force
27 July 2026) amends Art. 113: Annex III stand-alone high-risk → **2 December
2027**; Art. 6(1)/Annex I high-risk in regulated products → **2 August 2028**.

What actually took effect 2 August 2026: Art. 50 transparency duties, and full
AI Office / national enforcement over GPAI. New Art. 5 prohibition (NCII/CSAM)
from 2 December 2026, when the marking grace period also ends.

Art. 4 AI literacy was **softened** to "take measures to support the development
of" rather than ensure. The "February 2025 through August 2027" framing becomes
"through August 2028". Missing entirely: the GPAI Code of Practice and the
Commission's 2026 guidance set (risk classification 19 May, GPAI 18 July,
transparency 20 July).

Source: [Reg. (EU) 2026/1744](https://eur-lex.europa.eu/eli/reg/2026/1744/oj) ·
[Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/) ·
[Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2026/07/eu-ai-act-news-digital-omnibus-on-ai-new-guidance-on-risk-classification-gpai-and-transparency-obligations)

## P3 ◐ APPLIED (partly rejected) — WRONG — DORA incident-reporting deadlines, in three articles

`dora-for-cloud-...` L48, 85–89, 93, 149, 196 · `dora-article-30-...` L134, 301 ·
`nis2-supply-chain-...` L151

Article says 24h / 72h / one month **from resolution**, clock starting at
classification. Delegated Reg. (EU) 2025/301 says:

| | Actual |
|---|---|
| Initial | **4h** from classification as major, and ≤**24h** from becoming aware |
| Intermediate | 72h from **submission of the initial notification** |
| Final | 1 month from the **(latest) intermediate report** |

All three anchors are wrong, and awareness does matter. Creates an INTERNAL
contradiction: the NIS2 article correctly anchors its final report to the
notification, so the two tables imply a false symmetry.

Source: [Delegated Reg. (EU) 2025/301](https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng)

**Partly rejected on review.** The reviewer listed `nis2-supply-chain-...` L151
as carrying the same error. It does not — that line describes **NIS2's** own
cadence (24h early warning and 72h notification from awareness, final report one
month from the notification), which is correct. Only the two DORA statements were
wrong. Flagging a correct line as an error is the cheaper mistake of the two, but
it is why findings are checked before they are applied.

## P4 ☑ APPLIED — WRONG — "DORA entered into force on 17 January 2025"

`dora-for-cloud-financial-sector-overlay.md` L33 (also excerpt L9, ref desc L13)

Entered into force **16 January 2023** (20th day after OJ publication
27 Dec 2022); **applied** from 17 January 2025. L193 of the same file already
says "directly applicable since 17 January 2025", so this is internally
inconsistent too.

## P5 ☑ APPLIED — WRONG — exit-plan *testing* attributed to Art. 30

`dora-article-30-contracts-and-exit-strategies.md` L188–198, L303

**This is the same error that was found and fixed on `/platform`.** An earlier
shallow grep in the main session concluded this article was clean; it is not.
Art. 30(3)(f) requires the *contract* to provide exit strategies with a
mandatory adequate transition period. The duty that exit plans be
"comprehensive, documented and … sufficiently tested and reviewed periodically"
is **Art. 28(8)**, and it falls on the financial entity, not the contract.

## P6 ◐ (a) and (b) APPLIED, (c) open — WRONG — Art. 30 scope, the cost clause, and the clause list

**(a) Scope, L45.** "applies to all ICT third-party arrangements supporting
critical or important functions" — Art. 30(2) applies to *every* ICT services
contract; 30(3) adds requirements for critical-or-important ones. As written, a
reader concludes non-critical contracts are out of scope.

**(b) Cost, L124 + L301.** Article says assistance must be "at no additional
cost" and that this "prevents providers from monetising incident-cooperation".
Art. 30(2)(f) actually reads "at no additional cost, **or at a cost that is
determined ex-ante**". The article states the opposite of the text. The real
point is that cooperation cannot be priced *opportunistically after* an incident.

**(c) The fifteen clauses, L49–65.** Count is right (30(2) has (a)–(i), 30(3)
has (a)–(f)) but the list is not the statute's. "Insurance" appears nowhere in
Art. 30 — it comes from the EBA outsourcing guidelines. Missing: 30(2)(i)
participation in the entity's security-awareness and resilience training, and
30(3)(d) participation in **TLPT**. For a piece sold as clause-by-clause, align
to (a)–(i)/(a)–(f).

## P7 ☑ APPLIED — WRONG — NIS2 essential-entity threshold

`nis2-supply-chain-cloud-providers.md` L35

> "Above size thresholds (≥50 employees and ≥€10M annual turnover …) they are **essential entities**"

That is the *medium-sized* threshold, and Art. 3(2) makes those **important**
entities. Essential status under Art. 3(1)(a) needs the entity to *exceed* the
medium-size ceilings — ≥250 staff, or >€50M turnover and >€43M balance sheet.
The difference is real: €7M/1.4% and ex-post supervision versus €10M/2% and
ex-ante. Exceptions: public electronic communications providers are essential
at medium size; qualified trust service providers, TLD registries and DNS
providers are essential regardless of size.

Related, L56: Reg. 2024/2690 governs only the Art. 21(5) entity types, not
Art. 21 generally — a bank doing supply-chain assessment is not in its scope.

Source: [NIS2 Art. 3](https://www.nis-2-directive.com/NIS_2_Directive_Article_3.html)

## P8 ☑ APPLIED — WRONG — ANSSI/BSI joint statement date, replicated in five files

`eucs-watch-...` L9, 39, 109, 117, 131, 245 · `france-anssi-secnumcloud-...` L136, 169 ·
`germany-bsi-c5-...` L175 · `cloud-data-security-eu-national-frameworks-overview` L105 ·
`sovereign-cloud-products-2026-landscape` L157

Articles date it **March 2026**; BSI dates the publication **17 November 2025**.
No March 2026 joint statement was found. Fix all five together or the corpus
contradicts itself.

The article also says follow-up work is "not yet visible" — BSI published **C3A**
(Criteria enabling Cloud Computing Autonomy) on 27 April 2026, again before the
`updated` date. Neither article mentions the **EU Cloud Sovereignty Framework**,
which both agencies now build on.

Source: [BSI joint statement](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/ANSSI-BSI-joint-releases/Cloud-Sovereignty-Criteria.html) ·
[BSI C3A](https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/C3A/C3A.html)

## P9 ☑ APPLIED — STALE — the EUCS picture moved twice after the article's date

`eucs-watch-political-tracking-2026.md` L37, 105, 111, 242

Headline ("still a draft, not adopted") remains correct — but the *reason* has
changed, which rewrites the article's scenarios:

- **20 Jan 2026** — Commission tabled the revised Cybersecurity Act; states EUCS
  work "is expected to resume", with sovereignty gaps filled by the CSA revision
  plus CADA.
- **3 June 2026** — Commission proposed the **Cloud and AI Development Act**,
  carrying a four-level cloud sovereignty framework for public procurement.

So sovereignty has moved *out of* EUCS. Scenario A is now close to the
Commission's stated plan and "High+ restored inside EUCS" is the less likely
branch. ENISA's visible certification work since is EUMSS, not EUCS.

Source: [Commission Q&A](https://digital-strategy.ec.europa.eu/en/faqs/cybersecurity-package-questions-answers) ·
[CADA](https://digital-strategy.ec.europa.eu/en/policies/cloud-and-ai-development-act)

## P10 ☑ APPLIED — WRONG — AWS is not an EU Cloud CoC adherent

`gdpr-article-28-and-eu-cloud-code-of-conduct.md`

**(a) L112** lists "AWS — Level 2". The EU Cloud CoC public register does not
list AWS. AWS's Art. 40 code is **CISPE** (122 services verified by EY
CertifyPoint under CNIL accreditation). Saying so is also the better answer to a
procurement question about AWS.

**(b) L146** says transfer-module adherence "is increasing". The Third Country
Transfers Module is still **in development and out for consultation** — nobody
can adhere to it. It becomes an Art. 46 tool only after an EDPB opinion, lead-SA
approval and Commission general validity.

**(c) L33** "the only EU-wide cloud compliance instrument in widespread
production use" — CISPE is a second pan-European Art. 40 cloud code (EDPB
opinion May 2021, CNIL-adopted June 2021). "Most widely used" is defensible;
"the only" is not.

Source: [EU Cloud CoC register](https://eucoc.cloud/en/public-register) ·
[transfers module](https://eucoc.cloud/en/about/third-country-transfers-initiative) ·
[AWS CISPE](https://aws.amazon.com/compliance/cispe)

## P11 ☐ STALE — NIS2 per-country table

- **Netherlands** — Cyberbeveiligingswet **in force 15 August 2026** (Senate 7 July).
- **France / Spain** — still untransposed, but on **8 July 2026 the Commission
  referred France, Ireland, Spain and the Netherlands to the CJEU**.
- Germany and Poland rows check out (see "correct" below).
- Missing the infringement wave itself — 23 formal notices Nov 2024 → 19 reasoned
  opinions 7 May 2025 → 4 CJEU referrals 8 July 2026. For a reader planning
  multi-country contracts that is the single most useful fact on the page.

## P12 ☐ Lower severity

- `dora-article-30-...` L177–186: 90-day change-notification claim is unsourced,
  and the article never mentions **Delegated Reg. (EU) 2025/532** (subcontracting
  RTS, OJ 2 July 2025) — the biggest content gap for a clause-by-clause piece.
- `dora-ctpp-...` L98: periodic penalty payments correct at 1% daily worldwide
  turnover, but omit the Art. 35 cap — **max six months**, after 30 days' notice.
- `eu-ai-act-...` L116: AI Office was established by Commission Decision of
  24 Jan 2024, in force 21 Feb 2024, staffed from 16 June 2024 — i.e. before the
  AI Act entered into force, not because of it.
- **Unsourced universals**, a class rather than single errors: "*single* incident
  workflow", "*most* pre-DORA contracts", "*broad* adoption", "*every* national
  framework article references it". Plausible practitioner judgement, but
  unattributed in a credibility artifact.

---

## Checked and correct — do not re-check

**DORA** — Art. 30(3)(e) is the reinforced audit clause, correctly attributed ·
30(2) has nine items, 30(3) six, so "fifteen" is arithmetically right ·
Register of Information under Art. 28(3), format by Implementing Reg. (EU)
2024/2956, first annual reporting ran to 31 Mar 2026 · CTPP criticality criteria
in Delegated Reg. (EU) 2024/1502, four families correct · Arts. 31–44 as the CTPP
regime, Lead Overseer, Joint Oversight Network · applies from 17 Jan 2025 with no
transposition · TLPT at least every three years, TIBER-EU as reference.

**NIS2** — Art. 21(2)(d) quoted verbatim and correctly · reporting cadence (24h
early warning / 72h notification / 1 month final from notification) correct ·
sanctions €10M or 2% correct · Germany in force 6 Dec 2025 (~29,500 entities) ·
Poland KSC in force early Apr 2026 with Constitutional Tribunal referral ·
Slovakia vyhláška NBÚ 227/2025 Z. z. effective 1 Sep 2025.

**AI Act** — 10^25 FLOP systemic-risk threshold unchanged by the omnibus · GPAI
obligations since 2 Aug 2025 · fines €35M/7%, €15M/3%, €7.5M/1% · four risk tiers
and prohibited-practice examples · FRIA and EU-database registration survived.

**GDPR / EU Cloud CoC** — Art. 40 code approved by the Belgian DPA 20 May 2021 on
EDPB Opinion 16/2021 · SCOPE Europe as monitoring body · three adherence levels
as described · co-published in CSA STAR since January 2024 · Art. 28 content
summary correct.

**EUCS** — still a draft, not adopted, not applicable · Basic/Substantial/High
with High+ sovereignty in the Nov 2023 draft, removed in Mar 2024 · CSA review
consultation opened 11 Apr 2025.

## Not verified — flagged, not asserted

"~22,000 financial entities" · the Microsoft CoC verification ID · which ESA is
Lead Overseer for each CTPP (the ESAs' PDF would not extract) · the Czechia,
Italy and Finland rows of the NIS2 table · adoption status of Slovakia's
AI-governance law (slov-lex would settle it) · Slovak KsVC U1–U4 mapping to EUCS
tiers.

## Spillover into other batches

The reviewer grepped beyond its seven files. The **ANSSI/BSI date is wrong in
four more articles** (P8). The DORA incident-timeline error (P3) and the CTPP
error (P1) may propagate into the remaining 22 compliance articles — B2/B3/B5
should grep for both before starting.
