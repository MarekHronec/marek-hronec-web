/*
 * Narrative for the five animated concept scenes.
 *
 * Same shape as src/data/cia-explainer.ts so the panel component stays generic:
 * each story pairs a definition with one demonstrable before/after the reader
 * can trigger, and closes on the trade rather than on a recommendation.
 */

export type ConceptKey = 'vm' | 'container' | 'kubernetes' | 'paas' | 'saas';

export interface ConceptStory<Key extends string = ConceptKey> {
  key: Key;
  ordinal: string;
  name: string;
  model: string;
  cue: string;
  title: string;
  definition: string;
  analogy: string;
  question: string;
  answers?: { yes: string; no: string };
  action: string;
  reset: string;
  before: string;
  after: string;
  lesson: string;
}

export const CONCEPT_STORIES: ConceptStory[] = [
  {
    key: 'vm',
    ordinal: '01',
    name: 'Virtual machine',
    model: 'IaaS',
    cue: 'You get a computer.',
    title: 'One ship, one charter.',
    definition: "A VM is a virtual computer with its own operating system. Like chartering another vessel, separating a workload gives you more control—and another OS to maintain.",
    analogy:
      "A charter gives you control over a vessel and its cargo. You can carry several workloads together, or charter another vessel when one needs a separate operating system. You maintain each vessel you choose to run.",
    question: "Which workload needs control of its own operating system, and who will patch and operate it?",
    action: "Isolate a second workload",
    reset: "Return to one machine",
    before: "One VM carries several workloads; one guest OS to maintain.",
    after: "A second VM separates the guest OS. Your team now maintains two.",
    lesson:
      "Choose a VM when control over the guest OS matters. Capacity, isolation and the number of workloads are separate decisions.",
  },
  {
    key: 'container',
    ordinal: '02',
    name: 'Container',
    model: 'Packaging',
    cue: 'You standardise the box.',
    title: "One box, compatible carriers.",
    definition: "A container image packages an app and its dependencies like a standard cargo box. It travels between compatible hosts; data, secrets and connections still need setting up.",
    analogy:
      "A standard cargo box moves between compatible carriers without repacking its contents. The image is your box; the host is the carrier. Packaging makes the handover repeatable, but does not move the database or arrange access at the destination.",
    question: "What must be captured in a repeatable build and tested on the target host, so this app can move without manual setup?",
    action: 'Standardise the box',
    reset: 'Return to loose cargo',
    before: "Loose cargo needs repacking for each carrier.",
    after: "One image moves between compatible hosts. Data and access still need their own setup.",
    lesson: "An image needs a compatible kernel and CPU architecture. Build and test it with the target data, secrets and connections. Containers do not by themselves require Kubernetes.",
  },
  {
    key: 'kubernetes',
    ordinal: '03',
    name: 'Kubernetes',
    model: 'Orchestration',
    cue: 'You declare, it reconciles.',
    title: "Replace what is missing.",
    definition: "Kubernetes compares what you want running with what is running. Like a watch checking a cargo manifest, its controllers act to close the gap.",
    analogy:
      "The manifest calls for three boxes on deck. When one is lost, the watch notices the gap and requests a replacement. Someone still has to supply space on deck and working cargo: automation cannot repair every underlying problem.",
    question: "Which failures should be handled automatically, and who provides the health checks, spare capacity and incident response?",
    action: "Lose one Pod",
    reset: "Restore the starting state",
    before: "Desired: 3 Pods. Running: 3. Nothing to replace.",
    after: "A Pod is lost and replaced. Three run again, given spare capacity and a working image.",
    lesson:
      "Reconciliation keeps trying to reach the desired state. You still need health checks, capacity, incident ownership and supported versions of the cluster and its add-ons.",
  },
  {
    key: 'paas',
    ordinal: '04',
    name: 'Platform service',
    model: 'PaaS',
    cue: 'You hand over the artifact.',
    title: 'The port runs the ship.',
    definition: "A platform service runs your code or image on provider-operated infrastructure, like a port supplying the vessel and crew. Supported runtimes and connections vary by service.",
    analogy:
      "The port supplies a vessel and crew, so you can focus on the cargo. Some fittings use standard connections; others belong to that port. A move means checking which connections can travel and which need adapters.",
    question: "Which runtime, identity, data and network dependencies must you check before choosing—or leaving—this platform?",
    action: 'Move to another port',
    reset: 'Reset the move',
    before: "The image runs here with this provider’s connections.",
    after: "The image moves; identity bindings and triggers need rewiring. Data needs a migration plan.",
    lesson:
      "Check the whole dependency map: identity, storage, triggers, networking and runtime support. Test a move before treating an image as proof of portability.",
  },
  {
    key: 'saas',
    ordinal: '05',
    name: 'Software service',
    model: 'SaaS',
    cue: "You use a finished product.",
    title: "Buy the service. Keep a cargo owner.",
    definition: "SaaS is a finished application, like booking a scheduled freight service. The provider operates the product; you still govern your data, users and tenant settings.",
    analogy:
      'You stop owning ships and book space on a scheduled service. The cargo is still yours, and so is every decision about who may collect it at the other end.',
    question: "Who owns access, configuration and usable data exports, and which responsibilities does the contract assign to each party?",
    action: 'Hand over the operation',
    reset: 'Take it back',
    before: "Your team runs the vessel, crew and schedule.",
    after: "The provider runs the product. Your team still owns its data and access decisions.",
    lesson:
      "A provider certificate does not validate your tenant configuration. Agree responsibilities in the contract, control access and test whether you can export usable data.",
  },
];
