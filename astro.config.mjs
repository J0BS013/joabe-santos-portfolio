// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://j0bs013.github.io',
  base: '/joabe-santos-portfolio',
  trailingSlash: 'always',
  integrations: [sitemap()],
  i18n: {
    locales: ['en', 'pt-br', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});