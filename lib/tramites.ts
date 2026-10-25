// Trámites que cualquiera puede hacer por su cuenta, sin abogado. Generales y orientativos; los enlaces oficiales están en /recursos.
export type Tramite = { id: string; titulo: string; para: string; llevas: string[]; pasos: string[]; consejo?: string; enlaces: { href: string; texto: string }[] };

export const TRAMITES: Tramite[] = [
  {
    id: 'paro',
    titulo: 'Pedir el paro',
    para: 'Cuando se acaba tu contrato o te despiden y quieres cobrar la prestación por desempleo.',
    llevas: ['DNI o NIE', 'Una cuenta bancaria a tu nombre', 'El certificado de empresa (la empresa lo envía al SEPE; si no lo hace, puedes reclamarlo)'],
    pasos: ['Pide cita en el SEPE, o hazlo en su sede electrónica si tienes certificado digital o Cl@ve.', 'Inscríbete como demandante de empleo.', 'Solicita la prestación en los 15 días hábiles siguientes al cese: si tardas más, pierdes los días de retraso.', 'Guarda el justificante de la solicitud y atiende las citas y comunicaciones del SEPE.'],
    consejo: 'Pide el paro aunque estés reclamando el despido. Son cosas distintas y no se estorban.',
    enlaces: [{ href: '/herramientas/calculadora-paro', texto: 'Calculadora del paro' }, { href: '/herramientas/genera-tu-carta', texto: 'Pedir el certificado de empresa' }, { href: '/recursos#paro-seguridad-social', texto: 'SEPE y Seguridad Social' }],
  },
  {
    id: 'conciliacion',
    titulo: 'Presentar la papeleta de conciliación (SMAC)',
    para: 'Es el primer paso para reclamar un despido o dinero que te deben. Presentarla dentro del plazo detiene el reloj mientras se intenta un acuerdo.',
    llevas: ['Tus datos y los de la empresa (nombre y dirección)', 'Una descripción clara de lo ocurrido, con fechas', 'Lo que pides (por ejemplo, que el despido se declare improcedente o que te paguen una cantidad)'],
    pasos: ['Rellena la papeleta en la oficina virtual del SMAC (con certificado digital, DNIe o Cl@ve) o preséntala en persona en uno de sus registros en Madrid.', 'Si la presentas en persona, te entregan la citación al momento; si la envías por otros medios, te llega por correo.', 'Acude al acto de conciliación el día citado. Si te ofrecen un acuerdo, no lo firmes sin que lo revise un abogado: un acuerdo mal calculado no se puede deshacer.'],
    consejo: 'Cuenta bien tu plazo: en un despido son 20 días hábiles.',
    enlaces: [{ href: '/herramientas/plazos', texto: 'Calcular mi plazo' }, { href: '/donde-ir', texto: 'Dónde está el SMAC' }, { href: '/herramientas/calculadora-oferta-acuerdo', texto: '¿Es buena la oferta?' }],
  },
  {
    id: 'vida-laboral',
    titulo: 'Pedir tu informe de vida laboral',
    para: 'Para comprobar que la empresa te dio de alta y cotizó por ti durante todo el tiempo que trabajaste.',
    llevas: ['DNI o NIE', 'Cl@ve, certificado digital o un SMS al teléfono asociado a tu número de la Seguridad Social'],
    pasos: ['Entra en la sede electrónica de la Seguridad Social y pide el informe de vida laboral.', 'Revísalo con calma: fechas de alta y baja, tipo de contrato y jornada.', 'Si algo no cuadra (periodos sin cotizar, jornada distinta a la real), guárdalo: puede ser importante para tu caso.'],
    enlaces: [{ href: '/herramientas/que-guardar', texto: 'Qué tengo que guardar' }, { href: '/recursos#paro-seguridad-social', texto: 'Sede de la Seguridad Social' }],
  },
  {
    id: 'inspeccion',
    titulo: 'Denunciar ante la Inspección de Trabajo',
    para: 'Si hay horas sin pagar, trabajo sin alta, acoso o incumplimientos graves de seguridad. No hace falta abogado y no cuesta dinero.',
    llevas: ['Tus datos y los de la empresa', 'Una descripción ordenada de los hechos, con fechas', 'Las pruebas que tengas (nóminas, mensajes, partes, testigos)'],
    pasos: ['Presenta la denuncia por la sede electrónica o en persona.', 'Explica los hechos con fechas y adjunta lo que tengas.', 'La Inspección puede investigar y, si procede, sancionar a la empresa. Es una vía complementaria: no sustituye a la demanda, y no detiene por sí sola los plazos para reclamar ante el juzgado.'],
    enlaces: [{ href: '/acoso-laboral/como-demostrar-el-acoso', texto: 'Cómo demostrar el acoso' }, { href: '/recursos#despido-conflicto', texto: 'Inspección de Trabajo' }],
  },
  {
    id: 'incapacidad',
    titulo: 'Pedir una incapacidad permanente al INSS',
    para: 'Si crees que tus lesiones o enfermedad te impiden trabajar, total o parcialmente.',
    llevas: ['DNI o NIE', 'Informes médicos recientes y completos', 'Tu historial de cotización'],
    pasos: ['Pide cita previa en el INSS o presenta la solicitud por su sede electrónica.', 'Aporta los informes médicos y asegúrate de que reflejan tus limitaciones reales.', 'El INSS te valora y resuelve por escrito. Guarda la resolución y apunta el día en que la recibes: si no estás de acuerdo, el plazo para reclamar es de 30 días hábiles.'],
    enlaces: [{ href: '/herramientas/comprobador-incapacidad', texto: 'Comprobador de incapacidad' }, { href: '/blog/como-solicitar-la-incapacidad-permanente', texto: 'Cómo solicitarla' }],
  },
  {
    id: 'fogasa',
    titulo: 'Pedir al FOGASA lo que la empresa no paga',
    para: 'Si te han reconocido una indemnización o salarios y la empresa no puede pagar (por ejemplo, porque está en concurso o ha cerrado).',
    llevas: ['La sentencia, el acta de conciliación o la resolución que reconoce la deuda', 'Tus datos y tu cuenta bancaria'],
    pasos: ['Comprueba que tienes el documento que reconoce la deuda.', 'Presenta la solicitud al FOGASA, que paga dentro de unos límites.', 'Conserva el justificante de la solicitud.'],
    consejo: 'Los topes y los plazos dependen de cada caso: conviene preguntar cuanto antes.',
    enlaces: [{ href: '/recursos#despido-conflicto', texto: 'FOGASA' }],
  },
  {
    id: 'certificado-digital',
    titulo: 'Conseguir el certificado digital o Cl@ve',
    para: 'Casi todos los trámites anteriores se hacen más fácil con una de estas dos claves.',
    llevas: ['DNI o NIE', 'Un teléfono móvil y un correo electrónico'],
    pasos: ['Cl@ve se puede pedir en la sede de la Agencia Tributaria o de la Seguridad Social, o en una oficina presencial.', 'El certificado digital de la FNMT se solicita por internet y se valida en persona.', 'Guárdalos bien: son tu identidad en internet frente a la administración.'],
    enlaces: [{ href: '/recursos', texto: 'Webs oficiales' }],
  },
];
