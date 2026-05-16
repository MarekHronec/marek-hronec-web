---
title: "Switzerland — FINMA, nFADP, and the Cloud Framework Outside the EU"
category: compliance
tags: ["Switzerland", "FINMA", "nFADP", "FDPIC", "Compliance", "Data Security", "Adjacent Jurisdiction"]
date: 2026-05-12
updated: 2026-05-12
readTime: 10
level: intermediate
excerpt: "Switzerland is not in the EU and not in the EEA, but is deeply bilateral with both. The cloud framework is composed: FINMA Circular 2018/3 for financial services, the revised nFADP for data protection (GDPR-aligned with lower penalties), and sector-specific regulation for healthcare, defence, and classified information. For Slovak organisations with Swiss customers — and Swiss organisations consuming EU cloud — the regime is adjacent but procedurally distinct."
references:
  - title: "FINMA Circular 2018/3 — Outsourcing"
    url: "https://www.finma.ch/en/documentation/circulars/"
    description: "The Swiss Financial Market Supervisory Authority's circular on outsourcing arrangements including cloud services — the operative framework for Swiss financial sector cloud use."
    domain: "finma.ch"
  - title: "Swiss revised Federal Act on Data Protection (nFADP / nDSG)"
    url: "https://www.fedlex.admin.ch/eli/cc/2022/491/en"
    description: "The revised Swiss data protection act, effective 1 September 2023, broadly aligned with GDPR with some Swiss-specific divergences. Maintains mutual adequacy with the EU."
    domain: "fedlex.admin.ch"
  - title: "Swiss Federal Data Protection and Information Commissioner (FDPIC)"
    url: "https://www.edoeb.admin.ch/edoeb/en/home.html"
    description: "The Swiss data protection supervisor — equivalent to a national DPA — overseeing nFADP compliance and managing cross-border transfer issues."
    domain: "edoeb.admin.ch"
  - title: "Information Security Act (ISA)"
    url: "https://www.fedlex.admin.ch/eli/oc/2022/232/en"
    description: "The Swiss federal Information Security Act, governing classified-information handling for federal administration and critical infrastructure."
    domain: "fedlex.admin.ch"
  - title: "NCSC Switzerland"
    url: "https://www.ncsc.admin.ch/ncsc/en/home.html"
    description: "The Swiss National Cyber Security Centre — the operational federal authority for cybersecurity coordination and incident response, distinct from the UK NCSC despite the name."
    domain: "ncsc.admin.ch"
  - title: "FINMA — Cloud Computing Guidance"
    url: "https://www.finma.ch/en/news/2019/12/20191210-mm-praktische-fragen-zu-cloud-im-banken-und-versicherungsbereich/"
    description: "FINMA's practical guidance on cloud questions for banks and insurers, complementing the outsourcing circular with operational interpretation."
    domain: "finma.ch"
---

Switzerland is not in the EU and not in the EEA. It maintains bilateral agreements with the EU on data protection (under an adequacy decision) and on selected market integration. The Swiss cloud security framework is composed: **FINMA Circular 2018/3** for financial services, the **revised nFADP** for data protection, the **Information Security Act** for classified information, and sector-specific regulation across healthcare, defence, and critical infrastructure. For any cloud provider serving Swiss customers — and Slovak organisations operating in Switzerland — the regime is adjacent to EU expectations but procedurally distinct. This article walks through how it works.

## The system at a glance

The framework is composed rather than centralised:

- **FINMA Circular 2018/3** on outsourcing — the operative framework for Swiss financial sector cloud use.
- **Revised Federal Act on Data Protection (nFADP / nDSG)** — effective 1 September 2023; substantively aligned with GDPR.
- **Federal Data Protection and Information Commissioner (FDPIC)** — the data protection supervisor.
- **Information Security Act (ISA)** — covering classified-information handling for federal administration.
- **NCSC Switzerland** — the federal cybersecurity centre (distinct from the UK NCSC).
- **Sector-specific regulation** for healthcare, defence, and critical infrastructure operators.

There is no Swiss equivalent of EUCS, BSI C5, ENS, or KsVC — no centralised cloud certification scheme. Swiss government cloud procurement is handled through federal procurement processes with NCSC-style assessment against published expectations rather than catalogue-based approval. This is structurally closer to the [UK NCSC model](./united-kingdom-ncsc-cloud-security-principles) than the catalogue-driven Slovak or Italian models.

## Legislative basis

The legislative stack is layered across federal acts, ordinances, and supervisory circulars:

- **Federal Act on Data Protection (nFADP / nDSG)** — effective **1 September 2023**. Replaces the 1992 FADP. Broadly aligned with GDPR.
- **Ordinance on Data Protection (FADPO / DSV)** — implementing ordinance.
- **Information Security Act (ISA)** — covers classified-information handling for federal authorities and identified critical infrastructure operators.
- **Banking Act / Insurance Supervision Act / Financial Market Infrastructure Act** — the sectoral statutes underlying FINMA's supervisory mandate.
- **FINMA Circular 2018/3** on outsourcing — operative implementing instrument for cloud arrangements in financial services.

The Swiss approach is **principle-based regulation**: high-level statutory obligations with operational interpretation through supervisor circulars and ordinances rather than detailed technical decrees. Cloud providers operating in Switzerland engage primarily with the circulars and the FDPIC guidance rather than with a centralised regulatory rule-book.

## Scope of obligation

Different parts of the framework have different scopes:

- **FINMA Circular 2018/3** — applies to FINMA-supervised entities: banks, insurers, securities dealers, asset managers, fund management companies, financial market infrastructures (FMIs). Cloud arrangements are explicitly within scope as material outsourcing.
- **nFADP** — applies to **all personal data processing** of individuals in Switzerland, by Swiss-resident controllers and by foreign controllers processing Swiss residents' data.
- **ISA** — applies to federal authorities, federally-controlled enterprises, and identified critical infrastructure operators handling classified information.
- **Sector-specific** — healthcare under Swiss health data protection law; defence under DDPS-specific requirements; critical infrastructure under sector regulators.

For cloud providers, the operative scope question is which Swiss customer types are being served. A CSP serving Swiss banks engages with FINMA 2018/3; a CSP serving Swiss commercial customers engages with nFADP; a CSP serving Swiss federal authorities engages with ISA + sectoral requirements.

## Classification model

The Swiss framework does not impose a multi-tier cloud-service classification analogous to KsVC U1-U4 or ENS Básica-Alta. Classification operates at the **information-asset level** rather than the service level:

- **Public information** — no specific protective requirements.
- **Internal information** — standard organisational controls.
- **Confidential information** — defined controls under organisational policy and (for finance) FINMA expectations.
- **Strictly confidential / classified** — Information Security Act applies; specific handling requirements.

For FINMA-supervised entities, an additional layer applies: **critical functions** vs. non-critical functions. Critical outsourcing arrangements (which include most cloud arrangements supporting core banking, insurance, or trading systems) trigger heightened obligations under Circular 2018/3.

## Evaluation criteria — FINMA Circular 2018/3

For financial-sector cloud arrangements, the operative criteria sit in Circular 2018/3. Key obligations on the supervised entity:

- **Strategy and risk analysis** — documented decision basis for the outsourcing.
- **Inventory and reporting** of all material outsourcing arrangements to FINMA.
- **Critical functions designation** — distinguishing critical from non-critical outsourcing.
- **Contract requirements** — including audit rights for the supervised entity and for FINMA itself.
- **Business continuity and exit strategy** — documented portability.
- **Data protection** — alignment with nFADP and (for cross-border) GDPR.
- **Reporting** — material incident notification to FINMA.
- **Geographic considerations** — where data is processed, what jurisdictional exposure exists.

The substance is comparable to [DORA](./dora-for-cloud-financial-sector-overlay) in several dimensions (incident reporting, audit rights, exit strategies, concentration risk awareness). The procedural specifics differ — supervision is by FINMA rather than by ESAs; the CTPP-equivalent designation regime is absent (though concentration risk is monitored qualitatively).

Swiss banks consume material amounts of EU and US hyperscaler cloud services. The FINMA Circular framework has matured into a stable operational regime over multiple years; supervised entities and their cloud providers have established standard contractual patterns aligned with the circular's requirements.

## Evaluation criteria — nFADP

For personal data processing, nFADP is the operative regime. It is broadly GDPR-aligned with notable specifics:

- **Same controller-processor relationship** as GDPR Article 28. Binding contract required.
- **Same data subject rights** with Swiss-specific wording variations.
- **Mandatory data breach notification** to FDPIC and (where appropriate) data subjects.
- **Records of processing activities** required.
- **Data Protection Impact Assessments** for high-risk processing.
- **Lower penalties** than GDPR. Penalties under nFADP cap at **CHF 250,000** and target **individuals** (managers, decision-makers) rather than entities. This is a structural difference from GDPR's entity-level fines up to 4% of global turnover.
- **No data protection officer requirement** at federal level (unlike GDPR Article 37 mandatory DPO for certain processing).

For cloud providers, nFADP-aligned processing is operationally similar to GDPR Article 28 work. The contract structure mirrors EU expectations. The supervisory authority is the FDPIC.

## The assessment process

The Swiss framework does not run a centralised assessment of cloud providers. The process flows from customer to provider:

1. **Supervised entity** (or any controller) assesses the cloud provider as part of its outsourcing / supplier due diligence.
2. Standard evidence requested: ISO 27001/27017/27018, SOC 2 Type 2, [BSI C5](./germany-bsi-c5-cloud-attestation), [EU Cloud Code of Conduct](./gdpr-article-28-and-eu-cloud-code-of-conduct) Level 2.
3. **FINMA-supervised entities** report material outsourcing arrangements; FINMA can request additional information or perform on-site inspections.
4. **FDPIC** monitors compliance with nFADP and can investigate complaints.
5. **NCSC Switzerland** coordinates broader cybersecurity matters and operates incident response for federal authorities.

There is no Swiss-specific cloud certification a CSP can obtain. The evidence base is the standard international portfolio plus contractual annexes tailored to Swiss expectations.

## Catalogue and recertification

There is **no central public catalogue** of approved cloud services. The Swiss model relies on:

- Cloud providers publishing their own attestations through trust centres (Microsoft Trust Center, AWS Artifact, Google Cloud Compliance).
- Supervised entities maintaining internal records of their assessments.
- FINMA's internal supervisory record of reported outsourcing arrangements.

Recertification cadence follows the underlying attestations:

- ISO 27001: 3-year cycle.
- SOC 2 Type 2: annual.
- BSI C5 Type 2: annual.
- nFADP compliance: ongoing, with reassessment on material change.
- FINMA outsourcing: ongoing supervisory dialogue; periodic on-site inspections.

## Sanctions and oversight

Sanctions vary by regime:

- **FINMA** — supervisory measures up to and including suspension of business activities for serious violations; reputational and licensing consequences are the binding mechanism for supervised entities.
- **nFADP** — penalties cap at **CHF 250,000** and target named individuals rather than entities. Penalties are imposed by criminal courts on FDPIC referral.
- **ISA** — classified-information mishandling falls under federal criminal law.
- **Sector-specific** — varies by sector regulator.

The penalty structure of nFADP is notably different from GDPR. The individual-targeted, criminal-court approach creates personal accountability without the entity-level financial deterrent GDPR provides. Compliance posture in Switzerland generally treats nFADP seriously despite the lower headline penalty figures.

## Sovereignty posture

Switzerland does not impose explicit sovereignty rules on cloud providers — no ownership caps, no headquartering requirements, no immunity-from-extraterritorial-law clauses on commercial cloud services.

For **classified information** under ISA, Swiss-specific handling requirements apply that effectively limit foreign-controlled providers from handling the most sensitive federal information. This functions as de facto sovereignty for the classified-information tier without the explicit ownership rules of [SecNumCloud](./france-anssi-secnumcloud-qualification).

For **financial sector data**, FINMA's outsourcing supervision includes assessment of geographic and jurisdictional exposure but does not categorically exclude foreign-controlled cloud providers. Major hyperscalers operate in the Swiss financial market under FINMA-supervised arrangements with their bank and insurer customers.

For **personal data**, nFADP recognises both EU adequacy (Swiss residents' data can flow to the EU/EEA without additional safeguards) and EU's reciprocal adequacy decision for Switzerland. This makes EU-region hyperscaler services straightforwardly usable for Swiss residents' personal data.

## Cross-border data flow patterns

Switzerland's bilateral adequacy with the EU produces a straightforward picture for EU-Swiss cloud arrangements:

- **EU → Switzerland**: covered by EU's adequacy decision for Switzerland. No SCCs required.
- **Switzerland → EU**: covered by Swiss adequacy regulations. No additional safeguards needed.
- **Switzerland → US**: covered by Swiss-US Data Privacy Framework (analogue to EU-US DPF) plus contractual measures.
- **Switzerland → other third countries**: SCCs or BCRs required with FDPIC supervision.

For Slovak organisations operating in Switzerland or with Swiss customers, the EU-Swiss adequacy makes cross-border flow operationally simple. The Swiss-specific work is contractual (Swiss DPA annex) and procedural (FDPIC awareness) rather than fresh substantive compliance.

:::tip[Architectural Pro Tip]
For a cloud provider with material Swiss financial-sector revenue, the highest-leverage Swiss-specific addition to an EU-baseline programme is **a FINMA Circular 2018/3 contractual annex** that maps existing audit rights, exit strategies, incident reporting commitments, and data location declarations to the circular's requirements. FINMA-supervised entities expect this annex format; CSPs that produce it on first request close procurement faster than those who treat each Swiss bank engagement as a fresh contracting exercise. The substantive content overlaps heavily with [DORA Article 30 contractual requirements](./dora-for-cloud-financial-sector-overlay) — a CSP producing DORA-compliant contracts is most of the way to FINMA 2018/3.
:::

## Multicloud factor

For multinational CSPs, Switzerland is one of the simpler European markets to extend an EU programme into:

- ISO 27001/27017/27018/27701 portable as primary evidence.
- SOC 2 Type 2 / BSI C5 portable as supporting evidence.
- EU Cloud Code of Conduct adherence portable.
- nFADP-specific contractual annex required (typically a small addition).
- FINMA 2018/3 alignment required for financial-sector contracts.
- No Swiss-specific certification to obtain — the regime is principle-based, not catalogue-based.

The marginal Swiss-specific work over a strong EU baseline is moderate. Cloud providers serving Swiss markets typically operate from Swiss regions (Microsoft Azure Switzerland, Google Cloud Zurich, AWS Zurich) when their customer base demands Swiss data residency, but EU-region services are commonly used for Swiss customers under nFADP-EU adequacy.

:::warning[Reality Check]
The "Switzerland is not in the EU" framing sometimes leads EU cloud providers to assume they need to start fresh for Swiss customers. They do not. Substantively the regime is GDPR-aligned plus FINMA-specific for finance plus ISA-specific for classified federal information. The actual additional work over EU compliance is contractual annexes and procedural awareness of Swiss supervisors, not fresh substantive control implementation. Procurement teams in EU CSPs that scope Switzerland as a separate compliance project consistently over-estimate the work.
:::

## Closing checklist

- Switzerland operates a composed cloud framework: FINMA 2018/3 (finance), nFADP (data protection, GDPR-aligned), ISA (classified information), sector-specific regulation. No central cloud catalogue, no multi-tier service classification.
- **FINMA Circular 2018/3** is the operative regime for financial-sector cloud. Substance is comparable to DORA; procedural specifics differ.
- **nFADP** (effective 1 September 2023) is GDPR-aligned with notable specifics: lower penalty cap (CHF 250,000), individual-targeted criminal sanctions, no mandatory DPO at federal level.
- Mutual EU-Swiss adequacy makes cross-border data flow with EU operationally simple.
- **No Swiss-specific cloud certification** to obtain. The evidence base is the standard international portfolio (ISO, SOC 2, BSI C5, EU Cloud CoC) plus Swiss-tailored contractual annexes.
- Sovereignty posture is principle-based: no explicit ownership rules for commercial cloud, but ISA classified-information handling effectively limits foreign providers from the most sensitive federal tier.
- For Slovak organisations: Swiss customers are operationally similar to other EU customers in cloud terms. The Swiss-specific additions are small.
- See [Norway article](./norway-nsm-cloud-frameworks) for the parallel EEA-side adjacent jurisdiction, [UK NCSC article](./united-kingdom-ncsc-cloud-security-principles) for the other primary non-EU European adjacent regime, and [DORA article](./dora-for-cloud-financial-sector-overlay) for the EU financial-sector framework FINMA 2018/3 most closely mirrors.
