'use client';

// Calculadora: lo que costaría al año una agencia que cobra un porcentaje de lo que inviertes en anuncios, frente a 0 € con nosotros.
import { useState } from 'react';

const PORCENTAJES = [10, 15, 20];
const eur = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} €`;

export default function ComisionesGuia() {
  const [mes, setMes] = useState(700);
  const anual = mes * 12;
  return (
    <div className="cm">
      <div className="cm-cabeza">
        <p className="cm-ante">Calculadora de comisiones</p>
        <p className="cm-titulo">¿Cuánto se llevaría una agencia de lo que inviertes en anuncios?</p>
        <p className="cm-sub">Muchas cobran un porcentaje de lo que inviertes en Google y Meta, a veces además de su cuota. Mueve la barra.</p>
      </div>
      <label className="cm-control">
        <span>
          Lo que inviertes en anuncios al mes: <b>{eur(mes)}</b>
        </span>
        <input type="range" min={300} max={5000} step={50} value={mes} onChange={(e) => setMes(Number(e.target.value))} aria-label="Inversión mensual en anuncios" />
        <small>Empezamos en 700 € al mes, una inversión habitual para un despacho en Madrid: con clics de 1,80 a 2,64 € (apartado 18 bis), son unos 300 clics. Prueba con la tuya.</small>
      </label>
      <div className="cm-columnas">
        {PORCENTAJES.map((p) => (
          <div key={p} className="cm-col">
            <small>Agencia al {p} %</small>
            <b>{eur((anual * p) / 100)}</b>
            <span>al año, solo en comisiones</span>
          </div>
        ))}
        <div className="cm-col cm-nos">
          <small>Con nosotros</small>
          <b>0 €</b>
          <span>de comisión. Nunca.</span>
        </div>
      </div>
      <p className="cm-pie">
        <b>Una sola cuota fija, la misma para cualquier empresa</b>, grande o pequeña, y sin comisiones sobre lo que inviertes. Así nunca tenemos ningún interés en que gastes más en anuncios: nuestro interés es que cada euro te traiga consultas.
      </p>
    </div>
  );
}
