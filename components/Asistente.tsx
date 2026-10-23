'use client';

import { useEffect, useRef, useState } from 'react';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { medir } from '@/lib/medir';

type Mensaje = { role: 'user' | 'assistant'; content: string };

const SUGERENCIAS = [
  'Me acaban de despedir, ¿qué hago?',
  'Creo que sufro acoso en el trabajo',
  'Me han denegado la incapacidad',
  '¿Cuánto cuesta la consulta?',
];

const BIENVENIDA =
  'Hola. Soy el asistente del despacho, una inteligencia artificial. Te oriento en despidos, acoso laboral, incapacidad, embarazo y conciliación: cuéntame qué te pasa y te digo qué plazos corren y cuál es el siguiente paso. Puedo equivocarme, así que lo que te diga conviene que lo revise un abogado.';

// Formato mínimo: párrafos, listas, negritas y enlaces. Escapa todo lo demás.
function formatear(texto: string) {
  const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const enLinea = (s: string) =>
    escapar(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\((\/[^)\s]*|https?:\/\/[^)\s]+)\)/g, '<a href="$2">$1</a>')
      .replace(/(^|[\s(])(\/(?:calculadora-indemnizacion|herramientas\/[a-z-]+|acoso-laboral(?:\/[a-z-]+)?|despido(?:\/[a-z-]+)?|incapacidad-permanente(?:\/[a-z0-9-]+)?|mujer-y-trabajo(?:\/[a-z-]+)?|redes-y-medios|blog\/[a-z0-9-]+|sentencias|contacto))(?=[\s).,;]|$)/g, '$1<a href="$2">$2</a>');
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

export default function Asistente() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [texto, setTexto] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const lista = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const abrir = () => setAbierto(true);
    window.addEventListener('abrir-asistente', abrir);
    return () => window.removeEventListener('abrir-asistente', abrir);
  }, []);

  useEffect(() => {
    // Al abrir sin conversación, se ve el principio (la foto del equipo); después, siempre lo último.
    if (mensajes.length) lista.current?.scrollTo({ top: lista.current.scrollHeight });
  }, [mensajes, abierto]);

  useEffect(() => {
    if (abierto) campo.current?.focus();
  }, [abierto]);

  async function enviar(contenido: string) {
    const limpio = contenido.trim();
    if (!limpio || escribiendo) return;
    const historial: Mensaje[] = [...mensajes, { role: 'user', content: limpio }];
    setMensajes([...historial, { role: 'assistant', content: '' }]);
    setTexto('');
    setEscribiendo(true);
    medir('chat_mensaje', { numero: historial.filter((m) => m.role === 'user').length });
    try {
      const r = await fetch('/api/asistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensajes: historial }),
      });
      if (!r.ok || !r.body) {
        const datos = await r.json().catch(() => ({}));
        throw new Error(datos.error || 'No he podido responder.');
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
      const motivo = e instanceof Error ? e.message : 'No he podido responder.';
      setMensajes([
        ...historial,
        { role: 'assistant', content: `${motivo} Puedes llamarnos al ${DESPACHO.telefono} o escribir por WhatsApp al ${DESPACHO.whatsapp}.` },
      ]);
    } finally {
      setEscribiendo(false);
    }
  }

  return (
    <>
      {!abierto && (
        <button
          type="button"
          className="asistente-boton"
          onClick={() => {
            setAbierto(true);
            medir('chat_abierto');
          }}
          aria-label="Abrir el chat: pregunta tu caso"
        >
          <span className="asistente-foto">
            <img src="/img/jesus-avatar.webp" alt="" width={44} height={44} />
            <span className="asistente-punto" aria-hidden="true" />
          </span>
          <span className="asistente-texto">
            <strong>¿Hablamos? Pregunta tu caso</strong>
            <small>Chat 24 h · respuesta al momento</small>
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
        <div className="asistente-panel" role="dialog" aria-label="Asistente del despacho">
          <div className="asistente-cabeza">
            <span className="asistente-cabeza-foto">
              <img src="/img/jesus-avatar.webp" alt="" width={44} height={44} />
              <span className="asistente-punto" aria-hidden="true" />
            </span>
            <div>
              <strong>Asistente de Tierno Centella</strong>
              <small>Inteligencia artificial · orientación general, no asesoramiento</small>
            </div>
            <button type="button" onClick={() => setAbierto(false)}>
              Cerrar
            </button>
          </div>
          <div className="asistente-mensajes" ref={lista} aria-live="polite">
            <figure className="asistente-equipo">
              <img src="/img/equipo-640.webp" alt="Jesús Tierno Centella con el equipo del despacho" width={640} height={360} />
              <figcaption>
                <strong>Jesús Tierno y su equipo</strong>
                <span>Abogados laboralistas en Jorge Juan, 78 (Madrid). Si tu caso lo necesita, te atiende una persona del despacho.</span>
              </figcaption>
            </figure>
            <div className="burbuja burbuja-asistente">
              <p>{BIENVENIDA}</p>
            </div>
            {mensajes.length === 0 && (
              <div className="asistente-sugerencias">
                {SUGERENCIAS.map((s) => (
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
                  dangerouslySetInnerHTML={{ __html: m.content ? formatear(m.content) : '<p>Escribiendo...</p>' }}
                />
              ),
            )}
          </div>
          {mensajes.length > 1 && (
            <div className="asistente-atajos" aria-label="Hablar con el despacho">
              <a href={DESPACHO.telefonoHref}>
                Llamar
              </a>
              <a href={enlaceWhatsapp('Hola, vengo del chat de la web y quiero consultar mi caso.')}>
                WhatsApp
              </a>
              <a href="/contacto">Que me llamen</a>
              <a href="/herramientas">Herramientas</a>
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
              Tu mensaje
            </label>
            <textarea
              id="asistente-texto"
              ref={campo}
              rows={1}
              value={texto}
              placeholder="Escribe aquí tu pregunta"
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  enviar(texto);
                }
              }}
            />
            <button type="submit" className="boton" disabled={escribiendo || !texto.trim()}>
              Enviar
            </button>
          </form>
          <p className="asistente-aviso">Es una inteligencia artificial y puede equivocarse; no sustituye a un abogado. No escribas datos personales que no sean necesarios.</p>
        </div>
      )}
    </>
  );
}
