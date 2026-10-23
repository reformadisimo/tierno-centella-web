'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calcularReduccion, leerImporte } from '@/lib/calculos';
import { DESPACHO, enlaceWhatsapp, euros, eurosConCentimos } from '@/lib/despacho';
import { BotonImprimir, useIrAlResultado } from './Utiles';

const numero = leerImporte;

export default function CalculadoraReduccion() {
  const [salario, setSalario] = useState('');
  const [actuales, setActuales] = useState('40');
  const [nuevas, setNuevas] = useState('');
  const [edad, setEdad] = useState('');
  const [enviado, setEnviado] = useState(false);

  const s = numero(salario);
  const a = numero(actuales);
  const n = numero(nuevas);
  const e = edad === '' ? NaN : numero(edad);
  const error = !enviado
    ? ''
    : !(s > 0)
      ? 'Escribe tu salario bruto anual, por ejemplo 26000.'
      : !(a > 0)
        ? 'Indica tus horas semanales actuales.'
        : !(n > 0)
          ? 'Escribe las horas semanales que quieres hacer.'
          : !(n < a)
          ? 'Las horas nuevas tienen que ser menos que las actuales.'
          : '';
  const r = enviado && !error ? calcularReduccion(s, a, n) : null;
  useIrAlResultado(r ? JSON.stringify(r) : '');
  const minimo = a > 0 ? Math.round(a * 0.5 * 100) / 100 : 0;
  const maximo = a > 0 ? Math.round(a * 0.875 * 100) / 100 : 0;

  return (
    <form
      className="calculadora"
      noValidate
      onSubmit={(ev) => {
        ev.preventDefault();
        setEnviado(true);
      }}
    >
      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="salario">Salario bruto anual a jornada completa (€)</label>
          <input id="salario" type="text" inputMode="decimal" placeholder="26000" value={salario} onChange={(ev) => setSalario(ev.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="edad">Edad de tu hijo o hija (años)</label>
          <input id="edad" type="text" inputMode="numeric" placeholder="4" value={edad} onChange={(ev) => setEdad(ev.target.value)} />
          <span className="campo-ayuda">Déjalo vacío si cuidas de un familiar.</span>
        </div>
      </div>
      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="actuales">Horas semanales que haces ahora</label>
          <input id="actuales" type="text" inputMode="decimal" value={actuales} onChange={(ev) => setActuales(ev.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="nuevas">Horas semanales que quieres hacer</label>
          <input id="nuevas" type="text" inputMode="decimal" placeholder="30" value={nuevas} onChange={(ev) => setNuevas(ev.target.value)} />
          {a > 0 && (
            <span className="campo-ayuda">
              La ley permite entre {minimo.toLocaleString('es-ES')} y {maximo.toLocaleString('es-ES')} horas.
            </span>
          )}
        </div>
      </div>

      <button type="submit" className="boton boton-marcador">
        Calcular
      </button>
      {error && (
        <p className="error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      {r && (
        <section className="resultado" aria-live="polite">
          <h2>
            Reduces tu jornada un {r.porcentaje.toLocaleString('es-ES')} %: cobrarías unos {euros(r.salarioAnual)} brutos al año
          </h2>
          {!r.valida && (
            <p className="recuadro">
              Ojo: la reducción por cuidado tiene que estar entre un octavo (12,5 %) y la mitad (50 %) de tu jornada. Con estas horas no entra en el
              derecho legal, aunque puedes pedirla como adaptación de jornada o pactarla con la empresa.
            </p>
          )}
          {!Number.isNaN(e) && e >= 12 && (
            <p className="recuadro">
              Con un hijo de 12 años o más, la reducción por guarda legal ya no se aplica, salvo que tenga una discapacidad o una enfermedad grave. Sí puedes
              pedir una adaptación de jornada.
            </p>
          )}
          <table className="tabla">
            <tbody>
              <tr>
                <td>Salario bruto al año</td>
                <td style={{ textAlign: 'right' }}>{eurosConCentimos(r.salarioAnual)}</td>
              </tr>
              <tr>
                <td>En 12 pagas, al mes</td>
                <td style={{ textAlign: 'right' }}>{eurosConCentimos(r.salarioMensual12)}</td>
              </tr>
              <tr>
                <td>Horas al día (5 días)</td>
                <td style={{ textAlign: 'right' }}>{r.horasDiarias.toLocaleString('es-ES')}</td>
              </tr>
            </tbody>
          </table>
          <h3 style={{ fontSize: '1.1rem', margin: '20px 0 8px' }}>Lo que no pierdes</h3>
          <ul className="prosa">
            <li>Si te despiden, la indemnización se calcula con tu salario a jornada completa.</li>
            <li>Para el paro, lo cotizado durante la reducción por cuidado de hijos cuenta como si trabajaras a jornada completa.</li>
            <li>Para la jubilación, los tres primeros años de reducción por cuidado de un menor de 12 años se cotizan como jornada completa.</li>
            <li>Mientras la disfrutas, tu despido es nulo salvo causa real y ajena.</li>
          </ul>
          <div className="acciones">
            <Link className="boton" href="/mujer-y-trabajo/reduccion-y-adaptacion-de-jornada">
              Cómo pedirla
            </Link>
            <a className="boton boton-claro" href={enlaceWhatsapp('Hola, quiero pedir una reducción de jornada y tengo dudas.')}>
              Consultar por WhatsApp
            </a>
            <BotonImprimir />
          </div>
          <p className="letra-pequena">
            Cálculo orientativo: tu convenio puede tratar de forma distinta algunos complementos. Dudas: {DESPACHO.telefono}.
          </p>
        </section>
      )}
    </form>
  );
}
