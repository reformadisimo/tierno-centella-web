// Dónde se hacen los trámites en Madrid capital. Direcciones comprobadas en las webs de la Comunidad de Madrid (oct. 2026).
export type Sede = { id: string; nombre: string; direccion: string; para: string; telefono?: string; telefonoHref?: string; nota?: string; consulta: string };

const q = (s: string) => encodeURIComponent(s);
export const mapaUrl = (s: Sede) => `https://www.google.com/maps/search/?api=1&query=${q(s.consulta)}`;
export const rutaUrl = (s: Sede) => `https://www.google.com/maps/dir/?api=1&destination=${q(s.consulta)}&travelmode=transit`;

export const SEDES: Sede[] = [
  {
    id: 'juzgados',
    nombre: 'Juzgados de lo Social de Madrid',
    direccion: 'Calle de la Princesa, 3, 28008 Madrid',
    para: 'Aquí se presenta la demanda por despido, por extinción del contrato o por una prestación denegada, y aquí se celebra el juicio.',
    telefono: '914 935 026',
    telefonoHref: 'tel:+34914935026',
    nota: 'Es el Servicio Común de Tramitación. Si tu citación indica otro edificio, vale lo que diga la citación.',
    consulta: 'Calle de la Princesa 3, 28008 Madrid',
  },
  {
    id: 'smac',
    nombre: 'SMAC: conciliación previa (sede principal)',
    direccion: 'Calle de la Princesa, 5, 28008 Madrid',
    para: 'Aquí se hace el intento de acuerdo antes del juicio. Puedes presentar la papeleta en persona o desde la oficina virtual, con certificado digital, DNIe o Cl@ve.',
    telefono: '915 80 92 06',
    telefonoHref: 'tel:+34915809206',
    nota: 'Se recomienda pedir cita previa. Atención de información laboral: lunes a viernes, de 8:30 a 14:00.',
    consulta: 'Calle de la Princesa 5, 28008 Madrid',
  },
  {
    id: 'registro-ventura',
    nombre: 'Registro del SMAC en Ventura Rodríguez',
    direccion: 'Calle de Ventura Rodríguez, 7, 28008 Madrid',
    para: 'Otro registro donde entregar la papeleta en persona y recibir la citación en el momento.',
    consulta: 'Calle de Ventura Rodríguez 7, 28008 Madrid',
  },
  {
    id: 'registro-jeronimo',
    nombre: 'Oficina de Atención al Ciudadano',
    direccion: 'Carrera de San Jerónimo, 13, 28014 Madrid',
    para: 'Atiende hasta las 20:00 y los sábados, pero solo si llevas la papeleta ya rellenada.',
    consulta: 'Carrera de San Jerónimo 13, 28014 Madrid',
  },
];
