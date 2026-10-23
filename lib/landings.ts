// Páginas de aterrizaje para las campañas de Google Ads.
// Una por intención de búsqueda: el titular repite lo que la persona ha buscado,
// todo lleva a un solo objetivo (llamar, WhatsApp o dejar el teléfono) y no hay menú que distraiga.
// No se indexan: son para el tráfico de pago; el posicionamiento gratuito lo hacen las guías.

export type Landing = {
  slug: string;
  tema: string; // tema que llega en el correo de la consulta
  tituloSeo: string;
  descripcion: string;
  antetitulo: string;
  titulo: string;
  subtitulo: string;
  ventajas: string[];
  foto: string;
  fotoAlt: string;
  plazo: { cifra: string; texto: string };
  situaciones: { titulo: string; texto: string }[];
  herramienta: 'incapacidad' | 'acoso' | 'despido';
  herramientaTitulo: string;
  herramientaTexto: string;
  tabla?: { titulo: string; columnas: [string, string, string]; filas: [string, string, string][]; nota: string };
  pasos: { titulo: string; texto: string }[];
  prueba: { titulo: string; texto: string }[];
  preguntas: { p: string; r: string }[];
  opcionesFormulario: string[];
  whatsapp: string;
  guia: { texto: string; href: string };
};

export const LANDINGS: Landing[] = [
  {
    slug: 'incapacidad-permanente',
    tema: 'Incapacidad permanente (landing)',
    tituloSeo: 'Abogados de incapacidad permanente en Madrid',
    descripcion:
      'Te han denegado la incapacidad permanente o te han dado un grado menor. Abogados laboralistas en Madrid: reclamación previa, tribunal médico y juicio. Plazo de 30 días hábiles.',
    antetitulo: '¿Te han denegado la incapacidad permanente y no puedes trabajar?',
    titulo: 'Abogados de incapacidad permanente en Madrid',
    subtitulo:
      'Revisamos tu resolución y tus informes, te decimos con claridad si hay caso y qué grado pedir, y lo reclamamos ante el INSS y, si hace falta, en el juzgado.',
    ventajas: [
      'Te atiende un abogado laboralista desde la primera llamada',
      'Estudiamos lo que decide el grado: tus informes y tu profesión habitual',
      'En el despacho de Jorge Juan o por videollamada desde toda España',
    ],
    foto: 'incapacidad-ventana',
    fotoAlt: 'Una mujer junto a la ventana de su oficina',
    plazo: {
      cifra: '30 días hábiles',
      texto: 'para presentar la reclamación previa desde que te notifican la resolución. Si se pasa, pierdes esa vía.',
    },
    situaciones: [
      {
        titulo: 'Me la han denegado',
        texto: 'Reclamación previa en 30 días hábiles y, si el INSS no rectifica, demanda en el juzgado. Muchas incapacidades se reconocen ahí.',
      },
      {
        titulo: 'Me han dado un grado menor',
        texto: 'Si te dieron la total y no puedes trabajar en nada, se reclama la absoluta. La diferencia es pasar del 55 % al 100 % de tu base.',
      },
      {
        titulo: 'Me ha citado el tribunal médico',
        texto: 'Preparamos contigo qué informes llevar y cómo explicar tu trabajo real y lo que ya no puedes hacer.',
      },
      {
        titulo: 'Se me acaba la baja',
        texto: 'Al llegar a los 545 días de baja se valora la incapacidad. Te explicamos qué cobras mientras tanto y qué conviene hacer.',
      },
      {
        titulo: 'Me la han concedido y mi empresa...',
        texto: 'Desde la Ley 2/2025 tu contrato no se extingue automáticamente: puedes pedir adaptar tu puesto o cambiar de puesto.',
      },
    ],
    herramienta: 'incapacidad',
    herramientaTitulo: 'Compruébalo en un minuto',
    herramientaTexto: 'Dinos en qué punto estás y qué puedes hacer hoy. Te decimos el grado que podría corresponderte y hasta cuándo tienes para reclamar.',
    tabla: {
      titulo: 'Los grados y lo que cobrarías',
      columnas: ['Grado', 'Cuándo', 'Qué cobras'],
      filas: [
        ['Parcial', 'Rindes al menos un 33 % menos en tu trabajo', 'Un pago único de 24 mensualidades de tu base reguladora'],
        ['Total', 'No puedes hacer tu trabajo habitual, sí otros', '55 % de tu base cada mes (75 % desde los 55 años si no encuentras empleo)'],
        ['Absoluta', 'No puedes trabajar en nada', '100 % de tu base reguladora cada mes'],
        ['Gran incapacidad', 'Además necesitas ayuda para el día a día', 'La pensión de la absoluta más un complemento'],
      ],
      nota: 'La base reguladora depende de lo que has cotizado y de si la causa es una enfermedad común o un accidente de trabajo. En la consulta la calculamos.',
    },
    pasos: [
      { titulo: 'Nos cuentas tu caso', texto: 'Por teléfono, WhatsApp o dejando tu número aquí. Lo primero que miramos es tu plazo.' },
      {
        titulo: 'Consulta con un abogado',
        texto: 'Una hora para estudiar tu resolución, tus informes médicos y tu vida laboral. Sales sabiendo si hay caso, qué grado pedir y cuánto cobrarías.',
      },
      {
        titulo: 'Reclamamos por ti',
        texto: 'Reclamación previa, demanda y juicio, con la prueba médica que necesita tu caso. Te tenemos al tanto de cada paso.',
      },
    ],
    prueba: [
      { titulo: 'Más de 25 años', texto: 'de ejercicio de Jesús Tierno Centella en derecho laboral' },
      { titulo: 'Ley 2/2025', texto: 'te explicamos cómo cambia tu contrato si te reconocen la incapacidad' },
      { titulo: 'Onda Cero y Comillas', texto: 'el despacho explica estos temas en medios y universidades' },
    ],
    preguntas: [
      {
        p: 'Me han denegado la incapacidad permanente y no puedo trabajar. ¿Qué hago?',
        r: 'Presentar la reclamación previa ante el INSS en 30 días hábiles desde la notificación. Si la rechaza o no contesta en 45 días, se presenta la demanda en el juzgado de lo social. Conviene preparar desde el principio los informes que acrediten lo que no puedes hacer.',
      },
      {
        p: '¿Necesito un informe pericial médico?',
        r: 'Depende del caso. A veces bastan tus informes de la sanidad pública bien ordenados; otras, un informe pericial marca la diferencia en el juicio. Te lo decimos en la consulta.',
      },
      {
        p: '¿Puedo trabajar si me dan la incapacidad total?',
        r: 'Sí, en una profesión distinta a la que te incapacitó. Con la absoluta y la gran incapacidad las reglas son más estrictas.',
      },
      {
        p: '¿Qué pasa con mi trabajo si me reconocen la incapacidad?',
        r: 'Desde la Ley 2/2025, el contrato no se extingue automáticamente: puedes pedir que te adapten el puesto o te cambien a otro compatible. La empresa solo puede negarse si supone una carga excesiva, y tiene que justificarlo.',
      },
      {
        p: '¿Cuánto cuesta la consulta?',
        r: 'La primera consulta de una hora cuesta 150 € + IVA con un abogado del despacho y 250 € + IVA con Jesús Tierno. Después te damos un presupuesto cerrado por escrito antes de empezar.',
      },
      {
        p: '¿Qué tengo que traer?',
        r: 'La resolución del INSS (si la tienes), los informes médicos más recientes, tu vida laboral y, si puedes, una descripción de las tareas de tu trabajo.',
      },
    ],
    opcionesFormulario: ['Me la han denegado', 'Me han dado un grado menor', 'Tengo tribunal médico', 'Se me acaba la baja', 'Otra situación'],
    whatsapp: 'Hola, quiero consultar un caso de incapacidad permanente.',
    guia: { texto: 'Guía completa: grados de incapacidad permanente', href: '/incapacidad-permanente/grados-de-incapacidad-permanente' },
  },
  {
    slug: 'acoso-laboral',
    tema: 'Acoso laboral (landing)',
    tituloSeo: 'Abogados de acoso laboral en Madrid',
    descripcion:
      'Abogados especialistas en acoso laboral y mobbing en Madrid. Te ayudamos a reunir la prueba, protegerte y reclamar una indemnización. Despacho pionero en condenar a empresa y acosador.',
    antetitulo: '¿Te están haciendo la vida imposible en el trabajo?',
    titulo: 'Abogados de acoso laboral en Madrid',
    subtitulo:
      'Llevamos más de 25 años defendiendo a víctimas de acoso. Te ayudamos a reunir la prueba, a protegerte mientras tanto y a reclamar lo que te corresponde.',
    ventajas: [
      'El despacho que logró en 2005 la primera condena en España a empresa y acosador a la vez',
      'Te decimos con claridad si lo que vives es acoso y cómo probarlo',
      'En el despacho de Jorge Juan o por videollamada desde toda España',
    ],
    foto: 'acoso-tension',
    fotoAlt: 'Un superior señala con el dedo a una trabajadora',
    plazo: {
      cifra: 'Antes de actuar',
      texto: 'asesórate: dimitir, firmar un acuerdo o denunciar sin prueba puede hacerte perder la indemnización y el paro.',
    },
    situaciones: [
      { titulo: 'Mi jefe me humilla o me aísla', texto: 'Te ayudamos a documentarlo y a exigir que la empresa active el protocolo de acoso.' },
      { titulo: 'Estoy de baja por ansiedad', texto: 'Vemos si puede reconocerse como accidente de trabajo, que se cobra mejor y protege tu puesto.' },
      { titulo: 'Quiero irme con indemnización', texto: 'Con el artículo 50 el juez extingue tu contrato con la indemnización del despido improcedente y con paro.' },
      { titulo: 'Me han despedido tras denunciar', texto: 'Si es una represalia, el despido puede ser nulo: readmisión y salarios. Tienes 20 días hábiles.' },
      { titulo: 'Sufro acoso sexual', texto: 'Actuamos rápido y con discreción. La empresa está obligada a protegerte.' },
    ],
    herramienta: 'acoso',
    herramientaTitulo: '¿Es acoso lo que estás viviendo?',
    herramientaTexto: 'Responde unas preguntas y te decimos qué indica tu caso y por dónde empezar.',
    pasos: [
      { titulo: 'Nos cuentas lo que pasa', texto: 'Por teléfono, WhatsApp o dejando tu número aquí. Con total confidencialidad.' },
      {
        titulo: 'Consulta con un abogado',
        texto: 'Una hora para ordenar los hechos y la prueba. Sales con un plan: qué guardar, qué no hacer y qué vía conviene.',
      },
      { titulo: 'Te defendemos', texto: 'Ante la empresa, la Inspección y el juzgado, cuidando también tu salud durante el proceso.' },
    ],
    prueba: [
      { titulo: '2005', texto: 'primera condena en España a la empresa y al acosador a la vez' },
      { titulo: '122.963 €', texto: 'de indemnización para una catedrática acosada (URJC, 2024)' },
      { titulo: 'Comillas y Onda Cero', texto: 'Jesús Tierno explica el acoso en universidades y medios' },
    ],
    preguntas: [
      {
        p: '¿Cómo demuestro el acoso laboral?',
        r: 'Con un diario de hechos con fechas, correos y mensajes, testigos, informes médicos o psicológicos y cualquier comunicación a la empresa. Te ayudamos a ordenarlo para que tenga fuerza.',
      },
      {
        p: '¿Cuánto me pueden indemnizar?',
        r: 'Depende del daño y de la vía: la extinción del contrato da la indemnización del despido improcedente, y además se reclaman los daños morales por vulnerar tus derechos fundamentales. Te damos una estimación en la consulta.',
      },
      {
        p: '¿Me puedo ir de la empresa sin perder el paro?',
        r: 'Sí, si es el juez quien extingue el contrato por incumplimiento grave de la empresa (artículo 50). Nunca dimitas sin asesorarte.',
      },
      {
        p: '¿Cuánto cuesta la consulta?',
        r: 'La primera consulta de una hora cuesta 150 € + IVA con un abogado del despacho y 250 € + IVA con Jesús Tierno. Después te damos un presupuesto cerrado por escrito.',
      },
    ],
    opcionesFormulario: ['Me acosa mi jefe', 'Me acosan compañeros', 'Estoy de baja por esto', 'Me han despedido', 'Acoso sexual', 'Otra situación'],
    whatsapp: 'Hola, quiero consultar un caso de acoso laboral.',
    guia: { texto: 'Guía completa: cómo saber si sufres acoso', href: '/acoso-laboral/como-saber-si-sufro-acoso' },
  },
  {
    slug: 'despido',
    tema: 'Despido (landing)',
    tituloSeo: 'Abogados de despidos en Madrid',
    descripcion:
      'Te han despedido. Abogados laboralistas en Madrid: revisamos tu carta, calculamos tu indemnización y reclamamos. Tienes 20 días hábiles para impugnar el despido.',
    antetitulo: '¿Te acaban de despedir?',
    titulo: 'Abogados de despidos en Madrid',
    subtitulo: 'Revisamos tu carta de despido, calculamos lo que te corresponde y lo reclamamos. El reloj ya corre: tienes 20 días hábiles.',
    ventajas: [
      'Te atiende un abogado laboralista desde la primera llamada',
      'Revisamos la carta y el finiquito antes de que firmes nada',
      'En el despacho de Jorge Juan o por videollamada desde toda España',
    ],
    foto: 'despido-caja',
    fotoAlt: 'Una persona recoge sus cosas en una caja tras un despido',
    plazo: { cifra: '20 días hábiles', texto: 'para impugnar el despido desde el día siguiente. Pasado ese plazo, ya no se puede reclamar.' },
    situaciones: [
      { titulo: 'Despido disciplinario', texto: 'La empresa tiene que probar lo que dice la carta. Si no puede, es improcedente.' },
      { titulo: 'Despido objetivo', texto: 'Comprobamos las causas, la indemnización de 20 días y el preaviso.' },
      { titulo: 'Embarazada, de permiso o reducción de jornada', texto: 'El despido puede ser nulo: readmisión y salarios de tramitación.' },
      { titulo: 'Despedido estando de baja', texto: 'Vemos si es nulo por discriminación por enfermedad.' },
      { titulo: 'No me han pagado el finiquito', texto: 'Firma como "no conforme" y reclamamos lo que falte.' },
    ],
    herramienta: 'despido',
    herramientaTitulo: 'Calcula tu indemnización',
    herramientaTexto: 'Con tus fechas y tu salario, te decimos lo que te corresponde si el despido es improcedente.',
    pasos: [
      { titulo: 'Nos mandas la carta', texto: 'Por WhatsApp o en la consulta. Lo primero que miramos es tu plazo.' },
      { titulo: 'Consulta con un abogado', texto: 'Revisamos la carta, el finiquito y tu nómina. Sales sabiendo si merece la pena reclamar y cuánto.' },
      { titulo: 'Reclamamos', texto: 'Papeleta de conciliación, negociación con la empresa y, si no hay acuerdo, juicio.' },
    ],
    prueba: [
      { titulo: 'Más de 25 años', texto: 'de ejercicio de Jesús Tierno Centella en derecho laboral' },
      { titulo: '2025', texto: 'despido "objetivo" declarado nulo por ser una represalia' },
      { titulo: 'Transparencia', texto: 'precio de la consulta claro y presupuesto cerrado por escrito' },
    ],
    preguntas: [
      {
        p: '¿Debo firmar la carta de despido?',
        r: 'Sí, pero solo como "recibí" o "no conforme". Firmar no significa estar de acuerdo ni te quita el derecho a reclamar.',
      },
      {
        p: '¿Cuánto me corresponde si es improcedente?',
        r: 'Por regla general, 33 días de salario por año trabajado, con un máximo de 24 mensualidades (con tramos anteriores a 2012 que pueden subirlo). Usa la calculadora de esta página.',
      },
      {
        p: '¿Cobro el paro si me despiden?',
        r: 'Sí, cualquier despido da derecho a paro si has cotizado lo suficiente, también el disciplinario. Pídelo en los 15 días hábiles siguientes.',
      },
      {
        p: '¿Cuánto cuesta la consulta?',
        r: 'La primera consulta de una hora cuesta 150 € + IVA con un abogado del despacho y 250 € + IVA con Jesús Tierno. Después te damos un presupuesto cerrado por escrito.',
      },
    ],
    opcionesFormulario: ['Disciplinario', 'Objetivo', 'Estaba embarazada o de permiso', 'Estaba de baja', 'No sé qué tipo es'],
    whatsapp: 'Hola, me han despedido y quiero consultar mi caso.',
    guia: { texto: 'Guía completa: qué hacer si te despiden', href: '/despido' },
  },
];

export const landing = (slug: string) => LANDINGS.find((l) => l.slug === slug);
