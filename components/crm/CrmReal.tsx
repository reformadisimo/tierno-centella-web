'use client';

// El CRM real: entra solo quien está en la lista de usuarios del despacho (lo comprueba la base de datos).
import { useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import CrmApp from './CrmApp';
import { AlmacenReal, supabaseCrm } from '@/lib/crm';

export default function CrmReal() {
  const sb = useMemo(() => supabaseCrm(), []);
  const [sesion, setSesion] = useState<Session | null | undefined>(undefined);
  const [miembro, setMiembro] = useState<{ nombre: string } | null | undefined>(undefined);
  const [modo, setModo] = useState<'entrar' | 'crear' | 'olvido'>('entrar');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [msg, setMsg] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    // Enlace de acceso directo (#acceso=...): entra sin escribir nada y la sesión queda guardada en este navegador.
    const h = location.hash.match(/^#acceso=([^&]+)/);
    if (h) {
      history.replaceState(null, '', location.pathname);
      try {
        const [correo, ...resto] = atob(decodeURIComponent(h[1])).split(':');
        sb.auth.signInWithPassword({ email: correo, password: resto.join(':') }).then(({ error }) => {
          if (error) setMsg('El enlace de acceso no es válido o ha caducado.');
        });
      } catch {
        setMsg('El enlace de acceso no es válido.');
      }
    }
    sb.auth.getSession().then(({ data }) => setSesion(data.session));
    const { data } = sb.auth.onAuthStateChange((_e, s) => setSesion(s));
    return () => data.subscription.unsubscribe();
  }, [sb]);

  useEffect(() => {
    if (!sesion) {
      setMiembro(sesion === null ? null : undefined);
      return;
    }
    sb.from('crm_usuarios').select('nombre').eq('email', (sesion.user.email || '').toLowerCase()).maybeSingle().then(({ data }) => setMiembro(data || null));
  }, [sesion, sb]);

  const almacen = useMemo(() => new AlmacenReal(sb), [sb]);
  const salir = () => sb.auth.signOut();

  if (sesion === undefined) return <div className="cr-estado"><p>Cargando...</p></div>;

  if (sesion && miembro === undefined) return <div className="cr-estado"><p>Comprobando tu acceso...</p></div>;

  if (sesion && miembro === null)
    return (
      <div className="cr-estado">
        <h1>Tu correo aún no tiene acceso</h1>
        <p>Has entrado como {sesion.user.email}, pero no está en la lista del despacho. Pídele a Jesús que te dé acceso.</p>
        <button type="button" className="cr-btn cr-btn-claro" onClick={salir}>Salir</button>
      </div>
    );

  if (sesion && miembro) return <CrmApp almacen={almacen} usuario={miembro.nombre} alSalir={salir} />;

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMsg('');
    const redirige = `${location.origin}/crm`;
    if (modo === 'entrar') {
      const { error } = await sb.auth.signInWithPassword({ email, password: clave });
      if (error) setMsg(error.message.includes('confirm') ? 'Confirma primero tu correo con el enlace que te enviamos.' : 'Correo o contraseña incorrectos.');
    } else if (modo === 'crear') {
      const { error } = await sb.auth.signUp({ email, password: clave, options: { emailRedirectTo: redirige } });
      setMsg(error ? (error.message.includes('Password') ? 'La contraseña debe tener al menos 8 caracteres.' : error.message) : 'Te hemos enviado un correo. Pulsa el enlace para confirmarlo y vuelve aquí a entrar.');
    } else {
      const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: redirige });
      setMsg(error ? error.message : 'Si el correo está dado de alta, te llegará un enlace para cambiar la contraseña.');
    }
    setCargando(false);
  };

  return (
    <div className="cr-login">
      <form className="cr-login-caja" onSubmit={enviar}>
        <p className="cr-marca">Tierno Centella Abogados</p>
        <h1>{modo === 'entrar' ? 'Entrar en el CRM' : modo === 'crear' ? 'Crear tu contraseña' : 'Recuperar la contraseña'}</h1>
        <label className="cr-campo"><span>Tu correo</span><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
        {modo !== 'olvido' && (
          <label className="cr-campo"><span>Contraseña</span><input type="password" required minLength={8} value={clave} onChange={(e) => setClave(e.target.value)} autoComplete={modo === 'crear' ? 'new-password' : 'current-password'} /></label>
        )}
        <button type="submit" className="cr-btn cr-btn-grande" disabled={cargando}>{cargando ? 'Un momento...' : modo === 'entrar' ? 'Entrar' : modo === 'crear' ? 'Crear contraseña' : 'Enviar enlace'}</button>
        {msg && <p className="cr-login-msg" role="status">{msg}</p>}
        <p className="cr-login-otros">
          {modo !== 'entrar' && <button type="button" className="cr-enlace" onClick={() => setModo('entrar')}>Ya tengo contraseña</button>}
          {modo !== 'crear' && <button type="button" className="cr-enlace" onClick={() => setModo('crear')}>Es mi primera vez</button>}
          {modo !== 'olvido' && <button type="button" className="cr-enlace" onClick={() => setModo('olvido')}>He olvidado la contraseña</button>}
        </p>
        <p className="cr-mini-nota">Solo entran los correos que el despacho ha autorizado. ¿Quieres verlo antes? <a href="/guia-jesus/crm">Pruébalo con datos inventados</a>.</p>
      </form>
    </div>
  );
}
