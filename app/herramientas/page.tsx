import EsquemaPagina from '@/components/EsquemaPagina';
import { Etiqueta } from '@/components/Etiqueta';
import type { Metadata } from 'next';
import { HERRAMIENTAS } from '@/lib/herramientas';
import FotoCabeza from '@/components/FotoCabeza';
import { meta } from '@/lib/seo';
import Link from 'next/link';
import { FOTOS_PAGINA } from '@/lib/fotos-paginas';
import IconoMenu, { tipoIcono } from '@/components/IconoMenu';

const ETIQUETA: Record<string, string> = { test: 'Test', calc: 'Calculadora', comprobador: 'Comprobador', carta: 'Revisión', plazo: 'Plazos', calendario: 'Calendario', mapa: 'Guía' };

export const metadata: Metadata = meta({
  titulo: 'Herramientas gratuitas',
  descripcion: 'Calculadora de indemnización, test de acoso, mapa de pruebas, revisión de la carta de despido, plazos e incapacidad. Gratis y sin datos personales.',
  ruta: '/herramientas',
});



export default function Herramientas() {
  return (
    <>
      <EsquemaPagina ruta="/herramientas" />
      <header className="cabeza-pagina cabeza-herramientas">
        <div className="contenedor cabeza-con-foto">
          <div>
            <Etiqueta icono="calculadora" tono="oro">Herramientas</Etiqueta>
            <h1>Herramientas gratuitas</h1>
            <p className="entradilla">Respuestas al momento, sin dejar tu teléfono. Cuando quieras, un abogado revisa el resultado contigo.</p>
          </div>
          <FotoCabeza ruta="/herramientas" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <div className="tarjetas-foto">
            {HERRAMIENTAS.map((h) => {
              const f = FOTOS_PAGINA[h.href];
              const tipo = tipoIcono(h.href, h.titulo);
              return (
                <Link key={h.href} href={h.href} className={`th-${tipo}`}>
                  <span className="th-chip"><IconoMenu tipo={tipo} tam={15} /> {ETIQUETA[tipo] ?? 'Herramienta'}</span>
                  {f && (
                    <img
                      src={`/img/${f.foto}-640.webp`}
                      srcSet={`/img/${f.foto}-640.webp 640w, /img/${f.foto}.webp 1200w`}
                      sizes="(max-width: 760px) 100vw, 380px"
                      alt={f.alt}
                      width={640}
                      height={480}
                      loading="lazy"
                    />
                  )}
                  <div>
                    <strong>{h.titulo}</strong>
                    <span>{h.texto}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
