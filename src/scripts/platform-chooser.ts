/*
 * Chooser wiring. Reads the same model the page was built from, so the answer a
 * reader sees can never drift from the config in src/data/platform-chooser.ts.
 */

import { evaluate, QUESTIONS, LOCK_IN_NOTE, type Selection } from '../data/platform-chooser';
import { APPROACH_BY_KEY } from '../data/platform-approaches';

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
    const selectionLabels = new Map(
      [...root.querySelectorAll<HTMLElement>('[data-q-selection]')].map((el) => [el.dataset.qSelection!, el]),
    );

    const partial = root.querySelector<HTMLElement>('[data-chooser-partial]');
    const closeNote = root.querySelector<HTMLElement>('[data-chooser-close]');
    const notes = root.querySelector<HTMLElement>('[data-chooser-notes]');
    const notesBody = root.querySelector<HTMLElement>('[data-chooser-notes-body]');
    const runner = root.querySelector<HTMLElement>('[data-chooser-runner]');
    const runnerName = root.querySelector<HTMLElement>('[data-chooser-runner-name]');
    const lock = root.querySelector<HTMLElement>('[data-chooser-lock]');
    const lockBody = root.querySelector<HTMLElement>('[data-chooser-lock-body]');

    const read = (): Selection => {
      const selection: Selection = {};
      for (const [key, value] of new FormData(form).entries()) selection[key] = String(value);
      return selection;
    };

    /** Echo each answer back under its question, the way the ISVS calculator does. */
    const renderSelectionLabels = (selection: Selection) => {
      for (const question of QUESTIONS) {
        const label = selectionLabels.get(question.key);
        if (!label) continue;
        const chosen = question.options.find((o) => o.value === selection[question.key]);
        label.textContent = chosen ? chosen.label : 'No answer selected';
        label.dataset.selected = String(Boolean(chosen));
      }
    };

    const render = () => {
      const selection = read();
      const result = evaluate(selection);

      renderSelectionLabels(selection);
      progress.textContent = String(result.answered);

      const hasAnswer = result.answered > 0 && !!result.top;
      empty.hidden = hasAnswer;
      panel.hidden = !hasAnswer;
      rank.hidden = !hasAnswer;

      if (hasAnswer) {
        details.forEach((el, key) => { el.hidden = key !== result.top!.key; });

        if (partial) partial.hidden = result.complete;
        if (closeNote) closeNote.hidden = !result.close;

        if (notes && notesBody) {
          notes.hidden = result.notes.length === 0;
          notesBody.textContent = result.notes.join(' ');
        }

        const second = result.runnerUp;
        if (runner && runnerName) {
          runner.hidden = !second;
          if (second) {
            const approach = APPROACH_BY_KEY.get(second.key)!;
            runnerName.textContent = `${approach.name} — ${approach.oneLine}`;
          }
        }

        const exit = selection.exit;
        if (lock && lockBody) {
          lock.hidden = !exit;
          if (exit) lockBody.textContent = LOCK_IN_NOTE[exit] ?? '';
        }
      }

      // The whole list stays visible so a reader can see what was set aside and
      // on what grounds, rather than only the winner. Rows are reordered by
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
              ? 'Best fit'
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
