import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import AreaCliente from '@/components/AreaCliente';
import Icono from '@/components/Iconos';
import { DESPACHO } from '@/lib/despacho';
import { esquemaMigas, meta } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: 'Acceso clientes: sigue tu caso desde el móvil',
  descripcion: 'En tu área de cliente ves en qué fase está tu caso, tus citas, lo que nos falta y tu expediente. Y desde ahí subes archivos, escribes a tu abogado o le mandas un correo. Pruébalo con un caso de ejemplo.',
  ruta: '/area-cliente',
});

const PUEDES = [
  { i: 'mapa', t: 'Ver en qué punto está tu caso', d: 'Una línea con todas las fases, de la consulta a la sentencia, y una frase clara de qué significa cada una. Sin tener que llamar para preguntar.' },
  { i: 'calendario', t: 'Tus citas y tus fechas', d: 'La próxima conciliación o el juicio, con la hora, la dirección y qué llevar. Con un toque, a tu calendario.' },
  { i: 'documento', t: 'Lo que nos falta, con un botón', d: 'Si necesitamos tu nómina o un informe, te lo pedimos aquí y lo subes con una foto desde el móvil.' },
  { i: 'caja', t: 'Todo tu expediente, junto', d: 'Lo que nos has enviado y lo que te mandamos: la papeleta, el acta, la demanda, la sentencia, tus correos. Siempre a mano.' },
  { i: 'descargar', t: 'Subir archivos a tu expediente', d: 'Fotos, PDF o Word, cuando quieras y desde el móvil. Quedan guardados en tu expediente, en orden y sin perderse en el WhatsApp.' },
  { i: 'correo', t: 'Enviar un correo a tu abogado', d: 'Escribes desde tu área, con archivos si quieres, y le llega a tu abogado a su correo de siempre. Queda guardado en tu expediente.' },
  { i: 'chat', t: 'Hablar con tu abogado por escrito', d: 'Un chat con el despacho para tus dudas, sin perseguir a nadie por teléfono. Queda todo escrito.' },
  { i: 'reloj', t: 'Preguntar a cualquier hora', d: 'Un asistente con inteligencia artificial que conoce tu caso te responde de noche o en fin de semana. Lo importante, siempre te lo confirma tu abogado.' },
  { i: 'euro', t: 'Saber lo que te corresponde', d: 'La indemnización estimada de tu caso, explicada, para que sepas de qué hablamos en cada momento.' },
  { i: 'campana', t: 'Avisos cuando algo cambia', d: 'Cuando llega una notificación del juzgado o hay novedades, te avisamos. No tienes que estar pendiente.' },
];

const COMO = [
  { t: 'Te damos tu acceso', d: 'Cuando empezamos con tu caso, te enviamos a tu correo el enlace para entrar.' },
  { t: 'Entras desde el móvil o el ordenador', d: 'Con tu contraseña o con un enlace seguro que te llega al correo. Sin instalar nada.' },
  { t: 'Solo ves lo tuyo', d: 'Cada cliente ve únicamente su caso. Nadie más tiene acceso a tus datos.' },
];

const DUDAS = [
  { p: '¿Y si no me apaño con el móvil?', r: `No pasa nada. El área de cliente es una ayuda, no una obligación. Puedes seguir llamándonos al ${DESPACHO.telefono} o escribiéndonos por WhatsApp como siempre.` },
  { p: '¿Quién me contesta en el chat?', r: 'En «Hablar con el despacho» te contesta tu abogado o el equipo del despacho. En «Pregunta 24 h» te responde un asistente con inteligencia artificial que conoce tu caso: te orienta a cualquier hora, pero las decisiones y lo importante siempre te lo confirma tu abogado.' },
  { p: '¿Están seguros mis datos?', r: 'Tus datos y tus documentos están protegidos y solo los ven tú y el despacho. Los abogados estamos obligados por el secreto profesional, también en lo digital.' },
  { p: '¿Veo los documentos del juzgado?', r: 'Sí. Las notificaciones y resoluciones de tu caso que te afectan aparecen en tus documentos, con una explicación de qué significan.' },
];

export default function PaginaAreaCliente() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/area-cliente', texto: 'Acceso clientes' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / Acceso clientes
          </nav>
          <h1>Acceso clientes: tu caso, siempre a mano</h1>
          <p className="entradilla">
            Saber en qué punto está tu caso quita mucha angustia. Por eso, cuando eres cliente, lo ves todo desde el móvil: en qué fase está, tus
            citas, lo que nos falta y tu expediente. Y desde ahí subes archivos, escribes a tu abogado o le mandas un correo.
          </p>
          <div className="acciones">
            <a className="boton" href="#ejemplo">
              Pruébalo con un caso de ejemplo
            </a>
            <Link className="boton boton-claro" href="/blog/sigue-tu-caso-desde-el-movil">
              Cómo funciona
            </Link>
          </div>
        </div>
      </header>

      <section className="seccion acp-video-sec" id="video">
        <div className="contenedor">
          <p className="acp-video-tit">Míralo en 33 segundos</p>
          <video className="acp-video" controls playsInline preload="none" poster="/video/acceso-clientes-poster.jpg" width={1280} height={720}>
            <source src="/video/acceso-clientes.mp4" type="video/mp4" />
          </video>
          <p className="acp-video-nota">Laura es un caso de ejemplo, inventado.</p>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2>Lo que puedes hacer en tu área de cliente</h2>
          <ul className="acp-rejilla">
            {PUEDES.map((x) => (
              <li key={x.t}>
                <span className="acp-icono" aria-hidden="true">
                  <Icono nombre={x.i} tam={24} />
                </span>
                <strong>{x.t}</strong>
                <p>{x.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="seccion seccion-ac" id="ejemplo">
        <div className="contenedor">
          <h2>Pruébalo con un caso de ejemplo</h2>
          <p className="acp-intro">Así lo ve Laura, una clienta inventada a la que han despedido. Toca «Avanza el caso» y mira cómo cambia, de la consulta a la sentencia.</p>
          <AreaCliente />
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2>Cómo entras</h2>
          <ol className="acp-pasos">
            {COMO.map((x, n) => (
              <li key={x.t}>
                <span className="acp-n">{n + 1}</span>
                <div>
                  <strong>{x.t}</strong>
                  <p>{x.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor prosa">
          <h2>Tus dudas</h2>
          {DUDAS.map((x) => (
            <details key={x.p} className="acp-duda">
              <summary>{x.p}</summary>
              <p>{x.r}</p>
            </details>
          ))}
          <p className="acp-cierre">
            ¿Quieres que llevemos tu caso? <Link href="/reservar">Reserva tu primera consulta</Link> o llámanos al{' '}
            <a href={DESPACHO.telefonoHref}>{DESPACHO.telefono}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
