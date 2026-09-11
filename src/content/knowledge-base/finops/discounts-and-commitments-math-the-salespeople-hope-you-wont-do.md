---
title: "Discounts and Commitments — Test the Saving Against Actual Usage"
category: finops
tags: ["Azure", "OCI", "FinOps", "Cost Management"]
date: 2026-04-30
updated: 2026-09-11
readTime: 4
level: intermediate
excerpt: "Calculate break-even usage, separate billing discounts from capacity guarantees and test the downside before committing."
---

## A discount is conditional on matching usage

A lower unit rate does not automatically mean a lower total cost. You need enough eligible use to consume the commitment, in the right periods, under the matching rules.

[Azure Reservations](https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations) apply billing discounts to matching usage. Product, region, scope and supported flexibility matter. A billing reservation does not itself change the runtime state or establish a capacity guarantee.

[Azure savings plans](https://learn.microsoft.com/en-us/azure/cost-management-billing/savings-plan/savings-plan-overview) use an hourly spending commitment for eligible usage. Check the chosen plan’s eligibility and terms; do not assume every service or charge is covered. Different mechanisms can cover different portions of an estate, but that does not mean two discounts apply to the same charge.

For OCI, start with the actual purchasing agreement and [billing model](https://docs.oracle.com/en-us/iaas/Content/Billing/Concepts/billingoverview.htm). A contractual credit commitment is not interchangeable with a resource-specific Azure reservation. Read consumption eligibility, expiry and overage terms in the agreement.

## Work through a deliberately simple example

Assume an illustrative resource costs €1 per used hour on demand. A commitment costs €0.60 for every hour in a 100-hour comparison period, whether used or not. There are no additional fees or matching restrictions in this simplified example.

| Used hours | On-demand cost | Commitment cost | Difference |
|---|---|---|---|
| 100 | €100 | €60 | €40 lower |
| 80 | €80 | €60 | €20 lower |
| 60 | €60 | €60 | Equal |
| 40 | €40 | €60 | €20 higher |

Break-even utilisation is committed cost divided by full-period on-demand cost: 60 / 100 = 60%. That is an example derived from the assumed rates, not a recommended purchase threshold.

Real products introduce multiple meters, scopes and time windows. A busy final week may not consume an earlier hour’s unused commitment. Compare interval-level eligible usage rather than using the monthly average as proof.

## Run the downside case before purchase

Build three scenarios from your own forecast:

- **Expected:** the current eligible baseline continues.
- **Demand reduction:** usage falls because a customer leaves, a batch job ends or rightsizing succeeds.
- **Architecture change:** the workload moves to a different product, region or commercial agreement.

For each, calculate the remaining commitment, unmatched on-demand usage and costs outside the discount. Include storage, network, licences and operating work so that the comparison remains an architecture estimate.

A smaller flexible purchase can cost more per unit while reducing exposure to a wrong forecast. Conversely, a stable and well-matched workload may justify a larger commitment. The right proportion follows the evidence; a blanket “reserve 80%” rule does not.

## Keep a purchase record

Record the current offer and date, eligible usage, term, scope, effective rate, matching rules, renewal behaviour and verified exchange or cancellation conditions. Name a person responsible for utilisation and coverage reviews. Do not assume an exit option will be available just because an older article described one.

After buying, distinguish **utilisation** of the purchased benefit from **coverage** of eligible usage. Unused benefit and uncovered usage are different problems.

Use the [cost checklist](/cost#cost-planner) to gather the baseline first. Budget alerts and quotas remain separate controls; see [what spending guardrails actually do](/knowledge-base/finops/budgets-cost-caps-and-the-lie-of-spending-limits).
