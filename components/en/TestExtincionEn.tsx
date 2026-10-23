'use client';

import CuestionarioEn, { type Paso, marcas, texto } from './CuestionarioEn';

const PASOS: Paso[] = [
  {
    id: 'que',
    pregunta: 'What is the company doing?',
    ayuda: 'Tick all that apply to you.',
    multiple: true,
    opciones: [
      { texto: 'It pays my salary late or not at all, for several months', marca: 'impago' },
      { texto: 'I suffer harassment or humiliating treatment', marca: 'acoso' },
      { texto: 'I have been left without duties or with nothing to do', marca: 'ocupacion' },
      { texto: 'My schedule, pay or duties have been changed seriously and without reason', marca: 'modificacion' },
      { texto: 'It has not registered me with Social Security, does not pay my contributions or breaches health and safety at work', marca: 'grave' },
    ],
  },
  {
    id: 'sigue',
    pregunta: 'Is it still happening today?',
    si: (r) => (r.que ?? []).length > 0,
    opciones: [
      { texto: 'Yes, it is still happening', valor: 2 },
      { texto: 'It happened recently, less than a few months ago', valor: 1 },
      { texto: 'Not any more; it happened a long time ago', valor: 0 },
    ],
  },
  {
    id: 'trabajando',
    pregunta: 'Are you still going to work?',
    si: (r) => (r.que ?? []).length > 0,
    opciones: [
      { texto: 'Yes', marca: 'activo' },
      { texto: 'I am on sick leave', marca: 'baja' },
      { texto: 'I have stopped going, or I have resigned', marca: 'dejado' },
    ],
  },
  {
    id: 'escrito',
    pregunta: 'Have you complained to the company in writing?',
    si: (r) => (r.que ?? []).length > 0,
    opciones: [{ texto: 'Yes', marca: 'escrito' }, { texto: 'No' }],
  },
];

export default function TestExtincionEn() {
  return (
    <CuestionarioEn
      pasos={PASOS}
      resultado={(r) => {
        const m = marcas(r);
        const sigue = r.sigue?.[0]?.valor ?? 0;
        const causas = (r.que ?? []).length;
        const alto = causas > 0 && sigue >= 1 && !m.has('dejado');
        const puntos: string[] = [
          'This route is called termination of the contract for breach by the employer (extinción del contrato, Article 50 of the Workers’ Statute). The worker asks the judge for it.',
          'If the judge rules in your favour, you receive the same as for an unfair dismissal: 33 days per year worked (45 for the time before 2012), and you are entitled to unemployment benefit (paro).',
        ];
        if (m.has('acoso')) puntos.push('If there is harassment, you can also claim compensation for the harm suffered.');
        if (m.has('activo') || m.has('baja'))
          puntos.push(
            'While the case is going on, you generally keep working. In serious cases, such as harassment, you can ask the judge to excuse you from going while you keep being paid.',
          );
        if (m.has('dejado'))
          puntos.push(
            'Be careful: if you stop going or resign, you can lose the compensation and unemployment benefit. Call us before you take any further step.',
          );
        if (!m.has('escrito')) puntos.push('Keep a written record of each breach: it is the basis of the claim.');
        if (sigue === 0 && causas > 0) puntos.push('The breach has to be current or recent: if it happened long ago, this route is weaker.');

        return {
          nivel: m.has('dejado') ? 'alto' : alto ? 'alto' : causas > 0 ? 'medio' : 'bajo',
          titulo: m.has('dejado')
            ? 'Stop for a moment: you may be losing rights'
            : alto
              ? 'You could leave the company with compensation'
              : causas > 0
                ? 'There are grounds, but it needs looking into'
                : 'From what you say, this route does not seem to be the one for you',
          texto: m.has('dejado')
            ? 'Leaving your job on your own without going through the judge can be treated as a voluntary resignation.'
            : alto
              ? 'What you describe is the kind of serious breach that allows you to ask the judge to end your contract as if it were an unfair dismissal.'
              : causas > 0
                ? 'The breach has to be serious and, normally, current. A lawyer should assess the details.'
                : 'If your situation is different, tell us about it: there may be another way out.',
          puntos,
          enlaces: [
            { href: '/en/workplace-harassment/quitting-your-job-because-of-harassment', texto: 'Leaving your job because of harassment without losing your rights' },
            { href: '/en/tools/compensation-calculator', texto: 'Work out how much you would be owed' },
          ],
          whatsapp: `Hello, I have taken the contract termination test. What is happening: ${texto(r, 'que') || 'nothing ticked'}. Still happening? ${
            texto(r, 'sigue') || '-'
          }. Situation: ${texto(r, 'trabajando') || '-'}. I would like a lawyer to assess it.`,
        };
      }}
    />
  );
}
