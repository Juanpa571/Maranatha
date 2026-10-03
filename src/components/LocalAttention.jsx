import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function LocalAttention() {
  const whatsappUrl =
    'https://wa.me/573145854213?text=' +
    encodeURIComponent('Hola Maranatha 👋, me gustaría recibir asesoría personalizada para un pedido en Cali.');

  return (
    <section
      id="atencion-local"
      data-theme="light"
      data-theme-color="#FAF8FD"
      className="relative w-full min-h-screen px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-[100px] pb-12 sm:pb-16 bg-[#FAF8FD] border-t border-gray-200/80 font-peridot transition-colors flex flex-col justify-center overflow-hidden"
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

      <div className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col justify-center gap-7 sm:gap-9 md:gap-11 lg:gap-13">
        {/* Encabezado Asimétrico - Mismas márgenes exactas de la sección superior */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-extrabold tracking-tight text-[#141517] leading-[1.12]">
              Taller de papelería en Cali:{' '}
              <br className="hidden sm:inline" />
              <span className="text-[#7E04A1]">asesoría personalizada</span>
            </h2>
          </div>

          <div className="border-l-2 border-gray-200/90 pl-5 sm:pl-7 max-w-md shrink-0 lg:pb-1">
            <p className="text-sm sm:text-[15px] lg:text-base text-[#4A4B53] font-medium leading-relaxed">
              Atención de persona a persona por WhatsApp sin bots fríos. Te asesoramos directamente desde nuestro taller en Cali para dar vida a cada detalle (pedidos 100% online con envíos o recogida previa).
            </p>
          </div>
        </div>

        {/* 2. Foto Panorámica del Taller con Encuadre Cinematográfico Completo */}
        <div className="relative w-full aspect-[1875/839] max-h-[500px] rounded-[24px] sm:rounded-[32px] md:rounded-[38px] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.06),0_20px_55px_rgba(126,4,161,0.08)] bg-white border border-gray-100">
          <img
            src="/espacio-creativo-pastel.png"
            alt="Espacio creativo pastel junto a la ventana - Taller de Maranatha Papelería en Cali"
            width="1875"
            height="839"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transform-gpu will-change-transform"
            draggable={false}
          />
        </div>

        {/* 3. Botón de Llamado a la Acción Directo por WhatsApp */}
        <div className="text-center flex flex-col items-center justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#7E04A1] hover:bg-[#680385] text-white font-bold text-sm sm:text-base shadow-[0_8px_25px_rgba(126,4,161,0.30)] hover:shadow-[0_14px_35px_rgba(126,4,161,0.40)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Hablar por WhatsApp</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs sm:text-[13px] leading-relaxed text-gray-500 mt-2.5 font-normal">
            Respuesta habitual en menos de 15 minutos en horario de atención.
          </p>
        </div>
      </div>
    </section>
  );
}
