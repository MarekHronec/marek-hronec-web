/*
 * Slovak ISVS classification — model and configuration.
 *
 * SOURCES (all publicly published by the Slovak Republic):
 *  - MIRRI SR, "Určenie parametrov UxCxIxAx", príloha č. 1, workbook v10.0
 *    → sheets "1. Dôvernosť", "2. Integrita", "3. Dostupnosť",
 *      "4. Kategorie systemov", "Opatrenia K1-K2-K3", "Bezp. Incidenty"
 *  - MIRRI SR, "Metodické usmernenie pre klasifikáciu ISVS", ref. 023107/2023/oSBATA-1
 *  - Zákon č. 69/2018 Z. z. o kybernetickej bezpečnosti, §20 ods. 3 a ods. 4
 *  - Vyhláška č. 165/2018 Z. z. — identifikačné kritériá pre kategórie
 *    závažných kybernetických bezpečnostných incidentov
 *
 * Every question, threshold and weight below is traceable to one of those and
 * carries a `source` note. Tune here; the UI reads this file and holds no
 * model logic of its own.
 */

export type Level = 0 | 1 | 2 | 3;
export type CategoryId = 'I' | 'II' | 'III';
export type Degree = 0 | 1 | 2 | 3;

export interface SourceRef {
  short: string;
  detail: string;
}

export const SOURCES = {
  workbook: {
    short: 'Workbook',
    detail: 'MIRRI SR — "Určenie parametrov UxCxIxAx", príloha č. 1, v10.0',
  },
  guidance: {
    short: 'Guidance',
    detail: 'MIRRI SR — "Metodické usmernenie pre klasifikáciu ISVS", ref. 023107/2023/oSBATA-1',
  },
  act: {
    short: 'Act 69/2018',
    detail: 'Zákon č. 69/2018 Z. z. o kybernetickej bezpečnosti, §20',
  },
  decree: {
    short: 'Decree 165/2018',
    detail: 'Vyhláška č. 165/2018 Z. z. — identifikačné kritériá závažných kybernetických bezpečnostných incidentov',
  },
} satisfies Record<string, SourceRef>;

/* ── Axes: C, I, A ────────────────────────────────────────────────────── */

export interface ClassLevel {
  value: Level;
  termSk: string;
  term: string;
  /** One line, plain language — what this level actually means */
  plain: string;
  /** The official wording, shown on demand rather than by default */
  formal: string[];
}

export interface Axis {
  key: 'c' | 'i' | 'a';
  letter: 'C' | 'I' | 'A';
  nameSk: string;
  name: string;
  question: string;
  /** What this axis is asking about, in one sentence */
  help: string;
  source: SourceRef;
  levels: ClassLevel[];
}

export const AXES: Axis[] = [
  {
    key: 'c',
    letter: 'C',
    nameSk: 'Dôvernosť',
    name: 'Confidentiality',
    question: 'How damaging would it be if this data leaked?',
    help: 'Pick the description that best matches who is allowed to see the data. If two look close, take the higher one.',
    source: SOURCES.workbook,
    levels: [
      {
        value: 3,
        termSk: 'Prísne chránené',
        term: 'Strictly protected',
        plain: 'Named individuals only. A leak would very likely damage the organisation.',
        formal: [
          'Used and accessible only by individually selected users of the organisation.',
          'Unauthorised disclosure, revelation or destruction would with high probability negatively affect the organisation.',
          'Access is governed by need-to-know and least privilege, and restricted to specific, pre-defined and approved individuals.',
          'Third parties may access the data only in exceptional, clearly defined cases approved by the owner or under specific legislation.',
        ],
      },
      {
        value: 2,
        termSk: 'Chránené',
        term: 'Protected',
        plain: 'Specific approved teams only. A leak would damage the organisation.',
        formal: [
          'Used and accessible only by designated groups of authorised persons.',
          'Unauthorised disclosure, revelation or destruction may negatively affect the organisation.',
          'Access is governed by need-to-know and least privilege, restricted to pre-defined and approved units or clearly delimited groups.',
          'Third parties may access the data only in necessary, clearly defined cases approved by the owner.',
        ],
      },
      {
        value: 1,
        termSk: 'Interné',
        term: 'Internal',
        plain: 'Anyone inside the organisation. Not for publication, but not sensitive either.',
        formal: [
          'Has informational value and significance for the organisation and is intended for its internal use only.',
          'Used and accessible to all users within the organisation regardless of their working role.',
          'Disclosure to third parties requires approval from the information owner.',
          'Requires a baseline level of protection (clear desk, reasonable need-to-access).',
        ],
      },
      {
        value: 0,
        termSk: 'Verejné',
        term: 'Public',
        plain: 'Already public, or intended to be. Open data, published registers, press material.',
        formal: [
          'Intended for external communication and third parties — for example media information, mandatorily published information or generally available information.',
          'Obtainable from public sources, or prepared for that purpose, or reclassified from another level by the owner.',
        ],
      },
    ],
  },
  {
    key: 'i',
    letter: 'I',
    nameSk: 'Integrita',
    name: 'Integrity',
    question: 'How damaging would it be if this data were wrong?',
    help: 'Think about silent corruption rather than an outage: the system runs, but the numbers are incorrect.',
    source: SOURCES.workbook,
    levels: [
      {
        value: 3,
        termSk: 'Vysoká',
        term: 'High',
        plain: 'Wrong data immediately breaks the essential service or damages its reputation.',
        formal: [
          'Information assets critical to the activity of the essential service provider.',
          'Assets whose error or inaccuracy immediately threatens the essential service provided and the activities connected with it.',
          'Assets that threaten the reputation of the essential service provider.',
        ],
      },
      {
        value: 2,
        termSk: 'Stredná',
        term: 'Medium',
        plain: 'Wrong data disrupts continuity or creates market and operational risk.',
        formal: [
          'Information assets important to the activity of the essential service provider.',
          'Assets whose error or inaccuracy may impact the continuity of the essential service, a strategic area, or market and operational risks.',
        ],
      },
      {
        value: 1,
        termSk: 'Nízka',
        term: 'Low',
        plain: 'Wrong data is a nuisance. The essential service keeps running.',
        formal: [
          'Information assets whose error or inaccuracy would not significantly threaten the essential service provided.',
        ],
      },
    ],
  },
  {
    key: 'a',
    letter: 'A',
    nameSk: 'Dostupnosť',
    name: 'Availability',
    question: 'How damaging would it be if this system went down?',
    help: 'Consider whether there is a fallback. If people can still get the service another way, availability is lower.',
    source: SOURCES.workbook,
    levels: [
      {
        value: 3,
        termSk: 'Vysoká',
        term: 'High',
        plain: 'An outage immediately stops the essential service. No fallback.',
        formal: [
          'Information assets critical to the activity of the essential service provider.',
          'Assets whose failure immediately threatens the essential service provided and the activities connected with it.',
          'Assets whose failure threatens the good name of the essential service provider.',
        ],
      },
      {
        value: 2,
        termSk: 'Stredná',
        term: 'Medium',
        plain: 'An outage disrupts continuity or creates market and operational risk.',
        formal: [
          'Information assets important to the activity of the essential service provider.',
          'Assets whose failure may impact the continuity of the essential service, a strategic area, or market and operational risks.',
        ],
      },
      {
        value: 1,
        termSk: 'Nízka',
        term: 'Low',
        plain: 'An outage is tolerable, or an alternative procedure exists.',
        formal: [
          'Information assets whose outage would not significantly threaten the service provided, or for which alternative procedures exist.',
        ],
      },
    ],
  },
];

/* ── Incident severity, Decree 165/2018 ───────────────────────────────────
   The workbook asks "could this cause a category I / II / III incident?",
   which assumes the reader knows the decree. These questions ask the
   underlying facts instead and derive the degree, exactly as the decree does:
   a service meets a degree if it meets AT LEAST ONE criterion for it. */

export interface IncidentOption {
  label: string;
  detail?: string;
  degree: Degree;
}

export interface IncidentQuestion {
  id: string;
  question: string;
  help: string;
  options: IncidentOption[];
}

export const INCIDENT_QUESTIONS: IncidentQuestion[] = [
  {
    id: 'people',
    question: 'If this system were breached or disrupted, how many people would be affected?',
    help: '§24(2)(a) counts persons whose data or dependent services are affected — both contracted users and observed users of the service.',
    options: [
      { label: 'Fewer than 25 000', degree: 0 },
      { label: '25 000 to 50 000', degree: 1 },
      { label: '50 000 to 100 000', degree: 2 },
      { label: 'More than 100 000', degree: 3 },
    ],
  },
  {
    id: 'reach',
    question: 'How far would an outage spread, and for how long?',
    help: 'Measured in user-hours: affected users multiplied by hours. §24(2)(b) and (c) pair duration with geographic spread.',
    options: [
      { label: 'Localised and short', detail: 'Under 15 000 user-hours', degree: 0 },
      { label: 'District scale', detail: 'Over 15 000 user-hours, at least one okres', degree: 1 },
      { label: 'Region scale', detail: 'Over 100 000 user-hours, at least one kraj', degree: 2 },
      { label: 'National scale', detail: 'Over 500 000 user-hours, the whole of Slovakia', degree: 3 },
    ],
  },
  {
    id: 'substitute',
    question: 'If the service went fully down, could people get it another way?',
    help: '§24(2)(d) — the degree of disruption to the essential service, and whether a substitute route exists.',
    options: [
      { label: 'It would not go fully down', degree: 0 },
      { label: 'Fully down, but a substitute exists', detail: 'Paper process, another channel, another provider', degree: 2 },
      { label: 'Fully down, with no substitute', degree: 3 },
    ],
  },
  {
    id: 'harm',
    question: 'What is the worst credible economic or physical harm?',
    help: '§24(2)(e) — economic loss to a single user, casualties, or disruption to public order.',
    options: [
      { label: 'Below €250 000, no injuries', degree: 0 },
      { label: 'Over €250 000, or injuries, or public disorder in a district', degree: 1 },
      { label: 'Over €500 000, or fatalities, or public disorder in a region', degree: 2 },
      { label: 'Over €1 000 000, or mass casualties, or national public disorder', degree: 3 },
    ],
  },
];

/** Decree 165/2018: meeting any one criterion establishes that degree. */
export function incidentDegree(answers: Record<string, Degree | undefined>): Degree {
  let max: Degree = 0;
  for (const q of INCIDENT_QUESTIONS) {
    const d = answers[q.id];
    if (d !== undefined && d > max) max = d;
  }
  return max;
}

export const DEGREE_LABEL: Record<Degree, string> = {
  0: 'Below the reporting threshold',
  1: 'Category I — significant incident',
  2: 'Category II — serious incident',
  3: 'Category III — most serious incident',
};

/* ── Security categories ──────────────────────────────────────────────── */

export interface Criterion {
  ref: string;
  text: string;
  /** Plain-language prompt when the user has to answer it */
  plain?: string;
  weight: number;
  /** Derived from CIA and/or incident degree, as the workbook's IF() formulas do */
  auto?: (ctx: Ctx) => boolean;
}

export interface Category {
  id: CategoryId;
  nameSk: string;
  name: string;
  summary: string;
  combinations: Array<[Level, Level, Level]>;
  criteria: Criterion[];
}

export interface Cia { c: Level; i: Level; a: Level }
export interface Ctx extends Cia { degree: Degree }

export const CATEGORIES: Category[] = [
  {
    id: 'I',
    nameSk: 'Kategória I.',
    name: 'Category I',
    summary: 'Compromise has no negative impact on the essential service.',
    combinations: [
      [0, 1, 1], [1, 1, 1], [0, 2, 2], [1, 2, 2],
      [0, 1, 2], [1, 1, 2], [0, 2, 1], [1, 2, 1],
    ],
    criteria: [
      { ref: 'a', weight: 1, text: 'Compromise would have no negative impact on the essential service.', plain: 'If this system were compromised, the essential service would carry on unaffected.' },
      { ref: 'b', weight: 1, text: 'Confidentiality is public (test or open data).', auto: (x) => x.c === 0 },
      { ref: 'b', weight: 2, text: 'Confidentiality is internal, in justified cases.', auto: (x) => x.c === 1 },
      { ref: 'c', weight: 1, text: 'Availability is low.', auto: (x) => x.a === 1 },
      { ref: 'c', weight: 2, text: 'Availability is medium, in justified cases.', auto: (x) => x.a === 2 },
      { ref: 'd', weight: 1, text: 'Integrity is low.', auto: (x) => x.i === 1 },
      { ref: 'd', weight: 2, text: 'Integrity is medium, in justified cases.', auto: (x) => x.i === 2 },
      { ref: 'e', weight: 1, text: 'No need to attribute responsibility for user activity.', plain: 'You do not need to prove who did what in this system.' },
      { ref: 'f', weight: 1, text: 'No inspection or control activity is required.', plain: 'Nobody audits or inspects this system as a matter of obligation.' },
    ],
  },
  {
    id: 'II',
    nameSk: 'Kategória II.',
    name: 'Category II',
    summary: 'Compromise could cause a category I cyber security incident.',
    combinations: [
      [1, 2, 2], [2, 2, 2], [3, 2, 2], [1, 3, 3], [2, 3, 3], [3, 3, 3],
      [1, 2, 3], [2, 2, 3], [3, 2, 3], [1, 3, 2], [2, 3, 2], [3, 3, 2],
    ],
    criteria: [
      { ref: 'a', weight: 2, text: 'Compromise could cause a category I incident.', auto: (x) => x.degree >= 1 },
      { ref: 'b', weight: 2, text: 'Confidentiality is internal or protected.', auto: (x) => x.c > 0 && x.c < 3 },
      { ref: 'b', weight: 3, text: 'Confidentiality is strictly protected, in justified cases.', auto: (x) => x.c === 3 },
      { ref: 'c', weight: 2, text: 'Availability is medium.', auto: (x) => x.a === 2 },
      { ref: 'c', weight: 3, text: 'Availability is high, in justified cases.', auto: (x) => x.a === 3 },
      { ref: 'd', weight: 2, text: 'Integrity is medium.', auto: (x) => x.i === 2 },
      { ref: 'd', weight: 3, text: 'Integrity is high, in justified cases.', auto: (x) => x.i === 3 },
      { ref: 'e', weight: 2, text: 'Responsibility must be attributable for critical activity.', plain: 'You must be able to prove who did what, especially for administrators.' },
      { ref: 'f', weight: 2, text: 'Inspection and control activity must be performed.', plain: 'This system is subject to formal inspection or control.' },
      { ref: 'g', weight: 3, text: 'Constitutes a base or reference register.', plain: 'It is a base register or reference register (základný or referenčný register).' },
      { ref: 'h', weight: 2, text: 'Creates and maintains agendas outside security category I.', plain: 'It runs government agendas that are not trivial.' },
      { ref: 'i', weight: 2, text: 'Is an agenda information system.', plain: 'It is an agendový informačný systém.' },
      { ref: 'j', weight: 2, text: 'Is a specialised portal.', plain: 'It is a specialised public-administration portal.' },
      { ref: 'k', weight: 2, text: 'Is necessary for decisions by a state authority.', plain: 'A state authority cannot make its decisions without it.' },
    ],
  },
  {
    id: 'III',
    nameSk: 'Kategória III.',
    name: 'Category III',
    summary: 'Compromise could cause a category II or III cyber security incident.',
    combinations: [[3, 3, 3]],
    criteria: [
      { ref: 'a', weight: 3, text: 'Compromise could cause a category II incident.', auto: (x) => x.degree === 2 },
      { ref: 'a', weight: 4, text: 'Compromise could cause a category III incident.', auto: (x) => x.degree === 3 },
      { ref: 'b', weight: 3, text: 'Confidentiality is strictly protected.', auto: (x) => x.c === 3 },
      { ref: 'c', weight: 3, text: 'Availability is high.', auto: (x) => x.a === 3 },
      { ref: 'd', weight: 3, text: 'Integrity is high.', auto: (x) => x.i === 3 },
      { ref: 'e', weight: 3, text: 'All user activity must be audited.', plain: 'Every user action has to be auditable, not just privileged ones.' },
      { ref: 'f', weight: 3, text: 'Delivers an essential service whose outage would disable it.', plain: 'This system is how the essential service is delivered.' },
      { ref: 'g', weight: 4, text: 'Holds classified information or a legal secret.', plain: 'It holds utajované skutočnosti, or a secret protected by specific law (banking, medical, tax, notarial).' },
      { ref: 'h', weight: 4, text: 'Necessary for the defence and security of the state.', plain: 'It serves national defence or state security tasks.' },
      { ref: 'i', weight: 4, text: 'Is the central public administration portal.', plain: 'It is ústredný portál verejnej správy (slovensko.sk).' },
    ],
  },
];

/* ── Minimum security measures, Act 69/2018 §20(2) and §20(4)(a) ──────── */

export type Obligation = 'mandatory' | 'recommended';

export interface ControlArea {
  ref: string;
  name: string;
  byCategory: Record<CategoryId, Obligation>;
}

const M: Obligation = 'mandatory';
const R: Obligation = 'recommended';

/*
 * The obligation split per category comes from the Opatrenia sheet of the
 * national workbook and was checked against it. The *citations* were not:
 * these carried "§20(3)(a)" … "§20(3)(p)", and § 20 ods. 3 of Act 69/2018 has
 * no lettered points at all — it is a single prose paragraph. The security
 * measure areas live in **§ 20 ods. 2**, which since the 2024–25 amendments
 * runs a) to r), eighteen of them.
 *
 * The refs now say §20(2), which is true, rather than a letter that is not.
 * They deliberately do not claim a per-letter mapping: these sixteen area
 * names track the older vyhláška's structure, not ods. 2's lettering, and
 * inventing a correspondence would be a worse error than a general citation.
 *
 * OPEN: two ods. 2 areas have no counterpart here, and both matter to a cloud
 * audience — q) dodávateľský reťazec (supply chain) and r) obstarávanie a
 * využívanie certifikovaných produktov IKT, služieb IKT a procesov IKT.
 * Adding them needs their mandatory/recommended split per category, which is
 * not derivable from the statute; it needs the vyhláška annex or the workbook.
 * Note also that when vyhláška 184/2026 takes effect on 1 January 2027, the
 * category criteria below lose the legal base they inherited from 179/2020.
 */
export const CONTROL_AREAS: ControlArea[] = [
  { ref: '§20(2)', name: 'Organisation of cyber and information security',      byCategory: { I: R, II: M, III: M } },
  { ref: '§20(2)', name: 'Cyber and information security risk management',      byCategory: { I: R, II: M, III: M } },
  { ref: '§20(2)', name: 'Personnel security',                                  byCategory: { I: R, II: M, III: M } },
  { ref: '§20(2)', name: 'Access management',                                   byCategory: { I: R, II: M, III: M } },
  { ref: '§20(2)', name: 'Third-party security management',                     byCategory: { I: M, II: M, III: M } },
  { ref: '§20(2)', name: 'Security of systems and network operation',           byCategory: { I: R, II: M, III: M } },
  { ref: '§20(2)', name: 'Vulnerability assessment and security patching',      byCategory: { I: R, II: M, III: M } },
  { ref: '§20(2)', name: 'Protection against malicious code',                   byCategory: { I: R, II: M, III: M } },
  { ref: '§20(2)', name: 'Network and communication security',                  byCategory: { I: R, II: R, III: M } },
  { ref: '§20(2)', name: 'Acquisition, development and maintenance of systems', byCategory: { I: R, II: R, III: M } },
  { ref: '§20(2)', name: 'Event logging and monitoring',                        byCategory: { I: M, II: M, III: M } },
  { ref: '§20(2)', name: 'Physical and environmental security',                 byCategory: { I: R, II: R, III: M } },
  { ref: '§20(2)', name: 'Cyber security incident response',                    byCategory: { I: M, II: M, III: M } },
  { ref: '§20(2)', name: 'Cryptographic measures',                              byCategory: { I: R, II: R, III: M } },
  { ref: '§20(2)', name: 'Business continuity',                                 byCategory: { I: R, II: R, III: M } },
  { ref: '§20(2)', name: 'Audit, compliance management and control activity',   byCategory: { I: R, II: M, III: M } },
  { ref: '§20(4)(a)', name: 'Designated cyber security manager',                   byCategory: { I: M, II: M, III: M } },
];

/* ── Combination viability ────────────────────────────────────────────── */

/** Every CIA triple the methodology recognises, across all three categories. */
export const SUPPORTED: Array<[Level, Level, Level]> = Array.from(
  new Set(CATEGORIES.flatMap((c) => c.combinations.map((t) => t.join(',')))),
).map((s) => s.split(',').map(Number) as [Level, Level, Level]);

export type AxisKey = 'c' | 'i' | 'a';
export type Selection = Partial<Record<AxisKey, Level>>;

const AXIS_ORDER: AxisKey[] = ['c', 'i', 'a'];

function tripleValue(t: [Level, Level, Level], k: AxisKey): Level {
  return t[AXIS_ORDER.indexOf(k)];
}

/**
 * Is `value` still reachable for `axis` given the other axes already chosen?
 * Choosing C3 removes I1 and A1, because no supported triple pairs them.
 */
export function isViable(axis: AxisKey, value: Level, sel: Selection): boolean {
  return SUPPORTED.some((t) => {
    if (tripleValue(t, axis) !== value) return false;
    return AXIS_ORDER.every((k) => k === axis || sel[k] === undefined || tripleValue(t, k) === sel[k]);
  });
}

/**
 * Which already-chosen axes rule `value` out, and what the user can do.
 * Two selections can block jointly — C3 and I3 each independently exclude A1 —
 * so when no single axis explains it, name them all rather than falling back
 * to a message that tells the reader nothing actionable.
 */
export function lockReason(axis: AxisKey, value: Level, sel: Selection): string | null {
  if (isViable(axis, value, sel)) return null;

  const letter = (k: AxisKey) => AXES.find((a) => a.key === k)!.letter;
  const self = AXES.find((a) => a.key === axis)!.letter;
  const others = AXIS_ORDER.filter((k) => k !== axis && sel[k] !== undefined);

  // Unreachable regardless of the other axes — the value itself is unsupported.
  if (others.length === 0 || !isViable(axis, value, {})) {
    return `${self}${value} is not part of any combination the methodology recognises.`;
  }

  // Prefer a single culprit; otherwise the selections block jointly.
  const single = others.filter((k) => {
    const relaxed: Selection = { ...sel };
    delete relaxed[k];
    return isViable(axis, value, relaxed);
  });
  const blockers = single.length > 0 ? single : others;
  const named = blockers.map((k) => `${letter(k)}${sel[k]}`).join(' and ');
  const verb = blockers.length > 1 ? 'combine with' : 'pair with';
  return `Not available alongside ${named}. No recognised combination lets ${named} ${verb} ${self}${value} — change ${named} to unlock it.`;
}

/* ── Scoring ──────────────────────────────────────────────────────────── */

export function matchCategories(cia: Cia): Category[] {
  return CATEGORIES.filter((cat) =>
    cat.combinations.some(([c, i, a]) => c === cia.c && i === cia.i && a === cia.a),
  );
}

export function categoryLevel(cat: Category, ctx: Ctx, answers: Record<string, boolean>): number | null {
  let max = 0;
  cat.criteria.forEach((cr, idx) => {
    const met = cr.auto ? cr.auto(ctx) : answers[`${cat.id}-${idx}`] === true;
    if (met && cr.weight > max) max = cr.weight;
  });
  return max === 0 ? null : max;
}

export interface Outcome {
  ctx: Ctx;
  categories: Category[];
  u: number | null;
  governing: Category | null;
  controls: Array<{ area: ControlArea; obligation: Obligation }>;
}

export function evaluate(ctx: Ctx, answers: Record<string, boolean>): Outcome {
  const categories = matchCategories(ctx);
  let u: number | null = null;
  let governing: Category | null = null;

  for (const cat of categories) {
    const level = categoryLevel(cat, ctx, answers);
    if (level !== null && (u === null || level > u)) {
      u = level;
      governing = cat;
    }
  }

  const controls = governing
    ? CONTROL_AREAS.map((area) => ({ area, obligation: area.byCategory[governing!.id] }))
    : [];

  return { ctx, categories, u, governing, controls };
}
