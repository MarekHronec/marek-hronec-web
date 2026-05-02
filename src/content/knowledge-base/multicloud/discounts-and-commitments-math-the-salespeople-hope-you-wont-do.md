---
title: "Discounts and Commitments — The Math the Salespeople Hope You Will Not Do"
category: finops
tags: ["Azure", "OCI", "FinOps", "Reservations", "Savings Plans", "Universal Credits", "Cost Optimization"]
date: 2026-04-30
readTime: 12
level: intermediate
excerpt: "Reservations save 30–72%. Savings plans typically deliver moderate discounts with broader coverage. Universal Credits give discounts but lock in spend. The mechanism that fits your workload depends entirely on whether your workload actually fits the commitment shape — and most do not, exactly."
---

Cloud salespeople love discounts. They make a great slide. Up to 72% off pay-as-you-go. Some Windows scenarios reach 80% with Hybrid Benefit. Universal Credits offer attractive multi-year discounts. Read the slide and you would think the only question is "how much do we commit?"

The slide does not show what happens when the workload changes shape three months in, when the team migrates to a different VM family, when the region strategy shifts. The discount you committed to is still being charged. The workload it was supposed to discount is no longer there. You are paying for capacity you do not use.

This article is about doing the math honestly. The discounts are real and worth taking — selectively, for the right workloads, in the right amounts. The mistakes are common and expensive.

## The mechanism shapes

Both clouds expose similar commitment patterns at a strategic level, even though the commercial implementation differs substantially.

**Layer 1 — Per-resource commitments.** You pick a specific resource type (VM family, database SKU) in a specific region for a specific term. You get the deepest discount but you have committed to that exact thing. Azure calls these **Reservations**. OCI's closest equivalent for compute is **Compute Capacity Reservations**, although these are more about capacity guarantee than discount; for actual price discount on specific commitments, Oracle uses contractual mechanisms tied to **Universal Credits**.

**Layer 2 — Spend-based commitments.** You commit a specific dollar (or hour-equivalent) amount for a term. The platform automatically applies the discount to whatever eligible compute you happen to use. More flexible, smaller discount than per-resource. Azure calls these **Savings Plans for Compute**. OCI offers **Universal Credits with annual commitment** — commercially similar in that they reward committed spend, but implemented as a contractual purchasing model rather than an automated in-platform savings mechanism.

**Layer 3 — Spot / preemptible.** Heavy discount (60–90%) on capacity the cloud can take back at any moment. Azure **Spot VMs**, OCI **Preemptible Instances**. For workloads that genuinely tolerate interruption.

These layers stack. You can have a reservation covering your stable baseline, a savings plan covering the next layer of compute, and spot capacity covering bursty or fault-tolerant batch work. The mistake most organisations make is choosing one layer and forcing all workloads into it.

## Azure: the rules that bite

**Azure Reservations** typical discounts:

- 1-year term: ~30–40% off pay-as-you-go.
- 3-year term: ~50–72% off pay-as-you-go.
- Up to 80% on Windows Server VMs combined with Azure Hybrid Benefit (where eligible).

A reservation is *family-flexible* on most VM SKUs — you reserve a `D-series v5` family in a region, and any size within that family in that region matches. This flexibility helps; do not assume you need to predict the exact size.

You can exchange or return reservations under specific conditions. Microsoft has tightened this over time — historically generous return windows have become more restrictive. Read the current cancellation policy before assuming you can back out.

**Azure Savings Plans for Compute**:

- 1-year: typically in the low-to-mid double digits off pay-as-you-go.
- 3-year: commonly in the 15–45% range depending on service mix and workload profile, with higher figures possible in specific scenarios.
- Apply to compute: VMs, Dedicated Hosts, App Service, Container Instances, Functions Premium.

Azure Savings Plans are generally treated as fixed-term commitments with limited or no cancellation flexibility under standard terms — once you commit to a savings plan, you commit. Verify current Microsoft policy before purchasing. The flexibility is in *what* the spend covers, not in *whether* you can back out.

When both apply, **reservations consume usage first**, savings plans consume next, then pay-as-you-go. You can stack them.

```bash
# Querying current Azure reservation utilisation
az consumption reservation summary list \
  --grain monthly \
  --start-date 2026-04-01 \
  --end-date 2026-04-30 \
  --reservation-order-id <reservation-order-id>
```

The number to watch is **utilisation percentage**. As an operating heuristic, many teams target above 90–95%. Sustained utilisation below ~80% warrants review — at that level, the discount may not offset the underused commitment. Below ~50% often indicates structural overcommitment; exchange or cancel where the commitment terms permit.

Measure utilisation against **committed eligible spend**, not total cloud bill; otherwise the metric becomes meaningless. A reservation covering 10% of your estate at 100% utilisation looks strong in isolation but tells you nothing about the other 90%.

A quick sanity check formula:

```
Effective Discount ≈ Headline Discount × Utilisation Rate
```

*(Approximation for directional comparison; not contractual accounting. Actual economics depend on commitment coverage, baseline pricing, and what portion of spend is eligible.)*

## OCI: a different commitment shape

OCI's primary cost lever is **Universal Credits with annual commitment**. The contract structure:

- You commit to a negotiated annual or multi-year spend envelope (for example, €100k/year), depending on contract structure.
- You get a discount applied to the rate cards (varies by negotiation, often 15–30% off published list).
- Spending below your commitment still bills against the commitment.
- Spending above the commitment continues at the discounted rate.

This is structurally different from Azure reservations — it is a global discount on the rate card, not a per-resource lock-in. Useful for organisations with predictable annual cloud spend that don't want to manage individual reservations.

**OCI Compute Capacity Reservations** are different again: they reserve *capacity* (so you can launch instances even when the AD is constrained) without giving you a price discount. You pay the same rate; you just have guaranteed availability. Useful for capacity-critical workloads (DR sites that need to spin up at scale on-demand). Not a cost optimisation tool.

**OCI Preemptible Instances** offer ~50% off pay-as-you-go for compute that can be reclaimed with two minutes' notice. Comparable to Azure Spot, smaller discount, similar use cases.

```hcl
# OCI Preemptible Instance — Terraform pattern for batch worker
resource "oci_core_instance" "batch_worker" {
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
  compartment_id      = var.compartment_id
  shape               = "VM.Standard.E4.Flex"

  shape_config {
    ocpus         = 2
    memory_in_gbs = 16
  }

  source_details {
    source_type = "image"
    source_id   = var.image_id
  }

  preemptible_instance_config {
    preemption_action {
      type                 = "TERMINATE"
      preserve_boot_volume = false
    }
  }

  display_name = "vm-batch-worker-001"
}
```

The OCI mental model is closer to "agree on a discount with your account team, then use what you need." Azure's mental model is closer to "pre-purchase discrete chunks of compute capacity and apply them." Both work; they require different planning.

## The decision framework

Six questions, in order:

**1. Is the workload baseline stable for the term you'd commit to?**
If you cannot say with reasonable confidence that the workload will still be running this VM family in this region 12 months from now, do not buy a 1-year reservation. If you cannot say it for 36 months, do not buy a 3-year reservation. The savings plan is more forgiving here.

**2. Is the rest of the architecture going to change?**
A migration to a new VM family, a region shift, a refactor to containers — any of these can strand a reservation. Savings plans absorb VM family changes within compute. Reservations do not.

**3. What is your current utilisation pattern?**
Run cost analysis for the last 30–60 days. Find the steady baseline. That is what is reservable. Anything above the baseline is variable; price it pay-as-you-go or spot.

**4. Are you on Windows or do you have Software Assurance?**
Azure Hybrid Benefit drops the cost of Windows Server VMs significantly for customers with on-prem Windows licenses. Combined with reservations, this is where the headline 80% number comes from. Ignore it for Linux workloads.

**5. Can the workload tolerate eviction?**
If yes, spot/preemptible has the deepest discount. Batch processing, CI/CD agents, dev/test, simulation, ML training with checkpointing — all good fits.

**6. What is the exit risk?**
Reservations and savings plans both have term lengths. If you might leave the cloud entirely, or migrate to a different cloud, that is a discount you bought and abandoned. Account for the risk.

A common operating pattern: **reserve the predictable stable baseline — the portion you can forecast with reasonable confidence for the full term — savings plan or Universal Credits for the next layer of committed spend, pay-as-you-go for variable demand, spot or preemptible for tolerant workloads**. Do not try to commit your entire estate; unused commitment is more expensive than the pay-as-you-go premium on the variable part.

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>Right-size before you commit. The fastest way to waste a reservation is to commit to oversized VMs. Walk through the cost analysis, identify oversized resources, downsize them, <em>then</em> baseline what you have. The discount you should have gotten was on the right-sized workload, not the wasted-already workload. This sequence — right-size first, commit second — is documented in Microsoft's own guidance and consistently ignored in practice.</p>
  </div>
</div>

## When commitments go bad

The same patterns come up repeatedly:

**The phantom reservation.** A reservation purchased two years ago for a workload that has since been decommissioned. Nobody noticed. The reservation continues paying for capacity nobody uses. Fix: monthly utilisation review, mandatory.

**The over-flexed commitment.** A team buys a 3-year reservation for a service they expect to grow. Growth happens, but on a different VM family or in a different region. Reservation utilisation drops to 30%; effective discount disappears. Fix: prefer 1-year terms when there is real architectural uncertainty.

**The "we'll figure it out later" commitment.** Finance pushes for cost reduction. Someone buys reservations to hit the savings target without analysis. Months later, utilisation analysis shows the wrong VM family was reserved. Fix: never let procurement drive reservation purchases without operational input.

**The bundled commitment.** A multi-year Universal Credits commitment at OCI negotiated when budgets were higher. Workload reality came in under the commitment. The customer pays the commitment minimum regardless. Fix: negotiate annual rather than multi-year where the spend forecast is uncertain. Discount differential is rarely worth the lock-in.

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Reality Check</p>
    <p>The headline savings numbers (72%, 65%, 80%) only apply if your committed capacity is fully utilised. At 70% utilisation, the realised savings can drop sharply; depending on commitment structure, the effective rate may approach or even exceed pay-as-you-go economics. Vendors do not lead with this math because it makes the slide less exciting. Do the math anyway.</p>
  </div>
</div>

## Multicloud factor

Cross-cloud commitment portability does not exist in any meaningful commercial sense; optimisation remains cloud-local even in multicloud estates. Each cloud's discount programs are independent. You cannot apply an Azure reservation to an OCI workload, and you cannot apply OCI Universal Credits to Azure spend.

What you can do:

- Forecast each cloud's spend independently.
- Apply commitments to each based on its own utilisation pattern.
- Avoid the temptation to "shift workload to use up the underutilised commitment" — moving workloads is rarely cheaper than absorbing the commitment.
- Track utilisation on both sides with a single FinOps dashboard fed by both clouds' billing exports.

The portable discipline:

- Quarterly commitment review on both sides.
- Document what was committed, why, and when it expires.
- Rebalance ahead of expiration, not after.

## Closing checklist

- Right-size workloads before buying any commitment. Discounts on waste are still waste.
- Reserve the predictable stable baseline. Savings plan or Universal Credits for the next committed layer. Pay-as-you-go for variable demand. Spot or preemptible for tolerant workloads.
- Watch utilisation monthly. As a working heuristic, sustained levels below ~80% warrant review; below ~50% indicates structural overcommitment.
- Prefer 1-year terms when architectural uncertainty is real. The premium over 3-year is small compared to the cost of being wrong.
- Stack reservations + savings plans on Azure where eligible. The math usually works out.
- Don't commit Universal Credits multi-year unless your forecast is high-confidence. Annual commitments give you most of the discount with a fraction of the lock-in.
- Keep procurement and operations talking to each other. Commitments bought without operational input go bad most often.
- Document every commitment with expiry, owner, and review date. A commitment without an owner becomes a phantom commitment.
