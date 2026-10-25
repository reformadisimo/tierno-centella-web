import LineaPasos, { PasoLinea } from './LineaPasos';

const PASOS: PasoLinea[] = [
  { cuando: 'Durante la baja', titulo: 'Incapacidad temporal', texto: 'La baja médica puede durar hasta 12 meses, ampliables por otros 6 si hay expectativas de recuperación. Sigue las citas médicas y guarda todos los informes.' },
  { cuando: 'Cerca del final de la baja', titulo: 'Valoración del INSS', texto: 'El INSS estudia si hay una incapacidad permanente. Puede iniciarse de oficio o a petición tuya. Revisa que tu historia clínica esté completa y actualizada.' },
  { cuando: 'Tras la valoración', titulo: 'Resolución', texto: 'El INSS resuelve por escrito: puede reconocer un grado (parcial, total, absoluta o gran invalidez) o denegarlo. Guarda la resolución y apunta el día en que la recibes.' },
  { cuando: 'Plazo corto', titulo: 'Reclamación previa', texto: 'Si no estás de acuerdo, hay que reclamar ante el propio INSS antes de ir al juzgado. El plazo es de unos 30 días hábiles desde que recibes la resolución, así que no conviene esperar.', enlace: { href: '/herramientas/plazos', texto: 'Calcular mi plazo' } },
  { cuando: 'Tras la reclamación', titulo: 'Demanda ante el juzgado', texto: 'Si la reclamación se rechaza o no se contesta, se puede demandar ante el Juzgado de lo Social. Tu abogado preparará los informes médicos y periciales que respalden tu caso.' },
  { cuando: 'Semanas o meses', titulo: 'Juicio y sentencia', texto: 'El juez revisa los informes y escucha a las partes. La sentencia puede reconocer un grado distinto del que decidió el INSS. También cabe recurso.', enlace: { href: '/herramientas', texto: 'Ver las herramientas' } },
];

export default function LineaIncapacidad() {
  return <LineaPasos titulo="La incapacidad permanente, paso a paso" etiqueta="Recorrido de una incapacidad permanente" pasos={PASOS} />;
}
