// Hace clicable la guía de Jesús: cada herramienta, página de la web, competidor, red o apartado que se nombra lleva a su sitio.
// Se aplica al HTML ya generado, solo al texto que no está ya dentro de un enlace ni de un título.

const WEB: [string, string][] = [
  // Herramientas
  ['¿Es acoso lo que me pasa?', '/herramientas/test-acoso'],
  ['Mapa de pruebas del acoso', '/herramientas/mapa-de-pruebas'],
  ['mapa de pruebas', '/herramientas/mapa-de-pruebas'],
  ['¿Mi despido puede ser nulo?', '/herramientas/test-nulidad'],
  ['¿Puedo irme con indemnización?', '/herramientas/test-extincion'],
  ['¿Mi baja es accidente de trabajo?', '/herramientas/test-baja-laboral'],
  ['Calculadora de indemnización', '/calculadora-indemnizacion'],
  ['calculadora de despido', '/calculadora-indemnizacion'],
  ['Calculadora de finiquito', '/herramientas/calculadora-finiquito'],
  ['Calculadora del paro', '/herramientas/calculadora-paro'],
  ['Calculadora de la baja', '/herramientas/calculadora-baja-laboral'],
  ['Calculadora de salarios impagados', '/herramientas/calculadora-salarios-impagados'],
  ['Calculadora del FOGASA', '/herramientas/calculadora-fogasa'],
  ['Calendario de permisos por nacimiento', '/herramientas/calendario-permisos'],
  ['Calculadora de reducción de jornada', '/herramientas/calculadora-reduccion-jornada'],
  ['Revisa tu carta de despido', '/herramientas/revisa-tu-carta-de-despido'],
  ['Plazos para reclamar', '/herramientas/plazos'],
  ['Comprobador de incapacidad', '/herramientas/comprobador-incapacidad'],
  ['comprobador de incapacidad', '/herramientas/comprobador-incapacidad'],
  ['Autodiagnóstico para empresas y colegios', '/herramientas/autodiagnostico-acoso-empresas'],
  ['test de acoso', '/herramientas/test-acoso'],
  ['18 herramientas', '/herramientas'],
  // Secciones de la web
  ['Mujer y trabajo', '/mujer-y-trabajo'],
  ['Redes y medios', '/redes-y-medios'],
  ['Preguntas frecuentes', '/preguntas-frecuentes'],
  ['Empresas y colegios', '/empresas'],
  ['Un minuto para entender tus derechos', '/'],
  ['26 artículos', '/blog'],
  ['Ley 2/2025', '/blog/ley-2-2025-incapacidad-permanente-ya-no-extingue-el-contrato'],
  ['audiencia previa antes del despido disciplinario', '/blog/audiencia-previa-despido-disciplinario'],
  // Sentencias del despacho
  ['la sentencia de 2005', '/sentencias/primera-condena-al-acosador-2005'],
  ['TSJ de Castilla y León en 2011', '/sentencias/acoso-administracion-educativa-castilla-y-leon-2011'],
  ['Universidad Rey Juan Carlos', '/sentencias/urjc-123000-euros-docente-2024'],
  // Competidores y otras webs
  ['García de la Santa', 'https://garciadelasantaabogados.es/'],
  ['Abogados Durán', 'https://abogadosduran.com/'],
  ['Pedraza Laboral', 'https://pedrazalaboral.com/'],
  ['Labormind', 'https://labormind.net/'],
  ['Jover Marben', 'https://jovermarben.com/'],
  ['Madrid-Laboral', 'https://madrid-laboral.es/'],
  ['Bufete Toro', 'https://www.bufetetoro.com/'],
  ['Campmany Abogados', 'https://campmanyabogados.com/'],
  ['Campmany', 'https://campmanyabogados.com/'],
  ['Law&amp;Trends', 'https://www.lawandtrends.com/'],
  ['PayFit', 'https://payfit.com/es/'],
  ['acoso-laboral.es', 'https://acoso-laboral.es/'],
  ['abogadolaboralmadrid.com', 'https://abogadolaboralmadrid.com/'],
  ['abogadoincapacidadpermanente.com', 'https://abogadoincapacidadpermanente.com/'],
  ['abogadoespecializadoenacosolaboral.com', 'https://abogadoespecializadoenacosolaboral.com/'],
  ['acosomoral.es', 'http://acosomoral.es/'],
  ['elAbogado.com', 'https://www.elabogado.com/'],
  ['El Español', 'https://www.elespanol.com/reportajes/20240402/universidad-rey-juan-carlos-condenada-pagar-eur-docente-no-evitar-acoso-laboral/844415900_0.html'],
  // Herramientas de medición y redes
  ['PageSpeed Insights', 'https://pagespeed.web.dev/analysis?url=https%3A%2F%2Ftiernocentella.es%2F'],
  ['Pingdom', 'https://tools.pingdom.com/'],
  ['Semrush Pro', 'https://www.semrush.com/'],
  ['Perfil de Empresa de Google', 'https://www.google.com/maps/place/Tierno+Centella+Abogados/'],
  ['59 reseñas de Google', 'https://www.google.com/maps/place/Tierno+Centella+Abogados/'],
  ['4.007 seguidores en Instagram', 'https://www.instagram.com/tiernocentella_abogados/'],
  ['2.371 en tu LinkedIn personal', 'https://www.linkedin.com/in/jes%C3%BAs-tierno-centella-13ba92188/'],
  ['285 en Facebook', 'https://www.facebook.com/TiernoCentellaAbogados/'],
  ['la página activa de Facebook', 'https://www.facebook.com/TiernoCentellaAbogados/'],
  ['la página antigua de Facebook', 'https://www.facebook.com/tiernocentella/'],
  ['TIERNO CENTELLA ABOGADOS (80 seguidores)', 'https://www.linkedin.com/company/tierno-centella-abogados/'],
  ['Tierno Centella (224 seguidores)', 'https://www.linkedin.com/company/tierno-centella-tc/'],
  ['Tierno Centella Abogados (154 seguidores)', 'https://www.linkedin.com/company/tierno-centella-abogados-contacto/'],
  ['tu perfil personal de LinkedIn', 'https://www.linkedin.com/in/jes%C3%BAs-tierno-centella-13ba92188/'],
  ['Así quedarían tu Facebook y tu LinkedIn', '/guia-jesus/redes'],
  ['tu web actual', 'https://tiernocentella.es/'],
  ['Biblioteca de anuncios de Meta', 'https://www.facebook.com/ads/library/'],
];

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const ORDEN = [...WEB].sort((a, b) => b[0].length - a[0].length);
const MAPA = new Map(ORDEN.map(([t, u]) => [t, u]));
// Que la palabra no esté pegada a otra letra (para no enlazar "Campmany" dentro de otra palabra).
const RE = new RegExp(`(?<![\\p{L}\\p{N}])(${ORDEN.map(([t]) => esc(t)).join('|')})(?![\\p{L}\\p{N}])`, 'gu');

function enlace(href: string, texto: string) {
  const fuera = !href.startsWith('#');
  return `<a href="${href}"${fuera ? ' target="_blank" rel="noopener"' : ''}>${texto}</a>`;
}

/** claves: "8 bis" -> id del apartado */
export function enlazarGuia(html: string, claves: Record<string, string>, propio: string): string {
  const num = '(\\d+(?: bis| ter)?)';
  const reApartado = new RegExp(`(apartados? )${num}((?:(?:, | y )${num})*)`, 'g');
  const trozos = html.split(/(<[^>]+>)/);
  let dentroA = 0;
  let dentroTitulo = 0;
  return trozos
    .map((t) => {
      if (t.startsWith('<')) {
        if (/^<a[\s>]/.test(t)) dentroA++;
        else if (/^<\/a>/.test(t)) dentroA = Math.max(0, dentroA - 1);
        else if (/^<h[1-3][\s>]/.test(t)) dentroTitulo++;
        else if (/^<\/h[1-3]>/.test(t)) dentroTitulo = Math.max(0, dentroTitulo - 1);
        return t;
      }
      if (dentroA || dentroTitulo || !t.trim()) return t;
      let s = t;
      // Apartados: "apartado 17", "apartados 5 y 13", "apartado 18 ter"
      s = s.replace(reApartado, (m, pre: string, n1: string, resto: string) => {
        const uno = claves[n1] && claves[n1] !== propio ? enlace(`#${claves[n1]}`, n1) : n1;
        const mas = resto.replace(new RegExp(num, 'g'), (n: string) => (claves[n] && claves[n] !== propio ? enlace(`#${claves[n]}`, n) : n));
        return pre + uno + mas;
      });
      // Preguntas del cuestionario: "pregunta 34"
      s = s.replace(/(preguntas? )(\d{1,2})(?!\d)/g, (m, pre: string, n: string) => pre + enlace(`#pregunta-${n}`, n));
      // Nombres: solo en los trozos que no acabamos de convertir en enlace
      return s
        .split(/(<a [^>]*>[^<]*<\/a>)/)
        .map((p) => (p.startsWith('<a ') ? p : p.replace(RE, (m) => enlace(MAPA.get(m)!, m))))
        .join('');
    })
    .join('');
}
