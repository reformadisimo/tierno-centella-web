// Kit "dar vida" (28-oct-2026, a partir del de Casiopea 360 y adaptado a un despacho): iconos por texto, chips de color
// girados y colores sobrios del despacho (sin rosas ni violetas). Solo pintura: ningún texto cambia de sentido.

/** Iconos como trazos SVG de 24x24 (sin relleno, trazo redondeado). */
export const ICONO_VIDA: Record<string, string> = {
  estrella: 'M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z',
  lupa: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5',
  reloj: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  euro: 'M17 6a7 7 0 1 0 0 12M4 10h9M4 14h9',
  grafica: 'M4 20h16M4 4v16M8 16v-5M12 16V8M16 16v-3M20 16V6',
  pagina: 'M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 15h7M9 18h4',
  diana: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2',
  video: 'M3 6h12v12H3zM15 10l6-3v10l-6-3',
  chat: 'M4 5h16v11H9l-5 4zM8 10h.01M12 10h.01M16 10h.01',
  persona: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21a8 8 0 0 1 16 0',
  escudo: 'M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6zM9 12l2 2 4-4',
  cohete: 'M12 2c3 2 5 6 5 11l-5 4-5-4c0-5 2-9 5-11zM12 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM7 13l-3 3h4M17 13l3 3h-4',
  bombilla: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  balanza: 'M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0zM8 21h8',
  calendario: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M8 14h2M12 14h2M8 17h2',
  telefono: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  mapa: 'M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14',
  regalo: 'M4 10h16v4H4zM6 14h12v7H6zM12 10v11M12 10c-2 0-4-1-4-3s3-2 4 3c1-5 4-5 4-3s-2 3-4 3',
  corazon: 'M12 20.5 4.5 13a4.5 4.5 0 0 1 6.4-6.4L12 7.7l1.1-1.1a4.5 4.5 0 0 1 6.4 6.4z',
  documento: 'M6 3h9l4 4v14H6zM9 9h3M9 13h7M9 17h7',
  caja: 'M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8',
  check: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 12l3 3 5-6',
  libro: 'M2 4h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z',
  campana: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4',
  globo: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
  mano: 'M8 13V5a1.5 1.5 0 0 1 3 0v6M11 11V4a1.5 1.5 0 0 1 3 0v7M14 11V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L3.6 14a1.5 1.5 0 0 1 2.4-1.8L8 14',
  rayo: 'M13 2 4.5 13.5H12L11 22l8.5-11.5H12z',
  candado: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4M12 15v2',
};

/** Elige un icono por lo que dice un título o una etiqueta. */
export function iconoPorTexto(t: string, i = 0): string {
  const x = t.toLowerCase();
  const reglas: [RegExp, string][] = [
    [/rese[ñn]a|opini|estrella/, 'estrella'],
    [/google|\bseo\b|busca|encuentr|lupa|\bia\b|las ia|chatgpt/, 'lupa'],
    [/plazo|tiempo|reuni|rápid|rapid|minuto|\bhoras?\b|\bd[ií]as?\b|cuándo|cuando|velocidad|crucero|calendario|semana/, 'reloj'],
    [/precio|coste|cuesta|cuota|euro|factur|comisi|cobr|pagar|indemniz|salario|sueldo|finiquito|paro|fogasa|dinero/, 'euro'],
    [/panel|dato|informe|\bmedi[rd]|control|resultado|cifra|número|numero/, 'grafica'],
    [/sentencia|juzgado|juicio|tribunal|supremo|ley|derecho|abogad/, 'balanza'],
    [/acoso|mobbing|protec|seguridad|garant|compromiso|confidencia|tuyo|privad/, 'escudo'],
    [/despid|carta|documento|escrito|papeleta|contrato/, 'documento'],
    [/web|landing|página|pagina|blog|artícul|articul|prueba a\/b/, 'pagina'],
    [/anuncio|campaña|publicidad|ads/, 'diana'],
    [/redes|vídeo|video|instagram|linkedin|facebook|\bx\b/, 'video'],
    [/asistente|chat|pregunt|duda|test/, 'chat'],
    [/equipo|quién|quien|nosotros|jesús|jesus|persona|cliente/, 'persona'],
    [/incapacidad|baja|salud|médic|medic|enferm/, 'corazon'],
    [/empez|paso|cómo|como|arranc|plan/, 'cohete'],
    [/miedo|cambio|idea|consejo/, 'bombilla'],
    [/incluido|gratis|regalo/, 'regalo'],
    [/ficha|mapa|madrid|dónde|donde/, 'mapa'],
    [/teléfono|telefono|llamar|whatsapp|correo|contact/, 'telefono'],
    [/mujer|embaraz|madre|familia|permiso/, 'corazon'],
    [/aviso|novedad/, 'campana'],
    [/libro|glosario|palabra/, 'libro'],
    [/otros países|paises|mundo|inglés|ingles/, 'globo'],
  ];
  for (const [re, ic] of reglas) if (re.test(x)) return ic;
  return ['estrella', 'cohete', 'bombilla', 'check', 'mano', 'regalo'][i % 6];
}

/** Svg de un icono como texto HTML (para el HTML que sale del Markdown). */
export const svgIcono = (nombre: string, tam = 20, grosor = 2.1) =>
  `<svg viewBox="0 0 24 24" width="${tam}" height="${tam}" fill="none" stroke="currentColor" stroke-width="${grosor}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICONO_VIDA[nombre] ?? ICONO_VIDA.estrella}"/></svg>`;

/**
 * Da vida al HTML que sale del Markdown: cada h2 y h3 lleva delante un chip de color con su icono.
 * Las listas, los pasos numerados y los recuadros se pintan solo con CSS (clases .prosa > ul, ol y blockquote).
 * No cambia ningún texto ni ningún id (los enlaces a apartados siguen funcionando).
 */
export function darVida(html: string, semilla = 0): string {
  let n = semilla;
  return fichasMovil(html).replace(/<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/g, (todo, h: string, attrs: string, dentro: string) => {
    if (/chip-vivo|glosario-letra/.test(todo)) return todo;
    const texto = dentro.replace(/<[^>]+>/g, '');
    const i = n++;
    const clase = /class="/.test(attrs) ? attrs.replace(/class="/, 'class="tv ') : `${attrs} class="tv"`;
    return `<${h}${clase}><span class="chip-vivo cv-${i % 6}" aria-hidden="true">${svgIcono(iconoPorTexto(texto, i), h === 'h2' ? 20 : 17)}</span><span class="tv-texto">${dentro}</span></${h}>`;
  });
}

/**
 * Tablas de 3 o más columnas: en el móvil se leen como fichas (una por fila), con el nombre de cada columna encima del dato.
 * Solo añade la clase tabla-fichas y un data-label a cada celda; en el ordenador la tabla se ve igual.
 */
export function fichasMovil(html: string): string {
  return html.replace(/<table([^>]*)>([\s\S]*?)<\/table>/g, (todo, attrs: string, dentro: string) => {
    const cab = [...(dentro.match(/<thead>[\s\S]*?<\/thead>/)?.[0] ?? '').matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').replace(/"/g, '&quot;').trim());
    if (cab.length < 3 || /tabla-fichas/.test(attrs)) return todo;
    const cuerpo = dentro.replace(/<tr>([\s\S]*?)<\/tr>/g, (fila, celdas: string) => {
      if (/<th/.test(celdas)) return fila;
      let i = 0;
      return `<tr>${celdas.replace(/<td([^>]*)>/g, (_t, a: string) => `<td${a} data-label="${cab[i++] ?? ''}">`)}</tr>`;
    });
    const clase = /class="/.test(attrs) ? attrs.replace(/class="/, 'class="tabla-fichas ') : `${attrs} class="tabla-fichas"`;
    return `<table${clase}>${cuerpo}</table>`;
  });
}
