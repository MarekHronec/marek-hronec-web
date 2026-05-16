---
title: "Netherlands — BIO2: Government Baseline Becoming a Statutory Obligation"
category: compliance
tags: ["Netherlands", "BIO2", "BZK", "NIS2", "Compliance", "Data Security"]
date: 2026-05-05
updated: 2026-05-05
readTime: 10
level: intermediate
excerpt: "BIO2 v1.3 is the Dutch government's security baseline since 5 March 2026, superseding BIO v1.04zv. The Cyberbeveiligingswet — the Dutch NIS2 transposition — was approved by the Tweede Kamer on 15 April 2026 and is in Senate review. The cloud profile is operated by hyperscalers via independent attestation."
references:
  - title: "BIO2 — Baseline Informatiebeveiliging Overheid (Working Version)"
    url: "https://minbzk.github.io/Baseline-Informatiebeveiliging-Overheid/"
    description: "The Ministry of the Interior's official working version of BIO2, including the 200+ government-specific measures layered on top of ISO/IEC 27001:2023 and 27002:2022."
    domain: "minbzk.github.io"
  - title: "Digitale Overheid — BIO and ENSIA"
    url: "https://www.digitaleoverheid.nl/overzicht-van-alle-onderwerpen/cybersecurity/bio-en-ensia/"
    description: "The Dutch government's public portal for BIO and the annual ENSIA self-assessment process for municipalities, provinces, water authorities, and central organisations."
    domain: "digitaleoverheid.nl"
  - title: "BIO for the Dutch Public Sector — AWS"
    url: "https://aws.amazon.com/contract-center/bio-for-the-dutch-public-sector/"
    description: "AWS's BIO compliance documentation, including the BIO Thema-uitwerking Clouddiensten attestation issued via EY CertifyPoint as the monitoring body."
    domain: "aws.amazon.com"
  - title: "AWS Landing Zone for BIO and Thema-uitwerking Clouddiensten"
    url: "https://aws.amazon.com/blogs/security/aws-launched-a-landing-zone-for-the-baseline-informatiebeveiliging-overheid-bio-and-is-issued-a-certificate-for-the-bio-thema-uitwerking-clouddiensten/"
    description: "AWS's announcement of its BIO landing zone and the Thema-uitwerking Clouddiensten certificate — a working example of how hyperscalers demonstrate BIO compliance in practice."
    domain: "aws.amazon.com"
  - title: "Baseline Information Security for Government — English Overview"
    url: "https://www.nldigitalgovernment.nl/overview/baseline-information-security-for-government/"
    description: "The Dutch Digital Government English-language overview of BIO, its scope, the four government layers it covers, and its relationship to the Cyberbeveiligingswet (Cbw) — the NIS2 transposition."
    domain: "nldigitalgovernment.nl"
  - title: "Cyberbeveiligingswet (Cbw) — Dutch NIS2 Transposition"
    url: "https://www.rijksoverheid.nl/onderwerpen/cybersecurity/cyberbeveiligingswet"
    description: "Rijksoverheid landing page for the Cyberbeveiligingswet — approved by the Tweede Kamer on 15 April 2026; in Senate (Eerste Kamer) review; entry into force targeted Q2 2026."
    domain: "rijksoverheid.nl"
  - title: "BIO2 v1.3 — Staatscourant Publication (5 March 2026)"
    url: "https://www.bio-overheid.nl/nieuws/bio2-v13-gepubliceerd-in-de-staatscourant/"
    description: "Official announcement of BIO2 v1.3 publication in the Staatscourant on 5 March 2026 — the version that supersedes both BIO v1.04zv (legacy BIO1) and BIO2 v1.2 in central-government digital communication."
    domain: "bio-overheid.nl"
---

The Dutch Baseline Informatiebeveiliging Overheid — BIO — is in a transition that matters for anyone selling cloud services to the Dutch government. **BIO2 v1.3** (dated 9 January 2026) was published in the Staatscourant on **5 March 2026** and **supersedes both BIO v1.04zv (the legacy BIO1) and BIO2 v1.2** in central-government digital communication. The **Cyberbeveiligingswet (Cbw)** — the Dutch NIS2 transposition — was approved by the **Tweede Kamer on 15 April 2026** and is in Senate (Eerste Kamer) review as of writing; entry into force is targeted for Q2 2026. Municipal applicability of BIO2 is being aligned via the forthcoming ministerial **Cybersecurity Regulation for the Government Sector** under the Cbw. This article walks through what BIO2 actually requires, how the cloud sub-framework works, and how a hyperscaler typically demonstrates BIO compliance.

## The system at a glance

The framework is the **Baseline Informatiebeveiliging Overheid (BIO)** — Baseline Information Security for Government. As of 5 March 2026, **BIO2 v1.3** (dated 9 January 2026) is the operative version. It supersedes both **BIO v1.04zv** (the legacy BIO1) and **BIO2 v1.2** (which was adopted by OBDO on 23 September 2025) in central-government digital communication. v1.3 contains "limited modifications" tied to the forthcoming ministerial Cybersecurity Regulation under the Cbw. Next BIO2 version planned for end of 2027.

Municipal applicability is being aligned to BIO2 via the forthcoming ministerial **Cybersecurity Regulation for the Government Sector** under the Cbw, rather than via a separate continuation of BIO v1.04zv. The legacy BIO1 set is being retired across all government layers as the Cbw secondary regulation crystallises.

A separate document — the **BIO Thema-uitwerking Clouddiensten** — provides cloud-specific elaboration. It was originally published alongside BIO v1.04zv and continues to be the cloud-specific overlay under BIO2 v1.3. The expectation is for the Thema-uitwerking to be re-issued in alignment with BIO2 v1.3 once the forthcoming ministerial Cybersecurity Regulation under the Cbw is published; in the meantime, existing EY CertifyPoint attestations for hyperscalers remain the operative evidence. This is the framework cloud providers actually engage with.

The framework is coordinated by the **Ministerie van Binnenlandse Zaken en Koninkrijksrelaties (BZK)** — Ministry of the Interior and Kingdom Relations — through an inter-ministerial working group. Operational partners include:

- **NCSC** (Nationaal Cyber Security Centrum).
- **CIP** (Centrum Informatiebeveiliging en Privacybescherming).
- **IBD** (Informatiebeveiligingsdienst voor gemeenten) — for municipalities.
- **RDI** (Rijksinspectie Digitale Infrastructuur) — the supervisory authority.
- **Auditdienst Rijk (ADR)** — the central audit service.

The working version of BIO2 is maintained openly on GitHub at `https://minbzk.github.io/Baseline-Informatiebeveiliging-Overheid/`. Public GitHub-based development of a national security baseline is unusual; it reflects the Dutch government's emphasis on transparency and stakeholder participation.

## Legislative basis

BIO2's statutory position is in late-stage transition:

- **Cyberbeveiligingswet (Cbw)** — the Dutch NIS2 transposition. **Approved by the Tweede Kamer on 15 April 2026**; in Senate (Eerste Kamer) review as of writing; entry into force targeted for **Q2 2026**. When the act enters into force, BIO2 becomes a **statutory obligation** for in-scope entities via the ministerial Cybersecurity Regulation under the Cbw.
- Until Cbw takes effect, BIO2 applies to central government, provinces, and water authorities as **"verplichtende zelfregulering"** — mandatory self-regulation — under a decision by the Overheidsbreed Beleidsoverleg Digitale Overheid on 23 September 2025.
- **BIO v1.04zv has been superseded by BIO2 v1.3** as of 5 March 2026 in central-government digital communication. Municipal applicability is being aligned through the ministerial regulation rather than a continuing parallel BIO1 regime.

The transition produces some operational ambiguity: BIO2 is "mandatory" today in a self-regulation sense; it will be "mandatory" in a statutory sense once the Cbw takes effect; the practical implications for non-compliance shift along that transition.

## Scope of obligation

BIO covers **four layers of Dutch public administration**:

- **Central government** (Rijk) — ministries, departments, central agencies.
- **Provinces** — twelve provincial governments.
- **Municipalities** — approximately 342 municipalities.
- **Water authorities** (waterschappen) — twenty-one water boards.

Implicitly, BIO also covers **ZBOs** — autonomous administrative authorities — and joint arrangements (gemeenschappelijke regelingen) that are not formally within Cbw scope but are practically held to BIO discipline.

The cloud sub-framework — BIO Thema-uitwerking Clouddiensten — defines what cloud providers must demonstrate to support BIO-compliant consumers. It is voluntary for the provider (no provider must hold it) but operationally necessary for cloud providers serving the Dutch public sector.

## Classification model — BBN1, BBN2, BBN3

BIO uses a three-level classification model:

| Level | Data sensitivity |
|---|---|
| **BBN1** | Public or low-sensitivity information |
| **BBN2** | Standard public-sector data |
| **BBN3** | Department-confidential and higher-sensitivity data |

Above BBN3, the framework imposes a hard restriction: information classified **Stg. CONFIDENTIEEL**, **SECRET**, or **TOP SECRET** under the EU/NATO classification model **may not be stored in public cloud**. This is a categorical exclusion, not a controls-driven requirement.

IBD publishes a practical tool — the **Baselinetoets BBN** (an Excel-based questionnaire) — that helps a system owner determine the correct BBN level.

## Evaluation criteria

BIO2 is built on the Dutch national editions of [ISO/IEC 27001 and 27002](./iso-27001-27017-27018-27701-cloud-baselines):

- **NEN-EN-ISO/IEC 27001:2023 (Dutch edition)** — ISMS.
- **NEN-EN-ISO/IEC 27002:2022 (Dutch edition)** — control set.

On top of the ISO baseline, BIO2 adds approximately **200 overheidsmaatregelen** — government-specific measures — that elaborate ISO controls for public-sector context.

Sector-specific norms layer on top of BIO2 where applicable:

- **NEN 7510** — healthcare information security.
- **CSIR** — operational-technology cybersecurity (Cyber Security Implementatie Richtlijn).
- **IEC 62443** — industrial cybersecurity.

For cloud services, the **BIO Thema-uitwerking Clouddiensten** maps the BIO requirements to:

- **CIS Controls**.
- **ISO/IEC 27017** (cloud-specific controls).

The Thema-uitwerking is the practical bridge that lets cloud providers demonstrate BIO compliance without holding a Dutch-specific certification.

## The assessment process

BIO assessment follows a documented sequence:

1. **Risk Self Assessment (RSA)** — mandatory for the system owner. Determines applicability of BIO controls and selection of relevant measures.
2. **Demonstration of design, existence, and effectiveness** of controls — language drawn from NIS2 / Cbw expectations.
3. **Independent testing** — penetration testing, red teaming, external audits as appropriate to the BBN level.
4. **ENSIA** — Eenduidige Normatiek Single Information Audit — the annual self-assessment process for municipalities, provinces, water authorities, and central organisations.

For cloud providers demonstrating Thema-uitwerking Clouddiensten compliance, the established pattern is via **EY CertifyPoint** as monitoring body. EY CertifyPoint issues certificates attesting that the cloud provider's services meet the BIO cloud expectations. AWS, Microsoft, and Google use this route.

The ENSIA process is the operational rhythm for public-sector consumers. CSPs themselves typically run an annual EY CertifyPoint cycle.

## Catalogue and recertification

Unlike Slovakia, Italy, or France, the Netherlands does **not** maintain a central public catalogue of approved cloud services. CSPs publish their own certifications and attestations:

- **AWS Artifact** for AWS certificates.
- **Microsoft Trust Center** for Microsoft attestations.
- **Google Cloud Compliance Reports** for Google.
- Mid-size and Dutch-native providers publish through their own trust centres.

Procurement teams in the Dutch public sector evaluate cloud providers individually against BBN classification and Thema-uitwerking expectations.

Recertification cadence:

- **Annual self-assessment (ENSIA)** for public-sector consumers.
- **External audits** following a risk-based approach, typically every 1–3 years.
- **EY CertifyPoint cycles** for cloud providers are typically **annual**.

## Sanctions and oversight

Before Cbw takes effect, BIO2 is mandatory self-regulation. Sanctions are reputational and political:

- Parliamentary oversight through the Tweede Kamer.
- Audit findings by the **Algemene Rekenkamer** (Court of Audit).
- ENSIA findings reported through the established governance channels.

After Cbw takes effect, statutory NIS2 sanctions apply:

- Up to **€10 million or 2% of global turnover** for essential entities.
- Lower thresholds for important entities.

The supervisory authority for digital infrastructure under Cbw is the **Rijksinspectie Digitale Infrastructuur (RDI)**.

## Sovereignty posture

BIO does **not** impose strict sovereignty requirements:

- No ownership caps on cloud providers.
- No headquartering requirement.
- No immunity-from-extraterritorial-law clause.

The strongest sovereignty-adjacent rule is the **categorical exclusion of EU/NATO-classified information** (CONFIDENTIEEL and above) from public cloud. For BBN1–BBN3, hyperscalers are accepted as providers.

The Dutch political position on EUCS sovereignty has been on the more permissive side of the debate. The Netherlands has resisted strict EUCS sovereignty rules at the EU level, consistent with the BIO posture of accepting hyperscalers below the classified-information threshold.

## Multicloud factor

BIO2 is one of the more accommodating EU national frameworks for multinational CSPs:

- The ISO/IEC 27001:2023 + 27002:2022 baseline aligns with international CSP control frameworks.
- The Thema-uitwerking Clouddiensten provides a focused audit scope rather than requiring full BIO2 implementation by the provider.
- The EY CertifyPoint route is well-established and reproducible.
- No catalogue listing process; certifications are published through the provider's own trust centre.
- No sovereignty constraints below the classified-information threshold.

Hyperscalers operate BIO landing zones — pre-configured environments that demonstrate BIO control alignment for consumers. AWS has published BIO landing zone guidance; Microsoft and Google have equivalent material.

:::tip[Architectural Pro Tip]
For a CSP targeting Dutch public-sector consumers, the highest-leverage move is to publish a **BIO-aligned landing zone reference** alongside the Thema-uitwerking Clouddiensten certificate. The landing zone reference saves Dutch government consumers significant implementation work and turns the CSP's compliance into a consumable product. AWS and Azure have demonstrated this approach; it is reproducible by mid-size CSPs willing to invest in the documentation. A Thema-uitwerking certificate alone is necessary but not sufficient to win Dutch government workloads; a BIO landing zone reference is what shortens the consumer's path to compliance.
:::

## Closing checklist

- **BIO2 v1.3** (dated 9 January 2026) was published in Staatscourant on **5 March 2026** and **supersedes BIO v1.04zv and BIO2 v1.2** in central-government digital communication. Next BIO2 version planned end of 2027.
- The **Cyberbeveiligingswet (Cbw)** — Dutch NIS2 transposition — was **approved by the Tweede Kamer on 15 April 2026** and is in Senate review; entry into force targeted Q2 2026. Will make BIO2 a statutory obligation via the ministerial Cybersecurity Regulation under the Cbw.
- Three BBN levels (BBN1, BBN2, BBN3). EU/NATO-classified information (CONFIDENTIEEL and above) is categorically excluded from public cloud — not a controls question, a hard restriction.
- BIO2 builds on ISO/IEC 27001:2023 and 27002:2022, adding approximately 200 government-specific measures. The cloud sub-framework (Thema-uitwerking Clouddiensten) maps to CIS Controls and ISO/IEC 27017.
- No central catalogue. CSPs publish certificates through their trust centres. EY CertifyPoint is the established monitoring body for the cloud sub-framework.
- Sanctions are reputational pre-Cbw; statutory NIS2 sanctions apply post-Cbw, with RDI as the digital infrastructure supervisor.
- Sovereignty posture is permissive. No ownership caps; no headquartering requirements. The Netherlands is politically on the more open side of the EUCS sovereignty debate.
- Publish a BIO landing zone reference alongside the Thema-uitwerking certificate. The landing zone is what makes the certificate consumable for Dutch government workloads.
- **What to read next:** [ISO 27001/27002](./iso-27001-27017-27018-27701-cloud-baselines) for the international baseline BIO2 inherits from; [NIS2 Supply Chain](./nis2-supply-chain-cloud-providers) for the Cbw-aligned supply-chain obligations; [EUCS Watch](./eucs-watch-political-tracking-2026) for the Dutch position in the EUCS debate.
