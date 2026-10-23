// English version of the firm's cases (lib/casos.ts). Same slugs; only the texts are translated.
export type CasoEn = { titulo: string; materia: string; organo: string; fecha: string; resumen: string; hechos: string[]; resultado: string; porQueImporta: string };
export const CASOS_EN: Record<string, CasoEn> = {
  'primera-condena-al-acosador-2005': {
    titulo: 'The first ruling in Spain against both the company and the harasser',
    materia: 'Workplace harassment',
    organo: 'Social Court No. 29 of Madrid (Juzgado de lo Social n.º 29). Upheld by the High Court of Justice of Madrid (TSJ de Madrid)',
    fecha: '30 September 2005',
    resumen:
      'For three years, a worker was harassed by his managing director until he was dismissed. The court ordered the company and the director, jointly and severally, to pay him 30,000 euros in compensation.',
    hechos: [
      'Frequent shouting in front of others.',
      'Mockery imitating his gestures.',
      'Humiliating remarks aimed at making him leave the company.',
    ],
    resultado:
      'The company and the harasser were ordered, jointly and severally, to pay 30,000 euros. The High Court of Justice of Madrid dismissed the appeal.',
    porQueImporta:
      'Until then, claims were brought against the company. This ruling also made the person doing the harassing answer for it, with their own assets.',
  },
  'acoso-administracion-educativa-castilla-y-leon-2011': {
    titulo: 'The Castilla y León Department of Education held to account for harassment',
    materia: 'Workplace harassment',
    organo:
      'High Court of Justice of Castilla y León (TSJ de Castilla y León), Valladolid, Contentious-Administrative Chamber (Sala de lo Contencioso-Administrativo), Section 3. Judgment 2491/2011',
    fecha: '2 November 2011',
    resumen:
      'A workshop teacher at the León School of Art brought a claim against the public authorities for failing to protect her from a superior\'s harassment over several school years. The firm presents it as the first ruling for harassment against the education authorities of Castilla y León.',
    hechos: [
      'False accusations, insults and humiliating treatment by a head of department over several school years.',
      'Blocking of the workshop\'s resources and criticism of her work.',
      'Sick leave with depression linked to the harassment.',
    ],
    resultado: 'Claim for the financial liability of the public authorities for failing to act against the psychosocial risk.',
    porQueImporta:
      'It opened the way for teachers in public education to bring claims against the authorities themselves when they fail to protect them.',
  },
  'urjc-123000-euros-docente-2024': {
    titulo: '123,000 euros for a professor whose university did not protect her',
    materia: 'Workplace harassment',
    organo: 'Rey Juan Carlos University (Universidad Rey Juan Carlos)',
    fecha: 'April 2024',
    resumen:
      'Rey Juan Carlos University was ordered to pay 122,963 euros to a full professor for failing to prevent the workplace harassment she was suffering and for not applying psychosocial risk prevention measures.',
    hechos: ['Ongoing harassment in her department.', 'The university did not activate psychosocial risk prevention.'],
    resultado: 'Compensation of 122,963 euros.',
    porQueImporta: 'It is a reminder that the employer or the public authority is liable when it knows about harassment and does nothing.',
  },
  'despido-represalia-permiso-hija-2025': {
    titulo: 'Dismissed for asking for leave to attend her daughter\'s school activity',
    materia: 'Work-life balance',
    organo: 'Pending confirmation with the firm.',
    fecha: 'October 2025',
    resumen:
      'The court found that the dismissal was retaliation because the worker had asked for leave to attend a school activity of her young daughter.',
    hechos: ['The worker asked for leave to attend a school activity of her daughter.', 'Shortly afterwards, the company dismissed her.'],
    resultado:
      'Breach of the guarantee of protection against retaliation (garantía de indemnidad), and compensation for damages equivalent to that for an unfair dismissal.',
    porQueImporta: 'Asking for what the law gives you to care for your children cannot cost you your job.',
  },
  'degradada-tras-pedir-permisos-2025': {
    titulo: 'Demoted for asking for leave to care for her sick partner',
    materia: 'Work-life balance',
    organo: 'Pending confirmation with the firm.',
    fecha: 'May 2025',
    resumen:
      'After asking for leave because of her partner\'s illness, a manager lost her position and part of her income, and was moved to administrative tasks. The court terminated her contract with compensation.',
    hechos: ['Loss of her management position.', 'Reduced income.', 'Relegated to administrative tasks.'],
    resultado:
      'Termination of the contract at the worker\'s request, with compensation and recognition that her fundamental rights had been violated.',
    porQueImporta:
      'A disguised change to working conditions as punishment for caring for someone is discriminatory, and allows you to leave with compensation.',
  },
  'despido-nulo-represalia-denuncia-interna-2025': {
    titulo: 'An "objective" dismissal that was really retaliation, declared null and void',
    materia: 'Dismissal',
    organo: 'Pending confirmation with the firm.',
    fecha: 'September 2025',
    resumen:
      'The company claimed objective grounds, but the dismissal was because the worker had reported internal irregularities. The court declared it null and void.',
    hechos: ['Internal report of irregularities.', 'Subsequent dismissal on alleged objective grounds.'],
    resultado: 'Null and void dismissal: reinstatement and back pay for the duration of the proceedings (salarios de tramitación).',
    porQueImporta: 'Reporting wrongdoing within the company is protected. If you are dismissed for it, the dismissal is null and void.',
  },
  'prevencion-riesgos-centro-educativo-2025': {
    titulo: 'A teacher with a disability whose job was not adapted',
    materia: 'Occupational health and safety',
    organo: 'Pending confirmation with the firm. Trial held on 22 October 2025',
    fecha: 'November 2025',
    resumen:
      'A worker at a school with a 39% disability following a workplace accident asked for her job to be adapted. This was not done, her conditions worsened and she suffered psychological harm. The court found a complete failure to act on occupational risk prevention.',
    hechos: [
      'Workplace accident and a recognised 39% disability.',
      'Requests to adapt her job ignored since 2018.',
      'Conflict with the management team and psychological harm.',
    ],
    resultado: 'Favourable ruling for breach of occupational risk prevention regulations.',
    porQueImporta: 'Failing to adapt the job of someone who needs it is a breach that carries compensation.',
  },
  'despido-prueba-gps': {
    titulo: 'A dismissal based on GPS data that did not hold up',
    materia: 'Dismissal',
    organo: 'Pending confirmation with the firm.',
    fecha: 'Pending',
    resumen: 'In a video, the firm explains a case it won in which the use of geolocation as evidence for a dismissal was disputed.',
    hechos: ['The company used GPS data to justify the dismissal.'],
    resultado: 'Ruling in favour of the worker, according to the firm.',
    porQueImporta: 'Technological monitoring has limits, and the company must inform workers about it before using it as evidence.',
  },
};
