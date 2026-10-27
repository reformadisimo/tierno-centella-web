'use client';

// Mesa de control de Tierno Centella (demostración), con la estructura de la de Reformadísimo:
// conclusión del día, una sola tarea principal, cinco baterías, cuatro cifras, pregúntale a la mesa,
// resumen por correo y una guía de una pantalla la primera vez. Los textos salen de lib/mesa-tierno.ts.
import { useEffect, useState } from 'react';
import { LUZ, TEMAS_RESUMEN, correoResumen, primeraFrase, type Luz, type Mesa, type Modulo, type Tarea } from '@/lib/mesa-tierno';

const suave = (): ScrollBehavior => (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');
const ir = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: suave(), block: 'start' });

function Punto({ luz, g = false }: { luz: Luz; g?: boolean }) {
  return <span className={`mx-punto${g ? ' g' : ''}`} style={{ background: LUZ[luz].c, boxShadow: `0 0 0 ${g ? 4 : 3}px ${LUZ[luz].c}26` }} aria-hidden="true" />;
}

const SEGMENTOS: Record<Luz, number> = { verde: 4, ambar: 2, rojo: 1, gris: 0, azul: 3 };
function Bateria({ luz }: { luz: Luz }) {
  const c = luz === 'gris' ? '#c9c2b3' : LUZ[luz].c;
  return (
    <span className="mx-bateria" aria-hidden="true">
      <span className="mx-bat-cuerpo" style={{ borderColor: c }}>
        {[0, 1, 2, 3].map((i) => <span key={i} style={{ background: i < SEGMENTOS[luz] ? LUZ[luz].c : '#ece6da' }} />)}
      </span>
      <span className="mx-bat-polo" style={{ background: c }} />
    </span>
  );
}

// "Ya lo he revisado": se guarda en este navegador y caduca a los 7 días.
function useHechas() {
  const [hechas, setHechas] = useState<Record<string, string>>({});
  useEffect(() => {
    try {
      const g = JSON.parse(localStorage.getItem('tc-mesa-hechas') || '{}') as Record<string, unknown>;
      const limite = new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
      const vivas: Record<string, string> = {};
      for (const [k, d] of Object.entries(g)) if (typeof d === 'string' && d >= limite) vivas[k] = d;
      setHechas(vivas);
    } catch {}
  }, []);
  const marca = (id: string) =>
    setHechas((h) => {
      const n = { ...h };
      if (n[id]) delete n[id];
      else n[id] = new Date().toISOString().slice(0, 10);
      try {
        localStorage.setItem('tc-mesa-hechas', JSON.stringify(n));
      } catch {}
      return n;
    });
  return { hechas, marca };
}

function Conclusion({ m }: { m: Mesa }) {
  const urgente = /atención|importante/i.test(m.resumen.titulo);
  return (
    <section className={`mx-conclusion${urgente ? ' urgente' : ''}`}>
      <p className="mx-concl-titulo"><Punto luz={urgente ? 'rojo' : 'verde'} g />{m.resumen.titulo}</p>
      <ul>
        {m.resumen.puntos.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
      <button type="button" className="mx-amarillo" onClick={() => ir('mesa-hoy')}>{urgente ? 'Ver lo más importante' : 'Ver qué tengo que hacer'}</button>
    </section>
  );
}

function TareaPrincipal({ tareas, modulos, abre }: { tareas: Tarea[]; modulos: Modulo[]; abre: (id: string) => void }) {
  const { hechas, marca } = useHechas();
  const [verMas, setVerMas] = useState(false);
  const principal = tareas.find((t) => !hechas[t.id]);
  const resto = tareas.filter((t) => t !== principal);
  const Fila = ({ t, grande }: { t: Tarea; grande?: boolean }) => {
    const ok = !!hechas[t.id];
    const mod = modulos.find((x) => x.id === t.ir);
    return (
      <div className={grande ? 'mx-tarea grande' : 'mx-tarea'}>
        <p className={`mx-tarea-t${ok ? ' hecha' : ''}`}>{t.texto}</p>
        <p className="mx-tarea-p">{t.porque} <span>Está en «{t.donde}»</span></p>
        <div className="mx-botones">
          {mod && <button type="button" className="mx-amarillo" onClick={() => abre(mod.id)}>{t.boton}</button>}
          <button type="button" className={`mx-borde${ok ? ' ok' : ''}`} onClick={() => marca(t.id)}>{ok ? 'Revisado' : 'Ya lo he revisado'}</button>
        </div>
      </div>
    );
  };
  return (
    <section id="mesa-hoy" className="mx-hoy">
      <h2 className="mx-etiqueta">Lo primero que haría hoy</h2>
      {principal ? <Fila t={principal} grande /> : <p className="mx-tarea-t">Ya has revisado todo lo de hoy. Bien hecho.</p>}
      {resto.length > 0 && (
        <>
          <button type="button" className="mx-enlace" aria-expanded={verMas} onClick={() => setVerMas(!verMas)}>
            {verMas ? 'Ocultar' : `Hay ${resto.length === 1 ? '1 acción más' : `${resto.length} acciones más`}`}
          </button>
          {verMas && resto.map((t) => <Fila key={t.id} t={t} />)}
        </>
      )}
    </section>
  );
}

function EstadoLista({ modulos, abierto, setAbierto }: { modulos: Modulo[]; abierto: string | null; setAbierto: (id: string | null) => void }) {
  return (
    <section id="mesa-estado" className="mx-seccion">
      <h2 className="mx-h2">Cómo está cada parte</h2>
      <p className="mx-nota">Batería llena y verde, todo bien; naranja, mira esto; roja, importante. Pulsa cada una para ver el detalle.</p>
      <ul className="mx-modulos">
        {modulos.map((m) => {
          const ab = abierto === m.id;
          return (
            <li key={m.id} id={`tema-${m.id}`} className={ab ? 'abierto' : ''}>
              <button type="button" className="mx-mod-cab" aria-expanded={ab} onClick={() => setAbierto(ab ? null : m.id)}>
                <Bateria luz={m.luz} />
                <span className="mx-mod-txt">
                  <span className="mx-mod-tit">{m.titulo} <em style={{ color: LUZ[m.luz].c }}>{m.estado ?? LUZ[m.luz].t}</em></span>
                  <span className="mx-mod-con">{primeraFrase(m.conclusion)}</span>
                </span>
                <span className="mx-mod-ver">{ab ? 'Cerrar' : m.ver}</span>
              </button>
              {ab && (
                <div className="mx-mod-det">
                  <p className="mx-mod-que">{m.que} · últimos 28 días</p>
                  {primeraFrase(m.conclusion) !== m.conclusion && <p>{m.conclusion}</p>}
                  <ul>
                    {m.filas.map((f, i) => (
                      <li key={i}>
                        <span className="mx-fila-t">{f.luz && <Punto luz={f.luz} />}{f.t}{f.publico && <small className="mx-publico">dato real</small>}</span>
                        <span className="mx-fila-v">{f.v}</span>
                      </li>
                    ))}
                  </ul>
                  {m.enlaces.length > 0 && (
                    <p className="mx-botones">
                      {m.enlaces.map((e) => <a key={e.href} className="mx-amarillo" href={e.href} target="_blank" rel="noopener">{e.t} →</a>)}
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Cifras({ m }: { m: Mesa }) {
  const [info, setInfo] = useState<string | null>(null);
  return (
    <section id="mesa-cifras" className="mx-seccion">
      <h2 className="mx-h2">Las cuatro cifras que importan</h2>
      <ul className="mx-cifras">
        {m.relojes.map((r) => {
          const ab = info === r.t;
          return (
            <li key={r.t}>
              <div className="mx-cifra-fila">
                <Punto luz={r.luz} g />
                <div className="mx-cifra-txt">
                  <p className="mx-cifra-frase">{r.frase}</p>
                  <p className="mx-cifra-det">{r.detalle}</p>
                  <p className="mx-cifra-luz" style={{ color: LUZ[r.luz].c }}>{LUZ[r.luz].t}</p>
                </div>
                <button type="button" className="mx-que" aria-label={`Qué significa: ${r.t}`} aria-expanded={ab} onClick={() => setInfo(ab ? null : r.t)}>?</button>
              </div>
              {ab && <p className="mx-ayuda">{r.ayuda}</p>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Pregunta() {
  const [q, setQ] = useState('');
  const [r, setR] = useState<{ q: string; a: string }[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const preguntar = async (texto = q) => {
    const t = texto.trim();
    if (!t || cargando) return;
    setCargando(true);
    setError('');
    try {
      const res = await fetch('/api/mesa/pregunta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pregunta: t }) });
      const j = await res.json();
      if (!j.ok) throw new Error(j.error || 'No he podido contestar.');
      setR((x) => [{ q: t, a: j.texto }, ...x].slice(0, 5));
      setQ('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No he podido contestar.');
    } finally {
      setCargando(false);
    }
  };
  const ejemplos = ['¿Qué hago primero esta semana?', '¿Qué anuncio funciona mejor?', '¿Por dónde me llegan más consultas?'];
  return (
    <section id="mesa-pregunta" className="mx-seccion mx-caja">
      <h2 className="mx-h2">Pregúntale a la mesa</h2>
      <p className="mx-nota">Escribe tu pregunta como se la harías a una persona. Contesta con los datos de los últimos 28 días.</p>
      <form className="mx-form" onSubmit={(e) => { e.preventDefault(); preguntar(); }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Escribe aquí tu pregunta" aria-label="Tu pregunta" />
        <button type="submit" className="mx-amarillo" disabled={cargando || !q.trim()}>{cargando ? 'Pensando...' : 'Preguntar'}</button>
      </form>
      {!r.length && (
        <>
          <p className="mx-pulsa">O pulsa una de estas:</p>
          <p className="mx-ejemplos">{ejemplos.map((e) => <button key={e} type="button" onClick={() => preguntar(e)}>{e}</button>)}</p>
        </>
      )}
      {error && <p className="mx-error">{error}</p>}
      <ul className="mx-respuestas">
        {r.map((x, i) => (
          <li key={i}><p className="mx-r-q">{x.q}</p><p className="mx-r-a">{x.a}</p></li>
        ))}
      </ul>
    </section>
  );
}

function ResumenCorreo({ m }: { m: Mesa }) {
  const [frec, setFrec] = useState<'ahora' | 'diario' | 'semanal' | 'mensual'>('semanal');
  const [temas, setTemas] = useState<string[]>(TEMAS_RESUMEN.map(([k]) => k));
  const [email, setEmail] = useState('');
  const [ver, setVer] = useState(false);
  const [estado, setEstado] = useState('');
  const alterna = (k: string) => setTemas((t) => (t.includes(k) ? t.filter((x) => x !== k) : [...t, k]));
  const FREC: [typeof frec, string][] = [['ahora', 'Solo una vez, ahora'], ['diario', 'Cada día'], ['semanal', 'Cada lunes'], ['mensual', 'Cada mes (día 1)']];
  return (
    <section id="mesa-resumenes" className="mx-caja">
      <h3 className="mx-h3">Recibe un resumen por correo</h3>
      <p className="mx-nota">Elige cada cuánto y de qué. Pon tu correo y te lo mandamos solo, sin que tengas que entrar.</p>
      <p className="mx-paso">1. Cada cuánto</p>
      <div className="mx-chips">
        {FREC.map(([k, t]) => <button key={k} type="button" aria-pressed={frec === k} onClick={() => setFrec(k)}>{t}</button>)}
      </div>
      <p className="mx-paso">2. De qué</p>
      <div className="mx-chips">
        {TEMAS_RESUMEN.map(([k, t]) => <button key={k} type="button" className="tema" aria-pressed={temas.includes(k)} onClick={() => alterna(k)}>{t}</button>)}
      </div>
      <p className="mx-paso">3. A qué correo</p>
      <form className="mx-form" onSubmit={(e) => { e.preventDefault(); setEstado(`Esto es una demostración: en tu mesa de verdad, te llegaría ${frec === 'ahora' ? 'ahora mismo' : frec === 'diario' ? 'cada mañana' : frec === 'semanal' ? 'cada lunes por la mañana' : 'el día 1 de cada mes'} a ${email}.`); setVer(true); }}>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.es" aria-label="Tu correo" />
        <button type="submit" className="mx-amarillo" disabled={!temas.length || !email}>{frec === 'ahora' ? 'Enviármelo ahora' : 'Programarlo'}</button>
      </form>
      {estado && <p className="mx-ok">{estado}</p>}
      <button type="button" className="mx-enlace" onClick={() => setVer(!ver)} aria-expanded={ver}>{ver ? 'Ocultar cómo te llegaría' : 'Ver cómo te llegaría'}</button>
      {ver && <div className="mx-correo" dangerouslySetInnerHTML={{ __html: correoResumen(m, temas) }} />}
    </section>
  );
}

function Guia({ cerrar }: { cerrar: () => void }) {
  const [mas, setMas] = useState(false);
  return (
    <div className="mx-guia-fondo" role="dialog" aria-modal="true" aria-label="Cómo funciona la mesa">
      <div className="mx-guia">
        <h2>Esta mesa te cuenta tres cosas</h2>
        <ol>
          <li><span>1</span>Cómo va todo.</li>
          <li><span>2</span>Qué necesita atención.</li>
          <li><span>3</span>Qué haría hoy.</li>
        </ol>
        <p>No necesitas entender de marketing. Pulsa cualquier apartado y te lo explicamos.</p>
        {mas && (
          <div className="mx-guia-mas">
            <p><b>Los colores</b> siempre dicen lo mismo: verde, todo bien; naranja, mira esto; rojo, importante; gris, sin datos aún; azul, datos de tu negocio.</p>
            <p><b>Las baterías</b> de cada parte (la web, reputación e IA, competencia, anuncios, consultas y plazos) se llenan cuando va bien y se vacían cuando algo falla. Pulsa para ver el detalle.</p>
            <p><b>El &quot;?&quot;</b> de cada cifra te explica qué es y si está bien.</p>
            <p><b>Pregúntale a la mesa</b> con tus palabras. Y si prefieres no entrar, pide que te mandemos el resumen por correo.</p>
          </div>
        )}
        <div className="mx-guia-pie">
          <button type="button" className="mx-enlace" onClick={() => setMas(!mas)}>{mas ? 'Menos explicación' : 'Ver una explicación más completa'}</button>
          <button type="button" className="mx-amarillo" onClick={cerrar}>Entrar en mi mesa</button>
        </div>
      </div>
    </div>
  );
}

export default function MesaTierno({ m }: { m: Mesa }) {
  const [abierto, setAbierto] = useState<string | null>(null);
  const [guia, setGuia] = useState(false);
  const [mas, setMas] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem('tc-mesa-guia')) setGuia(true);
    } catch {}
  }, []);
  const cerrarGuia = () => {
    setGuia(false);
    try {
      localStorage.setItem('tc-mesa-guia', '1');
    } catch {}
  };
  const abre = (id: string) => {
    setAbierto(id);
    setTimeout(() => ir(`tema-${id}`), 50);
  };
  return (
    <div className="mx">
      <p className="mx-demo">Demostración con <b>cifras de ejemplo</b>. Lo marcado como &quot;dato real&quot; es público de tu despacho.</p>
      <div className="mx-cuerpo">
        <header>
          <p className="mx-sobre">Tierno Centella · mesa de control</p>
          <h1>Cómo va el despacho</h1>
          <p className="mx-periodo">{m.periodo} · actualizado el {m.actualizado}</p>
          <div className="mx-botones">
            <button type="button" className="mx-borde" onClick={() => setGuia(true)}>Ayuda</button>
            <a className="mx-borde" href="/guia-jesus/panel" target="_blank" rel="noopener">Ver todas las cifras</a>
          </div>
          {m.fallos.length > 0 && <p className="mx-fallo"><Punto luz="ambar" />{m.fallos.join(' ')}</p>}
        </header>
        <Conclusion m={m} />
        <TareaPrincipal tareas={m.tareas} modulos={m.modulos} abre={abre} />
        <EstadoLista modulos={m.modulos} abierto={abierto} setAbierto={setAbierto} />
        <Cifras m={m} />
        <Pregunta />
        <section id="mesa-mas" className="mx-seccion mx-caja">
          <button type="button" className="mx-mas-cab" aria-expanded={mas} onClick={() => setMas(!mas)}>
            <span><b>Más herramientas</b><span>Recibir el resumen por correo, el CRM, la lupa y todas las cifras</span></span>
            <span className="mx-amarillo">{mas ? 'Cerrar' : 'Abrir'}</span>
          </button>
          {mas && (
            <div className="mx-mas">
              <p className="mx-botones">
                <a className="mx-borde" href="/guia-jesus/crm" target="_blank" rel="noopener">El CRM</a>
                <a className="mx-borde" href="/guia-jesus/mapa-calor" target="_blank" rel="noopener">La lupa de tu web</a>
                <a className="mx-borde" href="/guia-jesus/panel" target="_blank" rel="noopener">Todas las cifras y gráficas</a>
              </p>
              <ResumenCorreo m={m} />
            </div>
          )}
        </section>
      </div>
      <nav className="mx-barra" aria-label="Ir a">
        {([['mesa-estado', 'Estado'], ['mesa-cifras', 'Cifras'], ['mesa-mas', 'Más'], ['mesa-pregunta', 'Pregúntale']] as const).map(([id, t]) => (
          <button key={id} type="button" onClick={() => { if (id === 'mesa-mas') setMas(true); setTimeout(() => ir(id), 30); }}>{t}</button>
        ))}
      </nav>
      <button type="button" className="mx-ayuda-fija" aria-label="Ayuda: cómo funciona la mesa" onClick={() => setGuia(true)}>?</button>
      {guia && <Guia cerrar={cerrarGuia} />}
    </div>
  );
}
