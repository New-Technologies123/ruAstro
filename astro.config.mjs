import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tech-new.ru',
  integrations: [react(), sitemap()],
  // A build/check must not invalidate optimized modules in the running dev server.
  vite: {
    cacheDir: process.argv.includes('dev') ? 'node_modules/.vite-dev' : 'node_modules/.vite-build',
  },
  devToolbar: {
    enabled: false,
  }
});
