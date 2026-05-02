---
title: "How to Learn Azure and OCI Without Chasing Expiring Certifications"
category: multicloud
tags: ["Azure", "OCI", "Learning", "Certifications", "Training"]
date: 2026-04-30
readTime: 11
level: beginner
excerpt: "Skills budget is real. Most teams overpay for training that is free if you know where to look. But hard-coded lists of certifications go stale fast — Microsoft and Oracle both rebrand every 18–24 months. Here is the durable approach: skills, not certificate names."
---

Cloud learning advice often ages faster than the skills it tries to teach. Certification names change, vendors rebrand, and exam codes disappear. The result is a flood of guidance tied to labels that no longer exist — search "best Azure certifications" and you will find articles confidently recommending exam codes that were retired last year.

This article does the opposite. It is structured around durable patterns — what to learn, where the free or near-free resources are, how to think about certifications without making them the goal. The specifics will shift; the structure should hold.

This article also tries to be honest about which paid programmes are actually worth the investment and which simply repackage freely available material at a premium. That part is uncomfortable for vendors and useful for you.

## What to actually learn — by role, not by exam

Cloud expertise breaks down into a small number of role tracks that have stayed stable for years. Pick the track that matches what you do. The exam names will change. The competencies will not.

| Role track | Core competencies |
|---|---|
| **Cloud Architect** | Landing zone design, identity architecture, network topology, governance, cost models, well-architected reviews |
| **Platform Engineer** | IaC (Terraform, Bicep), CI/CD, Kubernetes, observability, internal developer platforms |
| **Cloud Security** | IAM design, key management, network security, posture management, regulatory frameworks |
| **Data Engineer / Architect** | Storage formats, ingestion patterns, ETL/ELT, lakehouse architectures, governance |
| **AI / ML Engineer** | Model deployment patterns, vector databases, RAG architectures, model governance |
| **DevOps / SRE** | Observability, incident response, capacity planning, automation, SLO design |

Each cloud has certifications that map to most of these. The names change. The role tracks do not.

The deeper truth: the competencies above are mostly cloud-agnostic. A landing zone in OCI is structurally similar to a landing zone in Azure. Kubernetes on AKS is structurally similar to Kubernetes on OKE. The role-level skill is portable; the cloud-level implementation is the easier half. Hire and train for the role-level skill.

## The free-and-good resources that actually help

There is a tier of free resources that is genuinely good. There is a tier of free resources that exists to upsell you. Knowing the difference saves time.

**Microsoft Learn** is the Azure baseline and it is excellent. Modules are short, hands-on, free, and updated regularly. The role-based learning paths bundle modules into structured tracks. If you read Microsoft Learn for two hours a week for six months, you will have a working foundation in Azure that rivals what most paid courses deliver. There is no reason not to start here.

**Oracle MyLearn** is OCI's equivalent and is also free. Foundations-level certifications (OCI Foundations, AI Foundations, Data Foundations) have historically been offered free — both training and exam — as part of Oracle's entry-level strategy. This is one of OCI's structural advantages over Azure for individuals: the entry-level certifications cost nothing.

**Microsoft Enterprise Skills Initiative (ESI)** is the programme worth knowing about if your employer has an Enterprise Agreement with Software Assurance. ESI provides employees of those organisations with role-based curricula, exam prep, and discounted (typically 50%-off) certification vouchers. It is not "free" in the sense that the employer is paying through the EA; it is free at the point of use. Ask your IT department whether your organisation is enrolled. Many are and do not advertise it widely.

**Microsoft Reactor and Microsoft Learn live events** run regular free workshops with hands-on labs. The schedule rotates through fundamentals, certifications, and emerging topics. Worth following.

**Oracle Race to Certification** — when it runs — provides free Professional-level exam vouchers tied to completed learning paths. The 2025 edition concluded in October 2025 with over a million participants and offered up to three free Professional exam vouchers. Whether and when it returns in 2026 is not yet officially confirmed at the time of writing; check Oracle University. If it runs, take the opportunity. Free Professional vouchers are unusual in this industry.

**The CNCF and FinOps Foundation** offer vendor-neutral certifications (CKA, CKAD, CKS for Kubernetes; FOCUS-related FinOps credentials) that are valued across clouds. Pay attention to these — they age more slowly than vendor-specific certs because the underlying tech is open-source-anchored.

What generally does not merit the cost: third-party "exam dump" sites, multi-thousand-euro bootcamps, or courses that promise certification in a weekend. The good content is genuinely free or near-free; much paid content in this space repackages freely available material at a premium.

## How to think about certifications without making them the goal

Certifications are signal, not skill. They are useful for three things:

1. **Forcing structured study** — the exam blueprint forces breadth across topics you might skip otherwise.
2. **Passing recruiter filters** — some job postings filter by certification, fairly or unfairly.
3. **Validating skill at a defined level** — useful when claiming expertise you do not yet have a track record in.

They are not particularly useful for:

- Proving senior expertise. By the time you are senior, your work history is the signal. Adding a Foundations certification at that point looks weird.
- Replacing hands-on experience. The exams are passable through study without actually using the cloud; the resulting "certified but inexperienced" engineer is a known anti-pattern.
- Locking in a career path. The cert is a snapshot; the career is the work.

For many professionals, a balanced baseline looks like this:

- Hold one Foundations-level certification on each cloud you work with. This is cheap, fast, and signals breadth.
- Hold a vendor-neutral certification (CKA, CKS, FOCUS) where relevant. This signals durable, cloud-portable skill.
- Hold one Associate or Professional-level certification in your primary cloud. This is the depth signal.
- Refresh roughly every two years, or when the certification you hold gets retired (which is the more common trigger).

Going deeper than this is fine if you enjoy exams. It does not move the career needle much.

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>If you are picking your <em>first</em> two certifications, take an Azure or OCI Foundations on whichever cloud you use most, then go to a vendor-neutral one — Kubernetes (CKA or CKAD) or FinOps. The combination of "I know this cloud" and "I know this cross-cloud capability" is more durable than two certifications in the same cloud at increasing levels of specialisation.</p>
  </div>
</div>

## Hands-on, where the real skill grows

Reading and certs build vocabulary. Building things builds skill. The gap between someone who has passed every exam and someone who has actually deployed and operated workloads is enormous and visible within minutes in any technical conversation.

Some places to actually build:

**A free-tier or always-free account on each cloud.** OCI's Always Free tier is genuinely useful — two AMD VMs, an Autonomous Database, object storage, and a few other services, kept indefinitely. Azure's free tier is more time-bound (12 months on most services) but credible for getting started. Use them.

**The Cloud Resume Challenge** is a project-based path that walks through deploying a multi-service application end-to-end: static site, API, database, CI/CD, monitoring. Free, vendor-agnostic versions exist for most clouds. Worth the time even if you never publish the resume.

**Your homelab, if you have one.** Run things you intend to use in the cloud locally first. Kubernetes (k3s on a Raspberry Pi, kind on a laptop), self-hosted Postgres, Loki/Grafana, Argo CD. The skills transfer directly to any cloud.

**Your day job.** The fastest way to learn a service is to be asked to deploy it for real. Volunteer for the proof-of-concept. Ask to be the second person on the migration. The combination of real stakes and fresh territory is unbeatable for skill growth.

The consistent pattern in engineers who become senior cloud people: they build things, they break things, they document what they learn, and they do this every quarter for years. There is no trick.

## The vendor-neutral material that ages more slowly

Cloud-specific knowledge ages with the cloud. Foundational distributed-systems knowledge ages with the field, which is much slower. Some books and resources that have stayed valuable through multiple cloud eras:

- *Designing Data-Intensive Applications* (Martin Kleppmann) — still the best single book on distributed data systems. Unchanged in relevance since 2017.
- *Site Reliability Engineering* and *The SRE Workbook* (Google) — free online, the practical foundations of operating systems at scale.
- *Kubernetes Up and Running* and the Kubernetes documentation itself — read the docs, not the third-party tutorials.
- *Cloud Native Patterns* (Cornelia Davis) — abstract enough to outlast specific cloud vintages.
- The Hashicorp Terraform documentation — Terraform is the closest thing to a multicloud lingua franca in IaC.

Spending an hour on one of these is, hour-for-hour, more valuable than an hour on most vendor-specific training. Vendor training tells you which buttons to press; foundational reading tells you why the buttons exist and what they replace.

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Reality Check</p>
    <p>Microsoft and Oracle regularly revise certification portfolios, branding, and exam mappings. Any article built entirely around specific exam codes risks becoming outdated within a year. This article avoids recommending specific exam codes for that reason — by the time you finish reading, the codes may have changed. Build skills against role tracks (architect, security, data, DevOps) and let the certification names follow.</p>
  </div>
</div>

## Building a competency matrix for a team

For individuals, this framework guides personal development. For team leads, the same logic scales into workforce planning.

If you are responsible for a team's skills, the useful artefact is a competency matrix — not a training plan. The matrix lists the competencies (network design, IaC, security architecture, etc.) down the side and the team members across the top. Each cell rates the person's level: aware, working, proficient, expert. Update it twice a year.

The matrix tells you:

- Where the team has single points of failure (one expert, no one else even working).
- Where the team has redundancy (multiple proficient, room to invest in deeper expertise).
- Where the team is structurally weak (no one above aware on a competency the work needs).

The training plan falls out of the matrix, not the other way around. You train against gaps, not against vendor catalogues.

A simple competency matrix template:

```
                 | Person A | Person B | Person C | Person D
Network Design   | Expert   | Working  | Aware    | Working
IaC (Terraform)  | Expert   | Expert   | Working  | Aware
Kubernetes       | Working  | Aware    | Expert   | Aware
IAM Architecture | Working  | Aware    | Aware    | Expert
Cost / FinOps    | Aware    | Aware    | Aware    | Working
Observability    | Working  | Working  | Working  | Working
```

If you cannot draw this for your team, the team has a hidden skills problem. The act of trying to fill in the matrix is itself revealing.

## Multicloud factor

The multicloud version is the same matrix with cloud-specific rows where the cloud differences matter (Azure networking vs OCI networking, Azure Policy vs OCI policies and quotas) and shared rows where they do not (Kubernetes, Terraform, observability fundamentals).

The strategic insight: most of the *skills* are shared. The *implementation knowledge* is cloud-specific and learnable in a couple of weeks once you have the underlying skill. So the team you want is one with deep skill in a few areas (architecture, IaC, security, Kubernetes) and working knowledge of both clouds, rather than separate Azure-deep and OCI-deep people who have limited overlap across each other's domains.

This is sometimes uncomfortable for individuals who have built careers on single-cloud expertise. Multi-cloud literacy is becoming increasingly valuable for senior cloud roles, especially in enterprise environments. Plan accordingly.

## Closing checklist

- Build a competency matrix for your team. Update it twice yearly. Train against gaps.
- Hold one Foundations-level certification per cloud you work with. Add depth in your primary cloud. Add a vendor-neutral certification (CKA/CKS/FOCUS) where relevant.
- Use Microsoft Learn and Oracle MyLearn as your free baseline. They are genuinely good.
- Check whether your employer is enrolled in Microsoft ESI. If yes, the role-based curriculum and 50%-off vouchers are real benefits.
- Watch for time-limited campaigns (Oracle's Race to Certification when it runs, Microsoft Reactor live events). They offer disproportionate value relative to time invested.
- Build things hands-on. Use the always-free tiers. Volunteer for real work. Reading and certs are not substitutes for shipping.
- Read at least one foundational, vendor-neutral book per year. The half-life is decades, not months.
- Avoid hard-coded "you must take exam X" advice. Specific exam codes age out fast. Role tracks and skills do not.
- Track your own skills against role tracks, not vendor catalogues. The vendor catalogues serve the vendor; the role tracks serve you.
