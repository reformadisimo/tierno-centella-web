'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { medir } from '@/lib/medir';

const TEMAS = ['Me han despedido', 'Sufro acoso laboral', 'Incapacidad o baja', 'Me deben dinero', 'Soy una empresa', 'Otro tema'];

export default function FormularioContacto() {
  const [estado, setEstado] = useState<'listo' | 'enviando' | 'enviado' | 'error'>('listo');
  const [error, setError] = useState('');
  const [datos, setDatos] = useState({ nombre: '', telefono: '', email: '', tema: '', cuando: 'Cuanto antes', mensaje: '', acepto: false, web: '' });
  const cambiar = (k: keyof typeof datos, v: string | boolean) => setDatos((d) => ({ ...d, [k]: v }));

  const textoWhatsapp = `Hola, soy ${datos.nombre || '...'}. Tema: ${datos.tema || 'consulta laboral'}. ${datos.mensaje}`.trim();

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEstado('enviando');
    setError('');
    try {
      const r = await fetch('/api/contacto', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || 'No se pudo enviar.');
      setEstado('enviado');
      medir('formulario_enviado', { tema: datos.tema || 'sin tema', cuando: datos.cuando });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar.');
      setEstado('error');
    }
  }

  if (estado === 'enviado')
    return (
      <div className="veredicto">
        <h3>Recibido, {datos.nombre.split(' ')[0]}</h3>
        <p style={{ margin: 0 }}>Te llamamos en horario de despacho. Si tu plazo vence en días, llámanos tú ahora al {DESPACHO.telefono}.</p>
      </div>
    );

  return (
    <form className="herramienta" onSubmit={enviar} noValidate={false}>
      <h2 style={{ fontSize: '1.3rem', marginBottom: 6 }}>Te llamamos nosotros</h2>
      <p className="campo-ayuda" style={{ marginBottom: 16 }}>
        Cuatro datos y te llamamos. Si tu caso tiene plazo corriendo, lo vemos primero.
      </p>
      <fieldset className="pregunta-test" style={{ marginBottom: 14 }}>
        <legend className="campo">
          <strong>¿Sobre qué es?</strong>
        </legend>
        <div className="escala">
          {TEMAS.map((t) => (
            <label key={t}>
              <input type="radio" name="tema" checked={datos.tema === t} onChange={() => cambiar('tema', t)} required />
              {t}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="f-nombre">Nombre</label>
          <input id="f-nombre" type="text" autoComplete="name" required value={datos.nombre} onChange={(e) => cambiar('nombre', e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="f-tel">Teléfono</label>
          <input id="f-tel" type="tel" inputMode="tel" autoComplete="tel" value={datos.telefono} onChange={(e) => cambiar('telefono', e.target.value)} />
        </div>
      </div>
      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="f-email">Correo (opcional)</label>
          <input id="f-email" type="email" autoComplete="email" value={datos.email} onChange={(e) => cambiar('email', e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="f-cuando">¿Cuándo te viene bien?</label>
          <select id="f-cuando" value={datos.cuando} onChange={(e) => cambiar('cuando', e.target.value)}>
            <option>Cuanto antes</option>
            <option>Por la mañana</option>
            <option>Por la tarde</option>
          </select>
        </div>
      </div>
      <div className="campo">
        <label htmlFor="f-msg">Cuéntanos en dos líneas qué ha pasado (opcional)</label>
        <textarea id="f-msg" rows={3} maxLength={1500} value={datos.mensaje} onChange={(e) => cambiar('mensaje', e.target.value)} />
      </div>
      <input type="text" name="web" tabIndex={-1} autoComplete="off" value={datos.web} onChange={(e) => cambiar('web', e.target.value)} style={{ position: 'absolute', left: -9999 }} aria-hidden="true" />
      <label className="casilla" style={{ marginBottom: 16 }}>
        <input type="checkbox" required checked={datos.acepto} onChange={(e) => cambiar('acepto', e.target.checked)} />
        <span>
          Acepto que usen mis datos para responderme, según la <Link href="/privacidad">política de privacidad</Link>.
        </span>
      </label>
      <button type="submit" className="boton boton-marcador" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando...' : 'Quiero que me llaméis'}
      </button>
      {estado === 'error' && (
        <div className="recuadro" role="alert">
          <p>
            {error} Mientras tanto, mándanos lo mismo por WhatsApp: llega igual de rápido.
          </p>
          <a className="boton" href={enlaceWhatsapp(textoWhatsapp)}>
            Enviar por WhatsApp
          </a>
        </div>
      )}
    </form>
  );
}
