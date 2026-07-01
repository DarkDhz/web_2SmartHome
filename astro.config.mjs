import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.2smarthome.es',
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap({
    // Legal pages are noindexed (noIndex={true} in their frontmatter) and must not
    // be listed in the sitemap. Keep this list in sync with any new noindexed route.
    filter: (page) => !/\/(aviso-legal|cookies|privacidad)\/$/.test(page),
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
