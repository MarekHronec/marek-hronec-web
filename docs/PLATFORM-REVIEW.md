# Platform page review — 9 September 2026

Reviewed and updated on `feature/platform`. Scope: /platform narratives, SVG scenes, responsibility comparison, chooser model, browser controls and portability guidance.

## Corrected claims

- VMs can run multiple workloads. A second VM in the scene is an explicit choice for a separate guest kernel.
- Images require compatible operating systems and architectures; configuration, data and external services do not automatically travel with them.
- Kubernetes controllers create replacement Pods; the scheduler assigns nodes. Successful recovery requires capacity and a working workload. No guaranteed “no pager” outcome.
- Managed platforms vary in custom image, shell access, runtime and storage support. An old user-space runtime alone does not rule out a managed container platform.
- Per-core licensing does not universally require a dedicated host. Check the actual vendor agreement and deployment.
- Customer governance responsibilities do not erase provider security or contractual obligations.
- Twelve-Factor principles still require application and operational implementation. Removed unsupported claims about tracing history, automatic compliance and universal portability.
- DORA references are scoped to financial entities and ICT services supporting critical or important functions. Article 28(8) distinguishes sufficient testing from periodic review.

## Primary references

- [Microsoft shared responsibility](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility)
- [OCI image configuration](https://specs.opencontainers.org/image-spec/config/)
- [Kubernetes controllers](https://kubernetes.io/docs/concepts/architecture/controller/)
- [App Service container SSH](https://learn.microsoft.com/en-us/azure/app-service/configure-linux-open-ssh-session)
- [SQL Server licensing](https://www.microsoft.com/licensing/guidance/SQL)
- [Twelve-Factor](https://12factor.net/)
- [Beyond the Twelve-Factor App, Kevin Hoffman](https://www.oreilly.com/library/view/beyond-the-twelve-factor/9781492042631/)
- [OpenTelemetry](https://opentelemetry.io/docs/what-is-opentelemetry/)
- [DORA, Articles 28 and 30](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022R2554)

These sources support factual boundaries, not the editorial scores or numerical workload-size preferences.

## Animation and architecture

- One-shot demonstrations hold their terminal state; only ambient movement loops.
- Container motion follows a continuous path at constant speed with one image, instead of duplicated boxes and a disappearance/reset loop.
- Kubernetes loss and replacement settle at three; the deck stays aligned with its cargo.
- PaaS departure no longer visibly rewinds. VM and SaaS transitions have gentle entrance motion.
- Shared hull geometry adds a curved bow, waterline, portholes and bridge detail without bitmap assets or runtime dependencies.
- Typed concept keys ensure every story resolves to a scene. Chooser score records use approach keys.
- ChooserResult owns result markup and styling separately from the form shell.
- Complete-answer ties retain an honest shortlist; no hidden arbitrary winner and no instruction to answer unavailable questions.
- Form submission is prevented; answers stay in the browser. Initialisation is marked ready only after required elements exist.
- Existing shared explainer controller remains unchanged, limiting regression scope for /compliance.

## Validation

Browser automation checked all five demonstrations: start, actual timeline pause, replay, stable terminal state, reset, and reduced-motion completion. Screenshots inspected at desktop and mobile sizes. Layout checked at widths 375, 768 and 1440; no document overflow or page script errors.

Exhaustive model checks cover all 3,888 complete answer combinations, exclusion enforcement, finite scores, valid leaders and 281 tied outcomes. Unknown answer values are ignored. A full-answer tie and clearing the form were verified in the browser.

The chooser is an editorial starting point, not a service capability database, cost model, licence determination or compliance assessment. Confirm the shortlisted service plan and test the actual workload.

Production build and Pagefind indexing passed. Astro check: 81 files, zero errors, warnings or hints. Existing build notices remain for deprecated Markdown plugin configuration and a large graph chunk; neither originates in the platform changes.

## Follow-up — 10 September 2026

- Container workload question now explains both answers and their practical next steps in a reusable WorkloadQuestion component.
- Shared responsibility cells use a diagonal marine-tint/white split, with text labels retained.
- Start over is available in the persistent results toolbar and below the questions. Both buttons clear answers, progress and results, and return keyboard focus to the first question.
- The sidebar toolbar remains outside its scrolling body. Changed recommendations reset the detail scroll position so a previous result cannot hide the new heading.
- Production build and Astro check passed (82 files; zero errors, warnings or hints). Browser checks passed for both reset buttons, focus, scroll reset, persistent toolbar, diagonal cells and widths 375/768/1024/1440. Desktop screenshots were inspected.
