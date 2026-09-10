/*
 * Chooser model — every question, weight and exclusion reason is config.
 *
 * Three mechanisms, deliberately kept apart:
 *   excludes  a hard constraint. The option is ruled out and the reason shown.
 *   scores    a preference nudge. Never decisive on its own.
 *   note      a caveat about the answer itself, surfaced beside the verdict.
 *
 * Question order matches the `label` on each question: purpose → constraints →
 * storage → scale → operations → load → exit. "Should you run this at all"
 * comes first because a yes to buying makes the remaining six moot, and it is
 * cheaper to find that out on question one than on question seven. Exit is last
 * so it hands off to the portability section below the tool.
 *
 * The weights are judgement, not arithmetic truth — they encode "what would a
 * reviewer say", and the output always shows its reasoning so a reader can
 * disagree with it. Tune them here; nothing in the component hard-codes any.
 */

import type { ApproachKey } from './platform-approaches';

export interface ChooserOption {
  value: string;
  label: string;
  detail?: string;
  excludes?: { approach: ApproachKey; reason: string }[];
  scores?: Partial<Record<ApproachKey, number>>;
  note?: string;
  /** Drop the note if this approach has been ruled out — the note assumes it is still on the table. */
  noteUnlessExcluded?: ApproachKey;
}

export interface ChooserQuestion {
  key: string;
  /** Short category name, shown as "Question N of 7 · <label>". */
  label: string;
  prompt: string;
  help: string;
  options: ChooserOption[];
}

export const QUESTIONS: ChooserQuestion[] = [
  {
    key: 'build',
    label: 'Purpose',
    prompt: 'Should your organisation be running this at all?',
    help: 'The cheapest architecture is the one you never write. Worth settling before anything else.',
    options: [
      {
        value: 'core',
        label: 'It is what we sell, or the reason customers choose us',
        scores: { saas: -8 },
      },
      {
        value: 'mixed',
        label: 'A standard capability, but our process around it is unusual',
        scores: { saas: -2, paas: 1 },
      },
      {
        value: 'plumbing',
        label: 'A suitable product already meets our needs: mail, CRM or ticketing',
        detail: 'We have checked product fit, integration, data handling and contract requirements.',
        // Deliberately dominant. The other six questions all ask *how* to run
        // something; this one asks whether to run it at all, and when the
        // answer is "no" the rest are moot. A genuine blocker still overrides
        // it, because blockers are modelled as exclusions rather than weights.
        scores: { saas: 20 },
        note: 'You said a product already does this. The remaining questions describe how to run something yourself — they only change the answer if you decide to run it anyway.',
        noteUnlessExcluded: 'saas',
      },
    ],
  },
  {
    key: 'host',
    label: 'Constraints',
    prompt: 'Does the software you intend to keep need something only the host machine can give it?',
    help: 'The one technical question that can settle the answer on its own.',
    options: [
      {
        value: 'kernel',
        label: 'A kernel module, a driver, or an agent that loads into the kernel',
        detail: 'Storage drivers, kernel-level security agents, specialised networking.',
        excludes: [
          { approach: 'paas', reason: 'The managed application platforms considered here do not let you install host kernel modules.' },
          { approach: 'saas', reason: 'A finished product cannot load a module into a kernel you do not control. If a different product would do the job instead, that is question 01.' },
        ],
        scores: { vm: 6, container: -5, orchestrated: -5 },
      },
      {
        value: 'licence',
        label: 'A licence pinned to a stable host identifier',
        detail: 'A host ID or MAC address, common with older commercial software and appliance vendors.',
        excludes: [
          { approach: 'paas', reason: 'Instances are replaced without warning, so a licence pinned to one host cannot hold.' },
          { approach: 'saas', reason: 'You would be replacing the licensed product rather than hosting it, which is question 01.' },
        ],
        scores: { vm: 6, container: -4, orchestrated: -4 },
        note: 'Verify the vendor terms for the exact product, edition and cloud deployment. Per-core licensing can permit shared VMs; dedicated hosts are not a universal requirement. Stable identifiers and VM replacement rules also need checking.',
      },
      {
        value: 'os',
        label: 'A specific guest OS or kernel that managed platforms cannot provide',
        detail: 'An old user-space runtime alone does not imply this: a compatible custom container may work on a managed platform.',
        excludes: [
          { approach: 'paas', reason: 'This requirement needs control of the guest OS or kernel, beyond a custom container image.' },
          { approach: 'saas', reason: 'A hosted product does not run your operating system at all. Replacing the software is question 01.' },
        ],
        scores: { vm: 5, container: 2 },
      },
      {
        value: 'none',
        label: 'None of these — a conventional web app, worker or scheduled job',
        scores: { container: 2, orchestrated: 1, paas: 2 },
      },
    ],
  },
  {
    key: 'state',
    label: 'Storage',
    prompt: 'Where does the application store data between one request and the next?',
    help: 'Data written to a local disk is the most common reason a move turns out harder than planned.',
    options: [
      {
        value: 'external',
        label: 'In a database or file store. The program itself stores nothing',
        scores: { container: 3, orchestrated: 2, paas: 3 },
      },
      {
        value: 'movable',
        label: 'On local disk today, but it could be moved to a database',
        scores: { container: 1, vm: 1 },
      },
      {
        value: 'stuck',
        label: 'Persistent local disk semantics are essential; network storage cannot substitute',
        excludes: [
          { approach: 'paas', reason: 'The managed app services considered here do not guarantee durable local disks with these semantics. If a supported network volume works, revise this answer.' },
        ],
        scores: { vm: 4, orchestrated: -3 },
      },
    ],
  },
  {
    key: 'estate',
    label: 'Scale',
    prompt: 'How many separate services deploy on their own schedule?',
    help: 'Orchestration earns its cost by the number of things it has to place and keep running.',
    options: [
      { value: 'one', label: 'One', scores: { vm: 2, paas: 3, orchestrated: -6 } },
      { value: 'few', label: 'Two to five', scores: { container: 2, paas: 2, orchestrated: -2 } },
      { value: 'many', label: 'Six to twenty', scores: { container: 2, orchestrated: 3 } },
      { value: 'lots', label: 'More than twenty', scores: { container: 2, orchestrated: 6, paas: -2 } },
    ],
  },
  {
    key: 'ops',
    label: 'Operations',
    prompt: 'Who looks after the infrastructure once this is live?',
    help: 'The question most decision documents skip, and most post-mortems reach.',
    options: [
      {
        value: 'nobody',
        label: 'Nobody in particular. Things get fixed during office hours',
        excludes: [
          {
            approach: 'orchestrated',
            reason: 'Kubernetes with nobody owning it is a second product you did not plan to build — one that needs ongoing node, version and add-on maintenance within service support policies.',
          },
        ],
        scores: { paas: 5, saas: 3, vm: -3 },
        note: 'A managed service still needs an owner for access, alerts, application incidents and recovery. Assign that responsibility before going live.',
      },
      {
        value: 'devs',
        label: 'A couple of developers who also build the application',
        scores: { paas: 4, container: 2, orchestrated: -4 },
      },
      {
        value: 'platform',
        label: 'A dedicated team that already runs shared infrastructure',
        scores: { orchestrated: 5, container: 2 },
      },
    ],
  },
  {
    key: 'load',
    label: 'Load',
    prompt: 'What does the traffic actually look like?',
    help: 'Shape matters more than volume here — a busy hour is a different problem from a busy year.',
    options: [
      { value: 'idle', label: 'Idle most of the time — paying for a machine that sits there is the waste', scores: { paas: 5, vm: -4, orchestrated: -2 } },
      { value: 'steady', label: 'Steady and predictable', scores: { vm: 2, container: 2, orchestrated: 1 } },
      { value: 'spiky', label: 'A real baseline with sharp peaks over it — headroom is the problem', scores: { orchestrated: 3, paas: 3, vm: -2 } },
    ],
  },
  {
    key: 'exit',
    label: 'Exit',
    prompt: 'How real is the possibility of moving to another provider?',
    help: 'Be honest here. Most people overstate it, and a few badly understate it.',
    options: [
      {
        value: 'required',
        label: 'Required — a regulator or a contract asks us to show we could leave',
        detail: 'For financial entities in scope, DORA addresses ICT services supporting critical or important functions: Article 28(8) covers exit plans, and Article 30(3)(f) contractual exit arrangements. Check the obligations that actually apply to your workload.',
        scores: { container: 4, orchestrated: 3, paas: -5, saas: -4 },
      },
      {
        value: 'plausible',
        label: 'Possible within three to five years. We would like to keep the option',
        scores: { container: 3, orchestrated: 2, paas: -2 },
      },
      {
        value: 'no',
        label: 'Not realistically. We are committed and would rather move quickly',
        scores: { paas: 4, saas: 3, container: -1 },
      },
    ],
  },
];

export type Selection = Record<string, string | undefined>;

export interface ApproachVerdict {
  key: ApproachKey;
  score: number;
  excluded: boolean;
  reasons: string[];
}

const APPROACH_KEYS: ApproachKey[] = ['vm', 'container', 'orchestrated', 'paas', 'saas'];

export function evaluate(selection: Selection) {
  const score: Record<ApproachKey, number> = { vm: 0, container: 0, orchestrated: 0, paas: 0, saas: 0 };
  const reasons: Record<ApproachKey, string[]> = { vm: [], container: [], orchestrated: [], paas: [], saas: [] };

  const chosen: ChooserOption[] = [];
  for (const question of QUESTIONS) {
    const value = selection[question.key];
    if (!value) continue;
    const option = question.options.find((o) => o.value === value);
    if (option) chosen.push(option);
  }

  for (const option of chosen) {
    for (const approach of APPROACH_KEYS) score[approach] += option.scores?.[approach] ?? 0;
    for (const rule of option.excludes ?? []) reasons[rule.approach].push(rule.reason);
  }

  // Notes are collected only once every exclusion is known, so a note never
  // argues for an approach that has since been ruled out.
  const notes = chosen
    .filter((o) => o.note && (!o.noteUnlessExcluded || reasons[o.noteUnlessExcluded].length === 0))
    .map((o) => o.note!);

  const verdicts: ApproachVerdict[] = APPROACH_KEYS.map((key) => ({
    key,
    score: score[key],
    excluded: reasons[key].length > 0,
    reasons: reasons[key],
  }));

  // Viable options first, then by score. Array order breaks exact ties, but it
  // is the page's narrative order (most you run -> least), which is no kind of
  // recommendation — so a tie at the top is reported as a tie rather than
  // resolved into a winner. See `undecided`.
  const ranked = [...verdicts].sort((a, b) => {
    if (a.excluded !== b.excluded) return a.excluded ? 1 : -1;
    return b.score - a.score;
  });

  const viable = ranked.filter((r) => !r.excluded);
  const tiedTop = viable.length ? viable.filter((r) => r.score === viable[0].score).length : 0;

  return {
    answered: chosen.length,
    total: QUESTIONS.length,
    complete: chosen.length === QUESTIONS.length,
    verdicts,
    ranked,
    notes,
    top: viable[0],
    runnerUp: viable[1],
    /** How many viable options share the top score. */
    tiedTop,
    /** No single option leads, so naming one would be an artefact of array order. */
    undecided: tiedTop > 1,
    /** One clear leader, but only just — say so rather than pretending to be sure. */
    close: tiedTop === 1 && viable.length > 1 && viable[0].score - viable[1].score <= 2,
  };
}

export const LOCK_IN_NOTE: Record<string, string> = {
  required:
    'You said an exit has to be demonstrable. That should drive the decision, not the convenience of any one platform: keep the artifact portable, reach backing services through ordinary protocols, and rehearse the move at least once. An exit plan nobody has tested is a document, not a capability.',
  plausible:
    'You want the option to move without paying for it every day. That is the reasonable middle: take the managed service, but keep the provider-specific pieces in a layer of their own, so a move rewrites that layer instead of the application.',
  no:
    'You have decided not to keep the door open, and that is a legitimate choice — usually the cheaper one. Make it deliberately: write down what you would have to rebuild, price it once, and revisit when the contract or the regulator changes.',
};
