# B3a · Slovakia, Poland, Netherlands — findings

Reported 2026-09-12 (opus, web-verified). Three articles read end to end.
Index: [../CONTENT-AUDIT.md](../CONTENT-AUDIT.md)

## Independent re-verification before applying

Every high-priority finding was checked against a primary source here, not
taken on the reviewer's word. **All held. Nothing was hallucinated.**

| # | Claim | How it was checked |
|---|---|---|
| 1 | SK U2/U3 labels inverted | Extracted MIRRI's methodology PDF: "Kategória U2: **Dôverné dáta**", "Kategória U3: **Regulované dáta** … C2I1A1 až C3I3A3", "U4: **Špeciálne dáta**" |
| 2 | Article contradicts the live calculator | `security-calculator.ts:380` scores classified information at **weight 4** → U4; article said U3. MIRRI backs the calculator |
| 3 | Audit threshold 90%, U4, unsettled | Same PDF: "minimálne 90%**?**", question mark in the published text. String "80" appears **nowhere** in the document |
| 4 | Fixed 2-year validity exists | Same PDF: "Doba platnosti zápisu … U1, U2, U3 a U4 … je **2 roky**", renewal 6 months to 60 days before expiry |
| 5 | 179/2020 repealed | slov-lex 184/2026: "Zrušuje sa vyhláška … č. 179/2020 Z. z.", "nadobúda účinnosť **1. januára 2027**" |
| 6 | Calculator cites a paragraph with no letters | zakonypreludi 69/2018: "(2) Bezpečnostné opatrenia sa prijímajú aspoň pre a) … **r)**"; ods. 3 is prose. §20(4)(a) checked and correct |
| 7 | Act 305/2013 §10a is the wrong anchor | Same source: §10a is "Sprístupňovanie údajov fyzickej osobe…" — provision of state data to persons |
| 10 | BIO2 abolished the BBNs | bio-overheid.nl: "basisbeveiligingsniveaus naar een maatwerkpakket aan maatregelen" |
| 12 | Dutch regulation published | digitaleoverheid.nl, `datePublished 2026-08-07` |
| 13 | Dz.U. 2026 poz. 20 is the wrong entry | dziennikustaw.gov.pl: "Obwieszczenie … z dnia 29 grudnia 2025 r. … jednolitego tekstu", published 2026-01-09 |

## Applied

**Slovakia** — U2/U3 names and definitions un-inverted; classified information
moved to U4 where the calculator already put it; the 80% audit figure replaced
with MIRRI's actual "90%?" at U4, flagged as unsettled; the two-year catalogue
validity documented where the article said no fixed period exists; the 179/2020
repeal by 184/2026 recorded; the catalogue's statutory anchor corrected from
Act 305/2013 §10a to Act 95/2019 §24a ods. 3 a 4.

**Calculator** — sixteen `§20(3)(x)` citations replaced with `§20(2)`. No
per-letter mapping invented: the sixteen names track the older vyhláška's
structure rather than ods. 2's lettering.

**Netherlands** — the BBN section rewritten and five dependent passages with it;
Cbw in force; Cyberbeveiligingsregeling published and BIO2 now statutory across
all four layers.

**Poland** — reference repointed to Dz.U. 2026 poz. 252; "2025 amendment" →
2026; CTPP sentence made present-tense; Constitutional Court → Tribunal.

**Spillovers** — `cloud-compliance-decision-framework` corrected for the Slovak
U-level and the BBN withdrawal.

## Open

- **#8 UNVERIFIED — SK encryption and key-custody tiers.** The article says
  tenant-level encryption from U2 and customer-held HSM from U3. The guideline
  mentions encryption only in passing and never mentions HSM. Deliberately not
  changed: replacing an unverified claim with a differently unverified one is
  no improvement. Settled by the annex ZIP behind the MIRRI methodology page
  (`1I_Poziadavky_na_zapis_CS`, `1C_Katalóg vlastností CS`), which nobody has
  opened yet. That ZIP would also settle whether an 80% figure exists anywhere.
- **#6 OPEN — two statutory control areas missing from the calculator**:
  q) dodávateľský reťazec and r) obstarávanie a využívanie certifikovaných
  produktov IKT. Adding them needs a mandatory/recommended split per category
  that the statute does not give. Also: when 184/2026 takes effect on
  1 January 2027, the calculator's category criteria lose the legal base they
  inherited from 179/2020.
- **#9** Act 69/2018 is now amended by zákon 67/2026 (consolidated text
  effective 30 April 2026); the article still says "as amended by 366/2024".
  Also new: vyhláška NBÚ 212/2026 amending 493/2022 on the cybersecurity audit.
  Not applied — the amending act was not read.
- Poland: the incident-reporting cadence at line 93 ("typically within 24
  hours") may understate a 24h+72h structure. The reviewer declined to file it
  without the enacted provision. Correct call; still open.
