/*
 * Chooser model — every question, weight and exclusion reason is config.
 *
 * Two mechanisms, deliberately kept apart:
 *   excludes  a hard constraint. The rung is ruled out and the reason is shown.
 *   scores    a preference nudge. Never decisive on its own.
 *
 * The weights are judgement, not arithmetic truth — they encode "what would a
 * reviewer say", and the output always shows its reasoning so a reader can
 * disagree with it. Tune them here; nothing in the component hard-codes any.
 */

import type { RungKey } from './platform-ladder';

export interface ChooserOption {
  value: string;
  label: string;
  detail?: string;
  excludes?: { rung: RungKey; reason: string }[];
  scores?: Partial<Record<RungKey, number>>;
}

export interface ChooserQuestion {
  key: string;
  prompt: string;
  help: string;
  options: ChooserOption[];
}

export const QUESTIONS: ChooserQuestion[] = [
  {
    key: 'host',
    prompt: 'Does the software need something only the host can give it?',
    help: 'This is the one question that can settle the answer on its own.',
    options: [
      {
        value: 'kernel',
        label: 'A kernel module, a driver, or a kernel-level agent',
        detail: 'Storage drivers, kernel-level security agents, specialised networking.',
        excludes: [
          { rung: 'paas', reason: 'A platform service never grants access to the kernel it runs on.' },
          { rung: 'saas', reason: 'There is no host to configure — you would be buying a different product.' },
        ],
        scores: { vm: 6, container: -5, orchestrated: -5 },
      },
      {
        value: 'licence',
        label: 'A licence bound to a host ID, MAC address or physical socket',
        detail: 'Common with older commercial software and appliance vendors.',
        excludes: [
          { rung: 'paas', reason: 'Instances are replaced without notice, so a host-bound licence cannot hold.' },
          { rung: 'saas', reason: 'You would be replacing the licensed product, not hosting it.' },
        ],
        scores: { vm: 6, container: -4, orchestrated: -4 },
      },
      {
        value: 'os',
        label: 'An OS or runtime version no managed platform still offers',
        detail: 'Old distributions, superseded runtimes, vendor appliances.',
        excludes: [
          { rung: 'paas', reason: 'Runtime versions are deprecated on the provider’s schedule, which is the opposite of what this workload needs.' },
        ],
        scores: { vm: 5, container: 2 },
      },
      {
        value: 'none',
        label: 'None of these — it is an ordinary process that listens on a port',
        scores: { container: 2, orchestrated: 1, paas: 2 },
      },
    ],
  },
  {
    key: 'build',
    prompt: 'Should your organisation be building this capability at all?',
    help: 'The cheapest architecture is often the one you do not write.',
    options: [
      {
        value: 'core',
        label: 'It is what we sell, or the reason customers choose us',
        scores: { saas: -8 },
      },
      {
        value: 'mixed',
        label: 'A standard capability, but our workflow around it is genuinely unusual',
        scores: { saas: -2, paas: 1 },
      },
      {
        value: 'plumbing',
        label: 'Every company has one: mail, CRM, ticketing, BI, identity',
        detail: 'Nobody was ever promoted for running their own mail server.',
        // Deliberately dominant. The remaining questions all ask *how* to run
        // something; this one asks whether to run it at all, and when the
        // answer is "no", the others are moot. A genuine blocker still
        // overrides it, because those are modelled as exclusions rather than
        // weights — "needs a kernel module" rules SaaS out regardless.
        scores: { saas: 20 },
      },
    ],
  },
  {
    key: 'state',
    prompt: 'Where does the application keep state between requests?',
    help: 'The single most reliable predictor of how painful a move will be.',
    options: [
      {
        value: 'external',
        label: 'In a database or object store. The process itself holds nothing',
        scores: { container: 3, orchestrated: 2, paas: 3 },
      },
      {
        value: 'movable',
        label: 'On local disk today, but it could be moved to a database',
        scores: { container: 1, vm: 1 },
      },
      {
        value: 'stuck',
        label: 'On local disk, and it genuinely cannot move',
        excludes: [
          { rung: 'paas', reason: 'There is no durable local disk you can rely on across a restart.' },
        ],
        scores: { vm: 4, orchestrated: -3 },
      },
    ],
  },
  {
    key: 'estate',
    prompt: 'How many independently deployable services are there?',
    help: 'Orchestration earns its cost by the number of things it places.',
    options: [
      { value: 'one', label: 'One', scores: { vm: 2, paas: 3, orchestrated: -6 } },
      { value: 'few', label: 'Two to five', scores: { container: 2, paas: 2, orchestrated: -2 } },
      { value: 'many', label: 'Six to twenty', scores: { container: 2, orchestrated: 3 } },
      { value: 'lots', label: 'More than twenty', scores: { container: 2, orchestrated: 6, paas: -2 } },
    ],
  },
  {
    key: 'ops',
    prompt: 'Who is on call for the infrastructure, and what do they already run?',
    help: 'The question most decision documents skip, and most post-mortems reach.',
    options: [
      {
        value: 'nobody',
        label: 'Nobody in particular. Deploys happen in office hours',
        excludes: [
          {
            rung: 'orchestrated',
            reason: 'Kubernetes with nobody owning it is a second product you did not plan to build — one that needs an upgrade every few months.',
          },
        ],
        scores: { paas: 5, saas: 3, vm: -3 },
      },
      {
        value: 'devs',
        label: 'A couple of developers who also own the application',
        scores: { paas: 4, container: 2, orchestrated: -4 },
      },
      {
        value: 'platform',
        label: 'A platform team that already runs shared infrastructure',
        scores: { orchestrated: 5, container: 2 },
      },
    ],
  },
  {
    key: 'exit',
    prompt: 'How real is the possibility of moving to another provider?',
    help: 'Be honest here. Most people overstate it, and a few badly understate it.',
    options: [
      {
        value: 'required',
        label: 'Required — a regulator or contract asks us to demonstrate an exit',
        detail: 'DORA Article 30 and several national frameworks ask for a tested exit plan.',
        scores: { container: 4, orchestrated: 3, paas: -5, saas: -4 },
      },
      {
        value: 'plausible',
        label: 'Plausible within three to five years. We want the option',
        scores: { container: 3, orchestrated: 2, paas: -2 },
      },
      {
        value: 'no',
        label: 'Not realistically. We are committed and would rather move fast',
        scores: { paas: 4, saas: 3, container: -1 },
      },
    ],
  },
  {
    key: 'load',
    prompt: 'What does the load actually look like?',
    help: 'Shape matters more than volume when you are picking a rung.',
    options: [
      { value: 'idle', label: 'Near zero most of the time, with occasional bursts', scores: { paas: 5, vm: -4, orchestrated: -2 } },
      { value: 'steady', label: 'Steady and predictable', scores: { vm: 2, container: 2, orchestrated: 1 } },
      { value: 'spiky', label: 'Spiky and hard to predict', scores: { orchestrated: 3, paas: 3, vm: -2 } },
    ],
  },
];

export type Selection = Record<string, string | undefined>;

export interface RungVerdict {
  key: RungKey;
  score: number;
  excluded: boolean;
  reasons: string[];
}

const RUNG_KEYS: RungKey[] = ['vm', 'container', 'orchestrated', 'paas', 'saas'];

export function evaluate(selection: Selection) {
  const score: Record<string, number> = { vm: 0, container: 0, orchestrated: 0, paas: 0, saas: 0 };
  const reasons: Record<string, string[]> = { vm: [], container: [], orchestrated: [], paas: [], saas: [] };

  let answered = 0;
  for (const question of QUESTIONS) {
    const chosen = selection[question.key];
    if (!chosen) continue;
    const option = question.options.find((o) => o.value === chosen);
    if (!option) continue;
    answered += 1;
    for (const [rung, delta] of Object.entries(option.scores ?? {})) score[rung] += delta as number;
    for (const rule of option.excludes ?? []) reasons[rule.rung].push(rule.reason);
  }

  const verdicts: RungVerdict[] = RUNG_KEYS.map((key) => ({
    key,
    score: score[key],
    excluded: reasons[key].length > 0,
    reasons: reasons[key],
  }));

  // Viable rungs first, then by score. Ties keep the declared ladder order,
  // which biases toward the simpler rung — the right default when it is close.
  const ranked = [...verdicts].sort((a, b) => {
    if (a.excluded !== b.excluded) return a.excluded ? 1 : -1;
    return b.score - a.score;
  });

  const viable = ranked.filter((r) => !r.excluded);
  return {
    answered,
    total: QUESTIONS.length,
    complete: answered === QUESTIONS.length,
    verdicts,
    ranked,
    top: viable[0],
    runnerUp: viable[1],
    /** True when the top two are close enough that the tool should not pretend to be sure. */
    close: viable.length > 1 && viable[0].score - viable[1].score <= 2,
  };
}

export const LOCK_IN_NOTE: Record<string, string> = {
  required:
    'You told us an exit has to be demonstrable. That rules the decision, not the convenience of any one platform: keep the artifact portable, reach backing services through ordinary protocols, and rehearse the exit at least once. An exit plan nobody has tested is a document, not a capability.',
  plausible:
    'You want the option to move without paying for it every day. That is the reasonable middle: take the managed service, but keep the provider-specific pieces in a layer of their own so a move rewrites that layer instead of the application.',
  no:
    'You have decided not to keep the door open, and that is a legitimate choice — it is usually the cheaper one. Make it deliberately: write down what you would have to rebuild, price it once, and revisit when the contract or the regulator changes.',
};
