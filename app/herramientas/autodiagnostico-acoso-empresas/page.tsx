import type { Metadata } from 'next';
import FotoCabeza from '@/components/FotoCabeza';
import Link from 'next/link';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import AutodiagnosticoEmpresa from '@/components/AutodiagnosticoEmpresa';

const TITULO = 'Autodiagnóstico de protocolos de acoso para empresas y colegios';
const DESCRIPCION = 'Comprueba en dos minutos si vuestra empresa, colegio u organismo cumple las obligaciones legales frente al acoso: protocolos, canal de denuncias, plan de igualdad y riesgos psicosociales.';
const RUTA = '/herramientas/autodiagnostico-acoso-empresas';

export const metadata: Metadata = meta({ titulo: TITULO, descripcion: DESCRIPCION, ruta: RUTA, imagen: '/img/empresas-firma.webp' });

export default function Pagina() {
  return (
    <>
      <JsonLd datos={esquemaHerramienta(TITULO, DESCRIPCION, RUTA)} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: RUTA, texto: TITULO }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / <Link href="/herramientas">Herramientas</Link>
            </nav>
            <h1>¿Cumple vuestra organización con lo que exige la ley frente al acoso?</h1>
            <p className="entradilla">{DESCRIPCION}</p>
          </div>
          <FotoCabeza ruta="/herramientas/autodiagnostico-acoso-empresas" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <AutodiagnosticoEmpresa />
        </div>
      </section>
    </>
  );
}
