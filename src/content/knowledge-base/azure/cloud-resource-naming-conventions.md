---
title: "Cloud Resource Naming Conventions: Azure, OCI and AWS"
category: azure
tags: ["Azure", "OCI", "AWS", "Naming Conventions", "Governance", "IaC"]
date: 2025-02-18
level: intermediate
excerpt: "Inconsistent resource names are a silent operational risk. This guide covers practical naming patterns for Azure, OCI and AWS that survive at enterprise scale."
---

Naming conventions are one of the least glamorous topics in cloud architecture. They are also one of the most consequential. A resource named `vm-prod-001` tells you almost nothing. A resource named `vm-westeu-prod-paymentapi-001` tells you its type, region, environment, workload, and sequence — all without opening the portal.

This article covers practical naming patterns for Azure, OCI and AWS, the constraints each platform imposes, and how to design a cross-cloud naming standard that stays consistent as your estate grows.

## Why Naming Matters at Scale

In a single-account, single-region deployment you can tolerate fuzzy naming. At enterprise scale, you cannot.

- **Search and filtering**: well-structured names make `az resource list`, `oci search` and `aws resourcegroupstaggingapi` queries precise and fast
- **Cost attribution**: names feed cost reports; names without environment or workload context make chargebacks impossible
- **IaC readability**: a Terraform module that names resources predictably is far easier to review than one that names them with random suffixes
- **Incident response**: when `db-eastus-prod-orders-001` goes down at 2 AM, the name alone tells the on-call engineer what they are looking at

## Structural Components of a Good Name

A resource name should encode the properties that matter for operations and governance. The commonly used components are:

| Component | Example values | Notes |
|---|---|---|
| Resource type | `vm`, `vnet`, `bucket`, `fn` | Abbreviated, lowercase |
| Region / location | `westeu`, `eastus`, `apeast` | Abbreviated to stay short |
| Environment | `prod`, `stg`, `dev`, `sandbox` | Always explicit — never implied |
| Workload / application | `payments`, `auth`, `orders` | Short identifier, no spaces |
| Instance index | `001`, `002` | Zero-padded for sortability |

A safe general pattern: `{type}-{region}-{env}-{workload}-{index}`

## Azure Naming Constraints

Azure imposes some of the most varied constraints of the three platforms. Key rules to know:

- **Storage accounts**: 3–24 characters, lowercase letters and numbers only, globally unique across all of Azure. No hyphens. This means `stwesteuprodstorage01` instead of `st-westeu-prod-storage-01`.
- **Resource groups**: 1–90 characters, allows hyphens and underscores.
- **Virtual machines**: 1–15 characters on Windows, 1–64 on Linux. Keep VM names short.
- **Key Vaults**: 3–24 characters, globally unique. Soft-delete means the name is reserved for 90 days after deletion.

```hcl
# Terraform example — Azure naming locals
locals {
  prefix = "${var.resource_type}-${var.region_short}-${var.environment}-${var.workload}"

  # Storage accounts strip hyphens and enforce max 24 chars
  storage_prefix = substr(
    replace(local.prefix, "-", ""),
    0, 20  # leave 4 chars for numeric suffix
  )
}
```

### Azure Recommended Abbreviations

Microsoft publishes a reference list of abbreviations in the Cloud Adoption Framework. Some commonly used ones:

| Resource | Abbreviation |
|---|---|
| Virtual machine | `vm` |
| Virtual network | `vnet` |
| Subnet | `snet` |
| Network security group | `nsg` |
| Storage account | `st` |
| Key Vault | `kv` |
| App Service | `app` |
| Function App | `func` |
| Azure Kubernetes Service | `aks` |

## OCI Naming Constraints

OCI is more permissive than Azure in most cases. Display names can include spaces, but avoid them in practice — many CLI and SDK operations become awkward.

- **Compartments**: names up to 100 characters, unique within the parent compartment.
- **VCN and subnets**: names up to 255 characters, no uniqueness enforcement across the tenancy (unlike Azure).
- **Object Storage buckets**: names up to 256 characters, unique per namespace (region-scoped).
- **Compute instances**: display name is free text but the hostname derived from it is subject to OS constraints.

OCI uses a hierarchical tenancy model (root → compartment → sub-compartment). Embed the compartment path in your naming scheme so that flat API output remains interpretable:

```
vcn-apeast-prod-platform-001
snet-apeast-prod-platform-app-001
snet-apeast-prod-platform-db-001
```

One OCI-specific consideration: **IAM policies reference compartment and resource names directly**. If you rename a compartment after policies are written, references break silently. Treat compartment names as immutable once policies are attached.

## AWS Naming Constraints

AWS is the most permissive but also the most inconsistent platform — constraints vary significantly between services.

- **S3 buckets**: 3–63 characters, lowercase, no underscores, globally unique across all AWS accounts and regions.
- **IAM roles and policies**: 1–128 characters, allows hyphens and underscores, unique per account.
- **EC2 instances**: the `Name` tag is what you see in the console — the actual resource ID is machine-generated. Naming is purely a tagging concern.
- **Lambda functions**: 1–140 characters, unique per region per account.

Because many AWS resources are identified by machine-generated IDs rather than names, the **tagging strategy is your real naming convention on AWS**:

```json
{
  "Environment": "prod",
  "Workload":    "payments",
  "Region":      "eu-west-1",
  "ManagedBy":   "terraform",
  "CostCenter":  "platform-eng"
}
```

Make `Name`, `Environment`, `Workload` and `ManagedBy` mandatory tags enforced via AWS Config rules or Service Control Policies.

## Cross-Cloud Consistency

If you operate across all three platforms, align the structural components so that naming logic is portable even when the syntax differs.

```
# Azure
rg-westeu-prod-payments           (resource group)
vm-westeu-prod-payments-001       (virtual machine)

# OCI
cmp-apeast-prod-payments          (compartment)
instance-apeast-prod-payments-001 (compute instance)

# AWS
rg-euwest-prod-payments           (resource group / tag)
ec2-euwest-prod-payments-001      (Name tag on EC2)
```

The operational benefit: an engineer moving between platforms reads names with the same mental model. Region, environment, and workload are always in the same positions.

## IaC Integration

Embed your naming convention in a single module or set of locals that every other module consumes. Never let individual teams name resources ad hoc in their own modules.

```hcl
# modules/naming/main.tf
variable "resource_type" { type = string }
variable "region"        { type = string }
variable "environment"   { type = string }
variable "workload"      { type = string }
variable "index"         { type = number  default = 1 }

locals {
  region_map = {
    "westeurope"  = "westeu"
    "eastus"      = "eastus"
    "ap-east-1"   = "apeast"
  }
  name = join("-", [
    var.resource_type,
    local.region_map[var.region],
    var.environment,
    var.workload,
    format("%03d", var.index)
  ])
}

output "name" { value = local.name }
```

Every team consumes `module.naming.name` and gets a consistent result. When the convention changes, it changes in one place.

## Common Mistakes

**Using free text descriptions instead of structured tokens.** Names like `john-test-vm` or `temp-storage-deleteme` accumulate and become permanent. Enforce a structured schema from day one.

**Skipping the environment token.** The most dangerous naming mistake: a resource named `db-westeu-orders-001` could be production or development. Always make the environment explicit.

**Ignoring platform character limits during design.** A naming scheme designed for Azure Key Vault must fit in 24 characters. Many teams discover this after their IaC modules are already written.

**Using underscores as the separator.** Hyphens are safer — Azure storage accounts and S3 buckets disallow hyphens in some cases, but underscores cause problems in DNS contexts (hostnames, endpoint URLs). Hyphens are the safer universal separator.

## Summary

A good naming convention is short enough to be readable, structured enough to be filterable, and consistent enough that an engineer encountering a resource for the first time knows immediately what it is and where it belongs. Define it early, encode it in IaC, and treat it as an organisational standard — not a team preference.