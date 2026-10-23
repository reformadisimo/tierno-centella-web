'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { medir } from '@/lib/medir';

// Formulario corto para las landings de anuncios: tres datos y un botón.
// Guarda de dónde viene la visita (campaña de Google Ads, palabra clave) y lo manda con la consulta,
// para que el despacho sepa qué anuncio le ha traído cada cliente.
const PARAMS = ['gclid', 'gbraid', 'wbraid', 'gad_campaignid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function leerOrigen(): string {
  try {
    const url = new URLSearchParams(location.search);
    const guardado = JSON.parse(sessionStorage.getItem('tc-origen') || '{}') as Record<string, string>;
    PARAMS.forEach((k) => {
      const v = url.get(k);
      if (v) guardado[k] = v.slice(0, 120);
    });
    sessionStorage.setItem('tc-origen', JSON.stringify(guardado));
    const partes: string[] = [];
    if (guardado.gclid || guardado.gbraid || guardado.wbraid || guardado.gad_campaignid) partes.push('Google Ads');
    if (guardado.gad_campaignid) partes.push(`campaña ${guardado.gad_campaignid}`);
    if (guardado.utm_source) partes.push(`fuente ${guardado.utm_source}`);
    if (guardado.utm_campaign) partes.push(`campaña ${guardado.utm_campaign}`);
    if (guardado.utm_term) partes.push(`búsqueda "${guardado.utm_term}"`);
    return partes.join(', ') || 'Directo u orgánico';
  } catch {
    return '';
  }
}

export default function FormularioLanding({
  id,
  landing,
  tema,
  opciones,
  whatsapp,
  titulo = 'Te llamamos nosotros',
}: {
  id: string;
  landing: string;
  tema: string;
  opciones: string[];
  whatsapp: string;
  titulo?: string;
}) {
  const [estado, setEstado] = useState<'listo' | 'enviando' | 'enviado' | 'error'>('listo');
  const [error, setError] = useState('');
  const [origen, setOrigen] = useState('');
  const [datos, setDatos] = useState({ nombre: '', telefono: '', situacion: '', acepto: false, web: '' });
  const cambiar = (k: keyof typeof datos, v: string | boolean) => setDatos((d) => ({ ...d, [k]: v }));

  useEffect(() => setOrigen(leerOrigen()), []);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!datos.situacion) {
      setError('Elige tu situación.');
      setEstado('error');
      return;
    }
    setEstado('enviando');
    setError('');
    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: datos.nombre,
          telefono: datos.telefono,
          tema: `${tema}: ${datos.situacion}`,
          cuando: 'Cuanto antes',
          mensaje: '',
          acepto: datos.acepto,
          web: datos.web,
          origen: `${origen} · página /consulta/${landing}`,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || 'No se pudo enviar.');
      setEstado('enviado');
      medir('formulario_enviado', { tema: landing, situacion: datos.situacion, landing: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar.');
      setEstado('error');
    }
  }

  if (estado === 'enviado')
    return (
      <div className="lf-caja lf-hecho" role="status">
        <h2>Recibido, {datos.nombre.split(' ')[0]}</h2>
        <p>Te llamamos en horario de despacho. Si tu plazo vence en días, llámanos tú ahora:</p>
        <a className="boton boton-marcador" href={DESPACHO.telefonoHref}>
          Llamar al {DESPACHO.telefono}
        </a>
      </div>
    );

  return (
    <form className="lf-caja" onSubmit={enviar} id={id}>
      <h2>{titulo}</h2>
      <p className="lf-ayuda">Tres datos y te llama un abogado. Sin compromiso de contratar.</p>
      <div className="campo">
        <label htmlFor={`${id}-sit`}>Tu situación</label>
        <select id={`${id}-sit`} required value={datos.situacion} onChange={(e) => cambiar('situacion', e.target.value)}>
          <option value="">Elige una opción</option>
          {opciones.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="campo">
        <label htmlFor={`${id}-nombre`}>Nombre</label>
        <input id={`${id}-nombre`} type="text" autoComplete="name" required value={datos.nombre} onChange={(e) => cambiar('nombre', e.target.value)} />
      </div>
      <div className="campo">
        <label htmlFor={`${id}-tel`}>Teléfono</label>
        <input
          id={`${id}-tel`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          pattern="[0-9 +()-]{9,}"
          value={datos.telefono}
          onChange={(e) => cambiar('telefono', e.target.value)}
        />
      </div>
      <input
        type="text"
        name="web"
        tabIndex={-1}
        autoComplete="off"
        value={datos.web}
        onChange={(e) => cambiar('web', e.target.value)}
        style={{ position: 'absolute', left: -9999 }}
        aria-hidden="true"
      />
      <label className="casilla lf-casilla">
        <input type="checkbox" required checked={datos.acepto} onChange={(e) => cambiar('acepto', e.target.checked)} />
        <span>
          Acepto la <Link href="/privacidad">política de privacidad</Link>.
        </span>
      </label>
      <button type="submit" className="boton boton-marcador lf-enviar" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando...' : 'Quiero que me llaméis'}
      </button>
      <p className="lf-o">
        o escríbenos por <a href={enlaceWhatsapp(whatsapp)}>WhatsApp</a>
      </p>
      {estado === 'error' && (
        <div className="recuadro" role="alert">
          <p style={{ margin: 0 }}>
            {error} {error !== 'Elige tu situación.' && 'Mientras tanto, escríbenos por WhatsApp: llega igual de rápido.'}
          </p>
          {error !== 'Elige tu situación.' && (
            <a className="boton" href={enlaceWhatsapp(`${whatsapp} Soy ${datos.nombre}. ${datos.situacion}.`)} style={{ marginTop: 10 }}>
              Enviar por WhatsApp
            </a>
          )}
        </div>
      )}
    </form>
  );
}
