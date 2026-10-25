import type { Metadata } from 'next';
import Link from 'next/link';
import FotoCabeza from '@/components/FotoCabeza';
import JsonLd from '@/components/JsonLd';
import Pictograma from '@/components/Pictograma';
import { BotonImprimir } from '@/components/Utiles';
import { GLOSARIO_FACIL } from '@/lib/glosario-facil';
import { esquemaMigas, meta } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: 'Glosario en lenguaje fácil con dibujos',
  descripcion: 'Las palabras del trabajo y del despido, explicadas con frases cortas y dibujos. Para entenderlo todo a la primera.',
  ruta: '/glosario/facil',
});

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/glosario', texto: 'Glosario' }, { href: '/glosario/facil', texto: 'En lenguaje fácil' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / <Link href="/glosario">Glosario</Link> / En lenguaje fácil
            </nav>
            <h1>Las palabras, con dibujos</h1>
            <p className="entradilla">Frases cortas y una idea cada vez. Si una palabra no está, mira el <Link href="/glosario">glosario completo</Link> o pregúntale al asistente.</p>
          </div>
          <FotoCabeza ruta="/glosario/facil" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <ul className="facil-lista">
            {GLOSARIO_FACIL.map((t) => (
              <li key={t.termino} className="facil-tarjeta">
                <div className="facil-pic"><Pictograma nombre={t.pic} /></div>
                <div>
                  <h2>{t.termino}</h2>
                  {t.texto.map((f) => (
                    <p key={f}>{f}</p>
                  ))}
                  {t.mas && <Link href={t.mas}>Saber más</Link>}
                </div>
              </li>
            ))}
          </ul>
          <div className="acciones"><BotonImprimir /></div>
          <p className="letra-pequena">Explicaciones generales para entender el vocabulario. No sustituyen el consejo de un abogado sobre tu caso.</p>
        </div>
      </section>
    </>
  );
}
