interface Plan { priorities: {title: string; detail: string}[]; gaps: string[] }
/** Explain each answer using the same model that produces the final brief. */
export function renderAnswerImpacts(
  root: HTMLElement,
  questions: readonly {key: string}[],
  selection: Record<string, string | undefined>,
  plan: (selection: Record<string, string | undefined>) => Plan,
) {
  const result = plan(selection);
  for (const question of questions) {
    const note = root.querySelector<HTMLElement>(`[data-q-impact="${question.key}"]`);
    if (!note) continue;
    const value = selection[question.key];
    const without = plan({...selection, [question.key]: undefined});
    const common = new Set(without.priorities.map(item => item.title));
    const specific = result.priorities.find(item => !common.has(item.title));
    const gap = result.gaps.find(message => !without.gaps.includes(message));
    const message = gap ?? (specific ? `${specific.title}. ${specific.detail}` : 'This answer combines with the other requirements in your live brief.');
    note.hidden = !value;
    note.textContent = value ? message : '';
  }
}
