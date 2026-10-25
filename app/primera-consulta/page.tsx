import type { Metadata } from 'next';
import Link from 'next/link';
import FotoCabeza from '@/components/FotoCabeza';
import JsonLd from '@/components/JsonLd';
import { DESPACHO } from '@/lib/despacho';
import Icono from '@/components/Iconos';
import { esquemaMigas, meta } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: 'Tu primera consulta con un abogado laboralista, paso a paso',
  descripcion: 'Qué pasa desde que nos llamas hasta que sales de la consulta: qué llevar, qué te preguntaremos, cuánto cuesta y qué NO tienes que hacer. Sin sorpresas.',
  ruta: '/primera-consulta',
});

const PASOS = [
  { i: 'chat', t: 'Nos cuentas qué te pasa', d: 'Por teléfono o por WhatsApp, con tus palabras y sin papeles. Te decimos con claridad si tu caso necesita una consulta y cuánto cuesta antes de reservar. Si tu situación tiene un plazo corriendo, te lo decimos en ese momento.' },
  { i: 'calendario', t: 'Eliges cómo y cuándo', d: 'Presencial en Jorge Juan o por videollamada, con un abogado del despacho o con Jesús Tierno. Puedes reservar tú misma o tú mismo en la web, o lo hacemos nosotros por teléfono.' },
  { i: 'documento', t: 'Preparas lo poco que hace falta', d: 'Lo que tengas a mano: contrato, últimas nóminas, la carta de despido o los correos y mensajes importantes. Si no tienes algo, no pasa nada: lo vemos juntos.' },
  { i: 'personas', t: 'La consulta: te escuchamos primero', d: 'Dura aproximadamente una hora. Empezamos escuchando, sin interrumpirte. Después te hacemos preguntas concretas y miramos tus documentos.' },
  { i: 'mapa', t: 'Sales con un mapa', d: 'Te explicamos tus opciones, los plazos, lo que puedes reclamar y lo que no, con palabras normales. Y, si decides seguir, qué haríamos y cómo trabajamos. Si prefieres pensártelo, también está bien.' },
];

export default function PrimeraConsulta() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/primera-consulta', texto: 'Tu primera consulta' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Tu primera consulta
            </nav>
            <h1>Tu primera consulta, paso a paso</h1>
            <p className="entradilla">Lo que más frena es no saber qué te van a preguntar ni cuánto cuesta. Aquí lo tienes todo, sin sorpresas.</p>
            <div className="acciones">
              <a className="boton" href={DESPACHO.telefonoHref}>Llamar al {DESPACHO.telefono}</a>
              <Link className="boton boton-claro" href="/reservar">Reservar mi cita</Link>
            </div>
          </div>
          <FotoCabeza ruta="/primera-consulta" />
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor prosa">
          <h2>Cómo es, minuto a minuto</h2>
          <ol className="pc-pasos">
            {PASOS.map((p, n) => (
              <li key={p.t}>
                <span className="pc-icono" aria-hidden="true"><Icono nombre={p.i} tam={24} /></span>
                <div>
                  <span className="pc-n">Paso {n + 1}</span>
                  <strong>{p.t}</strong>
                  <p>{p.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2>Cuánto cuesta</h2>
          <div className="pc-precios">
            <div className="pc-precio">
              <span className="pc-euro" aria-hidden="true">€</span>
              <span className="pc-quien">Con un abogado del despacho</span>
              <span className="pc-cifra">{DESPACHO.precioCita} €<small>{DESPACHO.iva}</small></span>
              <span className="pc-detalle">Consulta de una hora, presencial o por videollamada</span>
            </div>
            <div className="pc-precio pc-precio-jesus">
              <span className="pc-euro" aria-hidden="true">€</span>
              <span className="pc-quien">Con Jesús Tierno</span>
              <span className="pc-cifra">{DESPACHO.precioCitaJesus} €<small>{DESPACHO.iva}</small></span>
              <span className="pc-detalle">Consulta de una hora, presencial o por videollamada</span>
            </div>
          </div>
          <p>Antes de reservar te decimos si tu caso la necesita, y si seguís adelante, te explicamos cómo se trabaja y cuánto costaría.</p>

          <h2>Lo que NO tienes que hacer</h2>
          <ul className="pc-no">
            <li><strong>No tienes que traerlo todo ordenado.</strong> Con lo que tengas, empezamos.</li>
            <li><strong>No tienes que saber derecho</strong> ni usar palabras técnicas.</li>
            <li><strong>No tienes que decidir nada en la consulta:</strong> puedes llevarte lo que te contemos y pensarlo.</li>
            <li><strong>No tienes que firmar nada como conforme</strong> (carta, finiquito, acuerdo) antes de hablar con un abogado.</li>
          </ul>

          <h2>Si vienes acompañando a otra persona</h2>
          <p>
            Puedes venir con ella o con él, o conectarte a la videollamada. Si la persona está pasando un mal momento, ayuda mucho que alguien de confianza tome notas. Más en{' '}
            <Link href="/blog/acompanas-a-alguien-que-ha-sido-despedido">cómo acompañar a quien ha sido despedido</Link>.
          </p>

          <aside className="recuadro">
            <p>
              <strong>Antes de la consulta, ya puedes avanzar:</strong> mira <Link href="/herramientas/plazos">tu plazo</Link>, prepara <Link href="/herramientas/que-guardar">lo que tienes que guardar</Link> o
              encuentra tu situación en <Link href="/mi-caso">Mi caso es...</Link>. Y si vas a algún trámite en Madrid, <Link href="/donde-ir">aquí tienes dónde y cómo llegar</Link>.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
