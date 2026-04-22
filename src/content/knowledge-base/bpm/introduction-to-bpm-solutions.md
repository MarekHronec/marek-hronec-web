---
title: "Introduction to BPM Solutions: Camunda, Activiti and Kogito"
category: bpm
tags: ["BPM", "Camunda", "Activiti", "Kogito", "BPMN", "Process Automation"]
date: 2025-03-12
level: beginner
excerpt: "A practical introduction to modern BPM engines. What they solve, how they differ, and how to choose between Camunda, Activiti and Kogito for your organisation."
---

Business Process Management (BPM) platforms execute the workflows that coordinate systems, people and decisions across an organisation. When a mortgage application moves through review, approval, document collection and disbursement — a BPM engine is typically the thing that knows where each case is and what happens next.

This article introduces the three most widely used open-source BPM engines — Camunda, Activiti and Kogito — and explains what each one is best suited for.

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

A process model in BPMN is an executable specification. The same diagram that the business analyst draws is what the engine runs — closing the gap between business intent and technical implementation.

## Camunda

Camunda is the most widely adopted BPM platform for Java-based enterprise systems. It comes in two main variants: **Camunda 7** (embeddable, battle-tested) and **Camunda 8** (cloud-native, based on Zeebe).

### Camunda 7

Camunda 7 is embedded directly into a Java or Spring Boot application. The engine runs inside your process, uses your database, and is managed as part of your deployment.

```xml
<!-- Spring Boot dependency -->
<dependency>
    <groupId>org.camunda.bpm.springboot</groupId>
    <artifactId>camunda-bpm-spring-boot-starter</artifactId>
    <version>7.21.0</version>
</dependency>
```

Key characteristics:
- **Embedded or shared engine** — can run one engine per service or a shared engine across multiple applications
- **Database-backed state** — process instances persist in a relational database (PostgreSQL, MySQL, H2 for development)
- **REST API and web apps** — Cockpit (monitoring), Tasklist (human tasks) and Admin are bundled
- **Strong Spring Boot integration** — service tasks map directly to Spring beans

Camunda 7 is the right choice when you need a mature, well-documented engine with predictable behaviour and are comfortable with a Java-centric stack.

### Camunda 8 / Zeebe

Camunda 8 is architected for cloud-native deployments. Zeebe, the underlying engine, is a horizontally scalable, event-driven workflow engine that does not use a relational database for state. Process state is stored in a distributed log.

Key differences from Camunda 7:
- **No shared relational database** — state lives in Zeebe's own distributed store
- **gRPC-based client** — services connect via Zeebe client SDKs (Java, .NET, Go, Node)
- **Designed for high throughput** — suitable for millions of process instances
- **Self-managed or SaaS** — can be deployed on Kubernetes or used as Camunda Platform SaaS

Camunda 8 suits new projects that expect high volume, are building cloud-native, or want to leverage the managed SaaS offering.

## Activiti

Activiti is the project that Camunda was originally forked from. It is maintained by Alfresco and remains a capable, lightweight BPM engine.

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

Activiti is a reasonable choice for teams that want a lean BPM engine without the full Camunda surface area, or for projects already deep in the Alfresco Content Services stack.

## Kogito

Kogito is the newest of the three. It is a cloud-native business automation platform from Red Hat, built on Quarkus and designed around the idea that process, decision and rules logic should compile to lightweight, self-contained services.

```java
// In Kogito, a process automatically generates a REST API
// POST /orders starts a new order process
// GET /orders/{id} returns current state
// No boilerplate required — the engine generates it from the BPMN
```

Key characteristics:
- **Quarkus-first** — designed for fast startup, low memory, and GraalVM native compilation
- **Serverless-friendly** — a Kogito process compiles to a microservice that starts in milliseconds
- **Generates REST APIs automatically** — each process model becomes an API endpoint without manual wiring
- **Decision Model Notation (DMN)** — first-class support for DMN alongside BPMN
- **Kubernetes-native** — integrates with Knative for event-driven scaling

Kogito's main trade-off: it is younger, and the ecosystem is narrower. The tooling is improving but is not as mature as Camunda 7. If you are running a Red Hat / OpenShift stack and want native Quarkus integration, Kogito is the natural fit.

## Comparison Summary

| | Camunda 7 | Camunda 8 / Zeebe | Activiti | Kogito |
|---|---|---|---|---|
| Runtime model | Embedded / shared | Distributed cluster | Embedded / cloud | Microservice per process |
| State storage | RDBMS | Distributed log | RDBMS | External store |
| Java framework | Spring Boot | Spring / any | Spring Boot | Quarkus |
| Maturity | High | Medium | High | Medium |
| Throughput | Medium | Very high | Medium | Medium |
| Best for | Enterprise Java | High-volume cloud | Lightweight embed | Cloud-native / serverless |
| SaaS option | Yes (Platform SaaS) | Yes (Platform SaaS) | No | No |

## Choosing the Right Engine

A few practical decision rules:

**Choose Camunda 7** if you are building or migrating a Java-based enterprise application and want the most battle-tested option with the richest ecosystem, documentation and tooling.

**Choose Camunda 8** if you are starting a new project, expect high process volumes, are deploying to Kubernetes, or want to use the SaaS offering to avoid operational overhead.

**Choose Activiti** if you have an existing Alfresco investment, need a very lightweight engine, or are already familiar with its API and want to avoid the Camunda surface area.

**Choose Kogito** if you are running a Red Hat stack, building on Quarkus, targeting Kubernetes-native deployments, or want processes to compile to independent microservices with auto-generated APIs.

## Getting Started with Camunda 7 (Practical)

For most teams encountering BPM for the first time, Camunda 7 with Spring Boot is the smoothest entry point. A minimal working process:

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

## Summary

BPM engines make long-running, stateful processes explicit, observable and manageable. Of the three platforms covered here, Camunda 7 is the safest starting point for most enterprise Java teams. Camunda 8 is the path for cloud-native, high-volume deployments. Activiti suits lightweight or Alfresco-adjacent use cases. Kogito is the choice when Quarkus and Kubernetes-native compilation are the priority.

The technology choice matters less than the discipline: model your processes in BPMN, understand the engine's state machine, and keep your business logic in the engine rather than scattered across application code.
