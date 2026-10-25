// Ejemplo completo de la secuencia de correos para quien deja sus datos por un tema de acoso laboral.
// Es lo que se configuraría en Resend (lib/journey.ts). Los textos son una propuesta para que el despacho los revise.
// Sin reseñas citadas, sin casos inventados: solo los casos públicos del despacho (2005 y URJC 2024).

export type Boton = { texto: string; href: string; tipo: 'principal' | 'secundario' | 'whatsapp' | 'llamar' };
export type Correo = {
  cuando: string;
  dia: string;
  objetivo: string;
  asunto: string;
  previa: string;
  foto?: string;
  fotoAlt?: string;
  video?: { id: string; titulo: string };
  parrafos: string[];
  lista?: string[];
  botones: Boton[];
  por: string;
};

const WA = (t: string) => `https://wa.me/34608139337?text=${encodeURIComponent(t)}`;
const LLAMAR: Boton = { texto: 'Llamar al 913 24 97 97', href: 'tel:+34913249797', tipo: 'llamar' };
const WHATSAPP: Boton = { texto: 'Escribir por WhatsApp', href: WA('Hola, escribo por el correo que me enviasteis sobre acoso laboral.'), tipo: 'whatsapp' };

export const SECUENCIA_ACOSO: Correo[] = [
  {
    cuando: 'Al momento',
    dia: 'Minuto 1',
    objetivo: 'Tranquilizar y que no haya sorpresas',
    asunto: 'Hemos recibido tu consulta, Laura',
    previa: 'Te llamará un abogado del despacho en un máximo de 48 horas laborables.',
    foto: 'recepcion',
    fotoAlt: 'La recepción del despacho Tierno Centella',
    parrafos: [
      'Hola, Laura. Gracias por escribirnos. Sabemos que dar este paso no es fácil, y queremos que sepas desde ya que no estás sola.',
      'Te llamará un abogado del despacho en horario de oficina (de lunes a viernes, de 9 a 17 h), en un máximo de 48 horas laborables. Si es urgente, llámanos o escríbenos ahora.',
      'Para que no haya sorpresas: la primera consulta dura una hora y cuesta 150 € + IVA con un abogado del despacho, o 250 € + IVA con Jesús Tierno. En ella revisamos tus documentos y te decimos con sinceridad si tienes caso y qué pasos dar.',
    ],
    lista: ['Correos, mensajes o notas que tengas', 'Partes médicos o de baja, si los hay', 'Tu contrato y tus últimas nóminas'],
    botones: [LLAMAR, WHATSAPP],
    por: 'Es el correo que más se abre de toda la secuencia. Confirma que alguien la ha escuchado, dice cuándo la llamarán y deja el precio claro desde el principio, que es justo lo que piden las reseñas.',
  },
  {
    cuando: 'Al día siguiente',
    dia: 'Día 1',
    objetivo: 'Ayudarla a poner nombre a lo que le pasa',
    asunto: '¿Es acoso lo que te está pasando? 7 preguntas para saberlo',
    previa: 'No todo conflicto es acoso, pero si se repite y va a por ti, puede serlo.',
    foto: 'mujer-agobiada',
    fotoAlt: 'Una trabajadora agobiada mientras alguien le entrega papeles',
    parrafos: [
      'Hola, Laura. Una de las dudas que más nos llegan es "¿esto es acoso o solo un mal jefe?". La diferencia está en tres cosas: que se repita en el tiempo, que vaya dirigido contra ti y que te esté haciendo daño.',
      'Hemos preparado un test de siete preguntas. En dos minutos, y sin dejar ningún dato, te da un resultado orientativo y los pasos que puedes dar.',
    ],
    botones: [
      { texto: 'Hacer el test (2 minutos)', href: '/herramientas/test-acoso', tipo: 'principal' },
      { texto: 'Leer la guía: ¿sufro acoso laboral?', href: '/acoso-laboral', tipo: 'secundario' },
    ],
    por: 'Primero ayudar, después vender. Quien hace el test y se reconoce en el resultado vuelve con mucha más confianza a la consulta.',
  },
  {
    cuando: 'A los 3 días',
    dia: 'Día 3',
    objetivo: 'Darle algo útil que pueda hacer hoy',
    asunto: 'Lo que más pesa en un juicio por acoso: las pruebas',
    previa: 'Qué guardar desde hoy, y por qué lo que tú anotas también cuenta.',
    foto: 'documentos-mesa',
    fotoAlt: 'Documentos sobre una mesa del despacho',
    parrafos: [
      'Hola, Laura. En los casos de acoso, lo que marca la diferencia son las pruebas. Y muchas se pierden porque nadie dijo a tiempo que había que guardarlas.',
      'Desde hoy, guarda:',
    ],
    lista: [
      'Correos, mensajes y notas internas, con su fecha',
      'Un diario de lo que pasa: qué, cuándo, quién estaba delante',
      'Los nombres de los compañeros que lo han visto',
      'Tus visitas al médico y los partes de baja',
    ],
    botones: [
      { texto: 'Hacer mi mapa de pruebas', href: '/herramientas/mapa-de-pruebas', tipo: 'principal' },
      { texto: '¿Puedo grabar una conversación?', href: '/blog/grabar-conversaciones-para-probar-el-acoso', tipo: 'secundario' },
    ],
    por: 'Un correo con una tarea concreta mantiene la relación viva sin presionar. Y el mapa de pruebas le enseña lo que le falta, que es justo lo que se trabaja en la consulta.',
  },
  {
    cuando: 'A los 5 días',
    dia: 'Día 5',
    objetivo: 'Que no se le pase ningún plazo',
    asunto: 'Si te han despedido o sancionado, el plazo es muy corto',
    previa: '20 días hábiles para el despido. Te ayudamos a calcular el tuyo.',
    foto: 'mujer-cafe',
    fotoAlt: 'Una mujer cansada en su mesa de trabajo',
    parrafos: [
      'Hola, Laura. Un aviso importante, por si es tu caso: si la empresa te ha despedido o sancionado, tienes 20 días hábiles para reclamar. Los sábados, domingos y festivos no cuentan, pero los días pasan rápido.',
      'Si sigues en la empresa, ese plazo no corre. Aun así, cuanto antes se ordenen las pruebas y se decida qué hacer (denunciarlo, pedir la extinción con indemnización, que tu baja se reconozca como accidente de trabajo...), mejor.',
    ],
    botones: [
      { texto: 'Calcular mi plazo', href: '/herramientas/plazos', tipo: 'principal' },
      { texto: '¿Mi baja es accidente de trabajo?', href: '/herramientas/test-baja-laboral', tipo: 'secundario' },
    ],
    por: 'La urgencia es real y ayuda a decidir. Contada con calma y con una herramienta para calcularla, no suena a presión.',
  },
  {
    cuando: 'A la semana',
    dia: 'Día 7',
    objetivo: 'Que sepa quién la defendería',
    asunto: 'Más de 25 años al lado de quien sufre acoso',
    previa: 'En 2005 logramos la primera condena en España a empresa y acosador a la vez.',
    foto: 'jesus-retrato',
    fotoAlt: 'Jesús Tierno Centella, socio director del despacho',
    video: { id: 'lVoi2ijP1bA', titulo: 'Jesús Tierno entrevista al psicólogo Iñaki Piñuel sobre el acoso laboral' },
    parrafos: [
      'Hola, Laura. Soy Jesús Tierno. Llevo más de 25 años en derecho laboral, la mayor parte dedicado al acoso. En 2005 conseguimos la primera sentencia en España que condenó a la vez a la empresa y al acosador, y desde entonces hemos acompañado a muchas personas en tu misma situación.',
      'Si quieres conocer cómo lo vemos, en esta entrevista hablo con Iñaki Piñuel, uno de los mayores expertos en mobbing, sobre cómo reconocer el acoso y cómo salir de él.',
    ],
    botones: [
      { texto: 'Ver la entrevista', href: 'https://www.youtube.com/watch?v=lVoi2ijP1bA', tipo: 'principal' },
      { texto: 'Conocer al equipo', href: '/jesus-tierno', tipo: 'secundario' },
    ],
    por: 'La confianza se gana con una cara y una historia. Un vídeo convierte un despacho más en "el abogado que ya conozco".',
  },
  {
    cuando: 'A los 10 días',
    dia: 'Día 10',
    objetivo: 'Demostrar con un caso real',
    asunto: '123.000 euros para una catedrática que sufrió acoso en su universidad',
    previa: 'La sentencia que recogió El Español en 2024, y lo que significa para ti.',
    foto: 'mazo',
    fotoAlt: 'Un mazo de juez sobre la mesa',
    parrafos: [
      'Hola, Laura. En 2024, la Universidad Rey Juan Carlos fue condenada a pagar 123.000 euros a una catedrática por no haber evitado el acoso que sufría de un compañero. El caso lo llevamos nosotros y lo contó El Español.',
      'Cada caso es distinto y nadie puede prometerte un resultado. Pero sí te puede servir saber que la ley protege a quien sufre acoso, también frente a una gran institución.',
    ],
    botones: [
      { texto: 'Leer el caso completo', href: '/sentencias/urjc-123000-euros-docente-2024', tipo: 'principal' },
      { texto: 'Hablar de mi caso', href: WA('Hola, he leído el caso de la URJC y me gustaría hablar del mío.'), tipo: 'whatsapp' },
    ],
    por: 'Un caso real, con fuente pública, vale más que cualquier promesa. Y respeta las normas de la Abogacía: informa sin prometer resultados.',
  },
  {
    cuando: 'A las 2 semanas',
    dia: 'Día 14',
    objetivo: 'Invitar a dar el paso, sin presionar',
    asunto: '¿Hablamos de tu caso, Laura?',
    previa: 'Una hora, tus documentos y una hoja de ruta clara. Así es la primera consulta.',
    foto: 'jesus-con-abogada',
    fotoAlt: 'Jesús Tierno con una abogada del despacho',
    parrafos: [
      'Hola, Laura. Han pasado dos semanas desde que nos escribiste. Si todavía lo estás pensando, es normal: es una decisión importante.',
      'Así es la primera consulta: una hora con un abogado especializado (150 € + IVA) o conmigo (250 € + IVA). Revisamos tus documentos, te decimos con sinceridad si tienes caso y te llevas por escrito los pasos a seguir. Puede ser en el despacho, en la calle Jorge Juan, o por videollamada.',
      'Y si ya lo has resuelto o no es el momento, no pasa nada: responde "baja" y no te escribiremos más.',
    ],
    botones: [
      { texto: 'Reservar mi consulta', href: '/contacto', tipo: 'principal' },
      LLAMAR,
      WHATSAPP,
    ],
    por: 'La llamada a la acción más clara, cuando ya ha recibido ayuda y conoce al despacho. Con todas las formas de contacto a un toque, y la salida fácil para quien no quiere más.',
  },
  {
    cuando: 'Una vez al mes, 3 meses',
    dia: 'Meses 1 a 3',
    objetivo: 'Seguir presentes por si ahora sí es el momento',
    asunto: 'Lo que ha cambiado este mes y te puede afectar',
    previa: 'Una sentencia nueva, un cambio de ley o una duda que nos llega mucho.',
    foto: 'libros',
    fotoAlt: 'Libros de derecho en el despacho',
    parrafos: [
      'Hola, Laura. Una vez al mes te contamos, en dos minutos, lo que ha cambiado y te puede afectar: una sentencia del Supremo, un cambio en las bajas, una duda que nos llega mucho. Siempre con el enlace para leerlo entero.',
    ],
    botones: [
      { texto: 'Leer el artículo del mes', href: '/blog', tipo: 'principal' },
      { texto: 'Hablar con un abogado', href: '/contacto', tipo: 'secundario' },
    ],
    por: 'Muchas personas no deciden en dos semanas. Un correo útil al mes hace que, cuando decidan, el primer despacho que recuerden sea el tuyo.',
  },
];

export const TRAS_CONSULTA: Correo = {
  cuando: 'Después de la consulta',
  dia: 'Al día siguiente',
  objetivo: 'Cerrar bien y pedir su opinión',
  asunto: 'Tu hoja de ruta, Laura, y una petición',
  previa: 'Lo que hablamos ayer, por escrito, y los siguientes pasos.',
  foto: 'reunion-cliente',
  fotoAlt: 'Una reunión con una clienta en el despacho',
  parrafos: [
    'Hola, Laura. Gracias por venir ayer. Te dejamos por escrito lo que hablamos y los siguientes pasos, para que lo tengas todo a mano.',
    'Y una petición: si tienes un minuto, tu opinión en Google ayuda mucho a otras personas que están pasando por lo mismo.',
  ],
  botones: [
    { texto: 'Dejar mi opinión en Google', href: 'https://www.google.com/maps/place/Tierno+Centella+Abogados/', tipo: 'principal' },
    WHATSAPP,
  ],
  por: 'Se envía a todas las personas que han tenido consulta, sin filtrar (es lo que exige Google). Ataca la queja de "después se desentienden" y suma reseñas recientes.',
};
