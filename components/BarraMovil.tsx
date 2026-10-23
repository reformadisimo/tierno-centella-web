import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

export default function BarraMovil() {
  return (
    <nav className="barra-movil" aria-label="Contacto rápido">
      <a href={DESPACHO.telefonoHref}>Llamar</a>
      <a href={enlaceWhatsapp('Hola, quiero consultar un caso laboral.')}>WhatsApp</a>
      <a href="/calculadora-indemnizacion">Calcular</a>
    </nav>
  );
}
