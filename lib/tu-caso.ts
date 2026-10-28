// "Tu caso en 2 minutos": convierte la situación y unos pocos datos en un plan con plazo, cifra, carta y guías.
// Usa las mismas funciones que las calculadoras de la web, así que las cifras coinciden con las de cada herramienta.
import {
  calcularIndemnizacion,
  calcularBaja,
  calcularPensionIP,
  sumarHabiles,
  sumarAnios,
  sumarDias,
  diasHabilesRestantes,
  TOPE_DIARIO_FOGASA,
} from './calculos';

export type Situacion = 'despido' | 'sancion' | 'impago' | 'baja' | 'incapacidad' | 'acoso' | 'familia' | 'irme';

export const SITUACIONES: { id: Situacion; texto: string; ayuda: string; icono: string }[] = [
  { id: 'despido', texto: 'Me han despedido', ayuda: 'O me han dado la carta, o no me renuevan', icono: 'documento' },
  { id: 'sancion', texto: 'Me han sancionado', ayuda: 'Una amonestación o una suspensión de empleo y sueldo', icono: 'balanza' },
  { id: 'impago', texto: 'No me pagan', ayuda: 'Nóminas atrasadas, o la empresa ha cerrado', icono: 'euro' },
  { id: 'baja', texto: 'Estoy de baja', ayuda: 'O me han dado el alta y no estoy bien', icono: 'corazon' },
  { id: 'incapacidad', texto: 'No podré volver a mi trabajo', ayuda: 'Quiero pedir la incapacidad, o me la han denegado', icono: 'casa' },
  { id: 'acoso', texto: 'Sufro acoso o un mal ambiente', ayuda: 'Gritos, aislamiento, humillaciones, acoso sexual', icono: 'escudo' },
  { id: 'familia', texto: 'Hijos, embarazo o cuidar', ayuda: 'Permisos, reducción de jornada, excedencias', icono: 'embarazo' },
  { id: 'irme', texto: 'Quiero irme de la empresa', ayuda: 'Y no perder lo que me corresponde', icono: 'flecha' },
];

export type Datos = {
  fecha?: string; // la fecha clave de cada situación
  inicio?: string; // inicio del contrato
  salario?: number; // bruto anual
  especial?: string[]; // marcas: embarazo, baja, reclamo, representante
  gravedad?: 'leve' | 'grave' | 'muy-grave' | 'no-se';
  meses?: number; // meses sin cobrar
  cerrada?: boolean;
  tipoBaja?: 'comun' | 'trabajo';
  alta?: boolean; // me han dado el alta y no estoy bien
  denegada?: boolean;
  edad?: number;
  anios?: number;
  sigo?: 'si' | 'baja' | 'no';
  familia?: 'jornada' | 'nacimiento' | 'dias' | 'despido';
  motivo?: 'impago' | 'cambios' | 'acoso' | 'voluntaria';
};

export type Plan = {
  titulo: string;
  urgente: boolean;
  plazo?: { que: string; ultimo?: string; quedan?: number; texto: string };
  cifras: { nombre: string; valor: number; detalle: string }[];
  avisos: string[];
  carta?: { href: string; texto: string };
  guias: { href: string; texto: string }[];
  herramientas: { href: string; texto: string }[];
  resumen: string; // para WhatsApp
};

const MADRID = true;

function plazoHabiles(fecha: string, n: number, hoy: string, agostoHabil = true) {
  const ultimo = sumarHabiles(fecha, n, agostoHabil, MADRID);
  const quedan = ultimo < hoy ? 0 : diasHabilesRestantes(hoy > fecha ? hoy : sumarHabiles(fecha, 1, agostoHabil, MADRID), ultimo, agostoHabil, MADRID);
  return { ultimo, quedan };
}

export function planDe(s: Situacion, d: Datos, hoy: string): Plan {
  const salario = d.salario && d.salario > 0 ? d.salario : 0;
  const p: Plan = { titulo: '', urgente: false, cifras: [], avisos: [], guias: [], herramientas: [], resumen: '' };

  if (s === 'despido' || (s === 'familia' && d.familia === 'despido')) {
    p.titulo = 'Tu plan tras el despido';
    if (d.fecha) {
      const { ultimo, quedan } = plazoHabiles(d.fecha, 20, hoy);
      p.plazo = { que: 'Para reclamar el despido', ultimo, quedan, texto: '20 días hábiles para presentar la papeleta de conciliación. Si se pasa, el despido ya no se puede impugnar.' };
      p.urgente = true;
    }
    if (d.fecha && d.inicio && salario && d.inicio < d.fecha) {
      const r = calcularIndemnizacion(d.inicio, d.fecha, salario);
      p.cifras.push({ nombre: 'Si es improcedente', valor: r.importeImprocedente, detalle: '33 días por año trabajado, como máximo 24 mensualidades' });
      p.cifras.push({ nombre: 'Si es objetivo y procedente', valor: r.importeObjetivo, detalle: '20 días por año, como máximo 12 mensualidades' });
    }
    const esp = d.especial ?? [];
    if (s === 'familia' || esp.includes('embarazo'))
      p.avisos.push('Embarazo, permisos por hijos, lactancia o reducción de jornada: la ley protege de forma automática. Si la empresa no prueba una causa real, el despido es nulo: readmisión y salarios.');
    if (esp.includes('baja')) p.avisos.push('Estabas de baja: desde 2022 despedir por enfermedad es discriminación y el despido puede ser nulo.');
    if (esp.includes('reclamo')) p.avisos.push('Habías reclamado o denunciado: si el despido es una represalia, es nulo (garantía de indemnidad).');
    if (esp.includes('representante')) p.avisos.push('Eres representante de los trabajadores: tienes garantías especiales y eres tú quien elige entre volver o cobrar la indemnización.');
    p.avisos.push('Firma la carta y el finiquito como "recibí, no conforme" y pide el paro en los 15 días hábiles siguientes.');
    p.carta = { href: '/herramientas/genera-tu-carta?carta=no-conforme', texto: 'Recibí, no conforme' };
    p.guias = [
      { href: '/blog/me-han-despedido-que-hago-las-primeras-48-horas', texto: 'Me han despedido: las primeras 48 horas' },
      { href: esp.length || s === 'familia' ? '/despido/despido-nulo-cuando' : '/despido/tipos-de-despido', texto: esp.length || s === 'familia' ? 'Cuándo es nulo un despido' : 'Tipos de despido' },
      { href: '/blog/papeleta-de-conciliacion-smac-despido', texto: 'La papeleta de conciliación' },
    ];
    p.herramientas = [
      { href: '/herramientas/revisa-tu-carta-de-despido', texto: 'Revisa los defectos de tu carta' },
      { href: '/herramientas/test-nulidad', texto: '¿Tu despido puede ser nulo?' },
      { href: '/herramientas/calculadora-paro', texto: 'Cuánto paro te queda' },
    ];
  } else if (s === 'sancion') {
    p.titulo = 'Tu plan ante la sanción';
    if (d.fecha) {
      const { ultimo, quedan } = plazoHabiles(d.fecha, 20, hoy, false);
      p.plazo = { que: 'Para impugnar la sanción', ultimo, quedan, texto: '20 días hábiles desde que te la comunican, empezando por la papeleta de conciliación. En las sanciones, agosto no cuenta.' };
      p.urgente = true;
    }
    const dias = d.gravedad === 'leve' ? 10 : d.gravedad === 'grave' ? 20 : d.gravedad === 'muy-grave' ? 60 : 0;
    p.avisos.push(
      dias
        ? `Una falta ${d.gravedad === 'muy-grave' ? 'muy grave' : d.gravedad} prescribe a los ${dias} días de que la empresa la conoce, y siempre a los 6 meses de cometerse. Si te sancionan después, la sanción no vale.`
        : 'Las faltas prescriben: a los 10, 20 o 60 días de que la empresa las conoce, según sean leves, graves o muy graves, y siempre a los 6 meses.',
    );
    p.avisos.push('No dejes pasar una sanción injusta: muchos convenios la tienen en cuenta para la siguiente, y puede acabar sirviendo para un despido.');
    p.carta = { href: '/herramientas/genera-tu-carta?carta=sancion', texto: 'Responder a una amonestación o sanción' };
    p.guias = [
      { href: '/blog/suspension-de-empleo-y-sueldo', texto: 'Suspensión de empleo y sueldo' },
      { href: '/blog/amonestacion-por-escrito-como-responder', texto: 'Cómo responder a una amonestación' },
      { href: '/blog/faltas-leves-graves-muy-graves', texto: 'Faltas leves, graves y muy graves' },
    ];
    p.herramientas = [{ href: '/herramientas/prescripcion-faltas', texto: '¿Ha prescrito la falta?' }];
  } else if (s === 'impago') {
    p.titulo = 'Tu plan para cobrar lo que te deben';
    const meses = d.meses && d.meses > 0 ? d.meses : 0;
    if (salario && meses) {
      p.cifras.push({ nombre: 'Te deben, sin intereses', valor: Math.round((salario / 12) * meses), detalle: `${meses} ${meses === 1 ? 'mes' : 'meses'} de sueldo bruto, con la parte de las pagas extra` });
      p.cifras.push({ nombre: 'Más intereses, por cada año de retraso', valor: Math.round((salario / 12) * meses * 0.1), detalle: 'El 10 % de lo debido (art. 29.3 del Estatuto)' });
    }
    if (d.fecha) {
      p.plazo = { que: 'Para reclamar el mes más antiguo', ultimo: sumarAnios(d.fecha, 1), texto: 'Un año desde que debieron pagártelo. Cada mes tiene su propio plazo: el más antiguo es el que corre más prisa.' };
      p.urgente = p.plazo.ultimo! < sumarDias(hoy, 60);
    }
    if (meses >= 3) p.avisos.push('Con tres mensualidades sin cobrar en un año, la ley ya lo considera un incumplimiento grave: puedes pedir al juez que extinga tu contrato con la indemnización del despido improcedente y cobrar el paro.');
    if (d.cerrada && salario) {
      const tope = Math.round(Math.min(salario / 365, TOPE_DIARIO_FOGASA) * 120);
      const debido = meses ? Math.round((salario / 12) * meses) : 0;
      p.cifras.push(
        debido && debido <= tope
          ? { nombre: 'El FOGASA te cubriría', valor: debido, detalle: 'todo lo que te deben en salarios, si la empresa es insolvente' }
          : { nombre: 'El FOGASA te cubre hasta', valor: tope, detalle: 'en salarios (120 días, con un tope diario), si la empresa es insolvente' },
      );
      p.avisos.push('Si la empresa ha cerrado o está en concurso, el FOGASA paga una parte. Antes necesitas una sentencia o un acta de conciliación.');
    }
    p.carta = { href: '/herramientas/genera-tu-carta?carta=salarios', texto: 'Reclamar salarios o cantidades' };
    p.guias = [
      { href: '/blog/la-empresa-no-me-paga-la-nomina', texto: 'La empresa no me paga la nómina' },
      d.cerrada ? { href: '/blog/expediente-fogasa-como-pedirlo', texto: 'Cómo pedir el FOGASA' } : { href: '/blog/extincion-del-contrato-articulo-50', texto: 'Irte con indemnización (artículo 50)' },
    ];
    p.herramientas = [
      { href: '/herramientas/calculadora-salarios-impagados', texto: 'Salarios impagados, mes a mes y con intereses' },
      { href: '/herramientas/calculadora-fogasa', texto: 'Cuánto cubre el FOGASA' },
    ];
  } else if (s === 'baja') {
    p.titulo = d.alta ? 'Tu plan si no estás de acuerdo con el alta' : 'Tu plan mientras estás de baja';
    if (salario) {
      const r = calcularBaja(d.tipoBaja === 'trabajo' ? 'trabajo' : 'comun', salario, 30);
      p.cifras.push({ nombre: 'Un mes de baja', valor: Math.round(r.total), detalle: d.tipoBaja === 'trabajo' ? 'Accidente de trabajo: 75 % desde el segundo día' : 'Enfermedad común: el primer mes, con los 3 días en blanco' });
      if (d.tipoBaja !== 'trabajo') {
        const t = calcularBaja('trabajo', salario, 30);
        if (t.total > r.total) p.cifras.push({ nombre: 'Si fuera accidente de trabajo', valor: Math.round(t.total), detalle: 'Lo mismo, si se reconoce que la causa es el trabajo' });
      }
    }
    if (d.alta && d.fecha) {
      const ultimo = sumarDias(d.fecha, 4);
      const desde = hoy > d.fecha ? hoy : sumarDias(d.fecha, 1);
      const quedan = Math.max(0, Math.round((Date.parse(ultimo) - Date.parse(desde)) / 86400000) + 1);
      p.plazo = { que: 'Si el alta te la dio el INSS tras un año de baja', ultimo, quedan, texto: '4 días naturales para mostrar tu disconformidad. Si te la dio tu médico o la mutua, el plazo es otro: míralo en la guía.' };
      p.urgente = true;
      p.carta = { href: '/herramientas/genera-tu-carta?carta=alta', texto: 'No estoy de acuerdo con el alta médica' };
    } else if (d.tipoBaja !== 'trabajo') {
      p.avisos.push('Si tu baja la ha causado el trabajo (un accidente, una lesión, la ansiedad por acoso), pide que se reconozca: cobras más y la pensión, si llega, también.');
      p.carta = { href: '/herramientas/genera-tu-carta?carta=contingencia', texto: 'Que mi baja sea accidente de trabajo' };
    } else p.carta = { href: '/herramientas/genera-tu-carta?carta=pago-directo', texto: 'Que el INSS me pague la baja' };
    p.avisos.push('Estar de baja no permite que te despidan por ello: un despido por enfermedad puede ser nulo.');
    p.guias = [
      d.alta ? { href: '/incapacidad-permanente/recurrir-alta-medica', texto: 'Cómo recurrir el alta médica' } : { href: '/incapacidad-permanente/baja-por-enfermedad-comun', texto: 'La baja por enfermedad común' },
      { href: '/incapacidad-permanente/baja-por-estres-o-ansiedad', texto: 'La baja por estrés o ansiedad' },
    ];
    p.herramientas = [
      { href: '/herramientas/calculadora-baja-laboral', texto: 'Cuánto cobras de baja, día a día' },
      { href: '/herramientas/test-baja-laboral', texto: '¿Tu baja es accidente de trabajo?' },
    ];
  } else if (s === 'incapacidad') {
    p.titulo = d.denegada ? 'Tu plan para reclamar la incapacidad' : 'Tu plan para pedir la incapacidad';
    if (d.denegada && d.fecha) {
      const { ultimo, quedan } = plazoHabiles(d.fecha, 30, hoy);
      p.plazo = { que: 'Para la reclamación previa', ultimo, quedan, texto: '30 días hábiles desde que te notifican la resolución. Es obligatoria antes de ir al juzgado.' };
      p.urgente = true;
    }
    if (salario && d.edad && d.anios !== undefined) {
      const base = { origen: 'comun' as const, salarioAnual: salario, edad: d.edad, aniosCotizados: d.anios, cualificada: false };
      const t = calcularPensionIP({ ...base, grado: 'total' });
      const a = calcularPensionIP({ ...base, grado: 'absoluta' });
      p.cifras.push({ nombre: 'Con la total', valor: Math.round(t.porPaga), detalle: 'al mes, en 14 pagas (55 %)' });
      p.cifras.push({ nombre: 'Con la absoluta', valor: Math.round(a.porPaga), detalle: 'al mes, en 14 pagas (100 %)' });
      if (d.edad >= 55) p.avisos.push('Con 55 años o más, la total puede subir un 20 % (total cualificada) si te cuesta encontrar otro empleo. Hay que pedirlo.');
    }
    p.avisos.push('Lo que decide el grado son tus informes médicos: que digan con claridad qué no puedes hacer en tu trabajo, no solo el diagnóstico.');
    p.carta = { href: '/herramientas/genera-tu-carta?carta=historial', texto: 'Pedir tu historial médico' };
    p.guias = d.denegada
      ? [
          { href: '/blog/que-hacer-si-el-inss-deniega-la-incapacidad', texto: 'Qué hacer si el INSS te la deniega' },
          { href: '/incapacidad-permanente/reclamacion-previa-y-demanda', texto: 'Reclamación previa y demanda' },
        ]
      : [
          { href: '/incapacidad-permanente/tribunal-medico-evi', texto: 'Cómo preparar el tribunal médico' },
          { href: '/incapacidad-permanente/grados-de-incapacidad-permanente', texto: 'Los grados y cuánto se cobra' },
        ];
    p.guias.push({ href: '/incapacidad-permanente/preguntas-frecuentes-incapacidad-permanente', texto: 'Las 50 preguntas frecuentes' });
    p.herramientas = [
      { href: '/herramientas/calculadora-pension-incapacidad', texto: 'Tu pensión, paso a paso' },
      { href: '/herramientas/tribunal-medico', texto: '¿Llevas preparado el tribunal médico?' },
      { href: '/herramientas/comprobador-incapacidad', texto: 'Qué grado te podría corresponder' },
    ];
  } else if (s === 'acoso') {
    p.titulo = 'Tu plan frente al acoso';
    p.avisos.push('Empieza hoy a guardar pruebas: correos, mensajes, testigos, partes médicos. Casi siempre hay más de las que parece.');
    if (d.sigo === 'baja') p.avisos.push('Si estás de baja por esto, pide que conste en el parte que la causa es laboral: cobras más y protege tu caso.');
    if (d.sigo === 'si') p.avisos.push('No dejes el trabajo por tu cuenta: perderías la indemnización y el paro. Hay una vía para irte cobrando como en un despido improcedente.');
    if (d.sigo === 'no') p.avisos.push('Aunque ya no estés en la empresa, puedes reclamar los daños: en general tienes un año.');
    p.carta = { href: '/herramientas/genera-tu-carta?carta=acoso', texto: 'Comunicar el acoso a la empresa' };
    p.guias = [
      { href: '/acoso-laboral/como-saber-si-sufro-acoso', texto: 'Cómo saber si sufro acoso' },
      d.sigo === 'baja' ? { href: '/acoso-laboral/baja-por-ansiedad-por-acoso', texto: 'Baja por ansiedad por acoso' } : { href: '/acoso-laboral/dejar-el-trabajo-por-acoso', texto: 'Dejar el trabajo por acoso' },
    ];
    p.herramientas = [
      { href: '/herramientas/test-acoso', texto: '¿Es acoso lo que me pasa?' },
      { href: '/herramientas/mapa-de-pruebas', texto: 'Mapa de pruebas del acoso' },
    ];
  } else if (s === 'familia') {
    p.titulo = 'Tu plan para conciliar sin perder derechos';
    if (d.familia === 'jornada') {
      p.avisos.push('Reducir o adaptar la jornada para cuidar es un derecho. Pídelo por escrito con fechas y horario: la empresa solo puede negarse con razones.');
      p.carta = { href: '/herramientas/genera-tu-carta?carta=jornada', texto: 'Reducir o adaptar tu jornada' };
      p.guias = [{ href: '/mujer-y-trabajo/reduccion-y-adaptacion-de-jornada', texto: 'Reducción y adaptación de jornada' }];
      p.herramientas = [{ href: '/herramientas/calculadora-reduccion-jornada', texto: 'Cuánto cobrarías con la reducción' }];
    } else if (d.familia === 'nacimiento') {
      p.avisos.push('Cada progenitor tiene su permiso por nacimiento, más la lactancia. Desde que comunicas el embarazo tienes una protección reforzada frente al despido.');
      p.guias = [{ href: '/mujer-y-trabajo/permisos-por-nacimiento-y-lactancia', texto: 'Permisos por nacimiento y lactancia' }];
      p.herramientas = [{ href: '/herramientas/calendario-permisos', texto: 'Tu calendario de permisos' }];
    } else {
      p.avisos.push('Hay días pagados por boda, hospitalización de un familiar o mudanza, y excedencias con reserva de puesto para cuidar. Pídelos siempre por escrito.');
      p.carta = { href: '/herramientas/genera-tu-carta?carta=excedencia', texto: 'Pedir una excedencia' };
      p.guias = [
        { href: '/mujer-y-trabajo/permisos-retribuidos', texto: 'Permisos retribuidos' },
        { href: '/mujer-y-trabajo/excedencias', texto: 'Excedencias' },
      ];
    }
  } else {
    p.titulo = 'Tu plan para irte sin perder lo tuyo';
    if (d.motivo === 'voluntaria') {
      p.avisos.push('Si te vas por tu cuenta, no cobras indemnización ni paro. Respeta el preaviso de tu convenio (suele ser de 15 días) y pide el finiquito.');
      p.carta = { href: '/herramientas/genera-tu-carta?carta=baja-voluntaria', texto: 'Comunicar tu baja voluntaria' };
      p.guias = [{ href: '/blog/finiquito-firmar-no-conforme', texto: 'Firmar el finiquito' }];
      p.herramientas = [{ href: '/herramientas/calculadora-finiquito', texto: 'Calcula tu finiquito' }];
    } else {
      p.avisos.push('Si la empresa incumple gravemente (no paga, te cambia las condiciones de forma humillante, consiente el acoso), puedes pedir al juez que extinga el contrato y cobrar 33 días por año y el paro.');
      p.avisos.push('Mientras tanto, sigue yendo a trabajar salvo que un abogado te diga lo contrario: irte antes puede costarte todo.');
      if (salario && d.inicio) {
        const r = calcularIndemnizacion(d.inicio, hoy, salario);
        p.cifras.push({ nombre: 'Lo que podrías cobrar', valor: r.importeImprocedente, detalle: 'La indemnización del despido improcedente, calculada a hoy' });
      }
      p.carta = d.motivo === 'impago' ? { href: '/herramientas/genera-tu-carta?carta=salarios', texto: 'Reclamar salarios o cantidades' } : d.motivo === 'acoso' ? { href: '/herramientas/genera-tu-carta?carta=acoso', texto: 'Comunicar el acoso a la empresa' } : undefined;
      p.guias = [{ href: '/blog/extincion-del-contrato-articulo-50', texto: 'Irte con indemnización (artículo 50)' }];
      p.herramientas = [{ href: '/herramientas/test-extincion', texto: '¿Puedo irme con indemnización?' }];
    }
  }

  const sit = SITUACIONES.find((x) => x.id === s)!;
  const partes = [`Hola, he hecho "Tu caso en 2 minutos" en la web. Mi situación: ${sit.texto.toLowerCase()}.`];
  if (p.plazo?.ultimo) partes.push(`Mi plazo acaba el ${p.plazo.ultimo.split('-').reverse().join('/')}.`);
  if (p.cifras[0]) partes.push(`${p.cifras[0].nombre}: unos ${p.cifras[0].valor.toLocaleString('es-ES')} €.`);
  partes.push('Quiero que lo vea un abogado.');
  p.resumen = partes.join(' ');
  return p;
}
