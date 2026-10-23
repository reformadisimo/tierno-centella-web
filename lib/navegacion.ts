export type Grupo = { titulo: string; href: string; enlaces: { href: string; texto: string }[] };

export const MENU: Grupo[] = [
  {
    titulo: 'Acoso laboral',
    href: '/acoso-laboral',
    enlaces: [
      { href: '/acoso-laboral', texto: 'Todo sobre el acoso laboral' },
      { href: '/acoso-laboral/como-saber-si-sufro-acoso', texto: 'Cómo saber si es acoso' },
      { href: '/acoso-laboral/como-demostrar-el-acoso', texto: 'Cómo demostrarlo' },
      { href: '/acoso-laboral/que-puedo-reclamar', texto: 'Qué puedes reclamar' },
      { href: '/acoso-laboral/baja-por-ansiedad-por-acoso', texto: 'Baja por ansiedad' },
      { href: '/acoso-laboral/acoso-en-la-administracion-publica-y-educacion', texto: 'Administración y educación' },
      { href: '/acoso-laboral/acoso-laboral-como-delito', texto: 'Vía penal' },
    ],
  },
  {
    titulo: 'Despido',
    href: '/despido',
    enlaces: [
      { href: '/despido', texto: 'Qué hacer si te despiden' },
      { href: '/calculadora-indemnizacion', texto: 'Calculadora de indemnización' },
      { href: '/despido/tipos-de-despido', texto: 'Tipos de despido' },
      { href: '/despido/despido-nulo-cuando', texto: 'Cuándo es nulo' },
      { href: '/despido/plazo-para-reclamar-despido', texto: 'Plazo para reclamar' },
    ],
  },
  {
    titulo: 'Incapacidad',
    href: '/incapacidad-permanente',
    enlaces: [
      { href: '/incapacidad-permanente', texto: 'Incapacidad permanente' },
      { href: '/incapacidad-permanente/grados-de-incapacidad-permanente', texto: 'Grados y cuánto se cobra' },
      { href: '/incapacidad-permanente/reclamacion-previa-y-demanda', texto: 'Si te la deniegan' },
      { href: '/incapacidad-permanente/incapacidad-y-contrato-ley-2-2025', texto: 'Tu contrato tras la incapacidad' },
    ],
  },
  {
    titulo: 'Herramientas',
    href: '/herramientas',
    enlaces: [
      { href: '/herramientas/test-acoso', texto: '¿Es acoso lo que me pasa?' },
      { href: '/herramientas/mapa-de-pruebas', texto: 'Mapa de pruebas del acoso' },
      { href: '/calculadora-indemnizacion', texto: 'Calculadora de indemnización' },
      { href: '/herramientas/revisa-tu-carta-de-despido', texto: 'Revisa tu carta de despido' },
      { href: '/herramientas/plazos', texto: 'Plazos para reclamar' },
      { href: '/herramientas/comprobador-incapacidad', texto: 'Comprobador de incapacidad' },
    ],
  },
  {
    titulo: 'El despacho',
    href: '/jesus-tierno',
    enlaces: [
      { href: '/jesus-tierno', texto: 'Jesús Tierno' },
      { href: '/sentencias', texto: 'Sentencias ganadas' },
      { href: '/videos', texto: 'Vídeos' },
      { href: '/empresas', texto: 'Para empresas y centros educativos' },
      { href: '/blog', texto: 'Blog' },
      { href: '/preguntas-frecuentes', texto: 'Preguntas frecuentes' },
      { href: '/glosario', texto: 'Glosario laboral' },
    ],
  },
];
