---
title: "Data Security in the Cloud — How EU Member States Actually Decide What's Safe"
category: compliance
tags: ["EU", "Compliance", "Data Security", "Sovereignty", "EUCS", "NIS2"]
date: 2026-04-02
updated: 2026-05-16
readTime: 14
level: beginner
excerpt: "Every EU member state grades cloud security differently, and the 'European' scheme that was supposed to harmonise them has been stuck for two years. Here is the actual map — who leads, who drifts, and what a multicloud operator has to navigate."
references:
  - title: "ENISA — European Cybersecurity Certification Scheme for Cloud Services (EUCS)"
    url: "https://www.enisa.europa.eu/publications/eucs-cloud-service-scheme"
    description: "The draft EU-wide certification scheme for cloud services, developed by ENISA under the Cybersecurity Act. As of mid-2026 still in deadlock over the sovereignty layer."
    domain: "enisa.europa.eu"
  - title: "Cybersecurity Act — Regulation (EU) 2019/881"
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019R0881"
    description: "The regulation that established ENISA's permanent mandate and the European cybersecurity certification framework — the legal basis for EUCS and all candidate schemes."
    domain: "eur-lex.europa.eu"
  - title: "NIS2 Directive — (EU) 2022/2555"
    url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj"
    description: "The directive that brings cloud computing service providers under the 'essential entities' category, with 24h/72h incident reporting obligations and management-level accountability."
    domain: "eur-lex.europa.eu"
  - title: "DORA — Regulation (EU) 2022/2554"
    url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj"
    description: "The Digital Operational Resilience Act for the EU financial sector, applicable since January 2025 — introduces the Critical Third-Party Provider regime for hyperscalers serving banks and insurers."
    domain: "eur-lex.europa.eu"
  - title: "Gaia-X Compliance Document 24.06"
    url: "https://gaia-x.eu/wp-content/uploads/2024/09/Compliance-Document_24.06.pdf"
    description: "The Gaia-X label specification — three sovereignty levels verified via the Gaia-X Digital Clearing House, currently the most usable voluntary marker of European data sovereignty intent."
    domain: "gaia-x.eu"
  - title: "EU Cloud Code of Conduct"
    url: "https://eucoc.cloud/"
    description: "The voluntary GDPR Article 28 compliance framework for cloud processors, approved by the Belgian DPA in 2021 — adopted by the major hyperscalers and the most pragmatic EU-wide signal of GDPR alignment."
    domain: "eucoc.cloud"
---

The honest state of cloud security assessment in the EU, as of mid-2026: it is fragmented, and the European scheme that was meant to fix that has been stuck in political deadlock for over two years. Each significant member state has its own national framework, each was built before the Cybersecurity Act, each is still in active use. A cloud provider serving public sector customers across several EU countries today is running multiple parallel certifications, not one harmonised one.

This article maps the landscape. It is the orientation piece for the per-country deep-dives that follow. The goal is to understand the *methodology* national frameworks use, where they actually differ, and what a multicloud operator has to navigate while EUCS continues to slip.

## What "data security in the cloud" actually means to a regulator

A regulator looking at a cloud service does not see the marketing surface. They see a stack of questions that have to be answerable on paper, in audit form, with evidence:

- **Where does the data live?** Physical location of processing, location of replicas, location of management plane, location of support staff with access.
- **Who has jurisdiction over the provider?** Headquarters location, ownership structure, share of non-EU capital, exposure to foreign laws like the US CLOUD Act.
- **How is the data classified?** Confidentiality, integrity, availability — often expanded with authenticity and traceability — mapped to discrete levels that drive required controls.
- **What controls are in place?** Identity and access, encryption (in transit, at rest, key custody), network segregation, logging, change management, personnel vetting.
- **Who certified that those controls work?** Third-party auditor, accreditation body, methodology used, scope of audit, validity period.
- **What happens when something goes wrong?** Incident notification timelines, escalation paths, supervisory authority, sanctions.

Every national framework structures itself around these questions. They differ in *which questions matter most*, *how strict the answers must be*, and *who gets to certify the answers*.

## The CIA triad — and where countries add to it

The Confidentiality–Integrity–Availability triad is the conceptual base for every framework on the continent. ISO/IEC 27001:2013 (and now :2022) is the universal underlay; ISO/IEC 27017 (cloud-specific controls) and 27018 (PII in cloud) are the standard cloud add-ons; 27701 (privacy management) shows up in the more mature frameworks.

Where countries diverge:

- **Spain (ENS)** adds **authenticity** and **traceability** as fifth and sixth dimensions, making it the most operationally specific framework about audit logging.
- **Finland (PiTuKri)** ties the classification dimensions directly to **national classified-information levels** (TL IV / TL III / TL II) rather than abstract C/I/A scores.
- **France (SecNumCloud)** rolls everything into a single level — the framework's position is that "sensitive enough to matter" is one threshold, not a gradient.
- **Slovakia (KsVC)**, **Italy (ACN)**, and **Netherlands (BIO2)** use multi-level models where the classification of the *data* drives the minimum level of the *cloud service* (rule of the form `data class X ≤ cloud level Y`).

The practical implication: a workload classified under one framework does not trivially map to another. ENS's *Alta* category is not equivalent to ACN's *QC4* even when they sound similar — the underlying control sets are not the same.

## The four shapes of national frameworks

National schemes cluster into four operational shapes:

**Catalogue-with-mandatory-listing.** Slovakia's KsVC and Italy's ACN Qualificazione both work this way: a central authority maintains a public catalogue, and public sector entities must consume only listed services. Getting listed requires going through a defined evaluation process. This is the most procedural model — there is a published register, you are in it or you are not.

**Qualification-with-strict-sovereignty.** France's SecNumCloud is the canonical example. Single level, very strict requirements, including ownership and jurisdiction constraints (max 24% individual / 39% collective non-EU capital, immunity from extraterritorial law). The list of qualified providers is short and politically symbolic.

**Attestation-via-third-party-audit.** Germany's BSI C5 and Finland's PiTuKri operate this way. There is no central catalogue; cloud providers obtain attestation (ISAE 3000 Type 2) and publish it themselves through their trust centres. The framework's authority comes from procurement: federal authorities require C5 attestation, and de facto so do regulated industries.

**Baseline-with-self-assessment.** Netherlands' BIO2 and Spain's ENS *Básica* level work this way. The organisation does the assessment, files the documents, and a supervisory body checks compliance reactively. Lighter touch, less procedural overhead, less external assurance.

A given country can use more than one shape across different sensitivity tiers. Spain runs all three: self-assessment for Básica, mandatory third-party audit for Media and Alta. Italy has procedural verification by ACN for private CSPs and self-declaration for in-house infrastructure.

## Who actually leads — and on which axis

There is no single "best" framework. Leadership depends on what you are optimising for.

| Axis | Leader | Why |
|---|---|---|
| **Sovereignty strictness** | France (SecNumCloud) | Hard ownership caps, immunity to extraterritorial law, public political backing of the "Cloud au centre" doctrine |
| **Audit rigor and reusability** | Germany (BSI C5) | ISAE 3000 Type 2, well-documented control framework, mapping to ISO 27001/27017/27018, CSA CCM, AICPA TSC — and reusable with SOC 2 |
| **Process formality and predictability** | Italy (ACN) | Statutory timelines (60-day evaluation, 30-day for infrastructure), explicit catalogue, 36-month validity, formal "filiazione" doctrine for service composition |
| **Breadth of control set** | Spain (ENS) | 74 controls across organisational/operational/protective categories, dedicated Cloud Services compliance profile (PCE) |
| **Integration with national classified info** | Finland (PiTuKri) | Tied to Facility Security Clearance and the national TL II/III/IV classification system |
| **Public-sector enforcement bite** | Italy and Slovakia | Mandatory catalogue listing for public administration purchasing — non-listed services cannot be bought |
| **Practitioner familiarity** | Germany (BSI C5) | The most adopted by hyperscalers; the de facto reference for the EUCS Substantial level |

Slovakia's KsVC sits mid-pack in scope and procedural shape: multi-level (U1–U4), mandatory for public administration, ties higher levels to the national `zákon 69/2018` audit framework. As of mid-2026 a **transitional framework/law alignment gap** is open — MIRRI's published methodology (April 2025) still uses static U1–U4 classification while the underlying cybersecurity law moved to a risk-management regime under Act 366/2024 and vyhláška NBÚ 227/2025 (effective September 2025). Finland sits in the same position with a known closing date (autumn 2026). See the per-country articles for detail.

## The European layer — three things that are not quite frameworks

Three EU-wide initiatives sit above (or alongside) the national schemes. None has fully replaced national requirements, and the strongest candidate has been stuck in deadlock since 2024.

**EUCS — European Cybersecurity Certification Scheme for Cloud Services.** Drafted by ENISA under the Cybersecurity Act since 2019. Three assurance levels: Basic, Substantial, High. A draft "High+" with sovereignty requirements (data localisation, EU headquarters, immunity from extraterritorial law) was in the 2023 draft and was removed or significantly weakened in the March 2024 draft. The ECCG vote planned for April 2024 was postponed; the Polish presidency in H1 2025 did not move it forward; the Commission opened a Cybersecurity Act review in April 2025 that as of May 2026 has not produced a conclusion.

The result: EUCS is real as a draft, not real as an applicable rule. Anyone making concrete plans on the assumption EUCS will deliver in 2026 is over-indexing on political signals. The [EUCS Watch article](/knowledge-base/compliance/eucs-watch-political-tracking-2026) tracks the political process and the realistic adoption scenarios in detail.

A notable bilateral signal: in **March 2026, ANSSI and BSI published a joint statement on harmonised cloud-sovereignty criteria**. This is the first public step toward narrowing the FR–DE sovereignty divergence that has blocked EUCS at the High+ level. It is a statement of direction, not a binding agreement on scheme content. Watch it as a leading indicator rather than as a delivered outcome.

**Gaia-X.** Federated data infrastructure framework, not a certification scheme strictly speaking. The Compliance Document 24.06 defines a Standard Compliance baseline plus three labels (L1, L2, L3). **Label Level 3 is the closest thing to a working sovereignty marker today** — it requires EU/EEA headquartering, immunity to extraterritorial law, and full data sovereignty. Verification is automated through the Gaia-X Digital Clearing House. Adoption is slow; the multi-provider catalogue announced at Porto Summit 2025 has roughly 600 services across 15 providers.

**EU Cloud Code of Conduct.** A GDPR Article 28 compliance code, approved by the Belgian DPA in May 2021. Three adherence levels differ by *evidence type* (self-declaration, third-party validated, third-party assured), not by content. Adopted by AWS, Azure, Google, Oracle, SAP, IBM, and most major SaaS providers. Integrated with the CSA STAR Registry. **This is the only EU-wide cloud compliance instrument that is in widespread production use** — because it solves a concrete problem (Article 28 demonstrability) without political baggage.

NIS2 (Directive (EU) 2022/2555) and DORA (Regulation (EU) 2022/2554) sit alongside these and apply *regardless* of which national scheme a CSP is in. NIS2 brings cloud providers into the "essential entities" category with 24h/72h incident reporting and management-level accountability. DORA does the same for the financial sector with a separate Critical Third-Party Provider regime — the European Supervisory Authorities can designate hyperscalers as critical and supervise them directly.

NIS2 transposition status is highly heterogeneous across the member states this article covers, with concrete consequences for the framework/law alignment of each country's cloud scheme:

| Country | NIS2 transposing instrument | Status (mid-2026) | Framework alignment |
|---|---|---|---|
| Slovakia | Act 366/2024 + vyhláška NBÚ 227/2025 | In force (1 Jan 2025 / 1 Sep 2025) | **Gap** — MIRRI methodology rev. April 2025 still static U1–U4 |
| Germany | NIS2-Umsetzungsgesetz (NIS2UmsuCG) | In force since 6 Dec 2025 | Aligned — C5:2026 (March 2026) closes the gap from 1 Jun 2027 |
| France | Loi Résilience | Not yet in force; expected 2026 | ANSSI ReCyF (Mar 2026) covers NIS2 alongside SecNumCloud |
| Spain | RDL 7/2025 (partial) + Anteproyecto pending | Partial in force; full law in parliament | RD 311/2022 + CCN-STIC 800 updated June 2025 |
| Netherlands | Cyberbeveiligingswet (Cbw) | Approved Tweede Kamer Apr 2026; Senate review | BIO2 v1.3 (Mar 2026) aligns to forthcoming ministerial regulation |
| Italy | D.Lgs. 138/2024 | In force since 16 Oct 2024 | Aligned — Regolamento 21007/24 + Determinazione 127437/2026 |
| Finland | Kyberturvallisuuslaki (Act 124/2025) | In force since 8 Apr 2025 | **Gap** — PiTuKri v1.1 from 2020; new criteria library autumn 2026 |
| Czechia | Act 264/2025 Sb. | In force since 1 Nov 2025 | Aligned — vyhlášky 408/409/410/2025 Sb. in force |
| Poland | KSC amendment ("KSC2") | In force since 3 Apr 2026 (Const. Court review pending) | KSCC adopted (Dz.U. 2025 poz. 1017); operationalising |

The two clear framework/law gap cases are Slovakia and Finland, both with transitional dual-track arrangements and known (or implied) closing windows. Plan against the actually-in-force regime regardless of methodology revision status.

## What multicloud operators actually do

A hyperscaler serving public sector and regulated workloads across the EU today carries a portfolio of certifications, not one:

- **BSI C5 (Germany)** — Type 2 attestation, refreshed annually.
- **SecNumCloud (France)** — for sovereign cloud joint ventures (Bleu, S3NS), not for the mainline regions.
- **ENS (Spain)** — *Alta* or *Media* for relevant regions.
- **ACN Qualificazione (Italy)** — QC2 or QC3 for relevant services; QC4 only via Polo Strategico Nazionale partnerships.
- **PiTuKri (Finland)** — ISAE 3000 Type 2.
- **BIO Thema-uitwerking Clouddiensten (Netherlands)** — typically validated via EY CertifyPoint.
- **EU Cloud CoC Level 2** — published in CSA STAR Registry.
- **KsVC (Slovakia)** — listed in `katalog.statneit.sk` for U2 or higher.
- **ISO 27001 / 27017 / 27018 / 27701** — the universal underlay.
- **SOC 2 Type 2** — used in conjunction with C5; the mappings are explicit.

No single framework gives a CSP everything. The mature operators build a control framework that maps to the union of these schemes and run audits in series.

:::tip[Architectural Pro Tip]
The cheapest way to operate against a portfolio of national schemes is to design controls to the **strictest applicable framework** and document mappings down to the others. C5 + SecNumCloud-style ownership posture covers most of the procurement-facing requirements; ENS and ACN audits then become evidence-mapping exercises rather than fresh implementation projects. Building separately to each framework's letter is how mid-size CSPs sink budget into compliance without producing security improvement.
:::

## The sovereignty discourse, briefly

The single most charged topic across these frameworks is *sovereignty* — what it means, who enforces it, and whether it is a technical or a political construct.

The French position, embodied in SecNumCloud 3.2 and the "Cloud au centre" doctrine, is the maximalist one: sovereignty means EU headquartering, capped non-EU ownership, immunity from extraterritorial law. This excludes US hyperscalers from running sovereign workloads under their own names. Workarounds exist via joint ventures (Bleu = Microsoft + Orange + Capgemini; S3NS = Google + Thales).

The German position is more layered: BSI C5 emphasises *transparency* about jurisdiction and disclosure obligations rather than excluding non-EU providers outright. AWS, Azure, and Google all hold C5 attestations.

The Dutch, Swedish, Irish, Finnish, and Polish positions (broadly) oppose strict sovereignty rules at the EU level, partly because hyperscaler regions in those countries would be affected, partly because their public sectors already depend on hyperscaler services.

The Italian and Spanish positions are mixed. Italy concentrates strictly-sovereign workloads in Polo Strategico Nazionale (state-controlled infrastructure) while allowing hyperscalers to qualify at lower tiers. Spain has explicit cloud profiles in ENS that work for hyperscalers but adds Alta-tier sovereignty considerations.

An industrial-policy signal worth tracking: in April 2026 the EU Commission awarded a **€180 million sovereign cloud framework** to four consortia — Post Telecom + Clever Cloud + OVHcloud, STACKIT (Schwarz Group), Scaleway, and Proximus + S3NS + Clarence + Mistral. The award demonstrates concrete institutional purchasing power flowing to EU-native and sovereign JV operators alongside hyperscaler infrastructure. See [EU-native cloud providers](/knowledge-base/compliance/eu-native-cloud-providers-landscape) and [Sovereign Cloud Products](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape) for the full landscape.

This split is what blocked EUCS at the High+ level. It is not technical; it is industrial policy.

:::warning[Reality Check]
The framing "EU is moving toward unified cloud security regulation" has been true in slide decks for five years and false in implementation for just as long. EUCS slipped through 2023, 2024, 2025 and is still slipping in 2026. Plan for continued fragmentation; plan for national schemes to remain the operational reality; treat the "harmonised" pitch as aspirational until ECCG actually votes a scheme into force. A cloud strategy that assumes EUCS arrives on time is a cloud strategy that will be wrong for several more years.
:::

## How the per-country deep-dives are structured

Every country article in this series follows the same shape, so they can be read in any order and compared section-by-section:

1. **The system at a glance** — name, current version, governing body.
2. **Legislative basis** — the statutes and decrees that ground the framework.
3. **Scope of obligation** — who must comply, public versus private.
4. **Classification model** — the levels and what determines them.
5. **Evaluation criteria** — the control framework and reference standards.
6. **The assessment process** — procedural steps for a CSP to qualify.
7. **Catalogue and recertification** — public register and cycle.
8. **Sanctions and oversight** — what happens on non-compliance.
9. **Sovereignty posture** — where the framework sits on the strict-to-lenient axis.
10. **Multicloud factor** — how a hyperscaler typically navigates it.

The shape is deliberate: same questions, country-specific answers. If something is missing in a country's article (e.g. no public catalogue, no classification model), the section is still there — saying so explicitly is the answer.

## Where to go next

Five reading paths depending on your role and immediate question:

**If you are a Slovak architect new to cloud compliance** — start with [Slovakia KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud), then [ISO 27001/27017/27018/27701 baselines](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines), then [NIS2 Supply Chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers), then [Decision Framework](/knowledge-base/compliance/cloud-compliance-decision-framework).

**If you are a financial-services architect** — start with [DORA for Cloud](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay), then [SOC 2 Reports](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them), then [NIS2 Supply Chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers), then your country's article.

**If you are a CSP preparing EU market entry** — start with [ISO baselines](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines), then [SOC 2](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them) and [CSA STAR](/knowledge-base/compliance/csa-star-registry-cross-cutting-trust-layer), then [EU Cloud CoC](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct), then the country articles for your target markets, then [Sovereign Cloud Products](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape) if competing in the sovereign tier.

**If you are in procurement evaluating cloud providers** — start with the [Decision Framework](/knowledge-base/compliance/cloud-compliance-decision-framework), then [Reading Attestation Reports](/knowledge-base/compliance/reading-cloud-attestation-reports-practitioner-guide), then your country's article, then [SOC 2 Reports](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them) to verify the provider's primary attestation.

**If you are a pan-European compliance lead** — read this overview, then the [ISO baselines](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines), then all nine EU country articles (overview-scanned), then [NIS2 Supply Chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers), [DORA](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay), [GDPR + EU Cloud CoC](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct), [Sovereign Cloud Products](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape), [Hyperscaler EU Data Boundary](/knowledge-base/compliance/hyperscaler-eu-data-boundary-commitments), [Decision Framework](/knowledge-base/compliance/cloud-compliance-decision-framework), and adjacent jurisdictions ([UK](/knowledge-base/compliance/united-kingdom-ncsc-cloud-security-principles), [Switzerland](/knowledge-base/compliance/switzerland-finma-cloud-frameworks), [Norway](/knowledge-base/compliance/norway-nsm-cloud-frameworks)) as needed.

**If you are evaluating EU-native cloud provider alternatives** — start with [EU-native cloud providers](/knowledge-base/compliance/eu-native-cloud-providers-landscape) for the full landscape, then the relevant country articles for the markets you are entering, then [ISO 27001/27017/27018](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines) and [BSI C5](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation) as the baseline attestation pair most EU-native providers pursue.

## Closing checklist

- The CIA triad is the universal base. Treat it as common ground, not as the distinguishing feature — the differences are in the control sets, the audit methodology, and the sovereignty posture.
- Map national frameworks by *operational shape* (catalogue, qualification, attestation, baseline) before mapping them by control content. The shape tells you what work to do; the content tells you which controls.
- For sovereignty, France leads, Germany pragmatises, Italy partitions (PSN for strict, hyperscalers for the rest), and the Nordic/Benelux states resist. Position accordingly.
- EUCS is a draft, not a rule. Plan against the national landscape that exists, with EUCS as upside if it eventually lands.
- Gaia-X Label 3 is the most usable voluntary sovereignty marker today. EU Cloud CoC Level 2 is the most usable GDPR Article 28 marker. Neither replaces national requirements; both reduce friction.
- NIS2 and DORA apply on top of everything else. Cloud providers are essential entities; financial sector cloud customers operate under DORA's CTPP regime regardless of national scheme participation.
- Multicloud CSPs run portfolios of certifications, not single ones. Design controls to the strictest applicable framework and map down. Avoid building separately to each.
- For Slovak readers: KsVC is mid-pack on rigor and comparable to ENS and ACN in scope, mandatory for public administration, and tied to the national audit framework under `zákon 69/2018`. As of mid-2026 a transitional framework/law alignment gap is open — see the per-country article for detail.
- **What to read next:** the reading paths section above maps the right entry-point for your role (Slovak architect, financial services, CSP, procurement, pan-European compliance, EU-native evaluation). For depth, the [Decision Framework](/knowledge-base/compliance/cloud-compliance-decision-framework) is the practitioner companion; for the per-country specifics, the 12 country articles cover each national regime; for cross-cutting concepts, the [ISO baselines](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines), [DORA](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay), [NIS2 Supply Chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers), and [GDPR + EU Cloud CoC](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct) articles cover the universal regimes; [EU-native cloud providers](/knowledge-base/compliance/eu-native-cloud-providers-landscape) covers the pure-play EU operator landscape distinct from hyperscalers and sovereign JVs.
