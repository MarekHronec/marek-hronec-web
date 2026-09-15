/** Native disclosures stay usable without JS; links also reveal nested targets. */
export function initializeGuideChapters() {
  const chapters = [...document.querySelectorAll<HTMLDetailsElement>('[data-guide-chapter]:not([data-chapter-ready])')];
  if (!chapters.length) return;
  const reveal = (hash: string, focus = false) => {
    let id: string;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    let parent: HTMLElement | null = target;
    while (parent) {
      if (parent instanceof HTMLDetailsElement) parent.open = true;
      parent = parent.parentElement;
    }
    requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start' });
      if (focus) {
        const destination = target.matches('[data-guide-chapter]') ? target.querySelector('summary') : target;
        if (destination instanceof HTMLElement) {
          if (!destination.matches('summary, a, button, input')) destination.tabIndex = -1;
          destination.focus({ preventScroll: true });
        }
      }
    });
  };
  chapters.forEach(chapter => {
    chapter.dataset.chapterReady = 'true';
    const close = chapter.querySelector<HTMLButtonElement>('[data-close-chapter]');
    if (close) close.hidden = false;
    chapter.querySelector<HTMLButtonElement>('[data-close-chapter]')?.addEventListener('click', () => {
      chapter.open = false;
      chapter.querySelector('summary')?.focus();
      chapter.scrollIntoView({ block: 'start' });
    });
  });
  // Install once per document. Astro navigation receives a fresh chapter list.
  if (!document.documentElement.dataset.chapterLinks) {
    document.documentElement.dataset.chapterLinks = 'true';
    document.addEventListener('click', event => {
      if (!(event instanceof MouseEvent) || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!link || link.target || link.hasAttribute('download')) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      let id: string;
      try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target?.closest('[data-guide-chapter]')) return;
      event.preventDefault();
      history.pushState(null, '', url.hash);
      reveal(url.hash, true);
    });
    window.addEventListener('hashchange', () => reveal(location.hash));
  }
  if (location.hash) reveal(location.hash);
}
