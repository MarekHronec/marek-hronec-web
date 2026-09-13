# Batch B5a — Vendor and product landscape

Reviewer: Sonnet (research agent), reported 2026-09-13. **Reviewer did not edit any file.**
Verified and applied by Opus the same day.

Articles: `eu-native-cloud-providers-landscape` · `sovereign-cloud-products-2026-landscape` ·
`hyperscaler-eu-data-boundary-commitments`

Reviewer totals: 7 WRONG, 1 STALE, 5 UNVERIFIED, ~20 checked-and-correct.

**Verification result: all findings confirmed in substance. One was confirmed but
carried the wrong date, and the corpus was already right about it.**

---

## The date pushback

The reviewer reported OVHcloud's public-cloud qualification and Numspot's qualification
as dated **1 September 2026**, sourced from LeMagIT and Numspot's own press release. It
also flagged, honestly, that the repo's France article said July 2026 and asked for the
discrepancy to be resolved rather than resolving it itself.

**ANSSI's own catalogue settles it in the repo's favour.** The catalogue of certified and
qualified products, published by ANSSI and updated monthly, gives the qualification start
dates:

| Provider | Service | Type | Qualified from | To | Decision |
|---|---|---|---|---|---|
| Cegedim | CegNumCloud Secured IaaS | IaaS | 04/12/2024 | 04/12/2027 | 1951 |
| Cloud Temple | PaaS Openshift | PaaS | 30/05/2025 | 30/05/2028 | 919 |
| Cloud Temple | IaaS Secure Temple | IaaS | 31/07/2026 | 30/05/2028 | 3389 |
| **Numspot** | Plateforme des services cloud | IaaS | **31/07/2026** | 31/07/2029 | 3395 |
| **OVH** | Hosted Private Cloud (VMware) | IaaS | 28/12/2023 | 29/12/2026 | 2279 |
| **OVH** | Bare Metal Pod | IaaS | 24/03/2025 | 24/03/2028 | 559 |
| **OVH** | SNC Cloud Platform | IaaS | **31/07/2026** | 31/07/2029 | 3393 |
| Orange Business Services | Cloud Avenue SecNum | — | 11/07/2025 | 11/07/2028 | 1147 |
| Outscale | IaaS Cloud on Demand | IaaS | 30/11/2023 | 30/11/2026 | 2118 |
| Thales Cloud Sécurisé | Cloud de confiance S3NS | multi | 17/12/2025 | 17/12/2028 | 2057 |

1 September was the **announcement**; 31 July was the **decision**. For a compliance
article the decision date is the one that matters, because it is the date the
qualification is legally effective and the date the expiry is measured from.

Two further things fall out of the same table, neither of which the reviewer had:

- **Expiry dates.** OVHcloud's original Hosted Private Cloud qualification expires
  **29 December 2026** and Outscale's expires **30 November 2026** — both within months.
  Worth a re-check at the next pass rather than an edit now.
- **Bleu and ITS Integra are absent from the catalogue**, which independently confirms
  they remain unqualified, and is stronger evidence than either company's own progress
  announcements.

## Verification table

| # | Claim | How I checked it | Verdict |
|---|---|---|---|
| W1 | AWS European Sovereign Cloud is live, not under construction | Established in an earlier batch; also an internal contradiction with the sister article in this very batch, which had it right | **Confirmed** |
| W2 | OVHcloud qualification is no longer private-cloud-only | ANSSI catalogue, three decisions listed | **Confirmed, date corrected to 31/07/2026** |
| W3 | Numspot is qualified | ANSSI catalogue, decision 3395, IaaS only | **Confirmed, date corrected to 31/07/2026** |
| W4 | Bleu validated J1 on 17 November 2025 | Bleu's own release, "Paris, le 17 novembre 2025", ANSSI validating J1 for IaaS, PaaS and CaaS. Absent from the qualified catalogue | **Confirmed** |
| W5 | `bleu.fr` is a parked domain | HTTPS fails the SSL handshake outright; HTTP returns a `mydomaincontact.com` frameset marked `noindex`. Real site is `bleucloud.fr` | **Confirmed** |
| W6 | The T-Systems reference URL is dead | HTTP 403 on the old path; `t-cloud-public.com/en` returns 200 | **Confirmed** |
| W7 | "AWS regions in Europe … always been EU-located" is wrong | London is in the United Kingdom, Zurich is in Switzerland. Neither is in the EU. This needed no fetch and was wrong on the day it was written | **Confirmed** |
| S1 | The Cloud and AI Development Act is missing | Commission's own library page: "Proposal for the Cloud and AI Development Act (CADA)", publication **03 June 2026**, adopted proposal | **Confirmed** |

## Found while applying, not in the report

Grepping for the claims rather than the cited lines turned up **four more places** the
reviewer had not listed, all carrying the superseded qualification status:

- the provider certification table's OVHcloud, Numspot and ITS Integra rows;
- a closing-checklist line listing qualified providers.

The reviewer cited seven locations for the OVHcloud claim; the real count was eleven
across the two articles. This is the fourth batch in which the cited line numbers were an
undercount, and the standing rule held: **grep the claim, not the line.**

## Not applied

- **U1 — plusserver ownership.** The article says BC Partners exited in November 2024 with
  the buyer undisclosed. The reviewer could not confirm or falsify it and found the
  Handelsregister shareholder listed as PlusInvestment GmbH, a vehicle name that may
  predate the claimed exit. Left as written. Would be settled by the Gesellschafterliste
  filed for HRB 84977 around Q4 2024.
- **U2 — Delos Cloud status.** No GA date or BSI attestation confirmed. Left as written.
- **U3 — ITS Integra.** Its elapsed "target mid-2026" is now recorded as *not in ANSSI's
  catalogue as of September 2026*, which is a fact I can source, rather than a prediction.
- **U4 — Exoscale acquisition year.** 2017 announcement versus 2018 close unresolved. Low
  consequence, left as written.
- **U5 — EUCS High+ framing.** The reviewer suspected the sovereignty requirement has
  already been dropped and the debate has migrated to CADA, but could not fetch a primary
  ENISA or Council text. CADA is now recorded as its own watch item; the EUCS framing is
  left alone pending a primary source.

## Notes on the reviewer

Strong batch. It fetched company primary sources rather than press coverage wherever it
could, it flagged the date discrepancy against the repo instead of silently overwriting,
and its "checked and correct" list is long and specific — revenue figures, data-centre
counts, ACN qualification levels, launch dates, consortium membership.

The one methodological gap: it treated a company press release as the authority on a
regulatory decision date. For a qualification, the regulator's register is the source and
the company's announcement is downstream of it. ANSSI publishes a monthly PDF catalogue at
`messervices.cyber.gouv.fr/visas/catalogue-produits-services-profils-de-protection-sites-certifies-qualifies-agrees-anssi.pdf`
with decision numbers and validity windows for every qualified service. That link is worth
reusing for every future SecNumCloud question.
