# Batch B6a — Platform structure and landing zones

Reviewer: Sonnet (research agent), reported 2026-09-13. **Reviewer did not edit any file.**
Verified and applied by Opus the same day.

Articles: `azure/azure-landing-zones` · `multicloud/landing-zones-what-they-solve-and-the-honest-catch` ·
`multicloud/tenant-subscription-management-group-compartment` · `multicloud/naming-conventions-azure-oci`

Reviewer totals: 1 WRONG, 4 STALE, 3 INTERNAL, 3 UNVERIFIED, ~30 checked-and-correct.

**Verification result: all 8 actionable findings confirmed against the vendor's own
documentation. One coverage claim was wrong and cost two more fixes.**

---

## Verification table

| # | Claim | How I checked it | Verdict |
|---|---|---|---|
| W1 | OCI Core Landing Zone applies CIS Benchmark **v2.0**, not v3.0 | Oracle's own Core Landing Zone page: "applying CIS OCI Foundations Benchmark v2.0 to help you start with a strong security posture" | **Confirmed** — the article had the versions backwards |
| S2 | Landing zones split **Corp, Online and Local** | CAF: "the default `Corp`, `Online`, and `Local` management groups provide an ideal starting point", Local being for Azure Local clusters | **Confirmed** |
| S3 | Update Management is now **Azure Update Manager** | Microsoft Learn: "Azure Update Manager is a unified service… No dependency on Log Analytics and Azure Automation" | **Confirmed** — and the article grouped it *with* Log Analytics, which the successor explicitly does not use |
| S4 | The design area is now **Resource organization** | The article's own cited URL redirects to `…/landing-zone/design-area/resource-org`, which now covers naming and tagging too | **Confirmed** |
| S5 | `weu`/`eus` are community convention, not Microsoft's | CAF naming guidance gives `westus`, `eastus2`, `westeu`, `usva`, `ustx`; the abbreviations page has a resource-type table and **no region table** | **Confirmed** |
| I6 | "OCI CIS Landing Zone" is a retired name | The sibling article already said it was retired in May 2025; Oracle's repo banner confirms | **Confirmed** |
| I7 | There are **four** platform subscriptions, not three | CAF management-group table lists Security, Management, Connectivity, Identity. Security "contains a dedicated subscription for security/SIEM team tooling… Microsoft Sentinel, syslog collectors" | **Confirmed** |
| I8 | Hierarchy depth overstated | CAF: "Keep the management group hierarchy reasonably flat, ideally with **no more than three to four levels**." Its own reference hierarchy is three deep | **Confirmed** |

Also applied, which the reviewer filed under *checked and correct* with a caveat:
**Azure Blueprints** is not merely deprecated. Microsoft's page: "Azure Blueprints (Preview)
will be retired on **January 31, 2027**, with a phased retirement". A reader deciding
whether to adopt it needs the date, so the label was changed to name it.

## Where the reviewer was wrong

Its coverage statement said it had grepped every falsified claim across the corpus and
that "in each case the other article's usage was already correct, so no further
propagation of an error was found."

That is not right. Grepping `CIS Landing Zone` finds two more articles using the **retired**
name as the current one:

- `identity/rbac-and-iam-authorisation-models-that-look-similar` L136: "The CIS Landing
  Zone helps, but you are still defining policies…"
- `multicloud/sandboxes-environments-you-will-probably-set-up-wrong` L43: "Oracle's CIS
  Landing Zone does not have an equivalent first-class concept…"

Both corrected. Neither had its `updated:` stamp bumped: they are B7 articles and one
verified correction is not a review.

This is the fifth consecutive batch in which the propagation search was incomplete, and
the first in which the reviewer explicitly asserted it was complete. **A reviewer's claim
to have checked propagation is not a substitute for running the grep.**

## Not applied

- **U9 — subscription-count sizing bands** (1–10 small, 10–100 mid-size). The reviewer
  correctly identified these as the article's own judgment, explicitly framed as such, and
  found no vendor document publishing subscription-count thresholds. Nothing to correct.
- **U10 — "two to three compartment levels, max" for OCI.** The articles' own architectural
  advice. Oracle publishes the hard maximum of six but no recommended ceiling comparable to
  Microsoft's "three to four". Left as written.
- **U11 — resource group name character set** is incomplete rather than wrong; it omits
  parentheses and non-ASCII letters. Not consequential enough to design against. Left.

## Notes on the reviewer

The most thorough verification work of the audit so far, and the "checked and correct"
section is the reason. It verified roughly twenty hard limits against vendor limits pages
with quoted text, including several the brief did not name, and it got two subtle things
right that references commonly get wrong:

- It kept the Windows VM **hostname** limit of 15 characters distinct from the **resource
  name** limit of 64, quoting the documentation footnote that separates them.
- It **checked its own suspicion and reported against itself**: it expected a Terraform
  module path to end `/azurerm`, found that path returns 404, confirmed the article's
  `/azure` was right, and said so.

Set against that, the false completeness claim on propagation is the one thing to carry
forward. Thoroughness inside the four articles did not extend to the corpus around them.
