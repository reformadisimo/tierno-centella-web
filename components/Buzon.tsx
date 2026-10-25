'use client';

// Buzón de sugerencias: un rincón tranquilo, sin ventanas emergentes, para contarnos cómo ha ido o qué echas en falta.
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Buzon({ titulo = 'Cuéntanos qué tal ha ido' }: { titulo?: string }) {
  const ruta = usePathname() || '';
  const [texto, setTexto] = useState('');
  const [nota, setNota] = useState(0);
  const [contacto, setContacto] = useState('');
  const [trampa, setTrampa] = useState('');
  const [estado, setEstado] = useState<'' | 'enviando' | 'ok' | 'error'>('');

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (texto.trim().length < 3) return;
    setEstado('enviando');
    try {
      const r = await fetch('/api/sugerencia', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ texto, pagina: ruta, valoracion: nota, contacto, web: trampa }) });
      const j = await r.json().catch(() => ({}));
      setEstado(j.ok ? 'ok' : 'error');
    } catch {
      setEstado('error');
    }
  }

  if (estado === 'ok')
    return (
      <div className="buzon buzon-ok" role="status">
        <h2>Gracias, de verdad</h2>
        <p>Lo leemos todos. Si has dejado una forma de contacto, te contestaremos nosotros.</p>
      </div>
    );

  return (
    <form className="buzon" onSubmit={enviar}>
      <h2>{titulo}</h2>
      <p className="campo-ayuda">¿Qué te ha servido? ¿Qué has echado en falta? Escribe lo que quieras, con tus palabras. No hace falta que dejes tu nombre.</p>
      <div className="buzon-notas" role="group" aria-label="Valoración, de 1 a 5 (opcional)">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" aria-pressed={nota === n} className={nota === n ? 'activa' : ''} onClick={() => setNota(nota === n ? 0 : n)}>
            {n}
            <span className="sr-only"> de 5</span>
          </button>
        ))}
      </div>
      <label className="sr-only" htmlFor="buzon-texto">Tu mensaje</label>
      <textarea id="buzon-texto" rows={4} maxLength={2000} value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Tu opinión, tu experiencia o una idea" />
      <label className="sr-only" htmlFor="buzon-contacto">Teléfono o correo (opcional)</label>
      <input id="buzon-contacto" type="text" maxLength={200} value={contacto} onChange={(e) => setContacto(e.target.value)} placeholder="Teléfono o correo, solo si quieres que te contestemos" autoComplete="off" />
      <input type="text" name="web" value={trampa} onChange={(e) => setTrampa(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
      <div className="acciones">
        <button className="boton" type="submit" disabled={estado === 'enviando' || texto.trim().length < 3}>
          {estado === 'enviando' ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
      {estado === 'error' && <p className="campo-ayuda" role="alert">No hemos podido enviarlo ahora mismo. Puedes escribirnos por WhatsApp o llamarnos.</p>}
      <p className="letra-pequena">Si no dejas contacto, es anónimo: no guardamos tu IP ni usamos cookies. Cómo lo tratamos, en la <a href="/privacidad">política de privacidad</a>.</p>
    </form>
  );
}
