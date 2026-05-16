---
title: "Germany — BSI C5: The Attestation That Quietly Became Europe's Reference"
category: compliance
tags: ["Germany", "BSI C5", "BSI", "NIS2", "Compliance", "Data Security", "Attestation"]
date: 2026-04-14
updated: 2026-04-14
readTime: 12
level: intermediate
excerpt: "C5 is not a certification, it is an attestation — and that distinction matters. The framework most adopted by hyperscalers, the de facto reference for EUCS Substantial, and the one that pairs cleanly with SOC 2. C5:2026 was published in March 2026, with C5:2020 remaining operative until audit periods beginning on or after 1 June 2027."
references:
  - title: "BSI — Cloud Computing Compliance Criteria Catalogue (C5)"
    url: "https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/kriterienkatalog-c5_node.html"
    description: "BSI's official landing page for C5: scope, controls catalogue, audit methodology, and the relationship between C5 and procurement requirements for German federal authorities."
    domain: "bsi.bund.de"
  - title: "BSI — C5:2026 Catalogue"
    url: "https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/C5_2025/C5_2025_node.html"
    description: "BSI's page for the C5:2026 catalogue published in March 2026 — restructured for EUCS alignment, with new criteria for containers, supply-chain security, post-quantum cryptography, and confidential computing."
    domain: "bsi.bund.de"
  - title: "C5:2020 — Full Criteria Catalogue (PDF)"
    url: "https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/CloudComputing/ComplianceControlsCatalogue-Cloud_Computing-C5.pdf"
    description: "The full text of the C5:2020 criteria catalogue — 17 control domains, basic and additional criteria. Remains operative for audit periods beginning before 1 June 2027."
    domain: "bsi.bund.de"
  - title: "NIS2-Umsetzungsgesetz (NIS2UmsuCG)"
    url: "https://www.bsi.bund.de/DE/Das-BSI/Auftrag/Gesetze-und-Verordnungen/NIS-2/nis-2_node.html"
    description: "BSI's reference page for the German NIS2 transposition law, in force since 6 December 2025. Substantially revises the BSIG and brings approximately 29,500 entities into NIS2 scope."
    domain: "bsi.bund.de"
  - title: "AWS — BSI C5 Compliance"
    url: "https://aws.amazon.com/compliance/bsi-c5/"
    description: "AWS's trust centre page for BSI C5, showing the in-scope services per region, the auditor (EY), and the Type 2 attestation cadence."
    domain: "aws.amazon.com"
  - title: "Google Cloud — BSI C5 Compliance"
    url: "https://cloud.google.com/security/compliance/bsi-c5"
    description: "Google Cloud's C5 attestation documentation — scope, Type 2 cadence, and the relationship between C5 and Google's broader SOC 2 attestation."
    domain: "cloud.google.com"
  - title: "Microsoft Compliance — C5 Germany"
    url: "https://learn.microsoft.com/en-us/compliance/regulatory/offering-c5-germany"
    description: "Microsoft's compliance offering page for BSI C5 — covered services, Type 2 attestation cycle, and BSI's recognition of the report for German federal procurement."
    domain: "learn.microsoft.com"
---

The Cloud Computing Compliance Criteria Catalogue (C5) is, on paper, just one of Germany's many security guidance documents from the Bundesamt für Sicherheit in der Informationstechnik. In practice, C5 is the most adopted national cloud framework in the EU by hyperscaler count, the closest reference for the EUCS Substantial level, and the cleanest example of attestation-via-third-party-audit done well. This article walks through what C5 actually demands, how it differs from a certification, and why German pragmatism on sovereignty turned C5 into a continent-level reference.

## The system at a glance

The framework is **Cloud Computing Compliance Criteria Catalogue (C5)**. Two versions are operative as of mid-2026:

- **C5:2020** — published January 2020. Remains operative for Type 2 audit periods beginning **before 1 June 2027**.
- **C5:2026** — published as final version in March 2026. Applies to audit periods beginning **on or after 1 June 2027**. Substantial revision: 129 revised criteria, 39 new ones, restructured for EUCS alignment with criteria split into subcriteria. Adds explicit coverage of container management, supply-chain security, post-quantum cryptography, confidential computing, sharper client separation, and sovereignty. Integrates references to CSA CCM v4, ISO/IEC 27001:2022, and NIS2.

The first edition was published in 2016 as the "Cloud Computing Compliance Controls Catalogue". The 2020 revision restructured controls and tightened regulatory disclosure. The 2026 revision is the most significant update since the framework's inception and is intended to close the alignment gap between C5 and the post-NIS2 regulatory regime as audit periods migrate to C5:2026 from 1 June 2027 onward.

The framework is operated by the **Bundesamt für Sicherheit in der Informationstechnik (BSI)** — Federal Office for Information Security, Bonn. BSI does not audit cloud services directly. It defines the criteria; accredited third-party auditors perform the attestation work; BSI maintains the credibility of the framework through its mandate under the BSI Act (BSIG).

The result is an attestation, not a certification. The distinction is structural: a certification is granted by a body that takes responsibility for the assessment; an attestation is a third-party auditor's statement that, in their professional opinion, the controls described are designed (Type 1) or effective (Type 2). C5 reports look like SOC 2 reports because they are produced under the same audit standards.

## Legislative basis

C5 sits in an unusual legal position. It is not anchored in a single dedicated statute. Its authority derives from:

- **BSIG (Gesetz über das Bundesamt für Sicherheit in der Informationstechnik)** — gives BSI its general mandate.
- **IT-Grundschutz** — the umbrella framework that C5 inherits from.
- **Federal procurement rules** — C5 attestation is "a basic requirement in the procurement process" for federal authorities, in BSI's own language.

For regulated industries beyond federal procurement:

- **BAIT / VAIT** — the banking and insurance supervisory authority guidance — references C5 as an acceptable attestation form.
- **NIS2-Umsetzungsgesetz (NIS2UmsuCG)** — the German NIS2 transposition. **In force since 6 December 2025** (entered into force the day after publication in the Bundesgesetzblatt). Substantially revises the BSIG. The BSI registration portal opened on 6 January 2026; the registration deadline for regulated entities was 6 March 2026. Scope expanded from approximately 4,500 to approximately 29,500 entities. C5 reports are treated as relevant evidence for the cloud-as-supply-chain controls that fall on essential entities. Fines of up to €10 million or 2% of global turnover.

C5 is mandatory by procurement gravity, not by direct statutory command. The effect is the same in practice.

## Scope of obligation

The obligation pattern is asymmetric:

- **German federal authorities** require C5 attestation in procurement as a baseline. Without C5, a CSP cannot reasonably bid.
- **Regulated sectors** — banking, insurance, healthcare — use C5 as the de facto attestation form. BAIT/VAIT specifically reference it.
- **Commercial sector** — C5 adoption has spread beyond regulated industries because customers ask for it. Most large German enterprises now expect C5 from any cloud provider they consume.
- **Cloud providers** are voluntary applicants. The voluntary nature is nominal; the procurement pressure makes it effectively required for the German enterprise market.

BSI's own summary as of recent reporting describes "more than a dozen attestations for national, European and global cloud providers." The list includes AWS, Microsoft Azure, Google Cloud, SAP, F5, Cisco, and a long tail of mid-size providers.

## Classification model

C5 does not have a multi-level classification model. It distinguishes only:

- **Basic criteria** — the mandatory minimum, applicable to every in-scope service.
- **Additional criteria** — selected by the customer's risk profile and the service's positioning. Not every C5 report covers every additional criterion.

C5:2026 keeps this basic/additional split but restructures criteria into **subcriteria** for finer EUCS alignment.

In addition to controls, C5 imposes **regulatory disclosure obligations** that are unusual among cloud frameworks. The attested provider must disclose:

- Jurisdictions where the service operates and where data may be processed.
- Locations of subprocessing.
- Other certifications and attestations held.
- The provider's obligations to disclose data to public authorities under the jurisdictions involved.
- A complete description of the service.

This disclosure layer is the practical answer C5 gives to the sovereignty question — not by excluding non-EU providers, but by making jurisdictional exposure transparent and auditable.

## Evaluation criteria

C5:2020 organises controls into **17 domains**. The controls are derived from:

- **[ISO/IEC 27001 / 27002 / 27017 / 27018](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines)** — see the dedicated baseline article.
- **BSI IT-Grundschutz-Kompendium**, 2nd edition (2019) — the German baseline security framework.
- **[CSA Cloud Controls Matrix](/knowledge-base/compliance/csa-star-registry-cross-cutting-trust-layer) 3.0.1**.
- **AICPA Trust Service Criteria 2017** — the [SOC 2](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them) reference set.
- Relevant parts of **[ANSSI Référentiel SecNumCloud](/knowledge-base/compliance/france-anssi-secnumcloud-qualification)**.

**C5:2026** updates the reference base to **ISO/IEC 27001:2022**, **CSA CCM v4**, and integrates explicit NIS2 references. New control areas cover container management, supply-chain security, post-quantum cryptography readiness, confidential computing, and tightened client separation requirements.

The C5 catalogue is explicit about mapping to these other frameworks, which is why C5 audits are routinely combined with SOC 2 audits. BSI explicitly recognises the reuse of system descriptions and control test results across overlapping scopes.

The required system description is detailed: jurisdiction, processing locations, operational models, subprocessing chain, related certifications, public-authority disclosure obligations. Less detailed system descriptions produce attestations with caveats.

## The assessment process

C5 attestation runs as a third-party audit engagement under:

- **ISAE 3000** — assurance engagement standard for non-financial information.
- **ISAE 3402** — assurance reports on controls at a service organisation.

The audit is performed by an accredited auditor — in practice, the large audit firms (EY, KPMG, PwC, BDO) dominate the C5 attestation work. The audit takes one of two forms:

- **Type 1** — the design of controls at a point in time.
- **Type 2** — the operational effectiveness of controls over a period (typically 12 months).

Type 2 is what BSI and procurement bodies actually look for. Type 1 has limited standalone value; it is sometimes used as an interim step.

Public costs for C5 Type 2 are not published. From industry practice, large CSPs running annual Type 2 attestations spend in the high hundreds of thousands to low millions of euros per year on audit fees and supporting work. The cost scales with scope (services in scope) and with the supporting attestations the provider also wants to publish.

A C5 audit can be combined with a SOC 2 audit. The overlapping controls (organisation, change management, monitoring, incident response) are audited once and reported under both frameworks. This is the practical reason hyperscalers publish both: marginal cost is low once the SOC 2 audit is already running.

## Catalogue and recertification

BSI does **not** maintain a centralised marketplace of attested services. The pattern is distributed: each attested provider publishes their C5 report in their own trust centre. AWS, Microsoft, and Google make their C5 attestations available through their compliance portals; mid-size providers publish through their own documentation.

This is operationally different from the Italian or Slovak models. There is no single URL to check whether a service is C5-attested. A consumer has to either request the report directly from the provider or rely on the provider's trust centre.

Recertification:

- **Type 2 reports** are typically issued **annually**, covering a 12-month observation period.
- The observation period and the report date are independent; reports are usually dated 1–3 months after the period ends, accounting for the auditor's fieldwork.
- A gap of more than 12 months between Type 2 reports breaks the continuity that procurement-side consumers rely on.

The annual cadence is the strongest discipline in C5. Slip the year and the attestation lapses.

## Sanctions and oversight

C5 is an attestation, not a certification with formal sanctions. The consequences of failing or losing C5 are reputational and procurement-driven:

- Loss of the annual attestation excludes the CSP from federal procurement processes that require it.
- An auditor's refusal to renew on the basis of unremediated findings is a public signal in itself, since the absence of a current C5 report is visible to procurement teams.
- For NIS2-regulated entities under the German **NIS2-Umsetzungsgesetz (in force since 6 December 2025)**, statutory sanctions apply independently — up to €10 million or 2% of global turnover for essential entities.

The German system separates the *attestation* layer (C5 audit by accredited auditor) from the *enforcement* layer (NIS2 supervisor, sectoral regulators like BaFin). Failing C5 does not directly trigger fines; it triggers procurement exclusion and informs the supervisory regime that runs on top.

:::tip[Architectural Pro Tip]
The single highest-leverage move for any CSP serving German enterprises is to **run C5 Type 2 and SOC 2 Type 2 audits jointly with a single audit firm**. The control overlap is large, the system descriptions are reusable, and the marginal cost of the second attestation is a fraction of running them separately. CSPs that run C5 separately from SOC 2 typically pay twice for largely the same audit work and end up with two reports whose scope drifts apart over revisions.
:::

## Sovereignty posture

C5's sovereignty posture is **transparency rather than exclusion**. The framework does not impose ownership caps on the provider, does not require EU headquartering, and does not require immunity from extraterritorial law. It does require detailed disclosure of:

- Jurisdictions of operation and data processing.
- Other regulatory obligations the provider is subject to (including CLOUD Act exposure).
- The chain of subprocessors and their jurisdictions.

The political position is that a regulated customer should be able to *see* the jurisdictional exposure and decide whether it is acceptable for their risk profile. This is fundamentally different from the French SecNumCloud posture, which excludes non-EU-controlled providers from the sovereign tier outright.

In the EUCS debate, C5 is the reference for the **Substantial** level — the rigorous-but-non-sovereign tier. The political flexibility of C5 is what made it adoptable by US hyperscalers and what positions it as the natural EUCS Substantial baseline.

In March 2026, ANSSI and BSI published a **joint statement on harmonised cloud-sovereignty criteria** — a notable bilateral step toward narrowing the FR–DE sovereignty divergence that has blocked EUCS. The statement does not yet constitute a binding agreement on EUCS High+ content, but it is the first public signal that the two anchor positions (French exclusion-based sovereignty, German transparency-based) are seeking common operational ground.

## Multicloud factor

For a multinational CSP, C5 is structurally compatible with most other frameworks:

- The control set maps cleanly to [ISO 27001/27017/27018](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines), [CSA CCM](/knowledge-base/compliance/csa-star-registry-cross-cutting-trust-layer), and AICPA TSC. The mapping is explicit in the C5 catalogue, not inferred.
- The ISAE 3000 audit form is portable. [PiTuKri](/knowledge-base/compliance/finland-pitukri-cloud-assessment) assessments in Finland use ISAE 3000 Type 2; [SOC 2](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them) uses essentially the same auditor methodology.
- The annual cadence aligns with SOC 2 Type 2, simplifying joint audits.
- The system description and subprocessing disclosure pieces feed directly into [ENS](/knowledge-base/compliance/spain-ens-national-security-framework), [ACN](/knowledge-base/compliance/italy-acn-cloud-qualification), and [KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) documentation requirements.

The pieces of C5 that do *not* port automatically:

- Some additional criteria are German-jurisdiction-specific (e.g., handling of disclosure to German public authorities). These need wording adjustments for other jurisdictions even when the underlying control exists.
- The IT-Grundschutz reference layer is German. Other countries' baselines (ANSSI, NIST, CIS) cover similar ground but with different terminology and emphasis.

The C5 report itself is portable as evidence into other frameworks. It is not equivalent to an ENS or ACN certification, but auditors and procurement bodies in those jurisdictions accept C5 as substantial supporting evidence that reduces the scope of locally-required work.

:::warning[Reality Check]
C5 attestation is sometimes treated as the "gold standard" that, once held, settles every other compliance question. It does not. C5 is rigorous on technical and organisational controls, transparent on jurisdiction, and procurement-relevant in Germany — but it is not a sovereignty certification, and it does not satisfy French, Italian PSN, or Slovak U4 requirements that include sovereignty or state-controlled infrastructure dimensions. CSPs that pitch "we have C5, that's enough" to French or Italian public-sector buyers learn this in the qualification process. C5 is the *baseline*, not the *summit*.
:::

## Closing checklist

- C5 is an attestation under ISAE 3000 / ISAE 3402, not a certification. Distinguish accordingly — there is no certifying body, only accredited auditors and BSI's published criteria.
- The framework is procurement-mandatory for German federal authorities and de facto required for the German enterprise market in regulated sectors.
- **Two versions are operative as of mid-2026: C5:2020** for audit periods beginning before 1 June 2027; **C5:2026** (published March 2026) for audit periods beginning on or after that date.
- C5:2020 covers 17 control domains derived from ISO 27001:2013, IT-Grundschutz, CSA CCM, AICPA TSC. C5:2026 updates to ISO/IEC 27001:2022, CSA CCM v4, integrates NIS2, and adds explicit coverage of container management, supply chain, post-quantum cryptography, and confidential computing.
- Type 2 reports are issued annually. Annual cadence is the strongest C5 discipline; slipping it breaks procurement continuity.
- **NIS2-Umsetzungsgesetz in force since 6 December 2025.** BSI registration deadline 6 March 2026. Roughly 29,500 entities in scope. Fines up to €10 million or 2% of global turnover for essential entities.
- There is no central catalogue. Each provider publishes its report in their trust centre. Procurement teams verify directly.
- Sovereignty posture is transparency, not exclusion. C5:2026 adds explicit sovereignty treatment but does not exclude non-EU providers.
- Run C5 jointly with SOC 2 Type 2. The overlap is large; the marginal cost is low; the operational discipline is shared.
- For multinational CSPs, C5 is the natural baseline. Layered on top of ISO 27001/27017/27018 and SOC 2, it gives you Germany. For France, Italy PSN tier, or Slovak U4, additional sovereignty-specific work is required.
- Plan the C5:2020 → C5:2026 transition: align audit scope with the new reference standards (ISO/IEC 27001:2022, CSA CCM v4) ahead of the 1 June 2027 cut-over so the first C5:2026 audit is not a fresh remediation cycle.
- **What to read next:** [SOC 2 Reports](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them) for the joint-audit partner most commonly paired with C5; [Reading Attestation Reports](/knowledge-base/compliance/reading-cloud-attestation-reports-practitioner-guide) for the practitioner skill of evaluating C5 reports; [EUCS Watch](/knowledge-base/compliance/eucs-watch-political-tracking-2026) for the political context of C5's positioning as the EUCS Substantial reference.
