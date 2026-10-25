import type { MetadataRoute } from 'next';
import { leerColeccion } from '@/lib/contenido';
import { GLOSARIO, slugTermino } from '@/lib/glosario';
import { CASOS } from '@/lib/casos';
import { AREAS_EN } from '@/lib/areas-en';
import { HERRAMIENTAS_EN } from '@/lib/herramientas-en';

const BASE = 'https://tiernocentella.es';

export default function sitemap(): MetadataRoute.Sitemap {
  const fijas = [
    '',
    '/acoso-laboral',
    '/despido',
    '/incapacidad-permanente',
    '/mujer-y-trabajo',
    '/herramientas/calendario-permisos',
    '/herramientas/calculadora-finiquito',
    '/herramientas/calculadora-paro',
    '/herramientas/calculadora-reduccion-jornada',
    '/herramientas/autodiagnostico-acoso-empresas',
    '/calculadora-indemnizacion',
    '/herramientas',
    '/herramientas/test-acoso',
    '/herramientas/test-nulidad',
    '/herramientas/test-extincion',
    '/herramientas/test-baja-laboral',
    '/herramientas/mapa-de-pruebas',
    '/herramientas/plazos',
    '/herramientas/revisa-tu-carta-de-despido',
    '/herramientas/comprobador-incapacidad',
    '/sentencias',
    '/jesus-tierno',
    '/empresas',
    '/videos',
    '/redes-y-medios',
    '/blog',
    '/preguntas-frecuentes',
    '/glosario',
    '/recursos',
    '/contacto',
    '/reservar',
  ].map((r) => ({ url: BASE + r }));
  const guias = [
    ...GLOSARIO.map((t) => ({ url: `${BASE}/glosario/${slugTermino(t.termino)}` })),
    ...CASOS.map((c) => ({ url: `${BASE}/sentencias/${c.slug}` })),
    ...['/en', '/en/contact', '/en/jesus-tierno', '/en/rulings', '/en/tools', '/en/blog'].map((r) => ({ url: BASE + r })),
    ...HERRAMIENTAS_EN.map((h) => ({ url: BASE + h.href })),
    ...leerColeccion('en/blog').map((p) => ({ url: `${BASE}/en/blog/${p.slug}`, lastModified: p.actualizado ?? p.fecha })),
    ...CASOS.map((c) => ({ url: `${BASE}/en/rulings/${c.slug}` })),
    ...AREAS_EN.flatMap((a) => [{ url: `${BASE}/en/${a.slug}` }, ...leerColeccion(`en/${a.carpeta}`).map((p) => ({ url: `${BASE}/en/${a.slug}/${p.slug}`, lastModified: p.actualizado ?? p.fecha }))]),
    ...leerColeccion('acoso').map((p) => ({ url: `${BASE}/acoso-laboral/${p.slug}`, lastModified: p.actualizado ?? p.fecha })),
    ...leerColeccion('despido').map((p) => ({ url: `${BASE}/despido/${p.slug}`, lastModified: p.actualizado ?? p.fecha })),
    ...leerColeccion('incapacidad').map((p) => ({ url: `${BASE}/incapacidad-permanente/${p.slug}`, lastModified: p.actualizado ?? p.fecha })),
    ...leerColeccion('mujer').map((p) => ({ url: `${BASE}/mujer-y-trabajo/${p.slug}`, lastModified: p.actualizado ?? p.fecha })),
    ...leerColeccion('blog').map((p) => ({ url: `${BASE}/blog/${p.slug}`, lastModified: p.actualizado ?? p.fecha })),
  ];
  return [...fijas, ...guias];
}
