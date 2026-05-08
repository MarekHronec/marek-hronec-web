#!/usr/bin/env node
/**
 * One-shot migration script.
 * For each KB article:
 *  1. Extract references from <div class="references"> and move to frontmatter YAML
 *  2. Replace callout HTML divs with :::tip / :::warning directive syntax
 *  3. Remove the ## Further Reading heading + references HTML from the body
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const KB_DIR = join(__dirname, '../src/content/knowledge-base');

// Walk directory recursively, return all .md file paths
function walkDir(dir) {
  const results = [];
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    if (statSync(fullPath).isDirectory()) {
      results.push(...walkDir(fullPath));
    } else if (name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

// Convert inline HTML tags in callout paragraph text to markdown equivalents
function htmlToMarkdown(html) {
  return html
    .replace(/<strong>([\s\S]*?)<\/strong>/g, '**$1**')
    .replace(/<em>([\s\S]*?)<\/em>/g, '*$1*')
    .replace(/<code>([\s\S]*?)<\/code>/g, '`$1`')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

// Serialize a value as a double-quoted YAML string
function yamlStr(s) {
  const escaped = String(s)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
  return `"${escaped}"`;
}

// Extract references from the <div class="references"> HTML block
function extractReferences(refsHtml) {
  const refs = [];
  const re = /<a class="ref-item" href="([^"]+)"[^>]*>[\s\S]*?<span class="ref-item__title">([^<]+)<\/span>[\s\S]*?<span class="ref-item__desc">([^<]+)<\/span>[\s\S]*?<span class="ref-item__domain">([^<]+)<\/span>[\s\S]*?<\/a>/g;
  let m;
  while ((m = re.exec(refsHtml)) !== null) {
    refs.push({
      url: m[1].trim(),
      title: m[2].trim(),
      description: m[3].trim(),
      domain: m[4].trim(),
    });
  }
  return refs;
}

// Replace a callout HTML block with directive syntax
function calloutToDirective(match, type) {
  const labelClass = `callout-${type}__label`;
  const labelRe = new RegExp(`<p class="${labelClass}">([\s\\S]*?)<\\/p>`);
  const labelMatch = match.match(labelRe);
  const label = labelMatch ? labelMatch[1] : (type === 'tip' ? 'Architectural Pro Tip' : 'Reality Check');

  const contentRe = new RegExp(`<p class="${labelClass}">[\\s\\S]*?<\\/p>\\s*<p>([\\s\\S]*?)<\\/p>`);
  const contentMatch = match.match(contentRe);
  const content = contentMatch ? htmlToMarkdown(contentMatch[1]) : '';

  return `:::${type}[${label}]\n${content}\n:::`;
}

function processFile(filePath) {
  const raw = readFileSync(filePath, 'utf8');

  // Normalise to LF so all regex patterns use \n
  const content = raw.replace(/\r\n/g, '\n');

  // Split frontmatter and body
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) {
    console.warn(`  SKIP (no frontmatter): ${filePath}`);
    return false;
  }
  const [, frontmatterStr, bodyRaw] = fmMatch;
  let body = bodyRaw;

  // ── 1. Extract references before modifying body ───────────────
  let references = [];
  const refsDivMatch = body.match(/<div class="references">([\s\S]*?)<\/div>/);
  if (refsDivMatch) {
    references = extractReferences(refsDivMatch[1]);
  }

  // ── 2. Replace callout-tip HTML with directive ────────────────
  body = body.replace(
    /<div class="callout-tip">([\s\S]*?)<\/div>\s*<\/div>/g,
    (match) => calloutToDirective(match, 'tip')
  );

  // ── 3. Replace callout-warning HTML with directive ────────────
  body = body.replace(
    /<div class="callout-warning">([\s\S]*?)<\/div>\s*<\/div>/g,
    (match) => calloutToDirective(match, 'warning')
  );

  // ── 4. Remove ## Further Reading section from body ────────────
  body = body.replace(
    /\n\n## Further Reading\n\n<div class="references">[\s\S]*?<\/div>/,
    ''
  );

  // ── 5. Append references array to frontmatter ─────────────────
  let newFrontmatter = frontmatterStr;
  if (references.length > 0) {
    const refYaml = references
      .map(
        (r) =>
          `  - title: ${yamlStr(r.title)}\n    url: ${yamlStr(r.url)}\n    description: ${yamlStr(r.description)}\n    domain: ${yamlStr(r.domain)}`
      )
      .join('\n');
    newFrontmatter += `\nreferences:\n${refYaml}`;
  }

  // ── 6. Write updated file ─────────────────────────────────────
  const newContent = `---\n${newFrontmatter}\n---\n${body}`;
  writeFileSync(filePath, newContent, 'utf8');
  return true;
}

const files = walkDir(KB_DIR);
console.log(`Found ${files.length} KB articles to migrate...\n`);
let ok = 0;
let fail = 0;
for (const file of files) {
  const rel = file.replace(KB_DIR, '').replace(/^[\\/]/, '');
  try {
    const changed = processFile(file);
    if (changed) {
      console.log(`  ✓  ${rel}`);
      ok++;
    }
  } catch (err) {
    console.error(`  ✗  ${rel}: ${err.message}`);
    fail++;
  }
}
console.log(`\nDone: ${ok} migrated, ${fail} errors.`);
