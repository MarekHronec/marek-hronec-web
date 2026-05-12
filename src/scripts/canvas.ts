/**
 * Knowledge Map canvas — Cytoscape.js initialisation.
 * Loaded lazily on first Map view activation.
 */

import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import nodeHtmlLabel from 'cytoscape-node-html-label';

const cyProto = cytoscape as unknown as { use: (ext: unknown) => void };
cyProto.use(dagre);
cyProto.use(nodeHtmlLabel);

// ── Types ──────────────────────────────────────────────────────────────────

export interface CanvasNode {
  id:        string;
  label:     string;
  category:  string;
  level:     string;
  excerpt:   string;
  url:       string;
  tags:      string[];
  nodeType?: 'article' | 'group';
  branch?:   string;
}

export interface CanvasEdge {
  from: string;
  to:   string;
  type: 'path' | 'related';
}

// ── Branch colours ────────────────────────────────────────────────────────
// Deliberately distinct: teal (site primary) / slate-blue / purple

const BRANCH_COLORS: Record<string, { border: string; groupBorder: string; bg: string; groupBg: string; icon: string }> = {
  'cloud-reality': { border: '#2c694e', groupBorder: '#83AD9D', bg: '#dce8e3', groupBg: '#F9FAFA', icon: '#2c694e' },
  governance:      { border: '#3e6daa', groupBorder: '#9FB8DA', bg: '#d9e5f4', groupBg: '#F7F8FC', icon: '#3e6daa' },
  network:         { border: '#6354a8', groupBorder: '#9996C8', bg: '#e6e3f4', groupBg: '#F7F6F9', icon: '#6354a8' },
};

function branchBorder     (branch: string): string { return BRANCH_COLORS[branch]?.border      ?? '#5f5f5f'; }
function branchGroupBorder(branch: string): string { return BRANCH_COLORS[branch]?.groupBorder ?? '#83AD9D'; }
function branchBg         (branch: string): string { return BRANCH_COLORS[branch]?.bg          ?? '#f0eded'; }
function branchGroupBg    (branch: string): string { return BRANCH_COLORS[branch]?.groupBg     ?? '#F9FAFA'; }
function branchIcon       (branch: string): string { return BRANCH_COLORS[branch]?.icon        ?? '#2c694e'; }

// ── Inline SVG icons (Lucide-compatible, 16×16 on 24×24 viewBox) ──────────

const ICONS: Record<string, string> = {
  book:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  box:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  users:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  globe:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  activity: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  building: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10"/><rect x="9" y="6" width="2" height="2"/><rect x="13" y="6" width="2" height="2"/><rect x="9" y="10" width="2" height="2"/><rect x="13" y="10" width="2" height="2"/></svg>`,
  flag:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
  server:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  type:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
  tag:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  shield:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  file:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  network:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-4h14v4M12 8v4"/></svg>`,
  database: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  share:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  arrowsLR: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
  cloud:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
};

const ARTICLE_ICON: Record<string, string> = {
  'multicloud/how-to-learn-azure-and-oci-without-stale-lists':                           'book',
  'multicloud/iaas-paas-saas-without-marketing-layer':                                   'box',
  'multicloud/shared-responsibility-for-people-who-stopped-believing-marketing':         'users',
  'multicloud/regions-zones-availability-domains-where-your-data-lives':                'globe',
  'multicloud/service-availability-by-region-why-you-cannot-trust-the-map':             'activity',
  'multicloud/tenant-subscription-management-group-compartment':                         'building',
  'multicloud/landing-zones-what-they-solve-and-the-honest-catch':                       'flag',
  'multicloud/sandboxes-environments-you-will-probably-set-up-wrong':                    'server',
  'multicloud/naming-conventions-azure-oci':                                              'type',
  'multicloud/tagging-metadata-earn-their-keep':                                          'tag',
  'security/policy-as-code-and-quotas-where-governance-stops-being-wiki':                'shield',
  'multicloud/documentation-ccoe-why-both-decay-faster-than-you-think':                  'file',
  'networking/address-plans-designing-ip-space-for-three-clouds':                        'network',
  'networking/ipam-ip-address-management-before-you-wish-you-had-done-it':               'database',
  'networking/hub-and-spoke-virtual-wan-and-drg-three-topology-choices':                 'share',
  'networking/hybrid-connectivity-expressroute-fastconnect-vpn-reality':                 'arrowsLR',
};

const GROUP_ICON: Record<string, string> = {
  'cloud-reality': 'cloud',
  governance:      'shield',
  network:         'share',
};

// ── Utilities ─────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function safeUrl(url: string): string {
  return url.startsWith('/') || url.startsWith('https://') ? url : '#';
}

function icon(key: string, color: string, size = 16): string {
  return (ICONS[key] ?? ICONS.book)
    .replaceAll('currentColor', color)
    .replace(`width="16"`, `width="${size}"`)
    .replace(`height="16"`, `height="${size}"`);
}

// ── Atom constants ────────────────────────────────────────────────────────

const ATOM_HALF    = 35;
const ATOM_HOLD_MS = 4000;
const ORBITS = [{ angle: 0, period: 1.8 }, { angle: 60, period: 2.4 }, { angle: -60, period: 2.0 }] as const;
const ORBIT_PHIS = ORBITS.map(o => (o.angle * Math.PI) / 180);
const ORBIT_A = 26;
const ORBIT_B = 9;

const FIT_PADDING   = 56;
const TOOLBAR_NUDGE = 24; // shift graph down so overlaid toolbar doesn't clip the root node

// ── Node HTML templates ───────────────────────────────────────────────────

function dotsHtml(level: string): string {
  const filled = level === 'beginner' ? 1 : level === 'intermediate' ? 2 : 3;
  return `<span class="kbc-node__dots">${[0, 1, 2].map(i =>
    `<span class="kbc-node__dot${i < filled ? ' kbc-node__dot--filled' : ''}"></span>`
  ).join('')}</span>`;
}

function nodeTemplate(data: Record<string, unknown>, isEntry: boolean): string {
  const id       = String(data.id       ?? '');
  const level    = String(data.level    ?? 'beginner');
  const label    = escapeHtml(String(data.label    ?? ''));
  const branch   = String(data.branch   ?? '');
  const nodeType = String(data.nodeType ?? 'article');

  const color = branchIcon(branch);

  if (nodeType === 'group') {
    const gIcon = icon(GROUP_ICON[branch] ?? 'cloud', color, 24);
    return `<div class="kbc-node kbc-node--group" data-branch="${branch}">
      <span class="kbc-node__icon" style="color:${color}">${gIcon}</span>
      <p class="kbc-node__group-label" style="color:${color}">${label}</p>
    </div>`;
  }

  const aIconKey = ARTICLE_ICON[id] ?? 'book';
  const aIcon    = icon(aIconKey, color, 20);
  const iconBg   = BRANCH_COLORS[branch]?.bg ?? '#dce8e3';

  return `<div class="kbc-node${isEntry ? ' kbc-node--entry' : ''}" data-level="${level}" data-branch="${branch}">
    ${isEntry ? '<span class="kbc-node__start">START HERE</span>' : ''}
    <div class="kbc-node__row">
      <span class="kbc-node__icon-wrap" style="background:${iconBg}">${aIcon}</span>
      <p class="kbc-node__title">${label}</p>
    </div>
    ${dotsHtml(level)}
  </div>`;
}

// ── Detail panel ───────────────────────────────────────────────────────────

function renderTags(node: CanvasNode): string {
  return node.tags.slice(0, 3)
    .map(t => `<span class="kbc-panel__tag">${escapeHtml(t)}</span>`)
    .join('');
}

function showPanel(panelEl: HTMLElement, node: CanvasNode): void {
  if (!node.url) return;
  panelEl.innerHTML = `
    <p class="kbc-panel__header-label">Selected Article</p>
    <button class="kbc-panel__close" aria-label="Close">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
    <h3 class="kbc-panel__title">${escapeHtml(node.label)}</h3>
    <p class="kbc-panel__excerpt">${escapeHtml(node.excerpt)}</p>
    <div class="kbc-panel__tags">${renderTags(node)}</div>
    <a class="kbc-panel__link" href="${safeUrl(node.url)}">Open article →</a>
  `;
  panelEl.removeAttribute('hidden');
  panelEl.querySelector('.kbc-panel__close')?.addEventListener('click', () => closePanel(panelEl));
}

function closePanel(panelEl: HTMLElement): void {
  panelEl.setAttribute('hidden', '');
  panelEl.innerHTML = '';
}

// ── Pan clamping ──────────────────────────────────────────────────────────

function setupPanClamp(cy: cytoscape.Core, canvasEl: HTMLElement) {
  const PAD = 120;
  let clamping = false;

  function clamp() {
    if (clamping) return;
    const bb   = cy.elements().boundingBox();
    const zoom = cy.zoom();
    const w    = canvasEl.offsetWidth;
    const h    = canvasEl.offsetHeight;
    const cur  = cy.pan();
    const minX = PAD - bb.x2 * zoom;
    const maxX = (w - PAD) - bb.x1 * zoom;
    const minY = PAD - bb.y2 * zoom;
    const maxY = (h - PAD) - bb.y1 * zoom;
    const cx   = minX > maxX ? cur.x : Math.max(minX, Math.min(maxX, cur.x));
    const cy2  = minY > maxY ? cur.y : Math.max(minY, Math.min(maxY, cur.y));
    if (cx !== cur.x || cy2 !== cur.y) { clamping = true; cy.pan({ x: cx, y: cy2 }); clamping = false; }
  }

  cy.on('pan zoom', clamp);
}

// ── Filter / search state ─────────────────────────────────────────────────

type BranchFilter = 'all' | 'cloud-reality' | 'governance' | 'network';
let activeFilter: BranchFilter = 'all';
let searchQuery = '';

function applyVisibility(cy: cytoscape.Core): void {
  const q = searchQuery.trim().toLowerCase();
  cy.nodes().forEach(node => {
    const branch   = String(node.data('branch')   ?? '');
    const nodeType = String(node.data('nodeType') ?? 'article');
    const label    = String(node.data('label')    ?? '').toLowerCase();
    if (!branch) { node.removeClass('dimmed'); return; }
    let dim = false;
    if (activeFilter !== 'all' && branch !== activeFilter) dim = true;
    if (!dim && q && nodeType === 'article' && !label.includes(q)) dim = true;
    if (dim !== node.hasClass('dimmed')) { if (dim) node.addClass('dimmed'); else node.removeClass('dimmed'); }
  });
  cy.edges().forEach(edge => {
    const d = edge.source().hasClass('dimmed') || edge.target().hasClass('dimmed');
    if (d !== edge.hasClass('dimmed')) { if (d) edge.addClass('dimmed'); else edge.removeClass('dimmed'); }
  });
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
  } catch { return; }

  const pathTargets = new Set(edgeList.filter(e => e.type === 'path').map(e => e.to));
  const entryIds    = new Set(nodes.filter(n => !pathTargets.has(n.id)).map(n => n.id));

  const cy = cytoscape({
    container: canvasEl,
    autoungrabify: true,

    elements: {
      nodes: nodes.map(n => ({
        data: {
          id:          n.id,
          label:       n.label,
          level:       n.level,
          excerpt:     n.excerpt,
          url:         n.url,
          tags:        n.tags,
          nodeType:    n.nodeType  ?? 'article',
          branch:      n.branch    ?? '',
          borderColor: n.nodeType === 'group' ? branchGroupBorder(n.branch ?? '') : branchBorder(n.branch ?? ''),
          bgColor:     n.nodeType === 'group' ? branchGroupBg(n.branch ?? '') : '#ffffff',
        },
      })),
      edges: edgeList.map((e, i) => ({
        data: { id: `e${i}`, source: e.from, target: e.to, type: e.type },
      })),
    },

    style: [
      { selector: 'core', style: { 'active-bg-opacity': 0 } as cytoscape.Css.Core },
      { selector: 'node', style: { 'overlay-opacity': 0 } as cytoscape.Css.Node },
      { selector: 'edge', style: { 'overlay-opacity': 0 } as cytoscape.Css.Edge },
      {
        selector: 'node[nodeType = "article"]',
        style: {
          shape: 'roundrectangle', 'corner-radius': 4,
          width: 340, height: 78,
          'background-color': '#ffffff',
          'border-width': 1, 'border-color': 'data(borderColor)',
          'border-opacity': 0.45, 'border-style': 'dashed',
          'shadow-blur': 8, 'shadow-color': '#323232',
          'shadow-opacity': 0.05, 'shadow-offset-x': 0, 'shadow-offset-y': 2,
          label: '', cursor: 'pointer',
        } as cytoscape.Css.Node,
      },
      {
        selector: 'node[nodeType = "group"]',
        style: {
          shape: 'roundrectangle', 'corner-radius': 4,
          width: 340, height: 50,
          'background-color': 'data(bgColor)',
          'border-width': 1.5, 'border-color': 'data(borderColor)',
          'border-opacity': 0.75, 'border-style': 'solid',
          'shadow-blur': 0, 'shadow-opacity': 0,
          label: '', cursor: 'default',
        } as cytoscape.Css.Node,
      },
      {
        selector: 'node[nodeType = "article"]:hover',
        style: { 'border-opacity': 0.8, 'border-style': 'solid', 'border-width': 1.5, 'shadow-opacity': 0.1 } as cytoscape.Css.Node,
      },
      { selector: 'node.selected',  style: { 'border-opacity': 1, 'border-style': 'solid', 'border-width': 2 } as cytoscape.Css.Node },
      { selector: 'node.dimmed',    style: { opacity: 0.15 } as cytoscape.Css.Node },
      { selector: 'edge.dimmed',    style: { opacity: 0.05 } as cytoscape.Css.Edge },
      {
        selector: 'edge[type = "path"]',
        style: {
          width: 1.5, 'line-color': '#2c694e',
          'target-arrow-color': '#2c694e', 'target-arrow-shape': 'triangle', 'arrow-scale': 0.8,
          'curve-style': 'round-taxi', 'taxi-direction': 'downward', opacity: 0.5,
        } as cytoscape.Css.Edge,
      },
      {
        selector: 'edge[type = "related"]',
        style: {
          width: 1.5, 'line-color': '#b3b2b1', 'line-style': 'dashed',
          'line-dash-pattern': [6, 4], 'target-arrow-shape': 'none',
          'curve-style': 'round-taxi', 'taxi-direction': 'auto', opacity: 0.35,
        } as cytoscape.Css.Edge,
      },
    ],

    layout: {
      name: 'dagre',
      // @ts-expect-error
      rankDir: 'TB', nodeSep: 48, rankSep: 60, padding: 72, animate: false,
    },

    userZoomingEnabled: false,
    userPanningEnabled: true,
    boxSelectionEnabled: false,
    selectionType: 'single',
  });

  canvasEl.addEventListener('mousedown', e => { if (e.button === 1) e.preventDefault(); });

  // Normalized wheel zoom: clamp deltaY so high scroll-sensitivity
  // devices (notebooks, high-dpi mice) can't cause runaway zoom.
  // Any device gets the same max zoom step per event regardless of
  // what deltaY value the OS/driver reports.
  let wheelMousePos = { x: canvasEl.offsetWidth / 2, y: canvasEl.offsetHeight / 2 };
  canvasEl.addEventListener('mousemove', e => {
    const r = canvasEl.getBoundingClientRect();
    wheelMousePos = { x: e.clientX - r.left, y: e.clientY - r.top };
  });
  canvasEl.addEventListener('wheel', e => {
    e.preventDefault();
    const clamped = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 50);
    const factor  = Math.pow(1.04, -clamped / 10);
    const next    = Math.min(Math.max(cy.zoom() * factor, cy.minZoom()), cy.maxZoom());
    cy.zoom({ level: next, renderedPosition: wheelMousePos });
  }, { passive: false });

  // ── Atom click indicator ────────────────────────────────────────────────

  function cursorPos(e: MouseEvent) {
    const r = canvasEl.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
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
    let rafId: number, released = false, releaseTime = 0, atomActivated = false;
    const holdTimer = setTimeout(() => { atomActivated = true; container.classList.add('kbc-atom--active'); }, ATOM_HOLD_MS);
    function frame(now: number) {
      const elapsed = (now - t0) / 1000;
      ORBITS.forEach(({ period }, i) => {
        const θ = (elapsed / period) * Math.PI * 2;
        const φ = ORBIT_PHIS[i];
        electrons[i].style.left = `${ATOM_HALF + ORBIT_A * Math.cos(θ) * Math.cos(φ) - ORBIT_B * Math.sin(θ) * Math.sin(φ) - 2}px`;
        electrons[i].style.top  = `${ATOM_HALF + ORBIT_A * Math.cos(θ) * Math.sin(φ) + ORBIT_B * Math.sin(θ) * Math.cos(φ) - 2}px`;
      });
      if (released) {
        const p = (now - releaseTime) / (atomActivated ? 380 : 200);
        const opacity = Math.max(0, 1 - p);
        container.style.opacity = String(opacity);
        if (atomActivated) container.style.transform = `scale(${1 + p * 0.12})`;
        if (opacity > 0.01) rafId = requestAnimationFrame(frame); else container.remove();
      } else { rafId = requestAnimationFrame(frame); }
    }
    rafId = requestAnimationFrame(frame);
    return {
      update:  (x: number, y: number) => { container.style.left = `${x - ATOM_HALF}px`; container.style.top = `${y - ATOM_HALF}px`; },
      release: () => { clearTimeout(holdTimer); released = true; releaseTime = performance.now(); },
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
  function releaseAtom() { atomHandle?.release(); atomHandle = null; }
  document.addEventListener('mouseup',    releaseAtom);
  document.addEventListener('mouseleave', releaseAtom);

  // ── HTML node labels ────────────────────────────────────────────────────

  (cy as unknown as { nodeHtmlLabel: (opts: object[]) => void }).nodeHtmlLabel([{
    query: 'node', halign: 'center', valign: 'center', halignBox: 'center', valignBox: 'center',
    tpl: (data: Record<string, unknown>) => nodeTemplate(data, entryIds.has(String(data.id))),
  }]);

  // ── Pan from node drag ────────────────────────────────────────────────────

  let nodeDragPan: { panX: number; panY: number; clientX: number; clientY: number } | null = null;
  let nodeDragging = false;

  cy.on('mousedown', 'node', evt => {
    if (evt.originalEvent.button !== 0) return;
    const pan = cy.pan();
    nodeDragPan = { panX: pan.x, panY: pan.y, clientX: evt.originalEvent.clientX, clientY: evt.originalEvent.clientY };
    nodeDragging = false;
  });

  document.addEventListener('mousemove', e => {
    if (!nodeDragPan || e.buttons !== 1) { nodeDragPan = null; nodeDragging = false; return; }
    const dx = e.clientX - nodeDragPan.clientX;
    const dy = e.clientY - nodeDragPan.clientY;
    if (!nodeDragging && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      nodeDragging = true;
      cy.userPanningEnabled(false);
    }
    if (nodeDragging) cy.pan({ x: nodeDragPan.panX + dx, y: nodeDragPan.panY + dy });
  });

  document.addEventListener('mouseup', () => {
    if (nodeDragging) cy.userPanningEnabled(true);
    nodeDragPan = null;
    nodeDragging = false;
  });

  // ── Interactions ────────────────────────────────────────────────────────

  // tap fires on canvas element (before document mouseup), so nodeDragging is
  // still true here when the gesture was a drag — safe to use as a guard.
  cy.on('tap', 'node', evt => {
    if (nodeDragging) return;
    const data = evt.target.data() as CanvasNode;
    if (data.nodeType === 'group') return;
    cy.nodes().removeClass('selected');
    evt.target.addClass('selected');
    showPanel(panelEl, data);
  });

  cy.on('tap', evt => {
    if (evt.target === cy) { cy.nodes().removeClass('selected'); closePanel(panelEl); }
  });

  // ── Zoom percentage ──────────────────────────────────────────────────────

  const zoomPctEl = document.getElementById('kbc-zoom-pct');
  function updateZoomPct() { if (zoomPctEl) zoomPctEl.textContent = `${Math.round(cy.zoom() * 100)}%`; }
  cy.on('zoom', updateZoomPct);

  function fitAndUpdate() {
    cy.fit(undefined, FIT_PADDING);
    const pan = cy.pan();
    cy.pan({ x: pan.x, y: pan.y + TOOLBAR_NUDGE });
    updateZoomPct();
  }

  // ── Zoom buttons ──────────────────────────────────────────────────────────

  document.getElementById('kbc-zoom-in')?.addEventListener('click', () => {
    cy.zoom({ level: cy.zoom() * 1.3, renderedPosition: { x: canvasEl.offsetWidth / 2, y: canvasEl.offsetHeight / 2 } });
  });
  document.getElementById('kbc-zoom-out')?.addEventListener('click', () => {
    cy.zoom({ level: cy.zoom() / 1.3, renderedPosition: { x: canvasEl.offsetWidth / 2, y: canvasEl.offsetHeight / 2 } });
  });


  // ── Toolbar: filter buttons ───────────────────────────────────────────────

  const filterButtons = document.querySelectorAll<HTMLElement>('.kbc-toolbar__filter');

  function setFilter(filter: BranchFilter) {
    activeFilter = filter;
    applyVisibility(cy);
    filterButtons.forEach(btn => {
      btn.classList.toggle('kbc-toolbar__filter--active', btn.dataset.filter === filter);
    });
  }

  document.getElementById('kbc-filter-all')?.addEventListener('click', () => {
    setFilter('all');
  });

  document.querySelectorAll<HTMLElement>('[data-filter]').forEach(btn => {
    const f = btn.dataset.filter as BranchFilter;
    if (f === 'all') return;
    btn.addEventListener('click', () => setFilter(activeFilter === f ? 'all' : f));
  });

  // ── Toolbar: Fit ──────────────────────────────────────────────────────────

  document.getElementById('kbc-fit')?.addEventListener('click', fitAndUpdate);

  // ── Toolbar: Search ───────────────────────────────────────────────────────

  const searchToggleEl = document.getElementById('kbc-search-toggle');
  const searchInputEl  = document.getElementById('kbc-search-input') as HTMLInputElement | null;
  const searchWrapEl   = document.getElementById('kbc-search-wrap');
  const searchClearEl  = document.getElementById('kbc-search-clear');

  function clearSearch() {
    searchQuery = '';
    if (searchInputEl) searchInputEl.value = '';
    searchWrapEl?.classList.remove('kbc-search-wrap--open', 'kbc-search-wrap--has-text');
    applyVisibility(cy);
  }

  searchToggleEl?.addEventListener('click', () => {
    const open = searchWrapEl?.classList.toggle('kbc-search-wrap--open');
    if (open) searchInputEl?.focus(); else clearSearch();
  });

  searchInputEl?.addEventListener('input', () => {
    searchQuery = searchInputEl?.value ?? '';
    searchWrapEl?.classList.toggle('kbc-search-wrap--has-text', searchQuery.length > 0);
    applyVisibility(cy);
  });

  searchInputEl?.addEventListener('keydown', e => { if (e.key === 'Escape') clearSearch(); });

  searchInputEl?.addEventListener('blur', e => {
    if ((e.relatedTarget as HTMLElement | null)?.id === 'kbc-search-clear') return;
    if (!searchQuery) clearSearch();
  });

  searchClearEl?.addEventListener('click', () => {
    searchQuery = '';
    if (searchInputEl) searchInputEl.value = '';
    searchWrapEl?.classList.remove('kbc-search-wrap--has-text');
    applyVisibility(cy);
    searchInputEl?.focus();
  });

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); searchToggleEl?.click(); }
  });

  // ── Pan clamp + initial fit ───────────────────────────────────────────────

  setupPanClamp(cy, canvasEl);

  cy.one('layoutstop', () => {
    // dagre does not guarantee left-to-right order of equal-rank siblings.
    // Read positions, swap branch subtrees into the desired order, then
    // re-apply via a preset layout so the HTML label plugin re-renders.
    const BRANCHES = ['cloud-reality', 'governance', 'network'];
    const gx = BRANCHES.map(b => {
      const el = cy.nodes().filter(n => n.id() === `group:${b}`);
      return el.length ? el.position('x') : 0;
    });
    const targetXs = [...gx].sort((a, b) => a - b);

    const pos: Record<string, cytoscape.Position> = {};
    cy.nodes().forEach(n => { pos[n.id()] = { x: n.position('x'), y: n.position('y') }; });

    BRANCHES.forEach((branch, i) => {
      const dx = targetXs[i] - gx[i];
      if (Math.abs(dx) < 1) return;
      cy.nodes().filter(n => n.data('branch') === branch)
        .forEach(n => { pos[n.id()].x += dx; });
    });

    // @ts-expect-error — preset layout positions option not in base LayoutOptions types
    const corrected = cy.layout({ name: 'preset', positions: (n) => pos[n.id()], animate: false });
    corrected.one('layoutstop', fitAndUpdate);
    corrected.run();
  });
}
