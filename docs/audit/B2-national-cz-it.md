# B2 · National frameworks CZ–IT — findings

Reported 2026-09-12 (opus, web-verified). Five articles read end to end.
Index: [../CONTENT-AUDIT.md](../CONTENT-AUDIT.md)

## Independent re-verification before applying

Every high-priority finding was checked against a primary source in the main
session, not taken on the reviewer's word — because the previous batch's apply
step introduced three errors of its own. **All nine held. Nothing was
hallucinated.**

| # | Claim | How it was checked |
|---|---|---|
| 1 | CZ cloud catalogue exists | Sagit: vyhláška **505/2025 Sb.**, "o některých požadavcích pro zápis do katalogu cloud computingu" |
| 2 | CZ cloud-specific decree exists | Sagit: vyhláška **412/2025 Sb.**, "pro orgány veřejné správy využívající služby poskytovatelů cloud computingu" |
| 3 | IT determine 306/307 repealed | Extracted Art. 26 from the ACN Regolamento PDF: "*Sono abrogati … la determina n.307 del 18 gennaio 2022*" |
| 4 | IT strategic data ≠ QC4-only | Extracted Art. 17(4)(c): strategic data via "*le tipologie di cui al comma 1, lettere c) e d)*"; Aruba holds QC3 |
| 5 | ReCyF = 17 March 2026 | Already established — this batch caught it as *our own* corruption |
| 6 | FR décret 2026-272 + arrêté | Banque des Territoires; Whaller — "SecNumCloud 3.2 devient une règle d'achat opposable" |
| 7 | FR provider list short | Extracted the ANSSI catalogue PDF: Numspot present (31/07/2026), Bleu absent, OVH ×3 |
| 8 | DE registration = March 2026 | dhpg: "BSI-Portal freigeschaltet – Frist März 2026". Also self-evident: the article dated it before the law existed |
| 9 | DE C3A exists | BSI's own page: "C3A – Criteria enabling Cloud Computing Autonomy" |
| 13 | BAIT/VAIT repealed | BaFin: VAIT, KAIT, ZAIT repealed end of 16 Jan 2025; BAIT phased out |
| 15 | PiTuKri sub-area misnamed | Extracted the PiTuKri v1.1 PDF: subdivision 10 is "Transferability and compatibility" |
| 16 | Katakri 2020 | PiTuKri cites 2015 because it predates the update; current edition is 2020 |

## Applied

**Czechia** — the catalogue exists (505/2025) and there *is* a cloud-specific
decree (412/2025), reversing two claims that framed the whole article. Kept the
true residue: no SecNumCloud-style qualification, and the catalogue is
registration rather than certification. Management ban is a six-month floor, not
a cap. Fines are CZK 250m/175m under *vyšší/nižší režim*. Both propagated errors
this audit predicted — the DORA clock and "CTPP can designate" — were present
and are fixed.

**Italy** — determine 306/307 replaced by Allegato 3 and 4. Strategic data is
admitted at QC3 as well as QC4; QC4 is distinguished by HYOK key custody, not by
being reserved to the PSN. Same claim fixed where it had propagated into
`cloud-data-security-eu-national-frameworks-overview`.

**France** — décret 2026-272 and the August arrêté added; SecNumCloud is now a
statutory purchasing rule, which was the biggest gap in the batch. Provider list
corrected against the catalogue.

**Germany** — registration deadline 6 March 2026; DORA replaces BAIT/VAIT as the
financial hook; C3A added to the sovereignty section.

**Finland** — sub-area 10 renamed; Katakri edition clarified.

## Not applied

- **Finding 14** (Italy NIS2 determinazioni 379907/2025, 127437/2026) — plausible
  but not verified here. Unverified findings do not get applied.
- **Finding 18** (France NIS2 CJEU referral) — same unverified CJEU claim B1
  declined to publish. Still open.
- **Findings 17, 19–25** — EUCS framing overtaken (partly handled in B1's P9),
  internal cross-references, and the unsourced quantifications the reviewer
  flagged in the Finland article. Left for X1.
