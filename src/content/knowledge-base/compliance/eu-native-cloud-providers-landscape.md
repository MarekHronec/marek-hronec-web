---
title: "EU-Native Cloud Providers — The Landscape Beyond Hyperscalers and Sovereign JVs"
category: compliance
tags: ["EU-Native Cloud", "Cloud Providers", "Sovereignty", "Compliance", "Data Security", "Vendor"]
date: 2026-05-16
updated: 2026-05-16
readTime: 14
level: intermediate
excerpt: "OVHcloud, Scaleway, Hetzner, IONOS, STACKIT, T Cloud Public, 3DS Outscale, Cegedim.cloud, Aruba. EU-native pure-play providers mapped by compliance tier, service breadth, and procurement fit."
references:
  - title: "OVHcloud — Global Infrastructure"
    url: "https://us.ovhcloud.com/about/global-infrastructure/"
    description: "OVHcloud's official infrastructure footprint page documenting 44+ data centres across multiple continents with the European, North American, Asia-Pacific, and other regional presence."
    domain: "us.ovhcloud.com"
  - title: "OVHcloud SecNumCloud-qualified Hosted Private Cloud"
    url: "https://www.ovhcloud.com/en/enterprise/products/hosted-private-cloud/secnumcloud-qualified/"
    description: "OVHcloud's documentation for the SecNumCloud 3.2-qualified VMware Hosted Private Cloud offering, available in Roubaix, Gravelines, and Strasbourg."
    domain: "ovhcloud.com"
  - title: "Scaleway — About Us"
    url: "https://www.scaleway.com/en/about-us/"
    description: "Scaleway's corporate page documenting its Iliad Group ownership, regional infrastructure across Paris, Amsterdam, Warsaw, and Milan, and its cloud-native product positioning."
    domain: "scaleway.com"
  - title: "IONOS Group — IPO and Listing"
    url: "https://www.ionos-group.com/investor-relations/publications/announcements/final-offer-price-for-ipo-of-ionos-group-se-set-at-eur-1850-per-share.html"
    description: "IONOS Group SE official IPO announcement (Frankfurt Stock Exchange Prime Standard, 8 February 2023) — the regulatory-disclosure event that established IONOS as a publicly-listed European cloud provider."
    domain: "ionos-group.com"
  - title: "Hetzner — Data Centre Locations"
    url: "https://docs.hetzner.com/cloud/general/locations/"
    description: "Hetzner's official documentation for Cloud regions and data centre locations across Germany (Nuremberg, Falkenstein), Finland (Helsinki/Tuusula), with colocation in Singapore and the United States."
    domain: "docs.hetzner.com"
  - title: "STACKIT — Schwarz Digits Sovereign Cloud"
    url: "https://stackit.com/"
    description: "STACKIT's official corporate page, the Schwarz Group / Schwarz Digits sovereign cloud platform serving retail, industrial, public sector, and financial services customers."
    domain: "stackit.com"
  - title: "T-Systems — T Cloud Public (formerly Open Telekom Cloud)"
    url: "https://t-systems.com/us/en/solutions/cloud/solutions/open-telekom-cloud/public-cloud-for-business-customers-391508"
    description: "T-Systems documentation for the T Cloud Public service (rebrand of Open Telekom Cloud), the Deutsche Telekom sovereign cloud platform with BSI C5 attestation."
    domain: "t-systems.com"
  - title: "3DS Outscale — SecNumCloud 3.2 Qualification"
    url: "https://www.3ds.com/newsroom/press-releases/outscale-first-cloud-qualified-secnumcloud-32"
    description: "Dassault Systèmes' press release announcing 3DS Outscale as the first cloud operator qualified under SecNumCloud 3.2 (11 December 2023)."
    domain: "3ds.com"
  - title: "Cegedim.cloud — SecNumCloud 3.2 Qualification Award"
    url: "https://cegedim.cloud/en/news/cegedim-cloud-awarded-secnumcloud-3-2-qualification/"
    description: "Cegedim.cloud's announcement of SecNumCloud 3.2 qualification (visa date 4 December 2024; public announcement 18 December 2024) for the CegNumCloud Secured IaaS offering."
    domain: "cegedim.cloud"
  - title: "ITS Integra — SecNumCloud J1 Milestone (December 2025)"
    url: "https://www.itsintegra.com/actualites/news/validation-j1-secnumcloud/"
    description: "ITS Integra's announcement of J1 milestone validation in December 2025 for ITSecureCloud and ITSecureKube SecNumCloud qualification, targeting full qualification mid-2026."
    domain: "itsintegra.com"
  - title: "Numspot — Alliance Announcement"
    url: "https://www.3ds.com/newsroom/press-releases/docaposte-dassault-systemes-bouygues-telecom-and-banque-des-territoires-sign-alliance-offer-reference-solution-trusted-cloud-services"
    description: "October 2022 joint announcement of the Numspot alliance between Docaposte, Dassault Systèmes, Bouygues Telecom, and Banque des Territoires for a French sovereign cloud built on Outscale infrastructure."
    domain: "3ds.com"
  - title: "Aruba — ACN Qualificazione"
    url: "https://www.acn.gov.it/portale/en/w/ia-57"
    description: "ACN's public catalogue entry for Aruba, listing qualification levels QC1, QC2, and QC3 across various cloud services from the largest Italian hosting and cloud provider."
    domain: "acn.gov.it"
  - title: "CloudFerro — Copernicus Data Space Ecosystem"
    url: "https://cloudferro.com/cases/copernicus-data-space-ecosystem/"
    description: "CloudFerro's role as lead operator of the Copernicus Data Space Ecosystem (CDSE), which superseded the Copernicus DIAS programme in 2023, providing ~100 PB of Earth observation data."
    domain: "cloudferro.com"
  - title: "EU Commission — Sovereign Cloud Framework Selection (April 2026)"
    url: "https://commission.europa.eu/news-and-media/news/commission-advances-cloud-sovereignty-through-strategic-procurement-2026-04-17_en"
    description: "European Commission's April 2026 announcement of the €180M sovereign cloud procurement framework, awarded to four consortia including OVHcloud, STACKIT, Scaleway, and Proximus + S3NS + Clarence + Mistral."
    domain: "commission.europa.eu"
---

The EU has a genuinely competitive cloud provider market that is **not Bleu, not S3NS, and not a hyperscaler EU region**. OVHcloud, Scaleway, Hetzner, IONOS, STACKIT, T Cloud Public, 3DS Outscale, Cegedim.cloud, Aruba, and a substantial tail of specialised providers serve a wide range of European workloads — from cheap commodity compute through public-sector sovereign tiers to industry-vertical platforms. This article maps the EU-native pure-play cloud provider landscape, compares the major players on the dimensions that actually drive procurement, and explains where each fits.

## What "EU-native" means in this article

**EU-native pure-play** = cloud provider that is:

- **Headquartered in the EU/EEA** (or in a closely-EU-aligned jurisdiction like Switzerland, treated separately).
- **Owned by EU/EEA entities** with no US hyperscaler controlling stake.
- **Operating on its own technology stack** (not a distribution of Azure / AWS / Google Cloud under a sovereign envelope).

By this definition:

- **In scope**: OVHcloud, Scaleway, Hetzner, IONOS, STACKIT, T Cloud Public, 3DS Outscale, Cegedim.cloud, Numspot, plusserver, ITS Integra, Aruba, UpCloud, CloudFerro, Clever Cloud, Tietoevry, Leaseweb, and others.
- **Adjacent (not strictly EU member)**: Exoscale (Switzerland-based, A1 Telekom Austria parent) — treated separately.
- **Sovereign JVs with US hyperscaler technology — out of pure-play scope, covered separately**: Bleu (Microsoft Azure + Orange + Capgemini), S3NS (Google Cloud + Thales), Clarence (Google Distributed Cloud Hosted + Proximus + LuxConnect). These are covered in the [Sovereign Cloud Products article](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape) — briefly noted in this article for completeness.

The distinction matters because **EU-native pure-play providers are commercially available to any customer** (commercial, public sector, regulated industries) on the same terms — they are mass-market cloud services. The sovereign JVs (Bleu, S3NS, Clarence) target **government and highly regulated workloads only** and are not generally available as commodity public cloud the way OVHcloud or Scaleway are.

:::warning[Reality Check]
"EU-native" is a property of provider ownership and operations — not an automatic property of sovereignty or compliance. An EU-native provider hosting customer data in an EU region with weak operational controls is more concerning than a hyperscaler EU region with strong controls and customer-controlled keys. The substantive sovereignty question is: who has technical access to plaintext data, what jurisdictions reach the provider's operational personnel, and what compliance certifications independently verify the controls. EU-native is a necessary condition for *some* sovereignty requirements (specifically those requiring EU-domiciled operator entity); it is not sufficient on its own. Combine EU-native provider selection with the [encryption key custody](/knowledge-base/compliance/cloud-encryption-key-custody-byok-hyok) and [framework compliance](/knowledge-base/compliance/cloud-compliance-decision-framework) work — none of the three substitutes for the others.
:::

## The four operational categories

EU-native providers cluster into four operational categories:

| Category | Examples | What they optimise for |
|---|---|---|
| **Full-service alternatives** | OVHcloud, Scaleway, IONOS | Hyperscaler-style breadth (IaaS + PaaS + managed services + global regions) on EU-native stack |
| **Compute & infrastructure-focused** | Hetzner, UpCloud | Aggressive pricing, performance, simple IaaS for developers and cost-sensitive workloads |
| **Specialised vertical / regulated** | 3DS Outscale (defence/industrial), Cegedim.cloud (healthcare), CloudFerro (Earth observation) | Domain-specific compliance, integrated tooling, regulated-sector certifications |
| **Telco / conglomerate-backed sovereign** | T Cloud Public (Deutsche Telekom), STACKIT (Schwarz Group), Aruba (Aruba S.p.A. + Italian PA market) | Sovereign positioning + parent-corporate strategic alignment |

Each category serves different procurement needs. The four-way split is the practical filter before evaluating specific providers.

## Provider snapshot — who they are

| Provider | HQ | Parent / Ownership | Listed? | Founded |
|---|---|---|---|---|
| **OVHcloud** | Roubaix, FR | Klaba family (founder), public float | Euronext Paris (15 Oct 2021) | 1999 |
| **Scaleway** | Paris, FR | Iliad Group | Iliad listed on Euronext Paris | 1999 (as Online.net), Scaleway brand 2015 |
| **IONOS** | Karlsruhe, DE | United Internet (majority) + public float | Frankfurt Prime Standard (8 Feb 2023) | 1988 (as 1&1) |
| **Hetzner** | Gunzenhausen, DE | Privately held (Hetzner family) | No | 1997 |
| **T Cloud Public** (formerly Open Telekom Cloud) | Bonn, DE | Deutsche Telekom (via T-Systems) | Parent DT listed | 2016 |
| **3DS Outscale** | Saint-Cloud, FR | Dassault Systèmes (majority since 2017) | Parent 3DS listed Euronext | 2010 |
| **Cegedim.cloud** | Boulogne-Billancourt, FR | Cegedim Group | Parent Cegedim listed Euronext | IT division of Cegedim Group |
| **STACKIT** | Heilbronn, DE | Schwarz Group (Schwarz Digits) | No (parent private) | Internal cloud 2018-2019; commercial 2021-2022 |
| **plusserver** | Köln, DE | BC Partners exited Nov 2024; new owner not publicly disclosed at time of writing | No | 1999 |
| **Numspot** | Paris, FR | French JV: Docaposte + Dassault Systèmes + Bouygues Telecom + Banque des Territoires | No | Alliance Oct 2022; commercial launch Q1 2025 |
| **ITS Integra** | Lyon, FR | Privately held | No | 1997 |
| **Aruba S.p.A.** | Ponte San Pietro (Bergamo), IT | Privately held | No | 1994 |
| **UpCloud** | Helsinki, FI | Privately held | No | 2012 |
| **CloudFerro** | Warsaw, PL | Privately held | No | 2015 |
| **Clever Cloud** | Nantes, FR | Privately held | No | 2010 |
| **Tietoevry** | Espoo, FI | Public float | Nasdaq Helsinki, Stockholm | 2019 (merger of Tieto + EVRY) |
| **Leaseweb** | Amsterdam, NL | Ocom Group (privately held) | No | 1997 |
| **Exoscale** (adjacent) | Lausanne, CH | A1 Digital (A1 Telekom Austria) | Parent A1 listed Vienna | 2011 |

## Service breadth — what they actually offer

| Provider | IaaS Compute | Object Storage | Managed K8s | Managed DB | PaaS / Serverless | SaaS / Workloads |
|---|---|---|---|---|---|---|
| **OVHcloud** | ✓ Public + Private | ✓ | ✓ (MKS) | ✓ (MySQL, PostgreSQL, MongoDB, Redis, …) | ✓ (Functions, Web) | ✓ (Hosted Exchange, SharePoint) |
| **Scaleway** | ✓ | ✓ | ✓ (Kapsule, Kosmos) | ✓ (Managed DBs) | ✓ (Serverless Functions, Containers, Jobs) | Limited |
| **IONOS** | ✓ (Compute Engine, Cloud Cubes) | ✓ (S3) | ✓ (DataPlatform) | ✓ | Limited | ✓ (Hosting, Productivity Suite) |
| **Hetzner** | ✓ (Cloud + dedicated) | ✓ | ✗ (no managed offering) | ✗ | ✗ | ✗ |
| **T Cloud Public** | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| **3DS Outscale** | ✓ | ✓ | ✓ (OKS) | ✓ | Limited | Specialised (industrial design) |
| **Cegedim.cloud** | ✓ (CegNumCloud) | ✓ | Limited | ✓ | Limited | ✓ (Cegedim healthcare apps) |
| **STACKIT** | ✓ (OpenStack-based) | ✓ | ✓ | ✓ | Growing | Limited |
| **plusserver** | ✓ (pluscloud open + VMware) | ✓ | ✓ | ✓ | Limited | Managed cloud services |
| **Numspot** | ✓ (built on Outscale) | ✓ | ✓ | ✓ | Managed services platform | Sovereign workloads |
| **ITS Integra** | ✓ (ITSecureCloud — Nutanix) | ✓ | ✓ (ITSecureKube) | ✓ | Limited | Managed sovereign cloud |
| **Aruba S.p.A.** | ✓ (Virtual Private Cloud, Cloud Server) | ✓ | ✓ | ✓ | Limited | ✓ (Domains, PEC, digital signatures, hosting) |
| **UpCloud** | ✓ | ✓ | ✓ | ✓ | Limited | Limited |
| **CloudFerro** | ✓ (CREODIAS) | ✓ (EO-data hot) | ✓ | ✓ | EO-specific tooling | ✓ (Copernicus Data Space Ecosystem) |
| **Clever Cloud** | Limited | ✓ | ✓ | ✓ | ✓ (PaaS-first) | Limited |
| **Tietoevry** | ✓ (Tietoevry Tech Services) | ✓ | ✓ | ✓ | Limited | ✓ (industry verticals, public sector) |
| **Leaseweb** | ✓ (dedicated + cloud) | ✓ | Limited | Limited | Limited | ✓ (managed hosting) |
| **Exoscale** (adjacent) | ✓ | ✓ | ✓ (SKS) | ✓ | Limited | Limited |

## Compliance matrix — what they hold

| Provider | ISO 27001 / 17 / 18 | BSI C5 | SecNumCloud | ENS | ACN Qualif. | HDS | KsVC-ready evidence | Notes |
|---|---|---|---|---|---|---|---|---|
| **OVHcloud** | ✓ (broad) | ✓ | ✓ 3.2 — Hosted Private Cloud (VMware) at Roubaix, Gravelines, Strasbourg | ENS-compatible | ✓ | ✓ | Standard evidence package portable to KsVC | Largest qualification footprint |
| **Scaleway** | ✓ 27001:2022 | ✓ | Process initiated 2024-25, **not yet qualified** | ✓ | ✗ | ✓ (since Jul 2024) | Standard package | Kubernetes-native |
| **IONOS** | ✓ 27001 + BSI IT-Grundschutz | ✓ Type 1 (Compute Engine, Cloud Cubes, S3) | ✗ | ✗ | ✗ | ✗ | Standard package | Strong DACH SMB focus |
| **Hetzner** | ✓ 27001:2022 | ✓ Type 2 | ✗ | ✗ | ✗ | ✗ | Standard package | No HIPAA BAA, narrower compliance vs hyperscalers |
| **T Cloud Public** | ✓ | ✓ (annually since 2018) | ✗ | ✗ | ✗ | ✗ | Standard package | DACH large-enterprise focus |
| **3DS Outscale** | ✓ 27001/27017/27018 | ✓ | ✓ 3.2 (first cloud operator qualified, Dec 2023) | ✗ | ✗ | ✓ | Standard package + SecNumCloud | TISAX, CISPE additionally |
| **Cegedim.cloud** | ✓ | ✓ | ✓ 3.2 (CegNumCloud, Dec 2024) | ✗ | ✗ | ✓ (since 2009) | Standard package + SecNumCloud | ISO 20000-1, ISO 50001 additionally |
| **STACKIT** | ✓ | ✓ + ISAE 3000 (SOC 2) + ISAE 3402 | ✗ | ✗ | ✗ | ✗ | Standard package | KRITIS-compliant |
| **plusserver** | ✓ | ✓ (pluscloud open, tested) | ✗ | ✗ | ✗ | ✗ | Standard package | Sovereign Cloud Stack (SCS) participant |
| **Numspot** | Via Outscale base | ✓ | Filed Sep 2024, target qualification pending | ✗ | ✗ | Via Outscale | Standard package | Built on SecNumCloud-qualified Outscale |
| **ITS Integra** | ✓ | ✓ | J0 (Sep 2025) + J1 (Dec 2025); target mid-2026 | ✗ | ✗ | ✓ | Standard package | Two offerings in qualification scope |
| **Aruba S.p.A.** | ✓ | ✗ | ✗ | ✗ | ✓ QC1 + QC2 + QC3 (multiple services) | ✗ | Standard package | Largest ACN-qualified footprint in IT |
| **UpCloud** | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | Standard package | Performance-focused |
| **CloudFerro** | ✓ 27001:2022 + 27017 + 27018 | ✗ | ✗ | ✗ | ✗ | ✗ | ESA SECRET / CONFIDENTIAL authorised | Earth observation specialist |
| **Clever Cloud** | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | Standard package | Part of Post Telecom consortium (EU framework) |
| **Tietoevry** | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | Standard package | First Nordic VMware Sovereign Cloud partner |
| **Leaseweb** | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | Standard package | IPCEI-CIS participant |
| **Exoscale** (adjacent) | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | Standard package | Swiss HQ; Austrian parent (A1 Telekom Austria) |

## Per-provider snapshots

### Tier 1 — Full-service EU-native

**OVHcloud (France)** is the **largest EU-native pure-play cloud infrastructure provider** by revenue (~€1.08B FY2025). SAP and Deutsche Telekom are larger by absolute cloud-related revenue but operate broader portfolios; OVHcloud is the largest dedicated cloud-infrastructure pure-play. Founded 1999 by Octave Klaba in Roubaix, listed on Euronext Paris since October 2021. **44+ data centres globally** as of 2026 with 7 more planned, including Local Zones in Bogota, Tallinn, Johannesburg. The SecNumCloud-qualified offering is **Hosted Private Cloud powered by VMware** at Roubaix, Gravelines, and Strasbourg — not the entire Public Cloud portfolio. Full product portfolio: Public Cloud (IaaS + PaaS), Hosted Private Cloud (VMware), Bare Metal, Web Hosting. The most comprehensive compliance portfolio of any EU-native provider.

**Scaleway (France)** is the **Iliad Group's cloud subsidiary** with strong cloud-native developer experience focus. Regions: Paris (DC2-5), Amsterdam (AMS1-2), Warsaw (WAW1-2); Milan added in 2026, additional Italy/Sweden expansion in progress. ISO 27001:2022, HDS (since July 2024). **SecNumCloud qualification process initiated 2024-2025 but not yet qualified.** Distinctive strengths: Kubernetes-native (Kapsule managed K8s, Kosmos multi-cluster), Serverless Functions/Containers/Jobs, simpler developer-friendly pricing. **Selected April 2026 for EU Commission €180M sovereign cloud framework as one of four awardees.**

**IONOS (Germany)** is the **largest German listed cloud provider** (Frankfurt Prime Standard since 8 February 2023, IPO at €18.50/share, ~€2.6B initial valuation). United Internet remains majority owner. Cloud portfolio includes Compute Engine, Cloud Cubes (block storage), S3 Object Storage. **BSI C5 Type 1** certified for Compute Engine, Cloud Cubes, and S3. ISO 27001 + BSI IT-Grundschutz (first German cloud provider holding both). Strong SMB market position; also addresses public sector via the govdigital framework agreement.

**Hetzner (Germany)** is the **price-leader IaaS provider** in Europe — cloud instances from approximately €3.49/month, generally 50-70% cheaper than hyperscalers for comparable compute. Owned data centres in Nuremberg, Falkenstein (Germany), and Helsinki/Tuusula (Finland); colocation presence in Singapore (2024) and US (Ashburn VA, Hillsboro OR). ISO 27001:2022, BSI C5 Type 2. **No managed Kubernetes, no managed databases, no HIPAA BAA, no SOC 2** — narrower compliance and managed-service portfolio than hyperscalers, by design. Best fit: cost-sensitive workloads, developer / SMB / startup market, dedicated server consumers.

### Tier 2 — Significant EU operators

**T Cloud Public (Germany, formerly Open Telekom Cloud)** is Deutsche Telekom's sovereign cloud platform, rebranded from Open Telekom Cloud. OpenStack-based architecture, historically built on Huawei FusionSphere; current technology relationships are less publicly disclosed than in 2016-2017. Data centres in **Germany and Netherlands** — exclusively European operation. **BSI C5 attestation held annually since 2018.** Large-enterprise customer base in DACH including Shell, Mercedes-Benz, VW, BMW, DHL, Deutsche Bahn, and Swiss Federal Railways.

**3DS Outscale (France)** is the Dassault Systèmes cloud brand — **the first cloud operator qualified under SecNumCloud 3.2** (announced 11 December 2023). HDS, ISO 27001/27017/27018, CISPE, TISAX held. Recent product evolution: OUTSCALE Kubernetes Service (OKS) expanded 10 December 2025. Positioning is sector-agnostic ("trusted business experience as a service across all industries"); parent Dassault Systèmes' strength in aerospace/defence/manufacturing software lends 3DS Outscale a natural fit for those verticals.

**Cegedim.cloud (France)** received **SecNumCloud 3.2 qualification on 4 December 2024** (publicly announced 18 December 2024) for the CegNumCloud Secured IaaS offering. Cegedim Group is France's leading healthcare software publisher; Cegedim.cloud is HDS-certified since 2009. Holds ISO/IEC 27001, ISO/IEC 20000-1, ISO 50001 additionally. Four French data centres across two regional campuses. Healthcare and regulated industries focus.

**STACKIT (Germany)** is the **Schwarz Group sovereign cloud platform** (Schwarz Digits division — parent of Lidl and Kaufland). Established internally 2018-2019; externally available 2021-2022; commercial public cloud from May 2022. **BSI C5, ISAE 3000 (SOC 2), ISAE 3402** certifications obtained 2024. KRITIS-compliant. Three Availability Zones near Heilbronn (Germany) plus Austrian data centres. At "TECH Conference 2025" Schwarz Digits announced explicit positioning shift — expansion into a "German hyperscaler." **Selected April 2026 for EU Commission €180M sovereign cloud framework.**

**plusserver (Germany)** operates **pluscloud open** (OpenStack-based, built on Sovereign Cloud Stack/SCS) and VMware-based managed services. BSI C5 tested. Registered office in Köln (Cologne) with operations across multiple German locations. **BC Partners exited November 2024**; new owner is not publicly disclosed at time of writing — confirm directly with plusserver corporate communications before any specific procurement reliance.

**Numspot (France)** is a French sovereign cloud JV with **all four shareholders French-domiciled and French/EU-controlled**: Docaposte (La Poste Group), Dassault Systèmes, Bouygues Telecom, Banque des Territoires (Caisse des Dépôts). Alliance announced October 2022; commercial managed services platform launched Q1 2025. **Built on 3DS Outscale's SecNumCloud-qualified IaaS** — meaning Numspot leverages an already-EU-native, already-SecNumCloud-qualified foundation rather than a US hyperscaler stack. Unlike Bleu (Microsoft) and S3NS (Google), **Numspot is fully EU-native**. SecNumCloud qualification filed September 2024 for Numspot's own offering, target early 2026 (status unconfirmed at time of writing). Early customers: CNP Assurances, Ministry of Armed Forces, Île-de-France Region.

**ITS Integra (France)** — privately held, headquartered in Lyon, established 1997. Two offerings in SecNumCloud qualification scope: **ITSecureCloud** (Nutanix-based IaaS) and **ITSecureKube** (Kubernetes PaaS). **J0 milestone September 2025; J1 milestone December 2025** (evaluation strategy validation); next phase is in-depth audit. Target full SecNumCloud qualification: mid-2026.

**Aruba S.p.A. (Italy)** is the **largest Italian hosting and cloud provider** (manages 2.7M+ domains, ~9.8M email accounts, ~9M PEC accounts, ~16M users across Europe). Four Italian data centres (IT1-IT4) plus presence in Czech Republic, UK, France, Germany, Poland. Holds **ACN Qualificazione across QC1, QC2, and QC3 tiers** across different services: Virtual Private Cloud and Hosted Private Cloud at **QC3**; Red Hat Open Hybrid Cloud at **QC2**; Object Storage, Cloud Pro/Server, Unified Storage, DBaaS, Cloud Backup, Cloud Monitoring, Managed Kubernetes at **QC1**. Adjacent products: PEC (certified email), digital signatures — operating across the broader Italian digital-trust services market.

### Tier 3 — Specialised / smaller

**UpCloud (Finland)** — Helsinki-based, performance-focused IaaS. **14-15 data centre locations worldwide** including 10 in Europe: Finland (HEL1, HEL2), Sweden, Denmark (Copenhagen, launched December 2025), Netherlands, Spain, Poland, UK, Norway (launched January 2026), Germany. ISO 27001 certified. Niche: developers and workloads where IaaS performance matters more than full PaaS portfolio.

**CloudFerro (Poland)** — Warsaw-based, founded 2015. **Lead operator of the Copernicus Data Space Ecosystem (CDSE)** — the European Earth observation data platform that superseded the Copernicus DIAS programme in 2023. ~100 PB of EO data made publicly accessible. ISO/IEC 27001:2022 / 27017 / 27018. **Authorised to handle ESA SECRET and ESA CONFIDENTIAL** classified information. New cloud region in Łódź announced March 2026 with €75M expansion. Niche: Earth observation, scientific computing, HPC, EU space programme adjacent workloads.

**Clever Cloud (France)** — Nantes-based, founded 2010, French PaaS specialist. HDS-certified. **Partnered with Post Telecom in the Post Telecom + Clever Cloud + OVHcloud consortium awarded the EU Commission €180M sovereign cloud framework in April 2026.** Smaller scale but increasingly visible; PaaS-first focus distinguishes it from other EU-native providers.

**Tietoevry (Finland)** — Espoo-headquartered, listed on Nasdaq Helsinki and Stockholm, formed in 2019 from the Tieto + EVRY merger. Nordic IT services with sovereign cloud designation; **first Nordic VMware Sovereign Cloud partner**. Strong public-sector and Nordic enterprise customer base.

**Leaseweb (Netherlands)** — Amsterdam-based, Ocom Group owned. **IPCEI-CIS (Important Project of Common European Interest) participant**. Combination of dedicated servers, cloud, and managed hosting. Significant Dutch and European customer base in the developer/mid-market segment.

### EU-adjacent (Swiss HQ, Austrian parent)

**Exoscale (Switzerland)** — Lausanne-based, founded 2011, **owned by A1 Digital, subsidiary of A1 Telekom Austria Group** since 2018. Cloud zones in Vienna (Austria), Switzerland, and elsewhere. Strictly speaking, Switzerland is not an EU member state — Exoscale's Swiss HQ places it outside the EU. The Austrian parent provides EU-domiciled ownership and EU operational presence; this makes Exoscale **EU-adjacent / EEA-aligned** rather than strictly EU-native. For Slovak procurement consuming Exoscale services, treat the Swiss-jurisdiction aspect explicitly under the [Switzerland article's framework](/knowledge-base/compliance/switzerland-finma-cloud-frameworks) where applicable.

## Sovereign JVs with US hyperscaler technology — out of scope, briefly

For completeness, three "trusted cloud JVs" are EU-domiciled but built on US hyperscaler technology under sovereign envelope. These are **NOT mass-market commercial cloud services** like the providers above — they target government and highly regulated workloads through structured procurement:

- **Bleu (France)** — Orange + Capgemini JV distributing Microsoft Azure technology. SecNumCloud J0 passed; full qualification target H1 2026.
- **S3NS (France)** — Thales + Google Cloud JV. **SecNumCloud 3.2 qualified December 2025** (PREMI3NS offering, ~30 services in scope).
- **Clarence (Belgium / Luxembourg)** — Proximus NXT + LuxConnect distributing Google Distributed Cloud Hosted (air-gapped). Selected April 2026 as part of the EU Commission €180M sovereign cloud framework.

These three are covered in detail in the [Sovereign Cloud Products article](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape). They serve a different procurement context than the EU-native pure-play providers above — they exist specifically to bridge hyperscaler technology into French/EU sovereign procurement frameworks.

## April 2026 — EU Commission €180M sovereign cloud framework

A material industrial-policy event in the EU-native cloud market: in **April 2026 the European Commission selected four consortia** for a **€180M sovereign cloud procurement framework**:

1. **Post Telecom + Clever Cloud + OVHcloud** (Luxembourg-led)
2. **STACKIT** (Schwarz Digits)
3. **Scaleway** (France)
4. **Proximus + S3NS + Clarence + Mistral** (Belgium-led)

The framework is significant for two reasons:

- **Validation of EU-native pure-play providers** — three of four awarded consortia are led by or include pure-play EU-native providers (Clever Cloud, OVHcloud, STACKIT, Scaleway). The fourth includes Clarence + S3NS (US-hyperscaler-tech JVs) alongside Mistral (French AI) under Proximus leadership.
- **Industrial-policy direction** — the Commission is putting procurement money behind EU-native infrastructure rather than only hyperscaler EU regions, signalling a stronger sovereign-cloud demand pull from the EU institutional level over the medium term.

Worth tracking as a leading indicator on whether EU-native providers gain durable institutional adoption beyond commercial markets.

## Selection criteria — when each provider fits

Mapping common use cases to suitable EU-native providers:

| Use case | Suitable providers | Why |
|---|---|---|
| **French OIV/OSE sensitive workloads (SecNumCloud-mandated)** | 3DS Outscale, Cegedim.cloud, OVHcloud (Hosted Private Cloud), Numspot (when qualified) | SecNumCloud 3.2 qualified |
| **German federal procurement (BSI C5)** | T Cloud Public, IONOS, Hetzner, STACKIT, OVHcloud, plusserver | BSI C5 attestation |
| **Italian PA procurement (ACN-qualified)** | Aruba (QC1-QC3), plus hyperscalers via JV | ACN Qualificazione |
| **Healthcare data (HDS-certified)** | Cegedim.cloud, 3DS Outscale, Scaleway, OVHcloud, Clever Cloud | HDS certification |
| **Slovak public sector via KsVC (U2)** | OVHcloud, IONOS, Hetzner, STACKIT, Scaleway, T Cloud Public, Aruba, UpCloud | ISO 27001/27017/27018 evidence portable to KsVC |
| **Slovak public sector via KsVC (U3)** | OVHcloud (Hosted Private Cloud SecNumCloud), 3DS Outscale, Cegedim.cloud | SecNumCloud-qualified — Slovak Cybersecurity Auditor evidence-mapping streamlines U3 audit |
| **Cost-sensitive commodity compute** | Hetzner, UpCloud, Scaleway | Aggressive pricing |
| **Kubernetes-native development** | Scaleway, Clever Cloud, 3DS Outscale (OKS), STACKIT | Strong K8s product focus |
| **Earth observation / HPC** | CloudFerro | Domain specialisation, ESA-data integration |
| **Nordic enterprise / public sector** | Tietoevry, UpCloud | Nordic operations + sovereign cloud designation |
| **Italian commercial hosting + cloud combined** | Aruba S.p.A. | Largest Italian footprint across services |

The table is a starting point. Actual procurement decisions also factor pricing, regional latency, customer support quality, multi-region SLA, and specific technical features that this article does not enumerate.

:::tip[Architectural Pro Tip]
For most organisations choosing an EU-native provider, the practical decision sequence is: **(1) identify the compliance bar** (SecNumCloud-mandated, ACN QC3+, BSI C5, KsVC U-tier, HDS, etc.) — this narrows the candidate list immediately; **(2) identify the service breadth required** (do you need managed Kubernetes? managed databases? PaaS? — Hetzner/UpCloud cover narrow IaaS; OVHcloud/Scaleway/STACKIT cover broad portfolios); **(3) check regional latency requirements** — most EU-native providers have 2-5 European regions, fewer than hyperscalers; **(4) check cost positioning** — EU-native pricing varies widely from Hetzner's aggressive pricing to OVHcloud/STACKIT's hyperscaler-comparable pricing. Working through these four filters in order — compliance → breadth → regions → cost — produces a shortlist of 2-4 providers without exhaustive product-by-product comparison.
:::

## Multicloud factor — using EU-native alongside hyperscaler

For organisations operating multicloud (hyperscaler EU regions + EU-native), the operational pattern that works:

- **Hyperscaler EU mainline** — workloads with hyperscaler-feature-dependent architectures (specific managed services, ML/AI platforms, large-scale managed databases, specific data warehouse products).
- **EU-native** — workloads with sovereignty-relevant compliance requirements, cost-sensitive infrastructure, regulatory-sector workloads, predictable pricing horizons.

The architectural patterns:

- **Active workload split** — production runs on EU-native (e.g., OVHcloud Hosted Private Cloud + SecNumCloud) for compliance; non-sensitive analytics or development runs on hyperscaler EU.
- **DR and exit strategy** — EU-native provider as the documented exit alternative for hyperscaler-hosted workloads, addressing [DORA Article 30](/knowledge-base/compliance/dora-article-30-contracts-and-exit-strategies) exit-strategy obligations.
- **Multi-EU-native** — using two EU-native providers for resilience (e.g., OVHcloud + Scaleway) where multicloud concentration risk under [DORA](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay) and [NIS2](/knowledge-base/compliance/nis2-supply-chain-cloud-providers) supply-chain rules drives diversification.

The [BYOK/HYOK article](/knowledge-base/compliance/cloud-encryption-key-custody-byok-hyok) is the practical companion: even on hyperscaler EU mainline, customer-controlled keys with an EU-native HSM (or EU-resident HSM-aaS) provide significant additional sovereignty without going fully to EU-native infrastructure.

:::tip[Slovak context]
For Slovak public-sector procurement via [KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud), EU-native providers offer a practical alternative to hyperscaler EU regions across U1-U3 tiers. **OVHcloud** (broadest qualification footprint), **Scaleway** (cloud-native DX), **IONOS** (DACH-aligned SMB-friendly), and **Hetzner** (cost-leader) are the most realistic candidates for U1-U2 listings. For **U3**, the SecNumCloud-qualified offerings — **OVHcloud Hosted Private Cloud (VMware)**, **3DS Outscale**, **Cegedim.cloud** — reduce the Slovak Cybersecurity Auditor's evidence-mapping work because the SecNumCloud audit produces evidence that translates well to Slovak `zákon 69/2018` audit conformity. **U4** remains the private government cloud segment — not a commercial EU-native procurement question. Slovak commercial entities serving NBS-supervised banks or other regulated customers face similar logic: EU-native providers at the appropriate compliance tier reduce both the sovereignty and the supply-chain-evidence work compared with hyperscaler EU mainline alternatives.
:::

## Closing checklist

- **EU-native pure-play** = EU/EEA-headquartered, EU-controlled ownership, EU-native technology stack. Distinct from hyperscaler EU regions (different ownership) and from sovereign JVs with US hyperscaler technology (Bleu, S3NS, Clarence — different scope and procurement context).
- **Four operational categories**: Full-service alternatives (OVHcloud, Scaleway, IONOS) / Compute-focused (Hetzner, UpCloud) / Specialised vertical (3DS Outscale, Cegedim.cloud, CloudFerro) / Telco-conglomerate-backed (T Cloud Public, STACKIT, Aruba).
- **Largest pure-play**: OVHcloud (~€1.08B FY2025 revenue, 44+ data centres, Euronext-listed). SAP and Deutsche Telekom are larger by absolute cloud-related revenue but operate broader portfolios.
- **Open Telekom Cloud rebranded to T Cloud Public** as of 2025-2026. Update terminology in older references.
- **SecNumCloud-qualified pure-play providers**: 3DS Outscale (Dec 2023, first qualified), Cegedim.cloud (Dec 2024), OVHcloud Hosted Private Cloud (VMware, multi-DC). ITS Integra (J1 Dec 2025, target mid-2026), Scaleway (in process), Numspot (filed Sep 2024).
- **OVHcloud SecNumCloud scope is limited**: only the Hosted Private Cloud (VMware) at Roubaix, Gravelines, and Strasbourg is qualified — not the full OVHcloud Public Cloud portfolio.
- **ACN-qualified largest footprint**: Aruba S.p.A. holds QC1, QC2, and QC3 across various services in Italy.
- **Earth observation specialist**: CloudFerro operates the Copernicus Data Space Ecosystem (CDSE) — the European EO data platform that superseded the Copernicus DIAS programme in 2023.
- **April 2026 EU Commission €180M sovereign cloud framework** validates OVHcloud + Clever Cloud + Post Telecom, STACKIT, Scaleway, and the Proximus + S3NS + Clarence + Mistral consortia — industrial-policy validation event worth tracking.
- **plusserver ownership**: BC Partners exited November 2024; new owner not publicly disclosed at time of writing — verify directly with plusserver before procurement reliance.
- **Exoscale is EU-adjacent, not strictly EU-native**: Swiss HQ + Austrian parent (A1 Telekom Austria). For procurement under Swiss-jurisdictional rules see the [Switzerland article](/knowledge-base/compliance/switzerland-finma-cloud-frameworks).
- **Selection sequence**: compliance bar → service breadth → regional latency → cost positioning. Apply in this order.
- **EU-native is necessary but not sufficient** for sovereignty. Combine provider selection with encryption key custody (BYOK/HYOK) and framework compliance work.
- **What to read next:** [Sovereign Cloud Products](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape) for the JV-with-US-hyperscaler category (Bleu, S3NS, Clarence) and the broader sovereign cloud product framing; [BYOK/HYOK](/knowledge-base/compliance/cloud-encryption-key-custody-byok-hyok) for the encryption patterns that complement EU-native infrastructure; [Decision Framework](/knowledge-base/compliance/cloud-compliance-decision-framework) to apply the selection logic to a specific organisation; [France SecNumCloud](/knowledge-base/compliance/france-anssi-secnumcloud-qualification) for the qualification framework that several providers above hold; [Italy ACN](/knowledge-base/compliance/italy-acn-cloud-qualification) for the QC1-QC4 framework Aruba and others operate under; [Slovakia KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) for Slovak public-sector procurement mapping.
