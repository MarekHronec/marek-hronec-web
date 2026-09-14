# Batch B7c — DevOps toolchain

Reviewer: Sonnet (research agent), reported 2026-09-14. **Reviewer did not edit any file.**
Verified and applied by Opus the same day.

Articles: `devops/gitops-with-argocd` (dated 2024-11-15, the oldest in the corpus) ·
`devops/source-of-truth-where-does-your-cloud-actually-live` ·
`devops/status-pages-service-health-things-they-wont-show`

Reviewer totals: 3 WRONG, 0 STALE, 0 INTERNAL, 3 UNVERIFIED, ~20 checked-and-correct.

**Verification result: all three findings confirmed. All defects were in the oldest
article; the two newer ones came through clean.**

---

## The worst defect class this audit has found

The article told readers to alert on a Prometheus metric called
`argocd_app_sync_status`. **That metric does not exist.** Argo CD's metrics reference has
zero occurrences of it. Sync state is a *label* on the `argocd_app_info` gauge, which the
documentation describes as carrying "labels such as sync_status and health_status that
reflect the application state in Argo CD".

This is worse than an ordinary wrong fact, and worth naming as its own category:

> **A wrong metric name fails silently.** A reader who builds that alert gets no time
> series back. The alert never fires, and the absence of alerts looks exactly like health.
> The article's own closing line — "drift that is not surfaced is drift that accumulates" —
> describes precisely what its instruction would cause.

Compare the malformed address prefixes in B6b, which at least fail loudly at apply time.
This one produces a dashboard that is permanently, reassuringly green.

Both occurrences replaced with `argocd_app_info{sync_status="OutOfSync"}`.

## The timing claim in the same paragraph

"Argo CD's health status surfaces drift in real time." It does not. Argo CD's FAQ:
"Argo CD checks (polls) Git repositories every 3 minutes to detect changes. This default
interval is calculated as 120 seconds + up to 60 seconds of jitter."

That matters specifically because the sentence continues into advice about SLA alert
thresholds. Someone sizing thresholds against "real time" sets them too tight and gets
false positives on every reconciliation gap. The article now gives the interval, names
`timeout.reconciliation` as the knob, and notes that setting it to `0` leaves only
webhooks.

## Citation findings

| Claim in the description | Reality |
|---|---|
| The Argo CD docs cover "progressive delivery with Argo Rollouts" | That page's only occurrence of the word is "complex application rollouts" in a note about sync hooks. **Argo Rollouts is a separate project** with its own documentation site |
| The same description advertises RBAC and SSO coverage | True of the page, but the article never uses it: both words appear in the entire corpus only inside that one description, and nowhere in any article body |
| Flux docs at `fluxcd.io/docs/` | Moved to `fluxcd.io/flux/` |

The Rollouts one left a real gap rather than just a bad description: the article discusses
canary steps substantively with no reference backing them. Added the Argo Rollouts project's
own documentation, verified to describe exactly the "blue-green, canary, canary analysis,
experimentation, and progressive delivery" capabilities the article uses.

## Manifests — checked and correct

Two manifests, both valid as written. This matters because the article is 22 months old and
an expired `apiVersion` would fail at `kubectl apply`.

- `ApplicationSet`, `argoproj.io/v1alpha1` — still the served version; no v1beta1 exists.
- `Rollout`, `argoproj.io/v1alpha1` — still current per the Rollouts specification page.
- The cluster generator's `clusters: {}` matches the current official example.

The reviewer did a careful piece of work here worth recording. It noticed the official
example sets `goTemplate: true` and uses dotted syntax while the article uses undotted
`{{name}}`, then checked whether that made the article wrong — and established it does not,
because `goTemplate` defaults to `false`, the legacy syntax is correct in that mode, and the
article never mixes the two. **It went looking for a defect, found the article was right,
and said so.**

It also flagged that the Rollout snippet omits required fields like `metadata.name` and
`spec.template`, correctly classifying this as a completeness gap rather than a currency
defect, since the prose frames the snippet as illustrating the canary strategy only.

## Not applied

- **Backstage descriptor schema** (article 2). The fields look right but the reviewer did
  not re-fetch Backstage's descriptor-format reference. Unverified rather than assumed.
- **The OCI DevOps "not a GitOps engine" framing** (article 1). Plausible and consistent,
  but not confirmed against Oracle's own documentation.
- **"Single control plane"** as a gloss on the Azure Arc reference. The reviewer noted
  Microsoft never uses that exact phrase, judged the substance correct, and flagged it only
  for description-fidelity. Left as the author's paraphrase.

## Notes on the reviewer

It corrected my brief again — the fourth reviewer running to do so. I cited the manifests
as "line 48: `apiVersion` … `kind: ApplicationSet`" as though both fields were on one line;
`kind` is on the following line in each case. Minor, but it confirmed the word counts were
exact in the same breath, which is the useful behaviour: check the instructions, report what
is wrong *and* what is right.

It also declined to reproduce a pattern I had primed it for. My brief said that in recent
batches "one reference supported no claim in its article at all", and it reported plainly
that it could not reproduce that here: all twelve references anchor at least one real
sentence, with the closest case being a partial mismatch in both directions. **A reviewer
that refuses to find the thing you told it to look for is worth more than one that obliges.**
