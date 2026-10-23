// Publicaciones del despacho en sus redes, elegidas por lo que más interesa a quien lo está viviendo.
// Datos revisados el 23/10/2026 (ver docs/redes-sociales.md).

export type Reel = { id: string; tema: string; texto: string; quien: string; fecha: string; tipo: 'reel' | 'p' };

export const REELS: Reel[] = [
  { id: 'DBjWN7ntz3r', tema: 'Acoso laboral', texto: 'Qué es el acoso laboral o mobbing, explicado en un minuto.', quien: 'Jesús Tierno', fecha: '2024-10-25', tipo: 'reel' },
  { id: 'DEIMdjTtGEs', tema: 'Acoso laboral', texto: '¿Cómo puedo saber si estoy sufriendo acoso laboral? Con el psicólogo Iñaki Piñuel.', quien: 'Iñaki Piñuel y Jesús Tierno', fecha: '2024-12-28', tipo: 'reel' },
  { id: 'DB_m7Cyt3s1', tema: 'Acoso laboral', texto: 'Aunque ya no trabajes en la empresa, todavía puedes denunciar el acoso que sufriste.', quien: 'Jesús Tierno', fecha: '2024-11-05', tipo: 'reel' },
  { id: 'DDccWgatAb6', tema: 'Pruebas', texto: '¿Qué pruebas necesito para acreditar el acoso laboral?', quien: 'Jesús Tierno', fecha: '2024-12-11', tipo: 'reel' },
  { id: 'DBvzeW_N4-5', tema: 'Despido', texto: '¿Te despidieron tras denunciar acoso en tu empresa? Tus derechos.', quien: 'Irene Ramos, abogada', fecha: '2024-10-30', tipo: 'reel' },
  { id: 'DEU3HUTtVYd', tema: 'Salud', texto: 'Estrés postraumático por acoso: cuánto tiempo se necesita para recuperarse.', quien: 'Iñaki Piñuel y Jesús Tierno', fecha: '2025-01-02', tipo: 'reel' },
  { id: 'DebZXxCtvUv', tema: 'Baja médica', texto: '¿Una baja por acoso laboral puede ser accidente de trabajo? Puede serlo.', quien: 'Tierno Centella', fecha: '2026-10-13', tipo: 'reel' },
  { id: 'DI3VoFRN3qP', tema: 'Incapacidad', texto: 'Si te declaran una incapacidad permanente, la empresa debe intentar adaptar tu puesto antes de despedirte.', quien: 'Tierno Centella', fecha: '2025-04-25', tipo: 'reel' },
  { id: 'DRg6D-8jcR2', tema: 'Sentencia', texto: 'Sentencia favorable: una docente con discapacidad a la que no adaptaron el puesto.', quien: 'Irene Ramos, abogada', fecha: '2025-11-26', tipo: 'reel' },
];

export const MEDIOS = [
  {
    fecha: '5 de febrero de 2026',
    titulo: 'Ponente en las jornadas sobre acoso laboral de la Universidad Pontificia Comillas',
    texto: 'Jornadas organizadas por AMYTS, SAE y SIETeSS para profesionales sanitarios y de la enseñanza.',
    url: 'https://www.instagram.com/p/DUYgUrXjRhM/',
  },
  {
    fecha: '6 de octubre de 2024',
    titulo: 'En "Por fin", de Onda Cero, con Jaime Cantizano',
    texto: 'Jesús Tierno analiza la propuesta del Ministerio de Inclusión y Seguridad Social para reformar la incapacidad temporal.',
    url: 'https://www.instagram.com/reel/DAxs-emuPzW/',
  },
  {
    fecha: '2022 y 2024',
    titulo: 'Dos conversaciones con el psicólogo Iñaki Piñuel',
    texto: 'Sobre cómo reconocer el acoso, cómo afecta a la salud y cómo se defiende en los tribunales.',
    url: '/videos',
  },
];
