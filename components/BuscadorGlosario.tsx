'use client';

// Buscador en vivo del glosario: oculta los términos que no coinciden y muestra cuántos quedan.
import { useState } from 'react';

const limpia = (t: string) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function BuscadorGlosario({ total }: { total: number }) {
  const [q, setQ] = useState('');
  const [n, setN] = useState(total);
  function filtra(valor: string) {
    setQ(valor);
    const b = limpia(valor.trim());
    let visibles = 0;
    document.querySelectorAll<HTMLElement>('[data-termino]').forEach((el) => {
      const ok = !b || limpia(el.dataset.termino ?? '').includes(b);
      el.hidden = !ok;
      if (ok) visibles++;
    });
    document.querySelectorAll<HTMLElement>('.glosario-letra').forEach((h) => {
      const letra = h.id.replace('letra-', '');
      const hay = Array.from(document.querySelectorAll<HTMLElement>('[data-termino]')).some((el) => !el.hidden && el.dataset.letra === letra);
      h.hidden = !hay;
    });
    document.querySelectorAll<HTMLElement>('.prosa-foto').forEach((f) => (f.hidden = !!b));
    setN(visibles);
  }
  return (
    <div className="glosario-buscador" role="search">
      <label htmlFor="busca-glosario">Busca una palabra</label>
      <input id="busca-glosario" type="search" value={q} placeholder="Por ejemplo: finiquito, preaviso, baja" onChange={(e) => filtra(e.target.value)} autoComplete="off" />
      <p aria-live="polite">
        {n === 0 ? 'No encontramos esa palabra. Pregúntanos y la añadimos.' : q ? `${n} ${n === 1 ? 'término' : 'términos'}` : `${total} términos explicados sin jerga`}
      </p>
    </div>
  );
}
