'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { medir } from '@/lib/medir';
import { idiomaDe, type Idioma } from '@/lib/idioma';

type Mensaje = { role: 'user' | 'assistant'; content: string };

// La conversación se guarda mientras dura la visita: si la persona pulsa un enlace del chat
// y la página se recarga, el chat se reabre donde estaba.
const CLAVE = 'tc-chat';

const TEXTOS = {
  es: {
    lanzador: '¿Hablamos? Pregunta tu caso',
    lanzadorSub: 'Chat 24 h · respuesta al momento',
    lanzadorAria: 'Abrir el chat: pregunta tu caso',
    titulo: 'Asistente de Tierno Centella',
    subtitulo: 'Inteligencia artificial · orientación general, no asesoramiento',
    cerrar: 'Cerrar',
    equipoAlt: 'Jesús Tierno Centella con el equipo del despacho',
    equipo: 'Jesús Tierno y su equipo',
    equipoTexto: 'Abogados laboralistas en Jorge Juan, 78 (Madrid). Si tu caso lo necesita, te atiende una persona del despacho.',
    bienvenida:
      'Hola. Soy el asistente del despacho, una inteligencia artificial. Te oriento en despidos, acoso laboral, incapacidad, embarazo y conciliación: cuéntame qué te pasa y te digo qué plazos corren y cuál es el siguiente paso. Puedo equivocarme, así que lo que te diga conviene que lo revise un abogado.',
    escribiendo: 'Escribiendo...',
    llamar: 'Llamar',
    teLlamamos: 'Que te llamemos',
    herramientas: 'Herramientas',
    herramientasHref: '/herramientas',
    placeholder: 'Escribe aquí tu pregunta',
    enviar: 'Enviar',
    hablar: 'Hablar',
    escuchando: 'Te escucho... pulsa de nuevo para parar',
    sinVoz: 'Tu navegador no permite dictar. Puedes escribir tu pregunta.',
    vozError: 'No he podido usar el micrófono. Revisa el permiso del navegador o escribe tu pregunta.',
    tuMensaje: 'Tu mensaje',
    aviso: 'Es una inteligencia artificial y puede equivocarse; no sustituye a un abogado. Guardamos la conversación para atenderte mejor; no escribas datos personales que no sean necesarios.',
    errorBase: 'No he podido responder.',
    errorContacto: (t: string, w: string) => `Puedes llamarnos al ${t} o escribir por WhatsApp al ${w}.`,
    waBase: 'Hola, vengo del chat de la web y quiero consultar mi caso.',
    waConTema: (tema: string) => `Hola, vengo del chat de la web. Mi consulta: ${tema}`,
    llamadaTitulo: '¿Te llamamos?',
    llamadaTexto: 'Déjanos tu nombre y tu teléfono. Un abogado del despacho te llama y ya sabrá de qué hemos hablado aquí.',
    nombre: 'Tu nombre',
    telefono: 'Tu teléfono',
    acepto: 'Acepto que el despacho use estos datos y esta conversación para llamarme.',
    privacidad: 'Privacidad',
    privacidadHref: '/privacidad',
    pedirLlamada: 'Quiero que me llaméis',
    enviando: 'Enviando...',
    hecho: 'Hecho. Un abogado del despacho te llamará en horario de despacho, con esta conversación delante. Si te corre un plazo, no esperes: llámanos tú también.',
    errorLlamada: 'No se ha podido enviar. Llámanos o escríbenos por WhatsApp, por favor.',
    faltan: 'Escribe tu nombre y un teléfono, y acepta la casilla.',
    nueva: 'Empezar de nuevo',
  },
  en: {
    lanzador: 'Need help? Ask about your case',
    lanzadorSub: '24/7 chat · instant answers',
    lanzadorAria: 'Open the chat: ask about your case',
    titulo: 'Tierno Centella assistant',
    subtitulo: 'Artificial intelligence · general guidance, not legal advice',
    cerrar: 'Close',
    equipoAlt: 'Jesús Tierno Centella with the team',
    equipo: 'Jesús Tierno and his team',
    equipoTexto: 'Employment lawyers at Jorge Juan, 78 (Madrid). If your case needs it, a person from the firm will help you.',
    bienvenida:
      "Hello. I'm the firm's assistant, an artificial intelligence. I can guide you on dismissals, workplace harassment, permanent disability, pregnancy and work-life balance: tell me what's happening and I'll tell you which deadlines apply and what to do next. I can make mistakes, so a lawyer should review what I tell you.",
    escribiendo: 'Typing...',
    llamar: 'Call',
    teLlamamos: 'Call me back',
    herramientas: 'Tools',
    herramientasHref: '/en/tools',
    placeholder: 'Type your question here',
    enviar: 'Send',
    hablar: 'Speak',
    escuchando: 'Listening... tap again to stop',
    sinVoz: 'Your browser does not support dictation. You can type your question.',
    vozError: 'The microphone could not be used. Check the browser permission or type your question.',
    tuMensaje: 'Your message',
    aviso: 'This is an AI and it can make mistakes; it does not replace a lawyer. We keep the conversation to help you better; please do not share personal data you do not need to.',
    errorBase: "I couldn't answer.",
    errorContacto: (t: string, w: string) => `You can call us on +34 ${t} or message us on WhatsApp at +34 ${w}.`,
    waBase: 'Hello, I come from the website chat and I would like to ask about my case.',
    waConTema: (tema: string) => `Hello, I come from the website chat. My question: ${tema}`,
    llamadaTitulo: 'Shall we call you?',
    llamadaTexto: 'Leave your name and phone number. A lawyer from the firm will call you, already knowing what we talked about here.',
    nombre: 'Your name',
    telefono: 'Your phone',
    acepto: 'I agree that the firm may use these details and this conversation to call me.',
    privacidad: 'Privacy (in Spanish)',
    privacidadHref: '/privacidad',
    pedirLlamada: 'Please call me',
    enviando: 'Sending...',
    hecho: 'Done. A lawyer from the firm will call you during office hours, with this conversation in front of them. If a deadline is running, do not wait: call us too.',
    errorLlamada: "It couldn't be sent. Please call us or message us on WhatsApp.",
    faltan: 'Please write your name and a phone number, and tick the box.',
    nueva: 'Start again',
  },
};

// Preguntas sugeridas según la página en la que está la persona.
const SUGERENCIAS: Record<Idioma, { ruta: string; preguntas: string[] }[]> = {
  es: [
    { ruta: '/despido', preguntas: ['Me acaban de despedir, ¿qué hago?', '¿Cuánto me corresponde de indemnización?', '¿Qué plazo tengo para reclamar?', '¿Mi despido puede ser nulo?'] },
    { ruta: '/calculadora-indemnizacion', preguntas: ['¿Cuánto me corresponde de indemnización?', '¿Qué plazo tengo para reclamar?', '¿Me conviene firmar el finiquito?', '¿Cuánto cuesta la consulta?'] },
    { ruta: '/acoso-laboral', preguntas: ['Creo que sufro acoso en el trabajo', '¿Cómo demuestro el acoso?', '¿Puedo irme de la empresa con indemnización?', 'Estoy de baja por ansiedad, ¿qué hago?'] },
    { ruta: '/incapacidad-permanente', preguntas: ['Me han denegado la incapacidad, ¿qué hago?', '¿Qué grado de incapacidad puedo pedir?', '¿Cuánto se cobra?', '¿Qué plazo tengo para reclamar?'] },
    { ruta: '/mujer-y-trabajo', preguntas: ['Me han despedido estando embarazada', '¿Puedo reducir mi jornada para cuidar a mis hijos?', '¿Cuántas semanas de permiso me corresponden?', 'Sufro acoso sexual en el trabajo'] },
    { ruta: '/herramientas', preguntas: ['¿Qué herramienta me sirve para mi caso?', 'Me acaban de despedir, ¿qué hago?', 'Creo que sufro acoso en el trabajo', '¿Cuánto cuesta la consulta?'] },
    { ruta: '/empresas', preguntas: ['¿Qué protocolo de acoso necesita mi empresa?', '¿Es obligatorio el canal de denuncias?', 'Tenemos una denuncia interna de acoso, ¿qué hacemos?', '¿Cuánto cuesta la consulta?'] },
    { ruta: '/', preguntas: ['Me acaban de despedir, ¿qué hago?', 'Creo que sufro acoso en el trabajo', 'Me han denegado la incapacidad', '¿Cuánto cuesta la consulta?'] },
  ],
  en: [
    { ruta: '/en/dismissal', preguntas: ["I've just been dismissed, what should I do?", 'How much compensation am I owed?', 'What is the deadline to challenge it?', 'Could my dismissal be void?'] },
    { ruta: '/en/workplace-harassment', preguntas: ["I think I'm being harassed at work", 'How can I prove harassment?', 'Can I leave my job with compensation?', "I'm on sick leave for anxiety, what should I do?"] },
    { ruta: '/en/permanent-disability', preguntas: ['My permanent disability was denied, what now?', 'Which degree of disability can I ask for?', 'How much would I receive?', 'What is the deadline to appeal?'] },
    { ruta: '/en/women-at-work', preguntas: ['I was dismissed while pregnant', 'Can I reduce my hours to look after my children?', 'How many weeks of leave am I entitled to?', "I'm being sexually harassed at work"] },
    { ruta: '/en', preguntas: ["I've just been dismissed, what should I do?", "I think I'm being harassed at work", 'My permanent disability was denied', 'How much does a consultation cost?'] },
  ],
};

function sugerenciasPara(ruta: string, idioma: Idioma) {
  return (SUGERENCIAS[idioma].find((s) => (s.ruta === '/' || s.ruta === '/en' ? ruta === s.ruta : ruta.startsWith(s.ruta))) ?? SUGERENCIAS[idioma][SUGERENCIAS[idioma].length - 1]).preguntas;
}

// Formato mínimo: párrafos, listas, negritas y enlaces. Escapa todo lo demás.
function formatear(texto: string) {
  const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const enLinea = (s: string) =>
    escapar(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\((\/[^)\s]*|https?:\/\/[^)\s]+)\)/g, '<a href="$2">$1</a>')
      .replace(
        /(^|[\s(])(\/(?:calculadora-indemnizacion|herramientas\/[a-z-]+|acoso-laboral(?:\/[a-z-]+)?|despido(?:\/[a-z-]+)?|incapacidad-permanente(?:\/[a-z0-9-]+)?|mujer-y-trabajo(?:\/[a-z-]+)?|redes-y-medios|blog\/[a-z0-9-]+|sentencias|contacto|en(?:\/[a-z0-9-]+)*))(?=[\s).,;]|$)/g,
        '$1<a href="$2">$2</a>',
      );
  const bloques = texto.trim().split(/\n{2,}/);
  return bloques
    .map((b) => {
      const lineas = b.split('\n');
      if (lineas.every((l) => /^\s*[-*]\s+/.test(l))) return `<ul>${lineas.map((l) => `<li>${enLinea(l.replace(/^\s*[-*]\s+/, ''))}</li>`).join('')}</ul>`;
      if (lineas.every((l) => /^\s*\d+[.)]\s+/.test(l))) return `<ol>${lineas.map((l) => `<li>${enLinea(l.replace(/^\s*\d+[.)]\s+/, ''))}</li>`).join('')}</ol>`;
      return `<p>${lineas.map(enLinea).join('<br>')}</p>`;
    })
    .join('');
}

// Resumen de la conversación para el correo al despacho: lo que escribió la persona, completo,
// y lo esencial de las respuestas.
function resumenConversacion(mensajes: Mensaje[]) {
  const partes = mensajes.map((m) => `${m.role === 'user' ? 'PERSONA' : 'ASISTENTE'}: ${m.content.replace(/\s+/g, ' ').trim()}`);
  let texto = partes.join('\n\n');
  if (texto.length > 2900) {
    const persona = mensajes
      .filter((m) => m.role === 'user')
      .map((m) => `PERSONA: ${m.content.replace(/\s+/g, ' ').trim()}`)
      .join('\n\n');
    texto = persona.slice(0, 2900);
  }
  return texto;
}

type Guardado = { mensajes: Mensaje[]; abierto: boolean; id?: string };

const nuevoId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  const h = () => Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0');
  return `${h()}${h()}-${h()}-4${h().slice(1)}-8${h().slice(1)}-${h()}${h()}${h()}`;
};

function leerGuardado(): Guardado | null {
  try {
    const v = sessionStorage.getItem(CLAVE);
    return v ? (JSON.parse(v) as Guardado) : null;
  } catch {
    return null;
  }
}

export default function Asistente() {
  const ruta = usePathname() || '/';
  const idioma = idiomaDe(ruta);
  const t = TEXTOS[idioma];
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [texto, setTexto] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const [oyendo, setOyendo] = useState(false);
  const [avisoVoz, setAvisoVoz] = useState('');
  const reconocedor = useRef<any>(null);
  const textoBase = useRef('');
  function hablar() {
    setAvisoVoz('');
    if (oyendo) {
      reconocedor.current?.stop();
      return;
    }
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      setAvisoVoz(t.sinVoz);
      return;
    }
    const r = new SR();
    r.lang = idioma === 'en' ? 'en-GB' : 'es-ES';
    r.interimResults = true;
    r.continuous = true;
    textoBase.current = texto ? texto.trim() + ' ' : '';
    r.onresult = (e: any) => {
      let dicho = '';
      for (let i = 0; i < e.results.length; i++) dicho += e.results[i][0].transcript;
      setTexto(textoBase.current + dicho);
    };
    r.onerror = (e: any) => {
      if (e.error !== 'no-speech' && e.error !== 'aborted') setAvisoVoz(t.vozError);
    };
    r.onend = () => {
      setOyendo(false);
      reconocedor.current = null;
      campo.current?.focus();
    };
    try {
      r.start();
      reconocedor.current = r;
      setOyendo(true);
    } catch {
      setAvisoVoz(t.vozError);
    }
  }
  useEffect(() => () => reconocedor.current?.abort?.(), []);
  const [cargado, setCargado] = useState(false);
  const [conversacion, setConversacion] = useState('');
  const [llamada, setLlamada] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [acepto, setAcepto] = useState(false);
  const [estadoLlamada, setEstadoLlamada] = useState<'' | 'enviando' | 'hecho' | 'error'>('');
  const [msgLlamada, setMsgLlamada] = useState('');
  const lista = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLTextAreaElement>(null);

  // Recupera la conversación de esta visita.
  useEffect(() => {
    const g = leerGuardado();
    setConversacion(g?.id || nuevoId());
    if (g?.mensajes?.length) {
      setMensajes(g.mensajes.filter((m) => m.content));
      if (g.abierto) setAbierto(true);
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado || escribiendo) return;
    try {
      sessionStorage.setItem(CLAVE, JSON.stringify({ mensajes, abierto, id: conversacion }));
    } catch {}
  }, [mensajes, abierto, cargado, escribiendo, conversacion]);

  useEffect(() => {
    const abrir = () => setAbierto(true);
    window.addEventListener('abrir-asistente', abrir);
    return () => window.removeEventListener('abrir-asistente', abrir);
  }, []);

  // La tecla Escape cierra el chat.
  useEffect(() => {
    if (!abierto) return;
    const tecla = (e: KeyboardEvent) => { if (e.key === 'Escape') setAbierto(false); };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [abierto]);

  useEffect(() => {
    // Al abrir sin conversación, se ve el principio (la foto del equipo); después, siempre lo último.
    if (mensajes.length) lista.current?.scrollTo({ top: lista.current.scrollHeight });
  }, [mensajes, abierto, llamada]);

  useEffect(() => {
    if (abierto && !llamada) campo.current?.focus();
  }, [abierto, llamada]);

  async function enviar(contenido: string) {
    const limpio = contenido.trim();
    if (!limpio || escribiendo) return;
    const historial: Mensaje[] = [...mensajes, { role: 'user', content: limpio }];
    setMensajes([...historial, { role: 'assistant', content: '' }]);
    setTexto('');
    setEscribiendo(true);
    medir('chat_mensaje', { numero: historial.filter((m) => m.role === 'user').length, idioma });
    try {
      const r = await fetch('/api/asistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensajes: historial, idioma, conversacion, pagina: ruta }),
      });
      if (!r.ok || !r.body) {
        const datos = await r.json().catch(() => ({}));
        throw new Error(datos.error || t.errorBase);
      }
      const lector = r.body.getReader();
      const deco = new TextDecoder();
      let acumulado = '';
      for (;;) {
        const { value, done } = await lector.read();
        if (done) break;
        acumulado += deco.decode(value, { stream: true });
        setMensajes([...historial, { role: 'assistant', content: acumulado }]);
      }
    } catch (e) {
      const motivo = e instanceof Error ? e.message : t.errorBase;
      setMensajes([...historial, { role: 'assistant', content: `${motivo} ${t.errorContacto(DESPACHO.telefono, DESPACHO.whatsapp)}` }]);
    } finally {
      setEscribiendo(false);
    }
  }

  async function pedirLlamada(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || telefono.replace(/\D/g, '').length < 9 || !acepto) {
      setMsgLlamada(t.faltan);
      return;
    }
    setEstadoLlamada('enviando');
    setMsgLlamada('');
    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          telefono,
          acepto,
          tema: idioma === 'en' ? 'Chat (en inglés)' : 'Chat',
          mensaje: `Conversación en el chat de la web:\n\n${resumenConversacion(mensajes)}`,
          origen: `chat en ${ruta}`,
          conversacion,
        }),
      });
      if (!r.ok) throw new Error();
      setEstadoLlamada('hecho');
      medir('formulario_enviado', { tema: 'chat', donde: 'chat', idioma });
    } catch {
      setEstadoLlamada('error');
      setMsgLlamada(t.errorLlamada);
    }
  }

  const primeraPregunta = mensajes.find((m) => m.role === 'user')?.content.replace(/\s+/g, ' ').trim();
  const textoWa = primeraPregunta ? t.waConTema(primeraPregunta.length > 160 ? primeraPregunta.slice(0, 157) + '...' : primeraPregunta) : t.waBase;
  const sugerencias = sugerenciasPara(ruta, idioma);

  return (
    <>
      {!abierto && (
        <button
          type="button"
          className="asistente-boton"
          onClick={() => {
            setAbierto(true);
            medir('chat_abierto', { idioma });
          }}
          aria-label={t.lanzadorAria}
        >
          <span className="asistente-foto">
            <img src="/img/jesus-avatar.webp" alt="" width={44} height={44} />
            <span className="asistente-punto" aria-hidden="true" />
          </span>
          <span className="asistente-texto">
            <strong>{t.lanzador}</strong>
            <small>{t.lanzadorSub}</small>
          </span>
          <span className="asistente-icono" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z" />
              <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
            </svg>
          </span>
        </button>
      )}
      {abierto && (
        <div className="asistente-panel" role="dialog" aria-label={t.titulo}>
          <div className="asistente-cabeza">
            <span className="asistente-cabeza-foto">
              <img src="/img/jesus-avatar.webp" alt="" width={44} height={44} />
              <span className="asistente-punto" aria-hidden="true" />
            </span>
            <div>
              <strong>{t.titulo}</strong>
              <small>{t.subtitulo}</small>
            </div>
            <button type="button" onClick={() => setAbierto(false)}>
              {t.cerrar}
            </button>
          </div>
          <div className="asistente-mensajes" ref={lista} aria-live="polite">
            <figure className="asistente-equipo">
              <img src="/img/equipo-640.webp" alt={t.equipoAlt} width={640} height={360} />
              <figcaption>
                <strong>{t.equipo}</strong>
                <span>{t.equipoTexto}</span>
              </figcaption>
            </figure>
            <div className="burbuja burbuja-asistente">
              <p>{t.bienvenida}</p>
            </div>
            {mensajes.length === 0 && (
              <div className="asistente-sugerencias">
                {sugerencias.map((s) => (
                  <button key={s} type="button" onClick={() => enviar(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            {mensajes.map((m, i) =>
              m.role === 'user' ? (
                <div key={i} className="burbuja burbuja-persona">
                  {m.content}
                </div>
              ) : (
                <div
                  key={i}
                  className="burbuja burbuja-asistente"
                  dangerouslySetInnerHTML={{ __html: m.content ? formatear(m.content) : `<p>${t.escribiendo}</p>` }}
                />
              ),
            )}
            {llamada && (
              <div className="asistente-llamada">
                {estadoLlamada === 'hecho' ? (
                  <p role="status">{t.hecho}</p>
                ) : (
                  <form onSubmit={pedirLlamada}>
                    <strong>{t.llamadaTitulo}</strong>
                    <p>{t.llamadaTexto}</p>
                    <input type="text" autoComplete="name" placeholder={t.nombre} aria-label={t.nombre} value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    <input type="tel" autoComplete="tel" placeholder={t.telefono} aria-label={t.telefono} value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    <label className="casilla">
                      <input type="checkbox" checked={acepto} onChange={(e) => setAcepto(e.target.checked)} />
                      <span>
                        {t.acepto} <a href={t.privacidadHref}>{t.privacidad}</a>.
                      </span>
                    </label>
                    <button type="submit" className="boton boton-marcador" disabled={estadoLlamada === 'enviando'}>
                      {estadoLlamada === 'enviando' ? t.enviando : t.pedirLlamada}
                    </button>
                    {msgLlamada && (
                      <em role="alert" className="asistente-llamada-error">
                        {msgLlamada}{' '}
                        {estadoLlamada === 'error' && (
                          <a href={enlaceWhatsapp(textoWa)} target="_blank" rel="noopener">
                            WhatsApp
                          </a>
                        )}
                      </em>
                    )}
                  </form>
                )}
              </div>
            )}
          </div>
          {mensajes.length > 1 && (
            <div className="asistente-atajos" aria-label={t.teLlamamos}>
              <button type="button" className={llamada ? 'activo' : ''} onClick={() => setLlamada((v) => !v)}>
                {t.teLlamamos}
              </button>
              <a href={DESPACHO.telefonoHref}>{t.llamar}</a>
              <a href={enlaceWhatsapp(textoWa)}>WhatsApp</a>
              <a href={t.herramientasHref}>{t.herramientas}</a>
              <button
                type="button"
                onClick={() => {
                  setMensajes([]);
                  setConversacion(nuevoId());
                  setLlamada(false);
                  setEstadoLlamada('');
                }}
              >
                {t.nueva}
              </button>
            </div>
          )}
          <form
            className="asistente-form"
            onSubmit={(e) => {
              e.preventDefault();
              enviar(texto);
            }}
          >
            <label htmlFor="asistente-texto" className="salta">
              {t.tuMensaje}
            </label>
            <textarea
              id="asistente-texto"
              ref={campo}
              rows={1}
              value={texto}
              placeholder={t.placeholder}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  enviar(texto);
                }
              }}
            />
            <button type="button" className={`asistente-mic${oyendo ? ' oyendo' : ''}`} onClick={hablar} aria-pressed={oyendo} aria-label={oyendo ? t.escuchando : t.hablar} title={oyendo ? t.escuchando : t.hablar}>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
              </svg>
            </button>
            <button type="submit" className="boton" disabled={escribiendo || !texto.trim()}>
              {t.enviar}
            </button>
          </form>
          {(oyendo || avisoVoz) && (
            <p className="asistente-aviso asistente-voz" role="status">
              {oyendo ? t.escuchando : avisoVoz}
            </p>
          )}
          <p className="asistente-aviso">{t.aviso}</p>
        </div>
      )}
    </>
  );
}
