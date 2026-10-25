import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { esquemaMigas, meta } from '@/lib/seo';
import { SUPABASE_CRM_CLAVE, SUPABASE_CRM_URL } from '@/lib/crm';

export const metadata: Metadata = meta({
  titulo: 'Barómetro del acoso laboral y los despidos',
  descripcion: 'Qué resultados obtienen, de forma anónima, las personas que hacen nuestros tests de acoso, despido nulo y baja laboral. Datos orientativos y actualizados.',
  ruta: '/barometro',
});

export const revalidate = 3600;

type Resumen = { total: number; desde: string | null; herramientas: { herramienta: string; total: number; niveles: Record<string, number> | null; marcas: Record<string, number> | null }[] };

async function leer(): Promise<Resumen | null> {
  try {
    const r = await fetch(`${SUPABASE_CRM_URL}/rest/v1/rpc/barometro_resumen`, {
      method: 'POST',
      headers: { apikey: SUPABASE_CRM_CLAVE, Authorization: `Bearer ${SUPABASE_CRM_CLAVE}`, 'Content-Type': 'application/json' },
      body: '{}',
      next: { revalidate: 3600 },
    });
    return r.ok ? ((await r.json()) as Resumen) : null;
  } catch {
    return null;
  }
}

const NOMBRES: Record<string, string> = {
  'test-acoso': '¿Es acoso lo que me pasa?',
  'test-nulidad': '¿Mi despido puede ser nulo?',
  'test-extincion': '¿Puedo irme con indemnización?',
  'test-baja-laboral': '¿Mi baja es accidente de trabajo?',
};
const NIVELES: Record<string, string> = { alto: 'Resultado alto', medio: 'Resultado medio', bajo: 'Resultado bajo' };
const ETIQUETAS_ACOSO: Record<string, string> = {
  jefe: 'El acoso viene de un jefe o superior',
  companeros: 'Viene de compañeros de su mismo nivel',
  subordinados: 'Viene de personas a su cargo',
  varios: 'Viene de varias personas a la vez',
  baja: 'Está o ha estado de baja',
  salud: 'Duerme mal, tiene ansiedad o toma medicación',
  escrito: 'Tiene pruebas por escrito',
  palabra: 'Solo de palabra',
  nada: 'No tiene ninguna prueba',
  general: 'Es un mal ambiente que sufre toda la plantilla',
};
const UMBRAL = 30;

export default async function Barometro() {
  const r = await leer();
  const total = r?.total ?? 0;
  const publicables = (r?.herramientas ?? []).filter((h) => h.niveles);
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/barometro', texto: 'Barómetro' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor">
          <nav className="migas" aria-label="Estás en">
            <Link href="/">Inicio</Link> / Barómetro
          </nav>
          <h1>Barómetro del acoso laboral y los despidos</h1>
          <p className="entradilla">
            Lo que cuentan, sin nombre ni datos personales, las personas que hacen nuestros tests. Para que se vea lo que de verdad ocurre en los trabajos.
          </p>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor prosa" style={{ maxWidth: '72ch' }}>
          {publicables.length === 0 ? (
            <div className="recuadro">
              <p>
                <strong>Estamos empezando a recoger datos.</strong> Para no sacar conclusiones con pocos casos, publicamos los resultados de cada test cuando
                tiene al menos {UMBRAL} respuestas.{total > 0 ? ` Ahora mismo hay ${total} en total.` : ''} Cuando haya muestra suficiente, los verás aquí, actualizados cada hora.
              </p>
            </div>
          ) : (
            publicables.map((h) => {
              const niveles = h.niveles ?? {};
              return (
                <div key={h.herramienta} className="barometro-bloque">
                  <h2>{NOMBRES[h.herramienta] ?? h.herramienta}</h2>
                  <p className="campo-ayuda">{h.total} tests completados</p>
                  <ul className="barometro-barras">
                    {['alto', 'medio', 'bajo'].map((n) => {
                      const pct = Math.round(((niveles[n] ?? 0) / h.total) * 100);
                      return (
                        <li key={n}>
                          <span>{NIVELES[n]}</span>
                          <span className="barra"><i style={{ width: `${pct}%` }} /></span>
                          <b>{pct} %</b>
                        </li>
                      );
                    })}
                  </ul>
                  {h.herramienta === 'test-acoso' && h.marcas && (
                    <>
                      <h3>Qué cuentan quienes hacen el test de acoso</h3>
                      <ul className="barometro-barras">
                        {Object.entries(h.marcas)
                          .filter(([k]) => ETIQUETAS_ACOSO[k])
                          .sort((a, b) => b[1] - a[1])
                          .map(([k, c]) => (
                            <li key={k}>
                              <span>{ETIQUETAS_ACOSO[k]}</span>
                              <span className="barra"><i style={{ width: `${Math.round((c / h.total) * 100)}%` }} /></span>
                              <b>{Math.round((c / h.total) * 100)} %</b>
                            </li>
                          ))}
                      </ul>
                    </>
                  )}
                </div>
              );
            })
          )}
          <h2>Cómo se hace</h2>
          <ul>
            <li>Cuando alguien termina uno de nuestros tests, guardamos solo el tipo de resultado y unas etiquetas generales. <strong>Nunca</strong> su nombre, su IP, sus respuestas literales ni nada que permita reconocerla.</li>
            <li>Se puede desactivar antes de empezar el test con el botón "No guardarlo".</li>
            <li>Un test solo se publica cuando tiene al menos {UMBRAL} respuestas.</li>
          </ul>
          <p className="recuadro">
            <strong>Datos orientativos, no un estudio científico.</strong> Reflejan a quienes visitan esta web y hacen el test, no a toda la población trabajadora, y cualquier
            visitante puede hacerlo más de una vez. Sirven para ver tendencias, no para sacar porcentajes del conjunto de España.
          </p>
          <p>
            ¿Quieres hacer un test? <Link href="/herramientas/test-acoso">¿Es acoso lo que me pasa?</Link> Más información en nuestra <Link href="/privacidad">política de privacidad</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
