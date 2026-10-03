import React from 'react';
import { ArrowRight, Headset, MapPin, Truck } from 'lucide-react';

export default function FinalCta() {
  const defaultWhatsappUrl =
    'https://wa.me/573145854213?text=' +
    encodeURIComponent('Hola Maranatha 👋, tengo una idea para mi marca / evento y quiero que la hagamos realidad.');

  return (
    <section
      id="contacto"
      data-theme="light"
      data-theme-color="#F6F0FC"
      className="relative z-20 w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-[100px] pb-12 sm:pb-16 bg-[#F6F0FC] font-peridot overflow-hidden text-center"
    >
      {/* ============================================================== */}
      {/* ELEMENTOS DECORATIVOS PERIFÉRICOS (ESTÁTICOS Y COMPACTOS)      */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* 1. Tabla de corte lila con flor (Esquina superior izquierda) */}
        <div className="absolute -top-6 sm:-top-10 md:-top-14 lg:-top-16 -left-6 sm:-left-10 md:-left-12 lg:-left-14 w-[110px] sm:w-[190px] md:w-[220px] lg:w-[260px] pointer-events-none select-none z-10 opacity-70 sm:opacity-90">
          <img
            src="/seccion-final/cutting-mat.webp"
            alt=""
            width="480"
            height="480"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* 2. Nota adhesiva rosa 'Atención 1 a 1' (Lateral izquierdo: desktop lg+) */}
        <div className="hidden xl:block absolute top-[36%] left-[3vw] 2xl:left-[4vw] w-[180px] 2xl:w-[210px] pointer-events-none select-none z-10">
          <img
            src="/seccion-final/note-atencion.webp"
            alt="Atención 1 a 1"
            width="340"
            height="340"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* 3. Cuaderno espiral unicornio + marcador morado (Esquina inferior izquierda) */}
        <div className="absolute -bottom-6 sm:-bottom-10 md:-bottom-14 lg:-bottom-16 -left-6 sm:-left-10 md:-left-12 lg:-left-14 w-[120px] sm:w-[200px] md:w-[240px] lg:w-[280px] pointer-events-none select-none z-10 opacity-70 sm:opacity-90">
          <img
            src="/seccion-final/notebook.webp"
            alt=""
            width="540"
            height="540"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* 4. Foto Polaroid taller con washi tape gingham y corazón (Esquina superior derecha) */}
        <div className="absolute -top-6 sm:-top-10 md:-top-14 lg:-top-16 -right-6 sm:-right-10 md:-right-12 lg:-right-14 w-[115px] sm:w-[190px] md:w-[220px] lg:w-[260px] pointer-events-none select-none z-10 opacity-70 sm:opacity-90">
          <img
            src="/seccion-final/polaroid.webp"
            alt=""
            width="520"
            height="520"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* 5. Nota adhesiva crema 'Hecho en Cali' con tijeras (Lateral derecho: desktop lg+) */}
        <div className="hidden xl:block absolute top-[36%] right-[3vw] 2xl:right-[4vw] w-[180px] 2xl:w-[210px] pointer-events-none select-none z-10">
          <img
            src="/seccion-final/note-cali.webp"
            alt="Hecho en Cali"
            width="340"
            height="340"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* 6. Rollos de cinta washi sobre cartulinas (Esquina inferior derecha) */}
        <div className="absolute -bottom-6 sm:-bottom-10 md:-bottom-12 lg:-bottom-14 -right-6 sm:-right-10 md:-right-12 lg:-right-14 w-[115px] sm:w-[190px] md:w-[220px] lg:w-[260px] pointer-events-none select-none z-10 opacity-70 sm:opacity-90">
          <img
            src="/seccion-final/washi-sheets.webp"
            alt=""
            width="500"
            height="500"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain"
            draggable={false}
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* CONTENIDO CENTRAL (EQUILIBRADO A 1 PANTALLA)                   */}
      {/* ============================================================== */}
      <div className="max-w-[1400px] mx-auto w-full relative z-20 flex flex-col justify-center items-center my-auto py-4">
        {/* Rótulo superior: Estamos en el taller 3D Ilustrado */}
        <div className="inline-block mb-3 sm:mb-4 select-none">
          <img
            src="/seccion-final/estamos-en-el-taller.webp"
            alt="Estamos en el taller"
            width="430"
            height="144"
            loading="lazy"
            decoding="async"
            className="w-[170px] sm:w-[210px] md:w-[240px] lg:w-[270px] h-auto object-contain mx-auto pointer-events-none drop-shadow-[0_4px_16px_rgba(126,4,161,0.12)]"
            draggable={false}
          />
        </div>

        {/* Titular Principal */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[54px] font-extrabold tracking-tight text-[#141517] leading-[1.12] max-w-4xl mx-auto">
          <span className="relative inline-block">
            {/* Rayitas doodle a la izquierda del titular */}
            <img
              src="/faq-rays-clean.webp"
              alt=""
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
              className="hidden md:block absolute top-1 -left-10 lg:-left-12 w-7 h-7 lg:w-8 lg:h-8 object-contain pointer-events-none transform -rotate-45 opacity-85"
            />
            ¿Tienes una idea para tu evento o marca?
          </span>{' '}
          <br className="hidden xs:inline" />
          <span className="inline-flex items-baseline flex-wrap justify-center gap-x-2 sm:gap-x-3.5">
            <span>Hagámosla</span>
            <span className="relative inline-block align-baseline">
              <img
                src="/final-cta-realidad.webp"
                alt="realidad."
                width="160"
                height="48"
                loading="lazy"
                decoding="async"
                className="inline-block h-[1.1em] sm:h-[1.14em] md:h-[1.16em] w-auto align-baseline select-none pointer-events-none transform translate-y-[0.12em]"
              />
            </span>
          </span>
        </h2>

        {/* Subtítulo Conversacional */}
        <p className="text-sm sm:text-base md:text-lg text-[#55555C] font-normal leading-relaxed mt-3 sm:mt-4 max-w-xl mx-auto px-2">
          Cuéntanos qué necesitas y te ayudamos a definir cada detalle antes de producirlo.
        </p>

        {/* Botón Principal Púrpura de WhatsApp */}
        <div className="mt-5 sm:mt-7 flex items-center justify-center w-full">
          <a
            href={defaultWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hablar por WhatsApp para iniciar tu pedido o proyecto"
            className="inline-flex items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto max-w-[280px] sm:max-w-none px-6 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#74059F] hover:bg-[#620387] text-white font-bold text-sm sm:text-base shadow-[0_10px_25px_rgba(116,5,159,0.30)] hover:shadow-[0_16px_36px_rgba(116,5,159,0.42)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 group mx-auto"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-white text-white shrink-0 transform group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.134 8.134 0 0 1-1.25-4.38c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39a8.106 8.106 0 0 1 2.39 5.77c0 4.51-3.66 8.16-8.16 8.16zm4.47-6.11c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
            </svg>
            <span>Hablar por WhatsApp</span>
            <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Barra de 3 Beneficios / Confianza */}
        <div className="mt-7 sm:mt-10 grid grid-cols-3 sm:flex sm:items-center sm:justify-center gap-2 xs:gap-3 sm:gap-8 md:gap-12 max-w-sm sm:max-w-none mx-auto">
          {/* Beneficio 1: Atención 1 a 1 */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-3">
            <Headset className="w-5 h-5 sm:w-6 sm:h-6 text-[#74059F] stroke-[2] shrink-0" />
            <div className="flex flex-col text-[11px] sm:text-xs md:text-sm text-[#141517] leading-tight">
              <span className="font-normal text-[#55555C]">Atención</span>
              <span className="font-bold text-[#141517]">1 a 1</span>
            </div>
          </div>

          {/* Divisor vertical */}
          <div className="h-6 sm:h-7 w-px bg-[#D9CBE8] hidden sm:block" />

          {/* Beneficio 2: Hecho en Cali */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-3">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#74059F] stroke-[2] shrink-0" />
            <div className="flex flex-col text-[11px] sm:text-xs md:text-sm text-[#141517] leading-tight">
              <span className="font-normal text-[#55555C]">Hecho en</span>
              <span className="font-bold text-[#141517]">Cali</span>
            </div>
          </div>

          {/* Divisor vertical */}
          <div className="h-6 sm:h-7 w-px bg-[#D9CBE8] hidden sm:block" />

          {/* Beneficio 3: Envíos a toda Colombia */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-3">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#74059F] stroke-[2] shrink-0" />
            <div className="flex flex-col text-[11px] sm:text-xs md:text-sm text-[#141517] leading-tight">
              <span className="font-normal text-[#55555C]">Envíos a</span>
              <span className="font-bold text-[#141517]">toda Colombia</span>
            </div>
          </div>
        </div>

        {/* Telemetría honesta del taller */}
        <p className="text-[11px] sm:text-xs md:text-sm text-[#666670] font-normal mt-6 sm:mt-8 max-w-sm sm:max-w-none mx-auto leading-relaxed">
          Atención de lunes a viernes (09:00 – 18:00) en Cali • WhatsApp oficial:{' '}
          <a href="https://wa.me/573145854213" target="_blank" rel="noopener noreferrer" className="text-[#141517] font-bold hover:text-[#7E04A1] transition-colors">
            +57 314 5854213
          </a>{' '}
          • Correo:{' '}
          <a href="mailto:hola@maranathapapeleria.com" className="text-[#7E04A1] font-semibold hover:underline">
            hola@maranathapapeleria.com
          </a>
        </p>
      </div>
    </section>
  );
}
