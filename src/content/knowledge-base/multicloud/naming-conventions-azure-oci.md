---
title: "Naming Conventions That Survive Both Azure and OCI"
category: multicloud
tags: ["Azure", "OCI", "Naming", "Governance", "IaC", "Terraform", "Bicep"]
date: 2026-04-30
readTime: 11
level: beginner
excerpt: "Names are largely permanent. They get embedded in IaC, DNS, certificates, audit trails, and Private Endpoint zones. A bad convention is technical debt you pay forever — and the standard recipes break the moment your estate hits real scale. Here is what actually holds up."
---

There is a moment early in every cloud project when someone asks "what should we call the storage account?" and someone else says "we'll figure it out, just call it `mystorage01` for now." That conversation is the start of years of pain. Naming convention work looks like bikeshedding until the day you cannot create a new storage account because every variation of the workload name is taken globally, or until you are doing a multicloud migration and your dashboards cannot tell which `prod-app-01` lives in which cloud.

The naming convention is not the most exciting governance artefact. It is one of the most permanent. Once names are deployed and embedded in IaC, DNS, and certificates, you do not get to change your mind without a rebuild.

## What "naming convention" actually means

Three things masquerade under the label *naming convention* and they have different requirements:

1. **The resource name** — the identifier used by the cloud provider's API. Permanent for most resource types. Subject to length, character, and uniqueness rules that vary by service.
2. **The display name** — what humans see in dashboards, tickets, and reports. Sometimes the same as the resource name, sometimes a separate human-friendly version.
3. **Tags** — mutable key-value metadata. Tags are where almost everything that *changes* should live. Tags are not naming.

The cardinal rule, written above your monitor: **anything that might change goes in a tag, not a name**. Owner changes? Tag. Cost centre changes? Tag. Environment promotion? Tag. Resource type? Name — that one is fixed at creation.

## Azure: the rules you cannot negotiate with

Microsoft's Cloud Adoption Framework recommends a pattern roughly like:

```
<resource-type-abbrev>-<workload>-<environment>-<region-abbrev>-<instance>
```

So `rg-payments-prod-weu-001` is a resource group, `vnet-payments-prod-weu-001` is a virtual network, and so on. The framework gives you a list of recommended abbreviations: `rg-` for resource groups, `vnet-` for virtual networks, `kv-` for Key Vault, `app-` for App Service, `aks-` for Kubernetes clusters, and so on. Use the CAF abbreviation list as the default unless you have a strong reason not to. The value is not that Microsoft enforces it; the value is that your documentation, policies, and IaC can share a common vocabulary.

Where this falls apart is at the constrained resource types. **Storage accounts** are the canonical example: 3–24 characters, lowercase letters and numbers only, no hyphens, globally unique because the name becomes a DNS hostname. Your beautiful `st-payments-prod-westeurope-001` is invalid before you finish typing it. The CAF guidance for storage accounts is to drop the hyphens and concatenate: `stpaymentsprodweu001`. Container Registries follow the same rule. Data Lake Storage Gen2 inherits storage account constraints because it *is* a storage account underneath.

The other landmines:

| Resource | Length | Allowed | Scope |
|---|---|---|---|
| Storage account | 3–24 | lowercase a-z, 0-9, no hyphens | global |
| Key Vault | 3–24 | a-z, A-Z, 0-9, hyphens; must start with letter | global |
| Container Registry | 5–50 | alphanumeric only | global |
| Windows VM resource name | 1–64 | letters, digits, hyphens | resource group |
| Windows VM hostname | 1–15 | alphanumeric, hyphens (NetBIOS limit) | resource group |
| Linux VM | 1–64 | letters, digits, hyphens | resource group |
| Resource Group | 1–90 | alphanumeric, hyphens, periods, underscores | subscription |
| App Service | 2–60 | alphanumeric, hyphens | global |

The 15-character Windows hostname limit is where most schemas explode. If the convention uses the same string for the Azure VM resource name and the guest OS hostname — which the portal does by default — design for the hostname limit or document a separate hostname pattern. With a CAF-style name you might be writing `vm-paymentsapi-prod-weu-001`, which is 26 characters. You have to abbreviate aggressively or accept that VM names break the pattern. Most teams accept a shortened pattern for VMs only and document it as a deliberate exception.

For globally-unique resources (storage, Key Vault, ACR, App Service, Cosmos DB), the global namespace is contested. Common workload names like `dataprod` are long gone. The defensive pattern is to add an org prefix and sometimes a short hash:

```
# A storage account that won't collide
stcontosopaymentsprodweu001
# Or with a deterministic short hash for guaranteed uniqueness
stcontosopaymentsprodweu7a2c
```

## OCI: more permissive, different gotchas

OCI is forgiving about display names because most resources are addressed by OCID. The display name on a compute instance is a human-readable label; the OCID is what every API call actually uses. But constrained names still exist:

- **Object Storage buckets** must be unique within the tenancy's Object Storage namespace.
- **Compartment names** must be unique within their parent compartment, with a maximum of 100 characters and a restricted character set.
- **Autonomous Database names and database identifiers** have service-specific constraints; validate them separately in IaC.

OCI lets you reuse display names more freely than Azure, which is convenient but dangerous: two resources with the same display name in different regions or compartments are valid, but painful in dashboards unless your convention disambiguates them.

What OCI does *not* give you: a CAF-equivalent abbreviation list. Oracle has not published a canonical "use these prefixes for these resource types" guide. You are inventing your own. The pragmatic approach is to mirror the Azure CAF pattern and document it internally:

| Resource | Suggested abbreviation |
|---|---|
| Compartment | (no prefix; name describes scope) |
| VCN | `vcn-` |
| Subnet | `sub-` |
| Compute instance | `vm-` |
| Block volume | `bv-` |
| Object Storage bucket | `bkt-` |
| Vault | `vlt-` |
| Autonomous DB | `adb-` |
| OKE cluster | `oke-` |
| Functions application | `fn-` |

The point is not which abbreviations you pick. The point is that they exist and your IaC enforces them.

## The schema that holds up across both clouds

After watching this fail at enough organisations, here is the pattern that survives:

```
<cloud-prefix>-<resource-type>-<workload>-<env>-<region>-<instance>
```

Examples:

```
az-rg-payments-prod-weu-001
az-vnet-payments-prod-weu-001
az-kv-payments-prod-weu-001
oci-vcn-payments-prod-fra-001
oci-vlt-payments-prod-fra-001
```

For constrained resources, drop the hyphens but keep the order:

```
azstpaymentsprodweu001
ocibktpaymentsprodfra001
```

The cloud prefix is the part everyone underestimates. Without it, your dashboards, log queries, IaC modules, and KQL/SQL queries cannot answer "which cloud does this resource live in?" without a join. With it, every name is self-identifying. Two characters of prefix saves you a join across your entire estate.

```hcl
# Terraform locals — define your schema once, reuse everywhere
locals {
  cloud       = "az"  # or "oci"
  workload    = "payments"
  environment = "prod"
  region      = "weu"
  instance    = "001"

  # Standard hyphenated form
  rg_name      = "${local.cloud}-rg-${local.workload}-${local.environment}-${local.region}-${local.instance}"
  vnet_name    = "${local.cloud}-vnet-${local.workload}-${local.environment}-${local.region}-${local.instance}"

  # Constrained form (storage account, container registry)
  storage_name = "${local.cloud}st${local.workload}${local.environment}${local.region}${local.instance}"
}
```

For Azure-only estates, the `aztfmod/azurecaf` Terraform provider does this automatically and validates against Azure's actual rules — well worth using:

```hcl
data "azurecaf_name" "storage" {
  name          = "payments"
  resource_type = "azurerm_storage_account"
  prefixes      = ["az"]
  suffixes      = ["prod", "weu", "001"]
  clean_input   = true
}

resource "azurerm_storage_account" "this" {
  name                     = data.azurecaf_name.storage.result
  resource_group_name      = azurerm_resource_group.this.name
  location                 = azurerm_resource_group.this.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
}
```

OCI has no equivalent provider. You build the same logic with `locals` and discipline.

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>In multicloud environments, the cloud prefix should be the default on every resource name. It costs two characters and saves every "wait, which cloud is this in?" for the rest of the estate's life. Document the rare exceptions — resources where length or provider naming rules make it genuinely impractical — but treat them as exceptions, not the norm.</p>
  </div>
</div>

## Enforcement, because conventions on a wiki are fiction

A naming convention nobody enforces is a wiki page. The enforcement options:

1. **In IaC modules.** The Terraform module that creates the resource group computes the name from inputs. There is no way to deploy a non-compliant resource without rewriting the module. This is the strongest enforcement and the cheapest to maintain.
2. **In Azure Policy.** A policy with effect `deny` blocks resource creation if the name does not match a regex. Useful for catching ClickOps and preventing engineers from bypassing the IaC.
3. **In OCI via IaC modules and post-creation detection.** OCI does not have an Azure Policy equivalent for pre-create naming denial. The practical pattern is IaC modules plus CI validation as the primary enforcement layer. OCI Events and Functions can detect, notify, tag, or remediate non-compliant resources after creation, but they are not a substitute for pre-deployment validation.

The realistic mix in a mature org is: IaC modules enforce 95% of cases (because IaC is the default deployment path), Azure Policy catches the ClickOps stragglers; on OCI the same IaC-first principle applies, with Events and Functions as a post-creation detection layer.

```bicep
// Azure Policy fragment — deny non-compliant storage account names
{
  "if": {
    "allOf": [
      {
        "field": "type",
        "equals": "Microsoft.Storage/storageAccounts"
      },
      {
        "field": "name",
        "notMatch": "[a-z]{2}st[a-z0-9]{1,18}"
      }
    ]
  },
  "then": {
    "effect": "deny"
  }
}
```

## What goes in a name vs what goes in a tag

The decision rule:

| Belongs in the **name** | Belongs in **tags** |
|---|---|
| Cloud (`az`, `oci`) | Owner (`alice@example.com`) |
| Resource type abbreviation | Cost centre (`FIN-101`) |
| Workload identifier | Data classification (`internal`, `confidential`) |
| Environment (`dev`, `prod`) | Compliance scope (`pci`, `hipaa`) |
| Region | Maintenance window |
| Instance number | Created-by, created-date |

If anyone asks "but the cost centre might change" — that is the whole point. Tags are mutable. Names are not.

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Reality Check</p>
    <p>Microsoft's CAF naming pages look clean in a slide deck and break the moment you hit petabyte scale, twelve regions, or your first M&amp;A. The official examples never show what happens when the same workload exists in three regions across two business units, or when a 15-character VM name has to encode all of it. Plan for the constrained cases first; the easy ones will follow.</p>
  </div>
</div>

## Multicloud factor

A naming convention is multicloud-portable if and only if every component can be expressed identically on both sides. The schema above does that, with one caveat: regions have different abbreviations on Azure and OCI, and you do not get to harmonise them. Microsoft uses `weu` for West Europe, `eus` for East US. OCI uses `fra` for Frankfurt (which roughly maps to West Europe), `iad` for Ashburn (which roughly maps to East US). Do not try to invent a unified region code; you will end up with something neither cloud's tooling recognises. Use the native abbreviations and accept that "this is in `weu` or `fra`" tells you which cloud you are looking at, which is a feature.

The non-negotiables for multicloud naming:

- The same component order on both clouds.
- The same workload identifier across both clouds for the same logical workload.
- The same environment vocabulary (`dev`, `tst`, `stg`, `prd` — pick one set, no synonyms).
- A cloud prefix on every name by default; document exceptions for constrained resources where it is genuinely impractical.
- A naming module in IaC, not a wiki page.

## Closing checklist

- Adopt the CAF abbreviation list for Azure. Adopt an internal equivalent list for OCI; document it in your platform repo.
- Put the cloud prefix first. Two characters, infinite payoff.
- Constrained resources (storage, ACR, OCI buckets) drop hyphens but keep the schema. Validate length before deploying.
- Anything that might change goes in a tag, not a name.
- Names are computed in IaC modules, not typed by humans. Use `aztfmod/azurecaf` for Azure; build equivalent locals for OCI.
- Enforce in IaC first, Policy/Events second. Wiki pages are not enforcement.
- Reserve a documented exception schema for length-constrained resources (Windows VMs, certain identifiers). Make the exception explicit.
- Test your schema against the worst case in your estate (longest workload name, three regions, two BUs) before you ship it.
