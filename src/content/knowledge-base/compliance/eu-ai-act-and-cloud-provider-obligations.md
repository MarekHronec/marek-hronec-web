---
title: "EU AI Act × Cloud — How AI Regulation Reaches Cloud Providers and Their Customers"
category: compliance
tags: ["EU AI Act", "AI", "GPAI", "Compliance", "Data Security", "Cross-Cutting", "Sectoral"]
date: 2026-05-14
updated: 2026-05-15
readTime: 12
level: advanced
excerpt: "The EU AI Act applies progressively from 2025 through 2027. For cloud providers, two roles matter: provider of general-purpose AI models, and infrastructure for customer-deployed AI systems. For customers, deployer obligations apply at scale. This article walks through what AI Act actually requires of cloud providers, where it intersects with GDPR and NIS2, and what to plan for."
references:
  - title: "EU AI Act — Regulation (EU) 2024/1689"
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
    description: "The EU Artificial Intelligence Act — the comprehensive AI regulation establishing risk-tier obligations, GPAI model rules, and the AI Office supervisory regime."
    domain: "eur-lex.europa.eu"
  - title: "European AI Office"
    url: "https://digital-strategy.ec.europa.eu/en/policies/ai-office"
    description: "The European AI Office within the Commission — the central body supervising general-purpose AI models and coordinating cross-Member-State enforcement under the AI Act."
    domain: "digital-strategy.ec.europa.eu"
  - title: "AI Act Implementation Timeline"
    url: "https://artificialintelligenceact.eu/implementation-timeline/"
    description: "Implementation timeline for the AI Act covering the phased application from February 2025 through August 2027 across different obligation categories."
    domain: "artificialintelligenceact.eu"
  - title: "EDPB Guidelines on AI and Personal Data"
    url: "https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines_en"
    description: "EDPB guidelines on the intersection of AI processing and personal data protection under GDPR."
    domain: "edpb.europa.eu"
  - title: "ENISA AI Cybersecurity Framework"
    url: "https://www.enisa.europa.eu/topics/cybersecurity-policy/cybersecurity-of-artificial-intelligence"
    description: "ENISA's cybersecurity guidance for AI systems, complementing the AI Act with operational security recommendations."
    domain: "enisa.europa.eu"
---

The EU AI Act — Regulation (EU) 2024/1689 — applies progressively from **February 2025 through August 2027**. For cloud providers, two roles matter: **provider of general-purpose AI models** (GPAI providers) and **infrastructure for customer-deployed AI systems**. For customers, **deployer obligations** apply at scale and increasingly to operational AI use. The AI Act sits alongside [GDPR](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct), [NIS2](/knowledge-base/compliance/nis2-supply-chain-cloud-providers), and [DORA](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay) as a parallel regulatory layer. This article walks through what the AI Act actually requires of cloud providers and their customers, where it intersects with existing cloud regulation, and what to plan for.

## What the AI Act is and what it covers

The AI Act establishes a **risk-tier-based regulatory framework** for AI systems placed on the EU market or used in the EU. The framework has four risk tiers plus a parallel regime for general-purpose AI:

| Tier | Examples | Obligations |
|---|---|---|
| **Prohibited** | Social scoring by public authorities; real-time biometric identification in public spaces (with narrow exceptions); manipulative AI; emotion recognition in workplace and education | Banned outright |
| **High-risk** | AI in critical infrastructure, education, employment, public services, law enforcement, migration, justice | Conformity assessment, risk management, data governance, transparency, human oversight, accuracy and robustness, post-market monitoring |
| **Limited-risk** | Chatbots, deepfakes, emotion recognition (where not prohibited) | Transparency obligations (disclosure to users) |
| **Minimal-risk** | Most AI applications — spam filters, AI in video games, basic recommendation engines | No specific obligations beyond voluntary codes of conduct |

**General-Purpose AI (GPAI)** is a parallel regime addressing AI models that can be adapted to many downstream tasks — large language models, foundation models, multimodal models. GPAI providers have specific obligations even if their model is not high-risk in itself; downstream use determines whether high-risk tier obligations apply.

## Cloud provider's role — three positions

For cloud providers, the AI Act applies through one or more of three positions:

### Position 1 — GPAI provider

Cloud providers that **train and offer general-purpose AI models** (the hyperscalers' foundation models — Anthropic Claude on AWS Bedrock and Google Vertex AI, OpenAI models on Azure, Google Gemini, AWS-trained models, etc.) are **GPAI providers** under the AI Act.

GPAI provider obligations include:
- Technical documentation about the model.
- Training data summary (where applicable for IP and personal-data transparency).
- Compliance with EU copyright law in training data.
- Information sharing with downstream deployers about model capabilities and limitations.

For **GPAI models with systemic risk** (above defined compute thresholds — currently 10^25 floating point operations during training), additional obligations apply:
- Model evaluation against adversarial scenarios.
- Systemic risk assessment and mitigation.
- Cybersecurity protection for the model and its weights.
- Incident reporting to the AI Office.

The hyperscalers' leading-edge foundation models fall into the systemic-risk category. Cloud providers offering these models as services must meet the systemic-risk obligations.

### Position 2 — AI infrastructure provider

Cloud providers offering **infrastructure on which customers deploy their own AI systems** (compute, storage, ML platforms like SageMaker, Vertex AI, Azure Machine Learning) are not necessarily GPAI providers — but they enable customer AI deployments that may be high-risk.

The cloud provider's obligations as infrastructure provider include:
- Supporting customers' AI Act compliance (e.g., capability to support conformity assessment evidence).
- Documentation about infrastructure characteristics relevant to high-risk AI obligations.
- Cooperation with regulatory inquiries about high-risk AI systems on the platform.

This position is operationally close to the [NIS2 supply-chain provider role](/knowledge-base/compliance/nis2-supply-chain-cloud-providers) — the cloud provider supports the customer's regulatory compliance without being directly regulated for the AI system.

### Position 3 — AI service provider

Cloud providers offering **AI-as-a-service** (Azure OpenAI Service, AWS Bedrock, Google Vertex AI for managed model access, plus the broader managed AI service ecosystem) are providers of AI systems in their own right. Depending on the deployment, they may be GPAI providers, high-risk AI system providers, or limited-risk AI providers.

The line between Position 2 and Position 3 is operational: if the cloud provider operates the AI model and its inference, they are Position 3; if the customer brings their own model and runs it on customer-controlled infrastructure, the cloud provider is Position 2.

## Customer's role — the deployer obligations

Customers using AI on cloud are **deployers** of AI systems under the AI Act. Deployer obligations vary by risk tier of the system being deployed:

For **high-risk AI systems**:
- Use the AI system per the provider's instructions.
- Ensure human oversight as defined.
- Monitor operation and report serious incidents.
- Implement data governance for inputs.
- Maintain logs as required.
- Notify natural persons that a high-risk AI system is being used to make or inform decisions affecting them.

For **public-sector deployers** of high-risk AI systems:
- **Fundamental Rights Impact Assessment (FRIA)** — required before deployment.
- Registration in the EU public database of high-risk AI uses.

For **GPAI systems**:
- Deployers receive the GPAI provider's information about capabilities and limitations.
- Deployers configure use within the provider's documented operational envelope.

For most cloud customers deploying AI services, the deployer obligations are operationally meaningful — FRIA for public-sector use, human oversight design, log retention, transparency to users.

## The implementation timeline

The AI Act has phased application:

| Date | Obligation activated |
|---|---|
| **2 February 2025** | Prohibited AI practices banned; AI literacy obligations apply |
| **2 August 2025** | GPAI model obligations apply for new models placed on market; national competent authorities must be designated. (The European AI Office was established by the Commission in February 2024 and became formally operative on entry into force in August 2024.) |
| **2 August 2026** | Most other obligations apply, including high-risk AI provider obligations |
| **2 August 2027** | High-risk AI systems integrated into regulated products (medical devices, machinery, etc.) — full application |

Some obligations have specific later dates for models placed on the market before the relevant cut-off (existing models have transition periods). The implementation timeline is published in detail on the EU's official AI Act implementation portal.

As of mid-2026, the prohibited practices are in force, GPAI obligations for new models are in force, and the broader high-risk system obligations are about to take effect (August 2026).

## Where AI Act intersects with cloud regulation

### Intersection with GDPR

AI systems frequently process personal data. Where they do, **GDPR applies in full** alongside the AI Act. Specific intersections:

- **Article 22** (automated decision-making) — high-risk AI systems making automated decisions about individuals must meet both AI Act human-oversight requirements and GDPR Article 22 protections.
- **Data minimisation and purpose limitation** — training data and operational data must meet GDPR principles.
- **Special category data** (Article 9) — health, genetic, biometric data processing in AI requires explicit lawful basis.
- **Data subject rights** — explanation rights for automated decisions interact with AI Act transparency.
- **DPIA** — AI processing typically triggers GDPR Article 35 DPIA requirement, which integrates with AI Act FRIA for public-sector high-risk uses.

Cloud providers operating AI services as processors handle the GDPR Article 28 layer alongside the AI Act provider/deployer layer. See [GDPR Article 28 + EU Cloud CoC article](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct) for the GDPR layer.

### Intersection with NIS2

AI systems used by essential or important entities under [NIS2](/knowledge-base/compliance/nis2-supply-chain-cloud-providers) become part of the entity's regulated ICT estate. NIS2 supply-chain risk management extends to AI service providers. Specific points:

- AI systems used for security-critical functions (fraud detection, threat detection) become NIS2-relevant.
- Cloud AI service providers serving NIS2-scope customers become supply-chain participants for NIS2 obligations.
- Incident reporting under NIS2 includes AI-related incidents where AI is part of the affected system.

### Intersection with DORA

For financial entities using AI in operations — credit decisions, fraud detection, market analysis, customer interaction — [DORA](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay) applies to the operational resilience of the AI system. Specific points:

- AI systems used in critical or important functions trigger DORA Article 30 contractual requirements for the AI service provider.
- Concentration risk in AI service providers becomes part of DORA concentration risk management.
- The CTPP regime can designate critical AI service providers (potentially including hyperscaler AI services).

### Intersection with sectoral regulation

Sector-specific regulation may layer additional AI obligations:

- **Medical AI** under MDR (Medical Device Regulation) — AI Act high-risk classification overlaps with MDR conformity assessment.
- **Financial AI** — ECB and EBA expectations on AI in banking add to AI Act obligations.
- **HR / employment AI** — sectoral protections layer on top.
- **Public-sector AI** — national rules on automated administrative decisions (Slovakia: zákon o eGovernmente) layer on top.

## GPAI models with systemic risk — the hyperscaler question

Foundation models trained above the 10^25 FLOPs threshold are designated as **GPAI with systemic risk**. As of mid-2026, this category includes:

- Anthropic Claude 3+ class models.
- OpenAI GPT-4+ class models.
- Google Gemini Ultra-class models.
- Meta Llama 3-405B+ models.
- Mistral models above the threshold.
- Selected models from other providers.

For cloud providers offering these models as services (Anthropic on Bedrock, OpenAI on Azure, Google's models on Vertex AI), the systemic-risk obligations apply. Specific obligations include:

- **Model evaluation** — adversarial testing, red-teaming, evaluation against systemic risk scenarios.
- **Risk assessment and mitigation** — documented analysis of potential serious harms and mitigations.
- **Cybersecurity protection** — protecting model weights, training data, and inference infrastructure.
- **Incident reporting** — to the AI Office for systemic-risk-relevant incidents.

The cloud provider's posture is shaped by whether they trained the model themselves or are offering a third-party model. AWS offering Anthropic Claude on Bedrock has a different position than Anthropic-as-direct-provider; the AI Act treats both, and the divisions of responsibility are addressed through contractual arrangements between the model developer and the cloud distributor.

## Supervisory structure

The AI Act creates a layered supervisory structure:

- **European AI Office** — Commission-level body supervising GPAI models, coordinating cross-Member-State enforcement, hosting standardisation activity.
- **National Competent Authorities** — designated by each Member State for the supervision of non-GPAI obligations. Different Member States are taking different approaches (some consolidating in a single authority, others distributing across sector regulators).
- **Notified Bodies** — third-party conformity assessment bodies for high-risk AI systems.
- **European Artificial Intelligence Board** — coordination body of national authorities.

For cloud providers, the **AI Office** is the primary interface for GPAI obligations; **national competent authorities** are the interface for high-risk system obligations of customer deployers; **notified bodies** are involved in conformity assessment for high-risk systems before market placement.

## Sanctions

The AI Act establishes administrative fines:

| Violation | Maximum fine |
|---|---|
| Prohibited AI practices | Up to **€35 million or 7% of global turnover** (higher of the two) |
| Non-compliance with high-risk AI obligations | Up to **€15 million or 3% of global turnover** |
| Provision of incorrect information to authorities | Up to **€7.5 million or 1% of global turnover** |

The 7% headline figure for prohibited practices is the highest in EU regulatory regimes — higher than GDPR's 4% and NIS2's 2%. The substantive risk for compliant providers is moderate; the substantive risk for providers operating prohibited AI is significant.

## What cloud providers must operationally build

For cloud providers preparing for full AI Act application:

**GPAI provider readiness** (Position 1 / 3):
- Model documentation library — technical documentation, training-data summaries, capability and limitation descriptions.
- Conformity assessment evidence for systemic-risk obligations.
- Cybersecurity protection for model weights and infrastructure.
- Incident response interface for the AI Office.
- Customer-facing documentation for downstream deployers.

**Infrastructure provider readiness** (Position 2):
- AI-specific Article 28 / Article 30 contract content.
- Logging and audit capabilities supporting customer obligations.
- Cooperation interface for regulatory inquiries about customer deployments.

**Customer-facing AI service readiness** (Position 3):
- Risk-tier classification of each AI service.
- Transparency notices and human-oversight features.
- Conformity assessment for high-risk services.
- Deployer documentation packs.

The operational programme is comparable in scale to DORA or NIS2 preparation. Cloud providers that began preparation in 2024 are on track; providers starting in 2026 are in catch-up mode for the August 2026 high-risk-system effective date.

## What customers must operationally build

For customers deploying AI on cloud:

- **AI inventory** — list of AI systems in use, with risk-tier classification.
- **High-risk system documentation** — for each high-risk AI system, the conformity-assessment evidence.
- **FRIA process** — for public-sector deployers, fundamental rights impact assessment workflow.
- **Human oversight design** — operational arrangements for human intervention in high-risk decisions.
- **Logging and retention** — per AI Act requirements.
- **Transparency mechanisms** — disclosure to users where AI is involved in decisions.
- **Incident response** — including serious-incident reporting under AI Act.

For NIS2-scope and DORA-scope customers, the AI Act layer integrates with existing operational resilience programmes.

:::tip[Architectural Pro Tip]
For organisations using cloud AI services, the highest-leverage AI Act preparation work is **building an AI service inventory with risk-tier classification, mapped to the cloud provider's documentation for each service**. The inventory enables (1) determination of which obligations apply to which service, (2) gap analysis against current operational capabilities, (3) supplier-side evidence collection. Without the inventory, organisations end up trying to retrofit AI Act compliance across an ad-hoc collection of AI uses — operationally painful and error-prone. Build the inventory now; populate it as new AI services are adopted; treat it as the foundation for AI Act compliance the same way the asset inventory is the foundation for cybersecurity compliance.
:::

## AI Act in the Slovak context

For Slovak organisations, AI Act application is direct (regulation applies without national transposition for the substantive content). National-level implementation activity:

- **Designation of national competent authority** for AI Act supervision — in progress as of mid-2026.
- **Public-sector AI guidance** — MIRRI is expected to issue guidance on AI in eGovernment, complementing the AI Act; this is the natural extension of MIRRI's role under [KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) and Act 95/2019.
- **Sectoral guidance** — financial sector ([NBS aligned with DORA](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay)), healthcare (ÚDZS), and other regulators are aligning with AI Act for their sectoral remit.

For Slovak public-sector entities deploying AI, the AI Act high-risk system obligations and the FRIA requirement apply directly. AI services consumed via [KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud)-listed cloud providers face the same AI Act obligations as any other deployment — the KsVC listing does not abstract or absorb AI Act compliance. Slovak commercial entities using cloud AI services have deployer obligations and (for high-risk uses) FRIA-equivalent assessment expectations.

:::tip[Slovak context]
For Slovak public-sector AI use, the practical compliance stack is **AI Act + [GDPR](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct) + [KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) + Act 95/2019 eGovernment provisions** — applied in parallel, not in alternative. A high-risk AI system deployed by a Slovak ministry must satisfy: AI Act conformity assessment, GDPR Article 22 automated-decision protections where applicable, KsVC catalogue listing for the underlying cloud service at the appropriate U-tier, and Act 95/2019 administrative procedure rules. Build the AI service inventory once; map to all four regimes. The cost of treating these as separate compliance projects is operationally significant.
:::

:::warning[Reality Check]
The AI Act is often discussed as a future regulation, but obligations have been in force since February 2025 and are expanding. Cloud providers that wait until full application (August 2026 / 2027) before building compliance programmes will not have adequate documentation, conformity assessment, or operational capability when the regulations take effect. The "we'll do it when the deadline arrives" approach has worked poorly in past EU regulatory cycles (GDPR, NIS2, DORA); it will work equally poorly for AI Act. Cloud providers and customers should treat full operational readiness as a 2026 priority, not a 2027 one.
:::

## Closing checklist

- EU AI Act (Regulation (EU) 2024/1689) applies progressively from **February 2025 through August 2027**.
- Four risk tiers: Prohibited, High-risk, Limited-risk, Minimal-risk. Parallel GPAI regime for general-purpose AI models.
- Cloud providers occupy three positions: GPAI provider, AI infrastructure provider, AI service provider.
- Customers using AI on cloud are **deployers** with risk-tier-dependent obligations. Public-sector deployers of high-risk AI require **FRIA**.
- Intersections with GDPR (Article 22, DPIA, special category data), NIS2 (supply chain, incident reporting), DORA (operational resilience for financial-sector AI), and sectoral regulation (medical, financial, employment).
- **GPAI with systemic risk** — models above 10^25 FLOPs training threshold — face additional obligations: evaluation, risk assessment, cybersecurity protection, AI Office incident reporting.
- Supervisory structure: European AI Office (GPAI), national competent authorities (sectoral), notified bodies (high-risk conformity assessment), European Artificial Intelligence Board (coordination).
- Sanctions up to **€35 million or 7% of global turnover** for prohibited practices; lower tiers for other violations.
- Build an AI service inventory with risk-tier classification — the foundation for AI Act compliance.
- Treat 2026 as the operational readiness year, not 2027. The "wait until deadline" approach has aged poorly for past EU regulatory cycles.
- See [GDPR + EU Cloud CoC article](/knowledge-base/compliance/gdpr-article-28-and-eu-cloud-code-of-conduct), [NIS2 Supply Chain](/knowledge-base/compliance/nis2-supply-chain-cloud-providers), [DORA Article 30](/knowledge-base/compliance/dora-article-30-contracts-and-exit-strategies) for the parallel regulatory layers that AI Act intersects with.
