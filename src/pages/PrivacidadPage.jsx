import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Lock, Mail, MessageCircle, FileText } from 'lucide-react';
import SubpageHeader from '../components/SubpageHeader';
import Footer from '../components/Footer';

export default function PrivacidadPage() {
  useEffect(() => {
    document.title = 'Política de Privacidad | Maranatha Papelería Creativa';
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      window.lenis.resize();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white font-peridot text-[#141517] selection:bg-[#E7D1FF] selection:text-[#7E04A1]">
      {/* 1. Header con navegación unificada */}
      <SubpageHeader />

      {/* 2. Hero de Cabecera Institucional */}
      <section className="w-full bg-[#F8F4FD] pt-10 sm:pt-14 pb-12 sm:pb-16 border-b border-[#EBD6FA]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Breadcrumbs */}
          <nav aria-label="Ruta de navegación" className="inline-flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 font-medium mb-4 sm:mb-6">
            <Link to="/" className="hover:text-[#7E04A1] transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-[#7E04A1] font-bold">
              Política de Privacidad
            </span>
          </nav>

          <div className="w-12 h-12 rounded-2xl bg-white border border-[#EBD6FA] text-[#7E04A1] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#141517] leading-tight">
            Política de Privacidad y Tratamiento de Datos
          </h1>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#55555C] max-w-2xl mx-auto leading-relaxed">
            Conoce cómo protegemos, tratamos y respetamos tu información personal conforme a la Ley 1581 de 2012 de la República de Colombia.
          </p>

          <div className="mt-3 text-[11px] sm:text-xs text-gray-400 font-medium">
            Última actualización: Septiembre de 2026 • Cali, Colombia
          </div>
        </div>
      </section>

      {/* 3. Contenido Editorial Legal */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <article className="space-y-10 sm:space-y-12 text-[#2B2B2E] text-sm sm:text-base leading-relaxed">

          {/* Sección 1 */}
          <section className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FAF8FD] border border-[#F0E6FA]">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141517] tracking-tight flex items-center gap-2.5 mb-3">
              <FileText className="w-5 h-5 text-[#7E04A1] shrink-0" />
              <span>1. Responsable del Tratamiento de los Datos</span>
            </h2>
            <p className="text-gray-700">
              <strong>Maranatha Papelería Creativa</strong>, taller artesanal de papelería personalizada, diseño y empaques con sede en la ciudad de Cali, Valle del Cauca, Colombia, es el responsable del tratamiento de los datos personales suministrados por sus clientes, usuarios y visitantes a través de este sitio web y sus canales de mensajería oficiales.
            </p>
            <ul className="mt-3 space-y-1 text-xs sm:text-sm text-gray-600">
              <li><strong>Sede:</strong> Cali, Colombia.</li>
              <li><strong>Correo electrónico oficial:</strong> hola@maranathapapeleria.com</li>
              <li><strong>Canal oficial de atención WhatsApp:</strong> +57 314 5854213</li>
            </ul>
          </section>

          {/* Sección 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141517] tracking-tight">
              2. Datos Personales que Recopilamos
            </h2>
            <p>
              Para gestionar pedidos, cotizaciones personalizadas y entregas físicas, recopilamos únicamente los datos necesarios y pertinentes que el cliente proporciona de manera libre y voluntaria:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
              <li><strong>Datos de contacto:</strong> Nombre y apellidos, número de teléfono móvil / WhatsApp y dirección de correo electrónico.</li>
              <li><strong>Datos de entrega física:</strong> Dirección de domicilio, barrio, ciudad y especificaciones para mensajería local en Cali o transportadora nacional (Interrapidísimo).</li>
              <li><strong>Materiales de diseño:</strong> Archivos gráficos, logotipos, nombres de personas o frases personalizadas requeridas para la confección de piezas de papelería, empaques o recordatorios.</li>
            </ul>
          </section>

          {/* Sección 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141517] tracking-tight">
              3. Finalidad del Tratamiento de los Datos
            </h2>
            <p>
              La información recopilada tiene como fin exclusivo la correcta prestación de nuestros servicios de diseño y confección de papelería creativa:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-gray-700">
              <li>Elaborar y remitir cotizaciones formales solicitadas por el cliente.</li>
              <li>Compartir muestras digitales o pruebas de diseño para visto bueno previo por WhatsApp antes de impresión y troquelado.</li>
              <li>Coordinar la entrega física del pedido en Cali (mensajería o recogida) o remitir la guía de transporte nacional.</li>
              <li>Brindar servicio posventa, soporte y resolver dudas sobre productos y materiales.</li>
            </ol>
          </section>

          {/* Sección 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141517] tracking-tight flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#7E04A1] shrink-0" />
              <span>4. Confidencialidad y No Comercialización con Terceros</span>
            </h2>
            <p>
              En Maranatha aplicamos el principio de confidencialidad estricta. <strong>Nunca vendemos, alquilamos, cedemos ni transferimos bases de datos o información personal a terceros</strong> con fines publicitarios o comerciales ajenos a la producción de tu pedido.
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Únicamente compartimos los datos de destino (nombre, dirección y teléfono) con las empresas transportadoras autorizadas para el solo propósito del despacho de mercancía física.
            </p>
          </section>

          {/* Sección 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141517] tracking-tight">
              5. Derechos del Titular (Ley 1581 de 2012 - Habeas Data)
            </h2>
            <p>
              De conformidad con la legislación colombiana, todo titular de datos personales tiene derecho a:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
              <li>Conocer, actualizar y rectificar sus datos personales en cualquier momento.</li>
              <li>Solicitar prueba de la autorización otorgada para el tratamiento.</li>
              <li>Ser informado sobre el uso que se le ha dado a sus datos.</li>
              <li>Revocar la autorización o solicitar la supresión de sus datos de nuestros registros cuando no exista un deber legal o contractual de conservarlos.</li>
            </ul>
          </section>

          {/* Sección 6 */}
          <section className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FAF6FD] border border-[#EBD6FA]">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141517] tracking-tight mb-2">
              6. Canales para Ejercer sus Derechos
            </h2>
            <p className="text-gray-700 text-xs sm:text-sm">
              Si deseas actualizar, rectificar o eliminar tus datos personales de nuestros registros de atención, puedes comunicarte directamente con nosotros a través de:
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://wa.me/573145854213?text=Hola%20Maranatha%2C%20quisiera%20consultar%20sobre%20el%20tratamiento%20de%20mis%20datos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#7E04A1] text-white font-bold text-xs hover:bg-[#680285] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar por WhatsApp (+57 314 5854213)</span>
              </a>
              <a
                href="mailto:hola@maranathapapeleria.com"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#EBD6FA] text-[#7E04A1] font-bold text-xs hover:bg-gray-50 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>hola@maranathapapeleria.com</span>
              </a>
            </div>
          </section>

        </article>

        {/* Retorno a Inicio o Catálogo */}
        <div className="mt-12 pt-8 border-t border-gray-200/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#7E04A1]">
          <Link to="/" className="hover:underline">
            ← Volver a la página principal
          </Link>
          <Link to="/terminos-y-condiciones" className="hover:underline">
            Ver Términos y Condiciones →
          </Link>
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
