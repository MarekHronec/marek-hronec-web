---
title: "Slovakia — KsVC: How MIRRI Decides Which Cloud Services the Government Can Use"
category: compliance
tags: ["Slovakia", "KsVC", "MIRRI", "NBÚ", "NIS2", "Compliance", "Data Security"]
date: 2026-04-26
updated: 2026-04-26
readTime: 12
level: intermediate
excerpt: "The Slovak government cloud catalogue is mandatory for the public sector and tied to the national cybersecurity audit framework. As of mid-2026, it is also operationally out of step with the NIS2-era risk-based regime — the methodology still classifies by U1–U4 while the underlying law has moved to risk analysis."
references:
  - title: "MIRRI — Government Cloud Methodological Guidelines"
    url: "https://mirri.gov.sk/sekcie/informatizacia/dokumenty/vladny-cloud/metodicke-usmernenia/"
    description: "MIRRI's central page for the two methodological guidelines that govern provision of cloud services to the Slovak public sector and the process for entry into the government cloud catalogue."
    domain: "mirri.gov.sk"
  - title: "Government Cloud Services Catalogue (KsVC)"
    url: "https://katalog.statneit.sk/?locale=sk"
    description: "The operational public catalogue of cloud services approved for use by the Slovak public administration — the authoritative register of qualified services."
    domain: "katalog.statneit.sk"
  - title: "Methodology — Process for Entry into the Government Cloud Catalogue (PDF)"
    url: "https://mirri.gov.sk/wp-content/uploads/2023/05/Metodicke-usmernenie-pre-proces-zaradenia-cloudovej-sluzby-do-katalogu-vladnych-cloudovych-sluzieb.pdf"
    description: "The full methodological guideline for the catalogue listing process — revision 020775/ of 11 April 2025. Predates vyhláška 227/2025; still uses the U1–U4 classification model."
    domain: "mirri.gov.sk"
  - title: "Act 366/2024 Z. z. — NIS2 Transposition (amending Act 69/2018 on Cybersecurity)"
    url: "https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2024/366/"
    description: "The Slovak NIS2 transposition, effective 1 January 2025. Amends Act 69/2018; introduces a risk-management-based regime and the essential/important entities classification (kritické / dôležité subjekty)."
    domain: "slov-lex.sk"
  - title: "Vyhláška NBÚ 227/2025 Z. z. — Security Measures"
    url: "https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2025/227/"
    description: "NBÚ implementing decree on cybersecurity measures, effective 1 September 2025. Replaces vyhláška 362/2018 and operationalises risk-based security measure design."
    domain: "slov-lex.sk"
  - title: "Act 95/2019 Z. z. on IT in Public Administration"
    url: "https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2019/95/"
    description: "The statute that grants MIRRI authority to issue methodological guidelines and maintain the registry of government cloud services."
    domain: "slov-lex.sk"
  - title: "Act 69/2018 Z. z. on Cybersecurity (consolidated)"
    url: "https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2018/69/"
    description: "The cybersecurity act as consolidated after the 366/2024 amendment — defines the 'Auditor of Cybersecurity' qualification and the post-NIS2 risk-management obligations."
    domain: "slov-lex.sk"
---

The Slovak Government Cloud Services Catalogue — *Katalóg služieb vládneho cloudu* (KsVC) — is the operational instrument that determines which cloud services the Slovak public administration is allowed to consume. It is mandatory, it has been refined over multiple methodological revisions, and it is tied to the national cybersecurity audit framework. It is also, as of mid-2026, **operationally out of step with the underlying cybersecurity law** — the NIS2 transposition and the September 2025 NBÚ decree shifted Slovak cybersecurity regulation to a risk-management-based regime, while MIRRI's most recent published methodology (April 2025) still uses the static U1–U4 classification model. This article walks through how KsVC works today and where the transitional gap sits.

:::warning[Reality Check]
**A transitional gap exists between MIRRI's KsVC methodology and the post-NIS2 Slovak cybersecurity regime.** Act 366/2024 Z. z. (effective 1 January 2025) amended the cybersecurity law to require risk-management-based security measures. The implementing decree — **vyhláška NBÚ 227/2025 Z. z.** (effective 1 September 2025) — replaced the older 362/2018 decree and operationalises risk-based design. The most recent publicly available MIRRI cloud methodology is **revision 020775/ of 11 April 2025** — issued *before* the September 2025 NBÚ decree and still using the U1–U4 classification model. No newer MIRRI methodology has been observed publicly as of May 2026. A transition period to **31 December 2026** allows both the old and the new regimes to apply, so the gap is best described as **pending operational alignment**, not as a transposition failure. Plan accordingly: design controls to the risk-based regime regardless of which methodology MIRRI's catalogue process applies at the moment of submission.
:::

## The system at a glance

The framework is operated by the **Ministerstvo investícií, regionálneho rozvoja a informatizácie SR (MIRRI SR)** — Ministry of Investments, Regional Development and Informatisation — through its informatisation section. Day-to-day operation runs through the catalogue platform at `katalog.statneit.sk` and the supporting informational site at `cloud.statneit.sk`. Contact for submissions is `cloud@mirri.gov.sk`.

The framework is procedural rather than certification-based: MIRRI does not certify cloud services directly. It maintains a register of services that have passed evaluation against the methodological guidelines, and it ties the depth of that evaluation to the sensitivity of the data the service will handle.

Two methodological guidelines define KsVC operationally:

- *Metodické usmernenie MIRRI SR k poskytovaniu cloudových služieb* — the provision side.
- *Metodické usmernenie pre proces zaradenia cloudovej služby do katalógu vládnych cloudových služieb* — the catalogue listing side. **Latest publicly available revision: `020775/` of 11 April 2025.**

A separate but closely related guideline — *Metodické usmernenie pre klasifikáciu ISVS* (companion classification guideline, reference `023107/2023/oSBATA-1`) — governs how the consumer-side public administration classifies its information systems. As of mid-2026, the public version of this guideline is also unchanged from its 2023 revision.

## Legislative basis

KsVC sits at the intersection of two legal regimes that have moved at different speeds.

**The public-administration IT regime** (the proximate legal anchor for KsVC):

- **Act 95/2019 Z. z.** on IT in Public Administration — `§8 ods. 1 písm. c)` grants MIRRI the power to issue methodological guidelines; `§24a ods. 3 a 4` mandates the registry of government cloud services.
- **Act 305/2013 Z. z.** on eGovernment — `§10a` makes catalogue entry a precondition for a cloud service to be used in eGovernment workflows.
- **Vyhláška ÚPVII 179/2020 Z. z.** — categorisation method and content of security measures for public-sector IT. Operates the older three-category classification (I/II/III). Reportedly deprecated in practice by NIS2-era reforms but **a formal repeal could not be verified** as of mid-2026.

**The cybersecurity regime** (where the post-NIS2 shift happened):

- **Act 69/2018 Z. z.** on Cybersecurity (as amended) — defines the *Auditor of Cybersecurity* qualification whose audit opinion is mandatory at U3 and U4 levels under MIRRI methodology.
- **Act 366/2024 Z. z.** — the Slovak NIS2 transposition, **effective 1 January 2025**. Amends Act 69/2018. Replaces the older static classification mechanics with a **risk-management obligation** and the NIS2 essential/important entities model (*kritické subjekty* / *dôležité subjekty*). The operational core is `§ 20`: regulated entities must design, adopt, and implement security measures based on a documented cybersecurity risk analysis.
- **Vyhláška NBÚ 227/2025 Z. z.** — security measures decree, **effective 1 September 2025**. Replaces vyhláška 362/2018 Z. z. The operative language: "*všeobecné bezpečnostné opatrenia sa navrhujú, prijímajú a vykonávajú tak, aby ošetrili všetky riziká identifikované v rámci vykonanej analýzy rizík*". Paired with a separate NBÚ-issued risk-analysis methodology that establishes a unified national risk-management framework.
- **Vyhláška NBÚ 226/2025 Z. z.** — related obligations, also effective 1 September 2025.
- **Transitional regime**: entities registered under the old regime before 31 December 2024 may comply under either the old or the new rules until **31 December 2026**. From 1 January 2027, only vyhláška 227/2025 applies.

The relationship between the two regimes is **legally distinct but practically overlapping**. KsVC operates under Act 95/2019 and Act 305/2013; the cybersecurity audit at U3/U4 levels under MIRRI methodology references Act 69/2018, which has now been substantially rewritten by the 366/2024 amendment.

## Scope of obligation

The scope is asymmetric and unchanged by the cybersecurity regime shift:

- **Public administration bodies (`orgány riadenia`, OR VS)** must provide and consume cloud services *only* from the catalogue. No legal route to use a non-catalogue service for public-administration work covered by Act 305/2013.
- **Commercial cloud providers** can apply voluntarily for listing. Once listed, they become eligible to sell to the public sector for the level at which they are listed.

The 366/2024 amendment expands the *cybersecurity* regulated-entity population (essential/important entities, NIS2-aligned size thresholds) but does not change the **KsVC procurement constraint**. The two regimes apply in parallel.

## Classification model — U1 through U4

The MIRRI methodology continues to use a four-tier *level* model combined with the standard CIA triad. The governing rule:

```
classification of ISVS X ≤ level of cloud service Y
```

| Level | Data type | Evaluation route under current MIRRI methodology |
|---|---|---|
| **U1 — Open data** | Publicly available, no confidentiality requirements | Self-assessment by the provider; MIRRI in oversight role |
| **U2 — Regulated data** | Operational public-sector data not under special regulation | Independent evaluator; may be a MIRRI employee |
| **U3 — Confidential / classified data** | Data under Act 215/2004, higher-sensitivity personal data | Audit by certified **Auditor of Cybersecurity** under Act 69/2018 |
| **U4 — Highest level** | Critical infrastructure, foundational state registers, ISVS classified C3/I3/A3 | Private segment of the government cloud; cybersecurity audit with extended coverage |

For U2 and higher, **tenant-level encryption** with provider-side key custody is mandatory; for U3 and higher, customer-held HSM-based key custody is mandatory.

The 80% minimum-conformity threshold for the cybersecurity audit at U3/U4 is set against the controls under Act 69/2018. With vyhláška 227/2025 now in force, the underlying control set has shifted from a static security-measures catalogue to a risk-output-based design. The MIRRI methodology has not yet been updated to reflect that change in the underlying audit reference.

## Evaluation criteria

The reference frameworks for evaluation under the published MIRRI methodology are:

- **[ISO/IEC 27001 / 27017 / 27018 / 27701](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines)** — the universal baseline; see the dedicated article for what each standard covers.
- **ENISA Cloud Certification Scheme** — form `1C` of the application references the ENISA controls framework.
- **Cybersecurity audit under Act 69/2018** with minimum 80% conformity for U3/U4.

The application package includes form `1A`, the self-assessment / evaluation form `1C`, and a ZIP of supporting evidence: ISO certificates, audit reports, general terms (VOP), contract templates, SLAs with measurable parameters, list of subcontractors with their classification levels.

Where the regimes meet — and where the gap is most visible — is the cybersecurity audit. Until MIRRI updates the methodology, the U3/U4 audit references a control set whose underlying legal basis has shifted. Auditors performing work under Act 69/2018 (as amended by 366/2024) are now applying the risk-management regime; the MIRRI methodology has not formalised how that maps to the U3/U4 80% threshold.

## The assessment process

1. **Submission** — provider sends `1A` + `1C` + evidence ZIP via email to `cloud@mirri.gov.sk`.
2. **Evaluation** — U1: self-assessment; U2: independent evaluator (potentially MIRRI staff); U3/U4: certified Cybersecurity Auditor under Act 69/2018.
3. **Decision** — MIRRI issues a decision and enters the service into the catalogue.
4. **Re-evaluation** — under `§10a ods. 4` of Act 305/2013, MIRRI calls for re-application when the service or its material parameters change.

The auditor pool at U3/U4 is small and audits the entire public-sector ecosystem under Act 69/2018. With the post-NIS2 regime introducing new risk-analysis methodology, the same auditors are now applying it across regulated entities — including, implicitly, in their cloud-service audit work.

## Catalogue and recertification

The catalogue is publicly accessible at `https://katalog.statneit.sk/?locale=sk`. It lists active entries with their levels and applicable scope.

There is no fixed uniform recertification period. Periodicity is driven by:

- **Validity of ISO certificates** submitted as evidence (ISO 27001 is typically a three-year cycle).
- **Cybersecurity audit cycle** under Act 69/2018 — minimum every two years for operators of essential services. Under the 366/2024 amendment, this is now framed as a risk-analysis-based obligation rather than a fixed cycle for all subjects.
- **MIRRI ongoing monitoring** — quality oversight that may trigger re-evaluation off-cycle.

## Sanctions and oversight

The sanctioning mechanism is procurement-based rather than penalty-based:

- A non-listed service may not be used by a public administration body. No fine; loss of access to the public-sector market.
- MIRRI and NBÚ verify correct ISVS classification on the consumer side.
- A service can be **removed from the catalogue** if material parameters change without re-application, if ISO certification lapses, or if a cybersecurity audit fails.
- **[NIS2](/knowledge-base/compliance/nis2-supply-chain-cloud-providers) sanctions** — under the amended Act 69/2018 via Act 366/2024 — apply to cloud providers as supply-chain participants for essential-service operators, in addition to catalogue consequences. The sanction levels follow the NIS2 framework (up to €10 million or 2% of global turnover for essential entities).

The pending operational alignment between MIRRI methodology and the NBÚ regime is, in practice, an enforcement-layer question: catalogue removal still works as the procurement bite, NIS2 sanctions apply as the substantive cybersecurity bite, and the two layers operate in parallel until MIRRI's next methodology revision lands or the 31 December 2026 transition window closes.

Key facts that remain knowable during the transition:

- **The U1–U4 classification model is still in force** for KsVC purposes. The MIRRI methodology is what the catalogue process applies, even if its alignment with the new cybersecurity decree has not been formalised.
- **The cybersecurity audit at U3/U4 references Act 69/2018 as amended**. Auditors apply the consolidated text, which means they are applying the risk-management framework even when documenting against the U3/U4 conformity threshold.
- **Vyhláška 179/2020** (the public-administration IT categorisation decree) is reported as deprecated in NIS2 commentary but **no formal repeal has been verified**. The companion MIRRI classification guideline (`023107/2023/oSBATA-1`) is unchanged on the public page.
- **The risk-based design obligation under vyhláška 227/2025** applies to regulated entities in cybersecurity scope regardless of MIRRI's catalogue methodology. A CSP that is also in NIS2 essential-entities scope must operate the risk-based regime today; the MIRRI methodology gap is a procedural-alignment issue, not a substantive escape route.

## Sovereignty posture

Tier-driven, not absolute. **U1 / U2** have no explicit sovereignty constraint; international CSPs participate readily. **U3** encryption and key custody requirements produce operational sovereignty even without jurisdictional constraints on the provider entity. **U4** operates as a **private segment** of the government cloud — scoping U4 workloads to state-controlled or state-contracted infrastructure rather than commercial public cloud regions.

The framework does not impose the explicit ownership caps SecNumCloud does. It also does not formally exclude non-EU providers at U3, although the U4 private-cloud posture produces an equivalent effect for the most sensitive workloads.

## Multicloud factor

For a hyperscaler operating in Slovakia and aiming at the public sector at U2 or U3:

- ISO 27001/27017/27018 baseline is shared with every other framework — no incremental work specific to KsVC.
- The Cybersecurity Audit under Act 69/2018 (as amended by 366/2024) is *specific to Slovakia*. Cybersecurity Auditor opinions are not transferable from other jurisdictions, and the 80% conformity threshold is the binding gate at U3/U4.
- **Risk analysis under vyhláška 227/2025** is now an additional deliverable for any CSP that is also an NIS2 essential or important entity in Slovakia. The risk analysis must align with the unified NBÚ methodology, which has Slovak-specific framing.
- The SLA-with-measurable-parameters requirement forces explicit numeric thresholds.
- Subcontractor classification — every subcontractor in the supply chain must have a declared classification. This requires the CSP to surface its own supply chain in a form most do not by default.

The fastest route through KsVC for a multinational CSP that already holds [BSI C5](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation) + [ISO 27001/27017/27018](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines) + [ENS](/knowledge-base/compliance/spain-ens-national-security-framework) or [SecNumCloud](/knowledge-base/compliance/france-anssi-secnumcloud-qualification) documentation is to retain a Slovak Cybersecurity Auditor, map the existing evidence to the `1C` form, run the risk analysis under vyhláška 227/2025, and submit. The audit and the risk analysis are the bottlenecks.

:::tip[Architectural Pro Tip]
For a CSP preparing for KsVC listing or maintaining an existing one, **design to vyhláška 227/2025 and the new NBÚ risk-analysis methodology now**, regardless of the MIRRI methodology's revision status. Two reasons: (1) the cybersecurity audit at U3/U4 uses the amended Act 69/2018 reference, so the auditor is already applying the new regime; (2) MIRRI's next methodology revision will inevitably align with vyhláška 227/2025, and CSPs that have already implemented risk-based design will not need a second remediation cycle when that revision lands. The risk-based regime is also the framework the NIS2 essential/important entities obligation applies under — meeting it once covers both regimes.
:::

## Closing checklist

- KsVC is procedural, public-sector-mandatory, and historically tied to the cybersecurity audit framework under Act 69/2018. Public administration bodies may use only listed services for ISVS workloads under Act 305/2013.
- The classification model **in the MIRRI methodology** is U1–U4. The binding rule is `ISVS classification ≤ cloud level`. U3 requires a certified Cybersecurity Auditor with ≥80% conformity. U4 is effectively the private government cloud segment.
- **NIS2 transposition (Act 366/2024 Z. z., effective 1 January 2025)** shifted the cybersecurity regime to risk-management. **Vyhláška NBÚ 227/2025 (effective 1 September 2025)** operationalises risk-based security measure design. **Transition period until 31 December 2026** allows dual operation.
- The latest publicly available MIRRI cloud methodology is **revision 020775/ of 11 April 2025** — predates vyhláška 227/2025 and continues to use U1–U4. **No newer MIRRI methodology has been observed publicly as of May 2026.**
- The gap between MIRRI methodology (static classification) and the cybersecurity regime (risk-based) is **pending operational alignment**, not a transposition failure. Design to vyhláška 227/2025 now; MIRRI's next revision will inevitably align.
- Vyhláška 179/2020 (public-administration IT categorisation) is reported as deprecated in NIS2 commentary; **a formal repeal could not be verified.** Treat sweeping statements about its abolition with caution.
- Sanctions remain procurement-based at the catalogue layer; NIS2 administrative sanctions (up to €10 million or 2% of global turnover) apply on top via the amended Act 69/2018.
- The pragmatic sequence for a hyperscaler entering Slovak public sector in 2026: ISO 27001/27017/27018 → BSI C5 Type 2 → risk analysis under vyhláška 227/2025 → KsVC U2 listing → optional U3 path with a Slovak Cybersecurity Auditor.
- **What to read next:** [ISO 27001/27017/27018/27701 baselines](/knowledge-base/compliance/iso-27001-27017-27018-27701-cloud-baselines) for the universal evidence layer referenced throughout; [NIS2 Supply Chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers) for the post-Act-366/2024 supply-chain regime; [Decision Framework](/knowledge-base/compliance/cloud-compliance-decision-framework) to map your specific organisation type to the applicable frameworks; [BYOK/HYOK article](/knowledge-base/compliance/cloud-encryption-key-custody-byok-hyok) for the U3+ HSM key-custody patterns.
