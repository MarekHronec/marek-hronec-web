---
title: "Shared Responsibility — For People Who Stopped Believing the Marketing"
category: multicloud
tags: ["Azure", "OCI", "Security", "Shared Responsibility", "Compliance"]
date: 2026-04-30
readTime: 12
level: beginner
excerpt: "The shared responsibility chart looks tidy on a slide and falls apart in production. Managed never means hands-off, the SLA rarely covers your application, and the line between provider and customer moves service by service. Here is what actually stays on you."
---

There is a chart you have seen a hundred times. A grid of boxes labelled IaaS, PaaS, SaaS down the side, security domains across the top, and the cells filled in green or blue depending on who is responsible. It is one of the most reproduced diagrams in cloud computing and one of the most misleading.

The diagram is not wrong, exactly. It is just incomplete in ways that matter. The grid implies a clean handover at each service tier — as if "managed database" meant the same thing in every cloud, every region, and every SKU. It does not. Real shared responsibility is service-by-service, sometimes feature-by-feature, and the gap between the chart and the contract is where breaches and outages quietly accumulate.

## What the chart actually says

The reasoning behind the standard chart is sound. The further up the stack you go, the more the provider does and the less you do. At IaaS you own everything from the OS upward. At PaaS the provider takes the OS, the runtime, and parts of the platform. At SaaS the provider runs everything except your data and your access decisions.

Microsoft publishes a version of this. Oracle publishes a version. AWS, Google, every major SaaS vendor — they all publish one. Read three of them side by side and the model is roughly the same shape. The difference is that everyone draws their own customer column slightly smaller than reality and their own provider column slightly larger.

The cleaner mental model is to split responsibility across **three layers** rather than two:

| Layer | Always the provider | Always you | Depends on the service tier |
|---|---|---|---|
| Physical | Datacenter, hardware, hypervisor, network backbone | — | — |
| Platform | (managed components only) | Configuration of what you deploy | OS, runtime, patching, scaling |
| Application & data | — | Your code, your data, your access decisions, your backups | (rarely the provider) |

The middle row is the messy one. That is where every meaningful argument about shared responsibility actually lives.

## What "managed" never means

Read enough incident postmortems and a pattern emerges. The phrase "we assumed the platform handled it" appears in roughly half of them. Managed services are wonderful at obscuring what they do not do. Some examples that bite people repeatedly:

**Managed databases do not back up your data the way you think they do.** Most managed database services provide automated backups or snapshots with default retention windows. That is not the same as a backup strategy; it is a recovery convenience with provider-defined limits. Long retention, point-in-time restore beyond the default window, geographically replicated backups for DR, immutable copies, and restore testing are configuration and operating-model choices you still own.

**Managed Kubernetes does not patch your application.** AKS and OKE reduce the operational burden around the control plane and provide mechanisms for node upgrades and patching, but they do not patch your container images, base images, Helm charts, CRDs, or controllers you installed. The biggest operational risk in managed Kubernetes usually lives in workloads and add-ons, not in the managed control plane.

**Managed identity does not manage your authorisation.** Entra ID and OCI Identity Domains manage authentication — they prove who someone is. Authorisation — what they can do once authenticated — is your RBAC, your group memberships, your conditional access policies, your IAM policies. The provider gives you the engine; the rules in the engine are yours.

**SaaS retention is not a backup.** Exchange Online, SharePoint, OneDrive, Teams, Salesforce, and other SaaS platforms all have their own deletion, retention, legal hold, and recovery semantics. Exchange deleted item retention is not the same as SharePoint recycle bin retention. Salesforce Recycle Bin retention is not the same as a backup. None of these mechanisms are a substitute for a recoverable, independently controlled backup that survives account compromise, malicious deletion, ransomware acting through an API, or a provider-side retention configuration mistake. If the data matters, define a backup and recovery model explicitly.

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Reality Check</p>
    <p>Gartner's often-cited prediction was that through 2025, the overwhelming majority of cloud security failures would be the customer's fault. Whether the exact percentage is perfect is less important than the direction of travel: the customer-controlled surface is huge — configuration, IAM, secrets, data classification, key rotation, network exposure, and workload design. The provider secures the cloud below the waterline. Most incidents happen at the waterline, where the chart looks tidy and reality does not.</p>
  </div>
</div>

## Reliability is also shared, and people forget that part

Most shared-responsibility conversations are about *security*. There is a parallel conversation about *reliability* that gets less attention and breaks more workloads in practice.

Microsoft's reliability documentation actually splits this into three explicit levels: **core platform reliability** (the underlying infrastructure, which is on Microsoft), **reliability-enhancing capabilities** (availability zones, region pairs, geo-redundant storage — Microsoft offers them, you choose whether to use them), and **applications** (your code, your architecture, your retry logic — entirely on you).

The trap is that the second level looks like it belongs to the provider because they built the feature. It does not. If your storage account is LRS instead of ZRS or GRS and a zone fails, the storage availability SLA is not the issue — your configuration choice is. The provider provided the option. The provider does not require you to choose it.

OCI structures this slightly differently but the same principle applies. Fault domains exist in every AD; you have to actually use them. Cross-region replication exists for object storage and databases; you have to actually configure it. The HA architecture is in your hands.

A useful rule of thumb: every reliability feature that exists in a cloud provider has, somewhere, been used incorrectly by a customer who then blamed the provider for the outage. If the configuration is yours, the outage is yours.

## What actually stays on you, on every service, every time

Here is the list I keep on hand. It is the part of shared responsibility that does not move regardless of which cloud, which service, or which SKU.

**Identity and access decisions.** Who can do what. The provider gives you the engine; the policies are yours. This is one of the largest and most persistent sources of cloud breaches across all providers.

**Data classification.** What is public, internal, confidential, restricted. The provider does not know and cannot know. Encryption defaults are good; classification is what tells you whether default encryption is enough.

**Key management policies.** Who controls the keys, how they rotate, who has break-glass access. Customer-managed keys exist; default platform-managed keys exist. The choice between them, and the consequences of that choice for sovereignty and compliance, is yours.

**Backup and recovery.** "The provider takes snapshots" is not a backup strategy. RPO/RTO objectives, retention windows, cross-region copies, restore testing — yours.

**Network exposure.** Whether your storage account, database, or function endpoint is reachable from the public internet. Defaults have been improving over the years (allowBlobPublicAccess defaulting to false on new storage accounts, for example), but the historical estate is full of things that are public by accident.

**Audit and compliance evidence.** The provider can attest to its own SOC 2 / ISO 27001 / PCI scope. You still have to produce evidence that *your* configuration is compliant. Defender for Cloud, OCI Cloud Guard, third-party CSPM tools help; they do not absolve you.

**Incident response.** When something goes wrong with your workload, the provider is not your incident commander. They will help with platform issues. The application incident is yours.

**Cost.** A surprising one to put on this list, but: nobody at Microsoft or Oracle is going to call you when your spend triples overnight. Cost is a reliability and security signal too, and the responsibility for noticing is entirely yours.

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>Build a service-by-service responsibility matrix for your top ten cloud services. One row per service, columns for: who patches it, who backs it up, who responds to its incidents, who owns its IAM model, who owns its network exposure. The exercise takes a couple of days. The output is a document that quietly answers "who deals with this" for the next five years. Make it part of every service onboarding.</p>
  </div>
</div>

## SaaS is the layer where shared responsibility gets weird

For IaaS and most PaaS, the shared responsibility model is fairly consistent across vendors. SaaS is where it splinters.

The split varies dramatically by SaaS product. With Microsoft 365, customers are responsible for data, identity, and configuration; Microsoft handles the platform. With Salesforce, similar. With ServiceNow, similar but with more application-layer responsibility on you because of the platform's customisability. With niche SaaS — most of the modern long tail of "we are a managed service" startups — read the contract, because the model can be anything from "we handle everything" to "we handle the runtime and you handle... actually most things."

The defensive heuristic: assume SaaS providers are responsible for *availability of the service* and *security of the platform*. Assume you are responsible for *your data*, *your access*, *your configuration*, *integrity of records*, and *whatever happens when the service goes away*. The contract may be more generous than this; do not bet on it without reading it.

The contract is the thing that actually defines responsibility. The shared responsibility chart on the marketing page is not the contract. The Master Services Agreement, the Data Processing Addendum, and the SLA together are the contract. Read all three before adoption.

## What the SLA does and does not cover

This is worth its own paragraph because it is the part vendors deliberately blur. SLAs are not insurance. They are a vendor's statement of confidence in the platform, with refunds expressed as service credits.

A few things SLAs commonly do *not* cover:

- Application-layer issues. Your code returning 500s does not breach the platform SLA.
- Misconfiguration. You set up a load balancer wrong; that is not an SLA event.
- Issues caused by design choices outside the SLA scope. If a service offers zone-redundant deployment and you choose a non-zonal configuration, the resulting outage may be your architecture problem, not a provider SLA event. Read the specific SLA.
- Issues during planned maintenance windows. Maintenance time is excluded from uptime calculations.
- Issues with services in preview. Almost every provider's SLA explicitly excludes preview services.
- Cascading effects. The platform SLA covers the platform. Downstream services that depended on it are not the platform's problem.

The credit if a real SLA violation occurs is typically 10–25% of the bill for the affected service for the affected period, capped. It is not "we pay your damages." It is a partial refund of the spend on the broken thing.

## Multicloud factor

The model is similar enough on Azure and OCI that the *intent* of shared responsibility is identical. The implementation differs in detail. The trap is when teams who learned the model on one cloud move to the other and assume the lines are in the same places.

A few specifics that move:

- **Default encryption posture.** OCI encrypts data at rest by default with Oracle-managed keys. Azure does too, with platform-managed keys. The customer-managed-key story differs: OCI Vault uses HSMs that meet FIPS 140-2 Security Level 3 for HSM-protected keys, and vaults are regional. Azure offers Key Vault Standard, Key Vault Premium, and Managed HSM; new HSM-backed Azure Key Vault Premium keys and Managed HSM use FIPS 140-3 Level 3 validated HSM platforms. Same principle, different compliance details, pricing model, and operational model.
- **Default network exposure.** OCI can assign an ephemeral public IP by default when an instance is created in a public subnet unless you clear the option. Azure VMs do not require a public IP, but portal workflows, templates, and quickstarts can still create one. Do not rely on memory or assumptions; enforce exposure rules in policy and IaC.
- **Default observability.** Azure makes you explicitly enable diagnostic settings on most resources if you want logs shipped to a central workspace. OCI emits Audit service events by default, but service logs, flow logs, and routing into a central destination still require design. The completeness of "what you get out of the box" is not symmetric.

The portable defence is to write your *own* shared responsibility matrix that is cloud-agnostic. List the responsibility — backup, patching, IAM, monitoring — and the implementation in each cloud. The matrix is the contract; the cloud-specific tools are how you fulfil it.

## Closing checklist

- Build a service-level responsibility matrix for every service in production. Update it when services change.
- Treat "managed" as a productivity feature, not a security feature. The security responsibilities below the OS shift to the provider; everything above the OS stays with you.
- Read the actual SLA before adopting any service. Note exclusions, credit caps, and what counts as "downtime."
- For SaaS specifically, read the MSA, DPA, and SLA together. The shared responsibility chart on the marketing page is not the contract.
- Test your backups by restoring them. A backup you have never restored is a hopeful theory.
- Test your DR plan by running it. A runbook that has never been executed is also a hopeful theory.
- Audit your IAM at least quarterly. Over-permissioned identities are one of the most persistent sources of cloud risk, and the cleanup never gets cheaper.
