import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { meta } from '@/lib/seo';
import { LANDINGS, landing } from '@/lib/landings';
import { DESPACHO, enlaceWhatsapp, lineaColegiado } from '@/lib/despacho';
import FormularioLanding from '@/components/FormularioLanding';
import ComprobadorIncapacidad from '@/components/ComprobadorIncapacidad';
import TestAcoso from '@/components/TestAcoso';
import Calculadora from '@/components/Calculadora';
import VideoPortada from '@/components/VideoPortada';

// Páginas de aterrizaje para Google Ads. Sin menú (todo lleva a contactar), sin indexar
// (son para el tráfico de pago) y con el formulario a la vista nada más entrar.
export function generateStaticParams() {
  return LANDINGS.map((l) => ({ tema: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tema: string }> }): Promise<Metadata> {
  const { tema } = await params;
  const l = landing(tema);
  if (!l) return {};
  return {
    ...meta({ titulo: l.titulo, tituloSeo: l.tituloSeo, descripcion: l.descripcion, ruta: `/consulta/${l.slug}`, imagen: `/img/${l.foto}.webp` }),
    robots: { index: false, follow: false },
  };
}

const Telefono = ({ claro = false }: { claro?: boolean }) => (
  <a className={`boton ${claro ? 'lp-boton-claro' : 'boton-marcador'}`} href={DESPACHO.telefonoHref}>
    Llamar al {DESPACHO.telefono}
  </a>
);

export default async function Landing({ params }: { params: Promise<{ tema: string }> }) {
  const { tema } = await params;
  const l = landing(tema);
  if (!l) notFound();
  const form = (id: string, titulo?: string) => (
    <FormularioLanding id={id} landing={l.slug} tema={l.tema} opciones={l.opcionesFormulario} whatsapp={l.whatsapp} titulo={titulo} />
  );

  return (
    <div className="landing">
      <div className="lp-barra">
        <div className="contenedor lp-barra-fila">
          <Link href="/" className="marca" aria-label="Tierno Centella Abogados, inicio">
            <img src="/img/logo-tc.webp" alt="Tierno Centella Abogados" width={168} height={40} />
          </Link>
          <a className="lp-barra-tel" href={DESPACHO.telefonoHref}>
            <span>Llámanos</span> {DESPACHO.telefono}
          </a>
        </div>
      </div>

      <section className="lp-heroe">
        <img
          className="lp-heroe-foto"
          src={`/img/${l.foto}.webp`}
          srcSet={`/img/${l.foto}-640.webp 640w, /img/${l.foto}.webp 1080w`}
          sizes="100vw"
          alt=""
          fetchPriority="high"
        />
        <VideoPortada />
        <div className="contenedor lp-heroe-titulo">
          <p className="lp-antetitulo">{l.antetitulo}</p>
          <h1>{l.titulo}</h1>
        </div>
      </section>

      <section className="lp-heroe-cuerpo">
        <div className="contenedor lp-heroe-rejilla">
          <div className="lp-heroe-texto">
            <p className="lp-sub">{l.subtitulo}</p>
            <ul className="lp-ventajas">
              {l.ventajas.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
            <div className="lp-plazo">
              <strong>{l.plazo.cifra}</strong> <span>{l.plazo.texto}</span>
            </div>
            <div className="lp-botones">
              <Telefono claro />
              <a className="boton lp-boton-wa" href={enlaceWhatsapp(l.whatsapp)}>
                WhatsApp
              </a>
            </div>
          </div>
          {form('lf-arriba')}
        </div>
      </section>

      <section className="lp-prueba" aria-label="Por qué confiar en nosotros">
        <div className="contenedor lp-prueba-fila">
          {l.prueba.map((p) => (
            <div key={p.titulo}>
              <strong>{p.titulo}</strong>
              <span>{p.texto}</span>
            </div>
          ))}
        </div>
      </section>

      {l.dolor && (
        <section className="seccion lp-dolor" aria-label={l.dolor.titulo}>
          <div className="contenedor lp-estrecho">
            <h2>{l.dolor.titulo}</h2>
            <ul className="lp-frases">
              {l.dolor.frases.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="lp-dolor-cierre">{l.dolor.cierre}</p>
            <a className="boton lp-boton-claro" href="#lf-arriba">Cuéntanos tu caso</a>
            {l.confidencial && <p className="lp-confidencial">{l.confidencial}</p>}
          </div>
        </section>
      )}

      <section className="seccion">
        <div className="contenedor">
          <h2>¿En qué situación estás?</h2>
          <div className="lp-situaciones">
            {l.situaciones.map((s) => (
              <a key={s.titulo} href="#lf-arriba" className="lp-situacion">
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
                <span>Consúltanos tu caso</span>
              </a>
            ))}
            <a href={DESPACHO.telefonoHref} className="lp-situacion lp-situacion-otra">
              <h3>¿Tu caso es otro?</h3>
              <p>Cada expediente es distinto. Cuéntanoslo y te decimos si podemos ayudarte.</p>
              <span>Llamar al {DESPACHO.telefono}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="seccion lp-herramienta" id="lp-herramienta">
        <div className="contenedor lp-estrecho">
          <h2>{l.herramientaTitulo}</h2>
          <p>{l.herramientaTexto}</p>
          {l.herramienta === 'incapacidad' && <ComprobadorIncapacidad />}
          {l.herramienta === 'acoso' && <TestAcoso />}
          {l.herramienta === 'despido' && <Calculadora />}
        </div>
      </section>

      {l.noHagas && (
        <section className="seccion lp-nohagas">
          <div className="contenedor">
            <h2>{l.noHagas.titulo}</h2>
            <ol className="lp-errores">
              {l.noHagas.items.map((x) => (
                <li key={x.t}>
                  <h3>{x.t}</h3>
                  <p>{x.r}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {l.tabla && (
        <section className="seccion">
          <div className="contenedor">
            <h2>{l.tabla.titulo}</h2>
            <div className="lp-tabla-env">
              <table className="lp-tabla">
                <thead>
                  <tr>
                    {l.tabla.columnas.map((c) => (
                      <th key={c}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {l.tabla.filas.map((f) => (
                    <tr key={f[0]}>
                      {f.map((c, i) => (i === 0 ? <th key={i}>{c}</th> : <td key={i}>{c}</td>))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="lp-nota">{l.tabla.nota}</p>
          </div>
        </section>
      )}

      <section className="seccion lp-como">
        <div className="contenedor">
          <h2>Cómo trabajamos</h2>
          <ol className="lp-pasos">
            {l.pasos.map((p) => (
              <li key={p.titulo}>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
          {l.consulta && (
            <div className="lp-consulta">
              <h3>{l.consulta.titulo}</h3>
              <ul>
                {l.consulta.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="lp-precio">
            <div>
              <strong>Primera consulta de una hora</strong>
              <p>
                {DESPACHO.precioCita} €{DESPACHO.iva} con un abogado del despacho · {DESPACHO.precioCitaJesus} €{DESPACHO.iva} con Jesús Tierno.
                Después, presupuesto por escrito antes de empezar.
              </p>
            </div>
            <Telefono />
          </div>
        </div>
      </section>

      <section className="seccion lp-jesus">
        <div className="contenedor lp-jesus-rejilla">
          <img src="/img/jesus-retrato-640.webp" alt="Jesús Tierno Centella, socio director del despacho" width={640} height={640} loading="lazy" />
          <div>
            <p className="etiqueta-calida">Quién te defiende</p>
            <h2>Jesús Tierno Centella y su equipo</h2>
            <p>
              Más de 25 años de ejercicio en derecho laboral. Coautor de &quot;Valores en el trabajo&quot; con el psicólogo Bernabé Tierno, ponente
              en la Universidad Pontificia Comillas y voz habitual en medios como Onda Cero. Un despacho pequeño a propósito: tu caso lo lleva
              un abogado que conoces, no un call center.
            </p>
            <p className="lp-direccion">
              {DESPACHO.direccion}, {DESPACHO.ciudad}. Y por videollamada desde toda España.
            </p>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor lp-estrecho">
          <h2>Preguntas frecuentes</h2>
          <div className="lp-preguntas">
            {l.preguntas.map((q) => (
              <details key={q.p}>
                <summary>{q.p}</summary>
                <p>{q.r}</p>
              </details>
            ))}
          </div>
          <p className="lp-nota">
            ¿Prefieres leer antes? <Link href={l.guia.href}>{l.guia.texto}</Link>.
          </p>
        </div>
      </section>

      <section className="seccion lp-final">
        <div className="contenedor lp-final-rejilla">
          <div>
            <h2>Cuéntanos tu caso hoy</h2>
            <p>Cuanto antes lo vemos, más opciones tienes. Te llama un abogado, no un comercial.</p>
            <div className="lp-botones">
              <Telefono claro />
              <a className="boton lp-boton-wa" href={enlaceWhatsapp(l.whatsapp)}>
                WhatsApp
              </a>
            </div>
          </div>
          {form('lf-abajo', 'Déjanos tu teléfono')}
        </div>
      </section>

      <div className="lp-fija" role="region" aria-label="Contactar">
        <a href={DESPACHO.telefonoHref}>Llamar</a>
        <a href={enlaceWhatsapp(l.whatsapp)}>WhatsApp</a>
        <a href="#lf-arriba">Te llamamos</a>
      </div>
      <footer className="lp-pie">
        <div className="contenedor">
          <p>
            {DESPACHO.nombre} · {DESPACHO.direccion}, {DESPACHO.ciudad} · <a href={DESPACHO.telefonoHref}>{DESPACHO.telefono}</a>
          </p>
          <p>
            <Link href="/aviso-legal">Aviso legal</Link> · <Link href="/privacidad">Privacidad</Link> · <Link href="/cookies">Cookies</Link> ·{' '}
            <Link href="/">Web del despacho</Link>
          </p>
          <p className="lp-nota">La información de esta página es general y no sustituye al estudio de tu caso por un abogado.</p>
          {lineaColegiado() && <p className="lp-nota">{lineaColegiado()}</p>}
        </div>
      </footer>
    </div>
  );
}
