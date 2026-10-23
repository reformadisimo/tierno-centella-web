import Link from 'next/link';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

// Caja fija a la derecha en las páginas principales (escritorio): llamar, WhatsApp y la herramienta del tema,
// para que quien lee nunca tenga que bajar hasta el final para contactar.
export default function LateralHub({
  plazo,
  herramienta,
  whatsapp,
}: {
  plazo: string;
  herramienta: { href: string; texto: string };
  whatsapp: string;
}) {
  return (
    <aside className="lateral-hub" aria-label="Habla con un abogado">
      <div className="lateral-hub-caja">
        <img src="/img/jesus-avatar.webp" alt="" width={56} height={56} />
        <strong>¿Hablamos de tu caso?</strong>
        <p>{plazo}</p>
        <a className="boton boton-marcador" href={DESPACHO.telefonoHref}>
          Llamar al {DESPACHO.telefono}
        </a>
        <a className="boton boton-claro" href={enlaceWhatsapp(whatsapp)}>
          Escribir por WhatsApp
        </a>
        <Link className="lateral-hub-herramienta" href={herramienta.href}>
          {herramienta.texto}
        </Link>
        <small>
          Consulta de una hora: {DESPACHO.precioCita} €{DESPACHO.iva}.
        </small>
      </div>
    </aside>
  );
}
