---
title: "DORA CTPP Regime — Direct ESA Supervision of Critical Cloud Providers"
category: compliance
tags: ["DORA", "CTPP", "ESA", "Financial Sector", "Compliance", "Data Security", "Hyperscaler"]
date: 2026-04-24
updated: 2026-05-15
readTime: 12
level: advanced
excerpt: "The Critical Third-Party Provider regime is the most consequential innovation in DORA. For the first time in EU law, the European Supervisory Authorities can directly supervise cloud providers — not via their financial-services customers, but as named regulated entities. This article walks through how CTPP designation actually works, what direct supervision means operationally, and what hyperscalers do to prepare."
references:
  - title: "Oversight Framework for Critical ICT Third-Party Providers"
    url: "https://www.eba.europa.eu/regulation-and-policy/operational-risk/dora/oversight-framework-critical-ict-third-party-providers"
    description: "EBA's framework for designating ICT third-party providers as critical under DORA and bringing them under direct European supervision by the ESAs."
    domain: "eba.europa.eu"
  - title: "ESMA — DORA Joint Oversight"
    url: "https://www.esma.europa.eu/policy-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora"
    description: "ESMA's role in the Joint Oversight Network coordinating CTPP designation and supervision across the three European Supervisory Authorities."
    domain: "esma.europa.eu"
  - title: "Commission Delegated Regulation 2024/1502 — CTPP Criticality Criteria"
    url: "https://eur-lex.europa.eu/eli/reg_del/2024/1502/oj"
    description: "The Commission delegated regulation specifying the criteria for designating ICT third-party providers as critical under DORA Article 31."
    domain: "eur-lex.europa.eu"
  - title: "DORA Articles 31-44 — Oversight of Critical ICT Third-Party Providers"
    url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj"
    description: "The articles of DORA establishing the CTPP regime: designation, Lead Overseer assignment, joint oversight network, supervisory powers, recommendations, fees, and penalties."
    domain: "eur-lex.europa.eu"
  - title: "EIOPA — DORA Implementation"
    url: "https://www.eiopa.europa.eu/digital-operational-resilience-act_en"
    description: "EIOPA's DORA implementation page covering insurance and pensions sector specifics under the CTPP regime."
    domain: "eiopa.europa.eu"
---

The Critical Third-Party Provider (CTPP) regime under DORA is the most consequential single innovation in EU financial-sector regulation in the past decade — not because of what it requires of financial entities, but because of what it does to **cloud providers**. For the first time in EU law, a cloud provider can be designated as a directly regulated entity by the European Supervisory Authorities (ESAs) and subjected to supervision modelled on how systemically important financial market infrastructures are supervised. This article walks through how CTPP designation works, what direct supervision means in practice, and how hyperscalers and major SaaS platforms are positioning for it.

## What the CTPP regime actually is

Articles 31-44 of [DORA](./dora-for-cloud-financial-sector-overlay) establish a regime under which:

- The ESAs — **EBA** (European Banking Authority), **EIOPA** (European Insurance and Occupational Pensions Authority), and **ESMA** (European Securities and Markets Authority) — jointly designate certain ICT third-party providers as **Critical**.
- A **Lead Overseer** is appointed for each CTPP — one of the three ESAs, depending on the dominant sector of the CTPP's regulated customers.
- The Lead Overseer publishes annual oversight plans, makes supervisory recommendations, conducts on-site inspections, and can impose periodic penalty payments for non-compliance.
- The **Joint Oversight Network** of the three ESAs coordinates across sectoral boundaries and handles CTPPs that serve multiple financial sectors.

This is a **direct** supervisory relationship. The CTPP answers to the Lead Overseer regardless of the contractual relationships it has with its financial customers. It is the European-level analogue of the way a central counterparty (CCP) or a central securities depository (CSD) is supervised — recognising the systemic importance of the entity rather than treating it as a vendor whose risks pass through to its customers.

## Designation criteria

The criteria for CTPP designation are specified in DORA Article 31 and elaborated in **Commission Delegated Regulation 2024/1502**. The criteria address:

**Systemic importance**:
- Number and importance of financial entities relying on the provider.
- The systemic significance of the provider's services to financial stability.
- Substitutability — whether equivalent services exist that financial entities could move to.

**Reliance and concentration**:
- Aggregate value of assets or transactions of financial entities reliant on the provider.
- Concentration of reliance — whether a single failure would affect a critical mass.

**Technical characteristics**:
- Complexity of the technical services provided.
- Cross-border characteristics of the services.

The criteria are intentionally outcome-oriented. The ESAs apply judgement; the delegated regulation provides structure but not a mechanical formula. A provider can score high on one criterion and lower on others and still be designated based on the combined picture.

## The designation process

1. **Data collection** — financial entities are required (under DORA Article 28) to maintain a Register of Information about their ICT third-party arrangements. The ESAs aggregate this data across financial entities.
2. **Criticality assessment** — the ESAs apply the Article 31 / Delegated Regulation criteria to identify candidate CTPPs.
3. **Consultation** — candidate CTPPs are notified and given the opportunity to make representations.
4. **Designation decision** — the ESAs jointly publish the designation.
5. **Lead Overseer assignment** — one of the three ESAs is assigned as Lead Overseer based on the dominant sector.
6. **Oversight plan** — the Lead Overseer publishes the annual oversight plan within months of designation.

As of mid-2026, the **first wave of CTPP designations is in progress** but no formal designations have been published yet. The ESAs began the formal process in 2025 and have collected Register of Information data from financial entities. The major hyperscalers (AWS, Microsoft Azure, Google Cloud) and several major SaaS platforms serving the financial sector are widely anticipated candidates, but the ESAs have not formally designated any provider as of mid-2026. Designations will be published on the EBA, EIOPA, and ESMA websites when they are made.

## What direct supervision actually means

Once designated, a CTPP is subject to a supervisory model that includes:

**Annual oversight plan**:
- Published by the Lead Overseer.
- Specifies the scope, methodology, and intensity of oversight for the year.
- Includes scheduled and ad-hoc supervisory activities.

**Information collection powers**:
- The Lead Overseer can require the CTPP to provide information about its operations, technology, risk management, incident history, and customer relationships.
- This goes well beyond what the CTPP would disclose under contract to individual financial customers.

**On-site inspections**:
- The Lead Overseer can conduct on-site inspections of CTPP facilities, including data centres and operational sites.
- Cooperation by the CTPP is mandatory.

**Recommendations**:
- The Lead Overseer issues recommendations to the CTPP about remediating identified weaknesses.
- Recommendations are not "advice" — they carry weight; non-compliance triggers escalating supervisory consequences.

**Periodic penalty payments**:
- For non-compliance with Lead Overseer recommendations, the Lead Overseer can impose **periodic penalty payments up to 1% of the CTPP's average daily worldwide turnover per day of non-compliance**.
- This is a substantial financial deterrent. For a hyperscaler with hundreds of billions in annual revenue, 1% of daily turnover is in the tens of millions per day.

**Public disclosure**:
- Designations are public.
- Some supervisory outputs (annual oversight reports, public statements about CTPP non-compliance) are disclosed.
- This creates reputational consequences alongside financial ones.

The model is closer to how the SEC supervises systemically important market infrastructures, or how the ECB supervises systemically important banks, than to how vendors are typically regulated through their customers.

## Who is in scope — the hyperscaler reality

The CTPP regime is designed for, but not limited to, the major hyperscalers. The first wave of expected designations:

- **AWS** — across all three ESA sectors. Likely EBA as Lead Overseer given banking concentration.
- **Microsoft Azure** — across all three sectors. Lead Overseer designation pending.
- **Google Cloud** — across all three sectors but lighter financial-sector adoption than AWS / Azure.
- **Major SaaS platforms** that serve significant numbers of financial entities — Salesforce, Workday, ServiceNow, financial-services-specific platforms like Murex, Calypso, FIS, Fiserv, Temenos.
- **Specialised infrastructure providers** — Akamai (CDN/security), Cloudflare (CDN/security), possibly major payment-card networks if they are not separately regulated.

Designation is **per entity, not per service**. A hyperscaler designated as a CTPP brings its entire operational footprint under the regime, even though only some of its services are consumed by financial entities. This produces operational complexity: the CTPP must satisfy supervisory expectations across services that have very different risk profiles.

## CTPP and the parent-subsidiary question

For hyperscalers structured as US parent + EU subsidiary, the CTPP designation can apply to either the parent group, the EU subsidiary, or both depending on operational realities:

- If the EU subsidiary is the contracting party with financial entities and operates the relevant infrastructure, the EU subsidiary is the designated CTPP.
- If the global parent has material operational involvement, the parent can be co-designated or the designation can extend to cover global operations affecting EU financial entities.
- Joint ventures like [Bleu](./france-anssi-secnumcloud-qualification) (Microsoft + Orange + Capgemini) are separate legal entities and would be designated separately if their CTPP criteria are met.

This question is significant for hyperscalers contemplating [sovereign cloud structures](./sovereign-cloud-products-2026-landscape) — a JV may obtain sovereignty advantages but it does not escape CTPP designation; in fact, a separate legal entity may face its own separate designation determination.

## What hyperscalers do operationally to prepare

A hyperscaler expecting CTPP designation prepares across several dimensions:

**Supervisory engagement function**:
- A dedicated team to interface with the Lead Overseer.
- Documented escalation paths and response SLAs.
- Capability to produce information requests on supervisory cadence (not commercial-procurement cadence).

**Operational transparency**:
- Detailed documentation of services, infrastructure, risk management, and incident history.
- Audit-trail systems sufficient to support supervisory inspections.
- Ability to map customer-impact assessments to specific incident scenarios.

**Resilience demonstrations**:
- Tested incident-response capabilities at supervisory standards.
- Documented capacity to support customer [DORA TLPT](./dora-for-cloud-financial-sector-overlay) at scale.
- Exit-assistance capabilities at supervisory standards.

**Concentration risk management**:
- Internal monitoring of customer concentration.
- Capability to absorb scenario-based shocks (e.g., a major customer migrating away, a major customer experiencing simultaneous incident, a competitor failure causing market migration to the CTPP).

**Pricing and economics**:
- Internal recognition that CTPP designation adds operational costs and supervisory risk premium.
- Decision-making on whether to absorb costs or pass them through in pricing.

Hyperscalers that have been preparing since DORA's adoption (2022) have built much of this infrastructure already. Hyperscalers that delayed are in catch-up mode.

## Sectoral coverage — banking, insurance, securities

The three ESAs cover different sectors and the CTPP designation considers concentration across them:

- **EBA** — banking, payment institutions, e-money institutions.
- **EIOPA** — insurance, occupational pensions, IORPs.
- **ESMA** — investment firms, trading venues, central counterparties, central securities depositories, alternative investment fund managers, UCITS management companies, crypto-asset service providers.

A CTPP serving meaningful concentrations across all three sectors will likely have a Lead Overseer determined by the dominant sector but coordinated supervision via the Joint Oversight Network.

For cloud providers that are heavily concentrated in one sector (e.g., a SaaS provider serving primarily securities firms), the Lead Overseer designation is straightforward. For hyperscalers serving all three sectors broadly, the Lead Overseer assignment is itself a process.

## The interaction with national supervisors

DORA designation does not eliminate national supervisor relationships. The CTPP's individual financial customer relationships remain supervised by national authorities for each customer:

- A Slovak bank using a CTPP-designated AWS service is supervised by NBS (Národná banka Slovenska) for the bank's compliance with DORA obligations.
- AWS as a CTPP is supervised directly by the Lead Overseer (likely EBA) for AWS's compliance with the CTPP regime.
- The two supervisory relationships coordinate but are operationally distinct.

For cloud providers, this means **two parallel supervisory tracks**: the CTPP-level direct supervision by the Lead Overseer, and the customer-level supervision that flows through each financial customer's national authority.

## CTPP designation and the procurement effect

Once a cloud provider is CTPP-designated, financial entities' procurement behaviour shifts:

- **Procurement teams gain leverage** — the supervisory regime adds external pressure on the provider to accept terms financial customers ask for.
- **Concentration risk attention rises** — financial entities become more attentive to whether they should multi-source rather than concentrate on a CTPP.
- **Contractual templates standardise** — financial entities increasingly use industry-standard DORA contract templates, reducing per-customer negotiation overhead.
- **Substitutability assessments matter more** — financial entities document substitutes for CTPP services as part of exit-strategy planning.

For cloud providers, CTPP designation can be commercially neutral or even positive (the supervisory pedigree is a trust signal) provided the operational obligations are met. Cloud providers that struggle with the supervisory obligations may find designation commercially negative.

:::tip[Architectural Pro Tip]
For a cloud provider expecting CTPP designation, the highest-leverage preparation is **building a supervisor-grade information disclosure interface** distinct from the commercial-procurement disclosure interface. Lead Overseers ask different questions than customer procurement teams ask: they want aggregated risk data across the customer base, capacity planning data, internal incident statistics, sub-processor risk assessments at portfolio level. None of this typically lives in customer-facing trust centres. Cloud providers that build the supervisor interface as a deliberate function before designation arrives are operationally smoother through the first supervisory cycle than providers that bolt it on reactively.
:::

## What customers should expect from CTPP-designated providers

For financial entities consuming services from CTPP-designated providers:

- **More transparency** about operational risk and resilience metrics over time.
- **Standardised contractual terms** aligned with the supervisory regime.
- **Better incident-cooperation cadence** driven by supervisory pressure on the provider.
- **Higher absolute cost** for the service, as supervisory overhead is partially priced in.
- **Greater confidence in concentration-risk assessment** — the supervisory regime reduces (but does not eliminate) the risk that a CTPP failure would be unmanageable.

Financial entities should also recognise that **CTPP designation is not a guarantee of operational quality** — it is supervisory attention. A CTPP can be designated, encounter material operational issues, and be subjected to enforcement. The designation reduces some risk classes while creating supervisory visibility into others.

:::warning[Reality Check]
The CTPP regime is sometimes interpreted by financial entities as "the ESAs will solve our cloud risk for us" — this is wrong. CTPP designation creates direct supervision of the cloud provider, but financial entities retain their full DORA obligations: risk management, incident reporting, supply-chain management, exit strategies. The CTPP regime adds a parallel supervisory layer; it does not absolve financial entities of their own obligations. Procurement teams that scope their DORA work down because their providers will be CTPP-designated are misreading the regulation.
:::

## Closing checklist

- The CTPP regime under DORA Articles 31-44 allows the ESAs to designate ICT third-party providers as Critical and supervise them directly. First wave of designations in progress as of mid-2026 — no formal designations published yet.
- Designation criteria specified in Commission Delegated Regulation 2024/1502: systemic importance, reliance and concentration, technical characteristics. Outcome-oriented; judgement-based.
- **Lead Overseer** (one of EBA / EIOPA / ESMA) is assigned per CTPP based on dominant sector. Joint Oversight Network coordinates across sectors.
- Supervisory powers include information collection, on-site inspections, recommendations, **periodic penalty payments up to 1% of average daily worldwide turnover per day of non-compliance**.
- Designation applies per entity. Hyperscalers' EU subsidiaries vs parents — case-by-case determination based on operational reality.
- Expected first-wave designations: AWS, Microsoft Azure, Google Cloud, major financial-services SaaS platforms (Salesforce, Workday, FIS, Fiserv, Temenos), specialised infrastructure (Akamai, Cloudflare).
- CTPP designation creates **two parallel supervisory tracks**: direct Lead Overseer supervision of the CTPP, plus national supervisor supervision of each financial customer.
- For cloud providers: build a supervisor-grade information disclosure interface; engage Lead Overseer early; price for supervisory overhead.
- For financial entities: CTPP designation does not absolve customer DORA obligations. Continue full supply-chain risk management work alongside the supervisory regime.
- See [DORA overview](./dora-for-cloud-financial-sector-overlay) for the broader DORA framework, [DORA Article 30 contracts article](./dora-article-30-contracts-and-exit-strategies) for the contractual content the CTPP regime sits alongside, and [Sovereign Cloud Products](./sovereign-cloud-products-2026-landscape) for how JV structures interact with CTPP designation.
