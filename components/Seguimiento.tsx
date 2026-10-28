'use client';

// Caja opcional al final de cada guía: todo se lee y se descarga sin dejar datos; quien quiera, deja su correo
// para que le acompañemos en su tema (plazos, cambios de la ley, qué hacer después).
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const TEXTOS: Record<string, { t: string; d: string }> = {
  incapacidad: { t: '¿Te acompañamos en tu incapacidad?', d: 'Te escribimos cuando cambie algo que te afecte y te recordamos los plazos importantes: tribunal médico, reclamación previa, revisión.' },
  baja: { t: '¿Te acompañamos durante tu baja?', d: 'Te avisamos de lo que conviene revisar en cada momento: altas, cambios de contingencia y qué hacer si te despiden.' },
  despido: { t: '¿Te acompañamos con tu despido?', d: 'Te recordamos los plazos, que son muy cortos, y lo que conviene hacer en cada paso.' },
  acoso: { t: '¿Te acompañamos?', d: 'Te escribimos con lo que conviene hacer en cada fase: pruebas, protocolo, baja y plazos. Con discreción.' },
  mujer: { t: '¿Te acompañamos?', d: 'Te avisamos de tus fechas de permisos y de los cambios de la ley que te afecten.' },
  sanciones: { t: '¿Te acompañamos con tu sanción?', d: 'Te recordamos el plazo para impugnarla y lo que conviene guardar por si hay un despido después.' },
  cantidad: { t: '¿Te acompañamos con lo que te deben?', d: 'Te recordamos el plazo de cada mes y los pasos: reclamación, conciliación y FOGASA.' },
  general: { t: '¿Te acompañamos?', d: 'Te escribimos solo con lo que te sirva en tu caso.' },
};

export default function Seguimiento({ tema = 'general' }: { tema?: string }) {
  const ruta = usePathname();
  const [email, setEmail] = useState('');
  const [acepto, setAcepto] = useState(false);
  const [web, setWeb] = useState('');
  const [estado, setEstado] = useState<'' | 'ok' | 'enviando'>('');
  const [error, setError] = useState('');
  const x = TEXTOS[tema] ?? TEXTOS.general;
  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setEstado('enviando');
    try {
      const r = await fetch('/api/seguimiento', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, tema, pagina: ruta, consentimiento: acepto, web }) });
      const j = await r.json().catch(() => ({}));
      if (j.ok) setEstado('ok');
      else { setEstado(''); setError(j.error || 'No hemos podido guardarlo. Prueba más tarde.'); }
    } catch {
      setEstado('');
      setError('No hemos podido guardarlo. Prueba más tarde.');
    }
  }
  return (
    <aside className="seguimiento no-imprimir" aria-label="Seguimiento por correo">
      <p className="seg-gratis">Todo lo de esta web se lee y se descarga gratis, sin dejar tus datos.</p>
      <p className="seg-titulo">{x.t}</p>
      {estado === 'ok' ? (
        <p className="seg-ok" role="status">Hecho. Solo te escribiremos sobre esto, y podrás darte de baja con un clic en cualquier correo.</p>
      ) : (
        <form onSubmit={enviar} className="seg-form">
          <p className="seg-texto">{x.d} Si quieres, déjanos tu correo. Es opcional.</p>
          <div className="seg-fila">
            <label className="sr-only" htmlFor="seg-email">Tu correo</label>
            <input id="seg-email" type="email" required placeholder="tu@correo.es" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" tabIndex={-1} autoComplete="off" value={web} onChange={(e) => setWeb(e.target.value)} className="seg-trampa" aria-hidden="true" />
            <button type="submit" className="boton" disabled={estado === 'enviando'}>{estado === 'enviando' ? 'Un momento…' : 'Acompañadme'}</button>
          </div>
          <label className="seg-acepto">
            <input type="checkbox" checked={acepto} onChange={(e) => setAcepto(e.target.checked)} /> Acepto que el despacho me escriba sobre este tema. He leído la <a href="/privacidad">política de privacidad</a>.
          </label>
          {error && <p className="error" role="alert">{error}</p>}
        </form>
      )}
    </aside>
  );
}
