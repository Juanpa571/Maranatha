import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function TransparentProcess() {
  const whatsappUrl =
    'https://wa.me/573145854213?text=' +
    encodeURIComponent('Hola Maranatha 👋, me gustaría cotizar e iniciar un pedido con ustedes.');

  return (
    <section
      id="proceso"
      data-theme="light"
      data-theme-color="#FAF8FD"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-[85px] sm:pt-[95px] pb-16 sm:pb-20 bg-[#FAF8FD] font-peridot overflow-hidden text-center"
    >
      {/* ============================================================== */}
      {/* OLAS DECORATIVAS ORGÁNICAS (CALCADAS DE LA PREVISUALIZACIÓN)   */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* 1. Ola lateral izquierda (forma curva orgánica pura) */}
          <path
            d="M-80,-20 C80,90 140,240 100,420 C50,600 -20,740 -90,850 L-90,-20 Z"
            fill="#F4E6F8"
            fillOpacity="0.65"
          />
          {/* Línea curva tenue que abraza la ola izquierda */}
          <path
            d="M-40,80 C120,180 180,320 140,490 C100,640 20,770 -50,860"
            stroke="#E3BEF0"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* 2. Ola lateral derecha (forma elíptica orgánica) */}
          <path
            d="M1520,60 C1340,160 1260,340 1330,560 C1390,720 1470,820 1540,920 L1540,60 Z"
            fill="#F4E6F8"
            fillOpacity="0.65"
          />
          {/* Línea curva tenue superior que entra desde la derecha */}
          <path
            d="M1490,-30 C1380,100 1320,240 1360,400 C1400,540 1470,660 1530,760"
            stroke="#E3BEF0"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.75"
          />
          {/* Trazo inferior suave en el cuadrante inferior derecho */}
          <path
            d="M1360,670 C1410,740 1460,820 1510,880"
            stroke="#EBD1F4"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col justify-between items-center relative z-10">
        
        {/* ============================================================== */}
        {/* 1. ENCABEZADO DE LA SECCIÓN                                    */}
        {/* ============================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-2 sm:mb-4 shrink-0">
          {/* Eyebrow / Tag */}
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-[#A78BFA] mb-1.5 sm:mb-2 block">
            NUESTRO PROCESO
          </span>

          {/* Titular Principal */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold tracking-tight text-[#141517] leading-[1.12]">
            Cómo trabajamos:{' '}
            <br className="hidden sm:inline" />
            <span className="text-[#74059F]">diseño, aprobación previa</span>{' '}
            <br className="hidden sm:inline" />
            y entrega sin mínimos
          </h2>

          {/* Subtítulo con margen despegado del titular */}
          <p className="text-xs sm:text-sm md:text-base text-[#55555C] font-normal leading-relaxed mt-4 sm:mt-6 max-w-xl mx-auto">
            De tu idea a tus manos. Un proceso simple, rápido y personalizado.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 2. ETAPAS 01, 02 Y 03 EN PARALELO - IMÁGENES PROTAGÓNICAS      */}
        {/* ============================================================== */}
        <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-10 items-center relative flex-1 my-auto py-2">
          
          {/* FASE 01: CUÉNTANOS TU IDEA */}
          <div className="flex flex-col items-center text-left w-full relative">
            {/* Header de la etapa: 01 + Título y descripción alineada */}
            <div className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[440px] mb-3 sm:mb-4 flex justify-start">
              <div className="inline-flex items-start gap-3 text-left">
                <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#D5B8F6] leading-none shrink-0">
                  01
                </span>
                <div className="inline-flex flex-col items-start max-w-[190px] sm:max-w-[210px] md:max-w-[220px]">
                  <h3 className="text-sm sm:text-base lg:text-[18px] font-extrabold text-[#141517] leading-snug">
                    Cuéntanos tu idea
                  </h3>
                  <p className="text-xs text-[#55555C] leading-snug mt-1">
                    Nos cuentas qué necesitas, compartes referencias y definimos los detalles.
                  </p>
                </div>
              </div>
            </div>

            {/* Ilustración / Cuaderno con boceto (PROTAGÓNICA) */}
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[440px] h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] flex items-center justify-center">
              <img
                src="/escritorio/proceso-01-cuaderno.webp"
                alt="Fase 01 - Cuéntanos tu idea en cuaderno con boceto"
                width="951"
                height="773"
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full w-auto h-auto object-contain select-none pointer-events-none drop-shadow-[0_16px_36px_rgba(116,5,159,0.10)] transform hover:scale-[1.03] transition-transform duration-300"
                draggable={false}
              />
            </div>

            {/* Flecha conectora a la fase 2 (visible solo en desktop) */}
            <div className="hidden md:flex absolute -right-4 lg:-right-6 top-[62%] transform -translate-y-1/2 text-[#D5B8F6] z-10 pointer-events-none">
              <ArrowRight className="w-7 h-7 stroke-[2]" />
            </div>
          </div>

          {/* FASE 02: APROBACIÓN PREVIA */}
          <div className="flex flex-col items-center text-left w-full relative">
            {/* Header de la etapa: 02 + Título y descripción alineada */}
            <div className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[440px] mb-3 sm:mb-4 flex justify-start">
              <div className="inline-flex items-start gap-3 text-left">
                <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#D5B8F6] leading-none shrink-0">
                  02
                </span>
                <div className="inline-flex flex-col items-start max-w-[190px] sm:max-w-[210px] md:max-w-[220px]">
                  <h3 className="text-sm sm:text-base lg:text-[18px] font-extrabold text-[#141517] leading-snug">
                    Aprobación previa
                  </h3>
                  <p className="text-xs text-[#55555C] leading-snug mt-1">
                    Te enviamos una vista previa de tu diseño para que lo revises y nos des el visto bueno.
                  </p>
                </div>
              </div>
            </div>

            {/* Ilustración / Celular WhatsApp (PROTAGÓNICA) */}
            <div className="relative w-full max-w-[240px] sm:max-w-[270px] lg:max-w-[290px] h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] flex items-center justify-center">
              <img
                src="/escritorio/proceso-02-telefono.webp"
                alt="Fase 02 - Aprobación previa en WhatsApp"
                width="489"
                height="936"
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full w-auto h-auto object-contain select-none pointer-events-none drop-shadow-[0_18px_40px_rgba(116,5,159,0.14)] transform hover:scale-[1.03] transition-transform duration-300"
                draggable={false}
              />
            </div>

            {/* Flecha conectora a la fase 3 (visible solo en desktop) */}
            <div className="hidden md:flex absolute -right-4 lg:-right-6 top-[62%] transform -translate-y-1/2 text-[#D5B8F6] z-10 pointer-events-none">
              <ArrowRight className="w-7 h-7 stroke-[2]" />
            </div>
          </div>

          {/* FASE 03: PRODUCCIÓN Y ENTREGA */}
          <div className="flex flex-col items-center text-left w-full relative">
            {/* Header de la etapa: 03 + Título y descripción alineada */}
            <div className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[440px] mb-3 sm:mb-4 flex justify-start">
              <div className="inline-flex items-start gap-3 text-left">
                <span className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#D5B8F6] leading-none shrink-0">
                  03
                </span>
                <div className="inline-flex flex-col items-start max-w-[200px] sm:max-w-[220px] md:max-w-[230px]">
                  <h3 className="text-sm sm:text-base lg:text-[18px] font-extrabold text-[#141517] leading-snug">
                    Producción y entrega
                  </h3>
                  <p className="text-xs text-[#55555C] leading-snug mt-1">
                    Fabricamos tu pedido con los mejores materiales y te lo enviamos a donde estés.
                  </p>
                </div>
              </div>
            </div>

            {/* Ilustración / Caja lista con accesorios (PROTAGÓNICA) */}
            <div className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[460px] h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] flex items-center justify-center">
              <img
                src="/escritorio/proceso-03-caja.webp"
                alt="Fase 03 - Producción y entrega de caja finalizada con accesorios"
                width="1013"
                height="634"
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full w-auto h-auto object-contain select-none pointer-events-none drop-shadow-[0_16px_36px_rgba(116,5,159,0.10)] transform hover:scale-[1.03] transition-transform duration-300"
                draggable={false}
              />
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* 3. CTA INFERIOR LIMPIO (SIN CÁPSULAS BLANCA NI MORADA)         */}
        {/* ============================================================== */}
        <div className="mt-3 sm:mt-5 flex items-center justify-center gap-2 sm:gap-3 text-center shrink-0">
          <span className="text-xs sm:text-sm md:text-base text-[#55555C] font-normal">
            ¿Listo para empezar tu idea?
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hablar por WhatsApp para empezar tu idea"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm md:text-base text-[#74059F] hover:text-[#5c037e] font-bold underline decoration-[#74059F]/40 hover:decoration-[#74059F] underline-offset-4 transition-colors group"
          >
            <span>Hablar por WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
