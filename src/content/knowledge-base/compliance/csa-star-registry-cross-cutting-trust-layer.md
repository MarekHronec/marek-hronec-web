---
title: "CSA STAR Registry — The Cross-Cutting Trust Layer Across Frameworks"
category: compliance
tags: ["CSA STAR", "CSA CCM", "Compliance", "Data Security", "Cross-Cutting", "Attestation"]
date: 2026-04-16
updated: 2026-05-15
readTime: 9
level: intermediate
excerpt: "The Cloud Security Alliance STAR Registry is the closest thing the cloud industry has to a global trust register. Three assurance levels, the CCM as the underlying control matrix, and integration with most major national frameworks. Useful as a navigation layer when comparing CSPs across heterogeneous compliance regimes."
references:
  - title: "CSA STAR Registry"
    url: "https://cloudsecurityalliance.org/star/registry/"
    description: "The Cloud Security Alliance's public registry of cloud service providers' security and privacy postures across three assurance levels — Level 1 self-assessment, Level 2 third-party assessed, Level 3 continuous monitoring."
    domain: "cloudsecurityalliance.org"
  - title: "CSA Cloud Controls Matrix (CCM) v4"
    url: "https://cloudsecurityalliance.org/research/cloud-controls-matrix/"
    description: "The CCM v4 — 197 control objectives across 17 domains. The control catalogue STAR audits against and the framework most heavily referenced by BSI C5, EU Cloud CoC, and other national schemes."
    domain: "cloudsecurityalliance.org"
  - title: "CSA Consensus Assessments Initiative Questionnaire (CAIQ)"
    url: "https://cloudsecurityalliance.org/artifacts/consensus-assessments-initiative-questionnaire-v4/"
    description: "The standardised CSP self-assessment questionnaire that underlies STAR Level 1. The reusable form most procurement teams use as the first-pass evaluation document for a new CSP."
    domain: "cloudsecurityalliance.org"
  - title: "CSA STAR Attestation"
    url: "https://cloudsecurityalliance.org/star/attestation"
    description: "STAR Level 2 attestation — a third-party assessment against the CCM, typically performed alongside SOC 2 or ISO 27001 audits."
    domain: "cloudsecurityalliance.org"
---

The Cloud Security Alliance STAR Registry is the closest thing the cloud industry has to a single global registry of CSP security postures. It is not a national framework, not a regulatory instrument, and not a substitute for any of the national audits in this series — but it is the cross-cutting layer that lets a buyer compare CSPs across heterogeneous compliance regimes and that several national frameworks reference as supporting evidence. This article walks through what STAR actually delivers and where to fit it in a compliance programme.

## What STAR is and what the CCM is

Two pieces work together:

- **Cloud Controls Matrix (CCM)** — a control catalogue maintained by the Cloud Security Alliance. Version 4 has **197 control objectives across 17 domains** (audit and assurance, application and interface security, business continuity, change control, cryptography and key management, data security, governance, human resources, identity and access management, interoperability and portability, infrastructure and virtualisation, logging and monitoring, security incident management, supply chain management, threat and vulnerability management, universal endpoint management). The CCM is mapped to dozens of other frameworks (ISO 27001, ISO 27017, ISO 27018, NIST CSF, BSI C5, PCI DSS, HIPAA, GDPR, and others) — the mappings are published.
- **STAR Registry** — a public registry of CSP assessments against the CCM. CSPs publish their CCM-based assessments at one of three assurance levels; the registry is searchable.

The CCM is the control content; STAR is the registry mechanism.

## Three assurance levels

| Level | What it is | Audit form | Validity |
|---|---|---|---|
| **Level 1 — Self-Assessment** | CSP completes the Consensus Assessments Initiative Questionnaire (CAIQ) against the CCM and publishes it. No third-party verification. | Self-attestation | 1 year recommended |
| **Level 2 — Third-Party Assessed** | A CSA-accredited auditor verifies the CSP's CCM compliance. Two forms: **STAR Certification** (paired with ISO 27001) or **STAR Attestation** (paired with SOC 2). | Third-party audit | Aligned with the underlying ISO/SOC cycle |
| **Level 3 — Continuous Monitoring** | Real-time or near-real-time security posture data feeding the registry. Few CSPs hold L3 today. | Continuous monitoring + third-party validation | Ongoing |

Most CSPs in the registry are at Level 1 or Level 2. Level 3 is the aspirational tier; adoption is gradual.

## Level 1 — the CAIQ self-assessment

The Consensus Assessments Initiative Questionnaire (CAIQ) is the practical artefact at Level 1. It is a structured spreadsheet (yes, literally a spreadsheet) listing every CCM control objective and asking the CSP to declare whether the control is implemented, partially implemented, or not implemented, with explanatory text and references to evidence.

For procurement teams, the CAIQ is **the single most reusable evaluation document** in cloud security:

- Many CSPs publish their CAIQ directly on the STAR registry — public access, no NDA.
- The standardised format means cross-CSP comparison is mechanical.
- The CCM-to-other-framework mappings allow translating CAIQ responses into ISO 27001, SOC 2, GDPR, or PCI DSS terms.

The limitation: it is **self-attestation**. There is no verification beyond the CSP's own statement. For low-sensitivity workloads or first-pass screening, that is sufficient. For higher-sensitivity workloads, Level 2 or framework-specific audits are required.

## Level 2 — STAR Certification and STAR Attestation

Level 2 is third-party assessed and comes in two forms:

**STAR Certification** is performed alongside an ISO 27001 certification audit. The auditor verifies the CSP's CCM compliance as an extension of the 27001 audit. The output is a STAR certificate plus a Capability Maturity Model (CMM) score (Bronze, Silver, Gold) indicating control maturity.

**STAR Attestation** is performed alongside a SOC 2 Type 2 audit. The auditor verifies the CSP's CCM compliance using SSAE 18 attestation methodology. The output is a STAR attestation that integrates with the SOC 2 report.

Both forms produce a registry entry that is **third-party verified**. For procurement purposes, a Level 2 STAR registry entry is equivalent to "ISO 27001 + CCM evidence" or "SOC 2 + CCM evidence" depending on which form was used.

## Level 3 — Continuous Monitoring

STAR Level 3 introduces continuous monitoring data into the registry. The CSP exposes real-time or near-real-time security posture indicators that are validated by a third party. The intent is to bridge the gap between point-in-time audits and the actual operational state of the cloud service.

As of mid-2026, Level 3 adoption is limited. The infrastructure for continuous monitoring data exchange is maturing; CSA STAR Level 3 is one of the leading approaches but is not yet the industry norm. Treat Level 3 as an emerging capability rather than a requirement.

## How STAR intersects with the national frameworks

STAR is referenced as supporting evidence across multiple national frameworks:

- **BSI C5** explicitly maps its controls to CSA CCM v3.0.1; the **C5:2026 draft** (not yet published as final as of mid-2026) proposes updating the reference to **CCM v4** when finalised. A CSP holding BSI C5 has substantial overlap with STAR Level 2.
- **EU Cloud Code of Conduct** integrates with the CSA STAR Registry — since 2024, EU Cloud CoC certifications are co-published in the STAR Registry.
- **Slovak KsVC** references ENISA Cloud Certification Scheme controls; the ENISA scheme maps to CCM.
- **Finnish PiTuKri** explicitly references CCM as one of its source standards.
- **Spanish ENS** does not directly reference CCM but accepts CCM-aligned evidence in audit preparation.

A CSP with a STAR Level 2 entry has portable evidence that reduces the audit-preparation work for every framework above.

## The CCM-to-other-framework mappings

The most operationally valuable artefact CSA publishes is the **mapping spreadsheet** that maps each CCM control to corresponding controls in other frameworks. The mappings cover:

- ISO/IEC 27001, 27002, 27017, 27018.
- NIST Cybersecurity Framework and NIST SP 800-53.
- GDPR articles.
- HIPAA, PCI DSS, FedRAMP.
- BSI C5, EU Cloud CoC.

For a CSP designing its compliance programme, the mapping is the **scaffolding for cross-framework efficiency**. Implement a control to the CCM definition; the mappings tell you which evidence file goes into the ISO audit, the SOC 2 audit, the GDPR Article 28 documentation, and so on. This is the explicit alternative to building each framework as a parallel project.

## The CAIQ in practice

For procurement teams, the practical workflow with STAR is:

1. **Initial screening** — check the STAR registry for the CSP. If they are listed at Level 1 or Level 2, the CAIQ is available.
2. **CAIQ review** — read the CSP's CAIQ responses against the CCM controls relevant to the workload (data classification, encryption, access management, audit logging, incident response).
3. **Gap identification** — note CCM controls marked "not implemented" or with weak explanatory text. These become specific questions for the CSP.
4. **National-framework-specific evidence** — for higher-sensitivity workloads, request national-framework-specific attestations (BSI C5, ENS, ACN, KsVC listing, SecNumCloud qualification).

The CAIQ is the first-pass screening. National attestations are the deep-dive evidence. STAR Level 2 sits between, providing third-party verification without the country-specificity.

:::tip[Architectural Pro Tip]
For a CSP designing its security programme, **build the CCM-based control framework first and treat it as the source of truth**. Implement each control once; use the CCM-to-other-framework mappings to generate framework-specific evidence packages on demand. This is the operational alternative to building ISO 27001, SOC 2, BSI C5, ENS, ACN, KsVC, and SecNumCloud as parallel control implementations. The CCM is the most heavily-mapped control catalogue in the cloud industry; using it as the design centre saves materially more work than picking any single national framework as the design centre.
:::

## What STAR does not deliver

- **Sovereignty assertions** — STAR has no opinion on data location, jurisdiction, or foreign-law immunity. National frameworks (SecNumCloud, KsVC U4, ACN PSN) handle this.
- **Regulatory force** — STAR is voluntary. No government has made STAR mandatory. Procurement processes may reference it, but it has no statutory weight on its own.
- **Sector-specific controls** — STAR is general-purpose. Financial services (DORA, GLBA), healthcare (HIPAA, NEN 7510), or government-classified information require additional sector-specific evidence.
- **Continuous assurance at scale** — Level 3 is the aspiration; most CSPs are at Level 1 or 2 with point-in-time verification.

## STAR in the SK / CEE context

For Slovak organisations and CSPs operating in Central and Eastern Europe:

- **STAR Level 2** is recognised as supporting evidence in Slovak procurement, particularly when paired with ISO 27001 or SOC 2.
- Most hyperscalers and major regional CSPs publish CAIQs in the STAR Registry. Searching the registry is the fastest way to compare options.
- **Slovak KsVC** does not require STAR but accepts CCM-aligned evidence as material in the U2-U4 evaluation track.

:::warning[Reality Check]
A CSP that publishes Level 1 self-assessment and treats it as equivalent to Level 2 attestation is over-claiming. The two are not interchangeable. Procurement language like "we are STAR-registered" is ambiguous — verify which level. For non-trivial workloads, Level 1 self-assessment without supporting ISO 27001 or SOC 2 evidence is not adequate verification; it is the CSP's own statement, not a third-party verification.
:::

:::tip[Where this fits in the corpus]
CSA STAR is the **navigation layer** across the rest of this security section. The CCM-to-other-framework mappings let a reader pivot from CSA STAR to any of the national frameworks the corpus covers:

- A STAR Level 2 entry → maps to control evidence accepted by [Slovak KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud), [Spanish ENS](/knowledge-base/compliance/spain-ens-national-security-framework), [Italian ACN](/knowledge-base/compliance/italy-acn-cloud-qualification).
- The CCM v4 base → maps to [BSI C5:2026](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation) which uses CCM v4 explicitly.
- STAR Attestation pairs with [SOC 2 Type 2](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them); STAR Certification pairs with [ISO 27001](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines).
- [EU Cloud Code of Conduct](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct) adherences are co-published in STAR Registry since 2024.
- For [Slovak readers](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud): MIRRI methodology references the ENISA Cloud Certification Scheme, which maps to CCM — CSA STAR Level 2 evidence is material supporting input for KsVC U2 / U3 audit preparation, alongside the Slovak-specific Cybersecurity Auditor opinion at higher tiers.

Use the CCM mappings as the scaffold; use the country and overlay articles for the framework-specific specifics.
:::

## Closing checklist

- The CSA Cloud Controls Matrix (CCM) is the control catalogue; the STAR Registry is the public registry of CSP assessments against the CCM.
- Three levels: Level 1 self-assessment (CAIQ), Level 2 third-party assessed (STAR Certification with ISO 27001 or STAR Attestation with SOC 2), Level 3 continuous monitoring (emerging).
- CCM v4 has 197 controls across 17 domains. The C5:2026 draft proposes updating the CCM reference to v4 when published; the current published C5:2020 references CCM v3.0.1.
- The CCM-to-other-framework mappings are the most operationally valuable CSA artefact. Use them as the scaffolding for cross-framework efficiency.
- STAR Level 2 sits between unverified self-assessment and country-specific attestation. Useful as portable evidence; not a substitute for national framework audits where those are required.
- For procurement: use the CAIQ as first-pass screening; layer national framework evidence on top for higher-sensitivity workloads.
- For CSPs: build the control framework to CCM, generate framework-specific evidence via the mappings. Avoid building each framework as a parallel project.
- See the [ISO baselines article](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines) for how STAR Certification pairs with 27001, and [SOC 2 article](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them) for how STAR Attestation pairs with SOC 2.
