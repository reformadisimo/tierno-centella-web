import type { Metadata } from 'next';
import Link from 'next/link';
import FotoCabeza from '@/components/FotoCabeza';
import JsonLd from '@/components/JsonLd';
import { esquemaMigas, meta } from '@/lib/seo';
import { TRAMITES_EN as TRAMITES } from '@/lib/tramites-en';
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
  titulo: 'Procedures you can do yourself: unemployment benefit, conciliation, employment history, Labour Inspectorate',
  tituloSeo: 'Employment procedures you can do yourself',
  descripcion: 'How to claim unemployment benefit, file the conciliation paper, get your employment history report or report to the Labour Inspectorate in Spain, step by step and without a lawyer.',
  ruta: '/en/procedures',
});

export default function ProceduresEn() {
  return (
    <>
      <JsonLd datos={esquemaMigas([{ href: '/en', texto: 'Home' }, { href: '/en/procedures', texto: 'Procedures you can do yourself' }])} />
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
            <nav className="migas" aria-label="You are here">
              <Link href="/en">Home</Link> / Procedures
            </nav>
            <h1>Procedures you can do yourself</h1>
            <p className="entradilla">Not everything needs a lawyer. Here, step by step, is what you can handle on your own, even if you are not planning to hire us. If you get stuck at any point, we are here.</p>
            <nav aria-label="Procedures" className="glosario-letras">
              {TRAMITES.map((t) => (
                <a key={t.id} href={`#${t.id}`} style={{ padding: '0 12px', fontSize: '.9rem' }}>
                  {t.titulo.split(' (')[0]}
                </a>
              ))}
            </nav>
          </div>
          <FotoCabeza ruta="/en/procedures" />
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor">
          <aside className="recuadro">
            <p>
              <strong>Before you start:</strong> if a deadline is running, <Link href="/en/tools/deadlines">check it first</Link>. And if you are unsure about anything, our{' '}
              <Link href="/en/tools">free tools</Link> can help you get your bearings.
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
                      <span className="tr-num">Procedure {i + 1} of {TRAMITES.length}</span>
                      <h2>{t.titulo}</h2>
                    </div>
                  </div>
                  <p className="tr-para">{t.para}</p>
                  <ul className="tr-chips" aria-label="Summary">
                    <li><Icono nombre="documento" tam={15} /> {t.llevas.length} things to prepare</li>
                    <li><Icono nombre="flecha" tam={15} /> {t.pasos.length} steps</li>
                  </ul>
                  <details className="tr-desplegable" open={i === 0}>
                    <summary><Icono nombre="caja" tam={18} /> What you need <span className="tr-mas" aria-hidden="true" /></summary>
                    <ul className="tr-check">{t.llevas.map((x) => <li key={x}>{x}</li>)}</ul>
                  </details>
                  <details className="tr-desplegable" open={i === 0}>
                    <summary><Icono nombre="mapa" tam={18} /> The steps, one by one <span className="tr-mas" aria-hidden="true" /></summary>
                    <ol className="tr-pasos">{t.pasos.map((x) => <li key={x}>{x}</li>)}</ol>
                  </details>
                  {t.consejo && (
                    <p className="tr-consejo"><span aria-hidden="true"><Icono nombre="sol" tam={18} /></span>{t.consejo}</p>
                  )}
                  {t.enlaces.length > 0 && (
                    <div className="tr-enlaces">
                      {t.enlaces.map((e) => (
                        <Link key={e.href} href={e.href}>{e.texto} <Icono nombre="flecha" tam={14} /></Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          <p>Requirements and deadlines can change; always confirm on the official website. If you would rather we handled it, <Link href="/en/contact">tell us about your case</Link>.</p>
        </div>
      </section>
    </>
  );
}
