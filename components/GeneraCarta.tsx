'use client';

// Cartas sencillas para empezar a defenderte. Se escriben en el navegador: no enviamos ni guardamos nada.
import { useEffect, useMemo, useState } from 'react';
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
    id: 'jornada',
    nombre: 'Pedir reducción o adaptación de mi jornada para cuidar',
    intro: 'Si cuidas de un hijo o de un familiar, la ley te permite pedir reducir o adaptar tu jornada. Una solicitud por escrito y fechada deja constancia y abre la negociación con la empresa.',
    campos: [
      { id: 'motivo', etiqueta: 'A quién cuidas y desde cuándo', area: true, ayuda: 'Por ejemplo: mi hija, de 6 años, con la que convivo' },
      { id: 'peticion', etiqueta: 'Qué pides exactamente', area: true, ayuda: 'Por ejemplo: reducir mi jornada en un tercio, con salida a las 15:00' },
      { id: 'desde', etiqueta: 'Desde qué fecha lo pides' },
    ],
    aviso: 'Pide que te sellen o firmen una copia, o envíala de forma que quede constancia. La empresa debe contestar y, si lo rechaza, argumentarlo. Antes de enviarla, conviene que un abogado la revise: los derechos y plazos dependen de tu situación y de tu convenio.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa}\n\nAsunto: Solicitud de reducción o adaptación de jornada por cuidado\n\nYo, ${f.yo}, trabajador/a de su empresa, les comunico que ${v(x.motivo, 'a quién cuidas y desde cuándo')}.\n\nPor este motivo, y al amparo de lo previsto en el Estatuto de los Trabajadores, les solicito: ${v(x.peticion, 'qué pides exactamente')}, a partir del ${v(x.desde, 'fecha')}.\n\nQuedo a su disposición para acordar los detalles y les ruego que me contesten por escrito.\n\nFdo.: ${f.yo}`,
  },
  {
    id: 'registro',
    nombre: 'Pedir copia de mi registro de jornada',
    intro: 'Las empresas deben registrar la jornada diaria de cada persona. Si crees que te deben horas extra, esa información es clave.',
    campos: [{ id: 'periodo', etiqueta: 'De qué periodo la necesitas', ayuda: 'Por ejemplo: de enero a septiembre de 2026' }],
    aviso: 'Guarda también tus propios apuntes de horas, aunque sean en el móvil. Si la empresa no te lo da, cuéntanoslo: eso también tiene importancia.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa}\n\nAsunto: Solicitud de copia del registro de jornada\n\nYo, ${f.yo}, trabajador/a de su empresa, les solicito copia de mi registro de jornada correspondiente a ${v(x.periodo, 'periodo')}.\n\nLes agradezco que me la entreguen por escrito en un plazo razonable.\n\nFdo.: ${f.yo}`,
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
  {
    id: 'baja-voluntaria',
    nombre: 'Comunicar que me voy de la empresa (baja voluntaria)',
    intro: 'Si decides irte, avisa por escrito con la antelación que marque tu convenio (suele ser de 15 días). Así no te pueden descontar días de preaviso del finiquito.',
    campos: [
      { id: 'ultimo', etiqueta: 'Tu último día de trabajo' },
      { id: 'preaviso', etiqueta: 'Días de preaviso de tu convenio', ayuda: 'Míralo en tu convenio o contrato. Si no lo sabes, suele ser 15' },
    ],
    aviso: 'Ojo: si te vas por tu cuenta, no tienes derecho a paro ni a indemnización. Si te vas porque la empresa no paga, te acosa o te cambia las condiciones, puede haber otra salida con indemnización: compruébalo antes de enviarla.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa}\n\nAsunto: Comunicación de baja voluntaria\n\nYo, ${f.yo}, les comunico mi decisión de causar baja voluntaria en la empresa, respetando el preaviso de ${v(x.preaviso, 'días')} días. Mi último día de trabajo será el ${v(x.ultimo, 'fecha')}.\n\nLes ruego que preparen para esa fecha la liquidación de las cantidades que me correspondan (salario de los días trabajados, vacaciones no disfrutadas y parte proporcional de las pagas extra) y que me entreguen el certificado de empresa.\n\nAtentamente,\n${f.yo}`,
  },
  {
    id: 'excedencia',
    nombre: 'Pedir una excedencia',
    intro: 'Voluntaria, o para cuidar de un hijo o de un familiar. Pedirla por escrito y con fecha es lo que te protege.',
    campos: [
      { id: 'tipo', etiqueta: 'Qué excedencia pides', ayuda: 'Por ejemplo: voluntaria, o por cuidado de mi hijo de 2 años' },
      { id: 'desde', etiqueta: 'Desde qué fecha' },
      { id: 'hasta', etiqueta: 'Hasta qué fecha (o cuánto tiempo)' },
    ],
    aviso: 'La voluntaria exige al menos un año en la empresa y solo te da preferencia para volver cuando haya una vacante; la de cuidado reserva tu puesto el primer año. Pide que te firmen una copia.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa}\n\nAsunto: Solicitud de excedencia\n\nYo, ${f.yo}, trabajador/a de su empresa, les solicito una excedencia ${v(x.tipo, 'tipo de excedencia')}, al amparo del artículo 46 del Estatuto de los Trabajadores, desde el ${v(x.desde, 'fecha de inicio')} hasta el ${v(x.hasta, 'fecha de fin')}.\n\nLes ruego que me confirmen por escrito su concesión y las condiciones de mi reincorporación.\n\nAtentamente,\n${f.yo}`,
  },
  {
    id: 'historial',
    nombre: 'Pedir mi historial médico (para la baja o la incapacidad)',
    intro: 'Tienes derecho a una copia de tu historia clínica. Es la base de cualquier reclamación por incapacidad. Escribe en "Empresa" el nombre de tu centro de salud u hospital.',
    campos: [
      { id: 'dni', etiqueta: 'Tu DNI' },
      { id: 'que', etiqueta: 'Qué informes necesitas', area: true, ayuda: 'Por ejemplo: informes de traumatología y rehabilitación de 2024 a 2026, y resultados de resonancias' },
    ],
    aviso: 'En muchas comunidades también puedes descargarla desde la web o la app de tu servicio de salud. Pide siempre los informes de los especialistas, no solo los del médico de cabecera.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención del servicio de atención al paciente de ${f.empresa}\n\nAsunto: Solicitud de copia de mi historia clínica\n\nYo, ${f.yo}, con DNI ${v(x.dni, 'DNI')}, al amparo del artículo 18 de la Ley 41/2002, de autonomía del paciente, solicito copia de la siguiente documentación de mi historia clínica:\n\n${v(x.que, 'informes que necesitas')}\n\nLes ruego que me la faciliten en el plazo legal.\n\nAtentamente,\n${f.yo}`,
  },
  {
    id: 'alta',
    nombre: 'No estoy de acuerdo con el alta médica',
    intro: 'Si el INSS te da el alta y no puedes trabajar, puedes mostrar tu disconformidad. El plazo es muy corto: 4 días naturales. Escribe en "Empresa" la inspección médica de tu servicio de salud (en Madrid, la Inspección Médica de la Comunidad de Madrid).',
    campos: [
      { id: 'dni', etiqueta: 'Tu DNI' },
      { id: 'fecha-alta', etiqueta: 'Fecha del alta' },
      { id: 'motivos', etiqueta: 'Por qué no estás de acuerdo', area: true, ayuda: 'Tus limitaciones de hoy y los informes que las prueban' },
    ],
    aviso: 'Mientras se resuelve, tienes que volver al trabajo al día siguiente del alta, o te arriesgas a un despido por faltas. Si el alta la da la mutua por un accidente de trabajo, el procedimiento es otro. Llámanos antes de enviarla.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa}\n\nAsunto: Disconformidad con el alta médica emitida por el INSS\n\nYo, ${f.yo}, con DNI ${v(x.dni, 'DNI')}, manifiesto mi disconformidad con el alta médica emitida el ${v(x['fecha-alta'], 'fecha del alta')}, por los siguientes motivos:\n\n${v(x.motivos, 'motivos e informes')}\n\nPor ello, solicito que se tramite el procedimiento de disconformidad previsto en el artículo 170.3 de la Ley General de la Seguridad Social y que se valore mi situación.\n\nAdjunto los informes médicos que acreditan mi estado.\n\nAtentamente,\n${f.yo}`,
  },
  {
    id: 'sancion',
    nombre: 'Responder a una amonestación o sanción',
    intro: 'Si no estás de acuerdo con lo que te imputan, contéstalo por escrito y con fecha. Deja constancia de tu versión por si más adelante la empresa la usa para despedirte.',
    campos: [
      { id: 'fecha-carta', etiqueta: 'Fecha de la carta de amonestación o sanción' },
      { id: 'version', etiqueta: 'Tu versión de los hechos', area: true, ayuda: 'Hechos concretos, con fechas, testigos o documentos que lo prueban' },
    ],
    aviso: 'Una sanción se puede impugnar en 20 días hábiles desde que te la comunican. Firma la carta como "recibí, no conforme" y llámanos antes de que pase el plazo.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa}\n\nAsunto: Respuesta a la comunicación de fecha ${v(x['fecha-carta'], 'fecha de la carta')}\n\nYo, ${f.yo}, en relación con la carta de esa fecha, manifiesto mi total desacuerdo con los hechos que se me atribuyen, por los siguientes motivos:\n\n${v(x.version, 'tu versión de los hechos')}\n\nPor ello, solicito que se deje sin efecto la medida y que esta respuesta se incorpore a mi expediente. Me reservo el ejercicio de las acciones que me correspondan.\n\nAtentamente,\n${f.yo}`,
  },
  {
    id: 'vacaciones',
    nombre: 'Pedir mis vacaciones por escrito',
    intro: 'Las fechas se acuerdan con la empresa, y tienes derecho a conocerlas al menos dos meses antes. Pedirlas por escrito evita malentendidos.',
    campos: [
      { id: 'fechas', etiqueta: 'Qué días pides', ayuda: 'Por ejemplo: del 3 al 21 de agosto de 2026' },
      { id: 'pendientes', etiqueta: 'Días que te quedan este año (opcional)' },
    ],
    aviso: 'Si la empresa no contesta o te las niega sin motivo, hay un procedimiento rápido en el juzgado con un plazo de 20 días hábiles. Guarda la copia sellada.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa}\n\nAsunto: Solicitud de vacaciones\n\nYo, ${f.yo}, solicito disfrutar mis vacaciones anuales ${v(x.fechas, 'fechas')}${x.pendientes ? `, a cuenta de los ${x.pendientes} días que tengo pendientes este año` : ''}.\n\nLes ruego que me confirmen las fechas por escrito.\n\nAtentamente,\n${f.yo}`,
  },
  {
    id: 'contingencia',
    nombre: 'Pedir que mi baja se considere accidente de trabajo',
    intro: 'Si tu baja viene del trabajo pero te la han dado como enfermedad común, puedes pedir al INSS que determine la contingencia. Cobrarías más y desde antes. Escribe en "Empresa" la dirección provincial del INSS.',
    campos: [
      { id: 'dni', etiqueta: 'Tu DNI' },
      { id: 'inicio', etiqueta: 'Fecha de inicio de la baja' },
      { id: 'causa', etiqueta: 'Por qué crees que viene del trabajo', area: true, ayuda: 'Qué pasó, cuándo y dónde, y los informes que lo relacionan con tu trabajo' },
    ],
    aviso: 'Adjunta los partes de baja y todos los informes que relacionen la lesión o la enfermedad con tu trabajo. Pide antes el test de la baja laboral de esta web y, mejor, que un abogado lo revise.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa}\n\nAsunto: Solicitud de determinación de la contingencia de mi incapacidad temporal\n\nYo, ${f.yo}, con DNI ${v(x.dni, 'DNI')}, me encuentro en situación de incapacidad temporal desde el ${v(x.inicio, 'fecha de inicio')}, calificada como derivada de contingencia común.\n\nConsidero que deriva de contingencia profesional por los siguientes motivos:\n\n${v(x.causa, 'motivos')}\n\nPor ello, solicito que se inicie el procedimiento de determinación de la contingencia y que se declare que mi incapacidad temporal deriva de accidente de trabajo o enfermedad profesional.\n\nAdjunto los partes de baja y los informes médicos.\n\nAtentamente,\n${f.yo}`,
  },
  {
    id: 'pago-directo',
    nombre: 'Pedir al INSS que me pague la baja si la empresa no lo hace',
    intro: 'Normalmente la empresa te adelanta la prestación de la baja en la nómina. Si no lo hace, puedes pedir el pago directo. Escribe en "Empresa" la dirección provincial del INSS (o tu mutua, si es ella quien gestiona tu baja).',
    campos: [
      { id: 'dni', etiqueta: 'Tu DNI' },
      { id: 'inicio', etiqueta: 'Fecha de inicio de la baja' },
      { id: 'meses', etiqueta: 'Meses que la empresa no te ha pagado' },
    ],
    aviso: 'Adjunta los partes de baja y las nóminas en las que no aparece el pago. Si la empresa además te debe salario, reclámalo aparte.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa}\n\nAsunto: Solicitud de pago directo de la prestación de incapacidad temporal\n\nYo, ${f.yo}, con DNI ${v(x.dni, 'DNI')}, en situación de incapacidad temporal desde el ${v(x.inicio, 'fecha de inicio')}, les comunico que mi empresa no me ha abonado la prestación correspondiente a ${v(x.meses, 'meses')} en régimen de pago delegado.\n\nPor ello, solicito el pago directo de la prestación por parte de esa entidad.\n\nAdjunto los partes de baja y las nóminas.\n\nAtentamente,\n${f.yo}`,
  },
  {
    id: 'incremento',
    nombre: 'Pedir el 20 % más de la incapacidad total (a partir de 55 años)',
    intro: 'Si tienes reconocida una incapacidad permanente total y 55 años o más, puedes pedir que tu pensión pase del 55 % al 75 % de la base reguladora. Escribe en "Empresa" la dirección provincial del INSS.',
    campos: [
      { id: 'dni', etiqueta: 'Tu DNI' },
      { id: 'resolucion', etiqueta: 'Fecha de la resolución que te reconoció la total' },
    ],
    aviso: 'Se exige que, por tu edad, formación y entorno, sea difícil encontrar otro trabajo. El incremento se suspende mientras trabajes. Si te lo niegan, hay 30 días hábiles para reclamar.',
    texto: (x, f) =>
      `${f.ciudad}, a ${f.fecha}\n\nA la atención de ${f.empresa}\n\nAsunto: Solicitud del incremento del 20 % de la pensión de incapacidad permanente total\n\nYo, ${f.yo}, con DNI ${v(x.dni, 'DNI')}, tengo reconocida una incapacidad permanente total para mi profesión habitual por resolución de ${v(x.resolucion, 'fecha de la resolución')} y he cumplido 55 años.\n\nDadas mi edad, mi formación y las circunstancias de mi entorno, me resulta muy difícil encontrar un empleo en una actividad distinta. Por ello, solicito el incremento del 20 % de la base reguladora previsto en el artículo 196.2 de la Ley General de la Seguridad Social.\n\nAtentamente,\n${f.yo}`,
  },
];

export default function GeneraCarta() {
  const [id, setId] = useState(MODELOS[0].id);
  useEffect(() => {
    const c = new URLSearchParams(location.search).get('carta');
    if (c && MODELOS.some((m) => m.id === c)) {
      setId(c);
      setTimeout(() => document.getElementById('carta-' + c)?.scrollIntoView({ block: 'center' }), 80);
    }
  }, []);
  const [yo, setYo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [ciudad, setCiudad] = useState('Madrid');
  const [vals, setVals] = useState<Record<string, string>>({});
  const [copiada, setCopiada] = useState(false);
  const m = MODELOS.find((x) => x.id === id)!;
  const fecha = useMemo(() => new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Madrid' }).format(new Date(`${hoyMadrid()}T12:00:00Z`)), []);
  const texto = m.texto(vals, { yo: v(yo, 'tu nombre completo'), empresa: v(empresa, 'nombre de la empresa'), ciudad: v(ciudad, 'ciudad'), fecha });
  function descargar() {
    const html = `<html><head><meta charset="utf-8"></head><body style="font-family:Calibri,Arial,sans-serif;font-size:12pt;line-height:1.5">${texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>')}</body></html>`;
    const url = URL.createObjectURL(new Blob(['\ufeff', html], { type: 'application/msword' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `carta-${m.id}.doc`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
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
              <input type="radio" name="carta" id={`carta-${x.id}`} checked={id === x.id} onChange={() => setId(x.id)} />
              <span>{x.nombre}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p>{m.intro}</p>
      <div className="campo">
        <label htmlFor="c-yo">Tu nombre completo</label>
        <input type="text" id="c-yo" value={yo} onChange={(e) => setYo(e.target.value)} autoComplete="name" />
      </div>
      {m.id !== 'no-conforme' && (
        <>
          <div className="campo">
            <label htmlFor="c-empresa">Nombre de la empresa</label>
            <input type="text" id="c-empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="c-ciudad">Ciudad</label>
            <input type="text" id="c-ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
          </div>
        </>
      )}
      {m.campos.map((c) => (
        <div className="campo" key={m.id + c.id}>
          <label htmlFor={`c-${c.id}`}>{c.etiqueta}</label>
          {c.area ? (
            <textarea id={`c-${c.id}`} rows={4} value={vals[c.id] ?? ''} onChange={(e) => setVals({ ...vals, [c.id]: e.target.value })} />
          ) : (
            <input type="text" id={`c-${c.id}`} value={vals[c.id] ?? ''} onChange={(e) => setVals({ ...vals, [c.id]: e.target.value })} />
          )}
          {c.ayuda && <p className="campo-ayuda">{c.ayuda}</p>}
        </div>
      ))}
      <h2 style={{ fontSize: '1.2rem', margin: '20px 0 8px' }}>Tu carta</h2>
      <pre className="carta-texto" aria-live="polite">{texto}</pre>
      {m.aviso && <p className="recuadro">{m.aviso}</p>}
      <div className="acciones">
        <button type="button" className="boton" onClick={copiar}>{copiada ? 'Copiada' : 'Copiar la carta'}</button>
        <button type="button" className="boton boton-claro" onClick={descargar}>Descargar en Word</button>
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
