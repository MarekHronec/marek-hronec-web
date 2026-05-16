---
title: "Reading Cloud Attestation Reports — A Practitioner's Guide"
category: compliance
tags: ["Attestation", "Audit Reports", "Practitioner", "Compliance", "Data Security", "Cross-Cutting"]
date: 2026-05-15
updated: 2026-05-15
readTime: 11
level: intermediate
excerpt: "A SOC 2 report, a C5 attestation, an ENS audit certificate, an ACN qualification dossier — what to look for, what to ignore, what to ask follow-up questions about. The practitioner skill that turns compliance documents into actual signal."
references:
  - title: "AICPA SOC 2 Report Anatomy"
    url: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2"
    description: "The AICPA's overview of SOC 2 reports — the structure of a Type 2 report, the Trust Services Criteria, and the testing methodology auditors use."
    domain: "aicpa-cima.com"
  - title: "BSI C5 Audit Methodology"
    url: "https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/kriterienkatalog-c5_node.html"
    description: "BSI's overview of the C5 audit methodology, including the ISAE 3000 / ISAE 3402 basis and the report structure expected from accredited auditors."
    domain: "bsi.bund.de"
  - title: "ISAE 3000 (Revised)"
    url: "https://www.iaasb.org/publications/international-standard-assurance-engagements-isae-3000-revised-assurance-engagements-other-audits"
    description: "International Standard on Assurance Engagements 3000 — the assurance engagement standard underlying C5 attestation and PiTuKri ISAE 3000 Type 2 reports."
    domain: "iaasb.org"
  - title: "AICPA SSAE 18"
    url: "https://us.aicpa.org/research/standards/auditattest/ssae"
    description: "Statement on Standards for Attestation Engagements No. 18 — the US standard underlying SOC 2 reports."
    domain: "aicpa.org"
---

A compliance audit report can be 200+ pages and contain useful information for a procurement decision in ten of them — if you know which ten. This article is the practitioner skill: how to actually read SOC 2 reports, BSI C5 attestations, ENS audit certificates, ACN qualification dossiers, and the others, to extract real signal and reject the marketing language they contain. The skill is more useful than any single framework knowledge because it is what determines whether you can convert framework participation into procurement confidence.

> **Before reading this article**, familiarity with [SOC 2 Reports](./soc-2-reports-how-to-actually-read-them) and the [ISO standards stack](./iso-27001-27017-27018-27701-cloud-baselines) is assumed. If those concepts are new to you, read those articles first — this article builds on them.

## What you are actually trying to learn

Before opening any audit report, be clear about what question you are trying to answer. Common questions:

- "Does this cloud provider's service meet [specific regulatory requirement]?"
- "Are the controls covering [specific data category or scenario] in scope?"
- "Is the cloud provider's audit programme operating at current cadence?"
- "Are there material findings I need to follow up on?"
- "How does this report compare to last year's?"

Reports don't answer questions you didn't ask. Scanning a 200-page document hoping for relevant material is the wrong workflow. Decide what you need to verify, then go find it.

## Common report types and their forms

| Report | Standard | Issued by | Audit basis | Validity |
|---|---|---|---|---|
| **SOC 2 Type 2** | SSAE 18 (US) | CPA audit firm | Operating effectiveness over period | 12-month period |
| **BSI C5 Type 2** | ISAE 3000 / ISAE 3402 | Accredited audit firm | Operating effectiveness over period | 12-month period |
| **ISO 27001 certificate** | ISO/IEC 27006 | Accredited certification body | Management system effectiveness | 3 years + annual surveillance |
| **ENS Certificación de Conformidad** | RD 311/2022 + audit instruction | ENAC-accredited certification body | Category-specific controls | 2 years (Media/Alta) |
| **ACN Qualificazione carta servizio** | ACN Determinazione 307/2022 | ACN ex-ante verification | QC level requirements | 36 months |
| **SecNumCloud Visa de sécurité** | ANSSI 3.2 reference + PASSI audit | PASSI auditor + ANSSI | All 350+ requirements | 3 years + annual surveillance |
| **PiTuKri ISAE 3000 attestation** | ISAE 3000 | Accredited audit firm | 52 criteria across 11 sub-areas | 12-month period |
| **EU Cloud CoC adherence** | Article 40 code | SCOPE Europe monitoring body | Code controls + evidence type | Annual re-evaluation |

Each report has a different structure, but the practitioner skill is similar: find the scope, the period, the auditor identity, the findings, and the remediation status.

## The five things to verify first, regardless of report type

Whatever report you are reading, verify these five before going further. If any of them fails, the report's other content matters less than the failure.

### 1. Scope of the audit

The single most overlooked field. "ISO 27001 certified" with no scope statement is meaningless. The relevant questions:

- **Which services are in scope?** A cloud provider's report may cover only some services, not all. Verify the service you are procuring is named in the scope.
- **Which locations?** Reports may cover specific data centres or regions. Verify the location you will use.
- **Which controls or criteria?** A SOC 2 covering only Security is narrower than one covering Security + Availability + Confidentiality.
- **Which exclusions?** Carve-out subservices, excluded service modes, excluded customer types.

If the scope does not cover the service-location-controls combination you need, the report doesn't apply to your procurement.

### 2. Period of coverage

For Type 2 reports, the period of coverage is the window over which controls were tested. For certifications, the validity window. Look for:

- **Start and end dates** of the audit period.
- **Date of issuance** — usually 1-3 months after the period ends.
- **Date you are reading** — gap between issuance and reading matters.

A SOC 2 Type 2 covering 1 January – 31 December 2025, issued March 2026, read in May 2026: still current. Same report read in March 2027: stale; renewal should be imminent. Same report covering 2023 with no 2024 or 2025 follow-up: programme has slipped.

### 3. Auditor or certification body identity

Not all auditors are equivalent. Look for:

- **Accreditation status** of the certification body or auditor. Accredited bodies (ENAC in Spain, COFRAC in France, DAkkS in Germany, ENAC's international equivalents, UKAS in the UK, recognised national accreditation bodies generally) are the substantive signal. Non-accredited "certifications" carry materially less weight.
- **Audit firm reputation** for SOC 2 / C5 / ISAE 3000 reports. The Big Four (EY, KPMG, PwC, Deloitte) plus BDO are the typical performers for hyperscaler audits. Mid-tier firms perform mid-market work. Small or unknown firms performing audits of large CSPs are a flag for further investigation.

### 4. Opinion or conclusion

Every audit report has an opinion. Common opinions:

- **Unqualified opinion** / **no exceptions** / **conformity confirmed** — the cleanest outcome. Controls operated effectively.
- **Qualified opinion** with exceptions — some controls had failures during the period. Read the exception detail.
- **Adverse opinion** or **denied** — the audit body concluded controls did not operate as designed. Rare in cloud audits; severe signal when seen.
- **Disclaimer** — the auditor was unable to form an opinion due to scope limitations. Significant signal; investigate why.

The opinion is in the auditor's report section near the front. Read it first.

### 5. Findings and remediation

Where exceptions or findings exist, the report should document:

- **What the finding was** — specific control, what failed.
- **The scope and impact** — how many instances, what data was affected, what duration.
- **Management response** — what the audited organisation said about it.
- **Remediation status** — whether it was fixed during or after the audit period.

Mature audit programmes find non-trivial issues. Zero-finding reports across complex services over 12 months either reflect very mature controls or shallow testing — both interpretations are plausible.

## Reading SOC 2 reports specifically

The five-section structure:

1. **Independent Service Auditor's Report** (Section I) — the opinion. Read first.
2. **Management's Assertion** (Section II) — the audited organisation's statement of what its controls do. Useful context.
3. **Description of the Service Organisation's System** (Section III) — narrative description. **This is where scope lives**. Read for service inclusions, exclusions, subservice carve-outs, infrastructure overview.
4. **Trust Services Criteria, Related Controls, Tests, and Results** (Section IV) — the substantive content. Read for the criteria coverage, the specific tests, and the results.
5. **Other Information** (Section V, optional) — management responses, additional context.

The carve-out method is the default for cloud SOC 2 reports. Identify carved-out subservices in Section III and obtain the underlying provider's reports separately.

User Entity Considerations — the controls the customer must implement for the cloud provider's controls to work as audited — are typically at the end of Section IV or in Section V. Read them. They are your responsibilities.

## Reading C5 attestation reports

C5 reports follow ISAE 3000 / ISAE 3402 structure. The key sections:

- **Audit opinion** — under ISAE 3000 or ISAE 3402. Type 2 covers operating effectiveness.
- **System description** — narrative description of the audited service, including jurisdiction, data location, subprocessing, regulatory disclosure obligations. This is the most detailed system description across cloud audit reports.
- **Control tables** — for each of the 17 (C5:2020) or restructured (C5:2026) control areas, the controls and the audit results.
- **Regulatory disclosures** — jurisdictions of operation, processing locations, public-authority data-access exposure. C5 is unique in mandating these disclosures.

C5:2026 (effective for audit periods on or after 1 June 2027) restructures into subcriteria and adds explicit coverage of containers, supply chain, post-quantum cryptography, and confidential computing. Reports issued under C5:2020 retain the 17-domain structure.

## Reading ENS certificates

The ENS Certificación de Conformidad is shorter than a SOC 2 or C5 report — it is a **certificate**, not a detailed audit report. The underlying audit report is typically more detailed but not always public.

What the certificate provides:

- The category certified (Básica, Media, Alta).
- The scope.
- The certification body (must be ENAC-accredited).
- The validity period.
- Reference to the audit methodology (Resolución de 27 de marzo de 2018).

For substantive evaluation of Media or Alta certifications, request the underlying audit report from the cloud provider, not just the certificate. The certificate is the headline; the audit report is the detail.

## Reading ACN qualification dossiers

The ACN Qualificazione process produces:

- An entry in the public catalogue at `acn.gov.it`.
- A service card with the qualification level (QC1-QC4 or QI/AI tiers).
- The validity dates (36 months).
- The catena di qualificazione chain — what underlying services this service depends on and at what level.

The qualification process itself is ex-ante by ACN; there is no publicly available "audit report" in the SOC 2 sense. What is publicly verifiable is the catalogue entry. For detailed control verification, the cloud provider's underlying ISO 27001 / C5 / SOC 2 reports are the secondary evidence.

## Reading SecNumCloud qualifications

The Visa de sécurité is a formal qualification announcement on the ANSSI website. Like ACN, this is a state attestation more than a public audit report. The PASSI audit underlying the qualification is performed by an accredited PASSI auditor; the resulting audit report is generally not public.

For SecNumCloud-qualified services, the verification chain is:

- ANSSI's public qualification list (does the service appear?).
- The qualification version (3.2 currently).
- The validity period (3 years + annual surveillance).
- Underlying audit programme evidence (ISO 27001, C5, etc.) from the qualified provider.

## Red flags vs green flags

### Green flags
- Scope explicitly covers the service-location combination you need.
- Recent audit period (within last 12 months).
- Accredited auditor or certification body.
- Unqualified opinion or limited number of immaterial findings.
- Findings with documented remediation.
- Consistent year-over-year pattern (programme is sustained).
- User Entity Considerations clearly documented.

### Red flags
- Scope unclear or narrower than expected.
- Period ended more than 12 months ago with no follow-up.
- Non-accredited certification body or unknown auditor.
- Qualified opinion with material findings or denied/adverse opinion.
- Unrecorded remediation.
- No consistent prior reports — first-time audit can be acceptable, but the absence of a programme history is a flag.
- "Equivalent" claims (e.g., "we follow ISO 27001 principles" without certification).

:::tip[Architectural Pro Tip]
For procurement teams evaluating cloud providers via attestation reports, build a **standardised evaluation worksheet** — one row per report-type field (scope, period, auditor, opinion, findings, remediation, User Entity Considerations) — and complete it for each provider being evaluated. The exercise forces explicit attention to each field rather than impression-based evaluation. After two or three procurements, the worksheet becomes the team's reusable evaluation discipline. Procurement teams that rely on overall impressions of audit reports consistently misjudge providers; teams using structured worksheets converge on accurate evaluations faster.
:::

## When to request the underlying audit report

Most attestations have a "headline" form (certificate, catalogue entry, attestation summary) and a "detail" form (full audit report, PASSI audit, BSI C5 long-form). For low-sensitivity workloads, the headline is sufficient. For higher-sensitivity workloads, request the detail.

The detail form contains:

- Specific test procedures and results.
- Findings descriptions and management responses.
- Subprocessing details.
- System architecture diagrams.
- User Entity Considerations.

Cloud providers typically share detail forms under NDA. The willingness to share, and the speed of sharing, is itself a signal. Mature CSPs have a standardised detail-share process (NDA template, audit-report request form, customer-success workflow). Less mature CSPs handle each request ad-hoc.

## The annual cycle and gap detection

Audit reports come on cycles. A mature cloud provider produces them on schedule:

- SOC 2 Type 2: annual.
- BSI C5 Type 2: annual.
- ISO 27001: 3-year main + annual surveillance.
- ENS Media/Alta: 2 years.
- ACN: 36 months.
- SecNumCloud: 3 years + annual surveillance.
- EU Cloud CoC: annual re-evaluation.

Verify the cadence is sustained. A provider that issued a SOC 2 in 2023 with no follow-up in 2024 or 2025 has a programme issue. The absence of a recent report is more informative than the presence of an old one.

:::warning[Reality Check]
The trust-centre marketing page of a major cloud provider is not an audit report. It lists certifications and attestations, often with hyperlinks, but the listing itself is the provider's representation. The actual evidence is the underlying audit reports. Procurement that stops at the trust-centre listing is procurement that has not actually verified the controls. Always request and read the underlying reports for non-trivial workloads.
:::

## The cross-report consistency check

For a cloud provider with multiple attestations (typical for hyperscalers), cross-check that the reports are consistent:

- Service scopes should match where they overlap.
- Periods should be roughly aligned (annual reports issued in similar months).
- Subprocessing disclosures should be consistent across SOC 2, C5, and EU Cloud CoC.
- Auditor identities should be consistent (Big Four audit firms typically perform multiple attestations for the same provider).

Inconsistencies across reports — different scopes, different sub-processors disclosed, different findings patterns — are signals to investigate. They often reflect either auditor differences or audit-period differences but occasionally reflect substantive disclosure issues.

## Closing checklist

- Decide what question you are trying to answer before opening any report. Reports don't surface what you didn't ask for.
- Five things to verify first regardless of report type: scope, period, auditor identity / accreditation, opinion, findings and remediation.
- SOC 2 reports: five-section structure. Scope lives in Section III. User Entity Considerations are your responsibilities. Carve-out subservices require separate reports.
- C5 reports: ISAE 3000 / ISAE 3402 structure. Regulatory disclosures (jurisdiction, processing locations, public-authority exposure) are unique to C5.
- ENS / ACN / SecNumCloud: headline forms are public; detail forms via the provider. Validity dates and scope are explicit on the headline.
- Green flags: clear scope, current period, accredited auditor, unqualified opinion, documented remediation, sustained programme.
- Red flags: unclear scope, stale period, non-accredited auditor, qualified or adverse opinion, undocumented remediation, no programme history.
- Build a standardised evaluation worksheet. Don't evaluate impressions; evaluate fields.
- Trust-centre marketing pages are not audit reports. Always request and read the underlying reports for non-trivial workloads.
- See the [SOC 2 article](./soc-2-reports-how-to-actually-read-them) for SOC 2 specifically, the [ISO baselines article](./iso-27001-27017-27018-27701-cloud-baselines) for ISO certificates, and the country articles for the specific national frameworks' report structures.
