// Las cuentas de las reseñas de Jesús, para verlas de un vistazo.
// Datos de su ficha de Google, comprobados el 24 de octubre de 2026: 44 de cinco, 3 de cuatro, 1 de tres, 0 de dos y 11 de una (59, media 4,17).
// Google redondea a un decimal: para que muestre 4,5 basta con llegar a 4,45. Donde la media quedaría justo en el límite, sumamos una más por seguridad.

const REPARTO: [number, number][] = [
  [5, 44],
  [4, 3],
  [3, 1],
  [2, 0],
  [1, 11],
];

const ESCALONES = [
  { nota: '4,5', faltan: 31, meses: 'unos 6 meses' },
  { nota: '4,6', faltan: 50, meses: 'unos 10 meses' },
  { nota: '4,7', faltan: 82, meses: 'unos 16 meses' },
  { nota: '4,8', faltan: 138, meses: 'algo más de 2 años' },
];

const CAUSAS: { causa: string; cuantas: string; arreglo: string }[] = [
  {
    causa: 'Creían que la consulta era gratis (lo decía la web antigua) o les sorprendió el precio',
    cuantas: '3 de 11 (y sale en una cuarta)',
    arreglo: 'La web nueva quita el "gratis" y dice el precio en todas partes: 150 € + IVA, o 250 € + IVA contigo, y qué incluye la hora. Antes de reservar se explica por teléfono o WhatsApp. Queda que lo quitemos también de la web actual y de los anuncios.',
  },
  {
    causa: 'Escribieron o llamaron y nadie les contestó',
    cuantas: '3 de 11',
    arreglo: 'Cada consulta de la web llega por correo con su teléfono y su tema; el asistente atiende a cualquier hora y avisa de quién pide que le llaméis. Compromiso de respuesta en 48 horas laborables y aviso claro en agosto.',
  },
  {
    causa: 'Contrataron por ti y les llevó otra persona',
    cuantas: '1 de 11',
    arreglo: 'La web explica desde el principio cómo trabajáis: un equipo especializado que tú supervisas, y quién lleva el día a día.',
  },
  {
    causa: 'No están contentos con el resultado del juicio, o sin detalles',
    cuantas: '4 de 11',
    arreglo: 'Esto no se arregla en la web, pero sí con una respuesta amable y profesional (con tu aprobación) que lea quien venga después.',
  },
];

function Estrellas({ n }: { n: number }) {
  return (
    <span className="rg-estrellas" aria-hidden="true">
      {'★★★★★'.slice(0, n)}
      <span>{'★★★★★'.slice(n)}</span>
    </span>
  );
}

export default function ResenasGuia() {
  const total = REPARTO.reduce((a, [, c]) => a + c, 0);
  return (
    <div className="rg">
      <div className="rg-hoy">
        <div className="rg-nota">
          <b>4,2</b>
          <Estrellas n={4} />
          <small>{total} reseñas · media exacta 4,17</small>
          <span className="rg-sin">Ninguna respondida</span>
        </div>
        <div className="rg-barras" role="img" aria-label="44 de cinco estrellas, 3 de cuatro, 1 de tres, 0 de dos y 11 de una">
          {REPARTO.map(([e, c]) => (
            <div key={e} className={`rg-fila${e === 1 ? ' rg-mala' : ''}`}>
              <span>{e} ★</span>
              <span className="rg-pista">
                <span style={{ width: `${Math.max(c ? 2 : 0, (c / 44) * 100)}%` }} />
              </span>
              <b>{c}</b>
            </div>
          ))}
        </div>
      </div>

      <div className="rg-dolor">
        <strong>Cada reseña de una estrella se come muchas de cinco</strong>
        <p>
          Para compensar <b>una sola</b> reseña de una estrella hacen falta <b>7 de cinco</b> si estás en 4,5, <b>9</b> en 4,6, <b>13</b> en 4,7 y{' '}
          <b>19</b> en 4,8. Tus 11 de una estrella son, hoy, el único freno entre el 4,2 y el 4,5. Por eso lo primero es que no lleguen más.
        </p>
      </div>

      <p className="rg-titulo">Cuántas reseñas nuevas de cinco estrellas hacen falta</p>
      <div className="rg-escalera">
        {ESCALONES.map((e, i) => (
          <div key={e.nota} className="rg-escalon" style={{ ['--alto' as string]: `${58 + i * 22}px` }}>
            <span className="rg-meta">
              <b>{e.nota}</b>
              <Estrellas n={5} />
            </span>
            <span className="rg-faltan">
              <b>+{e.faltan}</b> de cinco estrellas
            </span>
            <span className="rg-total">{59 + e.faltan} reseñas en total</span>
            <span className="rg-meses">{e.meses} a 5 reseñas al mes</span>
          </div>
        ))}
      </div>
      <p className="rg-nota-pie">
        Calculado con tus 59 reseñas de hoy y sin ninguna negativa nueva. Google muestra la nota con un decimal, así que el 4,5 aparece en cuanto la media llega a
        4,45. A unas 5 reseñas nuevas al mes, con las campañas de WhatsApp (más abajo).
      </p>

      <p className="rg-titulo">Por qué te ponen una estrella, y cómo lo hemos cortado en la web nueva</p>
      <div className="rg-causas">
        {CAUSAS.map((c) => (
          <div key={c.causa} className="rg-causa">
            <div className="rg-causa-hoy">
              <small>Hoy · {c.cuantas}</small>
              <span>{c.causa}</span>
            </div>
            <div className="rg-causa-luego">
              <small>Con nosotros</small>
              <span>{c.arreglo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
