---
title: "GDPR Article 28 and the EU Cloud Code of Conduct — What They Actually Demonstrate"
category: compliance
tags: ["GDPR", "EU Cloud CoC", "Article 28", "Compliance", "Data Security", "Cross-Cutting", "Privacy"]
date: 2026-04-09
updated: 2026-04-09
readTime: 10
level: advanced
excerpt: "GDPR Article 28 is the operative article for every controller-processor cloud relationship. The EU Cloud Code of Conduct is the most pragmatic instrument for demonstrating Article 28 compliance at scale. This article walks through what Article 28 actually requires and what the CoC actually demonstrates."
references:
  - title: "GDPR — Regulation (EU) 2016/679"
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679"
    description: "The General Data Protection Regulation — the EU regulation governing personal data processing. Article 28 covers the controller-processor relationship; Chapter V covers third-country transfers."
    domain: "eur-lex.europa.eu"
  - title: "EU Cloud Code of Conduct"
    url: "https://eucoc.cloud/"
    description: "The EU Cloud Code of Conduct — GDPR Article 40 code approved by the Belgian DPA in May 2021. The voluntary instrument for demonstrating GDPR Article 28 compliance in cloud services."
    domain: "eucoc.cloud"
  - title: "EU Cloud CoC — Adopted Document (EDPB)"
    url: "https://www.edpb.europa.eu/system/files/2024-02/eucloudcoc.pdf"
    description: "The European Data Protection Board's adopted version of the EU Cloud Code of Conduct."
    domain: "edpb.europa.eu"
  - title: "SCOPE Europe — Monitoring Body for EU Cloud CoC"
    url: "https://scope-europe.eu/en/projects/eu-cloud-code-of-conduct"
    description: "SCOPE Europe srl, the Brussels-based monitoring body accredited by the Belgian Data Protection Authority in May 2021 to operate the EU Cloud CoC."
    domain: "scope-europe.eu"
  - title: "EDPB — Code of Conduct Register"
    url: "https://www.edpb.europa.eu/our-work-tools/accountability-tools/register-code-of-conduct/2021/eu-cloud-code-conduct_en"
    description: "The EDPB's register entry for the EU Cloud Code of Conduct, including the formal approval documentation."
    domain: "edpb.europa.eu"
---

GDPR Article 28 is the operative article for every controller-processor cloud relationship in the EU. Every public administration article in this series references it, every national framework demands evidence of alignment with it, and every cloud provider's procurement conversation eventually arrives at it. The **EU Cloud Code of Conduct** is the most pragmatic instrument for demonstrating Article 28 compliance at scale — and it is the only EU-wide cloud compliance instrument currently in widespread production use. This article walks through what Article 28 actually requires, what the CoC actually demonstrates, and where the limits sit.

## Article 28 — what it actually requires

GDPR Article 28 governs the relationship between a **controller** (the entity that determines purposes and means of processing) and a **processor** (the entity that processes personal data on the controller's behalf). For cloud, the controller is the customer and the processor is the cloud provider — almost always. The article requires:

**Sufficient guarantees** — the controller must use only processors providing sufficient guarantees to implement appropriate technical and organisational measures to meet GDPR requirements and protect the data subject's rights.

**Binding contract or other legal act** — the processing must be governed by a contract or other legal act binding the processor to the controller. The contract must include specific content:

- Subject matter, duration, nature, and purpose of the processing.
- Type of personal data and categories of data subjects.
- Obligations and rights of the controller.

The processor must, under the contract:

- Process personal data only on documented instructions from the controller.
- Ensure persons authorised to process data are bound to confidentiality.
- Implement appropriate security measures per Article 32.
- Engage sub-processors only with prior controller authorisation.
- Assist the controller in fulfilling data subject rights requests.
- Assist the controller with security obligations, data breach notifications, DPIAs, and prior consultation with supervisory authorities.
- Delete or return data at end of provision of services.
- Make available all information necessary to demonstrate compliance and allow audits.

**Sub-processors** — the processor cannot engage sub-processors without prior specific or general written authorisation. When engaging sub-processors, the processor imposes the same data protection obligations on them by contract.

Article 28 is operationally demanding. A cloud provider that has not designed its commercial agreements and operational processes to deliver on every clause is not Article-28-compliant, regardless of any certification it holds.

## Where Article 28 sits relative to the national frameworks

Every national framework in this series references GDPR (and therefore Article 28) but handles it differently:

- **Slovak KsVC** references ISO/IEC 27018 and 27701 as Article-28-aligned controls; the methodology requires GDPR-aligned data processing.
- **Spanish ENS** RD 311/2022 explicitly aligns with GDPR; the auditor verifies GDPR-aligned processing as part of the ENS audit.
- **German BSI C5** requires regulatory disclosure obligations that surface jurisdictional exposure relevant to GDPR Chapter V transfers.
- **French SecNumCloud** requires GDPR compliance as a baseline qualification requirement and adds sovereignty constraints that exceed Article 28.
- **Italian ACN Qualificazione** integrates Italian Privacy Code obligations (Italian implementation of GDPR) into the qualification criteria.

The national frameworks add country-specific obligations on top of GDPR. They do not substitute for Article 28 compliance — they assume it.

## The EU Cloud Code of Conduct — what it actually is

The EU Cloud Code of Conduct is a **Code of Conduct under GDPR Article 40**, approved by the **Belgian Data Protection Authority** on **20 May 2021** based on a positive opinion from the European Data Protection Board (EDPB Opinion 16/2021).

Article 40 codes are voluntary, sector-specific instruments designed to demonstrate GDPR compliance for a defined category of processing activities. The EU Cloud CoC is the Article 40 code specifically designed to demonstrate **GDPR Article 28 compliance for cloud services**.

The code has five sections:
- Scope.
- Data Protection.
- Security Requirements.
- Monitoring and Compliance.
- Internal Governance.

The substantive content maps cloud-service-specific obligations to:
- ISO/IEC 27001, ISO/IEC 27017, ISO/IEC 27018.
- SOC 2.
- BSI C5.

A cloud provider with one of these existing attestations has substantial evidence already in place for CoC adherence.

## The three adherence levels

The EU Cloud CoC offers **three adherence levels** that differ by **evidence type**, not by content:

| Level | Evidence form | What it demonstrates |
|---|---|---|
| **Level 1** | Self-declaration with documented evidence | The cloud provider declares CoC adherence and documents its compliance internally. Lowest assurance. |
| **Level 2** | Third-party validated evidence (typically ISO/SOC reports) | The cloud provider's compliance is validated by reference to existing third-party attestations (ISO 27001, ISO 27018, SOC 2, BSI C5). Mid-tier assurance. |
| **Level 3** | Third-party assured / certified evidence | The cloud provider's compliance is assured by a third party against the CoC controls directly. Highest assurance. |

The control content is the same across the levels. What changes is the strength of the underlying evidence.

For most large cloud providers, **Level 2** is the operational target. It maps existing audit evidence (which is typically being produced anyway for SOC 2, ISO 27001, C5) into the CoC framework and produces a public adherence declaration.

## Who adheres and where to find it

EU Cloud CoC adoption is broad among major cloud providers. Public adherents include:

- **AWS** — Level 2.
- **Microsoft Azure** — Level 2 (Verification ID 2021LVL02SCOPE116).
- **Google Cloud** — Level 2.
- **Google Workspace** — Level 2.
- **Alibaba Cloud** — multiple services.
- **IBM Cloud** — multiple services.
- **Oracle** — multiple services.
- **Salesforce** — multiple services.
- **SAP** — multiple services.
- **Fabasoft** — multiple services.

The adherence register is published at `eucoc.cloud`. Adherence statements include the cloud service in scope, the adherence level, the verification ID, and the validity dates.

Since 2024, EU Cloud CoC adherences are **co-published in the CSA STAR Registry**, providing an additional discovery surface.

## SCOPE Europe — the monitoring body

The EU Cloud CoC is operated by **SCOPE Europe srl** — a Brussels-based monitoring body accredited by the Belgian DPA in May 2021. SCOPE Europe:

- Performs the adherence evaluation for each cloud service.
- Conducts annual re-evaluations of adherence.
- Operates ad-hoc evaluations triggered by complaints, media reports, or new legislation that may affect adherence.
- Manages the public adherence register.

The monitoring body model is required by Article 41 of GDPR — Article 40 codes must have an accredited monitoring body to be operative. SCOPE Europe's accreditation by the Belgian DPA is what gives the EU Cloud CoC its GDPR-aligned status.

## The Third Country Transfer Module

The EU Cloud CoC includes a **Third Country Transfer Module** — a supplementary module covering transfers of personal data to third countries under GDPR Chapter V. The module:

- Applies on top of the base CoC adherence (a cloud provider must hold base adherence before adding the transfer module).
- Provides additional safeguards aligned with the EDPB's recommendations on transfer impact assessments.
- Addresses the Schrems II decision's requirements on supplementary measures.

The transfer module is the cloud-industry's answer to the post-Schrems-II uncertainty around standard contractual clauses (SCCs). It provides a structured framework for assessing and documenting transfer risks specific to cloud services. As of mid-2026, transfer-module adherence is increasing but is not yet as broadly adopted as base CoC adherence.

## What the EU Cloud CoC does *not* demonstrate

The CoC is GDPR Article 28 alignment plus an optional Chapter V transfer module. It is **not**:

- A national framework certification (KsVC, ENS, ACN, SecNumCloud, BSI C5 are separate).
- A sectoral compliance instrument (DORA, NIS2 are separate).
- A security certification per se — security is one of the five sections, but the core focus is GDPR alignment.
- A substitute for the actual controller-processor contract — Article 28 still requires the binding legal act between controller and processor.

The CoC is a **complementary instrument** that reduces the assessment burden on the controller and increases the verifiability of the processor's commitments. It does not eliminate any obligation; it streamlines demonstrating them.

## Operationalising Article 28 with the CoC

For a cloud provider designing Article 28 alignment:

1. **Article 28 contract template** — the binding legal act with the controller. Include all required content (sub-processor authorisation, instruction-only processing, deletion/return obligations, audit rights, etc.). This is the operative legal instrument.
2. **Underlying operational controls** — actually deliver on the contract. Identity management for instruction sources, sub-processor authorisation workflow, deletion mechanisms, breach notification process, DPIA assistance.
3. **CoC adherence** — typically Level 2 — to provide public verifiable demonstration of the commitments.
4. **Underlying attestations** — ISO 27018, ISO 27701, SOC 2 — that feed Level 2 evidence.
5. **Transfer module** if data leaves the EU.

The CoC is the publication layer; the underlying contract and operational controls are the substance.

:::tip[Architectural Pro Tip]
For a cloud provider, the most efficient Article 28 programme designs the underlying operational controls to ISO 27018 + ISO 27701, audits those as part of the annual ISO programme, declares EU Cloud CoC Level 2 adherence using the ISO evidence, and publishes the adherence in both `eucoc.cloud` and the CSA STAR Registry. The marginal cost over the ISO programme is small; the public-trust signal is large. Cloud providers who pursue Article 28 alignment as a contracts-only project frequently find themselves unable to operationalise their contractual commitments under audit; the operational programme has to come first.
:::

## The CoC in the SK / CEE context

For Slovak organisations and cloud providers in CEE:

- **Slovak data protection** is GDPR-aligned via Act 18/2018 Z. z. (and earlier instruments). Article 28 applies directly.
- The Slovak DPA — **Úrad na ochranu osobných údajov SR** — recognises Article 40 codes including the EU Cloud CoC. CoC adherence does not require additional Slovak DPA recognition.
- Slovak controllers in KsVC-scope (public administration) typically reference CoC adherence as part of supplier due diligence. KsVC application form 1A includes data protection considerations consistent with Article 28.

For cloud providers serving Slovak public-sector customers, CoC Level 2 adherence is the standard accompanying evidence for the Article 28 contract layer.

:::warning[Reality Check]
"GDPR compliant" on a cloud provider's marketing page is not the same as Article 28 alignment, and certainly not the same as a binding Article 28 contract with verifiable operational controls. The two most common procurement traps: (1) accepting a cloud provider's privacy policy as a substitute for an Article 28 contract — privacy policies cover controller-to-data-subject relationships, not controller-to-processor; (2) accepting CoC Level 1 self-declaration as equivalent to Level 2 third-party-validated. Verify the level and the underlying evidence.
:::

:::tip[Slovak context]
For Slovak organisations, GDPR is supplemented by **Act 18/2018 Z. z.** on personal data protection — the Slovak implementing law that aligns with GDPR's substantive content and designates the **Úrad na ochranu osobných údajov SR (ÚOOÚ SR)** as the supervisory authority. Article 28 obligations apply directly without national-specific divergences in substance. ÚOOÚ SR recognises Article 40 codes including the EU Cloud Code of Conduct; CoC adherence does not require additional Slovak recognition. For Slovak public-sector controllers operating in [KsVC](./slovakia-ksvc-mirri-government-cloud) scope, Article 28 contracts with cloud providers are reviewed alongside the catalogue-listing evidence; CoC Level 2 adherence is the standard accompanying signal.
:::

## Closing checklist

- GDPR Article 28 governs the controller-processor relationship for every cloud service handling personal data of EU residents. The binding contract content requirements are explicit and non-negotiable.
- The EU Cloud Code of Conduct is the **GDPR Article 40 code** specifically for cloud services, approved by the Belgian DPA on 20 May 2021. The most pragmatic instrument for demonstrating Article 28 compliance at scale.
- Three adherence levels differ by evidence type: Level 1 self-declared, Level 2 third-party validated (typical for hyperscalers), Level 3 third-party assured.
- Monitoring body: **SCOPE Europe srl**, Brussels. Accredited by the Belgian DPA.
- Adopted by AWS, Microsoft Azure, Google Cloud, IBM, Oracle, SAP, Salesforce, Alibaba, and many others. Register at `eucoc.cloud`; co-published in CSA STAR Registry since 2024.
- The **Third Country Transfer Module** addresses Chapter V transfer obligations post-Schrems II. Layer on top of base CoC adherence.
- The CoC is a complementary instrument. It does not replace the Article 28 contract, the underlying operational controls, or sector-specific compliance (DORA, NIS2).
- Operational programme: ISO 27018 + ISO 27701 → SOC 2 → CoC Level 2 declaration. The CoC is the publication layer; the operational substance is the ISO and SOC 2 work.
- See the [ISO baselines article](./iso-27001-27017-27018-27701-cloud-baselines) for the underlying privacy and PII standards, and the [CSA STAR article](./csa-star-registry-cross-cutting-trust-layer) for the co-publication relationship.
