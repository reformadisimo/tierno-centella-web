'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calendarioNacimiento } from '@/lib/calculos';
import { hoyMadrid } from '@/lib/hoy';
import { DESPACHO, enlaceWhatsapp } from '@/lib/despacho';
import { fechaLargaEn } from './UtilesCalcEn';

type Fila = { titulo: string; fecha: string; texto: string; enlace?: { href: string; texto: string } };

export default function CalendarioPermisosEn() {
  const [fecha, setFecha] = useState('');
  const hoy = hoyMadrid();
  const c = fecha ? calendarioNacimiento(fecha) : null;

  const filas: Fila[] = c
    ? [
        {
          titulo: 'End of the 6 compulsory weeks',
          fecha: c.finObligatorias,
          texto: 'The first 6 weeks after the birth are taken in one block and full time.',
        },
        {
          titulo: 'End of breastfeeding leave (permiso de lactancia)',
          fecha: c.finLactancia,
          texto: `One hour a day (or half an hour off your working day) until the baby is 9 months old. If both parents take it in the same way, it can extend to ${fechaLargaEn(
            c.finLactanciaAmpliada,
          )}.`,
        },
        {
          titulo: 'Last day for the 11 flexible weeks',
          fecha: c.limiteFlexibles,
          texto: 'In one block or week by week, giving the company 15 days’ notice.',
        },
        {
          titulo: 'End of the enhanced protection against dismissal',
          fecha: c.finProteccionDespido,
          texto: 'Until this date, if you are dismissed after coming back from leave, the dismissal is void (nulo) unless there is a real reason unrelated to it.',
          enlace: { href: '/en/women-at-work/dismissal-during-pregnancy', texto: 'What to do if you are dismissed' },
        },
        {
          titulo: 'Last day for the 2 paid weeks and parental leave',
          fecha: c.limiteDosSemanasYParental,
          texto: 'The 2 paid weeks that can be saved and the 8 weeks of parental leave (permiso parental, unpaid) until the child turns 8.',
        },
        {
          titulo: 'Last day with the right to reduced working hours for this child',
          fecha: c.limiteReduccionJornada,
          texto: 'Until the child turns 12 you can reduce your working hours by between one eighth and a half, or ask for an adapted timetable.',
          enlace: { href: '/en/women-at-work/reduced-and-adapted-working-hours', texto: 'How to ask for it' },
        },
      ]
    : [];

  const resumen = c
    ? `Hello, I have used the leave calendar on your website. Date of birth: ${fechaLargaEn(fecha)}. I would like to ask about my case.`
    : '';

  return (
    <div className="herramienta">
      <label className="campo">
        <span>Date of birth (or of the adoption or foster placement)</span>
        <input type="date" value={fecha} max="2040-12-31" onChange={(e) => setFecha(e.target.value)} />
      </label>

      {c && (
        <section aria-live="polite" style={{ marginTop: 24 }}>
          <ol className="linea-tiempo">
            {filas.map((f) => {
              const pasado = f.fecha < hoy;
              return (
                <li key={f.titulo} className={pasado ? 'pasado' : ''}>
                  <span className="lt-fecha">{fechaLargaEn(f.fecha)}</span>
                  <strong>{f.titulo}</strong>
                  <span>
                    {f.texto} {pasado && <em>This date has already passed.</em>}
                  </span>
                  {f.enlace && <Link href={f.enlace.href}>{f.enlace.texto}</Link>}
                </li>
              );
            })}
          </ol>
          <div className="acciones">
            <a className="boton" href={enlaceWhatsapp(resumen)}>
              Ask about my case on WhatsApp
            </a>
            <button type="button" className="boton boton-claro" onClick={() => window.print()}>
              Print my calendar
            </button>
          </div>
          <p className="letra-pequena">
            Approximate dates under the Workers’ Statute (Estatuto de los Trabajadores) after Royal Decree-law 9/2025. Your collective agreement
            (convenio) may improve them. If you have any questions, call us on {DESPACHO.telefono}.
          </p>
        </section>
      )}
    </div>
  );
}
