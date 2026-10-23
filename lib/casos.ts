export type Caso = {
  slug: string;
  materia: 'Acoso laboral' | 'Despido' | 'Incapacidad' | 'Conciliación' | 'Prevención de riesgos';
  titulo: string;
  organo: string;
  fecha: string; // texto legible
  anio: number;
  resumen: string;
  hechos: string[];
  resultado: string;
  porQueImporta: string;
  fuente?: { nombre: string; url: string };
  pendiente?: string; // lo que falta confirmar con el despacho
};

// Solo casos documentados por el propio despacho o por prensa. Lo no confirmado se marca como pendiente.
export const CASOS: Caso[] = [
  {
    slug: 'primera-condena-al-acosador-2005',
    materia: 'Acoso laboral',
    titulo: 'La primera condena en España a la empresa y al acosador a la vez',
    organo: 'Juzgado de lo Social n.º 29 de Madrid. Confirmada por el TSJ de Madrid',
    fecha: '30 de septiembre de 2005',
    anio: 2005,
    resumen:
      'Un trabajador sufrió durante tres años el hostigamiento de su directora general hasta que lo despidieron. El juzgado condenó a la empresa y a la directora, de forma solidaria, a indemnizarle con 30.000 euros.',
    hechos: [
      'Gritos frecuentes delante de otros.',
      'Burlas imitando sus gestos.',
      'Expresiones humillantes dirigidas a que se marchara de la empresa.',
    ],
    resultado:
      'Condena solidaria a la empresa y a la acosadora a pagar 30.000 euros. El Tribunal Superior de Justicia de Madrid desestimó el recurso.',
    porQueImporta:
      'Hasta entonces se reclamaba a la empresa. Esta sentencia hizo responder también a la persona que acosaba, con su propio patrimonio.',
    fuente: {
      nombre: 'Publicado por el despacho en 2013',
      url: 'https://tiernocentella.es/primera-sentencia-que-obliga-al-acosador-laboral-a-pagar-a-la-victima/',
    },
  },
  {
    slug: 'acoso-administracion-educativa-castilla-y-leon-2011',
    materia: 'Acoso laboral',
    titulo: 'La Consejería de Educación de Castilla y León, ante su responsabilidad por acoso',
    organo: 'TSJ de Castilla y León (Valladolid), Sala de lo Contencioso-Administrativo, Sección 3.ª. Sentencia 2491/2011',
    fecha: '2 de noviembre de 2011',
    anio: 2011,
    resumen:
      'Una maestra de taller de la Escuela de Arte de León reclamó a la Administración por no protegerla del acoso de un superior durante varios cursos. El despacho la presenta como la primera condena por acoso a la administración educativa de Castilla y León.',
    hechos: [
      'Falsas acusaciones, insultos y trato humillante de un jefe de departamento durante varios cursos.',
      'Bloqueo de los medios del taller y críticas a su trabajo.',
      'Baja médica con un cuadro depresivo vinculado al acoso.',
    ],
    resultado: 'Reclamación de responsabilidad patrimonial de la Administración por no actuar frente al riesgo psicosocial.',
    porQueImporta:
      'Abrió la vía para que el profesorado de la enseñanza pública reclame a la propia Administración cuando no le protege.',
    fuente: { nombre: 'Publicado por el despacho en 2014', url: 'https://tiernocentella.es/sentencia-sobre-acoso-laboral/' },
    pendiente: 'Confirmar con el despacho la cuantía concedida en el fallo.',
  },
  {
    slug: 'urjc-123000-euros-docente-2024',
    materia: 'Acoso laboral',
    titulo: '123.000 euros para una catedrática a la que su universidad no protegió',
    organo: 'Universidad Rey Juan Carlos',
    fecha: 'Abril de 2024',
    anio: 2024,
    resumen:
      'La Universidad Rey Juan Carlos fue condenada a pagar 122.963 euros a una catedrática por no evitar el acoso laboral que sufría ni aplicar medidas de prevención psicosocial.',
    hechos: ['Acoso continuado en su departamento.', 'La universidad no activó la prevención de riesgos psicosociales.'],
    resultado: 'Indemnización de 122.963 euros.',
    porQueImporta: 'Recuerda que la empresa o la Administración responde cuando sabe del acoso y no hace nada.',
    fuente: {
      nombre: 'El Español, 2 de abril de 2024',
      url: 'https://www.elespanol.com/reportajes/20240402/universidad-rey-juan-carlos-condenada-pagar-eur-docente-no-evitar-acoso-laboral/844415900_0.html',
    },
    pendiente: 'El despacho lo presenta en Instagram (21/10/2024) como su último éxito. Confirmar órgano y fecha de la sentencia.',
  },
  {
    slug: 'despido-represalia-permiso-hija-2025',
    materia: 'Conciliación',
    titulo: 'Despedida por pedir un permiso para una actividad escolar de su hija',
    organo: 'Pendiente de confirmar con el despacho',
    fecha: 'Octubre de 2025',
    anio: 2025,
    resumen:
      'El tribunal reconoció que el despido fue una represalia porque la trabajadora había pedido un permiso para atender una actividad escolar de su hija menor.',
    hechos: ['La trabajadora solicitó un permiso para una actividad escolar de su hija.', 'Poco después, la empresa la despidió.'],
    resultado:
      'Vulneración de la garantía de indemnidad e indemnización por daños y perjuicios equiparable a la de un despido improcedente.',
    porQueImporta: 'Pedir lo que la ley te reconoce para cuidar de tus hijos no puede costarte el trabajo.',
    fuente: { nombre: 'Publicado por el despacho en Instagram, 23 de octubre de 2025', url: 'https://www.instagram.com/reel/DQJTw63CkLn/' },
    pendiente: 'Pedir juzgado, fecha y cuantía.',
  },
  {
    slug: 'degradada-tras-pedir-permisos-2025',
    materia: 'Conciliación',
    titulo: 'Degradada por pedir permisos para cuidar a su pareja enferma',
    organo: 'Pendiente de confirmar con el despacho',
    fecha: 'Mayo de 2025',
    anio: 2025,
    resumen:
      'Tras pedir permisos por la enfermedad de su pareja, una responsable perdió su puesto, parte de sus ingresos y pasó a tareas administrativas. El juzgado extinguió su contrato con indemnización.',
    hechos: ['Pérdida del puesto de responsabilidad.', 'Reducción de ingresos.', 'Relegada a tareas administrativas.'],
    resultado: 'Extinción del contrato a petición de la trabajadora, con indemnización y reconocimiento de la vulneración de derechos fundamentales.',
    porQueImporta: 'Una modificación encubierta de condiciones como castigo por cuidar es discriminatoria, y permite irse con indemnización.',
    fuente: { nombre: 'Publicado por el despacho en Instagram, 13 de mayo de 2025', url: 'https://www.instagram.com/reel/DJl-ztCtNi-/' },
    pendiente: 'Pedir juzgado, fecha y cuantía.',
  },
  {
    slug: 'despido-nulo-represalia-denuncia-interna-2025',
    materia: 'Despido',
    titulo: 'Nulo un despido "objetivo" que era una represalia',
    organo: 'Pendiente de confirmar con el despacho',
    fecha: 'Septiembre de 2025',
    anio: 2025,
    resumen:
      'La empresa alegó causas objetivas, pero el despido respondía a que el trabajador había denunciado irregularidades internas. El juzgado lo declaró nulo.',
    hechos: ['Denuncia interna de irregularidades.', 'Despido posterior por supuestas causas objetivas.'],
    resultado: 'Despido nulo: readmisión y salarios de tramitación.',
    porQueImporta: 'Denunciar dentro de la empresa está protegido. Si te despiden por ello, el despido es nulo.',
    fuente: { nombre: 'Publicado por el despacho en Instagram, 16 de septiembre de 2025', url: 'https://www.instagram.com/reel/DOqXRiIjDCO/' },
    pendiente: 'Pedir juzgado y fecha.',
  },
  {
    slug: 'prevencion-riesgos-centro-educativo-2025',
    materia: 'Prevención de riesgos',
    titulo: 'Una docente con discapacidad a la que no adaptaron el puesto',
    organo: 'Pendiente de confirmar con el despacho. Juicio celebrado el 22 de octubre de 2025',
    fecha: 'Noviembre de 2025',
    anio: 2025,
    resumen:
      'Una trabajadora de un centro educativo con un 39 % de discapacidad tras un accidente de trabajo pidió adaptar su puesto. No se hizo, sus dolencias se agravaron y sufrió daño psicológico. El juzgado apreció una inacción absoluta en prevención de riesgos.',
    hechos: [
      'Accidente de trabajo y discapacidad reconocida del 39 %.',
      'Peticiones de adaptación del puesto desatendidas desde 2018.',
      'Conflicto con el equipo directivo y daño psicológico.',
    ],
    resultado: 'Sentencia favorable por incumplimiento de la normativa de prevención de riesgos laborales.',
    porQueImporta: 'No adaptar el puesto a quien lo necesita es un incumplimiento que se indemniza.',
    fuente: { nombre: 'Serie de vídeos del despacho con Irene Ramos, 26 de noviembre de 2025', url: 'https://www.instagram.com/reel/DRg6D-8jcR2/' },
    pendiente: 'Pedir juzgado, fecha y cuantía.',
  },
  {
    slug: 'despido-prueba-gps',
    materia: 'Despido',
    titulo: 'Un despido basado en el GPS que no se sostuvo',
    organo: 'Pendiente de confirmar con el despacho',
    fecha: 'Pendiente',
    anio: 0,
    resumen: 'El despacho explica en vídeo un caso ganado en el que se discutió el uso de la geolocalización como prueba para despedir.',
    hechos: ['La empresa usó datos de GPS para justificar el despido.'],
    resultado: 'Sentencia favorable al trabajador, según el despacho.',
    porQueImporta: 'El control tecnológico tiene límites y la empresa debe informar de él antes de usarlo como prueba.',
    fuente: { nombre: 'Vídeo del despacho en YouTube', url: 'https://www.youtube.com/watch?v=IoBEF41_SCI' },
    pendiente: 'Pedir juzgado, fecha y fallo.',
  },
];

// Jurisprudencia de otros despachos que sirve para explicar la ley. Nunca se presenta como caso propio.
export const JURISPRUDENCIA = [
  {
    titulo: 'Tres años de prisión a un alcalde por acoso laboral',
    organo: 'Juzgado de lo Penal n.º 1 de Don Benito (Badajoz), 2020',
    texto:
      'Condenó al alcalde de Castuera por acoso laboral y lesiones al arquitecto municipal, con 33.100 euros de indemnización. Ejemplo de la vía penal del artículo 173.1 del Código Penal.',
    enlace: '/acoso-laboral/acoso-laboral-como-delito',
  },
  {
    titulo: 'Nulo el despido de una trabajadora que había denunciado acoso',
    organo: 'Juzgado de lo Social n.º 1 de Córdoba',
    texto:
      'La despidieron meses después de denunciar a su encargada. El juez vio represalia y declaró el despido nulo: readmisión y salarios de tramitación.',
    enlace: '/acoso-laboral/dejar-el-trabajo-por-acoso',
  },
];
