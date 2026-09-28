import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Scissors,
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
    icon: Scissors,
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
  const [openIndex, setOpenIndex] = useState(null); // Todas las pestañas cerradas por defecto
  const [leftColState, setLeftColState] = useState('below'); // 'below' | 'visible' | 'above'
  const [accordionState, setAccordionState] = useState('below'); // 'below' | 'visible' | 'above'
  const [supportState, setSupportState] = useState('below'); // 'below' | 'visible' | 'above'
  const leftColRef = useRef(null);
  const accordionRef = useRef(null);
  const supportRef = useRef(null);

  const toggleAccordion = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    const checkPosition = () => {
      const windowH = window.innerHeight;
      const enterThreshold = windowH * 0.88;

      if (leftColRef.current) {
        const leftRect = leftColRef.current.getBoundingClientRect();
        const leftThreshold = window.innerWidth < 768 ? 200 : 280;
        let newLeftState = 'visible';
        if (leftRect.top > enterThreshold) {
          newLeftState = 'below';
        } else if (leftRect.bottom <= leftThreshold) {
          newLeftState = 'above';
        }
        setLeftColState((prev) => (prev !== newLeftState ? newLeftState : prev));
      }

      if (accordionRef.current) {
        const accRect = accordionRef.current.getBoundingClientRect();
        const accThreshold = window.innerWidth < 768 ? 200 : 280;
        let newAccState = 'visible';
        if (accRect.top > enterThreshold) {
          newAccState = 'below';
        } else if (accRect.bottom <= accThreshold) {
          newAccState = 'above';
        }
        setAccordionState((prev) => (prev !== newAccState ? newAccState : prev));
      }

      if (supportRef.current) {
        const supRect = supportRef.current.getBoundingClientRect();
        const supThreshold = window.innerWidth < 768 ? 160 : 220;
        let newSupState = 'visible';
        if (supRect.top > enterThreshold) {
          newSupState = 'below';
        } else if (supRect.bottom <= supThreshold) {
          newSupState = 'above';
        }
        setSupportState((prev) => (prev !== newSupState ? newSupState : prev));
      }
    };

    let unsubLenis = null;
    const subscribeLenis = (lenisInstance) => {
      if (unsubLenis) return;
      unsubLenis = lenisInstance.on('scroll', checkPosition);
      checkPosition();
    };

    if (window.lenis) {
      subscribeLenis(window.lenis);
    } else {
      window.addEventListener('lenis-init', (e) => subscribeLenis(e.detail), { once: true });
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', checkPosition);
    checkPosition();

    return () => {
      if (unsubLenis) unsubLenis();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkPosition);
    };
  }, []);

  const whatsappUrl =
    'https://wa.me/573145854213?text=' +
    encodeURIComponent('Hola Maranatha 👋, tengo una duda sobre un pedido personalizado y quisiera recibir asesoría.');

  // Marcado estructurado Schema.org FAQPage para Google y motores de IA (AEO)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="preguntas-frecuentes"
      data-theme="light"
      data-theme-color="#FBF8FE"
      className="relative w-full border-t border-[#E8DAF7] px-4 sm:px-6 md:px-[4.5vw] lg:px-[5.5%] pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-28 bg-[#FBF8FE] font-peridot overflow-hidden"
    >
      {/* Ancla alternativa #faq para compatibilidad de enlaces */}
      <span id="faq" className="absolute top-0 pointer-events-none" />
      {/* Marcado Schema.org JSON-LD para AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Línea divisoria arquitectónica de transición superior: oculta en móvil, preservada intacta en PC */}
      <div className="hidden lg:block w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-8 sm:mb-12 pointer-events-none">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7E04A1]/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-start">
          
          {/* ============================================================== */}
          {/* COLUMNA IZQUIERDA: TITULARES Y NOTAS ADHESIVAS REALES          */}
          {/* ============================================================== */}
          <div
            ref={leftColRef}
            className={`lg:col-span-5 flex flex-col justify-start transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              leftColState === 'below'
                ? 'opacity-0 translate-y-12 sm:translate-y-16 scale-[0.97] pointer-events-none'
                : leftColState === 'above'
                ? 'opacity-0 -translate-y-8 pointer-events-none scale-[0.98]'
                : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            }`}
          >
            
            {/* Header: Dudas resueltas (ligeramente torcido) + Rayitas + Corazón exacto */}
            <div className="relative flex items-center justify-between w-full max-w-[420px] mb-2">
              <div className="inline-flex items-center gap-1.5 transform -rotate-[5deg] origin-bottom-left">
                <span className="font-['Patrick_Hand',cursive] text-2xl sm:text-[27px] text-[#7E04A1] font-bold tracking-wide">
                  Dudas resueltas
                </span>
                <img
                  src="/faq-rays-clean.webp"
                  alt=""
                  width="20"
                  height="20"
                  loading="lazy"
                  decoding="async"
                  className="w-5 h-5 object-contain pointer-events-none -mt-1"
                />
              </div>

              {/* Corazón dibujado a mano exacto de la imagen */}
              <div className="pr-4 sm:pr-8">
                <img
                  src="/faq-heart.webp"
                  alt=""
                  width="32"
                  height="32"
                  loading="lazy"
                  decoding="async"
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain pointer-events-none opacity-90 transform -rotate-6"
                />
              </div>
            </div>

            {/* Titular Monumental */}
            <h2 className="text-4xl sm:text-[45px] lg:text-[46px] xl:text-[50px] font-extrabold tracking-tight text-[#141517] leading-[1.08]">
              Preguntas frecuentes:{' '}
              <br />
              <span className="text-[#7E04A1]">resolvemos tus dudas.</span>
            </h2>

            {/* Subtítulo explicativo */}
            <p className="text-sm sm:text-[14.5px] text-[#55555C] font-normal leading-relaxed mt-3.5 sm:mt-4 max-w-sm">
              Desde cantidades mínimas hasta diseño, materiales y entregas. Aquí encontrarás todo lo que necesitas saber antes de empezar.
            </p>

            {/* CONTENEDOR DE LAS 2 NOTITAS ADHESIVAS: OCULTAS EN MÓVIL, ORIGINAL INTACTO EN PC */}
            <div className="hidden lg:block relative mt-8 sm:mt-10 w-full max-w-[480px]">
              
              {/* NOTA 1: MORADA (SUPERIOR) - INTERACTIVA INDEPENDIENTE */}
              <div className="relative z-10 w-[92%] sm:w-[90%] transform -rotate-[2deg] hover:rotate-0 hover:-translate-y-2 hover:scale-[1.02] hover:z-30 transition-all duration-300 ease-out cursor-pointer group">
                <img
                  src="/purple-note.webp"
                  alt="Asesoría de persona a persona"
                  width="1024"
                  height="682"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain select-none"
                  draggable={false}
                />
              </div>

              {/* NOTA 2: ROSA (INFERIOR) - INTERACTIVA INDEPENDIENTE, SUPERPUESTA A LA DERECHA */}
              <div className="relative z-20 w-[92%] sm:w-[90%] ml-[8%] sm:ml-[10%] -mt-[18%] sm:-mt-[20%] transform rotate-[1.5deg] hover:rotate-0 hover:-translate-y-2 hover:scale-[1.02] hover:z-30 transition-all duration-300 ease-out cursor-pointer group">
                <img
                  src="/pink-note.webp"
                  alt="Taller propio en Cali"
                  width="1024"
                  height="681"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain select-none"
                  draggable={false}
                />
              </div>

            </div>

          </div>

          {/* ============================================================== */}
          {/* COLUMNA DERECHA: TODAS LAS PESTAÑAS PEGADAS EN UN SOLO BLOQUE  */}
          {/* ============================================================== */}
          <div
            ref={accordionRef}
            className={`lg:col-span-7 flex flex-col relative pt-1 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              accordionState === 'below'
                ? 'opacity-0 translate-y-12 sm:translate-y-16 scale-[0.97] pointer-events-none'
                : accordionState === 'above'
                ? 'opacity-0 -translate-y-8 pointer-events-none scale-[0.98]'
                : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            }`}
          >
            
            {/* Rayitas doodle en la esquina superior derecha */}
            <div className="absolute -top-3.5 right-2 hidden sm:block pointer-events-none">
              <img src="/faq-rays-clean.webp" alt="" className="w-6 h-5 object-contain opacity-80" />
            </div>

            {/* UN ÚNICO BLOQUE MAESTRO CON TODAS LAS 8 PREGUNTAS PEGADAS CON DIVIDE-Y */}
            <div className="rounded-[26px] sm:rounded-[28px] bg-white border border-[#F0E6FA] shadow-[0_6px_25px_rgba(126,4,161,0.04)] divide-y divide-[#F0E6FA] overflow-hidden">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                const IconComponent = item.icon;

                return (
                  <div key={item.index} className="w-full bg-white transition-colors duration-200">
                    <button
                      type="button"
                      id={`faq-btn-${item.index}`}
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.index}`}
                      className="w-full px-5 sm:px-6 py-4 sm:py-4.5 flex items-center justify-between gap-3 sm:gap-4 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E04A1] focus-visible:ring-offset-2 rounded-2xl transition-all"
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                        {/* Número morado en negrita grande (01..08) */}
                        <span className="shrink-0 text-xl sm:text-[22px] font-extrabold text-[#7E04A1] w-8 sm:w-9 text-left">
                          {item.index}
                        </span>

                        {/* Icono temático en cajita cuadrada lila redondeada */}
                        <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-[13px] bg-[#FAF5FE] border border-[#EBD6FA] text-[#7E04A1] flex items-center justify-center transition-colors group-hover:bg-[#EFE3FB]" aria-hidden="true">
                          <IconComponent className="w-5 h-5" />
                        </div>

                        {/* Pregunta en texto firme y legible */}
                        <h3 className="font-bold text-[15.5px] sm:text-[17px] text-[#141517] tracking-tight leading-snug group-hover:text-[#7E04A1] transition-colors pr-2 flex-1">
                          {item.question}
                        </h3>
                      </div>

                      {/* Botón circular con + o − (sólido morado cuando está abierto) */}
                      <div
                        aria-hidden="true"
                        className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isOpen
                            ? 'bg-[#7E04A1] text-white border border-[#7E04A1] shadow-[0_2px_8px_rgba(126,4,161,0.25)]'
                            : 'bg-[#FAF5FE] border border-[#EBD6FA] text-[#7E04A1] group-hover:bg-[#7E04A1] group-hover:text-white group-hover:border-[#7E04A1]'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                        )}
                      </div>
                    </button>

                    {/* Contenedor desplegable con animación fluida y línea morada izquierda */}
                    <div
                      id={`faq-answer-${item.index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.index}`}
                      aria-hidden={!isOpen}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 sm:px-6 pb-5 pt-0">
                          <div className="border-l-[3px] border-[#7E04A1] pl-5 ml-11 sm:ml-13 p-4 sm:p-5 rounded-2xl bg-[#FAF6FD] text-xs sm:text-[13.5px] md:text-sm text-[#444448] font-normal leading-relaxed">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BANNER INFERIOR "¿No encontraste lo que buscabas?" */}
            <div
              ref={supportRef}
              className={`mt-5 rounded-[26px] bg-[#F5EDFC]/80 border border-[#EBD6FA] px-5 sm:px-6 py-4 sm:py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative shadow-[0_4px_18px_rgba(126,4,161,0.04)] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                supportState === 'below'
                  ? 'opacity-0 translate-y-8 pointer-events-none'
                  : supportState === 'above'
                  ? 'opacity-0 -translate-y-8 pointer-events-none scale-[0.98]'
                  : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              }`}
            >
              
              <div className="flex items-center gap-3 sm:gap-3.5">
                {/* Icono de burbuja de diálogo oficial limpio */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
                  <img
                    src="/faq-bubble-clean.webp"
                    alt=""
                    width="40"
                    height="40"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <p className="text-xs sm:text-[13px] text-[#55555C] font-normal leading-none">
                    ¿No encontraste lo que buscabas?
                  </p>
                  <p className="font-['Patrick_Hand',cursive] text-lg sm:text-[21px] text-[#7E04A1] font-bold leading-tight mt-1">
                    Hablemos, nos encantará ayudarte.
                  </p>
                </div>

                {/* Flecha curva doodle oficial con espiral apuntando al botón */}
                <div className="hidden md:flex items-center pl-2 pr-1 shrink-0">
                  <img
                    src="/faq-arrow-clean.webp"
                    alt=""
                    width="80"
                    height="36"
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-8 sm:w-20 sm:h-9 object-contain"
                  />
                </div>
              </div>

              {/* Botón de WhatsApp con rayitas doodle */}
              <div className="relative shrink-0">
                <div className="absolute -top-3.5 -right-2 hidden sm:block pointer-events-none">
                  <img src="/faq-rays-clean.webp" alt="" width="20" height="20" loading="lazy" decoding="async" className="w-5 h-5 object-contain" />
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hablar por WhatsApp para resolver dudas adicionales"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-2xl bg-[#7E04A1] hover:bg-[#680385] text-white font-bold text-xs sm:text-sm shadow-[0_6px_20px_rgba(126,4,161,0.3)] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
                >
                  <MessageCircle className="w-4.5 h-4.5 fill-current shrink-0" />
                  <span>Hablar por WhatsApp</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
