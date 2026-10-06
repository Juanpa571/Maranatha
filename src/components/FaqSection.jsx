import React, { useState, useCallback } from 'react';
import {
  Package,
  Clock,
  Image as ImageIcon,
  Palette,
  Truck,
  ShieldCheck,
  CreditCard,
  Wand2,
  Plus,
  Minus,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    index: '01',
    icon: Package,
    question: '¿Cuál es la cantidad mínima para hacer un pedido?',
    answer:
      'La cantidad mínima depende del producto que elijas: en papelería para eventos y fiestas trabajamos desde 10 a 20 unidades, y en la línea empresarial (tarjetas de presentación, etiquetas para ropa y volantes) desde solo 50 unidades. Sin mínimos de miles como en litografías industriales.',
  },
  {
    index: '02',
    icon: Clock,
    question: '¿Cuánto tiempo tarda en estar listo mi pedido?',
    answer:
      'La papelería para eventos y fiestas suele tomar de 2 a 3 días hábiles. Para pedidos de marcas y emprendedores (stickers, etiquetas y tarjetas) el tiempo habitual es de 3 a 6 días hábiles a partir de la aprobación final del diseño.',
  },
  {
    index: '03',
    icon: ImageIcon,
    question: '¿Cómo sé cómo quedará mi diseño antes de que lo impriman?',
    answer:
      'Antes de cortar o imprimir cualquier pieza, te enviamos una previsualización o muestra digital por WhatsApp para que revises con calma ortografía, textos, medidas y colores. Es el momento clave para corregir cualquier detalle, ya que pasamos a producción únicamente con tu visto bueno final.',
  },
  {
    index: '04',
    icon: Palette,
    question: '¿Qué pasa si no tengo un diseño listo o solo tengo mi logo en una imagen?',
    answer:
      'No te preocupes, te ayudamos con eso. Recibimos tu logo o diseño en formato PNG, JPG, PDF o enlace de Canva, y lo adaptamos al tamaño de tu empaque o producto. Si tu archivo necesita ajustes básicos de corte, lo preparamos con gusto; y si requiere redibujar o vectorizar el logo desde cero, te avisamos previamente con el valor adicional correspondiente. Para eventos, también te asesoramos con la temática.',
  },
  {
    index: '05',
    icon: Truck,
    question: '¿Tienen tienda física o cómo se realizan las entregas en Cali y Colombia?',
    answer:
      'Operamos como taller creativo de producción bajo pedido: no disponemos de tienda comercial abierta al público ni atención por mostrador. Toda la atención, cotización y diseño se gestiona de forma ágil y personalizada por WhatsApp. Para entregas en Cali puedes recibir por mensajería local rápida a tu puerta o recoger tu pedido en nuestro taller coordinando previamente la cita por WhatsApp. Para el resto de Colombia realizamos envíos seguros con guía de seguimiento por Interrapidísimo.',
  },
  {
    index: '06',
    icon: ShieldCheck,
    question: '¿Qué tipo de materiales utilizan para los stickers y cajas?',
    answer:
      'Trabajamos con papel e impresión de alta calidad. Para los stickers disponemos de tres tipos de materiales con diferentes niveles de resistencia (desde acabados estándar hasta opciones resistentes al frío y a la humedad), según el producto y empaque donde los vayas a usar. Para las cajas y papelería estructural utilizamos cartulinas especiales de alto gramaje (220g a 300g) para que queden firmes y duraderas.',
  },
  {
    index: '07',
    icon: CreditCard,
    question: '¿Cómo se realiza el pago de mi pedido?',
    answer:
      'Al ser productos 100% personalizados, iniciamos el trabajo de diseño y producción con un anticipo del 50%, y el 50% restante se cancela contra entrega en Cali o previo al despacho nacional. Aceptamos transferencias por Bancolombia, Nequi, Daviplata o PSE.',
  },
  {
    index: '08',
    icon: Wand2,
    question: '¿Puedo pedir una temática, forma o medida que no esté en la página web?',
    answer:
      '¡Claro que sí! Todo lo que ves en nuestro catálogo es una referencia de lo que podemos crear. Fabricamos tamaños especiales, cortes con siluetas exclusivas y temáticas para cualquier tipo de celebración o empaque comercial.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const whatsappUrl =
    'https://wa.me/573145854213?text=' +
    encodeURIComponent('Hola Maranatha 👋, tengo una duda sobre un pedido personalizado y quisiera recibir asesoría.');

  return (
    <section
      id="preguntas-frecuentes"
      data-theme="light"
      data-theme-color="#ffffff"
      className="relative w-full min-h-[100dvh] flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-[100px] pb-12 sm:pb-16 bg-[#ffffff] border-t border-[#DBC9DF] font-peridot overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Ancla alternativa #faq para compatibilidad de enlaces */}
      <span id="faq" className="absolute top-0 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center lg:items-start">
          
          {/* ============================================================== */}
          {/* COLUMNA IZQUIERDA: TEXTOS EDITORIALES                         */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:self-start text-left lg:pt-1 xl:pt-2">
            
            {/* Titular */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-extrabold tracking-tight text-[#141517] leading-[1.08]">
              Preguntas Frecuentes:{' '}
              <br />
              Resolvemos todas <br className="hidden sm:inline" />
              <span className="text-[#7E04A1]">tus dudas</span>
            </h2>

            {/* Subtítulo descriptivo */}
            <p className="text-sm sm:text-[15px] md:text-base text-[#55555C] font-normal leading-relaxed mt-4 sm:mt-5 max-w-md">
              Desde cantidades mínimas hasta materiales y entregas. Aquí encontrarás todo lo que necesitas saber antes de hacer tu pedido.
            </p>

            {/* Elemento decorativo 3D para móvil y tablet: entrando desde el borde izquierdo */}
            <div
              aria-hidden="true"
              className="block lg:hidden relative mt-6 -ml-4 sm:-ml-6 md:-ml-10 w-[310px] sm:w-[370px] md:w-[430px] pointer-events-none select-none"
            >
              {/* Luz ambiental difusa suave detrás de la composición */}
              <div className="absolute -bottom-6 -left-6 w-full h-full max-w-[400px] max-h-[300px] bg-gradient-to-tr from-[#DBC9DF]/40 via-[#E7D1FF]/20 to-transparent rounded-full blur-2xl -z-10" />

              <img
                src="/papeleria-plataforma-lila.webp"
                alt="Composición 3D editorial de papelería pastel sobre plataforma lila con flores secas, libros y cintas washi"
                width="1536"
                height="1024"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain drop-shadow-[0_14px_32px_rgba(116,5,159,0.06)]"
                draggable={false}
              />
            </div>

          </div>

          {/* ============================================================== */}
          {/* COLUMNA DERECHA: ACORDEÓN DE PREGUNTAS + BANNER WHATSAPP       */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col relative">
            
            {/* Contenedor tipo tarjeta blanca estilizada con esquinas redondeadas */}
            <div className="rounded-[24px] sm:rounded-[28px] bg-white border border-[#DBC9DF] shadow-[0_8px_32px_rgba(126,4,161,0.04)] divide-y divide-[#DBC9DF]/30 overflow-hidden">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                const IconComponent = item.icon;

                return (
                  <div key={item.index} className="w-full bg-white transition-colors duration-150">
                    <button
                      type="button"
                      id={`faq-btn-${item.index}`}
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.index}`}
                      className="w-full px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E04A1] transition-all"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        {/* Número morado claro 01..08 */}
                        <span className="shrink-0 text-xs sm:text-sm font-bold text-[#7E04A1] w-5 sm:w-6 text-left">
                          {item.index}
                        </span>

                        {/* Icono temático dentro de cajita redondeada violeta muy suave */}
                        <div
                          className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-[11px] bg-[#DBC9DF]/20 border border-[#DBC9DF] text-[#7E04A1] flex items-center justify-center transition-colors group-hover:bg-[#E7D1FF]/30"
                          aria-hidden="true"
                        >
                          <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
                        </div>

                        {/* Texto de la pregunta */}
                        <h3 className="font-semibold text-xs sm:text-[14px] md:text-[15px] text-[#141517] leading-snug group-hover:text-[#7E04A1] transition-colors pr-2 flex-1">
                          {item.question}
                        </h3>
                      </div>

                      {/* Icono + o − a la derecha en violeta */}
                      <div
                        aria-hidden="true"
                        className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[#7E04A1] group-hover:scale-110 transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                        ) : (
                          <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                        )}
                      </div>
                    </button>

                    {/* Respuesta expandible */}
                    <div
                      id={`faq-answer-${item.index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.index}`}
                      aria-hidden={!isOpen}
                      className={`grid transition-[grid-template-rows,opacity] ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100 duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
                          : 'grid-rows-[0fr] opacity-0 duration-[200ms] ease-out'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 sm:px-6 pb-4 pt-1">
                          <div className="pl-0 sm:pl-[4.2rem] pr-2 sm:pr-6">
                            <p className="text-xs sm:text-[13.5px] text-[#55555C] font-normal leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contacto directo "¿No encuentras lo que buscas?" sin cápsulas */}
            <div className="mt-4 sm:mt-5 px-2 sm:px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
              <div>
                <p className="text-[11px] sm:text-xs text-[#55555C] font-normal leading-none">
                  ¿No encuentras lo que buscas?
                </p>
                <p className="text-xs sm:text-[14px] md:text-[15px] text-[#7E04A1] font-bold leading-tight mt-1.5">
                  Hablemos, nos encantará ayudarte.
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hablar por WhatsApp para resolver dudas adicionales"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7E04A1] hover:brightness-90 transition-colors group py-1"
                >
                  <MessageCircle className="w-4 h-4 fill-[#7E04A1] text-[#7E04A1] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="underline decoration-[#7E04A1]/40 hover:decoration-[#7E04A1] underline-offset-4">
                    Hablar por WhatsApp
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* ELEMENTO DECORATIVO 3D: ESQUINA INFERIOR IZQUIERDA DE SECCIÓN   */}
      {/* Composición editorial integrada entrando desde el borde izquierdo*/}
      {/* ============================================================== */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute bottom-0 -left-8 lg:-left-12 xl:-left-14 2xl:-left-16 pointer-events-none select-none z-0 w-[640px] lg:w-[760px] xl:w-[900px] 2xl:w-[1040px] max-w-none"
      >
        {/* Luz ambiental difusa suave de estudio pastel */}
        <div className="absolute -bottom-12 -left-12 w-full h-full max-w-[800px] lg:max-w-[900px] xl:max-w-[1000px] max-h-[650px] bg-gradient-to-tr from-[#DBC9DF]/40 via-[#E7D1FF]/20 to-transparent rounded-full blur-3xl -z-10" />

        {/* Composición 3D recortada por overflow-hidden en el borde del viewport */}
        <img
          src="/papeleria-plataforma-lila.webp"
          alt="Composición 3D editorial de papelería pastel sobre plataforma lila con flores secas, libros y cintas washi"
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-contain drop-shadow-[0_20px_42px_rgba(116,5,159,0.07)] transform translate-y-[2px]"
          draggable={false}
        />
      </div>
    </section>
  );
}
