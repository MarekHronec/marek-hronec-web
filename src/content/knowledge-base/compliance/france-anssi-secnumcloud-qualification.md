---
title: "France — ANSSI SecNumCloud: The Strictest Sovereignty Framework in the EU"
category: compliance
tags: ["France", "ANSSI", "SecNumCloud", "NIS2", "Compliance", "Data Security", "Sovereignty"]
date: 2026-04-22
updated: 2026-05-15
readTime: 12
level: intermediate
excerpt: "Single qualification level, 350+ requirements, hard caps on non-EU ownership, immunity from extraterritorial law. SecNumCloud is the framework that defined the modern EU sovereignty debate."
references:
  - title: "ANSSI — SecNumCloud"
    url: "https://cyber.gouv.fr/secnumcloud"
    description: "ANSSI's official landing page for SecNumCloud, including the current qualified providers list, the qualification process, and the 'Visa de sécurité' designation."
    domain: "cyber.gouv.fr"
  - title: "SecNumCloud 3.2.a — English Reference Document (PDF)"
    url: "https://www2.itif.org/2021-secnumcloud-3.2.a-english-version.pdf"
    description: "The English-language version of the SecNumCloud 3.2 reference framework — the 350+ requirements, six audit categories, fourteen security themes, and the sovereignty clauses."
    domain: "itif.org"
  - title: "SecNumCloud Qualification Guide (Scalingo)"
    url: "https://scalingo.com/blog/secnumcloud-qualification-anssi-guide"
    description: "A practitioner walkthrough of the SecNumCloud qualification process from a French CSP that has undergone it — costs, timelines, and operational implications."
    domain: "scalingo.com"
  - title: "Cloud at the Centre Doctrine (DINUM)"
    url: "https://www.numerique.gouv.fr/doctrine-cloud-au-centre/"
    description: "The French government's official 'Cloud au centre' doctrine — the policy framework that mandates SecNumCloud-qualified hosting for sensitive public-sector workloads."
    domain: "numerique.gouv.fr"
  - title: "SREN Law (10 April 2024)"
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049448410"
    description: "The French law on securing and regulating the digital space — the statute that reinforces SecNumCloud's application in public procurement."
    domain: "legifrance.gouv.fr"
  - title: "Loi Résilience — French NIS2 Transposition Bill"
    url: "https://www.senat.fr/dossier-legislatif/pjl24-033.html"
    description: "Senate dossier for the projet de loi relatif à la résilience des activités d'importance vitale et à la protection des infrastructures critiques — the French NIS2 transposition bill. Adopted by the Senate 12 March 2025; in National Assembly review."
    domain: "senat.fr"
  - title: "ANSSI ReCyF — French Cyber Reference Framework"
    url: "https://cyber.gouv.fr/recyf"
    description: "ANSSI's French Cyber Reference Framework, published 17 March 2026 — recommended measures aligned with NIS2 objectives. Works alongside SecNumCloud rather than replacing it."
    domain: "cyber.gouv.fr"
  - title: "MonEspaceNIS2 — ANSSI Entity Self-Assessment Portal"
    url: "https://cyber.gouv.fr/monespacenis2"
    description: "Live ANSSI portal for entity identification and NIS2 self-assessment under the forthcoming Loi Résilience regime."
    domain: "cyber.gouv.fr"
---

SecNumCloud is the framework that turned the EU cloud sovereignty debate from academic into industrial. It has a single qualification level, more than 350 strict requirements, and ownership rules that effectively exclude US-controlled providers from running sovereign workloads under their own names. This article walks through what SecNumCloud requires, why the French position is what it is, and how multinational CSPs actually navigate it (mostly through joint ventures).

## The system at a glance

The framework is the **Référentiel SecNumCloud**, current version **3.2** (published March 2022, with ongoing maintenance). The "Visa de sécurité" — Security Visa — is the formal qualification awarded by ANSSI to providers that pass the assessment.

The framework is operated by **Agence nationale de la sécurité des systèmes d'information (ANSSI)** — the French national cybersecurity agency. Submissions go through accredited auditors; third-party auditing is performed by entities such as AFNOR Certification, LSTI, and Bureau Veritas.

SecNumCloud applies a single qualification level. There is no Basic / Substantial / High gradient. The framework's position is that "sensitive enough to require SecNumCloud" is one threshold, and below it generic cybersecurity controls apply; above it, the highest classification levels (Diffusion Restreinte, Secret Défense) are out of scope and handled under separate frameworks (II 901, IGI 1300).

## Legislative basis

SecNumCloud is anchored in a stack of regulatory instruments:

- **Référentiel Général de Sécurité (RGS)** — the framework law for information systems in public administration.
- **"Cloud au centre" doctrine** (2021, updated 2023) — the executive policy that requires sensitive public-sector data to be hosted on SecNumCloud-qualified services.
- **SREN Law** (loi visant à sécuriser et réguler l'espace numérique), 10 April 2024 — reinforces SecNumCloud application in public procurement and introduces sanctions for procurement non-compliance.
- **NIS2 transposition** — the *loi Résilience* (projet de loi relatif à la résilience des activités d'importance vitale et à la protection des infrastructures critiques) was adopted by the Senate on 12 March 2025 and revised by the National Assembly special commission on 10 September 2025. **Not yet in force as of mid-2026**; entry into force expected in 2026 once final adoption and implementing decrees publish. France received a reasoned opinion from the European Commission on 7 May 2025 for non-notification of full NIS2 transposition. French essential and important entities will increasingly be required to use SecNumCloud-qualified providers for sensitive workloads under the new act.
- **French Cyber Reference Framework (ReCyF)** — published by ANSSI on 17 March 2026. Lists recommended measures aligned with NIS2 objectives; works alongside SecNumCloud rather than replacing it. The MonEspaceNIS2 portal (cyber.gouv.fr) is live for entity identification and self-assessment.

The combined effect: SecNumCloud is binding for state administration and for Opérateurs d'Importance Vitale (OIV) and Opérateurs de Services Essentiels (OSE) handling sensitive data. The SREN law gives procurement officers the legal basis to enforce it.

## Scope of obligation

The obligation pattern is the strictest in the EU:

- **State administration** — required to use SecNumCloud-qualified providers for sensitive workloads per the "Cloud au centre" doctrine.
- **OIV (Opérateurs d'Importance Vitale)** — operators of critical importance under the French national security framework.
- **OSE (Opérateurs de Services Essentiels)** — operators of essential services under NIS / NIS2.
- **Healthcare entities** handling health data.
- **Subjects under ANSSI or DINUM supervision** generally.

The scope expands as French essential-entity designation under NIS2 broadens. CSPs that want to serve French public-sector and critical-infrastructure markets need the qualification.

The sovereignty layer in scope is unique: SecNumCloud includes a **requirement of immunity from extraterritorial law**, specifically targeting the US CLOUD Act. The qualified provider must be headquartered in the EU and have ownership / voting rights from non-EU entities **capped at 24% individually and 39% collectively**. This explicitly excludes US-headquartered hyperscalers from direct qualification.

## Classification model

SecNumCloud does not have classification levels in the multi-tier sense. It has a single qualification baseline that applies to "sensitive data" — the layer between general operational data and classified national security data.

For higher tiers:

- **Diffusion Restreinte (DR)** — restricted distribution, covered under II 901.
- **Confidentiel Défense, Secret Défense** — covered under IGI 1300.

These are not SecNumCloud's territory. The framework's design intent is the sensitive-but-not-classified band, which in practice covers most public-sector personal data, health data, and national-importance commercial data.

## Evaluation criteria

SecNumCloud 3.2 contains **more than 350–360 requirements** — making it significantly more prescriptive than [BSI C5](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation) or [ENS](/knowledge-base/compliance/spain-ens-national-security-framework). Organised into:

- **6 audit categories** — corresponding to control families.
- **14 security themes** — the operational domains.

The reference base is [ISO/IEC 27001](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines) Annex A, but SecNumCloud is significantly more prescriptive. It covers:

- **Information security organisation and risk management** — formal structures, named responsibilities, documented risk appetite.
- **Cryptography** — algorithms must follow ANSSI recommendations. This is more constraining than ISO/IEC 27001, which is algorithm-neutral.
- **Identity and access management** — mandatory MFA, strict tenant isolation.
- **Configuration audits**.
- **PASSI audits** (Prestataires d'Audit de la Sécurité des Systèmes d'Information) — qualified security auditors, mandatory at least annually.
- **Incident management, continuity, GDPR compliance.**

SecNumCloud covers **IaaS, PaaS, SaaS**, and (from version 3.2) **CaaS** (Containers as a Service).

A practical feature: **service composition**. A PaaS built on an already-qualified IaaS does not require full re-qualification of the underlying layer. This reduces the friction of running qualified higher-level services on qualified lower-level platforms.

## The assessment process

SecNumCloud qualification runs through **four milestones plus maintenance**:

1. **J1 — Audit initial** — gap analysis by an accredited PASSI auditor.
2. **Implementation work** — the provider remediates the gaps.
3. **J2 — Final audit** — verification of full compliance.
4. **J3 — ANSSI validation** — formal grant of the "Visa de sécurité"; public announcement on the ANSSI website.
5. **Maintenance** — mandatory annual **surveillance audit**.

The total time is typically **2 years of work**. Cegedim.cloud, qualified in December 2024, ran a 2-year program. The PASSI audit itself takes weeks; the gap remediation is the long pole.

Costs are not publicly published. Industry practice puts SecNumCloud preparation in the **low to mid hundreds of thousands of euros** for a mid-size CSP — significantly more than ISO 27001. For small and mid-size enterprises, France's BPI France runs a **€3.5 million support programme** for SecNumCloud preparation, launched in cooperation with ANSSI and DGE; this offsets some of the audit and consulting cost for qualifying SMEs.

## Catalogue and recertification

The list of qualified providers is maintained on the **ANSSI website** — verify the current count directly there, as qualifications are granted, renewed, and expanded throughout the year. As of mid-2026 a small number of providers hold qualification (including 3DS Outscale, OVHcloud, Cegedim.cloud, and S3NS) with additional candidates in the pipeline. Recent milestones:

- **S3NS PREMI3NS** (Thales + Google Cloud) — qualified December 2025; first joint IaaS/PaaS/CaaS qualification.
- **Bleu** (Microsoft + Orange + Capgemini) — milestone J0 validated 17 April 2025; full qualification expected during 2025–2026.
- **ITS Integra** — milestone J1 validated December 2025.

Known holders of qualification 3.2 include **3DS Outscale** (Dassault Systèmes), **OVHcloud**, **Cegedim.cloud**, and **S3NS**.

In March 2026 ANSSI and BSI published a **joint statement on harmonised cloud-sovereignty criteria** — a notable bilateral step toward narrowing the FR–DE sovereignty divergence that has blocked EUCS.

Recertification:

- **3-year validity** of the Visa de sécurité.
- **Annual surveillance audit** — mandatory.
- **Renewal** goes through the same 4 milestones.

The annual surveillance audit is not a paperwork exercise. It is a real audit at reduced scope; findings can result in suspension.

## Sanctions and oversight

Sanctions under SecNumCloud operate at multiple layers:

- **Loss of qualification** automatically triggers the customer's **right to terminate the contract without penalty** — explicitly defined in the 3.2.a reference document.
- For public-sector customers, loss of qualification means the service can no longer be procured for sensitive workloads under the Cloud au centre doctrine.
- Failure to comply with the doctrine itself triggers sanctions under the **SREN law** for public procurers.
- NIS2 sanctions apply on top via the French NIS2 transposition.

The contract-termination clause is the most operationally significant: customers do not have to negotiate exits; the loss of qualification is the trigger.

## Sovereignty posture

This is the section that distinguishes SecNumCloud from every other EU national framework. The sovereignty posture has three components:

**Ownership cap.** Non-EU entities may hold no more than **24% of capital or voting rights individually**, and **39% collectively**. This is an explicit exclusion of US-controlled hyperscaler operations. It is also why the major US hyperscalers have entered the French market through joint ventures (Bleu, S3NS) rather than under their own names.

**Headquartering requirement.** The qualified entity must be headquartered in the EU. A French subsidiary of a US parent does not satisfy this if the parent has the level of control that triggers extraterritorial law exposure.

**Immunity from extraterritorial law.** Explicit requirement that the provider not be subject to the US CLOUD Act or equivalent foreign data-access regimes. This is verified at the corporate-structure level, not just contractually.

In the [EUCS debate](/knowledge-base/compliance/eucs-watch-political-tracking-2026), SecNumCloud is the model for the **High+** assurance level — the sovereignty-strict tier that was in the 2023 draft and was removed or weakened in the March 2024 draft. France has been the principal political force behind keeping a sovereignty layer in EUCS, which is why the scheme has been stuck since 2024.

In **March 2026, ANSSI and BSI published a joint statement on harmonised cloud-sovereignty criteria** — the first public bilateral step toward narrowing the FR–DE divergence that has blocked EUCS. It is a statement of direction, not yet a binding agreement on EUCS High+ content. Worth tracking as a leading indicator on whether French and German positions are converging on operational common ground.

:::tip[Architectural Pro Tip]
For a multinational CSP wanting to serve French public-sector sensitive workloads, the realistic options are: (1) qualify a French subsidiary that genuinely meets the ownership and immunity tests, which is rare and structurally hard; (2) form a joint venture with a French majority partner — the Bleu and S3NS routes; (3) accept exclusion from the qualified tier and compete only for non-sensitive workloads under "Cloud au centre." Trying to argue around the ownership and immunity rules without restructuring is not a path that works in the qualification process. Plan for one of the three options, not for a fourth.
:::

## Multicloud factor

For a multinational CSP, SecNumCloud is structurally incompatible with direct qualification under the parent company. The framework's design assumes EU-controlled providers and audits accordingly.

The patterns that have emerged:

- **Joint ventures with French operators** — Bleu (Microsoft + Orange + Capgemini), S3NS (Google + Thales). The JV is the qualified entity; the parent provides technology under licence. This satisfies SecNumCloud while still leveraging hyperscaler capability.
- **EU-native providers** running on their own infrastructure — 3DS Outscale, OVHcloud, Cegedim.cloud. No JV needed; the corporate structure naturally satisfies the requirements.
- **Dedicated French sovereign regions** — operated by JVs or EU-native partners with no parent-company access to operational data.

For the rest of the EU, SecNumCloud's qualified providers are recognised as the high-sovereignty reference but are not usable directly in other countries' sovereign tiers. ENS Alta, ACN QC4, and KsVC U4 each have their own framework-specific assessment paths that overlap with SecNumCloud but do not equate to it.

The reverse holds too: a CSP that holds SecNumCloud does not need to repeat that work for other frameworks, but it does need to document the equivalences and produce framework-specific evidence packages. Carriage of evidence is the simpler part; getting the JV structure right is the harder part.

:::warning[Reality Check]
The argument that "SecNumCloud is protectionism dressed as cybersecurity" has been made publicly by US hyperscalers and by some EU member states (NL, IE, SE, FI) opposed to strict EUCS sovereignty rules. The argument has technical merit and political weight, but it has not moved the French position in five years of debate. SecNumCloud is the policy France will continue to apply, the doctrine will continue to mandate, and the SREN law will continue to enforce. Strategies that assume France will soften the rules to accommodate hyperscaler structures are strategies that have not aged well. Plan accordingly — qualify a JV, partner with a qualified EU-native provider, or accept the exclusion.
:::

## Closing checklist

- SecNumCloud is single-level, very strict, and tied to a public doctrine ("Cloud au centre") and a recent statute (SREN, April 2024). It applies to state administration, OIV, OSE, healthcare, and an expanding NIS2-essential-entities scope.
- 350+ requirements across 6 audit categories and 14 security themes. ISO/IEC 27001 is the base, but the framework is far more prescriptive — especially on cryptography, MFA, tenant isolation, and audit cadence.
- Sovereignty rules are explicit: ≤24% individual / ≤39% collective non-EU ownership, EU headquartering, immunity from extraterritorial law (notably the US CLOUD Act).
- Qualification is a 4-milestone process (initial audit → remediation → final audit → ANSSI validation), typically 2 years. Annual surveillance audit is mandatory.
- Validity is 3 years; renewal goes through the same process. Loss of qualification automatically triggers customer right of termination without penalty.
- The qualified providers list is short and changes as qualifications are granted and renewed — check the ANSSI website for the current count. Known holders include 3DS Outscale, OVHcloud, Cegedim.cloud, and S3NS.
- For multinational CSPs, the joint-venture model is the practical route: Bleu (Microsoft + Orange + Capgemini), S3NS (Google + Thales). Direct qualification of a US-controlled subsidiary is not a path that works structurally.
- In the EUCS debate, SecNumCloud is the model for the High+ tier that has been the blocking point since 2024. The French position on sovereignty has not softened and is unlikely to.
- **What to read next:** [Sovereign Cloud Products article](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape) for Bleu, S3NS, and other JV product details; [EUCS Watch](/knowledge-base/compliance/eucs-watch-political-tracking-2026) for the political context of the SecNumCloud-EUCS High+ relationship; [BYOK/HYOK article](/knowledge-base/compliance/cloud-encryption-key-custody-byok-hyok) for the cryptographic patterns that complement SecNumCloud qualification.
