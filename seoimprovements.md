# SEO Local Barcelona — Lista de tareas

## Prioridad alta (impacto directo en rankings locales)

- [ ] **1. Google Business Profile**
  - Reclamar/optimizar el perfil en Google Maps con fotos reales, descripción actualizada, categorías (Home Automation Service), horario y URL del sitio
  - Pedir reseñas activamente a clientes existentes — es el factor #1 de SEO local
  - Publicar en GBP regularmente (posts, fotos de proyectos)

- [ ] **2. H1 de la homepage no incluye "Barcelona"**
  - El H1 actual es "Tu hogar, inteligente" — neutral pero pierde oportunidad
  - Cambiar a algo como "Domótica en Barcelona para tu hogar y empresa" o incluir Barcelona en el subtítulo inmediato

- [x] **3. Añadir schema `FAQPage` en la página de recursos**
  - Ya implementado en `recursos.astro` y `ca/recursos.astro` (líneas 38-46, pasado via `schemas` prop)

- [x] **4. Añadir schema `Service` en páginas de servicio**
  - Añadido `Service` + `BreadcrumbList` schema en las 4 páginas: ES y CA de hogares y empresas

- [ ] **5. Reseñas con `AggregateRating` en el schema**
  - Añadir valoraciones reales al `LocalBusiness` schema del Layout — aparecen como estrellas en los resultados

---

## Prioridad media (contenido y long-tail)

- [ ] **6. Blog posts con keywords locales específicas**
  - Artículos tipo: "Domótica en el Eixample", "Automatización para pisos del Ensanche", "Smart home en Badalona"
  - Targets de long-tail: "instalar domótica Barcelona precio", "empresa domótica Maresme"

- [ ] **7. Expandir la página de proyectos con más localizaciones**
  - Actualmente solo hay 3 proyectos (Badalona, Barcelona genérico, Eixample)
  - Añadir proyectos en otras zonas metropolitanas mencionadas en el schema: Hospitalet, Terrassa, Sabadell, etc.

- [ ] **8. Página o sección "Zona de cobertura"**
  - Una página o sección visible con los municipios que cubre el servicio, con texto descriptivo — no solo el schema JSON-LD (invisible para usuarios)

- [ ] **9. Menciones NAP consistentes**
  - Verificar que Nombre, Dirección y Teléfono son idénticos en el sitio web, GBP, y cualquier directorio donde estéis (Páginas Amarillas, Yelp, Habitissimo, etc.)

---

## Prioridad baja (refinamiento técnico)

- [x] **10. Canonicals explícitos en todas las páginas**
  - Ya resuelto: `Layout.astro:34` auto-computa el canonical desde `Astro.url.pathname` — no requiere prop manual

- [ ] **11. Breadcrumb schema en páginas de blog**
  - Los posts de blog no tienen `BreadcrumbList` — añadirlo en `BlogPost.astro`

- [ ] **12. Velocidad de carga / Core Web Vitals**
  - Auditar con PageSpeed Insights — especialmente en mobile, que Google prioriza para búsquedas locales

- [x] **13. Enlazado interno hacia `/contacto`**
  - Ya resuelto: todas las páginas principales tienen CTAs descriptivos (ej. "Solicitar consulta gratuita", "Pedir presupuesto inicial", etc.)
