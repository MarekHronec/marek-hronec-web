---
title: "IaaS, PaaS, and SaaS Without the Marketing Layer"
category: multicloud
tags: ["Azure", "OCI", "IaaS", "PaaS", "SaaS"]
date: 2026-04-30
readTime: 12
level: intermediate
excerpt: "Slide-deck definitions of cloud service models tell you nothing about how they behave under real workloads. This is the operational reality: what the provider actually manages, what stays on you, where the security model shifts, and where the lock-in is born."
---

Every cloud architect has sat through the IaaS-PaaS-SaaS pyramid slide. It is one of the least useful things in our industry. The pyramid tells you nothing about who gets paged at 3 AM when a managed service throttles, what your exit costs look like in three years, or why "serverless" sometimes means "you cannot run this anywhere else, ever." This article replaces the pyramid with something operational.

The honest framing is this: each step up the stack usually trades operational burden for portability. The trade is not always irreversible, but reversing it later is usually expensive. The further up you go, the faster you can ship — and the more deliberately you need to manage exit cost. Neither end is wrong. The mistake is picking a layer without understanding which trade you are making.

## What the layers actually mean in production

The textbook says IaaS is "infrastructure as a service" — VMs, networks, storage. In IaaS, you own the operating system upward and much of the cloud configuration around it: IAM assignments, network security rules, encryption choices, backup policy, monitoring configuration, and resilience design. The provider owns the physical infrastructure and virtualisation layer. Package management, kernel CVEs, log shipping, and certificate rotation are yours.

PaaS hands you the runtime. Azure App Service runs your container or your code; you stop thinking about kernels and start thinking about deployment slots and autoscale rules. OCI's API Gateway gives you a managed reverse proxy without you ever logging into the box that runs it. The provider takes the patching and the OS hardening, and gives you platform metrics — but application observability remains yours. Tracing, alerting logic, SLOs, dashboards, dependency visibility, and incident response stay on your side of the model. You give up some flexibility — you cannot SSH into the box, you cannot install arbitrary system libraries, and you discover one Tuesday that the runtime version you depended on is being deprecated in 90 days.

SaaS is the layer where you stop running anything. Microsoft Fabric, Salesforce, Microsoft 365, Oracle Fusion. You consume an API or a web UI. The provider runs the platform. You configure, govern, integrate, and manage access.

Where this breaks down in practice is that almost no real-world architecture lives in one layer. A typical workload has VMs for the database (IaaS), App Service for the web tier (PaaS), and Microsoft 365 for email (SaaS), with Key Vault holding the database password (PaaS) and Azure DNS handling lookups (PaaS). The shared responsibility model shifts at every component, and most outages happen at the seams.

## The two spectrums, side by side

Both Azure and OCI offer roughly the same shape, but the names are different and the lock-in profile is dramatically different at the top.

| Layer | Azure example | OCI example | What you give up moving up |
|---|---|---|---|
| IaaS | Virtual Machines, VNets | Compute, VCNs | OS portability stays. Vendor SDK calls do not. |
| Container PaaS | AKS, Container Apps | OKE, Container Instances | Worker images stay portable; control plane and add-ons (CSI drivers, CNI, ingress controllers) often do not. |
| App PaaS | App Service, Functions | Functions, API Gateway | Deployment model, runtime versions, scaling primitives. |
| Workflow PaaS | Logic Apps Consumption | OCI Process Automation | Designer-built workflows are highly proprietary. |
| Data PaaS | Azure SQL, Cosmos DB | Autonomous Database | Query syntax, performance characteristics, backup format. |
| SaaS | Microsoft Fabric, Microsoft 365 | Oracle Fusion Apps, NetSuite | Almost everything. You consume; you don't own. |

The pattern that matters: container-level PaaS keeps you reasonably portable because the container is the unit of deployment and Kubernetes is an open spec. App-level and workflow-level PaaS are where the trapdoors open. Data PaaS varies widely — managed Postgres is mostly portable; Cosmos DB and Autonomous Database can be portable only within narrower boundaries, depending on API choice, extensions, operational model, and surrounding integrations.

## Lock-in is born at the connector, not the runtime

Here is the thing vendors will not put on a slide: the service itself is rarely the lock-in. The lock-in lives in the integrations.

Logic Apps Standard is more portable than Consumption because it can be containerised and run on supported hybrid infrastructure — Microsoft re-platformed it onto the Azure Functions runtime, you can package it in a container, and deploy it to Azure Arc-enabled Kubernetes. On paper, that portability is real. But it applies to the workflow runtime, not to the managed connectors. The workflow uses the Office 365 connector, the Service Bus connector, the SharePoint connector. Those are managed connections living in Azure as separate resources, and managed connections carry their own identity bindings and trigger semantics that are Azure-hosted. Move the workflow runtime to another cloud and the connectors stop working. You did not migrate; you reimplemented.

The same is true for OCI Functions calling Autonomous Database via a Resource Principal, for Azure Functions binding to Cosmos DB through a managed identity, for Logic Apps using the SharePoint trigger. The runtime is portable. The umbilical cord is not.

The practical heuristic: count the proprietary integrations a workload uses. One or two may be a sprint. Five or six is usually a project. Ten or more is a strategic dependency.

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>When evaluating any PaaS or SaaS service, draw the integration map first. Not the architecture diagram — the integration map. Every line that crosses into a vendor-specific service is a lock-in vector. If you cannot delete that line in a week, the service is more locked-in than the marketing suggests.</p>
  </div>
</div>

## Where the SLAs actually live

This is the part vendors deliberately blur. A provider SLA on App Service, OCI Compute, or any other managed component applies to the provider-managed service boundary, not your application behaviour. If your code panics in a loop and returns 500s for two hours, that does not breach the SLA. If the underlying VM hosts run fine but the Front Door routing rule you deployed misroutes traffic, that does not breach the SLA either.

What does breach an SLA? Provider-confirmed downtime of the managed component, measured according to a definition the provider controls, with a refund expressed as a service credit you can spend only on the same vendor. SLAs are not insurance. They are a vendor's statement of how confident they are in their own platform, paid out in store credit. Plan accordingly.

## The decision lens

Ignore the pyramid. Ask these four questions in order:

1. **Where does the data live, and who owns its format on disk?** If the answer is "in OneLake as Delta Parquet" you have some portability. If the answer is "in Cosmos DB with proprietary indexing" or "in Autonomous Database with Oracle-specific extensions" you have very little.
2. **What proprietary connectors does this service depend on to be useful?** Strip them and ask whether what remains still solves the problem.
3. **What is the exit time?** Not the exit cost — the exit time. How long would it take a competent team to replace this service with something running elsewhere? If the answer is "a quarter," you have a manageable lock-in. If the answer is "a year," you have made a strategic bet whether you intended to or not.
4. **Does the SLA cover what actually matters to your business?** Almost always: no.

```bash
# A crude lock-in signal — count vendor-specific service references in your IaC
# This is a starting point for a conversation, not a score.

# Azure Terraform resources
grep -rE 'azurerm_(logic_app|function_app|linux_web_app|windows_web_app|cosmosdb|servicebus|eventgrid)' ./terraform/ | wc -l

# Azure ARM/Bicep resource types
grep -rE 'Microsoft\.(Logic|Web|DocumentDB|ServiceBus|EventGrid)/' ./infra/ | wc -l

# OCI Terraform resources
grep -rE 'oci_(database_autonomous_database|functions|apigateway|integration|ons|queue)' ./terraform/ | wc -l
```

The number is not the verdict. A thousand references to `azurerm_storage_account` means almost nothing — object storage is a commodity. Twenty references to `azurerm_logic_app_workflow` means you have built your business logic into a designer that exists nowhere else.

## Reversibility classification

For every service in your estate, classify exit difficulty. This is the column that belongs on every architecture review.

| Exit class | Meaning | Examples |
|---|---|---|
| **Low** | Open runtime or open data format; migration is mostly redeployment | AKS/OKE, managed Postgres, stateless HTTP functions with minimal platform bindings |
| **Medium** | Provider-specific operations, but data and logic are portable | App Service deploying a container, OCI API Gateway fronting a standard service |
| **High** | Proprietary APIs, managed connectors, designer-built workflows, or vendor-specific data features | Logic Apps Consumption, Cosmos DB with proprietary indexing, Autonomous Database with Oracle-specific extensions |
| **Strategic lock-in** | SaaS or proprietary data platform where exit is a programme, not a task | Microsoft Fabric, Oracle Fusion Apps, NetSuite |

Strategic lock-in is not wrong. Some workloads belong there deliberately. The problem is when a workload slides into the "Strategic lock-in" row without a decision ever being made.

## The IaaS-PaaS-SaaS decision table

A useful reference when evaluating whether to take a VM, a managed service, or a SaaS subscription:

| Pick | When |
|---|---|
| **IaaS (VM)** | You need the OS, custom kernel modules, third-party software with no managed equivalent, or compliance demands a specific build. You accept that patching, monitoring, and lifecycle are yours. |
| **Container PaaS (AKS/OKE)** | Your team can operate Kubernetes. You want elasticity, portability, and a deployment unit (the image) that survives a cloud change. |
| **App PaaS (App Service / Functions)** | You want to ship code, not infrastructure. You accept the runtime version is the vendor's call. The workload tolerates a rewrite if you ever need to leave. |
| **Data PaaS (managed Postgres)** | The database engine is open. Performance and backup tooling are vendor-specific but you can dump and restore to any other Postgres. |
| **Data PaaS (proprietary engine)** | The convenience genuinely outweighs the lock-in cost, and you have written down what that lock-in cost is in money and quarters. |
| **SaaS** | You are not building this; you are renting it. The question is not "should I leave?" but "what is the contract for leaving?" |

## Multicloud factor

The true multicloud strategy is not "deploy the same workload to two clouds." That is operational pain pretending to be resilience. The real strategy is: pick the right layer in the right cloud for the right workload, and abstract the seams.

- **Compute layer** is portable if you stay container-first. Kubernetes is the strongest widely adopted runtime abstraction for portable compute, but it is not the whole portability story — containers, Terraform/OpenTofu, OpenTelemetry, and OIDC are also meaningful cross-cloud abstractions.
- **Data layer** is portable if you stay open-format. Parquet, Iceberg, Postgres-compatible engines, Kafka APIs. Avoid proprietary indexing as a strategic default.
- **Identity layer** is portable if you stay protocol-first. OIDC for workload identity, SAML/OIDC for human identity, federate everything to one IdP outside both clouds.
- **Workflow layer** is the hardest. Logic Apps, Power Automate, OCI Process Automation are designer-first products. The workflow definition is rarely portable in any meaningful sense. If a workflow is business-critical, write it in code (Argo Workflows, Temporal, Step Functions on AWS — pick the most portable option) and accept that the visual designer is a productivity feature for low-stakes integrations only.

Most enterprises do not need true portability for every workload. They need *deliberate* lock-in: workloads where they have explicitly accepted the trade-off, with a known exit plan, in writing. The horror stories happen when teams accept the lock-in by accident, layer by layer, until one day someone asks "can we move this?" and the answer is "no, and we did not realize that."

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Reality Check</p>
    <p>"PaaS reduces TCO" is true at small scale and starts to crack at enterprise scale. Vendors never show the exit cost in the TCO calculator because by the time you need that number, you have already paid it. A common pattern: an organisation pays seven figures and a year of engineering time to migrate a Logic Apps estate that was originally adopted because it was "free to start." The free part was true. The leaving part was not in the brochure.</p>
  </div>
</div>

## Closing checklist

- For every PaaS or SaaS service in your estate, write down the proprietary connectors it depends on.
- For every workload, classify the data layer as *open-format* or *proprietary*. Make this column visible on every architecture review.
- Treat workflow PaaS (Logic Apps, Power Automate, OCI Process Automation) as business logic, not harmless plumbing. Version-control definitions where possible and assume migration means redesign, not lift-and-shift.
- Read the SLA before adoption. Not the marketing page — the actual contract. Note what is excluded and how credits are calculated.
- Maintain a "what-would-it-take-to-leave" estimate for each business-critical service. Update it yearly.
- Prefer container-level PaaS for strategic workloads where portability is a stated requirement. Use app-level PaaS deliberately when speed and managed operations matter more than exit flexibility.
- Never adopt a SaaS service without a documented and tested path for data export at termination.
