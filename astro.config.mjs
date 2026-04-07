// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://marekhronec.github.io',
  base: '/marek-hronec-web',
  integrations: [sitemap()],
  output: 'static',
});