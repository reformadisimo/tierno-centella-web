import { leerColeccion } from './contenido';
import { CASOS } from './casos';
import { GLOSARIO } from './glosario';
import { FAQ } from './faq';
import { HERRAMIENTAS } from './herramientas';
import { CASOS_EN } from './casos-en';

// Índice del buscador, generado al construir la web: título, tipo, resumen y palabras de cada página.
export type Resultado = { href: string; titulo: string; tipo: string; resumen: string; texto: string };

const plano = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export function indiceEs(): Resultado[] {
  const r: Resultado[] = [];
  const areas: [string, string, string][] = [
    ['acoso', '/acoso-laboral', 'Acoso laboral'],
    ['despido', '/despido', 'Despido'],
    ['incapacidad', '/incapacidad-permanente', 'Incapacidad'],
    ['mujer', '/mujer-y-trabajo', 'Mujer y trabajo'],
  ];
  for (const [carpeta, base, tipo] of areas) {
    for (const p of leerColeccion(carpeta)) r.push({ href: `${base}/${p.slug}`, titulo: p.titulo, tipo: `Guía · ${tipo}`, resumen: p.descripcion, texto: plano(p.html).slice(0, 2500) });
  }
  for (const p of leerColeccion('blog')) r.push({ href: `/blog/${p.slug}`, titulo: p.titulo, tipo: 'Blog', resumen: p.descripcion, texto: plano(p.html).slice(0, 2500) });
  for (const h of HERRAMIENTAS) r.push({ href: h.href, titulo: h.titulo, tipo: 'Herramienta', resumen: h.texto, texto: '' });
  for (const c of CASOS) r.push({ href: `/sentencias/${c.slug}`, titulo: c.titulo, tipo: `Sentencia · ${c.materia}`, resumen: c.resumen, texto: [c.resultado, c.porQueImporta, ...c.hechos].join(' ') });
  for (const g of GLOSARIO) r.push({ href: `/glosario#${g.termino.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`, titulo: g.termino, tipo: 'Glosario', resumen: g.definicion.slice(0, 180), texto: g.definicion });
  for (const f of FAQ) r.push({ href: '/preguntas-frecuentes', titulo: f.pregunta, tipo: 'Pregunta frecuente', resumen: f.respuesta.slice(0, 180), texto: f.respuesta });
  const fijas: [string, string, string][] = [
    ['/contacto', 'Contacto y cita', 'Teléfono, WhatsApp, dirección en Jorge Juan 78 (Madrid), precio de la consulta y formulario.'],
    ['/jesus-tierno', 'Jesús Tierno Centella', 'Abogado laboralista, socio director: trayectoria, libro y entrevistas.'],
    ['/empresas', 'Para empresas y centros educativos', 'Protocolos de acoso, canal de denuncias, plan de igualdad y formación.'],
    ['/videos', 'Vídeos', 'Vídeos de Jesús Tierno y el equipo sobre acoso, despido e incapacidad.'],
    ['/sentencias', 'Sentencias y casos', 'Casos que ha llevado el despacho y jurisprudencia útil.'],
  ];
  for (const [href, titulo, resumen] of fijas) r.push({ href, titulo, tipo: 'Página', resumen, texto: '' });
  return r;
}

export function indiceEn(): Resultado[] {
  const r: Resultado[] = [];
  const areas: [string, string, string][] = [
    ['en/acoso', '/en/workplace-harassment', 'Workplace harassment'],
    ['en/despido', '/en/dismissal', 'Dismissal'],
    ['en/incapacidad', '/en/permanent-disability', 'Permanent disability'],
    ['en/mujer', '/en/women-at-work', 'Women at work'],
  ];
  for (const [carpeta, base, tipo] of areas) {
    for (const p of leerColeccion(carpeta)) r.push({ href: `${base}/${p.slug}`, titulo: p.titulo, tipo: `Guide · ${tipo}`, resumen: p.descripcion, texto: plano(p.html).slice(0, 2500) });
  }
  const fijas: [string, string, string][] = [
    ['/en/contact', 'Contact and appointments', 'Phone, WhatsApp, address at Jorge Juan 78 (Madrid), consultation fee and form.'],
    ['/en/jesus-tierno', 'Jesús Tierno Centella', 'Employment lawyer and managing partner: background, book and interviews.'],
    ['/en/rulings', 'Rulings and cases', "Cases handled by the firm and useful case law."],
    ['/en/tools', 'Free tools', 'Calculators and tests (in Spanish): compensation, deadlines, harassment test, disability.'],
  ];
  for (const [href, titulo, resumen] of fijas) r.push({ href, titulo, tipo: 'Page', resumen, texto: '' });
  for (const c of CASOS) {
    const e = CASOS_EN[c.slug];
    if (e) r.push({ href: `/en/rulings/${c.slug}`, titulo: e.titulo, tipo: `Ruling · ${e.materia}`, resumen: e.resumen, texto: [e.resultado, e.porQueImporta, ...e.hechos].join(' ') });
  }
  return r;
}
