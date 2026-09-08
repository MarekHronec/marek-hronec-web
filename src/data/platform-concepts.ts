/*
 * Narrative for the five animated concept scenes.
 *
 * Same shape as src/data/cia-explainer.ts so the panel component stays generic:
 * each story pairs a definition with one demonstrable before/after the reader
 * can trigger, and closes on the trade rather than on a recommendation.
 */

export interface ConceptStory {
  key: string;
  ordinal: string;
  name: string;
  model: string;
  cue: string;
  title: string;
  definition: string;
  analogy: string;
  question: string;
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
      'Chartering an entire vessel to move a single pallet. The isolation is genuine, and sometimes it is exactly what you need. The hold is mostly empty either way, and you crew the whole ship.',
    question: 'Does anything in this workload actually need its own kernel?',
    action: 'Add a second workload',
    reset: 'Remove the second workload',
    before: 'One machine, one workload. You crew all of it.',
    after: 'The second workload brings a second machine — its own kernel, its own patches, its own crew.',
    lesson:
      'You are buying isolation. Sometimes that is the right purchase: a kernel module, a host-bound licence, an OS nothing else will run. Often it is just the shape the estate grew into.',
  },
  {
    key: 'container',
    ordinal: '02',
    name: 'Container',
    model: 'Standard box',
    cue: 'You standardise the box.',
    title: 'One box, any carrier.',
    definition:
      'A container image packages an application with its dependencies. The kernel stays on the host; the image carries everything above it.',
    analogy:
      'Before 1956, cargo moved piece by piece — every transfer between ship, crane and truck meant unpacking and repacking by hand. The standard box did not make ships faster. It made the transfer almost free. A container image does that for a runtime handover.',
    question: 'Could somebody rebuild your runtime elsewhere from what is checked in?',
    action: 'Standardise the box',
    reset: 'Return to loose cargo',
    before: 'Every carrier needs the cargo repacked. Each transfer is hand-work, and each one can go wrong.',
    after: 'One box moves from laptop to CI to any compatible host, unchanged. The handover stops being a project.',
    lesson:
      'The box is an implemented standard, not a promise — which is the whole portability argument. It is also its limit: the box still needs a compatible kernel and a matching CPU architecture underneath.',
  },
  {
    key: 'kubernetes',
    ordinal: '03',
    name: 'Kubernetes',
    model: 'Orchestrated',
    cue: 'You declare, it reconciles.',
    title: 'The loop that never stops watching.',
    definition:
      'Kubernetes holds a declaration of what should be running, and controllers that continuously compare it against what is running — then act on the difference.',
    analogy:
      'The manifest says three boxes on deck. A heavy sea takes one over the side. Nobody raises a ticket: the next round of the watch counts two, compares against three, and puts a replacement aboard. The loop does not stop when the deploy finishes.',
    question: 'When something dies at three in the morning, does anything put it back?',
    action: 'Lose a container overboard',
    reset: 'Calm the sea',
    before: 'Declared 3. Observed 3. The controller has nothing to do.',
    after: 'Observed 2 against a declared 3. The controller schedules a replacement — no ticket, no pager, no human in the loop.',
    lesson:
      'Self-healing is a property of the loop, not a feature you switch on. What it costs is a control plane, an upgrade every few months, and somebody who genuinely understands it.',
  },
  {
    key: 'paas',
    ordinal: '04',
    name: 'Platform service',
    model: 'PaaS',
    cue: 'You hand over the artifact.',
    title: 'The port runs the ship.',
    definition:
      'You supply the artifact. The provider supplies and operates everything that runs it, and decides when the runtime under it changes.',
    analogy:
      'You bring cargo to the quay and the port does the rest — crane, vessel, crew, schedule. It is genuinely faster. The catch is the fittings: they are the port’s, they match only their own equipment, and the day you leave you find out how much of your operation was theirs.',
    question: 'If this platform vanished tomorrow, what would you actually have to rebuild?',
    action: 'Move to another port',
    reset: 'Reset the move',
    before: 'Code, image and configuration all belong to you. The connectors make the wiring short.',
    after: 'The runtime moves. The managed connectors — their identity bindings, their triggers — stay at the quay. That gap is the migration.',
    lesson:
      'Lock-in is born at the connector, not the runtime. Judge a platform service by its seams rather than by how quickly it takes your first deploy.',
  },
  {
    key: 'saas',
    ordinal: '05',
    name: 'Software service',
    model: 'SaaS',
    cue: 'You stop running anything.',
    title: 'You book the freight, you still own the cargo.',
    definition:
      'You consume a finished product. The provider runs the platform and the application; you configure, integrate and govern it.',
    analogy:
      'You stop owning ships and book space on a scheduled service. The cargo is still yours, and so is every decision about who may collect it at the other end.',
    question: 'Which of your obligations does this contract actually move?',
    action: 'Hand over the operation',
    reset: 'Take it back',
    before: 'You run the vessel, the crew and the schedule, alongside the cargo itself.',
    after: 'The service runs the vessel, the crew and the schedule. Two things do not transfer: the cargo, and the list of who may sign for it.',
    lesson:
      'A provider’s compliance certificate covers their platform, not your configuration. Data and access stay yours at every rung — this one included.',
  },
];
