/*
 * Twelve-Factor, read as a portability checklist rather than as scripture, plus
 * the things it never covered.
 *
 * Twelve-Factor was written at Heroku in 2011 — before Docker, before
 * Kubernetes, before anything called serverless. It has aged better than most
 * documents from 2011 because it is not really about a platform: it is a list
 * of the ways an application gets stuck to the machine it was first deployed
 * on. Factors XIII–XV come from Kevin Hoffman's "Beyond the Twelve-Factor App"
 * (2016), which is where telemetry and authentication were finally named.
 */

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
        today: 'Still the highest-value factor, and now the sharpest test of portability. An application that reads a connection string from its environment can move. One that calls a provider’s secret SDK to fetch the same string has a dependency compiled into it.',
      },
      {
        numeral: 'IV',
        name: 'Backing services as attached resources',
        original: 'Treat databases, queues and caches as attached resources reached by URL, swappable without a code change.',
        today: 'This is the factor that actually decides whether you can change cloud. Reach a queue through a standard client and it is a config change; reach it through a managed binding and it is a rewrite. The lock-in was never the runtime.',
      },
      {
        numeral: 'V',
        name: 'Build, release, run',
        original: 'Three strictly separated stages, with releases immutable and uniquely identified.',
        today: 'Twelve-Factor described this before there was an artifact format for it. Today the container image is the build, image plus config is the release, and the orchestrator does the run. The separation is now something you get by default rather than something you engineer.',
      },
      {
        numeral: 'VI',
        name: 'Stateless processes',
        original: 'Processes are stateless and share nothing; persistent data belongs in a backing service.',
        today: 'What makes one instance interchangeable with the next, which is the precondition for every scaling and healing behaviour above it. Sticky sessions and local caches are where this quietly breaks.',
      },
      {
        numeral: 'IX',
        name: 'Disposability',
        original: 'Fast startup, and graceful shutdown when the process is asked to stop.',
        today: 'Now a literal contract: Kubernetes sends SIGTERM and waits out a grace period you configure. Ignore it and rolling updates drop live requests — the most common cause of "deploys cause errors" that nobody has traced.',
      },
    ],
  },
  {
    title: 'The ones the platform absorbed',
    lede: 'Still correct, but no longer work you do. Reading these as tasks is a sign of a document that has not been revisited.',
    factors: [
      {
        numeral: 'VII',
        name: 'Port binding',
        original: 'The application is self-contained and exports a service by binding to a port.',
        today: 'The default. A container does this by definition, and the orchestrator handles what used to be a web server in front.',
      },
      {
        numeral: 'VIII',
        name: 'Concurrency',
        original: 'Scale out through the process model rather than by making one process bigger.',
        today: 'Now expressed as replica counts and autoscaling rules. The factor survives; the mechanism moved out of the application entirely.',
      },
      {
        numeral: 'XI',
        name: 'Logs as event streams',
        original: 'Write to stdout and let the execution environment handle routing and storage.',
        today: 'Universal. The remaining decision is structure — one JSON line carrying a trace ID is worth more at three in the morning than ten lines of prose.',
      },
    ],
  },
  {
    title: 'The ones that need a modern reading',
    lede: 'Right in spirit, dated in detail. Applying them literally in 2026 produces some odd architecture.',
    factors: [
      {
        numeral: 'I',
        name: 'Codebase',
        original: 'One codebase tracked in revision control, many deploys.',
        today: 'Written before monorepos were normal, and often misread as a ban on them. What matters is one deployable unit per application with a traceable history — not how many repositories you keep.',
      },
      {
        numeral: 'II',
        name: 'Dependencies',
        original: 'Declare dependencies explicitly; never rely on packages existing on the host.',
        today: 'The image is now the isolation boundary, which solved the original problem and created a new one: you inherit every CVE in every layer you did not write. The modern form of this factor is a lockfile, a base-image policy and an SBOM.',
      },
      {
        numeral: 'X',
        name: 'Dev/prod parity',
        original: 'Keep development, staging and production as similar as possible.',
        today: 'Containers turned this from aspiration into something achievable for the application. The remaining gap is the managed services around it — and that gap is where most production surprises now live.',
      },
      {
        numeral: 'XII',
        name: 'Admin processes',
        original: 'Run one-off tasks as one-off processes in an identical environment.',
        today: 'A Job running the same image, not a shell on a long-lived box. If a migration can only be run by someone who knows which machine to log into, this factor is not satisfied.',
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
        today: 'Twelve-Factor’s logs factor predates distributed tracing entirely. OpenTelemetry is the portable answer: instrument once against a vendor-neutral API and change backends by config. Provider-native agents everywhere is a rewrite you have agreed to in advance.',
      },
      {
        numeral: 'XIV',
        name: 'Authentication and authorization',
        original: 'Identity and access are part of the application contract, not infrastructure detail.',
        today: 'Workload identity is the deepest hook a cloud gets into an application, and the most convenient. Federating through OIDC keeps that hook shallow enough to pull out; a native resource principal call in business logic does not.',
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
    title: 'Identity is the deepest hook',
    body: 'Managed identity and resource principals are the most convenient thing a cloud offers and the least portable. Federate through OIDC and the workload keeps its identity story when it moves; call the native API from business logic and you have written the provider into your domain layer.',
  },
  {
    title: 'Data gravity beats every diagram',
    body: 'Code moves in an afternoon. Twelve terabytes and the egress bill do not. Ask what a full copy costs — in money and in hours — before you choose the store, because that number is the real exit price and it only grows.',
  },
  {
    title: 'Your infrastructure code is not portable, and that is fine',
    body: 'Terraform is a portable tool, not portable code: azurerm resources do not become oci resources. What is portable is the module boundary and the pipeline around it. Resist the abstraction layer that promises to hide both clouds — it usually delivers the limitations of each and the strengths of neither.',
  },
  {
    title: 'Observability is a lock-in you can decline',
    body: 'This is the cheapest portability win most teams never take. An OpenTelemetry collector between your applications and your backend turns "change observability vendor" from a re-instrumentation project into a configuration change.',
  },
  {
    title: 'An exit plan you have never run is fiction',
    body: 'DORA Article 30 requires financial entities to write exit strategies into contracts covering critical or important functions, and several national frameworks ask the same. Regulation aside, the test is simple: could you stand up this workload somewhere else, with real data, this quarter? If nobody has tried, you have a document rather than a capability.',
  },
  {
    title: 'The portability tax is real — pay it deliberately',
    body: 'Staying portable costs something. You forgo genuinely better managed services, you operate more yourself, and you write adapters nobody thanks you for. Pay it where an exit is plausible or required. Do not pay it on a workload that will be retired before the contract ends. The goal was never zero lock-in — it is lock-in you chose, priced, and could walk away from if you had to.',
  },
];
