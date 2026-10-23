'use client';

import { useEffect, useMemo, useState } from 'react';
import CuestionarioGuia from './CuestionarioGuia';

export type SeccionGuia = { id: string; titulo: string; html: string; texto: string };
const normal = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const avisar = (datos: Record<string, string>) =>
  fetch('/api/respuestas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos), keepalive: true })
    .then((r) => r.ok)
    .catch(() => false);

// Aviso de visita: no avisa si quien abre es Ignacio (?yo=1 una vez en ese navegador) ni más de una vez cada 4 horas.
function useAvisoVisita() {
  useEffect(() => {
    try {
      const q = location.search;
      if (/[?&]yo=1/.test(q)) return localStorage.setItem('tc-guia-yo', '1');
      if (/[?&]yo=0/.test(q)) localStorage.removeItem('tc-guia-yo');
      if (localStorage.getItem('tc-guia-yo')) return;
      const ultima = Number(localStorage.getItem('tc-guia-visita') || 0);
      if (Date.now() - ultima < 4 * 3600000) return;
      localStorage.setItem('tc-guia-visita', String(Date.now()));
      avisar({ tipo: 'visita', dispositivo: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'móvil' : 'ordenador' });
    } catch {}
  }, []);
}

function Reaccion({ id, seccion }: { id: string; seccion: string }) {
  const [elegida, setElegida] = useState('');
  const [msg, setMsg] = useState('');
  const [texto, setTexto] = useState('');
  const [msgTexto, setMsgTexto] = useState('');
  return (
    <div className="gj-reaccion">
      <span>¿Qué te ha parecido esta parte?</span>
      {['Me encanta', 'Me gusta', 'Tengo una duda', 'No lo veo claro'].map((r) => (
        <button
          key={r}
          type="button"
          className={elegida === r ? 'activo' : ''}
          onClick={async () => {
            setElegida(r);
            setMsg('Enviando...');
            const ok = await avisar({ tipo: 'reaccion', id, seccion, reaccion: r });
            setMsg(ok ? 'Gracias. Ignacio lo verá.' : 'Apuntado. Si quieres, cuéntaselo por WhatsApp.');
          }}
        >
          {r}
        </button>
      ))}
      {msg && <em role="status">{msg}</em>}
      <div className="gj-comentario">
        <textarea
          rows={2}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Si quieres, escríbenos lo que piensas de esta parte: una duda, un cambio, algo que te guste o no. Le llega a Ignacio."
          aria-label={`Comentario sobre ${seccion}`}
        />
        <button
          type="button"
          onClick={async () => {
            if (!texto.trim()) return setMsgTexto('Escribe tu comentario y pulsa enviar.');
            setMsgTexto('Enviando...');
            const ok = await avisar({ tipo: 'comentario', id, seccion, reaccion: elegida, texto });
            setMsgTexto(ok ? 'Enviado. Gracias, Jesús: Ignacio ya lo tiene.' : 'No se ha podido enviar. Cuéntaselo por WhatsApp, por favor.');
            if (ok) setTexto('');
          }}
        >
          Enviar comentario
        </button>
        {msgTexto && <em role="status">{msgTexto}</em>}
      </div>
    </div>
  );
}

export default function GuiaJesus({ secciones }: { secciones: SeccionGuia[] }) {
  useAvisoVisita();
  const [q, setQ] = useState('');
  const busca = normal(q.trim());
  const visibles = useMemo(
    () => (busca.length < 2 ? secciones : secciones.filter((s) => normal(s.titulo + ' ' + s.texto).includes(busca))),
    [busca, secciones],
  );
  return (
    <div className="guia-jesus">
      <aside className="gj-lateral">
        <label className="gj-buscar">
          <span>Buscar en la guía</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="reseñas, blog, precio, Instagram..." />
        </label>
        {busca.length >= 2 && (
          <p className="letra-pequena" role="status">
            {visibles.length ? `${visibles.length} apartado${visibles.length > 1 ? 's' : ''} con "${q}"` : `Nada con "${q}"`}
          </p>
        )}
        <nav aria-label="Índice de la guía">
          <strong className="gj-indice-titulo">Índice</strong>
          <ol className="gj-indice">
            {visibles.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.titulo}</a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
      <div className="gj-cuerpo">
        {visibles.map((s) => (
          <section key={s.id} id={s.id} className="gj-seccion">
            <h2>{s.titulo}</h2>
            {s.html.includes('<p>CUESTIONARIO</p>') ? (
              <>
                <div className="prosa" dangerouslySetInnerHTML={{ __html: s.html.replace('<p>CUESTIONARIO</p>', '') }} />
                <CuestionarioGuia />
              </>
            ) : (
              <div className="prosa" dangerouslySetInnerHTML={{ __html: s.html }} />
            )}
            <Reaccion id={s.id} seccion={s.titulo} />
            <a className="gj-arriba" href="#indice-guia">
              Volver arriba
            </a>
          </section>
        ))}
      </div>
    </div>
  );
}
