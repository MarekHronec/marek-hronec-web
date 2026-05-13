---
title: "Source of Truth — Where Does Your Cloud Actually Live?"
category: devops
tags: ["Azure", "OCI", "IaC", "CMDB", "GitOps"]
date: 2026-04-30
updated: 2026-05-13
readTime: 11
level: intermediate
excerpt: "If you did not choose a source of truth, the live cloud chose for you. IaC repo, cloud APIs, Backstage, CMDB — pick deliberately and document the choice."
references:
  - title: "Terraform state — HashiCorp documentation"
    url: "https://developer.hashicorp.com/terraform/language/state"
    description: "How Terraform state works, why it is the source of truth for what Terraform manages, and best practices for remote state backends and locking."
    domain: "developer.hashicorp.com"
  - title: "Azure Resource Graph overview"
    url: "https://learn.microsoft.com/en-us/azure/governance/resource-graph/overview"
    description: "The query service for interrogating live Azure resource state at scale — the runtime complement to IaC repos for answering \"what actually exists right now.\""
    domain: "learn.microsoft.com"
  - title: "OCI Search with OpenSearch — resource query overview"
    url: "https://docs.oracle.com/en-us/iaas/Content/Search/Concepts/queryoverview.htm"
    description: "OCI's equivalent resource query service for discovering and filtering resources across compartments, the runtime source of truth for OCI estate inventory."
    domain: "docs.oracle.com"
  - title: "Backstage — software catalogue and developer portal"
    url: "https://backstage.io/docs/overview/what-is-backstage"
    description: "The CNCF project behind software catalogues that aggregate ownership and metadata across multi-cloud estates, often used as the unified inventory layer above per-cloud IaC repos."
    domain: "backstage.io"
---

Every cloud estate has a source of truth. The question is whether the source of truth is:

a) Your IaC repository, with the live cloud as a derivative.
b) The live cloud, with everything else as a fading reflection.
c) A CMDB that is out of date.
d) Some combination of the above that nobody can fully describe.

In well-run estates, IaC is the authority for intended state. The live cloud is observed continuously, and catalogues or CMDBs are downstream views — not competing truths. In the badly-run ones, the answer is (b) or (d). The transition from "the live cloud is whatever happened" to "intended state is declared, actual state is observed, and ownership is indexed" is one of the highest-leverage things a platform team can do, and one of the most frequently underinvested.

This article is about being deliberate. There is no clean, universal answer. There are choices, and being clear about your choices saves you from the slow-motion failure of having no choice.

## The four candidates

**The IaC repository.** Terraform, Bicep, Pulumi — whatever your IaC of choice. The repo is the source of truth; the live cloud is the result of applying it. Drift is detected and either remediated or absorbed back into the code.

**The live cloud.** Whatever is in Azure or OCI right now is correct, by definition. Everything else (IaC, CMDB, docs) is documentation of the past. You discover what is real by querying the cloud APIs.

**The CMDB.** A separate system (ServiceNow, Device42, an internal Postgres) that records what *should* exist, often populated by humans, sometimes auto-discovered. Often used for compliance and audit.

**Backstage / internal developer platform.** A catalogue surface that aggregates from multiple sources to present a unified view. Backstage is the most common but not the only option.

In practice, mature estates use a combination:

- **IaC repository, plus tool-specific state where applicable**, is the source of truth for what should exist. For Terraform/OpenTofu, that includes remote state. For Bicep/ARM, the template defines intended state, but the live Azure control plane remains part of how changes are evaluated.
- **Cloud APIs** are the source of truth for what does exist.
- **Backstage or an internal developer portal** is the catalogue surface for discoverability and ownership, backed by metadata stored in source-controlled repos.
- **CMDB** is the downstream system of record for compliance, change management, and cross-domain inventory.

The mistake is forcing one system to answer all four questions. It will fail. The better model is to define which system answers which question, then automate the flow between them.

## The IaC-as-truth model

If you commit to "the IaC repo is the source of truth," several things follow:

**Manual changes are not allowed.** Anything done in the portal or CLI without going through the repo is drift, and drift is bad. The platform team treats portal access as read-only for most users, with deployment access only via pipelines.

**Drift detection is automated.** Terraform or OpenTofu `plan` runs on a schedule, comparing the desired state in code and state files with the live cloud. A non-empty plan is investigated: either the code is updated to reflect an intentional change, or the live cloud is brought back to the declared state.

Bicep and ARM `what-if` can play a similar role for previewing deployment changes, but it is not the same as Terraform-style state-backed drift detection. Treat it as a deployment preview and drift signal, not as a complete source-of-truth mechanism.

**Disaster recovery means re-running the IaC.** If the cloud is destroyed, the repo can rebuild it. IaC can rebuild infrastructure. It does not restore data, secrets, certificates, DNS ownership, provider registrations, or external dependencies unless those recovery paths are designed separately. This is the gold standard but requires that secrets, state, and external dependencies are also recoverable.

**Auditability is built in.** Git history shows who changed what, when, and why (if commit messages are good). This is the audit story most regulators care about.

For Terraform/OpenTofu, the source of truth is not just the HCL repository. It is the combination of HCL, variables, provider versions, modules, and remote state. Lose the state file or let teams mutate it manually, and your source-of-truth story is broken even if the repository looks clean.

The trade-off: this model demands discipline and tooling. Drift detection is not free; running it on a schedule across a multi-account estate has a cost. Some resources are awkward to model in IaC (manual data, runtime configuration, things outside the cloud). And teams that fall behind on the IaC will accumulate drift faster than they can clear it.

```yaml
# Drift detection pipeline pattern
# Run nightly or weekly per environment

steps:
  - checkout
  - terraform init
  - terraform plan -detailed-exitcode -out=tfplan

# Exit code handling:
# 0 = no changes
# 1 = error
# 2 = changes detected; alert platform team or open an investigation ticket
```

The important part is not the specific CI tool. The important part is that drift detection runs outside the deployment itself, on a schedule, with clear handling for "no drift", "error", and "changes detected".

## When IaC-as-truth breaks down

Three scenarios where the model gets uncomfortable:

**Brownfield estates.** When you are taking over an estate that was built without IaC, getting to "IaC as truth" is a multi-quarter migration. You import resources into Terraform state, write the corresponding HCL, validate that `plan` shows no changes, and only then can you call that resource part of the IaC. For estates with thousands of resources, this is real work.

**Resources that are genuinely operated outside IaC.** Some things should not be in IaC — operational data that changes constantly, ML model weights deployed by a different pipeline, secrets that need to rotate. The model needs explicit carve-outs for these, with documentation of why each is excluded.

**Multi-team ownership.** When multiple teams deploy to the same scope (subscription, compartment) using different IaC tools, the unified "IaC repo as truth" breaks. Each team's repo is the source of truth for what it deploys; the cloud is the union. This is fine but requires coordination on shared resources.

## Backstage as the index, not the truth

A common mistake is treating Backstage (or any catalogue) as the source of truth. Backstage is great as an index — a way to find things, see ownership, browse documentation. It is not great as a source of truth because it is a derivative; it is populated from other systems and reflects them.

The pattern that works:

- IaC is the source of truth for *what should exist*.
- The cloud is the source of truth for *what does exist*.
- Backstage indexes both and presents the unified view.
- Ownership and metadata live in Backstage's `catalog-info.yaml` files in the same repos as the IaC, so they version together.

```yaml
# catalog-info.yaml — Backstage entity definition
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: payments-api
  description: Payments processing API
  annotations:
    github.com/project-slug: example-org/payments-api
    azure.com/resource-group: rg-payments-prod-weu-001
    oci.com/compartment: payments-prod
  tags:
    - tier-1
    - pci
spec:
  type: service
  lifecycle: production
  owner: payments-team
  system: payments
```

The catalogue file lives next to the code that owns the resource. When Backstage scans the repo, it finds this entry and presents the component. Backstage reflects source-controlled metadata; it should not become a parallel database of manually curated ownership facts.

Ownership metadata should live as close as possible to the thing being owned. For application services, that usually means `catalog-info.yaml` in the application repo. For platform resources, it may mean tags, module inputs, or metadata files in the platform repo. Backstage can aggregate ownership, but ownership should not be manually typed into Backstage as a second truth.

## CMDBs and the shape they fit

Traditional CMDBs (ServiceNow CMDB, Device42, BMC Helix) come from the on-prem world where discovery is hard and authoritative inventory is expensive. In the cloud, the cloud APIs are the authoritative inventory for cloud resources. The CMDB earns its keep when it connects those resources to business services, ownership, compliance evidence, change records, and non-cloud assets. Querying Azure Resource Graph or OCI Search gives you a broad, current inventory of cloud resources you have permission to see. That is usually far closer to reality than a manually maintained CMDB, but it is still not a full business-service model. The CMDB's role narrows.

Where CMDBs still earn their keep:

- **Compliance and audit.** Auditors often want a single tool of record. CMDB is the artefact they expect. Even if everything in it is auto-populated from cloud APIs, the *existence of the CMDB* is the artefact.
- **Cross-domain inventory.** Cloud + on-prem + SaaS + network gear + endpoints — the CMDB unifies these. No cloud-native tool covers all of them.
- **Change management workflows.** ITIL change advisory, request workflows, ownership escalation paths — these often live in the same suite as the CMDB.

Where CMDBs add overhead without value:

- Pure-cloud estates with no compliance requirement for one. Azure Resource Graph + OCI Search + Backstage can replace most CMDB functions for cloud-only inventory.
- Auto-discovery that is always 24+ hours behind. By the time the CMDB shows a resource, it may already be deleted.

The pragmatic stance for cloud-native organisations: treat the CMDB as a slow-moving system of record for compliance, populated by automated discovery from cloud APIs. Do not pretend it is the source of truth for cloud configuration; it is downstream.

:::tip[Architectural Pro Tip]
Document your source-of-truth choice explicitly in your platform docs. Not implicitly, not "well, we kind of use Terraform" — write it down. "The IaC repo is the source of truth for what should exist. The cloud APIs are the source of truth for what does exist. Backstage indexes both. The CMDB is a downstream system of record for compliance." Three sentences. New team members get up to speed in five minutes; the discipline becomes self-reinforcing.
:::

## Drift, and the eternal question

Drift between IaC and live cloud is a constant. It happens because:

- Someone made a manual change "just for a moment."
- A vendor updated a resource property in a way the IaC did not anticipate.
- Auto-scaling changed a count that was set to a fixed value in IaC.
- A managed identity got attached automatically by a service.

Drift is not always bad — sometimes it is the cloud doing the right thing. The question is whether to *codify* the drift (update the IaC to match) or *revert* it (push the IaC back to the cloud, undoing the drift).

Default to codifying for legitimate operational changes. Default to reverting for unauthorised changes. The line between them is judgment.

The mature pattern: drift detection produces a PR with the proposed change. A human reviews the PR and decides codify-or-revert. The PR is merged either way. The state stays consistent.

## Multicloud factor

Multicloud source-of-truth is the same model with different terraform providers and different cloud APIs. The IaC repo can have Azure and OCI resources side by side, in separate modules or interleaved.

Two common patterns:

**Single repo, multi-provider.** All cloud resources in one Terraform repo, separate modules per cloud. State files separated. Drift detection runs across both. Pro: single mental model. Con: state file management gets complex; team boundaries blur.

**Per-cloud repos, shared catalogue.** Separate Terraform repos for Azure and OCI, both feeding into a shared Backstage catalogue. Pro: clean ownership boundaries. Con: cross-cloud workloads have to coordinate releases across repos.

Per-cloud repos with shared catalogue tends to scale better. The boundary is clear; the catalogue gives you the unified view; team ownership maps cleanly. The single-repo approach works for small estates and gets unwieldy fast at scale.

## Closing checklist

- Choose your source of truth deliberately. Document the choice. Most mature orgs land on IaC repo for "what should exist," cloud APIs for "what does exist," Backstage for ownership index.
- For brownfield estates, plan a multi-quarter migration to IaC. Take it as a real project, not a side task.
- Run drift detection on a schedule. Daily or weekly is enough; monthly is too slow.
- Treat manual portal/CLI changes as bugs. Either codify or revert; do not accept "just leave it."
- Backstage is an index, not a source of truth. Populate it from your real sources.
- CMDBs earn their keep for compliance and cross-domain inventory. They are downstream from cloud APIs, not authoritative.
- For multicloud, prefer per-cloud IaC repos with a shared catalogue surface. Cleaner boundaries, easier scaling.
- Document your model in three sentences. New team members should understand the source-of-truth picture in five minutes.
