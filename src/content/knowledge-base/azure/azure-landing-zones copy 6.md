---
title: "Azure Landing Zones: Scalable Cloud Foundations at Enterprise Scale"
category: azure
tags: ["Azure", "Landing Zones", "Cloud Adoption Framework", "Governance", "IaC"]
date: 2025-01-08
readTime: 11
level: advanced
excerpt: "An Azure landing zone provides the standardized foundation for all cloud adoption. Learn the architecture, design areas, platform vs. application zones, and the right deployment approach for your organization."
---

An Azure landing zone is the standardized and recommended approach for all organizations utilizing Azure. It provides a consistent way to set up and manage your Azure environment at scale, ensuring alignment with key requirements for security, compliance, and operational efficiency through platform and application landing zones. Every landing zone is built on a well-architected foundation aligned with core design principles across eight design areas.

## Architecture Overview

An Azure landing zone architecture is scalable and modular to meet various deployment needs. Repeatable infrastructure allows you to apply configurations and controls to every subscription consistently. Modules make it easy to deploy and modify specific components as requirements evolve.

The reference architecture centers on a management group hierarchy that organizes subscriptions by purpose:

- **Platform management group** — hosts shared services: identity, connectivity, and management subscriptions
- **Landing Zones management group** — hosts application landing zones, split into Corp and Online sub-groups
- **Sandboxes management group** — isolated environments for experimentation without policy inheritance
- **Decommissioned management group** — subscriptions staged for removal

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>Treat the reference architecture as a starting point, not a fixed template. Azure landing zones are designed to be tailored — adjust the management group hierarchy, policy assignments, and network topology to reflect your organization's governance model before you deploy anything.</p>
  </div>
</div>

## Platform vs. Application Landing Zones

Understanding the distinction between platform and application landing zones is the most important mental model in this architecture.

**Platform landing zone** provides shared services — identity, connectivity, and management — consumed by all application teams. One or more central platform teams manage these services. The three canonical platform subscriptions are:

- *Identity subscription* — Microsoft Entra Domain Services, PKI infrastructure
- *Connectivity subscription* — hub virtual networks, ExpressRoute/VPN gateways, Azure Firewall
- *Management subscription* — Log Analytics workspace, Azure Monitor, Update Management

**Application landing zone** contains the resources for a single workload across its environments (dev, test, prod). Each application landing zone is one or more subscriptions, pre-provisioned through code via a subscription vending process. Workload teams deploy their own resources inside the pre-configured subscription.

Application landing zones inherit Azure Policy definitions from parent management groups, ensuring governance without requiring the platform team to manage individual workloads.

## Application Landing Zone Management Approaches

There are three models for managing application landing zones. Choose based on your organization's maturity and team structure:

| Approach | Who manages | Best for |
|---|---|---|
| **Central team** | Central IT owns and operates the landing zone end-to-end | Regulated industries, high-compliance workloads |
| **Application team** | Platform team delegates the zone; app team self-manages | Product teams with DevOps maturity |
| **Shared** | Central IT manages the platform (e.g. AKS), app team manages workloads on top | Shared PaaS platforms across multiple teams |

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>In practice, most enterprises use a hybrid: central management for regulated workloads, application-team management for product engineering workloads. Model your management group hierarchy to support both without merging governance boundaries.</p>
  </div>
</div>

## The Eight Design Areas

Every Azure landing zone decision maps to one of eight design areas. Decisions in each area are interdependent — changes in one often constrain options in another.

1. **Azure billing and Microsoft Entra tenant** — enrollment hierarchy, tenant structure, EA/MCA agreement
2. **Identity and access management** — Entra ID, RBAC boundaries, Privileged Identity Management
3. **Management group and subscription organization** — hierarchy depth, policy inheritance, subscription scale limits
4. **Network topology and connectivity** — hub-spoke vs. Virtual WAN, ExpressRoute, DNS, private endpoints
5. **Security** — Microsoft Defender for Cloud, policy baselines, threat detection
6. **Management** — Log Analytics, monitoring strategy, update management, backup
7. **Governance** — Azure Policy, Blueprints (deprecated), regulatory compliance initiatives
8. **Platform automation and DevOps** — IaC toolchain, pipeline strategy, subscription vending automation

## AI Workloads in Landing Zones

A frequently asked question is whether AI workloads require a dedicated AI landing zone. They do not. Azure landing zone design areas — particularly identity and access management, network topology, security, and governance — are already sufficient to host AI workloads.

From the platform perspective, AI services (Azure OpenAI, Azure Machine Learning, Cognitive Services) are workloads deployed into application landing zone subscriptions like any other service. The governance controls, private endpoint policies, and network isolation patterns applied to standard workloads apply equally to AI workloads.

## Deploying Your Landing Zone

Microsoft recommends the Infrastructure-as-Code accelerator as the primary deployment path:

```bicep
// Azure Verified Module — Platform Landing Zone (Bicep)
module alz 'br/public:avm/ptn/lz/sub-vending:0.2.0' = {
  name: 'appLandingZone'
  params: {
    subscriptionAliasEnabled: true
    subscriptionBillingScope: '/providers/Microsoft.Billing/billingAccounts/${billingAccountId}/enrollmentAccounts/${enrollmentAccountId}'
    subscriptionAliasName: 'sub-app-prod-001'
    subscriptionDisplayName: 'sub-app-prod-001'
    subscriptionManagementGroupAssociationEnabled: true
    subscriptionManagementGroupId: 'mg-landing-zones-corp'
    subscriptionWorkload: 'Production'
  }
}
```

The three deployment options in order of recommendation:

1. **IaC Accelerator (Bicep or Terraform)** — recommended for all organizations with any IaC capability
2. **Azure Verified Modules standalone** — use AVM modules directly outside the accelerator for custom pipelines
3. **Portal accelerator** — suitable for organizations without IaC expertise, but limits future automation

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Critical Constraint</p>
    <p>Deploying via the portal accelerator creates resources that are difficult to bring under IaC management retroactively. If you anticipate scaling beyond 10 subscriptions, invest in IaC from day one — retrofitting state into Terraform or Bicep after a manual deployment is a significant operational cost.</p>
  </div>
</div>

## Subscription Vending

Subscription vending is the automated process by which new application landing zone subscriptions are provisioned on demand. A well-designed vending process:

- Accepts a request (via a self-service portal, API, or pull request)
- Creates the subscription under the correct management group
- Applies baseline policies and RBAC assignments
- Configures networking (peering to hub, DNS, private endpoint policies)
- Notifies the requesting workload team

```bash
# Example: trigger subscription vending via Azure DevOps pipeline
az pipelines run \
  --name "subscription-vending" \
  --parameters \
    subscriptionName="sub-ecommerce-prod-001" \
    managementGroupId="mg-landing-zones-corp" \
    environmentType="Production" \
    ownerObjectId="$(az ad user show --id team@contoso.com --query id -o tsv)"
```

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Operational Warning</p>
    <p>Never allow workload teams to create their own subscriptions and link them to management groups manually. Without vending automation, subscriptions land in the wrong management group, miss policy assignments, and require remediation that grows in cost with every ungoverned subscription added.</p>
  </div>
</div>

## Policy-Driven Governance

Azure Policy is the enforcement engine for landing zones. Policies are assigned at the management group level and inherited by all child subscriptions automatically. The key policy categories in a landing zone baseline:

- **Deny** — block non-compliant resource creation (e.g. public IP on certain tiers, non-approved regions)
- **Audit** — surface non-compliant resources without blocking deployment
- **DeployIfNotExists (DINE)** — automatically deploy required resources (e.g. diagnostic settings, Defender plans)
- **Modify** — remediate tags, SKUs, or configurations on existing resources

The Azure landing zone IaC accelerator includes a curated set of policy initiatives aligned to frameworks including CIS, NIST SP 800-53, PCI-DSS, and ISO 27001.