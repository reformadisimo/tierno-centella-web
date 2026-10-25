// Mientras sea una demo sin revisar por el despacho, los textos lo dicen.
export const DEMO = true;

// Datos del despacho tal y como aparecen hoy en tiernocentella.es (octubre de 2026).
export const DESPACHO = {
  nombre: 'Tierno Centella Abogados',
  direccion: 'Calle de Jorge Juan, 78, 5.º C',
  ciudad: '28009 Madrid',
  telefono: '913 24 97 97',
  telefonoHref: 'tel:+34913249797',
  whatsapp: '608 13 93 37',
  whatsappNumero: '34608139337',
  email: 'info@tiernocentella.es',
  mapa: 'https://maps.app.goo.gl/1hfCAmtia5q87pQm7',
  citaAbogado: '/reservar?con=abogado',
  citaJesus: '/reservar?con=jesus',
  precioCita: 150,
  precioCitaJesus: 250,
  // Las reseñas de Google indican que la consulta se cobra con IVA aparte. Confirmar con el despacho.
  iva: ' + IVA',
  // El Código Deontológico (art. 21) obliga a identificar en internet el colegio y el número de colegiado.
  colegiado: 'Colegiado en el Ilustre Colegio de Abogados de Madrid, n.º 64865',
  // Número confirmado por el despacho (consta también en el BOCM).
  colegiadoNumero: '64865',
};

export const COLEGIADO_CONFIRMADO = true;
export const lineaColegiado = () =>
  DESPACHO.colegiado ? DESPACHO.colegiado + (COLEGIADO_CONFIRMADO ? '' : ' (pendiente de confirmar con el despacho)') : '';

export function enlaceWhatsapp(texto: string) {
  return `https://wa.me/${DESPACHO.whatsappNumero}?text=${encodeURIComponent(texto)}`;
}

export const euros = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: 'always' }).format(n);

export const fechaLarga = (iso: string) =>
  new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`),
  );

export const eurosConCentimos = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: 'always' }).format(n);
