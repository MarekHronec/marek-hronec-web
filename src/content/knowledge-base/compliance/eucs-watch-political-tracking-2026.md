---
title: "EUCS Watch — Political Tracking of the European Cybersecurity Certification Scheme for Cloud Services"
category: compliance
tags: ["EUCS", "ENISA", "Sovereignty", "EU Policy", "Compliance", "Data Security", "Tracking"]
date: 2026-05-14
updated: 2026-05-14
readTime: 11
level: intermediate
excerpt: "EUCS has been the most-anticipated and least-delivered EU cloud regulation for half a decade. This article tracks what state EUCS is in as of mid-2026, who's blocking what, what the ANSSI/BSI March 2026 joint statement means, and what realistic adoption scenarios look like. A dated reference article — designed to be re-read against current events."
references:
  - title: "ENISA — EUCS Programme"
    url: "https://www.enisa.europa.eu/publications/eucs-cloud-service-scheme"
    description: "ENISA's primary documentation on EUCS — the draft scheme, the consultation history, and the published technical content."
    domain: "enisa.europa.eu"
  - title: "Cybersecurity Act — Regulation (EU) 2019/881"
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019R0881"
    description: "The regulation establishing ENISA's permanent mandate and the European cybersecurity certification framework — the legal basis for EUCS."
    domain: "eur-lex.europa.eu"
  - title: "Hogan Lovells — EUCS Sovereignty Debate"
    url: "https://www.hoganlovells.com/en/publications/eucs-controversial-data-sovereignty-issues-continue-to-drive-debate-around-the-eu-certification-scheme-for-cloud-services"
    description: "Legal analysis of the EUCS sovereignty controversy, the High+ assurance level, and the political positions of major Member States."
    domain: "hoganlovells.com"
  - title: "ITIF — EU Cloud Service Restrictions Analysis"
    url: "https://itif.org/publications/2025/05/25/eu-cloud-service-restrictions/"
    description: "Information Technology and Innovation Foundation's analysis of EUCS sovereignty implications for cross-border cloud services."
    domain: "itif.org"
  - title: "CEP — EU Cloud Certification at an Impasse"
    url: "https://www.cep.eu/fileadmin/user_upload/cep.eu/cepItalia/cepInput_EU_Cloud_Certification_at_an_Impasse.pdf"
    description: "CEP Italia's policy analysis on the EUCS impasse, written from a perspective concerned about industrial-policy effects."
    domain: "cep.eu"
  - title: "Skadden — EUCS Draft Analysis"
    url: "https://www.skadden.com/insights/publications/2023/11/latest-draft-of-the-european-cybersecurity-certification-scheme"
    description: "Skadden's legal analysis of the November 2023 EUCS draft, including the High+ sovereignty layer that was subsequently removed."
    domain: "skadden.com"
---

**Status snapshot (mid-2026): EUCS remains a draft. Not adopted. Not applicable. Politically deadlocked since 2024.**

The European Cybersecurity Certification Scheme for Cloud Services (EUCS) is the most-anticipated and least-delivered EU cloud regulation of the past five years. It is referenced across every national framework article in this series as the framework that *should* eventually harmonise the fragmented EU national landscape; in practice, it has been politically stuck since 2024, primarily over sovereignty content. This article is the watch piece — what state EUCS is in, who's pushing and blocking, what recent signals (notably the **ANSSI/BSI March 2026 joint statement**) mean, and what realistic adoption scenarios look like. The article is dated by design; check the `updated` date and recent regulatory news before relying on it.

## What EUCS is and what it is meant to do

EUCS is a candidate cybersecurity certification scheme developed under the **EU Cybersecurity Act — Regulation (EU) 2019/881**. The Act gives ENISA the role of developing candidate schemes; the European Commission adopts schemes through implementing acts after consultation and approval by the **European Cybersecurity Certification Group (ECCG)** of Member State representatives.

The purpose:
- Establish a single EU-wide certification framework for cloud services.
- Replace or absorb the patchwork of national schemes (KsVC, BSI C5, SecNumCloud, ENS, ACN, BIO2, PiTuKri) over time.
- Enable mutual recognition of certifications across Member States.
- Provide a recognised assurance signal for cloud-service consumers across the EU.

The scheme is intended to be **voluntary** by default, with the possibility of Member States making it mandatory for specific contexts (public sector, NIS2 essential entities, etc.) through national legislation.

## The three assurance levels

The draft EUCS scheme defines three assurance levels:

| Level | Intent | Reference national framework |
|---|---|---|
| **Basic** | Baseline cloud security | Light touch; ISO 27001 alignment |
| **Substantial** | Robust cloud security | [BSI C5](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation) as the reference model |
| **High** | Strong cloud security | Stronger than BSI C5; includes additional controls and audit rigor |

A fourth level — **High+** — was in the November 2023 draft. The High+ level included **sovereignty requirements**: EU-resident operator, capped non-EU ownership, immunity from extraterritorial law. These requirements modelled on the [French SecNumCloud](/knowledge-base/compliance/france-anssi-secnumcloud-qualification) framework.

In the **March 2024 draft**, the High+ sovereignty requirements were **removed or significantly weakened**. The change is the core of the political dispute that has stalled EUCS since.

## Why EUCS is stuck — the sovereignty divide

The EUCS impasse is fundamentally about whether EU cloud certification should include ownership-and-jurisdiction sovereignty requirements at its top tier. Member States divide:

**Pro-sovereignty (broadly favouring High+ or its equivalent)**:
- **France** — strongest advocate. SecNumCloud is the national model; "Cloud au centre" doctrine is national policy.
- **Italy** — supports sovereignty for highest-criticality workloads; Polo Strategico Nazionale is the national implementation.
- **Germany** — supports operational sovereignty and jurisdictional transparency, but more measured than France on ownership-based exclusion.
- **Spain** — supports sovereignty for ENS Alta-equivalent tier.

**Sceptical of strict sovereignty (broadly opposing High+)**:
- **Netherlands** — opposes strict sovereignty; concerns about exclusion of hyperscaler services its public sector consumes.
- **Ireland** — major hyperscaler regions; opposes restrictions that would affect Irish-region operations.
- **Sweden** — pro-procurement-flexibility; sceptical of EU-level mandates.
- **Finland** — flexible posture; opposes strict ownership rules.
- **Denmark** — light cloud regime nationally; sceptical of EU strictness.

**The middle**:
- **Belgium** — proposed a compromise in 2023 distinguishing "functional" requirements (technical) from "sovereignty" requirements, with sovereignty as a separate attestation module.
- **Poland** — pragmatic posture; opposed strict EUCS sovereignty during its 2025 Council presidency.
- Smaller Member States generally pragmatic.

The voting math in ECCG and the Council favours the sceptical block over the pro-sovereignty block. France has been able to slow the process but not impose its preferred outcome; the sceptical block has been able to remove High+ from drafts but not get a final adoption with sovereignty diluted.

## The history through to mid-2026

**2019**: Cybersecurity Act adopted; EUCS development begins under ENISA.

**December 2020**: First public EUCS draft.

**2021-2022**: Multiple draft iterations; growing recognition that sovereignty content is the central disagreement.

**November 2023**: Draft with High+ assurance level including sovereignty requirements (EU-resident operator, ownership caps, immunity from extraterritorial law). Modelled on SecNumCloud.

**March 2024**: Draft with High+ sovereignty content **removed or significantly weakened**. France and other pro-sovereignty Member States object publicly. ECCG vote planned for April 2024 is postponed.

**H1 2025**: **Polish Council presidency** attempts to move EUCS to adoption. Effort does not produce a vote-ready scheme. Poland's pragmatic position favours compromise but cannot bridge the divide.

**April 2025**: European Commission opens a **review of the Cybersecurity Act** itself, including consideration of how EUCS development should be governed. No conclusion as of mid-2026.

**Mid-2025 through 2025**: Continued draft iterations and consultation. No formal adoption proposal advances to ECCG vote.

**March 2026**: **ANSSI and BSI publish a joint statement on harmonised cloud-sovereignty criteria.** The statement is the first public bilateral step toward narrowing the France-Germany divergence on sovereignty content. It is **not** a binding agreement on EUCS High+ content, but it is the strongest positive signal in two years that the central pro-sovereignty positions may be converging.

**Mid-2026 (current)**: EUCS remains in draft. No formal adoption is imminent. The CSA review and ANSSI/BSI statement are watch items.

## What the ANSSI/BSI March 2026 joint statement actually says

The joint statement (referenced in the [France](/knowledge-base/compliance/france-anssi-secnumcloud-qualification) and [Germany](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation) articles) is a public statement of direction rather than a substantive policy agreement. It addresses:

- Shared recognition that cloud sovereignty has multiple dimensions (data location, jurisdictional immunity, operational control, ownership structure).
- Acknowledgement that different sovereignty dimensions may warrant different regulatory responses.
- Intent to work toward harmonised criteria for cloud-sovereignty assessment.

**What it does not yet do**:
- Specify which sovereignty criteria France and Germany agree on.
- Commit to specific EUCS scheme content.
- Resolve the dispute with Member States in the sceptical block.
- Provide a timeline for EUCS adoption.

The statement matters because it changes the political possibility space. For two years, the France-Germany positions on cloud sovereignty have been read as opposed (France: exclusion-based; Germany: transparency-based). The joint statement signals that operational common ground exists. Whether the common ground produces an adopted EUCS scheme depends on subsequent work that is not yet visible.

## Realistic adoption scenarios

Three scenarios are plausible from the mid-2026 vantage point:

### Scenario A — Adoption without sovereignty (2027)

EUCS is adopted with Basic, Substantial, and High levels but **no High+ sovereignty tier**. France maintains SecNumCloud as the national-level sovereignty framework outside EUCS. EUCS provides harmonisation for the non-sovereign tier; national frameworks continue for the sovereignty tier.

**Likelihood**: Moderate. This is the path of least resistance for the sceptical block. The compromise weakens EUCS's stated intent of unifying the EU landscape but produces *an* adopted scheme.

**Implications**:
- BSI C5, ENS, ACN, KsVC, BIO2, PiTuKri continue at national level.
- SecNumCloud continues as the French sovereignty layer.
- EUCS becomes a portable mid-tier certification useful for cross-border procurement.
- The fragmentation problem is partially solved.

### Scenario B — Adoption with sovereignty in 2027-2028

The ANSSI/BSI joint statement matures into a substantive sovereignty content proposal that re-enters EUCS drafts. The High+ tier is restored (possibly with different name and content) with criteria France and Germany jointly support. ECCG approves; Commission adopts.

**Likelihood**: Low to moderate. Depends on whether the joint statement produces concrete content that the sceptical Member States accept (even reluctantly).

**Implications**:
- EUCS High+ becomes the unified EU sovereignty framework.
- SecNumCloud may converge with or remain separate from EUCS High+.
- National frameworks face pressure to align with EUCS levels.
- Hyperscalers need separate sovereign offerings (JVs, dedicated regions) for the High+ tier.

### Scenario C — Continued slippage through 2027

EUCS does not adopt in 2026 or 2027. The political deadlock continues; the Commission Cybersecurity Act review concludes inconclusively; national frameworks remain operative without EU-level harmonisation.

**Likelihood**: Moderate. The status quo has been operative for two years; another year of slippage is consistent with the pattern.

**Implications**:
- The national-framework fragmentation continues.
- Cloud providers continue to run portfolios of national certifications.
- DORA and NIS2 supply-chain expectations become the practical EU-wide framework by default.
- Pressure builds on the Commission to address governance issues with the CSA framework.

## What this means for planning today

For cloud providers and customers building compliance programmes:

**Do not plan against EUCS arrival.** Use the actually-operative national frameworks and the EU-wide regimes that are in force (GDPR, NIS2, DORA, EU Cloud CoC). Plan upside on EUCS adoption rather than depending on it.

**Watch the ANSSI/BSI statement** as a leading indicator. Specific content publications from ANSSI and BSI jointly are more informative than general policy statements.

**Watch ECCG voting** in 2026-2027. ECCG meeting outcomes (publicly summarised in ENISA bulletins) signal whether adoption movement is happening.

**Watch the Commission CSA review.** A specific decision on Cybersecurity Act revision could change EUCS governance and unblock adoption.

**Maintain national framework participation.** Regardless of EUCS outcome, national framework certifications retain value for at least the medium term — the transition period from EUCS adoption to national framework retirement would span years.

## EUCS and adjacent regulations

EUCS does not exist in isolation. Other EU-level instruments are operative regardless of EUCS:

- **[GDPR](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct)** — applicable; the EU Cloud Code of Conduct is the operative GDPR Article 28 framework.
- **[NIS2](/knowledge-base/compliance/nis2-supply-chain-cloud-providers)** — applicable across Member States via national transposition; supply chain provisions apply to cloud regardless of EUCS.
- **[DORA](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay)** — applicable directly to financial sector; CTPP regime functions without EUCS.
- **EU AI Act** — applies progressively to AI services on cloud, independent of EUCS.

If EUCS adopts, it adds a certification layer on top of these regulations. It does not replace them.

## What changes if EUCS adopts

For cloud providers:
- A portable EU-wide certification becomes available.
- National framework audit cycles may eventually converge with EUCS cycles.
- Audit firms gain a unified EU-wide scope of work.
- New procurement language emerges in EU public-sector tenders.

For customers:
- Cross-border supplier evaluation becomes easier.
- A standardised assurance level can be specified in procurement.
- Concentration-risk analysis benefits from consistent certification across providers.

For national authorities:
- National certification authorities take on EUCS coordination roles.
- Some national frameworks may be retired or transformed into EUCS national specialisations.

For the sovereignty question (in Scenario B):
- High+ certification becomes the EU sovereignty signal.
- Joint ventures and EU-native operators benefit from the unified framework.
- Hyperscalers' dedicated sovereign regions face EUCS High+ as the test case.

:::tip[Architectural Pro Tip]
For a cloud provider preparing for EUCS, the **substantive controls work** that will support eventual EUCS certification at the Substantial level is already underway through [BSI C5:2026](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation), which is explicitly aligned with EUCS Substantial. A cloud provider building to C5:2026 is most of the way to EUCS Substantial whenever adoption arrives. For potential High+ work (in Scenario B), follow [ANSSI SecNumCloud](/knowledge-base/compliance/france-anssi-secnumcloud-qualification) developments closely — SecNumCloud is the substantive base for any future EUCS sovereignty tier. Building portfolio depth on C5 and SecNumCloud is the lowest-regret path against EUCS uncertainty.
:::

:::warning[Reality Check]
EUCS has been "imminent" in industry analyst reports continuously since 2022. Every year produces a fresh round of "this is the year EUCS adopts" coverage. The empirical pattern is that EUCS slips. Build compliance and procurement strategy against the regimes that are in force, treat EUCS as upside rather than base case, and plan to absorb EUCS when it eventually arrives rather than waiting for it. Cloud strategies that have depended on EUCS arrival have aged poorly for five consecutive years.
:::

:::tip[Slovak context]
For Slovak readers, EUCS adoption matters specifically because **[KsVC methodology](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) will inevitably align with EUCS levels** once it lands. MIRRI has not published explicit plans for EUCS transition, but the substantive controls work for KsVC U2 (independent evaluator) and U3 (Cybersecurity Auditor) maps to EUCS Substantial and High respectively. **Scenario A (adoption without sovereignty)** is operationally manageable for Slovakia — KsVC U4 retains the private-cloud-segment posture; EUCS Basic / Substantial / High provide harmonised tiers for U1 / U2 / U3. **Scenario B (adoption with sovereignty)** would create direct alignment between KsVC U4 and EUCS High+, simplifying multinational CSP qualification for Slovak public sector. **Scenario C (continued slippage)** is the status quo — KsVC continues unchanged with the [transitional gap to vyhláška 227/2025](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) being the operative Slovak concern rather than EUCS arrival. Plan against Scenario C as the base case.
:::

## Quarterly watch items — what to track

For readers using this article as a tracking reference:

- **ENISA EUCS programme page** — periodic updates on draft status, consultation outcomes.
- **ECCG meeting summaries** — vote attempts, adoption discussions.
- **EBA / EIOPA / ESMA statements** on cloud regulation coordination.
- **ANSSI and BSI public outputs** — joint statements, parallel guidance, framework updates.
- **Commission CSA review** — final decisions on governance.
- **National framework updates** — KsVC methodology revision, Finnish criteria library, Italian determinazioni — provide signal on national-level evolution that EUCS would interact with.
- **Hyperscaler sovereign cloud milestones** — Bleu full qualification, S3NS evolution, AWS European Sovereign Cloud operational launch — provide demand-side signal on whether EUCS High+ would have a market.

## Closing checklist

- **EUCS remains a draft as of mid-2026.** Not adopted. Not applicable. Plan against operative regimes (national frameworks, GDPR, NIS2, DORA) rather than against EUCS arrival.
- Three assurance levels in current drafts: Basic, Substantial, High. A fourth (High+) with sovereignty content was in the November 2023 draft and removed in the March 2024 draft.
- Member State divide: pro-sovereignty (FR, IT, DE, ES) vs. sceptical (NL, IE, SE, FI, DK) vs. middle (BE, PL).
- **ANSSI/BSI joint statement (March 2026)** is the most positive signal in two years for narrowing the central France-Germany sovereignty divergence. Watch for substantive follow-up.
- Three plausible scenarios: A) adoption without sovereignty in 2027; B) adoption with sovereignty in 2027-2028; C) continued slippage through 2027.
- Operative EU-wide regimes apply regardless of EUCS: GDPR, NIS2, DORA, EU AI Act, EU Cloud CoC.
- For cloud providers preparing for EUCS: build to [BSI C5:2026](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation) (Substantial reference) and follow [ANSSI SecNumCloud](/knowledge-base/compliance/france-anssi-secnumcloud-qualification) (High+ candidate reference).
- Quarterly watch items: ENISA, ECCG, ESA statements, ANSSI/BSI joint outputs, Commission CSA review, national framework updates, hyperscaler sovereign-cloud milestones.
- This article is dated by design. Re-read against current events. The `updated` frontmatter field reflects the date the political picture was last current.
- See the [Overview](/knowledge-base/compliance/cloud-data-security-eu-national-frameworks-overview) for context on the broader EU cloud landscape; see [Sovereign Cloud Products](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape) for the product responses to EUCS uncertainty.
