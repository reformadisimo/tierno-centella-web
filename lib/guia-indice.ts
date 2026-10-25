import fs from 'node:fs';
import path from 'node:path';

// El índice de la guía (id y título de cada apartado, en orden), sacado del mismo markdown que pinta la guía.
// Lo usa la lupa para saber qué apartados existen y cuáles no ha visto nadie todavía.
export type ApartadoGuia = { id: string; titulo: string; clave: string };

export const idDeTitulo = (t: string) =>
  t
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function indiceGuia(): ApartadoGuia[] {
  const md = fs.readFileSync(path.join(process.cwd(), 'content/guia/guia-jesus.md'), 'utf8');
  return md
    .split(/^## /m)
    .filter((b) => b.trim())
    .map((b) => {
      const titulo = b.split('\n')[0].trim();
      return { id: idDeTitulo(titulo), titulo, clave: titulo.match(/^(\d+(?: bis| ter)?)\./)?.[1] ?? 'inicio' };
    });
}
