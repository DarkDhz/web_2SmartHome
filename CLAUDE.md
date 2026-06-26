# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at localhost:4321
npm run build      # Build to dist/
npm run preview    # Preview the production build
npm run notify     # Notify IndexNow (run manually after production deploy)
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
- Computes `esAlternate` / `caAlternate` URLs and emits `<link rel="alternate" hreflang="es-ES">` / `hreflang="ca-ES"` / `hreflang="x-default"` tags (full locale codes, matching the sitemap i18n config).
- Emits a `LocalBusiness` JSON-LD schema plus any extra `schemas[]` passed by the page. All main pages (domotica, soluciones, proyectos, quienes-somos and their `/ca/` equivalents) pass a `BreadcrumbList` schema via this prop. New main pages should do the same.
- A floating WhatsApp button is rendered, with per-path message text hardcoded in `whatsappMessages`. This map contains **both ES and CA paths** (e.g. `/domotica` and `/ca/domotica`). When adding a new route, add both paths with appropriate language text.
- The `.fade-up` animation class is defined here: an IntersectionObserver in an inline `<script>` adds `.visible` when elements scroll into view (opacity 0→1, translateY 28px→0).

**`src/layouts/BlogPost.astro`** — wraps `<Layout>` for blog articles:
- Props: `title`, `description`, `cat`, `date`, `time`, `img`, `imgAlt?`, `lang?`, `cta?` (object with `eyebrow`, `title`, `text`, `button`, `tipo`, `mensaje`).
- Contains a `ui` object that switches breadcrumb labels, CTA defaults, and "back to blog" text between ES and CA. The `BreadcrumbList` JSON-LD schema uses `ui.home` / `ui.resources` and locale-correct URLs — keep this in sync when editing.
- The featured article image uses `loading="eager"` (it is the LCP element for blog posts).
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

**Internal linking (required for SEO):** Every blog post body must include **2–4 contextual `<a>` links** woven into existing prose with descriptive anchor text (never "click here"). Mix related blog posts (build topic clusters) with a relevant money page (`/domotica/hogares`, `/domotica/empresas`, `/soluciones#<section-id>`, `/proyectos`). CA posts must use `/ca/...` paths. The `#<section-id>` fragments on `/soluciones` come from the `id` field of the `solutions` data array (`iluminacion`, `clima`, `seguridad`, `persianas`, `energia`, `acceso`, `audio`, `jardin`) — match an existing id. In-body links are styled by the `.article-body a` rule in `BlogPost.astro`; the bottom CTA link is intentionally `rel="nofollow"` and is not part of this count.

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

Images live in `src/assets/img/` (hero, project photos) and `src/assets/blog_imgs/` (blog thumbnails). All pages use Astro's `<Image>` component from `astro:assets` for automatic WebP conversion.

Pages that need images use an eager glob map at the top of the frontmatter:
```typescript
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';
const imgs = import.meta.glob<{ default: ImageMetadata }>('/src/assets/img/**', { eager: true });
const getImg = (src: string) => imgs[src.replace('/img/', '/src/assets/img/')]!.default;
```
Then use `<Image src={getImg('/img/filename.jpg')} alt="..." width={800} />` in templates.

**Loading strategy:** Hero images (first visible on load) must always have `loading="eager"`. All images below the fold must have `loading="lazy"`. Both attributes are always explicit — never rely on browser defaults.

`BlogPost.astro` uses the same pattern with `/src/assets/blog_imgs/**`.

`Layout.astro` uses `getImage()` to compute OG/schema URLs from the optimized images.

### Sitemap

`@astrojs/sitemap` is configured in `astro.config.mjs` with i18n locale mapping (`es → es-ES`, `ca → ca-ES`). This generates `hreflang` alternate entries for every page in both locales automatically. Do not remove the `i18n` block from the sitemap config or CA pages will be excluded.

### Accessibility

- A skip link (`<a href="#main-content">`) is the first element in `<body>` in Layout.astro; the `<main>` tag carries `id="main-content"`.
- The mobile menu button in Header.astro uses `aria-expanded` (toggled by the inline script) and `aria-controls="mobile-menu"`.
- All new pages must pass `lang="ca"` to `<Layout>` — this drives `<html lang>`, hreflang alternates, the CookieBanner language, and the skip link text.
- Repeated links with the same visible text (e.g. "Leer artículo" across a list of cards) must include `aria-label` with the item title so screen readers can distinguish them.
- Decorative SVGs inside `<a>` tags that already carry `aria-label` must have `aria-hidden="true"` on the SVG itself (see social icons in `Footer.astro`).

### Contact form

`/contacto` (and `/ca/contacto`) POST to `https://api.web3forms.com/submit` using the access key hardcoded in the form. Pre-filling works via `?tipo=...&mensaje=...` query params read by an inline `<script>`. Blog post CTAs and internal links construct these URLs at build time.

### Client-side JS

Kept minimal and inline via `<script>` tags:
- **Header:** mobile menu toggle
- **Layout:** WhatsApp button, `.fade-up` IntersectionObserver, CookieBanner logic
- **Proyectos:** category filter (show/hide cards by `data-cat`)
- **Recursos:** FAQ accordion + "load more" articles button
- **Contacto:** async form submission with success/error states; reads `tipo`/`mensaje` query params on load

### Analytics

Two analytics providers run in parallel — both are loaded via `Layout.astro` and therefore cover every page automatically.

- **Vercel Analytics + SpeedInsights** — imported as Astro components (`@vercel/analytics/astro`, `@vercel/speed-insights/astro`). Custom events use `import { track } from '@vercel/analytics'`.
- **Google Analytics 4** (`G-GS31FY434F`) — loaded in `Layout.astro` `<head>` with **Consent Mode v2** (RGPD/EEA). The first inline script sets all consent signals to `'denied'` by default via `gtag('consent', 'default', {...})`, then `CookieBanner.astro` calls `gtag('consent', 'update', {...granted...})` when the user accepts. Returning visitors who already accepted are restored on page load. In page scripts, access `gtag` as `const gtag = (window as any).gtag as (...args: any[]) => void` — it is a runtime global, not an import.

When adding a new trackable interaction, fire **both** `track(...)` and `gtag('event', ...)` so both platforms receive it.

Currently instrumented events:

| Event name | Properties | Where | Trigger |
|---|---|---|---|
| `whatsapp_click` | `page` | `Layout.astro` script | Click on the floating WhatsApp button |
| `contact_form_submitted` | `lang` | `contacto.astro` + `ca/contacto.astro` | Successful Web3Forms submission |
| `phone_click` | `page` | `Layout.astro` delegated listener | Click on any `tel:` link (hero CTA, contact page, legal) |
| `email_click` | `page` | `Layout.astro` delegated listener | Click on any `mailto:` link |
| `contact_cta_clicked` | `page`, `text` | `Layout.astro` delegated listener | Click on any link to `/contacto` from a non-contact page |

The delegated `click` listener in `Layout.astro` covers every page (ES + CA) automatically — `tel:`, `mailto:`, and `/contacto` CTA links do **not** need per-page instrumentation. Add per-page `track()`+`gtag()` calls only for events the delegated listener can't infer from an anchor (e.g. the form-submit success in `contacto.astro`).

### GEO (Generative Engine Optimization)

`public/llms.txt` — structured Markdown file for AI crawlers (ChatGPT, Perplexity, etc.), following the [llms.txt spec](https://llmstxt.org/). Keep it in sync when adding new pages or blog posts: update the pages list and append a new entry to the Blog section.

### Deployment

Hosted on **Vercel** (static output). `vercel.json` at the root contains 301 redirects from the old site's URL structure (e.g. `/que-es` → `/quienes-somos`, `/para-ti` → `/domotica/hogares`). When adding a new route that replaces an old one, add the redirect there.

`public/robots.txt` references `https://www.2smarthome.es/sitemap-index.xml` — the sitemap is generated at build time by `@astrojs/sitemap`.

`public/BingSiteAuth.xml` is the Bing Webmaster Tools verification file — do not delete it.

### IndexNow

`scripts/notify-indexnow.mjs` fetches the live sitemap from `https://www.2smarthome.es/sitemap-0.xml` and POSTs all URLs to `api.indexnow.org`. Run manually with `npm run notify` after confirming the production deploy is live.

The API key is `42499e3e7e81483bafad2a5581c06000`, verified by `public/42499e3e7e81483bafad2a5581c06000.txt`. Do not delete either file.
