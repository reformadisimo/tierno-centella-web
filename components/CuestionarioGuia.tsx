'use client';

import { useEffect, useState } from 'react';
import { PREGUNTAS_GUIA } from '@/lib/preguntas-guia';

const CLAVE = 'tc-guia-respuestas';
type Resp = Record<string, string>;

export default function CuestionarioGuia() {
  const [r, setR] = useState<Resp>({});
  const [msg, setMsg] = useState('');
  useEffect(() => {
    try {
      setR(JSON.parse(localStorage.getItem(CLAVE) || '{}'));
    } catch {}
  }, []);
  const poner = (k: string, v: string) =>
    setR((x) => {
      const n = { ...x, [k]: v };
      try {
        localStorage.setItem(CLAVE, JSON.stringify(n));
      } catch {}
      return n;
    });
  const texto = () =>
    'Respuestas de Jesús Tierno a la guía\n\n' +
    PREGUNTAS_GUIA.map((p) => {
      const partes = [r['o' + p.n], r['t' + p.n]].filter((x) => x && x.trim());
      return `${p.n}. ${p.pregunta}\n   ${partes.length ? partes.join(' - ') : '(sin respuesta)'}`;
    }).join('\n\n');
  const contestadas = PREGUNTAS_GUIA.filter((p) => r['o' + p.n] || (r['t' + p.n] ?? '').trim()).length;

  async function enviar() {
    setMsg('Enviando...');
    try {
      const res = await fetch('/api/respuestas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tipo: 'respuestas', texto: texto() }) });
      const j = await res.json().catch(() => ({ ok: false }));
      setMsg(j.ok ? 'Enviado. Gracias, Jesús: Ignacio ya lo tiene. Puedes seguir editando y volver a enviar.' : 'No se ha podido enviar desde aquí. Usa "Copiar respuestas" y mándalas por WhatsApp o correo.');
    } catch {
      setMsg('No se ha podido enviar desde aquí. Usa "Copiar respuestas" y mándalas por WhatsApp o correo.');
    }
  }
  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto());
      setMsg('Copiadas. Pégalas en un WhatsApp o un correo a Ignacio.');
    } catch {
      setMsg('Tu navegador no deja copiar. Usa el botón de correo.');
    }
  }

  let bloque = '';
  return (
    <div className="cuestionario-guia">
      <div className="recuadro">
        <p>
          Son {PREGUNTAS_GUIA.length} preguntas cortas. Pulsa las opciones o escribe; si no sabes algo, pon "No sé". Tus respuestas se guardan solas en este
          dispositivo mientras escribes. Llevas <strong>{contestadas}</strong> de {PREGUNTAS_GUIA.length}.
        </p>
      </div>
      {PREGUNTAS_GUIA.map((p) => {
        const titulo = p.bloque !== bloque ? (bloque = p.bloque) : null;
        return (
          <div key={p.n}>
            {titulo && <h3 className="cg-bloque">{titulo}</h3>}
            <div className="cg-pregunta">
              <div className="cg-cabeza">
                <span className="cg-n">{p.n}</span>
                <strong>{p.pregunta}</strong>
              </div>
              {p.opciones && (
                <div className="filtros-chips" style={{ marginTop: 10 }}>
                  {p.opciones.map((o) => (
                    <button key={o} type="button" className={r['o' + p.n] === o ? 'activo' : ''} onClick={() => poner('o' + p.n, r['o' + p.n] === o ? '' : o)}>
                      {o}
                    </button>
                  ))}
                </div>
              )}
              <textarea
                rows={2}
                placeholder={p.pista ?? 'Escribe aquí'}
                value={r['t' + p.n] ?? ''}
                onChange={(e) => poner('t' + p.n, e.target.value)}
                aria-label={p.pregunta}
              />
            </div>
          </div>
        );
      })}
      <div className="acciones" style={{ marginTop: 20 }}>
        <button type="button" className="boton boton-marcador" onClick={enviar}>
          Enviar a Ignacio
        </button>
        <button type="button" className="boton boton-claro" onClick={copiar}>
          Copiar respuestas
        </button>
        <a className="boton boton-claro" href={`mailto:?subject=${encodeURIComponent('Respuestas a la guía de la web')}&body=${encodeURIComponent(texto())}`}>
          Enviar por correo
        </a>
      </div>
      {msg && (
        <p role="status" className="letra-pequena" style={{ fontSize: '0.95rem' }}>
          {msg}
        </p>
      )}
    </div>
  );
}
