import Link from 'next/link';
import { DESPACHO } from '@/lib/despacho';
import { MENU } from '@/lib/navegacion';
import { BotonChat } from '@/components/BotonesAccion';

// Quien llega por un enlace roto no debe irse: le ofrecemos sus temas, el chat y el teléfono.
export default function NoEncontrada() {
  const temas = MENU.slice(0, 4);
  return (
    <section className="seccion">
      <div className="contenedor no-encontrada">
        <div className="ne-cabeza">
          <div>
            <p className="etiqueta-calida">Error 404</p>
            <h1>Esta página no existe, pero podemos ayudarte igual</h1>
            <p className="entradilla">Puede que la dirección esté mal escrita o que la página haya cambiado de sitio. Elige tu tema o pregúntanos directamente.</p>
            <div className="acciones">
              <a className="boton boton-marcador" href={DESPACHO.telefonoHref}>
                Llamar al {DESPACHO.telefono}
              </a>
              <BotonChat />
            </div>
          </div>
          <img src="/img/recepcion-640.webp" alt="Recepción del despacho Tierno Centella" width={640} height={427} />
        </div>
        <div className="ne-temas">
          {temas.map((t) => (
            <Link key={t.href} href={t.href} className="ne-tema">
              <img src={`/img/${t.foto}-640.webp`} alt="" width={640} height={427} loading="lazy" />
              <span>
                <strong>{t.titulo}</strong>
                <small>{t.sub}</small>
              </span>
            </Link>
          ))}
        </div>
        <p style={{ marginTop: 24 }}>
          O usa una de nuestras <Link href="/herramientas">25 herramientas</Link>, o vuelve al <Link href="/">inicio</Link>.
        </p>
      </div>
    </section>
  );
}
