---
title: "Spain — ENS: The National Security Framework Spans Every Public-Sector System"
category: compliance
tags: ["Spain", "ENS", "CCN", "NIS2", "Compliance", "Data Security"]
date: 2026-05-02
updated: 2026-05-15
readTime: 10
level: intermediate
excerpt: "ENS is not a cloud-specific framework — it covers every public-sector information system. But its cloud profile (PCE) and three-tier model make it one of the more workable EU regimes for hyperscalers."
references:
  - title: "Real Decreto 311/2022 (ENS)"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2022-7191"
    description: "The royal decree that regulates the Esquema Nacional de Seguridad — the current legal text governing ENS classification, controls, and audit obligations."
    domain: "boe.es"
  - title: "CCN — Esquema Nacional de Seguridad Portal"
    url: "https://ens.ccn.cni.es/"
    description: "Centro Criptológico Nacional's official ENS portal — guidance, the cloud services compliance profile (PCE), and the public register of certified entities."
    domain: "ens.ccn.cni.es"
  - title: "RD 311/2022 — English Version (PDF)"
    url: "https://administracionelectronica.gob.es/dam/jcr:eb23ff83-ebdb-487e-abd2-8654f837794f/RD_311-2022_of-3_May_ENS.pdf"
    description: "The full English translation of Real Decreto 311/2022 — the 74 security measures across organisational, operational, and protective categories."
    domain: "administracionelectronica.gob.es"
  - title: "Ley 40/2015 — Legal Regime of the Public Sector"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10566"
    description: "The framework law for the Spanish public sector — defines the scope of bodies that ENS applies to through the Disposición Adicional Tercera."
    domain: "boe.es"
  - title: "ENS FAQ — CCN"
    url: "https://ens.ccn.cni.es/es/que-es-el-ens/faq"
    description: "CCN's practical FAQ on ENS compliance — categorisation, audit obligations, the role of accredited certification bodies, and treatment of cloud services."
    domain: "ens.ccn.cni.es"
  - title: "Real Decreto-ley 7/2025 — Partial NIS2 Transposition"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2025-7187"
    description: "Spanish royal decree-law providing partial NIS2 transposition, in force as immediately enforceable obligations while the comprehensive coordination law remains in parliamentary process."
    domain: "boe.es"
  - title: "Anteproyecto de Ley de Coordinación y Gobernanza de la Ciberseguridad (Council of Ministers)"
    url: "https://www.lamoncloa.gob.es/consejodeministros/Paginas/enlaces/140125-enlace-ciberseguridad.aspx"
    description: "The Council of Ministers' January 2025 approval of the draft Cybersecurity Coordination and Governance Act — the comprehensive NIS2 transposition vehicle still in parliamentary process."
    domain: "lamoncloa.gob.es"
  - title: "CCN-CERT — STIC Serie 800 Update (17 June 2025)"
    url: "https://www.ccn-cert.cni.es/es/seguridad-al-dia/novedades-ccn-cert/13082-actualizacion-de-cinco-guias-ccn-stic-de-la-serie-800-conforme-al-real-decreto-311-2022-y-a-los-nuevos-retos-de-la-ciberseguridad.html"
    description: "CCN-CERT's announcement of the 17 June 2025 update to five Serie 800 STIC guides (801, 802, 803, 805, 808) aligned with RD 311/2022 and post-NIS2 cybersecurity challenges."
    domain: "ccn-cert.cni.es"
---

The Spanish Esquema Nacional de Seguridad (ENS) is not a cloud-specific framework. It is the security framework for every public-sector information system, with cloud services treated as one operational mode among many. That breadth is both ENS's strength — it produces a unified posture across the Spanish public sector — and a characteristic that makes it different in kind from frameworks like ACN Qualificazione or SecNumCloud that are purpose-built for cloud. This article walks through ENS as it applies to cloud services, with attention to the cloud services compliance profile (PCE) that gives cloud providers a clear route in.

## The system at a glance

The framework is the **Esquema Nacional de Seguridad (ENS)** — National Security Framework — currently regulated by **Real Decreto 311/2022** of 3 May 2022 (BOE-A-2022-7191). RD 311/2022 replaced the original Real Decreto 3/2010, modernising the control set and introducing explicit treatment of cloud services.

The framework is administered by the **Centro Criptológico Nacional (CCN)**, part of the **Centro Nacional de Inteligencia (CNI)** — the Spanish intelligence service. CCN issues the STIC guidance series, maintains the ENS portal at `https://ens.ccn.cni.es/`, and operates the INES and AMPARO governance tools. Implementation policy sits at the **Ministerio de Asuntos Económicos y Transformación Digital**.

The ENS framework is built around three categorisation levels and 74 security measures organised across organisational, operational, and protective control families. Compliance is demonstrated via audit (for higher categories) or self-assessment (for the baseline category).

## Legislative basis

ENS is anchored in a deeper statutory stack than most cloud frameworks:

- **Real Decreto 311/2022** of 3 May 2022 — the operative regulation.
- **Ley 40/2015** on the Legal Regime of the Public Sector — defines the public-sector scope to which ENS applies.
- **Real Decreto-ley 12/2018** — the Spanish transposition of the NIS Directive.
- **Real Decreto 43/2021** — implementing regulation for RDL 12/2018, defining OES and DSP obligations.
- **Ley Orgánica 7/2021** on protection of personal data in the criminal-justice context — `§37` references ENS directly as the security framework.
- **Real Decreto-ley 7/2025** — **partial NIS2 transposition, in force**. Provides immediately enforceable obligations while the comprehensive coordination law is still in parliamentary process.
- **Anteproyecto de Ley de Coordinación y Gobernanza de la Ciberseguridad** — comprehensive NIS2 transposition vehicle. Approved by the Council of Ministers on **14 January 2025** and **still in parliamentary process** as of mid-2026. Spain received a reasoned opinion from the European Commission on 7 May 2025 for non-notification of full NIS2 transposition.

Spain therefore operates in a **dual-track NIS2 regime** as of mid-2026: RDL 7/2025 obligations are enforceable today; the substantive coordination law and its sanctions framework are pending parliamentary adoption.

## Scope of obligation

The scope is broader than most national cloud frameworks:

- **All public administration** in the sense of `artículo 2` of Ley 40/2015 — central government, autonomous communities, local administrations, universities, and the public corporate sector.
- **Private-sector entities providing technological services to the public administration** — under the Disposición Adicional Tercera of RD 311/2022. This is the hook that brings cloud providers in scope when they serve Spanish public-sector customers.
- **Systems processing classified information** are also covered, with additional CCN-issued requirements.

The Disposición Adicional Tercera mechanism is what makes ENS operationally relevant for commercial cloud providers. A CSP that wants to sell to Spanish public-sector customers either needs to be ENS-certified, or its customers need to inherit ENS responsibility for the systems they run on the cloud.

## Classification model — Básica, Media, Alta

Systems are categorised under Annex I of RD 311/2022 based on the **impact of an incident** on five dimensions:

- Confidentiality.
- Integrity.
- Availability.
- **Authenticity**.
- **Traceability**.

The authenticity and traceability dimensions are ENS-specific and differentiate the framework from frameworks that use the standard CIA triad alone.

| Category | Impact level | Evaluation route |
|---|---|---|
| **BÁSICA (Low)** | Low impact across all dimensions | Self-assessment |
| **MEDIA (Medium)** | Medium impact in at least one dimension | Formal third-party audit by ENAC-accredited body |
| **ALTA (High)** | High impact in at least one dimension | Formal third-party audit, strictest control set |

The categorisation is performed by the system owner; CCN provides guidance but does not pre-classify. A system's category drives which of the 74 measures apply and at what depth.

## Evaluation criteria

The control set is in **Annex II of RD 311/2022**: **74 security measures** (reduced from 75 in the previous version) across:

- **Organisational measures (org)** — policy, organisation, governance.
- **Operational measures (op)** — operations, monitoring, incident management.
- **Protective measures (mp)** — controls on people, premises, equipment, communications, media, software, information, services.

For cloud services, RD 311/2022 introduces new controls covering:

- Cloud service provision specifically.
- System interconnection.
- Supply chain protection.
- Continuous monitoring.

The framework allows **Perfiles de Cumplimiento Específicos (PCE)** — specific compliance profiles — that adapt ENS for particular contexts. CCN has approved PCE profiles for:

- Local entities (municipalities).
- Universities.
- **Cloud services** — the *Servicios en la Nube* PCE.

The cloud PCE is the operative route for cloud providers and is the version of ENS most relevant to a CSP-procurement conversation.

On **17 June 2025**, CCN updated five **Serie 800 STIC guides** (STIC 801, 802, 803, 805, 808) to reflect RD 311/2022 and the post-NIS2 cybersecurity challenges. These updates affect the operational interpretation of ENS controls and are the most current authoritative source for the audit methodology.

[ISO/IEC 27001](./iso-27001-27017-27018-27701-cloud-baselines) compatibility is explicitly recognised: a system certified to 27001 has a substantial head start in ENS. The audit instructions under the pre-RD 311/2022 regime (Resolución de 27 de marzo de 2018) treated 27001 evidence as material; current practice under RD 311/2022 continues this compatibility through CCN guidance and the updated STIC Serie 800 guides.

## The assessment process

The path for a new system or service:

1. **Adecuación** — implementation of ENS controls by the organisation, typically 3–6 months for a system that already runs on a mature security baseline.
2. **Evaluation** — Básica: self-assessment with documented evidence; Media or Alta: formal audit by an **ENAC-accredited** certification body.
3. **Certificación de Conformidad** — issued by the accredited certification body. This is the certification of record.
4. **Incident notification** — through **CCN-CERT** for public-sector subjects; through **INCIBE-CERT** for private-sector subjects providing services to the public administration.

ENAC is the **Entidad Nacional de Acreditación** — the Spanish national accreditation body — which accredits the certification bodies that perform ENS audits. ENAC accreditation is the equivalent in this framework of PASSI in France.

For a cloud provider, the practical route is to certify against the Cloud Services PCE under Media or Alta. The certification body performs the audit; ENAC accreditation ensures the body's competence; CCN maintains oversight.

## Catalogue and recertification

CCN maintains a **public register** of certified entities accessible through the ENS portal at `https://ens.ccn.cni.es/`. The register is the authoritative source for verifying whether a system or service holds current ENS certification.

INES and AMPARO are CCN's governance tools — INES for self-evaluation, AMPARO for incident management. Both are used internally by public-sector entities; cloud providers interact with the framework primarily through certification rather than these tools.

Recertification:

- **Audit every 2 years** for Media and Alta categories.
- **Básica** requires periodic self-assessment updates, with no fixed external audit cadence.
- Continuous ISO/IEC 27001 maintenance is generally synced with the 2-year cycle.

The 2-year cycle for Media/Alta is stricter than the typical 3-year ISO 27001 cycle, which means CSPs running both certifications need to plan audit calendars accordingly.

## Sanctions and oversight

The sanctioning mechanism varies by subject:

- **Public-sector subjects** — non-compliance is grounds for audit by **Tribunal de Cuentas** (the Court of Auditors) and potential personal liability for responsible officials.
- **Private-sector providers to the public administration** — non-compliance disqualifies from public-sector procurement.
- **NIS2-scope subjects under RDL 12/2018** — administrative sanctions per the NIS2 transposition (in the legislative process as of mid-2026).
- **Serious incidents** — coordinated with CCN-CERT.

CCN-CERT is operationally important. It is the national CERT for the public sector and a central actor in incident response and supervisory action.

:::tip[Architectural Pro Tip]
For a multinational CSP entering the Spanish public-sector market, the practical sequence is: hold ISO/IEC 27001 and 27017 as the baseline; engage an ENAC-accredited certification body familiar with the Cloud Services PCE; audit against Media for the bulk of public-sector workloads, and Alta for higher-sensitivity workloads where the additional controls earn their cost. Trying to audit against the full ENS Annex II without the PCE filter produces broader audit scope than necessary for cloud-mode services.
:::

## Sovereignty posture

ENS does not have the explicit ownership-cap and immunity-from-foreign-law rules that SecNumCloud has. Its sovereignty posture is layered through:

- **Category Alta** — strictest controls, including stricter requirements around key management and personnel.
- **PCE Cloud** — defines cloud-specific expectations including jurisdictional considerations.
- **Classified information systems** — covered by separate CCN-issued requirements above the ENS baseline.

The framework's pragmatic position is closer to the German C5 transparency model than to the French exclusion model. International CSPs hold ENS certifications and operate in the Spanish public-sector market.

## Multicloud factor

ENS is one of the more workable EU national frameworks for multinational CSPs:

- **[ISO/IEC 27001](./iso-27001-27017-27018-27701-cloud-baselines) compatibility** is explicit. A CSP that holds 27001/27017 already covers a significant portion of the ENS Annex II control set.
- **The Cloud Services PCE** provides a defined audit scope rather than requiring providers to map themselves against the full breadth of ENS.
- **ENAC-accredited bodies** include audit firms that also audit for ISO and [SOC 2](./soc-2-reports-how-to-actually-read-them), reducing supplier fragmentation.
- The 2-year recertification cycle aligns with most multi-framework audit calendars.

Hyperscalers (AWS, Microsoft, Google) have multiple Spanish-region services ENS-certified at Media and Alta. The framework is operationally accommodating to large CSPs in a way that SecNumCloud is not.

:::warning[Reality Check]
The five-dimension model (CIA + authenticity + traceability) sounds like a marginal addition, but the traceability dimension is operationally demanding. ENS expects detailed audit-log retention with specified retention periods, cryptographic integrity protection on logs, and correlation across systems. A CSP whose logging meets ISO/IEC 27001 expectations may still fail ENS traceability requirements, particularly at Alta. Treat traceability as a dedicated control area in the implementation plan, not as an afterthought bundled with general logging.
:::

## Closing checklist

- ENS is the framework for all Spanish public-sector information systems, with cloud services treated through the dedicated **Servicios en la Nube** PCE.
- Three categories: Básica (self-assessment), Media (third-party audit), Alta (third-party audit, strictest controls). Categorisation is based on impact across five dimensions: C, I, A, authenticity, traceability.
- 74 security measures across organisational, operational, and protective control families. The PCE filters the scope for cloud-mode delivery.
- Audits performed by **ENAC-accredited certification bodies**. Recertification every 2 years for Media and Alta.
- Public register maintained on `ens.ccn.cni.es`. Non-compliance disqualifies from public-sector procurement; NIS2 sanctions apply on top.
- Sovereignty posture is layered through category Alta and the PCE rather than through ownership caps. International CSPs hold ENS certifications at Media and Alta.
- ISO/IEC 27001 compatibility is explicit and a strong baseline for ENS audit prep. Plan the 2-year cycle alongside ISO and SOC 2 calendars.
- Watch traceability requirements at Alta — logging discipline is more demanding than the standard CIA-triad framework would suggest.
- **What to read next:** [ISO 27001/27017/27018](./iso-27001-27017-27018-27701-cloud-baselines) for the baseline ENS audit prep stack; [GDPR Article 28 + EU Cloud CoC](./gdpr-article-28-and-eu-cloud-code-of-conduct) for the parallel GDPR regime; [Reading Attestation Reports](./reading-cloud-attestation-reports-practitioner-guide) for evaluating ENAC-accredited certifications.
