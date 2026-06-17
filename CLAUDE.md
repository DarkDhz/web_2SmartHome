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

**Stack:** Astro 5 (static output) + Tailwind CSS (inline via `@astrojs/tailwind`-style class utilities, no config file) + `@astrojs/sitemap`.

### i18n — bilingual ES/CA

`astro.config.mjs` declares `i18n: { defaultLocale: 'es', locales: ['es', 'ca'], routing: { prefixDefaultLocale: false } }`.

- **Spanish** pages live at root: `src/pages/*.astro`, `src/pages/domotica/`, `src/pages/blog/`.
- **Catalan** pages mirror the same slug under `src/pages/ca/`: `src/pages/ca/*.astro`, `src/pages/ca/domotica/`, `src/pages/ca/blog/`.
- Every page passes `lang="ca"` (or omits it, defaulting to `'es'`) to `<Layout>` and `<BlogPost>`.
- Legal pages (`/privacidad`, `/aviso-legal`, `/cookies`) are Spanish-only; Catalan footer links point to the Spanish versions.

### Layouts

**`src/layouts/Layout.astro`** — base layout used by every page:
- Props: `title`, `description?`, `image?`, `canonical?`, `noIndex?`, `schemas?` (JSON-LD array), `lang?: 'es' | 'ca'`.
- Injects `<html lang={lang}>`, Google Fonts (Inter), `src/styles/global.css`, Vercel Analytics/SpeedInsights, and `<CookieBanner>`.
- Computes `esAlternate` / `caAlternate` URLs and emits `<link rel="alternate" hreflang>` tags.
- Emits a `LocalBusiness` JSON-LD schema plus any extra `schemas[]` passed by the page.
- A floating WhatsApp button is rendered, with per-path message text hardcoded in `whatsappMessages`.
- The `.fade-up` animation class is defined here: an IntersectionObserver in an inline `<script>` adds `.visible` when elements scroll into view (opacity 0→1, translateY 28px→0).

**`src/layouts/BlogPost.astro`** — wraps `<Layout>` for blog articles:
- Props: `title`, `description`, `cat`, `date`, `time`, `img`, `imgAlt?`, `lang?`, `cta?` (object with `eyebrow`, `title`, `text`, `button`, `tipo`, `mensaje`).
- Contains a `ui` object that switches breadcrumb labels, CTA defaults, and "back to blog" text between ES and CA.
- The `cta.tipo` and `cta.mensaje` values are passed as query params to `/contacto` (or `/ca/contacto`) via a pre-filled form URL.

### Components

- **`Header.astro`** — locale-aware. Reads `Astro.url.pathname`; if it starts with `/ca`, sets `isCA=true` and `prefix='/ca'`. All nav links are `${prefix}/path`. Contains a language switcher pill (ES/CA). Mobile hamburger toggle via inline `<script>`.
- **`Footer.astro`** — locale-aware with a bilingual `t` object. Footer links use `${prefix}/...`. Copyright year via `new Date().getFullYear()`.
- **`CookieBanner.astro`** — GDPR cookie consent banner (Spanish-only text). Shown/hidden via inline script that reads/writes `localStorage`.

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
| `/privacidad`, `/aviso-legal`, `/cookies` | (Spanish only) |

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

Local images are served from `public/img/` (hero, project photos) and `public/blog_imgs/` (blog thumbnails). All `<img>` tags reference these as root-relative paths (e.g. `/img/photo-1234.jpg`). No Astro image optimization is used.

### Contact form

`/contacto` (and `/ca/contacto`) POST to `https://api.web3forms.com/submit` using the access key hardcoded in the form. Pre-filling works via `?tipo=...&mensaje=...` query params read by an inline `<script>`. Blog post CTAs and internal links construct these URLs at build time.

### Client-side JS

Kept minimal and inline via `<script>` tags:
- **Header:** mobile menu toggle
- **Layout:** WhatsApp button, `.fade-up` IntersectionObserver, CookieBanner logic
- **Proyectos:** category filter (show/hide cards by `data-cat`)
- **Recursos:** FAQ accordion + "load more" articles button
- **Contacto:** async form submission with success/error states; reads `tipo`/`mensaje` query params on load
