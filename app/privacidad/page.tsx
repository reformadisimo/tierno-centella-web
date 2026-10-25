import type { Metadata } from 'next';
import { meta } from '@/lib/seo';
import { DESPACHO } from '@/lib/despacho';

export const metadata: Metadata = { ...meta({ titulo: 'Política de privacidad', descripcion: 'Cómo trata Tierno Centella Abogados los datos de quien le escribe o le llama.', ruta: '/privacidad' }), robots: { index: false } };

export default function Pagina() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <h1>Política de privacidad</h1>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor prosa">
          <div className="recuadro">
            <p>Borrador para la demostración. El texto definitivo lo revisará el despacho con sus datos registrales.</p>
          </div>
          <h2>Qué datos tratamos y para qué</h2>
          <p>
            Si nos escribes por el formulario, por WhatsApp o por correo, usamos tu nombre, tu teléfono y lo que nos cuentes solo para responderte y,
            si lo decides, para estudiar tu caso. Las herramientas de la web no piden datos personales y hacen los cálculos en tu propio navegador.
          </p>
          <h2>Asistente de la web</h2>
          <p>
            Lo que escribes en el asistente se envía a un proveedor de inteligencia artificial para generar la respuesta. No escribas datos que no
            sean necesarios para tu consulta.
          </p>
          <p>
            El despacho guarda las conversaciones del asistente en su base de datos, alojada en la Unión Europea, para poder atenderte si después
            nos llamas o nos pides que te llamemos, y para mejorar las respuestas. Solo las ve el despacho. Si dejas tu nombre y tu teléfono en el
            chat, los usamos únicamente para llamarte. Puedes pedir que borremos tu conversación escribiendo a {DESPACHO.email}.
          </p>
          <h2>Barómetro de los tests (datos anónimos)</h2>
          <p>
            Cuando terminas uno de los tests de la web (acoso, despido nulo, extinción o baja laboral), guardamos de forma anónima el tipo de resultado
            (alto, medio o bajo), la semana en que se hizo y unas etiquetas generales de tus respuestas, por ejemplo si el acoso viene de un superior.
            No guardamos tu nombre, tu dirección IP, tus respuestas literales, cookies ni ningún identificador, así que no podemos saber quién eres. Con
            esos datos agregados elaboramos el <a href="/barometro">barómetro</a>, que solo publica un test cuando tiene al menos 30 respuestas. Puedes
            desactivarlo antes de empezar un test con el botón "No guardarlo". Al ser datos anónimos, no podemos localizar ni borrar el tuyo.
          </p>
          <h2>Buzón de sugerencias</h2>
          <p>
            Si nos escribes en el buzón de sugerencias, guardamos tu mensaje, la valoración si la pones y la página desde la que escribes. Si dejas un teléfono o un
            correo, lo usamos solo para contestarte. Si no dejas ninguno, es anónimo: no guardamos tu IP ni usamos cookies. Te pedimos que no escribas datos
            sensibles de tu caso; para eso, llámanos o escríbenos por el formulario de contacto. Puedes pedir que borremos tu mensaje escribiendo a {DESPACHO.email}.
          </p>
          <h2>Tus derechos</h2>
          <p>
            Puedes pedir acceso, rectificación o supresión de tus datos escribiendo a {DESPACHO.email}. También puedes reclamar ante la Agencia
            Española de Protección de Datos.
          </p>
        </div>
      </section>
    </>
  );
}
