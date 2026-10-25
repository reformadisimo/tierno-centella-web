import type { Metadata } from 'next';
import Link from 'next/link';
import FotoCabeza from '@/components/FotoCabeza';
import JsonLd from '@/components/JsonLd';
import { esquemaMigas, meta } from '@/lib/seo';
import { SEDES, mapaUrl, rutaUrl } from '@/lib/sedes';

export const metadata: Metadata = meta({
  titulo: 'Dónde ir en Madrid: juzgados de lo Social y SMAC, con mapa',
  descripcion: 'Direcciones de los Juzgados de lo Social de Madrid y del SMAC (conciliación), para qué sirve cada sitio y cómo llegar con un toque en Google Maps.',
  ruta: '/donde-ir',
});

export default function DondeIr() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/donde-ir', texto: 'Dónde ir en Madrid' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Dónde ir en Madrid
            </nav>
            <h1>Dónde ir en Madrid</h1>
            <p className="entradilla">
              Los sitios donde se hacen los trámites de un despido o una reclamación, explicados con una frase y un botón para que Google Maps te lleve hasta la puerta.
            </p>
          </div>
          <FotoCabeza ruta="/donde-ir" />
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor">
          <aside className="recuadro">
            <p>
              <strong>Antes de ir:</strong> las direcciones y los horarios pueden cambiar. Si te han citado, fíate de lo que diga tu citación, y si tienes dudas, llama al teléfono de cada sitio. Si tienes un plazo
              corriendo, <Link href="/herramientas/plazos">míralo primero</Link>.
            </p>
          </aside>
          <ul className="recursos-lista">
            {SEDES.map((s) => (
              <li key={s.id} id={s.id} className="recurso-tarjeta">
                <h2 style={{ fontSize: '1.25rem' }}>{s.nombre}</h2>
                <p><b>Dirección.</b> {s.direccion}</p>
                <p><b>Para qué.</b> {s.para}</p>
                {s.telefono && (
                  <p>
                    <b>Teléfono.</b> <a href={s.telefonoHref}>{s.telefono}</a>
                  </p>
                )}
                {s.nota && <p className="recurso-consejo">{s.nota}</p>}
                <div className="acciones">
                  <a className="boton" href={rutaUrl(s)} target="_blank" rel="noopener noreferrer">
                    Cómo llegar<span className="sr-only"> a {s.nombre} (se abre Google Maps en otra pestaña)</span>
                  </a>
                  <a className="boton boton-claro" href={mapaUrl(s)} target="_blank" rel="noopener noreferrer">
                    Ver en el mapa<span className="sr-only"> {s.nombre} (se abre en otra pestaña)</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p>
            Para el orden de los pasos, mira <Link href="/despido">el recorrido del despido</Link>. Para otros enlaces oficiales, <Link href="/recursos">los recursos útiles</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
