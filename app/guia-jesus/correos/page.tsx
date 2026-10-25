import type { Metadata } from 'next';
import Lupa from '@/components/Lupa';
import { SECUENCIA_ACOSO, TRAS_CONSULTA, type Correo } from '@/lib/correos-acoso';

export const metadata: Metadata = {
  title: 'Correos de seguimiento: ejemplo de acoso laboral | Guía para Jesús',
  description: 'Así acompañaríamos por correo a quien escribe al despacho por un caso de acoso laboral: cuántos correos, cuándo y con qué contenido.',
  robots: { index: false, follow: false },
};

const POR_QUE = [
  {
    t: 'Nadie decide el primer día',
    d: 'Quien sufre acoso tarda días o semanas en decidirse: lo habla en casa, compara despachos, duda. Si en ese tiempo nadie le escribe, se olvida de quién le atendió.',
  },
  {
    t: 'Te recuerda en cada momento',
    d: 'Cada correo llega cuando toca: al escribir, cuando busca pruebas, cuando le preocupa el plazo, cuando compara. Tu despacho está presente en todo su proceso de decisión.',
  },
  {
    t: 'Ayuda antes de pedir',
    d: 'Los primeros correos no venden: dan un test, un mapa de pruebas, su plazo. Quien recibe ayuda de verdad confía, y quien confía llama.',
  },
  {
    t: 'Funciona solo, y se mide',
    d: 'Se escribe una vez y Resend lo envía a cada persona en su día. Sabemos quién abre, quién pulsa cada botón y cuántos acaban reservando consulta.',
  },
];

function Mail({ c, n }: { c: Correo; n: number }) {
  return (
    <div className="cj-mail">
      <div className="cj-mail-cabeza">
        <span className="cj-avatar">TC</span>
        <span className="cj-de">
          <b>Tierno Centella Abogados</b>
          <small>info@tiernocentella.es · para Laura</small>
        </span>
        <span className="cj-hora">{c.cuando}</span>
      </div>
      <p className="cj-asunto">{c.asunto}</p>
      <p className="cj-previa">{c.previa}</p>
      <div className="cj-cuerpo">
        <img className="cj-logo" src="/img/logo-tc.webp" alt="Tierno Centella Abogados" width={150} height={36} loading={n < 2 ? 'eager' : 'lazy'} />
        {c.foto && (
          <img
            className="cj-foto"
            src={`/img/${c.foto}-640.webp`}
            alt={c.fotoAlt || ''}
            width={640}
            height={360}
            loading={n < 2 ? 'eager' : 'lazy'}
          />
        )}
        {c.parrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {c.lista && (
          <ul>
            {c.lista.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        )}
        {c.video && (
          <a className="cj-video" href={`https://www.youtube.com/watch?v=${c.video.id}`} target="_blank" rel="noopener">
            <img src={`https://i.ytimg.com/vi/${c.video.id}/hqdefault.jpg`} alt={c.video.titulo} width={480} height={360} loading="lazy" />
            <span className="cj-play" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="cj-video-titulo">{c.video.titulo}</span>
          </a>
        )}
        <div className="cj-botones">
          {c.botones.map((b) => (
            <a
              key={b.texto}
              className={`cj-boton cj-${b.tipo}`}
              href={b.href}
              {...(b.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
            >
              {b.texto}
            </a>
          ))}
        </div>
        <p className="cj-firma">
          Un abrazo,
          <br />
          <b>Jesús Tierno y el equipo de Tierno Centella Abogados</b>
        </p>
        <p className="cj-pie">
          Calle de Jorge Juan, 78, 5.º C · 28009 Madrid · 913 24 97 97
          <br />
          Recibes este correo porque nos escribiste desde la web y aceptaste recibir información sobre tu caso.{' '}
          <span className="cj-baja">Darme de baja</span>
        </p>
      </div>
    </div>
  );
}

function Paso({ c, n, total }: { c: Correo; n: number; total?: number }) {
  return (
    <section className="cj-paso" id={`correo-${n + 1}`}>
      <div className="cj-lado">
        <span className="cj-num">{total ? `${n + 1} de ${total}` : 'Extra'}</span>
        <span className="cj-cuando">{c.dia}</span>
        <b className="cj-objetivo">{c.objetivo}</b>
        <p className="cj-por">
          <small>Por qué funciona</small>
          {c.por}
        </p>
      </div>
      <Mail c={c} n={n} />
    </section>
  );
}

export default function CorreosAcoso() {
  const total = SECUENCIA_ACOSO.length;
  return (
    <div className="cj">
      <Lupa pantalla="correos" selector="section[id], [data-lupa]" />
      <header className="cj-portada">
        <div className="contenedor">
          <a className="cj-volver" href="/guia-jesus#17-del-formulario-a-la-consulta-correos-que-acompanan-a-cada-contacto">
            Volver a la guía
          </a>
          <p className="cj-etiqueta">Ejemplo real · Acoso laboral</p>
          <h1>Así acompañaríamos a quien te escribe por acoso laboral</h1>
          <p className="cj-entradilla">
            Laura deja sus datos en la web un martes por la noche. A partir de ahí, y hasta que decide, recibe <b>{total} correos</b> en el momento justo,
            pensados para su caso. Todos con una llamada a la acción clara: llamar, escribir por WhatsApp, hacer un test o reservar su consulta.
          </p>
          <ol className="cj-linea" aria-label="Calendario de los correos">
            {SECUENCIA_ACOSO.map((c, i) => (
              <li key={c.asunto}>
                <a href={`#correo-${i + 1}`}>
                  <b>{c.dia}</b>
                  <span>{c.objetivo}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </header>

      <div className="contenedor">
        <section className="cj-dolor">
          <div className="cj-dolor-hoy">
            <small>Hoy</small>
            <b>¿Le escribes algo a quien deja sus datos y no reserva?</b>
            <span>
              Si la respuesta es &quot;no&quot; o &quot;depende de quién lo coja&quot;, es muy probable que se estén yendo a otro despacho personas que ya te habían
              elegido una vez. Nadie las pierde a propósito: simplemente, nadie tiene tiempo de acordarse de escribirles.
            </span>
          </div>
          <div className="cj-dolor-luego">
            <small>Con nosotros</small>
            <b>Los escribimos, los enviamos y los medimos. Tú solo los apruebas.</b>
            <span>
              Preparamos una secuencia para cada tema (despido, acoso, incapacidad, Mujer y trabajo y empresas), la conectamos a tu web y a tu dominio, y cada
              semana te contamos cuántas personas acaban en consulta gracias a ella.
            </span>
          </div>
        </section>

        <p className="cj-ejemplo">
          <b>Esto es solo un ejemplo.</b> Los correos se hacen a tu medida: cuántos, cada cuánto, con qué tono, con tu firma o la del equipo, con tus vídeos y
          tus casos. Si quieres menos correos, otro orden o hablar más de algo concreto, se cambia.
        </p>

        <section className="cj-razones">
          <h2>Por qué funciona tan bien</h2>
          <p>
            No sabemos si hoy haces algo parecido, así que te lo contamos desde el principio: suele ser de lo más rentable en un despacho, porque{' '}
            <b>le recuerda a cada contacto que existes en cada momento de su decisión</b>, sin que nadie del despacho tenga que acordarse.
          </p>
          <div className="cj-razones-rejilla">
            {POR_QUE.map((r, i) => (
              <div key={r.t} className="cj-razon">
                <span className="cj-razon-n">{i + 1}</span>
                <b>{r.t}</b>
                <span>{r.d}</span>
              </div>
            ))}
          </div>
        </section>

        <h2 className="cj-titulo">Los {total} correos, uno a uno</h2>
        <p className="cj-nota">
          Así los vería Laura en su móvil. Los textos son una propuesta: tú los revisas y los firmas. Los enlaces funcionan y llevan a la web nueva.
        </p>
        {SECUENCIA_ACOSO.map((c, i) => (
          <Paso key={c.asunto} c={c} n={i} total={total} />
        ))}

        <section className="cj-regla">
          <h2>Y en cuanto Laura reserva o llama, la secuencia se para</h2>
          <p>
            Nadie recibe un &quot;¿hablamos de tu caso?&quot; después de haber venido a la consulta. Al reservar, sale de esta secuencia y entra en la de cliente:
            su hoja de ruta por escrito y, al día siguiente, la petición de su opinión en Google.
          </p>
        </section>
        <Paso c={TRAS_CONSULTA} n={total} />

        <section className="cj-medir">
          <h2>Lo que medimos cada semana</h2>
          <div className="cj-medir-rejilla">
            <div>
              <b>Aperturas</b>
              <span>Qué asuntos funcionan y cuáles cambiar</span>
            </div>
            <div>
              <b>Clics en cada botón</b>
              <span>Llamar, WhatsApp, test, reservar</span>
            </div>
            <div>
              <b>Consultas reservadas</b>
              <span>Cuántas personas de la secuencia acaban en consulta</span>
            </div>
            <div>
              <b>Bajas</b>
              <span>Si alguien se va, ajustamos el ritmo</span>
            </div>
          </div>
          <p>Probamos dos asuntos distintos en el mismo correo y nos quedamos con el que más se abre. Te lo contamos en el informe semanal.</p>
        </section>

        <section className="cj-servicio">
          <h2>Todo esto entra en el servicio, sin que tengas que hacer nada</h2>
          <p>
            Escribir las secuencias, conectarlas a la web, enviarlas desde tu dominio, medir qué funciona y mejorarlas cada mes: lo hacemos nosotros, dentro
            del servicio 360. Tú solo revisas los textos la primera vez.
          </p>
          <a className="boton boton-marcador" href="/guia-jesus#25-y-ahora-tu-decides">
            Ver qué incluye el servicio
          </a>
        </section>

        <section className="cj-legal">
          <h2>Con cuidado, como debe ser en un despacho</h2>
          <ul>
            <li>Solo a quien lo acepta con una casilla clara, que no viene marcada.</li>
            <li>Cada correo lleva su enlace para darse de baja, a un toque.</li>
            <li>Ningún correo da datos de su caso ni promete resultados, como pide el Código Deontológico.</li>
            <li>Se envían desde tu dominio (tiernocentella.es), con Resend, para que lleguen a la bandeja de entrada y no al correo no deseado.</li>
            <li>Hay una secuencia para cada tema: despido, acoso, incapacidad, Mujer y trabajo y empresas.</li>
          </ul>
          <a className="boton boton-marcador" href="/guia-jesus#17-del-formulario-a-la-consulta-correos-que-acompanan-a-cada-contacto">
            Volver a la guía
          </a>
        </section>
      </div>
    </div>
  );
}
