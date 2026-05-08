// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import { remarkCallouts } from './src/plugins/remark-callouts.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.marekhronec.com',
  integrations: [sitemap()],
  output: 'static',
  markdown: {
    remarkPlugins: [remarkDirective, remarkCallouts],
  },
});
