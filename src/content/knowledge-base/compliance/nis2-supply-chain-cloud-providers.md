---
title: "NIS2 Supply Chain — What Essential Entities Actually Need From Cloud Providers"
category: compliance
tags: ["NIS2", "Supply Chain", "Essential Entities", "Compliance", "Data Security", "Cross-Cutting"]
date: 2026-04-11
updated: 2026-05-15
readTime: 11
level: advanced
excerpt: "NIS2 doesn't just regulate operators directly — it regulates their supply chains, including cloud providers. This article unpacks what NIS2 supply-chain obligations actually look like for cloud customers and what evidence cloud providers must produce, with the per-country variation that matters in practice."
references:
  - title: "NIS2 Directive — (EU) 2022/2555"
    url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj"
    description: "The NIS2 Directive establishing the EU-wide cybersecurity framework for essential and important entities, including supply-chain risk management obligations."
    domain: "eur-lex.europa.eu"
  - title: "ENISA — NIS2 Implementation Resources"
    url: "https://www.enisa.europa.eu/topics/network-and-information-systems/nis-2"
    description: "ENISA's resources hub for NIS2 implementation, including guidance on supply chain security and cloud-service-specific obligations."
    domain: "enisa.europa.eu"
  - title: "ENISA — Supply Chain Security Good Practices"
    url: "https://www.enisa.europa.eu/topics/supply-chain-security/"
    description: "ENISA's supply chain security guidance, including the framework for ICT/OT supply chain risk management referenced under NIS2."
    domain: "enisa.europa.eu"
  - title: "Commission Implementing Regulation on NIS2 Cybersecurity Risk Management"
    url: "https://digital-strategy.ec.europa.eu/en/library/commission-implementing-regulation-nis-2-cybersecurity-risk-management-measures"
    description: "The Commission's implementing regulation specifying the technical and methodological requirements for NIS2 cybersecurity risk management, including supply chain provisions."
    domain: "digital-strategy.ec.europa.eu"
---

NIS2 — Directive (EU) 2022/2555 — does not regulate cloud providers only as essential entities in their own right. It also regulates the **supply chain** of every essential and important entity that consumes cloud services. The supply-chain provisions are where the cloud-customer-to-cloud-provider interface actually lives under NIS2, and they are the part of the directive that most often produces operational surprises for cloud providers serving regulated customers. This article walks through what NIS2 supply-chain obligations actually require, what cloud providers have to deliver in practice, and where the per-country variation matters.

## The two-sided NIS2 picture for cloud

NIS2 hits cloud providers from two sides simultaneously:

**Side 1 — Cloud provider as essential entity.** Cloud computing service providers, datacentre services, and content delivery networks are listed in NIS2 Annex I as digital infrastructure. Above size thresholds (≥50 employees and ≥€10M annual turnover, with stricter thresholds for some sectors), they are **essential entities** subject to direct NIS2 obligations: risk management, incident reporting (24h/72h/1 month), governance accountability, sanctions up to €10M or 2% of global turnover.

**Side 2 — Cloud provider as supply-chain participant.** Every customer that is itself an essential or important entity has NIS2 supply-chain obligations under Article 21. The customer must assess and manage the risks posed by its ICT supply chain — which includes the cloud providers it consumes. The cloud provider is not directly regulated through this side, but the customer's obligations create operational demands on the provider.

For cloud providers serving non-trivial EU customer bases, **both sides apply**. This article focuses on side 2 — the supply-chain side — because side 1 is covered in the per-country articles in this series.

## Article 21 — what the customer must do

*From the customer (essential / important entity) perspective:*

Article 21(2)(d) of NIS2 requires essential and important entities to implement, as a minimum, "supply chain security, including security-related aspects concerning the relationships between each entity and its direct suppliers or service providers."

In practical terms, the customer must:

1. **Identify** all ICT supply-chain participants material to its operations, including cloud providers.
2. **Assess** the cybersecurity practices of each material supplier.
3. **Document** the assessment outcomes and the residual risks.
4. **Monitor** suppliers on an ongoing basis.
5. **Address** identified risks through contractual, technical, or operational measures.
6. **Coordinate** with suppliers on incident response, including reporting flows.

The Commission's NIS2 implementing regulation (Regulation 2024/2690) specifies the technical and methodological requirements. The regulation is detailed on what supply-chain risk management must include — coordinated vulnerability disclosure, supplier code of conduct, audit rights, technical assessment criteria.

## What cloud providers actually have to deliver

*From the CSP perspective:*

The customer's Article 21 obligations create concrete demands on the cloud provider. The standard supply-chain assessment package a cloud provider serving NIS2-scope customers must be able to produce on request:

**Compliance and audit evidence**:
- Current ISO 27001 certification (and ideally 27017, 27018, 27701).
- Current SOC 2 Type 2 report.
- Current BSI C5 attestation (for German-market alignment) or equivalent national framework attestation.
- EU Cloud Code of Conduct adherence (Level 2 or 3).
- CSA STAR Registry entry (Level 2 preferred).

**Operational documentation**:
- System description and architecture overview.
- Data flow diagrams identifying processing locations and subprocessing.
- Subprocessor list with notification process for changes.
- Incident response procedures and notification commitments.
- Vulnerability management process and disclosure policy.
- Encryption and key management posture, including customer-controlled key options.

**Contractual provisions**:
- Audit rights for the customer and the customer's competent authority.
- Incident notification commitments with timelines that enable the customer's 24h/72h/1-month reporting cadence.
- Data location commitments and notification of changes.
- Exit assistance and data portability commitments.
- Supply-chain transparency clauses.

**Reporting and cooperation**:
- An established cooperation interface for incident classification and reporting.
- Periodic supplier-status reporting (some customers require quarterly).
- Pre-notification of material service changes affecting customer compliance.

Cloud providers serving large numbers of NIS2-scope customers cannot handle this through one-off responses. The standard model is to publish the supply-chain assessment package **as a self-service resource** — through trust centres (AWS Artifact, Microsoft Trust Center, Google Cloud Compliance Reports) and through public documents — and to handle remaining bespoke questions through structured customer-success processes.

## The 24-hour problem — incident classification flow

The single most operationally demanding aspect of NIS2 supply-chain integration is the **24-hour incident classification flow**.

The customer's NIS2 incident-reporting timeline:
- **Early warning** to competent authority — within **24 hours** of awareness.
- **Incident notification** — within **72 hours** of awareness.
- **Final report** — within **one month** of the incident notification.

For an incident that originates in or significantly involves the cloud provider's infrastructure, the customer cannot satisfy the 24-hour deadline without the cloud provider's cooperation. The information the customer needs in that 24-hour window:

- Confirmation of the incident and its scope.
- Identification of which customer data or systems are affected.
- Initial impact assessment.
- Estimated time to resolution.
- Whether the incident has been classified by the cloud provider as significant under its own NIS2 obligations.

Cloud providers without an established 24-hour cooperation interface end up bottlenecking their customers' reporting. The mature pattern is a dedicated incident-cooperation channel — typically a documented escalation path with named contacts, an SLA on initial response, and a structured information package that the cloud provider can produce within hours of incident classification.

## Sub-processors and the cascade

NIS2 supply-chain obligations cascade. The cloud provider is a supplier to its customer; the cloud provider's own suppliers (sub-processors, infrastructure providers, software vendors) are sub-suppliers from the customer's perspective.

For a SaaS provider running on a hyperscaler:
- The SaaS provider is the customer's primary cloud supplier.
- The hyperscaler is the customer's sub-supplier.
- Any incident at the hyperscaler that affects the customer's data flows up through the SaaS provider to the customer.

The customer's supply-chain risk management must address this cascade. The cloud provider must be able to:
- Identify its own material sub-processors to the customer.
- Provide assurance about its sub-processors' security practices.
- Notify the customer of sub-processor changes.
- Coordinate incident response across the chain.

This is the operational mechanism behind the explicit subprocessor authorisation requirements in GDPR Article 28 — and NIS2 supply-chain provisions reinforce the same chain.

## Per-country variation that matters

NIS2 is a directive; each Member State transposes it into national law. The substantive obligations are largely uniform, but operational details vary:

| Country | Incident reporting target | Key per-country specifics |
|---|---|---|
| **Slovakia** | NBÚ via vyhláška 227/2025 risk-management framework | Risk-based assessment in 227/2025; transitional period for old regime until 31 Dec 2026 |
| **Czechia** | NÚKIB; sectoral CSIRTs | Personal management-function prohibition up to 6 months as enforcement tool |
| **Germany** | BSI under NIS2-Umsetzungsgesetz | In force since 6 December 2025; ~29,500 entities in scope |
| **France** | ANSSI under Loi Résilience | Not yet in force (mid-2026); ReCyF provides interim guidance |
| **Spain** | INCIBE / sectoral authorities; CCN-CERT for public sector | Partial transposition via RDL 7/2025; coordination law pending |
| **Italy** | ACN under D.Lgs. 138/2024 | In force since 16 October 2024; phased compliance through October 2026 |
| **Netherlands** | NCSC and RDI under Cyberbeveiligingswet | Cbw approved Tweede Kamer Apr 2026; Senate review |
| **Finland** | Traficom and sectoral authorities under Kyberturvallisuuslaki | In force since 8 April 2025 |
| **Poland** | NASK CSIRT / GOV / MON depending on sector under KSC2 | In force since 3 April 2026; Constitutional Court review pending; personal liability for management |

For cloud providers serving multiple EU markets, the matrix of national supervisors and incident-reporting destinations is the operational reality. The substantive supply-chain obligation under Article 21 is uniform; the procedural plumbing varies.

## DORA, GDPR, and NIS2 in parallel

For a cloud provider serving a customer that is simultaneously a financial entity (under DORA), a personal-data-processing controller (under GDPR), and an essential entity (under NIS2):

- **DORA** governs the financial-services-specific obligations including the 24-hour classification-based reporting to financial supervisors.
- **GDPR Article 28** governs the personal-data processing relationship and the 72-hour breach notification to data protection authorities.
- **NIS2** governs the operational resilience obligations and the 24-hour/72-hour/1-month reporting to national cybersecurity competent authorities.

All three regimes apply in parallel; none substitutes for the others. The cloud provider's customer is responsible for satisfying all three; the cloud provider must support all three.

Mature cloud providers operate a **single incident classification workflow** that produces parallel notification streams: one for DORA-scope customers, one for GDPR-scope customers, one for NIS2-scope customers. Some customers fall under multiple regimes simultaneously — a bank that processes personal data and is an essential entity falls under all three.

:::tip[Architectural Pro Tip]
For a cloud provider serving NIS2-scope customers, the highest-leverage move is to **publish a NIS2 supply-chain assessment package** in the trust centre — a single zipped or wikified resource containing all the documents a customer's NIS2 supply-chain risk assessment will demand. Include current ISO/SOC 2/C5/CoC attestations, subprocessor list with change-notification mechanism, incident-cooperation playbook, exit-assistance commitment, data-location declaration, and Article 21 mapping document. Cloud providers that handle NIS2 supply-chain inquiries one-by-one through customer-success channels burn significantly more capacity than necessary, and the inconsistency of responses across customers produces compliance risk.
:::

## The customer side — what a regulated entity must do

*From the customer perspective (essential / important entity):*

For the customer, the NIS2 supply-chain obligation translates into:

1. **Build a supplier inventory** — every material ICT supplier, with categorisation by criticality.
2. **Define assessment criteria** — what evidence is required, at what frequency, with what threshold.
3. **Conduct assessments** — request evidence packages, evaluate them, document outcomes.
4. **Maintain records** — assessments must be auditable.
5. **Address gaps** — contractual, technical, or operational measures for residual risks.
6. **Integrate with incident response** — cooperation paths with each material supplier.
7. **Update on changes** — material supplier changes, sub-processor changes, regulatory changes.

For cloud providers, the customer-side process is operationally important to understand: it tells you why customers are asking for the documents they ask for, what they need it in, and when. Aligning the supply-chain assessment package to the customer's process reduces friction on both sides.

:::warning[Reality Check]
"NIS2 ready" is becoming a common marketing claim by cloud providers and is meaningless on its own. NIS2 is not a state a cloud provider achieves; it is an ongoing set of obligations the cloud provider must support its customers in meeting. The substantive question is not "are you NIS2 ready" but "can you produce the supply-chain assessment package, support incident classification on the customer's 24-hour timeline, notify sub-processor changes with adequate lead time, and accommodate the customer's audit rights." Verify those operationally; do not accept the marketing label.
:::

:::tip[Slovak context]
For Slovak essential and important entities under Act 366/2024 Z. z. (the NIS2 transposition, in force since 1 January 2025), supply-chain risk management of cloud providers operates against the risk-management framework in **vyhláška NBÚ 227/2025 Z. z.** (effective 1 September 2025). Slovak regulated entities must perform a documented cybersecurity risk analysis covering their cloud provider relationships; the analysis methodology is the unified NBÚ approach rather than a bespoke per-customer methodology. For Slovak public-administration entities, supply-chain risk management coordinates with [KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) consumption requirements — the cloud provider is both supply-chain participant (under NIS2) and catalogue-listed service (under KsVC). The two regimes apply in parallel and reference largely overlapping evidence.
:::

## Closing checklist

- NIS2 hits cloud providers from two sides: as essential entities in their own right (per the country articles in this series) and as supply-chain participants for every essential/important customer.
- Article 21 imposes supply-chain risk management on the customer; the cloud provider must produce the evidence the customer's assessment requires.
- Standard supply-chain assessment package: ISO 27001/27017/27018/27701 + SOC 2 Type 2 + national framework attestation + EU Cloud CoC + CSA STAR + operational documentation + contractual provisions + reporting cooperation.
- 24-hour incident classification flow is the most operationally demanding aspect. Establish a dedicated cooperation interface, do not handle ad-hoc.
- Sub-processor cascade matters. Cloud providers must surface their own sub-processors to customers and coordinate incident response across the chain.
- Per-country variation is procedural (which supervisor, which reporting destination) rather than substantive. The substantive obligation under Article 21 is uniform.
- DORA, GDPR, and NIS2 apply in parallel. Mature cloud providers operate a single classification workflow producing parallel notification streams.
- Publish the supply-chain assessment package as a self-service resource. Avoid one-by-one customer-success handling.
- See country articles for the per-country NIS2 transposition status and incident-reporting destinations; see [DORA article](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay) for the financial-sector overlay; see [Article 28 / EU Cloud CoC article](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct) for the GDPR overlay.
