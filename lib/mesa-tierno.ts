/* La mesa de control de Tierno Centella (demostración), sobre el modelo de la de Reformadísimo.
   Un solo sitio para los datos y los textos: la pantalla, el resumen por correo y "Pregúntale a la mesa"
   salen de aquí, así nunca dicen cosas distintas.
   Datos: lo público del despacho es real (nota y reseñas de Google, Instagram, posición en Google, visibilidad en IAs,
   el anuncio de otro despacho con su nombre); todo lo demás es inventado y lo dice la propia pantalla. */

export type Luz = 'verde' | 'ambar' | 'rojo' | 'gris' | 'azul';

/** Color y palabra de cada luz. Siempre las mismas palabras en toda la mesa. */
export const LUZ: Record<Luz, { c: string; t: string }> = {
  verde: { c: '#2f9a62', t: 'Todo bien' },
  ambar: { c: '#d68a1c', t: 'Mira esto' },
  rojo: { c: '#cf3f3a', t: 'Importante' },
  gris: { c: '#a7a39a', t: 'Sin datos aún' },
  azul: { c: '#1c8caa', t: 'Datos de tu negocio' },
};

export type Fila = { t: string; v: string; luz?: Luz; publico?: boolean };
export type Modulo = { id: string; titulo: string; que: string; luz: Luz; estado?: string; ver: string; conclusion: string; filas: Fila[]; enlaces: { t: string; href: string }[] };
export type Reloj = { t: string; v: string; frase: string; detalle: string; luz: Luz; ayuda: string };
export type Tarea = { id: string; texto: string; porque: string; donde: string; ir: string; boton: string };
export type Resumen = { titulo: string; puntos: string[] };
export type Mesa = { periodo: string; actualizado: string; fallos: string[]; resumen: Resumen; tareas: Tarea[]; modulos: Modulo[]; relojes: Reloj[] };

/** Los temas que se pueden elegir para el resumen por correo (clave, etiqueta). */
export const TEMAS_RESUMEN: [string, string][] = [
  ['hoy', 'Lo más importante hoy'],
  ['cifras', 'Las cuatro cifras'],
  ['web', 'La web'],
  ['dicen', 'Reputación e IA'],
  ['mercado', 'Competencia'],
  ['anuncios', 'Anuncios'],
  ['consultas', 'Consultas y plazos'],
];

/** La primera frase de un texto (sin lookbehind: Safari antiguo dejaría la mesa en blanco). */
export function primeraFrase(s: string): string {
  const i = s.search(/\.\s/);
  return i === -1 ? s : s.slice(0, i + 1);
}

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
/** Suma días hábiles (sin sábados ni domingos). */
function habiles(desde: Date, n: number) {
  const d = new Date(desde);
  let k = 0;
  while (k < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) k++;
  }
  return d;
}
const diaEnPalabras = (d: Date) => `${DIAS[d.getDay()]} ${d.getDate()}`;

export function mesaDemo(ahora = new Date()): Mesa {
  const hoy = new Date(ahora.toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));
  const p1 = diaEnPalabras(habiles(hoy, 2));
  const p2 = diaEnPalabras(habiles(hoy, 4));
  const fecha = `${hoy.getDate()} de ${MESES[hoy.getMonth()]}`;

  const modulos: Modulo[] = [
    {
      id: 'web', titulo: 'La web', que: 'Qué hace la gente en tu web y si todo funciona', luz: 'ambar', ver: 'Ver con la lupa',
      conclusion: '2 cosas de la web para mirar. La primera: en el blog casi nadie llega al final, solo el 2 %.',
      filas: [
        { t: 'Visitas con la lupa (28 días)', v: '521 visitas, 359 de ellas en el móvil · 1,4 páginas por visita' },
        { t: 'Para mirar 1', v: 'En el blog solo el 2 % llega al final de la página.', luz: 'ambar' },
        { t: 'Para mirar 2', v: 'En la portada, 9 toques en el sello de 2005, que parece un botón y no lo es.', luz: 'ambar' },
        { t: 'Lo que funciona', v: 'La calculadora de indemnización es la página que más consultas trae.', luz: 'verde' },
        { t: 'Sistemas', v: 'Todo al día: web, formularios, chat y lupa', luz: 'verde' },
      ],
      enlaces: [{ t: 'Ver con la lupa', href: '/guia-jesus/mapa-calor' }],
    },
    {
      id: 'dicen', titulo: 'Reputación e IA', que: 'Tus reseñas y qué dicen de ti las inteligencias artificiales', luz: 'rojo', ver: 'Ver las consultas',
      conclusion: 'Las reseñas se pueden mejorar (Google 4,2 con 59) y las IAs solo te nombran en 1 de 8 consultas revisadas.',
      filas: [
        { t: 'Google', v: '4,2 de 5 · 59 opiniones', publico: true },
        { t: 'Reseñas de una estrella sin contestar', v: '11. Te dejamos preparada una respuesta para cada una', luz: 'ambar', publico: true },
        { t: 'Espejo de la IA', v: 'Te nombran en 1 de 8 preguntas (revisado el lunes)', luz: 'rojo' },
        { t: 'Visibilidad en IAs (Semrush)', v: '14 sobre 100', publico: true },
        { t: '«abogado acoso laboral Madrid»', v: 'Sales, en el puesto 4', luz: 'verde' },
        { t: '«mejor abogado laboralista en Madrid»', v: 'No sales; salen otros 3 despachos', luz: 'rojo' },
        { t: 'Ficha de Google: veces que sale', v: '1.840 (+6 % frente a antes)' },
        { t: 'Instagram', v: '4.007 seguidores · 265 publicaciones', publico: true },
        { t: 'Qué haremos 1', v: 'Una guía nueva sobre acoso laboral, pensada para que las IAs la citen.' },
      ],
      enlaces: [],
    },
    {
      id: 'mercado', titulo: 'Competencia', que: 'Los cambios importantes de otros despachos', luz: 'ambar', ver: 'Ver cambios',
      conclusion: 'Hay un movimiento que merece una mirada: otro despacho se anuncia en Google cuando alguien busca tu nombre.',
      filas: [
        { t: 'Anuncio con tu nombre', v: 'Cuando alguien busca "jesus tierno centella", sale primero el anuncio de otro despacho. Se puede frenar con una campaña con tu nombre.', luz: 'ambar', publico: true },
        { t: 'En Google: «abogado laboralista madrid»', v: 'Puesto 18, en la segunda página', publico: true },
        { t: 'En Google: «abogado acoso laboral madrid»', v: 'Puesto 7 (antes 9)' },
        { t: 'Otro despacho de Madrid', v: 'Ha publicado una calculadora de despido. No hace falta reaccionar: la tuya ya está.', luz: 'verde' },
      ],
      enlaces: [],
    },
    {
      id: 'anuncios', titulo: 'Anuncios', que: 'Cuántas consultas llegan por anuncios y cuánto cuestan', luz: 'ambar', estado: 'Medición incompleta', ver: 'Revisar medición',
      conclusion: 'Se han invertido 620 €, pero todavía no podemos asignar con seguridad todas las consultas a sus campañas.',
      filas: [
        { t: 'Qué falta', v: 'Que cada llamada y cada formulario guarden de qué anuncio vienen. Hasta entonces, no pausar campañas solo por estas cifras.', luz: 'ambar' },
        { t: 'Consultas sin origen identificado', v: '9 de las 15 que cuenta Google (60 de cada 100)', luz: 'ambar' },
        { t: 'Invertido en anuncios', v: '620 €' },
        { t: 'Coste por consulta según Google', v: '41 €' },
        { t: 'Google · Acoso laboral', v: '380 € · 11 consultas · 35 € cada una', luz: 'verde' },
        { t: 'Google · Despido', v: '240 € · 4 consultas · 60 € cada una', luz: 'ambar' },
      ],
      enlaces: [],
    },
    {
      id: 'consultas', titulo: 'Consultas y plazos', que: 'Tus consultas, primeras consultas y plazos, del CRM', luz: 'azul', estado: 'En curso', ver: 'Ver los plazos',
      conclusion: `Han llegado 34 consultas: 12 pidieron una primera consulta y 5 son ya casos. 2 plazos de despido vencen esta semana.`,
      filas: [
        { t: 'Consultas (CRM)', v: '34 consultas · 12 primeras consultas · 5 casos' },
        { t: 'Plazo que vence', v: `Despido (consulta del día 6): 20 días hábiles, vence el ${p1}`, luz: 'rojo' },
        { t: 'Plazo que vence', v: `Despido (consulta del día 9): 20 días hábiles, vence el ${p2}`, luz: 'ambar' },
        { t: 'Seguimientos atrasados', v: '6 consultas tienen la fecha de seguimiento pasada', luz: 'azul' },
        { t: 'Llegan por la calculadora', v: '11 consultas, 5 primeras consultas' },
        { t: 'Llegan por el chat', v: '8 consultas, 3 primeras consultas' },
        { t: 'Llegan por Google sin pagar', v: '9 consultas, 3 primeras consultas' },
        { t: 'Llegan por anuncios', v: '6 consultas, 1 primera consulta' },
        { t: 'Coste por caso', v: 'Se activa cuando el CRM tenga más casos cerrados', luz: 'azul' },
      ],
      enlaces: [{ t: 'Abrir el CRM', href: '/guia-jesus/crm' }],
    },
  ];

  const tareas: Tarea[] = [
    { id: 'plazos', texto: 'Revisa los 2 plazos de despido que vencen esta semana', porque: `En el CRM hay dos consultas de despido con el plazo de 20 días hábiles a punto de cumplirse: el ${p1} y el ${p2}.`, donde: 'Consultas y plazos', ir: 'consultas', boton: 'Ver los plazos' },
    { id: 'resenas', texto: 'Contesta las reseñas de una estrella', porque: 'Hay 11 sin contestar. Te dejamos preparada una respuesta para cada una: solo tienes que revisarla.', donde: 'Reputación e IA', ir: 'dicen', boton: 'Ver las reseñas' },
    { id: 'medicion', texto: 'Completar la medición de los anuncios', porque: 'De las 15 consultas que Google atribuye a los anuncios, 9 no tienen un origen claro. Hasta tenerlo, no conviene pausar ninguna campaña.', donde: 'Anuncios', ir: 'anuncios', boton: 'Ver qué falta conectar' },
    { id: 'marca', texto: 'Proteger tu nombre en Google', porque: 'Otro despacho sale anunciado cuando alguien busca "jesus tierno centella". Una campaña con tu nombre cuesta muy poco.', donde: 'Competencia', ir: 'mercado', boton: 'Ver el cambio' },
    { id: 'blog', texto: 'Acortar el blog y subir lo importante', porque: 'Solo el 2 % llega al final de la página.', donde: 'La web', ir: 'web', boton: 'Ver con la lupa' },
  ];

  const relojes: Reloj[] = [
    { t: 'Consultas', v: '34', frase: '34 personas te han escrito o llamado', detalle: '12 % más que en los 28 días anteriores.', luz: 'verde', ayuda: 'Personas distintas que han llamado, escrito por WhatsApp, rellenado un formulario o dejado su teléfono en el chat. Una misma persona solo cuenta una vez al día.' },
    { t: 'Piden la primera consulta', v: '35 %', frase: '12 pidieron una primera consulta', detalle: 'Son 35 de cada 100 consultas.', luz: 'verde', ayuda: 'De cada 100 personas que te contactan, cuántas reservan la primera consulta de una hora. Más de 30 de cada 100 está bien.' },
    { t: 'Coste por consulta', v: '41 €', frase: '41 € por consulta de anuncio', detalle: 'Antes no lo medíamos, y la medición todavía está incompleta.', luz: 'ambar', ayuda: 'El dinero gastado en anuncios dividido entre las consultas que han traído. Cuanto más bajo, mejor.' },
    { t: 'Nota en Google', v: '4,2', frase: 'Tus clientes te valoran con un 4,2', detalle: 'Sobre 5, con 59 reseñas de Google.', luz: 'ambar', ayuda: 'La valoración media que han dejado tus clientes en Google, sobre 5. Por encima de 4,5 es muy buena.' },
  ];

  const resumen: Resumen = {
    titulo: 'Hay dos cosas que requieren atención',
    puntos: [`Dos plazos de despido vencen esta semana: el ${p1} y el ${p2}.`, 'Las inteligencias artificiales solo te nombran en 1 de las 8 consultas revisadas esta semana.'],
  };

  return {
    periodo: 'Últimos 28 días, comparado con los 28 anteriores',
    actualizado: fecha,
    fallos: ['Instagram no se ha podido leer hoy: sus cifras son de ayer.'],
    resumen,
    tareas,
    modulos,
    relojes,
  };
}

/** El resumen por correo, con los mismos textos que la pantalla. Devuelve HTML sencillo (estilos en línea). */
export function correoResumen(m: Mesa, temas: string[]) {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const punto = (c: string) => `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${c};margin-right:8px"></span>`;
  const partes: string[] = [];
  partes.push(`<p style="margin:0 0 4px;font-size:12px;font-weight:bold;letter-spacing:1px;color:#5c6f82">TIERNO CENTELLA · MESA DE CONTROL · ${esc(m.actualizado.toUpperCase())}</p>`);
  partes.push(`<h2 style="margin:0 0 8px;font-size:20px;color:#0d2c48">${esc(m.resumen.titulo)}</h2>`);
  partes.push(`<ul style="margin:0 0 16px;padding-left:18px">${m.resumen.puntos.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`);
  if (temas.includes('hoy')) partes.push(`<div style="border:2px solid #f2c14e;border-radius:12px;padding:12px 14px;margin:0 0 16px"><b>Lo primero que haría hoy:</b> ${esc(m.tareas[0].texto)}.<br><span style="color:#5c6f82">${esc(m.tareas[0].porque)}</span></div>`);
  if (temas.includes('cifras')) partes.push(`<p style="margin:0 0 6px"><b>Las cuatro cifras</b></p><ul style="margin:0 0 16px;padding-left:18px">${m.relojes.map((r) => `<li>${esc(r.frase)}. <span style="color:#5c6f82">${esc(r.detalle)}</span></li>`).join('')}</ul>`);
  for (const mod of m.modulos) if (temas.includes(mod.id)) partes.push(`<p style="margin:0 0 4px">${punto(LUZ[mod.luz].c)}<b>${esc(mod.titulo)}</b> · <span style="color:${LUZ[mod.luz].c}">${esc(mod.estado ?? LUZ[mod.luz].t)}</span></p><p style="margin:0 0 14px;color:#3b5168">${esc(mod.conclusion)}</p>`);
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#0d2c48;max-width:560px">${partes.join('')}</div>`;
}

/** Los datos en limpio para "Pregúntale a la mesa". */
export function datosParaPreguntar(m: Mesa) {
  return {
    periodo: m.periodo,
    aviso: 'Demostración: lo público del despacho es real (nota y reseñas de Google, Instagram, posiciones en Google, visibilidad en IAs, el anuncio de otro despacho con su nombre); el resto son cifras de ejemplo.',
    resumen_de_hoy: m.resumen,
    que_hacer_hoy: m.tareas.map((t) => ({ tarea: t.texto, porque: t.porque, donde: t.donde })),
    cifras: m.relojes.map((r) => ({ cifra: r.t, valor: r.v, en_palabras: `${r.frase}. ${r.detalle}` })),
    partes: m.modulos.map((x) => ({ parte: x.titulo, estado: x.estado ?? LUZ[x.luz].t, conclusion: x.conclusion, detalle: x.filas.map((f) => `${f.t}: ${f.v}`) })),
    fuentes_con_fallo: m.fallos,
  };
}
