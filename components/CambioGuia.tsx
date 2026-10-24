'use client';

// Cómo se pasa de los proveedores de hoy a trabajar con nosotros: pasos, qué hace cada uno y el mensaje para el proveedor.
import { useState } from 'react';

const PASOS: { cuando: string; titulo: string; tu: string; nosotros: string }[] = [
  {
    cuando: 'Día 1',
    titulo: 'Nos dices que sí',
    tu: 'Una llamada o un WhatsApp. Nada más.',
    nosotros: 'Te mandamos la lista de cuentas que hay que revisar y el mensaje para tus proveedores, ya escrito.',
  },
  {
    cuando: 'Días 1 a 3',
    titulo: 'Comprobamos que todo está a tu nombre',
    tu: 'Mirar con nosotros, en una videollamada de 20 minutos, a nombre de quién están la web, el dominio, Google Ads, Analytics y tu ficha.',
    nosotros: 'Si alguna cuenta está a nombre de tu proveedor, te decimos exactamente qué pedirle para que te la pase a ti.',
  },
  {
    cuando: 'Días 2 a 5',
    titulo: 'Nos invitas a tus cuentas',
    tu: 'Pulsar "invitar usuario" en cada cuenta con nuestro correo. Unos 5 minutos cada una, y te guiamos paso a paso.',
    nosotros: 'Entramos como invitados, nunca como dueños. Revisamos todo y te contamos lo que vemos.',
  },
  {
    cuando: 'Semana 1',
    titulo: 'Avisas a tus proveedores',
    tu: 'Enviarles el mensaje que te dejamos abajo, respetando el preaviso de cada contrato.',
    nosotros: 'Convivimos con ellos el tiempo que haga falta: ningún día te quedas sin web ni sin anuncios.',
  },
  {
    cuando: 'Semana 2',
    titulo: 'Publicamos la web nueva',
    tu: 'Darnos el visto bueno final a los textos.',
    nosotros: 'Apuntamos tiernocentella.es a la web nueva, activamos las 220 redirecciones y avisamos a Google. Tus anuncios siguen funcionando, con todo su historial.',
  },
  {
    cuando: 'Semanas 2 a 4',
    titulo: 'Das de baja lo que ya no necesitas',
    tu: 'Cancelar el alojamiento antiguo y los servicios que ya hacemos nosotros. Tu dominio y tu correo se quedan como están.',
    nosotros: 'Te decimos qué puedes cancelar y cuándo, para que no pagues dos veces lo mismo ni te quedes sin nada.',
  },
];

const CONTROL: [string, string][] = [
  ['Todas las cuentas, a tu nombre', 'La web, el dominio, Google, las redes y el CRM son tuyos. Nosotros entramos como invitados.'],
  ['Tu panel, en directo', 'Consultas, anuncios, lo que gastas, tu posición en Google, las reseñas y la velocidad, cuando quieras, desde el móvil.'],
  ['Tu CRM', 'Cada persona que te escribe, de dónde viene y en qué punto está. Lo usa tu equipo y lo ves tú.'],
  ['Informes cada día, semana y mes', 'Te llegan solos. Y si echas de menos un dato, lo pides y lo añadimos.'],
  ['Nada importante sin tu visto bueno', 'Las respuestas a reseñas, las campañas nuevas y lo que cuesta dinero, siempre contigo antes.'],
  ['Cada versión de la web, guardada', 'Ves qué ha cambiado y cuándo, y volvemos a cualquier versión anterior en minutos.'],
  ['Te vas cuando quieras', 'Sin pedirnos permiso ni claves: nos quitas el acceso y todo sigue funcionando.'],
];

const MENSAJE = `Hola, [nombre]:

Te escribo para avisarte de que, a partir del [fecha], vamos a dejar de contar con vuestro servicio de [web / SEO / Google Ads / redes] en Tierno Centella Abogados. Muchas gracias por el trabajo de este tiempo.

Para que el cambio sea ordenado, te pido por favor:
1. Que la cuenta de [Google Ads / el alojamiento / el dominio / la ficha de Google] quede a nombre del despacho, con mi correo como propietario.
2. Que nos enviéis cualquier acceso o fichero que tengáis de nuestra web.
3. Que me confirméis si hay algún preaviso o pago pendiente según nuestro acuerdo.

Un saludo,
Jesús Tierno Centella`;

export default function CambioGuia() {
  const [copiado, setCopiado] = useState(false);
  return (
    <div className="cg">
      <div className="cg-resumen">
        <div><b>Unas 2 horas</b><span>de tu tiempo en total, repartidas en un par de semanas</span></div>
        <div><b>Cero días</b><span>sin web, sin anuncios ni sin correo</span></div>
        <div><b>Todo tuyo</b><span>cada cuenta a tu nombre, con control total</span></div>
      </div>

      <ol className="cg-pasos">
        {PASOS.map((p, i) => (
          <li key={p.titulo}>
            <span className="cg-num" aria-hidden="true">{i + 1}</span>
            <div className="cg-paso">
              <small>{p.cuando}</small>
              <b>{p.titulo}</b>
              <div className="cg-dos">
                <p><em>Tú</em>{p.tu}</p>
                <p><em>Nosotros</em>{p.nosotros}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="cg-mensaje">
        <div className="cg-mensaje-cabeza">
          <b>El mensaje para tus proveedores, ya escrito</b>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(MENSAJE).then(() => {
                setCopiado(true);
                setTimeout(() => setCopiado(false), 2500);
              });
            }}
          >
            {copiado ? 'Copiado' : 'Copiar el mensaje'}
          </button>
        </div>
        <pre>{MENSAJE}</pre>
        <p className="cg-nota">Cambias lo que va entre corchetes y lo envías. Si prefieres, lo adaptamos nosotros a cada proveedor.</p>
      </div>

      <div className="cg-control">
        <p className="cg-control-titulo">Y tú, con el control absoluto</p>
        <div className="cg-control-rejilla">
          {CONTROL.map(([t, x]) => (
            <div key={t}><b>{t}</b><p>{x}</p></div>
          ))}
        </div>
        <p className="cg-enlaces">
          <a href="/guia-jesus/panel" target="_blank" rel="noopener">Ver tu panel de control</a>
          <a href="/guia-jesus/crm" target="_blank" rel="noopener">Probar tu CRM</a>
        </p>
      </div>
    </div>
  );
}
