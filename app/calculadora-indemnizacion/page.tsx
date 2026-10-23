import type { Metadata } from 'next';
import Calculadora from '@/components/Calculadora';

export const metadata: Metadata = {
  title: 'Calculadora de indemnización por despido',
  description: 'Calcula al momento tu indemnización por despido objetivo o improcedente y los días que te quedan para reclamar.',
};

export default async function PaginaCalculadora({ searchParams }: { searchParams: Promise<{ despido?: string }> }) {
  const { despido } = await searchParams;
  const despidoInicial = despido && /^\d{4}-\d{2}-\d{2}$/.test(despido) ? despido : '';
  return (
    <>
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
