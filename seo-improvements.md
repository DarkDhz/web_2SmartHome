# SEO Improvements — 2SmartHome

> Lista accionable derivada de la auditoría SEO (2026-06-27). El sitio tiene una base
> técnica muy sólida: **no hay bloqueos de indexación ni de ranking**. Las mejoras se
> centran en autoridad off-site, E-E-A-T y pulido on-page.
>
> Leyenda de prioridad: 🔴 Alta · 🟡 Media · 🟢 Quick win

---

## 🔴 Alta prioridad

### 1. Google Business Profile + reseñas con nombre
- **Por qué:** El techo real de ranking ahora mismo es la autoridad local, no lo técnico.
  Todos los competidores son débiles aquí (DR 0–3) → es ganable.
- **Qué hacer:**
  - Completar/optimizar la ficha de Google Business Profile (dirección Badalona, horarios
    que coincidan con el schema, categorías, fotos, servicios).
  - Empezar a pedir reseñas de Google **con nombre** → alimenta la mejora #4.

### 2. Backlinks locales y del ecosistema
- **Por qué:** Técnicamente estamos al máximo; el ranking depende de autoridad. Pocos
  enlaces ya superan a rivales en DR 0–3.
- **Qué hacer:**
  - Directorios de negocio locales Barcelona/AMB.
  - Listados del ecosistema smart-home / Home Assistant.
  - Páginas de instaladores de marcas partner (Shelly, Aqara, Somfy).
  - Link building en catalán (`.cat`, prensa/blogs catalanes) — baja competencia.

### 3. ✅ Títulos `<title>` de blog demasiado largos
- **Impacto:** CTR en SERP (truncado a ~60 caracteres).
- **Evidencia:** `Layout.astro:48` añade `${title} | 2SmartHome` a todas las páginas.
  Ej.: *"Domótica en Barcelona: más control, más privacidad, más tranquilidad | 2SmartHome"* ≈ 80 caracteres.
- **Fix (elegir una opción):**
  - Sufijo de marca condicional: omitir ` | 2SmartHome` cuando `title.length > 50`, o
  - Añadir prop opcional `seoTitle` a `BlogPost.astro` / `Layout.astro` para fijar un
    título ≤55 caracteres distinto del H1 (no necesitan coincidir).

### 4. E-E-A-T: autor con nombre + schema de reseñas
- **Por qué:** Es el espacio en blanco del sector — ningún competidor muestra proof real.
- **Qué hacer:**
  - Si hay reseñas reales de Google, añadir `aggregateRating` al schema `LocalBusiness`
    (`Layout.astro:74-168`). La valoración debe ser **genuina y visible en la página**
    (no solo en el schema) → puede ganar estrellas en SERP.
  - Dar a los posts un autor con nombre (ingeniero/fundador) + bio + schema `Person`
    (ahora `BlogPost.astro:83` usa `Organization`). La experiencia de instalador es justo
    la señal E-E-A-T que Google premia.

---

## 🟡 Media prioridad

### 5. Dimensiones de la imagen OG no coinciden con la imagen real
- **Impacto:** CTR social (no ranking).
- **Evidencia:** `Layout.astro:209-211` declara `og:image:height=630`, pero `DEFAULT_IMAGE`
  se genera solo con `width: 1200` (`Layout.astro:24`) → la altura sigue el aspect ratio
  original de `principal-hero-img.jpeg`, casi seguro distinto de 630.
- **Fix:** Generar un OG real 1200×630 (`getImage({ width: 1200, height: 630 })`) o quitar
  el meta de altura hardcodeado.

### 6. `dateModified` nunca refleja actualizaciones + datos de llms.txt
- **Impacto:** Señal de frescura + precisión en citas de IA.
- **Evidencia:** `BlogPost.astro:66-67` fija día `01` y `dateModified === datePublished`
  siempre. `llms.txt` afirma *"garantía de 5 años"*, *"Fundada en Barcelona en 2024"* y
  *"apartamento en Barcelona (90 m²)"* — verificar contra el sitio y product-marketing
  (que dice "2+ años de experiencia").
- **Fix:** Al refrescar un post, actualizar `dateModified`. Reconciliar los datos de
  `llms.txt` con el sitio.

---

## 🟢 Quick wins (minutos)

### 7. ✅ Eliminar el meta `keywords`
- **Evidencia:** `Layout.astro:185` envía la misma lista de keywords en **todas** las
  páginas (incluidas CA y blog). Google lo ignora desde 2009; Bing penaliza ligeramente el
  stuffing. Cero upside.
- **Fix:** Borrar la línea `<meta name="keywords">`.

### 8. ✅ Unificar la etiqueta de breadcrumb de `/recursos`
- **Evidencia:** `recursos.astro:55` lo llama *"Blog y Guías de Domótica"*; `BlogPost.astro:98`
  lo referencia como *"Recursos"* para la misma URL → breadcrumb inconsistente en SERP.
- **Fix:** Elegir una etiqueta para `/recursos` y usarla en ambos schemas.

### 11. Páginas de dinero sin enlaces a artículos del blog
- **Impacto:** Topic clustering; PageRank fluye solo en una dirección (blog → money pages).
- **Evidencia:** `/domotica/hogares`, `/domotica/empresas` y `/soluciones` no enlazan
  ningún post del blog. Los posts sí enlazan hacia las money pages (cumplimiento del
  checklist de 2–4 enlaces), pero el clúster queda incompleto.
- **Fix:** Añadir una sección "Más sobre domótica para hogares" (2–3 cards de artículos o
  una lista de enlaces) encima del CTA final en cada página. Posts candidatos por página:
  - `hogares` → `/blog/hogar-inteligente-barcelona-piso`, `/blog/7-errores-comunes-domotica`,
    `/blog/vale-la-pena-invertir-casa-inteligente`
  - `empresas` → `/blog/domotica-para-empresas`, `/blog/ahorro-aire-acondicionado-domotica-barcelona`
  - `soluciones` → mezcla de posts según la sección (iluminación, clima, persianas…)

---

## ✅ Aplicados (2026-06-27)

### A. ✅ H1 de portada sin keyword principal
- **Fix aplicado:** Añadida tercera línea dentro del `<h1>` de `index.astro` y `ca/index.astro`:
  `<span class="block text-lg sm:text-xl font-semibold text-slate-400 mt-3">Empresa de domótica en Barcelona</span>`
  El H1 ahora contiene el keyword principal sin romper el diseño del tagline.

### B. ✅ Meta descriptions demasiado largas en 4 páginas
- **Fix aplicado:** Todas reducidas a ≤160 chars en ES y CA:
  - `domotica/hogares.astro` (206 → 173 chars)
  - `domotica/empresas.astro` (196 → 172 chars)
  - `domotica/index.astro` (182 → 158 chars)
  - `quienes-somos.astro` (191 → 155 chars)

### D. ✅ Título de quiénes somos con marca duplicada
- **Fix aplicado:** Añadido `seoTitle` en `quienes-somos.astro` y `ca/quienes-somos.astro`
  para evitar "2SmartHome … | 2SmartHome" en el SERP. Nueva descripción también más corta.

### E. ✅ H1 de /recursos genérico
- **Fix aplicado:** `recursos.astro` y `ca/recursos.astro` — H1 ahora es
  "Blog y guías de domótica" / "Blog i guies de domòtica".

---

## ✅ Verificaciones post-deploy (sin cambio de código salvo error)

### 9. Hreflang vs sitemap en Search Console
- **Evidencia:** `Layout.astro:189-191` emite `es-ES`/`ca-ES`/`x-default` recíprocos y
  válidos; `@astrojs/sitemap` también emite `xhtml:link`. Deben concordar.
- **Verificar:** Tras el deploy, confirmar en GSC que no aparecen errores de "no return tag"
  ni pares en conflicto.

### 10. Consistencia de trailing slash
- **Evidencia:** Sin `trailingSlash` en `astro.config.mjs` (default `ignore`). Los canonical
  se construyen desde `Astro.url.pathname`.
- **Verificar:** Comparar el `<link rel="canonical">` en vivo con la URL realmente servida.
  Si difieren por la barra final, fijar `trailingSlash: 'never'` explícito.

---

## Estado confirmado (sin acción)

- Crawlability e indexación correctas (`robots.txt` + `sitemap-index.xml`).
- Canonical autorreferenciado y `index, follow` en todas las páginas.
- Hreflang ES/CA recíproco con códigos válidos + `x-default`.
- Structured data completo: LocalBusiness, Service, FAQPage, Article, BreadcrumbList.
- Un solo H1 por página; títulos/descripciones únicos.
- Imágenes WebP con alt, `loading` eager/lazy explícito.
- Enlazado interno disciplinado en blog (2–4 enlaces contextuales por post).
- Cabeceras de seguridad + `llms.txt` para crawlers de IA.
