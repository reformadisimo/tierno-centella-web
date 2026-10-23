// Las cuatro áreas de la versión inglesa: textos de cabecera, plazos clave y herramientas en inglés.
export type AreaEn = {
  slug: string;
  carpeta: string;
  es: string;
  menu: string;
  titulo: string;
  tituloSeo: string;
  descripcion: string;
  h1: string;
  entradilla: string;
  foto: string;
  fotoAlt: string;
  plazo: { cifra: string; texto: string };
  puntos: string[];
  herramientas: { href: string; texto: string }[];
};

export const AREAS_EN: AreaEn[] = [
  {
    slug: 'workplace-harassment',
    carpeta: 'acoso',
    es: '/acoso-laboral',
    menu: 'Workplace harassment',
    titulo: 'Workplace harassment lawyers in Madrid',
    tituloSeo: 'Workplace harassment lawyers in Madrid',
    descripcion:
      'Specialists in workplace harassment (mobbing) in Spain for over 25 years. How to recognise it, prove it and claim. English-speaking employment lawyers in Madrid.',
    h1: 'Workplace harassment can be proved, and it can be won.',
    entradilla:
      'We have focused on workplace harassment for over 25 years. In 2005 we obtained the first ruling in Spain that ordered both the company and the harasser personally to compensate the victim.',
    foto: 'acoso-tension',
    fotoAlt: 'A manager points his finger at a worker who holds her head in her hand',
    plazo: { cifra: '1 year', texto: 'is the general deadline to claim damages, usually counted from when the harassment stops. If you are dismissed, only 20 working days.' },
    puntos: [
      'Repeated hostile treatment that seeks to isolate, humiliate or push you out can be workplace harassment.',
      'You do not need perfect evidence to start: a diary, messages, medical reports and witnesses add up.',
      'You can claim against the company and against the harasser, and in some cases end your contract with compensation.',
    ],
    herramientas: [
      { href: '/en/tools/harassment-test', texto: 'Is it harassment? Take the test' },
      { href: '/en/tools/harassment-evidence-map', texto: 'Evidence map' },
    ],
  },
  {
    slug: 'dismissal',
    carpeta: 'despido',
    es: '/despido',
    menu: 'Dismissal',
    titulo: 'Dismissal lawyers in Madrid',
    tituloSeo: 'Dismissal lawyers in Madrid (Spain)',
    descripcion:
      'Dismissed in Spain? You have 20 working days to challenge it. Types of dismissal, when it is void, compensation and deadlines, explained in English.',
    h1: 'Dismissed in Spain? The clock is already running.',
    entradilla:
      'You have 20 working days from your dismissal to challenge it. We check your dismissal letter, tell you what you are owed and whether the dismissal could be unfair or even void.',
    foto: 'despido-caja',
    fotoAlt: 'A worker carries a box with their belongings',
    plazo: { cifra: '20 working days', texto: 'to file the conciliation claim from the day after your dismissal. Weekends and public holidays do not count; August does.' },
    puntos: [
      'An unfair dismissal (despido improcedente) gives you 33 days of salary per year worked, with a cap.',
      'A void dismissal (despido nulo) means you get your job back and the salary you missed.',
      'Do not sign anything without reading it: you can sign the settlement "no conforme" (not in agreement).',
    ],
    herramientas: [
      { href: '/en/tools/compensation-calculator', texto: 'Compensation calculator' },
      { href: '/en/tools/deadlines', texto: 'Deadline calculator' },
      { href: '/en/tools/check-your-dismissal-letter', texto: 'Check your dismissal letter' },
    ],
  },
  {
    slug: 'permanent-disability',
    carpeta: 'incapacidad',
    es: '/incapacidad-permanente',
    menu: 'Permanent disability',
    titulo: 'Permanent disability lawyers in Madrid',
    tituloSeo: 'Permanent disability lawyers in Madrid',
    descripcion:
      'Permanent disability (incapacidad permanente) in Spain: degrees, amounts, appeals if the INSS denies it, and your job afterwards. Explained in English.',
    h1: 'Permanent disability denied? It can be appealed.',
    entradilla:
      'Many denied permanent disability claims are won later, in court. We review the decision and your medical reports, tell you which degree to ask for, and claim it before the INSS and, if needed, in court.',
    foto: 'incapacidad-ventana',
    fotoAlt: 'A woman looks out of an office window',
    plazo: { cifra: '30 working days', texto: 'to file the prior claim (reclamación previa) from when you are notified of the decision. If you miss it, you lose that route.' },
    puntos: [
      'There are four degrees: partial, total, absolute and severe disability. Each one pays differently.',
      'What decides the degree is your medical condition and your usual job, not only the diagnosis.',
      'Since Law 2/2025, a permanent disability no longer ends your contract automatically.',
    ],
    herramientas: [{ href: '/en/tools/permanent-disability-checker', texto: 'Disability checker' }],
  },
  {
    slug: 'women-at-work',
    carpeta: 'mujer',
    es: '/mujer-y-trabajo',
    menu: 'Women at work',
    titulo: 'Your rights as a working woman in Spain',
    tituloSeo: 'Pregnancy, leave and work rights in Spain',
    descripcion:
      'Dismissal during pregnancy, reduced hours, birth leave, sexual harassment and equal pay in Spain, explained in English by employment lawyers in Madrid.',
    h1: 'Pregnant, with children or caring for someone: your job is protected.',
    entradilla:
      'A dismissal during pregnancy or in the year after you return is void unless there is a real reason. Reducing your hours to care is a right. Sexual harassment, or harassment because you are a woman, is not tolerated. We explain it without the small print.',
    foto: 'madre-hijo',
    fotoAlt: 'A mother plays with her young son',
    plazo: { cifra: '20 working days', texto: 'to challenge a dismissal, also during pregnancy, birth leave or breastfeeding. Act quickly.' },
    puntos: [
      'A dismissal during pregnancy, birth leave or breastfeeding is void unless the company proves a real cause.',
      'You can reduce or adapt your working hours to care for your children.',
      'Equal pay for equal work is the law, and companies must keep a pay register.',
    ],
    herramientas: [
      { href: '/en/tools/birth-leave-calendar', texto: 'Birth leave calendar' },
      { href: '/en/tools/reduced-hours-calculator', texto: 'Reduced hours calculator' },
    ],
  },
];

export const areaEn = (slug: string) => AREAS_EN.find((a) => a.slug === slug);
