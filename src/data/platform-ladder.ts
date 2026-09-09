/*
 * Five ways to run an application, from a bare VM to a SaaS subscription.
 *
 * Every field here is copy. Nothing in src/components/platform holds a
 * hard-coded string, so wording, ordering and the responsibility split can all
 * be changed here without touching a component.
 *
 * The responsibility model deliberately carries a `shared` state. The tidy
 * two-column chart every vendor publishes implies a clean handover at each
 * tier; in production the boundary is service-by-service, and the seams are
 * where the outages live.
 */

export type RungKey = 'vm' | 'container' | 'orchestrated' | 'paas' | 'saas';
export type Owner = 'provider' | 'shared' | 'you';

/** Read top-down: the physical estate is always theirs, the data is always yours. */
export const STACK_LAYERS = [
  { key: 'physical', label: 'Physical estate', hint: 'Datacentre, power, hardware, network fabric.' },
  { key: 'virtualisation', label: 'Virtualisation', hint: 'Hypervisor, host isolation, the control plane you never see.' },
  { key: 'os', label: 'Host OS and nodes', hint: 'Kernel, package updates, CVE response, host agents.' },
  { key: 'runtime', label: 'Runtime and dependencies', hint: 'Language runtime, libraries, base images, and their CVEs.' },
  { key: 'code', label: 'Application code', hint: 'What you wrote, and the bugs in it.' },
  { key: 'config', label: 'Configuration', hint: 'Network rules, IAM assignments, encryption choices, backup policy.' },
  { key: 'data', label: 'Data and access', hint: 'The records themselves, and every decision about who may read them.' },
] as const;

export type LayerKey = (typeof STACK_LAYERS)[number]['key'];

export interface Rung {
  key: RungKey;
  ordinal: string;
  name: string;
  model: string;
  cue: string;
  oneLine: string;
  /** Ownership of each STACK_LAYERS entry at this rung. */
  owns: Record<LayerKey, Owner>;
  /** The caveat the ownership row cannot express on its own. */
  note: string;
  goodWhen: string[];
  badWhen: string[];
  lockIn: { level: string; where: string };
  examples: { azure: string; oci: string };
  keepDoorOpen: string;
}

export const RUNGS: Rung[] = [
  {
    key: 'vm',
    ordinal: '01',
    name: 'Virtual machine',
    model: 'IaaS',
    cue: 'You get a computer.',
    oneLine:
      'The provider rents you an isolated machine and stops there. Everything above the hypervisor is yours, including the parts you would rather not think about.',
    owns: { physical: 'provider', virtualisation: 'provider', os: 'you', runtime: 'you', code: 'you', config: 'you', data: 'you' },
    note:
      'The most work of the five, and the one people underestimate. Kernel CVEs, log shipping, certificate rotation and backup restores are all yours, and none of them appear on the pricing page.',
    goodWhen: [
      'The software needs a specific kernel, a kernel module, or a driver it can only load with host access.',
      'A licence is bound to a physical host, a MAC address, or a hardware identifier.',
      'You are lifting an existing system on a deadline and rewriting it is not on the table.',
      'You need a runtime kept alive past the date any managed platform will still offer it.',
    ],
    badWhen: [
      'You have a dozen small services and no appetite for a dozen machines to patch.',
      'Nobody owns patching. An unattended VM is a liability with a monthly invoice.',
      'You want a deploy to be a swap, rather than a change applied to a long-lived box.',
    ],
    lockIn: {
      level: 'Low at the runtime',
      where:
        'The machine image is roughly movable. What holds you is everything around it — the IAM bindings, the load balancer, the snapshot format, the network design, and every provider agent installed on it.',
    },
    examples: { azure: 'Virtual Machines, VM Scale Sets', oci: 'Compute, Instance Pools' },
    keepDoorOpen:
      'Build the image from a pipeline rather than by hand, and keep configuration out of the image. A machine you cannot rebuild from source is not portable, whatever the disk format says.',
  },
  {
    key: 'container',
    ordinal: '02',
    name: 'Container',
    model: 'Packaging',
    cue: 'You standardise the box.',
    oneLine:
      'The application and its dependencies become one image that runs identically wherever there is a compatible kernel. This is the step that buys portability, and it is the reason the rest of this page exists.',
    owns: { physical: 'provider', virtualisation: 'provider', os: 'you', runtime: 'you', code: 'you', config: 'you', data: 'you' },
    note:
      'Packaging changed; ownership did not. Run containers on your own VMs and you still own the host OS. What moved is the dependency surface — now explicit, versioned, and shipped with the application instead of installed beside it.',
    goodWhen: [
      'You want one artifact to travel from a laptop through CI into production unchanged.',
      'Rollback should mean pointing at the previous image tag, not replaying an install.',
      'More than one team deploys, and their dependency choices should not collide.',
    ],
    badWhen: [
      'One monolith changes twice a year and its install is already automated.',
      'The workload is coupled to host drivers a container cannot reach.',
      'Nobody owns base images. You have just adopted the CVEs of every layer you inherited.',
    ],
    lockIn: {
      level: 'Lowest of the five',
      where:
        'The OCI image format is a real, implemented standard rather than a promise, and an image built for one registry runs from another. The genuine caveat is architecture, not vendor: an arm64 image will not run on amd64 nodes.',
    },
    examples: { azure: 'Container Registry, Container Instances', oci: 'Container Registry, Container Instances' },
    keepDoorOpen:
      'Keep provider SDK calls out of the image for anything the environment can supply. An image that reads a connection string from its environment moves; one that calls a provider secret service to fetch it does not.',
  },
  {
    key: 'orchestrated',
    ordinal: '03',
    name: 'Kubernetes',
    model: 'Orchestration',
    cue: 'You declare, it reconciles.',
    oneLine:
      'You write down what should be running. A controller compares that against what is actually running and closes the gap, continuously — not once at deploy time.',
    owns: { physical: 'provider', virtualisation: 'provider', os: 'shared', runtime: 'you', code: 'you', config: 'you', data: 'you' },
    note:
      'On a managed service the provider runs the control plane and publishes node images, but you decide when nodes upgrade and what runs on them. Kubernetes is a platform for building platforms, not an application runtime you get for free.',
    goodWhen: [
      'Enough services deploy independently that placing them by hand has become somebody’s job.',
      'You need self-healing, rolling updates and service discovery as properties of the system rather than as scripts.',
      'A platform team already exists and already runs shared infrastructure.',
    ],
    badWhen: [
      'There is no platform capacity. Kubernetes with nobody owning it is a second product you did not plan to build.',
      'The estate is one application and a cron job.',
      'Deployments are not yet reproducible. Orchestration multiplies the discipline you already have, in both directions.',
    ],
    lockIn: {
      level: 'Low in the API, high in the cluster',
      where:
        'Deployments and Services move between clouds almost unchanged. Ingress controllers, CSI drivers, CNI plugins, load balancer annotations, node identity and every operator you installed do not. The migration cost sits in the cluster, not in the manifests.',
    },
    examples: { azure: 'AKS', oci: 'OKE' },
    keepDoorOpen:
      'Keep the provider-specific pieces at the edges — annotations, storage classes and identity bindings in a layer of their own — so a move rewrites that layer instead of every manifest.',
  },
  {
    key: 'paas',
    ordinal: '04',
    name: 'Platform service',
    model: 'PaaS',
    cue: 'You hand over the artifact.',
    oneLine:
      'You deliver code or an image and the provider runs it. No OS, no cluster, no upgrade cadence — and no shell access, no arbitrary system libraries, and no say in when your runtime version is deprecated.',
    owns: { physical: 'provider', virtualisation: 'provider', os: 'provider', runtime: 'shared', code: 'you', config: 'you', data: 'you' },
    note:
      'The runtime is shared, not handed over. The provider patches the platform and gives you platform metrics; tracing, alerting logic, SLOs and incident response stay firmly on your side of the line.',
    goodWhen: [
      'The team is small and time to first deploy matters more than exit cost.',
      'The workload is an ordinary web application or API with no unusual host requirements.',
      'Load is near zero most of the time, and paying for an idle machine is the wrong trade.',
    ],
    badWhen: [
      'A regulator or a contract requires a demonstrable exit within a fixed period.',
      'You depend on a runtime version that will be deprecated on the provider’s schedule, not yours.',
      'The application needs system-level access the platform will never grant.',
    ],
    lockIn: {
      level: 'Moderate at the runtime, high at the seams',
      where:
        'The runtime is often more portable than it looks. The connectors are not. Managed connections carry their own identity bindings and trigger semantics, and they stay behind when the code leaves. Move the runtime alone and you did not migrate — you reimplemented.',
    },
    examples: { azure: 'App Service, Container Apps, Functions', oci: 'Functions, API Gateway, Container Instances' },
    keepDoorOpen:
      'Reach backing services through ordinary protocols — a database URL, an HTTP endpoint, a queue with a standard client — rather than through the platform binding that makes the demo short.',
  },
  {
    key: 'saas',
    ordinal: '05',
    name: 'Software service',
    model: 'SaaS',
    cue: 'You stop running anything.',
    oneLine:
      'Somebody else runs the product. You configure it, integrate it, govern it — and remain entirely accountable for the data inside it and for who is allowed to read it.',
    owns: { physical: 'provider', virtualisation: 'provider', os: 'provider', runtime: 'provider', code: 'provider', config: 'you', data: 'you' },
    note:
      'Read the bottom two rows again. Configuration and data never transfer, at any level, including this one. Most SaaS incidents are not the provider being breached — they are a permission the customer left open.',
    goodWhen: [
      'The capability is not your differentiator. Nobody was ever promoted for running their own mail server.',
      'The problem is well understood and a mature product already solves it.',
      'The engineering is better spent on the part of the business that is actually yours.',
    ],
    badWhen: [
      'The capability is the thing you are selling.',
      'The data model is your moat and the product would flatten it.',
      'The process you would have to adopt is worse than the one you have, and you would be paying to adopt it.',
    ],
    lockIn: {
      level: 'Highest, and it is not about code',
      where:
        'The question is never "is there an export?" — there is always an export. It is whether the export arrives in a shape another product can ingest, and whether the processes built around this one survive the change. That is usually the more expensive half.',
    },
    examples: { azure: 'Microsoft 365, Fabric', oci: 'Fusion Applications, NetSuite' },
    keepDoorOpen:
      'Own the identity layer and the integration contracts. If access is federated from your own directory and integrations run through interfaces you control, you are replacing a product rather than rebuilding a department.',
  },
];

export const OWNER_LABEL: Record<Owner, string> = {
  provider: 'Provider',
  shared: 'Shared',
  you: 'Yours',
};

export const RUNG_BY_KEY = new Map(RUNGS.map((r) => [r.key, r]));
