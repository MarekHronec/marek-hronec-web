---
title: "Service Availability by Region — Why You Cannot Trust the Map"
category: multicloud
tags: ["Azure", "OCI", "Service Availability", "Cloud Adoption", "Governance", "Region Selection"]
date: 2026-04-30
readTime: 10
level: beginner
excerpt: "Cloud is not as 'everywhere' as the marketing suggests. Services launch in single US regions and stay there for a year. Sovereign clouds quietly miss capabilities. 'Available' often means 'eventually, with a support ticket.' Here is how to build a checklist that survives this."
---

There is a poster on every cloud provider's marketing page. It shows a map of the world dotted with regions and a confident headline about global reach. The poster is not lying. It is also not telling you the whole story.

What the poster will not tell you: that the new GPU SKU you need is in three US regions and nowhere else, that the AI service launched in preview is in West Europe but not yet in North Europe, that the database tier you priced into your TCO is unavailable in your sovereign region, or that the new region you thought solved your expansion plan does not yet support the specific tier, SKU, or zone-redundant configuration your design depends on. Service availability by region is one of the slowest-moving and least-discussed sources of plan-busting decisions.

## What "available" actually means

Three things hide behind the word *available*:

**Available, GA, in your region, in your subscription type.** This is what you want. The service is generally available, your region has it, and you have not been excluded by some commercial gating.

**Available in preview, in select regions, with feature gates.** Preview services often appear in one or two regions, sometimes globally limited to a small number of subscriptions. They have no SLA. The API surface can change. The pricing model can change. They are great for evaluation. They should be treated as evaluation-only unless the provider explicitly supports production use for that preview and the business accepts the support and SLA gap.

**Available, but not really.** This category bites people. The service is listed as available but requires capacity reservation, or works only in a specific subscription type, or works only with a specific commercial contract (Universal Credits on OCI, certain Azure offer types). On the marketing page it is "available." In practice, the answer to "can I deploy this today" is "open a support ticket and wait."

The portal does not always disambiguate these. The portal can sometimes expose combinations that later fail validation at deployment time — especially around SKU, capacity, preview, or regional constraints. OCI's console is generally more explicit about region eligibility, but the gating around Universal Credits versus other contract types is not always visible until you try.

## Where the truth lives

For Azure, two sources matter:

**Products available by region** — the canonical Azure starting point for checking service and regional availability. Treat it as the first source to verify, then confirm service-specific constraints in the relevant service documentation.

**The Azure service-specific reliability guides** — a per-service set of pages that lists not just region availability but AZ support, region-pair behaviour, and service-specific resilience characteristics. This is where you learn that "supported in West Europe" might mean "but only in two of the three AZs" or "but without zone-redundant pricing tier." For SKU and tier availability specifically, also check the service's own pricing and SKU documentation; regional availability and SKU availability are related but not identical.

For OCI:

**The Service Availability page** in OCI documentation — lists services by region. Less granular than Azure's reliability guides but accurate for "is this service in this region."

**The "What's New" feed** in the OCI console — the leading edge of region rollouts. New region launches and new service-in-region launches show up here first.

For both clouds, the *portal availability* is not the final authority. The portal is useful for discovery, but deployment-time validation can still fail because of SKU, capacity, preview, subscription, commercial, or regional constraints. Treat the documentation and the service-specific deployment rules as the source of truth, not the first dropdown that appears in the UI.

## The verification workflow before any HLD signoff

Before signing off on any architecture, run the workflow:

1. **List every Azure or OCI service the architecture depends on.** Not the categories — the specific services. "Azure SQL Database" is too broad; "Azure SQL Database Hyperscale tier with zone-redundant configuration in West Europe" is the right granularity.
2. **Verify each one against the canonical source.** Azure Products-by-Region or OCI Service Availability docs, plus the service's specific reliability guide where it exists.
3. **Note any service that is in preview.** Flag this in the design. Preview services are not production deployments; if your architecture depends on one, you are deferring a decision.
4. **Note any service that requires a specific subscription type or commercial gating.** Flag this for the procurement team to verify before contract signature.
5. **Verify capacity for any specialty SKU you need.** GPUs, large memory VMs, premium storage with specific IOPS targets — all of these can be capacity-constrained even in "supported" regions. Open a request to confirm capacity if your design depends on it.
6. **Lock approved services in policy.** This is the one most teams skip and most regret.

```kql
// Azure Resource Graph: enumerate resource types deployed in each region across the estate
Resources
| project subscriptionId, type, location
| summarize count() by location, type
| order by location asc, count_ desc
```

This query gives you a snapshot of *what is actually deployed where* across your estate. Run it monthly. The drift between "what we planned to deploy" and "what is actually deployed" is one of the most useful signals in cloud governance.

```bash
# OCI: enumerate resource types actually deployed in your tenancy
oci search resource structured-search \
  --query-text "query all resources" \
  --output json \
  | jq '.data.items | group_by(."resource-type") | map({type: .[0]."resource-type", count: length})'
```

This does not prove which services are available in a region. It shows what your estate is actually using, which makes it useful for drift checks against your approved-services register.

## What to flag in the design — a checklist that survives reviews

Architecture review is the right gate for catching service availability gaps, but only if you ask the right questions.

| Question | Why it matters |
|---|---|
| Are all services GA in all chosen regions? | Preview services do not belong in production architectures |
| Are AZs supported in all chosen regions for all critical services? | Resilience design depends on this; the assumption that AZs are universal is wrong |
| Are all required SKUs available in all chosen regions? | Especially specialty compute (GPUs, FPGAs, large-memory) and premium storage |
| Are there capacity reservations needed for any tier? | If yes, factor lead time into the rollout plan |
| Does the design depend on any service that requires a specific commercial contract? | If yes, procurement is a dependency |
| Are sovereign cloud regions involved? | Service availability in sovereign clouds lags commercial regions, often by 12+ months |
| Is the service portfolio stable across the chosen regions, or is one region missing newer services that the other has? | Regional asymmetry creates DR limitations |

This is the kind of checklist that lives on a wiki page everyone forgets to update. The fix is to treat it as part of the architecture review template — every design walks through these questions, every time, with verifiable answers.

## The sovereign cloud gap

Sovereign cloud regions deserve their own paragraph. Oracle operates separate sovereign realms such as OCI EU Sovereign Cloud, which are logically and physically separate from commercial OCI regions. Microsoft's current European sovereignty model is different: Microsoft Sovereign Cloud applies sovereignty controls and commitments across European datacenter regions rather than operating as a separate realm. Microsoft also operates Azure Government (US public sector) and Azure China (operated by 21Vianet) as distinct clouds with their own service catalogues.

In all cases, do not assume the commercial cloud service catalogue applies unchanged. Sovereign, government, China, and restricted-access environments often have a different and sometimes smaller service portfolio than the commercial equivalent. Some services are years behind. Some services may never come, particularly if they depend on global infrastructure (AI services that route through global GPU pools, edge services that depend on global CDN). If your workload is sovereign-bound, the service inventory is not "Azure or OCI's full catalogue"; it is the sovereign-region subset, which is smaller.

The implication for design: sovereign cloud workloads sometimes need a different architecture from their commercial equivalents. A pattern that uses Azure OpenAI in commercial regions may need a different approach in Azure Government because the same service is gated or absent. Plan for divergence.

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>Build a single internal "approved services per region" register. One row per service-region combination, with status (GA / preview / not available / restricted). Feed it from Azure's Products-by-Region page/table, Azure service reliability documentation, and OCI's service availability documentation on a schedule. Surface it in your platform portal so architects can self-serve. The register is more useful than any vendor page because it is filtered to <em>your</em> approved regions and <em>your</em> approved services.</p>
  </div>
</div>

## When previews lie about being stable

A small but important sub-topic. Some "preview" services are stable, well-supported, and roughly equivalent to GA in everything except the SLA. Others are genuinely experimental. Telling them apart matters.

The signals that a preview is mature enough to use:

- It has been in preview for 18+ months without API-breaking changes.
- It has documented production customers in case studies.
- The provider's support tier covers it (some support contracts exclude preview services).
- It has a posted GA roadmap.

The signals that a preview should stay out of production:

- It launched within the last six months.
- The API surface has changed in a backwards-incompatible way during preview.
- The provider's documentation explicitly says "do not use in production."
- The SLA exclusion is not just a formality; the service has had visible incidents.

Your risk appetite is yours, but be deliberate about it. "It works fine in preview" is true right up until it does not, and "preview" is exactly the period when the provider reserves the right to break things.

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Operational Warning</p>
    <p>Both vendors have, on multiple occasions, shipped services to "all regions" while quietly excluding sovereign clouds, China, or specific instance families. Read the small print of every announcement. The pattern that appears most often: an architect reads "now available globally," designs for global rollout, and discovers six weeks into deployment that the service is not in the two specific regions the architecture depended on.</p>
  </div>
</div>

## Multicloud factor

The multicloud version of this problem is multiplicative. You now have to verify service availability in two providers, in matched-or-comparable regions, for matched-or-comparable services. The complexity scales.

The defence is the same as the single-cloud case but doubled: a single internal register, fed from both providers' authoritative sources, filtered to the regions and services you actually use. The register is the source of truth for both Azure and OCI architectures. Without it, you spend architecture-review time discovering availability gaps that should have been caught by data, not by humans.

A subtle multicloud trap: comparable-but-not-identical services. Azure SQL Database and OCI Autonomous Database are *both* "managed databases" but they are not feature-equivalent. Azure OpenAI and OCI Generative AI are both "AI services" but the model catalogue differs. Cross-cloud availability matrices need to capture not just *is the service there* but *is the service equivalent*. This is harder than it sounds and worth doing for the top 10–20 services that anchor your architecture.

## Closing checklist

- Maintain an authoritative "approved services per region" register, fed from Azure Products-by-Region, Azure service-specific reliability and SKU documentation, and OCI Service Availability docs.
- Pin allowed services in policy where the service catalogue matters (Azure Policy `allowedResourceTypes`, OCI compartment quotas + IAM conditions).
- Treat preview services as flagged in design reviews. They are not GA; they may never become GA.
- Verify capacity for specialty SKUs (GPU, large memory, premium storage) before commitment, not after.
- Read sovereign cloud regions as having a smaller service catalogue. Plan for architectural divergence.
- For multicloud, build a comparable-services map for your top services. "Managed database" is not granular enough; the specific feature matters.
- Run a monthly drift check (Azure Resource Graph, OCI Search) against your approved-services list. Investigate exceptions.
