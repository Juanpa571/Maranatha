import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CATEGORIES = [
  {
    slug: 'papeleria-creativa',
    title: 'Papelería Creativa',
    image: '/categoria-creativa-limpia.png',
    alt: 'Papelería Creativa',
    delay: '0ms',
  },
  {
    slug: 'insumos',
    title: 'Insumos de Papelería',
    image: '/categoria-insumos-limpia.png',
    alt: 'Insumos de Papelería',
    delay: '150ms',
  },
  {
    slug: 'papeleria-empresarial',
    title: 'Papelería Empresarial',
    image: '/categoria-empresarial-limpia.png',
    alt: 'Papelería Empresarial',
    delay: '300ms',
  },
];

export default function CategoryCards() {
  const [cardsRef, isVisible] = useScrollReveal({ threshold: 0.08 });

  return (
    <section 
      id="productos" 
      data-theme="light"
      data-theme-color="#ffffff"
      className="relative z-30 w-full px-3 sm:px-5 md:px-7 lg:px-[35px] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 md:pb-28 font-peridot"
    >
      
      {/* H2 Semántico para la sección de categorías principales (SEO Bible) */}
      <h2 className="sr-only">Categorías de empaques personalizados, papelería e insumos</h2>
      
      {/* Grid de 3 Tarjetas con revelado suave por IntersectionObserver */}
      <div 
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 items-stretch w-full"
      >
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            to={`/categoria/${cat.slug}`}
            role="button"
            tabIndex={0}
            className={`group relative block w-full aspect-[4/5] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[46px] overflow-hidden bg-[#FAF8FD] shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 hover:ring-2 hover:ring-[#7E04A1]/35 hover:shadow-[0_24px_65px_rgba(126,4,161,0.22)] md:hover:-translate-y-2 sm:hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer pointer-events-auto touch-manipulation active:scale-[0.98] active:translate-y-0 ${
              isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-10 sm:translate-y-14 scale-[0.97]'
            }`}
            style={{ transitionDelay: isVisible ? cat.delay : '0ms' }}
            aria-label={`Ver catálogo de ${cat.title}`}
          >
            {/* Imagen de fondo oficial */}
            <img
              src={cat.image}
              alt={cat.alt}
              width="1122"
              height="1402"
              loading="lazy"
              decoding="async"
              className="w-full h-full aspect-[4/5] object-cover object-center transform-gpu will-change-transform transition-transform duration-700 ease-out group-hover:scale-105"
              draggable={false}
            />

            {/* Sutil oscurecimiento en hover (solo desktop) para mayor contraste */}
            <div className="absolute inset-0 bg-black/0 sm:group-hover:bg-black/15 transition-colors duration-400 pointer-events-none" />

            {/* Banda central translúcida limpia con nombre de la categoría */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full py-5 sm:py-6 md:py-7 lg:py-8 bg-white/60 sm:bg-white/55 backdrop-blur-[4px] border-y border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white/80">
              <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight text-[#141517] text-center font-peridot drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)] px-3">
                {cat.title}
              </h3>
            </div>

            {/* Botón inferior: siempre visible en móvil como CTA claro, y con animación en hover para desktop */}
            <div className="absolute inset-x-4 sm:inset-x-6 bottom-4 sm:bottom-6 opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-2.5 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none">
              <div className="w-full py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 text-[#141517] text-xs sm:text-sm font-bold tracking-tight flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)]">
                <span>Ir a {cat.title}</span>
                <ArrowRight className="w-4 h-4 text-[#7E04A1] transform transition-transform duration-300 group-hover:translate-x-1.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
