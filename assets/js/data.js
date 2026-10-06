/**
 * VoltajeSeguro - Datos Mockeados
 * Centraliza toda la información que se muestra en el sitio.
 * Editar aquí para personalizar el template.
 */

const BUSINESS = {
  name: "VoltajeSeguro",
  legalName: "VoltajeSeguro S.A.",
  tagline: "Soluciones eléctricas profesionales a tu alcance",
  description:
    "Empresa líder en servicios eléctricos residenciales, comerciales e industriales con más de 15 años de experiencia.",
  phone: "+54 11 5555-1234",
  phoneRaw: "+541155551234",
  whatsapp: "+54 9 11 5555-1234",
  whatsappRaw: "5491155551234",
  email: "contacto@voltajeseguro.com",
  address: "Av. Corrientes 1234, C1043 CABA, Buenos Aires",
  addressShort: "Av. Corrientes 1234, CABA",
  schedule: {
    weekdays: "Lunes a Viernes · 8:00 a 20:00",
    saturday: "Sábados · 9:00 a 14:00",
    sunday: "Domingos · Solo emergencias 24hs",
  },
  social: {
    facebook: "https://facebook.com/voltajeseguro",
    instagram: "https://instagram.com/voltajeseguro",
    linkedin: "https://linkedin.com/company/voltajeseguro",
    youtube: "https://youtube.com/@voltajeseguro",
  },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016887889473!2d-58.38159248477!3d-34.60373898045943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacf4d84c8b1%3A0x9b1e9b9f9b1e9b9f!2sAv.%20Corrientes%201234%2C%20C1043%20CABA!5e0!3m2!1ses-419!2sar!4v1700000000000",
};

const STATS = [
  { value: 15, suffix: "+", label: "Años de experiencia" },
  { value: 1200, suffix: "+", label: "Proyectos realizados" },
  { value: 850, suffix: "+", label: "Clientes satisfechos" },
  { value: 24, suffix: "/7", label: "Emergencias atendidas" },
];

const SERVICES = [
  {
    id: "residencial",
    icon: "home",
    title: "Instalaciones Residenciales",
    description:
      "Diseño y ejecución de instalaciones eléctricas completas para viviendas, cumpliendo con todas las normativas vigentes.",
    features: [
      "Cableado nuevo",
      "Tableros principales",
      "Puesta a tierra",
      "Certificación final",
    ],
    priceFrom: 25000,
    category: "Instalación",
  },
  {
    id: "reparacion",
    icon: "wrench",
    title: "Reparaciones 24hs",
    description:
      "Servicio de urgencias para cortocircuitos, cortes de luz y fallas eléctricas. Atención inmediata todos los días del año.",
    features: [
      "Diagnóstico rápido",
      "Atención 24/7",
      "Repuestos originales",
      "Garantía escrita",
    ],
    priceFrom: 8500,
    category: "Reparación",
  },
  {
    id: "tableros",
    icon: "zap",
    title: "Tableros y Disyuntores",
    description:
      "Armado, mantenimiento y actualización de tableros eléctricos con protecciones térmicas y diferenciales.",
    features: [
      "Disyuntores marca reconocida",
      "Llaves termomagnéticas",
      "Diferenciales 30mA",
      "Etiquetado profesional",
    ],
    priceFrom: 15000,
    category: "Instalación",
  },
  {
    id: "iluminacion",
    icon: "lightbulb",
    title: "Iluminación LED",
    description:
      "Asesoramiento y colocación de sistemas de iluminación LED para interiores y exteriores, ahorrá hasta un 80% de energía.",
    features: [
      "Spots direccionales",
      "Tiras LED",
      "Sensores de movimiento",
      "Domótica básica",
    ],
    priceFrom: 6500,
    category: "Iluminación",
  },
  {
    id: "cableado",
    icon: "cable",
    title: "Cableado Estructurado",
    description:
      "Infraestructura de red para datos, telefonía y fibra óptica en oficinas y comercios.",
    features: [
      "Cableado categoría 6",
      "Racks y patcheras",
      "Fibra óptica",
      "Certificación de puntos",
    ],
    priceFrom: 32000,
    category: "Comercial",
  },
  {
    id: "industrial",
    icon: "factory",
    title: "Proyectos Industriales",
    description:
      "Diseño e implementación de instalaciones eléctricas para fábricas, depósitos y plantas productivas.",
    features: [
      "Media tensión",
      "Puesta a tierra industrial",
      "Tableros de potencia",
      "Asesoramiento técnico",
    ],
    priceFrom: 85000,
    category: "Industrial",
  },
  {
    id: "aires",
    icon: "thermometer",
    title: "Instalación de Aires Acondicionados",
    description:
      "Conexión eléctrica dedicada para aires split, centrales y sistemas inverter con protecciones adecuadas.",
    features: [
      "Circuito dedicado",
      "Protección termomagnética",
      "Toma de tierra",
      "Línea de drenaje eléctrico",
    ],
    priceFrom: 9500,
    category: "Instalación",
  },
  {
    id: "emergencias",
    icon: "alert-triangle",
    title: "Emergencias Eléctricas",
    description:
      "Servicio inmediato ante corte de suministro, chispas, olores a quemado o cualquier situación de riesgo.",
    features: [
      "Llegada en 30 minutos",
      "Disponible 24/7",
      "Sin cargo de visita",
      "Diagnóstico profesional",
    ],
    priceFrom: 7500,
    category: "Reparación",
  },
];

const TEAM = [
  {
    name: "Carlos Méndez",
    role: "Director Técnico",
    experience: "20 años",
    specialty: "Instalaciones industriales",
    image: "https://i.pravatar.cc/400?img=12",
    certifications: ["Matrícula Nacional", "Norma IRAM"],
  },
  {
    name: "Lucía Fernández",
    role: "Jefa de Obras",
    experience: "12 años",
    specialty: "Cableado estructurado",
    image: "https://i.pravatar.cc/400?img=47",
    certifications: ["Cisco CCNA", "Norma IRAM"],
  },
  {
    name: "Martín Rodríguez",
    role: "Técnico Senior",
    experience: "8 años",
    specialty: "Reparaciones residenciales",
    image: "https://i.pravatar.cc/400?img=33",
    certifications: ["Matrícula Provincial", "Primeros Auxilios"],
  },
  {
    name: "Sofía Gómez",
    role: "Atención al Cliente",
    experience: "5 años",
    specialty: "Asesoramiento y presupuestos",
    image: "https://i.pravatar.cc/400?img=45",
    certifications: ["Atención al Cliente", "Normas ISO"],
  },
];

const GALLERY = [
  {
    id: 1,
    title: "Instalación en edificio residencial",
    category: "Residencial",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: 2,
    title: "Tablero principal terminado",
    category: "Industrial",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80",
  },
  {
    id: 3,
    title: "Iluminación LED en local comercial",
    category: "Comercial",
    image:
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
  },
  {
    id: 4,
    title: "Reparación de cortocircuito",
    category: "Emergencias",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80",
  },
  {
    id: 5,
    title: "Cableado estructurado en oficina",
    category: "Comercial",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
  },
  {
    id: 6,
    title: "Puesta a tierra residencial",
    category: "Residencial",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80",
  },
  {
    id: 7,
    title: "Cuadro eléctrico industrial",
    category: "Industrial",
    image:
      "https://images.unsplash.com/photo-1603114595212-71ee69bb6eb1?w=800&q=80",
  },
  {
    id: 8,
    title: "Instalación de aire acondicionado",
    category: "Residencial",
    image:
      "https://images.unsplash.com/photo-1667923006173-9e0d2251f608?w=800&q=80",
  },
  {
    id: 9,
    title: "Sensores de movimiento en pasillo",
    category: "Comercial",
    image:
      "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=800&q=80",
  },
  {
    id: 10,
    title: "Reparación urgente en domicilio",
    category: "Emergencias",
    image:
      "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80",
  },
  {
    id: 11,
    title: "Instalación trifásica industrial",
    category: "Industrial",
    image:
      "https://images.unsplash.com/photo-1618090584126-129cd1f3fbae?w=800&q=80",
  },
  {
    id: 12,
    title: "Iluminación exterior LED",
    category: "Residencial",
    image:
      "https://images.unsplash.com/photo-1601462904263-f2fa0c851cb9?w=800&q=80",
  },
];

const PRICING = [
  {
    id: "basico",
    name: "Plan Básico",
    tagline: "Para hogares pequeños",
    price: 9900,
    period: "visita + presupuesto",
    featured: false,
    description: "Ideal para arreglos puntuales y mantenimiento básico.",
    features: [
      "1 visita técnica",
      "Diagnóstico completo",
      "Presupuesto sin cargo",
      "Garantía de 30 días",
      "Horario L-V",
    ],
    notIncluded: ["Atención 24hs", "Servicio de emergencia"],
  },
  {
    id: "profesional",
    name: "Plan Profesional",
    tagline: "El más elegido",
    price: 24900,
    period: "por proyecto",
    featured: true,
    description: "Para remodelaciones e instalaciones completas.",
    features: [
      "Visita y diagnóstico gratis",
      "Proyecto técnico firmado",
      "Materiales certificados",
      "Garantía de 6 meses",
      "Atención prioritaria 24/7",
      "2 revisiones incluidas",
      "Certificación final IRAM",
    ],
    notIncluded: ["Mano de obra industrial"],
  },
  {
    id: "empresarial",
    name: "Plan Empresarial",
    tagline: "Para empresas e industrias",
    price: null,
    period: "presupuesto a medida",
    featured: false,
    description: "Soluciones personalizadas para negocios, oficinas e industrias.",
    features: [
      "Asesor técnico asignado",
      "Diseño de proyecto a medida",
      "Materiales de primera línea",
      "Garantía de 12 meses",
      "Mantenimiento mensual",
      "Atención 24/7 prioritaria",
      "Cumplimiento ISO 9001",
      "Facturación A/M",
    ],
    notIncluded: [],
  },
];

const COURSES = [
  {
    id: "basico",
    title: "Electricidad Domiciliaria Básica",
    description:
      "Aprendé los conceptos fundamentales para realizar instalaciones eléctricas seguras en tu hogar.",
    duration: "4 semanas",
    hours: "16 horas totales",
    classes: 8,
    price: 18500,
    level: "Inicial",
    requirements: "Ninguno",
    topics: [
      "Normativa IRAM",
      "Lectura de planos",
      "Circuitos básicos",
      "Puesta a tierra",
      "Práctica con materiales",
    ],
    schedule: [
      { day: "Lunes", time: "18:00 a 20:00" },
      { day: "Miércoles", time: "18:00 a 20:00" },
    ],
    instructor: "Carlos Méndez",
  },
  {
    id: "avanzado",
    title: "Electricidad Avanzada",
    description:
      "Profundizá en tableros, protecciones diferenciales y domótica aplicada a la vivienda moderna.",
    duration: "6 semanas",
    hours: "24 horas totales",
    classes: 12,
    price: 32000,
    level: "Intermedio",
    requirements: "Haber cursado el básico o experiencia previa",
    topics: [
      "Tableros trifásicos",
      "Disyuntores diferenciales",
      "Automatización del hogar",
      "Energía solar fotovoltaica",
      "UPS y estabilizadores",
    ],
    schedule: [
      { day: "Martes", time: "19:00 a 21:00" },
      { day: "Jueves", time: "19:00 a 21:00" },
    ],
    instructor: "Martín Rodríguez",
  },
  {
    id: "industrial",
    title: "Electricidad Industrial",
    description:
      "Formación técnica para desempeñarse profesionalmente en plantas industriales, fábricas y obras de gran envergadura.",
    duration: "8 semanas",
    hours: "40 horas totales",
    classes: 16,
    price: 58000,
    level: "Avanzado",
    requirements: "Conocimientos intermedios de electricidad",
    topics: [
      "Motores trifásicos",
      "Variadores de frecuencia",
      "PLC básico",
      "Media tensión",
      "Seguridad industrial",
      "Prácticas en planta",
    ],
    schedule: [
      { day: "Sábados", time: "9:00 a 13:00" },
    ],
    instructor: "Carlos Méndez",
  },
  {
    id: "seguridad",
    title: "Seguridad Eléctrica",
    description:
      "Curso intensivo sobre normativas de seguridad, primeros auxilios y prevención de accidentes eléctricos.",
    duration: "2 semanas",
    hours: "8 horas totales",
    classes: 4,
    price: 12000,
    level: "Todos los niveles",
    requirements: "Ninguno",
    topics: [
      "Riesgos eléctricos",
      "EPP y procedimientos",
      "Primeros auxilios",
      "Marco legal vigente",
    ],
    schedule: [
      { day: "Viernes", time: "18:00 a 20:00" },
    ],
    instructor: "Lucía Fernández",
  },
];

const TESTIMONIALS = [
  {
    name: "María González",
    role: "Propietaria, Belgrano",
    avatar: "https://i.pravatar.cc/150?img=49",
    rating: 5,
    comment:
      "Excelente atención. Vinieron el mismo día, diagnosticaron rápido y resolvieron el problema del tablero en menos de 2 horas. Muy profesionales.",
  },
  {
    name: "Roberto Silva",
    role: "Gerente, PyME",
    avatar: "https://i.pravatar.cc/150?img=68",
    rating: 5,
    comment:
      "Contratamos a VoltajeSeguro para el cableado estructurado de nuestra oficina. Cumplieron plazos, presupuesto y el resultado fue impecable.",
  },
  {
    name: "Patricia Romero",
    role: "Arquitecta",
    avatar: "https://i.pravatar.cc/150?img=44",
    rating: 5,
    comment:
      "Trabajo con ellos en varios proyectos. Siempre cumplen, los recomiendo sin dudar. La certificación IRAM final me da tranquilidad.",
  },
  {
    name: "Diego Martínez",
    role: "Dueño de casa, Palermo",
    avatar: "https://i.pravatar.cc/150?img=14",
    rating: 5,
    comment:
      "Tuve una emergencia un domingo a la noche y vinieron en 25 minutos. No me cobraron el adicional por horario. Honestos y rápidos.",
  },
];

const FAQ = [
  {
    question: "¿Realizan presupuestos sin cargo?",
    answer:
      "Sí, todas las visitas técnicas y presupuestos son sin cargo. Solo abonás el trabajo una vez aprobado el presupuesto.",
  },
  {
    question: "¿Trabajan los fines de semana y feriados?",
    answer:
      "Sí, atendemos urgencias las 24 horas los 365 días del año. Para trabajos programados, los sábados en horario reducido.",
  },
  {
    question: "¿Qué garantía tienen sus trabajos?",
    answer:
      "Todos nuestros trabajos tienen garantía escrita: 30 días para reparaciones, 6 meses para instalaciones y 12 meses para proyectos industriales.",
  },
  {
    question: "¿Aceptan pagos con tarjeta?",
    answer:
      "Sí, aceptamos efectivo, transferencia bancaria, todas las tarjetas de débito y crédito. Para empresas también facturamos A o M.",
  },
  {
    question: "¿Trabajan en toda la Ciudad de Buenos Aires?",
    answer:
      "Sí, cubrimos toda la CABA y GBA. Para zonas más alejadas consultá sin compromiso.",
  },
];

const PROCESS = [
  {
    step: 1,
    title: "Contacto inicial",
    description:
      "Nos escribís por WhatsApp, formulario o teléfono y nos contás tu necesidad.",
    icon: "message-circle",
  },
  {
    step: 2,
    title: "Visita técnica",
    description:
      "Vamos a tu domicilio o empresa sin cargo para evaluar el trabajo en el lugar.",
    icon: "map-pin",
  },
  {
    step: 3,
    title: "Presupuesto",
    description:
      "Te enviamos un presupuesto detallado por escrito, sin sorpresas ni cargos ocultos.",
    icon: "file-text",
  },
  {
    step: 4,
    title: "Ejecución y entrega",
    description:
      "Realizamos el trabajo en tiempo y forma, con limpieza final y certificación.",
    icon: "check-circle",
  },
];

const VALUES = [
  {
    icon: "shield",
    title: "Seguridad ante todo",
    description:
      "Cumplimos estrictamente con todas las normativas IRAM y de seguridad vigentes.",
  },
  {
    icon: "clock",
    title: "Puntualidad",
    description:
      "Respetamos tu tiempo: llegamos cuando decimos y cumplimos los plazos pactados.",
  },
  {
    icon: "badge-check",
    title: "Profesionalismo",
    description:
      "Equipo matriculado con formación continua y experiencia comprobable.",
  },
  {
    icon: "heart-handshake",
    title: "Compromiso",
    description:
      "Garantía escrita en cada trabajo y atención personalizada en todo momento.",
  },
];

const NAV_LINKS = [
  { href: "index.html", label: "Inicio" },
  { href: "sobre-nosotros.html", label: "Sobre nosotros" },
  { href: "servicios.html", label: "Servicios" },
  { href: "galeria.html", label: "Galería" },
  { href: "precios.html", label: "Precios" },
  { href: "cursos.html", label: "Cursos" },
  { href: "contacto.html", label: "Contacto" },
];

// Exportar al objeto window para uso global
window.VS_DATA = {
  BUSINESS,
  STATS,
  SERVICES,
  TEAM,
  GALLERY,
  PRICING,
  COURSES,
  TESTIMONIALS,
  FAQ,
  PROCESS,
  VALUES,
  NAV_LINKS,
};