import { APPROACH_BY_KEY } from '../data/platform-approaches';
import { QUESTIONS, evaluate, type Selection } from '../data/platform-chooser';
export function renderPlatformReasoning(root: HTMLElement, selection: Selection, result: ReturnType<typeof evaluate>) {
  const block = root.querySelector<HTMLElement>('[data-chooser-reasoning]');
  if (!block) return;
  block.hidden = !result.answered;
  block.querySelector('[data-eligibility-count]')!.textContent = `${result.viableCount} of 5 approaches remain in the shortlist`;
  for (const verdict of result.verdicts) {
    const item = block.querySelector<HTMLElement>(`[data-eligibility="${verdict.key}"]`)!;
    item.dataset.excluded = String(verdict.excluded);
    item.querySelector('[data-eligibility-state]')!.textContent = verdict.excluded ? 'Ruled out' : 'Still possible';
  }
  const name = result.top ? APPROACH_BY_KEY.get(result.top.key)!.name : '';
  block.querySelector('[data-chooser-driving]')!.textContent = result.undecided
    ? 'Several options are level. Technical constraints remove approaches; preferences rank the ones left.'
    : `${name} leads on your preferences among the approaches still possible. ${result.complete ? 'Confirm the fit with a workload trial.' : 'The remaining answers can change the ranking, but cannot override a technical exclusion.'}`;
  const drivers = result.undecided ? [] : result.drivers.slice(0, 3);
  block.querySelector('[data-chooser-drivers]')!.replaceChildren(...drivers.map(driver => {
    const li = document.createElement('li');
    li.textContent = `${driver.label} — ${driver.weight > 0 ? 'favours' : 'counts against'} ${name}.`;
    return li;
  }));
  block.querySelector<HTMLElement>('[data-licence-check]')!.hidden = selection.host !== 'licence';
  for (const question of QUESTIONS) {
    const note = root.querySelector<HTMLElement>(`[data-q-impact="${question.key}"]`);
    if (!note) continue;
    const option = question.options.find(o => o.value === selection[question.key]);
    note.hidden = !option;
    if (!option) { note.textContent = ''; continue; }
    const ruled = option.excludes?.map(rule => `${APPROACH_BY_KEY.get(rule.approach)!.name}: ${rule.reason}`) ?? [];
    const favoured = result.verdicts.filter(v => !v.excluded && (option.scores?.[v.key] ?? 0) > 0).map(v => APPROACH_BY_KEY.get(v.key)!.name);
    const discouraged = result.verdicts.filter(v => !v.excluded && (option.scores?.[v.key] ?? 0) < 0).map(v => APPROACH_BY_KEY.get(v.key)!.name);
    const effects = [favoured.length ? `Favours ${favoured.join(' / ')}.` : '', discouraged.length ? `Counts against ${discouraged.join(' / ')}.` : ''].filter(Boolean);
    note.textContent = ruled.length ? ruled.join(' ') : effects.length
      ? `${effects.join(' ')} This changes preference, not technical eligibility.`
      : 'This answer does not change the ranking of the remaining approaches. The constraints already exclude the approaches it would affect.';
  }
}
