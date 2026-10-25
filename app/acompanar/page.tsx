import type { Metadata } from 'next';
import Link from 'next/link';
import FotoCabeza from '@/components/FotoCabeza';
import JsonLd from '@/components/JsonLd';
import { DESPACHO } from '@/lib/despacho';
import { esquemaMigas, meta } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: 'Acompaño a alguien que está pasando por un despido, un acoso o una baja',
  tituloSeo: 'Cómo acompañar a quien sufre un despido o un acoso',
  descripcion: 'Si ayudas a un familiar, a tu pareja o a un amigo con un problema laboral: qué puedes hacer, qué conviene evitar y cómo acompañarle a una consulta.',
  ruta: '/acompanar',
});

const CLAVES = [
  { t: 'Escuchar antes que aconsejar', d: 'En las primeras horas, la persona necesita contarlo. Un "estoy contigo" ayuda más que cualquier solución rápida.' },
  { t: 'Vigilar el reloj', d: 'En un despido el plazo es de 20 días hábiles. Apúntalo en tu calendario y avísale cuando se acerque.', e: { href: '/herramientas/plazos', t: 'Calcular el plazo' } },
  { t: 'Ordenar los papeles', d: 'Contrato, nóminas, carta, correos y mensajes, sin borrar nada. Tú puedes ser quien los reúna.', e: { href: '/herramientas/que-guardar', t: 'Qué hay que guardar' } },
  { t: 'No firmar a la carrera', d: 'Si le piden firmar un finiquito o un acuerdo, mejor que lo vea antes un abogado.', e: { href: '/blog/finiquito-firmar-no-conforme', t: 'Firmar el finiquito' } },
  { t: 'Cuidar a la persona', d: 'Si notas que no está bien, ayuda animarle a ir al médico y a pedir ayuda. El 024 atiende las 24 horas.' },
  { t: 'Acompañar a la consulta', d: 'Puedes tomar notas y recordar preguntas. Ayuda mucho cuando hay nervios.', e: { href: '/primera-consulta', t: 'Cómo es la primera consulta' } },
];

export default function Acompanar() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/acompanar', texto: 'Acompaño a alguien' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Acompaño a alguien
            </nav>
            <h1>Acompaño a alguien que lo está pasando mal</h1>
            <p className="entradilla">Un despido, un acoso o una baja larga los vive la persona y también quien está a su lado. Aquí tienes cómo ayudar de verdad, con calma y sin necesidad de saber derecho.</p>
            <div className="acciones">
              <Link className="boton" href="/mi-caso">Buscar su situación</Link>
              <a className="boton boton-claro" href={DESPACHO.telefonoHref}>Llamar al {DESPACHO.telefono}</a>
            </div>
          </div>
          <FotoCabeza ruta="/acompanar" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <ul className="recursos-lista">
            {CLAVES.map((c) => (
              <li key={c.t} className="recurso-tarjeta">
                <h2 style={{ fontSize: '1.2rem' }}>{c.t}</h2>
                <p>{c.d}</p>
                {c.e && <p><Link href={c.e.href}>{c.e.t}</Link></p>}
              </li>
            ))}
          </ul>
          <aside className="recuadro">
            <p>
              Lo cuento con más detalle en <Link href="/blog/acompanas-a-alguien-que-ha-sido-despedido">este artículo</Link>. Y recuerda: cada caso es distinto, y solo un abogado que vea los documentos puede valorarlo.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
