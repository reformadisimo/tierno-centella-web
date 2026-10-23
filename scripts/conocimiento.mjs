// Genera lib/conocimiento.generado.ts con un resumen de toda la web para el asistente:
// título, idea principal y preguntas frecuentes de cada guía y artículo.
import fs from 'node:fs';
import path from 'node:path';

const RAIZ = path.join(process.cwd(), 'content');
const RUTAS = { acoso: '/acoso-laboral/', despido: '/despido/', incapacidad: '/incapacidad-permanente/', mujer: '/mujer-y-trabajo/', blog: '/blog/' };

const limpiar = (s) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_>`#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

let salida = '';
for (const [carpeta, ruta] of Object.entries(RUTAS)) {
  const dir = path.join(RAIZ, carpeta);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md')).sort()) {
    const texto = fs.readFileSync(path.join(dir, f), 'utf8');
    const m = texto.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) continue;
    const datos = Object.fromEntries(
      m[1]
        .split('\n')
        .map((l) => [l.slice(0, l.indexOf(':')).trim(), l.slice(l.indexOf(':') + 1).trim()])
        .filter(([k]) => k),
    );
    const cuerpo = m[2];
    // Texto completo de cada pieza: encabezados como líneas propias, enlaces conservando la ruta para que el asistente pueda citarla.
    const completo = cuerpo
      .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, '$1 ($2)')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/^#{2,4}\s*/gm, '> ')
      .replace(/^>\s?/gm, '')
      .replace(/[*_`]/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    salida += `=== ${datos.titulo} (${ruta}${f.replace(/\.md$/, '')}) ===\n${completo}\n\n`;
  }
}

fs.writeFileSync(
  path.join(process.cwd(), 'lib/conocimiento.generado.ts'),
  `// Archivo generado por scripts/conocimiento.mjs. No editar a mano.\nexport const CONOCIMIENTO = ${JSON.stringify(salida)};\n`,
);
console.log(`Conocimiento del asistente: ${salida.length} caracteres.`);
