'use client';

import Cuestionario, { type Paso, marcas, texto } from './Cuestionario';

const PASOS: Paso[] = [
  {
    id: 'motivo',
    pregunta: '¿Por qué estás de baja, o crees que vas a estarlo?',
    opciones: [
      { texto: 'Ansiedad, depresión o estrés', marca: 'psico' },
      { texto: 'Una lesión física', marca: 'fisica' },
      { texto: 'Otra enfermedad', marca: 'otra' },
    ],
  },
  {
    id: 'causa',
    pregunta: '¿Tiene que ver con el trabajo?',
    opciones: [
      { texto: 'Sí, por acoso o un trato hostil', marca: 'acoso' },
      { texto: 'Sí, por la carga o la presión de trabajo', marca: 'carga' },
      { texto: 'Sí, fue un accidente trabajando o yendo al trabajo', marca: 'accidente' },
      { texto: 'No lo sé', marca: 'duda' },
      { texto: 'No', marca: 'no' },
    ],
  },
  {
    id: 'medico',
    pregunta: '¿Le has contado al médico que viene del trabajo?',
    si: (r) => !marcas(r).has('no'),
    opciones: [{ texto: 'Sí, y lo ha anotado', marca: 'anotado' }, { texto: 'No, o no sé si lo anotó', marca: 'sinanotar' }],
  },
  {
    id: 'antes',
    pregunta: '¿Habías tenido antes ese mismo problema de salud?',
    si: (r) => !marcas(r).has('no'),
    opciones: [{ texto: 'No, empezó con lo del trabajo', marca: 'nuevo' }, { texto: 'Sí, ya lo tenía', marca: 'previo' }],
  },
];

export default function TestContingencia() {
  return (
    <Cuestionario
      pasos={PASOS}
      resultado={(r) => {
        const m = marcas(r);
        const laboral = m.has('acoso') || m.has('carga') || m.has('accidente');
        const puntos: string[] = [
          'Si la baja se reconoce como accidente de trabajo cobras el 75 % de tu base desde el día siguiente a la baja. Si es enfermedad común, nada los tres primeros días, el 60 % hasta el día 20 y el 75 % después, salvo que tu convenio lo mejore.',
          'Además, no se exige un mínimo de cotización y, si un día hay incapacidad permanente, se calcula con reglas más favorables.',
        ];
        if (m.has('accidente')) puntos.push('Un accidente trabajando o en el trayecto de casa al trabajo se presume laboral. Si te dieron baja común, se puede corregir.');
        if (m.has('psico') && (m.has('acoso') || m.has('carga')))
          puntos.push('La ansiedad o la depresión por el trabajo no se presumen laborales: hay que probar que la causa es el trabajo y no otra. Ahí está la batalla.');
        if (m.has('sinanotar')) puntos.push('Pide en tu próxima cita que el médico anote que el origen es laboral. Ese informe es la primera prueba.');
        if (m.has('previo')) puntos.push('Si ya tenías el problema, también puede ser laboral si el trabajo lo ha agravado, pero es más difícil.');
        puntos.push('El trámite se llama determinación de contingencia y se pide ante el INSS. Lo puedes iniciar tú.');

        return {
          nivel: laboral && (m.has('anotado') || m.has('accidente')) ? 'alto' : laboral || m.has('duda') ? 'medio' : 'bajo',
          titulo: laboral
            ? 'Tu baja podría ser accidente de trabajo'
            : m.has('duda')
              ? 'Merece la pena averiguarlo'
              : 'Por lo que cuentas, parece una baja común',
          texto: laboral
            ? 'Si el origen está en el trabajo, tienes derecho a que se reconozca. Cambia lo que cobras ahora y lo que podrías cobrar en el futuro.'
            : m.has('duda')
              ? 'Si sospechas que tu trabajo tiene que ver, cuéntanoslo: muchas bajas laborales acaban registradas como comunes.'
              : 'Si cambia algo o recuerdas un vínculo con el trabajo, vuelve a hacer el test.',
          puntos,
          enlaces: [
            { href: '/acoso-laboral/baja-por-ansiedad-por-acoso', texto: 'Baja por ansiedad por acoso' },
            { href: '/herramientas/test-acoso', texto: '¿Es acoso lo que me pasa?' },
          ],
          whatsapp: ['Hola, he hecho el test de baja laboral.', texto(r, 'motivo') && `Motivo: ${texto(r, 'motivo')}.`, texto(r, 'causa') && `Causa: ${texto(r, 'causa')}.`, texto(r, 'medico') && `${texto(r, 'medico')}.`, 'Quiero saber si mi baja debería ser accidente de trabajo.'].filter(Boolean).join(' '),
        };
      }}
    />
  );
}
