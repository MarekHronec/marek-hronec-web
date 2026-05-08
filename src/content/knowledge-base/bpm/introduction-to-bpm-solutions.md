---
title: "Introduction to BPM Solutions: Camunda, Activiti and Kogito"
category: bpm
tags: ["BPM", "BPMN", "Camunda", "Activiti", "Kogito"]
date: 2025-03-12
updated: 2026-05-02
readTime: 10
level: beginner
excerpt: "A practical introduction to modern BPM engines. What they solve, how they differ, and how to choose between Camunda, Activiti and Kogito for your organisation."
references:
  - title: "Camunda 8 documentation"
    url: "https://docs.camunda.io/docs/"
    description: "Official documentation for Camunda 8, covering BPMN modelling, Zeebe engine, Tasklist, and deployment patterns for cloud and self-managed environments."
    domain: "docs.camunda.io"
  - title: "BPMN 2.0 specification — Object Management Group"
    url: "https://www.omg.org/spec/BPMN/2.0/"
    description: "The formal OMG specification for Business Process Model and Notation 2.0, the standard that underpins Camunda, Activiti, Kogito, and Flowable process definitions."
    domain: "omg.org"
  - title: "Kogito — cloud-native business automation"
    url: "https://kogito.kie.org/get-started/"
    description: "Getting started guide for Kogito, Red Hat's cloud-native runtime for BPMN and DMN processes built on Quarkus and targeting Kubernetes-native deployments."
    domain: "kogito.kie.org"
  - title: "Flowable documentation"
    url: "https://documentation.flowable.com/latest/"
    description: "Reference documentation for Flowable, the open-source continuation of Activiti 5 that supports BPMN, CMMN, and DMN in a single embeddable or standalone engine."
    domain: "documentation.flowable.com"
---

Business Process Management (BPM) platforms execute the workflows that coordinate systems, people and decisions across an organisation. When a mortgage application moves through review, approval, document collection and disbursement — a BPM engine is typically the thing that knows where each case is and what happens next.

This article introduces three well-known BPM and business automation runtimes — Camunda, Activiti and Kogito — and explains what each one is best suited for.

## What a BPM Engine Actually Does

At its core, a BPM engine does three things:

1. **Interprets process models** — typically expressed as BPMN 2.0 (Business Process Model and Notation) diagrams. The model defines states, transitions, decision points and human tasks.
2. **Maintains process state** — every running instance of a process has a current position (token), variables and history. The engine persists this state so processes survive restarts, delays and failures.
3. **Drives execution** — the engine advances the process by invoking service tasks, sending messages, waiting for timers, or assigning tasks to users.

The practical value: complex, long-running workflows become explicit and observable rather than implicit and hidden in application code.

## BPMN as the Foundation

All three engines use BPMN 2.0 as their modelling standard. Understanding BPMN is prerequisite knowledge for working with any of them.

The key BPMN elements:

| Element | Symbol | Meaning |
|---|---|---|
| Start event | Thin circle | Process begins here |
| End event | Thick circle | Process terminates here |
| Service task | Rectangle with gear | Automated system call |
| User task | Rectangle with person | Human action required |
| Gateway (XOR) | Diamond with X | Exclusive decision — one path |
| Gateway (Parallel) | Diamond with + | Fork/join — all paths |
| Message event | Circle with envelope | Send or receive a message |
| Timer event | Circle with clock | Wait for a time condition |

A BPMN model can become an executable specification, but only when the technical details are added: service task bindings, variables, error handling, message correlation, user-task forms and deployment configuration. The business diagram and the executable model should stay close, but they are rarely identical without engineering work.

:::tip[Architectural Pro Tip]
Keep business logic out of service task delegates. Service tasks should call application services, not implement business rules themselves. A BPMN model littered with implementation details becomes hard to change and impossible for non-engineers to reason about. The test: if you removed the BPM engine, the business logic in your service layer should still work independently.
:::

## Camunda

Camunda is one of the most widely adopted BPM platforms for Java-based enterprise systems. It comes in two main variants: **Camunda 7** (embeddable, battle-tested, now legacy) and **Camunda 8** (cloud-native, based on Zeebe).

### Camunda 7

Camunda 7 is embedded directly into a Java or Spring Boot application. The engine runs inside your process, uses your database, and is managed as part of your deployment.

```xml
<!-- Spring Boot dependency -->
<dependency>
    <groupId>org.camunda.bpm.springboot</groupId>
    <artifactId>camunda-bpm-spring-boot-starter</artifactId>
    <!-- Pin the current Camunda 7 LTS / enterprise-supported version used by your organisation -->
    <version>7.24.0</version>
</dependency>
```

Key characteristics:
- **Embedded or shared engine** — can run one engine per service or a shared engine across multiple applications
- **Database-backed state** — process instances persist in a relational database (PostgreSQL, MySQL, H2 for development)
- **REST API and web apps** — Cockpit (monitoring), Tasklist (human tasks) and Admin are bundled
- **Strong Spring Boot integration** — service tasks map directly to Spring beans

**Important context:** Camunda 7 is now a legacy-but-supported platform. Camunda 7.24 is the final feature release. Community Edition no longer receives security or maintenance updates after October 2025, while Enterprise Edition remains supported through 2030. That means Camunda 7 is still a valid choice for existing enterprise estates and migrations, but it should not be presented as the default starting point for every new greenfield project.

Camunda 7 is the right choice when you need a mature, well-documented engine with predictable behaviour and are comfortable with a Java-centric stack.

### Camunda 8 / Zeebe

Camunda 8 is architected for cloud-native deployments. Zeebe, the underlying engine, is a horizontally scalable, event-driven workflow engine that does not use a relational database for state. Process state is stored in a distributed log.

Key differences from Camunda 7:
- **No shared relational database** — state lives in Zeebe's own distributed store
- **gRPC-based client** — services connect via Zeebe client SDKs (Java, .NET, Go, Node)
- **Designed for high throughput** — suitable for millions of process instances
- **Self-managed or SaaS** — Camunda 8 can run as a self-managed Kubernetes deployment or as Camunda 8 SaaS. For production use, check the current Camunda licensing model before choosing the self-managed route.

Camunda 8 suits new projects that expect high volume, are building cloud-native, or want to leverage the managed SaaS offering.

## Activiti

Activiti is historically important because Camunda originally forked from it. It remains a lightweight, open-source BPMN engine maintained in the Alfresco ecosystem, but its documentation depth, commercial ecosystem and enterprise momentum are smaller than Camunda's.

```java
// Starting a process instance in Activiti
ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
RuntimeService runtimeService = processEngine.getRuntimeService();

ProcessInstance instance = runtimeService.startProcessInstanceByKey(
    "orderFulfillment",
    Variables.putValue("orderId", "ORD-12345")
);
```

Key characteristics:
- **Lightweight** — smaller footprint than Camunda, simpler to embed
- **Spring integration** — works cleanly with Spring Boot
- **Activiti Cloud** — the cloud-native variant, built on Spring Cloud and Kubernetes
- **Smaller ecosystem** — fewer commercial extensions and less community documentation than Camunda

Activiti can be a reasonable choice for teams that want a lean BPM engine without the full Camunda surface area, or for projects already deep in the Alfresco Content Services stack — but verify current project activity, documentation depth and maintenance posture before choosing it for a new strategic platform.

## Kogito

Kogito is different from the other two. It is less a traditional central BPM engine and more a cloud-native business automation toolkit/runtime — built around processes, decisions and rules — from the KIE/Drools/jBPM ecosystem, designed for Quarkus and Kubernetes-native deployments.

```java
// In Kogito, a process automatically generates a REST API
// POST /orders starts a new order process
// GET /orders/{id} returns current state
// No boilerplate required — the engine generates it from the BPMN
```

Key characteristics:
- **Quarkus-first** — designed for fast startup, low memory, and GraalVM native compilation
- **Serverless-friendly** — Kogito services can be built on Quarkus for fast startup, low memory usage and event-driven deployment patterns
- **Generates REST APIs automatically** — each process model becomes an API endpoint without manual wiring
- **Decision Model Notation (DMN)** — first-class support for DMN alongside BPMN
- **Kubernetes-native** — integrates with Knative for event-driven scaling

Kogito's main trade-off: it is younger, and the ecosystem is narrower. The tooling is improving but is not as mature as Camunda 7. If you are running a Red Hat / OpenShift stack and want native Quarkus integration, Kogito is the natural fit.

## Comparison Summary

The important distinction is not only technical. It is also strategic: Camunda 7 is mature but legacy, Camunda 8 is the strategic Camunda direction, Activiti is lightweight but narrower, and Kogito fits best when the organisation already wants the KIE / Quarkus / OpenShift ecosystem.

| | Camunda 7 | Camunda 8 / Zeebe | Activiti | Kogito |
|---|---|---|---|---|
| Runtime model | Embedded / shared engine | Distributed orchestration cluster | Embedded / cloud-native components | Process/rule services |
| State storage | Relational database | Zeebe state / distributed log architecture | Relational database | Runtime-specific persistence |
| Primary stack | Java / Spring Boot | Polyglot clients, Kubernetes-oriented | Java / Spring Boot | Quarkus / Java / Kubernetes |
| Maturity | Very high, but legacy | High and strategic | Mature core, smaller ecosystem | Younger / narrower ecosystem |
| Throughput | Medium to high | Very high | Medium | Depends on architecture |
| Best for | Existing Java BPM estates, migrations, embedded workflow | New cloud-native orchestration, high-volume processes, SaaS | Lightweight BPMN embedding, Alfresco-adjacent use cases | Quarkus/OpenShift-native process and decision services |
| SaaS option | No native Camunda 7 SaaS path | Yes | No mainstream native SaaS | No mainstream native SaaS |
| Licensing posture | Community EOL; Enterprise supported | Production license required | Apache/open-source | Open-source / KIE ecosystem |

## Choosing the Right Engine

A few practical decision rules:

**Choose Camunda 7** if you are maintaining, extending, or migrating an existing Java-based BPM estate and want the most battle-tested embedded-engine model with mature documentation and tooling.

**Choose Camunda 8** if you are starting a new project, expect high process volumes, are deploying to Kubernetes, or want to use the SaaS offering to avoid operational overhead.

**Choose Activiti** if you have an existing Alfresco investment, need a very lightweight engine, or are already familiar with its API and want to avoid the Camunda surface area.

**Choose Kogito** if you are running a Red Hat stack, building on Quarkus, targeting Kubernetes-native deployments, or want processes to compile to independent microservices with auto-generated APIs.

## Getting Started with the Classic Embedded Model

For learning the classic embedded BPM model, Camunda 7 with Spring Boot remains one of the clearest examples. For new production projects, treat it as a learning path or an existing-estate pattern, not as the automatic greenfield default.

1. Add the Spring Boot starter dependency
2. Place a `.bpmn` file in `src/main/resources`
3. Implement service task delegates as Spring beans
4. Deploy — the engine auto-deploys processes found on the classpath

```java
// Service task delegate — implements JavaDelegate
@Component("sendConfirmationEmail")
public class SendConfirmationEmailDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        String email = (String) execution.getVariable("customerEmail");
        // send email logic
        execution.setVariable("emailSent", true);
    }
}
```

In the BPMN, the service task references `${sendConfirmationEmail}`. Camunda resolves it from the Spring context at runtime. This tight integration between process model and Spring beans is what makes Camunda 7 productive for Java teams.

:::warning[Reality Check]
The most common BPM migration headache is inheriting an estate where delegates contain business logic, variables are untyped, and the database holds years of completed instances that slow every query. Technical debt accumulates in direct proportion to how much logic was embedded in the engine rather than kept in application services. Starting on Camunda 7 today means accepting that a migration path will be needed sooner or later — design with that migration in mind from day one.
:::

## Engine Portability

BPMN 2.0 is a standard, but the engines are not interchangeable in practice.

**What is portable:** the BPMN diagram itself — the `.bpmn` XML file — can generally be imported into another compliant engine. The model structure travels reasonably well.

**What is not portable:** expression languages (Camunda 7 uses JUEL/Groovy, Zeebe and Kogito use FEEL), task delegate bindings (Camunda 7 `JavaDelegate`, Zeebe job workers, and Kogito work items are different APIs entirely), variable serialization, built-in form rendering, and multi-instance loop mechanics.

A migration between engines is primarily a re-implementation of the integration layer, not a conversion of the model. The model is somewhat portable; the glue code is not.

The practical implication: choose an engine based on ecosystem fit and long-term strategic direction, not on an assumption that you can switch later without significant re-engineering.

## Closing Checklist

- Model processes in BPMN 2.0 and keep the model readable by the business — it is your primary documentation artefact and should not require an engineer to decode.
- Keep business logic in application services, not in BPMN task delegates. The engine orchestrates; services execute.
- For Camunda 7: appropriate for existing estates or Enterprise Edition programmes. Community Edition no longer receives security patches after October 2025; do not start new greenfield production deployments on it.
- For Camunda 8: confirm current licensing requirements before committing to self-managed production use. The SaaS route offloads operational overhead but has its own cost and data-residency considerations.
- For Activiti: suitable for lightweight embedding or Alfresco-adjacent projects. Verify current community activity and maintenance posture before adopting for a new project.
- For Kogito: strongest fit when the organisation already runs Quarkus, OpenShift or Red Hat middleware. Evaluate ecosystem maturity for your specific process complexity.
- Do not model everything as a BPM process. Short-lived, synchronous operations do not benefit from process state management. BPM overhead is justified for long-running, stateful, multi-step workflows that need auditability and resumption.
- Decide on an expression language early — JUEL, FEEL, and Groovy are not interchangeable across engines. Changing mid-project is expensive.
- Test process resumption explicitly. Stateful engines survive restarts; your test suite should prove that a process interrupted at any state resumes correctly.
