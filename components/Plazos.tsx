'use client';

import { BotonImprimir, useIrAlResultado } from './Utiles';

import { useState } from 'react';
import { CLAVE_PLAZO } from './MiPlazo';
import AvisoCorreo from './AvisoCorreo';
import Link from 'next/link';
import { sumarHabiles, sumarAnios, sumarDias, diasHabilesRestantes } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, fechaLarga } from '@/lib/despacho';

type Situacion = {
  id: string;
  nombre: string;
  fechaDe: string;
  tipo: 'habiles' | 'anio' | 'naturales';
  n: number;
  explicacion: string;
  enlace?: { href: string; texto: string };
};

const SITUACIONES: Situacion[] = [
  {
    id: 'despido',
    nombre: 'Me han despedido',
    fechaDe: 'Fecha del despido',
    tipo: 'habiles',
    n: 20,
    explicacion:
      '20 días hábiles para presentar la papeleta de conciliación, que detiene el plazo. Es un plazo de caducidad: si pasa, el despido ya no se puede impugnar.',
    enlace: { href: '/calculadora-indemnizacion', texto: 'Calcula tu indemnización' },
  },
  {
    id: 'sancion',
    nombre: 'Me han sancionado',
    fechaDe: 'Fecha en que te comunicaron la sanción',
    tipo: 'habiles',
    n: 20,
    explicacion: '20 días hábiles para impugnar la sanción ante el juzgado, empezando por la papeleta de conciliación.',
  },
  {
    id: 'modificacion',
    nombre: 'Me han cambiado el horario, el sueldo o las funciones',
    fechaDe: 'Fecha en que te lo notificaron',
    tipo: 'habiles',
    n: 20,
    explicacion:
      'Una modificación sustancial de condiciones se impugna en 20 días hábiles desde la notificación. Si es grave, también puedes pedir la extinción del contrato con indemnización.',
  },
  {
    id: 'incapacidad',
    nombre: 'El INSS me ha denegado la incapacidad',
    fechaDe: 'Fecha en que recibiste la resolución',
    tipo: 'habiles',
    n: 30,
    explicacion: '30 días hábiles para presentar la reclamación previa ante el INSS, paso obligatorio antes de la demanda.',
    enlace: { href: '/herramientas/comprobador-incapacidad', texto: 'Comprobador de incapacidad' },
  },
  {
    id: 'alta',
    nombre: 'Me han dado el alta médica y no estoy bien',
    fechaDe: 'Fecha en que te notificaron el alta',
    tipo: 'naturales',
    n: 4,
    explicacion:
      'Si el alta te la da el INSS tras 365 días de baja, tienes 4 días naturales (cuentan sábados, domingos y festivos) para mostrar tu disconformidad ante la inspección médica. Si te la da tu médico o el INSS antes del año, el plazo para la reclamación previa es de 11 días.',
    enlace: { href: '/incapacidad-permanente/recurrir-alta-medica', texto: 'Cómo recurrir el alta' },
  },
  {
    id: 'cantidad',
    nombre: 'Me deben dinero: nóminas, horas extra, vacaciones',
    fechaDe: 'Fecha en que debieron pagártelo',
    tipo: 'anio',
    n: 1,
    explicacion: 'Un año para reclamar cantidades, contado desde que se debieron pagar. Cada mes impagado tiene su propio plazo.',
  },
  {
    id: 'acoso',
    nombre: 'Sufro acoso y quiero reclamar daños',
    fechaDe: 'Fecha del último episodio de acoso',
    tipo: 'anio',
    n: 1,
    explicacion:
      'En general, un año para reclamar los daños desde el último acto de acoso o desde que dejaste la empresa. En la Administración, un año para la reclamación de responsabilidad patrimonial. Es orientativo: el cómputo depende de la vía.',
    enlace: { href: '/acoso-laboral/que-puedo-reclamar', texto: 'Qué puedes reclamar por acoso' },
  },
];

export default function Plazos() {
  const [id, setId] = useState('despido');
  const [fecha, setFecha] = useState('');
  const [madrid, setMadrid] = useState(true);
  const s = SITUACIONES.find((x) => x.id === id)!;
  const hoy = hoyMadrid();

  let ultimo = '';
  let quedan: number | null = null;
  if (fecha && fecha <= hoy) {
    // Agosto es hábil para despidos y modificaciones (art. 43.4 LRJS) y en la vía administrativa del INSS; no para las sanciones.
    const agostoHabil = s.id !== 'sancion';
    ultimo = s.tipo === 'habiles' ? sumarHabiles(fecha, s.n, agostoHabil, madrid) : s.tipo === 'naturales' ? sumarDias(fecha, s.n) : sumarAnios(fecha, s.n);
    if (s.tipo === 'naturales') {
      const desde = hoy > fecha ? hoy : sumarDias(fecha, 1);
      quedan = Math.max(0, Math.round((Date.parse(ultimo) - Date.parse(desde)) / 86400000) + 1);
    }
    if (s.tipo === 'habiles') quedan = diasHabilesRestantes(hoy > fecha ? hoy : sumarHabiles(fecha, 1, agostoHabil, madrid), ultimo, agostoHabil, madrid);
  }
  const vencido = ultimo !== '' && ultimo < hoy;
  const [recordado, setRecordado] = useState(false);
  function recordar() {
    try {
      localStorage.setItem(CLAVE_PLAZO, JSON.stringify({ nombre: s.nombre, ultimo, agostoHabil: s.id !== 'sancion', madrid }));
      window.dispatchEvent(new Event('tc-plazo'));
      setRecordado(true);
    } catch {}
  }
  useIrAlResultado(ultimo ? `${id}|${fecha}` : '');

  return (
    <div className="herramienta">
      <fieldset className="pregunta-test">
        <legend>¿Qué te ha pasado?</legend>
        <div className="opciones">
          {SITUACIONES.map((x) => (
            <label key={x.id} className="opcion">
              <input type="radio" name="situacion" checked={id === x.id} onChange={() => setId(x.id)} />
              <span>{x.nombre}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="campo">
        <label htmlFor="fecha-plazo">{s.fechaDe}</label>
        <input id="fecha-plazo" type="date" value={fecha} max={hoy} onChange={(e) => setFecha(e.target.value)} />
      </div>
      {s.tipo === 'habiles' && (
        <label className="opcion" style={{ margin: '4px 0 10px' }}>
          <input type="checkbox" checked={madrid} onChange={(e) => setMadrid(e.target.checked)} />
          <span>Descontar también los festivos de Madrid (Comunidad y capital)</span>
        </label>
      )}
      <p>{s.explicacion}</p>
      {fecha > hoy && <p className="error">La fecha no puede ser posterior a hoy.</p>}
      {ultimo && (
        <div className={`resultado-plazo ${vencido ? 'cuenta-vencida' : 'veredicto'}`} aria-live="polite">
          {vencido ? (
            <p style={{ margin: 0 }}>
              El plazo general terminó el {fechaLarga(ultimo)}. Llámanos de todos modos: a veces el plazo se interrumpió o no empezó a contar
              cuando parece.
            </p>
          ) : (
            <>
              <h3>Último día aproximado: {fechaLarga(ultimo)}</h3>
              {quedan !== null && (
                <p style={{ margin: 0 }}>
                  {s.tipo === 'naturales' ? `Te ${quedan === 1 ? 'queda 1 día natural' : `quedan ${quedan} días naturales`}, el último incluido.` : `Te ${quedan === 1 ? 'queda 1 día hábil' : `quedan ${quedan} días hábiles`}, contando hoy si es hábil.`}
                </p>
              )}
              {s.tipo === 'habiles' && (
                <button type="button" className="boton boton-claro" style={{ marginTop: 12 }} onClick={recordar} disabled={recordado}>
                  {recordado ? 'Hecho: te lo recordaremos en esta web' : 'Recordármelo en esta web'}
                </button>
              )}
              {s.tipo === 'habiles' && <AvisoCorreo nombre={s.nombre} ultimo={ultimo} agostoHabil={s.id !== 'sancion'} madrid={madrid} />}
            </>
          )}
        </div>
      )}
      <div className="acciones">
        <a className="boton" href={DESPACHO.telefonoHref}>
          Llamar al {DESPACHO.telefono}
        </a>
        {s.enlace && (
          <Link className="boton boton-claro" href={s.enlace.href}>
            {s.enlace.texto}
          </Link>
        )}
        {ultimo && <BotonImprimir />}
      </div>
      <p className="letra-pequena">
        Cálculo orientativo: descuenta fines de semana y festivos nacionales (también el Viernes Santo) y, si lo dejas marcado, los de Madrid: Jueves Santo, 2 y 15 de mayo, 9 de noviembre y los traslados de 2026 (comprobado con el calendario de 2026; en otros años es aproximado). Si tu juzgado está en otra localidad, los festivos locales serán otros. Para un
        despido o una modificación de condiciones, agosto cuenta como hábil; para una sanción, no. Confirma tu plazo con un abogado antes de que se agote.
      </p>
    </div>
  );
}
