// El lío de los proveedores: todo lo que acaba contratando un despacho como el tuyo, frente a un solo equipo.

const PROVEEDORES: [string, string][] = [
  ['Agencia web', 'Diseña la web'],
  ['Alojamiento y dominio', 'IONOS u otro'],
  ['Mantenimiento y velocidad', 'Actualizaciones y plugins'],
  ['SEO', 'Posicionamiento en Google'],
  ['Redactor jurídico', 'Los artículos del blog'],
  ['Google Ads', 'Tus anuncios en Google'],
  ['Anuncios en Meta', 'Instagram y Facebook'],
  ['Community manager', 'Publicaciones en redes'],
  ['Diseñador gráfico', 'Logo, banners y fotos'],
  ['Consultora de CRM', 'Para montarlo'],
  ['Licencias de CRM', 'HubSpot o similar, por persona'],
  ['Chatbot', 'El chat de la web'],
  ['Correos automáticos', 'El seguimiento de cada consulta'],
  ['Reseñas', 'Pedirlas y contestarlas'],
  ['Agenda de citas', 'Reservar la consulta online'],
  ['Firma electrónica', 'Las hojas de encargo'],
  ['Encuestas', 'La opinión de cada cliente'],
  ['Medición de llamadas', 'Qué anuncio hace sonar el teléfono'],
  ['Copias y seguridad', 'Por si algo falla'],
  ['Informes', 'Juntar los datos de todos'],
];

const INFORMES: [string, string][] = [
  ['Cada día', 'Un aviso si pasa algo importante: una consulta que llega, una campaña que se dispara, la web que falla.'],
  ['Cada semana', 'Visitas, consultas, de dónde vienen y qué hemos cambiado. En tu móvil, en cinco minutos.'],
  ['Cada mes', 'El balance: Google, IA, anuncios, redes, reseñas y lo que cuesta cada cliente. Y el plan del mes siguiente.'],
];

export default function ProveedoresGuia() {
  return (
    <div className="pv">
      <div className="pv-lio">
        <p className="pv-lio-ante">Lo que acaba contratando un despacho como el tuyo</p>
        <div className="pv-contadores">
          <div><b>20</b><span>proveedores</span></div>
          <div><b>20</b><span>facturas</span></div>
          <div><b>20</b><span>contraseñas</span></div>
          <div className="pv-nadie"><b>0</b><span>que responda por todo</span></div>
        </div>
        <ul className="pv-rejilla">
          {PROVEEDORES.map(([q, d], i) => (
            <li key={q} style={{ transform: `rotate(${((i * 37) % 7) - 3}deg)` }}>
              <strong>{q}</strong>
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <p className="pv-lio-pie">
          Y cuando algo falla, cada uno mira al de al lado: "eso es cosa del de la web", "eso lo lleva el de los anuncios". Y tú en medio, repitiendo lo mismo a cada uno.
        </p>
      </div>

      <div className="pv-flecha" aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </div>

      <div className="pv-luego">
        <small>Con Casiopea 360</small>
        <div className="pv-contadores pv-contadores-bien">
          <div><b>1</b><span>equipo</span></div>
          <div><b>1</b><span>factura</span></div>
          <div><b>1</b><span>persona de contacto</span></div>
          <div><b>Todo</b><span>dentro</span></div>
        </div>
        <p className="pv-uno">
          Las veinte cosas de arriba las hacemos nosotros, conectadas entre sí y en el mismo informe. Tú solo decides.
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
