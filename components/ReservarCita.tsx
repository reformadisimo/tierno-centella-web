'use client';

// Reserva de consulta en cuatro pasos, con el mismo estilo que los tests: con quién, cómo, cuándo y tus datos.
import { useState } from 'react';
import Link from 'next/link';
import Icono from './Iconos';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { medir } from '@/lib/medir';

const TEMAS = ['Me han despedido', 'Sufro acoso laboral', 'Incapacidad o baja', 'Me deben dinero', 'Soy una empresa', 'Otro tema'];
const FRANJAS = ['Cuanto antes', 'Por la mañana', 'Por la tarde'];
const PAGO: Record<string, string | undefined> = { abogado: process.env.NEXT_PUBLIC_PAGO_ABOGADO, jesus: process.env.NEXT_PUBLIC_PAGO_JESUS };

export default function ReservarCita({ inicial = 'abogado' }: { inicial?: 'abogado' | 'jesus' }) {
  const [paso, setPaso] = useState(0);
  const [con, setCon] = useState<'abogado' | 'jesus'>(inicial);
  const [modalidad, setModalidad] = useState<'online' | 'presencial'>('online');
  const [dia, setDia] = useState('');
  const [franja, setFranja] = useState(FRANJAS[0]);
  const [tema, setTema] = useState('');
  const [datos, setDatos] = useState({ nombre: '', telefono: '', email: '', mensaje: '', acepto: false, web: '' });
  const [estado, setEstado] = useState<'listo' | 'enviando' | 'hecho' | 'error'>('listo');
  const [error, setError] = useState('');
  const precio = con === 'jesus' ? DESPACHO.precioCitaJesus : DESPACHO.precioCita;
  const manana = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const quien = con === 'jesus' ? 'Jesús Tierno' : 'un abogado del despacho';
  const total = 4;

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!datos.nombre.trim() || !datos.telefono.trim() || !datos.acepto) {
      setError('Faltan tu nombre, tu teléfono o aceptar la política de privacidad.');
      return;
    }
    setEstado('enviando');
    setError('');
    try {
      const r = await fetch('/api/reservar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ con, modalidad, dia, franja, tema, ...datos }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || 'No se pudo enviar.');
      setEstado('hecho');
      medir('reserva_enviada', { con, modalidad });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar.');
      setEstado('error');
    }
  }

  if (estado === 'hecho')
    return (
      <div className="fl-hecho rs-hecho" role="status">
        <span className="fl-hecho-sello" aria-hidden="true"><Icono nombre="check" tam={34} /></span>
        <h3>Reserva recibida{datos.nombre.trim() ? `, ${datos.nombre.trim().split(' ')[0]}` : ''}</h3>
        <p>
          Consulta de una hora con {quien}, {modalidad === 'online' ? 'online por videollamada' : 'en Jorge Juan, 78'}. Te llamamos en horario de despacho para confirmar el día y la hora
          {PAGO[con] ? '' : ' y para decirte cómo se paga'}.
        </p>
        {PAGO[con] && (
          <a className="boton boton-marcador" href={PAGO[con]} target="_blank" rel="noopener">
            <Icono nombre="euro" tam={17} /> Pagar la consulta ({precio} €{DESPACHO.iva})
          </a>
        )}
        <a className="boton boton-claro" href={DESPACHO.telefonoHref}><Icono nombre="telefono" tam={17} /> Si es urgente, llámanos al {DESPACHO.telefono}</a>
      </div>
    );

  return (
    <form className="herramienta cq rs" onSubmit={enviar}>
      <div className="cq-progreso" aria-hidden="true">
        <span style={{ width: `${Math.max(4, (paso / total) * 100 + 8)}%` }}><i /></span>
      </div>
      <p className="campo-ayuda">Paso {paso + 1} de {total}</p>

      {paso === 0 && (
        <fieldset className="pregunta-test paso">
          <legend><span className="paso-pregunta">¿Con quién quieres la consulta?</span></legend>
          <div className="paso-opciones">
            {([['abogado', 'Con un abogado del despacho', 'Una hora, con tus documentos', DESPACHO.precioCita], ['jesus', 'Con Jesús Tierno', 'Para los casos más complejos', DESPACHO.precioCitaJesus]] as const).map(([id, t, s, p], n) => (
              <button key={id} type="button" className={`paso-opcion${con === id ? ' elegida' : ''}`} onClick={() => { setCon(id); setPaso(1); }}>
                <b className="cq-letra" aria-hidden="true">{String.fromCharCode(65 + n)}</b>
                <span>{t}<small>{s}</small></span>
                <strong className="rs-precio">{p} €{DESPACHO.iva}</strong>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {paso === 1 && (
        <fieldset className="pregunta-test paso">
          <legend><span className="paso-pregunta">¿Cómo prefieres que sea?</span></legend>
          <div className="paso-opciones">
            {([['online', 'Online, por videollamada', 'Desde tu casa y desde cualquier punto de España. Te enviamos el enlace.'], ['presencial', 'Presencial, en el despacho', 'Calle de Jorge Juan, 78, 5.º C, Madrid (barrio de Salamanca).']] as const).map(([id, t, s], n) => (
              <button key={id} type="button" className={`paso-opcion${modalidad === id ? ' elegida' : ''}`} onClick={() => { setModalidad(id); setPaso(2); }}>
                <b className="cq-letra" aria-hidden="true">{String.fromCharCode(65 + n)}</b>
                <span>{t}<small>{s}</small></span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {paso === 2 && (
        <fieldset className="pregunta-test paso">
          <legend><span className="paso-pregunta">¿Cuándo te viene mejor?</span></legend>
          <p className="campo-ayuda">Es solo una preferencia: te llamamos para confirmar la hora exacta.</p>
          <div className="campos-fila" style={{ marginTop: 14 }}>
            <div className="campo">
              <label htmlFor="r-dia">Día</label>
              <input id="r-dia" type="date" min={manana} value={dia} onChange={(e) => setDia(e.target.value)} />
            </div>
            <div className="campo">
              <label htmlFor="r-franja">Franja</label>
              <select id="r-franja" value={franja} onChange={(e) => setFranja(e.target.value)}>
                {FRANJAS.map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
          </div>
          <div className="acciones"><button type="button" className="boton boton-marcador" onClick={() => setPaso(3)}>Siguiente</button></div>
        </fieldset>
      )}

      {paso === 3 && (
        <div className="paso">
          <span className="paso-pregunta">Tus datos y listo</span>
          <p className="rs-resumen"><Icono nombre="calendario" tam={16} /> Consulta de una hora con {quien}, {modalidad === 'online' ? 'online' : 'presencial'}: <b>{precio} €{DESPACHO.iva}</b></p>
          <div className="escala fl" style={{ margin: '4px 0 14px', border: 0, boxShadow: 'none', background: 'none', padding: 0 }}>
            {TEMAS.map((t) => (
              <label key={t}><input type="radio" name="tema" checked={tema === t} onChange={() => setTema(t)} />{t}</label>
            ))}
          </div>
          <div className="campos-fila">
            <div className="campo"><label htmlFor="r-nombre">Nombre</label><input id="r-nombre" type="text" autoComplete="name" required value={datos.nombre} onChange={(e) => setDatos({ ...datos, nombre: e.target.value })} /></div>
            <div className="campo"><label htmlFor="r-tel">Teléfono</label><input id="r-tel" type="tel" inputMode="tel" autoComplete="tel" required value={datos.telefono} onChange={(e) => setDatos({ ...datos, telefono: e.target.value })} /></div>
          </div>
          <div className="campo"><label htmlFor="r-email">Correo (opcional)</label><input id="r-email" type="email" autoComplete="email" value={datos.email} onChange={(e) => setDatos({ ...datos, email: e.target.value })} /></div>
          <div className="campo"><label htmlFor="r-msg">Cuéntanos en dos líneas qué ha pasado (opcional)</label><textarea id="r-msg" rows={3} maxLength={1500} value={datos.mensaje} onChange={(e) => setDatos({ ...datos, mensaje: e.target.value })} /></div>
          <input type="text" name="web" tabIndex={-1} autoComplete="off" value={datos.web} onChange={(e) => setDatos({ ...datos, web: e.target.value })} style={{ position: 'absolute', left: -9999 }} aria-hidden="true" />
          <label className="casilla" style={{ marginBottom: 16 }}>
            <input type="checkbox" required checked={datos.acepto} onChange={(e) => setDatos({ ...datos, acepto: e.target.checked })} />
            <span>Acepto que usen mis datos para responderme, según la <Link href="/privacidad">política de privacidad</Link>.</span>
          </label>
          <button type="submit" className="boton boton-marcador rs-enviar" disabled={estado === 'enviando'}>
            <Icono nombre="calendario" tam={17} /> {estado === 'enviando' ? 'Enviando...' : 'Reservar mi consulta'}
          </button>
          <p className="fl-pie"><Icono nombre="reloj" tam={15} /> Sin pagar nada ahora: te llamamos para confirmar la hora.</p>
          {error && (
            <div className="recuadro" role="alert">
              <p>{error}</p>
              <a className="boton" href={enlaceWhatsapp(`Hola, soy ${datos.nombre || '...'}. Quiero reservar una consulta con ${quien}.`)}>Reservar por WhatsApp</a>
            </div>
          )}
        </div>
      )}

      {paso > 0 && (
        <div className="acciones" style={{ marginTop: 8 }}>
          <button type="button" className="boton boton-claro" onClick={() => setPaso((p) => p - 1)}>Volver</button>
        </div>
      )}
    </form>
  );
}
