// Reseñas visibles de Google Maps para las páginas "Quiénes somos".
// IMPORTANTE: no se emiten como JSON-LD. Si se vuelve a añadir marcado
// Review/AggregateRating, verifica antes ratingValue, reviewCount, autores,
// fechas y textos verbatim contra Google Maps.

export const reviewsAggregate = {
  ratingValue: '5.0', // [NOTA MEDIA REAL, ej. "4.9"]
  reviewCount: 9, // total real de reseñas en Google
};

// Enlace público al perfil/reseñas de Google (reusa el de Maps o el de reseñas).
export const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/place/2SmartHome';

export interface Review {
  author: string;
  rating: number; // 1–5
  text: string;
  date: string; // ISO YYYY-MM-DD
  image?: string; // nombre del archivo en src/assets/reviews_imgs/ (opcional; si falta, avatar con inicial)
}

// Las 6 reseñas que se muestran en la web.
// Texto verbatim en su idioma original — compartido entre ES y CA (no se traduce).
export const reviews: Review[] = [
  {
    author: 'Neus Gris de la Cruz',
    rating: 5,
    text: 'Hace unos meses, contactamos con los chicos de 2SmartHome, nos preocupaba el tema de la seguridad en nuestra casa.\n\nArnau, nos atendió muy bien y entendió nuestro problema a la perfección.\n\nFinalmente instalamos una sistema de alarma sin cuotas con sensores y cámaras, las luces de casa y la automatización de la limpieza con un robot aspirador.\n\nQuedamos muy contentos, repetiremos.',
    date: '2026-06-24',
    image: 'neusgris.png',
  },
  {
    author: 'Xavier Garcia',
    rating: 5,
    text: 'El viernes me hicieron una instalación, fueron rápidos y muy cuidadosos con todo, atención perfecta! Muy recomendable de hecho, estoy pensando en domotizar más cosas!',
    date: '2026-06-06',
    image: 'xaviergarcia.png',
  },
  {
    author: 'Victor Gómez Peña',
    rating: 5,
    text: 'Sin duda un equipo de grandes profesionales!! Instalé un sistema de videovigilancia doméstico y el resultado fue fantástico. Además, domoticé una persiana y pese a la dificultad que se dio debido a la tipología de la misma, fueron capaces de solventar todos los problemas y dejarlo todo perfecto. La empresa que necesitas si quieres modernizar tu hogar.',
    date: '2026-06-06',
  },
  {
    author: 'Karina Villagran',
    rating: 5,
    text: 'Hemos hecho una instalación completa de smart home en casa y el resultado ha sido espectacular. Han integrado todo el sistema con pantallas interactivas desde las que controlamos iluminación, climatización, seguridad y más, de forma muy cómoda e intuitiva.\n\nSe nota la profesionalidad y el cuidado en cada detalle. Todo funciona perfectamente. Los recomiendo sin ninguna duda.',
    date: '2026-04-27',
    image: 'karinavillagran.png',
  },
  {
    author: 'Toni Fernández Ramón',
    rating: 5,
    text: 'Muy buena experiencia. Nos instalaron domótica en casa para automatizar las persianas y añadir una cerradura inteligente, y el cambio ha sido total en comodidad y seguridad.\n\nTodo funciona perfectamente y el trato fue muy profesional, explicándolo todo con paciencia. Empresa totalmente recomendable.',
    date: '2026-04-27',
  },
  {
    author: 'Raquel Gil Ferré',
    rating: 5,
    text: 'Estoy encantada con 2 Smart Home. Es una empresa de domótica totalmente recomendable, tanto por la calidad de sus soluciones como por el trato profesional y cercano que ofrecen. Dos chicos super jovenes y amables que estan en todo. Desde el primer momento transmiten confianza, explican todo de forma clara y se adaptan perfectamente a las necesidades de cada vivienda.\n\nLa instalación ha sido rápida, limpia y muy bien organizada. Se nota que conocen muy bien el sector y que cuidan cada detalle para que el sistema funcione de manera sencilla, cómoda y eficiente. Gracias a ellos, la casa es ahora mucho más práctica, moderna y segura.\n\nSin duda, 2 Smart Home es una empresa seria, resolutiva y comprometida con la satisfacción del cliente. Repetiría sin dudarlo y la recomiendo al 100%.',
    date: '2026-04-27',
    image: 'raquelgil.png',
  },
];
