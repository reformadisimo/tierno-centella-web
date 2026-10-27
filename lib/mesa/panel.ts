import { datosDemo, detalleDemo } from "@/lib/mesa/demo";
import type { Modulo, Reloj, Tarea, Resumen, Luz } from "@/lib/mesa/tipos";

/* El cerebro de la mesa de DEMOSTRACIÓN de Tierno Centella (sobre lib/panelCliente.ts de Reformadísimo, el modelo):
   convierte los datos de ejemplo de los últimos 28 días en las cinco partes, las cuatro cifras, las tareas y la
   conclusión del día. Las cifras salen de los mismos datos que la vista completa, así que siempre cuadran.
   Lo público del despacho es real (Google 4,2 con 59 reseñas, 11 de una estrella sin contestar, Instagram,
   puesto 18 en "abogado laboralista madrid", 14 sobre 100 en IAs según Semrush, el anuncio de otro despacho con su nombre). */

const nf = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0, useGrouping: "always" } as Intl.NumberFormatOptions);
const num = (n: number) => nf.format(Math.round(n));
const eur = (n: number) => `${num(n)} €`;
const variacion = (a: number, b: number) => (b ? Math.round(((a - b) / b) * 100) : null);
const conSigno = (p: number | null) => (p === null ? "sin datos antes" : `${p > 0 ? "+" : ""}${p} % frente a antes`);
const pl = (n: number, uno: string, varios: string) => `${num(n)} ${n === 1 ? uno : varios}`;

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const dMas = (s: string, n: number) => { const d = new Date(`${s}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
/** Suma días hábiles (sin sábados ni domingos): el plazo de un despido son 20 días hábiles. */
function habiles(desde: string, n: number) {
  let d = desde, k = 0;
  while (k < n) { d = dMas(d, 1); const w = new Date(`${d}T12:00:00Z`).getUTCDay(); if (w !== 0 && w !== 6) k++; }
  return d;
}
const enPalabras = (s: string) => { const d = new Date(`${s}T12:00:00Z`); return `${DIAS[d.getUTCDay()]} ${d.getUTCDate()}`; };

export function hoyMadrid() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(new Date());
}

export function panelDemo(hoy = hoyMadrid()) {
  const d = datosDemo(hoy) as unknown as {
    web: Record<string, { peticiones: number; visitas: number; whatsapp: number; llamadas: number; porCanal: Record<string, number> }>;
    anuncios: { diario: [string, string, string, number, number, number, number][] };
  };
  const a: [string, string] = [dMas(hoy, -28), dMas(hoy, -1)];
  const b: [string, string] = [dMas(hoy, -56), dMas(hoy, -29)];
  const suma = (r: [string, string]) => {
    const t = { contactos: 0, visitas: 0, wa: 0, coste: 0, conv: 0, deAnuncio: 0, sinOrigen: 0 };
    for (let x = r[0]; x <= r[1]; x = dMas(x, 1)) {
      const w = d.web[x];
      if (!w) continue;
      t.contactos += w.peticiones; t.visitas += w.visitas; t.wa += w.whatsapp + w.llamadas;
      t.deAnuncio += w.porCanal["Google Ads"] ?? 0; t.sinOrigen += w.porCanal["Directo o sin dato"] ?? 0;
    }
    for (const f of d.anuncios.diario) if (f[0] >= r[0] && f[0] <= r[1]) { t.coste += f[3]; t.conv += f[6]; }
    return t;
  };
  const A = suma(a), B = suma(b);
  const campanas = new Map<string, { coste: number; conv: number }>();
  for (const f of d.anuncios.diario) if (f[0] >= a[0] && f[0] <= a[1]) { const c = campanas.get(f[2]) ?? { coste: 0, conv: 0 }; c.coste += f[3]; c.conv += f[6]; campanas.set(f[2], c); }
  const crm = detalleDemo(a[0], a[1]).crm;
  const C = crm.reduce((s, r) => ({ leads: s.leads + r.leads, pc: s.pc + r.visitas, hoja: s.hoja + r.presupuestos, casos: s.casos + r.firmados, venc: s.venc + (r.vencidas ?? 0) }), { leads: 0, pc: 0, hoja: 0, casos: 0, venc: 0 });
  const cpl = A.conv ? A.coste / A.conv : 0, cplB = B.conv ? B.coste / B.conv : 0;
  const cplWeb = A.deAnuncio ? A.coste / A.deAnuncio : 0;
  // En la demo, la medición sale incompleta a propósito, como hoy en la realidad: sin acceso a sus anuncios no sabemos de qué campaña viene cada consulta.
  const medicionIncompleta = A.coste > 0;
  const vC = variacion(A.contactos, B.contactos);
  const p1 = habiles(hoy, 2), p2 = habiles(hoy, 4);

  const modulos: Modulo[] = [
    {
      id: "web", titulo: "La web", que: "Qué hace la gente en tu web y si todo funciona", luz: "ambar", ver: "Ver con la lupa",
      conclusion: "En el blog casi nadie llega al final de la página: solo el 2 %. Hay una cosa más para mirar con la lupa.",
      filas: [
        { t: "Visitas con la lupa (28 días)", v: "521 visitas · 1,4 páginas por visita" },
        { t: "Pulsaciones en WhatsApp y llamar", v: `${num(A.wa)} (${conSigno(variacion(A.wa, B.wa))})` },
        { t: "Para mirar 1", v: "En el blog solo el 2 % llega al final de la página: lo de abajo casi nadie lo ve.", luz: "ambar" },
        { t: "Para mirar 2", v: "En la portada, toques en el sello de 2005, que parece un botón y no lo es.", luz: "ambar" },
        { t: "Lo que funciona", v: "La calculadora de indemnización es la página donde más se pulsa contactar.", luz: "verde" },
        { t: "Sistemas", v: "Todo al día: web, formularios, chat y lupa", luz: "verde" },
      ],
      enlaces: [{ t: "Ver con la lupa", href: "/guia-jesus/mapa-calor" }],
    },
    {
      id: "dicen", titulo: "Reputación e IA", ver: "Ver las consultas", que: "Tus reseñas y qué dicen de ti las inteligencias artificiales", luz: "rojo",
      conclusion: "Las reseñas se pueden mejorar (Google 4,2 con 59), y esta semana las IAs solo te nombran en 1 de las 8 consultas revisadas.",
      filas: [
        { t: "Google", v: "4,2 de 5 · 59 opiniones (dato real)" },
        { t: "Reseñas de una estrella sin contestar", v: "11 (dato real). Te dejamos preparada una respuesta para cada una", luz: "ambar" },
        { t: "Ficha de Google: veces que sale", v: "1.820 (+6 % frente a antes)" },
        { t: "Instagram @tiernocentella_abogados", v: "4.007 seguidores · 265 publicaciones (dato real)" },
        { t: "Espejo de la IA", v: "Te nombran en 1 de 8 preguntas (revisado el lunes)", luz: "rojo" },
        { t: "Visibilidad en IAs (Semrush)", v: "14 sobre 100 (dato real)" },
        { t: "«abogado acoso laboral Madrid»", v: "Sales, en el puesto 4", luz: "verde" },
        { t: "«mejor abogado laboralista en Madrid»", v: "No sales; salen otros 3 despachos", luz: "rojo" },
        { t: "Qué haremos 1", v: "Una guía nueva sobre acoso laboral, pensada para que las IAs la citen." },
      ],
      enlaces: [],
    },
    {
      id: "mercado", titulo: "Competencia", ver: "Ver cambios", que: "Los cambios importantes de otros despachos", luz: "ambar",
      conclusion: "Hay un movimiento de la competencia que merece una mirada. Otro despacho se anuncia en Google cuando alguien busca tu nombre.",
      filas: [
        { t: "Anuncio con tu nombre", v: "Cuando alguien busca \"jesus tierno centella\", sale primero el anuncio de otro despacho (dato real). Se puede frenar con una campaña con tu nombre.", luz: "ambar" },
        { t: "Otro despacho de Madrid", v: "Ha publicado una calculadora de despido. No hace falta reaccionar: la tuya ya está.", luz: "verde" },
        { t: "En Google: «abogado laboralista madrid»", v: "puesto 18, en la segunda página (dato real)" },
        { t: "En Google: «abogado acoso laboral madrid»", v: "puesto 7 (antes 9)" },
      ],
      enlaces: [],
    },
    {
      id: "anuncios", titulo: "Anuncios", que: "Cuántas consultas llegan por anuncios y cuánto cuestan",
      luz: medicionIncompleta ? "ambar" : "verde", estado: medicionIncompleta ? "Medición incompleta" : undefined, ver: medicionIncompleta ? "Revisar medición" : "Ver campañas",
      conclusion: medicionIncompleta
        ? `Se han invertido ${eur(A.coste)}, pero todavía no podemos asignar con seguridad todas las consultas a sus campañas.`
        : `${num(A.conv)} consultas por anuncios en 28 días; cada una ha costado ${eur(cpl)}.`,
      filas: [
        ...(medicionIncompleta ? [
          { t: "Qué falta", v: "Que cada llamada y cada formulario guarden de qué anuncio vienen. Hasta entonces, no pausar campañas solo por estas cifras.", luz: "ambar" as Luz },
          { t: "Coste por consulta según Google", v: eur(cpl) },
          { t: "Coste por consulta según la web", v: cplWeb ? `${eur(cplWeb)} (la web solo ve parte de las consultas de los anuncios)` : "La web no ve consultas de anuncios todavía" },
        ] : []),
        { t: "Consultas en la web", v: `${num(A.contactos)} (${conSigno(vC)})` },
        { t: "Piden la primera consulta", v: `${num(A.visitas)} (${A.contactos ? Math.round((A.visitas / A.contactos) * 100) : 0} % de las consultas)` },
        { t: "Invertido en anuncios", v: eur(A.coste) },
        ...[...campanas.entries()].sort((x, y) => y[1].coste - x[1].coste).map(([k, c]) => ({
          t: `Google · ${k}`, v: `${eur(c.coste)} · ${pl(c.conv, "consulta", "consultas")} · ${c.conv ? `${eur(c.coste / c.conv)} cada una` : "sin consultas medidas"}`,
          luz: (c.conv === 0 && c.coste > 100 ? "ambar" : cpl && c.conv && c.coste / c.conv > cpl * 1.5 ? "ambar" : "verde") as Luz,
        })),
      ],
      enlaces: [],
    },
    {
      id: "tuyo", titulo: "Consultas y plazos", que: "Tus consultas, primeras consultas, casos y plazos, del CRM", luz: "azul", estado: "En curso", ver: "Ver los plazos",
      conclusion: `Hay ${pl(C.pc, "primera consulta", "primeras consultas")}, ${pl(C.hoja, "hoja de encargo", "hojas de encargo")} y ${pl(C.casos, "caso aceptado", "casos aceptados")} de las consultas de este periodo. Dos plazos de despido vencen esta semana.`,
      filas: [
        { t: "Todos los canales juntos (CRM)", v: `${pl(C.leads, "consulta", "consultas")}, ${pl(C.pc, "primera consulta", "primeras consultas")}, ${pl(C.hoja, "hoja de encargo", "hojas de encargo")} y ${pl(C.casos, "caso", "casos")}` },
        { t: "Plazo que vence", v: `Despido: 20 días hábiles, vence el ${enPalabras(p1)}`, luz: "rojo" },
        { t: "Plazo que vence", v: `Despido: 20 días hábiles, vence el ${enPalabras(p2)}`, luz: "ambar" },
        ...(C.venc ? [{ t: "Seguimientos atrasados", v: `${num(C.venc)} ${C.venc === 1 ? "consulta tiene" : "consultas tienen"} la fecha de seguimiento pasada en el CRM`, luz: "azul" as Luz }] : []),
        ...crm.slice().sort((x, y) => y.leads - x.leads).map((r) => ({ t: `Llegan por ${r.origen === "Calculadora web" ? "la calculadora de la web" : r.origen === "Asistente (chat)" ? "el chat de la web" : r.origen === "Recomendado" ? "recomendación" : r.origen}`, v: `${pl(r.leads, "consulta", "consultas")}, ${pl(r.visitas, "primera consulta", "primeras consultas")} y ${pl(r.firmados, "caso", "casos")}` })),
        { t: "Coste por caso", v: C.casos ? eur(A.coste / C.casos) : "Se activa cuando el CRM tenga casos aceptados", luz: "azul" },
      ],
      enlaces: [{ t: "Abrir el CRM", href: "/guia-jesus/crm" }],
    },
  ];

  const relojes: Reloj[] = [
    { frase: `${num(A.contactos)} personas te dejaron sus datos`, detalle: vC === null ? "Es el primer periodo que medimos." : vC === 0 ? "Igual que antes." : `${Math.abs(vC)} % ${vC > 0 ? "más" : "menos"} que antes.`, ayuda: "Personas distintas que han enviado un formulario o dejado su teléfono en la web o en el chat. Una misma persona solo cuenta una vez al día.", t: "Consultas", v: num(A.contactos), sub: conSigno(vC), lleno: Math.min(1, B.contactos ? A.contactos / (B.contactos * 1.5) : 0.5), luz: vC === null ? "gris" : vC >= 0 ? "verde" : vC > -20 ? "ambar" : "rojo" },
    { frase: `${num(A.visitas)} pidieron una primera consulta`, detalle: `Son ${A.contactos ? Math.round((A.visitas / A.contactos) * 100) : 0} de cada 100 personas que dejaron sus datos.`, ayuda: "De cada 100 personas que te dejan sus datos, cuántas reservan la primera consulta de una hora. Más de 30 de cada 100 está bien.", t: "Piden la primera consulta", v: `${A.contactos ? Math.round((A.visitas / A.contactos) * 100) : 0} %`, sub: "de las consultas", lleno: A.contactos ? A.visitas / A.contactos : 0, luz: A.contactos && A.visitas / A.contactos >= 0.3 ? "verde" : "ambar" },
    { frase: medicionIncompleta ? `${eur(cpl)} por consulta de anuncio` : `Cada consulta costó ${eur(cpl)}`, detalle: `${cplB ? `Antes eran ${eur(cplB)}` : "Antes no lo medíamos"}${medicionIncompleta ? ", pero la medición todavía está incompleta." : "."}`, ayuda: "El dinero gastado en anuncios dividido entre las consultas que han traído esos anuncios. Cuanto más bajo, mejor.", t: "Coste por consulta", v: eur(cpl), sub: conSigno(cpl && cplB ? variacion(cpl, cplB) : null), lleno: cplB ? Math.min(1, cpl / (cplB * 2)) : 0.5, luz: medicionIncompleta ? "ambar" : "verde" },
    { frase: "Tus clientes te valoran con un 4,2", detalle: "Sobre 5, con 59 reseñas de Google.", ayuda: "La valoración media que han dejado tus clientes en Google, sobre 5. Por encima de 4,5 es muy buena.", t: "Nota en Google", v: "4,2", sub: "59 reseñas", lleno: 4.2 / 5, luz: "ambar" },
  ];

  const tareas: Tarea[] = [
    { id: "plazos", titular: `Dos plazos de despido vencen esta semana: el ${enPalabras(p1)} y el ${enPalabras(p2)}.`, texto: "Revisa los 2 plazos de despido que vencen esta semana", porque: `En el CRM hay dos consultas de despido con el plazo de 20 días hábiles a punto de cumplirse: el ${enPalabras(p1)} y el ${enPalabras(p2)}.`, donde: "Consultas y plazos", ir: "tuyo", boton: "Ver los plazos" },
    ...(medicionIncompleta ? [{ id: "medicion", texto: "Completar la medición de los anuncios", porque: "Las cifras de Google y las de la web no coinciden: muchas consultas llegan sin un origen identificado. Hasta tenerlo, no conviene pausar ninguna campaña.", donde: "Anuncios", ir: "anuncios", boton: "Ver qué falta conectar" }] : []),
    { id: "resenas", texto: "Contesta las reseñas de una estrella", porque: "Hay 11 sin contestar. Te dejamos preparada una respuesta para cada una: solo tienes que revisarla.", donde: "Reputación e IA", ir: "dicen", boton: "Ver las reseñas" },
    { id: "espejo", titular: "Las inteligencias artificiales solo te nombran en 1 de las 8 consultas revisadas esta semana.", texto: "Revisar la presencia en las IAs", porque: "Te nombran en 1 de 8 consultas revisadas esta semana.", donde: "Reputación e IA", ir: "dicen", boton: "Ver las consultas" },
    { id: "marca", texto: "Proteger tu nombre en Google", porque: "Otro despacho sale anunciado cuando alguien busca \"jesus tierno centella\".", donde: "Competencia", ir: "mercado", boton: "Ver el cambio" },
  ];

  const puntos = [tareas[0].titular!, tareas.find((t) => t.id === "espejo")!.titular!];
  const resumen: Resumen = { titulo: "Hay dos cosas que requieren atención", texto: puntos[0], puntos };

  return { hoy, periodo: a, resumen, relojes, modulos, tareas };
}
