import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileCheck, CheckCircle2, AlertCircle, Clock, Truck, ShieldAlert } from 'lucide-react';
import SubpageHeader from '../components/SubpageHeader';
import Footer from '../components/Footer';

export default function TerminosPage() {
  useEffect(() => {
    document.title = 'Términos y Condiciones | Maranatha Papelería Creativa';
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
              Términos y Condiciones
            </span>
          </nav>

          <div className="w-12 h-12 rounded-2xl bg-white border border-[#EBD6FA] text-[#7E04A1] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <FileCheck className="w-6 h-6 stroke-[2.2]" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#141517] leading-tight">
            Términos y Condiciones del Servicio
          </h1>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#55555C] max-w-2xl mx-auto leading-relaxed">
            Condiciones de cotización, tiempos de confección, aprobación digital y entrega para pedidos de papelería personalizada en Maranatha.
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
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141517] tracking-tight mb-3">
              1. Naturaleza de los Productos Personalizados
            </h2>
            <p className="text-gray-700">
              En <strong>Maranatha Papelería Creativa</strong> elaboramos productos de papelería de autor, cajas temáticas, dulceros, toppers, stickers y piezas empresariales bajo encargo específico y personalizado. Cada pieza se fabrica de acuerdo con los nombres, colores, dimensiones y logotipos acordados previamente con el cliente.
            </p>
          </section>

          {/* Sección 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141517] tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#7E04A1] shrink-0" />
              <span>2. Aprobación Digital Previa (Garantía de Cero Errores)</span>
            </h2>
            <p>
              Para garantizar que el resultado final cumpla con tus expectativas exactas, aplicamos el protocolo de aprobación obligatoria:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
              <li>Antes de encender máquinas de impresión, corte o troquelado, <strong>te enviamos una muestra o previsualización digital por WhatsApp</strong>.</li>
              <li>El cliente es responsable de revisar minuciosamente la ortografía de nombres, fechas, teléfonos, redes sociales y textos antes de dar su visto bueno.</li>
              <li>Una vez que el cliente aprueba la muestra de diseño, Maranatha procede a la producción física. Maranatha no se hace responsable por errores de texto u ortografía que hayan sido revisados y aprobados por el cliente.</li>
            </ul>
          </section>

          {/* Sección 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141517] tracking-tight">
              3. Condiciones de Cotización, Anticipos y Medios de Pago
            </h2>
            <p>
              Por tratarse de productos fabricados a medida que no pueden ser revendidos a terceros:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-gray-700">
              <li><strong>Anticipo inicial:</strong> Todo pedido personalizado se inicia con un anticipo del <strong>50% del valor total cotizado</strong>. El 50% restante se cancela contra entrega en Cali o previo al despacho para envíos nacionales.</li>
              <li><strong>Medios de pago aceptados:</strong> Transferencias bancarias a través de Bancolombia, Nequi, Daviplata o PSE.</li>
              <li><strong>Vigencia de cotizaciones:</strong> Las cotizaciones remitidas vía WhatsApp tienen una vigencia de 15 días calendario a partir de su emisión.</li>
            </ol>
          </section>

          {/* Sección 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141517] tracking-tight flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#7E04A1] shrink-0" />
              <span>4. Tiempos de Confección y Producción</span>
            </h2>
            <p>
              Los tiempos de producción empiezan a contar a partir del momento en que el cliente aprueba la muestra digital de diseño:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
              <li><strong>Papelería Creativa para Eventos:</strong> Habitualmente entre <strong>2 a 3 días hábiles</strong>.</li>
              <li><strong>Papelería Empresarial y Stickers:</strong> Entre <strong>3 a 6 días hábiles</strong> según la cantidad requerida.</li>
              <li><strong>Insumos en Stock:</strong> Despacho o recogida en taller el mismo día o al día hábil siguiente en Cali.</li>
            </ul>
          </section>

          {/* Sección 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141517] tracking-tight flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#7E04A1] shrink-0" />
              <span>5. Envíos, Entregas y Cobertura</span>
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
              <li><strong>Entregas en Cali:</strong> Realizadas a través de servicio de mensajería local rápida con tarifa asumida por el cliente, o recogida física directa en nuestro taller coordinada previamente por WhatsApp.</li>
              <li><strong>Envíos Nacionales:</strong> Realizados con transportadoras reconocidas (Interrapidísimo o Servientrega) con número de guía rastreable remitido al cliente. El tiempo de transporte depende de la transportadora según la ciudad de destino.</li>
              <li>El cliente debe suministrar los datos de dirección exactos y con indicaciones claras para evitar demoras por parte de la mensajería.</li>
            </ul>
          </section>

          {/* Sección 6 */}
          <section className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FAF8FD] border border-[#EBD6FA]">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141517] tracking-tight flex items-center gap-2.5 mb-2">
              <ShieldAlert className="w-5 h-5 text-[#7E04A1] shrink-0" />
              <span>6. Políticas de Retracto, Cambios y Garantías (Ley 1480 de 2011)</span>
            </h2>
            <p className="text-gray-700 text-xs sm:text-sm">
              De acuerdo con el <strong>artículo 47, numeral 3 del Estatuto del Consumidor en Colombia (Ley 1480 de 2011)</strong>, el derecho de retracto se exceptúa en los contratos de suministro de bienes confeccionados conforme a las especificaciones del consumidor o claramente personalizados. Por tal razón:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-700">
              <li>No se aceptan cancelaciones o reembolsos una vez que el cliente haya aprobado el diseño digital y la producción física haya iniciado.</li>
              <li><strong>Garantía por defectos de taller:</strong> Si el producto presenta un defecto de fabricación, ensamble o falla física imputable a Maranatha (ej. corte desfasado o daño atribuible al taller), nos comprometemos a reponer o corregir la pieza sin costo adicional dentro de los 3 días hábiles siguientes al reporte.</li>
            </ul>
          </section>

          {/* Sección 7 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141517] tracking-tight">
              7. Propiedad Intelectual de Logotipos y Diseños Suministrados
            </h2>
            <p>
              El cliente declara ser el titular legítimo o contar con la debida autorización de uso sobre las marcas, logotipos, imágenes y diseños que suministre a Maranatha para la elaboración de sus productos. Maranatha no se hace responsable por infracciones a derechos de autor derivadas de archivos provistos directamente por el usuario.
            </p>
          </section>

        </article>

        {/* Retorno a Inicio o Catálogo */}
        <div className="mt-12 pt-8 border-t border-gray-200/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#7E04A1]">
          <Link to="/" className="hover:underline">
            ← Volver a la página principal
          </Link>
          <Link to="/politica-de-privacidad" className="hover:underline">
            Ver Política de Privacidad →
          </Link>
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
