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

export type ApproachKey = 'vm' | 'container' | 'orchestrated' | 'paas' | 'saas';
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

export interface Approach {
  key: ApproachKey;
  name: string;
  model: string;
  oneLine: string;
  /** Ownership of each STACK_LAYERS entry at this approach. */
  owns: Record<LayerKey, Owner>;
  /** The caveat the ownership row cannot express on its own. */
  note: string;
  goodWhen: string[];
  badWhen: string[];
  lockIn: { level: string; where: string };
  examples: { microsoft: string; oracle: string };
  keepDoorOpen: string;
}

export const APPROACHES: Approach[] = [
  {
    key: 'vm',
    name: 'Virtual machine',
    model: 'IaaS',
    oneLine:
      'The provider rents you an isolated machine and stops there. Everything above the hypervisor is yours, including the parts you would rather not think about.',
    owns: { physical: 'provider', virtualisation: 'provider', os: 'you', runtime: 'you', code: 'you', config: 'you', data: 'you' },
    note:
      "You maintain the guest OS, application and recovery procedures. Managed backup and monitoring can help, but someone must configure them and verify restores.",
    goodWhen: [
      'The software needs a specific kernel, a kernel module, or a driver it can only load with host access.',
      'The vendor supports your chosen VM and its licensing model; hardware-bound licences need separate verification.',
      'You are lifting an existing system on a deadline and rewriting it is not on the table.',
      'You need a runtime kept alive past the date any managed platform will still offer it.',
    ],
    badWhen: [
      'You have little capacity to maintain guest operating systems, even when workloads share machines.',
      'Nobody owns patching. An unattended VM is a liability with a monthly invoice.',
      'You want a deploy to be a swap, rather than a change applied to a long-lived box.',
    ],
    lockIn: {
      level: 'Low at the runtime',
      where:
        'The machine image is roughly movable. What holds you is everything around it — the IAM bindings, the load balancer, the snapshot format, the network design, and every provider agent installed on it.',
    },
    examples: { microsoft: 'Azure Virtual Machines, Scale Sets', oracle: 'OCI Compute, Instance Pools' },
    keepDoorOpen:
      'Build the image from a pipeline rather than by hand, and keep configuration out of the image. A machine you cannot rebuild from source is not portable, whatever the disk format says.',
  },
  {
    key: 'container',
    name: 'Container',
    model: 'Packaging',
    oneLine:
      "An image packages application files and dependencies into a versioned artifact. You still maintain its base image and libraries, and configure a compatible host and external services.",
    owns: { physical: 'provider', virtualisation: 'provider', os: 'you', runtime: 'you', code: 'you', config: 'you', data: 'you' },
    note:
      'Packaging changed; ownership did not. Run containers on your own VMs and you still own the host OS. What moved is the dependency surface — now explicit, versioned, and shipped with the application instead of installed beside it.',
    goodWhen: [
      'You want one artifact to travel from a laptop through CI into production unchanged.',
      'Rollback should mean pointing at the previous image digest, not replaying an install.',
      'More than one team deploys, and their dependency choices should not collide.',
    ],
    badWhen: [
      'One monolith changes twice a year and its install is already automated.',
      'The workload is coupled to host drivers a container cannot reach.',
      'Nobody owns base images. You have just adopted the CVEs of every layer you inherited.',
    ],
    lockIn: {
      level: 'Low at the image format',
      where:
        'OCI image standards support exchange between compatible registries and runtimes. Match the OS and CPU architecture, or provide a multi-platform image. Storage, networking and identity remain separate migration work.',
    },
    examples: { microsoft: 'Containers on Azure VMs; images in ACR', oracle: 'Containers on OCI Compute; images in Container Registry' },
    keepDoorOpen:
      "Inject deployment configuration and secrets securely. Isolate provider SDKs behind adapters and test the image on a second compatible environment.",
  },
  {
    key: 'orchestrated',
    name: 'Kubernetes',
    model: 'Orchestration',
    oneLine:
      'You write down what should be running. A controller compares that against what is actually running and closes the gap, continuously — not once at deploy time.',
    owns: { physical: 'provider', virtualisation: 'provider', os: 'shared', runtime: 'you', code: 'you', config: 'you', data: 'you' },
    note:
      "This column assumes managed Kubernetes. Providers operate the control plane; node maintenance and upgrade controls vary by service. Your team still owns workloads, add-ons and application recovery.",
    goodWhen: [
      'Enough services deploy independently that placing them by hand has become somebody’s job.',
      'You need self-healing, rolling updates and service discovery as properties of the system rather than as scripts.',
      'A platform team already exists and already runs shared infrastructure.',
    ],
    badWhen: [
      'There is no platform capacity. Kubernetes with nobody owning it is a second product you did not plan to build.',
      'The estate is one application and a cron job.',
      'Deployments are not yet reproducible. Orchestration amplifies whatever discipline you already have, including its absence.',
    ],
    lockIn: {
      level: 'Low in the API, high in the cluster',
      where:
        'Deployments and Services move between clouds almost unchanged. Ingress controllers, CSI drivers, CNI plugins, load balancer annotations, node identity and every operator you installed do not. The migration cost sits in the cluster, not in the manifests.',
    },
    examples: { microsoft: 'Azure Kubernetes Service (AKS)', oracle: 'OCI Kubernetes Engine (OKE)' },
    keepDoorOpen:
      'Keep the provider-specific pieces at the edges — annotations, storage classes and identity bindings in a layer of their own — so a move rewrites that layer instead of every manifest.',
  },
  {
    key: 'paas',
    name: 'Platform service',
    model: 'PaaS',
    oneLine:
      "You deliver code or an image and the provider operates the host platform. Some services offer custom libraries and container shell access. Host control, runtime support and scaling remain service-specific.",
    owns: { physical: 'provider', virtualisation: 'provider', os: 'provider', runtime: 'shared', code: 'you', config: 'you', data: 'you' },
    note:
      'The runtime is shared, not handed over. The provider patches the platform and gives you platform metrics; tracing, alerting logic, SLOs and incident response stay firmly on your side of the line.',
    goodWhen: [
      'The team is small and time to first deploy matters more than exit cost.',
      'The workload is an ordinary web application or API with no unusual host requirements.',
      'Load is often idle and the selected plan supports economical scale-to-zero; check minimum charges and cold starts.',
    ],
    badWhen: [
      'You cannot meet the required exit deadline with the chosen service and its dependencies.',
      'You depend on a runtime version that will be deprecated on the provider’s schedule, not yours.',
      'The application needs system-level access the platform will never grant.',
    ],
    lockIn: {
      level: 'Moderate at the runtime, high at the seams',
      where:
        'The runtime is often more portable than it looks. Provider-specific connectors may require adapters. Managed connections carry their own identity bindings and trigger semantics, and they stay behind when the code leaves — include those connections in the migration estimate.',
    },
    examples: { microsoft: 'App Service, Container Apps, Functions', oracle: 'OCI Functions, Container Instances' },
    keepDoorOpen:
      'Reach backing services through ordinary protocols — a database URL, an HTTP endpoint, a queue with a standard client — rather than through the platform binding that makes the demo short.',
  },
  {
    key: 'saas',
    name: 'Software service',
    model: 'SaaS',
    oneLine:
      "The provider operates a finished product. You configure and integrate it, govern your data and control user access. Both parties retain responsibilities under the service agreement.",
    owns: { physical: 'provider', virtualisation: 'provider', os: 'provider', runtime: 'provider', code: 'provider', config: 'you', data: 'you' },
    note:
      "You own tenant settings and access decisions. The provider also has security, availability and data-handling duties: a customer responsibility does not remove the provider responsibility.",
    goodWhen: [
      'The capability is not your differentiator. Nobody was ever promoted for running their own mail server.',
      'The problem is well understood and a mature product already solves it.',
      'The engineering is better spent on the part of the business that is actually yours.',
    ],
    badWhen: [
      'The capability is the thing you are selling.',
      'The way you model the data is part of the advantage, and the product would force it into its own shape.',
      'The process you would have to adopt is worse than the one you have, and you would be paying to adopt it.',
    ],
    lockIn: {
      level: 'Potentially high in data and workflows',
      where:
        'Check whether a complete export exists, what it costs and whether another product can use it. Workflows, integrations and permissions may need migration too.',
    },
    examples: { microsoft: 'Microsoft 365, Dynamics 365', oracle: 'Oracle Fusion Applications, NetSuite' },
    keepDoorOpen:
      'Own the identity layer and the integration contracts. If access is federated from your own directory and integrations run through interfaces you control, you are replacing a product rather than rebuilding a department.',
  },
];

export const OWNER_LABEL: Record<Owner, string> = {
  provider: 'Provider',
  shared: 'Shared',
  you: 'Yours',
};

export const APPROACH_BY_KEY = new Map(APPROACHES.map((a) => [a.key, a]));
