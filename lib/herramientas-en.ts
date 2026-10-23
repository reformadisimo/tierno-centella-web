// Las herramientas en inglés: ruta española -> ruta inglesa (también las usan el selector de idioma, el menú y el buscador).
export const HERRAMIENTAS_ES_EN: Record<string, string> = {
  '/herramientas/test-acoso': '/en/tools/harassment-test',
  '/herramientas/test-nulidad': '/en/tools/void-dismissal-test',
  '/herramientas/test-extincion': '/en/tools/leave-with-compensation-test',
  '/herramientas/test-baja-laboral': '/en/tools/work-related-sick-leave-test',
  '/herramientas/mapa-de-pruebas': '/en/tools/harassment-evidence-map',
  '/calculadora-indemnizacion': '/en/tools/compensation-calculator',
  '/herramientas/revisa-tu-carta-de-despido': '/en/tools/check-your-dismissal-letter',
  '/herramientas/plazos': '/en/tools/deadlines',
  '/herramientas/calculadora-finiquito': '/en/tools/final-settlement-calculator',
  '/herramientas/calculadora-paro': '/en/tools/unemployment-benefit-calculator',
  '/herramientas/calculadora-reduccion-jornada': '/en/tools/reduced-hours-calculator',
  '/herramientas/autodiagnostico-acoso-empresas': '/en/tools/company-self-assessment',
  '/herramientas/calendario-permisos': '/en/tools/birth-leave-calendar',
  '/herramientas/comprobador-incapacidad': '/en/tools/permanent-disability-checker',
};

export const HERRAMIENTAS_EN = [
  { href: '/en/tools/harassment-test', titulo: 'Is it harassment?', texto: 'Seven questions to see whether what you are going through has the features of workplace harassment.' },
  { href: '/en/tools/harassment-evidence-map', titulo: 'Harassment evidence map', texto: 'Tick what you have and find out what you are missing to prove it.' },
  { href: '/en/tools/void-dismissal-test', titulo: 'Could my dismissal be void?', texto: 'Pregnancy, leave, retaliation, illness: when the company must take you back.' },
  { href: '/en/tools/leave-with-compensation-test', titulo: 'Can I leave with compensation?', texto: 'If the company does not pay, harasses you or leaves you without work, you can ask a judge to end your contract.' },
  { href: '/en/tools/work-related-sick-leave-test', titulo: 'Is my sick leave a work accident?', texto: 'If your sick leave comes from work, you receive more and sooner. Check it.' },
  { href: '/en/tools/compensation-calculator', titulo: 'Compensation calculator', texto: 'What you are owed for an objective or unfair dismissal, instantly.' },
  { href: '/en/tools/check-your-dismissal-letter', titulo: 'Check your dismissal letter', texto: 'The formal defects that can make your dismissal unfair.' },
  { href: '/en/tools/deadlines', titulo: 'Deadlines to claim', texto: 'The last day to challenge a dismissal, a sanction, a debt or a disability decision.' },
  { href: '/en/tools/final-settlement-calculator', titulo: 'Final settlement calculator', texto: 'Days of the last month, pending holidays and the share of extra payments.' },
  { href: '/en/tools/unemployment-benefit-calculator', titulo: 'Unemployment benefit calculator', texto: 'How much you will receive and for how many months, with 2026 limits.' },
  { href: '/en/tools/reduced-hours-calculator', titulo: 'Reduced hours calculator', texto: 'What you will earn if you reduce your hours to care, and which rights you keep.' },
  { href: '/en/tools/birth-leave-calendar', titulo: 'Birth leave calendar', texto: 'The dates of your 19 weeks, breastfeeding leave and job protection.' },
  { href: '/en/tools/permanent-disability-checker', titulo: 'Permanent disability checker', texto: 'Which degree you might be entitled to, how much it pays and your deadline.' },
  { href: '/en/tools/company-self-assessment', titulo: 'Self-assessment for companies and schools', texto: 'Do you comply with harassment protocols, the whistleblowing channel and the equality plan?' },
];
