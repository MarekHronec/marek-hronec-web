# Batch B6b — Networking and addressing

Reviewer: Sonnet (research agent), reported 2026-09-13. **Reviewer did not edit any file.**
Verified and applied by Opus the same day.

Articles: `address-plans-designing-ip-space-for-three-clouds` ·
`ipam-ip-address-management-before-you-wish-you-had-done-it` ·
`hub-and-spoke-virtual-wan-and-drg-three-topology-choices` ·
`hybrid-connectivity-expressroute-fastconnect-vpn-reality`

Reviewer totals: 7 WRONG, 1 STALE, 2 INTERNAL, 2 UNVERIFIED, ~25 checked-and-correct.

**Verification result: all 10 actionable findings confirmed. The CIDR findings were
re-derived by computation, which then found a fifth the reviewer missed.**

---

## The CIDR arithmetic

This is the most consequential batch so far, because the defects were in numbers a reader
copies rather than in prose they interpret. Four prefixes did not sit on their own prefix
boundary. Verified with Python's `ipaddress` module:

| Stated | Normalises to | Stated range | Real range |
|---|---|---|---|
| `10.150.0.0/14` | `10.148.0.0/14` | 10.150–10.153 | 10.148–10.151 |
| `10.110.0.0/14` | `10.108.0.0/14` | — | 10.108–10.111 |
| `10.114.0.0/14` | `10.112.0.0/14` | — | 10.112–10.115 |
| `10.100.0.0/12` | `10.96.0.0/12` | — | 10.96–10.111 |

The `/12` is the worst, because it sits inside a Terraform `azurerm_network_manager_ipam_pool`
resource formatted for direct copy-paste, and it silently widens the pool from four `/16`s
to sixteen. The OCI `/14` is next: a reader entering it into a route table gets a range
four `/16`s away from the one the article describes.

Replacements were checked for alignment, containment and overlap before being written. The
OCI block now mirrors the Azure block's shape exactly — a `/14` envelope, a `/16` first
region, and a `/15` future reservation — which is what the article says it is doing.

### The fifth, found by sweeping rather than reading

The reviewer stated it had verified the arithmetic "by direct computation… not by
eyeballing", and it had — but only across the worked plan and the sizing table. Extracting
**every** CIDR literal in the corpus and testing each found one more, in prose:

```
address-plans… :86   10.100.55.0/22  -> really 10.100.52.0/22
```

It sits in a list illustrating *scattered*, unsummarisable spokes. Three of the four
prefixes in that list are valid; the fourth was not. The point being made is scattering,
not malformation, so it is now `10.100.56.0/22`, which is both valid and still scattered.

**The sweep is now a repo script**, `scripts/check-cidr-alignment.py`. It scans the whole
knowledge base and exits non-zero on any misaligned literal. All 51 literals currently
pass. This is the first mechanical invariant this audit has produced, and it is worth
running before any future networking edit.

## Verification table

| # | Claim | How I checked it | Verdict |
|---|---|---|---|
| W1 | OCI reserves **3** addresses per subnet, not 2 | Oracle: "the first two addresses and the last in the subnet's CIDR are reserved by the Networking service" | **Confirmed** — and the composition was also wrong, being described as network plus broadcast |
| W2, W4–W6 | Four misaligned prefixes | Computed, see above | **Confirmed** |
| W3 | A `/22` has 1,019 usable, not 1,022 | 1024 − 5. The article states the five-address rule three lines later | **Confirmed** |
| W7 | Azure Firewall does not need `/25` for zone redundancy | Microsoft FAQ: "Does the firewall subnet size need to change as the service scales? **No, a /26 subnet is sufficient for all scaling scenarios**" | **Confirmed** |
| I1 | The two articles disagreed on the OCI reservation | Sibling had 3 and was right | **Confirmed** |
| I2 | The sizing table encodes Azure's reservation only | `/26 → 59` is 64 − 5 exactly, which distinguishes Azure's 5 from OCI's 3 | **Confirmed** |
| S1 | Men&Mice is now Micetro by BlueCat | BlueCat's own product page: "Micetro® DDI orchestration platform" | **Confirmed** |
| — | The ExpressRoute FAQ does not support the MACsec claim cited to it | Fetched the cited page: **zero** occurrences of "MACsec" or "encrypt" in 61,586 characters. The encryption page has 17 | **Confirmed** |

## A new citation failure mode

The MACsec citation is worth recording as its own category. It is not a dead link, not a
redirect, and not a JavaScript shell. It is a **live, current, topically adjacent page that
simply does not contain the claim**. Every previous citation check in this audit tested
whether a URL resolves. This one only failed because the reviewer fetched the page and
grepped it for the term it was cited for.

**Checking that a citation resolves is not checking that it supports the claim.**

## References added

Both short articles carried none, against 49 of 57 in the corpus. Three each were added,
every URL fetched and verified, drawn from sources the reviewer had already used to confirm
the articles' mechanism claims. Six articles still lack references, all in the known finops
and multicloud cohort due in B8.

## Not applied

- **U1 — OCI load balancer `/24` recommendation.** The reviewer spent its budget on the
  higher-consequence checks, correctly. Unverified; left as written. Oracle's load balancer
  subnet-sizing guidance would settle it.
- **U2 — whether OCI permits multiple DRGs per region.** Consistent with what the reviewer
  found but not directly confirmed. Oracle's service-limits page would settle it.
- **Virtual WAN's 50 Gbps per-hub ceiling**, which the reviewer suggested adding as missing
  material. Deferred: the article deliberately avoids numbers, and adding one figure
  without the surrounding capacity model would sit oddly. Worth revisiting in X1.

## Notes on the reviewer

The best coverage statement of the audit. Asked to show its greps rather than assert
completeness, it listed eleven searches **including the ones that returned nothing**, which
is what made its propagation claim checkable. That instruction came directly from the
previous batch's failure and it worked.

It also flagged its own sourcing honestly in three places: where evidence came from a
search snippet rather than a fetch, where it inferred general availability from the absence
of a preview banner rather than an explicit statement, and where Oracle's docs kept
returning navigation instead of body text after three attempts.

The one gap: its computational check covered the structured examples but not prose, and the
fifth misaligned prefix was in prose. Scope of a check matters as much as its rigour.
