import type { Metadata } from 'next';
import { meta, esquemaHerramienta, esquemaMigas } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Calculadora from '@/components/Calculadora';

export const metadata: Metadata = meta({
  titulo: 'Calculadora de indemnización por despido',
  descripcion: 'Calcula al momento tu indemnización por despido objetivo o improcedente y los días que te quedan para reclamar.',
  ruta: '/calculadora-indemnizacion',
});

export default async function PaginaCalculadora({ searchParams }: { searchParams: Promise<{ despido?: string }> }) {
  const { despido } = await searchParams;
  const despidoInicial = despido && /^\d{4}-\d{2}-\d{2}$/.test(despido) ? despido : '';
  return (
    <>
      <JsonLd datos={esquemaHerramienta('Calculadora de indemnización por despido', 'Calcula al momento tu indemnización por despido objetivo o improcedente y los días que te quedan para reclamar.', '/calculadora-indemnizacion')} />
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/herramientas', texto: 'Herramientas' }, { href: '/calculadora-indemnizacion', texto: 'Calculadora de indemnización por despido' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor">
          <h1>Calcula tu indemnización por despido</h1>
          <p className="entradilla">
            Con tres datos de tu nómina sabrás cuánto te corresponde y cuántos días te quedan para reclamar. Sin dejar tu
            teléfono.
          </p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <Calculadora despidoInicial={despidoInicial} />
        </div>
      </section>
    </>
  );
}
