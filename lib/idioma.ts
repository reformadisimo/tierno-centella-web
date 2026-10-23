import { GUIAS_TRADUCIDAS } from './traducciones.generado';
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

// Guías traducidas: ruta española -> ruta inglesa. Solo las que ya existen (lo genera scripts/traducciones.mjs).
export const GUIAS_ES_EN: Record<string, string> = GUIAS_TRADUCIDAS;

// Ruta equivalente en el otro idioma; si no hay traducción, la portada de ese idioma.
export function rutaEnOtroIdioma(ruta: string): string {
  const limpia = ruta.replace(/\/$/, '') || '/';
  if (idiomaDe(limpia) === 'es') {
    if (GUIAS_ES_EN[limpia]) return GUIAS_ES_EN[limpia];
    if (RUTAS_ES_EN[limpia]) return RUTAS_ES_EN[limpia];
    const sent = limpia.match(/^\/sentencias\/(.+)$/);
    if (sent) return `/en/rulings/${sent[1]}`;
    return '/en';
  }
  for (const [es, en] of Object.entries(GUIAS_ES_EN)) if (en === limpia) return es;
  for (const [es, en] of Object.entries(RUTAS_ES_EN)) if (en === limpia) return es;
  const sent = limpia.match(/^\/en\/rulings\/(.+)$/);
  if (sent) return `/sentencias/${sent[1]}`;
  return '/';
}
