---
title: "Cloud Encryption Key Custody — BYOK, HYOK, and the Practical Sovereignty Answer"
category: compliance
tags: ["Encryption", "BYOK", "HYOK", "Key Management", "Sovereignty", "Compliance", "Data Security", "Cross-Cutting"]
date: 2026-05-13
updated: 2026-05-13
readTime: 12
level: advanced
excerpt: "Provider-managed keys, BYOK, HYOK, External Key Stores. Every cloud sovereignty conversation eventually arrives at key custody. This article walks through the patterns, the hyperscaler implementations (AWS XKS, Azure CMK, Google EKM), the operational trade-offs, and why customer-held keys are the most practical sovereignty answer short of full sovereign cloud."
references:
  - title: "AWS KMS External Key Store (XKS)"
    url: "https://docs.aws.amazon.com/kms/latest/developerguide/keystore-external.html"
    description: "AWS Key Management Service External Key Store documentation — the most advanced hyperscaler implementation of customer-held key custody with hardware-backed key managers outside AWS."
    domain: "docs.aws.amazon.com"
  - title: "Azure Customer-Managed Keys with HSM"
    url: "https://learn.microsoft.com/en-us/azure/key-vault/keys/customer-managed-keys-overview"
    description: "Microsoft Azure's customer-managed keys overview — Azure Key Vault, Managed HSM, and the customer-controlled encryption configurations across Azure services."
    domain: "learn.microsoft.com"
  - title: "Google Cloud External Key Manager (EKM)"
    url: "https://cloud.google.com/kms/docs/ekm"
    description: "Google Cloud External Key Manager documentation — keys held outside Google Cloud in customer-controlled key managers, with cryptographic operations gated by external authorisation."
    domain: "cloud.google.com"
  - title: "Google Workspace Client-side Encryption"
    url: "https://workspace.google.com/learn-more/client-side-encryption/"
    description: "Google Workspace Client-side Encryption — end-to-end encryption with customer-held keys for Drive, Calendar, Meet, and other Workspace services."
    domain: "workspace.google.com"
  - title: "FIPS 140-3 Cryptographic Module Validation"
    url: "https://csrc.nist.gov/projects/cryptographic-module-validation-program"
    description: "NIST's FIPS 140-3 standard for cryptographic modules — the international reference for HSM and software cryptographic-module certification."
    domain: "csrc.nist.gov"
  - title: "ENISA Cloud Encryption Guidance"
    url: "https://www.enisa.europa.eu/topics/data-protection/data-protection-engineering"
    description: "ENISA's guidance on encryption practices for cloud, including key management patterns and recommendations for sovereignty-relevant deployments."
    domain: "enisa.europa.eu"
---

Every cloud sovereignty conversation eventually arrives at **key custody**. Provider-managed keys are operationally simple but leave the provider with technical access to plaintext. Customer-managed keys with provider-controlled key managers add customer authority over key lifecycle but still allow the provider's infrastructure to perform decryption. Customer-held keys with external key managers — BYOK in the strict sense, HYOK in the strongest sense — constrain the provider's plaintext access cryptographically. For workloads where full sovereign cloud is overkill but provider-managed encryption is inadequate, customer-held keys are the practical sovereignty answer. This article walks through the patterns, the hyperscaler implementations, and the operational trade-offs.

## The four key-custody patterns

Cloud encryption-at-rest commonly uses one of four custody patterns. The patterns differ in **who holds the key**, **who controls the key lifecycle**, and **where the decryption operation happens**.

| Pattern | Key holder | Key lifecycle control | Decryption location | Plaintext access by provider |
|---|---|---|---|---|
| **Provider-Managed Keys (PMK)** | Provider | Provider | Provider infrastructure | Yes (by design) |
| **Customer-Managed Keys, provider KMS (CMK)** | Provider (in customer-owned vault) | Customer | Provider infrastructure | Yes, with customer audit |
| **BYOK (Bring Your Own Key)** | Customer generates; provider imports into provider KMS | Customer | Provider infrastructure | Yes, but customer can rotate or revoke |
| **HYOK / External Key Store** | Customer | Customer | Provider calls customer key manager for cryptographic operations | Constrained — provider cannot decrypt without customer-side authorisation |

The four are progressive. PMK is the default for most cloud services and is operationally simplest. CMK and BYOK move authority toward the customer without changing where decryption happens. HYOK / External Key Store moves the cryptographic operation itself — or the authorisation for it — outside the provider's infrastructure.

## Provider-Managed Keys — the default

Most cloud services use PMK by default. The provider generates encryption keys, stores them in its KMS, and uses them to encrypt customer data at rest. The customer sees encryption-at-rest as a configuration toggle ("Encryption: enabled"); the key management is transparent.

**Strengths**:
- Simplest operational model.
- Zero customer key-management overhead.
- Lowest performance overhead.
- Provider handles key rotation, durability, recovery.

**Weaknesses**:
- Provider has full technical access to plaintext.
- Compelled disclosure to the provider's jurisdiction (US CLOUD Act, FISA, equivalent) reaches plaintext.
- No customer cryptographic constraint on provider personnel access.

PMK is adequate for low-sensitivity data, public/operational data, or workloads where the customer trusts the provider's operational controls without cryptographic enforcement. It is not adequate for workloads where the provider's plaintext access is itself a risk vector — high-sensitivity personal data, financial-services data at the higher tiers, classified information, or workloads subject to sovereignty requirements.

## Customer-Managed Keys (CMK) with provider KMS

CMK keeps the keys in the provider's KMS but gives the customer control of the key lifecycle:

- Customer creates the key in a customer-controlled vault (Azure Key Vault, AWS KMS Customer-Managed Keys, Google Cloud KMS).
- Customer controls key rotation, deletion, access policies.
- Provider services use the key by reference, not by direct possession.
- Audit logs record every key use, accessible to the customer.

**Strengths**:
- Customer has full visibility into key use.
- Customer can revoke key access, instantly disabling decryption.
- Audit trail supports compliance reporting.
- Operationally lighter than BYOK or HYOK.

**Weaknesses**:
- Provider's KMS infrastructure still performs cryptographic operations.
- Provider personnel with sufficient privilege can theoretically access plaintext.
- Compelled disclosure still reaches plaintext.

CMK is the sweet spot for many regulated workloads. It addresses customer visibility and revocation without the operational cost of external key managers.

## BYOK — Bring Your Own Key

BYOK in the strict sense means the customer generates the key material outside the provider and imports it into the provider's KMS. The provider then uses the imported key as if it were a CMK.

The distinction from CMK is the **provenance** of the key material:

- CMK keys are generated in the provider's KMS (the provider's HSM produces the random key material).
- BYOK keys are generated by the customer (typically in a customer-controlled HSM) and imported.

This matters for regulatory contexts where the customer must demonstrate that key material was generated under customer control. Some national frameworks ([KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) U3+ implicitly, [SecNumCloud](/knowledge-base/compliance/france-anssi-secnumcloud-qualification) strictly) prefer or require customer-generated key material.

**Operationally**, BYOK adds:

- A customer-controlled HSM (on-premises or in customer-controlled cloud).
- Key generation in the customer HSM.
- Secure transport of the key material to the provider's KMS via key import workflow.
- Re-import on key rotation.

The key, once imported, lives in the provider's KMS like any other CMK. The cryptographic operation still happens in the provider's infrastructure.

## HYOK / External Key Store — the strongest pattern

HYOK (Hold Your Own Key) or External Key Store moves further: the **key never leaves the customer's control**. The provider calls out to a customer-controlled key manager for cryptographic operations.

**Mechanics**:

- Customer operates an external key manager (typically a customer-controlled HSM or HSM-as-a-service).
- The provider's service, when it needs to encrypt or decrypt, sends a request to the customer's key manager.
- The customer's key manager performs the cryptographic operation (or releases a wrapping key) and returns the result.
- The customer's key manager logs every request and can authorise or deny.

The decryption authority is **outside the provider's infrastructure**. If the customer's key manager is unreachable or denies the request, the provider cannot decrypt — even if compelled by legal process. The cryptographic constraint is the substantive sovereignty mechanism.

**Strengths**:
- Strongest practical constraint on provider plaintext access without full sovereign cloud.
- Customer holds the cryptographic authority.
- Compelled disclosure to provider's jurisdiction does not reach plaintext without customer cooperation.
- Highest assurance level for sovereignty-sensitive workloads.

**Weaknesses**:
- Significant performance overhead — every cryptographic operation requires a network round-trip to the customer key manager.
- Operational complexity — the customer key manager must be highly available, secure, and operationally robust.
- Cost — customer HSMs, HSM-as-a-service, or customer-controlled key manager infrastructure.
- Recovery risk — if the customer key manager is destroyed or inaccessible, customer data may be irretrievably encrypted.

HYOK is suitable for the highest-sensitivity workloads where the operational cost is justified by the sovereignty assurance. It is not suitable for high-throughput workloads where the per-operation latency penalty is unacceptable.

## Hyperscaler implementations

### AWS KMS External Key Store (XKS)

AWS's XKS is the most advanced hyperscaler implementation of HYOK. Mechanics:

- Customer operates an **External Key Store Proxy (XKS Proxy)** — a customer-controlled service that fronts a customer HSM or HSM cluster.
- AWS services (S3, EBS, RDS, etc.) configured to use an XKS-backed AWS KMS key route cryptographic operations to the XKS Proxy via authenticated HTTPS.
- The XKS Proxy authenticates AWS, validates the request, performs the cryptographic operation in the customer HSM, returns the result.
- The customer HSM holds the key material; AWS never possesses the key.
- The customer can disable, delete, or rotate the key in the customer HSM, immediately affecting AWS service operations.

XKS is supported across a growing set of AWS services. Performance overhead is real (per-operation latency on the network round-trip) but acceptable for many workloads.

XKS is a key component of AWS's [Digital Sovereignty Pledge](/knowledge-base/compliance/hyperscaler-eu-data-boundary-commitments) and a candidate path for workloads requiring strong sovereignty without full AWS European Sovereign Cloud.

### Azure Customer-Managed Keys with Managed HSM

Microsoft's pattern is layered:

- **Azure Key Vault Standard** — software-protected keys; customer-managed lifecycle.
- **Azure Key Vault Premium** — HSM-protected keys (FIPS 140-2 Level 2).
- **Azure Managed HSM** — dedicated single-tenant FIPS 140-3 Level 3 HSM controlled by the customer.
- **Customer Lockbox** — customer approval required for Microsoft personnel access to customer data in specific scenarios.

For HYOK-equivalent posture on Azure, customers use **Managed HSM** combined with **Bring Your Own Key Vault** patterns and Customer Lockbox controls. The cryptographic operations happen in Azure infrastructure, but the key material is customer-controlled and the access path is customer-auditable.

Microsoft has also developed dedicated sovereign offerings like **[Microsoft Cloud for Sovereignty](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape)** which integrate customer-key-control patterns with broader sovereignty controls.

### Google Cloud External Key Manager (EKM)

Google's EKM is HYOK-equivalent. Mechanics:

- Customer operates an external key manager (Equinix SmartKey, Thales CipherTrust, Fortanix DSM, Atos Trustway DataProtect, others).
- Google Cloud services (BigQuery, Cloud SQL, Persistent Disk, GCS) configured to use EKM route cryptographic operations to the external key manager.
- The external key manager authorises or denies the request based on customer-controlled policy.
- Customer key material never enters Google Cloud.

EKM is supported across a growing Google Cloud service set. Like AWS XKS, performance overhead is real but acceptable for many use cases.

### Google Workspace Client-side Encryption (CSE)

For Workspace-level data (Drive, Docs, Calendar, Meet recordings), Google operates **Client-side Encryption (CSE)** — keys are held outside Google in a customer-controlled key management service; encryption and decryption happen on the **client side** (the user's browser or application), not in Google's infrastructure.

CSE is the strongest pattern of all — Google has no plaintext access at any point because the encryption is performed on the client before data reaches Google's servers. It is operationally heavier (requires customer-side key management integration and client-side cryptographic operations) but addresses the strictest sovereignty requirements for Workspace.

## Mapping to national frameworks

The customer-key-custody patterns map to national framework requirements at the higher tiers:

| Framework | Tier | Key custody expectation |
|---|---|---|
| **[KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud)** | U2 | Tenant-level encryption; provider-side key custody OK |
| **KsVC** | U3 | Customer-held HSM-based key custody |
| **KsVC** | U4 | Private government cloud; HSM held by customer in state-controlled infrastructure |
| **[SecNumCloud](/knowledge-base/compliance/france-anssi-secnumcloud-qualification)** | All | Provider-side key custody acceptable within qualified provider, but cryptographic algorithms must follow ANSSI recommendations |
| **[ENS](/knowledge-base/compliance/spain-ens-national-security-framework)** | Alta | Stricter requirements on key management — customer-controlled where appropriate |
| **[ACN Qualificazione](/knowledge-base/compliance/italy-acn-cloud-qualification)** | QC3+ | Customer-controlled cryptographic posture per service |
| **[BSI C5](/knowledge-base/compliance/germany-bsi-c5-cloud-attestation)** | All | Cryptographic controls required; specific patterns are customer choice |
| **[PiTuKri](/knowledge-base/compliance/finland-pitukri-cloud-assessment)** | TL III+ | Customer-controlled key custody for higher TL levels |
| **[DORA](/knowledge-base/compliance/dora-for-cloud-financial-sector-overlay)** | All | Cryptographic posture covered by Article 30 data security clause; customer-controlled keys increasingly expected for high-sensitivity financial workloads |

The pattern: at higher tiers across most national frameworks, customer-controlled keys (BYOK or HYOK) become the expected posture. The frameworks rarely mandate the specific pattern, but the practical implementation typically converges on customer-held HSM or external key manager arrangements.

## Mapping to data classifications

For workload-level decisions about which custody pattern to use, the classification of the data is the primary input:

| Classification | Typical pattern |
|---|---|
| Public / open data | PMK is fine |
| Operational business data | PMK or CMK |
| Personal data (GDPR) | CMK; BYOK for high-volume processing |
| Financial-services data | CMK or BYOK; HYOK for high-sensitivity workloads |
| Health data (special category under GDPR Article 9) | BYOK minimum; HYOK preferred |
| Confidential / regulated commercial data | BYOK or HYOK |
| National-classified information | HYOK if cloud-resident at all; otherwise non-cloud handling |

## The operational gap — recovery and resilience

The strength of customer-held keys is also their risk: the customer becomes the single point of failure for key recovery. If the customer's key manager is destroyed, the data is effectively destroyed.

Mature HYOK / external-key-store deployments include:

- **Multi-region key manager deployments** — primary + replica in different regions.
- **Key escrow** — copies of key material in cold storage under separate authorisation.
- **Key derivation hierarchies** — root keys protect tenant keys protect data keys; loss of a data key affects less than loss of a root key.
- **Tested recovery procedures** — periodic exercises confirming the recovery path works.
- **Key destruction policies** — explicit decisions about when key destruction is a feature (data sanitisation by cryptographic erasure) and when it would be catastrophic.

Customers contemplating HYOK should plan the operational architecture before the cryptographic architecture. The cryptographic mechanism is well-understood; the operational discipline is where deployments succeed or fail.

## HSM patterns — where the key actually lives

The customer's key manager is typically backed by an HSM. Common patterns:

- **On-premises HSM** — customer-owned hardware in customer-controlled facilities. Highest sovereignty; highest operational overhead.
- **HSM-as-a-service** — managed HSM from a third party (Equinix SmartKey, Atos Trustway, Thales CipherTrust as a Service, Fortanix Data Security Manager). The HSM is dedicated to the customer; the operations are managed by the HSM-aaS provider.
- **Hyperscaler-resident HSM in customer control** — AWS CloudHSM, Azure Dedicated HSM, Google Cloud HSM (within Cloud KMS). HSM hardware in the hyperscaler's data centres but dedicated to one customer with customer-controlled key material.
- **Multi-cloud HSM** — HSM-aaS deployments that bridge multiple clouds, supporting workloads that span hyperscalers.

The choice depends on sovereignty requirements, operational capability, and cost. For workloads where the sovereignty driver is foreign-law exposure of the cloud provider, an HSM-aaS option from an EU-resident provider can be the right architectural answer.

:::tip[Architectural Pro Tip]
For most regulated workloads, the architectural sweet spot is **EU mainline cloud region + Customer-Managed Keys with HSM-protected key material in an EU-resident key management service**. This combination addresses (1) data location via the EU region, (2) operational sovereignty via customer-controlled key lifecycle, and (3) cryptographic sovereignty via HSM-backed keys outside the cloud provider's primary infrastructure. Full HYOK / external key store is reserved for the highest-sensitivity workloads where the operational overhead is justified. Provider-Managed Keys are reserved for explicitly low-sensitivity workloads. The mid-tier — CMK with HSM-backed customer-controlled keys — handles 80% of regulated cloud workloads in practice and is the right default for most architects designing for European regulatory environments.
:::

## Auditability and reporting

Customer-controlled keys produce stronger audit evidence than provider-managed keys:

- Every cryptographic operation is logged by the customer's key manager.
- Failed authorisations are recorded with full context (who, when, requested-by, denied-by).
- Operations are independent of the cloud provider's audit infrastructure.
- The audit log is a customer-side artefact, satisfying customer evidence requirements directly.

For regulated workloads where audit-trail integrity matters, customer-controlled keys add an evidence layer that provider-managed keys cannot replicate.

:::warning[Reality Check]
HYOK and external key managers are sometimes marketed as a complete answer to cloud sovereignty. They are not. They constrain the provider's cryptographic access to data; they do not address every sovereignty dimension. The cloud provider can still see metadata, traffic patterns, system logs, telemetry, and operational data even when data content is HYOK-encrypted. For some sovereignty concerns (national classified information, top-tier financial systemic risk), HYOK is necessary but not sufficient — a full sovereign cloud arrangement is required. Map your sovereignty requirements precisely before assuming HYOK closes the gap.
:::

:::tip[Slovak context]
For Slovak public-sector workloads at [KsVC](/knowledge-base/compliance/slovakia-ksvc-mirri-government-cloud) U3, the methodology requires HSM-based key custody on the customer side — meaning a Slovak public-administration entity using a U3-tier cloud service must operate a customer-controlled HSM holding the key material. The MIRRI methodology does not prescribe the specific HSM pattern; in practice, the HSM-aaS deployments (Atos Trustway, Thales CipherTrust as a Service) hosted in EU-resident infrastructure are the operationally efficient route. For U4-tier workloads, the HSM is typically held within state-controlled infrastructure. Slovak commercial entities serving regulated customers (banks under NBS supervision, insurers, healthcare entities) face the same operational architecture choice — for these customers, EU-resident HSM-aaS plus hyperscaler EU mainline region with XKS/EKM-equivalent is the typical pattern.
:::

## Closing checklist

- Four key-custody patterns: PMK, CMK, BYOK, HYOK. Progressive in customer control over cryptographic authority.
- **PMK** — provider-managed; simplest; suitable for low-sensitivity data only.
- **CMK** — customer-managed key in provider KMS; customer controls lifecycle; provider performs operations. Sweet spot for many regulated workloads.
- **BYOK** — customer generates key, imports to provider KMS. Distinct from CMK by key provenance; useful where regulatory framework demands customer-generated material.
- **HYOK / External Key Store** — customer holds key in external key manager; provider calls out for operations; provider has no plaintext access without customer cooperation. Strongest practical sovereignty pattern short of full sovereign cloud.
- Hyperscaler implementations: AWS KMS XKS, Azure Managed HSM + CMK + Customer Lockbox, Google Cloud EKM, Google Workspace Client-side Encryption.
- National frameworks at higher tiers (KsVC U3+, ENS Alta, ACN QC3+, PiTuKri TL III+) typically expect customer-controlled keys.
- Operational gap: customer holds key recovery risk. Plan multi-region key managers, key escrow, tested recovery procedures.
- HSM patterns: on-premises, HSM-aaS, hyperscaler-resident dedicated HSM, multi-cloud HSM-aaS.
- Default for regulated workloads: EU mainline region + CMK with HSM-backed key material in EU-resident key management. HYOK reserved for highest-sensitivity workloads.
- Customer-controlled keys produce stronger audit evidence than provider-managed keys.
- HYOK addresses cryptographic sovereignty but not metadata sovereignty. Map requirements precisely.
- See [Hyperscaler EU Data Boundary article](/knowledge-base/compliance/hyperscaler-eu-data-boundary-commitments) for the data-location dimension that combines with key custody, [Sovereign Cloud Products article](/knowledge-base/compliance/sovereign-cloud-products-2026-landscape) for the full sovereign alternatives, and country articles for national framework key-custody expectations.
