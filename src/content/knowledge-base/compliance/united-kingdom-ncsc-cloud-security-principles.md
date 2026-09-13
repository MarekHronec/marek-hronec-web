---
title: "United Kingdom — NCSC Cloud Security Principles and the Post-Brexit Position"
category: compliance
tags: ["United Kingdom", "NCSC", "Cloud Security Principles", "Compliance", "Data Security", "Adjacent Jurisdiction"]
date: 2026-05-12
updated: 2026-09-13
readTime: 10
level: intermediate
excerpt: "The UK left the EU but kept GDPR (as UK GDPR), kept ISO standards, and did not adopt EUCS. NCSC's 14 Cloud Security Principles are the operative UK government cloud guidance, with Cyber Essentials and Cyber Essentials Plus as the certification scheme. For EU CSPs serving UK customers (and UK CSPs serving EU customers), the regime is adjacent but distinct."
references:
  - title: "NCSC Cloud Security Guidance"
    url: "https://www.ncsc.gov.uk/collection/cloud"
    description: "The UK National Cyber Security Centre's cloud security guidance — the 14 Cloud Security Principles and supporting implementation guidance."
    domain: "ncsc.gov.uk"
  - title: "NCSC 14 Cloud Security Principles"
    url: "https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles"
    description: "The 14 principles framework — Data in Transit Protection, Asset Protection and Resilience, Separation Between Customers, Governance Framework, Operational Security, Personnel Security, Secure Development, Supply Chain Security, Secure User Management, Identity and Authentication, External Interface Protection, Secure Service Administration, Audit Information and Alerting for Customers, Secure Use of the Service."
    domain: "ncsc.gov.uk"
  - title: "Cyber Essentials"
    url: "https://www.ncsc.gov.uk/cyberessentials/overview"
    description: "The UK's government-backed certification scheme for basic cyber hygiene — Cyber Essentials (self-assessment) and Cyber Essentials Plus (independently verified)."
    domain: "ncsc.gov.uk"
  - title: "ICO — UK GDPR"
    url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/"
    description: "The UK Information Commissioner's Office guidance on UK GDPR — the UK's post-Brexit data protection regime, substantively equivalent to EU GDPR with some divergences."
    domain: "ico.org.uk"
  - title: "HM Treasury designates the first Critical Third Parties"
    url: "https://www.bankofengland.co.uk/news/2026/july/uk-financial-regulators-to-begin-overseeing-critical-third-parties-announced-by-hmt"
    description: "The Bank of England's 10 July 2026 announcement of the first four CTP designations — AWS EMEA SARL, Google Cloud EMEA Ltd, Microsoft Ireland Operations Ltd and Oracle Corporation UK Ltd — with oversight from 13 July 2026."
    domain: "bankofengland.co.uk"
  - title: "PRA SS2/21 — Outsourcing and third party risk management"
    url: "https://www.bankofengland.co.uk/prudential-regulation/publication/2021/march/outsourcing-and-third-party-risk-management-ss"
    description: "The Prudential Regulation Authority's supervisory statement, published 29 March 2021 following PS7/21; the current version is November 2024, effective 31 December 2024."
    domain: "bankofengland.co.uk"
  - title: "Data (Use and Access) Act 2025"
    url: "https://www.legislation.gov.uk/ukpga/2025/18/contents"
    description: "2025 c. 18, Royal Assent 19 June 2025 — the data protection reform Act that succeeded the abandoned DPDI Bill, assessed by the Commission before it renewed UK adequacy."
    domain: "legislation.gov.uk"
  - title: "UK Data Protection Act 2018"
    url: "https://www.legislation.gov.uk/ukpga/2018/12/contents"
    description: "The UK Data Protection Act 2018 as amended for the post-Brexit environment — the domestic data protection legislation that complements UK GDPR."
    domain: "legislation.gov.uk"
---

The United Kingdom left the EU on 31 January 2020. The UK cloud security framework that has settled since is **adjacent to but distinct from** the EU regime: UK GDPR replaced EU GDPR (with the same content, plus divergences); NCSC's 14 Cloud Security Principles are the operative UK government cloud guidance; Cyber Essentials and Cyber Essentials Plus are the certification scheme; and EUCS does not apply. For Slovak organisations and EU-headquartered cloud providers with UK customers — and UK organisations consuming EU cloud services — the regime is operationally close but procedurally separate. This article walks through the UK landscape.

## The system at a glance

The UK does not have a single national cloud certification scheme analogous to KsVC, ENS, or ACN. The framework is composed of:

- **NCSC 14 Cloud Security Principles** — the UK government's guidance on what good cloud security looks like. Not a certification; a framework against which providers and consumers assess.
- **Cyber Essentials** — a basic government-backed cyber hygiene certification (self-assessment).
- **Cyber Essentials Plus** — Cyber Essentials with independent verification.
- **UK GDPR + Data Protection Act 2018** — the data protection regime.
- Sector-specific regulation (FCA Handbook and the PRA rulebook for financial services, NHS England’s Data Security and Protection Toolkit for healthcare, MoD requirements for defence).

Network and information systems security sits under the **NIS Regulations 2018**, the retained UK version of NIS1. The **Cyber Security and Resilience Bill** would replace them, but it is still in Parliament.

Cloud-using public-sector organisations follow the **Crown Commercial Service (CCS)** procurement frameworks — G-Cloud being the most prominent — which incorporate NCSC principles into procurement criteria.

The framework is operationally more like the Czech NÚKIB or Polish KSC model than the catalogue-driven Slovak or Italian models. There is no central register of "approved" cloud services; assessment happens at procurement time against the principles.

## The 14 NCSC Cloud Security Principles

The 14 principles cover the standard cloud security domains:

| # | Principle |
|---|---|
| 1 | Data in Transit Protection |
| 2 | Asset Protection and Resilience |
| 3 | Separation Between Customers |
| 4 | Governance Framework |
| 5 | Operational Security |
| 6 | Personnel Security |
| 7 | Secure Development |
| 8 | Supply Chain Security |
| 9 | Secure User Management |
| 10 | Identity and Authentication |
| 11 | External Interface Protection |
| 12 | Secure Service Administration |
| 13 | Audit Information and Alerting for Customers |
| 14 | Secure Use of the Service |

Each principle is documented with implementation guidance from NCSC, covering both provider-side and consumer-side responsibilities (analogous to ISO 27017's dual-role treatment).

The 14 principles **map cleanly to [ISO/IEC 27017](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines) and [CSA CCM](/knowledge-base/compliance/csa-star-registry-cross-cutting-trust-layer)**. A cloud provider with strong ISO 27001/27017/27018 evidence has substantial alignment with the NCSC principles already. The principles are intentionally non-prescriptive on specific controls — they describe outcomes, not implementations.

## Cyber Essentials and Cyber Essentials Plus

The two certification levels:

- **Cyber Essentials** — self-assessment against five technical controls (boundary firewalls, secure configuration, access control, malware protection, patch management). Externally verified by a certification body but based on the applicant's self-assessment. Annual renewal.
- **Cyber Essentials Plus** — independent technical verification by an external assessor against the same five controls. More rigorous than Cyber Essentials. Annual renewal.

For cloud providers selling to UK government:

- Cyber Essentials is the minimum bar for most government contracts.
- Cyber Essentials Plus is required for contracts handling sensitive information or above certain value thresholds.

Cyber Essentials is **not** equivalent to ISO 27001 — it covers a much narrower scope (five technical controls vs ISO's full ISMS). It is operationally lighter weight and easier to obtain, by design. Mature providers hold Cyber Essentials Plus as a UK-market signal alongside their international attestations.

## UK GDPR

UK GDPR is the UK's domestic implementation of GDPR after Brexit. Substantively, it is the same regulation with some divergences:

- **Same Article 28 obligations** on processors.
- **Same data subject rights**.
- **Same fines** (up to £17.5 million or 4% of global turnover).
- **UK Data Protection Act 2018** provides the implementing detail and the role of the Information Commissioner's Office (ICO).

Adequacy: the Commission adopted adequacy decisions for the UK in June 2021, making EU→UK transfers of personal data straightforward. Those decisions did not simply roll on. They were due to expire on 27 June 2025, were held over by a short technical extension, and were **replaced on 19 December 2025** by two renewed decisions — one under GDPR Article 45, one under Article 36 of the Law Enforcement Directive. The renewals carry a sunset clause: they expire on **27 December 2031** unless extended. UK→EU transfers are unrestricted under UK rules.

For cloud providers, UK GDPR practically means the same Article 28 work as EU GDPR. The contractual structure is similar; the audit posture is similar; the operational substance is similar. The procedural distinctness is in the supervisor (ICO instead of national EU DPAs) and the legal instruments (UK courts, UK SCCs equivalent).

## Sector-specific regulation

**Financial services** are regulated under the FCA Handbook (and PRA Rulebook for systemically important firms). Cloud-relevant guidance:

- **PRA SS2/21** — "Outsourcing and third party risk management", published 29 March 2021 alongside Policy Statement **PS7/21**. This is a **Prudential Regulation Authority** statement, and it applies to dual-regulated firms: UK banks, building societies, PRA-designated investment firms, Solvency II insurers including the Society of Lloyd’s, and UK branches of overseas banks and insurers. The current version is November 2024, effective 31 December 2024; a further version published 18 March 2026 takes effect 18 March 2027. FCA solo-regulated firms sit outside it, under FG16/5 and SYSC.
- **Operational resilience requirements** — UK equivalents to elements of DORA, through the **Critical Third-Party (CTP) regime**, the UK analogue of the EU's CTPP regime. This is no longer a paper power. HM Treasury made the **first designations on 10 July 2026** — Amazon Web Services EMEA SARL, Google Cloud EMEA Limited, Microsoft Ireland Operations Ltd and Oracle Corporation UK Limited — and the Bank of England, PRA and FCA began overseeing them on **13 July 2026** under the Critical Third Parties (Designation) Regulations 2026. HM Treasury decides designations; the regulators supervise and review them.

**Healthcare** is regulated under the **Data Security and Protection Toolkit**, published by **NHS England** — NHS Digital merged into it in 2023 and no longer exists as a separate body. The current release is **version 8.0.0 (12 August 2025)**, and it is aligned to two things, not one: the National Data Guardian’s 10 data security standards **and** the NCSC Cyber Assessment Framework. Version 8 brought the CAF route in for independent providers designated as NIS operators of essential services and for genomics organisations. Cloud providers serving NHS organisations must support the Toolkit assessment.

**Defence** has additional requirements under MoD policy, including Defence Standard 05-138 for cyber security of defence supplier infrastructure.

## What UK does *not* have

The UK approach is intentionally lighter than several EU national frameworks:

- **No national cloud catalogue** mandating approval before consumption.
- **No multi-tier classification** model for cloud services analogous to U1-U4 / Básica-Alta / QC1-QC4.
- **No EUCS participation** — the UK does not adopt EU certification schemes.
- **No SecNumCloud equivalent** — the UK has not imposed ownership-based sovereignty requirements on cloud providers serving government.

This reflects a deliberate policy posture favouring procurement flexibility over centralised registration. Combined with the EU adequacy decision, it makes the UK one of the more straightforward European markets for cloud providers to serve from a regulatory perspective — assuming the provider already meets EU expectations.

## Cross-border data flow patterns

For EU→UK→EU data flow patterns common in business operations:

- **EU→UK**: covered by the adequacy decision. No SCCs or supplementary measures required.
- **UK→EU**: covered by UK adequacy regulations. Straightforward.
- **EU/UK→US**: covered by Data Privacy Framework (EU-US) and its UK extension. Periodic review required.
- **EU/UK→other third countries**: SCCs and supplementary measures required under both regimes.

For cloud providers operating across both EU and UK, the EU-headquartered approach is operationally more constrained (more frameworks, EUCS aspiration, NIS2 transposition complexity). The UK-headquartered approach is simpler but offers less alignment with EU regulated markets without explicit additional work.

:::tip[Architectural Pro Tip]
For a cloud provider serving both EU and UK customers, the practical compliance package is the same on both sides plus minor additions: [ISO 27001/27017/27018/27701](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines), [SOC 2 Type 2](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them) or [BSI C5](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation), [EU Cloud CoC](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct) Level 2, **Cyber Essentials Plus for UK government contracts**, mapping to NCSC 14 Cloud Security Principles for UK customer documentation, UK GDPR awareness in the contracts. The marginal UK-specific work is small once the EU baseline is in place. Cyber Essentials Plus is the one UK-specific artefact that cannot be derived from EU evidence and is worth obtaining if UK government revenue is material.
:::

## UK and the national frameworks in this series

UK does not participate in the EU cloud certification schemes. For Slovak organisations or cloud providers with UK customers:

- **Slovak public sector** customers operating UK services: data flows under EU adequacy with UK GDPR application on the UK side. KsVC does not extend to UK services; instead, the Slovak public-sector consumer applies its KsVC requirements where it can (typically by procuring the same cloud provider's EU-region service) and falls back on contractual mechanisms for UK-specific scenarios.
- **Slovak commercial entities** serving UK customers: standard cross-border arrangements under UK GDPR + EU GDPR.
- **UK organisations** consuming Slovak or EU cloud services: standard procurement under NCSC principles; EU adequacy makes EU-region service consumption straightforward.

## Brexit divergence — what to watch

The UK has the power to diverge from EU regulation in various dimensions. Cloud-relevant divergences to watch:

- **Data protection** — the "Data Protection and Digital Information (DPDI) Bill" went through multiple iterations in 2023-2024 and was **abandoned before the 2024 general election**. Its successor was enacted: the **Data (Use and Access) Act 2025** (2025 c. 18, Royal Assent 19 June 2025). The Commission assessed it before renewing UK adequacy in December 2025, so the reform and the adequacy renewal are linked. Further substantive divergence from EU GDPR remains the thing that could put the 2031 renewal at risk.
- **Critical Third-Party regime** — now live, with four hyperscalers designated. It may still diverge from DORA in supervisory practice: HM Treasury designates in the UK where the ESAs designate in the EU, and the two designation lists are not identical.
- **The Cyber Security and Resilience Bill** — the successor to the NIS Regulations 2018, and the closest UK counterpart to NIS2. It widens scope to managed service providers and data centres and tightens incident notification. Introduced to the Commons in November 2025, it cleared them in June 2026 and is at report stage in the Lords. It is **not yet an Act**, so nothing in it binds today — but it is the single change most likely to alter the picture this article describes.
- **Cyber Essentials evolution** — the scheme periodically updates its technical control set.
- **AI regulation** — UK has taken a different approach from the EU AI Act, with cloud-AI provider obligations potentially diverging.

As of mid-2026, the substantive cloud security regime is closely aligned with EU expectations. The watch is on whether that alignment persists.

:::warning[Reality Check]
The UK's lighter cloud regulatory posture is sometimes interpreted as "easier" by EU cloud providers expanding into the UK. The procurement process is in some respects lighter — no catalogue listing, no centralised approval — but the **operational expectations from UK government customers are not lighter**. NHS, MoD, and central government departments have detailed security questionnaires, demand specific certifications (Cyber Essentials Plus minimum), and exercise audit rights more readily than some EU public-sector customers. The lighter regulatory regime is the procurement entry point; the operational bar in actual customer engagements is comparable to EU regulated procurement.
:::

## Closing checklist

- The UK framework is composed: NCSC 14 Cloud Security Principles + Cyber Essentials / Cyber Essentials Plus + UK GDPR + sector-specific (FCA, NHS, MoD).
- No central cloud catalogue, no multi-tier classification, no EUCS participation. Procurement-flexible by design.
- NCSC 14 principles map to ISO 27017 and CSA CCM. An EU-aligned cloud provider has substantial UK alignment already.
- Cyber Essentials Plus is the UK-specific artefact worth obtaining for UK government revenue. Annual renewal.
- UK GDPR is substantively equivalent to EU GDPR with the ICO as supervisor. EU adequacy renewed 19 December 2025, valid to 27 December 2031, makes EU↔UK data flow straightforward.
- Financial services: FCA cloud guidance, PRA SS2/21 for dual-regulated firms, and the UK CTP regime — live since 13 July 2026 over AWS, Google Cloud, Microsoft and Oracle.
- Healthcare: NHS England Data Security and Protection Toolkit (v8.0.0, August 2025), aligned to the NDG standards and the NCSC CAF.
- Cross-border: EU↔UK simple via adequacy; UK→other third countries follows UK adequacy regulations + SCCs.
- For Slovak organisations, the practical implication is that UK is the easiest adjacent jurisdiction to extend EU cloud compliance work into. Cyber Essentials Plus + UK GDPR awareness + NCSC principles mapping is the bulk of the UK-specific work.
- Watch items: the Cyber Security and Resilience Bill, CTP regime divergence from DORA, and AI regulation divergence.
- See the [Switzerland article](/knowledge-base/compliance/switzerland-finma-cloud-frameworks) and the [Norway article](/knowledge-base/compliance/norway-nsm-cloud-frameworks) for the other primary non-EU and EEA adjacent jurisdictions in Europe.
