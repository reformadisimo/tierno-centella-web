// Genera lib/traducciones.generado.ts: qué guías tienen ya versión en inglés (según la línea "es:" de content/en).
import fs from 'node:fs';
import path from 'node:path';

const AREAS = { acoso: ['/acoso-laboral', '/en/workplace-harassment'], despido: ['/despido', '/en/dismissal'], incapacidad: ['/incapacidad-permanente', '/en/permanent-disability'], mujer: ['/mujer-y-trabajo', '/en/women-at-work'], blog: ['/blog', '/en/blog'] };
const pares = {};
for (const [carpeta, [es, en]] of Object.entries(AREAS)) {
  const dir = path.join(process.cwd(), 'content', 'en', carpeta);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const m = fs.readFileSync(path.join(dir, f), 'utf8').match(/^es:\s*(\S+)\s*$/m);
    if (m) pares[`${es}/${m[1]}`] = `${en}/${f.replace(/\.md$/, '')}`;
  }
}
fs.writeFileSync(
  path.join(process.cwd(), 'lib', 'traducciones.generado.ts'),
  `// Archivo generado por scripts/traducciones.mjs. No editar a mano.\nexport const GUIAS_TRADUCIDAS: Record<string, string> = ${JSON.stringify(pares, null, 2)};\n`,
);
console.log(`Guías traducidas: ${Object.keys(pares).length}`);
