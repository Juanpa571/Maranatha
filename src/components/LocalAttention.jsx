import React from 'react';
import { MessageCircle, ArrowRight, Check } from 'lucide-react';

export default function LocalAttention() {
  const whatsappUrl =
    'https://wa.me/573145854213?text=' +
    encodeURIComponent('Hola Maranatha 👋, me gustaría recibir asesoría personalizada para un pedido en Cali.');

  return (
    <section
      id="atencion-local"
      data-theme="light"
      data-theme-color="#ffffff"
      className="relative w-full min-h-[100dvh] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-[110px] sm:pt-[125px] md:pt-[140px] pb-16 sm:pb-20 md:pb-24 lg:pb-28 bg-[#DBC9DF]/15 border-t border-gray-200/80 font-peridot transition-colors flex flex-col justify-center overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* 1. Ola orgánica decorativa estilo Voldog en tono lila suave de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
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
              <stop offset="0%" stopColor="#E7D1FF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#DBC9DF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Contenedor estándar unificado con toda la web (max-w-[1400px]) */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center text-left">
          
          {/* Columna Izquierda: Información, beneficios y CTA juntos */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Título Principal */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-extrabold tracking-tight text-[#141517] leading-[1.12]">
                Taller de papelería en Cali:{' '}
                <br className="hidden sm:inline" />
                <span className="text-[#7E04A1]">asesoría personalizada</span>
              </h2>

              <p className="text-sm sm:text-base lg:text-[17px] text-[#4A4B53] font-medium leading-relaxed max-w-xl">
                Atención directa de persona a persona por WhatsApp sin bots fríos. Te asesoramos paso a paso desde nuestro taller en Cali para dar vida a cada detalle de tus empaques y celebraciones.
              </p>
            </div>

            {/* Beneficios en viñetas limpias con espaciado amplio */}
            <ul className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2 text-xs sm:text-sm lg:text-[15px] font-semibold text-[#141517]">
              <li className="flex items-start gap-3 sm:gap-3.5">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#DBC9DF]/20 border border-[#DBC9DF] text-[#7E04A1] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </span>
                <span className="leading-snug">
                  Envíos directos a domicilio en Cali y despachos asegurados a todo el país.
                </span>
              </li>

              <li className="flex items-start gap-3 sm:gap-3.5">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#DBC9DF]/20 border border-[#DBC9DF] text-[#7E04A1] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </span>
                <span className="leading-snug">
                  Opción de recogida en taller coordinando cita previa por WhatsApp.
                </span>
              </li>

              <li className="flex items-start gap-3 sm:gap-3.5">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#DBC9DF]/20 border border-[#DBC9DF] text-[#7E04A1] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </span>
                <span className="leading-snug">
                  Muestras y previsualización digital previa antes de imprimir o troquelar.
                </span>
              </li>
            </ul>

            {/* CTA directo */}
            <div className="pt-2 sm:pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#7E04A1] hover:brightness-95 text-white font-bold text-sm sm:text-base shadow-[0_8px_25px_rgba(126,4,161,0.30)] hover:shadow-[0_14px_35px_rgba(126,4,161,0.40)] transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] group cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Hablar por WhatsApp</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-xs sm:text-[13px] text-gray-500 mt-2.5 font-normal">
                Respuesta habitual en menos de 15 minutos en horario hábil.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Foto del Taller en proporción 3:4 con altura hacia los polos */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] lg:max-w-none aspect-[3/4] rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden shadow-[0_16px_45px_rgba(126,4,161,0.12),0_4px_16px_rgba(0,0,0,0.04)] bg-white border border-[#DBC9DF] group">
              <img
                src="/vertical-taller.webp"
                alt="Taller creativo de Maranatha Papelería en Cali"
                width="1086"
                height="1448"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transform-gpu will-change-transform transition-transform duration-700 group-hover:scale-[1.02]"
                draggable={false}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
