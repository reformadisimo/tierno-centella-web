'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ultimoDiaParaReclamar, diasHabilesRestantes } from '@/lib/calculos';
import { hoyMadrid, diaSiguiente } from '@/lib/hoy';
import { fechaLarga, DESPACHO } from '@/lib/despacho';

export default function Plazo() {
  const [despido, setDespido] = useState('');
  const hoy = despido ? hoyMadrid() : '';

  let contenido: React.ReactNode = null;
  if (despido) {
    if (despido > hoy) {
      contenido = <p className="error">La fecha del despido no puede ser posterior a hoy.</p>;
    } else {
      const ultimo = ultimoDiaParaReclamar(despido);
      const desde = hoy > despido ? hoy : diaSiguiente(despido);
      const quedan = diasHabilesRestantes(desde, ultimo);
      contenido =
        quedan < 1 ? (
          <p className="cuenta-vencida">
            El plazo terminó el {fechaLarga(ultimo)}. Aun así, llámanos al {DESPACHO.telefono}: hay casos en los que el plazo se
            interrumpió o no empezó a contar.
          </p>
        ) : (
          <div className="cuenta" aria-live="polite">
            <span className="cuenta-numero">{quedan}</span>
            <span className="cuenta-texto">{quedan === 1 ? 'día hábil te queda' : 'días hábiles te quedan'} para reclamar</span>
            <span className="cuenta-fecha">Último día: {fechaLarga(ultimo)}</span>
          </div>
        );
    }
  }

  return (
    <div className="plazo" id="plazo">
      <h2>¿Cuánto tiempo te queda?</h2>
      <p className="plazo-ayuda">Pon la fecha que aparece en tu carta de despido.</p>
      <div className="campo">
        <label htmlFor="fecha-despido">Fecha del despido</label>
        <input id="fecha-despido" type="date" value={despido} onChange={(e) => setDespido(e.target.value)} />
      </div>
      {contenido}
      {despido && despido <= hoy && (
        <div className="acciones">
          <Link className="boton" href={`/calculadora-indemnizacion?despido=${despido}`}>
            Calcular mi indemnización
          </Link>
        </div>
      )}
      <p className="letra-pequena">
        Cálculo orientativo: descuenta fines de semana y festivos nacionales, no los de tu comunidad o tu municipio. Presentar
        la papeleta de conciliación detiene el plazo.
      </p>
    </div>
  );
}
