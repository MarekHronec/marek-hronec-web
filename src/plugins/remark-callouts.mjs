import { visit } from 'unist-util-visit';

const TIP_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm.75 10.5h-1.5V7h1.5v5zm0-6.5h-1.5V4h1.5v1.5z" fill="currentColor"/></svg>`;
const WARNING_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L1 14h14L8 1zm0 2.5l5.5 9.5H2.5L8 3.5zM7.25 7v3h1.5V7h-1.5zm0 4v1.5h1.5V11h-1.5z" fill="currentColor"/></svg>`;

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function nodeToHtml(node) {
  if (node.type === 'text') return escapeHtml(node.value);
  if (node.type === 'inlineCode') return `<code>${escapeHtml(node.value)}</code>`;
  if (node.type === 'emphasis') return `<em>${node.children.map(nodeToHtml).join('')}</em>`;
  if (node.type === 'strong') return `<strong>${node.children.map(nodeToHtml).join('')}</strong>`;
  if (node.type === 'link') return `<a href="${node.url}">${node.children.map(nodeToHtml).join('')}</a>`;
  if (node.children) return node.children.map(nodeToHtml).join('');
  return '';
}

export function remarkCallouts() {
  return function (tree) {
    visit(tree, 'containerDirective', function (node, index, parent) {
      if (node.name !== 'tip' && node.name !== 'warning') return;

      const type = node.name;

      // Label comes from [label] syntax — stored as first child with data.directiveLabel
      const labelNode = node.children.find(
        (c) => c.data && c.data.directiveLabel
      );
      const label =
        (labelNode ? labelNode.children.map((n) => n.value || '').join('') : '') ||
        (type === 'tip' ? 'Architectural Pro Tip' : 'Reality Check');

      // Content is every paragraph child that is NOT the label node
      const contentNodes = node.children.filter(
        (c) => !(c.data && c.data.directiveLabel) && c.type === 'paragraph'
      );
      const contentHtml = contentNodes
        .map((n) => `<p>${n.children.map(nodeToHtml).join('')}</p>`)
        .join('\n    ');

      const icon = type === 'tip' ? TIP_ICON : WARNING_ICON;

      const html = [
        `<div class="callout-${type}">`,
        `  <div class="callout-${type}__icon" aria-hidden="true">`,
        `    ${icon}`,
        `  </div>`,
        `  <div class="callout-${type}__content">`,
        `    <p class="callout-${type}__label">${label}</p>`,
        `    ${contentHtml}`,
        `  </div>`,
        `</div>`,
      ].join('\n');

      parent.children.splice(index, 1, { type: 'html', value: html });
    });
  };
}
