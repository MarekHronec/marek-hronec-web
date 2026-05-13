---
title: "Status Pages, Service Health, and the Things They Will Not Show You"
category: devops
tags: ["Azure", "OCI", "Service Health", "Incident Response", "Observability"]
date: 2026-04-30
updated: 2026-05-13
readTime: 9
level: beginner
excerpt: "Status pages are public communication, not monitoring. The green dot lags reality by 30+ minutes. Service Health helps. Build your own observability first."
references:
  - title: "Azure Service Health overview"
    url: "https://learn.microsoft.com/en-us/azure/service-health/overview"
    description: "How Azure Service Health works, the difference between Service Issues, Planned Maintenance, and Health Advisories, and how to configure alerts routed to your operations team."
    domain: "learn.microsoft.com"
  - title: "Azure status"
    url: "https://azure.status.microsoft/"
    description: "Microsoft's public status page for Azure — shows current service disruptions by region and service, the source for broad outage confirmation when internal alerts fire."
    domain: "azure.status.microsoft"
  - title: "OCI Cloud Status"
    url: "https://ocistatus.oraclecloud.com/"
    description: "Oracle's public OCI status page showing current service health across regions — bookmark this alongside the Azure status page for multicloud incident triage."
    domain: "ocistatus.oraclecloud.com"
  - title: "Azure Monitor alerts overview"
    url: "https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview"
    description: "How to configure Azure Monitor alerts — including Service Health alerts — so your team is notified by the monitoring system rather than discovering issues from the public status page."
    domain: "learn.microsoft.com"
---

The first place engineers look during a suspected cloud outage is the vendor's public status page. The second place is usually the community signal — X, Reddit, vendor forums, Slack communities, or outage aggregators — because the public page can still be green while customers are already seeing impact.

Public status pages are not useless. They are just not primary monitoring systems. They are public communication channels with a high bar for confirmation, scoping, and wording. By the time the page turns yellow or red, the incident has usually been validated internally and prepared for external communication. That process takes time. Your users do not wait for that process.

This article is about reading status information honestly, knowing what each surface tells you, and building enough of your own observability that you do not depend on vendor status pages for primary signal.

## The vendor status surfaces

**Public status pages** — Azure Status (azure.status.microsoft) and OCI Status Dashboard (ocistatus.oraclecloud.com). Broad, public, confirmed provider-side communication. Designed for a wide audience, so language is conservative and lags the live incident. If you only check one place, this is usually the least actionable one.

**Tenant-scoped health surfaces** — Azure Service Health, Azure Resource Health, and OCI Console Announcements. More relevant because they are scoped to your subscriptions, resources, tenancy, or affected services. Usually more actionable than the public status page because they surface events relevant to the services, regions, and subscriptions you actually use.

**Alert delivery** — Azure Service Health alerts, Azure Resource Health alerts, OCI announcement subscriptions / OCI Notifications, webhooks, and incident-management integrations. Wire these into your incident management tool; they are the most actionable vendor signal.

One extra Azure distinction matters: **Service Health** tells you about platform-level events that may affect your services or regions; **Resource Health** tells you whether a specific resource appears available, degraded, unavailable, or unknown. During an incident, both are useful — Service Health tells you whether Azure sees a platform issue, and Resource Health tells you whether your resource is affected.

For OCI:

- **OCI Status Dashboard** — public service/region status (ocistatus.oraclecloud.com for commercial regions).
- **Console Announcements** — customer-specific operational announcements, including outages or events relevant to the tenancy.
- **Announcement subscriptions / OCI Notifications** — delivery mechanism for selected announcements through email and other configured endpoints.

## What status pages do not show

The systematic gaps:

**Performance degradation that does not breach availability.** A 500ms latency increase on a service that normally responds in 100ms is operationally a serious problem. It rarely shows up on the status page because the service is "available."

**Region-pair issues for services that should be region-redundant.** Some failures affect both regions of a pair (or both ADs of an OCI region) simultaneously. The status page may show one region as affected while the cross-region failover that is supposed to save you is also degraded.

**Capacity and quota issues.** "We cannot launch new VMs in West Europe in the D-series family" is a real production-affecting condition that almost never appears on status pages because existing resources keep running.

**Customer-specific issues.** Anything affecting just your tenant — a misbehaving service principal, a stuck deployment, a deleted-but-not-released resource lock — will not appear on any vendor status page. Service Health may show it; the public page will not.

**Issues in services not yet on the status page.** New services often launch faster than status page tracking. There is a window where a service is GA but its incidents do not show.

**Issues during the validation window.** From "engineer notices something is wrong" to "incident posted publicly" is typically 15–60 minutes. During this window, you are watching nothing change while production is on fire.

## Build your own signal first

The teams that handle incidents well maintain a hierarchy of monitoring that does not depend on vendor status:

**Tier 1 — Synthetic monitoring of critical user paths.** A health check that hits your application from outside the cloud, on a tight cadence. If users cannot reach your homepage, this fires before any vendor signal.

**Tier 2 — Internal application metrics.** Latency, error rate, throughput. Any deviation from baseline gets investigated. The cloud vendor does not need to confirm anything; the data is yours.

**Tier 3 — Infrastructure metrics from cloud APIs.** Azure Monitor, OCI Monitoring, plus exports to your own time-series store. You do not depend on the vendor to tell you the VM is unhealthy; you watch it directly.

**Tier 4 — Vendor service health alerts.** Wired into your incident management. They tell you when the vendor *thinks* something is wrong with services you depend on.

**Tier 5 — External community signals.** X, Reddit, Downdetector-style aggregators, vendor forums, and Slack communities. Useful for context, especially for incidents that are still pre-validation on the vendor side.

Tier 1 fires first for user-impacting issues. Tier 4 fires first for some platform-level issues that have not yet visibly affected your application. Both matter; depending on only one is dangerous.

```yaml
# Conceptual: a synthetic monitor configuration in your IaC
synthetic_monitor:
  name: payments-api-health
  url: https://api.payments.example.com/health
  frequency: 60s
  regions:
    - us-east
    - eu-west
    - asia-pacific
  alert_on:
    - http_status != 200
    - response_time_ms > 1500
    - ssl_expiry_days < 30
  notify:
    - pagerduty: payments-team
    - slack: '#payments-alerts'
```

This monitor does not care what the Azure status page says. It tells you whether your users can reach your application, which is the only thing that ultimately matters.

:::tip[Architectural Pro Tip]
Wire vendor service health alerts into the same incident management pipeline as your synthetic monitors. PagerDuty, Opsgenie, whichever you use — both signals route to the same on-call rotation. This means your team sees the vendor signal in context with your internal signals and can correlate them in seconds. Two separate dashboards mean two separate places to look during an incident, which is exactly when you cannot afford the cognitive overhead.
:::

## Reading vendor status during an active incident

When you are in an incident and watching the vendor status page, here is the rough mental model:

**Green, your stuff is broken.** Either you have a configuration issue specific to you, or the vendor incident has not been validated yet. Wait 15–30 minutes if community signals suggest a vendor issue; check Service Health for tenant-specific impact.

**Yellow ("investigating"), your stuff is broken.** The vendor knows something is wrong, scope is being determined. The page will update as scope clarifies. You may be in the affected set; do not assume you are clear just because the page does not list your specific service yet.

**Yellow ("identified"), your stuff is broken.** The vendor has identified the cause and is working on resolution. The estimated time to resolution is unreliable in early stages — assume longer than what is posted.

**Red ("major incident"), your stuff is broken.** The vendor has acknowledged a major outage. Often comes with detailed incident pages. This is also when communication to your customers should escalate — you can reference the vendor incident publicly because they have made it public.

**Green again, your stuff might still be broken.** Recovery from major incidents often takes longer than the "resolved" status implies. Check that *your* services have actually recovered, not just that the vendor has finished their fix.

## PIRs and RCAs — the genuinely useful artifacts

After major incidents, both vendors publish post-incident reports. For Azure, Microsoft calls these Post Incident Reviews (PIRs) in the public status history — retained for five years — and Azure Service Health lets customers download official reports after incidents.

For OCI, incident history is visible through the OCI Status Dashboard and customer-specific operational information is communicated through Console Announcements. Where a formal RCA is provided, treat it as input to your own post-incident review rather than as a complete explanation of your application impact.

These are worth reading. Patterns you will see repeated:

- Many incidents are caused by changes to the platform itself — deployments, configuration changes — rather than hardware failure.
- Region pairs / multi-AD designs do not always isolate as intended; a single bug in a control plane can affect multiple regions.
- The "blast radius" of an incident is often larger than the affected service alone — dependent services experience cascading failures.

Treating the RCAs as input to your own DR planning makes them more useful than just a "what happened" read. If a particular failure mode is repeating, your architecture should account for it.

:::warning[Reality Check]
Every major cloud has had multi-hour outages affecting major regions in the last few years, despite all the redundancy and zone-isolation marketing. The vendor's status page during these events varies from "all green" for the first 30+ minutes to detailed incident pages once the situation is acknowledged. The lesson is not that the cloud is unreliable; it is that you should architect, monitor, and respond as if vendor status is one input among many, not the canonical source.
:::

## Multicloud factor

Multicloud incidents are particularly nasty because they do not show up on either vendor's status page in a useful way. An Azure-OCI Interconnect issue is a network problem that touches both clouds. The cross-cloud path is a seam that may not appear as a clean, single incident on either vendor's status page, even when it is the thing your application depends on.

The defensive pattern:

- Synthetic monitors that test multicloud paths end-to-end (Azure VM → Interconnect → OCI VM, both directions).
- Both clouds' service health alerts wired into the same incident management.
- Runbooks that explicitly cover "incident appears to be in the connection between clouds" as a scenario.

When the issue is genuinely cross-cloud, expect to coordinate between two vendors yourself. Neither side will lead. Have the contacts ready before you need them.

## Closing checklist

- Treat public vendor status pages as confirmed public communication, not primary monitoring.
- Wire Azure Service Health, Azure Resource Health, OCI Status subscriptions, and OCI Console Announcements into your incident pipeline.
- Build synthetic monitoring of critical user paths from outside the cloud. This is the signal that matters most.
- Monitor application latency, error rate, and throughput independently of vendor status.
- Read PIRs and RCAs after major incidents and feed lessons into your own DR planning.
- For multicloud, monitor cross-cloud paths end-to-end. The seam between clouds is your responsibility to observe.
- Trust your own observability during the first minutes of an incident. Vendor signal is useful, but it may arrive after user impact.
- Document vendor support escalation paths before incidents, not during them.
