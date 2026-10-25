// English version of lib/faq.ts: same questions, same order and same `tema` values. Legal data reviewed in October 2026.
import { DESPACHO } from './despacho';
import type { Pregunta } from './faq';

export const FAQ_EN: Pregunta[] = [
  // Workplace harassment
  {
    tema: 'acoso',
    pregunta: 'How do I know if what is happening to me is workplace harassment?',
    respuesta:
      'We speak of workplace harassment (acoso laboral) when there is hostile or humiliating behaviour that is repeated over time and harms your dignity or your health: shouting, mockery, isolation, taking tasks away from you or giving you impossible work. A one-off conflict or an order you do not like is not harassment on its own. The harassment test on this website can help you get your bearings, although every case needs to be assessed in detail.',
  },
  {
    tema: 'acoso',
    pregunta: 'How can I prove the harassment?',
    respuesta:
      'With anything that leaves a trace: emails, messages, recordings of conversations you take part in, witnesses, medical reports and a diary with dates and facts. You do not need perfect proof: it is enough to provide reasonable indications (indicios) so that it is the company that has to justify its conduct. The evidence map on this website is a guide to gathering them.',
  },
  {
    tema: 'acoso',
    pregunta: 'How long do I have to make a harassment claim?',
    respuesta:
      'It depends on what you are claiming. If the harassment is still going on, the clock does not start while it lasts. Claims for damages through the employment courts generally expire after one year, and if you are a public employee claiming against the authorities for financial liability (responsabilidad patrimonial), you also have one year. If you are dismissed, the deadline to challenge the dismissal is only 20 working days. The deadlines calculator can help you get your bearings.',
  },
  {
    tema: 'acoso',
    pregunta: 'Is the company responsible for harassment by a manager or a colleague?',
    respuesta:
      'Yes, if it did not prevent it or did not act once it knew about it. The company has a duty to protect your health, assess psychosocial risks and apply its anti-harassment protocol. The courts can also order the harasser to pay alongside the company.',
  },
  {
    tema: 'acoso',
    pregunta: 'Is workplace harassment a crime?',
    respuesta:
      'It can be. Since 2010, article 173.1 of the Criminal Code (Código Penal) has punished serious and repeated workplace harassment carried out from a position of superiority, with prison sentences of 6 months to 2 years. Most cases are resolved through the employment courts, but in the most serious ones the criminal route is worth considering.',
  },
  {
    tema: 'acoso',
    pregunta: 'Can I be dismissed for reporting harassment?',
    respuesta:
      'They should not. The law protects you against retaliation for defending your rights (garantía de indemnidad). If you are dismissed for having reported it, the dismissal may be declared void (nulo), with reinstatement, back pay and compensation for non-material damage.',
  },

  // Dismissal
  {
    tema: 'despido',
    pregunta: 'How long do I have to challenge a dismissal?',
    respuesta:
      'Twenty working days from the day after the dismissal takes effect. Saturdays, Sundays and public holidays do not count, but August does. Within that time you must file the conciliation paper (papeleta de conciliación), which in Madrid is handled by the SMAC. You can work out your date with the deadlines calculator.',
  },
  {
    tema: 'despido',
    pregunta: 'What compensation am I entitled to if the dismissal is unfair?',
    respuesta:
      'Thirty-three days’ pay per year worked, up to a maximum of 24 months’ pay. If you started working before 12 February 2012, the time before that date is calculated at 45 days per year. You can get an estimate with the compensation calculator.',
  },
  {
    tema: 'despido',
    pregunta: 'What is the difference between an unfair dismissal and a void one?',
    respuesta:
      'With an unfair dismissal (despido improcedente), the company can choose between taking you back or paying you compensation. With a void dismissal (despido nulo), which applies to discrimination, breaches of fundamental rights or protected situations such as pregnancy, reinstatement is compulsory and you are paid the wages you missed.',
  },
  {
    tema: 'despido',
    pregunta: 'Do I have to sign the dismissal letter and the final settlement?',
    respuesta:
      'You can sign to acknowledge receipt, but write "recibí, no conforme" (received, not in agreement) next to your signature. That makes it clear you do not agree and that you are not giving up your right to claim.',
  },
  {
    tema: 'despido',
    pregunta: 'Can I be dismissed without being heard first?',
    respuesta:
      'Not in a disciplinary dismissal. Since the Supreme Court (Tribunal Supremo) ruling of 18 November 2024, the company must give you the chance to defend yourself against the accusations before dismissing you. If it does not, the Supreme Court has held that the dismissal is unfair.',
  },
  {
    tema: 'despido',
    pregunta: 'Can I claim unemployment benefit if I challenge the dismissal?',
    respuesta:
      'Yes. You can apply for unemployment benefit (prestación por desempleo) as soon as you are dismissed, even if you are going to challenge the dismissal, as long as you have paid contributions for the minimum time. You do not have to wait for the trial.',
  },

  // Permanent disability
  {
    tema: 'incapacidad',
    pregunta: 'What degrees of permanent disability are there and how much do they pay?',
    respuesta:
      'There are four. Partial disability is paid as a single lump sum of 24 months of your benefit base (base reguladora). Total disability, with a pension of 55 % (75 % if you are 55 or over and meet the requirements). Absolute disability, with 100 %. And severe disability (gran incapacidad), with the corresponding pension plus a supplement to pay whoever helps you.',
  },
  {
    tema: 'incapacidad',
    pregunta: 'What do I do if the INSS turns down my disability?',
    respuesta:
      'File a prior claim (reclamación previa) with the INSS within 30 working days of being notified. If it rejects it or does not answer within 45 working days, you have another 30 working days to bring a claim before the Social Court (Juzgado de lo Social), where a judge will review your case.',
  },
  {
    tema: 'incapacidad',
    pregunta: 'Do I lose my job if I am granted permanent disability?',
    respuesta:
      'Not automatically. Since Law 2/2025 (Ley 2/2025), in force since 1 May 2025, you can say in writing within 10 calendar days that you want to stay, and the company must try to adapt your job or move you to another one. It can only end the contract if it shows that this is not possible.',
  },
  {
    tema: 'incapacidad',
    pregunta: 'Can I work if I have total permanent disability?',
    respuesta:
      'Yes, in a profession different from your usual one. If you stay in your same job, adapted, the pension is suspended while you work that way.',
  },
  {
    tema: 'incapacidad',
    pregunta: 'Why does it matter whether my sick leave counts as a work accident rather than a common illness?',
    respuesta:
      'Because if it comes from work, no previous contributions are required and the pension is calculated on your real wages, which usually gives a higher amount. If you think your sick leave has been classified wrongly, you can ask the INSS to determine its cause (determinación de contingencia).',
  },
  {
    tema: 'incapacidad',
    pregunta: 'What is the medical tribunal?',
    respuesta:
      'That is the popular name for the INSS Disability Assessment Team (Equipo de Valoración de Incapacidades, EVI). It reviews your reports, may examine you and issues an opinion on whether you have a disability and to what degree. It is a good idea to bring specialists’ reports that describe specific limitations for your job.',
  },

  // The firm
  {
    tema: 'despacho',
    pregunta: 'How much does the consultation cost?',
    respuesta: `By phone or WhatsApp we tell you whether your case needs a consultation and what it costs, before you book. The one-hour consultation with your documents costs ${DESPACHO.precioCita} € + VAT with a lawyer from the firm and ${DESPACHO.precioCitaJesus} € + VAT with Jesús Tierno.`,
  },
  {
    tema: 'despacho',
    pregunta: 'Do you see clients by video call?',
    respuesta:
      'Yes. We can hold the consultation by video call if you cannot or would rather not come to the office. All you need is a mobile phone or computer with a connection.',
  },
  {
    tema: 'despacho',
    pregunta: 'Where is the office?',
    respuesta: `At ${DESPACHO.direccion}, ${DESPACHO.ciudad}. You can call us on +34 ${DESPACHO.telefono} or message us on WhatsApp at +34 ${DESPACHO.whatsapp} to make an appointment.`,
  },
  {
    tema: 'despacho',
    pregunta: 'Do you take cases outside Madrid?',
    respuesta:
      'Yes. We help workers from all over Spain by video call, phone and email. Our office is in Madrid; if your case needs anything done in person in another city, we explain how it would be organised from the first consultation.',
  },
  {
    tema: 'despacho',
    pregunta: 'What documents should I bring to the consultation?',
    respuesta:
      'Whatever you have related to the case: your contract, latest payslips, the dismissal or sanction letter if there is one, your employment history report (informe de vida laboral), medical reports or INSS decisions, and any email, message or recording that may serve as evidence. If you have a summary of what happened with dates, bring that too. If you are missing something, it does not matter: we will look at it together.',
  },
  {
    tema: 'despacho',
    pregunta: 'Do you work on a no-win, no-fee basis?',
    respuesta:
      'It depends on the case. In the first consultation we explain clearly how the fees would be calculated and what options there are, before you make any decision.',
  },
];
