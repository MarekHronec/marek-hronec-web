---
title: "Finland — PiTuKri: Guidance That Doubles as the Gate for Classified Information"
category: compliance
tags: ["Finland", "PiTuKri", "Traficom", "NIS2", "Compliance", "Data Security"]
date: 2026-05-08
updated: 2026-05-08
readTime: 11
level: intermediate
excerpt: "PiTuKri is officially guidance, not statutory. In practice, it is the gate for handling Finnish classified information in the cloud. The Finnish NIS2 transposition (Act 124/2025) has been in force since April 2025; the replacement criteria library is in public consultation and scheduled for finalisation in autumn 2026 — until then, a real gap between the new risk-based law and the 2020 cloud framework exists."
references:
  - title: "Traficom — PiTuKri Criteria for Cloud Services"
    url: "https://www.kyberturvallisuuskeskus.fi/en/publications/criteria-assessing-information-security-cloud-services-pitukri"
    description: "Traficom's official English-language landing page for PiTuKri — the guidance document, the assessment criteria, and the relationship to Facility Security Clearance and the Audit Act."
    domain: "kyberturvallisuuskeskus.fi"
  - title: "PiTuKri v1.1 — Full Document (PDF, English)"
    url: "https://www.kyberturvallisuuskeskus.fi/sites/default/files/media/file/PiTuKri_v1_1_english.pdf"
    description: "The complete PiTuKri v1.1 criteria document — 52 criteria across 11 sub-areas, the reference standards (ISO 27001/27017, BSI C5, CSA CCM, Katakri), and the classification level mapping."
    domain: "kyberturvallisuuskeskus.fi"
  - title: "Finnish Government — New National Criteria Library Announcement"
    url: "https://valtioneuvosto.fi/en/-/10623/security-criteria-for-cloud-services-to-be-updated-with-launch-of-new-national-criteria-library"
    description: "The Finnish government's 2025 announcement of work on a new national criteria library that will replace PiTuKri and the cloud sections of Julkri. Public consultation closed 13 April 2026; cloud criteria scheduled for finalisation in autumn 2026."
    domain: "valtioneuvosto.fi"
  - title: "Kyberturvallisuuslaki (Act 124/2025) — Finnish Cybersecurity Act"
    url: "https://www.finlex.fi/fi/laki/alkup/2025/20250124"
    description: "The Finnish NIS2 transposition law, Act 124/2025, in force since 8 April 2025. Establishes risk-management-based obligations for essential and important entities."
    domain: "finlex.fi"
  - title: "Handling of Classified Documents in Cloud Computing (Finnish Government Publication)"
    url: "https://julkaisut.valtioneuvosto.fi/bitstreams/35b29a5a-52dd-456f-8807-c3545e4422bc/download"
    description: "The Finnish government's policy document on handling national-classified documents (TL II/III/IV) in cloud computing environments."
    domain: "julkaisut.valtioneuvosto.fi"
  - title: "AWS — PiTuKri Compliance"
    url: "https://aws.amazon.com/compliance/pitukri/"
    description: "AWS's PiTuKri compliance documentation, including the ISAE 3000 Type 2 attestation scope and the 183 services covered in the 2024–2025 cycle."
    domain: "aws.amazon.com"
---

PiTuKri — *Pilvipalveluiden turvallisuuden arviointikriteeristö*, the Criteria to Assess the Information Security of Cloud Services — has an unusual position. Officially it is guidance, not statutory law. Operationally it is the assessment standard for cloud services that will handle Finnish classified information, and it is referenced in procurement and in the audits run under the Finnish Audit Act. As of mid-2026, **Finland has a real but temporary framework/law gap**: the NIS2 transposition (Act 124/2025, *Kyberturvallisuuslaki*) has been in force since 8 April 2025 and imposes risk-management-based obligations; PiTuKri v1.1 from 2020 remains the operative cloud criteria document. The replacement national criteria library is in public consultation (deadline 13 April 2026) with cloud criteria scheduled for finalisation in autumn 2026. This article walks through what PiTuKri requires today and where the gap closes.

:::warning[Reality Check]
**Finland has a Slovakia-style framework/law gap, with a known closing date.** Kyberturvallisuuslaki (Act 124/2025) entered into force on 8 April 2025 and is built on the NIS2 risk-management model. PiTuKri v1.1 (2020) predates that regime and uses a pre-NIS2 control-set approach. The new national criteria library is the explicit policy response: public consultation closed 13 April 2026; cloud-criteria sections are scheduled for finalisation in autumn 2026. Until then, both regimes apply in parallel. Plan controls to the risk-based regime now; PiTuKri's successor will codify the same orientation.
:::

## The system at a glance

The framework is **Pilvipalveluiden turvallisuuden arviointikriteeristö (PiTuKri)** — Criteria to Assess the Information Security of Cloud Services. The current version is **v1.1**, published in 2020. The document is published in Finnish and English.

The framework is operated by **Liikenne- ja viestintävirasto Traficom — Kyberturvallisuuskeskus** (the Finnish Transport and Communications Agency, National Cyber Security Centre, NCSC-FI). For information-management entities, the **Tietohallintolautakunta** (Information Management Board) operates the parallel **Julkri** framework — Assessment Criteria for Information Security in Public Administration — which includes cloud-relevant sections.

As of 2025, the Finnish government has begun work on a **new national criteria library** that will replace PiTuKri and the cloud sections of Julkri with a single harmonised set of criteria. The new library is intended to align with NIS2 and incorporate updated practices from international cloud security standards. Public consultation on the draft instructions closed on **13 April 2026**; cloud criteria are scheduled for **finalisation in autumn 2026**. As of mid-2026, PiTuKri v1.1 remains the operative document.

## Legislative basis

PiTuKri sits in an unusual legal position. The framework itself is **guidance**, not a binding statute. Its application is anchored through:

- **Act on the Audits of Information Security in Government Information Systems and Communications Arrangements (1406/2011)** — the "Audit Act". The legal basis for security audits of government information systems.
- **Security Clearance Act (726/2014)** — defines Facility Security Clearance (FSC) and related personnel and entity vetting.
- **Information Management Act (906/2019)** — the basis for the Julkri criteria.
- **Kyberturvallisuuslaki (Act 124/2025)** — the **Finnish NIS2 transposition, in force since 8 April 2025**. Establishes risk-management-based obligations for essential and important entities and is the regulatory regime that the new national criteria library is being built to align with.

PiTuKri itself is not a statutory instrument. Its authority comes from:

- **Procurement requirements** — Finnish public authorities and state administration use PiTuKri to assess cloud services before adoption.
- **Audit Act assessments** — PiTuKri is the de facto framework used in audits performed under the Audit Act.
- **Facility Security Clearance** — a CSP handling classified information requires FSC, and the FSC assessment uses PiTuKri.

The guidance-not-statute position is set to change with the new national criteria library, which will likely have statutory standing.

## Scope of obligation

The intended scope is to ensure protection of information that must be kept secret and of classified information when processed in cloud services. The classification levels in scope are:

- Public information.
- National information that must be kept confidential but is not formally classified.
- **TL IV** ('SUOJATTU', national RESTRICTED).
- **TL III** ('LUOTTAMUKSELLINEN', national CONFIDENTIAL).
- **TL II** ('SALAINEN', national SECRET).

PiTuKri's recommended use is for public authorities and for service providers serving them. For information classified TL III or above, the framework recommends a national cloud, strict localisation requirements, and exclusion of third-country authority access.

## Classification model

PiTuKri does not have intrinsic levels. The framework's "levels" are the **classification of the information** being processed:

- Information that is not classified — light controls apply.
- TL IV (RESTRICTED) — full PiTuKri assessment expected.
- TL III (CONFIDENTIAL) — PiTuKri plus national cloud preference plus strict third-country exclusion.
- TL II (SECRET) — typically not appropriate for commercial cloud; classified-information-specific handling under Katakri.

The framework's design assumption is that the classification of the data determines the controls, rather than the cloud service having a level of its own.

## Evaluation criteria

PiTuKri v1.1 contains **52 criteria across 11 sub-areas**:

- Framework Conditions.
- Security Management.
- Personnel Security.
- Physical Security.
- Communications Security.
- Identity and Access Management.
- Information Systems Security.
- Encryption.
- Operational Security.
- Continuity.
- Change Management.

The reference standards on which PiTuKri is built:

- **[ISO/IEC 27001 and 27017](./iso-27001-27017-27018-27701-cloud-baselines)**.
- **[BSI C5](./germany-bsi-c5-cloud-attestation)**.
- **[Cloud Security Alliance Cloud Controls Matrix (CCM)](./csa-star-registry-cross-cutting-trust-layer)**.
- **Katakri 2015** — the Finnish national audit tool for public authorities. Used in parallel for assessing organisations handling classified information.

The framework imposes strict requirements on:

- Physical localisation of data and operations.
- Jurisdictional exposure.
- Separation of duties.
- Traceability of access and operations.

## The assessment process

The assessment pathway combines several distinct instruments:

- **Facility Security Clearance (FSC)** under the Security Clearance Act — validity is **5 years** for the FSC itself and **3 years** for clearance of information systems and telecommunications arrangements.
- **Certificate of Security Conformity** under the Audit Act.
- **ISAE 3000 Type 2 attestation** against PiTuKri criteria — the route used by global CSPs. AWS reports 183 services in scope for the October 2024 – September 2025 attestation cycle; Microsoft and Google publish equivalent attestations.

Assessment is performed by Traficom directly or by accredited third-party auditors. For ISAE 3000 attestations, the standard cloud-audit firms (EY, KPMG, PwC, BDO) perform the work.

## Catalogue and recertification

Finland does **not** maintain a public catalogue of approved cloud services in the SK/IT/FR style. CSPs publish their own attestations through their trust centres. Traficom maintains internal records of assessments performed and clearance documents issued, but these are not a public marketplace.

Recertification:

- **ISAE 3000 Type 2** — annual.
- **Facility Security Clearance** — 5-year validity.
- **Information systems / telecom clearance** — 3-year validity.

The 5-year FSC cycle is longer than most other frameworks, balanced by annual ISAE 3000 cadence and the periodic Audit Act assessments.

## Sanctions and oversight

PiTuKri is guidance; direct sanctions for non-compliance with PiTuKri itself are not imposed. Sanctions flow through related statutes:

- **Disclosure of classified information** — Finnish Penal Code and the Security Clearance Act.
- **NIS2 violations** — Finnish *Kyberturvallisuuslaki* (NIS2 transposition).
- **Loss of Facility Security Clearance** — the practical consequence is loss of the right to handle classified information.

The FSC mechanism is the operative enforcement layer. A CSP that holds FSC and loses it loses access to the classified-information segment of the Finnish market.

## Sovereignty posture

PiTuKri's sovereignty posture is differentiated by classification level:

- **TL IV** and below — international CSPs are accepted, subject to PiTuKri assessment and FSC.
- **TL III** and above — national cloud preference; strict third-country authority access exclusion; jurisdictional exposure assessed carefully.

In the EUCS debate, Finland has been on the more permissive side regarding strict sovereignty rules at the EU level, consistent with the PiTuKri posture of differentiating by classification rather than excluding non-EU providers categorically.

## Multicloud factor

PiTuKri is one of the more accommodating frameworks for multinational CSPs at TL IV and below:

- The 52-criterion control set maps to the standard cloud security baseline (ISO 27001/27017, C5, CCM). A CSP holding C5 has substantial portable evidence.
- ISAE 3000 Type 2 is the established attestation form, identical to what is used for C5 and SOC 2. Joint audits are feasible.
- The 11 sub-areas align closely with the standard cloud-security taxonomy used by AWS, Microsoft, and Google in their trust centres.

For TL III and above, the picture changes. The national cloud preference and third-country authority exclusion narrow the field; sovereign-oriented offerings or partnerships with Finnish-controlled entities become necessary.

:::tip[Architectural Pro Tip]
For a CSP targeting Finnish public-sector cloud at TL IV and below, the most efficient evidence base is a **combined C5 + PiTuKri ISAE 3000 Type 2 attestation** issued by the same audit firm in a single engagement. The control overlap is approximately 70–80%; the system descriptions are reusable; the marginal cost of producing both attestations from one audit is modest. CSPs that run PiTuKri independently of their C5 audit duplicate work without commensurate gain.
:::

## The 2025–2026 transition — new national criteria library

The Finnish government announced in 2025 the development of a new national criteria library that will:

- Replace PiTuKri v1.1.
- Absorb the cloud sections of Julkri.
- Align with the Kyberturvallisuuslaki (Act 124/2025) risk-management model.
- Incorporate updated cloud security practices from international standards.

Status as of mid-2026:

- Public consultation on the draft instructions **closed on 13 April 2026**.
- Cloud-criteria sections are scheduled for **finalisation in autumn 2026**.
- Coverage extends to national security classifications and explicitly supports risk management.
- PiTuKri v1.1 remains operative until the new library lands; migration timelines for CSPs holding current PiTuKri attestations are not yet final.

The transition matters because it may give the resulting framework statutory standing rather than guidance status — which would shift the legal weight of PiTuKri-equivalent assessment.

:::warning[Reality Check]
The phrase "PiTuKri is guidance, not law" is technically true but operationally misleading. Finnish public authorities require PiTuKri-based assessment before adopting cloud services for non-trivial workloads. Procurement processes require it. The Audit Act uses it. A CSP that arrives at a Finnish public-sector procurement without a PiTuKri assessment in hand finds the procurement difficult to proceed with — regardless of the framework's nominal legal status. Treat PiTuKri as binding in commercial reality even where it is not binding in statute.
:::

## Closing checklist

- PiTuKri v1.1 is the operative criteria document, published by Traficom / NCSC-FI. Officially guidance; operationally the assessment standard for Finnish public-sector cloud.
- 52 criteria across 11 sub-areas, built on ISO 27001/27017, BSI C5, CSA CCM, and Katakri.
- Classification model is the **Finnish national TL classification** (TL II / III / IV), not internal PiTuKri levels.
- Assessment combines Facility Security Clearance (5-year validity), Audit Act certificates (3-year), and ISAE 3000 Type 2 attestation (annual). The combination is the operational route for CSPs.
- No public catalogue. CSPs publish attestations through their trust centres.
- A new national criteria library is in development to replace PiTuKri and the cloud sections of Julkri. Public consultation closed **13 April 2026**; cloud-criteria sections scheduled for **finalisation in autumn 2026**. PiTuKri v1.1 remains operative until then.
- **Kyberturvallisuuslaki (Act 124/2025) — Finnish NIS2 transposition, in force since 8 April 2025.** Risk-management-based; the framework/law gap that this creates against PiTuKri v1.1 is the explicit motivation for the new criteria library.
- Sovereignty posture differentiates by classification. International CSPs are accepted at TL IV and below; TL III and above prefer national cloud and exclude third-country authority access.
- For multinational CSPs, run PiTuKri ISAE 3000 jointly with C5 Type 2 from the same audit firm. The overlap is large; the marginal cost is small.
- **What to read next:** [BSI C5](./germany-bsi-c5-cloud-attestation) for the joint-audit partner most commonly paired with PiTuKri; [ISO 27001/27017](./iso-27001-27017-27018-27701-cloud-baselines) for the international baseline PiTuKri references; [Slovakia KsVC article](./slovakia-ksvc-mirri-government-cloud) for the other EU country with a similar framework/law gap pattern.
