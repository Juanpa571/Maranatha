import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Headset, MapPin, Truck } from 'lucide-react';

export default function FinalCta() {
  const [sectionState, setSectionState] = useState('below'); // 'below' | 'visible' | 'above'
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkPosition = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;
        const enterThreshold = windowH * 0.88;
        const exitThreshold = window.innerWidth < 768 ? 200 : 280;

        let state = 'visible';
        if (rect.top > enterThreshold) {
          state = 'below';
        } else if (rect.bottom <= exitThreshold) {
          state = 'above';
        }
        setSectionState((prev) => (prev !== state ? state : prev));
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
        });
        ticking = false;
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

  const defaultWhatsappUrl =
    'https://wa.me/573145854213?text=' +
    encodeURIComponent('Hola Maranatha 👋, tengo una idea para mi marca / evento y quiero que la hagamos realidad.');

  return (
    <section
      ref={sectionRef}
      id="contacto"
      data-theme="light"
      data-theme-color="#F6F0FC"
      className="relative z-20 w-full min-h-[85vh] lg:min-h-[96vh] flex flex-col justify-center px-4 sm:px-6 md:px-[3.5vw] lg:px-[4.5%] py-16 sm:py-32 md:py-36 lg:py-44 bg-[#F6F0FC] font-peridot overflow-x-clip text-center"
    >
      {/* ============================================================== */}
      {/* ELEMENTOS DECORATIVOS PERIFÉRICOS (ESCALADOS Y POSICIONADOS)   */}
      {/* ============================================================== */}
      <div
        className={`absolute inset-0 pointer-events-none transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          sectionState === 'below'
            ? 'opacity-0 scale-95 translate-y-6'
            : sectionState === 'above'
            ? 'opacity-0 scale-95 -translate-y-6'
            : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        {/* 1. Tabla de corte lila con flor (Esquina superior izquierda) */}
        <div className="absolute -top-8 xs:-top-10 sm:-top-16 md:-top-20 lg:-top-24 -left-8 xs:-left-10 sm:-left-12 md:-left-16 lg:-left-20 w-[135px] xs:w-[160px] sm:w-[320px] md:w-[27vw] lg:w-[25vw] max-w-[480px] pointer-events-none select-none z-10">
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

        {/* 2. Nota adhesiva rosa 'Atención 1 a 1' (Lateral izquierdo: solo en desktop lg+ para evitar colisiones en móvil) */}
        <div className="hidden lg:block absolute lg:top-[31%] lg:left-[4vw] xl:left-[5vw] lg:w-[18vw] max-w-[340px] pointer-events-none select-none z-10">
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
          {/* Rayitas doodle debajo de la nota */}
          <img
            src="/faq-rays-clean.webp"
            alt=""
            width="28"
            height="28"
            loading="lazy"
            decoding="async"
            className="absolute -bottom-7 sm:-bottom-9 left-12 sm:left-16 md:left-20 w-6 h-6 sm:w-7 sm:h-7 object-contain pointer-events-none transform rotate-90 opacity-80"
          />
        </div>

        {/* 3. Cuaderno espiral unicornio + marcador morado (Esquina inferior izquierda) */}
        <div className="absolute -bottom-8 xs:-bottom-10 sm:-bottom-16 md:-bottom-20 lg:-bottom-24 -left-8 xs:-left-10 sm:-left-12 md:-left-16 lg:-left-20 w-[145px] xs:w-[170px] sm:w-[360px] md:w-[31vw] lg:w-[28vw] max-w-[540px] pointer-events-none select-none z-10">
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
        <div className="absolute -top-8 xs:-top-10 sm:-top-18 md:-top-24 lg:-top-28 -right-8 xs:-right-10 sm:-right-12 md:-right-16 lg:-right-20 w-[140px] xs:w-[165px] sm:w-[340px] md:w-[29vw] lg:w-[27vw] max-w-[520px] pointer-events-none select-none z-10">
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

        {/* 5. Nota adhesiva crema 'Hecho en Cali' con tijeras (Lateral derecho: solo en desktop lg+ para evitar colisiones en móvil) */}
        <div className="hidden lg:block absolute lg:top-[35%] lg:right-[4vw] xl:right-[5vw] lg:w-[18vw] max-w-[340px] pointer-events-none select-none z-10">
          {/* Corazón doodle encima de la nota */}
          <img
            src="/faq-heart.webp"
            alt=""
            width="32"
            height="32"
            loading="lazy"
            decoding="async"
            className="absolute -top-7 sm:-top-8 right-12 sm:right-16 md:right-20 w-6 h-6 sm:w-8 sm:h-8 object-contain pointer-events-none transform rotate-12 opacity-85"
          />
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
          {/* Rayitas doodle a la derecha */}
          <img
            src="/faq-rays-clean.webp"
            alt=""
            width="28"
            height="28"
            loading="lazy"
            decoding="async"
            className="absolute top-10 sm:top-12 -right-4 sm:-right-6 md:-right-7 w-6 h-6 sm:w-7 sm:h-7 object-contain pointer-events-none transform rotate-12 opacity-80"
          />
          {/* Rayitas doodle debajo */}
          <img
            src="/faq-rays-clean.webp"
            alt=""
            width="28"
            height="28"
            loading="lazy"
            decoding="async"
            className="absolute -bottom-7 sm:-bottom-9 right-12 sm:right-16 md:right-20 w-6 h-6 sm:w-7 sm:h-7 object-contain pointer-events-none transform rotate-90 opacity-80"
          />
        </div>

        {/* 6. Rollos de cinta washi sobre cartulinas (Esquina inferior derecha) */}
        <div className="absolute -bottom-8 xs:-bottom-10 sm:-bottom-12 md:-bottom-18 lg:-bottom-20 -right-8 xs:-right-10 sm:-right-12 md:-right-16 lg:-right-20 w-[140px] xs:w-[165px] sm:w-[330px] md:w-[28vw] lg:w-[26vw] max-w-[500px] pointer-events-none select-none z-10">
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
      {/* CONTENIDO CENTRAL (GRANDE, MONUMENTAL Y PROTAGÓNICO)          */}
      {/* ============================================================== */}
      <div
        className={`max-w-4xl xl:max-w-5xl mx-auto relative z-20 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          sectionState === 'below'
            ? 'opacity-0 translate-y-12 sm:translate-y-16 scale-[0.97] pointer-events-none'
            : sectionState === 'above'
            ? 'opacity-0 -translate-y-8 pointer-events-none scale-[0.98]'
            : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
        }`}
      >
        {/* Rótulo superior: Estamos en el taller 3D Ilustrado */}
        <div className="inline-block mb-2 sm:mb-5 relative select-none">
          <img
            src="/seccion-final/estamos-en-el-taller.webp"
            alt="Estamos en el taller"
            width="430"
            height="144"
            loading="lazy"
            decoding="async"
            className="w-[220px] xs:w-[260px] sm:w-[350px] md:w-[400px] lg:w-[430px] h-auto object-contain mx-auto pointer-events-none drop-shadow-[0_8px_24px_rgba(126,4,161,0.14)]"
            draggable={false}
          />
        </div>

        {/* Titular Principal Monumental */}
        <h2 className="text-[32px] xs:text-4xl sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[86px] font-extrabold tracking-tight text-[#141517] leading-[1.12] sm:leading-[1.10]">
          <span className="relative inline-block">
            {/* Rayitas doodle a la izquierda del titular */}
            <img
              src="/faq-rays-clean.webp"
              alt=""
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
              className="hidden sm:block absolute top-2 sm:top-3 md:top-4 -left-10 sm:-left-12 md:-left-16 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain pointer-events-none transform -rotate-45 opacity-85"
            />
            ¿Tienes una idea?
          </span>{' '}
          <br />
          <span className="inline-flex items-baseline flex-wrap justify-center gap-x-2 sm:gap-x-4 md:gap-x-5">
            <span>Hagámosla</span>
            <span className="relative inline-block align-baseline">
              <img
                src="/final-cta-realidad.webp"
                alt="realidad."
                width="160"
                height="48"
                loading="lazy"
                decoding="async"
                className="inline-block h-[1.12em] sm:h-[1.16em] md:h-[1.20em] xl:h-[1.24em] w-auto align-baseline select-none pointer-events-none transform translate-y-[0.14em]"
              />
            </span>
          </span>
        </h2>

        {/* Subtítulo Conversacional amplio en 2 líneas */}
        <p className="text-[15px] sm:text-xl md:text-2xl lg:text-[23px] text-[#55555C] font-normal leading-relaxed mt-4 sm:mt-8 max-w-2xl lg:max-w-3xl mx-auto px-1 sm:px-0">
          Cuéntanos qué necesitas y te ayudamos
          <br className="hidden sm:inline" />{' '}
          a definir cada detalle antes de producirlo.
        </p>

        {/* Botón Principal Púrpura de WhatsApp Monumental */}
        <div className="mt-7 sm:mt-12 md:mt-14 flex items-center justify-center">
          <a
            href={defaultWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-[320px] sm:max-w-none px-6 sm:px-12 md:px-14 py-4 sm:py-5 md:py-6 rounded-full bg-[#74059F] hover:bg-[#620387] text-white font-bold text-[16px] sm:text-xl md:text-[22px] shadow-[0_14px_36px_rgba(116,5,159,0.34)] hover:shadow-[0_20px_48px_rgba(116,5,159,0.48)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 group mx-auto"
          >
            <svg
              className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-current shrink-0 transform group-hover:scale-110 transition-transform duration-300"
              viewBox="0 0 24 24"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.134 8.134 0 0 1-1.25-4.38c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39a8.106 8.106 0 0 1 2.39 5.77c0 4.51-3.66 8.16-8.16 8.16zm4.47-6.11c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
            </svg>
            <span>Hablar por WhatsApp</span>
            <ArrowRight className="w-4.5 h-4.5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0 transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Barra de 3 Beneficios / Confianza */}
        <div className="mt-8 sm:mt-18 md:mt-22 grid grid-cols-3 sm:flex sm:items-center sm:justify-center gap-2 xs:gap-3 sm:gap-8 md:gap-12 lg:gap-16 max-w-sm sm:max-w-none mx-auto">
          {/* Beneficio 1: Atención 1 a 1 */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-4">
            <Headset className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#74059F] stroke-[2] shrink-0" />
            <div className="flex flex-col text-[11px] xs:text-xs sm:text-base md:text-lg text-[#141517] leading-tight">
              <span className="font-normal text-[#55555C]">Atención</span>
              <span className="font-bold text-[#141517]">1 a 1</span>
            </div>
          </div>

          {/* Divisor vertical */}
          <div className="h-8 sm:h-10 w-px bg-[#D9CBE8] hidden sm:block" />

          {/* Beneficio 2: Hecho en Cali */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-4">
            <MapPin className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#74059F] stroke-[2] shrink-0" />
            <div className="flex flex-col text-[11px] xs:text-xs sm:text-base md:text-lg text-[#141517] leading-tight">
              <span className="font-normal text-[#55555C]">Hecho en</span>
              <span className="font-bold text-[#141517]">Cali</span>
            </div>
          </div>

          {/* Divisor vertical */}
          <div className="h-8 sm:h-10 w-px bg-[#D9CBE8] hidden sm:block" />

          {/* Beneficio 3: Envíos a toda Colombia */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-4">
            <Truck className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#74059F] stroke-[2] shrink-0" />
            <div className="flex flex-col text-[11px] xs:text-xs sm:text-base md:text-lg text-[#141517] leading-tight">
              <span className="font-normal text-[#55555C]">Envíos a</span>
              <span className="font-bold text-[#141517]">toda Colombia</span>
            </div>
          </div>
        </div>

        {/* Telemetría honesta del taller */}
        <p className="text-xs sm:text-base md:text-[17px] text-[#666670] font-normal mt-7 sm:mt-12 md:mt-14 max-w-sm sm:max-w-none mx-auto leading-relaxed">
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
