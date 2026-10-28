import type { Metadata } from 'next';
import Link from 'next/link';
import FotoCabeza from '@/components/FotoCabeza';
import { meta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { Etiqueta } from '@/components/Etiqueta';
import { ChipVivo } from '@/components/Vida';
import { GRUPOS_MODELOS } from '@/lib/modelos-lista';

const TITULO = 'Modelos de cartas laborales gratis';
const DESC = 'Cartas y escritos laborales listos para rellenar y descargar en Word: despido, salarios, baja, alta médica, incapacidad, sanciones y permisos. Sin dejar datos.';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESC, ruta: '/modelos' });

export default function Modelos() {
  const total = GRUPOS_MODELOS.reduce((n, g) => n + g.modelos.length, 0);
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/modelos', texto: 'Modelos de cartas' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <Etiqueta icono="libro" tono="oro">{`${total} modelos`}</Etiqueta>
            <h1>Modelos de cartas para defenderte</h1>
            <p className="entradilla">Elige el tuyo, rellénalo en un minuto y descárgalo en Word o imprímelo. Gratis y sin dejar tus datos: todo se escribe en tu móvil.</p>
          </div>
          <FotoCabeza ruta="/herramientas/genera-tu-carta" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          {GRUPOS_MODELOS.map((g, i) => (
            <div key={g.titulo} className="modelos-grupo">
              <h2 className="tv">
                <ChipVivo icono={g.icono} i={i} />
                <span className="tv-texto">{g.titulo}</span>
              </h2>
              <div className="rejilla-guias">
                {g.modelos.map((m) => (
                  <Link key={m.id} href={`/herramientas/genera-tu-carta?carta=${m.id}`}>
                    <strong>{m.nombre}</strong>
                    <span>{m.para}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <p className="recuadro" style={{ marginTop: 32 }}>
            Un modelo te ayuda a empezar, pero cada caso tiene sus plazos y sus detalles. Antes de enviar algo importante, como una queja por acoso o una
            disconformidad con el alta, conviene que lo revise un abogado: <Link href="/primera-consulta">así es la primera consulta</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
