'use client';

// Pide avisos por correo del plazo. Doble confirmación: primero llega un correo para confirmar que es tuyo.
import { useState } from 'react';

export default function AvisoCorreo({ nombre, ultimo, agostoHabil, madrid }: { nombre: string; ultimo: string; agostoHabil: boolean; madrid: boolean }) {
  const [abierto, setAbierto] = useState(false);
  const [email, setEmail] = useState('');
  const [ok, setOk] = useState(false);
  const [acepto, setAcepto] = useState(false);
  const [web, setWeb] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      const r = await fetch('/api/alerta-plazo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nombre, ultimo, agostoHabil, madrid, consentimiento: acepto, web }),
      });
      const j = await r.json().catch(() => ({}));
      if (j.ok) setOk(true);
      else setError(j.error || 'No hemos podido guardar el aviso. Prueba más tarde o llámanos.');
    } catch {
      setError('No hemos podido guardar el aviso. Prueba más tarde o llámanos.');
    }
    setEnviando(false);
  }

  if (ok)
    return (
      <p className="aviso-correo-ok" role="status">
        Te hemos enviado un correo a {email}. Pulsa el botón que lleva para confirmar los avisos (mira también en spam).
      </p>
    );
  if (!abierto)
    return (
      <button type="button" className="boton boton-claro" style={{ marginTop: 12, marginLeft: 8 }} onClick={() => setAbierto(true)}>
        Avisarme por correo
      </button>
    );
  return (
    <form onSubmit={enviar} className="aviso-correo" style={{ marginTop: 14, textAlign: 'left' }}>
      <p style={{ margin: '0 0 8px' }}>Te escribiremos solo cuando queden unos 10, 5 y 2 días hábiles. Sin publicidad.</p>
      <div className="campo">
        <label htmlFor="aviso-email">Tu correo</label>
        <input id="aviso-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <input type="text" name="web" value={web} onChange={(e) => setWeb(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
      <label className="opcion" style={{ margin: '4px 0 10px' }}>
        <input type="checkbox" checked={acepto} onChange={(e) => setAcepto(e.target.checked)} />
        <span>
          Acepto que Tierno Centella Abogados use mi correo solo para estos avisos y lo borre cuando pase el plazo o me dé de baja. Más información en la{' '}
          <a href="/privacidad" target="_blank" rel="noopener">política de privacidad</a>.
        </span>
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit" className="boton" disabled={!acepto || !email || enviando}>
        {enviando ? 'Enviando…' : 'Enviarme el correo de confirmación'}
      </button>
    </form>
  );
}
