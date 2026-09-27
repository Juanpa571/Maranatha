import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CATEGORIES = [
  {
    slug: 'papeleria-creativa',
    title: 'Papelería Creativa',
    image: '/papeleria-creativa.webp',
    alt: 'Papelería Creativa',
    delay: '0ms',
  },
  {
    slug: 'insumos',
    title: 'Insumos de Papelería',
    image: '/papeleria-insumos.webp',
    alt: 'Insumos de Papelería',
    delay: '150ms',
  },
  {
    slug: 'papeleria-empresarial',
    title: 'Papelería Empresarial',
    image: '/papeleria-empresarial.webp',
    alt: 'Papelería Empresarial',
    delay: '300ms',
  },
];

export default function CategoryCards() {
  const [cardsState, setCardsState] = useState('below'); // 'below' | 'visible' | 'above'
  const cardsRef = useRef(null);

  useEffect(() => {
    const checkPosition = () => {
      if (cardsRef.current) {
        const rect = cardsRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;
        // Scroll-down: las tarjetas aparecen con animación escalonada al entrar por la parte inferior (88% del viewport)
        const enterThreshold = windowH * 0.88;
        // Scroll hacia arriba / salida por navbar superior
        const exitThreshold = window.innerWidth < 768 ? 260 : 360;

        let state = 'visible';
        if (rect.top > enterThreshold) {
          state = 'below';
        } else if (rect.bottom <= exitThreshold) {
          state = 'above';
        }
        setCardsState((prev) => (prev !== state ? state : prev));
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

  return (
    <section 
      id="productos" 
      className="w-full px-3 sm:px-5 md:px-7 lg:px-[35px] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 md:pb-28 font-peridot"
    >
      
      {/* H2 Semántico para la sección de categorías principales (SEO Bible) */}
      <h2 className="sr-only">Líneas Principales de Papelería y Empaques</h2>
      
      {/* Grid de 3 Tarjetas con animación de aparición escalonada tanto al scrollear hacia abajo como hacia arriba */}
      <div 
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 items-stretch w-full"
      >
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            to={`/categoria/${cat.slug}`}
            className={`group relative block w-full aspect-[4/5] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[46px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:shadow-[0_24px_65px_rgba(126,4,161,0.25)] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
              cardsState === 'below'
                ? 'opacity-0 translate-y-12 sm:translate-y-16 scale-[0.96] pointer-events-none'
                : cardsState === 'above'
                ? 'opacity-0 -translate-y-8 scale-[0.98] pointer-events-none'
                : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            }`}
            style={{ transitionDelay: cardsState === 'visible' ? cat.delay : '0ms' }}
          >
            {/* Imagen de fondo oficial (pointer-events-none para que el contenedor Link capture todo el hover) */}
            <img
              src={cardsState !== 'below' ? cat.image : undefined}
              alt={cat.alt}
              width="680"
              height="850"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              draggable={false}
            />

            {/* Sutil oscurecimiento en hover para mayor contraste */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-400 pointer-events-none" />

            {/* Banda central translúcida limpia estilo referencia (sin botones en medio, no se expande) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full py-5 sm:py-6 md:py-7 lg:py-8 bg-white/55 backdrop-blur-[4px] border-y border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white/75 pointer-events-none">
              <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight text-[#141517] text-center font-peridot drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)] px-3">
                {cat.title}
              </h3>
            </div>

            {/* Mensaje inferior que aparece al poner el cursor sobre cualquier parte de la tarjeta */}
            <div className="absolute inset-x-4 sm:inset-x-6 bottom-4 sm:bottom-6 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none">
              <div className="w-full py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 text-[#141517] text-xs sm:text-sm font-bold tracking-tight flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(0,0,0,0.18)]">
                <span>Ir a {cat.title}</span>
                <ArrowRight className="w-4 h-4 text-[#7E04A1] transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
