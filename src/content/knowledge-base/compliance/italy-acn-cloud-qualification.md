---
title: "Italy — ACN Qualificazione: The Most Procedural Cloud Framework in the EU"
category: compliance
tags: ["Italy", "ACN", "Qualificazione", "NIS2", "Compliance", "Data Security", "PSN", "Sovereignty"]
date: 2026-04-30
updated: 2026-04-30
readTime: 11
level: intermediate
excerpt: "Italy's qualification framework is the most formally structured in the EU — statutory timelines, four levels, mandatory public catalogue, and a state-controlled Polo Strategico Nazionale for the strictest workloads."
references:
  - title: "ACN — Cloud Qualification Strategy"
    url: "https://www.acn.gov.it/portale/en/strategia-cloud-italia"
    description: "Agenzia per la Cybersicurezza Nazionale's English-language strategy page covering the Italy Cloud Strategy and the qualification framework for public administration cloud services."
    domain: "acn.gov.it"
  - title: "ACN — Cloud Qualification and Adjustment Process"
    url: "https://www.acn.gov.it/portale/en/cloud/qualificazione-e-adeguamento"
    description: "Official documentation of the qualification process for private providers and the adjustment process (adeguamento) for public and in-house cloud infrastructure."
    domain: "acn.gov.it"
  - title: "ACN — Cloud Infrastructure and Services Catalogue"
    url: "https://www.acn.gov.it/portale/en/catalogo-delle-infrastrutture-digitali-e-dei-servizi-cloud"
    description: "The public catalogue of qualified cloud services and infrastructure for Italian public administration — the authoritative register maintained by ACN."
    domain: "acn.gov.it"
  - title: "ACN Cloud FAQ"
    url: "https://www.acn.gov.it/portale/en/faq/cloud"
    description: "ACN's FAQ on cloud qualification, the QC1–QC4 levels, the catena di qualificazione doctrine, and the relationship to Polo Strategico Nazionale."
    domain: "acn.gov.it"
  - title: "Cloud Italia — Qualificazione Servizi Cloud"
    url: "https://cloud.italia.it/qualificazione-servizi-cloud/"
    description: "The Italian government's cloud portal explaining the qualification process for cloud services targeted at public administration."
    domain: "cloud.italia.it"
  - title: "D.Lgs. 4 settembre 2024, n. 138 — Italian NIS2 Transposition"
    url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2024-09-04;138"
    description: "The Italian NIS2 transposition. Published in Gazzetta Ufficiale 1 October 2024; in force since 16 October 2024. Phased compliance for cloud, datacentre, and domain providers."
    domain: "normattiva.it"
  - title: "Determinazione ACN n. 127437/2026 — NIS2 Fornitori Rilevanti"
    url: "https://www.acn.gov.it/portale/it/normativa"
    description: "Supplementary ACN determinazione on the classification of NIS2 'relevant suppliers' (fornitori rilevanti), operating alongside Regolamento 21007/24 rather than replacing it."
    domain: "acn.gov.it"
---

Italy's cloud qualification framework is the most procedurally formal in the EU. Statutory evaluation timelines, four qualification levels for services and another four for infrastructure, a mandatory public catalogue, periodic monitoring with explicit 6-month consumer reporting, and the Polo Strategico Nazionale that absorbs the strictest workloads. The Italian model is what happens when a country decides to industrialise cloud qualification rather than treat it as a security guidance exercise. This article walks through how it works.

## The system at a glance

The framework is **Qualificazione dei servizi cloud e delle infrastrutture cloud per la Pubblica Amministrazione** — Qualification of cloud services and infrastructure for Public Administration. It is administered by the **Agenzia per la Cybersicurezza Nazionale (ACN)** in coordination with the **Dipartimento per la Trasformazione Digitale (DTD)**. ACN took over from AgID on 19 January 2023.

The current operating rules are in the **Regolamento unico per le infrastrutture digitali e i servizi cloud per la PA** — Direttoriale Decree no. **21007/24 of 27 June 2024** — which superseded the transitional regime and established the steady-state framework as of 1 August 2024.

Submissions are made via PEC (certified email) to `acn@pec.acn.gov.it` and through the ACN supplier portal. The public catalogue is at `https://www.acn.gov.it/portale/it/catalogo-delle-infrastrutture-digitali-e-dei-servizi-cloud`.

## Legislative basis

The Italian framework is anchored in an explicit statutory and decretal stack:

- **Decreto-Legge no. 82 of 14 June 2021** — established ACN.
- **Art. 33-septies of Decreto-Legge no. 179 of 2012** — provides the statutory basis for cloud service qualification and for the Polo Strategico Nazionale.
- **Direttoriale Decree no. 29 of 2 January 2023** — ACN's acceptance of the qualification mandate from AgID.
- **Determinazione no. 307 of 18 January 2022** and Annex — the technical-organisational measures the qualified services must implement.
- **Determinazione no. 306 of 18 January 2022** — the classification model for public-administration data and services.
- **Direttoriale Decree no. 20610 of 28 July 2023** — modifications.
- **Direttoriale Decree no. 2927 of 30 January 2024** — extension of the transitional regime.
- **Direttoriale Decree no. 21007/24 of 27 June 2024** — the steady-state regulation, effective 1 August 2024.
- **D.Lgs. 4 settembre 2024, n. 138** — the Italian NIS2 transposition. Published in Gazzetta Ufficiale on 1 October 2024, **entered into force on 16 October 2024**. Phased compliance: registration window December 2024 – February 2025 (17 January 2025 for cloud, datacentre, and domain providers); ACN list of regulated entities finalised 31 March 2025; basic notification obligations from January 2026; basic security measures by October 2026.
- **Determinazione ACN no. 127437/2026** — supplementary determinazione on classification of NIS2 *fornitori rilevanti* (relevant suppliers). Operates alongside Decree 21007/24 rather than replacing it.

The level of decretal detail is unusual. Most national cloud frameworks operate from guidance documents; the Italian framework operates from a stack of legally binding decrees with explicit numbers, dates, and effective periods. The QC/QI/AI classification nomenclature is described in the consolidated Regolamento 21007/24 text; readers seeking the exact label scheme should consult that document directly.

## Scope of obligation

The obligation is categorical:

- **All Italian public administration** must purchase cloud services exclusively from qualified services listed in the ACN catalogue.
- For **strategic or critical data**, additional restrictions apply — often directing workloads to the **Polo Strategico Nazionale (PSN)**.

The PSN is the Italian state-controlled cloud infrastructure operated by a consortium of TIM, CDP Equity, Leonardo, and Sogei. It operates from four data centres at Acilia, Pomezia, Rozzano, and Santo Stefano Ticino. PSN is the destination for strategic and critical Italian public-sector workloads; commercial providers can qualify to coexist on PSN through partnerships.

## Classification model — QC and QI tiers

Two parallel classification axes:

**Data and service classification** (Determinazione 306/2022):

- **Ordinari** — ordinary public-sector data.
- **Critici** — critical data.
- **Strategici** — strategic data.

**Qualification levels for services** (Qualifica del Servizio Cloud):

- **QC1, QC2, QC3, QC4** — increasing strictness.

**Qualification levels for infrastructure** (Qualifica dell'Infrastruttura):

- **QI1, QI2, QI3, QI4** — for cloud infrastructure providers.

For public or in-house infrastructure, the equivalent designations are **AI1–AI4** (Adeguamento Infrastruttura). The QI/AI distinction is whether the qualification is for a commercial provider (QI) or an in-house public/state-controlled infrastructure (AI).

**LIV4** — the QC4 / QI4 / AI4 tier — is the strictest. It applies to *Strategici* data and critical infrastructure, and in practice routes to the PSN.

The framework operationalises an additional doctrine: **principio di filiazione** or **catena di qualificazione** — the qualification chain. A qualified service may only be delivered on a substrate qualified at the same level or higher. A QC4 SaaS cannot sit on a QC2 PaaS; the PaaS must also be QC4 or above. This propagates qualification depth through the stack.

## Evaluation criteria

The criteria are in the Annex to Determinazione 307/2022 — a comprehensive set of technical-organisational measures. The set covers the standard cloud security domains (organisation, IAM, encryption, network, operations, incident response, continuity) with Italian-specific elaboration.

The assessment route differs by provider type:

- **Private providers** — ex-ante verification by ACN, followed by publication in the catalogue.
- **Public or in-house infrastructure** — *dichiarazione di conformità* (declaration of conformity) submitted to ACN. This is a self-declaration model used for state-controlled and public-administration in-house infrastructure.

The split reflects the framework's assumption that state-controlled infrastructure (the PSN, for example) operates under sufficient internal oversight to use self-declaration, while commercial providers require external verification.

## The assessment process

The qualification process for private providers follows a statutory timeline:

1. **Registration** of the provider on the ACN supplier portal.
2. **Profile creation** for the CSP and submission of the qualification request electronically.
3. **ACN verification of compliance** — ordinarily completed **within 60 days** (Article 19 of Regolamento 21007/24). For infrastructure adjustment, the verification is **within 30 days** (Article 14).
4. **Outcome notification and catalogue publication** — within **15 days** of completion of verification.
5. **Ex-post monitoring** — every **6 months**, the qualified provider must submit a list of public administration entities consuming its services (requirement MON-01).

The 6-month consumer reporting requirement is unusual. It gives ACN visibility into the actual market penetration of each qualified service and creates an audit trail of supply-side and demand-side compliance.

## Catalogue and recertification

The catalogue is at `https://www.acn.gov.it/portale/it/catalogo-delle-infrastrutture-digitali-e-dei-servizi-cloud`. It is the authoritative register of qualified cloud services and infrastructure for Italian public administration.

An additional procurement marketplace — **MEPA (Mercato elettronico della PA)**, operated by CONSIP — provides the procurement layer. A service that is in the ACN catalogue and on MEPA is purchasable by public administration through a defined procurement channel.

Recertification:

- **36 months** validity for qualification and adjustment.
- **Renewal request** must be submitted **at least 90 days before expiration**. Filing 90 days early allows the existing qualification to extend until the administrative procedure for renewal completes — protection against gaps caused by ACN processing time.

The 36-month cycle is longer than most EU frameworks ([Spain's ENS](/knowledge-base/compliance/spain-ens-national-security-framework) is 2 years; [ANSSI SecNumCloud](/knowledge-base/compliance/france-anssi-secnumcloud-qualification) is 3 years with annual surveillance). The longer cycle is balanced by the 6-monthly consumer reporting, which provides interim oversight.

## Sanctions and oversight

ACN performs periodic checks under Determinazione 307/2022. The sanctioning mechanism:

- For non-compliance, ACN can require remediation.
- If remediation is not provided, ACN can **suspend or revoke** the qualification.
- Suspension or revocation results in immediate removal from the catalogue and inability to provide services to public administration.
- NIS2 sanctions under Decreto Legislativo 138/2024 (the Italian NIS2 transposition) apply independently to in-scope subjects.

The catalogue lock-out is the operational consequence — same model as the Slovak KsVC, but with the additional industrial-policy dimension of the PSN.

:::tip[Architectural Pro Tip]
For a CSP targeting the Italian public-sector market, the realistic strategic question is which qualification level to target. QC1 and QC2 cover the bulk of ordinary public-administration workloads and are achievable for international CSPs operating standard EU regions. QC3 introduces stricter sovereignty-adjacent requirements. **QC4 / LIV4 is effectively PSN territory** — the framework expects strategic workloads to land on state-controlled infrastructure, and commercial providers participate through partnerships rather than independent qualification. Plan the qualification roadmap accordingly: QC2 for breadth, QC3 selectively, QC4 only via PSN partnership.
:::

## Sovereignty posture

The Italian sovereignty posture is **layered**:

- **QC1 / QC2** — no strict sovereignty constraints. Hyperscalers participate readily.
- **QC3** — stricter operational requirements that include jurisdictional considerations.
- **QC4 / LIV4** — effectively routed to **PSN**. The strategic-data tier is reserved for state-controlled infrastructure operated by Italian entities. Hyperscalers can serve the substrate through partnerships (PSN operates on hyperscaler technology in some configurations), but the qualification is held by the PSN operator, not the underlying technology provider.

The PSN is the Italian answer to the SecNumCloud question. Rather than imposing ownership rules across the framework, Italy partitions: commercial qualification for ordinary and critical data, PSN for strategic data. This is more accommodating to hyperscalers than the French model while still preserving sovereignty at the top tier.

## Multicloud factor

The Italian framework is structurally rigorous but operationally tractable for multinational CSPs:

- The 60-day statutory evaluation timeline gives CSPs predictable planning windows.
- The 36-month validity reduces the audit treadmill compared to the 24-month ENS cycle.
- The catena di qualificazione doctrine requires careful service composition — every layer in the stack must be qualified at the target level or higher.
- The 6-monthly consumer reporting is an unusual operational requirement; CSPs need a process to assemble the consumer list and submit it on cadence.
- The PSN partnership route exists for hyperscalers wanting access to LIV4 workloads — Microsoft, Google, and AWS all have established or in-progress PSN-related arrangements.
- **NIS2 obligations under D.Lgs. 138/2024** (in force since 16 October 2024) apply to CSPs above the size thresholds **independently** of ACN Qualificazione. The decree's phased compliance — registration window December 2024 – February 2025 (17 January 2025 for cloud/datacentre/domain providers), ACN regulated-entities list finalised 31 March 2025, basic notification obligations from January 2026, basic security measures by October 2026 — runs in parallel with QC qualification cycles. A CSP planning Italian public-sector market entry today runs both tracks at once.

A hyperscaler typically targets QC2 for the broad commercial public-administration market and engages with PSN through formal partnerships for the QC4 / LIV4 tier.

:::warning[Reality Check]
The catena di qualificazione doctrine catches CSPs off-guard more often than it should. A SaaS provider qualifying at QC3 will find the verification process examining its underlying PaaS and IaaS qualification levels. If the PaaS is QC2 and the IaaS is QC1, the SaaS qualification cannot be QC3 — the chain has to be consistent. This is logical in retrospect but disruptive in planning, particularly for SaaS providers built on commercially available PaaS layers from other vendors. Verify the qualification level of every dependency before designing the qualification roadmap.
:::

## Closing checklist

- ACN Qualificazione is the most procedurally formal national cloud framework in the EU. Statutory evaluation timelines, four service levels (QC1–QC4), four infrastructure levels (QI1–QI4 or AI1–AI4), and a public catalogue.
- Mandatory for all Italian public administration purchasing. Non-listed services cannot be purchased.
- Strategic-data tier (QC4 / LIV4) routes to **Polo Strategico Nazionale** — state-controlled infrastructure. Hyperscalers participate through partnerships, not direct qualification.
- The **catena di qualificazione** doctrine requires every layer in the service stack to be qualified at the target level or higher. Verify dependencies before planning.
- Evaluation timeline: 60 days for services, 30 days for infrastructure adjustment, 15 days for catalogue publication. 36-month validity, 90-day renewal window.
- 6-monthly consumer reporting (MON-01) is a unique operational requirement. Plan a process to assemble and submit the consumer list.
- Sanctions are catalogue-based: suspension or revocation removes the service from the catalogue, ending public-administration access. NIS2 sanctions under D.Lgs. 138/2024 apply independently.
- The framework is operationally tractable for hyperscalers at QC1–QC2, requires sovereignty-adjacent work at QC3, and is effectively PSN-only at QC4. Plan the roadmap accordingly.
- **What to read next:** [Sovereign Cloud Products](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape) for PSN partnership routes and sovereign cloud landscape; [NIS2 Supply Chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers) for D.Lgs. 138/2024 supply-chain obligations running parallel to QC qualification; [ISO 27001/27017](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines) for the international baseline ACN audit reuses.
