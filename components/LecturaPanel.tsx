'use client';

// Panel de la lupa: qué ha visto el cliente en la guía, cuánto tiempo y dónde se ha fijado más.
// Solo lo ve quien tenga sesión en el CRM (lo exige la base de datos).
import { useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabaseCrm } from '@/lib/crm';
import type { ApartadoGuia } from '@/lib/guia-indice';

type Fila = { id: number; creado: string; pantalla: string; visitante: string; sesion: string; propio: boolean; dispositivo: string | null; navegador: string | null; ciudad: string | null; seccion_id: string | null; seccion_titulo: string | null; segundos: number; max_scroll: number | null };
type Evento = { id: number; creado: string; visitante: string; sesion: string; propio: boolean; tipo: string; seccion: string | null; texto: string | null };

const dur = (s: number) => (s >= 3600 ? `${Math.floor(s / 3600)} h ${Math.floor((s % 3600) / 60)} min` : s >= 60 ? `${Math.floor(s / 60)} min ${s % 60} s` : `${s} s`);
const fecha = (d: string) => new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }).format(new Date(d));

export default function LecturaPanel({ indice }: { indice: ApartadoGuia[] }) {
  const sb = useMemo(() => supabaseCrm(), []);
  const [sesion, setSesion] = useState<Session | null | undefined>(undefined);
  const [filas, setFilas] = useState<Fila[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [error, setError] = useState('');
  const [conPropios, setConPropios] = useState(false);
  const [visitante, setVisitante] = useState('todos');

  useEffect(() => {
    sb.auth.getSession().then(({ data }) => setSesion(data.session));
    const { data } = sb.auth.onAuthStateChange((_e, s) => setSesion(s));
    return () => data.subscription.unsubscribe();
  }, [sb]);

  const cargar = async () => {
    const desde = new Date(Date.now() - 60 * 86400000).toISOString();
    const [a, b] = await Promise.all([
      sb.from('guia_lecturas').select('*').gte('creado', desde).order('creado', { ascending: false }).limit(5000),
      sb.from('guia_eventos').select('*').gte('creado', desde).order('creado', { ascending: false }).limit(500),
    ]);
    if (a.error || b.error) return setError('No tienes permiso para ver esto o ha fallado la carga.');
    setFilas((a.data as Fila[]) || []);
    setEventos((b.data as Evento[]) || []);
  };
  useEffect(() => {
    if (!sesion) return;
    cargar();
    const t = setInterval(cargar, 30000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sesion]);

  const visibles = useMemo(() => filas.filter((f) => (conPropios || !f.propio) && (visitante === 'todos' || f.visitante === visitante)), [filas, conPropios, visitante]);
  const evVis = useMemo(() => eventos.filter((e) => (conPropios || !e.propio) && (visitante === 'todos' || e.visitante === visitante)), [eventos, conPropios, visitante]);

  const visitantes = useMemo(() => {
    const m = new Map<string, { id: string; ultima: string; segundos: number; ciudad: string; dispositivo: string; propio: boolean }>();
    for (const f of filas.filter((x) => conPropios || !x.propio)) {
      const v = m.get(f.visitante) || { id: f.visitante, ultima: f.creado, segundos: 0, ciudad: f.ciudad || '', dispositivo: f.dispositivo || '', propio: f.propio };
      if (f.creado > v.ultima) v.ultima = f.creado;
      if (f.seccion_id === null) v.segundos += f.segundos;
      if (f.ciudad) v.ciudad = f.ciudad;
      m.set(f.visitante, v);
    }
    return [...m.values()].sort((a, b) => b.ultima.localeCompare(a.ultima));
  }, [filas, conPropios]);

  const sesiones = useMemo(() => {
    const m = new Map<string, { sesion: string; inicio: string; fin: string; segundos: number; scroll: number; pantallas: Set<string>; ciudad: string; dispositivo: string; navegador: string; web: string[] }>();
    for (const f of [...visibles].sort((a, b) => a.creado.localeCompare(b.creado))) {
      const s = m.get(f.sesion) || { sesion: f.sesion, inicio: f.creado, fin: f.creado, segundos: 0, scroll: 0, pantallas: new Set<string>(), ciudad: f.ciudad || '', dispositivo: f.dispositivo || '', navegador: f.navegador || '', web: [] };
      if (f.pantalla === 'web' && f.seccion_id) {
        const nombre = f.seccion_titulo || f.seccion_id;
        if (s.web[s.web.length - 1] !== nombre) s.web.push(nombre);
      }
      if (f.creado < s.inicio) s.inicio = f.creado;
      if (f.creado > s.fin) s.fin = f.creado;
      if (f.seccion_id === null) {
        s.segundos += f.segundos;
        if (f.pantalla !== 'web') s.scroll = Math.max(s.scroll, f.max_scroll || 0);
        s.pantallas.add(f.pantalla);
      }
      m.set(f.sesion, s);
    }
    return [...m.values()].sort((a, b) => b.fin.localeCompare(a.fin));
  }, [visibles]);

  const porApartado = useMemo(() => {
    const m = new Map<string, number>();
    for (const f of visibles) if (f.seccion_id && f.pantalla === 'guia') m.set(f.seccion_id, (m.get(f.seccion_id) || 0) + f.segundos);
    return m;
  }, [visibles]);
  const otras = useMemo(() => {
    const m = new Map<string, number>();
    for (const f of visibles) if (f.pantalla !== 'guia' && f.pantalla !== 'web' && f.seccion_id === null) m.set(f.pantalla, (m.get(f.pantalla) || 0) + f.segundos);
    return [...m.entries()];
  }, [visibles]);

  const webPaginas = useMemo(() => {
    const m = new Map<string, { titulo: string; segundos: number; visitas: Set<string> }>();
    for (const f of visibles) {
      if (f.pantalla !== 'web' || !f.seccion_id) continue;
      const v = m.get(f.seccion_id) || { titulo: f.seccion_titulo || f.seccion_id, segundos: 0, visitas: new Set<string>() };
      v.segundos += f.segundos;
      v.visitas.add(f.sesion);
      m.set(f.seccion_id, v);
    }
    return [...m.entries()].sort((a, b) => b[1].segundos - a[1].segundos);
  }, [visibles]);
  const webT = webPaginas.reduce((a, [, v]) => a + v.segundos, 0);
  const maxW = Math.max(1, ...webPaginas.map(([, v]) => v.segundos));
  const maxT = Math.max(1, ...porApartado.values());
  const totalT = sesiones.reduce((a, s) => a + s.segundos, 0);
  const vistos = indice.filter((i) => (porApartado.get(i.id) || 0) >= 3);
  const top = [...indice].sort((a, b) => (porApartado.get(b.id) || 0) - (porApartado.get(a.id) || 0)).filter((i) => (porApartado.get(i.id) || 0) > 0).slice(0, 5);

  if (sesion === undefined) return <div className="lp"><p>Cargando...</p></div>;
  if (!sesion)
    return (
      <div className="lp lp-aviso">
        <h1>La lupa</h1>
        <p>Para ver qué ha visto el cliente tienes que haber entrado en el CRM. Entra y vuelve a esta página.</p>
        <a className="boton" href="/crm">Entrar en el CRM</a>
      </div>
    );

  return (
    <div className="lp">
      <header className="lp-cabeza">
        <h1>La lupa: qué ha visto el cliente</h1>
        <p>En la guía y en la web nueva: tiempo real con la página delante (pestaña visible y sin estar parado), por apartado y por página. Se actualiza solo cada 30 segundos.</p>
        <div className="lp-filtros">
          <label>
            Visitante
            <select value={visitante} onChange={(e) => setVisitante(e.target.value)}>
              <option value="todos">Todos</option>
              {visitantes.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.ciudad || 'Sin ciudad'} · {v.dispositivo || '?'} · {fecha(v.ultima)}{v.propio ? ' (yo)' : ''}
                </option>
              ))}
            </select>
          </label>
          <label className="lp-check">
            <input type="checkbox" checked={conPropios} onChange={(e) => setConPropios(e.target.checked)} /> Incluir mis visitas (?yo=1)
          </label>
          <button type="button" onClick={cargar}>Actualizar</button>
        </div>
      </header>
      {error && <p className="lp-error">{error}</p>}

      <ul className="lp-cifras">
        <li><strong>{sesiones.length}</strong><span>visitas</span></li>
        <li><strong>{dur(Math.max(0, totalT - webT))}</strong><span>leyendo la guía</span></li>
        <li><strong>{dur(webT)}</strong><span>navegando por la web</span></li>
        <li><strong>{vistos.length} de {indice.length}</strong><span>apartados con más de 3 s</span></li>
        <li><strong>{evVis.length}</strong><span>reacciones, dudas y respuestas</span></li>
      </ul>

      {top.length > 0 && (
        <section className="lp-bloque">
          <h2>Dónde se ha fijado más</h2>
          <ol className="lp-top">
            {top.map((i) => (
              <li key={i.id}><b>{i.titulo}</b><span>{dur(porApartado.get(i.id) || 0)}</span></li>
            ))}
          </ol>
        </section>
      )}

      <section className="lp-bloque">
        <h2>Tiempo en cada apartado</h2>
        <ul className="lp-barras">
          {indice.map((i) => {
            const t = porApartado.get(i.id) || 0;
            return (
              <li key={i.id} className={t === 0 ? 'lp-nada' : ''}>
                <span className="lp-nombre">{i.titulo}</span>
                <span className="lp-barra"><i style={{ width: `${(t / maxT) * 100}%` }} /></span>
                <span className="lp-valor">{t ? dur(t) : 'sin ver'}</span>
              </li>
            );
          })}
        </ul>
        {otras.length > 0 && (
          <p className="lp-otras">Otras pantallas: {otras.map(([p, t]) => `${p} ${dur(t)}`).join(' · ')}</p>
        )}
      </section>

      <section className="lp-bloque">
        <h2>La web nueva: dónde han estado</h2>
        {webPaginas.length === 0 ? <p>Todavía nadie ha navegado por la web (sin contar tus visitas, si no marcas la casilla).</p> : (
          <ul className="lp-barras">
            {webPaginas.map(([ruta, v]) => (
              <li key={ruta}>
                <span className="lp-nombre">{v.titulo} <small>{ruta}</small></span>
                <span className="lp-barra"><i style={{ width: `${(v.segundos / maxW) * 100}%` }} /></span>
                <span className="lp-valor">{dur(v.segundos)}{v.visitas.size > 1 ? ` · ${v.visitas.size} visitas` : ''}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="lp-bloque">
        <h2>Visitas</h2>
        {sesiones.length === 0 ? <p>Todavía no hay visitas registradas.</p> : (
          <table className="lp-tabla">
            <thead><tr><th>Cuándo</th><th>Dónde</th><th>Aparato</th><th>Leyendo</th><th>Hasta dónde (guía)</th><th>Qué ha visto</th><th>Recorrido por la web</th></tr></thead>
            <tbody>
              {sesiones.map((s) => (
                <tr key={s.sesion}>
                  <td>{fecha(s.inicio)}</td>
                  <td>{s.ciudad || '-'}</td>
                  <td>{s.dispositivo} {s.navegador && `(${s.navegador})`}</td>
                  <td>{dur(s.segundos)}</td>
                  <td>{s.pantallas.has('guia') ? `${s.scroll} %` : '-'}</td>
                  <td>{[...s.pantallas].map((p) => (p === 'guia' ? 'guía' : p)).join(', ')}</td>
                  <td>{s.web.length ? s.web.join(' → ') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="lp-bloque">
        <h2>Lo que ha tocado</h2>
        {evVis.length === 0 ? <p>Sin reacciones ni dudas todavía.</p> : (
          <ul className="lp-eventos">
            {evVis.map((e) => (
              <li key={e.id}><small>{fecha(e.creado)} · {e.tipo}</small><b>{e.seccion}</b><span>{e.texto}</span></li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
