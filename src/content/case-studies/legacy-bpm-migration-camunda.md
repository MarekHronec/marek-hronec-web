---
title: "Legacy BPM Migration to Camunda"
context: "Regulated Utility Environment"
industry: "Energy / Utilities"
role: "BPM Migration, Process Analysis & Cloud Enablement"
tags: ["BPM", "Camunda", "BPMN", "Microsoft Azure", "Integration", "Process Migration"]
featured: false
metrics:
  - label: "Migration Approach"
    value: "Parallel Run"
  - label: "Process Engine"
    value: "Camunda on Azure"
excerpt: "A business-critical workflow had become difficult to understand, extend and operate. New seasonal requirements created a hard deadline, but the legacy BPM platform depended on scarce external expertise and was no longer a viable foundation for future change."
heroImage: "/images/case_study_03_detail.webp"
heroCaption: "Process ownership, recovered"
heroVersion: "V1.2"
titleHighlight: "BPM Migration"
platform: "Camunda, Microsoft Azure, Service Bus Integration"
focus: "Migration of a business-critical workflow from legacy BPM to a standards-based Camunda platform on Azure"
principles:
  - "Reverse-engineer before replacing"
  - "Optimise the process, do not copy it"
  - "BPMN as a shared language, not just documentation"
  - "Parallel run over big-bang migration"
  - "Internal ownership over supplier dependency"
outcomes:
  - title: "Deadline met"
    description: "Updated workflow delivered before the seasonal sales window — the business constraint that triggered the migration in the first place."
  - title: "Ownership recovered"
    description: "Process knowledge, BPMN models and operational understanding moved from scarce external specialists into the internal team."
  - title: "Modern platform foundation"
    description: "New Camunda-based solution running in Azure, ready for future workflow changes without the cost and lead time of the legacy platform."
  - title: "BPMN as a working contract"
    description: "Process models became executable artefacts shared between business analysis and implementation, not just diagrams in a document."
---

## The Situation

A business-critical workflow was running on a legacy BPM platform that had quietly become a problem. The process logic was scattered across components only a small group of people fully understood. Extending it required scarce external expertise, with lead times and costs that made every change harder to justify than the last. Internally, the team needed to move faster and understand the process better — but the platform was not letting them.

A new seasonal business requirement made the situation urgent. The affected workflow had to be updated before the seasonal sales period, and missing that window would have had a direct revenue impact. Continuing on the legacy platform meant accepting whatever timeline and price the external specialists could offer. That was no longer acceptable.

<h2 class="prose-role"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>My Role</h2>

From the start, the project had a clear constraint: deliver the seasonal change without continuing on the legacy platform. That direction shaped everything that followed — the choice of Camunda as the new engine, the decision to migrate now rather than absorb another expensive change request on the old platform, and the operating principle that whatever was built had to be something the internal team could own afterwards.

From there, my contribution moved across operations, process analysis, technical coordination and cloud enablement. I maintained and analysed the original BPM solution, reverse-engineered the existing workflow and translated the logic into BPMN models that could be reasoned about openly. Together with a colleague from the process team, I helped optimise and extend the workflow against the new business requirements rather than mechanically copying the old behaviour.

I prepared the Azure environment for the new Camunda-based solution, supported deployment, tested the implementation and validated process behaviour against expected outcomes. The external development partner was learning parts of the Camunda and BPMN model during the project, so I actively reviewed, corrected and tested the workflow to keep the implemented behaviour aligned with the business process — not just with the partner's interpretation of it.

A significant part of the work was integration. I configured routing in the service bus layer so the legacy BPM platform and the new Camunda solution could coexist during the transition. The role required connecting layers that often live in different teams: business requirements, BPMN modelling, legacy platform behaviour, integration routing, Azure deployment and operational testing.

<h2><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>The Problem</h2>

The surface problem was technical: a business-critical workflow on a legacy BPM platform that had become difficult to maintain, extend and operate.

The deeper problem was ownership. A core process had quietly drifted into a state where the organisation could not change it on its own terms. Lead times, cost and direction were effectively set by external specialists with the relevant legacy expertise. New requirements had to be negotiated, scheduled and paid for at someone else's pace.

> A business cannot afford to lose ownership of a business-critical process.

The challenge was not only to deliver the seasonal change in time. It was to use the migration as an opportunity to bring the process — its models, its behaviour, its operational knowledge — back inside the organisation.

## Architecture Decisions and Trade-offs

The decision was to migrate from the legacy BPM platform to Camunda, deployed on Azure, using a deliberately pragmatic approach rather than a clean-slate rewrite.

**Reverse-engineer before replacing.** The existing workflow had to be understood before it could be safely changed. The process was analysed, reverse-engineered and translated into clearer BPMN models — which became the working artefact for everything that followed.

**Optimise the process, do not copy it.** The goal was not to recreate the legacy workflow one-to-one. Together with the process team, the workflow was reviewed, simplified and extended against the new business requirements. A migration is a rare opportunity to question what the process should do, not just where it should run.

**BPMN as a shared language.** Camunda allowed BPMN to be treated as an executable model, not just documentation. That changed the conversation between business analysis and implementation: the diagram and the running process were the same artefact.

**Parallel run over big-bang migration.** Active process instances were allowed to finish on the legacy platform. New and changed flows started on Camunda. Routing logic in the service bus directed each request to the correct engine based on process identifiers. This avoided unnecessary migration of in-flight instances and reduced the risk of disturbing live business operations during a tight delivery window.

**Internal ownership over supplier dependency.** The team accepted a learning curve with a new platform instead of continuing to depend on external specialists for every major process change. This created short-term delivery pressure but gave the organisation control over future changes.

**Pragmatic delivery over perfect implementation.** The seasonal deadline was not negotiable. The project prioritised a working, testable solution over a slow, ideal migration. Minor issues surfaced during rapid development, but they were identified, corrected and stabilised before the platform settled into long-term operation.

## What Made It Work

**Treating BPMN as the source of truth.** Once the workflow was modelled clearly enough to be executed, conversations between business and IT became sharper. Disagreements pointed at specific elements in the diagram rather than at vague descriptions of "the process."

**Reviewing the partner's work, not just receiving it.** Rapid delivery with a partner still learning the new platform meant the implementation needed active correction during the project, not just acceptance testing at the end. Catching issues early kept the timeline realistic.

**Keeping both engines running on purpose.** The temptation in any migration is to rush every instance onto the new platform. Letting active instances finish on the legacy engine reduced risk, simplified testing and let the team focus on getting the new solution right rather than on edge cases of in-flight migration.

<h2><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>The Outcome</h2>

The migration was completed within roughly half a year, with the most intensive development phase compressed into a few months. A business-critical workflow moved from a difficult-to-maintain legacy BPM platform to a Camunda-based solution running on Azure. The new platform made the process easier to understand, modify, test and deploy.

The result was not only cost avoidance, although the cost picture changed significantly. The bigger outcome was ownership. The internal team gained working knowledge of the BPMN models, process behaviour, integration flow and operational requirements. Future changes were no longer gated by the availability of scarce legacy specialists.

The project also demonstrated the practical value of BPMN as a shared language. Once the process was modelled clearly and executed through a standards-based engine, the organisation could reason about the workflow more transparently and make changes with greater confidence.

## What I Took From It

A BPM migration is rarely just a platform replacement. The technical move from one engine to another is the visible part. The valuable part is the recovery of process knowledge, internal ownership and delivery capability — all of which had quietly been outsourced along with the platform itself.

The parts worth doing differently next time: more focused load testing under realistic seasonal traffic, and stricter discipline on keeping integration patterns simple. The implementation worked, but some of the routing and integration logic carried more complexity than the process actually required — a consequence of rapid delivery rather than deliberate design. Holding the line on simplicity, and questioning each layer of integration against what the workflow really needed, would have produced a cleaner result without adding effort.
