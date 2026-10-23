'use client';

import Cuestionario, { type Paso, marcas, texto } from './Cuestionario';

const PASOS: Paso[] = [
  {
    id: 'tipo',
    pregunta: '¿Qué dice tu carta de despido?',
    opciones: [
      { texto: 'Despido disciplinario', ayuda: 'Te acusan de una falta' },
      { texto: 'Despido objetivo', ayuda: 'Causas económicas, técnicas, organizativas o de producción' },
      { texto: 'No me dieron carta o no lo dice claro' },
      { texto: 'Fin de contrato o no superé el periodo de prueba' },
    ],
  },
  {
    id: 'familia',
    pregunta: '¿Estabas en alguna de estas situaciones al despedirte?',
    ayuda: 'Marca todas las que se apliquen.',
    multiple: true,
    opciones: [
      { texto: 'Embarazada', marca: 'objetiva' },
      { texto: 'De permiso por nacimiento, adopción o acogida, o habías vuelto hace menos de 12 meses', marca: 'objetiva' },
      { texto: 'Con permiso de lactancia o reducción de jornada por cuidado de hijos o familiares', marca: 'objetiva' },
      { texto: 'Habías pedido o disfrutabas una excedencia por cuidado de hijos o familiares', marca: 'objetiva' },
      { texto: 'Víctima de violencia de género o sexual, ejerciendo tus derechos laborales', marca: 'objetiva' },
    ],
  },
  {
    id: 'represalia',
    pregunta: '¿Y alguna de estas otras?',
    multiple: true,
    opciones: [
      { texto: 'Había reclamado algo a la empresa, ido a Inspección o a juicio, o denunciado acoso', marca: 'indemnidad' },
      { texto: 'Estaba de baja médica o tengo una enfermedad que la empresa conocía', marca: 'enfermedad' },
      { texto: 'Soy representante de los trabajadores o estoy afiliado y era activo en el sindicato', marca: 'sindical' },
      { texto: 'Creo que me despiden por mi edad, origen, sexo, orientación, religión o una discapacidad', marca: 'discriminacion' },
      { texto: 'Había hecho huelga', marca: 'sindical' },
    ],
  },
  {
    id: 'cerca',
    pregunta: '¿Cuánto tiempo pasó entre eso y el despido?',
    si: (r) => {
      const m = marcas(r);
      return m.has('indemnidad') || m.has('enfermedad') || m.has('sindical') || m.has('discriminacion');
    },
    opciones: [
      { texto: 'Días o pocas semanas', valor: 2 },
      { texto: 'Unos meses', valor: 1 },
      { texto: 'Más de medio año', valor: 0 },
    ],
  },
];

export default function TestNulidad() {
  return (
    <Cuestionario
      pasos={PASOS}
      resultado={(r) => {
        const m = marcas(r);
        const cerca = r.cerca?.[0]?.valor ?? 0;
        const objetiva = m.has('objetiva');
        const indicios = m.has('indemnidad') || m.has('enfermedad') || m.has('sindical') || m.has('discriminacion');
        const finContrato = texto(r, 'tipo').startsWith('Fin de contrato');

        const puntos: string[] = [];
        if (objetiva)
          puntos.push(
            'En estas situaciones la ley protege de forma automática: si la empresa no demuestra una causa real y grave, el despido es nulo aunque no se pruebe que te despidió por ese motivo.',
          );
        if (m.has('indemnidad'))
          puntos.push('Despedir por reclamar o denunciar es una represalia prohibida (garantía de indemnidad). Cuanto más cerca en el tiempo, más fuerte el indicio.');
        if (m.has('enfermedad'))
          puntos.push('Desde 2022 la ley prohíbe discriminar por enfermedad. No todo despido en baja es nulo, pero si el motivo real es la baja, puede serlo.');
        if (m.has('sindical')) puntos.push('La actividad sindical y la huelga están protegidas como derechos fundamentales.');
        if (m.has('discriminacion')) puntos.push('Si hay indicios de discriminación, es la empresa la que tiene que demostrar que el despido no tiene que ver con eso.');
        if (finContrato)
          puntos.push('Un fin de contrato o un periodo de prueba no superado también puede ser nulo si encubre cualquiera de estos motivos.');
        puntos.push('Si el despido se declara nulo, la empresa tiene que readmitirte y pagarte los salarios que dejaste de cobrar. Puedes reclamar además daños.');

        const alto = objetiva || (indicios && cerca >= 1);
        const medio = !alto && indicios;
        return {
          nivel: alto ? 'alto' : medio ? 'medio' : 'bajo',
          titulo: alto ? 'Tu despido podría ser nulo' : medio ? 'Hay indicios que conviene estudiar' : 'Por lo que cuentas, no hay motivos claros de nulidad',
          texto: alto
            ? 'Has marcado una situación que la ley protege especialmente. Un abogado debe ver tu caso antes de que pasen los 20 días hábiles para reclamar.'
            : medio
              ? 'Hay un posible motivo de nulidad, aunque el tiempo transcurrido lo debilita. Depende mucho de los detalles.'
              : 'Eso no significa que el despido sea justo: puede ser improcedente si la causa no se prueba o la carta tiene defectos.',
          puntos,
          aviso: 'Tienes 20 días hábiles desde el despido para presentar la papeleta de conciliación. Es el mismo plazo si es nulo o improcedente.',
          enlaces: [
            { href: '/herramientas/revisa-tu-carta-de-despido', texto: 'Revisa los defectos de tu carta' },
            { href: '/herramientas/plazos', texto: 'Calcula tu último día para reclamar' },
            { href: '/despido/despido-nulo-cuando', texto: 'Cuándo es nulo un despido, explicado' },
          ],
          whatsapp: `Hola, he hecho el test de nulidad del despido. Tipo: ${texto(r, 'tipo')}. Situación: ${
            [texto(r, 'familia'), texto(r, 'represalia')].filter(Boolean).join('; ') || 'ninguna marcada'
          }. Quiero que lo vea un abogado.`,
        };
      }}
    />
  );
}
