---
title: "Choosing Your Cloud Compliance Posture — A Decision Framework"
category: compliance
tags: ["Decision Framework", "Practitioner", "Compliance", "Data Security", "Cross-Cutting"]
date: 2026-05-15
updated: 2026-05-15
readTime: 12
level: intermediate
excerpt: "The national frameworks, cross-cutting baselines, and regulatory overlays add up to dozens of acronyms. This article is the decision tree that maps 'I am [type of organisation] doing [type of workload] in [geography]' to 'these are the frameworks that actually apply to you'."
references:
  - title: "EU National Cloud Security Frameworks Overview"
    url: "/knowledge-base/compliance/cloud-data-security-eu-national-frameworks-overview"
    description: "The orientation article covering all the national frameworks referenced in this decision tree."
    domain: "internal"
  - title: "ISO 27001 / 27017 / 27018 / 27701 Baselines"
    url: "/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines"
    description: "The universal baseline standards referenced by every national framework."
    domain: "internal"
  - title: "DORA for Cloud — Financial Sector Overlay"
    url: "/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay"
    description: "The sectoral framework for financial services that applies regardless of national framework participation."
    domain: "internal"
  - title: "NIS2 Supply Chain for Cloud Providers"
    url: "/knowledge-base/compliance/nis2-supply-chain-cloud-providers"
    description: "The supply-chain obligations that flow from any NIS2 essential or important entity customer to its cloud providers."
    domain: "internal"
  - title: "GDPR Article 28 and the EU Cloud Code of Conduct"
    url: "/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct"
    description: "The personal-data-processing layer that applies whenever the cloud service handles EU resident personal data."
    domain: "internal"
---

Twenty-plus acronyms, ten national frameworks, three EU-level instruments, three regulatory overlays (one sector-specific, two cross-sectoral). The cloud compliance landscape in Europe is genuinely dense, and the most common procurement mistake is reading every framework as if it applies — or, worse, reading none of them as if they apply. This article is the decision tree that maps an organisation's actual situation to the frameworks that actually apply to it.

## The three questions that drive everything

Before navigating any framework, answer three questions:

1. **What kind of organisation am I?** Public sector, financial services, regulated essential entity, regulated important entity, healthcare, general commercial.
2. **What's the workload's data sensitivity?** Public/open data, operational data, personal data of EU residents, regulated personal data (health, financial), national-classified information.
3. **What's the geographic scope?** Single Member State, multiple Member States, EU + UK/CH/NO, EU + global.

Every framework that applies to you can be derived from the intersection of these three answers. Frameworks that don't apply can be set aside without further investigation.

## Universal baselines that always apply

Regardless of the three answers above, the following always apply to any cloud workload processing EU resident personal data:

- **GDPR** including **Article 28** for the controller-processor relationship.
- **ISO 27001 / 27017 / 27018** as the baseline evidence layer the cloud provider will be asked for.
- **SOC 2 Type 2** or **BSI C5** as the international/European attestation the cloud provider will be asked for.
- **EU Cloud Code of Conduct Level 2** as a pragmatic GDPR Article 28 alignment instrument.

These are the floor. Every more specific framework layered above assumes these are in place.

## Decision tree by organisation type

### A. Slovak public administration entity

**Always applies**:
- KsVC catalogue listing requirement (must consume only listed services).
- ISVS classification under MIRRI methodology (U1-U4).
- Cybersecurity Act 69/2018 (as amended by 366/2024) + vyhláška 227/2025 risk-management regime if essential or important entity under NIS2.
- GDPR for personal data.

**Often applies**:
- DORA if also a financial supervisor or financial-services-adjacent entity.
- Sector-specific regulation (healthcare under MZ SR oversight, etc.).

**Map to articles**: [Slovakia KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud), [NIS2 supply chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers), [GDPR Article 28](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct).

### B. EU financial services entity (bank, insurer, asset manager, payment institution)

**Always applies**:
- **DORA** — the primary framework. CTPP-designated providers under direct ESA supervision.
- GDPR for personal data.
- NIS2 as essential entity (banking and financial market infrastructure are explicitly in NIS2 Annex I).
- ISO/SOC 2/C5 evidence from cloud providers as supply-chain risk management.

**Often applies**:
- National framework participation in the country of operation (KsVC, BSI C5, ENS, ACN, etc.) — required for public-sector adjacent workloads.
- SecNumCloud if French OIV/OSE.

**Map to articles**: [DORA](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay), [NIS2 supply chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers), country-specific articles, [Sovereign cloud products](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape) for sovereign workloads.

### C. EU healthcare entity (hospital, health insurer, health-data platform)

**Always applies**:
- **GDPR** with special protection for health data (Article 9).
- NIS2 as essential entity (healthcare is in NIS2 Annex I).
- National healthcare-specific regulation (NEN 7510 as de facto sector standard in NL, EHDS-aligned frameworks in others — NEN 7510 is a voluntary standard but is contractually required by Dutch health insurers and effectively mandatory in practice).

**Often applies**:
- National framework participation for public-sector healthcare workloads.
- DORA if also operating regulated financial services.
- Cross-border data flow regulations under EHDS (European Health Data Space).

**Map to articles**: [NIS2 supply chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers), [GDPR Article 28](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct), country-specific articles.

### D. EU essential / important entity (energy, transport, water, digital infrastructure, postal services, manufacturing of critical products, food, etc.)

**Always applies**:
- **NIS2** (essential or important entity).
- GDPR for personal data.
- ISO/SOC 2/C5 evidence from cloud providers as supply-chain risk management.

**Often applies**:
- National framework participation if public-sector or public-sector-adjacent.
- DORA if also performing regulated financial services.
- Sector-specific regulations (energy sector under TSO-DSO obligations, transport under safety regulators, etc.).

**Map to articles**: [NIS2 supply chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers), country-specific articles, [GDPR Article 28](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct).

### E. EU general commercial entity (B2B SaaS, marketplace, software vendor — not in NIS2 scope, not in DORA scope)

**Always applies**:
- **GDPR** for personal data of EU residents.
- ISO 27001 / SOC 2 as commercial baseline (not regulatory mandate, but customer expectation).

**Often applies**:
- EU Cloud CoC adherence as customer-facing signal of GDPR alignment.
- ISO 27018 / 27701 if handling significant volumes of personal data.

**Map to articles**: [ISO baselines](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines), [SOC 2](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them), [GDPR Article 28](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct).

### F. Non-EU entity processing EU resident data

**Always applies**:
- **GDPR Chapter V** transfer mechanisms (SCCs with supplementary measures, BCRs, adequacy decisions where applicable).
- GDPR Article 28 for the controller-processor relationship.

**Often applies**:
- EU Cloud CoC Third Country Transfer Module as the structured Schrems-II-aligned framework.
- Specific transfer impact assessments.
- For workloads serving EU public-sector or regulated customers: those customers' framework participation requirements flow through to you as a sub-processor.

**Map to articles**: [GDPR Article 28 / CoC](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct), [Hyperscaler EU Data Boundary](/knowledge-base/compliance/hyperscaler-eu-data-boundary-commitments).

## Decision tree by workload sensitivity

### Tier 1 — Public / open data

Minimal compliance bar. ISO 27001 from the cloud provider is generally sufficient. National framework: typically the lowest tier (KsVC U1, ENS Básica, BBN1, QC1). No special encryption or sovereignty requirements.

### Tier 2 — Operational data (non-sensitive personal data, business operational data)

Standard cloud compliance bar. ISO 27001 + 27017 + 27018, SOC 2 Type 2, EU Cloud CoC Level 2. National framework: mid-tier (KsVC U2, ENS Media, BBN2, QC2). Standard encryption at rest with provider-managed keys.

### Tier 3 — Regulated personal data / commercial confidential

Higher compliance bar. Full ISO stack including 27701. Strong national framework participation (ENS High, ACN QC3, KsVC U3, BSI C5 with extended criteria). Customer-managed encryption keys (BYOK/HYOK). Documented data-processing locations. Audit rights for high-criticality processing.

### Tier 4 — National-classified information / critical infrastructure data

Strict sovereignty and security bar. SecNumCloud, KsVC U4 (private government cloud), ACN QC4 / PSN, ENS Alta + Cloud PCE, BIO2 BBN3, PiTuKri TL III handling. Customer-held HSM key custody. EU-controlled provider entity (JV, EU-native operator, dedicated sovereign region). Restricted access to operational personnel.

## Decision tree by geographic scope

### Single Member State

- One national framework applies primarily.
- DORA if financial.
- NIS2 transposition of that Member State.
- GDPR.

Operational simplicity: focus depth in one framework rather than breadth.

### Multiple Member States (EU)

- National framework participation in each Member State of operation.
- DORA (uniform across EU) if financial.
- NIS2 transpositions per Member State (substantive obligations uniform; procedural details vary).
- GDPR.
- EU Cloud CoC for portable Article 28 demonstration.

Operational pattern: build evidence to the strictest framework; map to others via control mappings.

### EU + UK / Switzerland / Norway

- EU national frameworks for EU operations.
- UK NCSC 14 Cloud Security Principles for UK operations (see the [UK article](/knowledge-base/compliance/united-kingdom-ncsc-cloud-security-principles)).
- Swiss FINMA Circular for Swiss financial operations.
- Norwegian NSM grunnprinsipper for Norwegian operations.
- Adequacy decisions handle most data flows; some sectors require additional measures.

Operational pattern: extend the EU evidence base with adjacent-jurisdiction evidence; the substantive overlap is large.

### EU + Global

- EU frameworks for EU operations.
- US frameworks if US public-sector or US-regulated industries (FedRAMP, IRS 1075, CJIS, HIPAA).
- Local frameworks for each region of operation.
- Cross-region data flows under GDPR Chapter V.

Operational pattern: federated compliance programme with regional compliance leads; mature audit programme producing reusable evidence across regions.

## Worked examples

### Example 1 — Slovak ministry implementing a citizen-facing portal

- **Public sector + GDPR personal data + national-classified flag (some workflows handle personal data under Act 215/2004)**.
- **Tier 3** for the personal-data workflows.
- **Single Member State** scope.

Apply: KsVC U3 listing for the cloud provider (citizen-data workflows); ISO 27001/27017/27018; SOC 2 Type 2 or BSI C5 as supporting evidence; GDPR Article 28 contract; EU Cloud CoC Level 2 as supplementary; NIS2 supply-chain assessment of the cloud provider (the ministry is likely an essential entity).

Don't apply: DORA (not a financial entity); SecNumCloud (not French); EUCS High+ (not yet operative).

### Example 2 — Slovak bank using cloud for retail banking platform

- **Financial services + GDPR personal data + regulated data**.
- **Tier 3**.
- **Single Member State** scope primarily, EU scope for cross-border banking services.

Apply: **[DORA](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay)** as primary framework. Specifically: the [CTPP regime](/knowledge-base/compliance/dora-ctpp-regime-direct-esa-supervision) if the cloud provider gets designated, and [Article 30 contractual content](/knowledge-base/compliance/dora-article-30-contracts-and-exit-strategies) for the cloud contract substance. Plus: [ISO 27001/27017/27018/27701](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines); [SOC 2 Type 2](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them) / [BSI C5](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation); [GDPR Article 28](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct); EU Cloud CoC Level 2; [NIS2 obligations](/knowledge-base/compliance/nis2-supply-chain-cloud-providers) (bank is essential entity); [BYOK/HYOK key custody](/knowledge-base/compliance/cloud-encryption-key-custody-byok-hyok) for Tier 3 data; [KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) participation may apply if the bank consumes public-sector-adjacent services.

Don't apply: [SecNumCloud](/knowledge-base/compliance/france-anssi-secnumcloud-qualification) (not French OIV/OSE); national-classified information handling (no classified data).

### Example 3 — French defence-adjacent SaaS provider

- **Defence-adjacent (potentially OIV/OSE) + commercial entity**.
- **Tier 4** for OIV/OSE workflows.
- **Single Member State** primarily, but possible international clients.

Apply: **SecNumCloud** as primary framework (mandatory for sensitive workflows under Cloud au centre); ISO 27001/27017/27018; sovereignty-grade cloud (Bleu, S3NS, OVHcloud, 3DS Outscale); EU Cloud CoC; NIS2 obligations; GDPR Article 28.

Don't apply: KsVC (not Slovak); DORA (not financial); ACN (not Italian PA).

### Example 4 — Non-EU SaaS vendor selling to EU customers across multiple Member States

- **Commercial entity + GDPR personal data (high volumes) + non-EU based**.
- **Tier 2-3** depending on customer base.
- **EU + Global** scope.

Apply: ISO 27001/27017/27018/27701; SOC 2 Type 2; BSI C5 (for German customers); EU Cloud CoC Level 2 with **Third Country Transfer Module**; GDPR Article 28 contracts with each customer; transfer impact assessments for data flowing to non-EU; potentially ENS Media or High for Spanish customers.

Don't apply: SecNumCloud (would require structural changes); DORA (not a financial entity, unless serving financial sector — then supply-chain obligations flow from financial customers); national-classified information handling.

:::tip[Architectural Pro Tip]
For any organisation building a cloud compliance programme, the **single most leveraged decision is which framework to design controls to**. Pick the strictest framework that applies to a non-trivial portion of your workloads, design controls to its requirements, and map to all other applicable frameworks. For most EU-operating organisations, that strictest framework is one of: ENS High + Cloud PCE (Spain), ACN QC3 (Italy), KsVC U3 (Slovakia), SecNumCloud (France) for sovereign workloads, or BSI C5 + ISO 27017/27018 + EU Cloud CoC L2 as a portable European baseline. Designing to a mid-tier framework and discovering later that you need to upgrade for a stricter tier is more expensive than designing to the stricter framework from the start.
:::

## Common decision-tree traps

**Trap 1: Assuming national frameworks substitute for GDPR or NIS2.** They don't. Every national framework assumes GDPR compliance; every cloud provider above NIS2 size thresholds is an essential entity regardless of national framework participation. The frameworks layer; they don't replace.

**Trap 2: Treating EUCS as imminent.** As of mid-2026, EUCS remains a draft. Plan against the actual operative regimes — the national frameworks plus the EU-wide DORA/GDPR/NIS2 layer. EUCS arriving is an upside scenario, not a base case.

**Trap 3: Confusing sovereign cloud with EU Data Boundary.** They address different concerns. EU Data Boundary is data location; sovereign cloud is ownership and jurisdiction. A workload may need one, the other, both, or neither.

**Trap 4: Building each framework as a parallel project.** Build to the strictest applicable framework once; map to others via the explicit mappings the frameworks publish (CCM mappings, ISO mappings, C5-SOC 2 mappings).

**Trap 5: Forgetting the supply-chain side of NIS2.** Even organisations not directly in NIS2 scope as essential entities may have NIS2-scope customers whose supply-chain obligations flow through. The supply-chain assessment package is the operational answer.

:::warning[Reality Check]
The most common decision-framework mistake is **picking the framework before understanding the obligations**. Procurement teams that start with "we need SOC 2 / ISO 27001 / BSI C5" rather than "what's our actual regulatory exposure" end up with attestations that don't address their concerns. The order of operations is: identify regulatory obligations → identify applicable frameworks → identify the strictest applicable → build to that → map to others. Reversing the order is a recipe for compliance theatre.
:::

## Where to go next

This article references most others in the security section. Use the framework above to identify which apply to your situation, then go deep on the relevant ones:

- **Country-specific obligations** — see the country article for your operating jurisdiction(s).
- **Universal baselines** — [ISO 27001/27017/27018/27701](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines), [SOC 2 Reports](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them), [CSA STAR Registry](/knowledge-base/compliance/csa-star-registry-cross-cutting-trust-layer).
- **Regulatory overlays** — [DORA](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay) (financial sector), [NIS2 Supply Chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers) (cross-sectoral), [GDPR Article 28 + EU Cloud CoC](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct) (personal data).
- **Vendor landscape** — [Sovereign Cloud Products](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape), [Hyperscaler EU Data Boundary](/knowledge-base/compliance/hyperscaler-eu-data-boundary-commitments) if sovereignty or data residency matters.
- **Adjacent jurisdictions** — [UK NCSC](/knowledge-base/compliance/united-kingdom-ncsc-cloud-security-principles), [Switzerland FINMA](/knowledge-base/compliance/switzerland-finma-cloud-frameworks), [Norway NSM](/knowledge-base/compliance/norway-nsm-cloud-frameworks) if your operations extend beyond the EU.
- **Practitioner skill** — [Reading Attestation Reports](/knowledge-base/compliance/reading-cloud-attestation-reports-practitioner-guide) once you start evaluating actual evidence from providers.

## Closing checklist

- Three questions drive everything: organisation type, data sensitivity, geographic scope. Answer them before navigating frameworks.
- Universal baselines (GDPR, ISO 27001/27017/27018, SOC 2 / C5, EU Cloud CoC Level 2) always apply for EU resident personal data. They are the floor.
- Per organisation type: Slovak public admin needs KsVC + NIS2; financial entities need DORA + NIS2; healthcare needs sectoral + NIS2; commercial general needs baselines + GDPR.
- Per sensitivity tier: Tier 1 minimal; Tier 2 standard cloud compliance bar; Tier 3 customer-managed keys + stricter national framework participation; Tier 4 sovereignty grade.
- Per geographic scope: single Member State focus is operationally simpler; multi-Member-State requires evidence mapping; EU+adjacent-jurisdiction requires extending the EU base; global requires regional federation.
- Worked examples cover Slovak ministry, Slovak bank, French defence-adjacent SaaS, and non-EU SaaS — each with different framework intersections.
- Design to the strictest applicable framework once; map to others. Avoid parallel-framework projects.
- Common traps: assuming national frameworks substitute for GDPR/NIS2, treating EUCS as imminent, confusing sovereign cloud with EU Data Boundary, building each framework separately, forgetting NIS2 supply-chain flow-through.
- See the country articles for per-framework detail, the [ISO baseline](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines) and [SOC 2](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them) articles for the universal evidence base, and the [reading attestation reports article](/knowledge-base/compliance/reading-cloud-attestation-reports-practitioner-guide) for how to evaluate the evidence you receive.
