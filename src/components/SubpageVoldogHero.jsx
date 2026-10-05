import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SubpageVoldogHero({
  tickerItems = ['CATÁLOGO COMPLETO', 'MARANATHA', 'HECHO EN CALI', 'PAPELERÍA & EMPAQUES'],
  breadcrumbs = [{ label: 'Inicio', to: '/' }, { label: 'Catálogo' }],
  seoTitle = 'Catálogo Maranatha',
  description = null,
}) {
  // Duplicamos los elementos 4 veces para garantizar un bucle infinito continuo sin saltos visuales
  const loopItems = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <section className="relative w-full bg-[#DBC9DF]/15 pt-10 sm:pt-14 md:pt-16 lg:pt-20 overflow-hidden font-peridot select-none">
      {/* Título semántico invisible para motores de búsqueda (SEO) */}
      <h1 className="sr-only">{seoTitle}</h1>

      {/* 1. CINTA CORREDIZA MONUMENTAL (MARQUEE TICKER ESTILO VOLDOG) */}
      <div className="w-full overflow-hidden py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="animate-voldog-marquee flex items-center whitespace-nowrap">
          {loopItems.map((item, idx) => (
            <div key={idx} className="flex items-center shrink-0">
              <span
                className={`font-extrabold text-[38px] sm:text-[54px] md:text-[70px] lg:text-[84px] xl:text-[96px] tracking-[-0.02em] uppercase leading-none transition-colors duration-300 ${
                  idx % 2 === 0
                    ? 'text-[#7E04A1] hover:brightness-90'
                    : 'text-[#141517] hover:text-[#7E04A1]'
                }`}
              >
                {item}
              </span>
              {/* Asterisco decorativo dorado / lila estilo Voldog */}
              <span className="mx-5 sm:mx-8 md:mx-11 text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#7E04A1] font-light select-none transform hover:rotate-45 transition-transform duration-300">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. BREADCRUMBS EDITORIALES Y DESCRIPCIÓN */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center pb-8 sm:pb-12 md:pb-14 relative z-10 select-text">
        {/* Breadcrumbs limpios */}
        <nav aria-label="Ruta de navegación" className="inline-flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13.5px] md:text-sm text-gray-500 font-medium">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.label}>
                {crumb.to ? (
                  <Link
                    to={crumb.to}
                    className="hover:text-[#7E04A1] transition-colors font-medium"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={`${isLast ? 'text-[#7E04A1] font-bold' : 'text-gray-700'}`}>
                    {crumb.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Subtítulo editorial si se especifica */}
        {description && (
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#55555C] font-normal leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* 3. ARCO ESCULTÓRICO VOLDOG (CURVATURA BLANCA INVERTIDA EN LA BASE DEL HERO) */}
      <div className="w-full overflow-hidden leading-none pointer-events-none -mt-px">
        <svg 
          className="w-full h-8 sm:h-12 md:h-16 lg:h-20 fill-white block transform translate-y-[1px]" 
          viewBox="0 0 1440 80" 
          preserveAspectRatio="none"
        >
          <path d="M0,80 Q720,0 1440,80 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
