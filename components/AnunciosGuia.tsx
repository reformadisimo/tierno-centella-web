// Galería de anuncios para la guía de Jesús: los suyos tal como se ven hoy, los de la competencia y cómo serían los nuestros.
// Los textos de los anuncios ajenos están copiados tal cual de Semrush y de la Biblioteca de anuncios de Meta (23 de octubre de 2026).

type AnuncioGoogle = { quien: string; url: string; titulo: string; texto?: string; nota: string; tono: 'mal' | 'bien' | 'neutro' };

const TUYOS: AnuncioGoogle[] = [
  {
    quien: 'Tierno Centella',
    url: 'tiernocentella.es',
    titulo: 'Tierno Centella Abogados - Abogados Laborales en Madrid',
    nota: 'Tu anuncio de marca. Lleva a la página de acoso aunque la persona venga por un despido o una incapacidad.',
    tono: 'mal',
  },
  {
    quien: 'Tierno Centella',
    url: 'tiernocentella.es',
    titulo: 'Abogado Laboralista Experto - Reserva tu Cita',
    nota: 'Correcto, pero no dice nada que te distinga: ni el acoso, ni 2005, ni tus años, ni el precio.',
    tono: 'neutro',
  },
  {
    quien: 'Tierno Centella',
    url: 'tiernocentella.es/acoso',
    titulo: 'Cómo identificar el acoso laboral o mobbing ? | Tierno Centella',
    nota: 'Es el título de un artículo del blog: atrae a quien quiere leer, no a quien busca abogado. Y se paga cada clic.',
    tono: 'mal',
  },
];

const ELLOS: AnuncioGoogle[] = [
  {
    quien: 'Campmany',
    url: 'campmanyabogados.com',
    titulo: 'Campmany Abogados España',
    texto:
      'Incapacidad Permanente — Abogados Campmany la ayuda que necesitas. Defendemos tus derechos laborales y sociales. Primera visita gratuita. 95% de tasa de éxito. Atención en menos de 24h.',
    nota: 'Lo que hacen bien: se especializan (incapacidad), prometen rapidez y salen con su marca casi todos los meses. Lo que no copiaríamos: "gratis" y un porcentaje de éxito.',
    tono: 'bien',
  },
  {
    quien: 'R. Sánchez Abogados',
    url: 'rsanchezabogados.es',
    titulo: 'R. Sánchez Abogados | 733 Reseñas en Google',
    texto: 'Abogado Laboral Especialista - Abogado Laboral en Madrid. Ayudamos a Particulares, Empresas y Emprendedores en Cualquier Proceso Laboral.',
    nota: 'Lo que hacen bien: ponen sus reseñas en el propio título. La confianza entra antes del clic.',
    tono: 'bien',
  },
  {
    quien: 'Bufete Toro',
    url: 'bufetetoro.com',
    titulo: 'Calculadora Indemnización Despido Objetivo',
    texto: 'Calcula tu indemnización por despido objetivo de manera sencilla y precisa. Conoce tus derechos laborales de manera instantánea. Clientes en toda España. +40 Años De Experiencia.',
    nota: 'Lo que hacen bien: anuncian una herramienta útil, no un despacho. Quien calcula, se queda y acaba llamando. Tú ya tienes 14 herramientas así.',
    tono: 'bien',
  },
];

const NUESTROS: AnuncioGoogle[] = [
  {
    quien: 'Tierno Centella Abogados',
    url: 'tiernocentella.es/consulta/acoso-laboral',
    titulo: 'Abogado Acoso Laboral Madrid | Pioneros desde 2005',
    texto:
      'En 2005 logramos que un juez condenara a la empresa y al acosador. Haz el test gratuito y te decimos qué plazo corre. Consulta de 1 hora con precio claro desde el principio.',
    nota: 'Tu especialidad y tu historia en el titular, una herramienta gratuita como gancho y el precio claro: sin "gratis" que luego no lo es.',
    tono: 'bien',
  },
  {
    quien: 'Tierno Centella Abogados',
    url: 'tiernocentella.es/consulta/incapacidad-permanente',
    titulo: '¿Te Deniegan la Incapacidad? | 30 días hábiles para reclamar',
    texto: 'Comprueba gratis qué grado te puede corresponder y hasta qué día puedes reclamar. Abogados laboralistas en Madrid, más de 25 años. Atendemos por videollamada en toda España.',
    nota: 'Habla de lo que le pasa a la persona y del plazo que corre. Lleva a una página hecha solo para eso, con formulario corto.',
    tono: 'bien',
  },
];

function TarjetaGoogle({ a }: { a: AnuncioGoogle }) {
  return (
    <figure className={`ga-tarjeta ga-${a.tono}`}>
      <div className="ga-anuncio" aria-label={`Anuncio de ${a.quien} en Google`}>
        <div className="ga-cabeza">
          <span className="ga-favicon" aria-hidden="true">
            {a.quien.slice(0, 1)}
          </span>
          <span>
            <strong>Patrocinado</strong>
            <small>{a.url}</small>
          </span>
        </div>
        <p className="ga-titulo">{a.titulo}</p>
        {a.texto && <p className="ga-texto">{a.texto}</p>}
      </div>
      <figcaption>{a.nota}</figcaption>
    </figure>
  );
}

function TarjetaSocial({
  quien,
  seguidores,
  imagen,
  texto,
  boton,
  nota,
  tono,
  visual,
}: {
  quien: string;
  seguidores: string;
  imagen?: string;
  visual?: string;
  texto: string;
  boton: string;
  nota: string;
  tono: 'mal' | 'bien' | 'neutro';
}) {
  return (
    <figure className={`ga-tarjeta ga-${tono}`}>
      <div className="ga-social" aria-label={`Anuncio de ${quien} en Instagram o Facebook`}>
        <div className="ga-social-cabeza">
          <span className="ga-favicon" aria-hidden="true">
            {quien.slice(0, 1)}
          </span>
          <span>
            <strong>{quien}</strong>
            <small>Publicidad · {seguidores}</small>
          </span>
        </div>
        {imagen ? (
          <img src={`/img/${imagen}-640.webp`} alt="" width={640} height={427} loading="lazy" />
        ) : (
          <div className={visual ? 'ga-social-visual' : 'ga-social-vacio'}>{visual ?? 'Sin anuncios'}</div>
        )}
        <p className="ga-texto">{texto}</p>
        <span className="ga-social-boton">{boton}</span>
      </div>
      <figcaption>{nota}</figcaption>
    </figure>
  );
}

export default function AnunciosGuia() {
  return (
    <div className="ga">
      <h4 className="ga-grupo">Tus anuncios en Google, tal como se ven</h4>
      <div className="ga-rejilla">
        {TUYOS.map((a) => (
          <TarjetaGoogle key={a.titulo} a={a} />
        ))}
      </div>

      <h4 className="ga-grupo">Los de tu competencia</h4>
      <div className="ga-rejilla">
        {ELLOS.map((a) => (
          <TarjetaGoogle key={a.titulo} a={a} />
        ))}
      </div>

      <h4 className="ga-grupo">En Instagram y Facebook</h4>
      <div className="ga-rejilla">
        <TarjetaSocial
          quien="Tierno Centella Abogados"
          seguidores="285 en Facebook · 4.005 en Instagram"
          texto="Hoy no tienes ningún anuncio en Facebook ni en Instagram."
          boton="—"
          nota="La Biblioteca de anuncios de Meta no muestra anuncios tuyos. Es justo donde más se mueve la gente que lo está pasando mal en el trabajo."
          tono="mal"
        />
        <TarjetaSocial
          quien="Campmany Abogados"
          seguidores="24.400 en Facebook · 20.900 en Instagram"
          visual="Calculadora gratuita: ¿cuánto te corresponde?"
          texto="¿Eres padre y pensionista desde el 4 de febrero de 2021? ¡Tu pensión podría aumentar! Utiliza nuestra calculadora gratuita para conocer cuánto te corresponde."
          boton="Más información"
          nota="Activo desde febrero de 2026: una pregunta directa a un público concreto y una calculadora como gancho. Sin fotos de abogados, sin tecnicismos."
          tono="bien"
        />
        <TarjetaSocial
          quien="Tierno Centella Abogados"
          seguidores="así sería el tuyo"
          imagen="jesus-mesa"
          texto="¿Te gritan, te aíslan o te quitan funciones? En 2 minutos sabrás si es acoso laboral. Test gratuito, sin dejar datos. Jesús Tierno, más de 25 años defendiendo a trabajadores."
          boton="Hacer el test"
          nota="Tu cara, una pregunta que la persona se reconoce y una herramienta gratuita. Con un vídeo corto tuyo o de Irene, mejor aún."
          tono="bien"
        />
      </div>

      <h4 className="ga-grupo">Así serían los tuyos en Google</h4>
      <div className="ga-rejilla">
        {NUESTROS.map((a) => (
          <TarjetaGoogle key={a.titulo} a={a} />
        ))}
      </div>

      <div className="ga-enlaces">
        <strong>Míralos tú mismo, en directo:</strong>
        <a href="https://adstransparency.google.com/?region=ES&domain=tiernocentella.es" target="_blank" rel="noopener noreferrer">
          Tus anuncios en el Centro de Transparencia de Google
        </a>
        <a href="https://adstransparency.google.com/?region=ES&domain=campmanyabogados.com" target="_blank" rel="noopener noreferrer">
          Los de Campmany
        </a>
        <a href="https://adstransparency.google.com/?region=ES&domain=bufetetoro.com" target="_blank" rel="noopener noreferrer">
          Los de Bufete Toro
        </a>
        <a href="https://adstransparency.google.com/?region=ES&domain=rsanchezabogados.es" target="_blank" rel="noopener noreferrer">
          Los de R. Sánchez
        </a>
        <a
          href="https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ES&media_type=all&search_type=page&view_all_page_id=344190992820544"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tu página en la Biblioteca de anuncios de Meta
        </a>
        <a href="https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ES&q=campmany&search_type=keyword_unordered&media_type=all" target="_blank" rel="noopener noreferrer">
          Los de Campmany en Meta
        </a>
      </div>
    </div>
  );
}
