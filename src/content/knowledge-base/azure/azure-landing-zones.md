---
title: "Azure Landing Zones: Scalable Cloud Foundations at Enterprise Scale"
category: azure
tags: ["Azure", "Landing Zones", "Cloud Adoption Framework", "Governance", "IaC", "OCI"]
date: 2025-01-08
updated: 2026-05-13
readTime: 11
level: advanced
excerpt: "The standardised foundation for Azure adoption at scale. Architecture, design areas, platform vs. application zones, and the right IaC deployment approach."
references:
  - title: "Azure landing zone — Cloud Adoption Framework"
    url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/"
    description: "The authoritative reference architecture and decision guidance for designing and deploying Azure landing zones, including the eight design areas and deployment accelerators."
    domain: "learn.microsoft.com"
  - title: "Management groups overview"
    url: "https://learn.microsoft.com/en-us/azure/governance/management-groups/overview"
    description: "How Azure management groups work, their hierarchy limits, and how policy inheritance flows from parent to child subscriptions."
    domain: "learn.microsoft.com"
  - title: "Subscription vending"
    url: "https://learn.microsoft.com/en-us/azure/architecture/landing-zones/subscription-vending"
    description: "Architecture patterns and reference implementation for automating the provisioning of application landing zone subscriptions on demand."
    domain: "learn.microsoft.com"
  - title: "Azure Policy overview"
    url: "https://learn.microsoft.com/en-us/azure/governance/policy/overview"
    description: "Reference for Azure Policy effects — deny, audit, DeployIfNotExists, and Modify — the enforcement engine for landing zone governance at management group scope."
    domain: "learn.microsoft.com"
  - title: "ALZ-Bicep — Azure Landing Zones IaC accelerator"
    url: "https://github.com/Azure/ALZ-Bicep"
    description: "The official Bicep-based IaC accelerator for deploying the full landing zone platform, including management groups, policies, and connectivity subscriptions."
    domain: "github.com"
---

An Azure landing zone is the standardised and recommended approach for all organisations adopting Azure at scale. It provides a consistent way to set up and manage an Azure environment, ensuring alignment with key requirements for security, compliance, and operational efficiency through platform and application landing zones. Every landing zone is built on a well-architected foundation aligned with core design principles across eight design areas.

## Architecture Overview

An Azure landing zone architecture is scalable and modular. Repeatable infrastructure allows configurations and controls to be applied consistently to every subscription. Modules make it straightforward to deploy and modify specific components as requirements evolve.

The reference architecture centres on a management group hierarchy that organises subscriptions by purpose:

- **Platform management group** — hosts shared services: identity, connectivity, and management subscriptions
- **Landing Zones management group** — hosts application landing zones, split into Corp and Online sub-groups
- **Sandboxes management group** — isolated environments for experimentation without policy inheritance
- **Decommissioned management group** — subscriptions staged for removal

## Platform vs. Application Landing Zones

Understanding the distinction between platform and application landing zones is the most important mental model in this architecture.

**Platform landing zone** provides shared services — identity, connectivity, and management — consumed by all application teams. One or more central platform teams manage these services. The three canonical platform subscriptions are:

- *Identity subscription* — Microsoft Entra Domain Services, PKI infrastructure
- *Connectivity subscription* — hub virtual networks, ExpressRoute/VPN gateways, Azure Firewall
- *Management subscription* — Log Analytics workspace, Azure Monitor, Update Management

**Application landing zone** contains the resources for a single workload across its environments (dev, test, prod). Each application landing zone is one or more subscriptions, pre-provisioned through code via a subscription vending process. Workload teams deploy their own resources inside the pre-configured subscription.

Application landing zones inherit Azure Policy definitions from parent management groups, ensuring governance without requiring the platform team to manage individual workloads.

## Application Landing Zone Management Approaches

There are three models for managing application landing zones. In practice, most organisations use a combination — central management for regulated workloads and application-team management for product engineering workloads is the typical split. Design the management group hierarchy to support this mix without merging governance boundaries.

| Approach | Who manages | Best for |
|---|---|---|
| **Central team** | Central IT owns and operates the landing zone end-to-end | Regulated industries, high-compliance workloads |
| **Application team** | Platform team delegates the zone; app team self-manages | Product teams with DevOps maturity |
| **Shared** | Central IT manages the platform (e.g. AKS), app team manages workloads on top | Shared PaaS platforms across multiple teams |

## The Eight Design Areas

Every Azure landing zone decision maps to one of eight design areas. Decisions in each area are interdependent — changes in one often constrain options in another.

1. **Azure billing and Microsoft Entra tenant** — enrolment hierarchy, tenant structure, EA/MCA agreement
2. **Identity and access management** — Entra ID, RBAC boundaries, Privileged Identity Management
3. **Management group and subscription organisation** — hierarchy depth, policy inheritance, subscription scale limits
4. **Network topology and connectivity** — hub-spoke vs. Virtual WAN, ExpressRoute, DNS, private endpoints
5. **Security** — Microsoft Defender for Cloud, policy baselines, threat detection
6. **Management** — Log Analytics, monitoring strategy, update management, backup
7. **Governance** — Azure Policy, Blueprints (deprecated), regulatory compliance initiatives
8. **Platform automation and DevOps** — IaC toolchain, pipeline strategy, subscription vending automation

:::tip[Architectural Pro Tip]
Treat the reference architecture as a starting point, not a fixed template. Azure landing zones are designed to be tailored — adjust the management group hierarchy, policy assignments, and network topology to reflect your organisation's governance model before deploying anything. The eight design areas are interdependent; resolve billing and IAM first, then network topology, then governance — changes in those three areas constrain everything else.
:::

## AI Workloads in Landing Zones

A frequently asked question is whether AI workloads require a dedicated AI landing zone. They do not. The eight design areas — particularly identity and access management, network topology, security, and governance — are already sufficient to host AI workloads.

AI services (Azure OpenAI, Azure Machine Learning, Cognitive Services) are workloads deployed into application landing zone subscriptions like any other service. The governance controls, private endpoint policies, and network isolation patterns applied to standard workloads apply equally to AI workloads.

## Deploying Your Landing Zone

Microsoft recommends the Infrastructure-as-Code accelerator as the primary deployment path. Deploying via the portal accelerator creates resources that are difficult to bring under IaC management retroactively — if the estate is expected to grow beyond a handful of subscriptions, invest in IaC from day one.

```bicep
// Azure Verified Module — Platform Landing Zone (Bicep)
// Pin to the current AVM release; verify the module index at aka.ms/avm/moduleindex before deploying.
module alz 'br/public:avm/ptn/lz/sub-vending:<pin-current-version>' = {
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

1. **IaC Accelerator (Bicep or Terraform)** — recommended for all organisations with any IaC capability
2. **Azure Verified Modules standalone** — use AVM modules directly outside the accelerator for custom pipelines
3. **Portal accelerator** — suitable for organisations without IaC expertise, but limits future automation

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

:::warning[Reality Check]
Never allow workload teams to create their own subscriptions and link them to management groups manually. Without vending automation, subscriptions land in the wrong management group, miss policy assignments, and require remediation that grows in cost with every ungoverned subscription added. The automation is not optional at scale — it is the only way to keep policy coverage complete.
:::

## Policy-Driven Governance

Azure Policy is the enforcement engine for landing zones. Policies are assigned at the management group level and inherited by all child subscriptions automatically. The key policy categories in a landing zone baseline:

- **Deny** — block non-compliant resource creation (e.g. public IP on certain tiers, non-approved regions)
- **Audit** — surface non-compliant resources without blocking deployment
- **DeployIfNotExists (DINE)** — automatically deploy required resources (e.g. diagnostic settings, Defender plans)
- **Modify** — remediate tags, SKUs, or configurations on existing resources

The Azure landing zone IaC accelerator includes a curated set of policy initiatives aligned to frameworks including CIS, NIST SP 800-53, PCI-DSS, and ISO 27001.

## Multicloud factor

OCI has its own landing zone framework — the OCI Landing Zone (also known as the OCI CIS Landing Zone) — that provides a comparable baseline: compartment hierarchy, IAM policies, VCN configuration, and security posture aligned with CIS benchmarks. The structural differences are significant.

Where Azure uses management groups plus subscriptions, OCI uses compartments. Where Azure uses Azure Policy deny and DINE assignments, OCI uses Security Zones and IAM policies. Where Microsoft Defender for Cloud provides the security posture management layer, OCI Cloud Guard fills the equivalent role. The intent of each layer is the same; the mechanism differs enough that a design built for one cloud does not transfer directly to the other.

For multicloud estates running both, the two landing zone frameworks need to be designed in parallel with shared intent but different implementations. The workload taxonomy from the naming and tagging articles applies directly here — the same `<bu>-<workload>-<env>` pattern, the same tag schema, and the same identity federation model should span both clouds, while the subscription and compartment hierarchy is cloud-specific. Document the mapping between the two frameworks in an architecture decision record before either side starts deploying.

## Closing Checklist

- Define the management group hierarchy before deploying anything. Decisions here constrain subscription placement, policy inheritance, and network topology for the lifetime of the estate — they are among the hardest to change post-deployment.
- Separate platform landing zones (identity, connectivity, management) from application landing zones from the start. Platform teams own the former; workload teams own the latter.
- Choose IaC (Bicep or Terraform accelerator) as the deployment path from day one. Portal deployments create resources that are difficult to bring under IaC retroactively; retrofitting state after a manual deployment is a significant operational cost.
- Implement subscription vending automation before the estate grows beyond a handful of subscriptions. Manual subscription creation without vending produces ungoverned subscriptions that accumulate governance debt faster than they can be remediated.
- Assign Azure Policy at the management group level, not at individual subscriptions. Baseline policies — deny, audit, DINE, modify — should be inherited automatically, not applied by workload teams.
- Use all three management approaches where appropriate: central for regulated workloads, application-team for product engineering, shared for PaaS platforms. Design the management group hierarchy to support this mix without merging governance boundaries.
- For AI workloads, there is no separate AI landing zone requirement. AI services are application workloads deployed into standard application landing zone subscriptions, subject to the same governance controls as any other workload.
- Review the eight design areas before making irreversible decisions. Billing hierarchy, IAM boundaries, and network topology are the three areas that cost the most to restructure after the fact.
