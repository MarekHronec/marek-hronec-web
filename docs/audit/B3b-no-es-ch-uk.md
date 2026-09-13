# Batch B3b — Norway, Spain, Switzerland, UK

Reviewer: Sonnet (research agent), reported 2026-09-12. **Reviewer did not edit any file.**
Verification of each finding by Opus before application is recorded at the bottom of this
file: **18 of 18 externally checkable findings confirmed, none hallucinated.** The raw
reviewer report follows verbatim; the verification table is after it.

---

I did not edit any file. Full audit below; all four articles reached.

## Chapter: findings

---

# WRONG — fetched source contradicts

### 1. Spain — "Real Decreto-ley 7/2025" is not a NIS2 transposition, and the cited BOE reference is a currency table

**File:** `src/content/knowledge-base/compliance/spain-ens-national-security-framework.md`
**Lines:** 31–34 (reference block), 64, and consequentially 67, 159

> L31–32: `title: "Real Decreto-ley 7/2025 — Partial NIS2 Transposition"` / `url: "https://www.boe.es/buscar/act.php?id=BOE-A-2025-7187"`
> L64: "**Real Decreto-ley 7/2025** — **partial NIS2 transposition, in force**. Provides immediately enforceable obligations while the comprehensive coordination law is still in parliamentary process."

Two separate errors:

- **BOE-A-2025-7187** (fetched `https://www.boe.es/buscar/act.php?id=BOE-A-2025-7187`) is a **Banco de España resolution of 8 April 2025 publishing ECB euro reference exchange rates**, BOE no. 86 of 9 April 2025. It has no cybersecurity content whatsoever.
- **Real Decreto-ley 7/2025, de 24 de junio** is "por el que se aprueban **medidas urgentes para el refuerzo del sistema eléctrico**" (BOE-A-2025-12857) — emergency electricity-system measures after the April 2025 blackout. It was **repealed by the Congreso de los Diputados on 22 July 2025** (BOE-A-2025-15313, "Acuerdo de derogación del Real Decreto-ley 7/2025").

So Spain has **no partial NIS2 transposition in force**. The whole "dual-track NIS2 regime" framing at L67 ("RDL 7/2025 obligations are enforceable today") is unfounded, and L159's "NIS2-scope subjects under RDL 12/2018 — administrative sanctions per the NIS2 transposition" compounds it (RDL 12/2018 is the **NIS1** transposition).

**Suggested replacement:** Delete the RDL 7/2025 reference entry and L64. Replace L64–67 with: Spain has **not** notified any NIS2 transposition. NIS1 obligations continue under RDL 12/2018 and RD 43/2021; the *Anteproyecto de Ley de Coordinación y Gobernanza de la Ciberseguridad* (Council of Ministers, 14 January 2025) remains unadopted.

**This propagates to two out-of-scope articles:**
- `cloud-data-security-eu-national-frameworks-overview.md:120` — "| Spain | RDL 7/2025 (partial) + Anteproyecto pending | Partial in force; full law in parliament |"
- `nis2-supply-chain-cloud-providers.md:139` — "Partial transposition via RDL 7/2025; coordination law pending"

---

### 2. Spain — Annex II has **73** measures, not 74

**File:** same. **Lines:** 21 (reference description), 53, 97, 101, 197

> L101: "The control set is in **Annex II of RD 311/2022**: **74 security measures** (reduced from 75 in the previous version)"

I counted the measure codes directly from the BOE official XML of RD 311/2022 (`https://www.boe.es/diario_boe/xml.php?id=BOE-A-2022-7191`), Anexo II section only, deduplicated:

**73 total — org: 4, op: 33, mp: 36.** (`org.1`–`org.4`; `op.pl.1–5`, `op.acc.1–6`, `op.exp.1–10`, `op.ext.1–4`, `op.nub.1`, `op.cont.1–4`, `op.mon.1–3`; `mp.if.1–7`, `mp.per.1–4`, `mp.eq.1–4`, `mp.com.1–4`, `mp.si.1–5`, `mp.sw.1–2`, `mp.info.1–6`, `mp.s.1–4`.)

This matches the breakdown published by Spanish practitioners (4 + 33 + 36 = 73). Fix all five occurrences.

The parenthetical "(reduced from 75 in the previous version)" is **UNVERIFIED** — the same count run over the original RD 3/2010 text gave 76 codes, and I could not parse the consolidated (post-RD 951/2015) version. Safest fix: drop the parenthetical rather than substitute another number.

---

### 3. Spain — the private-sector hook is **artículo 2.3**, not the Disposición Adicional Tercera

**File:** same. **Lines:** 74, 77 (and the related description at L25)

> L74: "**Private-sector entities providing technological services to the public administration** — under the Disposición Adicional Tercera of RD 311/2022."
> L77: "The Disposición Adicional Tercera mechanism is what makes ENS operationally relevant for commercial cloud providers."

Fetched `https://www.boe.es/diario_boe/txt.php?id=BOE-A-2022-7191`. The **Disposición adicional tercera** of RD 311/2022 is headed **"Respeto del principio de «no causar un perjuicio significativo» al medioambiente"** — the DNSH principle for Recovery and Resilience Plan activities under Regulation (EU) 2021/241. Nothing to do with scope.

The actual hook is **artículo 2, paragraph 3**:

> "Este real decreto también se aplica a los sistemas de información de las entidades del sector privado, incluida la obligación de contar con la política de seguridad a que se refiere el artículo 12, cuando, de acuerdo con la normativa aplicable y en virtud de una relación contractual, presten servicios o provean soluciones a las entidades del sector público para el ejercicio por estas de sus competencias y potestades administrativas."

**Suggested replacement:** "under **artículo 2.3** of RD 311/2022" (both places). The load-bearing point — that this is what brings CSPs in scope — survives intact; only the citation is wrong.

Also note the same fetch showed RD 311/2022 has been **amended once**, by **Real Decreto 1125/2024 de 5 de noviembre** (modifying the disposición adicional segunda) — worth reflecting in L49's "currently regulated by".

---

### 4. UK — the EU adequacy decision described is no longer the operative one

**File:** `src/content/knowledge-base/compliance/united-kingdom-ncsc-cloud-security-principles.md`
**Lines:** 97, 167 (and by implication 121, 127)

> L97: "the EU Commission adopted an **adequacy decision** for the UK in June 2021 … The decision is reviewed periodically; **as of mid-2026 it remains in force**."
> L167: "EU adequacy decision (June 2021) makes EU↔UK data flow straightforward."

Fetched `https://eucrim.eu/news/commission-renewed-adequacy-decisions-for-data-transfers-to-the-uk/`: the 2021 decisions **"would have expired on 27 June 2025"**, were given an interim extension in June 2025, and **on 19 December 2025 the Commission adopted two new adequacy decisions** (one under GDPR Art. 45, one under Directive 2016/680 Art. 36), subject to a sunset clause expiring **27 December 2031**.

The outcome the article asserts (flows continue freely) is right; the instrument is wrong and the "reviewed periodically / remains in force" framing misses that the 2021 decisions lapsed and were replaced.

**Suggested replacement:** "The Commission adopted UK adequacy decisions in June 2021; those lapsed after an interim extension and were **replaced on 19 December 2025** by two renewed decisions (GDPR and Law Enforcement Directive), valid until **27 December 2031** under a sunset clause."

---

### 5. UK — a UK data-protection reform Act *did* complete Parliament

**File:** same. **Line:** 150

> "The 'Data Protection and Digital Information (DPDI) Bill' went through multiple iterations in 2023-2024 but was **abandoned before the 2024 general election** without being enacted. **As of mid-2026 no replacement reform Bill has completed Parliament.**"

The first sentence is correct. The second is wrong: the **Data (Use and Access) Act 2025** is on the statute book as **2025 c. 18** (fetched `https://www.legislation.gov.uk/ukpga/2025/18/contents`), Royal Assent **19 June 2025**. It is precisely the successor reform vehicle, and the Commission's December 2025 adequacy renewal was explicitly held back pending assessment of it (same eucrim source).

**Suggested replacement:** "…abandoned before the 2024 general election. Its successor, the **Data (Use and Access) Act 2025** (2025 c. 18, Royal Assent 19 June 2025), was enacted instead; the Commission assessed it before renewing UK adequacy on 19 December 2025."

---

### 6. UK — SS2/21 is a **PRA** statement, the policy statement is **PS7/21**, and it does not apply to solo-regulated firms

**File:** same. **Line:** 105

> "**FCA SS2/21 and PS7/22** — 'Outsourcing and Third-Party Risk Management' (SS2/21, effective March 2022) and the associated Policy Statement PS7/22 are the current **FCA** outsourcing rules for **solo-regulated firms**."

Fetched `https://www.bankofengland.co.uk/prudential-regulation/publication/2021/march/outsourcing-and-third-party-risk-management-ss`:

- Publisher: **the Prudential Regulation Authority**, not the FCA.
- Accompanying policy statement: **PS7/21**, not PS7/22.
- Scope: "all UK banks, building societies, and PRA-designated investment firms; insurance and reinsurance firms and groups in scope of Solvency II, including the Society of Lloyd's and managing agents; and UK branches of overseas banks and insurers" — i.e. **PRA-regulated (dual-regulated) firms**, the opposite of FCA solo-regulated.
- Also stale: the article's "effective March 2022" is the original; the **current version is dated November 2024 and is "Effective from 31 December 2024."**

The trailing claim that FG16/5 "was superseded by this framework" is **UNVERIFIED** — I found no source either way; a PRA statement could not supersede FCA guidance in any case.

**Suggested replacement:** "**PRA SS2/21 / PS7/21** — 'Outsourcing and third party risk management', published 29 March 2021, current version November 2024 effective 31 December 2024, applying to PRA-regulated banks, building societies, PRA-designated investment firms and Solvency II insurers. FCA solo-regulated firms remain under FG16/5 and SYSC."

---

### 7. UK — the CTP regime has made its first designations; the article describes it as powers-only

**File:** same. **Lines:** 106, 151, 168, 172

> L106: "the **Critical Third-Party (CTP) regime** **giving** the BoE, FCA, and PRA **designation powers** analogous to the EU's CTPP regime under DORA."
> L151: "the UK's CTP regime for financial-sector cloud **may diverge** from DORA in implementation detail"

Fetched `https://www.bankofengland.co.uk/news/2026/july/uk-financial-regulators-to-begin-overseeing-critical-third-parties-announced-by-hmt` (published **10 July 2026**): HM Treasury has designated **"Amazon Web Services EMEA SARL, Google Cloud EMEA Limited, Microsoft Ireland Operations Ltd, and Oracle Corporation UK Limited"**, with regulator oversight beginning **Monday 13 July 2026**.

This is the same failure mode as the known-propagating error #2, transposed to the UK: it reads as though no designation has happened. Given the article's audience, four named hyperscalers under live FCA/PRA/BoE oversight is the single most consequential UK fact missing.

**Suggested replacement:** "HM Treasury made the **first CTP designations on 10 July 2026**, effective **13 July 2026**: AWS EMEA SARL, Google Cloud EMEA Ltd, Microsoft Ireland Operations Ltd and Oracle Corporation UK Ltd. They are now subject to the operational-resilience rules in the PRA/BoE rulebooks and the FCA Handbook."

Also update `dora-for-cloud-financial-sector-overlay.md:206` ("UK has its own CTP regime").

---

### 8. Norway — "NIS-loven from 2018" does not exist; the act is *digitalsikkerhetsloven*, in force 1 October 2025

**File:** `src/content/knowledge-base/compliance/norway-nsm-cloud-frameworks.md`
**Lines:** 63, 75, 149, 157, 213

> L157: "Norway's existing **NIS-loven from 2018** provides interim coverage but is narrower than NIS2 scope."

Fetched `https://lovdata.no/dokument/NL/lov/2023-12-20-108`: the act is **"Lov om digital sikkerhet (digitalsikkerhetsloven)"**, sanctioned **20 December 2023**, entered into force **1 October 2025**, implementing **Directive (EU) 2016/1148** via EEA Agreement Annex XI no. 5cpa.

So Norway had **no** NIS1 implementation in force in 2018 — or at any point before October 2025. Both the name and the date are wrong, in five places.

**Suggested replacement:** "**Digitalsikkerhetsloven** (LOV-2023-12-20-108), sanctioned 20 December 2023 and **in force since 1 October 2025**, implements NIS1 (Directive (EU) 2016/1148) via EEA incorporation."

---

### 9. Norway — DORA is not "pending"; it has been in force since 1 July 2025

**File:** same. **Lines:** 37, 43, 159–163, 193, 198, 218, 222

> L37: "DORA (incorporation pending)"
> L43: "DORA incorporation in progress"
> L161: "DORA **is being incorporated** through the EEA Joint Committee process. Norwegian financial entities **will be** subject to DORA obligations…"
> L163: "**once DORA is fully incorporated**, the ESA-led CTPP designation process becomes available"

Fetched `https://www.finanstilsynet.no/tema/dora/forordning-om-digital-operasjonell-motstandsdyktighet-i-finanssektoren-dora/`: **"Forordningen ble tatt inn i EØS-avtalen 20. februar"**, and both the DORA-lov and DORA-forskrift took effect **"1. juli 2025."**

Confirmed against Lovdata primary (`https://lovdata.no/dokument/SF/forskrift/2025-06-24-1296`): **Forskrift om digital operasjonell motstandsdyktighet i finanssektoren (DORA-forskriften)**, FOR-2025-06-24-1296, in force **1 July 2025**, made under **lov 27. mai 2025 nr. 18 om digital operasjonell motstandsdyktighet i finanssektoren (DORA-loven)**. Finanstilsynet further amended the forskrift on 26 January 2026 to incorporate four level-2 RTS, and Norwegian entities filed their registers of information by 13 March 2026.

This was already wrong on the article's own stated update date of 2026-05-15 — DORA had been live in Norway for ten months.

**Suggested replacement for the Pro Tip at L198:** the "once DORA is fully incorporated, the CTPP-designation process becomes available" conditional should become present tense — Norwegian financial entities are under DORA today, and the ESA-led CTPP designations (first 19 on 18 November 2025) already reach their providers.

**Propagates to:** `dora-for-cloud-financial-sector-overlay.md:175` ("Norway as an EEA state **is incorporating** DORA through the EEA Joint Committee process") and `:206` ("Norway is incorporating DORA via EEA").

---

### 10. Norway — no AWS Norway region is announced

**File:** same. **Line:** 210

> "Hyperscalers operate Norwegian regions (Microsoft Azure Norway East/West, **AWS planned**)"

Fetched `https://aws.amazon.com/about-aws/global-infrastructure/regions_az/`: "The AWS Cloud spans 124 Availability Zones within 39 Geographic Regions, **with announced plans for 7 more Availability Zones and 2 more AWS Regions in the Kingdom of Saudi Arabia, and Chile.**" No Norway. Oslo appears in AWS's list only as an **edge cache** location, not a Region. The regional services table likewise shows no Norwegian region (`eu-north-1` is Stockholm).

Azure Norway East/West is correct. The Google Cloud statement I could not verify (see UNVERIFIED below).

**Suggested replacement:** drop "AWS planned", or state that AWS serves Norwegian residency needs from `eu-north-1` (Stockholm) with no announced Norwegian region.

---

### 11. Switzerland — FINMA 2018/3 does **not** cover asset managers or financial market infrastructures

**File:** `src/content/knowledge-base/compliance/switzerland-finma-cloud-frameworks.md`
**Line:** 68

> "**FINMA Circular 2018/3** — applies to FINMA-supervised entities: banks, insurers, securities dealers, **asset managers**, fund management companies, **financial market infrastructures (FMIs)**."

I downloaded FINMA's own current circular PDF (`https://www.finma.ch/de/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2018-03-01012021_de.pdf`) and extracted the addressee table on page 1 by coordinate, mapping each "X" to its column label. The subtitle alone already narrows it:

> "Auslagerungen **Banken, Versicherungsunternehmen und ausgewählten Finanzinstituten nach FINIG**"

Marked addressees: **Banken, Versicherer, Verwalter von Kollektivvermögen, Fondsleitungen, Kontoführende Wertpapierhäuser, Nicht kontoführende Wertpapierhäuser, SICAV.**

**Not marked:** *Vermögensverwalter* (asset managers), Trustees, *Handelsplätze* (trading venues), *Zentrale Gegenparteien* (CCPs), *Zentralverwahrer* (CSDs), *Transaktionsregister*, *Zahlungssysteme*, Depotbanken.

So both "asset managers" and "financial market infrastructures (FMIs)" are wrong. ("Securities dealers" is fine — *Wertpapierhäuser* are the post-FinIA successor.)

Separately confirmed from the same PDF header: the circular **remains in force**, "Erlass: 21. September 2017 / Inkraftsetzung: 1. April 2018 / Letzte Änderung: 4. November 2020" (version effective 1 January 2021). No successor circular found.

---

### 12. Switzerland — the DPO claim is inverted

**File:** same. **Line:** 113

> "**No data protection officer requirement** at federal level (unlike GDPR Article 37 mandatory DPO for certain processing)."

Fetched the official English text of the FADP (`https://www.fedlex.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2022/491/20230901/en/html/...`):

> **Art. 10 Data protection officer** — "1 **Private controllers may appoint** a data protection officer. … 4 **The Federal Council shall regulate the appointment of data protection officers by federal bodies.**"

And the implementing Data Protection Ordinance (SR 235.11, `https://www.fedlex.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2022/568/20230901/en/html/...`), Chapter 5, Section 1:

> **Art. 25 Appointment** — "**Every federal body shall appoint a data protection officer.** Two or more federal authorities may appoint a joint data protection officer."

The article has it exactly backwards: the DPO is **voluntary for private controllers** and **mandatory for federal bodies**.

**Suggested replacement:** "**DPO appointment is voluntary for private controllers** (FADP Art. 10(1)) — unlike GDPR Art. 37 — though appointing one unlocks the Art. 23(4) DPIA exception. **Federal bodies must appoint one** (Data Protection Ordinance Art. 25)."

---

# STALE

### 13. Spain — the named ministry no longer exists

**File:** Spain article, **line 51**

> "Implementation policy sits at the **Ministerio de Asuntos Económicos y Transformación Digital**."

That ministry was split in the November 2023 reshuffle into the *Ministerio de Economía, Comercio y Empresa* and the **Ministerio para la Transformación Digital y de la Función Pública** (confirmed via `transparencia.gob.es` and INAP's note on its *estructura orgánica básica*). ENS technical security instructions are now approved by the Minister for Digital Transformation and the Civil Service on CCN's initiative; cybersecurity sits with the Secretaría de Estado de Telecomunicaciones e Infraestructuras Digitales (which added "y Seguridad Digital" to its name in the 2026 reorganisation).

---

### 14. UK — NHS Digital was dissolved; the DSPT is now also CAF-aligned

**File:** UK article, **lines 43, 108, 169**

> L108: "**NHS Digital's** Data Security and Protection (DSP) Toolkit — a self-assessment tool aligned with **the 10 National Data Guardian standards**."

Fetched `https://standards.nhs.uk/published-standards/data-security-and-protection-toolkit`: the DSPT is owned and published by **NHS England**; current version **8.0.0, released 12 August 2025**; and it is aligned to **"the 10 data security standards set by the National Data Guardian *and* the National Cyber Security Centre Cyber Assessment Framework."** Version 8 introduced the CAF route for independent providers designated as NIS operators of essential services and for genomics organisations.

NHS Digital ceased to exist as a separate statutory body when it merged into NHS England (2023). Note also that NHS England is itself being abolished — the NHS Modernisation Bill was introduced 14 May 2026 with legal abolition targeted for April 2027 — so a durable phrasing should avoid pinning the body name too hard.

**Suggested replacement:** "**NHS England's** Data Security and Protection Toolkit (v8.0.0, August 2025) — a self-assessment aligned to both the National Data Guardian's 10 data security standards and the **NCSC Cyber Assessment Framework**, with CAF-aligned independent audit now required for NHS bodies, designated OES providers and genomics organisations."

---

### 15. UK — the Cyber Security and Resilience Bill is absent entirely

**File:** UK article, whole document — most naturally L37–47 and L146–155

The article's thesis is "what actually governs the UK now", and it never mentions the Bill that replaces the NIS Regulations 2018. Fetched the UK Parliament Bills API (`https://bills-api.parliament.uk/api/v1/Bills?SearchTerm=Cyber%20Security%20and%20Resilience`):

- **Bill 4035, "Cyber Security and Resilience (Network and Information Systems) Bill"**
- Current House: **Lords**, current stage **Report stage**, last updated **2026-09-08**
- **Not yet an Act** — no Royal Assent.

Introduced to the Commons November 2025, second reading 6 January 2026, cleared the Commons and entered the Lords 25 June 2026. It expands scope to managed service providers and data centres and tightens incident notification. This belongs in "Brexit divergence — what to watch" at minimum, and arguably in "The system at a glance".

Note this also dates L47's comparison ("more like the Czech NÚKIB or Polish KSC model") and L116's "No national cloud catalogue" framing, which the Bill does not change but which now sits against a moving target.

---

### 16. Switzerland — NCSC Switzerland has been the Federal Office for Cybersecurity (BACS) since 1 January 2024

**File:** Switzerland article, **lines 27–30 (reference), 47, 125**

> L47: "**NCSC Switzerland** — the federal cybersecurity centre (distinct from the UK NCSC)."

On **1 January 2024** the Nationales Zentrum für Cybersicherheit became a federal office: the **Bundesamt für Cybersicherheit (BACS)** / Federal Office for Cybersecurity, moved into the DDPS (VBS). Its live site is `bacs.admin.ch`; the article's reference URL `ncsc.admin.ch` is the legacy domain.

The article's parenthetical "(distinct from the UK NCSC)" was a good instinct — but the disambiguation is now moot, because the Swiss body isn't called NCSC any more.

---

### 17. Switzerland — the mandatory cyberattack reporting duty (1 April 2025) is missing

**File:** Switzerland article, **lines 23–26 (reference), 46, 58, 70, 200, 205**

The article treats the Information Security Act purely as a classified-information statute ("covering classified-information handling for federal administration"). Since **1 April 2025** the ISG also carries a **mandatory cyberattack reporting obligation for critical infrastructure operators**.

Fetched `https://www.bacs.admin.ch/de/meldepflicht`:
- Legal basis: **"Das Informationssicherheitsgesetz (ISG), Art. 74b"** and **"Die Meldepflicht wird im Informationssicherheitsgesetz (ISG) sowie in der Cybersicherheitsverordnung (CSV) geregelt."**
- In force **"per 1. April 2025"**
- Deadline: report to BACS **"innerhalb von 24 Stunden nach der Entdeckung"**, with 14 days to complete the report
- Who: energy and drinking-water supply, transport undertakings, cantonal and municipal administrations, and other designated operators

For a cloud-compliance article this is directly load-bearing — a 24-hour statutory clock affects incident-notification commitments in CSP contracts with Swiss critical-infrastructure customers, and it sits alongside (not inside) the FINMA regime.

---

### 18. Switzerland — FINMA Circular 2023/1 and the federal cloud strategy are both absent

**File:** Switzerland article, **lines 43, 50, 60, 86–101, 201**

Two gaps, both explicitly in scope for this audit:

**(a) FINMA Circular 2023/1 "Operational risks and resilience — banks."** Published 13 December 2022, **in force 1 January 2024**, with a two-year transition for operational resilience. It is the instrument that now carries FINMA's expectations on **ICT risk management, cyber risk, critical data and operational resilience** for banks — precisely the substance the article attributes to 2018/3 alone at L43 ("the operative framework for Swiss financial sector cloud use") and L201. Given the brief's question about whether the retired December 2019 cloud FAQ still reflects FINMA's position: the answer is that the position has moved into 2023/1 alongside 2018/3, and an article that names only 2018/3 understates it.

**(b) The federal cloud strategy.** The article says at L50 only that "Swiss government cloud procurement is handled through federal procurement processes." In fact the Federal Council adopted a **Cloud Strategy for the Federal Administration on 11 December 2020**, and on **22 May 2024** adopted the dispatch on a **CHF 246.9 million commitment credit for the Swiss Government Cloud (SGC)** — a hybrid cloud programme running 2025–2032 (total programme cost CHF 319.4m; first tranche CHF 103.2m for 2025–27 released by the Federal Assembly, second tranche CHF 143.7m for 2028–32), with first functionality usable from 2026 and application migration targeted 2027–2030. Cantons and municipalities may also use it.

---

### 19. UK — "Five years later"

**File:** UK article, **line 33**

> "The United Kingdom left the EU on 31 January 2020. **Five years later**, the UK cloud security framework is…"

Six years as of this article's own `updated: 2026-05-15`, and six and a half now. Minor, but it is the first sentence and it is the kind of thing a UK reader notices. Prefer a date-free construction.

---

# INTERNAL

### 20. Norway — GDPR fines described using NIS2 entity categories

**File:** Norway article, **line 148**

> "**GDPR via Personopplysningsloven** — Datatilsynet can impose GDPR-level fines (up to EUR 20 million or 4% of global turnover **for essential entities**)."

GDPR has no "essential entities" — that is a NIS2 category, and it appears correctly in the very next bullet (L149). The GDPR ceiling applies to undertakings generally. Delete "for essential entities".

### 21. Spain — sanctions bullet mixes NIS1 and NIS2 instruments

**File:** Spain article, **line 159**

> "**NIS2-scope subjects under RDL 12/2018** — administrative sanctions per the NIS2 transposition (in the legislative process as of mid-2026)."

RDL 12/2018 is the **NIS1** transposition. With finding #1 applied, this should read that NIS1-scope subjects are sanctioned under RDL 12/2018 / RD 43/2021, and that no NIS2 sanctions regime exists in Spanish law yet.

---

# The open question — SETTLED

**The CJEU referral is real, and I have the primary source.**

The presscorner HTML page is indeed a JavaScript shell, but the **print-PDF endpoint is not**. Fetching

`https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_26_1499/IP_26_1499_EN.pdf`

returned a genuine 73.8 KB PDF. Extracted text, verbatim:

> "**Commission refers Ireland, Spain, France and the Netherlands to the Court of Justice for failing to transpose the rules on cybersecurity**
> Brussels, **8 July 2026**
> Today, the European Commission decided to refer Ireland, Spain, France and the Netherlands to the Court of Justice of the European Union for failing to notify measures transposing the NIS2 Directive on securing network and information systems (Directive (EU) 2022/2555) into national law. […] Member States had until 17 October 2024 to transpose the Directive. While most complied, Spain, France, Ireland and the Netherlands have yet to notify full transposition. The Commission sent letters of formal notice on 28 November 2024 and reasoned opinions on 7 May 2025. The referrals include a request to the Court to impose financial sanctions, consisting of a lump sum and daily penalties until notification of complete transposition."

With infringement procedure numbers:
- **Spain: INFR(2024)0270**
- Ireland: INFR(2024)0279 · France: INFR(2024)0274 · Netherlands: INFR(2024)0288
- Press release reference **IP/26/1499**

**I ran the falsification test the earlier reviewer's concern implies.** Requesting the same endpoint with an invented reference — `ip_26_9987` — returned **HTTP 404**, not a document. So this endpoint discriminates on reference number and a returned PDF is real evidence, unlike the HTML page.

Corroborated independently by Hunton Andrews Kurth's Privacy & Information Security Law Blog (`https://www.hunton.com/privacy-and-cybersecurity-law-blog/european-commission-refers-four-member-states-to-cjeu-over-nis2-transposition-delays`) and Agence Europe. No CJEU case number has been published yet — the referral is filed, the case number will follow.

**Recommendation:** this can be published. The Spain article should carry it at L65 (which currently stops at the 7 May 2025 reasoned opinion — itself now confirmed correct by the same press release). Note the press release also records that **on 20 January 2026 the Commission proposed targeted amendments to NIS2** as part of a cybersecurity package, which lines up with the established context on the revised Cybersecurity Act.

---

# UNVERIFIED

- **Spain, L122** — "the most current authoritative source for the audit methodology." The 17 June 2025 update of CCN-STIC 801/802/803/805/808 is **confirmed correct** (fetched `https://www.ccn.cni.es/es/actualidad-ccn/1282-...`, publication date "17/06/2025", all five guide numbers match). But CCN has since published **"El CCN actualiza cuatro guías CCN-STIC de su serie 800 sobre el Esquema Nacional de Seguridad"** (ccn-cert news item 13155), which would make "most current" stale. I could not fetch its date — ccn-cert.cni.es returns 403 to WebFetch and serves a JavaScript bot-check to curl. **What would settle it:** loading news item 13155 in a real browser, or the version/date stamps on the CCN-STIC 800 guide index.
- **Spain, L187** — "Hyperscalers (AWS, Microsoft, Google) have multiple Spanish-region services ENS-certified at Media and Alta." Plausible and consistent with the providers' own trust centres, but I did not query the CCN register of certified entities. **What would settle it:** the public register on `ens.ccn.cni.es`, or each provider's ENS certificate listing with category.
- **Norway, L210** — "Google Cloud has no Norwegian region as of mid-2026." Google's `cloud.google.com/about/locations` renders its region list client-side and returned no region names to a plain fetch. Secondary reporting (Arizton, syndicated) claims Google "plans to expand in Norway by 2026", which if anything cuts against the article, but that is a press-release aggregator and I would not publish on it. **What would settle it:** the Google Cloud locations page rendered in a browser, or `gcloud compute regions list`.
- **UK, L105** — whether FCA FG16/5 has been formally withdrawn or superseded. No source found either way.
- **Switzerland, L43/L86–101** — whether FINMA has an open partial revision of Circular 2018/3. There are traces of a consultation (a Swico *Stellungnahme* on a "Teilrevision" of 2018/3, and commentary framed as "FINMA passt sich neuer Realität an"), but I could not date it or confirm it is live; the finma.ch circulars index is JS-rendered. **What would settle it:** FINMA's "Laufende Anhörungen" page in a browser.

---

# Checked and correct

- **UK, L53–68 / L165** — the **14 NCSC Cloud Security Principles**, numbering and titles, verified against `https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles` (Version 2.1, reviewed 7 June 2023, no deprecation notice). Still 14, still in that order. One nitpick: principle 13's official title is "Audit information **and alerting for customers**"; the article drops the last three words.
- **Spain, L65** — "Spain received a reasoned opinion from the European Commission on 7 May 2025 for non-notification of full NIS2 transposition." Confirmed verbatim by the Commission's own IP/26/1499 text.
- **Spain, L122** — the 17 June 2025 CCN-STIC update and the five guide numbers (801, 802, 803, 805, 808). Confirmed against CCN's primary news item.
- **Spain, L91–95 / L131–132** — the Básica / Media / Alta model and the evaluation split. Confirmed from RD 311/2022 Art. 38: BÁSICA requires *autoevaluación* yielding a *declaración de conformidad*; MEDIA/ALTA require an *auditoría de certificación* yielding a *certificación de conformidad*. (Small tightening available: L132 calls the certificate "the certification of record" for all routes, but Básica produces a **declaración**, not a **certificación**.)
- **Spain, L46/L65** — the Anteproyecto's 14 January 2025 Council of Ministers approval and its continuing non-adoption. Confirmed.
- **Norway, L96–104 / L219** — **NSM Grunnprinsipper: 4 categories, 21 principles.** Correct. Current release is **version 2.1, published June 2024** — worth citing the version explicitly, since the article doesn't.
- **Norway, L85–90** — Sikkerhetsloven classification levels BEGRENSET / KONFIDENSIELT / HEMMELIG / STRENGT HEMMELIG. Correct.
- **Norway, L149** — NIS2 sanction ceilings (essential €10M / 2%; important lower). Consistent with established context.
- **Switzerland** — FINMA Circular 2018/3 **is still in force**, no successor: FINMA's own current PDF gives "Erlass: 21. September 2017 / Inkraftsetzung: 1. April 2018 / Letzte Änderung: 4. November 2020", superseding FINMA-RS 08/7.
- **Switzerland, L112/L150/L202** — the **CHF 250,000** penalty cap, verified in the official English FADP text (e.g. Art. 60: "a fine not exceeding 250,000 francs shall be imposed on private persons…"), and the individual-targeted criminal structure.
- **Both known-propagating errors: absent.** I grepped all four articles for flat "24h / 72h / one month from resolution" DORA phrasing and for "can designate" / no-designations-yet CTPP wording. Neither pattern appears. (The UK CTP framing at #7 is a cousin of the second, but about the UK regime, not the EU one.)

---

# Coverage

**Finished, with sources fetched for every claim reported:** all four articles — Spain ENS, UK NCSC, Norway NSM, Switzerland FINMA.

**Deliberately not re-derived** (per the brief): CTPP first 19 designations, DORA incident clocks, DORA dates, NIS2 essential/important thresholds, the NSM page rename and URL, the retired FINMA 2019 cloud FAQ link, the ANSSI/BSI/ReCyF/CADA items, and the NL/DE/PL transposition dates.

**Cross-article consistency:** I grepped the other 25 compliance articles and `src/pages/compliance.astro` for propagation of the specific claims I falsified, and found three hits (listed under findings #1 and #9, plus the CTP note under #7). I did **not** audit those articles' own content — only checked whether these four articles' errors had spread into them.

**What I did not reach:**
- The five UNVERIFIED items above, each with the specific artefact that would settle it. Three of the five (CCN news 13155, Google Cloud locations, FINMA ongoing consultations) are blocked only by client-side rendering or bot checks and would fall to a browser session in a few minutes.
- UK Cyber Essentials: I confirmed the five control areas and annual renewal are correctly described, but did **not** verify the current question-set version (the article's L152 "the scheme periodically updates its technical control set" is safe as written).
- UK Def Stan 05-138 (L110) — currency not checked.
- Spain: the INES/AMPARO description (L143) and the 2-year Media/Alta recertification cadence (L147) were not independently verified against RD 311/2022 Art. 31, though nothing contradicted them.
- Switzerland: the Swiss–US DPF status (L172) and the EU's Swiss adequacy decision (L164, L170) were not re-verified this batch.
---

# Verification and application — Opus, 2026-09-13

Every externally checkable finding was re-verified against a primary source I
fetched myself before anything was applied. **All 18 held. None was a
hallucination.** Three findings (#19, #20, #21) are internal and needed no
source.

| # | Claim | How I checked it | Verdict |
|---|---|---|---|
| 1 | RDL 7/2025 is not a NIS2 transposition | Fetched both BOE records. BOE-A-2025-7187 is the Banco de España euro reference-rate resolution of 8 Apr 2025. BOE-A-2025-12857 is the electricity decree, flagged `[Disposición derogada]`, "Norma derogada por Acuerdo del Congreso … 22 de julio de 2025. Ref. BOE-A-2025-15313" | **Confirmed** |
| 2 | Annex II holds 73 measures | Counted the measure codes myself from the BOE consolidated XML, Anexo II segment only, deduplicated: org 4 + op 33 + mp 36 = 73 | **Confirmed independently** |
| 3 | The hook is artículo 2.3 | Same XML. DA tercera is "Respeto del principio de «no causar un perjuicio significativo» al medioambiente". Art. 2.3 carries the private-sector clause verbatim | **Confirmed** |
| 4 | Adequacy replaced 19 Dec 2025, sunset 27 Dec 2031 | Commission adequacy page lists both 19 December 2025 renewal decisions; the GDPR decision PDF reads "This Decision shall expire on 27 December 2031" | **Confirmed** |
| 5 | Data (Use and Access) Act 2025 was enacted | legislation.gov.uk: UK Public General Acts 2025 c. 18; enacting formula carries "[19th June 2025]" | **Confirmed** |
| 6 | SS2/21 is PRA, PS7/21, dual-regulated | Bank of England page: "Prudential Regulation // Policy statement", "following PS7/21", scope list is banks, building societies, PRA-designated investment firms, Solvency II insurers, third-country branches | **Confirmed, plus a version the reviewer missed** — current is Nov 2024 eff. 31 Dec 2024; a March 2026 version takes effect 18 March 2027 |
| 7 | First CTP designations 10 July 2026 | Bank of England announcement names all four providers and "Monday 13 July 2026"; also names the Critical Third Parties (Designation) Regulations 2026 | **Confirmed** |
| 8 | The act is digitalsikkerhetsloven, in force 1 Oct 2025 | Lovdata: LOV-2023-12-20-108, "Ikrafttredelse 01.10.2025", EØS vedlegg XI nr. 5cpa, direktiv (EU) 2016/1148 | **Confirmed** |
| 9 | DORA in force in Norway 1 July 2025 | Lovdata: FOR-2025-06-24-1296, "Ikrafttredelse 01.07.2025", under LOV-2025-05-27-18 | **Confirmed** |
| 10 | No AWS Norway region | AWS global infrastructure page: 39 regions, "announced plans for … Saudi Arabia, and Chile". Zero occurrences of Norway or Oslo | **Confirmed** |
| 11 | FINMA 2018/3 excludes asset managers and FMIs | Read the addressee table by coordinate from FINMA's own circular PDF (7 marks), then cross-checked against FINMA's separate "Adressaten FINMA-Rundschreiben" matrix by rendering the page. Both leave *Vermögensverwalter* and every FinfraG column blank | **Confirmed twice** |
| 12 | The DPO claim is inverted | Fedlex filestore HTML. FADP Art. 10(1) "Private controllers **may** appoint"; Ordinance Art. 25 "**Every federal body shall appoint**" | **Confirmed** |
| 13 | The Spanish ministry no longer exists | La Moncloa composition of government: no Ministerio de Asuntos Económicos y Transformación Digital; the portfolio is Ministerio para la Transformación Digital y de la Función Pública | **Confirmed** |
| 14 | NHS England, DSPT v8.0.0, CAF-aligned | NHS standards page: publisher NHS England, version 8.0.0, 12 August 2025, aligned to the NDG 10 standards "and the National Cyber Security Centre Cyber Assessment Framework" | **Confirmed** |
| 15 | The Cyber Security and Resilience Bill is not an Act | Parliament Bills API, bill 4035: `"isAct": false`, currentHouse Lords, currentStage Report stage, lastUpdate 2026-09-08 | **Confirmed** |
| 16 | BACS since 1 January 2024 | admin.ch: the NCSC became a federal office in the DDPS on 1 Jan 2024 per the Federal Council decision of 2 Dec 2022. The live site is `bacs.admin.ch` | **Confirmed** |
| 17 | ISA Art. 74b reporting duty, 1 April 2025 | BACS reporting-obligation page, German and English: "Art. 74b", in force 1 April 2025, 24 hours to report, 14 days to complete | **Confirmed** |
| 18 | FINMA 2023/1 and the Swiss Government Cloud | FINMA-RS 23/1 PDF: "Erlass 7. Dezember 2022 / Inkraftsetzung 1. Januar 2024", replacing 08/21. Federal Council dispatch of 22 May 2024, CHF 246.9m of CHF 319.4m total | **Confirmed** |
| 19–21 | Arithmetic and category errors | Internal — "Five years later" is six; GDPR has no "essential entities"; RDL 12/2018 is the NIS1 instrument | **Applied** |

## The CJEU referral — published

I reproduced the reviewer's test rather than taking it on trust. The
presscorner print-PDF endpoint returned a 75,556-byte PDF for `ip_26_1499`
confirming the 8 July 2026 referral of Ireland, Spain, France and the
Netherlands, with Spain at INFR(2024)0270. An invented reference,
`ip_26_9987`, returned **HTTP 404**. A third reference I guessed at,
`ip_25_2967`, returned a real but entirely unrelated release about the 2040
climate target — which is the stronger form of the same proof: the endpoint
resolves per document rather than serving one page for everything.

This settles a claim I had twice declined to publish. It is now in the Spain
article, the France article and the EU frameworks overview. It is deliberately
**not** in the Netherlands article: the Dutch act entered into force on
15 August 2026, a month after the referral.

## What the reviewer got wrong

Nothing factual. Two small things worth recording:

- It reported the November 2024 SS2/21 as current without noticing the
  March 2026 version listed directly beneath it on the same page.
- Its coordinate extraction of the FINMA matrix was right, but mine initially
  was not — my first parse mis-assigned columns and appeared to contradict it.
  Rendering the page settled it in the reviewer's favour. Worth remembering
  before treating a parse as evidence against a source.

## Spillover found while applying

Grepping for the claims rather than the cited lines turned up a defect the
reviewer never saw, left by **B3a**: the Dutch Cyberbeveiligingswet had been
corrected to "in force since 15 August 2026" in one bullet while four other
places in the same article, plus a row in the EU frameworks overview, still
said it was in Senate review. Confirmed in force on the RDI's own page and
fixed in all six places. Third occurrence of this failure mode.

## Still unverified

Carried forward, not applied:

- **Spain L122** — whether CCN news item 13155 supersedes the 17 June 2025
  STIC update. `ccn-cert.cni.es` serves a bot check to curl and 403s WebFetch.
  Needs a browser session.
- **Spain L187** — hyperscaler ENS certifications at Media/Alta. Needs the CCN
  register on `ens.ccn.cni.es`.
- **Norway L210** — whether Google Cloud has announced a Norwegian region. The
  locations page renders client-side. Left as written.
- **UK L105** — whether FG16/5 has been formally withdrawn. No source either
  way; the article now says solo-regulated firms "sit outside" SS2/21 rather
  than making a claim about FG16/5's status.
- **Switzerland** — whether a partial revision of FINMA 2018/3 is in
  consultation. The circulars index is JavaScript-rendered; my URL probing for
  the 2023/1 PDF 404'd four times before a search found the real path.
