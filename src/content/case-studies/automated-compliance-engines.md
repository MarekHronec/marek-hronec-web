---
title: "Automated Compliance Engines for Healthcare"
client: "Regional Healthcare Network"
industry: "Healthcare"
duration: "5 Months"
tags: ["AWS", "Python", "HIPAA", "Lake Formation", "PII"]
featured: false
metrics:
  - label: "PII Detection"
    value: "99.97%"
  - label: "Audit Coverage"
    value: "100%"
excerpt: "Building a HIPAA-compliant data lake with automated PII masking and audit trails using AWS Lake Formation."
---

## The Problem

A regional healthcare network needed to consolidate patient data across 12 legacy systems for analytics, but every system held PHI (Protected Health Information). Existing manual audit processes covered less than 30% of data flows, creating significant HIPAA exposure.

## Architecture Decision

The solution centred on AWS Lake Formation as the permission boundary, with a custom PII detection pipeline layered on top:

- **Ingestion**: Glue crawlers with custom classifiers for HL7/FHIR record patterns
- **Detection**: Python-based PII scanner using Comprehend Medical for entity extraction
- **Masking**: Tokenisation service — original values stored in KMS-encrypted vault, tokens in the lake
- **Audit**: All data access events streamed to an append-only CloudTrail lake with Athena query access

## The Outcome

Automated PII detection achieved 99.97% recall across all 12 source systems. Audit coverage moved from 30% to 100% on day one of go-live. The compliance team reduced manual review hours by 80%, redirecting effort to exception handling rather than routine verification.