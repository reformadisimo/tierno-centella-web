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

// Guías traducidas: ruta española -> ruta inglesa (ver content/en/MAPA.md).
export const GUIAS_ES_EN: Record<string, string> = {
  '/acoso-laboral/acoso-en-la-administracion-publica-y-educacion': '/en/workplace-harassment/harassment-in-public-sector-and-education',
  '/acoso-laboral/acoso-horizontal-entre-companeros': '/en/workplace-harassment/harassment-by-coworkers',
  '/acoso-laboral/acoso-laboral-como-delito': '/en/workplace-harassment/workplace-harassment-as-a-crime',
  '/acoso-laboral/baja-por-ansiedad-por-acoso': '/en/workplace-harassment/sick-leave-for-anxiety-due-to-harassment',
  '/acoso-laboral/como-demostrar-el-acoso': '/en/workplace-harassment/how-to-prove-workplace-harassment',
  '/acoso-laboral/como-saber-si-sufro-acoso': '/en/workplace-harassment/am-i-being-harassed-at-work',
  '/acoso-laboral/dejar-el-trabajo-por-acoso': '/en/workplace-harassment/quitting-your-job-because-of-harassment',
  '/acoso-laboral/protocolo-de-acoso-que-exigir': '/en/workplace-harassment/anti-harassment-protocol',
  '/acoso-laboral/que-puedo-reclamar': '/en/workplace-harassment/what-you-can-claim-for-harassment',
  '/despido/despido-colectivo-ere-y-erte': '/en/dismissal/collective-dismissal-ere-and-erte',
  '/despido/despido-nulo-cuando': '/en/dismissal/when-is-a-dismissal-void',
  '/despido/plazo-para-reclamar-despido': '/en/dismissal/deadline-to-challenge-a-dismissal',
  '/despido/tipos-de-despido': '/en/dismissal/types-of-dismissal',
  '/incapacidad-permanente/grados-de-incapacidad-permanente': '/en/permanent-disability/degrees-of-permanent-disability',
  '/incapacidad-permanente/incapacidad-y-contrato-ley-2-2025': '/en/permanent-disability/permanent-disability-and-your-contract',
  '/incapacidad-permanente/reclamacion-previa-y-demanda': '/en/permanent-disability/appealing-a-denied-permanent-disability',
  '/mujer-y-trabajo/acoso-sexual-y-por-razon-de-sexo': '/en/women-at-work/sexual-and-sex-based-harassment',
  '/mujer-y-trabajo/brecha-salarial-registro-retributivo': '/en/women-at-work/equal-pay-and-pay-gap',
  '/mujer-y-trabajo/despido-embarazada': '/en/women-at-work/dismissal-during-pregnancy',
  '/mujer-y-trabajo/permisos-por-nacimiento-y-lactancia': '/en/women-at-work/birth-and-breastfeeding-leave',
  '/mujer-y-trabajo/reduccion-y-adaptacion-de-jornada': '/en/women-at-work/reduced-and-adapted-working-hours',
};

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
