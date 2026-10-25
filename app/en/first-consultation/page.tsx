import type { Metadata } from 'next';
import Link from 'next/link';
import FotoCabeza from '@/components/FotoCabeza';
import JsonLd from '@/components/JsonLd';
import { DESPACHO } from '@/lib/despacho';
import Icono from '@/components/Iconos';
import { esquemaMigas, meta } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: 'Your first consultation with an employment lawyer, step by step',
  tituloSeo: 'Your first consultation, step by step',
  descripcion: 'What happens from the moment you call us until you leave the consultation: what to bring, what we will ask, what it costs and what you do NOT have to do. No surprises.',
  ruta: '/en/first-consultation',
});

const PASOS = [
  { i: 'chat', t: 'You tell us what is happening', d: 'By phone or WhatsApp, in your own words and without paperwork. We tell you clearly whether your case needs a consultation and what it costs before you book. If a deadline is running in your situation, we tell you there and then.' },
  { i: 'calendario', t: 'You choose how and when', d: 'In person at our office on Jorge Juan street or by video call, with a lawyer from the firm or with Jesús Tierno. You can book it yourself through the website or we can arrange it for you over the phone.' },
  { i: 'documento', t: 'You prepare the little that is needed', d: 'Whatever you have to hand: your contract, your latest payslips, the dismissal letter (carta de despido) or the important emails and messages. If you are missing something, it does not matter: we will look at it together.' },
  { i: 'personas', t: 'The consultation: we listen first', d: 'It lasts about an hour. We start by listening, without interrupting you. Then we ask you specific questions and look at your documents.' },
  { i: 'mapa', t: 'You leave with a map', d: 'We explain your options, the deadlines, what you can claim and what you cannot, in plain words. And, if you decide to go ahead, what we would do and how we work. If you would rather think it over, that is fine too.' },
];

export default function FirstConsultationEn() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/en', texto: 'Home' }, { href: '/en/first-consultation', texto: 'Your first consultation' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="You are here">
              <Link href="/en">Home</Link> / Your first consultation
            </nav>
            <h1>Your first consultation, step by step</h1>
            <p className="entradilla">What holds people back most is not knowing what they will be asked or what it will cost. Here it all is, with no surprises.</p>
            <div className="acciones">
              <a className="boton" href={DESPACHO.telefonoHref}>Call +34 {DESPACHO.telefono}</a>
              <Link className="boton boton-claro" href="/en/contact">Book my appointment</Link>
            </div>
          </div>
          <FotoCabeza ruta="/en/first-consultation" />
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor prosa">
          <h2>What it is like, minute by minute</h2>
          <ol className="pc-pasos">
            {PASOS.map((p, n) => (
              <li key={p.t}>
                <span className="pc-icono" aria-hidden="true"><Icono nombre={p.i} tam={24} /></span>
                <div>
                  <span className="pc-n">Step {n + 1}</span>
                  <strong>{p.t}</strong>
                  <p>{p.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2>What it costs</h2>
          <div className="pc-precios">
            <div className="pc-precio">
              <span className="pc-euro" aria-hidden="true">€</span>
              <span className="pc-quien">With a lawyer from the firm</span>
              <span className="pc-cifra">{DESPACHO.precioCita} €<small> + VAT</small></span>
              <span className="pc-detalle">One-hour consultation, in person or by video call</span>
            </div>
            <div className="pc-precio pc-precio-jesus">
              <span className="pc-euro" aria-hidden="true">€</span>
              <span className="pc-quien">With Jesús Tierno</span>
              <span className="pc-cifra">{DESPACHO.precioCitaJesus} €<small> + VAT</small></span>
              <span className="pc-detalle">One-hour consultation, in person or by video call</span>
            </div>
          </div>
          <p>Before you book, we tell you whether your case needs one, and if you go ahead, we explain how we would work and what it would cost.</p>

          <h2>If you decide to go ahead</h2>
          <ul className="pc-despues">
            <li><strong>Before we start, everything in writing:</strong> what we are going to do, how the fees are calculated and what options you have. No small print.</li>
            <li><strong>Nothing starts without your signature.</strong> If you would rather think it over or get another opinion, that is fine too.</li>
            <li><strong>You will know where your case stands</strong> without having to ask, and who to talk to at each stage.</li>
          </ul>

          <h2>What you do NOT have to do</h2>
          <ul className="pc-no">
            <li><strong>You do not have to bring everything in order.</strong> We start with whatever you have.</li>
            <li><strong>You do not need to know the law</strong> or use technical words.</li>
            <li><strong>You do not have to decide anything in the consultation:</strong> you can take away what we tell you and think about it.</li>
            <li><strong>You do not have to sign anything as agreed</strong> (a letter, the final settlement (finiquito), an agreement) before speaking to a lawyer.</li>
          </ul>

          <h2>If you are coming with someone else</h2>
          <p>
            You can come along with them or join the video call. If the person is going through a hard time, it helps a great deal for someone they trust to take notes.
          </p>

          <aside className="recuadro">
            <p>
              <strong>Before the consultation, you can already make progress:</strong> check <Link href="/en/tools/deadlines">your deadline</Link>, look at the{' '}
              <Link href="/en/procedures">procedures you can do yourself</Link> or read the <Link href="/en/faq">frequently asked questions</Link>.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
