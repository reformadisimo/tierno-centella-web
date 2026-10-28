'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { leerImporte } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp, euros, fechaLarga } from '@/lib/despacho';
import { SITUACIONES, planDe, type Datos, type Situacion } from '@/lib/tu-caso';
import { BotonImprimir } from './Utiles';
import Icono from './Iconos';

type Elegir<T extends string> = { valor: T; texto: string }[];

function Botones<T extends string>({ nombre, opciones, valor, cambiar }: { nombre: string; opciones: Elegir<T>; valor?: T; cambiar: (v: T) => void }) {
  return (
    <div className="opciones">
      {opciones.map((o) => (
        <label key={o.valor} className="opcion">
          <input type="radio" name={nombre} checked={valor === o.valor} onChange={() => cambiar(o.valor)} />
          <span>
            <strong>{o.texto}</strong>
          </span>
        </label>
      ))}
    </div>
  );
}

function Campo({ id, label, ayuda, tipo = 'texto', valor, cambiar, placeholder }: { id: string; label: string; ayuda?: string; tipo?: 'texto' | 'fecha' | 'numero'; valor: string; cambiar: (v: string) => void; placeholder?: string }) {
  return (
    <div className="campo">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={tipo === 'fecha' ? 'date' : 'text'}
        inputMode={tipo === 'numero' ? 'decimal' : undefined}
        placeholder={placeholder}
        value={valor}
        max={tipo === 'fecha' ? hoyMadrid() : undefined}
        onChange={(e) => cambiar(e.target.value)}
      />
      {ayuda && <span className="campo-ayuda">{ayuda}</span>}
    </div>
  );
}

export default function TuCaso() {
  const [sit, setSit] = useState<Situacion | null>(null);
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const [t, setT] = useState<Record<string, string>>({});
  const [d, setD] = useState<Datos>({});
  const pon = (k: string) => (v: string) => setT((x) => ({ ...x, [k]: v }));
  const marca = (k: string) =>
    setD((x) => ({ ...x, especial: (x.especial ?? []).includes(k) ? (x.especial ?? []).filter((y) => y !== k) : [...(x.especial ?? []), k] }));

  useEffect(() => {
    if (paso > 1) requestAnimationFrame(() => document.getElementById('tu-caso')?.scrollIntoView({ block: 'start', behavior: 'smooth' }));
  }, [paso]);

  const hoy = hoyMadrid();
  const datos: Datos = {
    ...d,
    fecha: t.fecha || undefined,
    inicio: t.inicio || undefined,
    salario: leerImporte(t.salario || '') || undefined,
    meses: Math.round(leerImporte(t.meses || '')) || undefined,
    edad: Math.round(leerImporte(t.edad || '')) || undefined,
    anios: t.anios ? leerImporte(t.anios) : undefined,
  };
  const plan = sit && paso === 3 ? planDe(sit, datos, hoy) : null;
  const fechaFutura = !!(t.fecha && t.fecha > hoy);

  function reiniciar() {
    setSit(null);
    setPaso(1);
    setT({});
    setD({});
  }

  const sal = <Campo id="tc-salario" label="Tu salario bruto anual (€)" ayuda="Con las pagas extra. Si no lo sabes, déjalo en blanco." tipo="numero" placeholder="24000" valor={t.salario ?? ''} cambiar={pon('salario')} />;

  return (
    <div className="herramienta cq tu-caso" id="tu-caso">
      <div className="cq-progreso" aria-hidden="true">
        <span style={{ width: `${paso === 1 ? 8 : paso === 2 ? 55 : 100}%` }}>
          <i />
        </span>
      </div>

      {paso === 1 && (
        <>
          <p className="campo-ayuda" style={{ marginTop: -8 }}>
            Paso 1 de 2 · Nadie ve tus respuestas: todo se calcula en tu pantalla.
          </p>
          <p className="cq-animo">
            <span aria-hidden="true">
              <Icono nombre="corazon" tam={16} />
            </span>
            Respira. En dos minutos sabrás tu plazo, lo que puedes reclamar y qué hacer primero.
          </p>
          <fieldset className="pregunta-test paso">
            <legend>
              <span className="paso-pregunta">¿Qué te está pasando?</span>
            </legend>
            <div className="paso-opciones">
              {SITUACIONES.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`paso-opcion${sit === o.id ? ' elegida' : ''}`}
                  onClick={() => {
                    setSit(o.id);
                    setD({});
                    setT({});
                    setTimeout(() => setPaso(2), 200);
                  }}
                >
                  <b className="cq-letra cq-icono" aria-hidden="true">
                    <Icono nombre={o.icono} tam={20} />
                  </b>
                  <span>
                    {o.texto}
                    <small>{o.ayuda}</small>
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        </>
      )}

      {paso === 2 && sit && (
        <form
          className="calculadora"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (!fechaFutura) setPaso(3);
          }}
        >
          <p className="campo-ayuda" style={{ marginTop: -8 }}>
            Paso 2 de 2 · {SITUACIONES.find((x) => x.id === sit)?.texto}. Rellena lo que sepas: lo que dejes en blanco, no lo calculamos.
          </p>

          {(sit === 'despido' || (sit === 'familia' && d.familia === 'despido')) && (
            <>
              <div className="campos-fila">
                <Campo id="tc-fecha" label="Fecha del despido" ayuda="La que pone la carta, o el último día que trabajaste." tipo="fecha" valor={t.fecha ?? ''} cambiar={pon('fecha')} />
                <Campo id="tc-inicio" label="Fecha en que empezaste" tipo="fecha" valor={t.inicio ?? ''} cambiar={pon('inicio')} />
              </div>
              <div className="campos-fila">{sal}</div>
              {sit === 'despido' && (
                <fieldset>
                  <legend className="campo">
                    <strong>¿Alguna de estas te pasaba al despedirte?</strong>
                  </legend>
                  <div className="opciones">
                    {[
                      ['embarazo', 'Embarazo, permiso por hijos, lactancia o reducción de jornada'],
                      ['baja', 'Estaba de baja o tengo una enfermedad que la empresa conocía'],
                      ['reclamo', 'Había reclamado algo, denunciado o ido a Inspección'],
                      ['representante', 'Soy representante de los trabajadores'],
                    ].map(([k, txt]) => (
                      <label key={k} className="opcion">
                        <input type="checkbox" checked={(d.especial ?? []).includes(k)} onChange={() => marca(k)} />
                        <span>{txt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
            </>
          )}

          {sit === 'sancion' && (
            <>
              <div className="campos-fila">
                <Campo id="tc-fecha" label="Fecha en que te comunicaron la sanción" tipo="fecha" valor={t.fecha ?? ''} cambiar={pon('fecha')} />
              </div>
              <fieldset>
                <legend className="campo">
                  <strong>¿Cómo la califica la empresa?</strong>
                </legend>
                <Botones
                  nombre="gravedad"
                  valor={d.gravedad}
                  cambiar={(v) => setD((x) => ({ ...x, gravedad: v }))}
                  opciones={[
                    { valor: 'leve', texto: 'Falta leve' },
                    { valor: 'grave', texto: 'Falta grave' },
                    { valor: 'muy-grave', texto: 'Falta muy grave' },
                    { valor: 'no-se', texto: 'No lo dice o no lo sé' },
                  ]}
                />
              </fieldset>
            </>
          )}

          {sit === 'impago' && (
            <>
              <div className="campos-fila">
                <Campo id="tc-meses" label="¿Cuántas nóminas te deben?" tipo="numero" placeholder="2" valor={t.meses ?? ''} cambiar={pon('meses')} />
                <Campo id="tc-fecha" label="¿Cuándo debieron pagarte la más antigua?" ayuda="Si no lo sabes exacto, pon el primer día del mes siguiente." tipo="fecha" valor={t.fecha ?? ''} cambiar={pon('fecha')} />
              </div>
              <div className="campos-fila">{sal}</div>
              <fieldset>
                <legend className="campo">
                  <strong>¿La empresa ha cerrado o está en concurso de acreedores?</strong>
                </legend>
                <Botones
                  nombre="cerrada"
                  valor={d.cerrada === undefined ? undefined : d.cerrada ? 'si' : 'no'}
                  cambiar={(v) => setD((x) => ({ ...x, cerrada: v === 'si' }))}
                  opciones={[
                    { valor: 'no', texto: 'No, sigue funcionando' },
                    { valor: 'si', texto: 'Sí, o no tiene con qué pagar' },
                  ]}
                />
              </fieldset>
            </>
          )}

          {sit === 'baja' && (
            <>
              <fieldset>
                <legend className="campo">
                  <strong>¿Por qué estás de baja?</strong>
                </legend>
                <Botones
                  nombre="tipoBaja"
                  valor={d.tipoBaja}
                  cambiar={(v) => setD((x) => ({ ...x, tipoBaja: v }))}
                  opciones={[
                    { valor: 'comun', texto: 'Una enfermedad o un accidente fuera del trabajo' },
                    { valor: 'trabajo', texto: 'Un accidente de trabajo o algo que causó el trabajo' },
                  ]}
                />
              </fieldset>
              <fieldset>
                <legend className="campo">
                  <strong>¿Y ahora?</strong>
                </legend>
                <Botones
                  nombre="alta"
                  valor={d.alta === undefined ? undefined : d.alta ? 'si' : 'no'}
                  cambiar={(v) => setD((x) => ({ ...x, alta: v === 'si' }))}
                  opciones={[
                    { valor: 'no', texto: 'Sigo de baja' },
                    { valor: 'si', texto: 'Me han dado el alta y no estoy bien' },
                  ]}
                />
              </fieldset>
              <div className="campos-fila">
                {d.alta && <Campo id="tc-fecha" label="Fecha en que te notificaron el alta" tipo="fecha" valor={t.fecha ?? ''} cambiar={pon('fecha')} />}
                {sal}
              </div>
            </>
          )}

          {sit === 'incapacidad' && (
            <>
              <fieldset>
                <legend className="campo">
                  <strong>¿En qué punto estás?</strong>
                </legend>
                <Botones
                  nombre="denegada"
                  valor={d.denegada === undefined ? undefined : d.denegada ? 'si' : 'no'}
                  cambiar={(v) => setD((x) => ({ ...x, denegada: v === 'si' }))}
                  opciones={[
                    { valor: 'no', texto: 'Quiero pedirla, o ya la he pedido' },
                    { valor: 'si', texto: 'El INSS me la ha denegado o me da un grado menor' },
                  ]}
                />
              </fieldset>
              <div className="campos-fila">
                {d.denegada && <Campo id="tc-fecha" label="Fecha en que recibiste la resolución" tipo="fecha" valor={t.fecha ?? ''} cambiar={pon('fecha')} />}
                {sal}
              </div>
              <div className="campos-fila">
                <Campo id="tc-edad" label="Tu edad" tipo="numero" placeholder="50" valor={t.edad ?? ''} cambiar={pon('edad')} />
                <Campo id="tc-anios" label="Años cotizados" ayuda="Están en tu vida laboral." tipo="numero" placeholder="20" valor={t.anios ?? ''} cambiar={pon('anios')} />
              </div>
            </>
          )}

          {sit === 'acoso' && (
            <fieldset>
              <legend className="campo">
                <strong>¿Dónde estás ahora?</strong>
              </legend>
              <Botones
                nombre="sigo"
                valor={d.sigo}
                cambiar={(v) => setD((x) => ({ ...x, sigo: v }))}
                opciones={[
                  { valor: 'si', texto: 'Sigo trabajando allí' },
                  { valor: 'baja', texto: 'Estoy de baja por esto' },
                  { valor: 'no', texto: 'Ya no estoy en la empresa' },
                ]}
              />
            </fieldset>
          )}

          {sit === 'familia' && (
            <fieldset>
              <legend className="campo">
                <strong>¿Qué necesitas?</strong>
              </legend>
              <Botones
                nombre="familia"
                valor={d.familia}
                cambiar={(v) => setD((x) => ({ ...x, familia: v }))}
                opciones={[
                  { valor: 'jornada', texto: 'Reducir o adaptar mi jornada para cuidar' },
                  { valor: 'nacimiento', texto: 'Voy a tener un hijo o estoy embarazada' },
                  { valor: 'dias', texto: 'Unos días libres o una excedencia' },
                  { valor: 'despido', texto: 'Me han despedido estando embarazada o de permiso' },
                ]}
              />
            </fieldset>
          )}

          {sit === 'irme' && (
            <>
              <fieldset>
                <legend className="campo">
                  <strong>¿Por qué te quieres ir?</strong>
                </legend>
                <Botones
                  nombre="motivo"
                  valor={d.motivo}
                  cambiar={(v) => setD((x) => ({ ...x, motivo: v }))}
                  opciones={[
                    { valor: 'impago', texto: 'No me pagan o me pagan tarde' },
                    { valor: 'cambios', texto: 'Me han cambiado el horario, el sueldo o las funciones' },
                    { valor: 'acoso', texto: 'Por acoso o un trato que no aguanto' },
                    { valor: 'voluntaria', texto: 'Por mí: he encontrado otra cosa o quiero cambiar' },
                  ]}
                />
              </fieldset>
              {d.motivo && d.motivo !== 'voluntaria' && (
                <div className="campos-fila">
                  <Campo id="tc-inicio" label="Fecha en que empezaste" tipo="fecha" valor={t.inicio ?? ''} cambiar={pon('inicio')} />
                  {sal}
                </div>
              )}
            </>
          )}

          {fechaFutura && (
            <p className="error" role="alert">
              La fecha no puede ser posterior a hoy.
            </p>
          )}
          <div className="acciones">
            <button type="button" className="boton boton-claro" onClick={() => setPaso(1)}>
              Volver
            </button>
            <button type="submit" className="boton boton-marcador">
              Ver mi plan
            </button>
          </div>
        </form>
      )}

      {plan && (
        <section className="tu-plan" aria-live="polite">
          <div className={`veredicto cq-veredicto ${plan.urgente ? 'cq-alto veredicto-alto' : 'cq-medio'}`}>
            <span className="cq-ola">Este es tu plan. Guárdalo o mándanoslo.</span>
            <h3>{plan.titulo}</h3>
            <p style={{ margin: 0 }}>Tres cosas, por este orden: tu plazo, lo que puedes reclamar y el primer paso.</p>
          </div>

          <ol className="plan-pasos">
            <li>
              <span className="plan-num" aria-hidden="true">1</span>
              <div>
                <h4>Tu plazo</h4>
                {plan.plazo?.ultimo ? (
                  <>
                    <p className="plan-dato">
                      {plan.plazo.que}: <strong>{fechaLarga(plan.plazo.ultimo)}</strong>
                      {plan.plazo.quedan !== undefined && (
                        <span className={`plan-quedan${plan.plazo.quedan <= 5 ? ' urgente' : ''}`}>
                          {plan.plazo.ultimo < hoy ? 'Vencido: llámanos hoy' : plan.plazo.quedan === 1 ? 'Queda 1 día' : `Quedan ${plan.plazo.quedan} días`}
                        </span>
                      )}
                    </p>
                    <p>{plan.plazo.texto} Es orientativo: compruébalo con un abogado.</p>
                  </>
                ) : (
                  <p>
                    {plan.plazo?.texto ??
                      (sit === 'acoso'
                        ? 'Para reclamar daños por acoso tienes, en general, un año. Pero cuanto antes empieces a reunir pruebas, mejor.'
                        : 'No hay un plazo corto corriendo por lo que cuentas. Aun así, conviene no dejarlo: los derechos también caducan.')}
                  </p>
                )}
              </div>
            </li>
            <li>
              <span className="plan-num" aria-hidden="true">2</span>
              <div>
                <h4>Lo que te puede corresponder</h4>
                {plan.cifras.length > 0 ? (
                  <div className="resultado-cifras plan-cifras">
                    {plan.cifras.map((c, i) => (
                      <div key={c.nombre} className={i === 0 ? 'cifra-principal' : undefined}>
                        <span className="cifra-nombre">{c.nombre}</span>
                        <span className="cifra-valor">{euros(c.valor)}</span>
                        <span className="cifra-detalle">{c.detalle}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Aquí no hay una cifra que calcular con estos datos: lo importante son tus derechos y el siguiente paso.</p>
                )}
                {plan.avisos.length > 0 && (
                  <ul className="prosa">
                    {plan.avisos.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
            <li>
              <span className="plan-num" aria-hidden="true">3</span>
              <div>
                <h4>Tu primer paso</h4>
                {plan.carta ? (
                  <p>
                    Deja constancia por escrito. Tienes la carta lista para rellenar: <Link href={plan.carta.href}>{plan.carta.texto}</Link>.
                  </p>
                ) : (
                  <p>Guarda todo lo que tengas (cartas, nóminas, correos, partes médicos) y cuéntanoslo.</p>
                )}
                <p className="plan-sub">Para entenderlo bien</p>
                <ul className="prosa">
                  {plan.guias.map((g) => (
                    <li key={g.href}>
                      <Link href={g.href}>{g.texto}</Link>
                    </li>
                  ))}
                </ul>
                {plan.herramientas.length > 0 && (
                  <>
                    <p className="plan-sub">Para afinar tus números</p>
                    <ul className="prosa">
                      {plan.herramientas.map((g) => (
                        <li key={g.href}>
                          <Link href={g.href}>{g.texto}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </li>
          </ol>

          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp(plan.resumen)}>
              Mandar mi plan por WhatsApp
            </a>
            <BotonImprimir />
            <a className="boton boton-claro" href={DESPACHO.telefonoHref}>
              Llamar al {DESPACHO.telefono}
            </a>
            <button type="button" className="boton boton-claro" onClick={() => setPaso(2)}>
              Cambiar mis datos
            </button>
            <button type="button" className="boton boton-claro" onClick={reiniciar}>
              Empezar de nuevo
            </button>
          </div>
          <p className="letra-pequena">
            Plan orientativo con las cifras y los plazos de 2026, calculado con las mismas herramientas de esta web. No guardamos nada: se queda en tu pantalla. No
            sustituye la valoración de un abogado.
          </p>
        </section>
      )}
    </div>
  );
}
