---
title: "Cloud Adoption Through Effective Governance"
context: "Slovak Public Administration"
industry: "Government / Public Sector"
role: "Cloud Architecture & Governance"
tags: ["Cloud Governance", "Public Sector", "Microsoft Azure", "Oracle Cloud Infrastructure", "FinOps", "Security"]
featured: true
metrics:
  - label: "Adoption Model"
    value: "Governed"
  - label: "Architecture"
    value: "Cloud-Native"
excerpt: "Public-sector cloud adoption is not only an infrastructure problem. It requires a governed model for service selection, onboarding, identity, network boundaries, cost control and operational responsibility."
heroImage: "/images/case_study_01_detail.webp"
heroCaption: "Governance as navigational aid"
heroVersion: "V2.4"
titleHighlight: "Effective Governance"
platform: "Microsoft Azure, Oracle Cloud Infrastructure"
focus: "Governed cloud adoption model and operating framework"
principles:
  - "Central control where it matters"
  - "Project ownership where it belongs"
  - "Security and compliance by design"
  - "Cost visibility from day one"
  - "Documented patterns over hero work"
outcomes:
  - title: "Reusable adoption model"
    description: "Landing zone, identity, network and governance patterns instead of rebuilding them independently."
  - title: "Safer adoption"
    description: "Clear guardrails reduce risk and increase trust."
  - title: "Cost under control"
    description: "Tagging, budgets, quotas and reviews made cloud spend visible from the start."
  - title: "Knowledge transfer"
    description: "Documentation, consultations and trainings helped turn a small team's expertise into repeatable capability."
---

## The Situation

A small cloud team was responsible for building and operating a public cloud capability used across Slovak public administration. The work covered Microsoft Azure and Oracle Cloud Infrastructure, including architecture, governance, procurement support, onboarding, troubleshooting, FinOps, security alignment, documentation and knowledge transfer.

The scope was larger than the team. That constraint shaped the operating model: anything that depended on repeated manual work or individual memory had to become documented, delegated, standardised or automated. Otherwise the team itself would become the bottleneck for public-sector cloud adoption.

<h2 class="prose-role"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>My Role</h2>

The most important work was upstream of any architecture diagram: deciding what the government cloud should actually be. What services should be offered, to whom, under what conditions. What the operating model should look like. What public-sector organisations should be able to do themselves, and what should remain centrally controlled. Why a governed model was the right answer in the first place, and how to defend that direction to stakeholders who had different priorities.

That strategic and directional work shaped everything that followed. Once the model was agreed, my contribution moved across cloud architecture, governance and hands-on platform work — landing zone design, network and identity guardrails, onboarding patterns, FinOps practices, documentation and direct consultations with public-sector organisations adopting cloud.

A significant part of the role was translating cloud architecture into rules, reusable patterns and operating practices that could be understood and approved by project teams, vendors, security stakeholders and non-cloud decision makers. The technical fluency mattered, but the harder skill was making cloud strategy legible to people who do not work in cloud every day.

<h2><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>The Problem</h2>

Public-sector cloud adoption is rarely limited by the availability of infrastructure. The harder problem is making cloud usable in a way that is secure, accountable, repeatable and defensible in reviews and audits.

Without a structured model, adoption fragments quickly: isolated subscriptions, unclear responsibilities, inconsistent identity, duplicated infrastructure, weak documentation and unmanaged cost. In public administration, these are not purely technical problems — they affect trust, procurement confidence and the willingness of organisations to adopt cloud at all.

> Trust, once lost, is expensive to rebuild.

The challenge was to create a coherent operating model that could survive personnel changes, vendor changes, audits and the long lifecycle of public-sector systems.

## What the Work Covered

This was not a single project with a clean architecture diagram. It was a continuous operating responsibility with several streams running in parallel.

**Procurement and vendor management.** Specifying cloud services in line with public procurement rules, evaluating offerings, supporting commercial review, and translating cloud commercial models into something that could pass legal and financial review.

**Architecture and platform engineering.** Landing zone topology — Hub & Spoke on Azure, equivalent patterns on OCI — including shared network, firewall, DNS, identity and policy components. Terraform and GitHub Actions baselines that organisations inherited rather than rebuilt.

**Governance and policy.** Naming, tagging, RBAC, lifecycle, decommissioning and security baselines, written as documents that could be referenced in audits, not just as wiki pages.

**Onboarding and consultations.** Direct work with each organisation: requirements, design reviews, hands-on setup, identity integration, network connectivity, troubleshooting. The technical work was usually the easy part. The organisational work of aligning expectations was where most time went.

**FinOps.** Cost visibility built into the onboarding flow — tagging, budgets, alerts, regular reviews — to catch unmanaged spend before it became a problem.

**Security and compliance.** Aligning the platform with national IT governance requirements (zákon č. 95/2019 Z. z. o ITVS), NBÚ classification expectations and emerging NIS2 alignment. Producing architectural quality reviews used to assess other public-sector projects against the same standards.

**Advocacy and knowledge transfer.** Conferences, meetups, internal training, written guidance and the slow institutional work of building cloud literacy — so the next organisation onboarding did not need the team in the room for every decision.

## Architecture Decisions and Trade-offs

The model followed a simple principle:

> Centralise what creates systemic risk, delegate what should remain owned by the project.

*Centralised:* network connectivity, firewall, DNS, identity guardrails, policy baselines, security classification mapping and FinOps instrumentation.

*Delegated:* application architecture, data design, runtime configuration and day-to-day workload operation. Organisations remained responsible for their systems; the platform provided the guardrails underneath.

**Standardisation over flexibility.** Standard templates and onboarding rules reduced project-level freedom, but improved security, auditability, handover and operational consistency. At national scope, designing a fully custom architecture for every project would not have been sustainable.

**Control over speed.** Subscription provisioning and onboarding were not treated as a five-minute self-service action. The process introduced deliberate friction — enough review, ownership clarification and documentation to make cloud consumption safe and repeatable. The friction was a feature of the model, not a flaw to apologise for.

**Cloud-native ambition versus legacy reality.** New systems were steered toward PaaS and SaaS patterns. Legacy migrations sometimes required IaaS, but those choices had to be justified and documented, not assumed.

**FinOps as architecture, not afterthought.** Tags enforced via policy. Budgets configured at onboarding. Cost visibility built into the platform from day one — catching problems that, in other public-sector cloud rollouts, surface only at year-end.

## What Made It Work

Three things made the model workable.

**Documentation discipline.** Architecture decisions, onboarding runbooks, governance policies, troubleshooting playbooks — written down because the team could not also be the institutional memory.

**Saying no, well.** Public-sector environments will absorb infinite scope if allowed. Declining cleanly, explaining why, and offering the path that did fit the model — that protected the platform and, paradoxically, made stakeholders more willing to engage with the constraints that stayed.

**Reducing ambiguity.** The platform worked because responsibilities were made explicit. Each organisation needed to understand what was centrally governed, what remained under project ownership, how onboarding worked, and what was expected around identity, networking, cost control, documentation and operations. Consultations and design reviews were used to turn those expectations into practical decisions, not just written policy.

<h2><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>The Outcome</h2>

A governed cloud capability that public-sector organisations could onboard into instead of designing their own cloud foundation from scratch. The model created reusable patterns for landing zones, identity, networking, security guardrails, cost visibility and operational ownership, supported by documentation and review practices that made the architecture easier to explain, audit and hand over.

Just as importantly, the work built institutional cloud capability beyond the core team. Through consultations, training, written guidance, conferences and architectural reviews, the cloud model became something organisations could understand and reuse — not just something centrally operated for them.

## What I Took From It

Public-sector cloud architecture succeeds when the technical design is supported by clear ownership, reusable standards and documentation that survives beyond any individual or team. The hardest engineering problem was rarely the engineering. It was building a model a small team could operate at national scale without becoming the bottleneck — and without quietly accumulating undocumented complexity that punishes whoever inherits it.

The parts worth doing earlier next time: documentation and FinOps instrumentation. In both cases, the work paid for itself many times over.