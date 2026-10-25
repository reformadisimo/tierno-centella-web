'use client';

// ¿Es buena la oferta de la empresa? Compara lo que ofrece con la indemnización legal de un despido improcedente.
import { useState } from 'react';
import { calcularIndemnizacion, leerImporte } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp, euros } from '@/lib/despacho';
import { BotonImprimir, avisoSalarioAnual } from './Utiles';

export default function OfertaAcuerdo() {
  const hoy = hoyMadrid();
  const [inicio, setInicio] = useState('');
  const [despido, setDespido] = useState('');
  const [salario, setSalario] = useState('');
  const [oferta, setOferta] = useState('');
  const sal = leerImporte(salario);
  const of = leerImporte(oferta);
  const listo = inicio && despido && despido > inicio && despido <= hoy && sal > 0 && of >= 0 && oferta.trim() !== '';
  const r = listo ? calcularIndemnizacion(inicio, despido, sal) : null;
  const legal = r?.importeImprocedente ?? 0;
  const dif = r ? of - legal : 0;
  const pct = r && legal > 0 ? Math.round((of / legal) * 100) : 0;
  const aviso = avisoSalarioAnual(sal);
  return (
    <div className="herramienta">
      <div className="campo">
        <label htmlFor="of-inicio">Cuándo empezaste en la empresa</label>
        <input id="of-inicio" type="date" value={inicio} max={hoy} onChange={(e) => setInicio(e.target.value)} />
      </div>
      <div className="campo">
        <label htmlFor="of-despido">Fecha del despido</label>
        <input id="of-despido" type="date" value={despido} max={hoy} onChange={(e) => setDespido(e.target.value)} />
      </div>
      <div className="campo">
        <label htmlFor="of-salario">Salario bruto anual, con pagas extra (€)</label>
        <input id="of-salario" inputMode="decimal" value={salario} onChange={(e) => setSalario(e.target.value)} placeholder="Por ejemplo, 28000" />
        {aviso && <p className="campo-ayuda">{aviso}</p>}
      </div>
      <div className="campo">
        <label htmlFor="of-oferta">Lo que te ofrece la empresa (€)</label>
        <input id="of-oferta" inputMode="decimal" value={oferta} onChange={(e) => setOferta(e.target.value)} placeholder="Por ejemplo, 9000" />
      </div>
      {r && (
        <section aria-live="polite" className={`veredicto ${dif >= 0 ? '' : 'veredicto-alto'}`}>
          <h3>
            {dif >= 0
              ? 'La oferta alcanza o supera la indemnización legal de un despido improcedente'
              : `La oferta es un ${pct} % de la indemnización legal de un despido improcedente`}
          </h3>
          <p style={{ margin: 0 }}>
            Indemnización orientativa si el despido se declara improcedente: <strong>{euros(legal)}</strong>. Te ofrecen <strong>{euros(of)}</strong>
            {dif < 0 ? <>, es decir, <strong>{euros(-dif)}</strong> menos.</> : <>, <strong>{euros(dif)}</strong> más.</>}
          </p>
        </section>
      )}
      {r && (
        <div className="recuadro">
          <p>
            <strong>Antes de firmar nada, ten en cuenta:</strong>
          </p>
          <ul>
            <li>Esta cifra es la de un despido <strong>improcedente</strong>. Si el despido fuera procedente, no habría indemnización; si fuera nulo, la solución sería readmitirte con los salarios. Por eso comparar con la cifra legal es una referencia, no una sentencia.</li>
            <li>Un acuerdo firmado normalmente <strong>no se puede deshacer</strong>. Si lo firmas, cierras la reclamación.</li>
            <li>Revisa también el finiquito, las vacaciones pendientes y si te ofrecen algo en negro o por encima de lo que figura en el papel.</li>
            <li>Tu plazo para reclamar sigue corriendo mientras negocias: son <strong>20 días hábiles</strong> desde el despido.</li>
          </ul>
        </div>
      )}
      <div className="acciones">
        {r && (
          <a className="boton" href={enlaceWhatsapp(`Hola, me han ofrecido ${euros(of)} por mi despido y la indemnización orientativa sale ${euros(legal)}. ¿Podéis revisar si me conviene?`)}>
            Que lo revise un abogado
          </a>
        )}
        <a className="boton boton-claro" href={DESPACHO.telefonoHref}>Llamar al {DESPACHO.telefono}</a>
        {r && <BotonImprimir />}
      </div>
      <p className="letra-pequena">Cálculo orientativo con las reglas generales (33 días por año, máximo 24 mensualidades; tramo anterior a 2012 a 45 días). No sustituye la valoración de un abogado.</p>
    </div>
  );
}
