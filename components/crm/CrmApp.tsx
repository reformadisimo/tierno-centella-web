'use client';

// La aplicación del CRM. Funciona igual con el almacén de prueba (en el navegador) que con el real (Supabase).

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Logo } from '@/components/LogosGuia';
import {
  type Almacen, type Actividad, type Contacto, type Datos, type Etapa, type NuevoContacto, type Tarea, type TipoActividad, type TipoPlazo,
  ETAPAS, TEMAS, ORIGENES, LOGO_ORIGEN, MOTIVOS, PLAZOS, calcularVence, habilesHasta, colorTema, docsTema, iso,
} from '@/lib/crm';

type Vista = 'embudo' | 'lista' | 'agenda' | 'tareas' | 'plazos' | 'informes';

const VISTAS: [Vista, string][] = [
  ['embudo', 'Embudo'],
  ['lista', 'Lista'],
  ['agenda', 'Agenda'],
  ['tareas', 'Tareas'],
  ['plazos', 'Plazos'],
  ['informes', 'Informes'],
];

const TIPOS_ACT: [TipoActividad, string][] = [
  ['llamada', 'Llamada'],
  ['whatsapp', 'WhatsApp'],
  ['correo', 'Correo'],
  ['reunion', 'Reunión'],
  ['nota', 'Nota'],
];
const ICONO_ACT: Record<TipoActividad, string> = { web: 'W', llamada: 'T', whatsapp: 'WA', correo: '@', reunion: 'R', nota: 'N', etapa: '>' };

const nombreEtapa = (e: Etapa) => ETAPAS.find((x) => x.id === e)?.nombre || e;

function hace(f: string) {
  const s = (Date.now() - new Date(f).getTime()) / 1000;
  if (s < 60) return 'ahora mismo';
  if (s < 3600) return `hace ${Math.floor(s / 60)} min`;
  if (s < 86400 && new Date(f).getDate() === new Date().getDate()) return `hoy, ${hora(f)}`;
  const d = Math.floor(s / 86400);
  if (d <= 1) return 'ayer';
  if (d < 30) return `hace ${d} días`;
  return fecha(f);
}
const hora = (f: string) => new Date(f).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
const fecha = (f: string) => new Date(f.length === 10 ? `${f}T12:00:00` : f).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
const fechaLarga = (f: string) => new Date(f.length === 10 ? `${f}T12:00:00` : f).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
const euros = (n: number) => `${n.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €`;
const hoyIso = () => iso(new Date());
const aLocal = (f: string | null) => {
  if (!f) return '';
  const d = new Date(f);
  return `${iso(d)}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

function quedanTexto(c: Contacto) {
  if (!c.vence) return null;
  const n = habilesHasta(c.vence, c.tipo_plazo);
  const naturales = c.tipo_plazo === 'cantidad' || c.tipo_plazo === 'otro';
  const tono = n < 0 ? 'vencido' : naturales ? (n <= 15 ? 'rojo' : n <= 45 ? 'ambar' : 'ok') : n <= 5 ? 'rojo' : n <= 10 ? 'ambar' : 'ok';
  const texto = n < 0 ? 'Plazo vencido' : naturales ? `Quedan ${n} días` : n === 1 ? 'Último día hábil' : `Quedan ${n} días hábiles`;
  return { n, tono, texto };
}

function LogoOrigen({ origen, tam = 16 }: { origen: string; tam?: number }) {
  const l = LOGO_ORIGEN[origen];
  return l ? <Logo nombre={l} tam={tam} /> : <span className="cr-origen-ini" style={{ width: tam, height: tam }}>{origen.slice(0, 1)}</span>;
}

function TemaChip({ tema }: { tema: string }) {
  return <span className="cr-tema" style={{ background: colorTema(tema) }}>{tema}</span>;
}

export default function CrmApp({ almacen, usuario, alSalir, alRestablecer }: { almacen: Almacen; usuario: string; alSalir?: () => void; alRestablecer?: () => Datos }) {
  const [datos, setDatos] = useState<Datos | null>(null);
  const [error, setError] = useState('');
  const [vista, setVista] = useState<Vista>('embudo');
  const [abierto, setAbierto] = useState<string | null>(null);
  const [nuevo, setNuevo] = useState(false);
  const [q, setQ] = useState('');
  const [fTema, setFTema] = useState('');
  const [fOrigen, setFOrigen] = useState('');
  const [toast, setToast] = useState('');
  const [arrastrando, setArrastrando] = useState<string | null>(null);
  const [sobre, setSobre] = useState<Etapa | null>(null);

  const cargar = useCallback(async () => {
    try {
      setDatos(await almacen.cargar());
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar los datos');
    }
  }, [almacen]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return;
      if (e.key === 'Escape') {
        setAbierto(null);
        setNuevo(false);
      }
      if ((e.key === 'n' || e.key === 'N') && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setNuevo(true);
      }
    };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, []);

  // Si alguien deja sus datos en la web mientras el CRM está abierto, aparece solo.
  useEffect(() => {
    if (almacen.modo !== 'real') return;
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') cargar();
    }, 60000);
    return () => clearInterval(id);
  }, [almacen, cargar]);

  const fallo = (e: unknown) => {
    setToast(`No se pudo guardar: ${e instanceof Error ? e.message : 'error'}`);
    cargar();
  };

  const actualizar = useCallback(
    (id: string, cambio: Partial<Contacto>) => {
      setDatos((d) => d && { ...d, contactos: d.contactos.map((c) => (c.id === id ? { ...c, ...cambio, actualizado: new Date().toISOString() } : c)) });
      almacen.actualizarContacto(id, cambio).catch(fallo);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [almacen],
  );

  const registrar = useCallback(
    async (contacto_id: string, tipo: TipoActividad, texto: string) => {
      try {
        const a = await almacen.crearActividad({ contacto_id, tipo, texto, autor: usuario });
        setDatos((d) => d && { ...d, actividades: [a, ...d.actividades] });
      } catch (e) {
        fallo(e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [almacen, usuario],
  );

  const mover = useCallback(
    (c: Contacto, etapa: Etapa) => {
      if (c.etapa === etapa) return;
      actualizar(c.id, { etapa, motivo: etapa === 'nosigue' ? c.motivo : null });
      registrar(c.id, 'etapa', `Pasa a "${nombreEtapa(etapa)}"`);
      setToast(etapa === 'cliente' ? `${c.nombre} es cliente. Enhorabuena.` : `${c.nombre}: ${nombreEtapa(etapa)}`);
    },
    [actualizar, registrar],
  );

  const crearTarea = async (t: Omit<Tarea, 'id' | 'creado'>) => {
    try {
      const n = await almacen.crearTarea(t);
      setDatos((d) => d && { ...d, tareas: [...d.tareas, n] });
    } catch (e) {
      fallo(e);
    }
  };
  const cambiarTarea = (id: string, cambio: Partial<Tarea>) => {
    setDatos((d) => d && { ...d, tareas: d.tareas.map((t) => (t.id === id ? { ...t, ...cambio } : t)) });
    almacen.actualizarTarea(id, cambio).catch(fallo);
  };
  const borrarTarea = (id: string) => {
    setDatos((d) => d && { ...d, tareas: d.tareas.filter((t) => t.id !== id) });
    almacen.borrarTarea(id).catch(fallo);
  };

  const crear = async (n: NuevoContacto, mensaje: string) => {
    try {
      const c = await almacen.crearContacto(n);
      const a = await almacen.crearActividad({ contacto_id: c.id, tipo: 'nota', texto: mensaje || 'Alta en el CRM', autor: usuario });
      const t = n.etapa === 'nueva' ? await almacen.crearTarea({ contacto_id: c.id, texto: `Llamar a ${c.nombre}`, vence: hoyIso(), hecha: false, responsable: n.responsable }) : null;
      setDatos((d) => d && { contactos: [c, ...d.contactos], actividades: [a, ...d.actividades], tareas: t ? [...d.tareas, t] : d.tareas });
      setNuevo(false);
      setAbierto(c.id);
      setToast(`${c.nombre} dado de alta`);
    } catch (e) {
      fallo(e);
    }
  };

  const borrar = async (c: Contacto) => {
    try {
      await almacen.borrarContacto(c.id);
      setDatos((d) => d && { contactos: d.contactos.filter((x) => x.id !== c.id), actividades: d.actividades.filter((a) => a.contacto_id !== c.id), tareas: d.tareas.filter((t) => t.contacto_id !== c.id) });
      setAbierto(null);
      setToast(`${c.nombre} borrado`);
    } catch (e) {
      fallo(e);
    }
  };

  const filtrados = useMemo(() => {
    if (!datos) return [];
    const t = q.trim().toLowerCase();
    return datos.contactos.filter(
      (c) =>
        (!fTema || c.tema === fTema) &&
        (!fOrigen || c.origen === fOrigen) &&
        (!t || [c.nombre, c.telefono, c.email, c.tema, c.origen, c.detalle, c.nota, c.herramienta].filter(Boolean).join(' ').toLowerCase().includes(t)),
    );
  }, [datos, q, fTema, fOrigen]);

  if (error)
    return (
      <div className="cr-estado">
        <p>{error}</p>
        <button type="button" className="cr-btn" onClick={cargar}>Reintentar</button>
      </div>
    );
  if (!datos) return <div className="cr-estado"><p>Cargando tu CRM...</p></div>;

  const contacto = datos.contactos.find((c) => c.id === abierto) || null;
  const pendientes = datos.tareas.filter((t) => !t.hecha);
  const vencidasHoy = pendientes.filter((t) => t.vence && t.vence <= hoyIso()).length;
  const urgentes = datos.contactos.filter((c) => c.etapa !== 'nosigue' && c.etapa !== 'cliente' && c.vence && (quedanTexto(c)?.n ?? 99) <= 5 && c.tipo_plazo !== 'cantidad' && c.tipo_plazo !== 'otro');
  const sinLlamar = datos.contactos.filter((c) => c.etapa === 'nueva');
  const mes = new Date();
  const esteMes = datos.contactos.filter((c) => {
    const d = new Date(c.creado);
    return d.getMonth() === mes.getMonth() && d.getFullYear() === mes.getFullYear();
  });
  const semana = datos.contactos.filter((c) => Date.now() - new Date(c.creado).getTime() < 7 * 86400000);
  const clientesMes = datos.contactos.filter((c) => c.etapa === 'cliente' && new Date(c.actualizado).getMonth() === mes.getMonth());
  const proximas = datos.contactos.filter((c) => c.consulta_en && new Date(c.consulta_en).getTime() > Date.now() - 3600000).sort((a, b) => a.consulta_en!.localeCompare(b.consulta_en!));

  return (
    <div className="cr">
      {almacen.modo === 'prueba' && (
        <div className="cr-prueba">
          <span>
            <b>Modo prueba.</b> Las personas de aquí son inventadas y lo que hagas se guarda solo en este navegador. Da de alta, mueve, borra: no rompes nada.
          </span>
          {alRestablecer && (
            <button type="button" onClick={() => { setDatos(alRestablecer()); setAbierto(null); setToast('Datos de prueba restablecidos'); }}>
              Empezar de cero
            </button>
          )}
        </div>
      )}

      {almacen.modo === 'real' && datos.contactos.length === 0 && (
        <div className="cr-prueba">
          <span>
            <b>Tu CRM está listo y vacío.</b> Las consultas de la web entrarán solas; también puedes dar de alta una con el botón de arriba. Para verlo lleno de ejemplos, abre el <a href="/guia-jesus/crm">modo prueba</a>.
          </span>
        </div>
      )}

      <header className="cr-cabeza">
        <div>
          <p className="cr-marca">Tierno Centella Abogados · CRM</p>
          <h1>Hola, {usuario}</h1>
          <p className="cr-sub">
            {sinLlamar.length ? <><b>{sinLlamar.length}</b> {sinLlamar.length === 1 ? 'consulta nueva' : 'consultas nuevas'} sin llamar · </> : null}
            {vencidasHoy ? <><b>{vencidasHoy}</b> {vencidasHoy === 1 ? 'tarea para hoy' : 'tareas para hoy'} · </> : null}
            {proximas.length ? <><b>{proximas.length}</b> {proximas.length === 1 ? 'consulta reservada' : 'consultas reservadas'}</> : 'Sin consultas reservadas'}
          </p>
        </div>
        <div className="cr-cabeza-acciones">
          <button type="button" className="cr-btn cr-btn-grande" onClick={() => setNuevo(true)}>
            <span aria-hidden="true">+</span> Nueva consulta
          </button>
          {alSalir && <button type="button" className="cr-btn cr-btn-claro" onClick={alSalir}>Salir</button>}
        </div>
      </header>

      <section className="cr-kpis" aria-label="Resumen">
        <button type="button" onClick={() => setVista('informes')}><small>Esta semana</small><b>{semana.length}</b><span>personas han contactado</span></button>
        <button type="button" onClick={() => setVista('informes')}><small>Este mes</small><b>{esteMes.length}</b><span>consultas nuevas</span></button>
        <button type="button" className={sinLlamar.length ? 'cr-kpi-aviso' : ''} onClick={() => { setVista('embudo'); }}><small>Sin llamar</small><b>{sinLlamar.length}</b><span>lo ideal, en la primera hora</span></button>
        <button type="button" onClick={() => setVista('agenda')}><small>Consultas reservadas</small><b>{proximas.length}</b><span>próximas en la agenda</span></button>
        <button type="button" onClick={() => setVista('informes')}><small>Clientes este mes</small><b>{clientesMes.length}</b><span>han contratado</span></button>
        <button type="button" className={urgentes.length ? 'cr-kpi-rojo' : ''} onClick={() => setVista('plazos')}><small>Plazos urgentes</small><b>{urgentes.length}</b><span>5 días hábiles o menos</span></button>
      </section>

      {urgentes.length > 0 && (
        <div className="cr-alerta" role="alert">
          <b>Plazos a punto de vencer</b>
          {urgentes.map((c) => (
            <button key={c.id} type="button" onClick={() => setAbierto(c.id)}>
              <span>{c.nombre} · {PLAZOS.find((p) => p.id === c.tipo_plazo)?.nombre.split(':')[0]}</span>
              <strong>{quedanTexto(c)?.texto} · vence el {fecha(c.vence!)}</strong>
            </button>
          ))}
        </div>
      )}

      <div className="cr-barra">
        <nav className="cr-vistas" role="tablist" aria-label="Vistas">
          {VISTAS.map(([v, t]) => (
            <button key={v} type="button" role="tab" aria-selected={vista === v} className={vista === v ? 'activo' : ''} onClick={() => setVista(v)}>
              {t}
              {v === 'tareas' && vencidasHoy > 0 && <i>{vencidasHoy}</i>}
              {v === 'plazos' && urgentes.length > 0 && <i>{urgentes.length}</i>}
            </button>
          ))}
        </nav>
        {(vista === 'embudo' || vista === 'lista') && (
          <div className="cr-filtros">
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar nombre, teléfono, nota..." aria-label="Buscar" />
            <select value={fTema} onChange={(e) => setFTema(e.target.value)} aria-label="Tema">
              <option value="">Todos los temas</option>
              {TEMAS.map((t) => <option key={t.id}>{t.id}</option>)}
            </select>
            <select value={fOrigen} onChange={(e) => setFOrigen(e.target.value)} aria-label="Origen">
              <option value="">Todos los orígenes</option>
              {ORIGENES.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        )}
      </div>

      {vista === 'embudo' && (
        <div className="cr-embudo">
          {ETAPAS.map((e) => {
            const col = filtrados.filter((c) => c.etapa === e.id);
            return (
              <section
                key={e.id}
                className={`cr-col cr-col-${e.id}${sobre === e.id ? ' cr-sobre' : ''}`}
                onDragOver={(ev) => { ev.preventDefault(); setSobre(e.id); }}
                onDragLeave={() => setSobre((s) => (s === e.id ? null : s))}
                onDrop={(ev) => {
                  ev.preventDefault();
                  const id = ev.dataTransfer.getData('text/plain') || arrastrando;
                  const c = datos.contactos.find((x) => x.id === id);
                  if (c) mover(c, e.id);
                  setArrastrando(null);
                  setSobre(null);
                }}
              >
                <header>
                  <b>{e.nombre}</b> <span>{col.length}</span>
                  <small>{e.ayuda}</small>
                </header>
                {col.map((c) => {
                  const p = quedanTexto(c);
                  const tareasC = pendientes.filter((t) => t.contacto_id === c.id).length;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      draggable
                      onDragStart={(ev) => { ev.dataTransfer.setData('text/plain', c.id); ev.dataTransfer.effectAllowed = 'move'; setArrastrando(c.id); }}
                      onDragEnd={() => setArrastrando(null)}
                      className={`cr-tarjeta${arrastrando === c.id ? ' cr-arrastra' : ''}`}
                      onClick={() => setAbierto(c.id)}
                    >
                      <span className="cr-tarjeta-arriba">
                        <TemaChip tema={c.tema} />
                        <small>{hace(c.creado)}</small>
                      </span>
                      <strong>{c.nombre}</strong>
                      <span className="cr-origen"><LogoOrigen origen={c.origen} /> {c.origen}</span>
                      {c.etapa === 'reservada' && c.consulta_en && <span className="cr-cita">Consulta: {fecha(c.consulta_en)}, {hora(c.consulta_en)}</span>}
                      {c.etapa === 'nosigue' && c.motivo && <span className="cr-motivo">{c.motivo}</span>}
                      {c.etapa === 'cliente' && c.honorarios ? <span className="cr-cita">{euros(c.honorarios)}</span> : null}
                      <span className="cr-tarjeta-pie">
                        {p && c.etapa !== 'nosigue' && <span className={`cr-plazo cr-${p.tono}`}>{p.texto}</span>}
                        {tareasC > 0 && <span className="cr-ntareas">{tareasC} {tareasC === 1 ? 'tarea' : 'tareas'}</span>}
                      </span>
                    </button>
                  );
                })}
                {col.length === 0 && <p className="cr-vacio">{e.id === 'nueva' ? 'Ninguna pendiente. Bien.' : 'Arrastra aquí'}</p>}
              </section>
            );
          })}
        </div>
      )}

      {vista === 'lista' && <Lista contactos={filtrados} tareas={pendientes} abrir={setAbierto} />}
      {vista === 'agenda' && <Agenda proximas={proximas} contactos={datos.contactos} abrir={setAbierto} />}
      {vista === 'tareas' && <Tareas datos={datos} abrir={setAbierto} crear={crearTarea} cambiar={cambiarTarea} borrar={borrarTarea} usuario={usuario} />}
      {vista === 'plazos' && <Plazos contactos={datos.contactos} abrir={setAbierto} />}
      {vista === 'informes' && <Informes datos={datos} />}

      {nuevo && <Alta cerrar={() => setNuevo(false)} crear={crear} usuario={usuario} />}

      {contacto && (
        <Ficha
          key={contacto.id}
          c={contacto}
          actividades={datos.actividades.filter((a) => a.contacto_id === contacto.id)}
          tareas={datos.tareas.filter((t) => t.contacto_id === contacto.id)}
          cerrar={() => setAbierto(null)}
          actualizar={(cambio) => actualizar(contacto.id, cambio)}
          mover={(e) => mover(contacto, e)}
          registrar={(t, x) => registrar(contacto.id, t, x)}
          crearTarea={crearTarea}
          cambiarTarea={cambiarTarea}
          borrarTarea={borrarTarea}
          borrar={() => borrar(contacto)}
          prueba={almacen.modo === 'prueba'}
          usuario={usuario}
        />
      )}

      {toast && <div className="cr-toast" role="status">{toast}</div>}
    </div>
  );
}

// ---------- Lista ----------

function Lista({ contactos, tareas, abrir }: { contactos: Contacto[]; tareas: Tarea[]; abrir: (id: string) => void }) {
  const [orden, setOrden] = useState<'creado' | 'nombre' | 'etapa' | 'vence'>('creado');
  const ordenados = useMemo(() => {
    const l = [...contactos];
    if (orden === 'creado') l.sort((a, b) => b.creado.localeCompare(a.creado));
    if (orden === 'nombre') l.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
    if (orden === 'etapa') l.sort((a, b) => ETAPAS.findIndex((e) => e.id === a.etapa) - ETAPAS.findIndex((e) => e.id === b.etapa));
    if (orden === 'vence') l.sort((a, b) => (a.vence || '9999').localeCompare(b.vence || '9999'));
    return l;
  }, [contactos, orden]);

  const exportar = () => {
    const cols = ['Alta', 'Nombre', 'Teléfono', 'Correo', 'Tema', 'Origen', 'Detalle', 'Etapa', 'Motivo', 'Vence plazo', 'Consulta', 'Responsable', 'Honorarios', 'Nota'];
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const filas = ordenados.map((c) =>
      [fecha(c.creado), c.nombre, c.telefono, c.email, c.tema, c.origen, c.detalle, nombreEtapa(c.etapa), c.motivo, c.vence, c.consulta_en ? `${fecha(c.consulta_en)} ${hora(c.consulta_en)}` : '', c.responsable, c.honorarios, c.nota].map(esc).join(';'),
    );
    const blob = new Blob(['﻿' + [cols.map(esc).join(';'), ...filas].join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `consultas-${hoyIso()}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const Cab = ({ k, t }: { k: typeof orden; t: string }) => (
    <button type="button" className={orden === k ? 'activo' : ''} onClick={() => setOrden(k)}>{t}{orden === k ? ' ↓' : ''}</button>
  );

  return (
    <div className="cr-caja cr-lista">
      <div className="cr-lista-arriba">
        <span>{ordenados.length} {ordenados.length === 1 ? 'persona' : 'personas'}</span>
        <button type="button" className="cr-btn cr-btn-claro" onClick={exportar}>Descargar en Excel (CSV)</button>
      </div>
      <div className="cr-fila cr-fila-cabeza">
        <Cab k="nombre" t="Persona" /><span>Tema</span><span>Origen</span><Cab k="etapa" t="Etapa" /><Cab k="vence" t="Plazo" /><Cab k="creado" t="Alta" />
      </div>
      {ordenados.map((c) => {
        const p = quedanTexto(c);
        const nt = tareas.filter((t) => t.contacto_id === c.id).length;
        return (
          <button key={c.id} type="button" className="cr-fila" onClick={() => abrir(c.id)}>
            <span><b>{c.nombre}</b><small>{c.telefono || c.email || 'Sin contacto'}{nt ? ` · ${nt} ${nt === 1 ? 'tarea' : 'tareas'}` : ''}</small></span>
            <span><i className="cr-punto" style={{ background: colorTema(c.tema) }} />{c.tema}</span>
            <span><LogoOrigen origen={c.origen} /> {c.origen}</span>
            <span>{nombreEtapa(c.etapa)}</span>
            <span>{p && c.etapa !== 'nosigue' ? <em className={`cr-plazo cr-${p.tono}`}>{p.texto}</em> : '—'}</span>
            <span>{hace(c.creado)}</span>
          </button>
        );
      })}
      {ordenados.length === 0 && <p className="cr-vacio">No hay nadie con esos filtros.</p>}
    </div>
  );
}

// ---------- Agenda ----------

function Agenda({ proximas, contactos, abrir }: { proximas: Contacto[]; contactos: Contacto[]; abrir: (id: string) => void }) {
  const dias = new Map<string, Contacto[]>();
  proximas.forEach((c) => {
    const k = iso(new Date(c.consulta_en!));
    dias.set(k, [...(dias.get(k) || []), c]);
  });
  const sinFecha = contactos.filter((c) => c.etapa === 'reservada' && !c.consulta_en);
  return (
    <div className="cr-caja">
      <div className="cr-caja-cabeza"><h2>Consultas reservadas</h2><span>Pon el día y la hora en la ficha y aparecen aquí</span></div>
      {dias.size === 0 && <p className="cr-vacio">No hay consultas reservadas.</p>}
      {[...dias.entries()].map(([d, l]) => (
        <div key={d} className="cr-dia">
          <h3>{d === hoyIso() ? 'Hoy' : fechaLarga(d)}</h3>
          {l.map((c) => (
            <button key={c.id} type="button" className="cr-cita-fila" onClick={() => abrir(c.id)}>
              <b>{hora(c.consulta_en!)}</b>
              <span><strong>{c.nombre}</strong><small>{c.tema} · {c.responsable || 'Sin asignar'}</small></span>
              <TemaChip tema={c.tema} />
            </button>
          ))}
        </div>
      ))}
      {sinFecha.length > 0 && (
        <p className="cr-nota">Reservadas sin fecha: {sinFecha.map((c, i) => <button key={c.id} type="button" className="cr-enlace" onClick={() => abrir(c.id)}>{c.nombre}{i < sinFecha.length - 1 ? ', ' : ''}</button>)}</p>
      )}
    </div>
  );
}

// ---------- Tareas ----------

function Tareas({ datos, abrir, crear, cambiar, borrar, usuario }: { datos: Datos; abrir: (id: string) => void; crear: (t: Omit<Tarea, 'id' | 'creado'>) => void; cambiar: (id: string, c: Partial<Tarea>) => void; borrar: (id: string) => void; usuario: string }) {
  const [texto, setTexto] = useState('');
  const [vence, setVence] = useState(hoyIso());
  const hoy = hoyIso();
  const grupos: [string, Tarea[]][] = [
    ['Atrasadas', datos.tareas.filter((t) => !t.hecha && t.vence && t.vence < hoy)],
    ['Hoy', datos.tareas.filter((t) => !t.hecha && t.vence === hoy)],
    ['Próximas', datos.tareas.filter((t) => !t.hecha && (!t.vence || t.vence > hoy))],
    ['Hechas', datos.tareas.filter((t) => t.hecha)],
  ];
  return (
    <div className="cr-caja">
      <div className="cr-caja-cabeza"><h2>Tareas</h2><span>Al dar de alta una consulta se crea sola la tarea de llamar</span></div>
      <form className="cr-nueva-tarea" onSubmit={(e) => { e.preventDefault(); if (!texto.trim()) return; crear({ contacto_id: null, texto: texto.trim(), vence, hecha: false, responsable: usuario }); setTexto(''); }}>
        <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Nueva tarea, por ejemplo: preparar la demanda de Elena" aria-label="Nueva tarea" />
        <input type="date" value={vence} onChange={(e) => setVence(e.target.value)} aria-label="Fecha" />
        <button type="submit" className="cr-btn">Añadir</button>
      </form>
      {grupos.map(([g, l]) =>
        l.length ? (
          <div key={g} className={`cr-grupo cr-grupo-${g === 'Atrasadas' ? 'rojo' : g === 'Hechas' ? 'hecho' : ''}`}>
            <h3>{g} <span>{l.length}</span></h3>
            <ul className="cr-tareas">
              {l.map((t) => {
                const c = datos.contactos.find((x) => x.id === t.contacto_id);
                return (
                  <li key={t.id} className={t.hecha ? 'hecha' : ''}>
                    <label><input type="checkbox" checked={t.hecha} onChange={() => cambiar(t.id, { hecha: !t.hecha })} /><span>{t.texto}</span></label>
                    <span className="cr-tarea-meta">
                      {c && <button type="button" className="cr-enlace" onClick={() => abrir(c.id)}>{c.nombre}</button>}
                      {t.vence && <small>{t.vence === hoy ? 'hoy' : fecha(t.vence)}</small>}
                      {t.responsable && <small>{t.responsable}</small>}
                      <button type="button" className="cr-x" onClick={() => borrar(t.id)} aria-label="Borrar tarea">×</button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null,
      )}
    </div>
  );
}

// ---------- Plazos ----------

function Plazos({ contactos, abrir }: { contactos: Contacto[]; abrir: (id: string) => void }) {
  const l = contactos.filter((c) => c.vence && c.etapa !== 'nosigue').sort((a, b) => a.vence!.localeCompare(b.vence!));
  return (
    <div className="cr-caja">
      <div className="cr-caja-cabeza"><h2>Plazos</h2><span>Cómputo orientativo: lo revisa siempre el abogado</span></div>
      {l.length === 0 && <p className="cr-vacio">Ningún plazo apuntado.</p>}
      {l.map((c) => {
        const p = quedanTexto(c)!;
        return (
          <button key={c.id} type="button" className="cr-plazo-fila" onClick={() => abrir(c.id)}>
            <span className={`cr-plazo-num cr-${p.tono}`}><b>{p.n < 0 ? '!' : p.n}</b><small>{p.n < 0 ? 'vencido' : c.tipo_plazo === 'cantidad' || c.tipo_plazo === 'otro' ? 'días' : 'hábiles'}</small></span>
            <span><strong>{c.nombre}</strong><small>{PLAZOS.find((x) => x.id === c.tipo_plazo)?.nombre}{c.fecha_hecho ? ` · desde el ${fecha(c.fecha_hecho)}` : ''}</small></span>
            <span className="cr-plazo-vence">Vence el<br /><b>{fechaLarga(c.vence!)}</b></span>
          </button>
        );
      })}
      <p className="cr-nota">El CRM cuenta los días hábiles sin sábados, domingos ni festivos de la ciudad de Madrid; en despidos y sanciones tampoco cuentan el 24 y el 31 de diciembre, y en sanciones tampoco agosto (en despidos agosto sí cuenta).</p>
    </div>
  );
}

// ---------- Informes ----------

function Informes({ datos }: { datos: Datos }) {
  const [dias, setDias] = useState(30);
  const desde = dias ? Date.now() - dias * 86400000 : 0;
  const l = datos.contactos.filter((c) => new Date(c.creado).getTime() >= desde);
  const idx = (e: Etapa) => ETAPAS.findIndex((x) => x.id === e);
  const llegaron = (e: Etapa) => l.filter((c) => c.etapa !== 'nosigue' && idx(c.etapa) >= idx(e)).length;
  const clientes = l.filter((c) => c.etapa === 'cliente');
  const honorarios = clientes.reduce((s, c) => s + (c.honorarios || 0), 0);
  const conv = l.length ? Math.round((clientes.length / l.length) * 100) : 0;

  const porOrigen = ORIGENES.map((o) => {
    const x = l.filter((c) => c.origen === o);
    return { o, n: x.length, cli: x.filter((c) => c.etapa === 'cliente').length };
  }).filter((x) => x.n).sort((a, b) => b.cli - a.cli || b.n - a.n);
  const porTema = TEMAS.map((t) => ({ t: t.id, color: t.color, n: l.filter((c) => c.tema === t.id).length, cli: l.filter((c) => c.tema === t.id && c.etapa === 'cliente').length })).filter((x) => x.n);
  const maxTema = Math.max(1, ...porTema.map((x) => x.n));
  const motivos = MOTIVOS.map((m) => ({ m, n: l.filter((c) => c.etapa === 'nosigue' && c.motivo === m).length })).filter((x) => x.n);

  const semanas = Array.from({ length: 8 }, (_, i) => {
    const fin = Date.now() - i * 7 * 86400000;
    const ini = fin - 7 * 86400000;
    const x = datos.contactos.filter((c) => {
      const t = new Date(c.creado).getTime();
      return t > ini && t <= fin;
    });
    return { etq: i === 0 ? 'Esta' : `-${i}`, n: x.length, cli: x.filter((c) => c.etapa === 'cliente').length };
  }).reverse();
  const maxSem = Math.max(1, ...semanas.map((s) => s.n));

  const embudo: [string, number][] = [
    ['Han contactado', l.length],
    ['Hemos hablado con ellos', llegaron('contactada')],
    ['Han reservado consulta', llegaron('reservada')],
    ['Hoja de encargo enviada', llegaron('propuesta')],
    ['Han contratado', llegaron('cliente')],
  ];

  return (
    <div className="cr-informes">
      <div className="cr-rango">
        {[[7, '7 días'], [30, '30 días'], [90, '3 meses'], [365, 'Un año'], [0, 'Todo']].map(([d, t]) => (
          <button key={d} type="button" className={dias === d ? 'activo' : ''} onClick={() => setDias(d as number)}>{t}</button>
        ))}
      </div>
      <section className="cr-kpis cr-kpis-informe">
        <div><small>Han contactado</small><b>{l.length}</b></div>
        <div><small>Clientes</small><b>{clientes.length}</b></div>
        <div><small>De cada 100 consultas</small><b>{conv}</b><span>acaban contratando</span></div>
        <div><small>Honorarios firmados</small><b>{euros(honorarios)}</b></div>
      </section>
      <div className="cr-rejilla2">
        <div className="cr-caja">
          <div className="cr-caja-cabeza"><h2>El camino hasta cliente</h2></div>
          {embudo.map(([t, n], i) => (
            <div key={t} className="cr-embudo-paso">
              <span>{t}</span>
              <i style={{ width: `${l.length ? Math.max(4, (n / l.length) * 100) : 4}%`, opacity: 1 - i * 0.12 }} />
              <b>{n}</b>
            </div>
          ))}
        </div>
        <div className="cr-caja">
          <div className="cr-caja-cabeza"><h2>Consultas por semana</h2><span>Últimas 8 semanas</span></div>
          <div className="cr-semanas">
            {semanas.map((s) => (
              <div key={s.etq} title={`${s.n} consultas, ${s.cli} clientes`}>
                <span className="cr-semana-barra" style={{ height: `${(s.n / maxSem) * 100}%` }}><i style={{ height: s.n ? `${(s.cli / s.n) * 100}%` : 0 }} /></span>
                <b>{s.n}</b>
                <small>{s.etq}</small>
              </div>
            ))}
          </div>
          <p className="cr-leyenda"><i className="cr-l1" /> consultas <i className="cr-l2" /> de ellas, clientes</p>
        </div>
      </div>
      <div className="cr-caja">
        <div className="cr-caja-cabeza"><h2>Qué canal te trae clientes</h2><span>No solo quién pregunta: quién contrata</span></div>
        <div className="cr-ot cr-ot-cabeza"><span>Canal</span><span>Consultas</span><span>Clientes</span><span>Conversión</span></div>
        {porOrigen.map((x) => (
          <div key={x.o} className="cr-ot">
            <span><LogoOrigen origen={x.o} tam={18} /> {x.o}</span>
            <span>{x.n}</span>
            <span><b>{x.cli}</b></span>
            <span><i className="cr-mini"><i style={{ width: `${(x.cli / x.n) * 100}%` }} /></i> {Math.round((x.cli / x.n) * 100)} %</span>
          </div>
        ))}
        {porOrigen.length === 0 && <p className="cr-vacio">Sin datos en este periodo.</p>}
      </div>
      <div className="cr-rejilla2">
        <div className="cr-caja">
          <div className="cr-caja-cabeza"><h2>Por tema</h2></div>
          {porTema.map((x) => (
            <div key={x.t} className="cr-tema-fila">
              <span>{x.t}</span>
              <i style={{ width: `${(x.n / maxTema) * 100}%`, background: x.color }} />
              <b>{x.n}</b>
              <small>{x.cli} {x.cli === 1 ? 'cliente' : 'clientes'}</small>
            </div>
          ))}
        </div>
        <div className="cr-caja">
          <div className="cr-caja-cabeza"><h2>Por qué no siguen</h2><span>Sirve para ajustar anuncios y textos</span></div>
          {motivos.length ? motivos.map((x) => <div key={x.m} className="cr-motivo-fila"><span>{x.m}</span><b>{x.n}</b></div>) : <p className="cr-vacio">Nadie ha descartado en este periodo.</p>}
        </div>
      </div>
    </div>
  );
}

// ---------- Alta ----------

function Alta({ cerrar, crear, usuario }: { cerrar: () => void; crear: (n: NuevoContacto, mensaje: string) => void; usuario: string }) {
  const [f, setF] = useState({ nombre: '', telefono: '', email: '', tema: 'Despido', origen: 'Teléfono', detalle: '', mensaje: '', tipo_plazo: '' as TipoPlazo, fecha_hecho: '', vence: '', consentimiento: false, etapa: 'nueva' as Etapa });
  const [enviando, setEnviando] = useState(false);
  const primero = useRef<HTMLInputElement>(null);
  useEffect(() => primero.current?.focus(), []);
  const set = (k: keyof typeof f, v: string | boolean) => setF((x) => ({ ...x, [k]: v }));
  const vence = f.tipo_plazo === 'otro' ? f.vence || null : calcularVence(f.tipo_plazo, f.fecha_hecho || null);

  return (
    <div className="cr-fondo" onClick={cerrar}>
      <form
        className="cr-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Nueva consulta"
        onClick={(e) => e.stopPropagation()}
        onSubmit={async (e) => {
          e.preventDefault();
          if (!f.nombre.trim() || enviando) return;
          setEnviando(true);
          await crear(
            {
              nombre: f.nombre.trim(), telefono: f.telefono.trim() || null, email: f.email.trim() || null, tema: f.tema, origen: f.origen, detalle: f.detalle.trim() || null,
              etapa: f.etapa, motivo: null, fecha_hecho: f.fecha_hecho || null, tipo_plazo: f.tipo_plazo || null, vence, consulta_en: null, responsable: usuario,
              honorarios: null, consentimiento: f.consentimiento, docs: docsTema(f.tema), nota: '', herramienta: null, entrada_web: false,
            },
            f.mensaje.trim(),
          );
          setEnviando(false);
        }}
      >
        <button type="button" className="cr-cerrar" onClick={cerrar} aria-label="Cerrar">×</button>
        <h2>Nueva consulta</h2>
        <p className="cr-sub">Solo el nombre es obligatorio. Lo demás se puede completar después.</p>
        <div className="cr-campos">
          <label className="cr-ancho"><span>Nombre *</span><input ref={primero} required value={f.nombre} onChange={(e) => set('nombre', e.target.value)} autoComplete="off" /></label>
          <label><span>Teléfono</span><input type="tel" value={f.telefono} onChange={(e) => set('telefono', e.target.value)} autoComplete="off" /></label>
          <label><span>Correo</span><input type="email" value={f.email} onChange={(e) => set('email', e.target.value)} autoComplete="off" /></label>
          <div className="cr-ancho">
            <span className="cr-etq">Tema</span>
            <div className="cr-pastillas">
              {TEMAS.map((t) => (
                <button key={t.id} type="button" className={f.tema === t.id ? 'activo' : ''} style={f.tema === t.id ? { background: t.color, borderColor: t.color } : undefined} onClick={() => set('tema', t.id)}>{t.id}</button>
              ))}
            </div>
          </div>
          <label><span>¿Cómo nos ha conocido?</span>
            <select value={f.origen} onChange={(e) => set('origen', e.target.value)}>{ORIGENES.map((o) => <option key={o}>{o}</option>)}</select>
          </label>
          <label><span>Etapa</span>
            <select value={f.etapa} onChange={(e) => set('etapa', e.target.value)}>{ETAPAS.map((x) => <option key={x.id} value={x.id}>{x.nombre}</option>)}</select>
          </label>
          <label className="cr-ancho"><span>Detalle del origen (opcional)</span><input value={f.detalle} onChange={(e) => set('detalle', e.target.value)} placeholder="Por ejemplo: le recomendó María, vio el vídeo de Instagram..." /></label>
          <label className="cr-ancho"><span>¿Qué le pasa?</span><textarea rows={3} value={f.mensaje} onChange={(e) => set('mensaje', e.target.value)} placeholder="Lo que te ha contado, en dos líneas" /></label>
          <label><span>Plazo</span>
            <select value={f.tipo_plazo} onChange={(e) => set('tipo_plazo', e.target.value)}>{PLAZOS.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}</select>
          </label>
          {f.tipo_plazo && f.tipo_plazo !== 'otro' && (
            <label><span>{f.tipo_plazo === 'despido' ? 'Fecha del despido' : f.tipo_plazo === 'inss' ? 'Fecha de la notificación' : 'Fecha'}</span><input type="date" value={f.fecha_hecho} onChange={(e) => set('fecha_hecho', e.target.value)} /></label>
          )}
          {f.tipo_plazo === 'otro' && <label><span>Vence el</span><input type="date" value={f.vence} onChange={(e) => set('vence', e.target.value)} /></label>}
          {vence && <p className="cr-ancho cr-calculo">Vence el <b>{fechaLarga(vence)}</b>. {PLAZOS.find((p) => p.id === f.tipo_plazo)?.ayuda}</p>}
          <label className="cr-ancho cr-check"><input type="checkbox" checked={f.consentimiento} onChange={(e) => set('consentimiento', e.target.checked)} /><span>Le hemos informado de cómo tratamos sus datos y está de acuerdo</span></label>
        </div>
        <div className="cr-modal-pie">
          <button type="button" className="cr-btn cr-btn-claro" onClick={cerrar}>Cancelar</button>
          <button type="submit" className="cr-btn" disabled={!f.nombre.trim() || enviando}>{enviando ? 'Guardando...' : 'Dar de alta'}</button>
        </div>
      </form>
    </div>
  );
}

// ---------- Ficha ----------

function Campo({ etq, valor, alGuardar, tipo = 'text', placeholder }: { etq: string; valor: string; alGuardar: (v: string) => void; tipo?: string; placeholder?: string }) {
  const [v, setV] = useState(valor);
  useEffect(() => setV(valor), [valor]);
  return (
    <label className="cr-campo">
      <span>{etq}</span>
      <input type={tipo} value={v} placeholder={placeholder} onChange={(e) => setV(e.target.value)} onBlur={() => v !== valor && alGuardar(v)} onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()} />
    </label>
  );
}

function Ficha({
  c, actividades, tareas, cerrar, actualizar, mover, registrar, crearTarea, cambiarTarea, borrarTarea, borrar, prueba, usuario,
}: {
  c: Contacto; actividades: Actividad[]; tareas: Tarea[]; cerrar: () => void; actualizar: (x: Partial<Contacto>) => void; mover: (e: Etapa) => void;
  registrar: (t: TipoActividad, x: string) => void; crearTarea: (t: Omit<Tarea, 'id' | 'creado'>) => void; cambiarTarea: (id: string, x: Partial<Tarea>) => void;
  borrarTarea: (id: string) => void; borrar: () => void; prueba: boolean; usuario: string;
}) {
  const [tipo, setTipo] = useState<TipoActividad>('llamada');
  const [texto, setTexto] = useState('');
  const [tarea, setTarea] = useState('');
  const [tareaVence, setTareaVence] = useState(hoyIso());
  const [nuevoDoc, setNuevoDoc] = useState('');
  const [confirmar, setConfirmar] = useState(false);
  const [nota, setNota] = useState(c.nota || '');
  const p = quedanTexto(c);
  const tel = (c.telefono || '').replace(/[^\d+]/g, '');
  const wa = tel ? `https://wa.me/${tel.startsWith('+') ? tel.slice(1) : tel.length === 9 ? `34${tel}` : tel}` : '';

  const cambiarPlazo = (tipo_plazo: TipoPlazo, fecha_hecho: string | null, venceMano?: string | null) => {
    const vence = tipo_plazo === 'otro' ? venceMano ?? c.vence : calcularVence(tipo_plazo, fecha_hecho);
    actualizar({ tipo_plazo: tipo_plazo || null, fecha_hecho, vence: tipo_plazo ? vence : null });
  };

  return (
    <div className="cr-fondo cr-fondo-lado" onClick={cerrar}>
      <aside className="cr-ficha" role="dialog" aria-modal="true" aria-label={`Ficha de ${c.nombre}`} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="cr-cerrar" onClick={cerrar} aria-label="Cerrar">×</button>
        <div className="cr-ficha-cabeza">
          <TemaChip tema={c.tema} />
          <h2>{c.nombre}</h2>
          <p className="cr-sub">Alta {hace(c.creado)} · {c.entrada_web ? 'entró sola desde la web' : 'dada de alta a mano'}</p>
        </div>

        <div className="cr-acciones">
          <a className={`cr-btn${tel ? '' : ' cr-off'}`} href={tel && !prueba ? `tel:${tel}` : undefined} onClick={() => tel && registrar('llamada', 'Llamada')}>Llamar</a>
          <a className={`cr-btn cr-btn-wa${tel ? '' : ' cr-off'}`} href={wa && !prueba ? wa : undefined} target="_blank" rel="noopener" onClick={() => tel && registrar('whatsapp', 'WhatsApp enviado')}>WhatsApp</a>
          <a className={`cr-btn cr-btn-claro${c.email ? '' : ' cr-off'}`} href={c.email && !prueba ? `mailto:${c.email}` : undefined} onClick={() => c.email && registrar('correo', 'Correo enviado')}>Correo</a>
        </div>
        {prueba && <p className="cr-mini-nota">En modo prueba estos botones solo apuntan la acción; con datos reales, llaman, abren WhatsApp o el correo.</p>}

        <div className="cr-etapas" role="group" aria-label="Etapa">
          {ETAPAS.map((e) => (
            <button key={e.id} type="button" className={`${c.etapa === e.id ? 'activo' : ''} cr-et-${e.id}`} onClick={() => mover(e.id)}>{e.nombre}</button>
          ))}
        </div>
        {c.etapa === 'nosigue' && (
          <label className="cr-campo"><span>¿Por qué no sigue?</span>
            <select value={c.motivo || ''} onChange={(e) => actualizar({ motivo: e.target.value || null })}>
              <option value="">Elige un motivo</option>
              {MOTIVOS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </label>
        )}

        {p && c.etapa !== 'nosigue' && (
          <div className={`cr-plazo-caja cr-${p.tono}`}>
            <b>{p.texto}</b> · vence el {fechaLarga(c.vence!)}
          </div>
        )}

        <h3>Datos</h3>
        <div className="cr-campos">
          <Campo etq="Nombre" valor={c.nombre} alGuardar={(v) => v.trim() && actualizar({ nombre: v.trim() })} />
          <Campo etq="Teléfono" tipo="tel" valor={c.telefono || ''} alGuardar={(v) => actualizar({ telefono: v || null })} />
          <Campo etq="Correo" tipo="email" valor={c.email || ''} alGuardar={(v) => actualizar({ email: v || null })} />
          <label className="cr-campo"><span>Tema</span>
            <select value={c.tema} onChange={(e) => actualizar({ tema: e.target.value })}>{TEMAS.map((t) => <option key={t.id}>{t.id}</option>)}</select>
          </label>
          <label className="cr-campo"><span>Origen</span>
            <select value={c.origen} onChange={(e) => actualizar({ origen: e.target.value })}>{[...new Set([...ORIGENES, c.origen])].map((o) => <option key={o}>{o}</option>)}</select>
          </label>
          <Campo etq="Responsable" valor={c.responsable || ''} alGuardar={(v) => actualizar({ responsable: v || null })} placeholder="Jesús, secretaría..." />
          <label className="cr-campo"><span>Consulta reservada</span>
            <input type="datetime-local" value={aLocal(c.consulta_en)} onChange={(e) => { const v = e.target.value ? new Date(e.target.value).toISOString() : null; actualizar({ consulta_en: v }); if (v && (c.etapa === 'nueva' || c.etapa === 'contactada')) mover('reservada'); }} />
          </label>
          <Campo etq="Honorarios (€)" tipo="number" valor={c.honorarios?.toString() || ''} alGuardar={(v) => actualizar({ honorarios: v ? Number(v) : null })} />
          <Campo etq="Detalle del origen" valor={c.detalle || ''} alGuardar={(v) => actualizar({ detalle: v || null })} />
        </div>
        {c.herramienta && <p className="cr-herramienta"><b>En la web:</b> {c.herramienta}</p>}
        <p className="cr-origen cr-origen-ficha"><LogoOrigen origen={c.origen} /> Vino por {c.origen}{c.detalle ? ` · ${c.detalle}` : ''}</p>

        <h3>Plazo</h3>
        <div className="cr-campos">
          <label className="cr-campo"><span>Tipo</span>
            <select value={c.tipo_plazo || ''} onChange={(e) => cambiarPlazo(e.target.value as TipoPlazo, c.fecha_hecho)}>{PLAZOS.map((x) => <option key={x.id} value={x.id}>{x.nombre}</option>)}</select>
          </label>
          {c.tipo_plazo && c.tipo_plazo !== 'otro' && (
            <label className="cr-campo"><span>Desde</span><input type="date" value={c.fecha_hecho || ''} onChange={(e) => cambiarPlazo(c.tipo_plazo as TipoPlazo, e.target.value || null)} /></label>
          )}
          {c.tipo_plazo === 'otro' && (
            <label className="cr-campo"><span>Vence el</span><input type="date" value={c.vence || ''} onChange={(e) => cambiarPlazo('otro', null, e.target.value || null)} /></label>
          )}
        </div>
        {c.tipo_plazo && <p className="cr-mini-nota">{PLAZOS.find((x) => x.id === c.tipo_plazo)?.ayuda} Cómputo orientativo: revísalo siempre.</p>}

        <h3>Apuntar lo que ha pasado</h3>
        <form className="cr-apuntar" onSubmit={(e) => { e.preventDefault(); if (!texto.trim()) return; registrar(tipo, texto.trim()); setTexto(''); }}>
          <div className="cr-tipos">
            {TIPOS_ACT.map(([t, n]) => <button key={t} type="button" className={tipo === t ? 'activo' : ''} onClick={() => setTipo(t)}>{n}</button>)}
          </div>
          <div className="cr-apuntar-fila">
            <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder={tipo === 'llamada' ? 'Por ejemplo: no contesta, volver a llamar a las 17:00' : 'Qué ha pasado'} aria-label="Qué ha pasado" />
            <button type="submit" className="cr-btn">Apuntar</button>
          </div>
        </form>

        <ol className="cr-camino">
          {actividades.map((a) => (
            <li key={a.id} className={`cr-act-${a.tipo}`}>
              <i aria-hidden="true">{ICONO_ACT[a.tipo]}</i>
              <span><small>{hace(a.creado)}{a.autor ? ` · ${a.autor}` : ''}</small>{a.texto}</span>
            </li>
          ))}
          {actividades.length === 0 && <li><span>Todavía no hay nada apuntado.</span></li>}
        </ol>

        <h3>Tareas</h3>
        <ul className="cr-tareas">
          {tareas.map((t) => (
            <li key={t.id} className={t.hecha ? 'hecha' : ''}>
              <label><input type="checkbox" checked={t.hecha} onChange={() => cambiarTarea(t.id, { hecha: !t.hecha })} /><span>{t.texto}</span></label>
              <span className="cr-tarea-meta">{t.vence && <small>{t.vence === hoyIso() ? 'hoy' : fecha(t.vence)}</small>}<button type="button" className="cr-x" onClick={() => borrarTarea(t.id)} aria-label="Borrar tarea">×</button></span>
            </li>
          ))}
        </ul>
        <form className="cr-apuntar-fila" onSubmit={(e) => { e.preventDefault(); if (!tarea.trim()) return; crearTarea({ contacto_id: c.id, texto: tarea.trim(), vence: tareaVence, hecha: false, responsable: usuario }); setTarea(''); }}>
          <input value={tarea} onChange={(e) => setTarea(e.target.value)} placeholder="Nueva tarea" aria-label="Nueva tarea" />
          <input type="date" value={tareaVence} onChange={(e) => setTareaVence(e.target.value)} aria-label="Fecha de la tarea" className="cr-fecha" />
          <button type="submit" className="cr-btn cr-btn-claro">Añadir</button>
        </form>

        <h3>Documentos</h3>
        <ul className="cr-docs">
          {c.docs.map(([d, ok], i) => (
            <li key={`${d}-${i}`}>
              <label><input type="checkbox" checked={ok} onChange={() => actualizar({ docs: c.docs.map((x, j) => (j === i ? [x[0], !x[1]] : x)) })} />{d}</label>
            </li>
          ))}
        </ul>
        <form className="cr-apuntar-fila" onSubmit={(e) => { e.preventDefault(); if (!nuevoDoc.trim()) return; actualizar({ docs: [...c.docs, [nuevoDoc.trim(), false]] }); setNuevoDoc(''); }}>
          <input value={nuevoDoc} onChange={(e) => setNuevoDoc(e.target.value)} placeholder="Otro documento que haga falta" aria-label="Otro documento" />
          <button type="submit" className="cr-btn cr-btn-claro">Añadir</button>
        </form>

        <h3>Notas</h3>
        <textarea className="cr-nota-area" rows={4} value={nota} onChange={(e) => setNota(e.target.value)} onBlur={() => nota !== (c.nota || '') && actualizar({ nota })} placeholder="Lo importante del caso. Se guarda al salir del cuadro." />

        <p className="cr-rgpd">{c.consentimiento ? 'Protección de datos: consentimiento aceptado.' : 'Protección de datos: falta confirmar el consentimiento.'}{' '}
          {!c.consentimiento && <button type="button" className="cr-enlace" onClick={() => actualizar({ consentimiento: true })}>Marcar como aceptado</button>}
        </p>

        <div className="cr-borrar">
          {confirmar ? (
            <>
              <span>¿Borrar a {c.nombre} y todo su historial? No se puede deshacer.</span>
              <button type="button" className="cr-btn cr-btn-rojo" onClick={borrar}>Sí, borrar</button>
              <button type="button" className="cr-btn cr-btn-claro" onClick={() => setConfirmar(false)}>No</button>
            </>
          ) : (
            <button type="button" className="cr-enlace" onClick={() => setConfirmar(true)}>Borrar esta ficha (por ejemplo, si lo pide por protección de datos)</button>
          )}
        </div>
      </aside>
    </div>
  );
}
