'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calcularImpagados, leerImporte } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp, euros, eurosConCentimos, fechaLarga } from '@/lib/despacho';
import { BotonImprimir, useIrAlResultado } from './Utiles';

const nombreMes = (m: string) =>
  new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${m}-01T00:00:00Z`));

/** Mes anterior al actual, en formato AAAA-MM. */
function mesAnterior(hoy: string, atras = 1) {
  const [a, m] = hoy.split('-').map(Number);
  const f = new Date(Date.UTC(a, m - 1 - atras, 1));
  return f.toISOString().slice(0, 7);
}

type Fila = { mes: string; importe: string };

export default function CalculadoraImpagados() {
  const hoy = hoyMadrid();
  const [filas, setFilas] = useState<Fila[]>([{ mes: mesAnterior(hoy), importe: '' }]);
  const [enviado, setEnviado] = useState(false);

  const cambiar = (i: number, campo: keyof Fila, valor: string) => setFilas((f) => f.map((x, j) => (j === i ? { ...x, [campo]: valor } : x)));
  const datos = filas.map((f) => ({ mes: f.mes, importe: f.importe.trim() ? leerImporte(f.importe) : 0 }));
  const validas = datos.filter((d) => d.mes && d.importe > 0);
  const error = !enviado
    ? ''
    : datos.some((d) => !(d.importe >= 0))
      ? 'En los importes escribe solo números, por ejemplo 1650.'
      : !validas.length
        ? 'Pon al menos un mes y lo que te deben de él.'
        : validas.some((d) => d.mes >= hoy.slice(0, 7))
          ? 'El mes en curso todavía no ha vencido: pon solo meses ya terminados.'
          : '';
  const r = enviado && !error ? calcularImpagados(validas, hoy) : null;
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
      <p className="campo">
        <strong>¿Qué meses te deben y cuánto de cada uno?</strong>
        <br />
        <span className="campo-ayuda">Lo bruto de la nómina. Si te deben una paga extra, añádela como otra línea en el mes en que debías cobrarla.</span>
      </p>
      {filas.map((f, i) => (
        <div className="campos-fila" key={i}>
          <div className="campo">
            <label htmlFor={`mes-${i}`}>Mes</label>
            <input id={`mes-${i}`} type="month" max={mesAnterior(hoy)} value={f.mes} onChange={(e) => cambiar(i, 'mes', e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor={`imp-${i}`}>Lo que te deben (€ brutos)</label>
            <input id={`imp-${i}`} type="text" inputMode="decimal" placeholder="1650" value={f.importe} onChange={(e) => cambiar(i, 'importe', e.target.value)} />
          </div>
          {filas.length > 1 && (
            <div className="campo" style={{ alignSelf: 'end' }}>
              <button type="button" className="boton-enlace" onClick={() => setFilas((x) => x.filter((_, j) => j !== i))} aria-label={`Quitar el mes ${i + 1}`}>
                Quitar
              </button>
            </div>
          )}
        </div>
      ))}
      <p>
        <button
          type="button"
          className="boton boton-claro"
          onClick={() =>
            setFilas((x) => {
              const primero = x.map((f) => f.mes).filter(Boolean).sort()[0];
              return [...x, { mes: primero ? mesAnterior(`${primero}-01`) : mesAnterior(hoy), importe: x[x.length - 1]?.importe ?? '' }];
            })
          }
        >
          Añadir otro mes
        </button>
      </p>

      <button type="submit" className="boton boton-marcador">
        Calcular lo que me deben
      </button>
      {error && (
        <p className="error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      {r && (
        <section className="resultado con-euro" aria-live="polite">
          <h2>Te deben unos {euros(r.total)}, con los intereses</h2>
          <div className="resultado-cifras">
            <div className="cifra-principal">
              <span className="cifra-nombre">Total a reclamar</span>
              <span className="cifra-valor">{eurosConCentimos(r.total)}</span>
              <span className="cifra-detalle">brutos, a día de hoy</span>
            </div>
            <div>
              <span className="cifra-nombre">Salarios</span>
              <span className="cifra-valor">{eurosConCentimos(r.principal)}</span>
              <span className="cifra-detalle">lo que no te han pagado</span>
            </div>
            <div>
              <span className="cifra-nombre">Intereses (10 % al año)</span>
              <span className="cifra-valor">{eurosConCentimos(r.intereses)}</span>
              <span className="cifra-detalle">por el retraso, y siguen subiendo</span>
            </div>
          </div>

          <table className="tabla tabla-fichas">
            <thead>
              <tr>
                <th>Mes</th>
                <th>Te deben</th>
                <th>Último día para reclamarlo</th>
              </tr>
            </thead>
            <tbody>
              {r.lineas.map((l, i) => (
                <tr key={`${l.mes}-${i}`}>
                  <td>{nombreMes(l.mes)}</td>
                  <td data-label="Te deben">
                    {eurosConCentimos(l.importe)}
                    {!l.caducado && (
                      <>
                        <br />+ {eurosConCentimos(l.interes)} de intereses
                      </>
                    )}
                  </td>
                  <td data-label="Último día para reclamarlo">{l.caducado ? <strong>Pasó el {fechaLarga(l.limite)}</strong> : fechaLarga(l.limite)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {r.proximoLimite && (
            <p className="recuadro">
              <strong>Cada mes tiene su plazo: un año desde que debiste cobrarlo.</strong> El más urgente vence el{' '}
              <strong>{fechaLarga(r.proximoLimite)}</strong>. Una papeleta de conciliación lo detiene. Si además quieres irte con indemnización porque no
              pagan, el plazo y la forma cambian: <Link href="/herramientas/test-extincion">¿Puedo irme con indemnización?</Link>
            </p>
          )}
          {r.caducadoImporte > 0 && (
            <p className="recuadro">
              Hay {euros(r.caducadoImporte)} de meses con más de un año: no los sumamos, porque podrían haber prescrito. Si reclamaste antes por escrito,
              el plazo pudo cortarse: cuéntanoslo y lo revisamos.
            </p>
          )}
          <p className="recuadro">
            Para empezar, puedes reclamarlo por escrito: <Link href="/herramientas/genera-tu-carta">genera tu carta para reclamar salarios</Link>. Y si la
            empresa cierra o no tiene con qué pagar, el FOGASA cubre una parte: <Link href="/herramientas/calculadora-fogasa">calcula cuánto</Link>.
          </p>

          <div className="acciones">
            <a
              className="boton"
              href={enlaceWhatsapp(
                `Hola, mi empresa me debe ${r.lineas.filter((l) => !l.caducado).length} ${r.lineas.filter((l) => !l.caducado).length === 1 ? 'mes' : 'meses'} de sueldo (unos ${euros(r.principal)}). Quiero reclamarlo.`,
              )}
            >
              Reclamar lo que me deben
            </a>
            <BotonImprimir />
          </div>
          <p className="letra-pequena">
            Cálculo bruto y orientativo a {fechaLarga(hoy)}. El interés del 10 % al año por pagar tarde lo fija el artículo 29.3 del Estatuto de los
            Trabajadores para el salario; aquí se cuenta desde el último día de cada mes. Lo decide el juez en cada caso. Dudas: {DESPACHO.telefono}.
          </p>
        </section>
      )}
    </form>
  );
}
