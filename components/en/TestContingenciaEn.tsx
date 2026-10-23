'use client';

import CuestionarioEn, { type Paso, marcas, texto } from './CuestionarioEn';

const PASOS: Paso[] = [
  {
    id: 'motivo',
    pregunta: 'Why are you on sick leave, or why do you think you will be?',
    opciones: [
      { texto: 'Anxiety, depression or stress', marca: 'psico' },
      { texto: 'A physical injury', marca: 'fisica' },
      { texto: 'Another illness', marca: 'otra' },
    ],
  },
  {
    id: 'causa',
    pregunta: 'Is it related to work?',
    opciones: [
      { texto: 'Yes, because of harassment or hostile treatment', marca: 'acoso' },
      { texto: 'Yes, because of workload or pressure at work', marca: 'carga' },
      { texto: 'Yes, it was an accident while working or on the way to work', marca: 'accidente' },
      { texto: 'I do not know', marca: 'duda' },
      { texto: 'No', marca: 'no' },
    ],
  },
  {
    id: 'medico',
    pregunta: 'Have you told your doctor that it comes from work?',
    si: (r) => !marcas(r).has('no'),
    opciones: [
      { texto: 'Yes, and they have written it down', marca: 'anotado' },
      { texto: 'No, or I do not know if they wrote it down', marca: 'sinanotar' },
    ],
  },
  {
    id: 'antes',
    pregunta: 'Had you had the same health problem before?',
    si: (r) => !marcas(r).has('no'),
    opciones: [
      { texto: 'No, it started with what happened at work', marca: 'nuevo' },
      { texto: 'Yes, I already had it', marca: 'previo' },
    ],
  },
];

export default function TestContingenciaEn() {
  return (
    <CuestionarioEn
      pasos={PASOS}
      resultado={(r) => {
        const m = marcas(r);
        const laboral = m.has('acoso') || m.has('carga') || m.has('accidente');
        const puntos: string[] = [
          'If your sick leave is recognised as a work accident (accidente de trabajo), you receive 75% of your contribution base from the day after the leave starts. If it is ordinary illness (enfermedad común), you receive nothing for the first three days, 60% up to day 20 and 75% after that, unless your collective agreement (convenio) improves it.',
          'In addition, no minimum contribution period is required and, if one day there is a permanent disability, it is calculated with more favourable rules.',
        ];
        if (m.has('accidente'))
          puntos.push(
            'An accident while working or on the way between home and work is presumed to be work-related. If you were given ordinary sick leave, it can be corrected.',
          );
        if (m.has('psico') && (m.has('acoso') || m.has('carga')))
          puntos.push(
            'Anxiety or depression caused by work is not presumed to be work-related: you have to prove that the cause is work and not something else. That is where the battle is.',
          );
        if (m.has('sinanotar'))
          puntos.push('At your next appointment, ask the doctor to write down that the origin is work-related. That report is the first piece of evidence.');
        if (m.has('previo'))
          puntos.push('If you already had the problem, it can still be work-related if work has made it worse, but it is harder.');
        puntos.push(
          'The procedure is called determination of contingency (determinación de contingencia) and is requested from the social security office (INSS). You can start it yourself.',
        );

        return {
          nivel: laboral && (m.has('anotado') || m.has('accidente')) ? 'alto' : laboral || m.has('duda') ? 'medio' : 'bajo',
          titulo: laboral
            ? 'Your sick leave could be a work accident'
            : m.has('duda')
              ? 'It is worth finding out'
              : 'From what you say, it looks like ordinary sick leave',
          texto: laboral
            ? 'If the origin is your work, you are entitled to have it recognised. It changes what you receive now and what you could receive in the future.'
            : m.has('duda')
              ? 'If you suspect your work has something to do with it, tell us: many work-related sick leaves end up registered as ordinary ones.'
              : 'If something changes or you remember a link with your work, take the test again.',
          puntos,
          enlaces: [
            { href: '/en/workplace-harassment/sick-leave-for-anxiety-due-to-harassment', texto: 'Sick leave for anxiety due to harassment' },
            { href: '/en/tools/harassment-test', texto: 'Is what is happening to me harassment?' },
          ],
          whatsapp: [
            'Hello, I have taken the work-related sick leave test.',
            texto(r, 'motivo') && `Reason: ${texto(r, 'motivo')}.`,
            texto(r, 'causa') && `Cause: ${texto(r, 'causa')}.`,
            texto(r, 'medico') && `Doctor: ${texto(r, 'medico')}.`,
            'I would like to know whether my sick leave should be a work accident.',
          ]
            .filter(Boolean)
            .join(' '),
        };
      }}
    />
  );
}
