---
title: "Czechia — NÚKIB and the New Cybersecurity Act: NIS2 Without a Dedicated Cloud Scheme"
category: compliance
tags: ["Czechia", "NUKIB", "Cybersecurity Act", "NIS2", "Compliance", "Data Security"]
date: 2026-05-06
updated: 2026-05-15
readTime: 10
level: intermediate
excerpt: "Czechia has no dedicated cloud qualification framework. Cloud security is regulated horizontally through the new Cybersecurity Act (264/2025 Sb.), effective 1 November 2025, with a full implementing-decree stack already in force (408, 409, 410/2025 Sb. and others). NÚKIB supervises; CSPs are assessed as supply-chain participants."
references:
  - title: "NÚKIB — National Cyber and Information Security Agency"
    url: "https://nukib.gov.cz/"
    description: "Official portal of NÚKIB — the Czech national cyber and information security authority. Guidance, regulatory texts, and supervisory activity."
    domain: "nukib.gov.cz"
  - title: "New Czech Act on Cybersecurity — English Summary"
    url: "https://portal.nukib.gov.cz/informace/legislativa/english-new-czech-act-on-cybersecurity"
    description: "NÚKIB's English-language summary of Act 264/2025 Sb. — scope, obligations of regulated subjects, supply-chain expectations, and NIS2 transposition mechanics."
    domain: "portal.nukib.gov.cz"
  - title: "Act 264/2025 Sb. — Czech Cybersecurity Act"
    url: "https://www.zakonyprolidi.cz/cs/2025-264"
    description: "Full text of the Czech Cybersecurity Act of 19 June 2025, effective 1 November 2025 — the statute that replaced Act 181/2014 Sb. and implements NIS2."
    domain: "zakonyprolidi.cz"
  - title: "Cybersecurity Laws and Regulations — Czech Republic (ICLG)"
    url: "https://iclg.com/practice-areas/cybersecurity-laws-and-regulations/czech-republic"
    description: "ICLG's practitioner overview of Czech cybersecurity legislation, including the supervisory powers of NÚKIB and the sanctions regime under the new act."
    domain: "iclg.com"
  - title: "Act 205/2017 Sb. — Establishment of NÚKIB"
    url: "https://www.zakonyprolidi.cz/cs/2017-205"
    description: "The 2017 statute that established NÚKIB as a separate authority from the former NBÚ — defines NÚKIB's mandate and institutional position."
    domain: "zakonyprolidi.cz"
  - title: "Vyhláška 408/2025 Sb. — Criteria for Regulated Entities"
    url: "https://www.zakonyprolidi.cz/cs/2025-408"
    description: "NÚKIB implementing decree on criteria for determining regulated entities and higher/lower obligations regime classification under Act 264/2025 Sb."
    domain: "zakonyprolidi.cz"
  - title: "Vyhláška 409/2025 Sb. — Security Measures (Higher Regime)"
    url: "https://www.zakonyprolidi.cz/cs/2025-409"
    description: "NÚKIB decree on security measures for providers of regulated services in the higher obligations regime."
    domain: "zakonyprolidi.cz"
  - title: "Vyhláška 410/2025 Sb. — Security Measures (Lower Regime)"
    url: "https://www.zakonyprolidi.cz/cs/2025-410"
    description: "NÚKIB decree on security measures for providers in the lower obligations regime."
    domain: "zakonyprolidi.cz"
---

Czechia does not operate a dedicated cloud qualification scheme on the model of Slovakia's KsVC or Italy's ACN Qualificazione. The earlier cloud-catalogue concept under Act 365/2000 Sb. was retired; cloud security is now regulated horizontally through the cybersecurity regime that applies to all in-scope information systems. The operative legal instrument is Act 264/2025 Sb. — the new Cybersecurity Act, effective 1 November 2025 — which transposes NIS2 and replaces the previous Act 181/2014 Sb. This article walks through how cloud security is actually regulated in Czechia and what it means for CSPs.

## The system at a glance

Czechia regulates cybersecurity, including cloud, through a single horizontal framework rather than a dedicated cloud catalogue or qualification scheme. The framework is administered by **Národní úřad pro kybernetickou a informační bezpečnost (NÚKIB)** — National Cyber and Information Security Agency. NÚKIB is based in Brno and was established by Act 205/2017 Sb., separating the cybersecurity agenda from the former National Security Authority (NBÚ).

The operative law is **Act 264/2025 Sb. on Cybersecurity**, adopted 11 June 2025, published in the Collection of Laws on 4 August 2025, **effective 1 November 2025**. It replaced Act 181/2014 Sb. and implements the NIS2 Directive into Czech law. Unlike Slovakia, where the implementing-decree stack lagged the new act, NÚKIB issued the full implementing-regulation set alongside Act 264/2025 — see the Legislative basis section below for the specific decrees.

The earlier concept of a *Cloud Computing in Information Systems of Public Administration Catalogue* — discussed in older versions of Act 365/2000 Sb. — was retired. There is no equivalent public catalogue under the new regime. Cloud security is treated as a supply-chain dimension of the cybersecurity obligations imposed on regulated subjects.

## Legislative basis

The legislative stack:

- **Act 264/2025 Sb. on Cybersecurity** — effective 1 November 2025. Replaces Act 181/2014 Sb. and implements NIS2.
- **Act 205/2017 Sb.** — establishment of NÚKIB as a separate authority.

Secondary regulation — **issued, in force**:

- **Vyhláška 408/2025 Sb.** — criteria for determining regulated entities and the higher/lower obligations regime classification.
- **Vyhláška 409/2025 Sb.** — security measures for providers of regulated services in the **higher** obligations regime.
- **Vyhláška 410/2025 Sb.** — security measures in the **lower** obligations regime.
- A further set of vyhlášky and two government regulations completes the implementing package (the total set comprises seven decrees and two government regulations). NÚKIB has additionally published a Manual for lower-regime providers (January 2026) and municipal-cybersecurity support material (TLP:CLEAR, v1.1, 5 January 2026).

The Czech approach differs from countries with cloud-specific decrees (Italy's Determinazione 307/2022) or methodological guidelines (Slovakia's MIRRI). The Czech framework operates from a single horizontal statute with supporting secondary regulation. The implementing-decree stack was issued alongside the new act — Czechia avoided the lag-style gap that Slovakia and Finland are currently dealing with.

## Scope of obligation

Act 264/2025 Sb. significantly expands the set of regulated subjects ("regulované osoby") in line with NIS2. The categories:

- **Essential entities** (NIS2 essential entities, *kľúčové subjekty*).
- **Important entities** (NIS2 important entities, *dôležité subjekty*).
- **Cloud computing service providers** are within the digital infrastructure sector of NIS2 Annex I — when they exceed the size thresholds, they are essential entities.

For regulated subjects, the obligations cover:

- Risk management for information systems.
- Incident notification.
- Supply chain management — including assessment of cloud providers as supply-chain participants.

The supply-chain dimension is the operational hook for cloud security. Czech regulated subjects must assess their cloud providers' security posture, and NÚKIB has the supervisory authority to verify those assessments.

## Classification model

Czechia does **not** use a formal multi-tier cloud-service classification on the SK/IT/ES model. The classification is at the **information-system level**, not the cloud-service level:

- Elements of **critical infrastructure**.
- Information systems of **essential services** (NIS2 essential entities).
- **Significant information systems** of public administration.
- Other information systems of public administration.

The classification of the information system drives the security obligations of the operator. The operator then assesses cloud providers in the context of those obligations — there is no separate cloud-service certification level.

This is a fundamentally different model. SK/IT/ES classify both the data/system and the cloud service, with a relationship rule. Czechia classifies the system and treats the cloud provider as supply chain.

## Evaluation criteria

The reference standards in the Czech framework are:

- **[ISO/IEC 27001](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines)** and the broader 27000 family — referenced as compliance baseline.
- **NIST Cybersecurity Framework** — referenced in NÚKIB guidance.
- **[NIS2 supply-chain expectations](/knowledge-base/compliance/nis2-supply-chain-cloud-providers)** — the operative bar for cloud provider assessment.
- **Vyhláška 409/2025 Sb.** (higher regime) and **vyhláška 410/2025 Sb.** (lower regime) — the binding security-measures sets that regulated subjects implement and against which cloud providers are assessed as supply-chain participants. Both decrees follow the NIS2 risk-management orientation.

NÚKIB has retired the old static-classification approach in favour of risk-management-based assessment under Act 264/2025 and the implementing decrees. The framework is operative end-to-end; CSPs serving Czech regulated subjects today work against the 409/2025 and 410/2025 control sets as supply-chain evidence.

## The assessment process

The framework does not certify CSPs directly. The assessment process operates through the regulated subject:

- The regulated subject (essential or important entity) is required to manage cybersecurity risk including supply chain.
- The regulated subject assesses its cloud providers' security posture based on available evidence — typically ISO 27001/27017/27018, SOC 2, BSI C5, EU Cloud CoC, and any other relevant attestations.
- NÚKIB performs supervisory activity, audits, and inspections of regulated subjects. The supervision may extend to the regulated subject's supply-chain practices.

For CSPs, the practical implication is that there is no Czech-specific certification to obtain. The work is to ensure the standard international attestations are current and relevant to the supply-chain assessment the Czech regulated subject must perform.

## Catalogue and recertification

There is **no public marketplace or catalogue of qualified cloud services** under the Czech framework. This is a structural choice — the framework relies on horizontal cybersecurity regulation rather than catalogue-driven procurement control.

Recertification of underlying attestations follows the cadence of those attestations (typically annual for Type 2 attestations, three-yearly for ISO certifications). NÚKIB's supervisory activity is risk-based and event-driven rather than calendar-driven.

## Sanctions and oversight

NÚKIB has substantial supervisory powers under Act 264/2025 Sb.:

- Imposition of **corrective measures** on regulated subjects.
- **Temporary prohibition of management function** — up to 6 months for responsible individuals.
- For non-compliance with corrective measures, **fines** up to **€10 million or 2% of turnover** for essential entities, **€7 million or 1.4%** for important entities — the NIS2 sanction levels.

The management-function prohibition is unusual among EU NIS2 transpositions and is one of the more pointed enforcement tools in the Czech framework.

For the **financial sector**, **DORA** (Regulation (EU) 2022/2554) applies independently of NÚKIB regulation. Financial institutions must report major ICT incidents to the **Česká národní banka (ČNB)** within **24 hours**. DORA's Critical Third-Party Provider regime can designate hyperscalers as critical and bring them under direct European supervision by the ESAs. The Czech banking sector consumes substantial cloud services; DORA is the operative framework for that consumption rather than Act 264/2025 Sb., although the two overlap in practice.

:::tip[Architectural Pro Tip]
For a CSP serving the Czech market, the practical question is not "how do I get Czech certified" — there is no such certification. The question is "what evidence will my Czech enterprise and public-sector customers need to satisfy their supply-chain obligations under Act 264/2025 Sb. and [DORA](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay)". The answer is: current [ISO 27001/27017/27018](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines), current [SOC 2 Type 2](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them) or [BSI C5](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation), an [EU Cloud Code of Conduct](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct) adherence statement, and demonstrable incident reporting capabilities aligned with 24-hour NIS2/DORA timelines. Build the evidence package for those frameworks; let the Czech customer use it for their supply-chain assessment.
:::

## Sovereignty posture

Czechia does **not** impose explicit cloud sovereignty rules. There are no ownership caps, no headquartering requirements, no immunity-from-extraterritorial-law clauses on cloud providers serving Czech subjects.

The Czech approach to sovereignty is to require security and resilience without prescribing the corporate structure of providers. Hyperscalers operate readily in the Czech market for both public and private sectors.

## Multicloud factor

For multinational CSPs, the Czech framework is one of the simpler EU markets:

- No country-specific certification to obtain.
- Standard international attestations (ISO, SOC 2, BSI C5, EU Cloud CoC) are accepted as supply-chain evidence.
- Customers' supply-chain assessments are the operational interaction point, not a regulatory submission.
- Incident reporting expectations are NIS2-aligned (24h/72h) and DORA-aligned for financial sector (24h to ČNB).

The work is in making the standard evidence package available to Czech customers and providing operational support for their supply-chain assessments. There is no separate compliance project for Czechia in the way there is for Slovakia, Italy, or France.

:::warning[Reality Check]
The horizontal-regulation model is operationally lighter for CSPs but heavier for *consumers*. A Czech essential entity is responsible for assessing its cloud providers; there is no central authority that has pre-certified the provider for them. Customers that come to a CSP without a structured supply-chain assessment process find this difficult. CSPs that invest in providing **consumable supply-chain assessment evidence** — packaged documentation, mapped to NIS2 expectations, with current attestations — earn significant goodwill from Czech customers navigating the new act for the first time.
:::

## Closing checklist

- Czechia has no dedicated cloud qualification scheme. Cloud security is regulated horizontally through Act 264/2025 Sb. — the Cybersecurity Act effective 1 November 2025 — which transposes NIS2.
- NÚKIB is the supervisory authority. The framework expanded substantially with the new act, bringing more subjects into scope as essential or important entities.
- Cloud providers are assessed as supply-chain participants by the regulated subject, not certified directly by NÚKIB. There is no public catalogue.
- Reference standards are ISO/IEC 27001 and adjacent norms; NIST CSF is referenced in NÚKIB guidance. **The implementing-decree stack is in force**: vyhláška 408/2025 (regulated-entities criteria), 409/2025 (higher-regime security measures), 410/2025 (lower-regime), plus further decrees and government regulations. Czechia avoided the lag-style framework/law gap.
- Sanctions follow NIS2: up to €10 million or 2% turnover for essential entities; up to €7 million or 1.4% for important entities. Management-function prohibition up to 6 months is an additional enforcement tool.
- DORA applies independently for the financial sector with 24-hour major-incident reporting to ČNB.
- For CSPs, the practical evidence package is the same as for most EU markets: ISO 27001/27017/27018, SOC 2 Type 2 or BSI C5, EU Cloud CoC adherence, demonstrable incident reporting capability.
- The CSP work is supplying Czech customers with consumable supply-chain assessment evidence, not obtaining Czech-specific certification. This is operationally simpler than the SK/IT/FR routes.
- **What to read next:** [NIS2 Supply Chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers) for the customer-side obligation Czech regulated subjects must satisfy; [ISO 27001/27017/27018](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines) and [SOC 2](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them) for the international evidence baseline; [Slovakia KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) and [Poland KSC](/knowledge-base/compliance/poland-ksc-cybersecurity-system) for adjacent CEE regulatory comparisons.
