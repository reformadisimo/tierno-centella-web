'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AvisoPlazoEstado() {
  const q = useSearchParams();
  const e = q.get('e');
  const t = q.get('t') ?? '';
  const [hecho, setHecho] = useState<'' | 'ok' | 'error'>('');
  async function baja() {
    try {
      const r = await fetch('/api/alerta-plazo/baja', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ t }) });
      const j = await r.json();
      setHecho(j.ok ? 'ok' : 'error');
    } catch {
      setHecho('error');
    }
  }
  if (e === 'confirmado')
    return <div className="recuadro"><p><strong>Listo, te avisaremos.</strong> Te escribiremos cuando queden unos 10, 5 y 2 días hábiles. Cada correo lleva un enlace para darte de baja.</p></div>;
  if (e === 'baja')
    return hecho === 'ok' ? (
      <div className="recuadro"><p><strong>Hecho: te hemos dado de baja.</strong> Hemos borrado tu correo y no recibirás más avisos.</p></div>
    ) : (
      <div>
        <p>¿Quieres dejar de recibir los avisos de este plazo? Borraremos tu correo.</p>
        <button type="button" className="boton" onClick={baja}>Sí, darme de baja</button>
        {hecho === 'error' && <p className="error">No hemos podido hacerlo. Escríbenos y lo hacemos nosotros.</p>}
      </div>
    );
  return <div className="recuadro"><p>El enlace no es válido o ya se ha usado. Si quieres, puedes volver a pedir el aviso desde la herramienta de plazos.</p></div>;
}
