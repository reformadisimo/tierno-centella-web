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
  citaAbogado: 'https://tiernocentella.es/producto/cita/',
  citaJesus: 'https://tiernocentella.es/producto/cita-jesus/',
  precioCita: 150,
  precioCitaJesus: 250,
};

export function enlaceWhatsapp(texto: string) {
  return `https://wa.me/${DESPACHO.whatsappNumero}?text=${encodeURIComponent(texto)}`;
}

export const euros = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export const fechaLarga = (iso: string) =>
  new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`),
  );

export const eurosConCentimos = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
