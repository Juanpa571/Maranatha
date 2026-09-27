import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ZoomIn } from 'lucide-react';
import { useCatalog } from '../hooks/useCatalog';
import ProductQuickViewModal from './ProductQuickViewModal';

export default function CoreCatalog() {
  const { featuredProducts } = useCatalog();
  const [headerState, setHeaderState] = useState('below'); // 'below' | 'visible' | 'above'
  const [cardsState, setCardsState] = useState('below');   // 'below' | 'visible' | 'above'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const getWhatsappUrl = (text) => `https://wa.me/573145854213?text=${encodeURIComponent(text)}`;

  const handleOpenProduct = useCallback((prod) => {
    setSelectedProduct(prod);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  useEffect(() => {
    const checkPositions = () => {
      const windowH = window.innerHeight;
      const enterThreshold = windowH * 0.88;

      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        const headerTopThreshold = window.innerWidth < 768 ? 240 : 320;
        let newHeaderState = 'visible';
        if (headerRect.top > enterThreshold) {
          newHeaderState = 'below';
        } else if (cardsRef.current && cardsRef.current.getBoundingClientRect().top <= headerTopThreshold) {
          newHeaderState = 'above';
        }
        setHeaderState((prev) => (prev !== newHeaderState ? newHeaderState : prev));
      }

      if (cardsRef.current) {
        const cardsRect = cardsRef.current.getBoundingClientRect();
        const cardsExitThreshold = window.innerWidth < 768 ? 200 : 280;
        let newCardsState = 'visible';
        if (cardsRect.top > enterThreshold) {
          newCardsState = 'below';
        } else if (cardsRect.bottom <= cardsExitThreshold) {
          newCardsState = 'above';
        }
        setCardsState((prev) => (prev !== newCardsState ? newCardsState : prev));
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

    window.addEventListener('scroll', checkPositions, { passive: true });
    window.addEventListener('resize', checkPositions);
    checkPositions();

    return () => {
      if (unsubLenis) unsubLenis();
      window.removeEventListener('scroll', checkPositions);
      window.removeEventListener('resize', checkPositions);
    };
  }, []);

  return (
    <section 
      id="catalogo-destacado" 
      className="w-full px-4 sm:px-8 md:px-[6vw] lg:px-[8.5%] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 md:pb-28 bg-[#FAF8FD] border-t border-gray-200/80 font-peridot transition-colors"
    >
      
      {/* Encabezado Asimétrico Playful Monumental */}
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
          <div className="absolute -top-1 sm:-top-2 left-0 pointer-events-none transform -rotate-12 opacity-85">
            <img src="/faq-heart.webp" alt="" width="28" height="28" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[66px] font-bold tracking-tight text-[#141517] leading-[1.10]">
            Cajas, stickers y{' '}
            <span className="relative inline-block text-[#7E04A1]">
              piezas
              <svg 
                className="absolute -top-8 sm:-top-11 md:-top-13 -right-2 sm:-right-4 w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14 pointer-events-none transform rotate-[14deg] drop-shadow-[0_4px_10px_rgba(126,4,161,0.28)]" 
                viewBox="0 0 24 28" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="unicornHornGrad" x1="12" y1="28" x2="16" y2="4" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#7E04A1" />
                    <stop offset="60%" stopColor="#9C27B0" />
                    <stop offset="100%" stopColor="#E7D1FF" />
                  </linearGradient>
                </defs>
                <path 
                  d="M7 26C8.5 25 12 25 15 26L16.5 4C14.5 10 9 20 7 26Z" 
                  fill="url(#unicornHornGrad)" 
                />
                <path 
                  d="M7.8 21.5C9.5 20.8 12.5 21.2 14.8 20" 
                  stroke="#FFFFFF" 
                  strokeWidth="1.2" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M9.2 16C10.8 15.3 13.2 15.6 15.2 14.8" 
                  stroke="#FFFFFF" 
                  strokeWidth="1.2" 
                  strokeLinecap="round" 
                />
              </svg>
            </span>{' '}
            <br />
            favoritas de papelería
            <span className="inline-block align-middle ml-2 pointer-events-none">
              <img src="/faq-rays-clean.webp" alt="" className="w-5 h-5 sm:w-6 sm:h-6 object-contain inline-block transform rotate-12 opacity-85" />
            </span>
          </h2>
        </div>

        <div className="max-w-md lg:pb-2">
          <p className="text-base sm:text-lg md:text-xl text-[#2B2B2E] font-medium leading-relaxed">
            Sin mínimos de litografía. Acabados de autor, corte digital y materiales finos listos para tu celebración o marca.
          </p>
          <div className="hidden sm:inline-flex items-center gap-2 mt-2 pointer-events-none">
            <span className="font-['Patrick_Hand',cursive] text-base text-[#7E04A1] font-bold tracking-wide">
              directo del taller
            </span>
            <img
              src="/faq-arrow-clean.webp"
              alt=""
              className="w-10 h-auto object-contain transform rotate-[35deg] opacity-75"
            />
          </div>
        </div>
      </div>

      {/* Grid de 3 Tarjetas en Fila Curadas para la Home */}
      <div 
        ref={cardsRef}
        className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch w-full"
      >
        {featuredProducts.map((prod, index) => {
          const rawPrice = prod.priceVal || prod.price || '';
          const pricePrefix = prod.pricePrefix || (rawPrice.startsWith('Desde ') ? 'Desde' : 'Desde');
          const cleanPrice = rawPrice.replace(/^Desde\s+/, '');
          const priceMain = cleanPrice.match(/^(\$[\d.]+)/) ? cleanPrice.match(/^(\$[\d.]+)/)[1] : cleanPrice;
          const priceSub = cleanPrice.replace(/^(\$[\d.]+)\s*/, '');

          return (
            <div
              key={prod.id || prod._id || index}
              className={`group relative flex flex-col w-full rounded-[22px] sm:rounded-[26px] md:rounded-[28px] overflow-hidden bg-white border border-[#F0E6FA] shadow-[0_6px_22px_rgba(126,4,161,0.06)] hover:shadow-[0_16px_40px_rgba(126,4,161,0.15)] hover:-translate-y-1 transition-all duration-400 ${
                cardsState === 'below'
                  ? 'opacity-0 translate-y-12 sm:translate-y-16 scale-[0.96] pointer-events-none'
                  : cardsState === 'above'
                  ? 'opacity-0 -translate-y-8 scale-[0.98] pointer-events-none'
                  : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              }`}
              style={{ transitionDelay: cardsState === 'visible' ? (prod.delay || `${(index + 1) * 150}ms`) : '0ms' }}
            >
              {/* Foto oficial con más espacio, cursor zoom y apertura de QuickView Modal */}
              <button
                type="button"
                onClick={() => handleOpenProduct(prod)}
                title={`Ver ${prod.title} en alta resolución`}
                className="group/img block relative w-full aspect-square overflow-hidden bg-[#FAF8FD] cursor-zoom-in text-left"
              >
                <img
                  src={cardsState !== 'below' ? prod.image : undefined}
                  alt={prod.alt || prod.title}
                  width="500"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full aspect-square object-cover object-center transform transition-transform duration-700 ease-out group-hover/img:scale-105"
                  draggable={false}
                />
                {/* Micro badge de zoom al hacer hover */}
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Zoom</span>
                </div>
              </button>

              {/* Área editorial compacta y balanceada */}
              <div className="px-3.5 sm:px-4 pt-2.5 sm:pt-3 pb-3 sm:pb-3.5 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <button
                    type="button"
                    onClick={() => handleOpenProduct(prod)}
                    className="block group/title cursor-pointer text-left w-full"
                    title={`Ver detalles de ${prod.title}`}
                  >
                    <h3 className="font-peridot text-[16px] sm:text-[17px] font-extrabold text-[#34076E] tracking-tight leading-snug group-hover/title:text-[#7E04A1] transition-colors">
                      {prod.title}
                    </h3>
                  </button>
                  <p className="font-peridot text-[11.5px] sm:text-[12px] text-[#767987] font-normal leading-[1.32] mt-1">
                    {prod.description}
                  </p>
                </div>

                {/* Acciones: Fila de Precio (Sin cápsula, estilo Amazon) + Botón WhatsApp Cotizar */}
                <div className="pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-[#F5EEFB] flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-2">
                    {/* Precio Tipográfico Puro estilo Amazon (Cero Cápsula) */}
                    <div className="flex flex-col select-text leading-none py-0.5">
                      <span className="text-[10.5px] text-gray-400 font-medium">
                        {pricePrefix}
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-[19px] sm:text-[21px] font-black text-[#141517] tracking-tight leading-none">
                          {priceMain}
                        </span>
                        {priceSub ? (
                          <span className="text-[11px] text-gray-500 font-semibold leading-none">
                            {priceSub}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Botón WhatsApp Cotizar (Más robusto, visible y cómodo) */}
                    <a
                      href={getWhatsappUrl(prod.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Cotizar ${prod.title} por WhatsApp`}
                      aria-label={`Cotizar ${prod.title} por WhatsApp`}
                      className="inline-flex items-center gap-2 h-[38px] sm:h-[40px] px-4 sm:px-4.5 rounded-full bg-[#25D366] hover:bg-[#1faa4f] text-white text-[13px] sm:text-[13.5px] font-extrabold shadow-[0_3px_12px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_18px_rgba(37,211,102,0.50)] transition-all duration-300 transform hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4 sm:w-[17px] sm:h-[17px] fill-current shrink-0"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.134 8.134 0 0 1-1.25-4.38c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39a8.106 8.106 0 0 1 2.39 5.77c0 4.51-3.66 8.16-8.16 8.16zm4.47-6.11c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
                      </svg>
                      <span>Cotizar</span>
                    </a>
                  </div>

                  {/* Botón Largo "Ver más en Categoría" en Púrpura de Marca (Armonía y Alto Impacto) */}
                  <Link
                    to={`/categoria/${prod.categorySlug}`}
                    className="w-full h-[40px] sm:h-[42px] px-4 rounded-xl bg-[#7E04A1] hover:bg-[#680285] text-white font-bold shadow-[0_3px_12px_rgba(126,4,161,0.22)] hover:shadow-[0_5px_16px_rgba(126,4,161,0.35)] flex items-center justify-between text-xs sm:text-[12.5px] transition-all duration-200 active:scale-98 group/cat cursor-pointer"
                  >
                    <span>Ver más en {prod.categoryName}</span>
                    <ArrowRight className="w-4 h-4 text-white shrink-0 transform group-hover/cat:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enlace limpio para ir a la subpágina del catálogo completo */}
      <div className="mt-12 text-center">
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#7E04A1] hover:text-[#5E0279] group transition-colors"
        >
          <span>Ver catálogo completo con todos los productos de Maranatha</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Modal de Zoom y Vista Rápida en Alta Resolución */}
      <ProductQuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
      />

    </section>
  );
}
