# Batch B4 — Assurance and attestation

Reviewer: Sonnet (research agent), reported 2026-09-13. **Reviewer did not edit any file.**
Verified and applied by Opus the same day.

Articles: `iso-27001-27017-27018-27701-cloud-baselines` · `soc-2-reports-how-to-actually-read-them` ·
`csa-star-registry-cross-cutting-trust-layer` · `reading-cloud-attestation-reports-practitioner-guide` ·
`cloud-encryption-key-custody-byok-hyok`

Reviewer totals: 6 WRONG, 4 STALE, 4 UNVERIFIED, 3 INTERNAL, 20 checked-and-correct.

**Verification result: 10 of 10 externally checkable findings confirmed. One UNVERIFIED
resolved in the reviewer's favour on a source it could not reach. Nothing hallucinated.**

---

## Verification table

| # | Claim | How I checked it | Verdict |
|---|---|---|---|
| W1 | ISO/IEC 27701 is no longer an extension of 27001 | ISO/IEC JTC 1/SC 27 committee catalogue lists 27701:2019 **[Withdrawn]** and 27701:2025 current. The OBP foreword of the 2025 edition reads: "This second edition cancels and replaces the first edition (ISO/IEC 27701:2019)… the document has been **redrafted as a stand-alone management system standard**." ISO's own titles carry it too: 2019 = "Extension to ISO/IEC 27001 and ISO/IEC 27002 for privacy information management", 2025 = "Privacy information management systems — Requirements and guidance". Edition 2, published 2025-10 | **Confirmed on better evidence than the reviewer had** |
| W2 | ISO/IEC 27018:2025 supersedes 27018:2019 | Same catalogue: 27018:2019 **[Withdrawn]**, 27018:2025 current. Record page: Edition 3, publication date 2025-08. Title changed from "Code of practice for…" to "Guidelines for protection of…" | **Confirmed** |
| S1 | ISO/IEC 27017:2026 supersedes 27017:2015 | Same catalogue: 27017:2015 **[Withdrawn]**, 27017:2026 current, Edition 2, published 2026-07. OBP foreword: "the structure of the document has been changed, presenting the controls using a simple taxonomy and associated attributes… some controls have been merged, some have been removed and several new controls have been introduced" | **Confirmed, and the substance goes further than the year** |
| S4 | ISO/IEC 27006-1:2024 replaced 27006:2015 | Same catalogue: 27006:2015 and its Amd 1:2020 both **[Withdrawn]**; 27006-1:2024 current | **Confirmed** |
| W3 | Azure Key Vault Premium is FIPS 140-3 Level 3 | Microsoft Learn: "Azure Key Vault premium tier is a **FIPS 140-3 Level 3** validated, PCI-compliant, multitenant HSM offering… Marvell LiquidSecurity HSMs" | **Confirmed** |
| S2 | Azure Dedicated HSM is retiring | Same page: "Azure Dedicated HSM is retiring. Microsoft will fully support existing Dedicated HSM customers until July 31, 2028. Microsoft doesn't accept new customer onboarding requests." Azure Cloud HSM named as successor | **Confirmed** |
| W4 | Google Cloud EKM partners are Fortanix, Futurex, Thales | Google's EKM documentation, "Compatibility → Supported key managers": "Supported today: Fortanix, Futurex, Thales." Equinix, SmartKey, Atos and Trustway each appear **zero** times on the page | **Confirmed** |
| W5 | DORA cryptography is Art. 9(4)(d), not Art. 30 | EUR-Lex CELEX 32022R2554. The cryptographic-keys clause sits under **Article 9 "Protection and prevention"**. **Article 30 "Key contractual provisions"** opens "The rights and obligations of the financial entity and of the ICT third-party service provider shall be clearly allocated and set out in writing". Art. 30(2)(c) does require contract "provisions on availability, authenticity, integrity and confidentiality in relation to the protection of data" — a contractual duty, not the cryptographic one | **Confirmed on the primary text** — the reviewer used a mirror site |
| S3 | Microsoft Cloud for Sovereignty renamed | Microsoft Learn: "**Microsoft Sovereign Cloud, formerly Microsoft Cloud for Sovereignty**, is an evolution and expansion of the original offering." The article's old reference URL also now redirects to `microsoft.com/en-us/sovereignty` | **Confirmed** |
| W6 | SOC 2 Type 2 is not an ISAE 3000 engagement | AICPA's SOC suite page ties the SOC 2 guide to the SSAE series (updates from SSAE No. 20 and No. 21). The article's own reference list already cited "AICPA SSAE 18 — Attestation Standards" for SOC 2, so it contradicted itself | **Confirmed** |
| I1 | C5:2026 is published, not a draft | Established in B2 from BSI's own catalogue. Reviewer found **both** occurrences; my brief had named only one | **Applied** |
| I3 | SOC 2 period is 6–12 months | Internal: the SOC 2 article states both periods, the attestation guide's table said 12 months only | **Applied** |

## An UNVERIFIED the reviewer could not close, and I could

**U2 — Equinix SmartKey.** The reviewer could not get an authoritative statement because
Equinix's pages returned 403, and correctly declined to call it WRONG. Following the
redirect settles it: `equinix.com/services/edge-services/smartkey` now resolves to
`fortanix.com/platform/data-security-manager`, and `smartkey.io` serves a page titled
"Fortanix Data Security Manager". The article listed "Equinix SmartKey" and "Fortanix
Data Security Manager" as two separate HSM-as-a-service options. They are one product.
Corrected.

## Not applied

- **W1's transition deadline.** The reviewer suggested 2019-edition certificates must
  transition within three years, "i.e. by ~October 2028", and flagged it as needing
  confirmation. No IAF resolution found. **No deadline published.** The article says to
  check which edition a certificate names, which is the actionable part and needs no date.
- **U1 — CSA STAR Level 3.** CSA's own current STAR pages describe only Levels 1 and 2.
  The article calls Level 3 an emerging capability that few CSPs hold. The reviewer could
  not confirm any holder, nor a discontinuation. Left as written; would be settled by the
  STAR Registry's level filter or a dated CSA statement.
- **U3 — Atos vs Eviden branding for Trustway.** Eviden is an Atos Group brand, so "Atos
  Trustway" is imprecise at worst, not false. Left as written.
- **U4 — ACN Direttoriale 21007/24.** Nothing contradicts the article's citation of
  Determinazione 307/2022; acn.gov.it returns 403. Left as written. Note the repo's
  Italy article already cites Determinazione 127437/2026 separately.

## Notes on the reviewer

Accurate throughout, and it caught a second occurrence of the C5 error that my own brief
had missed. Two things to carry forward:

- **Its ISO citations were unreliable even though its conclusions were right.** It cited
  `iso.org/standard/27017` as showing "ISO/IEC 27017:2026". That path is a catalogue
  *record id*, not a standard number — suffixed with `.html` it resolves to ISO 7547:2002,
  a shipping air-conditioning standard. It reached the right answer from search-engine
  snippets of ISO titles, not from the catalogue. The lesson is the B3b one restated: a
  correct conclusion and a sound citation are different things, and only the second is
  checkable later.
- It reported the November 2024 SS2/21 as current in B3b and missed the March 2026
  version on the same page; here it missed nothing comparable.

**How I got past ISO's 403:** the browser pane renders the catalogue where curl is
blocked, and the committee page `iso.org/committee/45306/x/catalogue/p/1/u/0/w/0/d/0`
lists every SC 27 standard with its withdrawn/current status in one view. The Online
Browsing Platform (`iso.org/obp/ui/en/#iso:std:iso-iec:<num>:ed-<n>:v1:en`) serves each
standard's foreword and introduction free, which is where the "stand-alone management
system standard" wording comes from. Worth reusing.
