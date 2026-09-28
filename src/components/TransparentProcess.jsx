import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function TransparentProcess() {
  const [headerState, setHeaderState] = useState('below'); // 'below' | 'visible' | 'above'
  const [stagesState, setStagesState] = useState('below'); // 'below' | 'visible' | 'above'
  const [ctaState, setCtaState] = useState('below');       // 'below' | 'visible' | 'above'
  const headerRef = useRef(null);
  const stagesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const checkPositions = () => {
      const windowH = window.innerHeight;
      const enterThreshold = windowH * 0.88;

      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        const headerThreshold = window.innerWidth < 768 ? 240 : 320;
        let newHeaderState = 'visible';
        if (headerRect.top > enterThreshold) {
          newHeaderState = 'below';
        } else if (stagesRef.current && stagesRef.current.getBoundingClientRect().top <= headerThreshold) {
          newHeaderState = 'above';
        }
        setHeaderState((prev) => (prev !== newHeaderState ? newHeaderState : prev));
      }

      if (stagesRef.current) {
        const stagesRect = stagesRef.current.getBoundingClientRect();
        const stagesThreshold = window.innerWidth < 768 ? 200 : 280;
        let newStagesState = 'visible';
        if (stagesRect.top > enterThreshold) {
          newStagesState = 'below';
        } else if (stagesRect.bottom <= stagesThreshold) {
          newStagesState = 'above';
        }
        setStagesState((prev) => (prev !== newStagesState ? newStagesState : prev));
      }

      if (ctaRef.current) {
        const ctaRect = ctaRef.current.getBoundingClientRect();
        const ctaThreshold = window.innerWidth < 768 ? 160 : 220;
        let newCtaState = 'visible';
        if (ctaRect.top > enterThreshold) {
          newCtaState = 'below';
        } else if (ctaRect.bottom <= ctaThreshold) {
          newCtaState = 'above';
        }
        setCtaState((prev) => (prev !== newCtaState ? newCtaState : prev));
      }
    };

    let unsubLenis = null;
    const subscribeLenis = (lenisInstance) => {
      if (unsubLenis) return;
      unsubLenis = lenisInstance.on('scroll', checkPositions);
      checkPositions();
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
          checkPositions();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', checkPositions);
    checkPositions();

    return () => {
      if (unsubLenis) unsubLenis();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkPositions);
    };
  }, []);

  const whatsappUrl =
    'https://wa.me/573145854213?text=' +
    encodeURIComponent('Hola Maranatha 👋, me gustaría cotizar e iniciar un pedido con ustedes.');

  return (
    <section
      id="proceso"
      data-theme="light"
      data-theme-color="#FAF8FD"
      className="relative w-full px-4 sm:px-8 md:px-[6vw] lg:px-[8.5%] pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-28 bg-[#FAF8FD] border-t border-gray-200/80 overflow-hidden font-peridot"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* 1. TÍTULO PRINCIPAL DE LA SECCIÓN */}
        <div
          ref={headerRef}
          className={`relative z-20 w-full mb-12 sm:mb-16 md:mb-20 flex justify-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            headerState === 'below'
              ? 'opacity-0 translate-y-8 pointer-events-none'
              : headerState === 'above'
              ? 'opacity-0 -translate-y-8 pointer-events-none scale-[0.98]'
              : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          }`}
        >
          <div className="text-center max-w-2xl mx-auto relative">
            {/* Corazón doodle flotante */}
            <div className="absolute -top-3.5 left-2 sm:left-8 pointer-events-none transform -rotate-12 opacity-85">
              <img src="/faq-heart.webp" alt="" width="24" height="24" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-bold tracking-tight text-[#141517] leading-[1.15]">
              Cómo trabajamos:{' '}
              <br />
              <span className="text-[#7E04A1]">diseño, aprobación previa</span>{' '}
              y entrega sin mínimos
              <span className="inline-block align-middle ml-2 pointer-events-none">
                <img src="/faq-rays-clean.webp" alt="" className="w-5 h-5 sm:w-6 sm:h-6 object-contain inline-block transform rotate-12 opacity-85" />
              </span>
            </h2>
          </div>
        </div>

        {/* 2. ESCENARIO DE LAS 3 FASES FÍSICAS EN PARALELO (TODO VISIBLE AL TIEMPO) */}
        <div
          ref={stagesRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-end max-w-6xl mx-auto transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            stagesState === 'below'
              ? 'opacity-0 translate-y-12 sm:translate-y-16 scale-[0.96] pointer-events-none'
              : stagesState === 'above'
              ? 'opacity-0 -translate-y-8 scale-[0.98] pointer-events-none'
              : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          }`}
        >
          {/* ============================================================== */}
          {/* FASE 01: BOCETO Y NOTAS                                        */}
          {/* ============================================================== */}
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4 select-none">
              <span className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#7E04A1] tracking-tight leading-none shrink-0">
                01
              </span>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-bold text-[#141517] tracking-tight whitespace-nowrap">
                Cuéntanos tu idea
              </h3>
            </div>

            <div className="relative w-full max-w-[420px] mx-auto md:mx-0">
              <img
                src="/escritorio/fase-01.webp"
                alt="Fase 01 - Cuéntanos tu idea"
                width="420"
                height="350"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain select-none transform transition-transform duration-500 hover:scale-[1.02]"
                draggable={false}
              />
            </div>
          </div>

          {/* ============================================================== */}
          {/* FASE 02: TELÉFONO WHATSAPP CON APROBACIÓN                      */}
          {/* ============================================================== */}
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4 select-none">
              <span className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#7E04A1] tracking-tight leading-none shrink-0">
                02
              </span>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-bold text-[#141517] tracking-tight whitespace-nowrap">
                Aprobación previa
              </h3>
            </div>

            <div className="relative w-full max-w-[280px] sm:max-w-[300px] mx-auto">
              {/* Burbujita doodle artesanal flotando sobre el teléfono */}
              <div className="absolute -top-3.5 -right-2 sm:-top-5 sm:-right-4 z-20 pointer-events-none transform rotate-12">
                <img
                  src="/faq-bubble-clean.webp"
                  alt=""
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_3px_8px_rgba(126,4,161,0.25)]"
                />
              </div>

              <img
                src="/escritorio/fase-02.webp"
                alt="Fase 02 - Aprobación previa"
                width="300"
                height="420"
                loading="lazy"
                decoding="async"
                className="w-full max-h-[380px] sm:max-h-[420px] h-auto object-contain select-none mx-auto transform transition-transform duration-500 hover:scale-[1.02]"
                draggable={false}
              />
            </div>
          </div>

          {/* ============================================================== */}
          {/* FASE 03: PRODUCTO FÍSICO TERMINADO                             */}
          {/* ============================================================== */}
          <div className="flex flex-col items-center md:items-end w-full">
            <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4 select-none">
              <span className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#7E04A1] tracking-tight leading-none shrink-0">
                03
              </span>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-bold text-[#141517] tracking-tight whitespace-nowrap">
                Producción y entrega
              </h3>
            </div>

            <div className="relative w-full max-w-[420px] mx-auto md:mx-0">
              <img
                src="/escritorio/fase-03.webp"
                alt="Fase 03 - Producción y entrega"
                width="420"
                height="350"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain select-none transform transition-transform duration-500 hover:scale-[1.02]"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* 3. FASE FINAL EDITORIAL + LLAMADO A LA ACCIÓN A WHATSAPP */}
        <div
          ref={ctaRef}
          className={`w-full max-w-6xl mx-auto pt-8 sm:pt-10 md:pt-12 mt-12 sm:mt-16 md:mt-20 border-t border-[#7E04A1]/12 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            ctaState === 'below'
              ? 'opacity-0 translate-y-8 pointer-events-none'
              : ctaState === 'above'
              ? 'opacity-0 -translate-y-8 scale-[0.98] pointer-events-none'
              : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          }`}
        >
          {/* Texto editorial de cierre */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#141517] tracking-tight">
              De la idea a tus manos.
            </h4>
            <p className="text-xs sm:text-sm text-[#444448] font-normal mt-0.5">
              Cada pedido pasa por nuestras manos antes de llegar a las tuyas.
            </p>
          </div>

          {/* CTA directo a WhatsApp */}
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-xs sm:text-sm md:text-base text-[#141517] font-medium hidden md:inline-block">
              ¿Listo para empezar tu idea?
            </span>
            <div className="relative inline-flex items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-[#7E04A1] hover:bg-[#680385] text-white font-bold text-xs sm:text-sm md:text-base shadow-[0_10px_30px_rgba(126,4,161,0.30)] hover:shadow-[0_14px_40px_rgba(126,4,161,0.40)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer relative"
              >
                {/* Rayitas arriba del botón */}
                <div className="absolute -top-2.5 -right-2 pointer-events-none">
                  <img
                    src="/faq-rays-clean.webp"
                    alt=""
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain transform rotate-12 opacity-85"
                  />
                </div>

                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
                <span>Hablar por WhatsApp</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
