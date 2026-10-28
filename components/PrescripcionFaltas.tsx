'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sumarDias, sumarMeses } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp, fechaLarga } from '@/lib/despacho';
import { BotonImprimir, useIrAlResultado } from './Utiles';

type Gravedad = 'leve' | 'grave' | 'muy-grave';
const DIAS: Record<Gravedad, number> = { leve: 10, grave: 20, 'muy-grave': 60 };
const NOMBRE: Record<Gravedad, string> = { leve: 'leve', grave: 'grave', 'muy-grave': 'muy grave' };

// Art. 60.2 del Estatuto de los Trabajadores: las faltas leves prescriben a los 10 días, las graves a los 20 y las muy graves
// a los 60, contados desde que la empresa las conoce, y en todo caso a los 6 meses de haberse cometido. Se cuentan días naturales.
export function prescripcion(hechos: string, conoce: string, sancion: string, g: Gravedad) {
  const limiteConocer = sumarDias(conoce, DIAS[g]);
  const limiteSeisMeses = sumarMeses(hechos, 6);
  const limite = limiteConocer < limiteSeisMeses ? limiteConocer : limiteSeisMeses;
  return { limiteConocer, limiteSeisMeses, limite, prescrita: sancion > limite, porSeisMeses: limiteSeisMeses <= limiteConocer };
}

export default function PrescripcionFaltas() {
  const [hechos, setHechos] = useState('');
  const [conoce, setConoce] = useState('');
  const [sancion, setSancion] = useState('');
  const [g, setG] = useState<Gravedad>('grave');
  const [enviado, setEnviado] = useState(false);
  const hoy = hoyMadrid();
  const conoceReal = conoce || hechos;
  const error = !enviado
    ? ''
    : !hechos
      ? 'Pon la fecha en que ocurrieron los hechos.'
      : !sancion
        ? 'Pon la fecha en que te comunicaron la sanción.'
        : hechos > hoy || sancion > hoy || conoceReal > hoy
          ? 'Las fechas no pueden ser posteriores a hoy.'
          : conoceReal < hechos
            ? 'La empresa no puede conocer los hechos antes de que ocurran.'
            : sancion < hechos
              ? 'La sanción no puede ser anterior a los hechos.'
              : '';
  const r = enviado && !error ? prescripcion(hechos, conoceReal, sancion, g) : null;
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
      <fieldset>
        <legend className="campo">
          <strong>¿Cómo califica la empresa la falta?</strong>
        </legend>
        <div className="opciones">
          {(['leve', 'grave', 'muy-grave'] as Gravedad[]).map((x) => (
            <label key={x} className="opcion">
              <input type="radio" name="gravedad" checked={g === x} onChange={() => setG(x)} />
              <span>
                <strong>Falta {NOMBRE[x]}</strong>
                <br />
                Prescribe a los {DIAS[x]} días de que la empresa la conoce
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="campos-fila">
        <div className="campo">
          <label htmlFor="pf-hechos">¿Cuándo ocurrieron los hechos?</label>
          <input id="pf-hechos" type="date" max={hoy} value={hechos} onChange={(e) => setHechos(e.target.value)} />
          <span className="campo-ayuda">Si fueron varios días, el último.</span>
        </div>
        <div className="campo">
          <label htmlFor="pf-conoce">¿Cuándo se enteró la empresa?</label>
          <input id="pf-conoce" type="date" max={hoy} value={conoce} onChange={(e) => setConoce(e.target.value)} />
          <span className="campo-ayuda">Si fue el mismo día o no lo sabes, déjalo en blanco.</span>
        </div>
        <div className="campo">
          <label htmlFor="pf-sancion">¿Cuándo te comunicaron la sanción?</label>
          <input id="pf-sancion" type="date" max={hoy} value={sancion} onChange={(e) => setSancion(e.target.value)} />
          <span className="campo-ayuda">La fecha en que recibiste la carta.</span>
        </div>
      </div>
      <button type="submit" className="boton boton-marcador">
        Comprobar si ha prescrito
      </button>
      {error && (
        <p className="error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      {r && (
        <section className="resultado" aria-live="polite">
          <div className={`veredicto cq-veredicto ${r.prescrita ? 'cq-alto veredicto-alto' : 'cq-bajo'}`}>
            <span className="cq-ola">Esto es lo que dicen las fechas.</span>
            <h3>{r.prescrita ? 'La falta podría haber prescrito: la sanción llega tarde' : 'Por fechas, la sanción llega a tiempo'}</h3>
            <p style={{ margin: 0 }}>
              {r.prescrita
                ? `La empresa tenía hasta el ${fechaLarga(r.limite)} para sancionarte y lo hizo el ${fechaLarga(sancion)}. Si es así, la sanción no es válida.`
                : `La empresa tenía hasta el ${fechaLarga(r.limite)} y te sancionó el ${fechaLarga(sancion)}. Eso no significa que la sanción sea justa: puede fallar en los hechos, en la forma o en la gravedad.`}
            </p>
          </div>
          <table className="tabla tabla-fichas">
            <thead>
              <tr>
                <th>Límite</th>
                <th>Cómo se cuenta</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Desde que la empresa lo supo</td>
                <td data-label="Cómo se cuenta">
                  {DIAS[g]} días naturales por ser falta {NOMBRE[g]}
                </td>
                <td data-label="Fecha">{fechaLarga(r.limiteConocer)}</td>
              </tr>
              <tr>
                <td>Desde los hechos</td>
                <td data-label="Cómo se cuenta">6 meses, en cualquier caso</td>
                <td data-label="Fecha">{fechaLarga(r.limiteSeisMeses)}</td>
              </tr>
            </tbody>
          </table>
          <p className="recuadro">
            Cuenta el límite que llegue antes. Para impugnar la sanción tienes 20 días hábiles desde que te la comunican:{' '}
            <Link href="/herramientas/plazos">calcula tu último día</Link>. Y responde por escrito con{' '}
            <Link href="/herramientas/genera-tu-carta?carta=sancion">la carta para responder a una sanción</Link>.
          </p>
          <p className="recuadro">
            Ojo con dos matices: si los hechos se repitieron en el tiempo, se cuenta desde el último; y si la empresa abrió un expediente contradictorio
            (obligatorio, por ejemplo, con los representantes de los trabajadores), el plazo puede quedar en pausa mientras dura.
          </p>
          <div className="acciones">
            <a
              className="boton"
              href={enlaceWhatsapp(
                `Hola, me han sancionado por una falta ${NOMBRE[g]}. Hechos: ${hechos.split('-').reverse().join('/')}; sanción: ${sancion.split('-').reverse().join('/')}. La web dice que ${r.prescrita ? 'podría haber prescrito' : 'llega a tiempo'}. Quiero consultarlo.`,
              )}
            >
              Consultar mi sanción
            </a>
            <BotonImprimir />
          </div>
          <p className="letra-pequena">
            Orientativo, según el artículo 60.2 del Estatuto de los Trabajadores. Tu convenio puede concretar cómo se califican las faltas. Lo explicamos en{' '}
            <Link href="/blog/faltas-leves-graves-muy-graves">faltas leves, graves y muy graves</Link>. Dudas: {DESPACHO.telefono}.
          </p>
        </section>
      )}
    </form>
  );
}
