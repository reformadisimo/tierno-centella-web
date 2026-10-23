import type { Metadata } from 'next';
import Link from 'next/link';
import { meta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Llamada from '@/components/Llamada';
import { leerColeccion } from '@/lib/contenido';
import { fotoDePieza } from '@/components/PaginaGuia';

export const metadata: Metadata = meta({
  titulo: 'Abogadas y abogados para trabajadoras: embarazo, conciliación y acoso sexual',
  descripcion:
    'Despido durante el embarazo o la lactancia, reducción y adaptación de jornada, permisos por nacimiento, acoso sexual y brecha salarial. Tus derechos, explicados con claridad.',
  ruta: '/mujer-y-trabajo',
  imagen: '/img/abogada-sonrie.webp',
});

export default function MujerYTrabajo() {
  const guias = leerColeccion('mujer');
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/mujer-y-trabajo', texto: 'Mujer y trabajo' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Mujer y trabajo
            </nav>
            <span className="etiqueta-calida">Mujer y trabajo</span>
            <h1>Embarazo, conciliación, acoso sexual: tus derechos no se negocian.</h1>
            <p className="entradilla">
              Muchas de las consultas que llegan al despacho tienen que ver con ser madre, con cuidar o con un trato distinto por ser mujer. Aquí tienes
              lo que dice la ley, explicado sin rodeos, y un equipo de abogadas y abogados que lo defiende cada día.
            </p>
            <div className="acciones">
              <Link className="boton boton-marcador" href="/herramientas/calendario-permisos">
                Calcular mis permisos por nacimiento
              </Link>
              <Link className="boton boton-claro" href="/herramientas/test-nulidad">
                ¿Mi despido puede ser nulo?
              </Link>
            </div>
          </div>
          <img className="foto" src="/img/abogada-sonrie.webp" alt="Una abogada del despacho sonríe durante una reunión" fetchPriority="high" />
        </div>
      </header>

      <section className="seccion">
        <div className="contenedor">
          <h2>Las guías</h2>
          <div className="tarjetas-foto">
            {guias.map((g) => {
              const f = fotoDePieza(g);
              return (
                <Link key={g.slug} href={`/mujer-y-trabajo/${g.slug}`}>
                  <img src={f.src} alt={f.alt} loading="lazy" />
                  <div>
                    <strong>{g.titulo}</strong>
                    <span>{g.descripcion}</span>
                  </div>
                </Link>
              );
            })}
            <Link href="/acoso-laboral">
              <img src="/img/biblioteca.webp" alt="Reunión en la biblioteca del despacho" loading="lazy" />
              <div>
                <strong>Acoso laboral</strong>
                <span>Nuestra especialidad desde hace más de 25 años: cómo saber si lo sufres, cómo demostrarlo y qué reclamar.</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="seccion seccion-arena">
        <div className="contenedor bloque-foto">
          <img src="/img/equipo.webp" alt="Jesús Tierno con el equipo del despacho" loading="lazy" />
          <div>
            <h2>Cinco cosas que conviene saber hoy</h2>
            <ol className="prosa">
              <li>
                Si te despiden embarazada, el despido es nulo salvo causa real y ajena, <strong>aunque la empresa no supiera</strong> que lo estabas.
              </li>
              <li>La protección sigue durante los 12 meses siguientes al nacimiento, cuando vuelves al trabajo.</li>
              <li>La reducción de jornada para cuidar a un hijo menor de 12 años es un derecho: la empresa no puede negártela.</li>
              <li>Si te niegan una adaptación de jornada o el horario de tu reducción, tienes 20 días hábiles para demandar.</li>
              <li>El acoso sexual no necesita repetirse durante meses: una conducta grave puede bastar, y tu empresa está obligada a actuar.</li>
            </ol>
          </div>
        </div>
      </section>
      <Llamada asunto="tus derechos como trabajadora" />
    </>
  );
}
