import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/lib/seo';
import VideoPortada from '@/components/VideoPortada';
import { BotonChat } from '@/components/BotonesAccion';
import { AREAS_EN } from '@/lib/areas-en';
import { CASOS } from '@/lib/casos';
import { CASOS_EN } from '@/lib/casos-en';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';

export const metadata: Metadata = meta({
  titulo: 'English-speaking employment lawyers in Madrid',
  tituloSeo: 'English-speaking employment lawyers in Madrid',
  descripcion:
    'Employment law firm in Madrid specialising in workplace harassment, dismissal and permanent disability. Over 25 years defending workers. We speak English.',
  ruta: '/en',
});

export default function InicioEn() {
  const hitos = CASOS.filter((c) => c.materia === 'Acoso laboral' && CASOS_EN[c.slug]);
  return (
    <>
      <section className="portada-video">
        <picture>
          <source media="(max-width: 700px)" srcSet="/img/portada-poster-movil.webp" />
          <img className="poster" src="/img/portada-poster.webp" alt="" fetchPriority="high" />
        </picture>
        <VideoPortada />
        <div className="contenedor">
          <h1>Employment lawyers in Madrid<span className="pv-coma">,</span> <span className="pv-h1-sub">specialists in workplace harassment.</span></h1>
          <p className="entradilla pv-largo">
            Over 25 years with dismissals, harassment and permanent disability. In 2005 we obtained the first ruling in Spain against both the company and the harasser.
            We help workers from all over Spain, in English, at our office on Jorge Juan street or by video call.
          </p>
          <p className="entradilla pv-corto">Over 25 years by your side, in English, on Jorge Juan street or by video call.</p>
          <p className="pv-sello"><b>2005</b> First ruling in Spain against both the company and the harasser</p>
          <div className="acciones">
            <a className="boton boton-marcador" href={DESPACHO.telefonoHref}>
              Call +34 {DESPACHO.telefono}
            </a>
            <BotonChat texto="Ask the chat in English" clase="boton boton-claro" />
          </div>
        </div>
      </section>

      <section className="avales" aria-label="Our track record">
        <div className="contenedor avales-fila">
          <div>
            <strong>2005</strong>
            <span>First ruling in Spain against both the company and the harasser</span>
          </div>
          <div>
            <strong>25+ years</strong>
            <span>Devoted to employment law, above all harassment</span>
          </div>
          <div>
            <strong>A book</strong>
            <span>Co-author of &quot;Valores en el trabajo&quot; with Bernabé Tierno</span>
          </div>
          <div>
            <strong>In English</strong>
            <span>Consultations, documents and our assistant, in your language</span>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2>What is happening to you?</h2>
          <div className="ne-temas" style={{ marginTop: 24 }}>
            {AREAS_EN.map((a) => (
              <Link key={a.slug} href={`/en/${a.slug}`} className="ne-tema">
                <img src={`/img/${a.foto}-640.webp`} alt="" width={640} height={427} loading="lazy" />
                <span>
                  <strong>{a.menu}</strong>
                  <small>
                    {a.plazo.cifra}: {a.plazo.texto.split('.')[0]}.
                  </small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion seccion-blanca">
        <div className="contenedor">
          <h2>Cases that opened the way</h2>
          <ul className="hitos">
            {hitos.map((c) => (
              <li key={c.slug}>
                <strong>
                  {c.anio}. {CASOS_EN[c.slug].titulo}
                </strong>
                <span>{CASOS_EN[c.slug].resumen}</span>
              </li>
            ))}
          </ul>
          <div className="acciones">
            <Link className="boton boton-claro" href="/en/rulings">
              See every case
            </Link>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor bloque-foto invertido">
          <img src="/img/equipo.webp" srcSet="/img/equipo-640.webp 640w, /img/equipo.webp 1600w" sizes="(max-width: 860px) 100vw, 50vw" alt="Jesús Tierno with the team" loading="lazy" />
          <div>
            <span className="etiqueta-calida">Who defends you</span>
            <h2>A specialist team, not a call centre</h2>
            <p>
              Jesús Tierno leads the firm and personally handles the most complex cases. With him, a team of lawyers devoted only to employment law. From the
              first call you know who will handle your case, which deadlines apply and what you will pay.
            </p>
            <p>
              A one-hour first consultation costs {DESPACHO.precioCita} euros + VAT with a lawyer from the firm, or {DESPACHO.precioCitaJesus} euros + VAT with Jesús
              Tierno. Before you book, we tell you by phone or WhatsApp whether your case needs it.
            </p>
            <div className="acciones">
              <Link className="boton" href="/en/contact">
                Book a consultation
              </Link>
              <a className="boton boton-claro" href={enlaceWhatsapp('Hello, I would like to ask about my case.')}>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion seccion-arena">
        <div className="contenedor dos-columnas" style={{ alignItems: 'center' }}>
          <div>
            <h2>Ask our assistant, at any hour, in English</h2>
            <p>
              It knows the whole website, our fees and how we work. Tell it what is happening and it tells you which deadlines apply and what to do next. It is an
              artificial intelligence: general guidance, reviewed by a lawyer when you need it.
            </p>
            <BotonChat texto="Open the chat" clase="boton" />
          </div>
          <div>
            <h2>Free tools</h2>
            <p>Compensation, deadlines, harassment test, disability checker and ten more, all in English. Free, instant and without leaving your details.</p>
            <Link className="boton boton-claro" href="/en/tools">
              See the tools
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
