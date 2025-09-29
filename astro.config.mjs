import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import astroI18next from 'astro-i18next';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tech-new.ru',
  integrations: [react(), astroI18next(), sitemap()],
  devToolbar: {
    enabled: false,
  }
});