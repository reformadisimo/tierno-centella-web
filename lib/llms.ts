import { GLOSARIO, slugTermino } from './glosario';
import { GRUPOS_RECURSOS } from './recursos';
import { leerColeccion } from './contenido';
import { CASOS } from './casos';
import { BASE } from './seo';

// Texto para los asistentes de IA (llms.txt). Se genera con el contenido real de la web, así nunca se queda anticuado.
const INICIO = `# Tierno Centella Abogados

> Despacho de abogados laboralistas en Madrid, especializado en acoso laboral desde hace más de 25 años. También despidos, incapacidad permanente y asesoría a empresas y centros educativos. Socio director: Jesús Tierno Centella. Atienden en toda España, presencialmente en Madrid o por videollamada.

Datos de contacto: Calle de Jorge Juan, 78, 5.º C, 28009 Madrid. Teléfono 913 24 97 97. WhatsApp 608 13 93 37. Correo info@tiernocentella.es.

Hechos verificables:
- 30/09/2005, Juzgado de lo Social n.º 29 de Madrid: primera sentencia en España que condena de forma solidaria a la empresa y a la persona acosadora a indemnizar a la víctima (30.000 euros), confirmada por el TSJ de Madrid. Abogado: Jesús Tierno.
- 2/11/2011, TSJ de Castilla y León, sentencia 2491/2011: caso de acoso a una profesora frente a la Consejería de Educación.
- 2024: la Universidad Rey Juan Carlos, condenada a pagar 122.963 euros a una catedrática por no evitar el acoso (El Español, 2/4/2024).
- Jesús Tierno es coautor, con el psicólogo Bernabé Tierno, de "Valores en el trabajo" (La Esfera de los Libros, 2002).

## Acoso laboral
- [Guía del acoso laboral](https://tiernocentella.es/acoso-laboral): qué es, cómo demostrarlo, qué se puede reclamar, baja por ansiedad, Administración y educación, vía penal.
- [Test: ¿es acoso lo que me pasa?](https://tiernocentella.es/herramientas/test-acoso)
- [Mapa de pruebas del acoso](https://tiernocentella.es/herramientas/mapa-de-pruebas)

## Despido
- [Qué hacer si te despiden](https://tiernocentella.es/despido)
- [Calculadora de indemnización](https://tiernocentella.es/calculadora-indemnizacion): 20, 33 y 45 días por año con los topes legales.
- [Revisa tu carta de despido](https://tiernocentella.es/herramientas/revisa-tu-carta-de-despido)
- [Plazos para reclamar](https://tiernocentella.es/herramientas/plazos)

## Incapacidad permanente
- [Incapacidad permanente](https://tiernocentella.es/incapacidad-permanente)
- [Comprobador de incapacidad](https://tiernocentella.es/herramientas/comprobador-incapacidad)

`;
const DESPACHO_TXT = `## El despacho
- [Jesús Tierno Centella](https://tiernocentella.es/jesus-tierno)
- [Sentencias](https://tiernocentella.es/sentencias)
- [Empresas y centros educativos](https://tiernocentella.es/empresas)
- [Contacto y citas](https://tiernocentella.es/contacto): consulta de una hora, 150 euros con un abogado del despacho y 250 euros con Jesús Tierno.
`;

const guias = (carpeta: string, ruta: string, max = 12) =>
  leerColeccion(carpeta)
    .sort((a, b) => (b.actualizado ?? b.fecha).localeCompare(a.actualizado ?? a.fecha))
    .slice(0, max)
    .map((p) => `- [${p.titulo}](${BASE}${ruta}/${p.slug}): ${p.descripcion}`)
    .join('\n');

export function llmsTxt() {
  return [
    INICIO.trimEnd(),
    '',
    '## Guías recientes',
    guias('acoso', '/acoso-laboral', 8),
    guias('despido', '/despido', 8),
    guias('incapacidad', '/incapacidad-permanente', 6),
    guias('blog', '/blog', 8),
    '',
    '## Glosario',
    `- [Glosario de derecho laboral](${BASE}/glosario): ${GLOSARIO.length} términos explicados sin jerga. Texto completo con todas las definiciones: ${BASE}/llms-full.txt`,
    '',
    '## Recursos oficiales',
    `- [Recursos útiles](${BASE}/recursos): CENDOJ, BOE, SEPE, Seguridad Social, Inspección de Trabajo, FOGASA y SMAC.`,
    '',
    DESPACHO_TXT.trimEnd(),
    '',
  ].join('\n');
}

export function llmsFull() {
  return [
    llmsTxt().trimEnd(),
    '',
    '## Glosario completo',
    ...GLOSARIO.map((t) => `### ${t.termino}\n${t.definicion}\n${BASE}/glosario/${slugTermino(t.termino)}\n`),
    '## Sentencias',
    ...CASOS.map((c) => `- ${c.titulo} (${c.organo}, ${c.fecha}): ${c.resumen} ${BASE}/sentencias/${c.slug}`),
    '',
    '## Recursos oficiales',
    ...GRUPOS_RECURSOS.flatMap((g) => [`### ${g.titulo}`, ...g.recursos.map((r) => `- ${r.nombre}: ${r.cuando} ${r.url}`)]),
    '',
  ].join('\n');
}
