// "Cualquier idea que se te ocurra, te la hacemos": lo que podemos hacer más allá de lo de cada mes, con nuestra recomendación honesta.

const IDEAS: { titulo: string; icono: string; rec: 'si' | 'cuando' | 'no'; recTexto: string; texto: string; quien: string; pagas: string }[] = [
  {
    titulo: 'Un CRM',
    icono: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
    rec: 'si',
    recTexto: 'Te lo recomendamos',
    texto: 'Una agenda de clientes con memoria: cada consulta entra sola con su nombre, su tema, de dónde vino (Google, un anuncio, el chat, Instagram) y en qué punto está. Si ya tienes uno, nos conectamos a él; si no, te lo montamos.',
    quien: 'Nosotros',
    pagas: 'Incluido en la cuota',
  },
  {
    titulo: 'Una campaña de radio',
    icono: 'M4 9h16v11H4zM8 4l8 5M8 14.5h.01M15 14.5a2 2 0 1 0 0 .01',
    rec: 'cuando',
    recTexto: 'Cuando quieras dar un empujón',
    texto: 'La idea, el guion, la cuña grabada con voces profesionales, las emisoras y los horarios que escucha tu público, y la negociación. Quien oye el anuncio luego te busca en Google o te escribe por WhatsApp.',
    quien: 'Nosotros, con una agencia de radio con la que trabajamos',
    pagas: 'Gestión incluida. Aparte, la emisión y los locutores, directamente y con tu visto bueno',
  },
  {
    titulo: 'Prensa escrita',
    icono: 'M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2M18 14h-8M15 18h-5M10 6h8v4h-8z',
    rec: 'no',
    recTexto: 'No te la aconsejamos',
    texto: 'No da enlaces ni se puede medir bien. Pero si la quieres, te hacemos los diseños de los anuncios y nos ocupamos del contacto con los periódicos que elijas.',
    quien: 'Nosotros',
    pagas: 'Gestión y diseños incluidos. Aparte, lo que cobre el periódico',
  },
  {
    titulo: 'Vídeos profesionales',
    icono: 'M23 7l-7 5 7 5V7zM1 5h15v14H1z',
    rec: 'cuando',
    recTexto: 'Para tu web y tus campañas grandes',
    texto: 'Los vídeos del día a día los montamos nosotros. Si quieres uno con equipo de grabación (para la portada, una campaña, una presentación del despacho), lo hace la productora con la que trabajamos.',
    quien: 'Productora audiovisual con la que trabajamos',
    pagas: 'Coordinación incluida. Aparte, la grabación',
  },
  {
    titulo: 'Una app',
    icono: 'M7 2h10v20H7zM11 18h2',
    rec: 'no',
    recTexto: 'Hoy no te la recomendamos',
    texto: 'Para un despacho como el tuyo, la web, el chat y las herramientas ya hacen lo que haría una app, y quien te necesita no va a descargarse nada. Si algún día tiene sentido (por ejemplo, para que tus clientes sigan su caso), te la hacemos.',
    quien: 'Nosotros',
    pagas: 'Lo vemos contigo si llega el momento',
  },
  {
    titulo: 'Tu presupuesto de marketing',
    icono: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    rec: 'si',
    recTexto: 'Te lo preparamos siempre',
    texto: 'Te decimos cuánto tiene sentido invertir cada mes y en el año, y en qué: anuncios, radio, notas de prensa, vídeos. Con lo que recomendamos, lo que no y por qué, para sacar el máximo partido a cada euro.',
    quien: 'Nosotros',
    pagas: 'Incluido en la cuota',
  },
];

export default function TodoGuia() {
  return (
    <div className="td">
      <div className="td-cabeza">
        <b>Nunca tienes que salir de nuestro entorno.</b>
        <span>
          Lo que podemos hacer, lo hacemos nosotros. Lo que no (grabar en un estudio de radio, una producción audiovisual), lo hacemos con las agencias con
          las que trabajamos. Y siempre te decimos con sinceridad qué te recomendamos y qué no.
        </span>
      </div>
      <div className="td-rejilla">
        {IDEAS.map((i) => (
          <div key={i.titulo} className="td-idea">
            <div className="td-idea-cabeza">
              <span className="td-icono" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d={i.icono} />
                </svg>
              </span>
              <b>{i.titulo}</b>
            </div>
            <span className={`td-rec td-rec-${i.rec}`}>{i.recTexto}</span>
            <p>{i.texto}</p>
            <dl>
              <dt>Quién lo hace</dt>
              <dd>{i.quien}</dd>
              <dt>Qué pagas</dt>
              <dd>{i.pagas}</dd>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
