'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { medir } from '@/lib/medir';

const TEMAS = ['I have been dismissed', 'Workplace harassment', 'Permanent disability or sick leave', 'Pregnancy or work-life balance', 'Unpaid wages', 'I am a company', 'Other'];

export default function FormularioContactoEn() {
  const [datos, setDatos] = useState({ tema: '', nombre: '', telefono: '', email: '', mensaje: '', acepto: false, web: '' });
  const [estado, setEstado] = useState<'listo' | 'enviando' | 'enviado' | 'error'>('listo');
  const [aviso, setAviso] = useState('');
  const cambia = (k: keyof typeof datos) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setDatos({ ...datos, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value });

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!datos.nombre.trim() || (!datos.telefono.trim() && !datos.email.trim()) || !datos.acepto) {
      setAviso('Please write your name, a phone number or email, and accept the privacy policy.');
      return;
    }
    setEstado('enviando');
    setAviso('');
    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...datos, tema: `${datos.tema || 'Other'} (in English)`, origen: 'English website, /en/contact' }),
      });
      if (!r.ok) throw new Error();
      setEstado('enviado');
      medir('formulario_enviado', { tema: datos.tema || 'other', idioma: 'en' });
    } catch {
      setEstado('error');
    }
  }

  if (estado === 'enviado')
    return (
      <div className="recuadro" role="status">
        <h2>Thank you, {datos.nombre.split(' ')[0]}</h2>
        <p>We have received your message. A lawyer from the firm will contact you as soon as possible, in English.</p>
      </div>
    );

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <h2>We call you back</h2>
      <p className="letra-pequena">Four details and we call you. If a deadline is running, tell us and we look at it first.</p>
      <div className="campo">
        <label htmlFor="en-tema">What is it about?</label>
        <select id="en-tema" value={datos.tema} onChange={cambia('tema')}>
          <option value="">Choose an option</option>
          {TEMAS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="campo">
        <label htmlFor="en-nombre">Name</label>
        <input type="text" id="en-nombre" autoComplete="name" value={datos.nombre} onChange={cambia('nombre')} />
      </div>
      <div className="campo">
        <label htmlFor="en-tel">Phone</label>
        <input id="en-tel" type="tel" autoComplete="tel" value={datos.telefono} onChange={cambia('telefono')} />
      </div>
      <div className="campo">
        <label htmlFor="en-email">
          Email <span className="opcional">(optional)</span>
        </label>
        <input id="en-email" type="email" autoComplete="email" value={datos.email} onChange={cambia('email')} />
      </div>
      <div className="campo">
        <label htmlFor="en-msg">
          Your case in two lines <span className="opcional">(optional)</span>
        </label>
        <textarea id="en-msg" rows={3} value={datos.mensaje} onChange={cambia('mensaje')} />
      </div>
      <input type="text" name="web" value={datos.web} onChange={cambia('web')} tabIndex={-1} autoComplete="off" className="salta" aria-hidden="true" />
      <label className="casilla">
        <input type="checkbox" checked={datos.acepto} onChange={cambia('acepto')} />
        <span>
          I agree that the firm may use my details to answer me, as set out in the <Link href="/privacidad">privacy policy (in Spanish)</Link>.
        </span>
      </label>
      {aviso && (
        <p className="error" role="alert">
          {aviso}
        </p>
      )}
      {estado === 'error' && (
        <p className="error" role="alert">
          It could not be sent right now. Please message us on <a href={enlaceWhatsapp('Hello, I would like to ask about my case.')}>WhatsApp</a> or call +34{' '}
          {DESPACHO.telefono}.
        </p>
      )}
      <button type="submit" className="boton boton-marcador" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Sending...' : 'Please call me'}
      </button>
    </form>
  );
}
