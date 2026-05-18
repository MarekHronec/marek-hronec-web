---
title: "Sovereign Cloud Products in 2026 — The European Landscape"
category: compliance
tags: ["Sovereign Cloud", "Product Landscape", "Sovereignty", "Compliance", "Data Security", "Vendor"]
date: 2026-05-09
updated: 2026-05-16
readTime: 13
level: intermediate
excerpt: "Hyperscaler joint ventures, EU-native operators, partner sovereign clouds, and dedicated sovereign regions. The European sovereign cloud market in 2026 has more options than three years ago, but the variety hides real differences in what each product actually delivers. This article maps the landscape."
references:
  - title: "Bleu — Microsoft + Orange + Capgemini"
    url: "https://www.bleu.fr/"
    description: "Bleu, the French sovereign cloud joint venture between Microsoft (technology licensor), Orange, and Capgemini, targeting SecNumCloud qualification."
    domain: "bleu.fr"
  - title: "S3NS — Thales + Google Cloud"
    url: "https://www.s3ns.io/"
    description: "S3NS, the French sovereign cloud joint venture between Thales and Google Cloud. First combined IaaS/PaaS/CaaS provider qualified under SecNumCloud (PREMI3NS, December 2025)."
    domain: "s3ns.io"
  - title: "Microsoft Cloud for Sovereignty"
    url: "https://www.microsoft.com/en-us/industry/sovereignty/cloud"
    description: "Microsoft's sovereign-controls framework on Azure and Microsoft 365, providing customer-controlled boundaries, sovereign landing zones, and integration with national-cloud partnerships."
    domain: "microsoft.com"
  - title: "AWS European Sovereign Cloud"
    url: "https://aws.amazon.com/eu-sovereign-cloud/"
    description: "AWS's dedicated European Sovereign Cloud — a separate AWS region planned to be operated by EU-resident personnel under EU law, targeting deployment in Brandenburg, Germany."
    domain: "aws.amazon.com"
  - title: "Google Sovereign Cloud Solutions"
    url: "https://cloud.google.com/sovereign-cloud"
    description: "Google Cloud's sovereign solutions catalogue, including S3NS in France and partnerships with T-Systems and Telecom Italia for sovereign delivery."
    domain: "cloud.google.com"
  - title: "OVHcloud Hosted Private Cloud"
    url: "https://www.ovhcloud.com/en/enterprise/products/hosted-private-cloud/"
    description: "OVHcloud's enterprise sovereign cloud offerings — VMware-based hosted private cloud with European data residency and EU-headquartered operations."
    domain: "ovhcloud.com"
---

Three years ago the "sovereign cloud" market in Europe was small: SecNumCloud-qualified providers, a handful of EU-native operators, and a lot of marketing claims that did not survive close reading. By mid-2026 the landscape is wider — joint ventures, partner sovereign clouds, dedicated sovereign regions, EU-native operators, and integrated sovereign-controls overlays. This article maps the current product landscape and explains what each category actually delivers.

## The four categories of sovereign cloud product

The market segments into four operational patterns:

| Pattern | What it is | Examples |
|---|---|---|
| **Joint Venture (JV)** | EU entity formed between a non-EU hyperscaler and EU partners. The JV operates the service under EU law; the hyperscaler licenses technology. | Bleu (Microsoft + Orange + Capgemini), S3NS (Google + Thales), Delos Cloud (SAP + Arvato for German federal sector) |
| **EU-Native Operator** | Cloud provider headquartered and operating wholly in the EU/EEA with no non-EU parent. | OVHcloud, 3DS Outscale, Open Telekom Cloud (T-Systems), Cegedim.cloud, ITS Integra |
| **Partner Sovereign Cloud** | A non-EU hyperscaler's technology operated by an EU partner under partnership agreement (lighter than JV). | T-Systems on Google Cloud (specific verticals), various national-partner arrangements |
| **Dedicated Sovereign Region** | A non-EU hyperscaler builds a dedicated region operated exclusively by EU-resident personnel, isolated from the hyperscaler's global infrastructure. | AWS European Sovereign Cloud (Brandenburg, in build); Microsoft Cloud for Sovereignty (sovereign landing zones on existing Azure regions) |

The patterns differ in their sovereignty posture, their feature set, and their qualification potential under national frameworks. The right choice depends on the workload's sovereignty requirements and the customer's tolerance for feature-and-cost trade-offs.

## Joint Venture sovereign clouds

JVs are the operative answer to French SecNumCloud's ownership rules and to similar sovereignty requirements where they exist. The JV is a separate legal entity, EU-headquartered, with capital and voting rights structured to meet the ≤24% individual / ≤39% collective non-EU caps SecNumCloud imposes.

**Bleu** is the Microsoft route into the French sovereign tier. Microsoft licenses the Azure platform to Bleu; Orange and Capgemini operate the service. Bleu is the qualified entity under SecNumCloud; Microsoft does not have direct operational access. As of mid-2026, Bleu's J0 milestone was validated in April 2025; full SecNumCloud qualification is targeted for 2025-2026.

**S3NS** is the Google route. Thales is the JV partner; Google Cloud licenses the technology. S3NS PREMI3NS was qualified under SecNumCloud in December 2025 — the first combined IaaS/PaaS/CaaS qualification.

**Clarence** is a Belgium/Luxembourg sovereign cloud arrangement. Proximus NXT and LuxConnect distribute Google Distributed Cloud Hosted (GDC Hosted) — an air-gapped, on-premises version of Google Cloud. Clarence targets Belgian, Luxembourg, and EU institutional workloads requiring air-gapped operation. It does not pursue SecNumCloud qualification; it targets Belgian and EU institutional procurement requirements directly. In April 2026, Clarence (as part of the Proximus + S3NS + Clarence + Mistral consortium) was selected for the **EU Commission €180M sovereign cloud procurement framework**.

**Delos Cloud** is the German-government-specific route. SAP licenses the Microsoft Sovereign Cloud technology; Arvato operates the service for the German federal sector. Targets BSI C5 + German federal procurement requirements.

Operational trade-offs of the JV model:

- **Feature set** lags the hyperscaler's mainline regions, often by 6-24 months. New services arrive in the JV only after they have been adapted to the JV's operational model.
- **Pricing** is higher than mainline regions due to the JV's separate operational overhead.
- **Sovereignty** is the strongest available — qualifying under the strictest national frameworks (SecNumCloud) and credibly demonstrating immunity from foreign-law access.
- **Customer experience** is operationally distinct from the underlying hyperscaler's mainline experience; some tooling and integrations require adaptation.

For workloads with hard sovereignty requirements and tolerance for feature lag, JVs are the path. For workloads needing latest hyperscaler features at scale, the trade-off is harder.

## EU-Native operators

EU-native operators are the longest-established sovereign cloud category. They face neither the feature-lag problem of JVs (they have their own roadmaps) nor the legal-structure constraint that prevents direct hyperscaler qualification. The trade-off is **scale**: most EU-native operators do not match hyperscaler scale on service breadth, global presence, or platform maturity.

**OVHcloud** is the largest EU-native operator. French-headquartered, listed on Euronext Paris, operates across 4 continents with European data residency commitments. OVHcloud holds SecNumCloud qualification for its **Hosted Private Cloud (VMware)** at Roubaix, Gravelines, and Strasbourg — not the full Public Cloud portfolio. Strong offering for IaaS and VMware-based hosted private cloud; PaaS and managed services portfolio is more limited than hyperscalers.

**3DS Outscale** is a Dassault Systèmes subsidiary. SecNumCloud qualified (first operator to qualify under version 3.2, December 2023). Targets industrial and defence customers — a smaller scale than OVHcloud but with deep alignment to industrial verticals.

**T Cloud Public (T-Systems, formerly Open Telekom Cloud)** is Deutsche Telekom's enterprise cloud. Built on OpenStack. Strong in DACH market, BSI C5 attested annually since 2018. Less internationally adopted than OVHcloud but well-established for German and Austrian enterprises.

**Numspot** is a French sovereign cloud JV with a different structure than Bleu or S3NS: all four shareholders are French and EU-controlled (Docaposte, Dassault Systèmes, Bouygues Telecom, Banque des Territoires) and the underlying infrastructure is **3DS Outscale** — an already SecNumCloud-qualified, fully EU-native platform. Unlike Bleu (Microsoft technology) and S3NS (Google technology), Numspot has no US hyperscaler in its stack. SecNumCloud qualification filed September 2024; commercial managed services platform launched Q1 2025.

**Cegedim.cloud** and **ITS Integra** are mid-scale EU-native operators serving specific verticals under national-framework qualifications. See the [EU-native cloud providers article](/knowledge-base/compliance/eu-native-cloud-providers-landscape) for the broader EU-native landscape.

For workloads in the EU's "sovereign by default" tier where global hyperscaler scale is not required, EU-native operators are competitive and often well-aligned with national framework expectations.

## Partner Sovereign Cloud arrangements

Partner Sovereign Cloud arrangements are lighter-weight than full JVs. The hyperscaler's technology is operated by an EU partner under a partnership agreement; the partner provides the operational layer and some control surfaces, but the legal structure stops short of a full JV.

These arrangements have proliferated as a way to address sovereignty concerns without the overhead of a JV. The sovereignty posture is generally **weaker** than a JV (because the legal structure is less independent) and **stronger** than the hyperscaler's mainline regions (because operational separation exists). They typically do not qualify for the strictest national frameworks (SecNumCloud, German federal sovereign procurement) but can satisfy mid-tier sovereignty requirements.

Examples include various T-Systems partnerships with hyperscalers for specific verticals, and Telecom Italia's arrangements with hyperscalers for Italian-market services.

## Dedicated Sovereign Regions

The most recent category. A non-EU hyperscaler builds a dedicated region — physically isolated infrastructure, operated by EU-resident personnel, under EU law, with no operational connection to the hyperscaler's global infrastructure. This is the hyperscalers' attempt to address sovereignty concerns within their own ecosystem rather than through JVs.

**AWS European Sovereign Cloud** is the leading example. Targeted for deployment in Brandenburg, Germany, with operations by EU-resident personnel and EU-based engineering. AWS has committed to providing a complete, independent infrastructure separate from existing AWS regions. As of mid-2026 the region is under construction; first availability is targeted but not yet operational.

**Microsoft Cloud for Sovereignty** takes a different approach — sovereign controls layered on top of existing Azure regions rather than a separate region. Provides sovereign landing zones, customer-controlled boundaries (encryption with customer-managed keys including Customer Lockbox), data residency commitments, and integration with national-cloud partnerships (Bleu in France, Delos Cloud in Germany).

**Google Cloud Sovereign Solutions** is a catalogue of sovereign offerings: S3NS for France, partnerships with T-Systems for specific verticals, Sovereign Controls for assured workloads on existing Google Cloud regions. Multiple delivery models depending on customer requirements.

Dedicated sovereign regions face an unresolved question: **can a hyperscaler's dedicated region credibly demonstrate immunity from extraterritorial law without the JV legal structure?** SecNumCloud's view has been that legal independence requires structural ownership separation. AWS's European Sovereign Cloud is a test case for whether operational separation under contractual commitments can achieve equivalent sovereignty assurance.

## Hyperscaler EU Data Boundary commitments

Distinct from dedicated sovereign regions, hyperscalers have published **EU Data Boundary** commitments that apply to their **mainline regions**. These are commitments — increasingly verifiable — that customer data, pseudonymous personal data, logs, and other categories remain within the EU/EEA for storage, processing, or both. They are addressed in detail in the dedicated [Hyperscaler EU Data Boundary article](/knowledge-base/compliance/hyperscaler-eu-data-boundary-commitments).

The EU Data Boundary commitments do not address ownership-based sovereignty (they are operated by US hyperscalers under US law). They address **operational data residency** — where data and processing physically happen. This is a substantial but partial answer to sovereignty concerns: useful for many regulated workloads, insufficient for workloads requiring full ownership and jurisdictional independence.

## Mapping products to national frameworks

| Product | KsVC (SK) | BSI C5 (DE) | SecNumCloud (FR) | ENS (ES) | ACN (IT) | BIO2 (NL) | PiTuKri (FI) |
|---|---|---|---|---|---|---|---|
| **AWS mainline EU** | U2 candidate | Attested | No | Alta | QC2 | Yes | Attested |
| **AWS European Sovereign** | Tbd (in build) | Tbd | Likely yes | Tbd | Tbd | Tbd | Tbd |
| **Microsoft Azure mainline EU** | U2 candidate | Attested | No | Alta | QC2 | Yes | Attested |
| **Microsoft Cloud for Sovereignty** | Tbd | Attested | Via Bleu | Alta | Tbd | Yes | Tbd |
| **Bleu (Microsoft + Orange + Capgemini)** | Plausible | Yes (planned) | In qualification (J0 validated) | Possible | Possible | Likely | Possible |
| **Google Cloud mainline EU** | U2 candidate | Attested | No | Alta | QC2 | Yes | Attested |
| **S3NS (Google + Thales)** | Plausible | Likely | **Qualified (Dec 2025)** | Possible | Possible | Likely | Possible |
| **OVHcloud** | Likely U2/U3 | Attested | Qualified for select services | Yes | Yes | Yes | Possible |
| **3DS Outscale** | Possible | Possible | Qualified | Possible | Possible | Possible | Possible |
| **T Cloud Public** (formerly Open Telekom Cloud) | Possible | Yes | No | Possible | Possible | Yes | Possible |
| **Delos Cloud** | Tbd | Yes (planned) | No | Tbd | Tbd | Tbd | Tbd |

The table reflects the operative state at mid-2026. "Tbd" entries indicate active development or known plans. "Possible" entries indicate that no public qualification exists but the structural fit is feasible.

For procurement, the table is a starting point. The actual qualifications and certifications change as products move through national-framework processes; always verify against the provider's trust centre and the national authority's public register.

:::tip[Architectural Pro Tip]
For a customer evaluating sovereign cloud options, the order of operations is: **(1) identify the workload's sovereignty requirements** — ownership, jurisdiction, data residency, immunity from foreign law — and rank them; **(2) match the requirements to the four operational patterns** — JV for ownership-based sovereignty, dedicated sovereign region for operational separation, EU-native operator for full structural independence at smaller scale, partner sovereign for moderate sovereignty; **(3) verify the actual national framework qualifications** held by candidate products against your relevant national frameworks. Don't start by picking a product and discovering you don't meet the sovereignty bar; start by mapping the bar, then pick the product.
:::

## The cost trade-offs

The sovereign cloud market is more expensive than mainline hyperscaler regions. The cost premium varies:

- **JVs** — typically 30-100% premium over mainline hyperscaler equivalent, depending on service. Driven by separate operational infrastructure and feature-set development overhead.
- **EU-Native operators** — varies widely. OVHcloud is often cheaper than hyperscaler mainline for IaaS, comparable for PaaS, more expensive for managed services. Smaller operators have less predictable pricing.
- **Dedicated sovereign regions** — pricing is emerging; expected to be premium over mainline but below JV pricing.
- **Partner sovereign clouds** — premium varies by partnership; typically lower premium than JVs.

For customers with hard sovereignty requirements, the premium is the cost of meeting the requirement. For customers with softer requirements, the premium may be avoidable through a careful workload split: sovereignty-required workloads on the sovereign product, less-sensitive workloads on mainline regions.

## The political-industrial layer

The sovereign cloud market is not just technical — it is shaped by industrial policy. Government procurement preferences in France, Germany, and Italy have created and continue to shape the JV and EU-native operator markets. Brexit, the post-Schrems-II environment, and the EUCS deadlock all influence which products are commercially viable and which national frameworks they target.

Watch items for the medium-term:

- **EUCS** — if it eventually adopts a High+ tier with sovereignty requirements, JVs and EU-native operators benefit; dedicated sovereign regions may or may not qualify depending on the substantive requirements.
- **ANSSI/BSI joint statement** (March 2026) — early signal of FR–DE convergence on sovereignty criteria. Could accelerate harmonisation or remain a statement of direction.
- **AWS European Sovereign Cloud operational launch** — the test case for whether a hyperscaler's dedicated sovereign region can satisfy strict national frameworks without a JV structure.
- **Hyperscaler EU Data Boundary maturation** — increasing technical specificity of what is and is not in the boundary, with audit-level verification.
- **EU Commission €180M sovereign cloud framework** (April 2026) — selected four consortia: Post Telecom + Clever Cloud + OVHcloud, STACKIT, Scaleway, and Proximus + S3NS + Clarence + Mistral. Industrial-policy validation of EU-native pure-play providers over hyperscaler EU regions for institutional EU procurement. See the [EU-native cloud providers article](/knowledge-base/compliance/eu-native-cloud-providers-landscape) for context on the winning providers.

:::warning[Reality Check]
The phrase "sovereign cloud" is doing a lot of work in marketing materials. It means very different things across the four product categories: structural ownership separation in JVs, operational independence in dedicated regions, data residency in EU Data Boundary commitments, full EU operation in EU-native operators. Procurement teams that accept "sovereign cloud" without specifying which sovereignty dimension they need are buying based on a label, not a property. Define what sovereignty means for your workload before evaluating products against it.
:::

:::tip[Slovak context]
For Slovak public-sector procurement against [KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) tiers, the practical sovereign cloud question maps to specific product candidates: **U1 / U2** workloads are well-served by hyperscaler EU mainline regions ([Microsoft Azure, AWS, Google Cloud Vienna or Frankfurt](/knowledge-base/compliance/hyperscaler-eu-data-boundary-commitments)) with no sovereign-specific product needed. **U3** workloads benefit from hyperscaler EU regions combined with [customer-controlled key custody](/knowledge-base/compliance/cloud-encryption-key-custody-byok-hyok) — the `EU mainline + BYOK/HYOK` pattern. **U4** is the private government cloud segment — operationally that means state-controlled or state-contracted infrastructure, typically the Slovak national cloud rather than commercial sovereign cloud products. For Slovak commercial entities serving regulated customers (banks under NBS, insurers), Microsoft Cloud for Sovereignty operating on Microsoft Azure Vienna/Frankfurt regions and S3NS PREMI3NS via partnership are the realistic candidates; Bleu is French-focused. OVHcloud and T Cloud Public (T-Systems, formerly Open Telekom Cloud) are EU-native operators with established Slovak market presence.
:::

## Closing checklist

- Four operational patterns: Joint Ventures, EU-Native operators, Partner Sovereign Clouds, Dedicated Sovereign Regions. Each delivers a different sovereignty posture.
- JVs (Bleu, S3NS, Delos Cloud) are the operative answer to strict national frameworks like SecNumCloud. Feature lag and cost premium are the trade-offs. **Clarence** (Proximus + LuxConnect + Google GDC Hosted) targets Belgian/Luxembourg/EU institutional workloads via air-gapped on-premises deployment rather than SecNumCloud.
- EU-Native operators (OVHcloud, 3DS Outscale, T Cloud Public) offer full structural independence at smaller scale than hyperscalers. **Numspot** is an EU-native JV (no US hyperscaler) built on 3DS Outscale's SecNumCloud-qualified infrastructure.
- Dedicated Sovereign Regions (AWS European Sovereign Cloud, Microsoft Cloud for Sovereignty) are the emerging hyperscaler-led approach. SecNumCloud-qualification remains a test case.
- Hyperscaler EU Data Boundary commitments address operational data residency on mainline regions — not ownership-based sovereignty. See the [dedicated article](/knowledge-base/compliance/hyperscaler-eu-data-boundary-commitments).
- Cost premium is real: 30-100% for JVs vs mainline; varies for other patterns.
- Sovereignty has multiple dimensions (ownership, jurisdiction, residency, foreign-law immunity). Define which apply before evaluating products.
- Watch items: EUCS High+ if adopted, ANSSI/BSI joint statement maturation, AWS European Sovereign Cloud launch, EU Data Boundary technical specificity.
- See the per-country articles for which products hold which national framework qualifications. The qualifications change; always verify against trust centres and national registers.
- **What to read next:** [EU-native cloud providers](/knowledge-base/compliance/eu-native-cloud-providers-landscape) for the pure-play EU-native landscape (OVHcloud, Scaleway, Hetzner, IONOS, STACKIT, and more) that sits alongside but distinct from the sovereign JVs in this article; [Hyperscaler EU Data Boundary](/knowledge-base/compliance/hyperscaler-eu-data-boundary-commitments) for mainline-region data-location commitments that complement sovereign cloud products; [BYOK/HYOK](/knowledge-base/compliance/cloud-encryption-key-custody-byok-hyok) for the customer-controlled cryptographic patterns that work with both sovereign and mainline regions; [France SecNumCloud](/knowledge-base/compliance/france-anssi-secnumcloud-qualification) and [Italy ACN](/knowledge-base/compliance/italy-acn-cloud-qualification) for the national qualification frameworks driving JV and PSN product structures; [EUCS Watch](/knowledge-base/compliance/eucs-watch-political-tracking-2026) for the political context shaping the sovereign cloud market.
