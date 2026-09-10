/* Original Twelve-Factor principles, paraphrased with deployment guidance.
 * Later additions are attributed separately; this is editorial interpretation. */

export interface Factor {
  numeral: string;
  name: string;
  original: string;
  today: string;
}

export interface FactorGroup {
  title: string;
  lede: string;
  factors: Factor[];
}

export const FACTOR_GROUPS: FactorGroup[] = [
  {
    title: 'The ones that decide whether you can move',
    lede: 'If you only ever act on five of them, act on these. Each one is a specific way an application stops being tied to where it is running.',
    factors: [
      {
        numeral: 'III',
        name: 'Config in the environment',
        original: 'Strict separation of config from code; anything that varies between deploys lives in the environment.',
        today: "Keep deployment settings out of code. Inject secrets securely through the deployment environment or mounted files, and isolate provider-specific secret clients behind adapters.",
      },
      {
        numeral: 'IV',
        name: 'Backing services as attached resources',
        original: 'Treat databases, queues and caches as attached resources reached by URL, swappable without a code change.',
        today: "Standard protocols reduce code changes, but a new endpoint is only part of a move. Test data conversion, authentication, feature differences and delivery semantics.",
      },
      {
        numeral: 'V',
        name: 'Build, release, run',
        original: 'Three strictly separated stages, with releases immutable and uniquely identified.',
        today: "A container image can be the build artifact; combining its digest with versioned configuration identifies a release. Pipelines must still enforce the separation and reproducibility.",
      },
      {
        numeral: 'VI',
        name: 'Stateless processes',
        original: 'Processes are stateless and share nothing; persistent data belongs in a backing service.',
        today: "Keep durable state outside replaceable application instances. Disposable local caches are fine; required session or business data on one instance prevents safe replacement.",
      },
      {
        numeral: 'IX',
        name: 'Disposability',
        original: 'Fast startup, and graceful shutdown when the process is asked to stop.',
        today: "Handle termination gracefully, typically SIGTERM in Kubernetes. Test readiness, traffic draining and in-flight work against the configured grace period.",
      },
    ],
  },
  {
    title: 'The ones the platform helps you implement',
    lede: 'The platform provides mechanisms. Your application and operations still need to use them correctly.',
    factors: [
      {
        numeral: 'VII',
        name: 'Port binding',
        original: 'The application is self-contained and exports a service by binding to a port.',
        today: "A web process may expose its own port. Workers and batch containers need not listen on one. Configure binding, health checks and ingress for the chosen platform.",
      },
      {
        numeral: 'VIII',
        name: 'Concurrency',
        original: 'Scale out through the process model rather than by making one process bigger.',
        today: "Platforms provide replicas and autoscalers. The application still needs safe parallel execution, appropriate connection limits and correct handling of duplicate work.",
      },
      {
        numeral: 'XI',
        name: 'Logs as event streams',
        original: 'Write to stdout and let the execution environment handle routing and storage.',
        today: "Structured stdout logs simplify collection. Someone must still configure routing, retention, access, redaction and cost controls; logging does not operate itself.",
      },
    ],
  },
  {
    title: 'The ones that need a modern reading',
    lede: 'Apply the original principles to current tooling without assuming the tooling guarantees them.',
    factors: [
      {
        numeral: 'I',
        name: 'Codebase',
        original: 'One codebase tracked in revision control, many deploys.',
        today: "Use a traceable codebase for each deployable application. A monorepo can contain several applications with separate build and release boundaries.",
      },
      {
        numeral: 'II',
        name: 'Dependencies',
        original: 'Declare dependencies explicitly; never rely on packages existing on the host.',
        today: "Declare and pin dependencies, maintain base images and rebuild for fixes. An SBOM inventories components; it does not establish that an image is safe.",
      },
      {
        numeral: 'X',
        name: 'Dev/prod parity',
        original: 'Keep development, staging and production as similar as possible.',
        today: "An image reduces runtime differences. Also test the backing services, identity, network and resource limits that differ between development and production.",
      },
      {
        numeral: 'XII',
        name: 'Admin processes',
        original: 'Run one-off tasks as one-off processes in an identical environment.',
        today: "Run migrations and other one-off tasks from the same release and configuration as the application, with controlled access and a repeatable procedure.",
      },
    ],
  },
  {
    title: 'The ones it never covered',
    lede: 'Added by Kevin Hoffman in “Beyond the Twelve-Factor App” (2016). He also reorders the original twelve, so the numbering here is ours, not his. Two of the three are now among the deepest hooks a provider has into an application.',
    factors: [
      {
        numeral: 'XIII',
        name: 'Telemetry',
        original: 'Treat the application’s own observability as a first-class concern, not an afterthought.',
        today: "Logs alone do not cover metrics and traces. OpenTelemetry offers vendor-neutral instrumentation and export; backend queries, dashboards and semantic differences still need migration.",
      },
      {
        numeral: 'XIV',
        name: 'Authentication and authorization',
        original: 'Identity and access are part of the application contract, not infrastructure detail.',
        today: "Federation through OIDC reduces dependence on one identity interface. Claims, roles, trust policies and resource permissions still need explicit mapping and testing.",
      },
      {
        numeral: 'XV',
        name: 'API first',
        original: 'Design and publish the contract before building the implementation behind it.',
        today: 'The practical portability benefit is that a stable contract lets you replace what sits behind it — including replacing a SaaS product — without renegotiating with every consumer.',
      },
    ],
  },
];

export interface PortabilityMove {
  title: string;
  body: string;
}

export const BEYOND_FACTORS: PortabilityMove[] = [
  {
    title: 'Data gravity beats every diagram',
    body: 'Measure export and import time, egress charges, format conversion and the cutover window. Test a representative data migration; application packaging alone cannot estimate the exit cost.',
  },
  {
    title: 'Your infrastructure code is not portable, and that is fine',
    body: 'Terraform is a portable tool, not portable code: azurerm resources do not become oci resources. What is portable is the module boundary and the pipeline around it. Resist the abstraction layer that promises to hide both clouds — it usually delivers the limitations of each and the strengths of neither.',
  },
  {
    title: 'An exit plan you have never run is fiction',
    body: 'For financial entities in scope, DORA Article 28(8) requires exit plans for ICT services supporting critical or important functions to be comprehensive, documented, sufficiently tested and reviewed periodically. Article 30(3)(f) addresses contractual exit arrangements. Independently of regulation, rehearse a move with representative data and measure the recovery and cutover time.',
  },
  {
    title: 'The portability tax is real — pay it deliberately',
    body: 'Staying portable costs something. You forgo genuinely better managed services, you operate more yourself, and you write adapters nobody thanks you for. Pay it where an exit is plausible or required. Do not pay it on a workload that will be retired before the contract ends. The goal was never zero lock-in — it is lock-in you chose, priced, and could walk away from if you had to.',
  },
];
