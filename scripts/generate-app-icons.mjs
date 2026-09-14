/*
 * Generates the PWA icons referenced by public/site.webmanifest.
 *
 * Source of truth is public/favicon.svg — the navy plate carrying the master
 * artwork in white. That file dilates the trace by 24 units because it is read
 * at 16-32px in a browser tab; per the rule in Logo.astro the dilation solves
 * to zero above roughly 93px, so these larger renders drop the stroke and use
 * the geometry as traced.
 *
 * The maskable variant insets the artwork to ~62% of the canvas so it survives
 * the circular crop Android applies (safe zone is the central 80% diameter).
 *
 * Run with: node scripts/generate-app-icons.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PLATE = '#14315c';                       // --color-navy

const favicon = readFileSync(join(root, 'public/favicon.svg'), 'utf8');
const group = favicon.match(/<g[\s\S]*<\/g>/)?.[0];
if (!group) throw new Error('Could not find the artwork group in public/favicon.svg');

/** The traced geometry, no dilation — correct above ~93px. */
const undilated = group.replace(/stroke-width="\d+"/, 'stroke-width="0"');

const plated = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="${PLATE}"></rect>
  ${undilated}
</svg>`;

const bare = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  ${undilated}
</svg>`;

const out = (name) => join(root, 'public', name);

const jobs = [
  sharp(Buffer.from(plated)).resize(192, 192).png().toFile(out('icon-192.png')),
  sharp(Buffer.from(plated)).resize(512, 512).png().toFile(out('icon-512.png')),
  // maskable: artwork at 62% of the canvas, centred on the plate
  sharp({
    create: { width: 512, height: 512, channels: 4, background: PLATE },
  })
    .composite([{ input: await sharp(Buffer.from(bare)).resize(318, 318).png().toBuffer() }])
    .png()
    .toFile(out('icon-maskable-512.png')),
];

await Promise.all(jobs);
console.log('Wrote icon-192.png, icon-512.png, icon-maskable-512.png to public/');
