/**
 * Knowledge Map canvas — Cytoscape.js initialisation.
 *
 * Loaded lazily (dynamic import) the first time the user activates the Map view.
 * Entry point: initCanvas()
 *
 * Node rendering uses cytoscape-node-html-label so that each node can display
 * a styled title + difficulty chip (and a "START HERE" badge on the entry node)
 * using real HTML/CSS rather than Cytoscape's flat text labels.
 */

import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import nodeHtmlLabel from 'cytoscape-node-html-label';

// cytoscape's default export is a factory + namespace; .use() is a static method
// that @types/cytoscape does not fully model — cast via unknown.
const cyProto = cytoscape as unknown as { use: (ext: unknown) => void };
cyProto.use(dagre);
cyProto.use(nodeHtmlLabel);

// ── Types ──────────────────────────────────────────────────────────────────

export interface CanvasNode {
  id: string;       // full Astro slug, e.g. "azure/azure-landing-zones"
  label: string;    // article title
  category: string;
  level: string;    // beginner | intermediate | advanced
  excerpt: string;
  url: string;
  tags: string[];
}

export interface CanvasEdge {
  from: string;
  to: string;
  type: 'path' | 'related';
}

// ── Label / colour maps ────────────────────────────────────────────────────

const LEVEL_LABELS: Record<string, string> = {
  beginner:     'Foundations',
  intermediate: 'Practitioner',
  advanced:     'Expert',
};

// Category border colours — subtle, drawn from the same tonal palette as the design tokens.
const CATEGORY_BORDER: Record<string, string> = {
  azure:      '#2a5298',
  oci:        '#b34700',
  multicloud: '#2c694e',
  networking: '#4e2a84',
  identity:   '#6b4d00',
  security:   '#7a2424',
  finops:     '#23522f',
  devops:     '#253268',
  bpm:        '#4a1d7a',
  default:    '#5f5f5f',
};

function borderFor(category: string): string {
  return CATEGORY_BORDER[category] ?? CATEGORY_BORDER.default;
}

// ── Utilities ─────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeUrl(url: string): string {
  return url.startsWith('/') || url.startsWith('https://') ? url : '#';
}

// ── Atom indicator constants ───────────────────────────────────────────────

const ATOM_HALF    = 35; // half of 70 px container
const ATOM_HOLD_MS = 4000;

const ORBITS = [
  { angle:  0, period: 1.8 },
  { angle: 60, period: 2.4 },
  { angle:-60, period: 2.0 },
] as const;

const ORBIT_A = 26; // semi-major axis px
const ORBIT_B = 9;  // semi-minor axis px

// ── Node HTML template ─────────────────────────────────────────────────────

/**
 * Returns the HTML string injected into each node by cytoscape-node-html-label.
 * CSS lives in KnowledgeCanvas.astro (global :global() selectors).
 */
function nodeTemplate(data: Record<string, unknown>, isEntry: boolean): string {
  const level     = escapeHtml(String(data.level ?? ''));
  const label     = escapeHtml(String(data.label ?? ''));
  const chipLabel = (LEVEL_LABELS[level] ?? level).toUpperCase();

  return `
    <div class="kbc-node" data-level="${level}">
      ${isEntry ? '<span class="kbc-node__start">START HERE</span>' : ''}
      <p class="kbc-node__title">${label}</p>
      <span class="kbc-node__chip kbc-node__chip--${level}">${chipLabel}</span>
    </div>
  `;
}

// ── Detail panel ───────────────────────────────────────────────────────────

function renderTags(node: CanvasNode): string {
  const levelLabel = LEVEL_LABELS[node.level] ?? node.level;
  const tagItems = [levelLabel, ...node.tags.slice(0, 3)];
  return tagItems
    .map(t => `<span class="kbc-panel__tag">${escapeHtml(t.toUpperCase())}</span>`)
    .join('');
}

function showPanel(panelEl: HTMLElement, node: CanvasNode): void {
  panelEl.innerHTML = `
    <p class="kbc-panel__header-label">Selected Article</p>
    <button class="kbc-panel__close" aria-label="Close detail panel">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
    <h3 class="kbc-panel__title">${escapeHtml(node.label)}</h3>
    <p class="kbc-panel__excerpt">${escapeHtml(node.excerpt)}</p>
    <div class="kbc-panel__tags">${renderTags(node)}</div>
    <a class="kbc-panel__link" href="${safeUrl(node.url)}">Open article <span aria-hidden="true">→</span></a>
  `;

  panelEl.removeAttribute('hidden');
  panelEl.querySelector('.kbc-panel__close')?.addEventListener('click', () => closePanel(panelEl));
}

function closePanel(panelEl: HTMLElement): void {
  panelEl.setAttribute('hidden', '');
  panelEl.innerHTML = '';
}

// ── Main init ──────────────────────────────────────────────────────────────

export function initCanvas(wrapperId: string, canvasId: string, panelId: string): void {
  const wrapper  = document.getElementById(wrapperId);
  const canvasEl = document.getElementById(canvasId);
  const panelEl  = document.getElementById(panelId);
  if (!wrapper || !canvasEl || !panelEl) return;

  let nodes: CanvasNode[];
  let edgeList: CanvasEdge[];
  try {
    nodes    = JSON.parse(wrapper.dataset.nodes ?? '[]') as CanvasNode[];
    edgeList = JSON.parse(wrapper.dataset.edges ?? '[]') as CanvasEdge[];
  } catch {
    return;
  }

  // Entry nodes: nodes with no incoming path edges (starts of learning tracks)
  const pathTargets = new Set(edgeList.filter(e => e.type === 'path').map(e => e.to));
  const entryIds    = new Set(nodes.filter(n => !pathTargets.has(n.id)).map(n => n.id));

  const cy = cytoscape({
    container: canvasEl,

    elements: {
      nodes: nodes.map(n => ({
        data: {
          id:          n.id,
          label:       n.label,
          category:    n.category,
          level:       n.level,
          excerpt:     n.excerpt,
          url:         n.url,
          tags:        n.tags,
          borderColor: borderFor(n.category),
        },
      })),
      edges: edgeList.map((e, i) => ({
        data: { id: `e${i}`, source: e.from, target: e.to, type: e.type },
      })),
    },

    style: [
      {
        // Suppress Cytoscape's built-in "active background" indicator (the gray ball on click)
        selector: 'core',
        style: {
          'active-bg-opacity': 0,
        } as cytoscape.Css.Core,
      },
      {
        // Node: white card — category shows only through border color
        selector: 'node',
        style: {
          'shape': 'roundrectangle',
          'corner-radius': 4,
          'width': 200,
          'height': 72,
          'background-color': '#ffffff',
          'border-width': 1,
          'border-color': 'data(borderColor)',
          'border-opacity': 0.28,
          'shadow-blur': 8,
          'shadow-color': '#323232',
          'shadow-opacity': 0.06,
          'shadow-offset-x': 0,
          'shadow-offset-y': 2,
          'label': '',
          'cursor': 'pointer',
        } as cytoscape.Css.Node,
      },
      {
        selector: 'node:hover',
        style: {
          'border-opacity': 0.55,
          'border-width': 1.5,
          'shadow-opacity': 0.1,
        } as cytoscape.Css.Node,
      },
      {
        selector: 'node.selected',
        style: {
          'border-opacity': 0.8,
          'border-width': 2,
          'shadow-opacity': 0.13,
        } as cytoscape.Css.Node,
      },
      {
        // Path edges — orthogonal routing with rounded corners
        selector: 'edge[type = "path"]',
        style: {
          'width': 2,
          'line-color': '#2c694e',
          'target-arrow-color': '#2c694e',
          'target-arrow-shape': 'triangle',
          'arrow-scale': 0.9,
          'curve-style': 'round-taxi',
          'taxi-direction': 'downward',
          'opacity': 0.65,
        } as cytoscape.Css.Edge,
      },
      {
        // Related edges — dashed grey, orthogonal with rounded corners
        selector: 'edge[type = "related"]',
        style: {
          'width': 1.5,
          'line-color': '#b3b2b1',
          'line-style': 'dashed',
          'line-dash-pattern': [6, 4],
          'target-arrow-shape': 'none',
          'curve-style': 'round-taxi',
          'taxi-direction': 'auto',
          'opacity': 0.4,
        } as cytoscape.Css.Edge,
      },
    ],

    layout: {
      name: 'dagre',
      // @ts-expect-error — dagre layout options are not in @types/cytoscape
      rankDir: 'TB',
      nodeSep: 60,
      rankSep: 100,
      padding: 56,  // extra top padding for START HERE badge
      animate: false,
    },

    userZoomingEnabled: true,
    userPanningEnabled: true,
    boxSelectionEnabled: false,
    selectionType: 'single',
    wheelSensitivity: 4,
  });

  // Prevent middle-click autoscroll ball
  canvasEl.addEventListener('mousedown', e => {
    if (e.button === 1) e.preventDefault();
  });

  // ── Atom click indicator ────────────────────────────────────────────────

  function cursorPos(e: MouseEvent) {
    const rect = canvasEl.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function spawnAtom(x: number, y: number) {
    const container = document.createElement('div');
    container.className = 'kbc-atom';
    container.style.left = `${x - ATOM_HALF}px`;
    container.style.top  = `${y - ATOM_HALF}px`;
    canvasEl.appendChild(container);

    const nucleus = document.createElement('div');
    nucleus.className = 'kbc-atom__nucleus';
    container.appendChild(nucleus);

    ORBITS.forEach(({ angle }) => {
      const ring = document.createElement('div');
      ring.className = 'kbc-atom__ring';
      ring.style.setProperty('--ring-angle', `${angle}deg`);
      container.appendChild(ring);
    });

    const electrons = ORBITS.map(() => {
      const el = document.createElement('div');
      el.className = 'kbc-atom__electron';
      container.appendChild(el);
      return el;
    });

    const t0 = performance.now();
    let rafId: number;
    let released = false;
    let releaseTime = 0;
    let atomActivated = false;

    const holdTimer = setTimeout(() => {
      atomActivated = true;
      container.classList.add('kbc-atom--active');
    }, ATOM_HOLD_MS);

    function frame(now: number) {
      const elapsed = (now - t0) / 1000;

      // Parametric ellipse: x = cx + A·cos(θ)·cos(φ) − B·sin(θ)·sin(φ)
      //                     y = cy + A·cos(θ)·sin(φ) + B·sin(θ)·cos(φ)
      ORBITS.forEach(({ angle, period }, i) => {
        const θ = (elapsed / period) * Math.PI * 2;
        const φ = (angle * Math.PI) / 180;
        const ex = ATOM_HALF + ORBIT_A * Math.cos(θ) * Math.cos(φ) - ORBIT_B * Math.sin(θ) * Math.sin(φ);
        const ey = ATOM_HALF + ORBIT_A * Math.cos(θ) * Math.sin(φ) + ORBIT_B * Math.sin(θ) * Math.cos(φ);
        electrons[i].style.left = `${ex - 2}px`;
        electrons[i].style.top  = `${ey - 2}px`;
      });

      if (released) {
        const duration = atomActivated ? 380 : 200;
        const p = (now - releaseTime) / duration;
        const opacity = Math.max(0, 1 - p);
        container.style.opacity = String(opacity);
        if (atomActivated) container.style.transform = `scale(${1 + p * 0.12})`;
        if (opacity > 0.01) rafId = requestAnimationFrame(frame);
        else container.remove();
      } else {
        rafId = requestAnimationFrame(frame);
      }
    }
    rafId = requestAnimationFrame(frame);

    return {
      update:  (x: number, y: number) => {
        container.style.left = `${x - ATOM_HALF}px`;
        container.style.top  = `${y - ATOM_HALF}px`;
      },
      release: () => {
        clearTimeout(holdTimer);
        released = true;
        releaseTime = performance.now();
      },
    };
  }

  type AtomHandle = ReturnType<typeof spawnAtom>;
  let atomHandle: AtomHandle | null = null;

  canvasEl.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    atomHandle?.release();
    const { x, y } = cursorPos(e);
    atomHandle = spawnAtom(x, y);
  });

  document.addEventListener('mousemove', e => {
    if (!atomHandle || e.buttons !== 1) return;
    const { x, y } = cursorPos(e);
    atomHandle.update(x, y);
  });

  function releaseAtom() {
    if (!atomHandle) return;
    atomHandle.release();
    atomHandle = null;
  }

  document.addEventListener('mouseup',    releaseAtom);
  document.addEventListener('mouseleave', releaseAtom);

  // ── HTML node labels ────────────────────────────────────────────────────
  (cy as unknown as {
    nodeHtmlLabel: (opts: object[]) => void;
  }).nodeHtmlLabel([{
    query: 'node',
    halign: 'center',
    valign: 'center',
    halignBox: 'center',
    valignBox: 'center',
    tpl: (data: Record<string, unknown>) =>
      nodeTemplate(data, entryIds.has(String(data.id))),
  }]);

  // ── Interactions ────────────────────────────────────────────────────────

  cy.on('tap', 'node', evt => {
    cy.nodes().removeClass('selected');
    evt.target.addClass('selected');

    const data = evt.target.data() as CanvasNode;
    showPanel(panelEl, data);
  });

  cy.on('tap', evt => {
    if (evt.target === cy) {
      cy.nodes().removeClass('selected');
      closePanel(panelEl);
    }
  });

  // ── Controls ────────────────────────────────────────────────────────────

  document.getElementById('kbc-fit')?.addEventListener('click', () => cy.fit(undefined, 40));

  document.getElementById('kbc-zoom-in')?.addEventListener('click', () => {
    cy.zoom({ level: cy.zoom() * 1.3, renderedPosition: { x: canvasEl.offsetWidth / 2, y: canvasEl.offsetHeight / 2 } });
  });

  document.getElementById('kbc-zoom-out')?.addEventListener('click', () => {
    cy.zoom({ level: cy.zoom() / 1.3, renderedPosition: { x: canvasEl.offsetWidth / 2, y: canvasEl.offsetHeight / 2 } });
  });

  // Initial fit after layout settles
  cy.one('layoutstop', () => cy.fit(undefined, 40));
}
