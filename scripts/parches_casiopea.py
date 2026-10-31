"""Lo que la mesa de Casiopea tiene por delante de la de Reformadísimo (31-oct-2026), aplicado a la copia de Tierno Centella.

Ig quiere la MISMA mesa en todas sus webs. La base sigue siendo la de Reformadísimo (copiar-mesa.py), y estos bloques se
leen tal cual del repo de Casiopea, así que si cambian allí, cambian aquí al volver a copiar:
- el panel «Quién entra de verdad en la web» con fecha de inicio por negocio y sin columna de anuncios si no los hay;
- las fechas siempre a la vista en el recuadro morado (sin plegar) y fuera la fila de píldoras repetida;
- la mesa arranca en «Hoy» mientras no haya días anteriores con datos;
- ayuda en una línea y el resto tras «Ver más».
"""


def _entre(texto, desde, hasta, nombre, fallos, incluir_hasta=True):
    i = texto.find(desde)
    if i < 0:
        fallos.append(f"{nombre}: no encontrado el inicio: {desde[:70]}")
        return None
    j = texto.find(hasta, i)
    if j < 0:
        fallos.append(f"{nombre}: no encontrado el final: {hasta[:70]}")
        return None
    return i, j + (len(hasta) if incluir_hasta else 0)


def aplica(mesa, cas, fallos):
    n = "Mesa.tsx (parches de Casiopea)"

    # 1. Panel «Quién entra de verdad en la web»: el de Casiopea (inicio por negocio, columna de anuncios solo si los hay)
    fin = "</section>\n  );\n}\n"
    a = _entre(mesa, "/* ── Visitas reales (30-oct, chat de Ig)", fin, n, fallos)
    b = _entre(cas, "/* «Quién entra de verdad en la web»: el mismo panel", fin, n, fallos)
    if a and b:
        panel = cas[b[0]:b[1]]
        # En la copia de Reformadísimo el total de personas se llama personasReales
        panel = panel.replace("T.personas", "T.personasReales").replace("C.personas", "C.personasReales").replace("{ ...T, personas:", "{ ...T, personasReales:")
        # Redondeo de minutos y segundos: con 119,6 s salía «1 min 60 s» (en las otras mesas pasa igual)
        panel = panel.replace("const m = Math.floor(s / 60), r = Math.round(s % 60);", "const t = Math.round(s), m = Math.floor(t / 60), r = t % 60;")
        mesa = mesa[:a[0]] + panel + mesa[a[1]:]
    llamada_rd = '<VisitasReales T={T} C={C} origenes={detalle?.origenes ?? null} cargando={cargando} a={a} b={b} ultimoAds={datos.anuncios.diario[datos.anuncios.diario.length - 1]?.[0] ?? ""} />'
    llamada_ca = '<VisitasReales T={T} C={C} origenes={detalle?.origenes ?? null} cargando={cargando} a={a} b={b} adsHasta={datos.anuncios.actualizado} inicio={datos.inicioVisitas} />'
    if llamada_rd in mesa:
        mesa = mesa.replace(llamada_rd, llamada_ca)
    else:
        fallos.append(f"{n}: no encontrada la llamada a VisitasReales")

    # 2. Datos de cada negocio: nombre, primer día del contador y periodo con el que arranca
    ancla = "  clave: string;\n};"
    if ancla in mesa:
        mesa = mesa.replace(ancla, "  clave: string;\n  nombre?: string; // nombre del negocio en la cabecera\n  inicioVisitas?: string; // primer día con personas y visitas contadas; en la demostración no hay\n  presetInicial?: \"hoy\" | \"28\"; // arranca en «Hoy» mientras no hay días anteriores con datos\n};", 1)
    else:
        fallos.append(f"{n}: no encontrado el final del tipo DatosMesa")
    for x, y in [
        ('const [preset, setPreset] = useState<Preset>("28");', 'const [preset, setPreset] = useState<Preset>(datos.presetInicial ?? "28");'),
        ('const [rango, setRango] = useState<[string, string]>(() => rangoDe("28", datos.hoy));', 'const [rango, setRango] = useState<[string, string]>(() => rangoDe(datos.presetInicial ?? "28", datos.hoy));'),
    ]:
        if x in mesa:
            mesa = mesa.replace(x, y, 1)
        else:
            fallos.append(f"{n}: no encontrado: {x[:70]}")

    # 3. Fechas siempre a la vista: el recuadro morado de Casiopea en lugar del plegable
    a = _entre(mesa, '<Plegable id="pl-fechas"', "</Plegable>", n, fallos)
    b = _entre(cas, "{/* Fechas siempre a la vista y destacadas", "</section>", n, fallos)
    if a and b:
        mesa = mesa[:a[0]] + cas[b[0]:b[1]] + mesa[a[1]:]
    # y fuera la fila de píldoras de debajo de la cabecera (las mismas fechas, repetidas)
    a = _entre(mesa, "{/* 30-oct (chat de Ig): las fechas, a la vista y a un toque", "Otras fechas y comparar\n            </button>\n          </div>\n", n, fallos)
    if a:
        mesa = mesa[:a[0]] + mesa[a[1]:]

    # 4. Ayuda corta: una línea y el resto tras «Ver más»
    b = _entre(cas, "/** Texto de ayuda de una línea y, plegado detrás de \"Ver más\"", "</details>\n  );\n}\n", n, fallos)
    if b and "function VerMas(" not in mesa:
        mesa = mesa.replace("export default function Mesa(", cas[b[0]:b[1]] + "\nexport default function Mesa(", 1)
        mesa = mesa.replace('import { useCallback, useEffect, useMemo, useState } from "react";', 'import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";', 1)
    for x, y in [
        ('<p className="mt-3 text-[13px] leading-relaxed text-ink/60">Los pasos de la web cuentan solo lo que pasa en la web. Los del CRM incluyen también a quien llega por teléfono, WhatsApp o recomendación (por eso pueden ser más). Además, {num(T.whatsapp)} pulsaciones en WhatsApp y {num(T.llamadas)} en llamar: son pulsaciones del botón, no conversaciones; las conversaciones reales las apunta el despacho en el CRM.</p>',
         '<VerMas corto={<><b>El CRM puede sumar más que la web:</b> incluye teléfono, WhatsApp y recomendaciones.</>}>Además, {num(T.whatsapp)} pulsaciones en WhatsApp y {num(T.llamadas)} en llamar. Son toques del botón, no conversaciones: esas las apunta el despacho en el CRM.</VerMas>'),
        ('<p className="mt-3 text-[12.5px] leading-relaxed text-ink/50">Los contactos son los que llegan a la web. Mientras no esté completa la medición de los anuncios, su coste por contacto aquí sale más alto que el que da Google: parte de las consultas llegan por teléfono y aún no sabemos de qué anuncio vienen.</p>',
         '<VerMas corto={<>Contactos que llegan a la web.</>} className="text-[12.5px] text-ink/50">Mientras no esté completa la medición de los anuncios, aquí su coste por contacto sale más alto que en Google: parte de las consultas llegan por teléfono.</VerMas>'),
    ]:
        if x in mesa:
            mesa = mesa.replace(x, y, 1)
        else:
            fallos.append(f"{n}: no encontrado el texto largo: {x[60:130]}")

    # 5. «Cada canal, de un vistazo»: sus visitas y su rebote son de Analytics (solo quien acepta cookies), no del contador propio.
    #    Reformadísimo ya lo trae en las visitas (12c8c69); aquí también se rotula el rebote y va el aviso corto propio.
    i = mesa.find('<Caja titulo="Cada canal, de un vistazo"')
    j = mesa.find("</Caja>", i) if i >= 0 else -1
    if i < 0 or j < 0:
        fallos.append(f"{n}: no encontrada la tabla «Cada canal, de un vistazo»")
    else:
        t = mesa[i:j]
        t = t.replace('t: "Visitas", v: (r) => r.sesiones', 't: "Visitas (Analytics)", v: (r) => r.sesiones', 1)
        t = t.replace('t: "Rebote", v: (r) => r.rebote', 't: "Rebote (Analytics)", v: (r) => r.rebote', 1)
        aviso = "OJO: las visitas y el rebote de esta tabla son de Analytics, que solo ve a quien acepta cookies (más o menos 1 de cada 10). Las de verdad, en «Quién entra de verdad en la web». Los contactos sí son todos."
        if aviso not in t:
            k = t.find("<VerMas corto={<>")
            if k < 0:
                fallos.append(f"{n}: «Cada canal» sin texto de ayuda donde poner el aviso de Analytics")
            else:
                k2 = t.find("</>}", k)
                t = t[:k] + "<VerMas corto={<>" + aviso + t[k2:]
        mesa = mesa[:i] + t + mesa[j:]
    return mesa
