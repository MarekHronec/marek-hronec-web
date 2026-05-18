---
title: "Poland — KSC and the Pending National Cybersecurity Certification System"
category: compliance
tags: ["Poland", "KSC", "KSCC", "NASK", "NIS2", "Compliance", "Data Security"]
date: 2026-05-07
updated: 2026-05-16
readTime: 10
level: intermediate
excerpt: "Poland regulates cloud through the National Cybersecurity System (KSC). The NIS2-aligned amendment (informally 'KSC2') entered into force on 3 April 2026 with a pending Constitutional Court review. The parallel National Cybersecurity Certification System (KSCC) was adopted in June 2025 and is operationalising."
references:
  - title: "KSC — National Cybersecurity System Act (Consolidated)"
    url: "https://sip.lex.pl/akty-prawne/dzu-dziennik-ustaw/krajowy-system-cyberbezpieczenstwa-18746756"
    description: "Consolidated text of the Polish National Cybersecurity System Act, originally from 2018 with the 2025 NIS2 amendment (KSC2). The operative law for cybersecurity regulation in Poland."
    domain: "sip.lex.pl"
  - title: "NASK Cyberpolicy — National Cybersecurity Certification System (KSCC)"
    url: "https://cyberpolicy.nask.pl/krajowy-system-certyfikacji-cyberbezpieczenstwa/"
    description: "Policy analysis of the KSCC framework — the national cybersecurity certification system established by the Act of 25 June 2025 (Dz.U. 2025 poz. 1017)."
    domain: "cyberpolicy.nask.pl"
  - title: "Ustawa o krajowym systemie certyfikacji cyberbezpieczeństwa (Dz.U. 2025 poz. 1017)"
    url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250001017"
    description: "The Polish National Cybersecurity Certification System Act of 25 June 2025 — establishes a three-tier certification trust system (basic/significant/high) for ICT products, services, and processes."
    domain: "isap.sejm.gov.pl"
  - title: "KSC consolidated text — Dz.U. 2026 poz. 20 t.j."
    url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000020"
    description: "Consolidated text of the National Cybersecurity System Act incorporating the 2026 NIS2 amendment (informally 'KSC2'). In force from 3 April 2026 after one-month vacatio legis from publication."
    domain: "isap.sejm.gov.pl"
  - title: "Ministerstwo Cyfryzacji"
    url: "https://www.gov.pl/web/cyfryzacja"
    description: "The Polish Ministry of Digitisation — the policy authority for cybersecurity coordination and the lead on KSC and KSCC development."
    domain: "gov.pl"
  - title: "NASK — Research and Academic Computer Network"
    url: "https://www.nask.pl/en/"
    description: "Naukowa i Akademicka Sieć Komputerowa, the operator of CSIRT NASK for the civil sector and the body developing technical guidance under KSC."
    domain: "nask.pl"
  - title: "CSIRT GOV"
    url: "https://csirt.gov.pl/"
    description: "The Government CSIRT operated under the Internal Security Agency (ABW) — the incident response authority for Polish public administration."
    domain: "csirt.gov.pl"
---

Poland regulates cloud security horizontally through the *Krajowy System Cyberbezpieczeństwa* — the National Cybersecurity System — rather than through a dedicated cloud catalogue. The original act (KSC) transposed NIS1 in 2018; the NIS2-aligned amendment, informally called "KSC2," was signed on 19 February 2026, published 2 March 2026, and **entered into force on 3 April 2026**. A separate national certification system (KSCC) was adopted by the Act of 25 June 2025 (Dz.U. 2025 poz. 1017) and is operationalising. This article walks through what is operative today and what it means for CSPs in the Polish market.

## The system at a glance

Two instruments matter:

- **Krajowy System Cyberbezpieczeństwa (KSC)** — operative since 2018. The NIS2-aligned amendment (informally "KSC2") was signed by the President on **19 February 2026**, published in Dziennik Ustaw on **2 March 2026**, and **entered into force on 3 April 2026** after a one-month *vacatio legis*. Consolidated text reference: **Dz.U. 2026 poz. 20 t.j.**
- **Krajowy System Certyfikacji Cyberbezpieczeństwa (KSCC)** — **adopted** by the **Ustawa z dnia 25 czerwca 2025 r. o krajowym systemie certyfikacji cyberbezpieczeństwa** (Dz.U. 2025 poz. 1017). Establishes a three-tier certification trust system (basic / significant / high) for ICT products, services, and processes, aligned with EU Regulation 2019/881. Conformity assessment bodies accredited by **PCA** (Polskie Centrum Akredytacji). Budget allocations: PLN 784k (2024), PLN 10.19M (2025), PLN 12M/year (2026–2033). Operational ramp-up underway.

"KSC2" is informal shorthand; the act is formally a *nowelizacja* (amendment) of the 2018 KSC Act. KSC is the operative horizontal cybersecurity framework; KSCC is the parallel certification framework.

**Important caveat.** The President referred the KSC2 amendment to the **Constitutional Court** at the time of signing. The act took effect on 3 April 2026, but constitutional review is pending. Provisions struck down on constitutional review would create downstream uncertainty for regulated subjects and supervisory authorities.

The institutional landscape:

- **Ministerstwo Cyfryzacji** — Ministry of Digitisation, the political coordination authority.
- **NASK** (Naukowa i Akademicka Sieć Komputerowa) — operates **CSIRT NASK** for the civil sector and develops technical guidance.
- **ABW** (Agencja Bezpieczeństwa Wewnętrznego) — operates **CSIRT GOV** for public administration.
- **MON** (Ministerstwo Obrony Narodowej) — operates **CSIRT MON** for defence.
- **UKE** (Urząd Komunikacji Elektronicznej) — Office of Electronic Communications, supervisory authority for telecoms and broader digital sectors.

The three-CSIRT split is unusual in EU terms and reflects the Polish governmental structure for cybersecurity response.

## Legislative basis

The legislative position:

- **Ustawa o krajowym systemie cyberbezpieczeństwa** — the National Cybersecurity System Act. Original text Dz.U. 2018 (NIS1 transposition); NIS2-aligned amendment signed 19 February 2026, in force 3 April 2026; consolidated text Dz.U. 2026 poz. 20 t.j.
- **Ustawa z dnia 25 czerwca 2025 r. o krajowym systemie certyfikacji cyberbezpieczeństwa** (Dz.U. 2025 poz. 1017) — National Cybersecurity Certification System Act. Operative framework for KSCC; aligns with EU Regulation 2019/881 and provides the legal hook for EUCS adoption when it eventually lands.

Secondary regulation under KSC defines specific obligations for key services operators, digital service providers, and the supply chain expectations applicable to cloud providers. Key operational dates under the post-amendment KSC: KSC Register launch **13 April 2026**; ex officio entries window **13 April – 6 May 2026**; mandatory **self-registration period 7 May – 3 October 2026**.

## Scope of obligation

The 2025 KSC2 amendment expands the scope materially in line with NIS2:

- **Operators of key services** — energy, transport, healthcare, banking, water supply, digital infrastructure (including cloud providers above NIS2 size thresholds).
- **Providers of digital services** — cloud services, marketplaces, search engines.
- **Public finance entities, NBP, BGK** — public-sector financial institutions.
- **Medium-size enterprises in critical sectors** — newly added under NIS2.

For cloud providers, the operative status is *digital service provider* with risk management, incident reporting, and supply-chain obligations.

## Classification model

KSC does **not** introduce explicit cloud-specific classification levels. Cloud providers are regulated as digital service providers under the NIS2 essential / important entities split inherited from the directive, not under a country-specific multi-tier scheme.

## Evaluation criteria

Obligations for cloud providers as digital service providers cover:

- Risk management for the digital service.
- **Incident reporting** to the relevant CSIRT — typically within 24 hours under NIS2 timelines.
- Audit and conformity demonstration.
- Supply-chain security.

Reference standard: **[ISO/IEC 27001](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines)** is the primary international standard referenced.

The **KSCC** (adopted by the Act of 25 June 2025, Dz.U. 2025 poz. 1017) provides:

- A national certification framework aligned with EU Regulation 2019/881 (Cybersecurity Act).
- A legal hook for implementation of EU certification schemes, including EUCS when adopted at EU level.
- A Polish national overlay for non-EU-scheme certification where useful.

The KSCC scheme is **operationalising**: accreditation by PCA (Polskie Centrum Akredytacji), conformity-assessment-body designation, and substantive technical criteria are being developed under the funding profile noted in the legislative basis section.

## The assessment process

Under KSC:

- Self-conformity demonstration by the regulated subject.
- Audits by accredited auditors.
- Supervisory inspections by NASK, UKE, and the relevant CSIRTs.

Under KSCC, the assessment process follows the standard EU certification pattern:

- Accredited Conformity Assessment Bodies (CABs) designated under PCA accreditation.
- National accreditation authority oversight.
- Certificates with defined validity periods at the three trust levels (basic / significant / high).

Detailed procedural rules and the substantive technical scheme content are being defined as KSCC operationalises.

## Catalogue and recertification

There is **no national public catalogue** of certified or qualified cloud services under KSC today. As KSCC operationalises, it is expected to introduce a register of certified products and services aligned with EU certification schemes.

Recertification cadence under KSC follows the cadence of the underlying ISO/IEC 27001 certification or specific NIS2 audit cycles. There is no Polish-specific calendar imposed beyond what the underlying standards require.

## Sanctions and oversight

KSC2 sanctions follow the NIS2 model:

- Fines up to **€10 million or 2% of global annual turnover** (whichever is higher) for non-compliance for key services operators.
- **Personal liability** for management — directors, security officers, and operational management can be **individually penalised** for governance failures. This is a relatively pointed enforcement tool unique among EU NIS2 transpositions in its emphasis on personal accountability.
- Supervisory powers are split: **NASK** and **UKE** have inspection rights for their respective sectors.

The personal liability mechanism is the operationally distinctive element of the Polish framework. Governance failures at regulated subjects can result in named individuals being sanctioned, not just the legal entity.

For Polish **financial institutions**, **DORA** (Regulation (EU) 2022/2554) applies independently with the standard EU timelines. Major ICT incident reporting goes to the **KNF** (Komisja Nadzoru Finansowego, Financial Supervision Authority) for banking and insurance. DORA's Critical Third-Party Provider regime can bring hyperscalers under direct European supervision when they serve significant portions of the financial sector.

## Sovereignty posture

KSC does **not** impose explicit sovereignty rules on cloud providers — no ownership caps, no headquartering requirements, no immunity-from-extraterritorial-law clauses.

The Polish position in the EU EUCS debate has been more measured than the French position on sovereignty. Poland held the rotating EU Council presidency in H1 2025 and attempted to move EUCS forward; that effort did not succeed in producing a vote-ready scheme. The Polish position favours pragmatic compromise over strict sovereignty exclusion.

:::tip[Polish EU-native context]
**CloudFerro** is the most significant Poland-headquartered EU-native cloud provider. Warsaw-based (founded 2015), it operates the **Copernicus Data Space Ecosystem (CDSE)** — the European Earth observation data platform that superseded the Copernicus DIAS programme in 2023, providing ~100 PB of publicly accessible EO data. CloudFerro holds ISO/IEC 27001:2022 + 27017 + 27018 and is authorised to handle **ESA SECRET and ESA CONFIDENTIAL** classified information. In March 2026 CloudFerro announced a new cloud region in Łódź with a €75M expansion investment. For Polish procurers evaluating EU-native alternatives to hyperscalers, CloudFerro is the domestic specialist for EO/HPC workloads; OVHcloud, Scaleway, and STACKIT are the broader-portfolio EU-native alternatives. See the [EU-native cloud providers article](/knowledge-base/compliance/eu-native-cloud-providers-landscape) for the full landscape.
:::

## Multicloud factor

The Polish framework is operationally light for multinational CSPs as of mid-2026:

- No country-specific certification to obtain.
- Standard international attestations accepted as supply-chain evidence.
- Three-CSIRT structure adds operational complexity in incident routing but does not impose substantive certification requirements on CSPs themselves.

The watch item is KSCC. Now enacted, it provides a national certification framework whose substantive technical content is still being developed. Whether KSCC imposes Polish-specific certification or operates primarily as a vehicle for EU schemes (notably EUCS when it lands) will determine its operational weight for CSPs. Until the substantive scheme content is published, the prudent posture is to maintain a strong international attestation package and engage with NASK Cyberpolicy consultations.

:::tip[Architectural Pro Tip]
For a CSP entering the Polish market, the practical compliance package is the same as for [Czechia](/knowledge-base/compliance/czechia-nukib-cybersecurity-act): [ISO 27001/27017/27018](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines), [SOC 2 Type 2](/knowledge-base/compliance/soc-2-reports-how-to-actually-read-them) or [BSI C5](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation), [EU Cloud Code of Conduct](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct) adherence, demonstrable incident reporting capability with sub-24-hour timelines. The Polish-specific work is operational — establishing relationships with the three CSIRTs (NASK for civil, GOV for public administration, MON for defence sectors), ensuring incident notification routing is correct, and providing customers with documentation suitable for their KSC supply-chain obligations. There is no separate Polish certification project today; as KSCC operationalises, a Polish-aligned certification track may emerge — watch for the substantive technical criteria as they are published.
:::

:::warning[Reality Check]
The personal liability mechanism in KSC2 occasionally surprises foreign CSPs that are used to corporate-only sanctions. The act allows named individuals — directors, CISOs, operational managers — to be personally fined for governance failures. CSPs with Polish legal entities or staffed Polish operations should be aware that personal accountability extends to those operations. The right governance posture is to ensure named responsibilities are documented, that governance decisions are traceable, and that operational staff have clear authority for the decisions they are accountable for. This is good practice everywhere; in Poland it has direct personal consequences.
:::

## Closing checklist

- Poland regulates cloud security through the National Cybersecurity System (KSC). The NIS2-aligned amendment (informally "KSC2") was signed 19 February 2026, published 2 March 2026, **in force 3 April 2026** (consolidated Dz.U. 2026 poz. 20 t.j.). There is no dedicated cloud qualification framework today.
- A parallel **KSCC** (National Cybersecurity Certification System) was **adopted** by the Ustawa z dnia 25 czerwca 2025 r. (Dz.U. 2025 poz. 1017). Three-tier trust system (basic/significant/high). Operational ramp-up underway.
- **Constitutional Court review pending** on the KSC2 amendment. Provisions struck down would produce downstream uncertainty.
- Three CSIRTs: NASK (civil), GOV (public administration, under ABW), MON (defence). Incident reporting routes to the relevant CSIRT per sector.
- Reference standard: ISO/IEC 27001. Cloud providers are regulated as digital service providers under KSC2.
- Sanctions follow NIS2: up to **€10 million or 2% of global annual turnover** (whichever is higher) for key services operators. **Personal liability** for management is distinctively emphasised — named individuals can be personally fined for governance failures.
- No sovereignty rules on providers. Poland's position in the EUCS debate is more permissive than France's; the Polish 2025 presidency tried to move EUCS without success.
- For CSPs, the practical package is the same as for most EU markets: ISO 27001/27017/27018, SOC 2 or BSI C5, EU Cloud CoC, incident reporting capabilities. No Polish-specific certification required today; KSCC operationalisation may add a Polish-aligned certification track over time.
- Operational distinctives: three-CSIRT routing, personal-liability accountability, KSC Register self-registration window 7 May – 3 October 2026, Constitutional Court review of KSC2 pending.
- **What to read next:** [NIS2 Supply Chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers) for the supply-chain obligations Polish regulated subjects must satisfy; [EU-native cloud providers](/knowledge-base/compliance/eu-native-cloud-providers-landscape) for CloudFerro and other EU-native providers active in the Polish market; [EUCS Watch](/knowledge-base/compliance/eucs-watch-political-tracking-2026) for the political context including the Polish 2025 presidency effort; [Czechia](/knowledge-base/compliance/czechia-nukib-cybersecurity-act) and [Slovakia](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) for adjacent CEE regulatory comparisons.
