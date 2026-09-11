/*
 * Generic tabbed-explainer controller.
 *
 * Driven entirely by data attributes rather than class names, so any component
 * can opt in by marking a root [data-explainer] with [data-tab]/[data-panel]
 * children. Progressive enhancement: without this script the panels render
 * stacked and static, which is a legible fallback rather than a broken one.
 *
 * Motion is held through the Web Animations API rather than by toggling
 * classes, so pausing does not restart a loop mid-cycle.
 */

const isCssAnimation = (a: Animation): a is CSSAnimation => a instanceof CSSAnimation;

export function initializeExplainers(rootSelector = '[data-explainer]') {
  document.querySelectorAll<HTMLElement>(`${rootSelector}:not([data-ready])`).forEach((root) => {
    root.dataset.ready = 'true';

    const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-tab]')];
    const panels = [...root.querySelectorAll<HTMLElement>('[data-panel]')];
    if (!tabs.length || tabs.length !== panels.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let userPaused = false;
    let visible = true;

    const animations = (panel: HTMLElement) =>
      (panel.querySelector('svg')?.getAnimations({ subtree: true }) ?? []).filter(isCssAnimation);

    const restart = (panel: HTMLElement) => {
      animations(panel).forEach((animation) => {
        animation.currentTime = 0;
        if (reduced.matches) animation.finish();
        else animation.play();
      });
    };

    const setPlayback = () => {
      const paused = userPaused || !visible || document.hidden;
      root.dataset.paused = String(!reduced.matches && paused);
      panels.forEach((panel) =>
        animations(panel).forEach((animation) => {
          if (reduced.matches) animation.finish();
          else if (paused || panel.hidden) animation.pause();
          else if (animation.playState === 'paused') animation.play();
        }),
      );
      root.querySelectorAll<HTMLButtonElement>('[data-pause]').forEach((button) => {
        button.textContent = userPaused ? 'Resume motion' : 'Pause motion';
        button.setAttribute('aria-pressed', String(userPaused));
        const panel = button.closest<HTMLElement>('[data-panel]');
        button.disabled = !panel || animations(panel).length === 0;
      });
    };

    const activate = (index: number, focus = false) => {
      tabs.forEach((tab, current) => {
        tab.setAttribute('aria-selected', String(current === index));
        tab.tabIndex = current === index ? 0 : -1;
        panels[current].hidden = current !== index;
      });
      if (focus) tabs[index].focus();
      setPlayback();
    };

    // Controls that only make sense once scripting is available.
    root.querySelectorAll<HTMLElement>('[data-needs-js]').forEach((el) => {
      el.hidden = false;
    });

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(index));
      tab.addEventListener('keydown', (event) => {
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        activate(next, true);
      });
    });

    panels.forEach((panel) => {
      panel.querySelector<HTMLButtonElement>('[data-demonstrate]')?.addEventListener('click', (event) => {
        const button = event.currentTarget as HTMLButtonElement;
        const demonstrate = panel.dataset.demonstrate !== 'true';
        panel.dataset.demonstrate = String(demonstrate);
        button.setAttribute('aria-pressed', String(demonstrate));
        button.textContent = (demonstrate ? button.dataset.reset : button.dataset.action) ?? '';
        const status = panel.querySelector<HTMLElement>('[data-status]');
        if (status) status.textContent = (demonstrate ? status.dataset.after : status.dataset.before) ?? '';
        userPaused = false;
        restart(panel);
        setPlayback();
      });

      panel.querySelector('[data-pause]')?.addEventListener('click', () => {
        userPaused = !userPaused;
        setPlayback();
      });

      panel.querySelector('[data-replay]')?.addEventListener('click', () => {
        // Finite scenes create a timeline when their demonstration is enabled.
        if (animations(panel).length === 0 && panel.dataset.demonstrate !== 'true') {
          panel.querySelector<HTMLButtonElement>('button[data-demonstrate]')?.click();
          return;
        }
        userPaused = false;
        restart(panel);
        setPlayback();
      });
    });

    const observer = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      setPlayback();
    }, { threshold: 0 });
    observer.observe(root);

    document.addEventListener('visibilitychange', setPlayback);
    reduced.addEventListener('change', setPlayback);
    document.addEventListener('astro:before-swap', () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', setPlayback);
      reduced.removeEventListener('change', setPlayback);
    }, { once: true });

    activate(0);
  });
}
