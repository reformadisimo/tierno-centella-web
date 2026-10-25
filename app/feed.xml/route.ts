import { leerColeccion } from '@/lib/contenido';
import { BASE } from '@/lib/seo';

export const dynamic = 'force-static';

const x = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// RSS con las últimas guías y artículos del blog: lo leen agregadores, Google News Showcase y varias IA.
export function GET() {
  const piezas = [
    ...leerColeccion('blog').map((p) => ({ ...p, url: `${BASE}/blog/${p.slug}` })),
    ...leerColeccion('acoso').map((p) => ({ ...p, url: `${BASE}/acoso-laboral/${p.slug}` })),
    ...leerColeccion('despido').map((p) => ({ ...p, url: `${BASE}/despido/${p.slug}` })),
    ...leerColeccion('incapacidad').map((p) => ({ ...p, url: `${BASE}/incapacidad-permanente/${p.slug}` })),
  ]
    .sort((a, b) => (b.actualizado ?? b.fecha).localeCompare(a.actualizado ?? a.fecha))
    .slice(0, 40);
  const items = piezas
    .map(
      (p) => `<item><title>${x(p.titulo)}</title><link>${p.url}</link><guid isPermaLink="true">${p.url}</guid><pubDate>${new Date(p.actualizado ?? p.fecha).toUTCString()}</pubDate><description>${x(p.descripcion)}</description></item>`,
    )
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Tierno Centella Abogados: guías y blog</title><link>${BASE}</link><description>Guías prácticas de derecho laboral: acoso, despido e incapacidad permanente.</description><language>es-ES</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
