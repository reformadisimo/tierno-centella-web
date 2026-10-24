// Tecnología limpia: WordPress frente a la web nueva (código propio en la red mundial de Vercel). Tarjetas que se leen bien en el móvil.

const FILAS: [string, string, string][] = [
  ['La tecnología', 'WordPress, una plantilla y muchos plugins de terceros, cada uno de un fabricante distinto', 'Código propio, escrito a medida, sin WordPress ni plugins, servido desde la red mundial de Vercel'],
  ['Velocidad', '18,3 segundos en el móvil (49 sobre 100 en PageSpeed)', '3,2 segundos (94 sobre 100), camino del 100'],
  ['Seguridad', 'Un panel de entrada abierto y plugins que hay que actualizar sin parar: uno olvidado basta para que entren', 'Sin panel que atacar ni plugins: muchísimo más difícil de atacar'],
  ['Si algo falla', 'Limpiar un WordPress atacado lleva días y cuesta dinero', 'Volvemos a la versión anterior en minutos: la de ayer, la de hace un mes o la de hace cuatro'],
  ['Cada cambio', 'Si nadie lo apunta, no se sabe quién cambió qué ni cuándo', 'Guardado con su fecha y su historial: se ve qué cambió y se deshace si hace falta'],
  ['Licencias', 'Muchos plugins y plantillas se pagan cada año', 'Nada que pagar aparte'],
];

const DATOS: [string, string, string][] = [
  ['42,6 %', 'de las webs del mundo usan WordPress: es la tecnología más extendida, también para quien busca fallos', 'W3Techs, 2026'],
  ['11.334', 'fallos de seguridad nuevos en el mundo WordPress en 2025, un 42 % más que en 2024. El 91 %, en plugins', 'Patchstack, 2026'],
  ['46 %', 'de esos fallos no tenía arreglo el día que se hicieron públicos', 'Patchstack, 2026'],
  ['5 horas', 'tardan de media en atacarse los fallos más explotados desde que se conocen', 'Patchstack, 2026'],
];

export default function SeguridadGuia() {
  return (
    <div className="sg">
      <p className="sg-intro">
        WordPress no es malo: es lo que usa casi media internet y ha hecho mucho bien. Pero es la tecnología de hace diez años, y por eso pesa. Muchas empresas de webs siguen con ella porque tienen sus equipos y su forma de trabajar montados encima, y cambiar les costaría mucho. Nosotros empezamos sin ese lastre.
      </p>
      <div className="sg-cabeza">
        <span />
        <b className="sg-hoy-t">Tu web actual (WordPress)</b>
        <b className="sg-luego-t">Con Casiopea 360</b>
      </div>
      {FILAS.map(([q, hoy, luego]) => (
        <div key={q} className="sg-fila">
          <span className="sg-q">{q}</span>
          <span className="sg-hoy">
            <small>Hoy</small>
            {hoy}
          </span>
          <span className="sg-luego">
            <small>Con la web nueva</small>
            {luego}
          </span>
        </div>
      ))}
      <div className="sg-datos">
        {DATOS.map(([c, t, f]) => (
          <div key={c}>
            <b>{c}</b>
            <p>{t}</p>
            <small>{f}</small>
          </div>
        ))}
      </div>
      <p className="sg-nota">
        Ninguna web es imposible de atacar, y quien lo diga no dice la verdad. La tuya será <b>muchísimo más difícil de atacar y mucho más fácil de recuperar</b>.
      </p>
    </div>
  );
}
