---
title: "Hyperscaler EU Data Boundary Commitments — What They Actually Mean"
category: compliance
tags: ["EU Data Boundary", "Hyperscaler", "Data Residency", "Sovereignty", "Compliance", "Data Security", "Vendor"]
date: 2026-05-10
updated: 2026-05-10
readTime: 11
level: intermediate
excerpt: "Microsoft EU Data Boundary, AWS European Sovereign Cloud, Google Workspace EU Data Boundary. Three different commitments, three different scopes, three different things being promised. This article unpacks what each actually covers, what each excludes, and how to read the technical small print."
references:
  - title: "Microsoft EU Data Boundary"
    url: "https://learn.microsoft.com/en-us/privacy/eudb/eu-data-boundary-learn"
    description: "Microsoft's EU Data Boundary technical documentation — what is in scope, what is excluded, the phased rollout, and the customer-facing controls."
    domain: "learn.microsoft.com"
  - title: "AWS Digital Sovereignty Pledge"
    url: "https://aws.amazon.com/blogs/security/aws-digital-sovereignty-pledge-control-without-compromise/"
    description: "AWS's Digital Sovereignty Pledge — the commitment framework that underlies the European Sovereign Cloud and customer-controlled sovereignty features on existing regions."
    domain: "aws.amazon.com"
  - title: "Google Workspace EU Data Boundary"
    url: "https://workspace.google.com/learn-more/eu-data-boundary/"
    description: "Google Workspace's EU Data Boundary commitment — covering customer data location for in-scope Workspace services."
    domain: "workspace.google.com"
  - title: "Google Sovereign Controls"
    url: "https://cloud.google.com/security/products/sovereign-controls"
    description: "Google Cloud's Sovereign Controls portfolio — Assured Workloads, Client-side encryption, and the partnership routes to sovereign delivery."
    domain: "cloud.google.com"
  - title: "EDPB — Schrems II Recommendations"
    url: "https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en"
    description: "The European Data Protection Board's recommendations on supplementary measures for transfers post-Schrems II — the regulatory context that drove hyperscaler EU Data Boundary commitments."
    domain: "edpb.europa.eu"
---

When a hyperscaler says "we keep your data in the EU," what they actually mean varies a lot. **Microsoft EU Data Boundary** is one commitment with phased scope, **AWS European Sovereign Cloud** is a different one with a different structure, **Google Workspace EU Data Boundary** is a third with a more limited application. None of them are the same as the [sovereign cloud products](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape) discussed in the parallel article — these are mainline-region commitments about where data physically sits, not separate products. This article unpacks what each commitment actually covers and what it excludes.

## What "EU Data Boundary" means and what it does not

EU Data Boundary commitments are commitments by a hyperscaler that **certain categories of customer data** will be **stored and processed** within the EU/EEA. The commitments are different from sovereignty in important ways:

| Concept | What it addresses |
|---|---|
| **EU Data Boundary** | Physical location of data storage and processing |
| **Sovereignty** | Ownership, jurisdiction, foreign-law access, operational control |
| **Data residency** | Often used interchangeably with EU Data Boundary, but more vendor-specific |

A hyperscaler's mainline region in the EU can credibly claim EU Data Boundary alignment. It cannot credibly claim ownership-based sovereignty, because the corporate structure remains under non-EU control. EU Data Boundary commitments are an answer to one set of concerns (data localisation, certain GDPR transfer concerns); they are not an answer to ownership-based sovereignty concerns (the kind SecNumCloud addresses).

The post-Schrems-II environment is what created market demand for these commitments. The EDPB's Schrems II Recommendations called for supplementary measures to address risks of foreign-law access to EU data; EU Data Boundary commitments are part of the hyperscaler response.

## Microsoft EU Data Boundary

Microsoft's EU Data Boundary is the most clearly defined and most operationally mature of the three. Microsoft published the framework in 2023 and has rolled it out in phases.

**Scope of services**: Microsoft 365 (Word, Excel, PowerPoint, Outlook, Teams, etc.), Azure, Dynamics 365, Power Platform. Not all services, not all features.

**Data categories covered**, in phased order:

- **Phase 1 — Customer Data** (completed): the customer's primary content — emails, documents, chat messages — for in-scope services. Stored and processed in EU/EEA.
- **Phase 2 — Pseudonymous Personal Data** (completed in 2024): data used for service operation (telemetry, diagnostic data, service logs) that contains personal data in pseudonymous form. Stored and processed in EU/EEA.
- **Phase 3 — Professional Services Data** (completed in 2024): data shared with Microsoft during support engagements. Storage and processing in EU/EEA with exceptions documented.

The EU Data Boundary covers the data lifecycle: storage, processing, ML/AI training (in scope for some services), customer support data (Phase 3).

**Explicit exclusions** Microsoft documents:

- Certain remote access by Microsoft personnel for support purposes may originate from outside the EU/EEA in escalated cases, under documented controls including Customer Lockbox where applicable.
- Specific service features that depend on global infrastructure (some cross-tenant collaboration scenarios).
- Backup and disaster recovery for some services may use globally-distributed infrastructure in defined patterns.
- Anti-malware and anti-abuse processing may use global infrastructure for threat detection.
- Data processed by third-party services integrated into Microsoft products is outside the boundary.

The Microsoft EU Data Boundary is the most documentation-heavy of the three. The level of technical specificity is high; the customer can verify what is and is not in scope down to specific service categories and data types.

## AWS — Digital Sovereignty Pledge and European Sovereign Cloud

AWS handles the question differently — through the **Digital Sovereignty Pledge** for existing regions and the **European Sovereign Cloud** as a separate dedicated region (covered in the [sovereign cloud products article](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape)).

**Digital Sovereignty Pledge** for mainline EU regions includes:

- Customer-controlled encryption with **AWS KMS External Key Store (XKS)** — keys held by the customer outside AWS, with cryptographic operations passing through customer-controlled key managers.
- **AWS Dedicated Local Zones** — infrastructure in specific Member States with restricted operational access.
- **Independent sovereign controls** — restricted access protocols for AWS personnel, with documented audit logs of access events.
- **Resilience** — committed availability of in-region services even during connectivity disruptions to non-EU AWS regions.

The Pledge is less about pure data location and more about **customer-controlled sovereignty**: even when AWS is the operator, the customer retains technical controls (especially encryption key custody) that limit AWS's access to plaintext data.

For data location specifically, AWS regions in Europe (Frankfurt, Ireland, London, Paris, Stockholm, Milan, Zurich, Spain) have always been EU-located. Customer data stored in an EU region stays in that region by default — global replication is an opt-in feature, not a default.

The **AWS European Sovereign Cloud** is a different proposition: a dedicated region with EU-resident operations under EU law, structurally separated from AWS's global infrastructure. Targeted for Brandenburg, Germany. Under construction as of mid-2026; not yet operational.

## Google Workspace and Google Cloud

Google's commitments split between Workspace and Cloud:

**Google Workspace EU Data Boundary** covers customer data location for Workspace services (Gmail, Drive, Docs, Meet, Calendar, etc.). The commitment addresses **primary customer data**:

- Email content for Gmail.
- Drive file content.
- Calendar event data.
- Docs/Sheets/Slides content.

Storage in EU regions; processing primarily in EU regions. Exceptions for global services like spam filtering, anti-abuse, and certain ML features.

**Google Cloud** offers Sovereign Controls as a portfolio rather than a single Data Boundary commitment:

- **Assured Workloads for the EU** — configuration overlay that enforces EU data residency and access restrictions on specific Google Cloud services.
- **Client-side Encryption** — customer-held keys with cryptographic operations on the customer side.
- **Sovereign Controls** layered with partnerships (T-Systems for specific verticals, S3NS for the French sovereign tier).

The Google Cloud approach is more configurable than Microsoft's blanket Data Boundary — customers select the level of sovereign controls per workload — but the documentation is less centralised. Procurement teams have to navigate multiple product pages to understand what is committed for their specific workload.

## What is *not* in any of these commitments

The hyperscaler EU Data Boundary commitments share important limitations:

**Foreign-law access** is not addressed by data location. A US-headquartered hyperscaler remains subject to US legal process (CLOUD Act, FISA) regardless of where data is stored. The substantive answer to foreign-law access concerns is either ownership-based sovereignty (JVs, EU-native operators) or strong customer-controlled encryption with customer-held keys (so that even if the hyperscaler is compelled to provide data, plaintext is not accessible without the customer's cooperation).

**Sovereign certification** under the strictest national frameworks (SecNumCloud) is not automatic. EU Data Boundary commitments do not satisfy SecNumCloud's ownership-and-immunity requirements. They may satisfy other frameworks (ENS High, ACN QC2, BSI C5 with EU-localised configuration) but the specifics depend on the framework.

**Service feature parity** with global mainline regions is generally maintained, but some features depend on global infrastructure (anti-abuse, certain ML services). These are usually documented as exclusions.

**Sub-processor independence** — the cloud provider's supply chain, including software vendors, ML model providers, security service providers, may still involve non-EU entities. EU Data Boundary commitments cover the cloud provider's data handling; they do not always extend to every supply-chain participant.

## The audit and verification question

EU Data Boundary commitments are commitments. The question of **how the customer verifies them** is operationally important.

Microsoft, AWS, and Google all rely on a combination of:

- **Contractual commitments** in the master services agreement.
- **Audit reports** (SOC 2, ISO, BSI C5, ENS, ACN, etc.) covering the data location controls.
- **Public documentation** detailing what is and is not in scope.
- **Customer Lockbox or equivalent** mechanisms providing the customer visibility into specific access events.
- **Compliance certifications** that include data residency as part of their criteria.

What is **not** typically available:

- Real-time per-request audit of where each piece of data is stored or processed.
- Independent verification by the customer of the underlying physical infrastructure.
- Cryptographically-enforced location guarantees (these are emerging — confidential computing trends in this direction — but are not yet standard).

The mature pattern is: rely on the contractual commitment + audit evidence as the substantive verification, with Customer Lockbox or equivalent for high-sensitivity access scenarios, and customer-held encryption for the highest-assurance workloads.

:::tip[Architectural Pro Tip]
For workloads where EU Data Boundary alone is insufficient and full sovereignty is overkill, the **strongest practical posture is EU mainline region + customer-held keys**. Use the hyperscaler's EU region as the operational platform; use BYOK or HYOK (Hold Your Own Key) with a customer-controlled key manager so that even authorised hyperscaler personnel cannot access plaintext without the customer's cryptographic cooperation. This is operationally simpler than a JV or sovereign region and addresses most of the substantive sovereignty concerns short of ownership-based foreign-law-immunity. See the [BYOK/HYOK article](/knowledge-base/compliance/cloud-encryption-key-custody-byok-hyok) for the deep dive on hyperscaler implementations (AWS KMS XKS, Azure Customer-Managed Keys with Managed HSM, Google Cloud External Key Manager, Google Workspace Client-side Encryption).
:::

## Operational data flow questions

For customers reading hyperscaler commitments and trying to assess whether they actually meet a specific regulatory expectation, the questions to ask:

**Storage**: Where is customer data stored at rest? Which regions are included in the commitment? Are backups stored in the same region or replicated?

**Processing**: Where is customer data processed? Is processing co-located with storage, or does it route through other regions for any operations?

**Logs and telemetry**: Are service logs containing customer-identifying information stored in the same region as customer data? What about diagnostic data?

**Customer support**: When a support engineer accesses customer data, where is that engineer located? What controls govern that access (Customer Lockbox, just-in-time provisioning)?

**Threat detection and anti-abuse**: Does the service use globally-distributed threat detection that processes customer data? If so, how is data minimised or anonymised before global processing?

**Backup and DR**: Where are backups stored? Where does DR data flow during failover events?

**Sub-processor data**: Do sub-processors (third-party services integrated into the cloud provider's offering) handle customer data in the EU only, or globally?

The hyperscaler documentation usually answers these questions, but not in a single document. Procurement teams should map their regulatory requirements to specific questions and verify the answers explicitly.

## The relationship to GDPR transfer mechanisms

EU Data Boundary commitments do not eliminate the need for GDPR transfer mechanisms (SCCs, BCRs) when transfers do occur. They reduce the volume of transfers covered by those mechanisms — data that stays in the EU does not need a transfer mechanism — but they do not address the residual transfers.

For workloads that fall fully within EU Data Boundary scope, the GDPR transfer chapter (Chapter V) is largely moot. For workloads with any out-of-scope data (telemetry, support access, sub-processor flows), Chapter V mechanisms still apply.

The [EU Cloud Code of Conduct Third Country Transfer Module](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct) is the operative GDPR-aligned framework for the residual transfer flows.

:::warning[Reality Check]
"Our data stays in the EU" is one of the most marketed and least precisely defined cloud commitments. The phrase can mean (1) the customer's primary data is stored in EU regions by default, (2) all data including telemetry and support access stays in the EU, (3) the hyperscaler is structurally an EU entity, or (4) something in between. The four commitments differ substantially. Procurement teams that don't distinguish among them end up with assumptions that don't survive audit. Always identify which specific EU Data Boundary commitment applies, what its scope is, and what its documented exclusions are.
:::

:::tip[Slovak context]
For Slovak [KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) procurement, hyperscaler EU Data Boundary commitments are the practical evidence layer for **U1 and U2 listings** — they demonstrate that customer data, telemetry, and support access stay within the EU/EEA. For **U3 listings**, EU Data Boundary alone is not sufficient; the methodology requires customer-held HSM-based key custody as well — see the [BYOK/HYOK article](/knowledge-base/compliance/cloud-encryption-key-custody-byok-hyok) for the practical implementation patterns. The combination is `EU Data Boundary + customer-managed keys with HSM` — which most regulated Slovak workloads now adopt. For NBS-supervised banks evaluating cloud providers under [DORA](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay) Article 30, EU Data Boundary documentation is the standard service-location-clause evidence; non-boundary commitments require bespoke contractual annexes.
:::

## Closing checklist

- EU Data Boundary commitments are about **data location** — where data is stored and processed. They are not about ownership-based sovereignty.
- **Microsoft EU Data Boundary** is the most clearly documented and most operationally mature. Phased rollout completed across Customer Data, Pseudonymous Personal Data, and Professional Services Data.
- **AWS Digital Sovereignty Pledge** for mainline regions focuses on customer-controlled sovereignty (encryption keys, restricted access, dedicated local zones). The **AWS European Sovereign Cloud** is a separate dedicated region under construction.
- **Google Workspace EU Data Boundary** covers customer data in Workspace services. **Google Cloud Sovereign Controls** is a configurable portfolio rather than a single commitment.
- All three commitments share limitations: they do not address foreign-law access (CLOUD Act, FISA), they do not automatically satisfy SecNumCloud-style sovereignty requirements, and they may have documented exclusions for specific service features.
- For sovereignty above EU Data Boundary, the practical pattern is **EU mainline + customer-held keys** (BYOK / HYOK / XKS / Client-side Encryption) addressing most concerns short of ownership-based foreign-law immunity.
- Verification relies on contractual commitments, audit reports, public documentation, and Customer Lockbox-style access controls. Real-time cryptographic location guarantees are not standard.
- GDPR Chapter V transfer mechanisms still apply to residual out-of-boundary flows (telemetry, support, sub-processors).
- See [Sovereign Cloud Products article](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape) for sovereignty-grade alternatives beyond EU Data Boundary, and the [GDPR Article 28 / CoC article](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct) for the transfer-mechanism layer.
