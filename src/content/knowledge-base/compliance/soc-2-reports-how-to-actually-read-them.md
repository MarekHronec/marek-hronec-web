---
title: "SOC 2 Reports — How to Actually Read Them"
category: compliance
tags: ["SOC 2", "AICPA", "Attestation", "Compliance", "Data Security", "Cross-Cutting", "Practitioner"]
date: 2026-04-07
updated: 2026-04-07
readTime: 12
level: intermediate
excerpt: "SOC 2 is the most commonly referenced cloud security attestation in procurement. It is also the one most often misread — Type 1 confused with Type 2, scope confused with depth, exception language misunderstood. This article walks through what a SOC 2 report actually contains and how to read it for real signal."
references:
  - title: "AICPA — SOC 2 Reports"
    url: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2"
    description: "AICPA's official landing page for SOC 2 reports — Trust Services Criteria, report types, and the relationship between SOC 1, SOC 2, and SOC 3."
    domain: "aicpa-cima.com"
  - title: "AICPA Trust Services Criteria (2017, as updated)"
    url: "https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services"
    description: "The Trust Services Criteria — Security, Availability, Processing Integrity, Confidentiality, Privacy — that SOC 2 reports audit against."
    domain: "aicpa-cima.com"
  - title: "AICPA SSAE 18 — Attestation Standards"
    url: "https://us.aicpa.org/research/standards/auditattest/ssae"
    description: "Statement on Standards for Attestation Engagements No. 18 — the auditing standard under which SOC 2 reports are produced in the US."
    domain: "aicpa.org"
  - title: "AICPA — SOC for Cybersecurity"
    url: "https://www.aicpa-cima.com/topic/audit-assurance/soc-for-cybersecurity"
    description: "An entity-level cybersecurity reporting framework, distinct from SOC 2 (which is service-organisation-level). Useful for the buyer who is reading SOC 2 to understand what SOC 2 is not."
    domain: "aicpa-cima.com"
---

SOC 2 reports are the most commonly referenced cloud security attestation in EU procurement processes — referenced across every national framework in this series. They are also the most commonly misread: Type 1 mistaken for Type 2, scope mistaken for control depth, exception language interpreted as either failure or pass without understanding what it actually means. This article walks through the anatomy of a SOC 2 report and explains what to look for to extract real signal.

## SOC 1 vs SOC 2 vs SOC 3 — what each is for

The three SOC report types serve different purposes and are not interchangeable.

| Report | Purpose | Audience |
|---|---|---|
| **SOC 1** | Internal control over financial reporting — for service organisations whose services affect their customers' financial statements | Customer auditors performing financial-statement audits |
| **SOC 2** | Operational controls relevant to security, availability, processing integrity, confidentiality, privacy | Customer compliance and security teams, procurement |
| **SOC 3** | A general-use summary of a SOC 2 audit, with no detailed controls or test results | General public; marketing |

A CSP saying "we have SOC compliance" without specifying SOC 1, 2, or 3 is signalling either confusion or marketing. In the cloud context, **SOC 2** is what matters. SOC 3 is a public-facing summary; do not accept it as audit evidence.

## SOC 2 Type 1 vs Type 2

The most common reading error in SOC 2 reports is confusing the two types.

- **Type 1** — opinion on the **design** of controls at a single point in time. The auditor verifies that controls are documented and in place on the date of the report. **No testing of operating effectiveness over a period.**
- **Type 2** — opinion on both the **design and the operating effectiveness** of controls over a defined period (typically 6 or 12 months). The auditor tests samples of control executions during the period.

**Type 2 is the substantive attestation.** Type 1 is often used as an interim step — for a CSP that has implemented controls and wants to publish *something* before completing a full period of operational testing. Type 1 alone is not equivalent to Type 2 and should not be accepted as such in procurement for non-trivial workloads.

When a CSP presents a "SOC 2 report," verify which type it is. The cover page states it explicitly. If it does not state explicitly, that is itself a red flag.

## The Trust Services Criteria

SOC 2 audits against the **Trust Services Criteria (TSC)** maintained by the AICPA. Five criteria categories:

| Criterion | What it covers |
|---|---|
| **Security** (also called Common Criteria) | The baseline — required for every SOC 2 report. Covers logical and physical access, change management, risk management, monitoring, incident response. |
| **Availability** | Operational availability — SLA-relevant controls, capacity planning, disaster recovery, backup. |
| **Processing Integrity** | Completeness, validity, accuracy, timeliness, authorisation of processing. Most relevant for transaction-processing services. |
| **Confidentiality** | Protection of information designated as confidential. Distinct from privacy — applies to non-PII confidential information. |
| **Privacy** | Notice, choice, consent, collection, use, retention, access, disclosure, quality, monitoring of personal information. Most directly relevant to GDPR-adjacent obligations. |

**Security is mandatory; the other four are optional.** A "SOC 2 Security" report is a real and common scope. A report covering Security + Availability + Confidentiality is broader; a full five-criteria report is the most comprehensive.

When reviewing a SOC 2 report, **the first thing to check is which criteria it covers**. A CSP that wants to claim broad SOC 2 coverage may publish a Security-only report; if your workload depends on the cloud service's availability or privacy posture, a Security-only report does not cover those concerns.

## Anatomy of a SOC 2 Type 2 report

A SOC 2 Type 2 report has five standard sections:

**Section I — Independent Service Auditor's Report.** The auditor's opinion. Look for:
- Unqualified opinion (no exceptions) vs qualified opinion (exceptions noted).
- Period of coverage.
- Criteria audited.
- Auditor identity and qualifications.

**Section II — Management's Assertion.** The service organisation's own statement of what its controls are and what they are designed to achieve. This is the CSP saying "here is what we claim our controls do."

**Section III — Description of the Service Organisation's System.** The narrative description of the service in scope: what it does, infrastructure, software, people, processes, data, control environment. This is where you find the *actual scope* — services included, services excluded.

**Section IV — Trust Services Criteria, Related Controls, Tests of Controls, and Results.** The substantive content. For each TSC, the report lists:
- The criterion (e.g., CC6.1 — logical access controls restricting access).
- The control(s) the CSP has implemented.
- The auditor's test procedures.
- The test results — typically "no exceptions noted" or, where issues were found, an exception description.

**Section V — Other Information Provided by Management.** Optional. Sometimes contains a management response to findings or additional context.

## Reading exception language

Exception language is where SOC 2 reports communicate real signal. The phrases to know:

- **"No exceptions noted"** — the most common phrasing for a control that passed all tests during the period. The control worked as designed.
- **"Exception noted"** with a description — at least one tested instance failed. The description explains what failed.
- **"Deviation"** — used in some report formats as a softer synonym for exception.

When you see an exception, read carefully:

- **What failed?** A single user account improperly provisioned, or systemic failure of provisioning controls?
- **For how long?** A two-day window, or six months?
- **What was the impact?** Did it lead to a security incident, or was it a paperwork lapse?
- **Has it been remediated?** Management response sections often address this.

**Single isolated exceptions in a Type 2 report are not catastrophic.** Auditors expect to find occasional lapses in any operating organisation. What matters is whether the lapses are systemic, whether management identified them through internal monitoring or only via the audit, and whether remediation has been completed.

**Zero-exception reports are the goal but not always indicative.** A zero-exception SOC 2 Type 2 report covering 12 months across a complex cloud service is either an indication of mature controls or an indication that the auditor's testing was less rigorous than expected. Compare across years and across audit firms.

## Subservice organisations — the carve-out trap

Most cloud services depend on other cloud services. A SaaS provider runs on AWS or Azure. A platform provider runs on hyperscaler infrastructure. SOC 2 reports handle this through one of two methods:

- **Carve-out method** — the subservice provider's controls are excluded from the audit scope. The report says "we rely on [hyperscaler] for these aspects; their SOC 2 is separately available." This means the customer needs to obtain the subservice provider's SOC 2 separately and assess the combined posture.
- **Inclusive method** — the subservice provider's controls are included in the audit scope. The report addresses the combined controls. Rare for hyperscaler-dependent services because the hyperscaler typically does not consent to being included.

**The carve-out method is the norm in cloud SOC 2 reports.** The trap: a CSP can have a clean SOC 2 report by carving out everything important to the underlying hyperscaler, leaving only the thin layer of the CSP's own controls in scope. The reader has to obtain the hyperscaler's SOC 2 separately to get the full picture.

When reading a SOC 2 report from a cloud service that runs on hyperscaler infrastructure, **always identify the subservice carve-outs** and **always request the hyperscaler's complementary SOC 2 / C5 / ISAE 3402 report**. Without both, the assessment is incomplete.

:::tip[Architectural Pro Tip]
For procurement teams evaluating a cloud service via SOC 2: ask the CSP for **three documents in one request** — (1) their current SOC 2 Type 2 report covering the relevant Trust Services Criteria, (2) the SOC 2 / C5 / ISAE 3402 report of the underlying hyperscaler infrastructure they rely on (often available via the hyperscaler's trust centre — AWS Artifact, Microsoft Trust Center, Google Cloud Compliance), and (3) the User Entity Considerations from the SOC 2 report (sometimes called Complementary User Entity Controls). The third document tells the customer what controls they themselves must implement for the service organisation's controls to work as audited. Procurement teams who do not collect and read the User Entity Considerations consistently misestimate their own responsibilities under the shared-responsibility model.
:::

## Period of coverage and the gap problem

Type 2 reports cover a defined period. Two common periods:
- **12 months** — the typical full-year audit.
- **6 months** — common for the first Type 2 after a Type 1.

After the report period ends, there is a delay before the next report is issued: the auditor performs fieldwork, the report is drafted, reviewed, and published. This produces a **gap period** between the end of one report's coverage and the issuance of the next.

A CSP with a strong audit programme issues consecutive Type 2 reports with overlapping or near-overlapping periods, so the gap is minimal. A CSP whose latest Type 2 ended 12 months ago and has not been renewed is in a problematic state — the audit programme has slipped.

When evaluating a SOC 2 report in mid-2026:
- A 2025 Type 2 report ending December 2025, published March 2026 — current.
- A 2024 Type 2 report ending December 2024, no 2025 report — slipped.
- A Type 2 covering only 6 months — fine if it's the first Type 2 after a Type 1; concerning if it's a CSP that's been issuing reports for years.

## What SOC 2 does *not* cover

SOC 2 is service-organisation-level, criteria-based, and US-anchored. It does not cover:

- **Sovereignty and jurisdiction** — SOC 2 has no opinion on where data is processed or who has legal access. National frameworks (SecNumCloud) handle this.
- **Specific cryptographic requirements** — SOC 2 audits the existence of cryptographic controls, not algorithm prescriptions.
- **EU regulatory specifics** — GDPR Article 28 alignment, NIS2 reporting timelines, DORA CTPP designations are out of scope.
- **Entity-level cybersecurity** — SOC for Cybersecurity is a separate framework for that.

The strength of SOC 2 is its breadth and its widespread acceptance as a baseline. Its limitations are why national frameworks layer on top.

## SOC 2 and the European frameworks

SOC 2 maps explicitly to several EU frameworks:

- **BSI C5** explicitly recognises reuse of SOC 2 system descriptions and test results for overlapping controls. C5 and SOC 2 are commonly performed as a joint audit by the same audit firm.
- **EU Cloud Code of Conduct** references SOC 2 as evidence at Level 2 adherence.
- **ENS audit** can use SOC 2 evidence as material input to the ENAC-accredited audit.
- **PiTuKri ISAE 3000** uses the same audit methodology (ISAE 3000) as SOC 2 Type 2, making joint audits straightforward.

A CSP with a current SOC 2 Type 2 has substantial portable evidence into every EU national framework. The framework-specific audits add country-specific controls and sovereignty considerations on top.

:::warning[Reality Check]
"We have SOC 2" is the single most over-relied-on statement in cloud procurement. It can mean a current Type 2 covering all five TSC with no exceptions, audited by a top-tier firm, with hyperscaler complementary reports available. It can equally mean a one-time Type 1 from three years ago covering only Security, audited by a small regional firm, with carved-out subservices the CSP cannot name. The two are not equivalent. Treat the phrase as a starting point for verification, not as verification.
:::

:::tip[Slovak context]
For Slovak procurement (commercial and public-sector), **SOC 2 Type 2 + [BSI C5](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation) Type 2** is the standard combined evidence package expected from major cloud providers — NBS-supervised banks, public administration consuming services listed in [KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud), and large commercial entities all reference both. The combination is operationally efficient: the same audit firm typically produces both reports from one engagement, with overlap in system descriptions and control testing. For [KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) U2 and U3 evaluations, SOC 2 evidence is treated as material supporting input — it does not replace the Slovak-specific Cybersecurity Auditor opinion at U3/U4 but reduces the audit-preparation scope for the rest of the evidence package.
:::

## Closing checklist

- Three SOC reports — SOC 1 (financial), SOC 2 (operational), SOC 3 (public summary). For cloud, only SOC 2 is substantive evidence.
- Type 1 (design at a point in time) vs Type 2 (design + operating effectiveness over a period). **Type 2 is the substantive form**; Type 1 alone is interim.
- Trust Services Criteria — Security is mandatory; Availability, Processing Integrity, Confidentiality, Privacy are optional. Verify which are covered in the report you are reading.
- Anatomy: Auditor's opinion → Management assertion → System description → Criteria and test results → Other information.
- Read exception language carefully. Single isolated exceptions are normal; systemic exceptions are concerning; zero-exception reports may indicate either mature controls or shallow testing.
- Subservice carve-outs are the norm in cloud SOC 2 reports. Always obtain the underlying hyperscaler's complementary SOC 2 / C5 / ISAE 3402.
- User Entity Considerations / Complementary User Entity Controls — the controls the customer must implement for the service organisation's controls to work as audited. Read them.
- Period of coverage and report cadence matter. Slipped renewals are a real signal.
- SOC 2 does not cover sovereignty, prescribed cryptography, or EU regulatory specifics. National frameworks layer on top.
- See the [ISO baselines article](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines) for the standards that audit alongside SOC 2 in joint audit programmes, and the [BSI C5 article](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation) for the European framework most commonly paired with SOC 2.
