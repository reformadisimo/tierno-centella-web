// Preguntas frecuentes de la web, 6 por tema. Datos legales revisados a octubre de 2026.

export type Pregunta = {
  pregunta: string;
  respuesta: string;
  tema: 'acoso' | 'despido' | 'incapacidad' | 'despacho';
};

export const FAQ: Pregunta[] = [
  // Acoso laboral
  {
    tema: 'acoso',
    pregunta: '¿Cómo sé si lo que me pasa es acoso laboral?',
    respuesta:
      'Hablamos de acoso cuando hay conductas hostiles o humillantes que se repiten en el tiempo y que dañan tu dignidad o tu salud: gritos, burlas, aislamiento, quitarte tareas o encargarte trabajos imposibles. Un conflicto puntual o una orden que no te gusta no son acoso por sí solos. Puedes orientarte con el test de acoso de esta web, aunque cada caso hay que valorarlo con detalle.',
  },
  {
    tema: 'acoso',
    pregunta: '¿Cómo puedo demostrar el acoso?',
    respuesta:
      'Con todo lo que deje rastro: correos, mensajes, grabaciones de conversaciones en las que participas, testigos, informes médicos y un diario con fechas y hechos. No hace falta una prueba perfecta: basta con aportar indicios razonables para que sea la empresa la que tenga que justificar su actuación. En el mapa de pruebas de esta web tienes una guía para reunirlas.',
  },
  {
    tema: 'acoso',
    pregunta: '¿Qué plazo tengo para reclamar por acoso?',
    respuesta:
      'Depende de lo que reclames. Si el acoso continúa, el plazo no empieza a contar mientras dura. Las indemnizaciones por daños en la vía laboral prescriben en general al año, y si eres empleado público y reclamas a la Administración por responsabilidad patrimonial, también tienes un año. Si te despiden, el plazo para impugnar el despido es de solo 20 días hábiles. Puedes orientarte con la calculadora de plazos.',
  },
  {
    tema: 'acoso',
    pregunta: '¿La empresa responde del acoso de un jefe o un compañero?',
    respuesta:
      'Sí, si no lo previno o no actuó cuando lo conoció. La empresa tiene la obligación de proteger tu salud, evaluar los riesgos psicosociales y aplicar el protocolo de acoso. Los tribunales también pueden condenar a la persona acosadora junto con la empresa.',
  },
  {
    tema: 'acoso',
    pregunta: '¿El acoso laboral es delito?',
    respuesta:
      'Puede serlo. El artículo 173.1 del Código Penal castiga desde 2010 el acoso laboral grave y reiterado ejercido desde una posición de superioridad, con prisión de 6 meses a 2 años. La mayoría de los casos se resuelven en la vía laboral, pero en los más graves la vía penal es una opción a valorar.',
  },
  {
    tema: 'acoso',
    pregunta: '¿Me pueden despedir por denunciar acoso?',
    respuesta:
      'No deberían. La ley te protege frente a represalias por defender tus derechos (garantía de indemnidad). Si te despiden por haber denunciado, el despido puede declararse nulo, con readmisión, salarios y una indemnización por daños morales.',
  },

  // Despido
  {
    tema: 'despido',
    pregunta: '¿Cuánto tiempo tengo para reclamar un despido?',
    respuesta:
      'Veinte días hábiles desde el día siguiente a la fecha de efectos del despido. No cuentan sábados, domingos ni festivos, pero agosto sí cuenta. En ese plazo debes presentar la papeleta de conciliación, que en Madrid se tramita en el SMAC. Puedes calcular tu fecha en la calculadora de plazos.',
  },
  {
    tema: 'despido',
    pregunta: '¿Qué indemnización me corresponde si el despido es improcedente?',
    respuesta:
      'Treinta y tres días de salario por año trabajado, con un máximo de 24 mensualidades. Si empezaste a trabajar antes del 12 de febrero de 2012, el tiempo anterior a esa fecha se calcula a 45 días por año. Puedes hacer una estimación en la calculadora de indemnización.',
  },
  {
    tema: 'despido',
    pregunta: '¿Qué diferencia hay entre un despido improcedente y uno nulo?',
    respuesta:
      'En el improcedente, la empresa puede elegir entre readmitirte o pagarte la indemnización. En el nulo, que se da por discriminación, vulneración de derechos fundamentales o en casos protegidos como el embarazo, la readmisión es obligatoria y te pagan los salarios que dejaste de cobrar.',
  },
  {
    tema: 'despido',
    pregunta: '¿Tengo que firmar la carta de despido y el finiquito?',
    respuesta:
      'Puedes firmar para acusar recibo, pero escribe junto a tu firma "recibí, no conforme". Así dejas claro que no estás de acuerdo y que no renuncias a reclamar.',
  },
  {
    tema: 'despido',
    pregunta: '¿Me pueden despedir sin escucharme antes?',
    respuesta:
      'En el despido disciplinario, no. Desde la sentencia del Tribunal Supremo de 18 de noviembre de 2024, la empresa debe darte la oportunidad de defenderte de las acusaciones antes de despedirte. Si no lo hace, el Supremo ha entendido que el despido es improcedente.',
  },
  {
    tema: 'despido',
    pregunta: '¿Puedo cobrar el paro si reclamo el despido?',
    respuesta:
      'Sí. Puedes pedir la prestación por desempleo nada más ser despedido, aunque vayas a impugnar el despido, siempre que tengas cotizado el tiempo mínimo. No tienes que esperar al juicio.',
  },

  // Incapacidad permanente
  {
    tema: 'incapacidad',
    pregunta: '¿Qué grados de incapacidad permanente hay y cuánto se cobra?',
    respuesta:
      'Hay cuatro. La parcial se cobra en un pago único de 24 mensualidades de la base reguladora. La total, con una pensión del 55 % (75 % si tienes 55 años o más y cumples los requisitos). La absoluta, con el 100 %. Y la gran incapacidad, con la pensión que corresponda más un complemento para pagar a quien te ayuda.',
  },
  {
    tema: 'incapacidad',
    pregunta: '¿Qué hago si el INSS me deniega la incapacidad?',
    respuesta:
      'Presentar una reclamación previa ante el INSS en 30 días hábiles desde la notificación. Si la rechaza o no contesta en 45 días hábiles, tienes otros 30 días hábiles para demandar en el Juzgado de lo Social, donde un juez revisará tu caso.',
  },
  {
    tema: 'incapacidad',
    pregunta: '¿Pierdo mi trabajo si me reconocen una incapacidad permanente?',
    respuesta:
      'No de forma automática. Desde la Ley 2/2025, en vigor desde el 1 de mayo de 2025, puedes comunicar por escrito en 10 días naturales que quieres seguir, y la empresa debe intentar adaptar tu puesto o recolocarte. Solo puede extinguir el contrato si demuestra que no es posible.',
  },
  {
    tema: 'incapacidad',
    pregunta: '¿Puedo trabajar si tengo una incapacidad permanente total?',
    respuesta:
      'Sí, en una profesión distinta de tu profesión habitual. Si sigues en tu mismo puesto adaptado, la pensión se suspende mientras trabajes así.',
  },
  {
    tema: 'incapacidad',
    pregunta: '¿Por qué importa que mi baja sea accidente de trabajo y no enfermedad común?',
    respuesta:
      'Porque si viene del trabajo no se exige cotización previa y la pensión se calcula con tus salarios reales, lo que suele dar una cantidad mayor. Si crees que tu baja está mal calificada, puedes pedir al INSS la determinación de contingencia.',
  },
  {
    tema: 'incapacidad',
    pregunta: '¿Qué es el tribunal médico?',
    respuesta:
      'Así se conoce al Equipo de Valoración de Incapacidades (EVI) del INSS. Revisa tus informes, puede examinarte y emite un dictamen sobre si tienes una incapacidad y en qué grado. Conviene llevar informes de especialistas que describan limitaciones concretas para tu trabajo.',
  },

  // Despacho
  {
    tema: 'despacho',
    pregunta: '¿Cuánto cuesta la consulta?',
    respuesta:
      'La primera orientación por teléfono o WhatsApp no tiene coste. Si necesitas estudiar el caso a fondo, la consulta de una hora cuesta 150 € con un abogado del despacho y 250 € con Jesús Tierno.',
  },
  {
    tema: 'despacho',
    pregunta: '¿Atendéis por videollamada?',
    respuesta:
      'Sí. Podemos hacer la consulta por videollamada si no puedes o no quieres venir al despacho. Solo necesitas un móvil u ordenador con conexión.',
  },
  {
    tema: 'despacho',
    pregunta: '¿Dónde está el despacho?',
    respuesta:
      'En la calle de Jorge Juan, 78, 5.º C, 28009 Madrid. Puedes llamarnos al 913 24 97 97 o escribirnos por WhatsApp al 608 13 93 37 para pedir cita.',
  },
  {
    tema: 'despacho',
    pregunta: '¿Atendéis casos fuera de Madrid?',
    respuesta:
      'Sí. Atendemos a trabajadores de toda España por videollamada, teléfono y correo. Nuestra oficina está en Madrid; si tu caso necesita actuaciones presenciales en otra ciudad, te explicamos cómo se organizaría desde la primera consulta.',
  },
  {
    tema: 'despacho',
    pregunta: '¿Qué documentos tengo que llevar a la consulta?',
    respuesta:
      'Lo que tengas relacionado con el caso: contrato, últimas nóminas, carta de despido o sanción si la hay, informe de vida laboral, informes médicos o resoluciones del INSS, y cualquier correo, mensaje o grabación que sirva de prueba. Si tienes un resumen con fechas de lo ocurrido, tráelo también. Si te falta algo, no pasa nada: lo vemos juntos.',
  },
  {
    tema: 'despacho',
    pregunta: '¿Cobráis a resultado?',
    respuesta:
      'Depende del caso. En la primera consulta te explicamos con claridad cómo se calcularían los honorarios y qué opciones hay, antes de que tomes ninguna decisión.',
  },
];
