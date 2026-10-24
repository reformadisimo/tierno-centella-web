// Muchos proveedores frente a uno solo: el punto de dolor del servicio 360, de un vistazo.

const ANTES: [string, string][] = [
  ['SEO', 'Posicionamiento en Google'],
  ['SEM', 'Anuncios de Google'],
  ['Diseñador', 'Imagen, banners y web'],
  ['Programador', 'Cambios y fallos de la web'],
  ['Redes sociales', 'Instagram, LinkedIn, Facebook'],
  ['Analítica', 'Informes, si los hay'],
];

const INFORMES: [string, string][] = [
  ['Cada día', 'Un aviso si pasa algo importante: una consulta que llega, una campaña que se dispara, la web que falla.'],
  ['Cada semana', 'Visitas, consultas, de dónde vienen y qué hemos cambiado. En tu móvil, en cinco minutos.'],
  ['Cada mes', 'El balance: Google, IA, anuncios, redes, reseñas y lo que cuesta cada cliente. Y el plan del mes siguiente.'],
];

export default function ProveedoresGuia() {
  return (
    <div className="pv">
      <div className="pv-comparar">
        <div className="pv-antes">
          <small>Lo habitual</small>
          <b>6 proveedores, 6 facturas, 6 conversaciones</b>
          <ul>
            {ANTES.map(([q, d]) => (
              <li key={q}>
                <strong>{q}</strong>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <p>
            Y tú en medio: coordinando, repitiendo lo mismo a cada uno, esperando a que uno termine para que empiece el otro, y con informes que no se hablan
            entre sí. Cuando algo falla, cada uno mira al de al lado.
          </p>
        </div>
        <div className="pv-flecha" aria-hidden="true">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
        <div className="pv-luego">
          <small>Con nosotros</small>
          <b>1 proveedor. Lo hacemos todo, tú solo decides.</b>
          <p className="pv-uno">
            SEO, anuncios, diseño, web, redes, reseñas, correos y medición, con <strong>una sola persona de contacto</strong>, una sola factura y todo
            conectado en el mismo informe.
          </p>
          <ul className="pv-informes">
            {INFORMES.map(([c, t]) => (
              <li key={c}>
                <strong>{c}</strong>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="pv-objetivo">Nuestro objetivo: que te ocupes de nosotros lo menos posible y que te lleguen más clientes.</p>
        </div>
      </div>
      <div className="pv-videos">
        <b>Lo único que no hacemos: grabar vídeos</b>
        <span>
          Te damos las ideas y los guiones, te decimos cómo grabarlos con el móvil para que queden bien, y los montamos (cortes, subtítulos, portada) para
          Instagram, LinkedIn y la web. Y si un día quieres un vídeo profesional, con equipo de grabación, trabajamos con una agencia audiovisual que te lo
          hace aparte.
        </span>
      </div>
    </div>
  );
}
