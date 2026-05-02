---
title: "GitOps at Scale with Argo CD and Multi-Cluster Kubernetes"
category: devops
tags: ["GitOps", "Argo CD", "Kubernetes", "CI/CD", "Helm"]
date: 2024-11-15
readTime: 9
level: intermediate
excerpt: "Learn how to implement a production-grade GitOps workflow using Argo CD across multiple Kubernetes clusters, with progressive delivery and automated drift detection."
---

GitOps shifts the operational model for Kubernetes to a Git-centric approach. All desired state lives in version control, and a reconciliation loop continuously drives the cluster toward that state. Argo CD is the industry-standard tool implementing this loop at scale.

## Why GitOps Changes Everything

Traditional deployment pipelines push changes to infrastructure. GitOps inverts this — the cluster pulls its desired state from Git. This shift has three structural implications:

- **Auditability** — Every change is a Git commit. History is the deployment log.
- **Self-healing** — Any manual drift is automatically reverted on the next sync.
- **Rollback** — Rolling back is a `git revert`. No runbooks required.

<div class="callout-tip">
  <div class="callout-tip__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-tip__content">
    <p class="callout-tip__label">Architectural Pro Tip</p>
    <p>Separate your application manifests repository from your application code repository. This prevents accidental coupling between deployment state and source history.</p>
  </div>
</div>

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

<div class="callout-warning">
  <div class="callout-warning__icon" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/>
    </svg>
  </div>
  <div class="callout-warning__content">
    <p class="callout-warning__label">Operational Warning</p>
    <p>Enabling automated sync with pruning on production clusters without a proper promotion gate will delete resources when branches are merged. Always gate production sync behind a manual approval step.</p>
  </div>
</div>

## Drift Detection and Alerting

Argo CD's health status surfaces drift in real time. Integrate with your alerting stack by exposing the `argocd_app_sync_status` Prometheus metric and alerting on `OutOfSync` states persisting beyond your SLA threshold.

## Cross-Platform Factor

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