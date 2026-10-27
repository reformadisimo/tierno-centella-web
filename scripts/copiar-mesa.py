#!/usr/bin/env python3
"""Copia la mesa de control de Reformadísimo (la referencia) a la web de Tierno Centella.

La pantalla no se reescribe: se copian components/mesa/Mesa.tsx, components/mesa/Alegria.tsx, lib/mesaTextos.ts y
lib/mesaTipos.ts tal cual, y aquí solo se cambian textos de marca y de negocio (un despacho: consultas, primeras
consultas, hojas de encargo y casos, en lugar de visitas, presupuestos y obras). Los datos de ejemplo van aparte, en
lib/panelDemo.ts y lib/mesaDemo.ts. Si un cambio deja de encontrarse en la referencia, el script lo dice.

Uso: python3 scripts/copiar-mesa.py /ruta/a/reformadisimo-web
Después, regenerar el CSS de la mesa (app/mesa-tc-6v9k3p/mesa.css) con Tailwind 3.4, important "#mesa-rd" y sin preflight.
"""
import sys, pathlib

REF = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "../reformadisimo-web")
AQUI = pathlib.Path(__file__).resolve().parent.parent
fallos = []


def cambia(texto, pares, nombre):
    for a, b in pares:
        if a not in texto:
            fallos.append(f"{nombre}: no encontrado: {a[:90]}")
        texto = texto.replace(a, b)
    return texto


MESA = [
    ('/* ── MESA DE CONTROL (26-oct, cl·v811) ──', '/* ── MESA DE CONTROL: copia de la de Reformadísimo, la referencia (scripts/copiar-mesa.py). Solo cambian textos de un despacho. ──'),
    ('{ id: "peticiones", nombre: "Peticiones", f: (t) => t.peticiones, formato: num, fuente: "Web", ayuda: "Personas que nos han dejado sus datos en la web." }', '{ id: "peticiones", nombre: "Consultas", f: (t) => t.peticiones, formato: num, fuente: "Web", ayuda: "Personas que nos han dejado sus datos en la web o en el chat." }'),
    ('{ id: "visitas", nombre: "Piden visita", f: (t) => t.visitas, formato: num, fuente: "Web", ayuda: "De ellas, las que piden la visita técnica gratis." }', '{ id: "visitas", nombre: "Piden primera consulta", f: (t) => t.visitas, formato: num, fuente: "Web", ayuda: "De ellas, las que reservan la primera consulta de una hora." }'),
    ('ayuda: "Lo gastado en Google, Meta y ChatGPT." }', 'ayuda: "Lo gastado en anuncios de Google." }'),
    ('{ id: "calculos", nombre: "Reformímetro", f: (t) => t.calculos, formato: num, fuente: "Web", ayuda: "Personas que calculan su reforma y reciben el informe." }', '{ id: "calculos", nombre: "Calculadora", f: (t) => t.calculos, formato: num, fuente: "Web", ayuda: "Personas que calculan su indemnización con la calculadora de la web." }'),
    ('["ventas", "Ventas (CRM)"]', '["ventas", "Consultas (CRM)"]'),
    ('Reformadísimo · mesa de control', 'Tierno Centella · mesa de control'),
    ('Cómo va Reformadísimo', 'Cómo va el despacho'),
    ('<b>Ventas</b> (del CRM, la libreta de clientes)', '<b>Consultas</b> (del CRM, la libreta de clientes)'),
    ('Difieren porque casi todos los anuncios llevan a la página de la agencia, no a la web.', 'Difieren porque parte de las consultas de los anuncios llegan por teléfono y todavía no sabemos de qué anuncio vienen.'),
    ('<CifraFija icono="comerciales" nombre="Visitas comerciales" ayuda="Visitas técnicas a casas de clientes, del CRM (clientes que entraron en estas fechas)."', '<CifraFija icono="comerciales" nombre="Primeras consultas" ayuda="Primeras consultas hechas a quienes entraron en estas fechas, del CRM."'),
    ('<CifraFija icono="firmados" nombre="Contratos firmados" ayuda="Obras firmadas de los clientes que entraron en estas fechas (CRM)."', '<CifraFija icono="firmados" nombre="Casos aceptados" ayuda="Casos con la hoja de encargo firmada, de quienes entraron en estas fechas (CRM)."'),
    ('"Una reforma tarda semanas en firmarse: los contactos de estas fechas aún están en marcha" : "Las firmas antiguas llegarán con la base de clientes"', '"Un caso puede tardar semanas en decidirse: las consultas de estas fechas aún están en marcha" : "Los casos antiguos llegarán con la base de clientes"'),
    ('<CifraFija icono="margen" nombre="Margen de las obras" ayuda="Margen previsto de las obras captadas." v="Pendiente" extra="Falta apuntar el coste previsto y real de cada obra" pendiente />', '<CifraFija icono="margen" nombre="Honorarios de los casos" ayuda="Honorarios previstos de los casos aceptados." v="Pendiente" extra="Falta apuntar los honorarios de cada caso" pendiente />'),
    ('["Solicitaron visita en la web", T.visitas, C?.visitas],', '["Pidieron primera consulta en la web", T.visitas, C?.visitas],'),
    ('fuente="CRM · contactos que entraron en estas fechas por cualquier canal, y hasta dónde han llegado"', 'fuente="CRM · consultas que entraron en estas fechas por cualquier canal, y hasta dónde han llegado"'),
    ('["Contactos registrados", crmT.leads, crmA?.leads],', '["Consultas registradas", crmT.leads, crmA?.leads],'),
    ('["Visitas realizadas", crmT.visitas, crmA?.visitas],', '["Primeras consultas hechas", crmT.visitas, crmA?.visitas],'),
    ('["Presupuestos entregados", crmT.pres, crmA?.pres],', '["Hojas de encargo enviadas", crmT.pres, crmA?.pres],'),
    ('["Contratos firmados", crmT.firm, undefined],', '["Casos aceptados", crmT.firm, undefined],'),
    ('Todavía no hay firmas de los contactos que entraron en este periodo: hay {num(crmT.visitas)} visitas y {num(crmT.pres)} presupuestos en curso. Una reforma tarda semanas en decidirse; la tasa de cierre se mira con contactos de hace 3 a 6 meses.', 'Todavía no hay casos aceptados de las consultas que entraron en este periodo: hay {num(crmT.visitas)} primeras consultas y {num(crmT.pres)} hojas de encargo en curso. Un caso puede tardar semanas en decidirse.'),
    ('Los del CRM incluyen también a quien llega por teléfono, WhatsApp, Instagram o recomendación (por eso pueden ser más).', 'Los del CRM incluyen también a quien llega por teléfono, WhatsApp o recomendación (por eso pueden ser más).'),
    ('las conversaciones reales las apunta Sonia en el CRM.', 'las conversaciones reales las apunta el despacho en el CRM.'),
    ('fuente="Supermetrics · Google Ads, Meta y ChatGPT Ads"', 'fuente="Google Ads"'),
    (' · Google Ads, Meta y ChatGPT Ads (Supermetrics), ', ' · Google Ads, '),
    (' · Ficha de Google e Instagram (Supermetrics), ', ' · Ficha de Google e Instagram, '),
    (' · eKomi y Trustpilot, a mano. Las pruebas del equipo no cuentan.', ' · Las pruebas del equipo no cuentan.'),
    ('pero piden menos la visita (${num(pv)} %, antes ${num(pvC ?? 0)} %).', 'pero piden menos la primera consulta (${num(pv)} %, antes ${num(pvC ?? 0)} %).'),
    ('f1 = `Bien: ${num(T.peticiones)} contactos y el ${num(pv)} % pide la visita.`;', 'f1 = `Bien: ${num(T.peticiones)} consultas y el ${num(pv)} % pide la primera consulta.`;'),
    ('f1 = `Estable: ${num(T.peticiones)} contactos y el ${num(pv)} % pide la visita.`;', 'f1 = `Estable: ${num(T.peticiones)} consultas y el ${num(pv)} % pide la primera consulta.`;'),
    ('f2 = `De ${num(t.leads)} contactos: ${num(t.visitas)} visitas y ${num(t.pres)} presupuestos. Aún no hay firmas: una reforma tarda semanas en decidirse, la tasa de cierre se mira con 3 a 6 meses.`;', 'f2 = `De ${num(t.leads)} consultas: ${num(t.visitas)} primeras consultas y ${num(t.pres)} hojas de encargo. Aún no hay casos aceptados: un caso puede tardar semanas en decidirse.`;'),
    ('f2 = `De ${num(t.leads)} contactos: ${num(t.visitas)} visitas, ${num(t.pres)} presupuestos y ${num(t.firm)} obras firmadas (${eur(t.imp)}).`;', 'f2 = `De ${num(t.leads)} consultas: ${num(t.visitas)} primeras consultas, ${num(t.pres)} hojas de encargo y ${num(t.firm)} casos aceptados.`;'),
    ('f3 = "Hará falta que el CRM tenga obras firmadas en este periodo.";', 'f3 = "Hará falta que el CRM tenga casos aceptados en este periodo.";'),
    ('`${r.origen}: ${eur(r.coste / r.firmados)} por obra`', '`${r.origen}: ${eur(r.coste / r.firmados)} por caso`'),
    ('f3 = `${mejor.origen} es el que más factura: ${num(mejor.firmados)} ${mejor.firmados === 1 ? "obra" : "obras"}, ${eur(mejor.firmado)}.${pagos.length ? ` En anuncios: ${pagos.join("; ")}.` : ""}`;', 'f3 = `${mejor.origen} es el que más casos trae: ${num(mejor.firmados)} ${mejor.firmados === 1 ? "caso" : "casos"}.${pagos.length ? ` En anuncios: ${pagos.join("; ")}.` : ""}`;'),
    ('{ pregunta: "¿Nos llegan buenos contactos?", color: c1, frase: f1, dato: `${num(T.peticiones)} contactos · ${num(T.visitas)} piden visita` },', '{ pregunta: "¿Nos llegan buenas consultas?", color: c1, frase: f1, dato: `${num(T.peticiones)} consultas · ${num(T.visitas)} piden primera consulta` },'),
    ('{ pregunta: "¿Los convertimos en obras?", color: c2, frase: f2, dato: t.leads ? `${num(t.leads ? (t.firm / t.leads) * 100 : 0)} % de contacto a obra` : "" },', '{ pregunta: "¿Las convertimos en casos?", color: c2, frase: f2, dato: t.leads ? `${num(t.leads ? (t.firm / t.leads) * 100 : 0)} % de consulta a caso` : "" },'),
    ('{ pregunta: "¿Qué canal nos hace ganar más?", color: c3, frase: f3, dato: "" },', '{ pregunta: "¿Qué canal nos trae más casos?", color: c3, frase: f3, dato: "" },'),
    ('["Contactos", num(t.leads)],\n          ["Visitas", num(t.visitas)],\n          ["Presupuestos", num(t.presupuestos)],\n          ["Obras firmadas", num(t.firmados)],\n          ["Importe firmado", eur(t.firmado)],\n          ["Coste en anuncios por obra firmada", pago ? eur(inversion / pago) : "-"],', '["Consultas", num(t.leads)],\n          ["Primeras consultas", num(t.visitas)],\n          ["Hojas de encargo", num(t.presupuestos)],\n          ["Casos aceptados", num(t.firmados)],\n          ["Honorarios previstos", eur(t.firmado)],\n          ["Coste en anuncios por caso", pago ? eur(inversion / pago) : "-"],'),
    ('<Caja titulo="De la petición a la obra" fuente={cargando ? "Cargando…" : "CRM · contactos que entraron en el periodo y hasta dónde han llegado"}>', '<Caja titulo="De la consulta al caso" fuente={cargando ? "Cargando…" : "CRM · consultas que entraron en el periodo y hasta dónde han llegado"}>'),
    ('[["Contactos", t.leads, undefined], ["Visita técnica", t.visitas, undefined], ["Presupuesto entregado", t.presupuestos, undefined], ["Firman la obra", t.firmados, undefined]]', '[["Consultas", t.leads, undefined], ["Primera consulta", t.visitas, undefined], ["Hoja de encargo enviada", t.presupuestos, undefined], ["Caso aceptado", t.firmados, undefined]]'),
    ('vacio="El CRM aún no tiene contactos en este periodo."', 'vacio="El CRM aún no tiene consultas en este periodo."'),
    ('{ k: "leads", t: "Contactos", v: (r) => r.leads, num: true },\n            { k: "visitas", t: "Visitas", v: (r) => r.visitas, num: true },\n            { k: "presupuestos", t: "Presupuestos", v: (r) => r.presupuestos, num: true },\n            { k: "firmados", t: "Firmadas", v: (r) => r.firmados, num: true },\n            { k: "conv", t: "De contacto a obra",', '{ k: "leads", t: "Consultas", v: (r) => r.leads, num: true },\n            { k: "visitas", t: "Primeras consultas", v: (r) => r.visitas, num: true },\n            { k: "presupuestos", t: "Hojas de encargo", v: (r) => r.presupuestos, num: true },\n            { k: "firmados", t: "Casos", v: (r) => r.firmados, num: true },\n            { k: "conv", t: "De consulta a caso",'),
    ('{ k: "firmado", t: "Firmado", v: (r) => r.firmado, num: true, f: (r) => eur(r.firmado) },', '{ k: "firmado", t: "Honorarios previstos", v: (r) => r.firmado, num: true, f: (r) => eur(r.firmado) },'),
    ('Sale del CRM, que rellenan Sonia y el equipo. Cuantos más estados y firmas apuntados, más fiel es esta pestaña.', 'Sale del CRM, que rellena el equipo del despacho. Cuantos más estados y casos apuntados, más fiel es esta pestaña.'),
    ('        <p className="mt-2 rounded-[12px] bg-[#fbf6ea] px-3 py-2 text-[13px] text-ink/70">Ojo con los contactos anteriores al 26 de octubre de 2026: vienen del CRM antiguo, que solo apuntaba a quien llegaba a la visita (por eso visitas y contactos casi coinciden). Desde entonces, todo contacto queda apuntado.</p>\n', ''),
    ('Los contactos son los que llegan a nuestra web. Casi todos los anuncios llevan aún a la página de la agencia, así que su coste por contacto aquí sale más alto que el que da cada plataforma. «Meta» junta anuncios e Instagram: la web no siempre puede distinguirlos.', 'Los contactos son los que llegan a la web. Mientras no esté completa la medición de los anuncios, su coste por contacto aquí sale más alto que el que da Google: parte de las consultas llegan por teléfono y aún no sabemos de qué anuncio vienen.'),
    ('if (/reformad[ií]simo/.test(t)) return "Marca";', 'if (/tierno|centella/.test(t)) return "Marca";'),
    ('Buscan empresa, precio o reforma: posibles clientes.', 'Buscan abogado o despacho para su caso: posibles clientes.'),
    ('Dudas de bricolaje o definiciones: rara vez contratan.', 'Dudas generales o definiciones: rara vez contratan, pero conocen al despacho.'),
    ('Acciones clave: pedir visita, enviar un formulario', 'Acciones clave: pedir la primera consulta, enviar un formulario'),
    ('pero piden menos la visita: ', 'pero piden menos la primera consulta: '),
    ('revisa su calidad con Sonia.', 'revisa su calidad con el equipo.'),
    ('(por ejemplo «reformas integrales Madrid»)', '(por ejemplo «abogado laboralista Madrid»)'),
    ('Piden la ruta a la oficina.', 'Piden la ruta al despacho.'),
    ('fuente="Google automático · eKomi y Trustpilot, apuntados a mano"', 'fuente="Google"'),
    ('Las cuatro juntas (Instagram, eKomi, Google y Trustpilot) son la prueba de confianza de la web. Si una nota cambia, hay que cambiarla también en la web para que coincida: díselo a Claude.', 'Las reseñas de Google son la prueba de confianza del despacho. Contestar todas, también las de una estrella, mejora la confianza de quien las lee.'),
    ('r.instagram.usuario ?? "reformadisimo"', 'r.instagram.usuario ?? "tiernocentella_abogados"'),
    ('Lo que se paga en Instagram está en la pestaña «Anuncios» (Meta).', 'Si un día se paga publicidad en Instagram, saldrá en la pestaña «Anuncios».'),
    ('(la web, reputación e IA, competencia, anuncios, ventas)', '(la web, reputación e IA, competencia, anuncios, consultas y plazos)'),
    ('const ejemplos = ["¿Qué campaña funciona mejor?", "¿Cuántos contactos nos ha traído Instagram?", "¿Qué hago primero esta semana?"];', 'const ejemplos = ["¿Qué hago primero esta semana?", "¿Qué anuncio funciona mejor?", "¿Por dónde me llegan más consultas?"];'),
    ('Por ejemplo: «La campaña que mejor funciona es Google Búsqueda: 20 contactos a 70 € cada uno.»', 'Por ejemplo: «Lo primero, los dos plazos de despido que vencen esta semana. Después, contestar las reseñas de una estrella.»'),
    ('<FranjaConectado nombres={["Google Analytics", "Search Console", "Google Ads", "Meta", "Ficha de Google", "Instagram", "WhatsApp", "Semrush", "ChatGPT", "Gemini", "Claude"]} />', '<FranjaConectado nombres={["Google Analytics", "Search Console", "Google Ads", "Ficha de Google", "Instagram", "LinkedIn", "WhatsApp", "Semrush", "ChatGPT", "Gemini", "Claude"]} />'),
    ('  // "madrid" solo no basta: "horario obras madrid" es una duda, no una búsqueda de empresa\n  if (/^reformas?$/.test(t) || /(empresa|empresas|presupuesto|precio|precios|cu[aá]nto cuesta|cuanto vale|coste|reforma integral|reformas integrales|reformas? (en )?madrid|reformar (un |el |mi )?(piso|casa|vivienda|chalet)|reforma (de |del )?(piso|casa|vivienda|cocina|ba[ñn]o|chalet)|contratar|calcular|calculadora reforma)/.test(t)) return "Comercial";', '  // Un despacho: quien busca abogado o su problema laboral concreto puede ser cliente; las definiciones, rara vez.\n  if (/(abogad|despacho|bufete|despid|acoso|mobbing|incapacidad|indemnizaci|finiquito|demanda|reclamar|cu[aá]nto cuesta|precio|calcular|contratar)/.test(t)) return "Comercial";'),
    ('href: "/lupa-m7q3x9k2" }', 'href: "/guia-jesus/mapa-calor" }'),
    ('d: "Lo invertido frente a contactos, visitas y obras firmadas"', 'd: "Lo invertido frente a consultas, primeras consultas y casos"'),
    ('d: "Contactos, visitas y obras, de cada persona", fondo: "#e7efe6", borde: "#5d7a57", href: "/crm-rf2026-x7k2p9" }', 'd: "Consultas, primeras consultas, casos y plazos, de cada persona", fondo: "#e7efe6", borde: "#5d7a57", href: "/guia-jesus/crm" }'),
    ('{ t: "Plan de marketing", icono: "documento", color: "#7a4fd0", d: "La guía viva del plan, con lo hecho y lo pendiente", fondo: "#f3e6e2", borde: "#a8574a", href: "/plan-fk6o7n1hnhw1r8" }', '{ t: "Tu guía", icono: "documento", color: "#7a4fd0", d: "La guía viva del plan, con lo hecho y lo pendiente", fondo: "#f3e6e2", borde: "#a8574a", href: "/guia-jesus" }'),
    ('d: "Qué dicen de nosotros ChatGPT, Gemini y Claude"', 'd: "Qué dicen del despacho ChatGPT, Gemini y Claude"'),
    # Botones de al menos 44 px (lo encontró el robot de aceptación, 27-oct-2026): selectores de fecha y "Cómo se lee"
    ('<label className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[13.5px] font-semibold ${preset === "dia"', '<label className={`flex min-h-[44px] items-center gap-2 rounded-full border px-3 py-0 text-[13.5px] font-semibold ${preset === "dia"'),
    ('<span className={`flex flex-wrap items-center gap-1.5 rounded-full border px-3 py-1 text-[13.5px] font-semibold ${preset === "libre"', '<span className={`flex min-h-[44px] flex-wrap items-center gap-1.5 rounded-full border px-3 py-0 text-[13.5px] font-semibold ${preset === "libre"'),
    ('className="bg-transparent text-[13px] outline-none [color-scheme:light]" />', 'className="min-h-[44px] bg-transparent text-[13px] outline-none [color-scheme:light]" />'),
    ('setRango([e.target.value, b < e.target.value ? e.target.value : b]); } }} className="bg-transparent text-[13px] outline-none" />', 'setRango([e.target.value, b < e.target.value ? e.target.value : b]); } }} className="min-h-[44px] bg-transparent text-[13px] outline-none" />'),
    ('setRango([a, e.target.value]); } }} className="bg-transparent text-[13px] outline-none" />', 'setRango([a, e.target.value]); } }} className="min-h-[44px] bg-transparent text-[13px] outline-none" />'),
    ('<details className="mt-1 text-[14px] text-ink/75">\n              <summary className="cursor-pointer font-semibold text-teal-deep">Cómo se lee esta pantalla</summary>', '<details className="text-[14px] text-ink/75">\n              <summary className="cursor-pointer py-3 font-semibold text-teal-deep">Cómo se lee esta pantalla</summary>'),
    # v915: juego "Adivina la cifra" con las cifras de un despacho
    ('if (r[1]?.n) o.push({ texto: "¿Y cuántas han pedido una visita?", real: r[1].n, unidad: "visitas", max: techo(r[1].n) });', 'if (r[1]?.n) o.push({ texto: "¿Y cuántas han pedido una primera consulta?", real: r[1].n, unidad: "personas", max: techo(r[1].n) });'),
    ('if (r[2]?.n) o.push({ texto: "¿Cuánto crees que ha costado cada contacto de los anuncios?", real: r[2].n, unidad: "€", max: techo(r[2].n) });', 'if (r[2]?.n) o.push({ texto: "¿Cuánto crees que ha costado cada consulta de los anuncios?", real: r[2].n, unidad: "€", max: techo(r[2].n) });'),
    # Títulos con palabras muy largas (@tiernocentella_abogados) junto al logo: que partan en vez de salirse a 320 px
    ('<h2 className="font-serif text-[21px] font-medium italic leading-tight text-ink">{titulo}</h2>', '<h2 className="font-serif text-[21px] font-medium italic leading-tight text-ink [overflow-wrap:anywhere]">{titulo}</h2>'),
    # Sin "Oír resumen" en la mesa de Tierno Centella (decisión de Ig, 27-oct-2026). Se reactiva quitando esta línea.
    ('function BotonOir({ resumen, tareas }: { resumen?: Resumen; tareas: Tarea[] }) {', 'function BotonOir({ resumen, tareas }: { resumen?: Resumen; tareas: Tarea[] }) {\n  // Tierno Centella: sin leer en voz alta (decisión de Ig, 27-oct-2026). Para activarlo, quitar la línea siguiente.\n  if (SIN_VOZ) return null;'),
]

ALEGRIA = [
    ('export const CORREO_ERRORES = "info@reformadisimo.es";', 'export const CORREO_ERRORES = "info@tiernocentella.es";'),
    # Iconos y colores de las cinco partes de un despacho: "casa" (ventas de reformas) pasa a "documento" (consultas y plazos)
    ('web: ["globo", C.web], dicen: ["espejo", C.ia], mercado: ["catalejo", C.mercado], anuncios: ["megafono", C.anuncios], tuyo: ["casa", C.ventas],', 'web: ["globo", C.web], dicen: ["espejo", C.ia], mercado: ["catalejo", C.mercado], anuncios: ["megafono", C.anuncios], tuyo: ["documento", C.ventas],'),
    ('export const ICONO_CIFRA: [string, string][] = [["persona", C.mercado], ["casa", C.web], ["moneda", C.dinero], ["estrella", C.ia]];', 'export const ICONO_CIFRA: [string, string][] = [["persona", C.mercado], ["documento", C.web], ["moneda", C.dinero], ["estrella", C.ia]];'),
    # Tono de un despacho: simpático pero sobrio
    ('export const CHISPA_TODO_BIEN = ["Disfrútalo, que no pasa todos los días.", "Puedes volver a tu vida (la mesa vigila por ti).", "Hoy tu única tarea es sonreír un poco."];', 'export const CHISPA_TODO_BIEN = ["Buen día para centrarte en tus clientes (la mesa vigila por ti).", "Todo en orden. Puedes volver a tus asuntos.", "Sin novedades que atender (que no es poco)."];'),
    ('export const CHISPA_HECHO = ["Hecho. Una menos.", "Revisado. Qué buen ojo tienes.", "Listo. Y sin sudar.", "Apuntado. Gracias por ocuparte."];', 'export const CHISPA_HECHO = ["Hecho. Una menos.", "Revisado. Gracias por ocuparte.", "Listo. Queda apuntado.", "Anotado. Una cosa menos en la mesa."];'),
    ('export const CHISPA_SIN_TAREAS = "Hoy no hay nada pendiente. Aprovecha para tomarte un café (los datos se vigilan solos).";', 'export const CHISPA_SIN_TAREAS = "Hoy no hay nada pendiente. Aprovecha para tomarte un café (los datos se vigilan solos).";'),
    # v915: iconos de las cifras y juegos, con palabras de despacho
    ('comerciales: ["casa", C.ventas], firmados: ["documento", C.mercado], margen: ["escudo", C.noche],', 'comerciales: ["persona", C.ventas], firmados: ["documento", C.mercado], margen: ["moneda", C.noche],'),
    ('peticiones: ["persona", C.mercado], visitas: ["casa", C.web],', 'peticiones: ["persona", C.mercado], visitas: ["documento", C.web],'),
    ('[/Recorrido|petición a la obra/i, { n: "camino", color: C.camino }],', '[/Recorrido|consulta al caso/i, { n: "camino", color: C.camino }],'),
    ('<p className="text-[14px] text-ink/65">¿Cuántos contactos quieres cada 28 días?</p>', '<p className="text-[14px] text-ink/65">¿Cuántas consultas quieres cada 28 días?</p>'),
    ('Mi meta: {num0(v)} contactos</label>', 'Mi meta: {num0(v)} consultas</label>'),
    ('aria-valuetext={`${v} contactos`}', 'aria-valuetext={`${v} consultas`}'),
    ('aria-label="Tu meta de contactos"', 'aria-label="Tu meta de consultas"'),
    ('"Casi clavado. Conoces tu negocio como la palma de tu mano."', '"Casi clavado. Conoces tu despacho como la palma de tu mano."'),
    ('{ t: "Con meta", como: "Ponerte una meta de contactos",', '{ t: "Con meta", como: "Ponerte una meta de consultas",'),
]

TEXTOS = [
    ('["tuyo", "Ventas"],', '["tuyo", "Consultas y plazos"],'),
    ('tuyo: "las ventas" }', 'tuyo: "las consultas y los plazos" }'),
]

mesa = cambia((REF / "components/mesa/Mesa.tsx").read_text(encoding="utf-8"), MESA, "Mesa.tsx")
i = mesa.index("\n", mesa.index('from "@/components/mesa/Alegria";')) + 1
mesa = mesa[:i] + '/** Tierno Centella: la mesa no lee en voz alta (decisión de Ig, 27-oct-2026). */\nconst SIN_VOZ = true;\n' + mesa[i:]
(AQUI / "components/mesa/Mesa.tsx").write_text(mesa, encoding="utf-8")
(AQUI / "components/mesa/Alegria.tsx").write_text(cambia((REF / "components/mesa/Alegria.tsx").read_text(encoding="utf-8"), ALEGRIA, "Alegria.tsx"), encoding="utf-8")
(AQUI / "lib/mesaTextos.ts").write_text(cambia((REF / "lib/mesaTextos.ts").read_text(encoding="utf-8"), TEXTOS, "mesaTextos.ts"), encoding="utf-8")
(AQUI / "lib/mesaTipos.ts").write_text((REF / "lib/mesaTipos.ts").read_text(encoding="utf-8"), encoding="utf-8")

# Lo que no debe quedar en la copia
import re
for nombre in ["components/mesa/Mesa.tsx", "components/mesa/Alegria.tsx"]:
    t = (AQUI / nombre).read_text(encoding="utf-8")
    for m in re.finditer(r"Reformad[ií]simo|Sonia|eKomi|Trustpilot|Reformímetro|\bobras?\b|presupuesto|visita técnica|reforma\b", t):
        linea = t[: m.start()].count("\n") + 1
        fallos.append(f"{nombre}:{linea}: queda «{m.group(0)}»")

print("\n".join(fallos) if fallos else "Copia limpia: todos los cambios aplicados.")
