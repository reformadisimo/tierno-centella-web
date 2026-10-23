'use client';

import CuestionarioEn, { type Paso, marcas, texto } from './CuestionarioEn';

// The Spanish version checks whether the answer starts with 'Fin de contrato'; this is the same check on the English text.
const FIN_DE_CONTRATO = 'End of contract';

const PASOS: Paso[] = [
  {
    id: 'tipo',
    pregunta: 'What does your dismissal letter say?',
    opciones: [
      { texto: 'Disciplinary dismissal (despido disciplinario)', ayuda: 'You are accused of misconduct' },
      { texto: 'Objective dismissal (despido objetivo)', ayuda: 'Economic, technical, organisational or production reasons' },
      { texto: 'I was not given a letter, or it does not say clearly' },
      { texto: `${FIN_DE_CONTRATO}, or I did not pass the probation period` },
    ],
  },
  {
    id: 'familia',
    pregunta: 'Were you in any of these situations when you were dismissed?',
    ayuda: 'Tick all that apply.',
    multiple: true,
    opciones: [
      { texto: 'Pregnant', marca: 'objetiva' },
      { texto: 'On birth, adoption or foster care leave, or back from it less than 12 months before', marca: 'objetiva' },
      { texto: 'On breastfeeding leave, or with reduced hours to care for children or relatives', marca: 'objetiva' },
      { texto: 'You had requested or were on a leave of absence (excedencia) to care for children or relatives', marca: 'objetiva' },
      { texto: 'A victim of gender-based or sexual violence, exercising your employment rights', marca: 'objetiva' },
    ],
  },
  {
    id: 'represalia',
    pregunta: 'And any of these?',
    multiple: true,
    opciones: [
      { texto: 'I had made a claim to the company, gone to the Labour Inspectorate or to court, or reported harassment', marca: 'indemnidad' },
      { texto: 'I was on sick leave, or I have an illness the company knew about', marca: 'enfermedad' },
      { texto: 'I am a workers’ representative, or a union member active in the union', marca: 'sindical' },
      { texto: 'I think I am being dismissed because of my age, origin, sex, orientation, religion or a disability', marca: 'discriminacion' },
      { texto: 'I had been on strike', marca: 'sindical' },
    ],
  },
  {
    id: 'cerca',
    pregunta: 'How much time passed between that and the dismissal?',
    si: (r) => {
      const m = marcas(r);
      return m.has('indemnidad') || m.has('enfermedad') || m.has('sindical') || m.has('discriminacion');
    },
    opciones: [
      { texto: 'Days or a few weeks', valor: 2 },
      { texto: 'A few months', valor: 1 },
      { texto: 'More than six months', valor: 0 },
    ],
  },
];

export default function TestNulidadEn() {
  return (
    <CuestionarioEn
      pasos={PASOS}
      resultado={(r) => {
        const m = marcas(r);
        const cerca = r.cerca?.[0]?.valor ?? 0;
        const objetiva = m.has('objetiva');
        const indicios = m.has('indemnidad') || m.has('enfermedad') || m.has('sindical') || m.has('discriminacion');
        const finContrato = texto(r, 'tipo').startsWith(FIN_DE_CONTRATO);

        const puntos: string[] = [];
        if (objetiva)
          puntos.push(
            'In these situations the law protects you automatically: unless the company proves a real and serious cause, the dismissal is void even if it is not proved that you were dismissed for that reason.',
          );
        if (m.has('indemnidad'))
          puntos.push(
            'Dismissing someone for making a claim or a complaint is prohibited retaliation (garantía de indemnidad). The closer in time, the stronger the indication.',
          );
        if (m.has('enfermedad'))
          puntos.push(
            'Since 2022 the law prohibits discrimination on grounds of illness. Not every dismissal during sick leave is void, but if the real reason is the sick leave, it can be.',
          );
        if (m.has('sindical')) puntos.push('Union activity and strikes are protected as fundamental rights.');
        if (m.has('discriminacion'))
          puntos.push('If there are signs of discrimination, it is the company that has to prove the dismissal has nothing to do with it.');
        if (finContrato)
          puntos.push('The end of a contract or a failed probation period can also be void if it hides any of these reasons.');
        puntos.push(
          'If the dismissal is declared void, the company has to take you back and pay you the wages you did not receive. You can also claim damages.',
        );

        const alto = objetiva || (indicios && cerca >= 1);
        const medio = !alto && indicios;
        return {
          nivel: alto ? 'alto' : medio ? 'medio' : 'bajo',
          titulo: alto
            ? 'Your dismissal could be void (despido nulo)'
            : medio
              ? 'There are signs worth looking into'
              : 'From what you say, there are no clear grounds for a void dismissal',
          texto: alto
            ? 'You have ticked a situation that the law gives special protection. A lawyer should look at your case before the 20 working days to challenge it run out.'
            : medio
              ? 'There is a possible ground for a void dismissal, although the time that has passed weakens it. It depends a lot on the details.'
              : 'That does not mean the dismissal is fair: it can be unfair (improcedente) if the reason is not proved or the letter has defects.',
          puntos,
          aviso:
            'You have 20 working days from the dismissal to file the conciliation claim (papeleta de conciliación). The deadline is the same whether it is void or unfair.',
          enlaces: [
            { href: '/en/tools/check-your-dismissal-letter', texto: 'Check the defects in your letter' },
            { href: '/en/tools/deadlines', texto: 'Work out your last day to challenge it' },
            { href: '/en/dismissal/when-is-a-dismissal-void', texto: 'When a dismissal is void, explained' },
          ],
          whatsapp: `Hello, I have taken the void dismissal test. Type: ${texto(r, 'tipo')}. Situation: ${
            [texto(r, 'familia'), texto(r, 'represalia')].filter(Boolean).join('; ') || 'none ticked'
          }. I would like a lawyer to look at it.`,
        };
      }}
    />
  );
}
