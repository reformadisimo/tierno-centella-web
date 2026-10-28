'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calcularBaja, leerImporte, BASE_MAXIMA_2026, type TipoBaja } from '@/lib/calculos';
import { DESPACHO, enlaceWhatsapp, euros, eurosConCentimos } from '@/lib/despacho';
import { BotonImprimir, useIrAlResultado, avisoSalarioAnual } from './Utiles';

const TIPOS: { id: TipoBaja; titulo: string; texto: string }[] = [
  { id: 'comun', titulo: 'Enfermedad común', texto: 'Una gripe, una lesión, ansiedad, una operación...' },
  { id: 'no-laboral', titulo: 'Accidente fuera del trabajo', texto: 'En casa, haciendo deporte, de vacaciones...' },
  { id: 'trabajo', titulo: 'Accidente de trabajo o enfermedad profesional', texto: 'Ocurrió trabajando, yendo o volviendo del trabajo, o lo causó el trabajo.' },
];

const rango = (d: number, h: number) => (d === h ? `Día ${d}` : `Días ${d} a ${h}`);

export default function CalculadoraBaja() {
  const [tipo, setTipo] = useState<TipoBaja>('comun');
  const [salario, setSalario] = useState('');
  const [dias, setDias] = useState('30');
  const [cotizado, setCotizado] = useState<'si' | 'no'>('si');
  const [convenio, setConvenio] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const s = leerImporte(salario);
  const d = Math.round(leerImporte(dias));
  const error = !enviado
    ? ''
    : !(s > 0)
      ? 'Escribe tu salario bruto anual, por ejemplo 24000.'
      : !(d >= 1 && d <= 545)
        ? 'Pon cuántos días calculas que durará la baja (entre 1 y 545).'
        : '';
  const sinDerecho = tipo === 'comun' && cotizado === 'no';
  const r = enviado && !error && !sinDerecho ? calcularBaja(tipo, s, d) : null;
  useIrAlResultado(enviado && !error ? `${JSON.stringify(r)}${sinDerecho}` : '');
  const aviso = r ? avisoSalarioAnual(s) : '';
  const completo = r ? Math.round((Math.min(s / 12, BASE_MAXIMA_2026) / 30) * d * 100) / 100 : 0;

  return (
    <form
      className="calculadora"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setEnviado(true);
      }}
    >
      <fieldset>
        <legend className="campo">
          <strong>¿Por qué estás de baja?</strong>
        </legend>
        <div className="opciones">
          {TIPOS.map((t) => (
            <label key={t.id} className="opcion">
              <input type="radio" name="tipo" checked={tipo === t.id} onChange={() => setTipo(t.id)} />
              <span>
                <strong>{t.titulo}</strong>
                <br />
                {t.texto}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="salario">Salario bruto anual (€)</label>
          <input id="salario" type="text" inputMode="decimal" placeholder="24000" value={salario} onChange={(e) => setSalario(e.target.value)} />
          <span className="campo-ayuda">Con las pagas extra incluidas.</span>
        </div>
        <div className="campo">
          <label htmlFor="dias">¿Cuántos días crees que durará la baja?</label>
          <input id="dias" type="text" inputMode="numeric" value={dias} onChange={(e) => setDias(e.target.value)} />
          <span className="campo-ayuda">Cuenta desde el día de la baja. Si no lo sabes, deja 30.</span>
        </div>
      </div>

      {tipo === 'comun' && (
        <fieldset>
          <legend className="campo">
            <strong>¿Has trabajado al menos 180 días en los últimos 5 años?</strong>
          </legend>
          <div className="opciones">
            <label className="opcion">
              <input type="radio" name="cotizado" checked={cotizado === 'si'} onChange={() => setCotizado('si')} />
              <span>
                <strong>Sí</strong>
              </span>
            </label>
            <label className="opcion">
              <input type="radio" name="cotizado" checked={cotizado === 'no'} onChange={() => setCotizado('no')} />
              <span>
                <strong>No</strong>
              </span>
            </label>
          </div>
        </fieldset>
      )}

      <label className="opcion" style={{ maxWidth: 560, marginBottom: 20 }}>
        <input type="checkbox" checked={convenio} onChange={(e) => setConvenio(e.target.checked)} />
        <span>Mi convenio dice que la empresa me completa el sueldo durante la baja</span>
      </label>

      <button type="submit" className="boton boton-marcador">
        Calcular lo que cobro de baja
      </button>
      {error && (
        <p className="error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      {enviado && !error && sinDerecho && (
        <section className="resultado con-euro" aria-live="polite">
          <h2>Por enfermedad común hacen falta 180 días trabajados en los últimos 5 años</h2>
          <p>
            Sin ese mínimo, la Seguridad Social no paga la baja por enfermedad común. Si tu baja viene de un accidente (en el trabajo o fuera), ese mínimo no
            se exige. Y si tu enfermedad la ha causado el trabajo, puede ser enfermedad profesional o accidente de trabajo:{' '}
            <Link href="/herramientas/test-baja-laboral">compruébalo aquí</Link>.
          </p>
          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp('Hola, estoy de baja y no llego a 180 días cotizados. Quiero saber si tengo alguna opción.')}>
              Consultar mi caso
            </a>
          </div>
        </section>
      )}

      {r && (
        <section className="resultado con-euro" aria-live="polite">
          {aviso && <p className="aviso-salario">{aviso}</p>}
          <h2>
            En {d} {d === 1 ? 'día' : 'días'} de baja cobrarías unos {euros(r.total)} brutos
          </h2>
          <div className="resultado-cifras">
            <div className="cifra-principal">
              <span className="cifra-nombre">Total de la baja</span>
              <span className="cifra-valor">{eurosConCentimos(r.total)}</span>
              <span className="cifra-detalle">brutos, en {d} días</span>
            </div>
            <div>
              <span className="cifra-nombre">Un mes entero al 75 %</span>
              <span className="cifra-valor">{eurosConCentimos(r.mesCompleto75)}</span>
              <span className="cifra-detalle">{tipo === 'trabajo' ? 'desde el segundo día' : 'a partir del día 21'}</span>
            </div>
            <div>
              <span className="cifra-nombre">Tu base diaria</span>
              <span className="cifra-valor">{eurosConCentimos(r.baseDiaria)}</span>
              <span className="cifra-detalle">{r.topeAplicado ? 'limitada por la base máxima de 2026' : 'tu sueldo mensual / 30'}</span>
            </div>
          </div>

          <table className="tabla tabla-fichas">
            <thead>
              <tr>
                <th>Días</th>
                <th>Cobras</th>
                <th>Quién paga</th>
              </tr>
            </thead>
            <tbody>
              {r.tramos.map((t) => (
                <tr key={t.desde}>
                  <td>{rango(t.desde, t.hasta)}</td>
                  <td data-label="Cobras">
                    {t.porcentaje === 0 ? (
                      'Nada'
                    ) : (
                      <>
                        {t.porcentaje} %: {eurosConCentimos(t.diario)} al día
                        <br />
                        <strong>{eurosConCentimos(t.importe)}</strong>
                      </>
                    )}
                  </td>
                  <td data-label="Quién paga">{t.paga}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {convenio && (
            <p className="recuadro">
              Si tu convenio te completa hasta el 100 %, cobrarías como si trabajaras: unos <strong>{euros(completo)}</strong> brutos en estos {d} días. La
              diferencia ({euros(Math.max(0, completo - r.total))}) la pone la empresa. Mira bien qué dice tu convenio: a veces solo completa desde cierto
              día o solo en accidentes.
            </p>
          )}

          {tipo !== 'trabajo' && r.totalSiTrabajo > r.total && (
            <p className="recuadro">
              <strong>Si tu baja viniera del trabajo, cobrarías unos {euros(r.totalSiTrabajo - r.total)} más</strong> en estos {d} días: el 75 % desde el
              segundo día, sin los tres primeros días en blanco. Pasa mucho con la ansiedad por acoso o con lesiones que se dan por "comunes".{' '}
              <Link href="/herramientas/test-baja-laboral">¿Tu baja es accidente de trabajo?</Link>
            </p>
          )}

          <p className="recuadro">
            Estar de baja no permite que te despidan por ello: un despido por enfermedad puede ser nulo.{' '}
            <Link href="/herramientas/test-nulidad">¿Tu despido puede ser nulo?</Link>
          </p>

          <div className="acciones">
            <a
              className="boton"
              href={enlaceWhatsapp(
                `Hola, estoy de baja (${TIPOS.find((t) => t.id === tipo)?.titulo.toLowerCase()}) y he calculado en la web que cobraría unos ${euros(r.total)} en ${d} días. Quiero consultar mi caso.`,
              )}
            >
              Consultar mi baja
            </a>
            <BotonImprimir />
          </div>
          <p className="letra-pequena">
            Cálculo bruto y orientativo con las cifras de 2026 (base máxima de cotización de {eurosConCentimos(BASE_MAXIMA_2026)} al mes). La Seguridad
            Social usa tu base de cotización del mes anterior a la baja, que puede no coincidir con tu salario; en accidente de trabajo se suman además las
            horas extra del último año. Del importe se descuentan tu cotización y el IRPF. La baja dura como mucho 365 días, prorrogables 180 más. Dudas:{' '}
            {DESPACHO.telefono}.
          </p>
        </section>
      )}
    </form>
  );
}
