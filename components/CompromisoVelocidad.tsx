// Nuestro compromiso de velocidad: 100 en las cuatro notas de PageSpeed, 3 de 3 para los agentes de IA y menos de 2 segundos.

const NOTAS = ['Velocidad', 'Accesibilidad', 'Buenas prácticas', 'SEO'];

const DATOS: [string, string, string][] = [
  ['53 %', 'de quien entra desde el móvil se va si la web tarda más de 3 segundos', 'Google'],
  ['Hasta 3 veces', 'más contactos en una página que carga en 1 segundo que en una que tarda 5', 'Portent, 100 millones de visitas'],
  ['Solo el 48 %', 'de las webs aprueba en el móvil la velocidad que pide Google, y solo el 62 % carga lo principal a tiempo', 'HTTP Archive, Web Almanac 2025'],
];

export default function CompromisoVelocidad() {
  return (
    <div className="cv">
      <div className="cv-sello">
        <p className="cv-ante">Nuestro compromiso por escrito</p>
        <p className="cv-titulo">100 en todo. En el móvil y en el ordenador.</p>
        <div className="cv-notas">
          {NOTAS.map((n) => (
            <div key={n} className="cv-nota">
              <b>100</b>
              <span>{n}</span>
            </div>
          ))}
          <div className="cv-nota cv-nota-ia">
            <b>3/3</b>
            <span>Agentes de IA</span>
          </div>
        </div>
        <p className="cv-medido">Medido con PageSpeed Insights, la herramienta oficial de Google, que cualquiera puede comprobar.</p>
        <div className="cv-hoy">
          <span>Tu web actual hoy, en el móvil (medida el 23/10/2026):</span>
          <b className="cv-mal">49</b> velocidad <b className="cv-medio">84</b> accesibilidad <b className="cv-medio">73</b> buenas prácticas <b>100</b> SEO <b className="cv-mal">1/3</b> agentes de IA
        </div>
      </div>

      <div className="cv-tiempos">
        <div className="cv-t cv-t-compromiso">
          <small>Nos comprometemos</small>
          <b>2 segundos como máximo</b>
          <span>hasta que ves la página en un móvil normal</span>
        </div>
        <div className="cv-t">
          <small>Lo ideal</small>
          <b>Menos de medio segundo</b>
          <span>y ahí apuntamos siempre</span>
        </div>
        <div className="cv-t cv-t-hoy">
          <small>Tu web actual</small>
          <b>18,3 segundos</b>
          <span>en un móvil normal, según la misma prueba de Google</span>
        </div>
      </div>

      <div className="cv-datos">
        {DATOS.map(([cifra, texto, fuente]) => (
          <div key={cifra}>
            <b>{cifra}</b>
            <p>{texto}</p>
            <small>{fuente}</small>
          </div>
        ))}
      </div>

      <div className="cv-promesa">
        <p>
          <b>No te decimos que lo clavemos a la primera, pero siempre estará muy cerca de lo óptimo.</b> Haremos todos los cambios que hagan falta, una y otra vez, hasta llegar. Sabemos hacerlo y, en nuestra experiencia, siempre lo acabamos consiguiendo. Y cuando lo tengamos, lo vigilamos cada semana para que no baje: cada foto nueva, cada página y cada herramienta pasan por la misma prueba.
        </p>
      </div>
    </div>
  );
}
