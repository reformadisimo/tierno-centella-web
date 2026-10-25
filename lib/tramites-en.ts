// English version of lib/tramites.ts: same ids and order. Links point to English pages where they exist, or to the official website.
import type { Tramite } from './tramites';

export const TRAMITES_EN: Tramite[] = [
  {
    id: 'paro',
    titulo: 'Claiming unemployment benefit (paro)',
    para: 'When your contract ends or you are dismissed and you want to receive unemployment benefit (prestación por desempleo).',
    llevas: ['Your DNI or NIE', 'A bank account in your name', 'The company certificate (certificado de empresa): the company sends it to the SEPE, the public employment service; if it does not, you can ask for it'],
    pasos: ['Book an appointment with the SEPE, or apply through its online office (sede electrónica) if you have a digital certificate or Cl@ve.', 'Register as a jobseeker (demandante de empleo).', 'Apply for the benefit within 15 working days of your job ending: if you take longer, you lose the days of delay.', 'Keep the receipt of your application and attend every appointment and notice from the SEPE.'],
    consejo: 'Claim unemployment benefit even if you are challenging the dismissal. They are separate things and one does not get in the way of the other.',
    enlaces: [{ href: '/en/tools/unemployment-benefit-calculator', texto: 'Unemployment benefit calculator' }, { href: 'https://www.sepe.gob.es', texto: 'SEPE (official website)' }],
  },
  {
    id: 'conciliacion',
    titulo: 'Filing the conciliation paper (SMAC)',
    para: 'It is the first step to challenge a dismissal or claim money you are owed. Filing the conciliation paper (papeleta de conciliación) on time stops the clock while an agreement is attempted.',
    llevas: ['Your details and the company’s (name and address)', 'A clear description of what happened, with dates', 'What you are asking for (for example, that the dismissal is declared unfair, or that you are paid a certain amount)'],
    pasos: ['Fill in the paper on the online office of the SMAC, the Madrid mediation, arbitration and conciliation service (with a digital certificate, electronic DNI or Cl@ve), or file it in person at one of its registry offices in Madrid.', 'If you file it in person, you are given the summons (citación) on the spot; if you send it another way, it arrives by post.', 'Attend the conciliation hearing (acto de conciliación) on the date given. If you are offered an agreement, do not sign it until a lawyer has checked it: a badly calculated agreement cannot be undone.'],
    consejo: 'Count your deadline carefully: for a dismissal it is 20 working days.',
    enlaces: [{ href: '/en/tools/deadlines', texto: 'Work out my deadline' }, { href: 'https://www.comunidad.madrid/empleo/espacio-smac', texto: 'SMAC (official website)' }],
  },
  {
    id: 'vida-laboral',
    titulo: 'Getting your employment history report',
    para: 'To check that the company registered you and paid your social security contributions for the whole time you worked there. The report is called the informe de vida laboral.',
    llevas: ['Your DNI or NIE', 'Cl@ve, a digital certificate or an SMS to the phone linked to your social security number'],
    pasos: ['Go to the Social Security online office (sede electrónica de la Seguridad Social) and request the employment history report.', 'Read it calmly: start and end dates, type of contract and working hours.', 'If something does not add up (periods without contributions, hours different from the real ones), keep it: it may matter for your case.'],
    enlaces: [{ href: 'https://sede.seg-social.gob.es', texto: 'Social Security online office' }],
  },
  {
    id: 'inspeccion',
    titulo: 'Reporting to the Labour Inspectorate',
    para: 'If there are unpaid hours, work without being registered, harassment or serious safety breaches. You do not need a lawyer to report to the Labour Inspectorate (Inspección de Trabajo), and it costs nothing.',
    llevas: ['Your details and the company’s', 'An orderly description of the facts, with dates', 'Any evidence you have (payslips, messages, reports, witnesses)'],
    pasos: ['File the complaint through the online office or in person.', 'Explain the facts with dates and attach what you have.', 'The Inspectorate can investigate and, where appropriate, fine the company. It is a complementary route: it does not replace a court claim, and on its own it does not stop the deadlines to go to court.'],
    enlaces: [{ href: '/en/workplace-harassment/how-to-prove-workplace-harassment', texto: 'How to prove harassment' }, { href: 'https://www.mites.gob.es/itss/', texto: 'Labour Inspectorate (official website)' }],
  },
  {
    id: 'incapacidad',
    titulo: 'Applying to the INSS for permanent disability',
    para: 'If you believe your injuries or illness prevent you from working, fully or partly. The application for permanent disability (incapacidad permanente) goes to the INSS, the National Social Security Institute.',
    llevas: ['Your DNI or NIE', 'Recent and complete medical reports', 'Your contribution history'],
    pasos: ['Book an appointment with the INSS or file the application through its online office.', 'Provide your medical reports and make sure they reflect your real limitations.', 'The INSS assesses you and decides in writing. Keep the decision and note the day you receive it: if you disagree, you have 30 working days to challenge it.'],
    enlaces: [{ href: '/en/tools/permanent-disability-checker', texto: 'Permanent disability checker' }, { href: '/en/blog/how-to-apply-for-permanent-disability', texto: 'How to apply' }],
  },
  {
    id: 'fogasa',
    titulo: 'Asking FOGASA for what the company does not pay',
    para: 'If you have been awarded compensation or wages and the company cannot pay (for example, because it is insolvent or has closed). FOGASA is the Wage Guarantee Fund (Fondo de Garantía Salarial).',
    llevas: ['The ruling, the conciliation record (acta de conciliación) or the decision that recognises the debt', 'Your details and your bank account'],
    pasos: ['Check that you have the document that recognises the debt.', 'Submit your application to FOGASA, which pays within certain limits.', 'Keep the receipt of your application.'],
    consejo: 'The limits and deadlines depend on each case: it is best to ask as soon as possible.',
    enlaces: [{ href: 'https://www.mites.gob.es/fogasa/', texto: 'FOGASA (official website)' }],
  },
  {
    id: 'certificado-digital',
    titulo: 'Getting a digital certificate or Cl@ve',
    para: 'Almost all the procedures above are easier with one of these two digital keys.',
    llevas: ['Your DNI or NIE', 'A mobile phone and an email address'],
    pasos: ['Cl@ve can be requested on the website of the Tax Agency (Agencia Tributaria) or the Social Security, or at an office in person.', 'The FNMT digital certificate is requested online and then verified in person.', 'Keep them safe: they are your online identity when dealing with the authorities.'],
    enlaces: [],
  },
];
