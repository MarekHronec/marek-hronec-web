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
    definition:
      'A hypervisor carves a physical machine into virtual ones. Each gets its own kernel, its own operating system, and its own patch cycle.',
    analogy:
      "A charter gives you control over a vessel and its cargo. You can carry several workloads together, or charter another vessel when one needs a separate operating system. You maintain each vessel you choose to run.",
    question: 'Does anything in this workload actually need its own kernel?',
    action: "Isolate a second workload",
    reset: "Return to one machine",
    before: "One VM can run several workloads. Its guest OS is yours to maintain.",
    after: "Here we choose a second VM for a separate guest kernel. That adds another OS to maintain.",
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
    definition:
      "An image packages application files and user-space dependencies. A container runs that image using a compatible host kernel; data, secrets and external services still need configuration.",
    analogy:
      "A standard cargo box moves between compatible carriers without repacking its contents. The image is your box; the host is the carrier. Packaging makes the handover repeatable, but does not move the database or arrange access at the destination.",
    question: 'Can your team build and run this application on a new, compatible host without setting it up by hand?',
    answers: {
      yes: 'Your build is repeatable: a good starting point for containers. Test the image on the target platform, including its data and connections. This does not mean you need Kubernetes.',
      no: 'First capture the manual setup in a build recipe and declare the dependencies. Containers can help make that setup repeatable; choosing a container host alone will not fix it.',
    },
    action: 'Standardise the box',
    reset: 'Return to loose cargo',
    before: 'Every carrier needs the cargo repacked. Each transfer is hand-work, and each one can go wrong.',
    after: "The same image travels through development, CI and production. Each destination still needs compatible hardware, runtime and configuration.",
    lesson:
      'The box is an implemented standard, not a promise — which is the whole portability argument. It is also its limit: the box still needs a compatible kernel and a matching CPU architecture underneath.',
  },
  {
    key: 'kubernetes',
    ordinal: '03',
    name: 'Kubernetes',
    model: 'Orchestration',
    cue: 'You declare, it reconciles.',
    title: 'The loop that never stops watching.',
    definition:
      'Kubernetes holds a declaration of what should be running, and controllers that continuously compare it against what is running — then act on the difference.',
    analogy:
      "The manifest calls for three boxes on deck. When one is lost, the watch notices the gap and requests a replacement. Someone still has to supply space on deck and working cargo: automation cannot repair every underlying problem.",
    question: 'When something dies at three in the morning, does anything put it back?',
    action: "Lose one Pod",
    reset: "Restore the starting state",
    before: 'Declared 3. Observed 3. The controller has nothing to do.',
    after: "A Pod is lost. The ReplicaSet controller creates a replacement, and the scheduler finds a node for it. With capacity and a working image, the count returns to three.",
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
    definition:
      "You supply code or an image; the provider operates the underlying platform. Supported runtimes, custom images, scaling and access depend on the service and plan.",
    analogy:
      "The port supplies a vessel and crew, so you can focus on the cargo. Some fittings use standard connections; others belong to that port. A move means checking which connections can travel and which need adapters.",
    question: 'If this platform vanished tomorrow, what would you actually have to rebuild?',
    action: 'Move to another port',
    reset: 'Reset the move',
    before: 'Code, image and configuration all belong to you. The connectors make the wiring short.',
    after: 'The image moves. Provider-specific identity bindings and triggers need new connections; data needs its own migration plan.',
    lesson:
      "Check the whole dependency map: identity, storage, triggers, networking and runtime support. Test a move before treating an image as proof of portability.",
  },
  {
    key: 'saas',
    ordinal: '05',
    name: 'Software service',
    model: 'SaaS',
    cue: "You use a finished product.",
    title: 'You book the freight, you still own the cargo.',
    definition:
      'You consume a finished product. The provider runs the platform and the application; you configure, integrate and govern it.',
    analogy:
      'You stop owning ships and book space on a scheduled service. The cargo is still yours, and so is every decision about who may collect it at the other end.',
    question: 'Which of your obligations does this contract actually move?',
    action: 'Hand over the operation',
    reset: 'Take it back',
    before: 'You run the vessel, the crew and the schedule, alongside the cargo itself.',
    after: "The provider operates the product. You still govern your data, users and tenant settings; the provider retains its own security and contractual duties.",
    lesson:
      "A provider certificate does not validate your tenant configuration. Agree responsibilities in the contract, control access and test whether you can export usable data.",
  },
];
