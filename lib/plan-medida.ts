// «Tu plan a medida, en 2 minutos» (apartado 23 bis de la guía de Jesús). Casi todo con botones y rangos.
// varias: se pueden marcar varias opciones. Sin facturación: solo lo que hace falta para el plan.
export type PreguntaPlan = { n: number; bloque: string; pregunta: string; opciones?: string[]; varias?: boolean; pista?: string };

export const PREGUNTAS_PLAN: PreguntaPlan[] = [
  { n: 1, bloque: 'Lo que tienes hoy', pregunta: '¿Quién te lleva hoy el marketing?', opciones: ['Una agencia', 'Un freelance', 'Alguien del despacho', 'Nadie', 'No lo sé'], varias: true, pista: 'Si quieres, quién y para qué: web, SEO, anuncios, redes' },
  { n: 2, bloque: 'Lo que tienes hoy', pregunta: '¿Cuánto les pagas al mes, en total, sin contar lo que inviertes en anuncios?', opciones: ['Nada', 'Menos de 300 €', '300 a 800 €', '800 a 1.500 €', 'Más de 1.500 €', 'Prefiero no decirlo'] },
  { n: 3, bloque: 'Lo que tienes hoy', pregunta: '¿Cuánto inviertes al mes en anuncios (lo que te cobra Google o Meta)?', opciones: ['Nada', 'Menos de 300 €', '300 a 1.000 €', '1.000 a 3.000 €', 'Más de 3.000 €', 'No lo sé'] },
  { n: 4, bloque: 'Lo que tienes hoy', pregunta: '¿Dónde se anuncia hoy el despacho?', opciones: ['Google', 'Facebook e Instagram', 'LinkedIn', 'Prensa o notas de prensa', 'Radio', 'Directorios de abogados', 'En ningún sitio'], varias: true },
  { n: 5, bloque: 'Lo que tienes hoy', pregunta: '¿Y el SEO (salir en Google sin pagar anuncios)?', opciones: ['Lo lleva una agencia', 'Lo hacemos nosotros', 'No hacemos nada', 'No lo sé'] },
  { n: 6, bloque: 'Tus consultas', pregunta: '¿Cuántas consultas nuevas os llegan al mes?', opciones: ['Menos de 10', '10 a 30', '30 a 60', 'Más de 60', 'No lo sé'] },
  { n: 7, bloque: 'Tus consultas', pregunta: '¿De dónde llegan sobre todo?', opciones: ['Recomendación', 'Google', 'Anuncios', 'Redes sociales', 'Colegios o sindicatos', 'Clientes que repiten', 'No lo sé'], varias: true },
  { n: 8, bloque: 'Tus consultas', pregunta: 'De cada 10 consultas, ¿cuántas acaban siendo clientes?', opciones: ['1 o 2', '3 o 4', '5 o más', 'No lo sé'] },
  { n: 9, bloque: 'Tus consultas', pregunta: '¿Cuánto vale de media un cliente para el despacho?', opciones: ['Menos de 500 €', '500 a 1.500 €', '1.500 a 3.000 €', 'Más de 3.000 €', 'Prefiero no decirlo'], pista: 'No te pedimos tu facturación. Solo esto, para saber cuánto tiene sentido invertir para conseguir un cliente' },
  { n: 10, bloque: 'Hacia dónde quieres ir', pregunta: '¿Qué casos quieres más?', opciones: ['Acoso laboral', 'Despidos', 'Incapacidad', 'Mujer y trabajo', 'Empresas', 'Otros'], varias: true },
  { n: 11, bloque: 'Hacia dónde quieres ir', pregunta: '¿Cuántas consultas más podríais atender al mes?', opciones: ['Vamos justos', 'Unas 10 más', 'Unas 20 más', 'Todas las que lleguen'] },
  { n: 12, bloque: 'Hacia dónde quieres ir', pregunta: '¿Qué te preocupa más hoy?', opciones: ['Que entran pocos clientes', 'Que entran casos que no son nuestros', 'El tiempo que se va en correos y llamadas', 'Pagar sin saber qué trae cada proveedor', 'Que la web no está a la altura'], varias: true },
  { n: 13, bloque: 'Hacia dónde quieres ir', pregunta: 'Si los resultados acompañan, ¿qué presupuesto mensual total te encajaría (anuncios incluidos)?', opciones: ['Menos de 1.000 €', '1.000 a 2.000 €', '2.000 a 4.000 €', 'Más de 4.000 €', 'Prefiero hablarlo'] },
];
