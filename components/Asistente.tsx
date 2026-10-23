'use client';

import { useEffect, useRef, useState } from 'react';
import { DESPACHO } from '@/lib/despacho';

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
    lista.current?.scrollTo({ top: lista.current.scrollHeight });
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
        <button type="button" className="asistente-boton" onClick={() => setAbierto(true)}>
          <img src="/img/jesus-retrato.webp" srcSet="/img/jesus-retrato-640.webp 640w, /img/jesus-retrato.webp 1080w" sizes="(max-width: 860px) 100vw, 50vw" alt="" />
          Pregunta tu caso
        </button>
      )}
      {abierto && (
        <div className="asistente-panel" role="dialog" aria-label="Asistente del despacho">
          <div className="asistente-cabeza">
            <div>
              <strong>Asistente del despacho</strong>
              <small>Inteligencia artificial. Puede equivocarse. Orientación general, no asesoramiento.</small>
            </div>
            <button type="button" onClick={() => setAbierto(false)}>
              Cerrar
            </button>
          </div>
          <div className="asistente-mensajes" ref={lista} aria-live="polite">
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
          <p className="asistente-aviso">No sustituye a un abogado. No escribas datos personales que no sean necesarios.</p>
        </div>
      )}
    </>
  );
}
