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
const ESTADO: Estado[] = ['hecho', 'hecho', 'marcha', 'hecho', 'marcha', 'tu', 'tu', 'tu', 'hecho', 'tu', 'hecho', 'preparado', 'preparado', 'preparado', 'tu', 'marcha', 'tu'];

const RECORRIDO = [
  {
    n: '1', ancla: '4 bis',
    t: 'Te buscan',
    hoy: '239 visitas al mes desde Google, un 38 % menos que en julio. En las IA, 14 sobre 100.',
    luego: '47 guías nuevas, tres artículos a la semana y textos que las IA pueden citar.',
  },
  {
    n: '2', ancla: '12',
    t: 'Entran en tu web',
    hoy: 'Tarda 18,3 s en el móvil. Dice "consulta gratuita" y la cita cuesta 150 € más IVA.',
    luego: '3,2 s en el móvil, precio claro antes de reservar y reserva en cuatro pasos, sin carrito.',
  },
  {
    n: '3', ancla: '5',
    t: 'Confían en ti',
    hoy: '59 reseñas y 11 de una estrella, ninguna respondida. Redes que parecen de 2017.',
    luego: 'Todas las reseñas respondidas (tú apruebas), reseñas nuevas de clientes contentos y redes al día.',
  },
  {
    n: '4', ancla: '17',
    t: 'Te llaman, y lo sabes',
    hoy: 'Nadie les vuelve a escribir si no contratan, y no se sabe de dónde viene cada cliente.',
    luego: 'Siete correos según su caso y cada llamada, WhatsApp y formulario con su origen.',
  },
];

type Clave = { t: string; d: string; icono: string; color: string; ancla?: string; href?: string; boton?: string; extra?: { href: string; texto: string } };
const CLAVES: Clave[] = [
  { t: 'Cómo estás hoy y cómo vas a estar', d: 'Diecisiete puntos que hoy te hacen perder clientes, y cómo quedan con nosotros. Cada uno en dos líneas.', icono: 'M3 12h4l3-9 4 18 3-9h4', color: '#d9694d', href: '#rs2-14', boton: 'Ver los 17 puntos' },
  { t: 'Tu web nueva ya está hecha', d: 'Rápida, clara en el móvil, con chat, tests y calculadoras. Es tuya y verla no te compromete a nada.', icono: 'M3 5h18v12H3zM8 21h8M12 17v4', color: '#1b6fd1', href: '/', boton: 'Ver la web', extra: { href: 'guia:8', texto: 'Qué tiene' } },
  { t: 'Lo ves todo tú, en directo', d: 'Un panel de control que se actualiza cada día: consultas, campañas, Google, redes y gasto. Comparas días, semanas y meses cuando quieras.', icono: 'M3 3v18h18M7 15l4-4 4 3 5-6', color: '#7a4fb3', ancla: '19', extra: { href: '/mesa-tc-6v9k3p', texto: 'Ver tu mesa de control' } },
  { t: 'No vamos a ciegas: vemos qué hace la gente', d: 'La lupa pinta encima de tu web dónde toca la gente, lo que toca y no funciona y hasta dónde baja. Con eso mejoramos la web cada mes. Y nos puedes dejar notas en el sitio exacto.', icono: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', color: '#c2477a', ancla: '19 ter', extra: { href: '/guia-jesus/mapa-calor', texto: 'Abrir la lupa' } },
  { t: 'Ninguna consulta se pierde', d: 'Una agenda de clientes con memoria, ya hecha e incluida en tu cuota. Cada consulta de la web, el chat, WhatsApp o el formulario entra sola, con su tema y de dónde vino. Y te cuenta los plazos de un despido.', icono: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8', color: '#2c7a5b', ancla: '25 bis', extra: { href: '/guia-jesus/crm', texto: 'Ver el CRM' } },
  { t: '¿Miedo al cambio? Lo probamos antes', d: 'La web nueva solo para el 10 % de las visitas durante unas semanas, y decides con tus números. Y si a los tres meses no te hemos demostrado que funciona mejor, dejas de pagar desde el cuarto.', icono: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4', color: '#b07a00', ancla: '21 bis' },
  { t: 'Todo a tu nombre, una sola cuota', d: 'La web, el dominio, Google, los anuncios y las redes, a tu nombre: nosotros entramos como invitados. Y una cuota fija con todo incluido, sin comisión sobre tus anuncios.', icono: 'M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.8 7.8 5.5 5.5 0 0 1 7.8-7.8zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4', color: '#0f7c8c', ancla: '25 bis', extra: { href: 'guia:8 bis', texto: 'Todo a tu nombre' } },
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

      <section aria-labelledby="rs2-clave">
        <h2 id="rs2-clave">Lo más importante, en siete cosas</h2>
        <div className="rs2-claves">
          {CLAVES.map((c) => {
            const href = c.href ?? (claves[c.ancla!] ? `/guia-jesus#${claves[c.ancla!]}` : '/guia-jesus');
            return (
              <article key={c.t} className="rs2-clave" style={{ ['--rc' as string]: c.color }}>
                <span className="rs2-clave-icono" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={c.icono} /></svg></span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <div className="rs2-clave-links">
                  <Link className="rs2-ver" href={href}>{c.boton ?? 'Ampliar en la guía'} &rarr;</Link>
                  {c.extra && <Link className="rs2-ver rs2-ver-2" href={c.extra.href.startsWith('guia:') ? `/guia-jesus#${claves[c.extra.href.slice(5)] ?? ''}` : c.extra.href}>{c.extra.texto} &rarr;</Link>}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="rs2-reco">
        <h2 id="rs2-reco">El camino de una clienta, y dónde se pierde hoy</h2>
        <div className="rs2-reco">
          {RECORRIDO.map((r) => (
            <article key={r.n} className="rs2-etapa">
              <span className="rs2-num">{r.n}</span>
              <h3>{r.t}</h3>
              <p className="rs2-hoy"><b>Hoy</b> {r.hoy}</p>
              <p className="rs2-luego"><b>Con nosotros</b> {r.luego}</p>
              {claves[r.ancla] && <Link className="rs2-ver" href={`/guia-jesus#${claves[r.ancla]}`}>Ampliar en la guía &rarr;</Link>}
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="rs2-14">
        <h2 id="rs2-14">Los {DOLORES.length} puntos, uno por uno</h2>
        <p className="rs2-intro">Cada punto en dos líneas: cómo está hoy y cómo queda con nosotros. Pulsa &quot;Ampliar en la guía&quot; si quieres el detalle.</p>
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
                {id && <Link className="rs2-ver" href={`/guia-jesus#${id}`}>Ampliar en la guía &rarr;</Link>}
              </article>
            );
          })}
        </div>
      </section>

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
          <li>Y dos números, nada de facturación ni cuentas: cuántos contactos acaban siendo clientes y lo que os deja de media un asunto.</li>
          <li>Tu tiempo: unas 3 o 4 horas en dos semanas y, después, unos 30 minutos a la semana.</li>
          <li>¿Te da respeto cambiar? Lo probamos antes con el 10 % de las visitas. Y si a los tres meses no te hemos demostrado que funciona mejor, dejas de pagar desde el cuarto.</li>
        </ol>
        <p className="rs2-cierre">Nada de esto es grave y todo tiene arreglo. Todo queda a tu nombre, y tú puedes marcharte cuando quieras sin pedirnos nada. Y lo ves todo tú, en tu panel de control: se actualiza cada día y puedes comparar días, semanas y meses.</p>
      </section>

      <section aria-labelledby="rs2-todo">
        <h2 id="rs2-todo">Ir a cualquier apartado de la guía</h2>
        <ul className="rs2-indice">
          {indiceGuia().filter((a) => a.clave !== 'inicio').map((a) => (
            <li key={a.id}><Link href={`/guia-jesus#${a.id}`}>{a.titulo}</Link></li>
          ))}
        </ul>
      </section>

      <nav className="rs2-nav" aria-label="Pie">
        <Link href="/guia-jesus">Volver a la guía completa</Link>
        <Link href="/">Ver la web nueva</Link>
      </nav>
    </main>
  );
}
