import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/lib/seo';

export const metadata: Metadata = meta({
  titulo: 'Free employment law tools (Spain)',
  descripcion: 'Compensation calculator, harassment test, evidence map, deadlines, unemployment benefit and permanent disability checker. Free, no personal data. In Spanish for now.',
  ruta: '/en/tools',
});

const TOOLS = [
  { href: '/herramientas/test-acoso', titulo: 'Is it harassment?', texto: 'Seven questions to see whether what you are going through has the features of workplace harassment.' },
  { href: '/herramientas/mapa-de-pruebas', titulo: 'Harassment evidence map', texto: 'Tick what you have and find out what you are missing to prove it.' },
  { href: '/herramientas/test-nulidad', titulo: 'Could my dismissal be void?', texto: 'Pregnancy, leave, retaliation, illness: when the company must take you back.' },
  { href: '/herramientas/test-extincion', titulo: 'Can I leave with compensation?', texto: 'If the company does not pay, harasses you or leaves you without work, you can ask a judge to end your contract.' },
  { href: '/herramientas/test-baja-laboral', titulo: 'Is my sick leave a work accident?', texto: 'If your sick leave comes from work, you receive more and sooner. Check it.' },
  { href: '/calculadora-indemnizacion', titulo: 'Compensation calculator', texto: 'What you are owed for an objective or unfair dismissal, instantly.' },
  { href: '/herramientas/revisa-tu-carta-de-despido', titulo: 'Check your dismissal letter', texto: 'The formal defects that can make your dismissal unfair.' },
  { href: '/herramientas/plazos', titulo: 'Deadlines to claim', texto: 'The last day to challenge a dismissal, a sanction, a debt or a disability decision.' },
  { href: '/herramientas/calculadora-finiquito', titulo: 'Final settlement calculator', texto: 'Days of the last month, pending holidays and the share of extra payments.' },
  { href: '/herramientas/calculadora-paro', titulo: 'Unemployment benefit calculator', texto: 'How much you will receive and for how many months, with 2026 limits.' },
  { href: '/herramientas/calculadora-reduccion-jornada', titulo: 'Reduced hours calculator', texto: 'What you will earn if you reduce your hours to care, and which rights you keep.' },
  { href: '/herramientas/calendario-permisos', titulo: 'Birth leave calendar', texto: 'The dates of your 19 weeks, breastfeeding leave and job protection.' },
  { href: '/herramientas/comprobador-incapacidad', titulo: 'Permanent disability checker', texto: 'Which degree you might be entitled to, how much it pays and your deadline.' },
  { href: '/herramientas/autodiagnostico-acoso-empresas', titulo: 'Self-assessment for companies and schools', texto: 'Do you comply with harassment protocols, the whistleblowing channel and the equality plan?' },
];

export default function ToolsEn() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor cabeza-con-foto">
          <div>
          <nav className="migas" aria-label="You are here">
            <Link href="/en">Home</Link> / Tools
          </nav>
          <h1>Free tools</h1>
          <p className="entradilla">
            Fourteen calculators and tests, free and without leaving your details. They are in Spanish for now; if you have any doubt about a result, our assistant
            will explain it to you in English.
          </p>
          </div>
          <div>
            <img className="foto" src="/img/portatil-manos.webp" srcSet="/img/portatil-manos-640.webp 640w, /img/portatil-manos.webp 1200w" sizes="(max-width: 860px) 100vw, 50vw" alt="A person checks their papers next to a laptop" />
          </div>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor rejilla-guias">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} hrefLang="es">
              <strong>{t.titulo}</strong>
              <span>{t.texto}</span>
              <small className="en-es">In Spanish</small>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
