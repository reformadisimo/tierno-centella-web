'use client';

// Área de cliente con un caso de ejemplo inventado (6-nov-2026, idea de Ig): así vería un cliente su caso.
// Todo es de prueba: los datos de Laura no existen, los archivos no salen del móvil y los mensajes al despacho
// tienen respuestas de ejemplo. El asistente sí es el de verdad (/api/asistente), con el caso como contexto.
// Clases propias con prefijo ac-.

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { calcularIndemnizacion } from '@/lib/calculos';
import { DESPACHO, euros, enlaceWhatsapp } from '@/lib/despacho';

const INICIO = '2019-03-04';
const DESPIDO = '2026-10-20';
const SALARIO = 21000;

type Fase = {
  corto: string;
  fecha: string; // fecha en que se cumple este paso
  hecho: string; // lo que ya ha pasado, en una frase
  significa: string; // qué quiere decir, en claro
  proximo: { titulo: string; cuando: string; iso?: string; hora?: string; donde?: string; llevar?: string[]; nota?: string };
  pide?: { id: string; t: string; porque: string };
  docs: { t: string; de: 'Tú' | 'Despacho' | 'Juzgado' | 'SMAC'; f: string }[];
  mensaje: { f: string; t: string };
};

const FASES: Fase[] = [
  {
    corto: 'Consulta',
    fecha: '24 oct',
    hecho: 'Hemos estudiado tu caso contigo.',
    significa: 'Tu despido es disciplinario, pero la carta no concreta bien los hechos. Creemos que se puede discutir. El primer paso obligatorio es pedir una conciliación en el SMAC.',
    proximo: { titulo: 'Presentamos tu papeleta de conciliación', cuando: 'Esta semana', nota: 'Lo hacemos nosotros. Al presentarla, el plazo de 20 días hábiles para reclamar se queda parado.' },
    pide: { id: 'nomina', t: 'Tu última nómina (octubre)', porque: 'Con ella calculamos bien tu salario y tu indemnización.' },
    docs: [
      { t: 'Carta de despido', de: 'Tú', f: '24 oct' },
      { t: 'Contrato de trabajo', de: 'Tú', f: '24 oct' },
      { t: 'Resumen de tu consulta', de: 'Despacho', f: '24 oct' },
    ],
    mensaje: { f: '24 oct', t: 'Hola, Laura. Gracias por venir hoy. Te he dejado aquí el resumen de lo que hablamos. Cuando puedas, sube tu última nómina.' },
  },
  {
    corto: 'Papeleta',
    fecha: '28 oct',
    hecho: 'Hemos presentado tu papeleta de conciliación.',
    significa: 'Es el paso obligatorio antes de ir al juzgado: la empresa y tú os sentáis a ver si hay acuerdo. Desde hoy, el plazo para reclamar está parado.',
    proximo: { titulo: 'Conciliación en el SMAC', cuando: 'Jueves 3 de diciembre', iso: '2026-12-03', hora: '10:30', donde: 'SMAC, calle de la Princesa, 5, Madrid', llevar: ['Tu DNI', 'Nada más: el resto lo llevamos nosotros'], nota: 'Vas con Jesús. No tienes que hablar si no quieres.' },
    pide: { id: 'nomina', t: 'Tu última nómina (octubre)', porque: 'Con ella calculamos bien tu salario y tu indemnización.' },
    docs: [{ t: 'Papeleta de conciliación presentada', de: 'Despacho', f: '28 oct' }],
    mensaje: { f: '28 oct', t: 'Papeleta presentada. El plazo para reclamar queda parado. La conciliación es el 3 de diciembre y te acompaño yo.' },
  },
  {
    corto: 'Conciliación',
    fecha: '3 dic',
    hecho: 'La conciliación terminó sin acuerdo.',
    significa: 'La empresa ofreció 2.000 € y no lo aceptamos: es mucho menos de lo que te corresponde. Ahora vamos al juzgado.',
    proximo: { titulo: 'Presentamos tu demanda en el juzgado', cuando: 'Antes del 10 de diciembre', nota: 'Lo hacemos nosotros. Tú no tienes que hacer nada.' },
    pide: { id: 'testigos', t: 'Nombres de compañeros que puedan declarar', porque: 'Si alguien vio lo que pasó, su testimonio ayuda mucho.' },
    docs: [{ t: 'Acta de conciliación sin acuerdo', de: 'SMAC', f: '3 dic' }],
    mensaje: { f: '3 dic', t: 'Hoy no hubo acuerdo: la oferta no era buena. Seguimos adelante, como hablamos. Tranquila, vamos bien.' },
  },
  {
    corto: 'Demanda',
    fecha: '10 dic',
    hecho: 'Hemos presentado tu demanda y ya hay fecha de juicio.',
    significa: 'El Juzgado de lo Social ha admitido la demanda. Ahora toca esperar al juicio. Antes lo preparamos juntos para que vayas tranquila.',
    proximo: { titulo: 'Juicio en el Juzgado de lo Social n.º 12', cuando: 'Miércoles 14 de abril de 2027', iso: '2027-04-14', hora: '10:00', donde: 'Juzgados de lo Social, calle de la Princesa, 3, Madrid', llevar: ['Tu DNI', 'Llega 20 minutos antes: te esperamos en la puerta'], nota: 'El 7 de abril lo preparamos juntos por videollamada.' },
    docs: [
      { t: 'Demanda presentada', de: 'Despacho', f: '10 dic' },
      { t: 'Señalamiento del juicio', de: 'Juzgado', f: '15 dic' },
    ],
    mensaje: { f: '15 dic', t: 'Ya tenemos fecha de juicio: 14 de abril. Antes lo preparamos juntos por videollamada. Cualquier duda, escríbeme aquí.' },
  },
  {
    corto: 'Juicio',
    fecha: '14 abr',
    hecho: 'El juicio se ha celebrado.',
    significa: 'Ha ido bien: los testigos confirmaron tu versión. Ahora el juez dicta sentencia, que suele tardar unas semanas.',
    proximo: { titulo: 'Esperamos la sentencia', cuando: 'En las próximas semanas', nota: 'Te avisamos al momento, por aquí y por WhatsApp.' },
    docs: [],
    mensaje: { f: '14 abr', t: 'Ha ido muy bien, Laura. Lo has hecho genial. Ahora toca esperar la sentencia. Te aviso en cuanto llegue.' },
  },
  {
    corto: 'Sentencia',
    fecha: '6 may',
    hecho: 'Hemos ganado: tu despido es improcedente.',
    significa: 'El juez nos da la razón. Ahora la empresa tiene 5 días para elegir: readmitirte o pagarte la indemnización.',
    proximo: { titulo: 'La empresa elige: readmitirte o pagarte', cuando: 'En 5 días hábiles', nota: 'Te llamamos para explicarte la sentencia y lo que viene.' },
    docs: [{ t: 'Sentencia', de: 'Juzgado', f: '6 may' }],
    mensaje: { f: '6 may', t: '¡Buenas noticias, Laura! Hemos ganado. Te llamo ahora y te lo explico con calma.' },
  },
];

const PREGUNTAS = ['¿Qué pasa si no hay acuerdo en la conciliación?', '¿Tengo que ir yo al juicio?', '¿Cuánto podría cobrar?'];

type Msg = { de: 'yo' | 'despacho' | 'asistente'; t: string; f?: string; ejemplo?: boolean };

function ics(p: Fase['proximo']) {
  if (!p.iso || !p.hora) return '';
  const [h, m] = p.hora.split(':');
  const ini = `${p.iso.replace(/-/g, '')}T${h}${m}00`;
  const fin = `${p.iso.replace(/-/g, '')}T${String(Number(h) + 1).padStart(2, '0')}${m}00`;
  const txt = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Tierno Centella//Area cliente//ES', 'BEGIN:VEVENT',
    `DTSTART;TZID=Europe/Madrid:${ini}`, `DTEND;TZID=Europe/Madrid:${fin}`,
    `SUMMARY:${p.titulo}`, `LOCATION:${p.donde ?? ''}`, `DESCRIPTION:Caso de ejemplo de Tierno Centella. ${p.nota ?? ''}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(txt)}`;
}

export default function AreaCliente() {
  const [fase, setFase] = useState(1);
  const [subidos, setSubidos] = useState<string[]>([]);
  const [pestana, setPestana] = useState<'despacho' | 'correo' | 'asistente'>('despacho');
  const [extras, setExtras] = useState<string[]>([]);
  const [correos, setCorreos] = useState<{ asunto: string; cuerpo: string }[]>([]);
  const [asunto, setAsunto] = useState('');
  const [cuerpo, setCuerpo] = useState('');
  const [escritos, setEscritos] = useState<Msg[]>([]);
  const [charla, setCharla] = useState<Msg[]>([]);
  const [texto, setTexto] = useState('');
  const [pensando, setPensando] = useState(false);
  const fin = useRef<HTMLDivElement>(null);
  const F = FASES[fase];
  const ind = useMemo(() => calcularIndemnizacion(INICIO, DESPIDO, SALARIO), []);

  const hilo: Msg[] = useMemo(
    () => [...FASES.slice(0, fase + 1).map((x) => ({ de: 'despacho' as const, t: x.mensaje.t, f: x.mensaje.f })), ...escritos],
    [fase, escritos],
  );
  const docs = useMemo(() => {
    const d = FASES.slice(0, fase + 1).flatMap((x) => x.docs);
    if (subidos.includes('nomina')) d.push({ t: 'Nómina de octubre', de: 'Tú', f: 'hoy' });
    if (subidos.includes('testigos')) d.push({ t: 'Lista de compañeros que pueden declarar', de: 'Tú', f: 'hoy' });
    extras.forEach((x) => d.push({ t: x, de: 'Tú', f: 'hoy' }));
    correos.forEach((c) => d.push({ t: `Correo a tu abogado: ${c.asunto}`, de: 'Tú', f: 'hoy' }));
    return d.reverse();
  }, [fase, subidos, extras, correos]);
  const pide = F.pide && !subidos.includes(F.pide.id) ? F.pide : null;

  useEffect(() => {
    fin.current?.scrollTo({ top: fin.current.scrollHeight, behavior: 'smooth' });
  }, [hilo, charla, pestana]);

  function subir(id: string) {
    setSubidos((s) => (s.includes(id) ? s : [...s, id]));
  }

  async function enviar(q: string) {
    const pregunta = q.trim();
    if (!pregunta || pensando) return;
    setTexto('');
    if (pestana === 'despacho') {
      setEscritos((m) => [...m, { de: 'yo', t: pregunta, f: 'ahora' }]);
      setPensando(true);
      setTimeout(() => {
        setEscritos((m) => [...m, { de: 'despacho', t: 'Recibido, Laura. Lo miramos y te contestamos hoy mismo por aquí.', f: 'ahora', ejemplo: true }]);
        setPensando(false);
      }, 1200);
      return;
    }
    const contexto =
      `[Contexto: caso de ejemplo inventado del área de cliente de la web de Tierno Centella, no es una persona real. ` +
      `Clienta: Laura. Despido disciplinario comunicado el 20/10/2026. Trabaja en la empresa desde el 04/03/2019. Salario: 21.000 € al año. ` +
      `Fase actual: ${F.hecho} ${F.significa} Próximo paso: ${F.proximo.titulo}, ${F.proximo.cuando}. Su abogado es Jesús Tierno. ` +
      `Indemnización estimada si el despido es improcedente: ${euros(ind.importeImprocedente)}. ` +
      `Responde a Laura de tú, en pocas frases claras, sobre su caso, y recuérdale que su abogado le confirma los detalles.]\n\n`;
    const nuevos: Msg[] = [...charla, { de: 'yo', t: pregunta }];
    setCharla([...nuevos, { de: 'asistente', t: '' }]);
    setPensando(true);
    try {
      const mensajes = nuevos.map((m, i) => ({
        role: m.de === 'yo' ? ('user' as const) : ('assistant' as const),
        content: i === 0 ? contexto + m.t : m.t,
      }));
      const r = await fetch('/api/asistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensajes, pagina: '/area-cliente' }),
      });
      if (!r.ok || !r.body) {
        const e = await r.json().catch(() => null);
        throw new Error(e?.error || 'No he podido responder ahora.');
      }
      const lector = r.body.getReader();
      const deco = new TextDecoder();
      let acumulado = '';
      for (;;) {
        const { done, value } = await lector.read();
        if (done) break;
        acumulado += deco.decode(value, { stream: true });
        setCharla([...nuevos, { de: 'asistente', t: acumulado }]);
      }
    } catch (e) {
      setCharla([...nuevos, { de: 'asistente', t: e instanceof Error ? e.message : 'No he podido responder ahora.' }]);
    } finally {
      setPensando(false);
    }
  }

  function mandarCorreo() {
    if (!asunto.trim() || !cuerpo.trim()) return;
    setCorreos((c) => [...c, { asunto: asunto.trim(), cuerpo: cuerpo.trim() }]);
    setAsunto('');
    setCuerpo('');
  }

  const lista = pestana === 'despacho' ? hilo : pestana === 'asistente' ? charla : [];
  const cal = ics(F.proximo);

  return (
    <div className="ac">
      <div className="ac-demo" role="note">
        <div>
          <strong>Caso de ejemplo, inventado.</strong> Así ve su caso un cliente del despacho. Prueba a avanzarlo:
        </div>
        <div className="ac-avanza">
          <button type="button" onClick={() => setFase((f) => Math.max(0, f - 1))} disabled={fase === 0} aria-label="Fase anterior">
            Atrás
          </button>
          <span>
            Paso {fase + 1} de {FASES.length}
          </span>
          <button type="button" className="ac-sig" onClick={() => setFase((f) => Math.min(FASES.length - 1, f + 1))} disabled={fase === FASES.length - 1}>
            Avanza el caso
          </button>
        </div>
      </div>

      <div className="ac-hola">
        <img src="/img/jesus-avatar.webp" alt="" width={56} height={56} />
        <div>
          <p className="ac-saludo">Hola, Laura</p>
          <p className="ac-sub">Tu caso: despido disciplinario · Tu abogado: Jesús Tierno</p>
        </div>
      </div>

      <ol className="ac-linea" aria-label="Las fases de tu caso">
        {FASES.map((x, i) => (
          <li key={x.corto} className={i < fase ? 'hecha' : i === fase ? 'ahora' : ''}>
            <button type="button" onClick={() => setFase(i)} aria-current={i === fase ? 'step' : undefined}>
              <span className="ac-punto" aria-hidden="true">
                {i < fase ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className="ac-fase">{x.corto}</span>
              <span className="ac-fecha">{x.fecha}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="ac-linea-ahora">
        Paso {fase + 1}: <strong>{F.corto}</strong> · {F.fecha}
      </p>

      <div className="ac-rejilla">
        <div className="ac-col">
          <section className="ac-tarjeta ac-estado" aria-live="polite">
            <p className="ac-etiqueta">Estás aquí</p>
            <p className="ac-titulo">{F.hecho}</p>
            <p>{F.significa}</p>
          </section>

          <section className="ac-tarjeta ac-proximo">
            <p className="ac-etiqueta">Tu próximo paso</p>
            <p className="ac-titulo">{F.proximo.titulo}</p>
            <p className="ac-cuando">
              {F.proximo.cuando}
              {F.proximo.hora ? `, a las ${F.proximo.hora}` : ''}
            </p>
            {F.proximo.donde && <p className="ac-donde">{F.proximo.donde}</p>}
            {F.proximo.llevar && (
              <>
                <p className="ac-mini">Qué llevar</p>
                <ul>
                  {F.proximo.llevar.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </>
            )}
            {F.proximo.nota && <p className="ac-nota">{F.proximo.nota}</p>}
            {cal && (
              <a className="boton boton-claro ac-cal" href={cal} download="cita-tierno-centella.ics">
                Añadir a mi calendario
              </a>
            )}
          </section>

          {pide ? (
            <section className="ac-tarjeta ac-pide">
              <p className="ac-etiqueta">Lo que necesitamos de ti</p>
              <p className="ac-titulo">{pide.t}</p>
              <p>{pide.porque}</p>
              <label className="boton ac-subir">
                Subir desde el móvil
                <input type="file" accept="image/*,.pdf" onChange={() => subir(pide.id)} />
              </label>
              <p className="ac-mini-nota">En este ejemplo el archivo no sale de tu móvil.</p>
            </section>
          ) : (
            <section className="ac-tarjeta ac-ok">
              <p className="ac-etiqueta">Lo que necesitamos de ti</p>
              <p className="ac-titulo">Nada por ahora</p>
              <p>Lo tienes todo al día. Si nos hace falta algo, te avisamos.</p>
            </section>
          )}

          <section className="ac-tarjeta ac-dinero">
            <p className="ac-etiqueta">{fase === FASES.length - 1 ? 'Lo que te corresponde' : 'Lo que podrías cobrar'}</p>
            <p className="ac-titulo">{euros(ind.importeImprocedente)}</p>
            <p>
              Si el despido es improcedente: 33 días por año trabajado ({ind.meses} meses en la empresa). Es una estimación que tu abogado revisa
              contigo.{' '}
              <Link href="/calculadora-indemnizacion">Cómo se calcula</Link>
            </p>
          </section>
        </div>

        <div className="ac-col">
          <section className="ac-tarjeta ac-chat">
            <div className="ac-pestanas" role="tablist">
              <button type="button" role="tab" aria-selected={pestana === 'despacho'} onClick={() => setPestana('despacho')}>
                Chat
              </button>
              <button type="button" role="tab" aria-selected={pestana === 'correo'} onClick={() => setPestana('correo')}>
                Correo
              </button>
              <button type="button" role="tab" aria-selected={pestana === 'asistente'} onClick={() => setPestana('asistente')}>
                Pregunta 24 h
              </button>
            </div>
            {pestana === 'correo' ? (
              <div className="ac-correo">
                <p className="ac-mini-nota" style={{ marginTop: 0 }}>
                  Le llega a Jesús a su correo de siempre (Outlook) y queda guardado en tu expediente.
                </p>
                {correos.map((c, i) => (
                  <div key={i} className="ac-enviado" role="status">
                    <strong>Enviado: {c.asunto}</strong>
                    <span>Le ha llegado a Jesús a su correo y está en tus documentos. Te contestará por aquí o por correo.</span>
                    <span className="ac-mini-nota">Envío de ejemplo: en esta demostración no sale ningún correo.</span>
                  </div>
                ))}
                <label htmlFor="ac-asunto">Asunto</label>
                <input id="ac-asunto" value={asunto} onChange={(e) => setAsunto(e.target.value)} placeholder="Por ejemplo: cambio de teléfono" autoComplete="off" />
                <label htmlFor="ac-cuerpo">Tu mensaje</label>
                <textarea id="ac-cuerpo" rows={4} value={cuerpo} onChange={(e) => setCuerpo(e.target.value)} placeholder="Escribe aquí lo que quieras contarle a tu abogado" />
                <label className="boton boton-claro ac-adjunta">
                  Adjuntar un archivo
                  <input type="file" onChange={(e) => e.target.files?.[0] && setExtras((x) => [...x, e.target.files![0].name])} />
                </label>
                <button type="button" className="boton" onClick={mandarCorreo} disabled={!asunto.trim() || !cuerpo.trim()}>
                  Enviar a mi abogado
                </button>
              </div>
            ) : (
            <>
            <div className="ac-hilo" ref={fin}>
              {pestana === 'asistente' && charla.length === 0 && (
                <div className="ac-vacio">
                  <p>Pregunta lo que quieras sobre tu caso, a cualquier hora. Te responde un asistente con inteligencia artificial que conoce tu caso. Lo importante, siempre te lo confirma tu abogado.</p>
                  <div className="ac-sugerencias">
                    {PREGUNTAS.map((p) => (
                      <button key={p} type="button" onClick={() => enviar(p)}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {lista.map((m, i) => (
                <div key={i} className={`ac-msg ac-${m.de}`}>
                  {m.de === 'despacho' && <span className="ac-quien">Jesús Tierno{m.f ? ` · ${m.f}` : ''}</span>}
                  {m.de === 'asistente' && <span className="ac-quien">Asistente con IA</span>}
                  <p>{m.t || '…'}</p>
                  {m.ejemplo && <span className="ac-mini-nota">Respuesta de ejemplo</span>}
                </div>
              ))}
            </div>
            <form
              className="ac-escribe"
              onSubmit={(e) => {
                e.preventDefault();
                enviar(texto);
              }}
            >
              <label htmlFor="ac-texto" className="sr-only">
                Tu mensaje
              </label>
              <input
                id="ac-texto"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder={pestana === 'despacho' ? 'Escribe a tu abogado…' : 'Escribe tu pregunta…'}
                autoComplete="off"
              />
              <button type="submit" className="boton" disabled={pensando || !texto.trim()}>
                Enviar
              </button>
            </form>
            </>
            )}
          </section>

          <section className="ac-tarjeta ac-docs">
            <p className="ac-etiqueta">Tu expediente: documentos</p>
            <label className="boton ac-subir ac-subir-doc">
              Añadir un documento
              <input type="file" accept="image/*,.pdf,.doc,.docx" onChange={(e) => e.target.files?.[0] && setExtras((x) => [...x, e.target.files![0].name])} />
            </label>
            <p className="ac-mini-nota">Fotos, PDF o Word, cuando quieras. En este ejemplo el archivo no sale de tu móvil.</p>
            <ul>
              {docs.map((d) => (
                <li key={d.t + d.f}>
                  <span className="ac-doc">{d.t}</span>
                  <span className="ac-de">
                    {d.de === 'Tú' ? 'Lo enviaste tú' : `De: ${d.de}`} · {d.f}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <p className="ac-pie">
        ¿Quieres que llevemos tu caso así? <Link href="/reservar">Reserva tu primera consulta</Link> o{' '}
        <a href={enlaceWhatsapp('Hola, he visto el área de cliente de la web y quiero consultar mi caso.')}>escríbenos por WhatsApp</a> al {DESPACHO.whatsapp}.
      </p>
    </div>
  );
}
