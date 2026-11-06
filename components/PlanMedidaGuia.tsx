'use client';

// «Tu plan a medida, en 2 minutos»: preguntas de pulsar para preparar el plan de Jesús.
// Se guarda solo en este navegador mientras contesta y se nos envía por /api/respuestas (aviso por correo a Ig).
import { esYo } from '@/lib/propios';
import { useEffect, useState } from 'react';
import { PREGUNTAS_PLAN } from '@/lib/plan-medida';

const CLAVE = 'tc-plan-medida';
type Resp = Record<string, string>;

export default function PlanMedidaGuia() {
  const [r, setR] = useState<Resp>({});
  const [msg, setMsg] = useState('');
  useEffect(() => {
    try {
      setR(JSON.parse(localStorage.getItem(CLAVE) || '{}'));
    } catch {}
  }, []);
  const guardar = (n: Resp) => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(n));
    } catch {}
    return n;
  };
  const elegidas = (k: string) => (r[k] ? r[k].split(' · ') : []);
  const pulsar = (k: string, v: string, varias?: boolean) =>
    setR((x) => {
      const ya = x[k] ? x[k].split(' · ') : [];
      const nuevo = varias ? (ya.includes(v) ? ya.filter((y) => y !== v) : [...ya, v]) : ya[0] === v ? [] : [v];
      return guardar({ ...x, [k]: nuevo.join(' · ') });
    });
  const escribir = (k: string, v: string) => setR((x) => guardar({ ...x, [k]: v }));

  const texto = () =>
    'Plan a medida: respuestas de Jesús Tierno\n\n' +
    PREGUNTAS_PLAN.map((p) => {
      const partes = [r['o' + p.n], r['t' + p.n]].filter((x) => x && x.trim());
      return `${p.n}. ${p.pregunta}\n   ${partes.length ? partes.join(' - ') : '(sin respuesta)'}`;
    }).join('\n\n') +
    (r.extra?.trim() ? `\n\nAlgo más: ${r.extra.trim()}` : '');
  const contestadas = PREGUNTAS_PLAN.filter((p) => r['o' + p.n] || (r['t' + p.n] ?? '').trim()).length;

  async function enviar() {
    setMsg('Enviando...');
    try {
      if (esYo()) {
        setMsg('Modo prueba (?yo=1): no se envía nada. Jesús sí te las mandará.');
        return;
      }
      const res = await fetch('/api/respuestas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tipo: 'respuestas', texto: texto() }) });
      const j = await res.json().catch(() => ({ ok: false }));
      setMsg(j.ok ? 'Enviado. Gracias, Jesús: con esto te preparamos tu plan.' : 'No se ha podido enviar desde aquí. Usa "Copiar respuestas" y mándalas por WhatsApp o correo.');
    } catch {
      setMsg('No se ha podido enviar desde aquí. Usa "Copiar respuestas" y mándalas por WhatsApp o correo.');
    }
  }
  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto());
      setMsg('Copiadas. Pégalas en un WhatsApp o un correo para nosotros.');
    } catch {
      setMsg('Tu navegador no deja copiar. Usa el otro botón.');
    }
  }

  let bloque = '';
  return (
    <div className="cuestionario-guia plan-medida" id="plan-a-medida">
      <div className="recuadro">
        <p>
          Son {PREGUNTAS_PLAN.length} preguntas y casi todas se contestan pulsando. Si no sabes algo, pulsa «No lo sé» o sáltala. Se guarda solo mientras
          contestas. Llevas <strong>{contestadas}</strong> de {PREGUNTAS_PLAN.length}.
        </p>
      </div>
      {PREGUNTAS_PLAN.map((p) => {
        const titulo = p.bloque !== bloque ? (bloque = p.bloque) : null;
        const sel = elegidas('o' + p.n);
        return (
          <div key={p.n}>
            {titulo && <h3 className="cg-bloque">{titulo}</h3>}
            <div className="cg-pregunta">
              <div className="cg-cabeza">
                <span className="cg-n">{p.n}</span>
                <strong>{p.pregunta}</strong>
              </div>
              {p.varias && <p className="pm-varias">Puedes marcar varias.</p>}
              {p.opciones && (
                <div className="filtros-chips" style={{ marginTop: 10 }}>
                  {p.opciones.map((o) => (
                    <button key={o} type="button" aria-pressed={sel.includes(o)} className={sel.includes(o) ? 'activo' : ''} onClick={() => pulsar('o' + p.n, o, p.varias)}>
                      {o}
                    </button>
                  ))}
                </div>
              )}
              {p.pista && (
                <textarea rows={2} placeholder={p.pista} value={r['t' + p.n] ?? ''} onChange={(e) => escribir('t' + p.n, e.target.value)} aria-label={p.pregunta} />
              )}
            </div>
          </div>
        );
      })}
      <div className="cg-pregunta">
        <div className="cg-cabeza">
          <strong>¿Algo más que debamos saber para tu plan?</strong>
        </div>
        <textarea rows={2} placeholder="Opcional" value={r.extra ?? ''} onChange={(e) => escribir('extra', e.target.value)} aria-label="Algo más para tu plan" />
      </div>
      <div className="acciones" style={{ marginTop: 20 }}>
        <button type="button" className="boton boton-marcador" onClick={enviar}>
          Enviárnoslo
        </button>
        <button type="button" className="boton boton-claro" onClick={copiar}>
          Copiar respuestas
        </button>
      </div>
      {msg && (
        <p role="status" className="letra-pequena" style={{ fontSize: '0.95rem' }}>
          {msg}
        </p>
      )}
    </div>
  );
}
