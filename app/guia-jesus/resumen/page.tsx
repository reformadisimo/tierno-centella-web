import type { Metadata } from 'next';
import Link from 'next/link';
import { DOLORES } from '@/lib/guia-dolores';
import { indiceGuia } from '@/lib/guia-indice';

// Resumen de la guía en una sola página. Privado: no se indexa.
export const metadata: Metadata = {
  title: 'Tu guía en una sola página',
  description: 'Lo que vemos hoy, lo que cambia con nosotros y lo que necesitamos de ti.',
  robots: { index: false, follow: false },
};

type Estado = 'hecho' | 'marcha' | 'preparado' | 'tu';
const ESTADOS: Record<Estado, string> = { hecho: 'Ya hecho', marcha: 'En marcha', preparado: 'Preparado', tu: 'Te necesitamos' };
// Estado de cada punto, en el mismo orden que los puntos de la guía.
const ESTADO: Estado[] = ['hecho', 'hecho', 'marcha', 'marcha', 'tu', 'tu', 'hecho', 'tu', 'hecho', 'preparado', 'preparado', 'tu', 'marcha', 'tu'];

const RECORRIDO = [
  {
    n: '1',
    t: 'Te buscan',
    hoy: '239 visitas al mes desde Google, un 38 % menos que en julio. En las IA, 14 sobre 100.',
    luego: '47 guías nuevas, tres artículos a la semana y textos que las IA pueden citar.',
  },
  {
    n: '2',
    t: 'Entran en tu web',
    hoy: 'Tarda 18,3 s en el móvil. Dice "consulta gratuita" y la cita cuesta 150 € más IVA.',
    luego: '3,2 s en el móvil, precio claro antes de reservar y reserva en cuatro pasos, sin carrito.',
  },
  {
    n: '3',
    t: 'Confían en ti',
    hoy: '59 reseñas y 11 de una estrella, ninguna respondida. Redes que parecen de 2017.',
    luego: 'Todas las reseñas respondidas (tú apruebas), reseñas nuevas de clientes contentos y redes al día.',
  },
  {
    n: '4',
    t: 'Te llaman, y lo sabes',
    hoy: 'Nadie les vuelve a escribir si no contratan, y no se sabe de dónde viene cada cliente.',
    luego: 'Siete correos según su caso y cada llamada, WhatsApp y formulario con su origen.',
  },
];

export default function Resumen() {
  const claves = Object.fromEntries(indiceGuia().map((a) => [a.clave, a.id]));
  const cuenta = (e: Estado) => ESTADO.filter((x) => x === e).length;
  return (
    <main className="rs2">
      <nav className="rs2-nav" aria-label="Navegación">
        <Link href="/guia-jesus">Volver a la guía completa</Link>
        <Link href="/">Ver la web nueva</Link>
      </nav>

      <header className="rs2-cab">
        <h1>Tu guía en una sola página</h1>
        <a className="rs2-web" href="https://tierno-centella-web.vercel.app/">
          <span className="rs2-web-et">Lo primero: tu web nueva</span>
          <span className="rs2-web-url">tierno-centella-web.vercel.app</span>
          <span className="rs2-web-boton">Ver mi web</span>
        </a>
        <p>Ábrela en el móvil y pregúntale algo al chat, como si fueras un cliente. Debajo, en un vistazo: dónde se pierden hoy tus clientes y qué cambia.</p>
        <ul className="rs2-cuenta">
          {(['hecho', 'preparado', 'marcha', 'tu'] as Estado[]).map((e) => (
            <li key={e} className={`rs2-estado rs2-${e}`}>
              <b>{cuenta(e)}</b> {ESTADOS[e].toLowerCase()}
            </li>
          ))}
        </ul>
      </header>

      <section aria-labelledby="rs2-reco">
        <h2 id="rs2-reco">El camino de una clienta, y dónde se pierde hoy</h2>
        <div className="rs2-reco">
          {RECORRIDO.map((r) => (
            <article key={r.n} className="rs2-etapa">
              <span className="rs2-num">{r.n}</span>
              <h3>{r.t}</h3>
              <p className="rs2-hoy"><b>Hoy</b> {r.hoy}</p>
              <p className="rs2-luego"><b>Con nosotros</b> {r.luego}</p>
            </article>
          ))}
        </div>
      </section>

      <details className="rs2-mas">
        <summary>Ver los {DOLORES.length} puntos, uno por uno</summary>
        <div className="rs2-lista">
          {DOLORES.map((d, i) => {
            const e = ESTADO[i];
            const id = d.ancla ? claves[d.ancla] : undefined;
            return (
              <article key={d.titulo} className="rs2-punto">
                <div className="rs2-punto-cab">
                  <span className="rs2-num">{i + 1}</span>
                  <h3>{d.titulo}</h3>
                  <span className={`rs2-estado rs2-${e}`}>{ESTADOS[e]}</span>
                </div>
                <div className="rs2-cifras">
                  <p className="rs2-hoy"><strong>{d.hoyDato}</strong> {d.hoy}</p>
                  <span aria-hidden="true" className="rs2-flecha">&darr;</span>
                  <p className="rs2-luego"><strong>{d.luegoDato}</strong> {d.luego}</p>
                </div>
                {id && <Link className="rs2-ver" href={`/guia-jesus#${id}`}>Ver el detalle</Link>}
              </article>
            );
          })}
        </div>
      </details>

      <section aria-labelledby="rs2-cobro" className="rs2-nota" hidden>
        <h2 id="rs2-cobro">Y una cosa más: el cobro de la reserva</h2>
        <p>
          La reserva nueva ya recoge día, modalidad y motivo, y te avisa. Para que además <strong>cobre</strong> (PayPal, tarjeta o Bizum) hay que configurarlo, y no
          sabemos cómo lo tienes ahora. Basta con un enlace de pago tuyo o una cuenta de PayPal Empresa que crees tú. Tú nos dices qué tienes y nosotros lo dejamos
          funcionando, sin tocar tus claves.
        </p>
      </section>

      <section aria-labelledby="rs2-nec">
        <h2 id="rs2-nec">Lo que necesitamos de ti</h2>
        <ol className="rs2-nec">
          <li>Que veas la web y nos digas qué te parece.</li>
          <li>Si te convence: que revises los textos y nos des los accesos (Google, ficha, anuncios).</li>
          <li>Tu tiempo: unas 3 o 4 horas en dos semanas y, después, unos 30 minutos a la semana.</li>
          <li>¿Te da respeto cambiar? Lo probamos antes con el 10 % de las visitas. Y si a los tres meses no te hemos demostrado que funciona mejor, dejas de pagar desde el cuarto.</li>
          <li>¿Te da respeto cambiar? Lo probamos antes: la web nueva solo para el 10 % de las visitas durante unas semanas, y decides con los números.</li>
        </ol>
        <p className="rs2-cierre">Nada de esto es grave y todo tiene arreglo. Todo queda a tu nombre, y tú puedes marcharte cuando quieras sin pedirnos nada.</p>
      </section>

      <nav className="rs2-nav" aria-label="Pie">
        <Link href="/guia-jesus">Volver a la guía completa</Link>
        <Link href="/">Ver la web nueva</Link>
      </nav>
    </main>
  );
}
