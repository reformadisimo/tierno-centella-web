'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calendarioNacimiento } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp, fechaLarga } from '@/lib/despacho';

type Fila = { titulo: string; fecha: string; texto: string; enlace?: { href: string; texto: string } };

export default function CalendarioPermisos() {
  const [fecha, setFecha] = useState('');
  const hoy = hoyMadrid();
  const c = fecha ? calendarioNacimiento(fecha) : null;

  const filas: Fila[] = c
    ? [
        {
          titulo: 'Fin de las 6 semanas obligatorias',
          fecha: c.finObligatorias,
          texto: 'Las primeras 6 semanas tras el parto se disfrutan seguidas y a jornada completa.',
        },
        {
          titulo: 'Fin del permiso de lactancia',
          fecha: c.finLactancia,
          texto: `Una hora diaria (o media hora de reducción) hasta que cumpla 9 meses. Si los dos progenitores la disfrutáis igual, puede llegar al ${fechaLarga(
            c.finLactanciaAmpliada,
          )}.`,
        },
        {
          titulo: 'Último día para las 11 semanas flexibles',
          fecha: c.limiteFlexibles,
          texto: 'Seguidas o por semanas, avisando a la empresa con 15 días de antelación.',
        },
        {
          titulo: 'Fin de la protección reforzada frente al despido',
          fecha: c.finProteccionDespido,
          texto: 'Hasta esta fecha, si te despiden tras volver del permiso, el despido es nulo salvo causa real y ajena.',
          enlace: { href: '/mujer-y-trabajo/despido-embarazada', texto: 'Qué hacer si te despiden' },
        },
        {
          titulo: 'Último día para las 2 semanas retribuidas y el permiso parental',
          fecha: c.limiteDosSemanasYParental,
          texto: 'Las 2 semanas pagadas que se pueden guardar y las 8 semanas de permiso parental (no retribuido) hasta que cumpla 8 años.',
        },
        {
          titulo: 'Último día con derecho a reducción de jornada por este hijo',
          fecha: c.limiteReduccionJornada,
          texto: 'Hasta que cumpla 12 años puedes reducir entre un octavo y la mitad de tu jornada, o pedir una adaptación de horario.',
          enlace: { href: '/mujer-y-trabajo/reduccion-y-adaptacion-de-jornada', texto: 'Cómo pedirla' },
        },
      ]
    : [];

  const resumen = c
    ? `Hola, he usado el calendario de permisos de la web. Fecha de nacimiento: ${fechaLarga(fecha)}. Quiero consultar mi caso.`
    : '';

  return (
    <div className="herramienta">
      <label className="campo">
        <span>Fecha de nacimiento (o de la adopción o el acogimiento)</span>
        <input type="date" value={fecha} max="2040-12-31" onChange={(e) => setFecha(e.target.value)} />
      </label>

      {c && (
        <section aria-live="polite" style={{ marginTop: 24 }}>
          <ol className="linea-tiempo">
            {filas.map((f) => {
              const pasado = f.fecha < hoy;
              return (
                <li key={f.titulo} className={pasado ? 'pasado' : ''}>
                  <span className="lt-fecha">{fechaLarga(f.fecha)}</span>
                  <strong>{f.titulo}</strong>
                  <span>
                    {f.texto} {pasado && <em>Esta fecha ya ha pasado.</em>}
                  </span>
                  {f.enlace && <Link href={f.enlace.href}>{f.enlace.texto}</Link>}
                </li>
              );
            })}
          </ol>
          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp(resumen)}>
              Consultar mi caso por WhatsApp
            </a>
            <button type="button" className="boton boton-claro" onClick={() => window.print()}>
              Imprimir mi calendario
            </button>
          </div>
          <p className="letra-pequena">
            Fechas orientativas según el Estatuto de los Trabajadores tras el Real Decreto-ley 9/2025. Tu convenio puede mejorarlas. Ante cualquier duda,
            llámanos al {DESPACHO.telefono}.
          </p>
        </section>
      )}
    </div>
  );
}
