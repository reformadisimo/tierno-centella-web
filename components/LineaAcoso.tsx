import LineaPasos, { PasoLinea } from './LineaPasos';

const PASOS: PasoLinea[] = [
  { cuando: 'Desde el primer día', titulo: 'Apunta lo que pasa', texto: 'Fecha, hora, lugar, qué se dijo o hizo y quién lo vio. Guarda mensajes, correos y audios tal cual. Un diario sencillo vale mucho más adelante.', enlace: { href: '/herramientas/que-guardar', texto: 'Qué tengo que guardar' } },
  { cuando: 'Cuando puedas', titulo: 'Cuéntalo a alguien de confianza', texto: 'Una compañera, un familiar o un delegado sindical. No para decidir nada, sino para no cargar sola o solo con esto. Si te sientes mal, ve al médico y pide que quede por escrito.' },
  { cuando: 'Si existe', titulo: 'Canal o protocolo de la empresa', texto: 'Muchas empresas tienen un protocolo de acoso o un canal interno. Usarlo deja constancia de que la empresa lo sabe. Conviene presentarlo por escrito y guardar copia.' },
  { cuando: 'Cuando haga falta', titulo: 'Inspección de Trabajo', texto: 'Se puede presentar una denuncia ante la Inspección de Trabajo y Seguridad Social. No sustituye a la vía judicial, pero puede dar un informe útil.', enlace: { href: '/recursos', texto: 'Ver recursos oficiales' } },
  { cuando: 'Antes de tomar decisiones', titulo: 'Habla con un abogado', texto: 'No hace falta dejar el trabajo ni firmar nada para consultar. Un abogado valora las pruebas, ordena los pasos y te explica qué opciones tienes antes de que decidas.' },
  { cuando: 'Si se decide reclamar', titulo: 'Vía judicial', texto: 'Según el caso, se puede pedir la extinción del contrato con indemnización por incumplimiento grave de la empresa, y la protección de derechos fundamentales. Los plazos dependen de cada situación, por eso conviene mirarlos pronto.', enlace: { href: '/herramientas/plazos', texto: 'Calcular mi plazo' } },
];

export default function LineaAcoso() {
  return <LineaPasos titulo="Si sufres acoso, paso a paso" etiqueta="Recorrido ante un caso de acoso laboral" pasos={PASOS} />;
}
