import { GLOSARIO, slugTermino } from './glosario';

// Enlaza, dentro del HTML de una guía, la primera aparición de cada término del glosario a su página.
// Solo toca texto dentro de párrafos y listas; no toca titulares, enlaces ni nada que ya esté enlazado.

const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const esc = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

type Variante = { texto: string; slug: string; definicion: string; sigla: boolean };

// Variantes que aparecen en el texto: sin paréntesis y separadas por " o ".
const VARIANTES: Variante[] = GLOSARIO.flatMap((t) => {
  const slug = slugTermino(t.termino);
  const base = t.termino.replace(/\s*\(([^)]*)\)\s*/g, ' ').trim();
  const dentro = (t.termino.match(/\(([^)]*)\)/) ?? [])[1];
  const partes = [...base.split(/\s+o\s+/), ...(dentro && /^[A-Z]{2,6}$/.test(dentro) ? [dentro] : [])];
  return partes.map((p) => ({ texto: p.trim(), slug, definicion: t.definicion, sigla: /^[A-Z]{2,6}$/.test(p.trim()) }));
}).filter((v) => v.texto.length >= 3 && v.texto.toLowerCase() !== 'acoso laboral' || v.texto === 'Acoso laboral');

const largas = VARIANTES.filter((v) => !v.sigla).sort((a, b) => b.texto.length - a.texto.length);
const siglas = VARIANTES.filter((v) => v.sigla);
const patron = new RegExp(
  `(?<![\\p{L}\\p{N}])(?:${[
    ...largas.map((v) => `(?<l>${esc(v.texto).replace(/\\ /g, '\\s+')})(?:s|es)?`),
  ].join('|').replace(/\(\?<l>/g, '(?:')}|(?<s>${siglas.map((v) => esc(v.texto)).join('|')}))(?![\\p{L}\\p{N}])`,
  'giu',
);

const corta = (t: string) => (t.length <= 150 ? t : t.slice(0, t.lastIndexOf(' ', 147)) + '...').replace(/"/g, '&quot;');

export function enlazarGlosario(html: string, max = 6): string {
  const usados = new Set<string>();
  let total = 0;
  let profundidad = { a: 0, h: 0, bloque: 0 };
  return html
    .split(/(<[^>]+>)/)
    .map((trozo) => {
      if (trozo.startsWith('<')) {
        const m = trozo.match(/^<(\/)?([a-z0-9]+)/i);
        if (m) {
          const cierra = !!m[1];
          const t = m[2].toLowerCase();
          const d = cierra ? -1 : 1;
          if (t === 'a') profundidad.a += d;
          else if (/^h[1-6]$/.test(t)) profundidad.h += d;
          else if (t === 'p' || t === 'li' || t === 'td') profundidad.bloque += d;
        }
        return trozo;
      }
      if (total >= max || profundidad.a > 0 || profundidad.h > 0 || profundidad.bloque <= 0) return trozo;
      return trozo.replace(patron, (coincidencia, ...resto) => {
        if (total >= max) return coincidencia;
        const n = norm(coincidencia).replace(/\s+/g, ' ');
        const v =
          VARIANTES.find((x) => (x.sigla ? x.texto === coincidencia : norm(x.texto) === n || norm(x.texto) + 's' === n || norm(x.texto) + 'es' === n)) ?? null;
        if (!v || usados.has(v.slug)) return coincidencia;
        if (v.sigla && coincidencia !== v.texto) return coincidencia;
        usados.add(v.slug);
        total++;
        return `<a class="enlace-glosario" href="/glosario/${v.slug}" title="${corta(v.definicion)}">${coincidencia}</a>`;
      });
    })
    .join('');
}
