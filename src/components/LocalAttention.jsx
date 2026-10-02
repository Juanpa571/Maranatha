import React, { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { MessageCircle } from 'lucide-react';

const STICKY_NOTES = [
  {
    id: 'asesoria',
    image: '/purple-note.webp',
    alt: 'Atención 1 a 1: Asesoría de persona a persona',
    position: '-top-3 -left-2 sm:-top-5 sm:-left-4 lg:-top-5 lg:-left-5 xl:-top-7 xl:-left-7',
    width: 'w-[47%] xs:w-[45%] sm:w-[38%] md:w-[32%] lg:w-[28.5%] xl:w-[27.5%] max-w-[340px]',
  },
  {
    id: 'taller',
    image: '/pink-note.webp',
    alt: 'Hecho en Cali: Taller propio en Cali con diseño y producción artesanal',
    position: '-top-3 -right-2 sm:-top-5 sm:-right-4 lg:-top-5 lg:-right-5 xl:-top-7 xl:-right-7',
    width: 'w-[47%] xs:w-[45%] sm:w-[38%] md:w-[32%] lg:w-[28.5%] xl:w-[27.5%] max-w-[340px]',
  },
  {
    id: 'muestras',
    image: '/blue-note.webp',
    alt: 'Revisión y muestras previas: Validamos juntos antes de mandar a producción',
    position: '-bottom-3 -left-2 sm:-bottom-5 sm:-left-4 lg:-bottom-5 lg:-left-5 xl:-bottom-7 xl:-left-7',
    width: 'w-[47%] xs:w-[45%] sm:w-[38%] md:w-[32%] lg:w-[28.5%] xl:w-[27.5%] max-w-[340px]',
  },
  {
    id: 'entregas',
    image: '/green-note.webp',
    alt: 'Entregas ágiles y cuidadosas: Domicilios directos en Cali y despachos a toda Colombia',
    position: '-bottom-3 -right-2 sm:-bottom-5 sm:-right-4 lg:-bottom-5 lg:-right-5 xl:-bottom-7 xl:-right-7',
    width: 'w-[47%] xs:w-[45%] sm:w-[38%] md:w-[32%] lg:w-[28.5%] xl:w-[27.5%] max-w-[340px]',
  },
];

export default function LocalAttention() {
  const [headerState, setHeaderState] = useState('below'); // 'below' | 'visible' | 'above'
  const [visualState, setVisualState] = useState('below'); // 'below' | 'visible' | 'above'
  const headerRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const checkPosition = () => {
      const windowH = window.innerHeight;
      const enterThreshold = windowH * 0.88;

      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        const headerThreshold = window.innerWidth < 768 ? 240 : 320;
        let newHeaderState = 'visible';
        if (headerRect.top > enterThreshold) {
          newHeaderState = 'below';
        } else if (visualRef.current && visualRef.current.getBoundingClientRect().top <= headerThreshold) {
          newHeaderState = 'above';
        }
        setHeaderState((prev) => (prev !== newHeaderState ? newHeaderState : prev));
      }

      if (visualRef.current) {
        const visualRect = visualRef.current.getBoundingClientRect();
        const visualThreshold = window.innerWidth < 768 ? 200 : 280;
        let newVisualState = 'visible';
        if (visualRect.top > enterThreshold) {
          newVisualState = 'below';
        } else if (visualRect.bottom <= visualThreshold) {
          newVisualState = 'above';
        }
        setVisualState((prev) => (prev !== newVisualState ? newVisualState : prev));
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
    encodeURIComponent('Hola Maranatha 👋, me gustaría recibir asesoría personalizada para un pedido en Cali.');

  return (
    <section
      id="atencion-local"
      data-theme="light"
      data-theme-color="#FAF8FD"
      className="relative w-full px-4 sm:px-8 md:px-[6vw] lg:px-[8.5%] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 bg-[#FAF8FD] border-t border-gray-200/80 overflow-hidden font-peridot"
    >
      {/* 1. Ola orgánica decorativa estilo Voldog en tono lila suave de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg
          className="absolute -top-[15%] -left-[10%] w-[130%] h-[130%] opacity-40 md:opacity-55 transform -rotate-2"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 280C220 180 480 420 820 310C1160 200 1340 380 1560 300L1560 920L-100 920Z"
            fill="url(#organicWaveGrad)"
          />
          <defs>
            <linearGradient id="organicWaveGrad" x1="0" y1="200" x2="1440" y2="800" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5EDFC" />
              <stop offset="50%" stopColor="#EDE0FA" />
              <stop offset="100%" stopColor="#FAF4FD" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 w-full">
        {/* Encabezado Asimétrico Playful Monumental con aparición suave en scroll-down y scroll-up */}
        <div
          ref={headerRef}
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-14 sm:mb-20 md:mb-24 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            headerState === 'below'
              ? 'opacity-0 translate-y-8 pointer-events-none'
              : headerState === 'above'
              ? 'opacity-0 -translate-y-8 pointer-events-none scale-[0.98]'
              : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          }`}
        >
          <div className="relative pt-6 sm:pt-8 md:pt-10">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[66px] font-bold tracking-tight text-[#141517] leading-[1.10]">
              Taller de papelería en Cali:{' '}
              <br />
              <span className="text-[#7E04A1]">
                asesoría personalizada
              </span>
              <span className="inline-block align-middle ml-2 pointer-events-none">
                <img src="/faq-rays-clean.webp" alt="" width="24" height="24" loading="lazy" decoding="async" className="w-5 h-5 sm:w-6 sm:h-6 object-contain inline-block transform rotate-12 opacity-85" />
              </span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-2">
            <p className="text-base sm:text-lg md:text-xl text-[#2B2B2E] font-medium leading-relaxed">
              Atención de persona a persona por WhatsApp sin bots fríos. Te asesoramos directamente desde nuestro taller en Cali para dar vida a cada detalle (pedidos 100% online con envíos o recogida previa).
            </p>
          </div>
        </div>

        {/* 2. Contenedor de la Foto Panorámica con Cuadritos de Texto Flotantes */}
        <div
          ref={visualRef}
          className={`relative w-full max-w-6xl xl:max-w-7xl mx-auto transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visualState === 'below'
              ? 'opacity-0 translate-y-12 sm:translate-y-16 scale-[0.96] pointer-events-none'
              : visualState === 'above'
              ? 'opacity-0 -translate-y-8 pointer-events-none scale-[0.98]'
              : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          }`}
        >
          
          {/* FOTO PANORÁMICA CENTRAL CON MÁXIMA PRESENCIA CINEMATOGRÁFICA */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-[24px] sm:rounded-[38px] md:rounded-[48px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06),0_24px_65px_rgba(126,4,161,0.08)] bg-white group">
            <img
              src="/espacio-trabajo.webp"
              alt="Espacio de trabajo y taller de Maranatha Papelería en Cali"
              width="1200"
              height="675"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transform-gpu will-change-transform transition-transform duration-1000 ease-out sm:group-hover:scale-[1.03]"
              draggable={false}
            />

            {/* Sutil viñeta perimetral para realzar el contraste de las esquinas */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />
          </div>

          {/* 3. NOTITAS ADHESIVAS OFICIALES EN LAS 4 ESQUINAS (SOLO EN DESKTOP LG+, OCULTAS EN MÓVIL) */}
          {STICKY_NOTES.map((note) => (
            <div
              key={note.id}
              className={`hidden lg:block absolute ${note.position} ${note.width} z-20 hover:z-30 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 ease-out cursor-pointer group select-none`}
            >
              <img
                src={note.image}
                alt={note.alt}
                width="1024"
                height="681"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-sm"
                draggable={false}
              />
            </div>
          ))}

        </div>

        {/* 4. Botón de Llamado a la Acción Directo por WhatsApp con Garabatos Artesanales */}
        <div className="mt-10 sm:mt-14 text-center">
          <div className="relative inline-flex flex-col sm:flex-row items-center justify-center">
            {/* Flechita manuscrita que apunta al botón */}
            <div className="hidden md:flex items-center gap-2 absolute -left-28 lg:-left-32 top-1/2 -translate-y-1/2 pointer-events-none select-none">
              <span className="font-['Patrick_Hand',cursive] text-lg text-[#7E04A1] font-bold tracking-wide transform -rotate-[8deg]">
                ¡escríbenos!
              </span>
              <img
                src="/faq-arrow-clean.webp"
                alt=""
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
                className="w-12 h-auto object-contain transform -rotate-[10deg] opacity-85"
              />
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#7E04A1] hover:bg-[#680385] text-white font-semibold text-sm sm:text-base shadow-[0_10px_30px_rgba(126,4,161,0.30)] hover:shadow-[0_16px_40px_rgba(126,4,161,0.40)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 group"
            >
              {/* Rayitas en la esquina del botón */}
              <div className="absolute -top-3 -right-2 sm:-top-3.5 sm:-right-2.5 pointer-events-none">
                <img src="/faq-rays-clean.webp" alt="" width="24" height="24" loading="lazy" decoding="async" className="w-5 h-5 sm:w-6 sm:h-6 object-contain transform rotate-12 opacity-85" />
              </div>

              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Hablar por WhatsApp con nosotras</span>
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-3 font-light">
            Respuesta habitual en menos de 15 minutos en horario de atención.
          </p>
        </div>

      </div>
    </section>
  );
}
