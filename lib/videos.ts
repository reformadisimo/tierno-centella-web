export type Video = { id: string; titulo: string; descripcion: string; tema: 'acoso' | 'despido' | 'empresas' | 'despacho'; fecha?: string };

// Vídeos públicos de YouTube; todos permiten la inserción (comprobado con oEmbed el 23/10/2026).
export const VIDEOS: Video[] = [
  {
    id: 'lVoi2ijP1bA',
    titulo: 'Acoso laboral: Jesús Tierno entrevista al psicólogo Iñaki Piñuel',
    descripcion: 'Cómo reconocer el acoso, qué le hace a quien lo sufre y cómo salir de él, contado por uno de los mayores expertos en mobbing.',
    tema: 'acoso',
    fecha: '2024-12-27',
  },
  {
    id: 'TwKRGi1LISY',
    titulo: 'Si te acosan en tu trabajo: Iñaki Piñuel entrevista a Jesús Tierno',
    descripcion: 'La defensa jurídica frente al acoso laboral, explicada por Jesús Tierno con preguntas del público.',
    tema: 'acoso',
    fecha: '2022-04-24',
  },
  {
    id: 'IoBEF41_SCI',
    titulo: 'Sentencia ganada: la prueba del GPS en un despido',
    descripcion: 'Un caso del despacho sobre los límites de la geolocalización como prueba para despedir.',
    tema: 'despido',
  },
  {
    id: '4AC0H2oNl6s',
    titulo: 'Canal de denuncias: la responsabilidad de la empresa',
    descripcion: 'Qué obliga a hacer la ley a las empresas cuando un trabajador denuncia una irregularidad.',
    tema: 'empresas',
  },
  {
    id: 'nBxnjQbHd_o',
    titulo: 'Tierno Centella, tu despacho laboralista',
    descripcion: 'Presentación del despacho.',
    tema: 'despacho',
  },
  {
    id: 'gxk3EYP98Y4',
    titulo: 'Excepciones al registro de jornada',
    descripcion: 'Qué trabajadores y situaciones quedaban fuera del registro horario tras su entrada en vigor en 2019.',
    tema: 'empresas',
    fecha: '2019-08-06',
  },
];

export const videoPorId = (id?: string) => VIDEOS.find((v) => v.id === id);
