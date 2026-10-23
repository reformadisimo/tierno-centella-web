// Qué está buscando cada persona según su navegación, para adaptar las ventanas emergentes.
// Se guarda solo en esta pestaña (sessionStorage): no sale del navegador ni identifica a nadie.

export type Tema = 'despido' | 'acoso' | 'incapacidad' | 'mujer' | 'sentencias' | 'empresas' | 'herramientas' | 'general';

const CLAVE = 'tc-recorrido';

export function temaDeRuta(ruta: string): Tema | null {
  const r = ruta.toLowerCase();
  if (/empresa|autodiagnostico|canal-de-denuncias|protocolo|company|whistleblowing/.test(r)) return 'empresas';
  if (/sentencias|rulings/.test(r)) return 'sentencias';
  if (/mujer|women|embaraz|pregnan|lactancia|nacimiento|birth|reduccion|reduced|calendario-permisos|brecha|pay-gap/.test(r)) return 'mujer';
  if (/acoso|harass|mobbing|mapa-de-pruebas|piñuel|convenio-190/.test(r)) return 'acoso';
  if (/despid|dismiss|finiquito|indemnizacion|paro|smac|conciliacion|periodo-de-prueba|audiencia-previa|plazos|carta|extincion|articulo-50|compensation|settlement|unemployment|deadlines|article-50/.test(r)) return 'despido';
  if (/incapacidad|disability|inss|baja|sick-leave|comprobador/.test(r)) return 'incapacidad';
  if (/herramientas|tools/.test(r)) return 'herramientas';
  return null;
}

export function anotarVisita(ruta: string) {
  try {
    const lista: string[] = JSON.parse(sessionStorage.getItem(CLAVE) || '[]');
    if (lista[lista.length - 1] !== ruta) lista.push(ruta);
    sessionStorage.setItem(CLAVE, JSON.stringify(lista.slice(-30)));
  } catch {}
}

export function recorrido(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE) || '[]');
  } catch {
    return [];
  }
}

// El tema de la página actual manda; si no tiene, el que más ha leído en esta visita.
export function temaActual(ruta: string): Tema {
  const propio = temaDeRuta(ruta);
  if (propio && propio !== 'herramientas') return propio;
  const cuenta: Record<string, number> = {};
  for (const r of recorrido()) {
    const t = temaDeRuta(r);
    if (t && t !== 'herramientas') cuenta[t] = (cuenta[t] || 0) + 1;
  }
  const mejor = Object.entries(cuenta).sort((a, b) => b[1] - a[1])[0];
  return (mejor?.[0] as Tema) ?? propio ?? 'general';
}

export type Ventana = {
  etiqueta: string;
  titulo: string;
  texto: string;
  principal: { href: string; texto: string };
  secundaria?: { href: string; texto: string };
  whatsapp: string;
};

export const VENTANAS: Record<Tema, Ventana> = {
  despido: {
    etiqueta: 'Si te han despedido',
    titulo: 'El reloj ya corre: 20 días hábiles',
    texto: 'Calcula en un minuto el último día para reclamar y lo que te corresponde. Gratis y sin dejar datos.',
    principal: { href: '/herramientas/plazos', texto: 'Calcular mi plazo' },
    secundaria: { href: '/calculadora-indemnizacion', texto: 'Mi indemnización' },
    whatsapp: 'Hola, me han despedido y quiero saber qué plazo tengo.',
  },
  acoso: {
    etiqueta: 'Si lo estás viviendo',
    titulo: '¿Es acoso lo que te pasa?',
    texto: 'Siete preguntas para saberlo, y un mapa para ver qué pruebas tienes ya y cuáles te faltan. Sin dejar datos.',
    principal: { href: '/herramientas/test-acoso', texto: 'Hacer el test' },
    secundaria: { href: '/herramientas/mapa-de-pruebas', texto: 'Mis pruebas' },
    whatsapp: 'Hola, creo que sufro acoso en el trabajo y quiero consultarlo.',
  },
  incapacidad: {
    etiqueta: 'Incapacidad y bajas',
    titulo: '¿Qué grado te puede corresponder?',
    texto: 'Mira qué grado encaja con tu situación, cuánto se cobra y qué plazo tienes si el INSS te la ha denegado.',
    principal: { href: '/herramientas/comprobador-incapacidad', texto: 'Comprobarlo' },
    secundaria: { href: '/herramientas/test-baja-laboral', texto: '¿Mi baja es laboral?' },
    whatsapp: 'Hola, quiero consultar un caso de incapacidad permanente.',
  },
  mujer: {
    etiqueta: 'Embarazo y conciliación',
    titulo: 'Tus fechas, calculadas al momento',
    texto: 'Las 19 semanas del permiso, la lactancia y hasta cuándo estás protegida frente al despido, con tu fecha.',
    principal: { href: '/herramientas/calendario-permisos', texto: 'Ver mis fechas' },
    secundaria: { href: '/herramientas/calculadora-reduccion-jornada', texto: 'Reducción de jornada' },
    whatsapp: 'Hola, quiero consultar un tema de embarazo o conciliación.',
  },
  sentencias: {
    etiqueta: 'Casos reales',
    titulo: '¿Tu caso se parece a alguno?',
    texto: 'Jesús Tierno y su equipo llevan más de 25 años con casos así. Cuéntanos el tuyo y te decimos qué plazos corren.',
    principal: { href: '/contacto', texto: 'Contar mi caso' },
    secundaria: { href: '/herramientas', texto: 'Herramientas gratis' },
    whatsapp: 'Hola, he visto vuestras sentencias y mi caso se parece. Quiero consultarlo.',
  },
  empresas: {
    etiqueta: 'Para empresas y colegios',
    titulo: '¿Cumplís con el protocolo de acoso?',
    texto: 'Autodiagnóstico gratuito de protocolo de acoso, canal de denuncias y plan de igualdad, en cinco minutos.',
    principal: { href: '/herramientas/autodiagnostico-acoso-empresas', texto: 'Hacer el autodiagnóstico' },
    secundaria: { href: '/empresas', texto: 'Qué hacemos' },
    whatsapp: 'Hola, escribo de una empresa y quiero información sobre protocolos de acoso.',
  },
  herramientas: {
    etiqueta: 'Tu resultado',
    titulo: '¿Quieres que lo mire un abogado?',
    texto: 'Las herramientas orientan; un abogado del despacho te dice si tu caso tiene recorrido. Por teléfono o WhatsApp te lo decimos.',
    principal: { href: '/contacto', texto: 'Que me llaméis' },
    whatsapp: 'Hola, he usado una herramienta de la web y quiero consultar el resultado.',
  },
  general: {
    etiqueta: 'Te orientamos',
    titulo: '¿Qué te está pasando en el trabajo?',
    texto: 'Despido, acoso, incapacidad o conciliación: elige tu tema y te llevamos a lo que necesitas, o pregúntale al chat.',
    principal: { href: '/herramientas', texto: 'Ver herramientas' },
    secundaria: { href: '/sentencias', texto: 'Casos ganados' },
    whatsapp: 'Hola, quiero consultar un problema laboral.',
  },
};

export const VENTANAS_EN: Partial<Record<Tema, Ventana>> & { general: Ventana } = {
  despido: {
    etiqueta: 'If you have been dismissed',
    titulo: 'The clock is ticking: 20 working days',
    texto: 'In Spain you have 20 working days to challenge a dismissal. Tell us the date and we will tell you your last day.',
    principal: { href: '/en/dismissal', texto: 'What to do now' },
    secundaria: { href: '/en/tools/deadlines', texto: 'My deadline' },
    whatsapp: 'Hello, I have been dismissed and I would like to know my deadline.',
  },
  acoso: {
    etiqueta: 'If you are going through it',
    titulo: 'Is it workplace harassment?',
    texto: 'Read how to tell, and what evidence helps. We have been focused on harassment cases for more than 25 years.',
    principal: { href: '/en/tools/harassment-test', texto: 'Take the test' },
    secundaria: { href: '/en/tools/harassment-evidence-map', texto: 'My evidence' },
    whatsapp: 'Hello, I think I am being harassed at work and would like to ask about it.',
  },
  incapacidad: {
    etiqueta: 'Permanent disability',
    titulo: 'Which degree could apply to you?',
    texto: 'The four degrees, what each one pays, and what to do if the social security office turns you down.',
    principal: { href: '/en/tools/permanent-disability-checker', texto: 'Check it' },
    secundaria: { href: '/en/permanent-disability/degrees-of-permanent-disability', texto: 'The degrees' },
    whatsapp: 'Hello, I would like to ask about a permanent disability case.',
  },
  mujer: {
    etiqueta: 'Pregnancy and family',
    titulo: 'Know your leave and your protection',
    texto: 'Birth leave, breastfeeding and when a dismissal is void. We explain it in English.',
    principal: { href: '/en/tools/birth-leave-calendar', texto: 'My leave dates' },
    secundaria: { href: '/en/women-at-work', texto: 'Read more' },
    whatsapp: 'Hello, I would like to ask about pregnancy or family leave at work.',
  },
  sentencias: {
    etiqueta: 'Real cases',
    titulo: 'Does your case sound similar?',
    texto: 'Jesús Tierno and his team have handled cases like these for over 25 years. Tell us yours.',
    principal: { href: '/en/contact', texto: 'Tell us your case' },
    whatsapp: 'Hello, I have read your rulings and my case is similar.',
  },
  general: {
    etiqueta: 'We speak English',
    titulo: 'A problem at work in Spain?',
    texto: 'Dismissal, harassment, disability or family leave. Tell us what is happening and we will guide you, in English.',
    principal: { href: '/en/contact', texto: 'Contact us' },
    secundaria: { href: '/en/tools', texto: 'Free tools' },
    whatsapp: 'Hello, I have a problem at work and would like to ask about it.',
  },
};
