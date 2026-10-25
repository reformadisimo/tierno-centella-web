// Glosario de términos de derecho laboral y Seguridad Social.
// Definiciones breves y sencillas, revisadas a octubre de 2026. Ordenado alfabéticamente.

export type Termino = { termino: string; definicion: string; enlace?: string };

const GLOSARIO_BASE: Termino[] = [
  {
    termino: "Accidente de trabajo",
    definicion:
      "Toda lesión que sufres con ocasión o por consecuencia del trabajo, incluido el trayecto de casa al trabajo y vuelta. También pueden serlo enfermedades causadas por el trabajo que no están en la lista de enfermedades profesionales, como un trastorno psicológico por acoso, si se prueba esa relación. Da derecho a prestaciones mejores que una enfermedad común.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Acoso ascendente",
    definicion:
      "Acoso que ejerce uno o varios trabajadores contra una persona que está por encima de ellos en la jerarquía, como un jefe o un director. Es menos frecuente, pero también está protegido.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Acoso descendente",
    definicion:
      "Acoso que ejerce un superior jerárquico sobre una persona que depende de él. Es la forma más habitual, y la empresa responde de él aunque no lo haya ordenado si no hizo nada para evitarlo.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Acoso horizontal",
    definicion:
      "Acoso entre compañeros del mismo nivel, sin relación de jerarquía. La empresa tiene la obligación de prevenirlo y de actuar en cuanto lo conoce.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Acoso laboral o mobbing",
    definicion:
      "Conductas hostiles o humillantes que se repiten en el tiempo contra una persona en el trabajo y que dañan su dignidad o su salud. Pueden ser gritos, aislamiento, burlas, vaciar de tareas o encargar trabajos imposibles. Se puede reclamar en la vía laboral y, en los casos graves, en la penal.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Acoso por razón de sexo",
    definicion:
      "Comportamiento hostil hacia una persona por su sexo, por ejemplo por estar embarazada o por ejercer derechos de conciliación. Es discriminación y todas las empresas deben tener un protocolo para prevenirlo.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Acoso sexual",
    definicion:
      "Cualquier comportamiento verbal o físico de naturaleza sexual que atenta contra la dignidad de una persona, en especial si crea un entorno intimidatorio u ofensivo. Basta con que ocurra una vez si es grave. La empresa está obligada a tener un protocolo frente a él.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Ajustes razonables",
    definicion:
      "Cambios en el puesto, las tareas, el horario o las herramientas para que una persona con limitaciones de salud o discapacidad pueda seguir trabajando. Desde la Ley 2/2025, la empresa debe intentarlos antes de extinguir el contrato por incapacidad permanente.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Audiencia previa",
    definicion:
      "Oportunidad que la empresa debe darte para defenderte de las acusaciones antes de un despido disciplinario. El Tribunal Supremo la exige desde su sentencia de 18 de noviembre de 2024, y su falta hace el despido improcedente.",
    enlace: "/despido",
  },
  {
    termino: "Base reguladora",
    definicion:
      "Cantidad que sirve de referencia para calcular una prestación, como la incapacidad temporal o la permanente. Se obtiene a partir de lo que has cotizado o de tus salarios, y sobre ella se aplica el porcentaje que corresponda.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Burofax",
    definicion:
      "Envío por correo que deja constancia del contenido, de la fecha y de que el destinatario lo recibió. Es útil para comunicar a la empresa algo importante, como una denuncia de acoso o tu voluntad de seguir trabajando.",
  },
  {
    termino: "Caducidad",
    definicion:
      "Pérdida definitiva del derecho a reclamar por no hacerlo dentro de un plazo. A diferencia de la prescripción, no se interrumpe con cartas o reclamaciones privadas. El despido tiene un plazo de caducidad de 20 días hábiles.",
    enlace: "/herramientas/plazos",
  },
  {
    termino: "Carga de la prueba",
    definicion:
      "Regla que decide quién tiene que demostrar cada hecho en un juicio. Cuando se denuncia acoso o discriminación, basta con que aportes indicios razonables; entonces es la empresa la que debe probar que actuó por otros motivos.",
    enlace: "/herramientas/mapa-de-pruebas",
  },
  {
    termino: "Carta de despido",
    definicion:
      "Comunicación escrita en la que la empresa te despide. Debe explicar con claridad los hechos o causas y la fecha de efectos. Si es vaga o falta, el despido suele declararse improcedente.",
    enlace: "/despido",
  },
  {
    termino: "Contingencia común",
    definicion:
      "Origen de una baja o incapacidad que no tiene relación con el trabajo: una enfermedad común o un accidente fuera del trabajo. Sus prestaciones suelen ser menores que las de una contingencia profesional.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Contingencia profesional",
    definicion:
      "Origen de una baja o incapacidad ligado al trabajo: un accidente de trabajo o una enfermedad profesional. No exige cotización previa y la prestación se calcula con los salarios reales.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Convenio 190 de la OIT",
    definicion:
      "Tratado internacional sobre la eliminación de la violencia y el acoso en el mundo del trabajo. Está en vigor en España desde el 25 de mayo de 2023 y obliga a prevenir el acoso y a proteger a las víctimas.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Convenio colectivo",
    definicion:
      "Acuerdo entre representantes de los trabajadores y de las empresas que fija salarios, jornada, categorías y otras condiciones de un sector o de una empresa. Puede mejorar lo que dice la ley, pero no empeorarlo.",
  },
  {
    termino: "Daños morales",
    definicion:
      "Sufrimiento, angustia o daño a la dignidad causado por una vulneración de tus derechos, como el acoso o un despido discriminatorio. Se puede pedir una indemnización por ellos además de otras cantidades, y el juez suele usar como referencia las multas de la LISOS.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Delito de acoso laboral",
    definicion:
      "El artículo 173.1 del Código Penal castiga desde 2010 a quien, desde una posición de superioridad, realiza de forma reiterada actos hostiles o humillantes contra otra persona en el trabajo. La pena es de prisión de 6 meses a 2 años.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Despido colectivo (ERE)",
    definicion:
      "Despido de un número mínimo de trabajadores en 90 días por causas económicas, técnicas, organizativas o de producción. Exige un periodo de consultas con los representantes y da derecho al menos a 20 días por año, con un máximo de 12 mensualidades.",
    enlace: "/despido",
  },
  {
    termino: "Despido disciplinario",
    definicion:
      "Despido por un incumplimiento grave y culpable del trabajador, como faltas de asistencia repetidas o desobediencia. Si es procedente, no da derecho a indemnización.",
    enlace: "/despido",
  },
  {
    termino: "Despido improcedente",
    definicion:
      "Calificación que da el juez cuando la empresa no prueba la causa del despido o no cumple la forma. La empresa elige entre readmitirte o pagarte 33 días por año, con un máximo de 24 mensualidades (45 días por año para el tiempo anterior al 12 de febrero de 2012).",
    enlace: "/calculadora-indemnizacion",
  },
  {
    termino: "Despido nulo",
    definicion:
      "Calificación más grave: el despido vulnera un derecho fundamental, es discriminatorio o afecta a una persona especialmente protegida, como una embarazada. Obliga a readmitirte y a pagarte los salarios que dejaste de cobrar.",
    enlace: "/despido",
  },
  {
    termino: "Despido objetivo",
    definicion:
      "Despido por causas que no dependen de tu conducta, como causas económicas, técnicas, organizativas o de producción, o la ineptitud sobrevenida. Exige carta, 15 días de preaviso e indemnización de 20 días por año, con un máximo de 12 mensualidades.",
    enlace: "/despido",
  },
  {
    termino: "Despido procedente",
    definicion:
      "Calificación que da el juez cuando la empresa prueba la causa y ha cumplido la forma. En el disciplinario no hay indemnización; en el objetivo, la de 20 días por año.",
    enlace: "/despido",
  },
  {
    termino: "Determinación de contingencia",
    definicion:
      "Procedimiento ante el INSS para decidir si una baja o una incapacidad viene de una enfermedad común o del trabajo. Puedes pedirlo tú si la mutua no reconoce que tu baja es por un accidente de trabajo.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Días hábiles",
    definicion:
      "Días que cuentan en un plazo. En los plazos de los juzgados no cuentan sábados, domingos ni festivos, y en general tampoco agosto, salvo excepciones como el despido, en el que agosto sí cuenta.",
    enlace: "/herramientas/plazos",
  },
  {
    termino: "Enfermedad profesional",
    definicion:
      "Enfermedad causada por el trabajo que figura en la lista oficial de enfermedades profesionales, junto con la actividad y la sustancia que la provocan. Se trata como contingencia profesional.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "ERTE",
    definicion:
      "Expediente de regulación temporal de empleo. La empresa suspende tu contrato o reduce tu jornada durante un tiempo por causas económicas, técnicas, organizativas, de producción o de fuerza mayor. No hay despido ni indemnización, y cobras desempleo por la parte que no trabajas.",
    enlace: "/despido",
  },
  {
    termino: "Evaluación de riesgos",
    definicion:
      "Análisis que toda empresa debe hacer de los peligros de cada puesto para la seguridad y la salud de los trabajadores, incluidos los riesgos psicosociales. Lo exige la Ley de Prevención de Riesgos Laborales.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "EVI (tribunal médico)",
    definicion:
      "Equipo de Valoración de Incapacidades del INSS. Revisa tus informes, te examina y emite un dictamen sobre si tienes una incapacidad permanente y en qué grado. Su dictamen no obliga al INSS, pero pesa mucho en la decisión.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Extinción por incumplimiento del empresario",
    definicion:
      "Posibilidad de pedir al juez que termine tu contrato por un incumplimiento grave de la empresa, como el acoso, no pagarte el sueldo o cambiarte las condiciones de forma que dañe tu dignidad. Está en el artículo 50 del Estatuto y da derecho a la indemnización del despido improcedente.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Finiquito",
    definicion:
      "Documento con la liquidación de lo que la empresa te debe al terminar el contrato: salario de los últimos días, parte de pagas extra y vacaciones no disfrutadas. Firma como recibí, no conforme si no estás de acuerdo o vas a reclamar.",
    enlace: "/despido",
  },
  {
    termino: "Garantía de indemnidad",
    definicion:
      "Derecho a no sufrir represalias por reclamar tus derechos, denunciar acoso o acudir a la Inspección de Trabajo o a los tribunales. Un despido o una sanción en represalia puede declararse nulo.",
    enlace: "/despido",
  },
  {
    termino: "Gran incapacidad",
    definicion:
      "Grado de incapacidad permanente en el que, además, necesitas ayuda de otra persona para actos básicos como vestirte, comer o asearte. Se cobra la pensión que corresponda más un complemento: el 45 % de la base mínima de cotización más el 30 % de tu última base, y nunca menos del 45 % de la pensión.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Incapacidad permanente",
    definicion:
      "Situación de quien, tras el tratamiento médico, tiene lesiones graves y previsiblemente definitivas que reducen o anulan su capacidad para trabajar. La declara el INSS y tiene cuatro grados: parcial, total, absoluta y gran incapacidad.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Incapacidad permanente absoluta",
    definicion:
      "Grado en el que no puedes realizar ninguna profesión u oficio de forma regular. Da derecho a una pensión del 100 % de la base reguladora.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Incapacidad permanente parcial",
    definicion:
      "Grado en el que tu rendimiento en tu profesión habitual baja al menos un 33 %, pero puedes seguir haciendo sus tareas fundamentales. Se cobra un pago único de 24 mensualidades de la base reguladora de la incapacidad temporal.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Incapacidad permanente total",
    definicion:
      "Grado en el que no puedes hacer tu profesión habitual, pero sí otra distinta. Da derecho a una pensión del 55 % de la base reguladora, que puede subir al 75 % (total cualificada) desde los 55 años si es difícil que encuentres otro empleo.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Incapacidad temporal",
    definicion:
      "Lo que habitualmente se llama estar de baja: no puedes trabajar durante un tiempo mientras recibes asistencia médica. Tiene una duración máxima de 365 días, prorrogable otros 180 si se espera la curación.",
  },
  {
    termino: "Indemnización por despido",
    definicion:
      "Cantidad que la empresa te paga al despedirte, calculada en días de salario por año trabajado. Son 20 días por año en el despido objetivo o colectivo y 33 días por año en el improcedente, con sus topes.",
    enlace: "/calculadora-indemnizacion",
  },
  {
    termino: "Inspección de Trabajo",
    definicion:
      "Organismo público que vigila que las empresas cumplan las normas laborales y de prevención de riesgos. Puedes presentar una denuncia, también por acoso, y la Inspección puede requerir a la empresa o proponer una sanción.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "INSS",
    definicion:
      "Instituto Nacional de la Seguridad Social. Es el organismo que reconoce y paga, entre otras, las pensiones de incapacidad permanente y que decide la contingencia de una baja cuando hay desacuerdo.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Juzgado de lo Social",
    definicion:
      "Juzgado que resuelve los conflictos entre trabajadores y empresas y las reclamaciones contra la Seguridad Social, como despidos, acoso o incapacidad permanente.",
  },
  {
    termino: "LISOS",
    definicion:
      "Ley sobre Infracciones y Sanciones en el Orden Social. Fija las multas que puede imponer la Inspección de Trabajo a las empresas, y los jueces la usan a menudo como referencia para calcular los daños morales.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Mutua colaboradora",
    definicion:
      "Entidad privada sin ánimo de lucro que colabora con la Seguridad Social. Suele cubrir los accidentes de trabajo y las enfermedades profesionales y controla algunas bajas.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Papeleta de conciliación",
    definicion:
      "Escrito con el que pides un intento de acuerdo con la empresa antes de ir al juzgado. Es obligatoria en la mayoría de reclamaciones, como el despido, y al presentarla se suspende el plazo de caducidad.",
    enlace: "/despido",
  },
  {
    termino: "Plan de igualdad",
    definicion:
      "Conjunto de medidas para garantizar la igualdad entre mujeres y hombres en la empresa. Es obligatorio en las empresas de 50 o más trabajadores y suele incluir medidas frente al acoso.",
  },
  {
    termino: "Prescripción",
    definicion:
      "Pérdida del derecho a reclamar por dejar pasar el plazo. Se puede interrumpir con una reclamación, y entonces el plazo vuelve a empezar. Las reclamaciones de cantidades y daños derivadas del contrato prescriben en general al año (art. 59 del Estatuto).",
    enlace: "/herramientas/plazos",
  },
  {
    termino: "Protocolo de acoso",
    definicion:
      "Procedimiento interno de la empresa para prevenir, denunciar e investigar el acoso. Frente al acoso sexual y por razón de sexo es obligatorio en todas las empresas; el acoso moral se aborda en la evaluación de riesgos psicosociales y en muchos convenios.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Readmisión",
    definicion:
      "Vuelta del trabajador a su puesto, en las mismas condiciones, tras un despido declarado nulo o improcedente. En el improcedente la empresa puede elegir pagar en su lugar; en el nulo es obligatoria.",
    enlace: "/despido",
  },
  {
    termino: "Recargo de prestaciones",
    definicion:
      "Aumento de entre el 30 % y el 50 % de las prestaciones por accidente de trabajo o enfermedad profesional cuando se debe a que la empresa no cumplió las medidas de seguridad. Lo paga directamente la empresa.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Reclamación previa",
    definicion:
      "Escrito que debes presentar ante el INSS antes de demandarle, por ejemplo si te deniega la incapacidad permanente. El plazo es de 30 días hábiles desde la notificación, y el INSS tiene 45 días hábiles para contestar.",
    enlace: "/incapacidad-permanente",
  },
  {
    termino: "Recurso de suplicación",
    definicion:
      "Recurso contra la sentencia de un Juzgado de lo Social. Lo resuelve la Sala de lo Social del Tribunal Superior de Justicia de la comunidad autónoma.",
  },
  {
    termino: "Responsabilidad patrimonial",
    definicion:
      "Obligación de la Administración de indemnizar los daños que causa su funcionamiento, por ejemplo cuando no protege a un empleado público frente al acoso. El plazo para reclamarla es de un año.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Riesgos psicosociales",
    definicion:
      "Condiciones del trabajo que pueden dañar la salud mental o física, como la sobrecarga, la falta de control, los conflictos o el acoso. La empresa debe evaluarlos y prevenirlos como cualquier otro riesgo laboral.",
    enlace: "/acoso-laboral",
  },
  {
    termino: "Salarios de tramitación",
    definicion:
      "Salarios desde la fecha del despido hasta la sentencia o la readmisión. Se pagan si el despido es nulo, o si es improcedente y la empresa elige readmitirte.",
    enlace: "/despido",
  },
  {
    termino: "SMAC",
    definicion:
      "Servicio de Mediación, Arbitraje y Conciliación de la Comunidad de Madrid. Es donde se presenta la papeleta y se celebra el intento de acuerdo con la empresa antes de ir al juzgado.",
    enlace: "/despido",
  },
  {
    termino: "Tutela de derechos fundamentales",
    definicion:
      "Procedimiento judicial urgente y preferente para defenderte cuando la empresa vulnera un derecho fundamental, como tu dignidad, tu intimidad o tu derecho a no ser discriminado. Es la vía habitual para reclamar por acoso laboral y permite pedir el cese de la conducta y una indemnización.",
    enlace: "/acoso-laboral",
  },
];

import { GLOSARIO_EXTRA } from './glosario-extra';
export const GLOSARIO: Termino[] = [...GLOSARIO_BASE, ...GLOSARIO_EXTRA].sort((a, b) => a.termino.localeCompare(b.termino, 'es'));

export const slugTermino = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// Términos relacionados: los que se mencionan entre sí o comparten guía.
export function relacionados(t: Termino, max = 6): Termino[] {
  const n = norm(t.termino);
  return GLOSARIO.filter((o) => o !== t)
    .map((o) => {
      const on = norm(o.termino);
      let p = 0;
      if (norm(t.definicion).includes(on)) p += 3;
      if (norm(o.definicion).includes(n)) p += 3;
      if (t.enlace && o.enlace === t.enlace) p += 1;
      return { o, p };
    })
    .filter((x) => x.p > 0)
    .sort((a, b) => b.p - a.p)
    .slice(0, max)
    .map((x) => x.o);
}
