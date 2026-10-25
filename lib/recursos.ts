// Enlaces útiles a organismos oficiales. Son dominios oficiales conocidos; conviene repasarlos de vez en cuando.
export type Recurso = { nombre: string; url: string; cuando: string; consejo?: string };
export type GrupoRecursos = { id: string; titulo: string; intro: string; recursos: Recurso[] };

export const GRUPOS_RECURSOS: GrupoRecursos[] = [
  {
    id: 'sentencias-leyes',
    titulo: 'Sentencias y leyes',
    intro: 'Para leer lo que dicen los jueces y el texto exacto de las normas, sin intermediarios.',
    recursos: [
      {
        nombre: 'CENDOJ: buscador de jurisprudencia del Poder Judicial',
        url: 'https://www.poderjudicial.es/search/indexAN.jsp',
        cuando: 'Cuando quieras leer sentencias reales de los juzgados y tribunales, por ejemplo de despido o de incapacidad.',
        consejo: 'Filtra por jurisdicción Social y busca por una palabra clave, como "acoso laboral" o "despido improcedente".',
      },
      {
        nombre: 'BOE: Estatuto de los Trabajadores',
        url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430',
        cuando: 'Para comprobar qué dice la ley sobre despidos, vacaciones, jornada, permisos o contratos.',
      },
      {
        nombre: 'BOE: Ley General de la Seguridad Social',
        url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724',
        cuando: 'Para consultar bajas, incapacidades, paro y pensiones en su texto oficial.',
      },
      {
        nombre: 'BOE: Ley Reguladora de la Jurisdicción Social',
        url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2011-15936',
        cuando: 'Para entender cómo es un juicio laboral: plazos, demanda, pruebas y recursos.',
      },
    ],
  },
  {
    id: 'despido-conflicto',
    titulo: 'Si te han despedido o tienes un conflicto',
    intro: 'Los organismos por los que suele pasar un despido o una reclamación a la empresa.',
    recursos: [
      {
        nombre: 'SMAC de la Comunidad de Madrid (conciliación)',
        url: 'https://www.comunidad.madrid/empleo/espacio-smac',
        cuando: 'Antes de demandar en un despido o una reclamación de cantidad suele hacer falta intentar la conciliación. Se presenta aquí la papeleta.',
        consejo: 'Presentarla dentro de los 20 días hábiles detiene el plazo de la demanda. Mira antes tu plazo en nuestra herramienta.',
      },
      {
        nombre: 'Inspección de Trabajo y Seguridad Social',
        url: 'https://www.mites.gob.es/itss/',
        cuando: 'Para denunciar incumplimientos de la empresa: horas sin pagar, falta de alta, acoso o riesgos laborales.',
      },
      {
        nombre: 'FOGASA: Fondo de Garantía Salarial',
        url: 'https://www.mites.gob.es/fogasa/',
        cuando: 'Si la empresa no te paga salarios o indemnización porque es insolvente o está en concurso.',
      },
    ],
  },
  {
    id: 'paro-seguridad-social',
    titulo: 'Paro, bajas e incapacidad',
    intro: 'Para tramitar prestaciones y consultar tus datos con la Administración.',
    recursos: [
      {
        nombre: 'SEPE: Servicio Público de Empleo Estatal',
        url: 'https://www.sepe.gob.es',
        cuando: 'Para pedir el paro, pedir cita y consultar tus prestaciones. Tras un despido, tienes 15 días hábiles para solicitarlo.',
      },
      {
        nombre: 'Sede electrónica de la Seguridad Social',
        url: 'https://sede.seg-social.gob.es',
        cuando: 'Para pedir tu vida laboral, tramitar una incapacidad permanente o revisar tus bases de cotización.',
      },
      {
        nombre: 'Ministerio de Trabajo y Economía Social',
        url: 'https://www.mites.gob.es',
        cuando: 'Para consultar novedades normativas, convenios colectivos y guías oficiales sobre derechos laborales.',
      },
    ],
  },
  {
    id: 'justicia',
    titulo: 'Justicia y tribunales',
    intro: 'Para seguir un procedimiento o conocer cómo funciona la justicia.',
    recursos: [
      {
        nombre: 'Poder Judicial',
        url: 'https://www.poderjudicial.es',
        cuando: 'Para información general sobre juzgados y tribunales y para encontrar el que te corresponde.',
      },
      {
        nombre: 'Sede judicial electrónica',
        url: 'https://sedejudicial.justicia.es',
        cuando: 'Para consultar trámites y presentar escritos con certificado digital, si tu abogado te lo indica.',
      },
    ],
  },
];

export const TELEFONOS_AYUDA = [
  { numero: '016', texto: 'Atención a víctimas de violencia de género. Gratuito y no deja rastro en la factura.', href: 'tel:016' },
  { numero: '024', texto: 'Línea de atención a la conducta suicida. Gratuita, 24 horas.', href: 'tel:024' },
  { numero: '112', texto: 'Emergencias, en cualquier situación de peligro inmediato.', href: 'tel:112' },
];
