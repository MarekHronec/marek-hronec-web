---
title: "DORA Article 30 — Cloud Contracts, Audit Rights, and Exit Strategies"
category: compliance
tags: ["DORA", "Article 30", "Contracts", "Financial Sector", "Exit Strategy", "Compliance", "Data Security"]
date: 2026-04-28
updated: 2026-04-28
readTime: 12
level: advanced
excerpt: "DORA Article 30 specifies the contractual content every financial entity must obtain from its cloud providers. The list is long, the substance is operational, and most pre-DORA cloud contracts do not meet it. This article walks through each clause, what it means in practice, and what financial entities and cloud providers actually negotiate."
references:
  - title: "DORA Article 30 — Contractual Arrangements"
    url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj"
    description: "DORA Regulation (EU) 2022/2554 Article 30, specifying the contractual content for ICT third-party service arrangements with financial entities."
    domain: "eur-lex.europa.eu"
  - title: "EBA Guidelines on ICT and Security Risk Management (EBA/GL/2019/04)"
    url: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-ict-and-security-risk-management"
    description: "EBA's guidelines on ICT and security risk management, including third-party arrangements — the historical baseline DORA Article 30 builds on."
    domain: "eba.europa.eu"
  - title: "EBA Guidelines on Outsourcing Arrangements (EBA/GL/2019/02)"
    url: "https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-outsourcing-arrangements"
    description: "EBA's outsourcing guidelines, which DORA Article 30 incorporates and extends specifically for ICT arrangements."
    domain: "eba.europa.eu"
  - title: "Commission Implementing Regulation 2024/2956 — Register of Information"
    url: "https://eur-lex.europa.eu/eli/reg_impl/2024/2956/oj"
    description: "The Commission implementing regulation specifying the format of the Register of Information that financial entities must maintain about their ICT third-party arrangements under DORA Article 28."
    domain: "eur-lex.europa.eu"
  - title: "ECB Cyber Resilience Stress Test Methodology"
    url: "https://www.bankingsupervision.europa.eu/press/pr/date/2024/html/ssm.pr240103~38a1ad7039.en.html"
    description: "ECB's methodology for cyber resilience testing of significant banks, including the cloud-arrangement testing scope under DORA."
    domain: "bankingsupervision.europa.eu"
---

DORA Article 30 specifies the contractual content every financial entity must obtain from its ICT third-party providers, including cloud. The substance is long — fifteen distinct clauses — and the operational depth behind each clause is what makes DORA different from previous outsourcing guidance. Most pre-DORA cloud contracts do not meet Article 30; cloud providers serving EU financial entities have spent 2024-2026 rewriting their commercial templates. This article walks through each Article 30 clause, what it means in practice, and what financial entities and cloud providers actually negotiate around it.

## Where Article 30 sits in DORA

[DORA](./dora-for-cloud-financial-sector-overlay) imposes obligations on financial entities (ICT risk management, incident reporting, operational resilience testing, third-party risk management, information sharing). Within third-party risk management, **Article 30** is the contractual specification — what the financial entity's contract with its ICT third-party provider must contain.

Article 30 sits alongside:
- **Article 28** — general obligations on the financial entity for ICT third-party arrangements.
- **Article 29** — preliminary assessment of ICT concentration risk.
- **Article 30** — contractual arrangements (this article's focus).
- **Articles 31-44** — the [CTPP regime](./dora-ctpp-regime-direct-esa-supervision).

Article 30 applies to **all** ICT third-party arrangements supporting critical or important functions, not only to CTPP-designated providers. Every financial entity's cloud contract must meet it.

## The fifteen clause categories

Article 30(2) and 30(3) specify the required contractual content. The list groups into fifteen distinct categories:

1. **Service description** — clear and complete description of all functions and services.
2. **Service locations** — places where data is processed and stored.
3. **Service levels** — quantitative and qualitative performance targets, including KPIs.
4. **Data availability, authenticity, integrity, confidentiality** — security and data protection provisions.
5. **Personal data access** — provisions for the financial entity's access to its own personal data.
6. **Assistance with incidents** — cooperation provisions including no additional cost.
7. **Cooperation with competent authorities** — including audit and inspection rights.
8. **Termination rights** — clear termination conditions for the financial entity.
9. **Audit rights** — for the financial entity, its competent authority, and external auditors.
10. **Information rights** — access to information necessary to monitor performance and compliance.
11. **Notification of material changes** — to subcontracting or location.
12. **Insurance** — provisions where appropriate.
13. **Business continuity and contingency** — measures, plans, and tested capabilities.
14. **Personnel security and access management** — for the provider's personnel handling financial-entity data.
15. **Exit strategies** — separately specified in detail.

For arrangements supporting **critical or important functions**, additional content is required, including specific terms on subcontracting, data location restrictions, and reinforced audit rights.

## Service description — what counts as "clear and complete"

The contractual service description must specify, at a minimum:

- Functional scope — what the service does.
- Technical interfaces — APIs, protocols, integration points.
- Subservice components — what the provider delivers in-house vs through sub-processors.
- Service modes — production, test, development, disaster recovery.

This is more granular than typical pre-DORA cloud master agreements. Many cloud contracts had service descriptions in marketing form ("comprehensive enterprise SaaS platform"). DORA Article 30 expects a description that supports the financial entity's risk assessment — concrete enough that the assessment can identify which functions are critical, where data flows, and what the failure modes are.

In practice, financial entities and cloud providers manage this through **service description documents** referenced from the master agreement, with versioning and change-control mechanics. The master agreement specifies high-level service categories; the referenced documents specify the granular content.

## Service locations — the data-residency clause

Service locations clauses must specify:

- Geographic locations of data storage.
- Locations of data processing.
- Locations of subprocessor operations.
- Locations of support personnel with access to financial-entity data.

This is where [Hyperscaler EU Data Boundary commitments](./hyperscaler-eu-data-boundary-commitments) directly feed into DORA contracts. A cloud provider with documented EU Data Boundary scope can readily complete the service-locations clause. A provider without such documentation must produce it bespoke per contract — operationally expensive.

For arrangements supporting critical or important functions, financial entities increasingly impose **EU-only data location requirements** — meaning the provider must commit to processing and storing data exclusively within the EU/EEA. This is a stricter requirement than Article 30 imposes; it is the financial entity's risk-management overlay on top.

## Service levels — quantitative and qualitative

Article 30 requires service-level descriptions that include **quantitative** targets — uptime percentages, response times, throughput metrics — and **qualitative** descriptions of service quality.

Pre-DORA cloud SLAs typically focused on infrastructure availability with credit-based remedies. DORA expects service levels that:

- Cover service quality, not only infrastructure uptime.
- Are measurable with documented methodology.
- Include thresholds that trigger remediation actions, not only credit calculations.
- Address response times for incident management.

Mature DORA-aligned cloud contracts now include **service-level frameworks** with multiple tiers of metrics, methodology documents, and explicit remediation pathways for SLA breaches that go beyond credit issuance.

## Data availability, authenticity, integrity, confidentiality

The DAIC clause covers the standard CIA-triad plus authenticity. Required content:

- Encryption posture — at rest, in transit, key custody.
- Access control mechanisms.
- Data integrity verification.
- Backup and recovery commitments.
- Confidentiality obligations of provider personnel.

The clause overlaps substantially with [GDPR Article 28 obligations](./gdpr-article-28-and-eu-cloud-code-of-conduct). A cloud provider with strong GDPR Article 28 contractual templates is most of the way to satisfying the DAIC clause. The additional DORA-specific content is around **authenticity** — verifying that data has not been tampered with, including controls on the provider side that prevent unauthorised modification.

This is also where customer-controlled encryption ([BYOK / HYOK](./cloud-encryption-key-custody-byok-hyok)) increasingly appears in financial-sector contracts. Financial entities with high-sensitivity workloads prefer arrangements where the cloud provider's plaintext access is cryptographically constrained.

## Assistance with incidents — the cooperation clause

The cooperation clause requires the provider to assist with incident management **at no additional cost**. The "no additional cost" wording matters — it prevents providers from monetising incident-cooperation as a premium service.

The substance covered:

- Incident detection and notification to the financial entity.
- Information provision for the financial entity's classification and reporting under DORA Article 19.
- Technical investigation support.
- Remediation cooperation.
- Post-incident review participation.

The 24-hour clock under DORA (initial notification to competent authority within 24 hours of incident classification) drives operational requirements on the cooperation clause. Cloud providers must support customer reporting within timelines that allow customers to meet the 24-hour deadline — meaning the cloud provider needs an established incident-cooperation interface, not ad-hoc handling.

## Cooperation with competent authorities

The provider must cooperate with the financial entity's competent authority, including:

- Providing information requested by the competent authority through the financial entity.
- Allowing on-site inspections of provider facilities by the competent authority where necessary.
- Cooperating with [CTPP designation](./dora-ctpp-regime-direct-esa-supervision) processes where applicable.

For cloud providers that are also CTPP-designated, this cooperation includes the direct supervisory relationship with the Lead Overseer in addition to indirect relationships flowing through individual customers' competent authorities.

## Audit rights — the most contentious clause

Article 30(3)(e) for critical-or-important-function arrangements specifies reinforced audit rights including:

- **Right of access** for the financial entity, its competent authority, and external auditors mandated by the financial entity.
- **On-site inspections** at provider facilities.
- **Information access** including technical details necessary for the audit.
- **Frequency** — periodic audits with frequency proportionate to risk.
- **No restrictions** that would prevent the audit's effectiveness.

This is the single most contentious clause in DORA contract negotiations. Cloud providers traditionally restricted on-site audits because allowing every financial customer to send auditors to data centres is operationally unmanageable. DORA forces a different model.

Mature DORA-aligned cloud contracts handle audit rights through:

- **Pooled audit programmes** — where an industry consortium of financial entities jointly commissions an audit, with results shared among consortium members.
- **Audit alternatives** — where the cloud provider commissions an independent audit (often the SOC 2 or BSI C5 audit programme) and provides expanded access to the underlying audit work papers, subject to NDA.
- **Direct audits for material customers** — where a large financial customer is granted direct audit rights on its own arrangements, subject to scheduling and coordination.

The practical compromise: pooled audits + expanded SOC 2 / C5 disclosure handles most customers; direct audits are reserved for the largest financial customers or for incidents where specific verification is needed.

## Information rights — operational data, not marketing data

The information rights clause requires access to information necessary for the financial entity to monitor the provider's performance and compliance. This goes beyond marketing material:

- Operational metrics — incident rates, SLA performance, capacity utilisation.
- Risk-management information — control effectiveness, audit findings, vulnerability management.
- Compliance information — certifications, attestations, regulatory communications.
- Sub-processor information — full list with risk assessments.

Cloud providers operationalise this through **structured customer reporting** — monthly or quarterly reports to large financial customers, with content tailored to DORA expectations. The reporting cadence and content is typically negotiated; standardisation across customers is operationally easier than bespoke reporting.

## Notification of material changes

Material changes that require advance notification include:

- Subcontracting changes — new sub-processors, removed sub-processors, changes in subprocessor roles.
- Service location changes — adding or removing locations from the service-locations declaration.
- Material architecture changes affecting risk profile.
- Changes in regulatory or supervisory status.

The notification period is typically 90 days for material changes, though DORA does not prescribe a specific period. Financial entities negotiate notification periods based on the materiality of the change and the financial entity's ability to react.

## Termination and exit strategies — the planning clause

Article 30 requires clear termination conditions. For arrangements supporting critical or important functions, **exit strategies** are separately specified and must include:

- **Documented exit plan** — describing how the financial entity would transition away from the provider.
- **Data return or destruction** — provisions for the financial entity's data at exit.
- **Migration assistance** — provider support during exit transition.
- **Continuity period** — service continuation during exit at agreed terms.
- **Tested capabilities** — exit plans should be tested, not only documented.

The exit-strategy requirement is one of DORA's clearest practical innovations. Pre-DORA cloud contracts often had bare-bones termination clauses; DORA expects detailed, operational, tested exit plans.

For cloud providers, supporting customer exit strategies requires:

- Data export capabilities in non-proprietary formats.
- Documented migration paths and transition support.
- Service-continuity commitments during exit.
- Capability to test exit procedures with cooperative customers.

For financial entities, the exit-strategy obligation means **maintaining a real alternative**, not just a theoretical one. This connects to the **concentration risk** consideration: a financial entity heavily reliant on a single cloud provider must demonstrably maintain the capability to migrate.

## Business continuity and contingency

Provider business continuity commitments include:

- Documented BCP/DR plans.
- Tested recovery capabilities.
- Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO).
- Communications protocols during incidents and recoveries.

For arrangements supporting critical or important functions, the BCP/DR commitments must be tested with customer participation where feasible. Cloud providers serving systemically important banks have established BCP test programmes that engage customers in scenario exercises.

## Personnel security and access management

Personnel-related clauses cover:

- Background checks for provider personnel with access to customer data.
- Access management — least-privilege, just-in-time, audit-logged.
- Restrictions on offshore support access to data of EU financial entities.
- Confidentiality and security obligations of personnel.

For [Hyperscaler EU Data Boundary](./hyperscaler-eu-data-boundary-commitments)-aligned services, the personnel-access dimension matters — the Boundary commitment is undermined if EU customer data can be accessed by support personnel outside the EU during incident handling. Mature DORA contracts include specific personnel-location and access-control commitments.

## Insurance provisions

Where appropriate, the contract should include insurance provisions covering:

- Provider's liability insurance.
- Cyber-incident insurance.
- Coverage adequacy for the financial entity's risk profile.

This is one of the lighter-weight Article 30 clauses operationally — insurance terms are typically standardised by the provider and rarely materially negotiated.

## The Register of Information — Article 28 connection

Article 28 requires financial entities to maintain a **Register of Information** about their ICT third-party arrangements. The register feeds into the ESAs' CTPP designation process and serves as the financial entity's own management tool.

Commission Implementing Regulation 2024/2956 specifies the register format. For cloud providers, the practical implication is that financial customers will request structured information about the cloud arrangement in the register format — service description, location data, subprocessor list, criticality classification — that the cloud provider may not have in that format natively.

Cloud providers serving multiple financial entities have built **register-data export capabilities** that produce the required information in the standardised format. Cloud providers that handle this bespoke per customer add operational overhead that becomes painful at scale.

:::tip[Architectural Pro Tip]
For a cloud provider serving EU financial entities, the highest-leverage Article 30 work is **building a structured DORA contract template** with the fifteen clause categories as separate sections, each with a default position and a documented range of negotiable variations. Financial entities present their own contract requirements; the cloud provider that can map their requirements to the template positions in hours rather than weeks closes deals faster and accumulates less contractual drift across customers. The cloud providers who treat each DORA contract as a fresh negotiation create operational fragmentation that becomes ungovernable above 50-100 financial customers.
:::

## What customers typically push hardest on

*From the customer (financial entity) perspective:*

In actual DORA contract negotiations with cloud providers, financial entities push hardest on:

1. **Audit rights** — particularly on-site audit access, even where pooled audit programmes exist.
2. **Data location restrictions** — EU-only commitments, with documented exceptions.
3. **Subcontracting transparency** — full subprocessor list, change notification periods, veto rights on certain subprocessor categories.
4. **Exit assistance commitments** — specific quantitative commitments (e.g., "30 days of free continuation service post-termination").
5. **Concentration risk acknowledgements** — clauses recognising the customer's regulatory obligation to manage concentration.

*From the CSP perspective:*

Cloud providers push back on:
- Direct on-site audit rights at the data-centre level (preferring pooled audits + expanded SOC 2 / C5 disclosure).
- Veto rights on subprocessors (preferring notification with right to terminate).
- Open-ended exit assistance commitments (preferring time-bounded commitments with clear scope).

The contractual middle ground is now reasonably well-established across the EU financial sector. First-time DORA contract negotiations are slower and more expensive than renewals once both sides have established their positions.

## DORA, [GDPR Article 28](./gdpr-article-28-and-eu-cloud-code-of-conduct), and the contract stack

For a financial entity processing personal data via cloud:

- **GDPR Article 28** governs the controller-processor relationship.
- **DORA Article 30** governs the operational-resilience relationship.
- **National outsourcing rules** (where they exist beyond DORA) may add further content.

In practice, mature contracts integrate these layers:

- A **base contract** covering commercial terms.
- A **DORA annex** covering Article 30 content.
- A **GDPR DPA** (Data Processing Agreement) covering Article 28 content.
- Sector-specific annexes (Finanstilsynet for Norway, FINMA 2018/3 alignment for Swiss banks, NBS-specific for Slovak banks).

The annexes are typically standardised by the cloud provider with bespoke variations for individual customers; the base contract is more commercially negotiated.

:::warning[Reality Check]
Cloud providers serving the EU financial sector commonly publish a "DORA-ready" claim that, on inspection, turns out to be a contract template update without the underlying operational capability to deliver on the clauses. The cooperation-with-incidents clause requires an established 24-hour cooperation interface; the audit-rights clause requires a real audit-handling function; the exit-strategy clause requires tested migration capabilities. A contractual template that promises these without operational backing fails at first material incident or audit request. Financial entities verifying DORA-readiness should ask about the operational backing of each Article 30 clause, not only the contract template's contents.
:::

## Closing checklist

- DORA Article 30 specifies the contractual content for ICT third-party arrangements supporting critical or important functions. Fifteen distinct clause categories.
- Service description must be granular enough to support risk assessment. Use referenced service-description documents with versioning.
- Service locations clauses connect to [Hyperscaler EU Data Boundary](./hyperscaler-eu-data-boundary-commitments) commitments. EU-only restrictions are common at financial-entity discretion.
- Service levels must be quantitative + qualitative with measurable methodology. Move beyond credit-based remedy frameworks.
- Cooperation with incidents is at no additional cost and supports the financial entity's 24-hour notification cadence.
- Audit rights are the most contentious clause. Pooled audit programmes + expanded SOC 2 / C5 disclosure handles most cases; direct audits reserved for largest customers.
- Exit strategies must be documented, operational, and tested. Maintaining a real alternative addresses concentration risk.
- The Register of Information under Article 28 requires structured data export from cloud providers. Build register-data export capability.
- Build a structured DORA contract template; avoid bespoke-per-customer drift.
- Three-layer contract stack: base contract + DORA annex (Article 30) + GDPR DPA (Article 28) + sector-specific annexes as needed.
- See [DORA overview](./dora-for-cloud-financial-sector-overlay) for the broader framework, [CTPP regime article](./dora-ctpp-regime-direct-esa-supervision) for the direct supervision layer, and [Reading Attestation Reports](./reading-cloud-attestation-reports-practitioner-guide) for evaluating the audit reports that support Article 30 evidence.
