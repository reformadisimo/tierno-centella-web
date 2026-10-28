#!/usr/bin/env python3
"""Copia la mesa de control de Reformadísimo (la referencia) a la web de Tierno Centella.

La pantalla no se reescribe: se copian components/mesa/Mesa.tsx, components/mesa/Alegria.tsx, lib/mesaTextos.ts y
lib/mesaTipos.ts tal cual, y aquí solo se cambian textos de marca y de negocio (un despacho: consultas, primeras
consultas, hojas de encargo y casos, en lugar de visitas, presupuestos y obras). Los datos de ejemplo van aparte, en
lib/panelDemo.ts y lib/mesaDemo.ts. Si un cambio deja de encontrarse en la referencia, el script lo dice.

Uso: python3 scripts/copiar-mesa.py /ruta/a/reformadisimo-web
Después, regenerar el CSS de la mesa (app/mesa-tc-6v9k3p/mesa.css) con Tailwind 3.4, important "#mesa-rd" y sin preflight.
"""
import sys, pathlib, json
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import textos_mesa_tierno as T

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
    # v939: el resumen por correo ya está siempre arriba; en «Más herramientas» de la vista sencilla sobraba (id duplicado)
    ('{herramientas}<Resumenes clave={clave} /></div>}', '{herramientas}</div>}'),
    ('/* ── MESA DE CONTROL (26-oct, cl·v811) ──', '/* ── MESA DE CONTROL: copia de la de Reformadísimo, la referencia (scripts/copiar-mesa.py). Solo cambian textos de un despacho. ──'),
    ('{ id: "peticiones", nombre: "Peticiones", f: (t) => t.peticiones, formato: num, fuente: "Web", ayuda: "Personas que nos han dejado sus datos en la web." }', '{ id: "peticiones", nombre: "Contactos", f: (t) => t.peticiones, formato: num, fuente: "Web", ayuda: "Personas que nos han dejado sus datos en la web o en el chat." }'),
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
    (' · Google Ads, Meta y ChatGPT Ads (Supermetrics), ', ' · Google Ads, '),
    (' · Ficha de Google e Instagram (Supermetrics), ', ' · Ficha de Google e Instagram, '),
    (' · eKomi y Trustpilot, a mano. Las pruebas del equipo no cuentan.', ' · Las pruebas del equipo no cuentan.'),
    ('pero piden menos la visita (${num(pv)} %, antes ${num(pvC ?? 0)} %).', 'pero piden menos la primera consulta (${num(pv)} %, antes ${num(pvC ?? 0)} %).'),
    ('f1 = `Bien: ${num(T.peticiones)} contactos y el ${num(pv)} % pide la visita.`;', 'f1 = `Bien: ${num(T.peticiones)} contactos y el ${num(pv)} % pide la primera consulta.`;'),
    ('f1 = `Estable: ${num(T.peticiones)} contactos y el ${num(pv)} % pide la visita.`;', 'f1 = `Estable: ${num(T.peticiones)} contactos y el ${num(pv)} % pide la primera consulta.`;'),
    ('f2 = `De ${num(t.leads)} contactos: ${num(t.visitas)} visitas y ${num(t.pres)} presupuestos. Aún no hay firmas: una reforma tarda semanas en decidirse, la tasa de cierre se mira con 3 a 6 meses.`;', 'f2 = `De ${num(t.leads)} consultas: ${num(t.visitas)} primeras consultas y ${num(t.pres)} hojas de encargo. Aún no hay casos aceptados: un caso puede tardar semanas en decidirse.`;'),
    ('f2 = `De ${num(t.leads)} contactos: ${num(t.visitas)} visitas, ${num(t.pres)} presupuestos y ${num(t.firm)} obras firmadas (${eur(t.imp)}).`;', 'f2 = `De ${num(t.leads)} consultas: ${num(t.visitas)} primeras consultas, ${num(t.pres)} hojas de encargo y ${num(t.firm)} casos aceptados.`;'),
    ('f3 = "Hará falta que el CRM tenga obras firmadas en este periodo.";', 'f3 = "Hará falta que el CRM tenga casos aceptados en este periodo.";'),
    ('`${r.origen}: ${eur(r.coste / r.firmados)} por obra`', '`${r.origen}: ${eur(r.coste / r.firmados)} por caso`'),
    ('f3 = `${mejor.origen} es el que más factura: ${num(mejor.firmados)} ${mejor.firmados === 1 ? "obra" : "obras"}, ${eur(mejor.firmado)}.${pagos.length ? ` En anuncios: ${pagos.join("; ")}.` : ""}`;', 'f3 = `${mejor.origen} es el que más casos trae: ${num(mejor.firmados)} ${mejor.firmados === 1 ? "caso" : "casos"}.${pagos.length ? ` En anuncios: ${pagos.join("; ")}.` : ""}`;'),
    ('{ pregunta: "¿Nos llegan buenos contactos?", color: c1, frase: f1, dato: `${num(T.peticiones)} contactos · ${num(T.visitas)} piden visita` },', '{ pregunta: "¿Nos llegan buenos contactos?", color: c1, frase: f1, dato: `${num(T.peticiones)} contactos · ${num(T.visitas)} piden primera consulta` },'),
    ('{ pregunta: "¿Los convertimos en obras?", color: c2, frase: f2, dato: t.leads ? `${num(t.leads ? (t.firm / t.leads) * 100 : 0)} % de contacto a obra` : "" },', '{ pregunta: "¿Las convertimos en casos?", color: c2, frase: f2, dato: t.leads ? `${num(t.leads ? (t.firm / t.leads) * 100 : 0)} % de consulta a caso` : "" },'),
    ('{ pregunta: "¿Qué canal nos hace ganar más?", color: c3, frase: f3, dato: "" },', '{ pregunta: "¿Qué canal nos trae más casos?", color: c3, frase: f3, dato: "" },'),
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
    ('<FranjaConectado nombres={["Google Analytics", "Search Console", "Google Ads", "Meta", "Ficha de Google", "Instagram", "WhatsApp", "Semrush", "ChatGPT", "Gemini", "Claude"]} />', '<FranjaConectado nombres={["Google Analytics", "Search Console", "Google Ads", "Ficha de Google", "Instagram", "WhatsApp", "Semrush", "ChatGPT", "Gemini", "Claude"]} />'),
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
    ('if (r[2]?.n) o.push({ texto: "¿Cuánto crees que ha costado cada contacto de los anuncios?", real: r[2].n, unidad: "€", max: techo(r[2].n) });', 'if (r[2]?.n) o.push({ texto: "¿Cuánto crees que ha costado cada contacto de los anuncios?", real: r[2].n, unidad: "€", max: techo(r[2].n) });'),
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
    ('<p className="text-[14px] text-ink/65">¿Cuántos contactos quieres cada 28 días?</p>', '<p className="text-[14px] text-ink/65">¿Cuántos contactos quieres cada 28 días?</p>'),
    ('Mi meta: {num0(v)} contactos</label>', 'Mi meta: {num0(v)} contactos</label>'),
    ('aria-valuetext={`${v} contactos`}', 'aria-valuetext={`${v} contactos`}'),
    ('aria-label="Tu meta de contactos"', 'aria-label="Tu meta de contactos"'),
    ('"Casi clavado. Conoces tu negocio como la palma de tu mano."', '"Casi clavado. Conoces tu despacho como la palma de tu mano."'),
    ('{ t: "Con meta", como: "Ponerte una meta de contactos",', '{ t: "Con meta", como: "Ponerte una meta de contactos",'),
]

TEXTOS = [
    ('["tuyo", "Ventas"],', '["tuyo", "Consultas y plazos"],'),
    ('tuyo: "las ventas" }', 'tuyo: "las consultas y los plazos" }'),
]

# ── v935: "Tus sueños y tus cuentas", tarjetas de Consultas con su "?" y fuentes sin Meta ──
MESA += [
    ('nombreEmpresa="Reformadísimo" lineas={["Reforma integral", "Cocina", "Baño", "Vivienda para alquilar", "Local u oficina"]} capacidadTexto="¿Cuántas obras puedes empezar al mes?" notaPublico="En Reformadísimo ya está en marcha la prueba A/B: la versión B habla a quien busca arquitectura y decoración (el cliente que quiere gastar mucho más) sin renunciar al de siempre. Aquí se verá si responde."',
     'nombreEmpresa="Tierno Centella Abogados" lineas={' + json.dumps(T.LINEAS, ensure_ascii=False).replace('","', '", "') + '} capacidadTexto="' + T.CAPACIDAD + '" notaPublico="' + T.NOTA_PUBLICO + '"'),
    ('["Contactos", num(t.leads), "persona", PALETA_ALEGRIA.ventas],', '["Consultas", num(t.leads), "persona", PALETA_ALEGRIA.ventas],'),
    ('["Visitas", num(t.visitas), "casa", PALETA_ALEGRIA.web],', '["Primeras consultas", num(t.visitas), "persona", PALETA_ALEGRIA.web],'),
    ('["Presupuestos", num(t.presupuestos), "documento", PALETA_ALEGRIA.camino],', '["Hojas de encargo", num(t.presupuestos), "documento", PALETA_ALEGRIA.camino],'),
    ('["Obras firmadas", num(t.firmados), "check", PALETA_ALEGRIA.mercado],', '["Casos aceptados", num(t.firmados), "check", PALETA_ALEGRIA.mercado],'),
    ('["Importe firmado", eur(t.firmado), "moneda", PALETA_ALEGRIA.dinero],', '["Honorarios previstos", eur(t.firmado), "moneda", PALETA_ALEGRIA.dinero],'),
    ('["Coste en anuncios por obra firmada", pago ? eur(inversion / pago) : "-", "megafono", PALETA_ALEGRIA.anuncios],', '["Coste en anuncios por caso", pago ? eur(inversion / pago) : "-", "megafono", PALETA_ALEGRIA.anuncios],'),
    ('Contactos: "Personas que han entrado en el CRM en estas fechas, por cualquier canal (web, teléfono, WhatsApp, Instagram, recomendación).",', 'Consultas: "Personas que han entrado en el CRM en estas fechas, por cualquier canal (web, teléfono, WhatsApp, recomendación).",'),
    ('Visitas: "De esos contactos, a cuántos se les ha hecho ya la visita técnica en casa.",', '"Primeras consultas": "De esas consultas, cuántas han tenido ya la primera reunión con el abogado.",'),
    ('Presupuestos: "A cuántos se les ha entregado presupuesto.",', '"Hojas de encargo": "A cuántas se les ha enviado la hoja de encargo, con los honorarios.",'),
    ('"Obras firmadas": "Cuántos han firmado contrato. Una reforma tarda semanas en decidirse: los contactos de estas fechas todavía pueden firmar.",', '"Casos aceptados": "Cuántas han firmado la hoja de encargo. Un caso puede tardar semanas en decidirse: las consultas de estas fechas todavía pueden aceptar.",'),
    ('"Importe firmado": "Suma de los contratos firmados por contactos de estas fechas.",', '"Honorarios previstos": "Suma de los honorarios de los casos aceptados de estas fechas.",'),
    ('"Coste en anuncios por obra firmada": "Lo invertido en anuncios dividido entre las obras firmadas que vinieron de anuncios. Cuanto más bajo, mejor.",', '"Coste en anuncios por caso": "Lo invertido en anuncios dividido entre los casos aceptados que vinieron de anuncios. Cuanto más bajo, mejor.",'),
    ('"Tiempo medio hasta la primera llamada": "Cuánto tardamos, de media, en llamar a un contacto nuevo. Cuanto antes, más probable que firme.",', '"Tiempo medio hasta la primera llamada": "Cuánto se tarda, de media, en llamar a una consulta nueva. Cuanto antes, mejor la atiendes.",'),
    ('"Seguimientos atrasados": "Contactos con la fecha de seguimiento ya pasada en el CRM: alguien tiene que llamarlos.",', '"Seguimientos atrasados": "Consultas con la fecha de seguimiento ya pasada en el CRM: alguien tiene que llamarlas.",'),
    ('fuente: "Anuncios (Google Ads, Meta y ChatGPT)"', 'fuente: "Anuncios (Google Ads)"'),
    ('<Caja titulo="Inversión por día" fuente="Google Ads, Meta y ChatGPT Ads · se actualiza cada mañana">', '<Caja titulo="Inversión por día" fuente="Google Ads · se actualiza cada mañana">'),
    ('pista: "Analytics, Ads, Meta, WhatsApp…"', 'pista: "Analytics, Ads, ficha de Google, WhatsApp…"'),
]

# Bloques enteros de Alegria.tsx que el prompt deja cambiar: guía de uso, "?" y glosario
def bloque(texto, empieza, nuevo, nombre):
    i = texto.find(empieza)
    if i < 0:
        fallos.append(f"{nombre}: no encontrado el bloque {empieza}")
        return texto
    j = texto.index("\n};" if nuevo.rstrip().endswith("};") else "\n];", i) + 3
    return texto[:i] + nuevo + texto[j:]

SUENOS = [
    # Las cuatro cifras del simulador: consultas al mes, piden cita, asuntos, facturación
    ('<Cifra t="Contactos al mes" v={num(r.total)} color={C.ventas} sub={`hoy, unos ${num(r.totalHoy)} al mes`} />', '<Cifra t="Contactos al mes" v={num(r.total)} color={C.ventas} sub={`hoy, unos ${num(r.totalHoy)} al mes`} />'),
    ('<Cifra t="Piden visita" v={num(r.total * r.pide)} color={C.web} sub={`${pct(r.pide * 100)} de los contactos`} />', '<Cifra t="Piden primera consulta" v={num(r.total * r.pide)} color={C.web} sub={`${pct(r.pide * 100)} de los contactos`} />'),
    ('<Cifra t="Obras" v={num(r.obras)} color={C.camino} sub={`${tasa} de cada 100 firman`} />', '<Cifra t="Casos" v={num(r.obras)} color={C.camino} sub={`${tasa} de cada 100 contactos`} />'),
    ('<Cifra t="Facturación" v={eur(r.factura)} color={C.dinero} sub={`a ${eur(ticket)} por obra`} />', '<Cifra t="Facturación" v={eur(r.factura)} color={C.dinero} sub={`a ${eur(ticket)} por caso`} />'),
    ('<>Con <strong>{eur(gasto)}</strong> al mes, cada contacto de anuncios saldría a unos <strong>{eur(r.cplAhora)}</strong>. </> : <>Sin anuncios, te quedarías con los contactos que llegan solos: unos <strong>{num(r.organicos)}</strong> al mes. </>}', '<>Con <strong>{eur(gasto)}</strong> al mes, cada contacto de anuncios saldría a unos <strong>{eur(r.cplAhora)}</strong>. </> : <>Sin anuncios, te quedarías con los contactos que llegan solos: unos <strong>{num(r.organicos)}</strong> al mes. </>}'),
    ('al mes y mantener los contactos de hoy: <strong>', 'al mes y mantener los contactos de hoy: <strong>'),
    ('<>Con el SEO un {pct(seo)} arriba tendrías unos {num(r.organicos)} contactos al mes sin pagar anuncios.</>', '<>Con el SEO un {pct(seo)} arriba tendrías unos {num(r.organicos)} contactos al mes sin pagar anuncios.</>'),
    ('La medición de los anuncios está incompleta: estas cifras valen para jugar, no para quitar campañas.', 'La medición de los anuncios está incompleta: estas cifras valen para pensar, no para quitar campañas.'),
    ('así que uso un supuesto de {eur(cpl)} por contacto (cámbialo abajo).', 'así que uso un supuesto de {eur(cpl)} por contacto (cámbialo abajo).'),
    ('<p>Parto de tus 28 días: {eur(base.coste)} en anuncios, {num(base.contactosAnuncios)} contactos de anuncios, {num(base.contactos)} contactos en total y {num(base.visitasPedidas)} visitas pedidas.', '<p>Parto de tus 28 días: {eur(base.coste)} en anuncios, {num(base.contactosAnuncios)} contactos de anuncios, {num(base.contactos)} contactos en total y {num(base.visitasPedidas)} primeras consultas pedidas.'),
    ('De cada 100 contactos, firman<input', 'De cada 100 contactos, acaban en caso<input'),
    ('<span className="font-normal text-ink/55">Supuesto: tu CRM aún no tiene firmas de este periodo.</span>', '<span className="font-normal text-ink/55">Supuesto: tu CRM aún no tiene casos de este periodo.</span>'),
    ('Cada obra, de media (€)<input', 'Honorarios medios por caso (€)<input'),
    ('Coste por contacto supuesto (€)<input', 'Coste por contacto supuesto (€)<input'),
    ('habrían llegado unos <strong>{num(extra)} contactos más</strong> ({num(c)} en total de anuncios). Cada uno de esos contactos extra te habría costado unos', 'habrían llegado unos <strong>{num(extra)} contactos más</strong> ({num(c)} en total de anuncios). Cada uno de esos contactos extra te habría costado unos'),
    ('más caro que los de ahora, porque los primeros euros son siempre los que mejor rinden.', 'más caro que los de ahora, porque los primeros euros son siempre los que mejor rinden.'),
    # Tipos de meta de un despacho (las claves no cambian: las usa la lógica)
    ('obras: { t: "Obras al año", unidad: "obras", icono: "casa", color: C.ventas },', 'obras: { t: "Casos nuevos al año", unidad: "casos", icono: "documento", color: C.ventas },'),
    ('contactos: { t: "Contactos al mes", unidad: "contactos", icono: "persona", color: C.web },', 'contactos: { t: "Contactos al mes", unidad: "contactos", icono: "persona", color: C.web },'),
    ('ticket: { t: "Lo que gasta cada cliente", unidad: "€ por obra", icono: "estrella", color: C.camino },', 'ticket: { t: "Honorarios medios por caso", unidad: "€ por caso", icono: "estrella", color: C.camino },'),
    ('capacidadTexto = "¿Cuántas obras puedes llevar al mes?"', 'capacidadTexto = "' + T.CAPACIDAD + '"'),
    ('"Un sueño grande: otra empresa dentro de la tuya"', '"Un sueño grande: otro despacho dentro del tuyo"'),
    ('`Hoy cada cliente gasta de media ${eur(hoy)}${ritmo.supuestoTicket ? " (supuesto; el CRM aún no tiene firmas de este periodo)" : " (según tu CRM)"}. Quieres clientes de ${eur(m.cifra)}: ${veces.toFixed(1).replace(".", ",")} veces más.`', '`Hoy cada caso deja de media ${eur(hoy)} de honorarios${ritmo.supuestoTicket ? " (supuesto; el CRM aún no tiene casos de este periodo)" : " (según tu CRM)"}. Quieres casos de ${eur(m.cifra)}: ${veces.toFixed(1).replace(".", ",")} veces más.`'),
    ('"Esto no se consigue invirtiendo más en los mismos anuncios: se consigue hablando a otra gente. Haría falta una página distinta para ese cliente (otras fotos, otros precios, otro tono), campañas dirigidas a ese público y una prueba A/B para medir si responde."', '"Esto no se consigue con más anuncios: se consigue hablando a otro cliente. Haría falta una página pensada para empresas o casos de más cuantía (otro tono, casos tipo inventados, el equipo y el método), presencia en Google y en las IA para esas búsquedas, artículos que demuestren criterio y una prueba A/B que mida si responde."'),
    ('"Puedes tener las dos cosas a la vez: la mayoría de clientes de hoy y una parte de clientes de más nivel. Dinos qué reparto quieres (por ejemplo, 80 y 20) y lo montamos por separado para que cada público vea lo suyo."', '"Puedes tener las dos cosas a la vez: seguir atendiendo a quien te consulta hoy y dirigirte también a ese otro cliente. Dinos qué reparto quieres (por ejemplo, 80 y 20) y lo montamos por separado para que cada público vea lo suyo."'),
    ('"Con una diferencia tan grande, lo honesto es decirte que es casi otra marca: se puede, pero lleva meses y un presupuesto propio. Mejor empezar con un escalón intermedio."', '"Con una diferencia tan grande, lo honesto es decirte que es casi otro despacho: se puede intentar, pero lleva meses y un presupuesto propio. Mejor empezar con un escalón intermedio."'),
    ('" (con una tasa de firma supuesta del 8 %, tu CRM aún no tiene firmas de este periodo)"', '" (suponiendo que 8 de cada 100 contactos acaban en caso, porque tu CRM aún no tiene casos de este periodo)"'),
    ('`Haría falta pasar de ${num(ritmo.contactosMes)} a unos ${num(contactosNecesarios)} contactos al mes.', '`Haría falta pasar de ${num(ritmo.contactosMes)} a unos ${num(contactosNecesarios)} contactos al mes.'),
    ('"mucho; mejor combinarlo con SEO, reseñas y una web que convierta más" : "demasiado; por aquí no se llega solo con anuncios. Haría falta otro público, otra oferta u otra zona"', '"mucho; mejor combinarlo con SEO, reseñas y una web que convierta más" : "demasiado; por aquí no se llega solo con anuncios. Haría falta otro público, otra área u otra zona"'),
    ('"Lo importante aquí es no bajar la guardia: mantener los anuncios que funcionan y cuidar las reseñas."', '"Lo importante aquí es no bajar la guardia: mantener los anuncios que funcionan y contestar las reseñas."'),
    ('"Cuenta con una tasa de firma supuesta del 8 %, porque tu CRM aún no tiene firmas de este periodo. Con firmas reales el cálculo se afina solo."', '"Cuenta con que 8 de cada 100 contactos acaban en caso (supuesto), porque tu CRM aún no tiene casos de este periodo. Con datos reales el cálculo se afina solo."'),
    ('`Tope de capacidad: hoy puedes llevar ${num(cap)} obras al mes y esta meta pide unas ${num(obrasMesMeta)}. Antes de traer más contactos habría que crecer el equipo o escalonar la meta; no te traeremos más de lo que puedes atender bien.`', '`Con tu equipo de hoy caben ${num(cap)} casos al mes; para llegar a ${num(obrasMesMeta)} habría que crecer el equipo o derivar. Antes de traer más contactos hay que resolver eso: no te traeremos más de lo que puedes atender bien.`'),
    ('`Para «${m.linea}» hace falta su propia página y su propia campaña: cada tipo de obra se vende con sus fotos y sus palabras.`', '`Para «${m.linea}» hace falta su propia página, sus búsquedas en Google, su campaña y artículos de criterio sobre ese tema: cada área se explica con sus palabras.`'),
    ('${m.linea ? "Tipo de obra: " + m.linea + "\\n" : ""}', '${m.linea ? "Tipo de caso: " + m.linea + "\\n" : ""}'),
    ('placeholder={tipo === "factura" ? "3000000" : tipo === "ticket" ? "100000" : "50"}', 'placeholder={tipo === "factura" ? "600000" : tipo === "ticket" ? "4000" : "20"}'),
    ('<legend>¿De qué tipo de obra? (opcional)</legend>', '<legend>¿De qué tipo de caso? (opcional)</legend>'),
    ('placeholder="Por ejemplo, 8"', 'placeholder="Por ejemplo, 20"'),
    ('placeholder={tipo === "ticket" ? "Quiero clientes que gasten más, pero sin perder a los de ahora" : "Por ejemplo: abrir en otra ciudad, salir en una revista…"}', 'placeholder={tipo === "ticket" ? "Quiero casos de empresa, sin dejar de atender a los particulares" : "Por ejemplo: ser referencia en acoso laboral en Madrid"}'),
    ('<Aviso texto="Lo que te decimos sale de tus cifras de 28 días y de supuestos a la vista (tasa de firma, importe por obra). Es una orientación para hablarlo, no una promesa." />', '<Aviso texto="Lo que te decimos sale de tus cifras de 28 días y de supuestos a la vista (contactos que acaban en caso, honorarios por caso). Es una orientación para hablarlo, no una promesa." />'),
    ('La mesa dice: <strong>{num(prevision)} contactos</strong>', 'La mesa dice: <strong>{num(prevision)} contactos</strong>'),
    ('llegaron <strong>{num(real)} contactos</strong>', 'llegaron <strong>{num(real)} contactos</strong>'),
    ('"Has ganado tú. Conoces tu negocio mejor que la media."', '"Has ganado tú. Conoces tu despacho mejor que la media."'),
    ('{ id: "meta", t: "Ponte una meta", sub: "Contactos cada 28 días",', '{ id: "meta", t: "Ponte una meta", sub: "Contactos cada 28 días",'),
]

# 44 px mínimo (robot de aceptación, 27-oct-2026). Fallo del ORIGINAL de Reformadísimo, avisado a Ig para corregirlo allí:
# la guía de uso (Lo he visto / Saltar / Volver a hacer / Siguiente / ×), "Qué hago con esto" y los enlaces de cada parte.
# Cuando se corrija en la referencia, estas líneas dejarán de encontrarse (el script lo dirá) y se pueden quitar.
ALEGRIA += [('min-h-[40px]', 'min-h-[44px]'), ('grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-white text-[16px] text-ink/60">×', 'grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-white text-[16px] text-ink/60">×')]
SUENOS += [('ml-2 inline-flex min-h-[32px] items-center rounded-full', 'ml-2 inline-flex min-h-[44px] items-center rounded-full')]
MESA += [('className="inline-flex min-h-[40px] it', 'className="inline-flex min-h-[44px] it'),
         # Tarjetas de cifras: a 320 px no caben dos por fila ("CONSULTAS" se salía 1 px). Trampa 23 del prompt: una columna. También del original.
         ('<div className="grid grid-cols-2 gap-3 lg:grid-cols-4">', '<div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 lg:grid-cols-4">')]

# ── Revisión antes de enseñarlo a Jesús (27-oct-2026): una palabra para cada cosa ──
# visita (entra en la web) · contacto (deja sus datos en la web o el chat) · primera consulta (reunión) · consulta (CRM) · caso
MESA += [
    ('${dp > 0 ? "Suben" : "Bajan"} las peticiones un', '${dp > 0 ? "Suben" : "Bajan"} los contactos un'),
    ("`El canal que más peticiones trae es ${canales[0][0]}", "`El canal que más contactos trae es ${canales[0][0]}"),
    ('<Caja titulo="De dónde vienen las peticiones"', '<Caja titulo="De dónde vienen los contactos"'),
    ('sub="peticiones" />', 'sub="contactos" />'),
    ('<dt className="text-ink/55">Peticiones que llegan a la web</dt>', '<dt className="text-ink/55">Contactos que llegan a la web</dt>'),
    ('<dt className="font-semibold text-ink">Coste por petición</dt>', '<dt className="font-semibold text-ink">Coste por contacto en la web</dt>'),
    ('Las peticiones reales, por canal, están arriba y en el Resumen.', 'Los contactos reales, por canal, están arriba y en el Resumen.'),
    # El despacho solo anuncia en Google: sin tarjetas de Meta ni ChatGPT a 0 € (un cero parece un fallo)
    ('  meta: { nombre: "Meta (Facebook e Instagram)", color: COLOR.rosa },\n  chatgpt: { nombre: "ChatGPT Ads", color: COLOR.salvia },\n', ''),
    # Con una sola plataforma, "rinde mejor/peor que la media" se compara consigo misma: no se enseña
    ('if (!cpp || !mediaPet) return null;', 'if (!cpp || !mediaPet || Object.keys(PLATAFORMA).length < 2) return null;'),
]

# ── Guía comprensible (27-oct-2026, antes de enseñarla a Jesús). Propuesto a Ig para llevarlo también a Reformadísimo ──
MESA += [
    # "Más herramientas" ya es una casilla que se abre: dentro no hace falta otro "Abrir" (había que abrir dos veces)
    # Que la guía amarilla no llegue por sorpresa: se avisa al entrar, con la salida a la vista
    ('<p className="mt-4 text-[16px] leading-relaxed text-ink/80">No necesitas entender de marketing. Pulsa cualquier apartado y te lo explicamos.</p>', '<p className="mt-4 text-[16px] leading-relaxed text-ink/80">No necesitas entender de marketing. Al entrar, una tira amarilla te enseña la mesa en 9 pasos cortos; si prefieres verla a tu aire, pulsa la ×.</p>'),
    ('function MasHerramientas({ clave, herramientas }: { clave: string; herramientas: React.ReactNode }) {\n  const [ab, setAb] = useState(false);', 'function MasHerramientas({ clave, herramientas }: { clave: string; herramientas: React.ReactNode }) {\n  const [ab, setAb] = useState(true);'),
]
ALEGRIA += [
    # En el móvil, la tira de la guía enseñaba solo el título del paso: ahora también qué hacer, en una frase
    ('<span className="block truncate text-[14px] font-semibold leading-tight text-ink">{pasos[paso!].t}</span></span>', '<span className="block text-[14px] font-semibold leading-tight text-ink">{pasos[paso!].t}</span><span className="mt-0.5 block text-[13px] leading-snug text-ink/75">{pasos[paso!].d}</span></span>'),
]

mesa = cambia((REF / "components/mesa/Mesa.tsx").read_text(encoding="utf-8"), MESA, "Mesa.tsx")
(AQUI / "components/mesa/Mesa.tsx").write_text(mesa, encoding="utf-8")
alegria = cambia((REF / "components/mesa/Alegria.tsx").read_text(encoding="utf-8"), ALEGRIA, "Alegria.tsx")
alegria = bloque(alegria, "export const GUIA_PASOS", T.GUIA_PASOS, "Alegria.tsx")
alegria = bloque(alegria, "export const EXPLICA", T.EXPLICA, "Alegria.tsx")
alegria = bloque(alegria, "export const GLOSARIO", T.GLOSARIO, "Alegria.tsx")
(AQUI / "components/mesa/Alegria.tsx").write_text(alegria, encoding="utf-8")
(AQUI / "components/mesa/Suenos.tsx").write_text(cambia((REF / "components/mesa/Suenos.tsx").read_text(encoding="utf-8"), SUENOS, "Suenos.tsx"), encoding="utf-8")
(AQUI / "lib/mesaTextos.ts").write_text(cambia((REF / "lib/mesaTextos.ts").read_text(encoding="utf-8"), TEXTOS, "mesaTextos.ts"), encoding="utf-8")
(AQUI / "lib/mesaTipos.ts").write_text((REF / "lib/mesaTipos.ts").read_text(encoding="utf-8"), encoding="utf-8")

# Lo que no debe quedar en la copia
import re
# Suenos.tsx no entra: sus variables se llaman "obras" (la lógica no se toca); su texto lo revisa el robot en pantalla.
for nombre in ["components/mesa/Mesa.tsx", "components/mesa/Alegria.tsx"]:
    t = (AQUI / nombre).read_text(encoding="utf-8")
    for m in re.finditer(r"Reformad[ií]simo|Sonia|eKomi|Trustpilot|Reformímetro|\bobras?\b|presupuesto|visita técnica|reforma\b", t):
        linea = t[: m.start()].count("\n") + 1
        fallos.append(f"{nombre}:{linea}: queda «{m.group(0)}»")

print("\n".join(fallos) if fallos else "Copia limpia: todos los cambios aplicados.")
