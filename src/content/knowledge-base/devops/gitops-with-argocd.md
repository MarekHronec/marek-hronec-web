---
title: "GitOps at Scale with Argo CD and Multi-Cluster Kubernetes"
category: devops
tags: ["GitOps", "Argo CD", "Kubernetes", "CI/CD", "Progressive Delivery"]
date: 2024-11-15
readTime: 9
level: intermediate
excerpt: "Learn how to implement a production-grade GitOps workflow using Argo CD across multiple Kubernetes clusters, with progressive delivery and automated drift detection."
references:
  - title: "Argo CD documentation"
    url: "https://argo-cd.readthedocs.io/en/stable/"
    description: "Complete reference for Argo CD: application definitions, ApplicationSet, RBAC, SSO integration, multi-cluster patterns, and progressive delivery with Argo Rollouts."
    domain: "argo-cd.readthedocs.io"
  - title: "OpenGitOps — GitOps principles"
    url: "https://opengitops.dev/"
    description: "The CNCF working group's vendor-neutral definition of GitOps: the four principles (declarative, versioned, pulled, continuously reconciled) that distinguish GitOps from generic CI/CD."
    domain: "opengitops.dev"
  - title: "Flux CD documentation"
    url: "https://fluxcd.io/docs/"
    description: "Documentation for Flux, the CNCF-graduated GitOps toolkit offering modular controllers for Helm, Kustomize, and image automation — relevant for Azure Arc-integrated deployments."
    domain: "fluxcd.io"
  - title: "GitOps with Flux on Azure Arc-enabled Kubernetes"
    url: "https://learn.microsoft.com/en-us/azure/azure-arc/kubernetes/conceptual-gitops-flux2"
    description: "How Azure Arc uses Flux v2 as the GitOps engine for managing configuration and workloads across AKS and non-Azure Kubernetes clusters from a single control plane."
    domain: "learn.microsoft.com"
---

GitOps shifts the operational model for Kubernetes to a Git-centric approach. All desired state lives in version control, and a reconciliation loop continuously drives the cluster toward that state. Argo CD is the industry-standard tool implementing this loop at scale.

## Why GitOps Changes Everything

Traditional deployment pipelines push changes to infrastructure. GitOps inverts this — the cluster pulls its desired state from Git. This shift has three structural implications:

- **Auditability** — Every change is a Git commit. History is the deployment log.
- **Self-healing** — Any manual drift is automatically reverted on the next sync.
- **Rollback** — Rolling back is a `git revert`. No runbooks required.

:::tip[Architectural Pro Tip]
Separate your application manifests repository from your application code repository. This prevents accidental coupling between deployment state and source history.
:::

## Multi-Cluster Application Set

Argo CD's ApplicationSet controller enables fleet-level management. A single ApplicationSet resource can generate individual Application objects for every cluster in your fleet:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: guestbook
spec:
  generators:
    - clusters: {}
  template:
    metadata:
      name: '{{name}}-guestbook'
    spec:
      project: default
      source:
        repoURL: https://github.com/org/gitops-repo
        targetRevision: HEAD
        path: apps/guestbook/overlays/{{name}}
      destination:
        server: '{{server}}'
        namespace: guestbook
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
```

## Progressive Delivery with Rollouts

Pair Argo CD with Argo Rollouts for progressive delivery. A canary rollout stages traffic across multiple steps before full promotion:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
spec:
  strategy:
    canary:
      steps:
        - setWeight: 10
        - pause: { duration: 5m }
        - setWeight: 40
        - pause: { duration: 10m }
        - setWeight: 100
```

:::warning[Reality Check]
Enabling automated sync with pruning on production clusters without a proper promotion gate will delete resources when branches are merged. Always gate production sync behind a manual approval step.
:::

## Drift Detection and Alerting

Argo CD's health status surfaces drift in real time. Integrate with your alerting stack by exposing the `argocd_app_sync_status` Prometheus metric and alerting on `OutOfSync` states persisting beyond your SLA threshold.

## Multicloud factor

Argo CD is not the only GitOps implementation, and the platform context determines which tool fits best.

**Azure / AKS:** Microsoft supports Flux v2 natively through the Azure GitOps extension for AKS and Arc-enabled Kubernetes. Flux is a CNCF graduated project and reduces operational overhead for organisations standardising on Azure-managed services — you do not run Argo CD as a separate operational concern. For teams that specifically want Argo CD's UI, ApplicationSet fleet management, and Argo Rollouts integration, self-managed Argo CD on AKS is a well-trodden path. Both are production-grade choices; the decision is mainly about managed service preference versus ecosystem features.

**OCI / OKE:** OCI DevOps Service provides pipeline-driven deployment to OKE with rollback capability, but it is not a GitOps engine in the Argo CD sense — it does not implement continuous reconciliation against a declared Git state. For pure GitOps on OCI, self-managed Argo CD on OKE works as it does on any Kubernetes cluster. The operational overhead of running the Argo CD control plane is yours.

**Flux vs Argo CD:** Argo CD has a richer UI, ApplicationSet for fleet management, and native integration with Argo Rollouts. Flux is more modular — separate controllers for image automation, Helm releases, and kustomization — and has deeper Azure Arc integration. For multi-cluster fleets where fleet-wide rollout control matters, Argo CD's ApplicationSet and cluster generator are generally the easier path. For Azure-centric estates that want managed tooling, Flux with the Azure GitOps extension reduces the operational surface.

## Closing Checklist

- Separate application manifests from application source code. Deployment state and development history should not share the same repository.
- Use ApplicationSet for fleet management. Individual Application objects per cluster do not scale; ApplicationSet with a cluster generator does.
- Gate production sync behind a manual approval step. Automated sync with pruning on production without a promotion gate will delete resources on branch merges.
- Pair Argo CD with Argo Rollouts for progressive delivery. Canary and blue-green strategies belong in the delivery pipeline, not in ad-hoc deployment scripts.
- Alert on `argocd_app_sync_status` showing `OutOfSync` states persisting beyond your SLA threshold. Drift that is not surfaced is drift that accumulates.
- Document the promotion model explicitly: which branches correspond to which environments, what triggers a sync, and what a rollback looks like. GitOps makes rollback easy only when the promotion model is well-defined before an incident.
- For Azure / AKS: evaluate the native Flux GitOps extension before adding self-managed Argo CD. For teams that need Argo CD's UI and ApplicationSet ecosystem, self-managed Argo CD on AKS is straightforward.
- For OCI / OKE: self-managed Argo CD works as on any Kubernetes cluster. OCI DevOps Service provides pipeline-driven deployment but is not a continuous reconciliation engine — it does not replace GitOps if continuous reconciliation is a requirement.