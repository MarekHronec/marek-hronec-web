---
title: "Azure FinOps and Observability Cost Optimization"
context: "Enterprise Azure Environment"
industry: "Enterprise IT"
role: "FinOps & Observability Optimization"
tags: ["Microsoft Azure", "FinOps", "Cost Management", "Observability", "KQL", "Log Analytics"]
featured: false
metrics:
  - label: "Optimization Approach"
    value: "Data-Led"
  - label: "Cost Reduction"
    value: "Double-Digit"
excerpt: "A multi-subscription Azure environment had accumulated unnecessary spend through oversized compute, orphaned resources, low-value telemetry, and alerting that had become too noisy to drive action. The work was a structured FinOps and observability optimization, not a one-off cleanup."
heroImage: "/images/case_study_02_detail.webp"
heroCaption: "Cost as a signal, not an outcome"
heroVersion: "V1.1"
titleHighlight: "FinOps and Observability"
platform: "Microsoft Azure, Azure Monitor, Log Analytics, KQL"
focus: "Data-led FinOps and observability optimization across a multi-subscription Azure environment"
principles:
  - "Cost visibility before cost cutting"
  - "Match resources to actual usage, not nominal capacity"
  - "Telemetry should earn its retention"
  - "Alerts that no one trusts are worse than no alerts"
  - "One-time cleanup becomes recurring waste — build the discipline instead"
outcomes:
  - title: "Double-digit cost reduction"
    description: "Compute rightsizing, removed unused resources, reshaped logging, stricter non-production runtime discipline."
  - title: "Sharper observability"
    description: "Operational, security and audit signals retained. Low-value collection dropped away."
  - title: "Credible alerting"
    description: "Lower volume, tuned thresholds. Operators began trusting alerts again."
  - title: "Repeatable governance"
    description: "Dashboards, budgets and review cadence built into the operating model."
---

## The Situation

An enterprise Azure footprint had grown unevenly across subscriptions and environments. Costs were technically visible — the bills arrived on time, the dashboards existed — but they were not operationally governed.

Logging had become a disproportionate spend driver. Compute was frequently overprovisioned. Unused and orphaned resources remained deployed long past their useful life. Lower environments were often left running longer than they needed to be.

Alerting had drifted in the same direction. Coverage had expanded in volume but not in value, and many notifications were no longer taken seriously. The monitoring stack had quietly become both a cost problem and an operational quality problem at the same time.

<h2 class="prose-role"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>My Role</h2>

I led the optimization end to end as a structured FinOps and observability exercise rather than a one-time cleanup. The framing was deliberate: cost cutting alone produces a temporary win, but recurring waste returns within a year. What was needed was a model the organisation could keep running.

The work moved across three layers.

At the **cost layer**: subscription-level analysis, resource discovery, identification of the largest contributors, and prioritisation against business value.

At the **platform layer**: compute rightsizing, removal of orphaned resources, off-hours controls for lower environments, and dashboards, budgets and alerts that would keep the gains visible.

At the **observability layer**: KQL analysis of log volume against billable size, retention strategy redesign, and alert tuning to restore operator trust.

A significant part of the role was making the case for *why* the sequencing mattered. Cost cleanup before observability would have produced a smaller saving and left the alert problem untouched. Observability cleanup before cost analysis would have missed the largest spend drivers. Doing them together, in order, was where the real improvement came from.

<h2><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>The Problem</h2>

The surface problem was spend. The deeper problem was that nobody owned it.

Costs were visible in the portal, but visibility on its own does not produce action. Without ownership, cost data becomes a passive report rather than an operating signal.

The same dynamic had taken hold in observability. Telemetry was collected because it was easy to collect, not because anyone had decided it was worth retaining. Alerts were configured because something looked monitorable, not because the alert would change someone's behaviour.

> Telemetry that nobody reads, and alerts that nobody trusts, are both forms of waste — they just bill differently.

The challenge was to turn cost and observability from passive byproducts of operating in cloud into actively governed parts of the platform.

## Architecture Decisions and Trade-offs

The optimization followed a deliberate sequence: understand the spend before changing it, match resources to actual usage before adding governance, and turn the improvements into a repeatable model rather than a single round of cleanup.

**Cost analysis before cost cutting.** I started with subscription-level cost analysis and resource discovery, identified the largest contributors, and prioritised areas where high spend coincided with low business value.

Cutting before analysing tends to remove the wrong things — cheap to do, expensive to explain afterwards.

**Logging treated as a measurable cost stream, not a feeling.** Log Analytics ingestion was the largest single optimization opportunity. Rather than debate logging volume in the abstract, I went directly at the billable data using KQL.

The primary tool was the dedicated `Usage` table, which exposes ingestion metrics (`Quantity`, `IsBillable`, `DataType`, `Solution`). When per-resource attribution was needed, system columns (`_BilledSize`, `_IsBillable`, `_ResourceId`, `Type`) gave the same view at workload level.

A representative pattern looked like this:

```kql
Usage
| where TimeGenerated > ago(32d)
| where StartTime >= startofday(ago(31d)) and EndTime < startofday(now())
| where IsBillable == true
| summarize BillableGB = sum(Quantity) / 1000 by Solution, DataType
| extend EstimatedCostEUR = round(BillableGB * <per_GB_price_EUR>, 2)
| sort by EstimatedCostEUR desc
```

That shape of query — billable volume by solution and data type, multiplied by the contracted per-GB price — turned ingestion from an opaque line item into a per-table, per-solution cost view. A complementary cross-table union against system columns gave the same view at the per-resource level.

Together, the two views answered the questions that actually drive optimization: *which tables are most expensive to ingest, which resources are driving those costs, and which of those costs are buying anyone real operational value.*

**Logging reshaped, not minimised.** With ingestion economics visible per table and per resource, the goal was never to log less. The goal was to log the right things at the right fidelity for each workload — enough for operations, troubleshooting, security and audit, and no more.

Some tables stayed at full fidelity. Others were filtered, sampled or moved to cheaper retention tiers. A few were stopped altogether once it became clear nobody had queried them in months.

**Alerts as a quality problem, not just a cost problem.** Reducing low-value alerts saved monitoring spend, but the more important effect was operator trust. A monitoring stack producing dozens of low-value alerts trains its operators to ignore alerts entirely.

Removing the noise made the remaining alerts credible again.

**Right-sized capacity over permanent headroom.** Overprovisioned resources in non-critical workloads represent silent ongoing waste. Rightsizing requires short-term effort but eliminates a continuous spend stream that delivers no business value.

**Repeatable governance over heroic cleanup.** A one-off cleanup gives a clean number for one quarter. Recurring waste returns quietly afterwards.

Dashboards, budgets, alert thresholds and review cadence were built into the operating model so the gains would not silently erode.

## What Made It Work

**Treating cost data as engineering data.** Querying the `Usage` table against `Quantity`, `IsBillable`, `Solution` and `DataType` is not an exotic technique, but it changes the conversation. Instead of debating whether logging is "expensive," the team could see exactly which categories were driving cost — Container Insights, custom logs, Azure Diagnostics, Perf, security tables — and decide retention deliberately.

Numbers ended arguments that opinions could not.

**Distinguishing untouched subscriptions from well-governed ones.** The strongest savings came from subscriptions that had not been reviewed in a long time. Already well-governed subscriptions offered smaller but still meaningful gains.

Recognising that distinction up front made prioritisation straightforward and prevented the cleanup from becoming a flat sweep across the whole estate.

**Pairing every cut with a control.** Removing a resource without adding a budget alert, or trimming logs without adjusting retention policy, produces a one-time saving and a recurring problem. Each optimization was paired with the governance change needed to keep it from drifting back.

<h2><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>The Outcome</h2>

A repeatable Azure cost optimization model rather than a one-off cleanup.

The largest improvements came from a combination of compute rightsizing, removal of unused resources, logging reduction and stricter non-production runtime discipline. The strongest savings came from subscriptions that had not been reviewed for a long time, while already well-governed subscriptions offered smaller but still meaningful gains.

Just as significant was what happened to observability quality. Logging was reshaped rather than reduced indiscriminately, so operational, security and audit signals stayed intact while low-value collection dropped away. Alerting volume came down, thresholds were tuned, and the remaining alerts became credible enough to act on.

Lower spend and better signal quality were the same outcome of the same exercise, not a trade-off between them.

## What I Took From It

Cloud cost work fails when it is treated as a number to reduce. It succeeds when it is treated as a signal of how the platform is being operated.

Oversized compute, orphaned resources, blanket telemetry and noisy alerts are all symptoms of the same thing: decisions that were never revisited after the initial deployment. The KQL pattern above made those decisions reviewable in concrete terms — gigabytes, tables, solutions, euros — instead of leaving them to instinct.

The parts worth doing differently next time: starting the observability cleanup earlier in the sequence, and making the cost-and-quality framing explicit from day one rather than discovering it during the work.

Operators reacted strongly when they realised the same cleanup that lowered the bill also made their alerts trustworthy again. That insight would have built engagement faster if it had been framed up front instead of emerging from the data.
