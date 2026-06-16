# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at localhost:4321
npm run build      # Build to dist/
npm run preview    # Preview the production build
```

## Architecture

**Stack:** Astro 4 (static output) + Tailwind CSS via `@astrojs/tailwind`.

### Routing

Astro file-based routing — every `.astro` file in `src/pages/` becomes a route:

| File | URL |
|---|---|
| `src/pages/index.astro` | `/` |
| `src/pages/domotica/index.astro` | `/domotica` |
| `src/pages/domotica/hogares.astro` | `/domotica/hogares` |
| `src/pages/domotica/empresas.astro` | `/domotica/empresas` |
| `src/pages/soluciones.astro` | `/soluciones` |
| `src/pages/proyectos.astro` | `/proyectos` |
| `src/pages/quienes-somos.astro` | `/quienes-somos` |
| `src/pages/recursos.astro` | `/recursos` |
| `src/pages/contacto.astro` | `/contacto` |

### Layout & Components

- `src/layouts/Layout.astro` — base layout: injects Google Fonts (Inter), global CSS (scroll-behavior, scrollbar, `.fade-up` animation class), wraps `<Header>` + `<slot />` + `<Footer>`. All pages use `<Layout title="..." description="...">`.
- `src/components/Header.astro` — fixed nav with Tailwind `group-hover` CSS dropdown for Domótica (no JS needed for desktop). Mobile hamburger toggle is handled by an inline `<script>`. Active link highlighting uses `Astro.url.pathname`.
- `src/components/Footer.astro` — uses `new Date().getFullYear()` in frontmatter for the copyright year.

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
- **Scroll animation:** add class `fade-up` to any element — the Layout's IntersectionObserver adds `.visible` when it enters the viewport (CSS: opacity 0→1, translateY 28px→0).

### Images

Pages use Unsplash URLs directly (`https://images.unsplash.com/photo-{id}?w=800&q=80`). No local image assets exist — replace with actual brand photos when available.

### Client-side JS

Kept minimal and inline via `<script>` at the bottom of each page:
- **Header:** mobile menu toggle
- **Proyectos:** category filter (show/hide cards by `data-cat`)
- **Recursos:** FAQ accordion
- **Contacto:** form submit prevention + success message (no backend wired up — connect to Netlify Forms, Formspree, or similar)
