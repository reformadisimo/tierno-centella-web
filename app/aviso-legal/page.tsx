import type { Metadata } from 'next';
import { meta } from '@/lib/seo';
import { DESPACHO } from '@/lib/despacho';

export const metadata: Metadata = { ...meta({ titulo: 'Aviso legal', descripcion: 'Titularidad y condiciones de uso de la web de Tierno Centella Abogados.', ruta: '/aviso-legal' }), robots: { index: false } };

export default function Pagina() {
  return (
    <>
      <header className="cabeza-pagina">
        <div className="contenedor">
          <h1>Aviso legal</h1>
        </div>
      </header>
      <section className="seccion">
        <div className="contenedor prosa">
          <div className="recuadro">
            <p>Borrador para la demostración. El texto definitivo lo revisará el despacho con sus datos registrales.</p>
          </div>
          <h2>Quién es el titular</h2>
          <p>
            Esta web pertenece a {DESPACHO.nombre}, con domicilio en {DESPACHO.direccion}, {DESPACHO.ciudad}. Teléfono {DESPACHO.telefono}. Correo{" "}
            {DESPACHO.email}. Faltan por añadir la razón social, el NIF y los datos de colegiación del Colegio de la Abogacía de Madrid.
          </p>
          <h2>Para qué sirve la información</h2>
          <p>
            Los textos y herramientas de esta web informan con carácter general y no son asesoramiento jurídico. Cada caso necesita que un abogado
            estudie sus documentos. Los cálculos son orientativos.
          </p>
          <h2>Propiedad intelectual</h2>
          <p>Los textos, fotografías, vídeos y el logotipo pertenecen al despacho o a sus autores, y no pueden reutilizarse sin permiso.</p>
        </div>
      </section>
    </>
  );
}
