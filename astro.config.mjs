import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.2smarthome.es',
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'es',
      locales: {
        es: 'es-ES',
        ca: 'ca-ES',
      },
    },
  })],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
