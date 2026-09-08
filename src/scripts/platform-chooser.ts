/*
 * Chooser wiring. Reads the same model the page was built from, so the score a
 * reader sees can never drift from the config in src/data/platform-chooser.ts.
 */

import { evaluate, LOCK_IN_NOTE, type Selection } from '../data/platform-chooser';
import { RUNG_BY_KEY } from '../data/platform-ladder';

export function initializeChooser() {
  document.querySelectorAll<HTMLElement>('.pc:not([data-ready])').forEach((root) => {
    root.dataset.ready = 'true';

    const form = root.querySelector<HTMLFormElement>('[data-chooser-form]');
    const panel = root.querySelector<HTMLElement>('[data-chooser-verdict]');
    const rank = root.querySelector<HTMLElement>('[data-chooser-rank]');
    const empty = root.querySelector<HTMLElement>('[data-chooser-empty]');
    const progress = root.querySelector<HTMLElement>('[data-chooser-progress]');
    if (!form || !panel || !rank || !empty || !progress) return;

    const details = new Map(
      [...root.querySelectorAll<HTMLElement>('[data-detail]')].map((el) => [el.dataset.detail!, el]),
    );
    const rows = new Map(
      [...root.querySelectorAll<HTMLElement>('[data-rank-row]')].map((el) => [el.dataset.rankRow!, el]),
    );

    const closeNote = root.querySelector<HTMLElement>('[data-chooser-close]');
    const runner = root.querySelector<HTMLElement>('[data-chooser-runner]');
    const runnerName = root.querySelector<HTMLElement>('[data-chooser-runner-name]');
    const lock = root.querySelector<HTMLElement>('[data-chooser-lock]');
    const lockBody = root.querySelector<HTMLElement>('[data-chooser-lock-body]');

    const read = (): Selection => {
      const data = new FormData(form);
      const selection: Selection = {};
      for (const [key, value] of data.entries()) selection[key] = String(value);
      return selection;
    };

    const render = () => {
      const selection = read();
      const result = evaluate(selection);

      progress.textContent = String(result.answered);
      const hasAnswer = result.answered > 0 && !!result.top;
      empty.hidden = hasAnswer;
      panel.hidden = !hasAnswer;
      rank.hidden = !hasAnswer;

      if (hasAnswer) {
        details.forEach((el, key) => { el.hidden = key !== result.top!.key; });

        if (closeNote) closeNote.hidden = !result.close;

        const second = result.runnerUp;
        if (runner && runnerName) {
          runner.hidden = !second;
          if (second) {
            const rung = RUNG_BY_KEY.get(second.key)!;
            runnerName.textContent = `${rung.name} — ${rung.oneLine}`;
          }
        }

        const exit = selection.exit;
        if (lock && lockBody) {
          lock.hidden = !exit;
          if (exit) lockBody.textContent = LOCK_IN_NOTE[exit] ?? '';
        }
      }

      // The full ladder stays visible so a reader can see what was set aside
      // and on what grounds, rather than only the winner. Rows are reordered by
      // moving the nodes — CSS `order` would mean writing inline styles.
      const list = rank.querySelector('ul');
      result.ranked.forEach((verdict, index) => {
        const row = rows.get(verdict.key);
        if (!row) return;
        list?.appendChild(row);
        row.dataset.state = verdict.excluded ? 'ruled-out' : index === 0 ? 'top' : 'viable';

        const label = row.querySelector<HTMLElement>('[data-rank-state]');
        if (label) {
          label.textContent = verdict.excluded
            ? 'Ruled out'
            : index === 0
              ? 'Recommended'
              : `Score ${verdict.score > 0 ? '+' : ''}${verdict.score}`;
        }

        const reason = row.querySelector<HTMLElement>('[data-rank-reason]');
        if (reason) {
          reason.hidden = !verdict.excluded;
          reason.textContent = verdict.reasons.join(' ');
        }
      });
    };

    form.addEventListener('change', render);
    root.querySelector('[data-chooser-reset]')?.addEventListener('click', () => {
      form.reset();
      render();
    });

    render();
  });
}
