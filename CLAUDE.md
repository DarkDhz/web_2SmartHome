# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at localhost:4321
npm run build      # Build to dist/
npm run preview    # Preview the production build
```

No test runner or linter is configured. TypeScript errors surface via `npm run build`.

## Architecture

**Stack:** Astro 6 (static output) + Tailwind CSS 3 (`tailwind.config.mjs` extends the `sans` font to Inter) + `@astrojs/sitemap`. There is no `@astrojs/tailwind` integration; Tailwind is wired in via `src/styles/global.css` (`@tailwind base/components/utilities`) imported directly by `Layout.astro`. `autoprefixer` (devDependency) is part of the PostCSS pipeline that Tailwind requires.

### i18n — bilingual ES/CA

`astro.config.mjs` declares `i18n: { defaultLocale: 'es', locales: ['es', 'ca'], routing: { prefixDefaultLocale: false } }`.

- **Spanish** pages live at root: `src/pages/*.astro`, `src/pages/domotica/`, `src/pages/blog/`.
- **Catalan** pages mirror the same slug under `src/pages/ca/`: `src/pages/ca/*.astro`, `src/pages/ca/domotica/`, `src/pages/ca/blog/`.
- Every page passes `lang="ca"` (or omits it, defaulting to `'es'`) to `<Layout>` and `<BlogPost>`.
- Legal pages have full Catalan equivalents under `/ca/`: `/ca/privacidad`, `/ca/aviso-legal`, `/ca/cookies`.

### Layouts

**`src/layouts/Layout.astro`** — base layout used by every page:
- Props: `title`, `description?`, `image?`, `canonical?`, `noIndex?`, `schemas?` (JSON-LD array), `lang?: 'es' | 'ca'`.
- Injects `<html lang={lang}>`, Google Fonts (Inter), `src/styles/global.css`, Vercel Analytics/SpeedInsights, and `<CookieBanner>`.
- Computes `esAlternate` / `caAlternate` URLs and emits `<link rel="alternate" hreflang>` tags.
- Emits a `LocalBusiness` JSON-LD schema plus any extra `schemas[]` passed by the page.
- A floating WhatsApp button is rendered, with per-path message text hardcoded in `whatsappMessages`. This map contains **both ES and CA paths** (e.g. `/domotica` and `/ca/domotica`). When adding a new route, add both paths with appropriate language text.
- The `.fade-up` animation class is defined here: an IntersectionObserver in an inline `<script>` adds `.visible` when elements scroll into view (opacity 0→1, translateY 28px→0).

**`src/layouts/BlogPost.astro`** — wraps `<Layout>` for blog articles:
- Props: `title`, `description`, `cat`, `date`, `time`, `img`, `imgAlt?`, `lang?`, `cta?` (object with `eyebrow`, `title`, `text`, `button`, `tipo`, `mensaje`).
- Contains a `ui` object that switches breadcrumb labels, CTA defaults, and "back to blog" text between ES and CA.
- The `cta.tipo` and `cta.mensaje` values are passed as query params to `/contacto` (or `/ca/contacto`) via a pre-filled form URL.

### Components

- **`Header.astro`** — locale-aware. Reads `Astro.url.pathname`; if it starts with `/ca`, sets `isCA=true` and `prefix='/ca'`. All nav links are `${prefix}/path`. Contains a language switcher pill (ES/CA). Mobile hamburger toggle via inline `<script>`.
- **`Footer.astro`** — locale-aware with a bilingual `t` object. Footer links use `${prefix}/...`. Copyright year via `new Date().getFullYear()`.
- **`CookieBanner.astro`** — GDPR cookie consent banner. Accepts `lang?: 'es' | 'ca'` prop (passed from Layout) and renders bilingual text. Shown/hidden via inline script that reads/writes `localStorage` under key `cookie_consent`.

### Routing table

| Spanish | Catalan |
|---|---|
| `/` | `/ca` |
| `/domotica` | `/ca/domotica` |
| `/domotica/hogares` | `/ca/domotica/hogares` |
| `/domotica/empresas` | `/ca/domotica/empresas` |
| `/soluciones` | `/ca/soluciones` |
| `/proyectos` | `/ca/proyectos` |
| `/quienes-somos` | `/ca/quienes-somos` |
| `/recursos` | `/ca/recursos` |
| `/contacto` | `/ca/contacto` |
| `/blog/[slug]` | `/ca/blog/[slug]` |
| `/privacidad` | `/ca/privacidad` |
| `/aviso-legal` | `/ca/aviso-legal` |
| `/cookies` | `/ca/cookies` |

### Blog publishing checklist

Each blog post is a **static `.astro` file** (no dynamic route). Adding a new post requires creating/touching **four files**:

1. `src/pages/blog/[post-slug].astro` — **create** the ES article file; `<BlogPost>` import path is `../../layouts/BlogPost.astro`.
2. `src/pages/ca/blog/[post-slug].astro` — **create** the CA article file with `lang="ca"`; import path is `../../../layouts/BlogPost.astro`.
3. `src/pages/recursos.astro` — prepend an entry to the `articles` array (ES title/desc, `href: '/blog/[post-slug]'`).
4. `src/pages/ca/recursos.astro` — prepend an entry to the `articles` array (CA title/desc, `href: '/ca/blog/[post-slug]'`).

Blog images go in `src/assets/blog_imgs/`. The `img` prop on `<BlogPost>` is a string path like `/blog_imgs/filename.jpg` resolved at runtime by the eager glob in `BlogPost.astro`.

### Design System

Colors (Tailwind slate + sky):
- Background: `slate-950` (darkest), `slate-900` (sections/cards)
- Cards/borders: `slate-800` / `slate-700`
- Accent: `sky-500` (buttons, links), `sky-400` (icons, highlights)
- Text: `white` (headings), `slate-300`/`slate-400` (body)

Reusable patterns:
- **Section intro:** `<p class="text-sky-400 ... uppercase tracking-wider">` eyebrow + `<h2>` + `<p class="text-slate-400">`
- **Cards:** `bg-slate-900 border border-slate-800 rounded-2xl hover:border-sky-500/50 transition-all`
- **Primary button:** `bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/25`
- **Scroll animation:** add class `fade-up` to any element — it animates in when it enters the viewport.

### Images

Images live in `src/assets/img/` (hero, project photos) and `src/assets/blog_imgs/` (blog thumbnails). All pages use Astro's `<Image>` component from `astro:assets` for automatic WebP conversion and lazy loading.

Pages that need images use an eager glob map at the top of the frontmatter:
```typescript
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';
const imgs = import.meta.glob<{ default: ImageMetadata }>('/src/assets/img/**', { eager: true });
const getImg = (src: string) => imgs[src.replace('/img/', '/src/assets/img/')]!.default;
```
Then use `<Image src={getImg('/img/filename.jpg')} alt="..." width={800} />` in templates.

`BlogPost.astro` uses the same pattern with `/src/assets/blog_imgs/**`.

`Layout.astro` uses `getImage()` to compute OG/schema URLs from the optimized images.

### Sitemap

`@astrojs/sitemap` is configured in `astro.config.mjs` with i18n locale mapping (`es → es-ES`, `ca → ca-ES`). This generates `hreflang` alternate entries for every page in both locales automatically. Do not remove the `i18n` block from the sitemap config or CA pages will be excluded.

### Accessibility

- A skip link (`<a href="#main-content">`) is the first element in `<body>` in Layout.astro; the `<main>` tag carries `id="main-content"`.
- The mobile menu button in Header.astro uses `aria-expanded` (toggled by the inline script) and `aria-controls="mobile-menu"`.
- All new pages must pass `lang="ca"` to `<Layout>` — this drives `<html lang>`, hreflang alternates, the CookieBanner language, and the skip link text.

### Contact form

`/contacto` (and `/ca/contacto`) POST to `https://api.web3forms.com/submit` using the access key hardcoded in the form. Pre-filling works via `?tipo=...&mensaje=...` query params read by an inline `<script>`. Blog post CTAs and internal links construct these URLs at build time.

### Client-side JS

Kept minimal and inline via `<script>` tags:
- **Header:** mobile menu toggle
- **Layout:** WhatsApp button, `.fade-up` IntersectionObserver, CookieBanner logic
- **Proyectos:** category filter (show/hide cards by `data-cat`)
- **Recursos:** FAQ accordion + "load more" articles button
- **Contacto:** async form submission with success/error states; reads `tipo`/`mensaje` query params on load

### Deployment

Hosted on **Vercel** (static output). `vercel.json` at the root contains 301 redirects from the old site's URL structure (e.g. `/que-es` → `/quienes-somos`, `/para-ti` → `/domotica/hogares`). When adding a new route that replaces an old one, add the redirect there.

`public/robots.txt` references `https://www.2smarthome.es/sitemap-index.xml` — the sitemap is generated at build time by `@astrojs/sitemap`.

`public/BingSiteAuth.xml` is the Bing Webmaster Tools verification file — do not delete it.
