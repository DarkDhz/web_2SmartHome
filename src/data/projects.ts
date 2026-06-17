const DUMMY_PROJECT_IMAGE = '/img/photo-1600210492493-0946911123ea.jpg';

export type Project = {
  slug: string;
  title: string;
  cat: string;
  size: string;
  year: string;
  location: string;
  desc: string;
  img: string;
  tags: string[];
  gallery: string[];
  summary: string;
  challenge: string;
  workDone: string[];
  systems: string[];
  results: string[];
};

export const projects: Project[] = [
  {
    slug: 'casa-badalona',
    title: 'Casa en Badalona',
    cat: 'Residencial',
    size: '100 m²',
    year: '2025',
    location: 'Badalona',
    desc: 'Automatización completa de una vivienda unifamiliar en el centro de Badalona: iluminación escénica, climatización por zonas, sombreado inteligente, seguridad perimetral, audio multiroom y control de acceso integrado.',
    img: DUMMY_PROJECT_IMAGE,
    tags: ['Iluminación', 'Clima', 'Seguridad', 'Audio'],
    gallery: [DUMMY_PROJECT_IMAGE, DUMMY_PROJECT_IMAGE, DUMMY_PROJECT_IMAGE],
    summary: 'El proyecto consistió en transformar una vivienda familiar en un hogar inteligente, con control centralizado desde móvil, escenas personalizadas y automatizaciones pensadas para el uso diario.',
    challenge: 'El cliente buscaba comodidad sin complicar la experiencia de uso. La prioridad fue integrar iluminación, clima, seguridad y audio en una interfaz sencilla para toda la familia.',
    workDone: [
      'Diseño de escenas para entrada, noche, cine, ausencia y bienvenida.',
      'Control de climatización por zonas para reducir consumos innecesarios.',
      'Integración de persianas y sombreado con horarios y sensores de luz.',
      'Sistema de seguridad perimetral con avisos y control remoto.',
    ],
    systems: ['Iluminación regulable', 'Termostatos por zona', 'Persianas motorizadas', 'Videoportero', 'Audio multiroom'],
    results: ['Uso diario más cómodo', 'Mayor control energético', 'Seguridad reforzada', 'Control unificado desde app y pulsadores'],
  },
  {
    slug: 'oficinas-corporativas-22',
    title: 'Oficinas corporativas en 22@',
    cat: 'Corporativo',
    size: '1.200 m²',
    year: '2025',
    location: 'Barcelona 22@',
    desc: 'Sistema de gestión inteligente para tres plantas de oficinas: control de iluminación por presencia, climatización por zonas y horarios, y control de acceso con tarjeta RFID.',
    img: DUMMY_PROJECT_IMAGE,
    tags: ['Iluminación', 'Clima', 'Acceso'],
    gallery: [DUMMY_PROJECT_IMAGE, DUMMY_PROJECT_IMAGE, DUMMY_PROJECT_IMAGE],
    summary: 'Se planteó una instalación orientada a eficiencia, mantenimiento sencillo y confort para equipos que usan salas, despachos y zonas comunes con ritmos distintos.',
    challenge: 'La oficina necesitaba adaptar consumos a ocupación real y facilitar la gestión de accesos sin depender de ajustes manuales continuos.',
    workDone: [
      'Programación de iluminación por presencia y aporte de luz natural.',
      'Climatización segmentada por plantas, salas y horarios laborales.',
      'Control de acceso RFID para empleados, visitas y proveedores.',
      'Panel de gestión para revisar estados y modificar calendarios.',
    ],
    systems: ['Sensores de presencia', 'Control DALI', 'Clima por zonas', 'RFID', 'Panel centralizado'],
    results: ['Menos consumo fuera de horario', 'Espacios más confortables', 'Gestión de accesos simplificada', 'Mantenimiento más visible'],
  },
  {
    slug: 'hotel-boutique-born',
    title: 'Hotel Boutique en el Born',
    cat: 'Hostelería',
    size: '35 hab.',
    year: '2025',
    location: 'Barcelona, El Born',
    desc: 'Plataforma centralizada de domótica hotelera con gestión individual de cada habitación, check-in digital, sistema de entretenimiento y optimización energética.',
    img: DUMMY_PROJECT_IMAGE,
    tags: ['Gestión hotelera', 'Energía', 'Acceso'],
    gallery: [DUMMY_PROJECT_IMAGE, DUMMY_PROJECT_IMAGE, DUMMY_PROJECT_IMAGE],
    summary: 'La intervención centró la operativa del hotel en una plataforma única para mejorar la experiencia del huésped y reducir consumos en habitaciones vacías.',
    challenge: 'El objetivo era mantener una experiencia premium y discreta, con tecnología visible solo cuando aporta valor al huésped o al equipo de operaciones.',
    workDone: [
      'Control individual de habitaciones desde recepción y mantenimiento.',
      'Escenas de bienvenida vinculadas al check-in.',
      'Climatización automatizada según ocupación y estado de reserva.',
      'Acceso digital y monitorización de incidencias técnicas.',
    ],
    systems: ['Gestión por habitación', 'Check-in digital', 'Cerraduras inteligentes', 'Clima eficiente', 'Entretenimiento'],
    results: ['Mayor confort del huésped', 'Ahorro energético por ocupación', 'Operativa más ágil', 'Mejor trazabilidad de incidencias'],
  },
  {
    slug: 'chalet-collserola',
    title: 'Chalet en la Sierra de Collserola',
    cat: 'Residencial',
    size: '280 m²',
    year: '2025',
    location: 'Collserola',
    desc: 'Domótica residencial con especial atención al exterior: riego automatizado, iluminación de jardín, videoportero y sistema de seguridad perimetral con cámaras.',
    img: DUMMY_PROJECT_IMAGE,
    tags: ['Seguridad', 'Jardín', 'Acceso'],
    gallery: [DUMMY_PROJECT_IMAGE, DUMMY_PROJECT_IMAGE, DUMMY_PROJECT_IMAGE],
    summary: 'Se desarrolló una instalación para una vivienda con mucho espacio exterior, priorizando seguridad, control de accesos y automatización de jardín.',
    challenge: 'La finca necesitaba automatizaciones fiables para exterior y una experiencia de control coherente entre vivienda, jardín y accesos.',
    workDone: [
      'Automatización de riego por franjas horarias y condiciones ambientales.',
      'Iluminación exterior por escenas para terraza, jardín y circulación.',
      'Videoportero y cámaras integradas en el sistema de seguridad.',
      'Control remoto de accesos y alertas de eventos relevantes.',
    ],
    systems: ['Riego automático', 'Iluminación exterior', 'Cámaras IP', 'Videoportero', 'Control de puertas'],
    results: ['Exterior más fácil de gestionar', 'Mejor visibilidad nocturna', 'Seguridad perimetral reforzada', 'Control remoto completo'],
  },
  {
    slug: 'restaurante-eixample',
    title: 'Restaurante en el Eixample',
    cat: 'Hostelería',
    size: '350 m²',
    year: '2024',
    location: 'Barcelona, Eixample',
    desc: 'Sistema de domótica gastronómica con escenas de iluminación por servicio, música ambiente adaptativa y control climático por zonas de sala y cocina.',
    img: DUMMY_PROJECT_IMAGE,
    tags: ['Iluminación', 'Audio', 'Clima'],
    gallery: [DUMMY_PROJECT_IMAGE, DUMMY_PROJECT_IMAGE, DUMMY_PROJECT_IMAGE],
    summary: 'La instalación se diseñó para acompañar los distintos momentos del servicio: preparación, comidas, cenas, cierre y eventos privados.',
    challenge: 'El local necesitaba cambios de ambiente rápidos y repetibles, sin depender de ajustes manuales durante los picos de servicio.',
    workDone: [
      'Creación de escenas de luz para mediodía, cena, evento y limpieza.',
      'Audio ambiente por zonas con volumen independiente.',
      'Climatización separada entre sala, cocina y zonas de paso.',
      'Panel de control sencillo para responsables de turno.',
    ],
    systems: ['Escenas de iluminación', 'Audio por zonas', 'Clima comercial', 'Panel táctil', 'Programaciones horarias'],
    results: ['Ambiente más consistente', 'Operativa más rápida', 'Mayor confort en sala', 'Control sencillo para el equipo'],
  },
];

export const projectCategories = ['Todos', 'Residencial', 'Corporativo', 'Hostelería', 'Locales'];
