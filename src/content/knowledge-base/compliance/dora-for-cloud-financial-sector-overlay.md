---
title: "DORA for Cloud — Overview of the EU Financial-Sector Operational Resilience Regime"
category: compliance
tags: ["DORA", "Financial Sector", "NIS2", "Compliance", "Data Security", "Sectoral"]
date: 2026-04-18
updated: 2026-04-18
readTime: 10
level: advanced
excerpt: "The Digital Operational Resilience Act has been in force since January 2025 and applies to every financial entity in the EU. This article is the overview — what DORA is, its five pillars, and how it fits with national frameworks. For the CTPP regime and contractual content, see the dedicated deep-dive articles."
references:
  - title: "DORA — Regulation (EU) 2022/2554"
    url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj"
    description: "The Digital Operational Resilience Act — the EU regulation establishing ICT operational resilience requirements for the financial sector. Applicable since 17 January 2025."
    domain: "eur-lex.europa.eu"
  - title: "DORA Regulatory Technical Standards (RTS)"
    url: "https://www.eba.europa.eu/regulation-and-policy/operational-risk/dora"
    description: "The EBA's hub for DORA technical standards — the detailed rules under DORA covering ICT risk management, incident reporting, TLPT, and third-party risk management."
    domain: "eba.europa.eu"
  - title: "ESMA — DORA"
    url: "https://www.esma.europa.eu/policy-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora"
    description: "ESMA's DORA page covering cross-ESA coordination on DORA implementation and the Critical Third-Party Provider (CTPP) designation process."
    domain: "esma.europa.eu"
  - title: "EIOPA — DORA"
    url: "https://www.eiopa.europa.eu/digital-operational-resilience-act_en"
    description: "EIOPA's DORA implementation page covering insurance and pensions sector specifics, including the application of DORA's third-party risk framework."
    domain: "eiopa.europa.eu"
  - title: "ENISA — DORA Guidance"
    url: "https://www.enisa.europa.eu/publications/dora"
    description: "ENISA's DORA implementation resources, complementary to the ESA-led oversight framework."
    domain: "enisa.europa.eu"
---

The Digital Operational Resilience Act (DORA) entered into force on **17 January 2025**. For cloud providers serving any EU financial entity — banks, insurers, asset managers, payment institutions, central counterparties, crypto-asset service providers — DORA is not an overlay on top of national frameworks. It is the **primary regulatory framework** that defines the cloud provider's obligations to its financial customer, and it can result in hyperscalers being directly supervised by European Supervisory Authorities. This article is the overview; the deep dives sit in dedicated articles linked below.

## What DORA is and why it matters for cloud

DORA is Regulation (EU) 2022/2554 — a **directly applicable** EU regulation (no national transposition required) that establishes uniform ICT operational resilience requirements for the EU financial sector. It applies to approximately **22,000 financial entities** across the EU and to their **critical ICT third-party providers** — which includes any cloud provider whose services are material to the financial entity's operations.

DORA's key innovation: it brings critical ICT third-party providers — meaning hyperscalers and major SaaS platforms — under **direct European supervision** by the European Supervisory Authorities (ESAs: **EBA** for banking, **EIOPA** for insurance and pensions, **ESMA** for securities markets). For the first time, AWS, Microsoft, Google, and other major cloud providers can be required to answer to European financial regulators directly. This is the [Critical Third-Party Provider (CTPP) regime](./dora-ctpp-regime-direct-esa-supervision) — covered in detail in its own article.

## The five pillars

DORA structures the regime around five pillars:

| # | Pillar | What it covers |
|---|---|---|
| 1 | **ICT risk management** | The financial entity's responsibilities for managing ICT risk: governance, risk framework, ICT systems, ICT-related incidents, business continuity |
| 2 | **ICT-related incident management** | Classification, reporting timelines (24h initial / 72h intermediate / 1-month final), post-incident review |
| 3 | **Digital operational resilience testing** | Vulnerability assessments, network security tests, scenario-based testing, **threat-led penetration testing (TLPT)** every 3 years for systemically important entities |
| 4 | **ICT third-party risk management** | Contractual requirements (Article 30), exit strategies, concentration risk, the [CTPP regime](./dora-ctpp-regime-direct-esa-supervision) |
| 5 | **Information and intelligence sharing** | Coordination on cyber threats across financial entities |

For cloud providers, **pillars 2, 3, and 4** are where the operational demands concentrate. Cloud-related content under pillar 4 is the most contractually material — see [DORA Article 30 contracts and exit strategies](./dora-article-30-contracts-and-exit-strategies) for the deep treatment.

## Scope — who is in scope and who is not

**In scope as financial entities** (DORA Article 2):
- Credit institutions (banks).
- Payment institutions and electronic money institutions.
- Investment firms, trading venues, central counterparties (CCPs), central securities depositories (CSDs).
- Insurance and reinsurance undertakings.
- Pension institutions (IORPs).
- Crypto-asset service providers (under MiCA).
- Crowdfunding service providers.
- Securitisation repositories and trade repositories.
- Credit rating agencies.
- Various other supervised financial entities.

**Out of scope**:
- Non-financial entities, even if they serve the financial sector commercially.
- Financial entities below specific size thresholds for certain provisions (microenterprises have lighter obligations).

**As ICT third-party providers** (potentially in scope via the CTPP regime):
- Cloud computing service providers.
- Software providers including SaaS.
- Datacentre service providers.
- ICT outsourcing service providers.

The CTPP designation criteria are detailed in the [dedicated CTPP article](./dora-ctpp-regime-direct-esa-supervision).

## Incident reporting — the 24-hour clock

DORA imposes one of the strictest incident reporting regimes in EU regulation:

| Stage | Timeline |
|---|---|
| **Initial notification** | **24 hours** from classification of a major ICT-related incident |
| **Intermediate report** | **72 hours** from classification |
| **Final report** | **One month** from the resolution of the incident |

The clock starts at **classification**, not at detection. The financial entity must classify the incident according to DORA's classification criteria (impact, geographical spread, duration, criticality of services, economic impact).

For cloud providers, the operational consequence is the **cooperation obligation** detailed in [Article 30](./dora-article-30-contracts-and-exit-strategies). The provider must support the customer's reporting timelines — providing technical details, impact assessments, and remediation status fast enough that the customer can meet the 24-hour deadline. Cloud providers without an established cooperation interface tend to become the bottleneck.

Reports go to the financial entity's national competent authority (the financial supervisor in the entity's home Member State).

## Threat-Led Penetration Testing (TLPT)

DORA introduces mandatory **Threat-Led Penetration Testing (TLPT)** for systemically important financial entities under pillar 3. TLPT is performed:

- At least every **three years**.
- By certified red-team service providers (TIBER-EU framework or equivalent).
- Against the financial entity's production systems and supporting third-party services.

For cloud providers serving TLPT-scope financial entities:

- The provider must enable testing of the financial entity's systems running on the cloud, including offensive testing.
- Coordination protocols between the financial entity, the testing firm, and the cloud provider are required.
- The cloud provider's underlying infrastructure is implicitly in scope as the platform under test.

This is operationally different from traditional pen-testing arrangements where the cloud provider imposes strict scope limits. DORA TLPT requires more permissive arrangements, governed by careful pre-test coordination. Mature cloud providers have established TLPT-cooperation playbooks; less mature providers handle each request ad-hoc.

## DORA and national supervisors

Reporting under DORA flows to national financial supervisors, which vary by Member State:

| Country | Banking | Insurance / Pensions | Securities |
|---|---|---|---|
| Slovakia | NBS | NBS | NBS |
| Czechia | ČNB | ČNB | ČNB |
| Germany | BaFin | BaFin | BaFin |
| France | ACPR (under Banque de France) | ACPR | AMF |
| Italy | Banca d'Italia | IVASS | CONSOB |
| Spain | Banco de España | DGSFP | CNMV |
| Netherlands | DNB | DNB | AFM |
| Poland | KNF | KNF | KNF |
| Finland | Finanssivalvonta (FIN-FSA) | FIN-FSA | FIN-FSA |

For cloud providers operating across multiple Member States, this matrix of national supervisors is the operational reality. [CTPP designation](./dora-ctpp-regime-direct-esa-supervision) centralises supervision at ESA level, but for non-CTPP providers, the financial-entity supervisor of each customer is the relevant authority.

## DORA's relationship with NIS2 and GDPR

DORA does not exist in isolation. Three EU regimes apply in parallel to cloud arrangements serving financial entities processing personal data:

| Regime | What it covers | Applies to |
|---|---|---|
| **DORA** | ICT operational resilience for financial sector | Financial entities + their critical ICT providers |
| **[NIS2](./nis2-supply-chain-cloud-providers)** | Cybersecurity for essential and important entities | Cloud providers as essential entities + their NIS2-scope customers |
| **[GDPR](./gdpr-article-28-and-eu-cloud-code-of-conduct)** | Personal data processing | All controllers and processors handling EU resident personal data |

For a cloud provider serving an EU bank that processes customer personal data, all three regimes apply simultaneously. The provider has:
- **DORA obligations** as an ICT third-party provider (directly applicable, potentially CTPP-designated).
- **NIS2 obligations** as an essential entity in its own right (via national transposition).
- **GDPR Article 28 obligations** as a processor.

Mature cloud providers operate a **single incident classification and reporting workflow** that satisfies all three regimes in parallel. The substantive control overlap is large; the procedural distinctness (different supervisors, different reporting destinations, different sanctions regimes) requires careful tracking.

:::tip[Architectural Pro Tip]
For a cloud provider designing its DORA-compliance posture, the highest-leverage move is to **build a single ICT incident classification and reporting workflow that satisfies DORA, NIS2, and GDPR breach notification cadences in parallel**. The control overlap is large; the timing overlap (DORA classifies-then-24h, NIS2 starts at awareness, GDPR 72-hour breach notification) requires care, but a single workflow that flags incidents into all three reporting streams is operationally cheaper than three parallel workflows. CTPP-designated providers should additionally build dedicated supervisory cooperation interfaces — the Lead Overseer's information demands are different from those of customer-level supervisors.
:::

## DORA and the national cloud frameworks

DORA does not displace the national cloud frameworks for non-financial workloads. For financial workloads, DORA is the primary framework, but national framework participation is still operationally relevant:

- **[Slovak KsVC](./slovakia-ksvc-mirri-government-cloud)** listing is the procurement gate for Slovak public-sector financial customers (NBS infrastructure, public-sector pension funds).
- **[BSI C5](./germany-bsi-c5-cloud-attestation)** attestation provides DORA-aligned evidence on data security and operational controls.
- **[ENS](./spain-ens-national-security-framework) High** and **[ACN](./italy-acn-cloud-qualification) QC3+** provide overlapping evidence on security and operational resilience.
- **[SecNumCloud](./france-anssi-secnumcloud-qualification)** provides DORA-aligned evidence with an additional sovereignty layer.

DORA effectively reads existing national framework attestations as supporting evidence for third-party risk management obligations. CSPs with strong national framework participation have less to do for DORA than CSPs without.

## DORA and adjacent jurisdictions

Adjacent European jurisdictions are integrating DORA in different ways:

- **United Kingdom** has built its own equivalent regime — the **Critical Third-Party (CTP) regime** under FCA/PRA/BoE supervision. See [UK NCSC article](./united-kingdom-ncsc-cloud-security-principles).
- **Switzerland** is not under DORA but operates the substantively similar **FINMA Circular 2018/3** for financial-sector outsourcing including cloud. See [Switzerland article](./switzerland-finma-cloud-frameworks).
- **Norway** as an EEA state is incorporating DORA through the EEA Joint Committee process. See [Norway article](./norway-nsm-cloud-frameworks).

For cloud providers serving European financial entities across these jurisdictions, the operational substance is convergent; the procedural and supervisory specifics differ.

:::warning[Reality Check]
DORA is the regulation that most often gets underestimated by cloud providers' legal teams. The contractual requirements (Article 30) read as procedural, but operationalising them — exit strategies, audit rights, data portability commitments, incident cooperation playbooks, TLPT enablement — is a substantial programme. Cloud providers that approached DORA as a contract-template update typically find themselves rewriting contracts again 12 months later as financial customers refuse to accept thin commitments. The substantive work is operational, not legal. See [Article 30 deep-dive](./dora-article-30-contracts-and-exit-strategies) for the operational reality behind each contract clause.
:::

:::tip[Slovak context]
For Slovak financial entities, DORA reporting flows to **NBS** (Národná banka Slovenska) as the unified financial supervisor across banking, insurance, and securities sectors. NBS coordinates with the relevant ESA via the Joint Oversight Network when CTPP-designated cloud providers are involved. Slovak banks consuming cloud services from CTPP-designated hyperscalers should expect their NBS supervisory engagement on the cloud arrangement to coordinate with ESA-level oversight of the hyperscaler — the two supervisory tracks are deliberately parallel. For Slovak public-sector financial entities (Slovenská záručná a rozvojová banka, EXIMBANKA SR), DORA applies alongside [KsVC](./slovakia-ksvc-mirri-government-cloud) procurement requirements for their cloud arrangements.
:::

## Where to go next

If you arrived here via the overview and need to go deeper:

- **CTPP regime** — direct ESA supervision, designation criteria, what hyperscalers do operationally → [DORA CTPP Regime article](./dora-ctpp-regime-direct-esa-supervision).
- **Contracts and exit strategies** — Article 30 contractual content clause-by-clause, audit rights handling, exit-strategy operationalisation → [DORA Article 30 article](./dora-article-30-contracts-and-exit-strategies).
- **Supply chain** — how DORA fits with NIS2 supply-chain obligations → [NIS2 Supply Chain article](./nis2-supply-chain-cloud-providers).
- **Personal data** — GDPR Article 28 in cloud context → [GDPR Article 28 + EU Cloud CoC article](./gdpr-article-28-and-eu-cloud-code-of-conduct).
- **Country-specific** — your national financial supervisor and any national cloud framework participation → country articles.

## Closing checklist

- DORA is Regulation (EU) 2022/2554 — **directly applicable since 17 January 2025**. No national transposition; the regulation applies directly.
- Scope: EU financial entities (~22,000) and their ICT third-party providers, including cloud.
- Five pillars: ICT risk management, incident management, operational resilience testing (including TLPT), third-party risk management (including CTPP regime and Article 30 contracts), information sharing.
- Incident reporting: **24 hours initial / 72 hours intermediate / 1 month final**, starting at classification.
- Mandatory **TLPT every 3 years** for systemically important entities, with cooperation requirements from cloud providers.
- DORA, NIS2, and GDPR apply in parallel for cloud providers serving EU financial customers processing personal data. Build a single classification and reporting workflow covering all three.
- DORA reads national framework attestations (KsVC, BSI C5, ENS, ACN, SecNumCloud) as supporting evidence. Strong national framework participation reduces DORA preparation work.
- Adjacent jurisdictions: UK has its own CTP regime; Switzerland has FINMA 2018/3; Norway is incorporating DORA via EEA.
- Treat DORA as an operational programme, not a contract-template update. Substantive work happens in incident cooperation, audit handling, and exit-strategy testing — see the [Article 30 deep-dive](./dora-article-30-contracts-and-exit-strategies).
- See country articles ([Slovakia](./slovakia-ksvc-mirri-government-cloud), [Germany](./germany-bsi-c5-cloud-attestation), [France](./france-anssi-secnumcloud-qualification), [Italy](./italy-acn-cloud-qualification), [Spain](./spain-ens-national-security-framework)) for per-country financial supervisor mapping and how each framework intersects with DORA.
