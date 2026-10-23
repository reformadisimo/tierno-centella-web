// Idioma de la página según la ruta: todo lo que cuelga de /en es la versión inglesa.
export type Idioma = 'es' | 'en';
export const idiomaDe = (ruta: string | null | undefined): Idioma => (ruta === '/en' || ruta?.startsWith('/en/') ? 'en' : 'es');

// Equivalencias de rutas entre idiomas (las que existen en los dos).
export const RUTAS_ES_EN: Record<string, string> = {
  '/': '/en',
  '/acoso-laboral': '/en/workplace-harassment',
  '/despido': '/en/dismissal',
  '/incapacidad-permanente': '/en/permanent-disability',
  '/mujer-y-trabajo': '/en/women-at-work',
  '/contacto': '/en/contact',
  '/jesus-tierno': '/en/jesus-tierno',
  '/sentencias': '/en/rulings',
  '/herramientas': '/en/tools',
  '/buscar': '/en/search',
};

export const AREAS_ES_EN: Record<string, { en: string; carpeta: string }> = {
  '/acoso-laboral': { en: '/en/workplace-harassment', carpeta: 'acoso' },
  '/despido': { en: '/en/dismissal', carpeta: 'despido' },
  '/incapacidad-permanente': { en: '/en/permanent-disability', carpeta: 'incapacidad' },
  '/mujer-y-trabajo': { en: '/en/women-at-work', carpeta: 'mujer' },
};
