'use client';

// Cartas sencillas para empezar a defenderte. Se escriben en el navegador: no enviamos ni guardamos nada.
import { useMemo, useState } from 'react';
import { BotonImprimir } from './Utiles';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { hoyMadrid } from '@/lib/hoy';

type Campo = { id: string; etiqueta: string; area?: boolean; ayuda?: string };
type Modelo = {
  id: string;
  nombre: string;
  intro: string;
  campos: Campo[];
  aviso?: string;
  texto: (v: Record<string, string>, f: { yo: string; empresa: string; ciudad: string; fecha: string }) => string;
};

const v = (x: string | undefined, hueco: string) => (x && x.trim() ? x.trim() : `[${hueco}]`);

const MODELOS: Modelo[] = [
  {
    id: 'no-conforme',
    nombre: 'Al recibir la carta de despido: "recibí, no conforme"',
    intro: 'Cuando te den la carta, escribe esto a mano en tu copia, junto a tu firma y la fecha. Firmar así NO significa aceptar el despido.',
    campos: [],
    aviso: 'Pide siempre una copia de la carta y escribe la fecha en la que la recibes: de ella depende tu plazo.',
    texto: (_v, f) => `Recibí, no conforme.\n\nFdo.: ${f.yo}\nFecha: ${f.fecha}`,
  },
  {
    id: 'certificado',
    nombre: 'Pedir el certificado de empresa (para el paro)',
    intro: 'El SEPE lo necesita para tramitar tu prestación por desempleo. Si no te lo dan, esta carta deja constancia de que lo pediste.',
    campos: [
      { id: 'fecha-cese', etiqueta: 'Fecha en que terminó tu contrato' },
      { id: 'dni', etiqueta: 'Tu DNI (opcional)' },
    ],
    aviso: 'El plazo para pedir el paro es de 15 días hábiles desde el cese. No esperes a que te contesten para solicitarlo.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa}\n\nAsunto: Solicitud del certificado de empresa\n\nYo, ${f.yo}${x.dni ? `, con DNI ${x.dni}` : ''}, trabajé en su empresa hasta el ${v(x['fecha-cese'], 'fecha de cese')}.\n\nLes solicito que me entreguen, con la mayor brevedad posible, el certificado de empresa necesario para tramitar mi prestación por desempleo ante el SEPE, ya que el plazo para solicitarla corre desde la fecha de mi cese.\n\nQuedo a la espera de su respuesta.\n\nAtentamente,\n${f.yo}`,
  },
  {
    id: 'salarios',
    nombre: 'Reclamar salarios o cantidades que me deben',
    intro: 'Un requerimiento escrito, claro y fechado, que sirve de prueba de que lo pediste antes de ir al juzgado.',
    campos: [
      { id: 'conceptos', etiqueta: 'Qué te deben y de qué meses', area: true, ayuda: 'Por ejemplo: nómina de septiembre (1.450 €) y 6 días de vacaciones' },
      { id: 'importe', etiqueta: 'Importe total aproximado (€)' },
    ],
    aviso: 'El plazo para reclamar cantidades es de un año desde que debieron pagarse. Conviene enviarla por burofax para que quede constancia.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa}\n\nAsunto: Requerimiento de pago de cantidades adeudadas\n\nYo, ${f.yo}, trabajador/a de su empresa, les comunico que me adeudan las siguientes cantidades:\n\n${v(x.conceptos, 'conceptos y meses')}\n\nImporte total aproximado: ${v(x.importe, 'importe')} euros.\n\nLes requiero para que abonen dicha cantidad en un plazo de cinco días desde la recepción de esta carta. Les recuerdo que las cantidades adeudadas devengan el interés por mora del 10 % anual previsto en el artículo 29.3 del Estatuto de los Trabajadores.\n\nDe no recibir el pago, me veré obligado/a a reclamarlo por la vía judicial.\n\nAtentamente,\n${f.yo}`,
  },
  {
    id: 'documentos',
    nombre: 'Pedir copia de mi contrato y mis nóminas',
    intro: 'Para tener tus papeles en regla antes de reclamar o negociar.',
    campos: [{ id: 'cuales', etiqueta: 'Qué documentos necesitas', area: true, ayuda: 'Contrato, nóminas de los últimos 12 meses, vida laboral en la empresa...' }],
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa}\n\nAsunto: Solicitud de documentación laboral\n\nYo, ${f.yo}, les solicito copia de la siguiente documentación relativa a mi relación laboral:\n\n${v(x.cuales, 'documentos')}\n\nLes agradeceré que me la entreguen en un plazo razonable.\n\nAtentamente,\n${f.yo}`,
  },
  {
    id: 'acoso',
    nombre: 'Comunicar una situación de acoso a la empresa',
    intro: 'Una queja formal pide a la empresa que investigue y proteja. Es un paso importante: conviene que un abogado la lea antes de enviarla.',
    campos: [
      { id: 'hechos', etiqueta: 'Qué ha pasado, con fechas y personas', area: true, ayuda: 'Hechos concretos, no valoraciones: qué, cuándo, dónde y quién estaba' },
      { id: 'quien', etiqueta: 'Quién crees que lo origina (opcional)' },
    ],
    aviso: 'Antes de enviarla, consulta con un abogado y guarda tus pruebas. Si hay protocolo de acoso o canal de denuncias, envíala por ahí y conserva el justificante.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa} (departamento de recursos humanos / canal de denuncias)\n\nAsunto: Comunicación de una situación de acoso en el trabajo\n\nYo, ${f.yo}, les comunico que estoy sufriendo la siguiente situación en mi puesto de trabajo:\n\n${v(x.hechos, 'hechos con fechas y personas')}\n${x.quien ? `\nPersona/s implicada/s: ${x.quien}\n` : ''}\nLes solicito que, de acuerdo con su obligación de proteger mi salud y mi dignidad en el trabajo:\n1. Activen el protocolo de acoso o investiguen estos hechos de forma imparcial.\n2. Adopten medidas para evitar que la situación continúe mientras se investiga.\n3. Conserven las pruebas relacionadas con estos hechos.\n4. Me informen por escrito de las actuaciones que se lleven a cabo.\n\nEsta comunicación no me impide ejercer otras acciones.\n\nAtentamente,\n${f.yo}`,
  },
];

export default function GeneraCarta() {
  const [id, setId] = useState(MODELOS[0].id);
  const [yo, setYo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [ciudad, setCiudad] = useState('Madrid');
  const [vals, setVals] = useState<Record<string, string>>({});
  const [copiada, setCopiada] = useState(false);
  const m = MODELOS.find((x) => x.id === id)!;
  const fecha = useMemo(() => new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Madrid' }).format(new Date(`${hoyMadrid()}T12:00:00Z`)), []);
  const texto = m.texto(vals, { yo: v(yo, 'tu nombre completo'), empresa: v(empresa, 'nombre de la empresa'), ciudad: v(ciudad, 'ciudad'), fecha });
  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiada(true);
      setTimeout(() => setCopiada(false), 2500);
    } catch {}
  }
  return (
    <div className="herramienta carta">
      <fieldset className="pregunta-test">
        <legend>¿Qué carta necesitas?</legend>
        <div className="opciones">
          {MODELOS.map((x) => (
            <label key={x.id} className="opcion">
              <input type="radio" name="carta" checked={id === x.id} onChange={() => setId(x.id)} />
              <span>{x.nombre}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p>{m.intro}</p>
      <div className="campo">
        <label htmlFor="c-yo">Tu nombre completo</label>
        <input id="c-yo" value={yo} onChange={(e) => setYo(e.target.value)} autoComplete="name" />
      </div>
      {m.id !== 'no-conforme' && (
        <>
          <div className="campo">
            <label htmlFor="c-empresa">Nombre de la empresa</label>
            <input id="c-empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="c-ciudad">Ciudad</label>
            <input id="c-ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
          </div>
        </>
      )}
      {m.campos.map((c) => (
        <div className="campo" key={m.id + c.id}>
          <label htmlFor={`c-${c.id}`}>{c.etiqueta}</label>
          {c.area ? (
            <textarea id={`c-${c.id}`} rows={4} value={vals[c.id] ?? ''} onChange={(e) => setVals({ ...vals, [c.id]: e.target.value })} />
          ) : (
            <input id={`c-${c.id}`} value={vals[c.id] ?? ''} onChange={(e) => setVals({ ...vals, [c.id]: e.target.value })} />
          )}
          {c.ayuda && <p className="campo-ayuda">{c.ayuda}</p>}
        </div>
      ))}
      <h2 style={{ fontSize: '1.2rem', margin: '20px 0 8px' }}>Tu carta</h2>
      <pre className="carta-texto" aria-live="polite">{texto}</pre>
      {m.aviso && <p className="recuadro">{m.aviso}</p>}
      <div className="acciones">
        <button type="button" className="boton" onClick={copiar}>{copiada ? 'Copiada' : 'Copiar la carta'}</button>
        <BotonImprimir />
        <a className="boton boton-claro" href={enlaceWhatsapp(`Hola, he preparado una carta (${m.nombre}) y me gustaría que un abogado la revisara antes de enviarla.`)}>Que la revise un abogado</a>
        <a className="boton boton-claro" href={DESPACHO.telefonoHref}>Llamar al {DESPACHO.telefono}</a>
      </div>
      <p className="letra-pequena">
        Modelo general y orientativo. La carta se escribe en tu navegador: no enviamos ni guardamos lo que escribes. Cada caso es distinto y un abogado puede mejorarla.
      </p>
    </div>
  );
}
