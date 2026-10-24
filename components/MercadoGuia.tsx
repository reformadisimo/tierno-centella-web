// Lo que costaría contratar cada cosa por separado, con precios de mercado en España y su fuente.
// Son orientativos: en cada caso puede ser más o menos. Sin la cifra de nuestra cuota (se habla en persona).

type Fila = { que: string; rango: string; tipico: number; nota: string; fuente?: string };

const MES: Fila[] = [
  { que: 'SEO (posicionamiento en Google)', rango: '100 a 1.800 € al mes', tipico: 900, nota: 'Uno que trabaje de verdad, con artículos cada semana, pasa de 800 a 1.000 € al mes.', fuente: 'Cronoshare' },
  { que: 'Gestión de Google Ads', rango: '350 a 1.500 € al mes', tipico: 700, nota: 'Solo la gestión. Lo que se paga a Google va aparte. Algunas cobran un 10 a 20 % de la inversión.', fuente: 'Cronoshare' },
  { que: 'Gestión de anuncios en Instagram y Facebook', rango: '350 a 1.500 € al mes', tipico: 500, nota: 'Mismo esquema que Google Ads, normalmente otra persona u otra agencia.', fuente: 'Estimación con los precios de gestión de anuncios' },
  { que: 'Redes sociales (contenido)', rango: '300 a 1.200 € al mes', tipico: 800, nota: 'De 1 a 3 redes y de 8 a 20 publicaciones al mes. Con Instagram, LinkedIn y TikTok, en la parte alta.', fuente: 'Cronoshare' },
  { que: 'Mantenimiento y cambios de la web', rango: '30 a 100 € al mes, más 25 a 60 € la hora', tipico: 150, nota: 'El mantenimiento básico no incluye los cambios: cada uno, presupuesto y espera.', fuente: 'Trustlocal' },
  { que: 'CRM (licencias para tu equipo)', rango: '20 a 90 € por persona y mes', tipico: 150, nota: 'HubSpot, Pipedrive o Zoho, para tres personas, en un plan que sirva de verdad.', fuente: 'Clientify, agosto de 2026' },
];

const UNA_VEZ: Fila[] = [
  { que: 'Una web a medida como la tuya', rango: '10.000 a 15.000 €', tipico: 12500, nota: 'Una web corporativa sencilla cuesta de 1.200 a 6.000 €. La tuya tiene 14 herramientas, chat con IA, versión en inglés, tres landings y más de 40 páginas: eso es otra liga.', fuente: 'Cronoshare (web corporativa) y estimación nuestra' },
  { que: 'Montar un CRM a medida', rango: 'desde 5.000 €', tipico: 5000, nota: 'Conectado a tus formularios, con plazos de laboral e informes. Fuera de España, uno básico a medida parte de unos 24.000 dólares.', fuente: 'RaftLabs, 2026, y estimación nuestra' },
];

const eur = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} €`;

export default function MercadoGuia() {
  const totalMes = MES.reduce((s, f) => s + f.tipico, 0);
  const totalUnaVez = UNA_VEZ.reduce((s, f) => s + f.tipico, 0);
  return (
    <div className="mg">
      <div className="mg-cabeza">
        <p className="mg-antetitulo">Si lo contrataras por separado</p>
        <p className="mg-titulo">Cada cosa, su proveedor y su factura</p>
        <p className="mg-sub">Precios de mercado en España. En tu caso puede ser algo más o algo menos, pero la suma es lo que importa.</p>
      </div>

      <div className="mg-tabla" role="table" aria-label="Coste de contratar cada servicio por separado">
        <div className="mg-fila mg-fila-cabeza" role="row">
          <span role="columnheader">Cada mes</span>
          <span role="columnheader">Lo que se cobra en el mercado</span>
          <span role="columnheader">Lo normal para un despacho como el tuyo</span>
        </div>
        {MES.map((f) => (
          <div key={f.que} className="mg-fila" role="row">
            <span role="cell"><b>{f.que}</b><small>{f.nota}</small></span>
            <span role="cell" className="mg-rango">{f.rango}{f.fuente && <em>{f.fuente}</em>}</span>
            <span role="cell" className="mg-tipico">{eur(f.tipico)}<small>al mes</small></span>
          </div>
        ))}
        <div className="mg-fila mg-total" role="row">
          <span role="cell"><b>Solo lo de cada mes</b></span>
          <span role="cell">{eur(totalMes * 12)} al año</span>
          <span role="cell" className="mg-tipico">{eur(totalMes)}<small>al mes</small></span>
        </div>

        <div className="mg-fila mg-fila-cabeza" role="row">
          <span role="columnheader">Una sola vez</span>
          <span role="columnheader">Lo que se cobra en el mercado</span>
          <span role="columnheader">Lo normal</span>
        </div>
        {UNA_VEZ.map((f) => (
          <div key={f.que} className="mg-fila" role="row">
            <span role="cell"><b>{f.que}</b><small>{f.nota}</small></span>
            <span role="cell" className="mg-rango">{f.rango}{f.fuente && <em>{f.fuente}</em>}</span>
            <span role="cell" className="mg-tipico">{eur(f.tipico)}</span>
          </div>
        ))}
      </div>

      <div className="mg-suma">
        <div>
          <small>Por separado, el primer año</small>
          <b>Unos {eur(Math.round((totalMes * 12 + totalUnaVez) / 1000) * 1000)}</b>
          <span>{eur(totalMes * 12)} de servicios más {eur(totalUnaVez)} de la web y el CRM. Y seis proveedores que coordinar tú.</span>
        </div>
        <div className="mg-suma-nos">
          <small>Con nosotros</small>
          <b>Una sola cuota al mes</b>
          <span>
            El precio lo concretamos contigo, pero ya te podemos asegurar dos cosas: solo pagarás una cuota mensual, y será <strong>mucho menos que la suma de todo esto</strong>. Lo que nos pagarás en un año, con todo incluido, se parece a lo que otro proveedor te cobraría solo por hacerte la web y el CRM.
          </span>
        </div>
      </div>

      <div className="mg-todo">
        <p className="mg-todo-titulo">Y lo de mañana, también incluido</p>
        <ul>
          <li><b>¿Quieres otra web?</b> Incluida.</li>
          <li><b>¿Cambiar de diseño el año que viene?</b> Incluido.</li>
          <li><b>¿Otro CRM o más funciones?</b> Incluido.</li>
          <li><b>¿Una calculadora o una landing nueva?</b> Incluida.</li>
          <li><b>¿Rediseñar el logo?</b> Incluido.</li>
          <li><b>¿Un informe que hoy no tienes?</b> Incluido.</li>
        </ul>
        <p className="mg-todo-pie">
          Lo único que va aparte es lo que pagas a terceros y decides tú: la inversión en anuncios, las notas de prensa compradas, la emisión de radio, la grabación de vídeos profesionales y el uso del asistente de IA. Está todo detallado justo debajo.
        </p>
      </div>

      <div className="mg-cuatro">
        <div><small>El dolor</small><b>Seis proveedores, seis facturas</b><p>Nadie ve el conjunto, cada cambio es un presupuesto y los informes llegan tarde o no llegan.</p></div>
        <div><small>La solución</small><b>Un solo equipo</b><p>Web, SEO, anuncios, redes, reseñas, correos y CRM, coordinados y hablando entre sí.</p></div>
        <div><small>Los resultados</small><b>Consultas y clientes, medidos</b><p>No clics: cuántas personas te escriben, de dónde vienen y cuántas contratan. Lo ves en tu panel.</p></div>
        <div><small>La rapidez</small><b>Cambios el mismo día</b><p>Sin colas ni presupuestos. Esta web nueva, con todo lo que tiene, la tienes ya delante.</p></div>
      </div>
    </div>
  );
}
