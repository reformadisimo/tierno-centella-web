// Página para pedir una opinión en Google (27-oct-2026). La misma pieza sirve para la página real (/opinion) y para el
// ejemplo de la guía, así que siempre se ven igual.
// Reglas de un despacho: se pide opinión sobre la atención recibida, nunca sobre el resultado; a todos los clientes por igual
// (las estrellas son solo un adorno: no se elige nota aquí, para no filtrar a nadie, que Google lo prohíbe); sin nada a cambio.
import { DESPACHO } from '@/lib/despacho';

/** Enlace directo a la ventana de reseña de la ficha de Google. Vacío hasta que el despacho nos dé acceso a su ficha. */
export const RESENA_GOOGLE = '';

export function OpinionTarjeta({ ejemplo = false }: { ejemplo?: boolean }) {
  const pendiente = !RESENA_GOOGLE;
  // En la guía va dentro de un apartado: sin segundo título principal en la página.
  const Titulo = ejemplo ? 'p' : 'h1';
  return (
    <div className="op-tarjeta">
      <img className="op-logo" src="/img/logo-tc.webp" alt="Tierno Centella Abogados" width={192} height={46} />
      <p className="op-gracias">Gracias por confiar en nosotros</p>
      <Titulo className="op-titulo">
        ¿Nos ayuda con su <span>opinión</span>?
      </Titulo>
      <p className="op-texto">Una breve opinión sobre la atención recibida nos ayuda mucho. Le lleva un minuto.</p>
      <p className="op-estrellas" aria-hidden="true">
        ★★★★★
      </p>
      <a className="op-boton" href={pendiente ? '#enlace-pendiente' : RESENA_GOOGLE} {...(pendiente ? {} : { rel: 'noopener' })}>
        Dejar mi opinión en Google
      </a>
      {pendiente && (
        <p className="op-pendiente" id="enlace-pendiente">
          {ejemplo ? 'Ejemplo.' : 'Página de ejemplo.'} Aquí irá el enlace directo a la ventana de reseña de la ficha de Google del despacho.
        </p>
      )}
      <ol className="op-pasos">
        <li>Pulse el botón verde.</li>
        <li>Marque las estrellas.</li>
        <li>Escriba una frase y pulse «Publicar».</li>
      </ol>
      <p className="op-nota">Hace falta tener abierta su cuenta de Google en el móvil (la de Gmail). Si no sabe cómo hacerlo, le ayudamos:</p>
      <a className="op-llamar" href={DESPACHO.telefonoHref}>
        Llamar al {DESPACHO.telefono}
      </a>
      <p className="op-firma">Muchas gracias de antemano.</p>
    </div>
  );
}
