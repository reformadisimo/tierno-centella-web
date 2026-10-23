// Mockups en móvil para la guía de Jesús: "hoy" frente a "con nosotros", para verlo de un vistazo sin leer.
// Las reseñas y los mensajes son ejemplos (lo dice cada pie); las cifras son las de la guía.
import { Logo } from './LogosGuia';

function Movil({ titulo, children, tono }: { titulo: string; children: React.ReactNode; tono: 'mal' | 'bien' }) {
  return (
    <figure className={`gm-figura gm-${tono}`}>
      <div className="gm-movil">
        <div className="gm-muesca" aria-hidden="true" />
        <div className="gm-pantalla">{children}</div>
      </div>
      <figcaption>{titulo}</figcaption>
    </figure>
  );
}

const Estrellas = ({ n }: { n: number }) => (
  <span className="mk-estrellas" aria-label={`${n} estrellas`}>
    {'★★★★★'.slice(0, n)}
    <span>{'★★★★★'.slice(n)}</span>
  </span>
);

function Ficha({ nota, total, respondida }: { nota: string; total: number; respondida: boolean }) {
  return (
    <>
      <div className="mk-mapa" aria-hidden="true">
        <span className="mk-pin" />
      </div>
      <p className="mk-ficha-nombre lg-barra"><Logo nombre="Ficha de Google" tam={22} /> Tierno Centella Abogados</p>
      <p className="mk-ficha-nota">
        <b>{nota}</b> <Estrellas n={Math.round(parseFloat(nota.replace(',', '.')))} /> <small>({total})</small>
      </p>
      <p className="mk-ficha-dato">Abogado laboralista · Jorge Juan, 78</p>
      <p className="mk-ficha-dato">
        <span className="mk-verde">Abierto</span> · Cierra a las 17:00
      </p>
      <div className="mk-botones">
        <span>Llamar</span>
        <span>Cómo llegar</span>
        <span>Sitio web</span>
      </div>
      <div className="mk-resena">
        <p className="mk-resena-cabeza">
          <b>Reseña de ejemplo</b> <Estrellas n={1} />
        </p>
        <p className="mk-resena-texto">"Escribí dos veces y nadie me contestó."</p>
        {respondida ? (
          <div className="mk-respuesta">
            <b>Respuesta del propietario</b>
            <p>Tienes razón en que no te respondimos a tiempo, y lo sentimos. Ahora contestamos siempre en 48 horas laborables. Llámanos al 913 24 97 97.</p>
          </div>
        ) : (
          <p className="mk-sin">Sin respuesta del propietario</p>
        )}
      </div>
    </>
  );
}

export function MockupFicha() {
  return (
    <div className="gm-rejilla">
      <Movil tono="mal" titulo="Hoy: 4,2 y reseñas de una estrella sin contestar. Es lo primero que ve quien te busca.">
        <Ficha nota="4,2" total={59} respondida={false} />
      </Movil>
      <Movil tono="bien" titulo="Con nosotros: todas respondidas, con cariño y sin datos del caso, y la nota subiendo hacia el 4,5.">
        <Ficha nota="4,5" total={80} respondida />
      </Movil>
    </div>
  );
}

function Chat({ respuesta, nombraTu }: { respuesta: string[]; nombraTu: boolean }) {
  return (
    <div className="mk-chatgpt">
      <p className="mk-chatgpt-barra lg-barra"><Logo nombre="ChatGPT" tam={20} /> ChatGPT</p>
      <p className="mk-pregunta">¿Qué abogado de acoso laboral me recomiendas en Madrid?</p>
      <div className="mk-respuesta-ia">
        {respuesta.map((r, i) => (
          <p key={i} className={nombraTu && r.includes('Tierno Centella') ? 'mk-destacado' : ''}>
            {r}
          </p>
        ))}
      </div>
    </div>
  );
}

export function MockupIA() {
  return (
    <div className="gm-rejilla">
      <Movil tono="mal" titulo="Hoy: cuando alguien pregunta a la IA, casi nunca te nombra. A Campmany o a Bufete Toro, sí.">
        <Chat
          nombraTu={false}
          respuesta={[
            'Algunos despachos de Madrid que suelen recomendarse para acoso laboral son:',
            '1. Campmany Abogados',
            '2. Bufete Toro',
            '3. García de la Santa Abogados',
            'Te recomiendo comparar opiniones y pedir una primera valoración.',
          ]}
        />
      </Movil>
      <Movil tono="bien" titulo="Con nosotros: textos que la IA puede citar, los mismos datos en todas partes y tu historia. Así es como te empieza a nombrar.">
        <Chat
          nombraTu
          respuesta={[
            'Para acoso laboral en Madrid, un despacho de referencia es:',
            'Tierno Centella Abogados: especializado en acoso desde hace más de 25 años; en 2005 logró una de las primeras condenas a empresa y acosador.',
            'Otros despachos conocidos son Campmany Abogados y Bufete Toro.',
          ]}
        />
      </Movil>
    </div>
  );
}

function Carga({ segundos, nota, lenta }: { segundos: string; nota: number; lenta: boolean }) {
  return (
    <div className="mk-carga">
      <div className="mk-url">tiernocentella.es</div>
      {lenta ? (
        <div className="mk-esperando">
          <span className="mk-rueda" aria-hidden="true" />
          <p>Cargando...</p>
          <div className="mk-barra">
            <span style={{ width: '22%' }} />
          </div>
        </div>
      ) : (
        <div className="mk-lista">
          <img src="/img/portada-poster-movil.webp" alt="" width={360} height={400} loading="lazy" />
          <p className="mk-lista-titulo">Abogados laboralistas en Madrid</p>
          <span className="mk-lista-boton">Calcular mi indemnización</span>
        </div>
      )}
      <div className="mk-cifras">
        <div>
          <b>{segundos}</b>
          <small>hasta ver la página</small>
        </div>
        <div>
          <b className={lenta ? 'mk-rojo' : 'mk-verde'}>{nota}</b>
          <small>sobre 100 en Google</small>
        </div>
      </div>
    </div>
  );
}

export function MockupVelocidad() {
  return (
    <div className="gm-rejilla">
      <Movil tono="mal" titulo="Tu web actual en un móvil normal: 18,3 segundos mirando una pantalla en blanco. Mucha gente se va antes.">
        <Carga segundos="18,3 s" nota={49} lenta />
      </Movil>
      <Movil tono="bien" titulo="La web nueva: en unos 3 segundos ya ves lo importante y el botón para actuar.">
        <Carga segundos="3,2 s" nota={94} lenta={false} />
      </Movil>
    </div>
  );
}

export function MockupAvisoChat() {
  return (
    <div className="gm-rejilla">
      <Movil tono="bien" titulo="Una persona habla con el chat a las 23:40 y pide que la llaméis. Esto es lo que te llega (ejemplo).">
        <div className="mk-correo">
          <p className="mk-correo-barra">Correo del despacho</p>
          <p className="mk-correo-de">
            <b>Web Tierno Centella</b> <small>23:41</small>
          </p>
          <p className="mk-correo-asunto">Que te llamemos: Laura · Despido · plazo hasta el 20 de noviembre</p>
          <div className="mk-correo-cuerpo">
            <p>
              <b>Teléfono:</b> 6XX XXX XXX · mañana por la mañana
            </p>
            <p>
              <b>Conversación:</b>
            </p>
            <p className="mk-burbuja mk-ella">Me han despedido hoy por "bajo rendimiento" y estoy embarazada de 3 meses.</p>
            <p className="mk-burbuja mk-bot">Lo siento mucho. Si estás embarazada, el despido puede ser nulo aunque la empresa no lo supiera. Tienes 20 días hábiles...</p>
            <p className="mk-burbuja mk-ella">¿Me podéis llamar mañana?</p>
          </div>
        </div>
      </Movil>
      <Movil tono="bien" titulo="Y a la mañana siguiente llamas sabiendo ya su caso, su tema y su plazo, sin hacerle repetir nada.">
        <div className="mk-whatsapp">
          <p className="mk-wa-barra">
            <b className="lg-barra">
              <Logo nombre="WhatsApp" tam={20} /> Laura
            </b>
            <small>en línea</small>
          </p>
          <p className="mk-burbuja mk-wa-yo">Buenos días, Laura. Soy Jesús Tierno. He leído lo que nos contaste anoche: tu plazo corre hasta el 20 de noviembre y por lo que cuentas el despido podría ser nulo. ¿Te llamo ahora?</p>
          <p className="mk-burbuja mk-wa-ella">Sí, por favor. Muchas gracias.</p>
        </div>
      </Movil>
    </div>
  );
}

export function MockupInforme() {
  const filas: [string, string, string][] = [
    ['Visitas', '640', '+12 %'],
    ['Consultas', '14', '+4'],
    ['WhatsApp', '9', ''],
    ['Llamadas', '3', ''],
    ['Formularios', '2', ''],
    ['Coste por consulta (Ads)', '18 €', '-6 €'],
  ];
  return (
    <div className="gm-rejilla">
      <Movil tono="bien" titulo="Cada lunes, en tu móvil y sin jerga: qué ha pasado, de dónde vienen las consultas y qué cambiamos. (Cifras de ejemplo.)">
        <div className="mk-informe">
          <p className="mk-informe-barra">Tu semana · 13 al 19 de octubre</p>
          {filas.map(([a, b, c]) => (
            <div key={a} className="mk-fila">
              <span>{a}</span>
              <b>{b}</b>
              <small className={c.startsWith('-') ? 'mk-verde' : c ? 'mk-verde' : ''}>{c}</small>
            </div>
          ))}
          <div className="mk-grafico" aria-hidden="true">
            {[30, 42, 38, 55, 48, 62, 70].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="mk-informe-nota">
            <b>Lo que cambiamos:</b> subimos el botón de llamar en la página de incapacidad; la palabra "mobbing" traía lectores, no clientes: la pausamos.
          </p>
        </div>
      </Movil>
    </div>
  );
}
