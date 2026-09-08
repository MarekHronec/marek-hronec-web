/** Accessible, local-only controls. Classification inputs are deliberately separate. */
export function initializeExplainers() {
  document.querySelectorAll<HTMLElement>('.ex:not([data-ready])').forEach((root) => {
    root.dataset.ready = 'true';
    const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-tab]')];
    const panels = [...root.querySelectorAll<HTMLElement>('[data-panel]')];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let userPaused = false;
    let visible = true;
    const animations = (panel: HTMLElement) =>
      (panel.querySelector('svg')?.getAnimations({ subtree: true }) ?? [])
        .filter((animation): animation is CSSAnimation => animation instanceof CSSAnimation);
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
      panels.forEach((panel) => animations(panel).forEach((animation) => {
        if (reduced.matches) animation.finish();
        else if (paused || panel.hidden) animation.pause();
        else if (animation.playState === 'paused') animation.play();
      }));
      root.querySelectorAll<HTMLButtonElement>('[data-pause]').forEach((button) => {
        button.textContent = userPaused ? 'Resume motion' : 'Pause motion';
        button.setAttribute('aria-pressed', String(userPaused));
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
    root.querySelector<HTMLElement>('.ex__tabs')!.hidden = false;
    root.querySelectorAll<HTMLElement>('.ex__interaction, .ex__playback').forEach((el) => { el.hidden = false; });
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
      panel.querySelector<HTMLButtonElement>('[data-demonstrate]')!.addEventListener('click', (event) => {
        const button = event.currentTarget as HTMLButtonElement;
        const demonstrate = panel.dataset.demonstrate !== 'true';
        panel.dataset.demonstrate = String(demonstrate);
        button.setAttribute('aria-pressed', String(demonstrate));
        button.textContent = (demonstrate ? button.dataset.reset : button.dataset.action) + ' →';
        const status = panel.querySelector<HTMLElement>('.ex__status')!;
        status.textContent = (demonstrate ? status.dataset.after : status.dataset.before) ?? '';
        restart(panel);
        userPaused = false;
        setPlayback();
      });
      panel.querySelector('[data-pause]')!.addEventListener('click', () => {
        userPaused = !userPaused;
        setPlayback();
      });
      panel.querySelector('[data-replay]')!.addEventListener('click', () => {
        userPaused = false;
        setPlayback();
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
