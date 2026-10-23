'use client';

import { useEffect, useMemo, useState } from 'react';

// Panel privado: lee las conversaciones guardadas con una contraseña (la comprueba la base de datos).
const URL_BASE = 'https://thzntlymcsazcjrddqjm.supabase.co';
const CLAVE_PUBLICA = 'sb_publishable_rkrwbrgbW_ebOtWTSoY_mA_LZu8SsT5';

type Fila = { creado: string; conversacion: string; rol: 'user' | 'assistant' | 'llamada'; contenido: string; pagina: string | null; idioma: string };
type Conversacion = { id: string; inicio: string; fin: string; filas: Fila[]; llamada?: Fila; idioma: string; pagina: string };

const fecha = (iso: string) => new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Madrid' }).format(new Date(iso));

export default function PanelConversaciones() {
  const [clave, setClave] = useState('');
  const [dias, setDias] = useState(30);
  const [filas, setFilas] = useState<Fila[] | null>(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [filtro, setFiltro] = useState<'todas' | 'llamadas'>('todas');
  const [abierta, setAbierta] = useState('');

  async function cargar(c = clave, d = dias) {
    if (!c) return;
    setCargando(true);
    setError('');
    try {
      const r = await fetch(`${URL_BASE}/rest/v1/rpc/tc_chat_leer`, {
        method: 'POST',
        headers: { apikey: CLAVE_PUBLICA, Authorization: `Bearer ${CLAVE_PUBLICA}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_clave: c, p_dias: d }),
      });
      if (!r.ok) throw new Error(r.status === 400 ? 'Contraseña incorrecta.' : 'No se han podido cargar las conversaciones.');
      setFilas(await r.json());
      try {
        sessionStorage.setItem('tc-panel', c);
      } catch {}
    } catch (e) {
      setFiltro('todas');
      setFilas(null);
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    try {
      const c = new URLSearchParams(location.search).get('clave') || sessionStorage.getItem('tc-panel');
      if (c) {
        setClave(c);
        cargar(c);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const conversaciones = useMemo(() => {
    if (!filas) return [];
    const mapa = new Map<string, Conversacion>();
    for (const f of [...filas].reverse()) {
      const c = mapa.get(f.conversacion) ?? { id: f.conversacion, inicio: f.creado, fin: f.creado, filas: [], idioma: f.idioma, pagina: f.pagina ?? '' };
      if (f.rol === 'llamada') c.llamada = f;
      else c.filas.push(f);
      c.fin = f.creado;
      mapa.set(f.conversacion, c);
    }
    return [...mapa.values()].sort((a, b) => b.fin.localeCompare(a.fin));
  }, [filas]);

  const visibles = filtro === 'llamadas' ? conversaciones.filter((c) => c.llamada) : conversaciones;

  function exportar() {
    if (!filas) return;
    const esc = (s: string) => `"${(s ?? '').replace(/"/g, '""')}"`;
    const csv = ['Fecha;Conversación;Quién;Mensaje;Página;Idioma', ...[...filas].reverse().map((f) => [fecha(f.creado), f.conversacion.slice(0, 8), f.rol === 'user' ? 'Persona' : f.rol === 'assistant' ? 'Asistente' : 'Pide llamada', f.contenido, f.pagina ?? '', f.idioma].map((x) => esc(String(x))).join(';'))].join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `conversaciones-chat-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  if (!filas)
    return (
      <form
        className="panel-acceso"
        onSubmit={(e) => {
          e.preventDefault();
          cargar();
        }}
      >
        <label htmlFor="panel-clave">Contraseña del despacho</label>
        <div>
          <input id="panel-clave" type="password" autoComplete="current-password" value={clave} onChange={(e) => setClave(e.target.value)} />
          <button type="submit" className="boton" disabled={cargando || !clave}>
            {cargando ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
      </form>
    );

  const llamadas = conversaciones.filter((c) => c.llamada).length;
  return (
    <div className="panel">
      <div className="panel-resumen">
        <div>
          <strong>{conversaciones.length}</strong>
          <span>conversaciones</span>
        </div>
        <div>
          <strong>{llamadas}</strong>
          <span>pidieron que les llamarais</span>
        </div>
        <div>
          <strong>{conversaciones.filter((c) => c.idioma === 'en').length}</strong>
          <span>en inglés</span>
        </div>
      </div>
      <div className="panel-controles">
        <select value={dias} onChange={(e) => (setDias(Number(e.target.value)), cargar(clave, Number(e.target.value)))} aria-label="Periodo">
          <option value={1}>Hoy</option>
          <option value={7}>Últimos 7 días</option>
          <option value={30}>Últimos 30 días</option>
          <option value={365}>Último año</option>
        </select>
        <button type="button" className={filtro === 'todas' ? 'activo' : ''} onClick={() => setFiltro('todas')}>
          Todas
        </button>
        <button type="button" className={filtro === 'llamadas' ? 'activo' : ''} onClick={() => setFiltro('llamadas')}>
          Solo las que piden llamada
        </button>
        <button type="button" className="boton boton-claro" onClick={exportar}>
          Descargar en Excel (CSV)
        </button>
      </div>
      {!visibles.length && <p>Todavía no hay conversaciones en este periodo.</p>}
      <ul className="panel-lista">
        {visibles.map((c) => (
          <li key={c.id} className={c.llamada ? 'con-llamada' : ''}>
            <button type="button" onClick={() => setAbierta(abierta === c.id ? '' : c.id)} aria-expanded={abierta === c.id}>
              <span className="panel-fecha">{fecha(c.inicio)}</span>
              <strong>{c.filas.find((f) => f.rol === 'user')?.contenido.slice(0, 140) || '(sin mensajes)'}</strong>
              <small>
                {c.filas.length} mensajes · {c.idioma === 'en' ? 'inglés' : 'español'} · {c.pagina}
                {c.llamada ? ' · PIDE LLAMADA' : ''}
              </small>
            </button>
            {abierta === c.id && (
              <div className="panel-conversacion">
                {c.llamada && <p className="panel-llamada">{c.llamada.contenido}</p>}
                {c.filas.map((f, i) => (
                  <p key={i} className={f.rol === 'user' ? 'panel-persona' : 'panel-asistente'}>
                    <b>{f.rol === 'user' ? 'Persona' : 'Asistente'}</b> {f.contenido}
                  </p>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
