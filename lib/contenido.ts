import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

// Contenido en Markdown con cabecera sencilla:
// ---
// titulo: ...
// descripcion: ...
// fecha: AAAA-MM-DD            (fecha de publicación)
// actualizado: AAAA-MM-DD      (opcional)
// categoria: acoso | despido | incapacidad | empresas
// video: ID de YouTube         (opcional)
// orden: número                (opcional, para ordenar guías)
// ---
// Cuerpo en Markdown. Las líneas que empiezan por "> " se pintan como recuadro destacado.

export type Pieza = {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  actualizado?: string;
  categoria?: string;
  video?: string;
  orden?: number;
  html: string;
  minutos: number;
  faq: { pregunta: string; respuesta: string }[];
};

const RAIZ = path.join(process.cwd(), 'content');

function leerCabecera(texto: string) {
  const m = texto.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { datos: {} as Record<string, string>, cuerpo: texto };
  const datos: Record<string, string> = {};
  for (const linea of m[1].split('\n')) {
    const i = linea.indexOf(':');
    if (i > 0) datos[linea.slice(0, i).trim()] = linea.slice(i + 1).trim();
  }
  return { datos, cuerpo: m[2] };
}

export function leerColeccion(carpeta: string): Pieza[] {
  const dir = path.join(RAIZ, carpeta);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => leerPieza(carpeta, f.replace(/\.md$/, '')))
    .filter((p): p is Pieza => p !== null)
    .sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999) || b.fecha.localeCompare(a.fecha));
}

export function leerPieza(carpeta: string, slug: string): Pieza | null {
  const fichero = path.join(RAIZ, carpeta, `${slug}.md`);
  if (!fs.existsSync(fichero)) return null;
  const { datos, cuerpo } = leerCabecera(fs.readFileSync(fichero, 'utf8'));
  const palabras = cuerpo.split(/\s+/).length;
  // Preguntas frecuentes: los ### dentro de la sección "## Preguntas frecuentes", para los datos estructurados.
  const faq: { pregunta: string; respuesta: string }[] = [];
  const seccion = cuerpo.split(/^## Preguntas frecuentes\s*$/m)[1];
  if (seccion) {
    const bloque = seccion.split(/^## /m)[0];
    for (const parte of bloque.split(/^### /m).slice(1)) {
      const [titulo, ...resto] = parte.split('\n');
      const respuesta = resto.join(' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_>`]/g, '').replace(/\s+/g, ' ').trim();
      if (titulo.trim() && respuesta) faq.push({ pregunta: titulo.trim(), respuesta });
    }
  }
  return {
    slug,
    titulo: datos.titulo ?? slug,
    descripcion: datos.descripcion ?? '',
    fecha: datos.fecha ?? '2026-10-23',
    actualizado: datos.actualizado,
    categoria: datos.categoria,
    video: datos.video,
    orden: datos.orden ? Number(datos.orden) : undefined,
    html: marked.parse(cuerpo, { async: false }) as string,
    minutos: Math.max(1, Math.round(palabras / 220)),
    faq,
  };
}
