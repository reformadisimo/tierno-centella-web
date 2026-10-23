'use client';

import CuestionarioEn, { type Paso, type Respuestas, marcas, texto } from './CuestionarioEn';

const v = (r: Respuestas, id: string) => r[id]?.[0]?.valor ?? 0;

const PASOS: Paso[] = [
  {
    id: 'conductas',
    pregunta: 'Which of these things are happening to you at work?',
    ayuda: 'Tick all that you recognise.',
    multiple: true,
    opciones: [
      { texto: 'I am shouted at, insulted or spoken to with contempt', marca: 'c' },
      { texto: 'I am criticised or ridiculed in front of others', marca: 'c' },
      { texto: 'My duties have been taken away or I am left with no work', marca: 'c' },
      { texto: 'I am given pointless or impossible tasks, or tasks below my role', marca: 'c' },
      { texto: 'I am left out of meetings, emails or information', marca: 'c' },
      { texto: 'My desk, schedule or shift is changed to push me aside', marca: 'c' },
      { texto: 'I am watched or controlled more than everyone else', marca: 'c' },
      { texto: 'Rumours or lies are spread about me', marca: 'c' },
      { texto: 'I am threatened with dismissal or sanctions for no reason', marca: 'c' },
      { texto: 'I am refused leave, holidays or training that others do get', marca: 'c' },
    ],
  },
  {
    id: 'frecuencia',
    pregunta: 'How often does it happen?',
    si: (r) => (r.conductas ?? []).length > 0,
    opciones: [
      { texto: 'Almost every day', valor: 3 },
      { texto: 'Several times a week', valor: 2 },
      { texto: 'A few times a month', valor: 1 },
      { texto: 'Very occasionally', valor: 0 },
    ],
  },
  {
    id: 'duracion',
    pregunta: 'Since when?',
    si: (r) => (r.conductas ?? []).length > 0,
    opciones: [
      { texto: 'More than six months', valor: 2 },
      { texto: 'Between one and six months', valor: 1 },
      { texto: 'Less than a month', valor: 0 },
    ],
  },
  {
    id: 'quien',
    pregunta: 'Who does it come from, mainly?',
    si: (r) => (r.conductas ?? []).length > 0,
    opciones: [
      { texto: 'A boss or manager', marca: 'jefe' },
      { texto: 'Co-workers at my level', marca: 'companeros' },
      { texto: 'People who report to me', marca: 'subordinados' },
      { texto: 'Several of them at once', marca: 'varios' },
    ],
  },
  {
    id: 'intencion',
    pregunta: 'Do you feel that what they want is for you to leave, or to break you?',
    si: (r) => (r.conductas ?? []).length > 0,
    opciones: [
      { texto: 'Yes, I am sure of it', valor: 2 },
      { texto: 'Sometimes I think so', valor: 1 },
      { texto: 'No, it is a bad atmosphere we all suffer', valor: 0, marca: 'general' },
    ],
  },
  {
    id: 'salud',
    pregunta: 'Is it affecting your health?',
    opciones: [
      { texto: 'Yes, and I am or have been on sick leave', marca: 'baja' },
      { texto: 'Yes: I sleep badly, I have anxiety or I take medication', marca: 'salud' },
      { texto: 'Not for now' },
    ],
  },
  {
    id: 'empresa',
    pregunta: 'Have you told the company?',
    opciones: [
      { texto: 'Yes, in writing', marca: 'escrito' },
      { texto: 'Only verbally', marca: 'palabra' },
      { texto: 'No', marca: 'nada' },
    ],
  },
];

export default function TestAcosoEn() {
  return (
    <CuestionarioEn
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
        if (alto || medio) puntos.push('Start a diary today: date, time, what happened and who saw it. It is the evidence that carries most weight.');
        if (m.has('nada') || m.has('palabra'))
          puntos.push('Tell the company in writing. From that moment it cannot say it did not know, and it will be obliged to act.');
        if (m.has('baja') || m.has('salud'))
          puntos.push(
            'Tell your doctor that what is happening to you comes from work. If you are on sick leave, you can ask for it to be treated as a work accident (accidente de trabajo).',
          );
        if (m.has('jefe')) puntos.push('If it comes from a manager, the company is liable and, since 2005, the harasser can also be held personally liable.');
        if (m.has('companeros')) puntos.push('Harassment between co-workers is harassment too: the company is liable if it knows and does nothing.');
        if (m.has('general'))
          puntos.push(
            'If the bad atmosphere affects everyone, it may not be harassment of one person, but it is a psychosocial risk that the company must assess.',
          );

        const resumen = `Hello, I have taken the harassment test on your website. What happens to me: ${texto(r, 'conductas') || 'nothing specific'}. How often: ${
          texto(r, 'frecuencia') || '-'
        }. For how long: ${texto(r, 'duracion') || '-'}. It comes from: ${texto(r, 'quien') || '-'}. Health: ${texto(r, 'salud')}. I would like a lawyer to assess it.`;

        return {
          nivel: alto ? 'alto' : medio ? 'medio' : 'bajo',
          titulo: alto
            ? 'What you describe has the features of workplace harassment (acoso laboral)'
            : medio
              ? 'There are signs you should take seriously'
              : 'From what you say, it does not look like harassment, at least for now',
          texto: alto
            ? 'Hostile behaviour that is repeated often and over months: that is what judges call harassment. It is not a certainty, but it is a reason to act now.'
            : medio
              ? 'Some behaviour is repeated, although not yet as often or for as long as in typical harassment. If it continues, it is best to have the evidence from the start.'
              : 'A conflict or a bad atmosphere is not harassment, but it can also be resolved. If something is not covered by the test, tell us.',
          puntos,
          enlaces: [
            { href: '/en/tools/harassment-evidence-map', texto: 'Evidence map: what you have and what you are missing' },
            { href: '/en/workplace-harassment/what-you-can-claim-for-harassment', texto: 'What you can claim for harassment' },
            { href: '/en/tools/leave-with-compensation-test', texto: 'Can I leave the company with compensation?' },
          ],
          whatsapp: resumen,
        };
      }}
    />
  );
}
