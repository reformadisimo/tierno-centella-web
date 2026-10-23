'use client';

import Cuestionario, { type Paso, type Respuestas, marcas, texto } from './Cuestionario';

const v = (r: Respuestas, id: string) => r[id]?.[0]?.valor ?? 0;

const PASOS: Paso[] = [
  {
    id: 'conductas',
    pregunta: '¿Cuáles de estas cosas te están pasando en el trabajo?',
    ayuda: 'Marca todas las que reconozcas.',
    multiple: true,
    opciones: [
      { texto: 'Me gritan, me insultan o me hablan con desprecio', marca: 'c' },
      { texto: 'Me critican o ridiculizan delante de otros', marca: 'c' },
      { texto: 'Me han quitado funciones o me dejan sin trabajo', marca: 'c' },
      { texto: 'Me mandan tareas absurdas, imposibles o por debajo de mi puesto', marca: 'c' },
      { texto: 'Me excluyen de reuniones, correos o información', marca: 'c' },
      { texto: 'Me cambian de sitio, horario o turno para apartarme', marca: 'c' },
      { texto: 'Me vigilan o controlan más que al resto', marca: 'c' },
      { texto: 'Se difunden rumores o mentiras sobre mí', marca: 'c' },
      { texto: 'Me amenazan con despedirme o sancionarme sin motivo', marca: 'c' },
      { texto: 'Me niegan permisos, vacaciones o formación que a otros sí', marca: 'c' },
    ],
  },
  {
    id: 'frecuencia',
    pregunta: '¿Con qué frecuencia te pasa?',
    si: (r) => (r.conductas ?? []).length > 0,
    opciones: [
      { texto: 'Casi a diario', valor: 3 },
      { texto: 'Varias veces por semana', valor: 2 },
      { texto: 'Alguna vez al mes', valor: 1 },
      { texto: 'Muy de vez en cuando', valor: 0 },
    ],
  },
  {
    id: 'duracion',
    pregunta: '¿Desde cuándo?',
    si: (r) => (r.conductas ?? []).length > 0,
    opciones: [
      { texto: 'Más de seis meses', valor: 2 },
      { texto: 'Entre uno y seis meses', valor: 1 },
      { texto: 'Menos de un mes', valor: 0 },
    ],
  },
  {
    id: 'quien',
    pregunta: '¿De quién viene sobre todo?',
    si: (r) => (r.conductas ?? []).length > 0,
    opciones: [
      { texto: 'De un jefe o superior', marca: 'jefe' },
      { texto: 'De compañeros de mi nivel', marca: 'companeros' },
      { texto: 'De personas a mi cargo', marca: 'subordinados' },
      { texto: 'De varios a la vez', marca: 'varios' },
    ],
  },
  {
    id: 'intencion',
    pregunta: '¿Sientes que lo que buscan es que te vayas o hundirte?',
    si: (r) => (r.conductas ?? []).length > 0,
    opciones: [
      { texto: 'Sí, lo tengo claro', valor: 2 },
      { texto: 'A veces lo pienso', valor: 1 },
      { texto: 'No, es un mal ambiente que sufrimos todos', valor: 0, marca: 'general' },
    ],
  },
  {
    id: 'salud',
    pregunta: '¿Te está afectando a la salud?',
    opciones: [
      { texto: 'Sí, y estoy o he estado de baja', marca: 'baja' },
      { texto: 'Sí: duermo mal, tengo ansiedad o tomo medicación', marca: 'salud' },
      { texto: 'No por ahora' },
    ],
  },
  {
    id: 'empresa',
    pregunta: '¿Lo has comunicado a la empresa?',
    opciones: [
      { texto: 'Sí, por escrito', marca: 'escrito' },
      { texto: 'Solo de palabra', marca: 'palabra' },
      { texto: 'No', marca: 'nada' },
    ],
  },
];

export default function TestAcoso() {
  return (
    <Cuestionario
      pasos={PASOS}
      resultado={(r) => {
        const m = marcas(r);
        const n = (r.conductas ?? []).length;
        const freq = v(r, 'frecuencia');
        const dur = v(r, 'duracion');
        const intencion = v(r, 'intencion');
        const alto = n >= 2 && freq >= 2 && dur >= 1 && !m.has('general');
        const medio = !alto && n >= 1 && (freq >= 1 || dur >= 1 || intencion >= 1);

        const puntos: string[] = [];
        if (alto || medio) puntos.push('Empieza hoy un diario: fecha, hora, qué pasó, quién lo vio. Es la prueba que más pesa.');
        if (m.has('nada') || m.has('palabra'))
          puntos.push('Comunícalo a la empresa por escrito. Desde ese momento no podrá decir que no lo sabía y estará obligada a actuar.');
        if (m.has('baja') || m.has('salud'))
          puntos.push('Cuenta en el médico el origen laboral de lo que te pasa. Si estás de baja, puede pedirse que sea accidente de trabajo.');
        if (m.has('jefe')) puntos.push('Si viene de un superior, la empresa responde y, desde 2005, también puede responder el propio acosador.');
        if (m.has('companeros')) puntos.push('Entre compañeros también hay acoso: la empresa responde si lo sabe y no actúa.');
        if (m.has('general'))
          puntos.push('Si el mal ambiente es general, puede no ser acoso a una persona, pero sí un riesgo psicosocial que la empresa debe evaluar.');

        const resumen = `Hola, he hecho el test de acoso de la web. Me pasa: ${texto(r, 'conductas') || 'nada concreto'}. Frecuencia: ${
          texto(r, 'frecuencia') || '-'
        }. Desde hace: ${texto(r, 'duracion') || '-'}. Viene de: ${texto(r, 'quien') || '-'}. Salud: ${texto(r, 'salud')}. Quiero que lo valore un abogado.`;

        return {
          nivel: alto ? 'alto' : medio ? 'medio' : 'bajo',
          titulo: alto
            ? 'Lo que describes tiene los rasgos del acoso laboral'
            : medio
              ? 'Hay señales que conviene tomar en serio'
              : 'Por lo que cuentas, no parece acoso, al menos por ahora',
          texto: alto
            ? 'Conductas hostiles que se repiten a menudo y durante meses: eso es lo que los jueces llaman acoso. No es una certeza, pero sí motivo para actuar ya.'
            : medio
              ? 'Algunas conductas se repiten, aunque todavía no con la frecuencia o la duración del acoso típico. Si siguen, conviene que tengas la prueba desde el principio.'
              : 'Un conflicto o un mal ambiente no son acoso, pero también pueden tener solución. Si hay algo que no aparece en el test, cuéntanoslo.',
          puntos,
          enlaces: [
            { href: '/herramientas/mapa-de-pruebas', texto: 'Mapa de pruebas: qué tienes y qué te falta' },
            { href: '/acoso-laboral/que-puedo-reclamar', texto: 'Qué puedes reclamar por acoso' },
            { href: '/herramientas/test-extincion', texto: '¿Puedo irme de la empresa con indemnización?' },
          ],
          whatsapp: resumen,
        };
      }}
    />
  );
}
