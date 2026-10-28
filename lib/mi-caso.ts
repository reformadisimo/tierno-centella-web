// "Mi caso es...": situaciones reales con las guías y herramientas que mejor las explican. Todo enlaza a páginas que ya existen.
export type Situacion = { id: string; titulo: string; texto: string; enlaces: { href: string; texto: string }[] };
export type GrupoSituaciones = { id: string; titulo: string; situaciones: Situacion[] };

export const GRUPOS_CASO: GrupoSituaciones[] = [
  {
    id: 'despido',
    titulo: 'Me han despedido',
    situaciones: [
      { id: 'carta-hoy', titulo: 'Me acaban de dar la carta de despido', texto: 'Lo primero es no firmar nada como conforme y apuntar la fecha: desde ese día corre el plazo.', enlaces: [{ href: '/blog/me-han-despedido-que-hago-las-primeras-48-horas', texto: 'Las primeras 48 horas' }, { href: '/herramientas/plazos', texto: 'Calcular mi plazo' }, { href: '/herramientas/revisa-tu-carta-de-despido', texto: 'Revisar mi carta' }] },
      { id: 'de-baja', titulo: 'Me han despedido estando de baja', texto: 'Estar de baja no impide el despido, pero puede cambiar mucho su calificación.', enlaces: [{ href: '/blog/despido-durante-la-baja-medica', texto: 'Despido durante la baja' }, { href: '/despido/despido-nulo-cuando', texto: 'Cuándo un despido es nulo' }, { href: '/herramientas/test-nulidad', texto: 'Test de nulidad' }] },
      { id: 'embarazada', titulo: 'Estoy embarazada y me han despedido', texto: 'Existe una protección reforzada. El plazo sigue corriendo, así que conviene mirarlo pronto.', enlaces: [{ href: '/mujer-y-trabajo/despido-embarazada', texto: 'Despido de una embarazada' }, { href: '/herramientas/plazos', texto: 'Calcular mi plazo' }] },
      { id: 'prueba', titulo: 'Me han echado en el periodo de prueba', texto: 'Tiene reglas propias, pero no es una carta blanca para la empresa.', enlaces: [{ href: '/blog/despido-en-periodo-de-prueba', texto: 'Despido en periodo de prueba' }] },
      { id: 'objetivo', titulo: 'Me despiden por causas económicas u organizativas', texto: 'La empresa tiene que cumplir unos requisitos y ofrecerte una indemnización.', enlaces: [{ href: '/blog/despido-objetivo-requisitos', texto: 'Requisitos del despido objetivo' }, { href: '/despido/despido-colectivo-ere-y-erte', texto: 'ERE y ERTE' }] },
      { id: 'finiquito', titulo: 'Me ofrecen un finiquito o un acuerdo para firmar', texto: 'Antes de firmar, comprueba qué incluye y qué estás perdiendo.', enlaces: [{ href: '/blog/finiquito-firmar-no-conforme', texto: 'Firmar el finiquito' }, { href: '/herramientas/calculadora-oferta-acuerdo', texto: '¿Es buena la oferta?' }, { href: '/herramientas/calculadora-finiquito', texto: 'Calcular mi finiquito' }] },
      { id: 'no-pagan', titulo: 'La empresa no me paga el sueldo, o ha cerrado', texto: 'Lo que te deben genera intereses y cada mes tiene un año para reclamarlo. Si la empresa no puede pagar, el FOGASA cubre una parte.', enlaces: [{ href: '/herramientas/calculadora-salarios-impagados', texto: 'Calculadora de salarios impagados' }, { href: '/herramientas/calculadora-fogasa', texto: 'Calculadora del FOGASA' }, { href: '/herramientas/test-extincion', texto: '¿Puedo irme con indemnización?' }] },
    ],
  },
  {
    id: 'acoso',
    titulo: 'Sufro acoso o un mal ambiente',
    situaciones: [
      { id: 'acoso-duda', titulo: 'No sé si lo que me pasa es acoso', texto: 'Es una duda muy común. Hay señales concretas que ayudan a distinguirlo.', enlaces: [{ href: '/acoso-laboral/como-saber-si-sufro-acoso', texto: 'Cómo saber si sufro acoso' }, { href: '/herramientas/test-acoso', texto: 'Hacer el test' }] },
      { id: 'acoso-pruebas', titulo: 'Quiero denunciar pero no tengo pruebas', texto: 'Se puede empezar a reunir pruebas desde hoy, y casi siempre hay más de las que parece.', enlaces: [{ href: '/blog/denunciar-acoso-laboral-sin-pruebas', texto: 'Denunciar sin pruebas' }, { href: '/acoso-laboral/como-demostrar-el-acoso', texto: 'Cómo demostrarlo' }, { href: '/herramientas/mapa-de-pruebas', texto: 'Mapa de pruebas' }] },
      { id: 'acoso-baja', titulo: 'Estoy de baja por ansiedad por culpa del trabajo', texto: 'La salud va primero. Conviene que el parte médico refleje lo que ocurre.', enlaces: [{ href: '/acoso-laboral/baja-por-ansiedad-por-acoso', texto: 'Baja por ansiedad' }, { href: '/herramientas/test-baja-laboral', texto: 'Test de baja laboral' }] },
      { id: 'acoso-irme', titulo: 'Pienso dejar el trabajo por el acoso', texto: 'Antes de irte, mira qué opciones hay para no perder tus derechos.', enlaces: [{ href: '/acoso-laboral/dejar-el-trabajo-por-acoso', texto: 'Dejar el trabajo por acoso' }, { href: '/blog/extincion-del-contrato-articulo-50', texto: 'Extinción del contrato (art. 50)' }, { href: '/herramientas/test-extincion', texto: 'Test de extinción' }] },
      { id: 'acoso-sexual', titulo: 'Sufro acoso sexual o por razón de sexo', texto: 'Hay protección específica y una obligación de la empresa de actuar.', enlaces: [{ href: '/mujer-y-trabajo/acoso-sexual-y-por-razon-de-sexo', texto: 'Acoso sexual y por razón de sexo' }, { href: '/acoso-laboral/protocolo-de-acoso-que-exigir', texto: 'Qué protocolo exigir' }] },
      { id: 'acusado', titulo: 'Me acusan de acoso y no es verdad', texto: 'También hay que defenderse con orden y sin precipitarse.', enlaces: [{ href: '/blog/me-han-denunciado-por-acoso-laboral-y-es-mentira', texto: 'Me han denunciado y es mentira' }] },
    ],
  },
  {
    id: 'incapacidad',
    titulo: 'Estoy enferma o enfermo, o me han denegado una prestación',
    situaciones: [
      { id: 'baja-cuanto', titulo: 'Quiero saber cuánto cobro de baja y cuánto dura', texto: 'Depende de la causa de la baja y de tu base de cotización.', enlaces: [{ href: '/herramientas/calculadora-baja-laboral', texto: 'Calculadora de la baja' }, { href: '/blog/cuanto-cobras-de-baja-y-cuanto-dura', texto: 'Cuánto se cobra de baja' }] },
      { id: 'incapacidad-pedir', titulo: 'Creo que no podré volver a mi trabajo', texto: 'Hay varios grados y no todos impiden trabajar.', enlaces: [{ href: '/incapacidad-permanente/grados-de-incapacidad-permanente', texto: 'Grados de incapacidad' }, { href: '/blog/como-solicitar-la-incapacidad-permanente', texto: 'Cómo solicitarla' }, { href: '/herramientas/comprobador-incapacidad', texto: 'Comprobador' }] },
      { id: 'incapacidad-deniegan', titulo: 'El INSS me ha denegado la incapacidad', texto: 'Se puede reclamar, y el plazo es corto.', enlaces: [{ href: '/blog/que-hacer-si-el-inss-deniega-la-incapacidad', texto: 'Qué hacer si lo deniegan' }, { href: '/incapacidad-permanente/reclamacion-previa-y-demanda', texto: 'Reclamación previa y demanda' }] },
      { id: 'incapacidad-expediente', titulo: 'Me han abierto un expediente de incapacidad', texto: 'No te asustes: es un trámite, y se puede preparar.', enlaces: [{ href: '/blog/tiene-iniciado-un-expediente-de-incapacidad-permanente', texto: 'Tengo un expediente abierto' }, { href: '/incapacidad-permanente/incapacidad-y-contrato-ley-2-2025', texto: 'Qué cambia con la ley 2/2025' }] },
    ],
  },
  {
    id: 'mujer',
    titulo: 'Trabajo, familia y derechos',
    situaciones: [
      { id: 'conciliar', titulo: 'Quiero reducir o adaptar mi jornada para cuidar', texto: 'Es un derecho, y hay una forma de pedirlo que te protege.', enlaces: [{ href: '/mujer-y-trabajo/reduccion-y-adaptacion-de-jornada', texto: 'Reducción y adaptación de jornada' }, { href: '/herramientas/calculadora-reduccion-jornada', texto: 'Calculadora' }] },
      { id: 'permisos', titulo: 'Voy a ser madre o padre', texto: 'Permisos, lactancia y fechas, explicado con calma.', enlaces: [{ href: '/mujer-y-trabajo/permisos-por-nacimiento-y-lactancia', texto: 'Permisos por nacimiento y lactancia' }, { href: '/herramientas/calendario-permisos', texto: 'Calendario de permisos' }] },
      { id: 'brecha', titulo: 'Creo que cobro menos que mis compañeros', texto: 'Existe un registro retributivo al que tienes derecho a acceder.', enlaces: [{ href: '/mujer-y-trabajo/brecha-salarial-registro-retributivo', texto: 'Brecha salarial' }] },
    ],
  },
];
