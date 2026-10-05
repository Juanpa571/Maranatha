import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ZoomIn } from 'lucide-react';
import { useCatalog } from '../hooks/useCatalog';
import ProductQuickViewModal from './ProductQuickViewModal';
import { getProductTactileSpecs } from '../utils/productSpecs';

export default function CoreCatalog() {
  const { featuredProducts } = useCatalog();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const getWhatsappUrl = (text) => `https://wa.me/573145854213?text=${encodeURIComponent(text)}`;

  const handleOpenProduct = useCallback((prod) => {
    setSelectedProduct(prod);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  return (
    <section 
      id="catalogo-destacado" 
      data-theme="light"
      data-theme-color="#ffffff"
      className="w-full min-h-[100dvh] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-[100px] pb-12 sm:pb-16 bg-[#DBC9DF]/15 border-t border-gray-200/80 font-peridot transition-colors flex flex-col justify-center scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="max-w-[1400px] mx-auto w-full flex flex-col justify-center gap-7 sm:gap-9 md:gap-11 lg:gap-13">
        {/* Encabezado Asimétrico - Mismo ancho exacto que las tarjetas */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-extrabold tracking-tight text-[#141517] leading-[1.12]">
              Cajas personalizadas,{' '}
              <br className="hidden sm:inline" />
              <span className="text-[#7E04A1]">stickers</span> y vinilos adhesivos
              <span className="inline-block align-middle ml-2 sm:ml-3 text-[#7E04A1] -translate-y-1 sm:-translate-y-1.5">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="3" x2="12" y2="7" />
                  <line x1="4.22" y1="6.22" x2="7.05" y2="9.05" />
                  <line x1="19.78" y1="6.22" x2="16.95" y2="9.05" />
                </svg>
              </span>
            </h2>
          </div>

          <div className="border-l-2 border-gray-200/90 pl-5 sm:pl-7 max-w-md shrink-0 lg:pb-1">
            <p className="text-sm sm:text-[15px] lg:text-base text-[#4A4B53] font-medium leading-relaxed">
              Acabados de autor, corte digital y materiales premium para dar vida a tus ideas.
            </p>
            <a
              href="#proceso"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('proceso');
                if (target) {
                  if (window.lenis) {
                    window.lenis.scrollTo(target, { offset: -84, duration: 1.2 });
                  } else {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="text-[#7E04A1] font-bold text-sm sm:text-[15px] hover:underline inline-flex items-center gap-2 mt-2.5 transition-colors cursor-pointer group"
            >
              <span>Directo del taller</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Grid de 3 Tarjetas - Siempre visible y estable */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
          {featuredProducts.map((prod, index) => {
            const rawPrice = prod.priceVal || prod.price || '';
            const pricePrefix = prod.pricePrefix || 'Desde';
            const cleanPrice = rawPrice.replace(/^Desde\s+/, '');
            const priceMain = cleanPrice.match(/^(\$[\d.]+)/) ? cleanPrice.match(/^(\$[\d.]+)/)[1] : cleanPrice;
            const priceSub = cleanPrice.replace(/^(\$[\d.]+)\s*/, '');

            return (
              <div
                key={prod.id || prod._id || index}
                className="group relative flex flex-col w-full rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white border border-gray-100 shadow-[0_6px_26px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(126,4,161,0.14)] hover-lift-sm transition-all duration-300 pointer-events-auto touch-manipulation opacity-100"
              >
                {/* Contenedor de Imagen: Proporción 1:1 cuadrada natural que muestra el producto completo sin zoom ni recortes */}
                <div className="relative w-full aspect-square overflow-hidden bg-[#DBC9DF]/15 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenProduct(prod)}
                    title={`Ver ${prod.title} en alta resolución`}
                    className="group/img block relative w-full h-full cursor-zoom-in text-left"
                  >
                    <img
                      src={prod.image}
                      alt={prod.alt || prod.title}
                      width="500"
                      height="500"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full aspect-square object-cover object-center transform-gpu will-change-transform"
                      draggable={false}
                    />

                    <div className="hidden sm:flex absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium items-center gap-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Zoom</span>
                    </div>
                  </button>
                </div>

                {/* Área de Detalles: Padding generoso y equilibrado */}
                <div className="p-5 sm:p-6 lg:p-7 flex flex-col justify-between flex-1 min-w-0 bg-white">
                  <div>
                    {/* Título */}
                    <button
                      type="button"
                      onClick={() => handleOpenProduct(prod)}
                      className="block group/title cursor-pointer text-left w-full"
                      title={`Ver detalles de ${prod.title}`}
                    >
                      <h3 className="font-peridot text-[17px] sm:text-[19px] lg:text-[21px] font-bold text-[#141517] tracking-tight leading-snug line-clamp-1 group-hover/title:text-[#7E04A1] transition-colors">
                        {prod.title}
                      </h3>
                    </button>

                    {/* Descripción concisa */}
                    <p className="font-peridot text-[13px] sm:text-[14px] text-[#55555C] font-normal leading-relaxed mt-1.5 line-clamp-2">
                      {prod.description}
                    </p>

                    {/* Micro-fichas táctiles (Build in Amsterdam) */}
                    {(() => {
                      const specs = getProductTactileSpecs(prod);
                      return (
                        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-semibold text-[#7E04A1] bg-[#DBC9DF]/30 px-2 py-0.5 rounded-md">
                            {specs.acabado.value}
                          </span>
                          <span className="text-[11px] font-medium text-[#55555C] bg-gray-100 px-2 py-0.5 rounded-md">
                            {specs.tiraje.value}
                          </span>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Fila Inferior: Precio + Botón Cotizar */}
                  <div className="mt-5 pt-4 flex items-center justify-between gap-3 border-t border-gray-100">
                    <div className="flex flex-col select-text leading-tight">
                      <span className="text-[11.5px] sm:text-xs text-gray-400 font-medium tracking-wide">
                        {pricePrefix}
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-[20px] sm:text-[22px] lg:text-[24px] font-extrabold text-[#141517] tracking-tight">
                          {priceMain}
                        </span>
                        {priceSub ? (
                          <span className="text-xs sm:text-[13px] text-gray-500 font-normal">
                            {priceSub}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <a
                      href={getWhatsappUrl(prod.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Cotizar ${prod.title} por WhatsApp`}
                      aria-label={`Cotizar ${prod.title} por WhatsApp`}
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#E7D1FF]/30 hover:bg-[#E7D1FF]/50 text-[#7E04A1] text-[13px] sm:text-[14px] font-bold transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] shrink-0 cursor-pointer shadow-sm hover:shadow"
                    >
                      <svg
                        className="w-4 h-4 fill-current shrink-0"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.134 8.134 0 0 1-1.25-4.38c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39a8.106 8.106 0 0 1 2.39 5.77c0 4.51-3.66 8.16-8.16 8.16zm4.47-6.11c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
                      </svg>
                      <span>Cotizar</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enlace sutil con divisores laterales a juego */}
        <div className="flex items-center justify-center">
          <div className="flex-1 max-w-[100px] sm:max-w-[220px] h-[1px] bg-[#DBC9DF]" />
          <Link
            to="/catalogo"
            className="px-4 sm:px-6 text-sm sm:text-[15px] font-semibold text-[#7E04A1] hover:brightness-90 inline-flex items-center gap-2 transition-colors group"
          >
            <span>Ver catálogo completo de Maranatha</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <div className="flex-1 max-w-[100px] sm:max-w-[220px] h-[1px] bg-[#DBC9DF]" />
        </div>
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
