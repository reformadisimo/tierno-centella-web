'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calcularParo, IPREM_2026, leerImporte } from '@/lib/calculos';
import { DESPACHO, enlaceWhatsapp, euros, eurosConCentimos } from '@/lib/despacho';
import { BotonImprimir, useIrAlResultado } from './Utiles';

const numero = leerImporte;
const meses = (dias: number) => Math.round(dias / 30);

export default function CalculadoraParo() {
  const [salario, setSalario] = useState('');
  const [anios, setAnios] = useState('');
  const [hijos, setHijos] = useState<0 | 1 | 2>(0);
  const [parcial, setParcial] = useState('100');
  const [enviado, setEnviado] = useState(false);

  const s = numero(salario);
  const a = numero(anios);
  const p = numero(parcial);
  const error = !enviado
    ? ''
    : !(s > 0)
      ? 'Escribe tu salario bruto anual, por ejemplo 24000.'
      : !(a > 0)
        ? 'Indica cuánto has trabajado en los últimos seis años.'
        : !(p > 0 && p <= 100)
          ? 'El porcentaje de jornada tiene que estar entre 1 y 100.'
          : '';
  // Aproximaciones: base mensual = salario anual / 12 (las bases incluyen la prorrata de pagas); días cotizados = años x 365.
  const r = enviado && !error ? calcularParo(s / 12, hijos, Math.round(Math.min(a, 6) * 365), p) : null;
  useIrAlResultado(r ? JSON.stringify(r) : '');

  return (
    <form
      className="calculadora"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setEnviado(true);
      }}
    >
      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="salario">Salario bruto anual en tu último trabajo (€)</label>
          <input id="salario" type="text" inputMode="decimal" placeholder="24000" value={salario} onChange={(e) => setSalario(e.target.value)} />
          <span className="campo-ayuda">Con las pagas extra, sin horas extra.</span>
        </div>
        <div className="campo">
          <label htmlFor="anios">Años trabajados en los últimos 6 años</label>
          <input id="anios" type="text" inputMode="decimal" placeholder="3,5" value={anios} onChange={(e) => setAnios(e.target.value)} />
          <span className="campo-ayuda">Sin contar periodos en los que ya cobraste paro. Admite decimales.</span>
        </div>
      </div>

      <fieldset>
        <legend className="campo">
          <strong>Hijos menores de 26 años a tu cargo</strong>
        </legend>
        <div className="opciones">
          {([0, 1, 2] as const).map((h) => (
            <label key={h} className="opcion">
              <input type="radio" name="hijos" checked={hijos === h} onChange={() => setHijos(h)} />
              <span>
                <strong>{h === 0 ? 'Ninguno' : h === 1 ? 'Uno' : 'Dos o más'}</strong>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="campo" style={{ maxWidth: 320 }}>
        <label htmlFor="parcial">Porcentaje de tu jornada</label>
        <input id="parcial" type="text" inputMode="numeric" value={parcial} onChange={(e) => setParcial(e.target.value)} />
        <span className="campo-ayuda">100 si trabajabas a jornada completa.</span>
      </div>

      <button type="submit" className="boton boton-marcador">
        Calcular mi paro
      </button>
      {error && (
        <p className="error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      {r && r.dias === 0 && (
        <section className="resultado" aria-live="polite">
          <h2>Con menos de un año cotizado no hay prestación contributiva</h2>
          <p>
            Hacen falta al menos 360 días cotizados en los últimos seis años. Puede que tengas derecho a un subsidio: consúltalo en el SEPE o llámanos al{' '}
            {DESPACHO.telefono}.
          </p>
        </section>
      )}

      {r && r.dias > 0 && (
        <section className="resultado" aria-live="polite">
          <h2>
            Unos {euros(r.mensualPrimeros6)} al mes durante {Math.min(6, meses(r.dias))} meses
          </h2>
          <div className="resultado-cifras">
            <div className="cifra-principal">
              <span className="cifra-nombre">Duración</span>
              <span className="cifra-valor">{meses(r.dias)} meses</span>
              <span className="cifra-detalle">{r.dias} días de prestación</span>
            </div>
            <div>
              <span className="cifra-nombre">{r.dias > 180 ? 'Primeros 6 meses (70 %)' : `Los ${meses(r.dias)} meses (70 %)`}</span>
              <span className="cifra-valor">{eurosConCentimos(r.mensualPrimeros6)}</span>
              <span className="cifra-detalle">brutos al mes</span>
            </div>
            {r.dias > 180 && (
              <div>
                <span className="cifra-nombre">Desde el séptimo mes (60 %)</span>
                <span className="cifra-valor">{eurosConCentimos(r.mensualDespues)}</span>
                <span className="cifra-detalle">brutos al mes</span>
              </div>
            )}
          </div>
          <p>
            En total, unos <strong>{euros(r.totalBruto)}</strong> brutos.
            {r.topeAplicado === 'maximo' && ' Tu cálculo está limitado por la cuantía máxima que fija la ley.'}
            {r.topeAplicado === 'minimo' && ' Tu cálculo sube hasta la cuantía mínima que fija la ley.'}
          </p>
          <p className="recuadro">
            Pide el paro en los <strong>15 días hábiles</strong> siguientes al despido para no perder días. Y si el despido es injusto, no lo dejes: reclamar
            no te impide cobrar el paro. <Link href="/despido/plazo-para-reclamar-despido">Plazo para reclamar el despido</Link>.
          </p>
          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp('Hola, me han despedido y he calculado mi paro en la web. Quiero saber si puedo reclamar el despido.')}>
              Consultar mi despido
            </a>
            <BotonImprimir />
          </div>
          <p className="letra-pequena">
            Estimación orientativa con las cifras de 2026 (IPREM de {IPREM_2026} €; topes calculados sobre el IPREM con la sexta parte). El SEPE usa tus bases
            de cotización reales de los últimos 180 días. Del importe se descuenta tu cotización a la Seguridad Social y, en su caso, la retención de IRPF.
          </p>
        </section>
      )}
    </form>
  );
}
