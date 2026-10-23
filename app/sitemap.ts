import type { MetadataRoute } from 'next';
import { leerColeccion } from '@/lib/contenido';

const BASE = 'https://tiernocentella.es';

export default function sitemap(): MetadataRoute.Sitemap {
  const fijas = [
    '',
    '/acoso-laboral',
    '/despido',
    '/incapacidad-permanente',
    '/calculadora-indemnizacion',
    '/herramientas',
    '/herramientas/test-acoso',
    '/herramientas/mapa-de-pruebas',
    '/herramientas/plazos',
    '/herramientas/revisa-tu-carta-de-despido',
    '/herramientas/comprobador-incapacidad',
    '/sentencias',
    '/jesus-tierno',
    '/empresas',
    '/videos',
    '/blog',
    '/preguntas-frecuentes',
    '/glosario',
    '/contacto',
  ].map((r) => ({ url: BASE + r }));
  const guias = [
    ...leerColeccion('acoso').map((p) => ({ url: `${BASE}/acoso-laboral/${p.slug}`, lastModified: p.actualizado ?? p.fecha })),
    ...leerColeccion('despido').map((p) => ({ url: `${BASE}/despido/${p.slug}`, lastModified: p.actualizado ?? p.fecha })),
    ...leerColeccion('incapacidad').map((p) => ({ url: `${BASE}/incapacidad-permanente/${p.slug}`, lastModified: p.actualizado ?? p.fecha })),
    ...leerColeccion('blog').map((p) => ({ url: `${BASE}/blog/${p.slug}`, lastModified: p.actualizado ?? p.fecha })),
  ];
  return [...fijas, ...guias];
}
