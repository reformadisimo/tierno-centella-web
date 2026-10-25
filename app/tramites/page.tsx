import type { Metadata } from 'next';
import Link from 'next/link';
import FotoCabeza from '@/components/FotoCabeza';
import JsonLd from '@/components/JsonLd';
import { esquemaMigas, meta } from '@/lib/seo';
import { TRAMITES } from '@/lib/tramites';
import Icono from '@/components/Iconos';

const VISUAL: Record<string, { icono: string; color: string; suave: string }> = {
  paro: { icono: 'euro', color: '#2c7a5b', suave: '#e6f4ee' },
  conciliacion: { icono: 'balanza', color: '#0d2c48', suave: '#e8f1f8' },
  'vida-laboral': { icono: 'documento', color: '#7a4fb3', suave: '#f1eafa' },
  inspeccion: { icono: 'escudo', color: '#c2477a', suave: '#fbe9ef' },
  incapacidad: { icono: 'corazon', color: '#b07a00', suave: '#fdf5e1' },
  fogasa: { icono: 'caja', color: '#d9694d', suave: '#fcebe4' },
  'certificado-digital': { icono: 'check', color: '#1b6fd1', suave: '#e7f0fc' },
};

export const metadata: Metadata = meta({
  titulo: 'Trámites que puedes hacer tú: paro, conciliación, vida laboral, Inspección',
  tituloSeo: 'Trámites laborales que puedes hacer tú',
  descripcion: 'Cómo pedir el paro, presentar la papeleta de conciliación, pedir tu vida laboral o denunciar ante la Inspección de Trabajo, paso a paso, sin abogado y sin coste.',
  ruta: '/tramites',
});

export default function Tramites() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/', texto: 'Inicio' }, { href: '/tramites', texto: 'Trámites que puedes hacer tú' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="Estás en">
              <Link href="/">Inicio</Link> / Trámites
            </nav>
            <h1>Trámites que puedes hacer tú</h1>
            <p className="entradilla">No todo exige un abogado. Aquí tienes, paso a paso, lo que puedes gestionar tú misma o tú mismo, aunque no pienses contratarnos. Si en algún punto te atascas, estamos aquí.</p>
            <nav aria-label="Trámites" className="glosario-letras">
              {TRAMITES.map((t) => (
                <a key={t.id} href={`#${t.id}`} style={{ padding: '0 12px', fontSize: '.9rem' }}>
                  {t.titulo.split(' (')[0]}
                </a>
              ))}
            </nav>
          </div>
          <FotoCabeza ruta="/tramites" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <aside className="recuadro">
            <p>
              <strong>Antes de empezar:</strong> si hay un plazo corriendo, <Link href="/herramientas/plazos">míralo primero</Link>. Y puedes preparar tus cartas en{' '}
              <Link href="/herramientas/genera-tu-carta">Genera tu carta</Link> y reunir tus pruebas con <Link href="/herramientas/que-guardar">la lista de lo que hay que guardar</Link>.
            </p>
          </aside>
          <ol className="tr-lista">
            {TRAMITES.map((t, i) => {
              const v = VISUAL[t.id] ?? { icono: 'documento', color: '#0d2c48', suave: '#e8f1f8' };
              return (
                <li key={t.id} id={t.id} className="tr-tarjeta" style={{ '--tr': v.color, '--tr-suave': v.suave } as React.CSSProperties}>
                  <div className="tr-cabeza">
                    <span className="tr-icono" aria-hidden="true"><Icono nombre={v.icono} tam={26} /></span>
                    <div>
                      <span className="tr-num">Trámite {i + 1} de {TRAMITES.length}</span>
                      <h2>{t.titulo}</h2>
                    </div>
                  </div>
                  <p className="tr-para">{t.para}</p>
                  <ul className="tr-chips" aria-label="Resumen">
                    <li><Icono nombre="documento" tam={15} /> {t.llevas.length} cosas que preparar</li>
                    <li><Icono nombre="flecha" tam={15} /> {t.pasos.length} pasos</li>
                  </ul>
                  <details className="tr-desplegable" open={i === 0}>
                    <summary><Icono nombre="caja" tam={18} /> Qué necesitas <span className="tr-mas" aria-hidden="true" /></summary>
                    <ul className="tr-check">{t.llevas.map((x) => <li key={x}>{x}</li>)}</ul>
                  </details>
                  <details className="tr-desplegable" open={i === 0}>
                    <summary><Icono nombre="mapa" tam={18} /> Los pasos, uno a uno <span className="tr-mas" aria-hidden="true" /></summary>
                    <ol className="tr-pasos">{t.pasos.map((x) => <li key={x}>{x}</li>)}</ol>
                  </details>
                  {t.consejo && (
                    <p className="tr-consejo"><span aria-hidden="true"><Icono nombre="sol" tam={18} /></span>{t.consejo}</p>
                  )}
                  <div className="tr-enlaces">
                    {t.enlaces.map((e) => (
                      <Link key={e.href} href={e.href}>{e.texto} <Icono nombre="flecha" tam={14} /></Link>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>
          <p>Los requisitos y los plazos pueden cambiar; confirma siempre en la web oficial. Hay más enlaces en <Link href="/recursos">recursos útiles</Link>.</p>
        </div>
      </section>
    </>
  );
}
