'use client';

// Recorrido interactivo de un despido: cada paso se abre para ver qué pasa y qué conviene hacer.
import { useState } from 'react';

const PASOS = [
  { cuando: 'Día 0', titulo: 'Te dan la carta', texto: 'Firma como "recibido, no conforme" y guarda una copia. Firmar así no significa aceptar el despido. Desde este día corre tu plazo.' },
  { cuando: 'Primeros días', titulo: 'Reúne tus papeles', texto: 'Contrato, últimas nóminas, la carta y cualquier correo o mensaje relevante. No firmes el finiquito como conforme sin que lo revise un abogado.' },
  { cuando: 'Antes del día 20', titulo: 'Papeleta de conciliación', texto: 'Se presenta en el servicio de conciliación (en Madrid, el SMAC). Presentarla dentro del plazo detiene el reloj de la demanda mientras dura el intento de acuerdo.' },
  { cuando: 'Unos días después', titulo: 'Acto de conciliación', texto: 'Empresa y trabajador se sientan a ver si hay acuerdo. Si lo hay, se firma y termina. Si no, se sigue adelante. Conviene ir asesorada o asesorado: un acuerdo mal calculado no se puede deshacer.' },
  { cuando: 'Tras la conciliación', titulo: 'Demanda ante el juzgado', texto: 'Si no hay acuerdo, tu abogado presenta la demanda en el Juzgado de lo Social. Tiene que hacerse dentro de los 20 días hábiles, descontando el tiempo de conciliación.' },
  { cuando: 'Semanas o meses', titulo: 'Juicio', texto: 'El juez escucha a las dos partes y revisa las pruebas. Aquí pesa mucho todo lo que guardaste desde el primer día.' },
  { cuando: 'Después del juicio', titulo: 'Sentencia', texto: 'Puede declarar el despido procedente, improcedente o nulo. En el improcedente la empresa elige entre readmitirte o indemnizarte; en el nulo te readmiten y te pagan los salarios dejados de cobrar.' },
];

export default function LineaDespido() {
  const [abierto, setAbierto] = useState(0);
  const p = PASOS[abierto];
  return (
    <div className="linea-despido" aria-label="Recorrido de un despido">
      <h2 className="linea-titulo">Tu despido paso a paso</h2>
      <p className="linea-ayuda">Pulsa en cada paso para ver qué pasa y qué hacer.</p>
      <ol className="linea-pasos">
        {PASOS.map((x, i) => (
          <li key={x.titulo}>
            <button type="button" aria-current={i === abierto ? 'step' : undefined} className={i === abierto ? 'activo' : i < abierto ? 'hecho' : ''} onClick={() => setAbierto(i)}>
              <b>{i + 1}</b>
              <span>{x.titulo}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="linea-detalle" aria-live="polite" key={abierto}>
        <small>{p.cuando}</small>
        <h3>{p.titulo}</h3>
        <p>{p.texto}</p>
        <div className="acciones">
          {abierto > 0 && <button type="button" className="boton boton-claro" onClick={() => setAbierto(abierto - 1)}>Paso anterior</button>}
          {abierto < PASOS.length - 1 && <button type="button" className="boton" onClick={() => setAbierto(abierto + 1)}>Siguiente paso</button>}
          {abierto === 2 && <a className="boton boton-claro" href="/herramientas/plazos">Calcular mi plazo</a>}
        </div>
      </div>
    </div>
  );
}
