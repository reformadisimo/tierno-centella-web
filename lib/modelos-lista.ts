// Los modelos de "Genera tu carta", agrupados para la página /modelos. Mantener en sintonía con components/GeneraCarta.tsx.
export type ModeloLista = { id: string; nombre: string; para: string };
export const GRUPOS_MODELOS: { titulo: string; icono: string; modelos: ModeloLista[] }[] = [
  {
    titulo: 'Si te despiden o te vas',
    icono: 'documento',
    modelos: [
      { id: 'no-conforme', nombre: 'Recibí, no conforme', para: 'Lo que escribes al firmar la carta de despido o el finiquito.' },
      { id: 'certificado', nombre: 'Pedir el certificado de empresa', para: 'Para que el SEPE tramite tu paro sin retrasos.' },
      { id: 'baja-voluntaria', nombre: 'Comunicar tu baja voluntaria', para: 'Con el preaviso de tu convenio, para que no te lo descuenten.' },
    ],
  },
  {
    titulo: 'Si te deben dinero',
    icono: 'euro',
    modelos: [
      { id: 'salarios', nombre: 'Reclamar salarios o cantidades', para: 'Un requerimiento fechado, con el 10 % de interés por retraso.' },
      { id: 'documentos', nombre: 'Pedir tu contrato y tus nóminas', para: 'Para tener tus papeles antes de reclamar.' },
      { id: 'registro', nombre: 'Pedir tu registro de jornada', para: 'La prueba clave si te deben horas extra.' },
    ],
  },
  {
    titulo: 'Si estás de baja o con una incapacidad',
    icono: 'corazon',
    modelos: [
      { id: 'alta', nombre: 'No estoy de acuerdo con el alta médica', para: 'El escrito de disconformidad: solo hay 4 días naturales.' },
      { id: 'contingencia', nombre: 'Que mi baja sea accidente de trabajo', para: 'Pedir al INSS que determine la contingencia.' },
      { id: 'pago-directo', nombre: 'Que el INSS me pague la baja', para: 'Si la empresa no te adelanta la prestación en la nómina.' },
      { id: 'historial', nombre: 'Pedir tu historial médico', para: 'La base de cualquier reclamación por incapacidad.' },
      { id: 'incremento', nombre: 'El 20 % más de la total a partir de 55 años', para: 'Para pasar del 55 % al 75 % de la base reguladora.' },
    ],
  },
  {
    titulo: 'Sanciones',
    icono: 'balanza',
    modelos: [{ id: 'sancion', nombre: 'Responder a una amonestación o sanción', para: 'Tu versión por escrito, por si luego la usan para despedirte.' }],
  },
  {
    titulo: 'Familia, permisos y vacaciones',
    icono: 'calendario',
    modelos: [
      { id: 'jornada', nombre: 'Reducir o adaptar tu jornada para cuidar', para: 'La solicitud que abre la negociación y te protege.' },
      { id: 'excedencia', nombre: 'Pedir una excedencia', para: 'Voluntaria o para cuidar de un hijo o un familiar.' },
      { id: 'vacaciones', nombre: 'Pedir tus vacaciones por escrito', para: 'Con fechas claras, para evitar malentendidos.' },
    ],
  },
  {
    titulo: 'Acoso',
    icono: 'escudo',
    modelos: [{ id: 'acoso', nombre: 'Comunicar el acoso a la empresa', para: 'La queja formal que obliga a investigar y proteger.' }],
  },
];
