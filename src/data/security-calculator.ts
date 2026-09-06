/*
 * Slovak ISVS classification — configuration and scoring model.
 *
 * Source of truth: MIRRI "Určenie parametrov UxCxIxAx" workbook (v10.0) and the
 * companion "Metodické usmernenie pre klasifikáciu ISVS" (023107/2023/oSBATA-1).
 * The workbook drives everything from three classification sheets and one
 * category sheet; this file is a direct transcription of that logic so the
 * questions, weights and thresholds can be tuned without touching the UI.
 *
 * Model in brief:
 *   1. C (dôvernosť)  0-3 — highest level with any requirement met
 *   2. I (integrita)  1-3 — same shape
 *   3. A (dostupnosť) 1-3 — same shape
 *   4. The CIA triple selects which security category tables apply (I / II / III).
 *      Each table scores its criteria; U is the highest weight among those met,
 *      and the overall U is the maximum across matched tables.
 *   5. The category determines which of the 16 §20(3) control areas are
 *      mandatory rather than recommended.
 */

export type Level = 0 | 1 | 2 | 3;
export type CategoryId = 'I' | 'II' | 'III';

export interface ClassLevel {
  /** Value this level yields for its axis */
  value: Level;
  /** Legal term, kept in Slovak — it is the term of art */
  termSk: string;
  term: string;
  /** Requirements; meeting ANY of them selects this level */
  requirements: string[];
}

export interface Axis {
  key: 'c' | 'i' | 'a';
  letter: 'C' | 'I' | 'A';
  nameSk: string;
  name: string;
  question: string;
  /** Ordered high to low — the first level with a met requirement wins */
  levels: ClassLevel[];
}

/** Criterion inside a category table. `auto` derives the answer from the CIA
 *  triple exactly as the workbook's IF() formulas do; `manual` is asked. */
export interface Criterion {
  ref: string;
  text: string;
  /** U value contributed when this criterion is met */
  weight: number;
  auto?: (cia: Cia) => boolean;
}

export interface Category {
  id: CategoryId;
  nameSk: string;
  name: string;
  summary: string;
  /** CIA triples this category covers, from columns O/P/Q of the workbook */
  combinations: Array<[Level, Level, Level]>;
  criteria: Criterion[];
}

export interface Cia {
  c: Level;
  i: Level;
  a: Level;
}

/* ── 1-3. Classification axes ─────────────────────────────────────────── */

export const AXES: Axis[] = [
  {
    key: 'c',
    letter: 'C',
    nameSk: 'Dôvernosť',
    name: 'Confidentiality',
    question: 'Who may see the data this system holds?',
    levels: [
      {
        value: 3,
        termSk: 'Prísne chránené',
        term: 'Strictly protected',
        requirements: [
          'Used and accessible only by individually selected users of the organisation.',
          'Unauthorised disclosure or destruction would very likely harm the organisation.',
          'Access is governed by need-to-know and least privilege, and restricted to specific, pre-defined, approved individuals.',
          'Third parties may access the data only in exceptional, clearly defined cases approved by the owner or under specific legislation.',
        ],
      },
      {
        value: 2,
        termSk: 'Chránené',
        term: 'Protected',
        requirements: [
          'Used and accessible only by designated groups of authorised persons.',
          'Unauthorised disclosure or destruction may harm the organisation.',
          'Access is governed by need-to-know and least privilege, restricted to pre-defined approved units or clearly delimited groups.',
          'Third parties may access the data only in necessary, clearly defined cases approved by the owner.',
        ],
      },
      {
        value: 1,
        termSk: 'Interné',
        term: 'Internal',
        requirements: [
          'Has informational value for the organisation and is intended for internal use only.',
          'Used and accessible to all users within the organisation regardless of their role.',
          'Disclosure to third parties requires the information owner’s approval.',
          'Requires a baseline level of protection (clear desk, reasonable access control).',
        ],
      },
      {
        value: 0,
        termSk: 'Verejné',
        term: 'Public',
        requirements: [
          'Intended for external communication and third parties — media information, mandatorily published or generally available information.',
          'Obtainable from public sources, prepared for that purpose, or reclassified from another level by the owner.',
        ],
      },
    ],
  },
  {
    key: 'i',
    letter: 'I',
    nameSk: 'Integrita',
    name: 'Integrity',
    question: 'What happens if this data is wrong?',
    levels: [
      {
        value: 3,
        termSk: 'Vysoká',
        term: 'High',
        requirements: [
          'Critical to the operation of the essential service provider.',
          'An error or inaccuracy immediately threatens the essential service and related activities.',
          'An error threatens the reputation of the essential service provider.',
        ],
      },
      {
        value: 2,
        termSk: 'Stredná',
        term: 'Medium',
        requirements: [
          'Important to the operation of the essential service provider.',
          'An error or inaccuracy may affect continuity of the essential service, a strategic area, or market and operational risk.',
        ],
      },
      {
        value: 1,
        termSk: 'Nízka',
        term: 'Low',
        requirements: [
          'An error or inaccuracy would not significantly threaten the essential service.',
        ],
      },
    ],
  },
  {
    key: 'a',
    letter: 'A',
    nameSk: 'Dostupnosť',
    name: 'Availability',
    question: 'What happens if this system is down?',
    levels: [
      {
        value: 3,
        termSk: 'Vysoká',
        term: 'High',
        requirements: [
          'Critical to the operation of the essential service provider.',
          'A failure immediately threatens the essential service and related activities.',
          'A failure threatens the good name of the essential service provider.',
        ],
      },
      {
        value: 2,
        termSk: 'Stredná',
        term: 'Medium',
        requirements: [
          'Important to the operation of the essential service provider.',
          'A failure may affect continuity of the essential service, a strategic area, or market and operational risk.',
        ],
      },
      {
        value: 1,
        termSk: 'Nízka',
        term: 'Low',
        requirements: [
          'An outage would not significantly threaten the service, or alternative procedures exist.',
        ],
      },
    ],
  },
];

/* ── 4. Security categories ───────────────────────────────────────────── */

export const CATEGORIES: Category[] = [
  {
    id: 'I',
    nameSk: 'Kategória I.',
    name: 'Category I',
    summary:
      'Assets whose compromise has no negative impact on the essential service.',
    combinations: [
      [0, 1, 1], [1, 1, 1], [0, 2, 2], [1, 2, 2],
      [0, 1, 2], [1, 1, 2], [0, 2, 1], [1, 2, 1],
    ],
    criteria: [
      { ref: 'a', weight: 1, text: 'Compromise would have no negative impact on the essential service provided.' },
      { ref: 'b', weight: 1, text: 'Classified for confidentiality as public (test, open data).', auto: (x) => x.c === 0 },
      { ref: 'b', weight: 2, text: 'Classified for confidentiality as internal, in justified cases.', auto: (x) => x.c === 1 },
      { ref: 'c', weight: 1, text: 'Classified for availability as low.', auto: (x) => x.a === 1 },
      { ref: 'c', weight: 2, text: 'Classified for availability as medium, in justified cases.', auto: (x) => x.a === 2 },
      { ref: 'd', weight: 1, text: 'Classified for integrity as low.', auto: (x) => x.i === 1 },
      { ref: 'd', weight: 2, text: 'Classified for integrity as medium, in justified cases.', auto: (x) => x.i === 2 },
      { ref: 'e', weight: 1, text: 'No expected need to attribute responsibility for user activity.' },
      { ref: 'f', weight: 1, text: 'No inspection or control activity needs to be performed.' },
    ],
  },
  {
    id: 'II',
    nameSk: 'Kategória II.',
    name: 'Category II',
    summary:
      'Assets whose compromise could cause a first-degree cyber security incident.',
    combinations: [
      [1, 2, 2], [2, 2, 2], [3, 2, 2], [1, 3, 3], [2, 3, 3], [3, 3, 3],
      [1, 2, 3], [2, 2, 3], [3, 2, 3], [1, 3, 2], [2, 3, 2], [3, 3, 2],
    ],
    criteria: [
      { ref: 'a', weight: 2, text: 'Compromise could cause a category I cyber security incident.' },
      { ref: 'b', weight: 2, text: 'Classified for confidentiality as internal or protected.', auto: (x) => x.c > 0 && x.c < 3 },
      { ref: 'b', weight: 3, text: 'Classified for confidentiality as strictly protected, in justified cases.', auto: (x) => x.c === 3 },
      { ref: 'c', weight: 2, text: 'Classified for availability as medium.', auto: (x) => x.a === 2 },
      { ref: 'c', weight: 3, text: 'Classified for availability as high, in justified cases.', auto: (x) => x.a === 3 },
      { ref: 'd', weight: 2, text: 'Classified for integrity as medium.', auto: (x) => x.i === 2 },
      { ref: 'd', weight: 3, text: 'Classified for integrity as high, in justified cases.', auto: (x) => x.i === 3 },
      { ref: 'e', weight: 2, text: 'Responsibility must be attributable for critical activity, especially privileged users.' },
      { ref: 'f', weight: 2, text: 'Inspection and control activity must be performed.' },
      { ref: 'g', weight: 3, text: 'Constitutes a base register and/or reference register.' },
      { ref: 'h', weight: 2, text: 'Creates and maintains agendas not falling into security category I.' },
      { ref: 'i', weight: 2, text: 'Is an agenda information system.' },
      { ref: 'j', weight: 2, text: 'Is a specialised portal.' },
      { ref: 'k', weight: 2, text: 'Is necessary for decision-making by a state authority.' },
    ],
  },
  {
    id: 'III',
    nameSk: 'Kategória III.',
    name: 'Category III',
    summary:
      'Assets whose compromise could cause a second or third-degree cyber security incident.',
    combinations: [[3, 3, 3]],
    criteria: [
      { ref: 'a', weight: 3, text: 'Compromise could cause a category II cyber security incident.' },
      { ref: 'a', weight: 4, text: 'Compromise could cause a category II and/or III cyber security incident.' },
      { ref: 'b', weight: 3, text: 'Classified for confidentiality as strictly protected.', auto: (x) => x.c === 3 },
      { ref: 'c', weight: 3, text: 'Classified for availability as high.', auto: (x) => x.a === 3 },
      { ref: 'd', weight: 3, text: 'Classified for integrity as high.', auto: (x) => x.i === 3 },
      { ref: 'e', weight: 3, text: 'All user activity must be audited.' },
      { ref: 'f', weight: 3, text: 'Delivers an essential service whose outage or damage would disable that service.' },
      { ref: 'g', weight: 4, text: 'Marked as classified information or a secret under specific legislation.' },
      { ref: 'h', weight: 4, text: 'Necessary for tasks concerning the defence and security of the state.' },
      { ref: 'i', weight: 4, text: 'Is the central public administration portal.' },
    ],
  },
];

/* ── 5. Minimum security measures, §20(3) of Act 69/2018 ──────────────── */

export type Obligation = 'mandatory' | 'recommended';

export interface ControlArea {
  ref: string;
  name: string;
  byCategory: Record<CategoryId, Obligation>;
}

const M: Obligation = 'mandatory';
const R: Obligation = 'recommended';

export const CONTROL_AREAS: ControlArea[] = [
  { ref: 'a', name: 'Organisation of cyber and information security',        byCategory: { I: R, II: M, III: M } },
  { ref: 'b', name: 'Cyber and information security risk management',        byCategory: { I: R, II: M, III: M } },
  { ref: 'c', name: 'Personnel security',                                    byCategory: { I: R, II: M, III: M } },
  { ref: 'd', name: 'Access management',                                     byCategory: { I: R, II: M, III: M } },
  { ref: 'e', name: 'Third-party security management',                       byCategory: { I: M, II: M, III: M } },
  { ref: 'f', name: 'Security of systems and network operation',             byCategory: { I: R, II: M, III: M } },
  { ref: 'g', name: 'Vulnerability assessment and security patching',        byCategory: { I: R, II: M, III: M } },
  { ref: 'h', name: 'Protection against malicious code',                     byCategory: { I: R, II: M, III: M } },
  { ref: 'i', name: 'Network and communication security',                    byCategory: { I: R, II: R, III: M } },
  { ref: 'j', name: 'Acquisition, development and maintenance of systems',   byCategory: { I: R, II: R, III: M } },
  { ref: 'k', name: 'Event logging and monitoring',                          byCategory: { I: M, II: M, III: M } },
  { ref: 'l', name: 'Physical and environmental security',                   byCategory: { I: R, II: R, III: M } },
  { ref: 'm', name: 'Cyber security incident response',                      byCategory: { I: M, II: M, III: M } },
  { ref: 'n', name: 'Cryptographic measures',                                byCategory: { I: R, II: R, III: M } },
  { ref: 'o', name: 'Business continuity',                                   byCategory: { I: R, II: R, III: M } },
  { ref: 'p', name: 'Audit, compliance management and control activity',     byCategory: { I: R, II: M, III: M } },
  { ref: '§20(4)a', name: 'Designated cyber security manager',               byCategory: { I: M, II: M, III: M } },
];

/* ── Scoring ──────────────────────────────────────────────────────────── */

/** Categories whose supported CIA combinations include this triple. */
export function matchCategories(cia: Cia): Category[] {
  return CATEGORIES.filter((cat) =>
    cat.combinations.some(([c, i, a]) => c === cia.c && i === cia.i && a === cia.a),
  );
}

/** Criteria a user must answer for a category — the ones with no auto rule. */
export function manualCriteria(cat: Category): Criterion[] {
  return cat.criteria.filter((cr) => !cr.auto);
}

/**
 * U for one category: the highest weight among met criteria, mirroring the
 * workbook's MAX(K..) guarded by SUM(K..) <> 0. Returns null when nothing is
 * met, which the workbook shows as "N/A".
 */
export function categoryLevel(cat: Category, cia: Cia, answers: Record<string, boolean>): number | null {
  let max = 0;
  cat.criteria.forEach((cr, idx) => {
    const met = cr.auto ? cr.auto(cia) : answers[`${cat.id}-${idx}`] === true;
    if (met && cr.weight > max) max = cr.weight;
  });
  return max === 0 ? null : max;
}

export interface Outcome {
  cia: Cia;
  categories: Category[];
  /** Highest U across matched categories, or null if none could be determined */
  u: number | null;
  /** The category that produced the governing U */
  governing: Category | null;
  controls: Array<{ area: ControlArea; obligation: Obligation }>;
}

export function evaluate(cia: Cia, answers: Record<string, boolean>): Outcome {
  const categories = matchCategories(cia);
  let u: number | null = null;
  let governing: Category | null = null;

  for (const cat of categories) {
    const level = categoryLevel(cat, cia, answers);
    if (level !== null && (u === null || level > u)) {
      u = level;
      governing = cat;
    }
  }

  const controls = governing
    ? CONTROL_AREAS.map((area) => ({ area, obligation: area.byCategory[governing!.id] }))
    : [];

  return { cia, categories, u, governing, controls };
}

/** Combinations the methodology recognises at all — used to explain a no-match. */
export const ALL_COMBINATIONS = CATEGORIES.flatMap((c) =>
  c.combinations.map(([a, b, d]) => `${a}${b}${d}`),
);
