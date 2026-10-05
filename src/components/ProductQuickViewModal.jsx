import React, { useEffect, useState, useMemo, memo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, ArrowRight, ShieldCheck, MapPin, Sparkles, Layers, Scissors, Clock, Check } from 'lucide-react';
import { getProductTactileSpecs } from '../utils/productSpecs';

function ProductQuickViewModal({ product, isOpen, onClose }) {
  const specs = useMemo(() => getProductTactileSpecs(product), [product]);
  const finishOptions = specs?.finishOptions || [];
  const [selectedFinish, setSelectedFinish] = useState(finishOptions[0] || null);

  // Sincronizar el acabado seleccionado al cambiar de producto
  useEffect(() => {
    if (specs?.finishOptions && specs.finishOptions.length > 0) {
      setSelectedFinish(specs.finishOptions[0]);
    } else {
      setSelectedFinish(null);
    }
  }, [product, specs]);

  useEffect(() => {
    if (!isOpen || !product) return;

    const html = document.documentElement;
    const body = document.body;
    
    const originalHtmlBg = html.style.backgroundColor;
    const originalBodyBg = body.style.backgroundColor;
    const originalOverflow = body.style.overflow;
    
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    let originalThemeColor = metaTheme ? metaTheme.getAttribute('content') : null;

    html.style.backgroundColor = '#000000';
    body.style.backgroundColor = '#000000';
    body.style.overflow = 'hidden';

    if (metaTheme) {
      metaTheme.setAttribute('content', '#000000');
    } else {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      metaTheme.content = '#000000';
      document.head.appendChild(metaTheme);
    }

    if (window.lenis) {
      window.lenis.stop();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      html.style.backgroundColor = originalHtmlBg;
      body.style.backgroundColor = originalBodyBg;
      body.style.overflow = originalOverflow;

      if (metaTheme) {
        if (originalThemeColor) {
          metaTheme.setAttribute('content', originalThemeColor);
        } else {
          document.head.removeChild(metaTheme);
        }
      }

      if (window.lenis) {
        window.lenis.start();
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, product, onClose]);

  if (!isOpen || !product) return null;

  // WhatsApp dinámico integrando el acabado seleccionado (Build in Amsterdam e-commerce conversion)
  const finishText = selectedFinish ? ` con acabado "${selectedFinish}"` : '';
  const customWhatsappMessage = product.whatsapp
    ? `${product.whatsapp}${finishText ? ` (Acabado de interés: ${selectedFinish})` : ''}`
    : `Hola Maranatha 👋, quisiera cotizar ${product.title}${finishText} en Cali.`;

  const whatsappUrl = `https://wa.me/573145854213?text=${encodeURIComponent(customWhatsappMessage)}`;
  
  const priceText = product.priceVal || product.price || '';
  const pricePrefix = product.pricePrefix || (priceText.startsWith('Desde ') ? 'Desde' : '');
  const cleanPrice = pricePrefix ? priceText.replace(/^Desde\s+/, '') : priceText;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de ${product.title}`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 font-peridot select-text"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        aria-hidden="true"
      />
      
      {/* Tarjeta con altura máxima inteligente para encajar completa en móviles y desktop */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-[26px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-[#DBC9DF] flex flex-col max-h-[92dvh] sm:max-h-[88vh] animate-in zoom-in-95 duration-200">
        
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar vista rápida"
          className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-[#7E04A1] flex items-center justify-center shadow-md border border-gray-200/80 transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 active:scale-[0.97] cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* 
          AQUÍ ESTÁ LA MAGIA DEL SCROLL:
          Envolvemos el grid en un div independiente con `overscroll-contain`. 
          Esto aísla el comportamiento táctil para que Safari no lo bloquee.
        */}
        <div className="flex-1 overflow-y-auto overscroll-contain no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-full">
            
            {/* Columna Izquierda: Foto de producto + Badges de taller */}
            <div className="md:col-span-5 bg-[#DBC9DF]/15 flex flex-col items-center justify-between p-4 sm:p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#DBC9DF]/40 shrink-0">
              <div className="relative w-full h-[220px] xs:h-[240px] sm:h-[280px] md:h-auto md:aspect-square max-w-[360px] rounded-2xl overflow-hidden shadow-inner bg-white border border-[#DBC9DF]/60 group mx-auto">
                <img
                  src={product.image}
                  alt={product.alt || product.title}
                  width="600"
                  height="600"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  draggable={false}
                />
              </div>

              {/* Sellos de Taller Propio y Muestra Digital */}
              <div className="w-full max-w-[360px] mt-4 pt-3.5 border-t border-[#DBC9DF]/50 space-y-2 text-xs text-[#55555C]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#7E04A1] shrink-0" />
                  <span>Sin mínimos de miles • Atención directa en Cali</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#7E04A1] shrink-0" />
                  <span>Envíos locales en Cali y despachos a Colombia</span>
                </div>
              </div>
            </div>
            
            {/* Columna Derecha: Especificaciones Táctiles (Build in Amsterdam) */}
            <div className="md:col-span-7 p-5 sm:p-7 md:p-8 flex flex-col justify-between space-y-5">
              <div>
                {/* Categoría y Título */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  {product.categoryName || product.categoryTitle ? (
                    <span className="text-[11px] sm:text-xs font-bold text-[#7E04A1] tracking-wider uppercase">
                      {product.categoryName || product.categoryTitle}
                    </span>
                  ) : <span />}
                  <span className="text-[11px] font-semibold text-[#8C8C94] uppercase tracking-wider">
                    Taller Maranatha Cali
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-[25px] font-extrabold text-[#141517] tracking-tight leading-[1.18]">
                  {product.title}
                </h3>
                
                <p className="text-[13.5px] sm:text-[14.5px] text-[#55555C] font-normal leading-relaxed mt-2">
                  {product.description || product.subtitle}
                </p>

                {/* Selector Táctil de Acabados / Opciones (Build in Amsterdam) */}
                {finishOptions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#DBC9DF]/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#141517]">
                        Acabado / Presentación:
                      </span>
                      {selectedFinish && (
                        <span className="text-xs font-semibold text-[#7E04A1]">
                          {selectedFinish}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {finishOptions.map((finish) => {
                        const isSelected = selectedFinish === finish;
                        return (
                          <button
                            key={finish}
                            type="button"
                            onClick={() => setSelectedFinish(finish)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? 'bg-[#7E04A1] text-white shadow-sm ring-1 ring-[#7E04A1]'
                                : 'bg-[#DBC9DF]/25 text-[#4A4B53] hover:bg-[#DBC9DF]/45 hover:text-[#141517]'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                            <span>{finish}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Ficha de Especificaciones Táctiles (Build in Amsterdam 2x2 Grid) */}
                <div className="mt-4 pt-4 border-t border-[#DBC9DF]/40">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8C8C94] block mb-2.5">
                    Ficha Técnica y Producción
                  </span>

                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {/* Tarjeta 1: Acabado / Corte */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#DBC9DF]/15 border border-[#DBC9DF]/50 hover:border-[#7E04A1]/40 transition-colors">
                      <div className="flex items-center gap-1.5 text-[#7E04A1] mb-1">
                        <Scissors className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wide truncate">
                          {specs.acabado.label}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] font-extrabold text-[#141517] leading-tight">
                        {specs.acabado.value}
                      </p>
                      <p className="text-[11px] text-[#6A6C7D] mt-0.5 leading-snug line-clamp-1">
                        {specs.acabado.detail}
                      </p>
                    </div>

                    {/* Tarjeta 2: Sustrato / Material */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#DBC9DF]/15 border border-[#DBC9DF]/50 hover:border-[#7E04A1]/40 transition-colors">
                      <div className="flex items-center gap-1.5 text-[#7E04A1] mb-1">
                        <Layers className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wide truncate">
                          {specs.material.label}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] font-extrabold text-[#141517] leading-tight">
                        {specs.material.value}
                      </p>
                      <p className="text-[11px] text-[#6A6C7D] mt-0.5 leading-snug line-clamp-1">
                        {specs.material.detail}
                      </p>
                    </div>

                    {/* Tarjeta 3: Tiraje Mínimo */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#DBC9DF]/15 border border-[#DBC9DF]/50 hover:border-[#7E04A1]/40 transition-colors">
                      <div className="flex items-center gap-1.5 text-[#7E04A1] mb-1">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wide truncate">
                          {specs.tiraje.label}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] font-extrabold text-[#141517] leading-tight">
                        {specs.tiraje.value}
                      </p>
                      <p className="text-[11px] text-[#6A6C7D] mt-0.5 leading-snug line-clamp-1">
                        {specs.tiraje.detail}
                      </p>
                    </div>

                    {/* Tarjeta 4: Taller y Entrega */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#DBC9DF]/15 border border-[#DBC9DF]/50 hover:border-[#7E04A1]/40 transition-colors">
                      <div className="flex items-center gap-1.5 text-[#7E04A1] mb-1">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wide truncate">
                          {specs.entrega.label}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] font-extrabold text-[#141517] leading-tight">
                        {specs.entrega.value}
                      </p>
                      <p className="text-[11px] text-[#6A6C7D] mt-0.5 leading-snug line-clamp-1">
                        {specs.entrega.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Acciones de Cotización WhatsApp y Enlace de Categoría */}
              <div className="pt-4 border-t border-[#DBC9DF]/40 space-y-2.5 sm:space-y-3 mt-auto">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    {pricePrefix ? (
                      <span className="text-xs font-semibold text-[#7E04A1]">{pricePrefix}</span>
                    ) : null}
                    <span className="text-2xl sm:text-[26px] font-extrabold text-[#141517] tracking-tight">
                      {cleanPrice}
                    </span>
                    {product.unit ? (
                      <span className="text-xs text-gray-400 font-normal">/ {product.unit}</span>
                    ) : null}
                  </div>
                  <span className="text-xs font-bold text-[#7E04A1] bg-[#DBC9DF]/30 px-2.5 py-1 rounded-md">
                    Cali, Colombia
                  </span>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-[48px] sm:h-[50px] px-5 rounded-full bg-[#25D366] hover:bg-[#1faa4f] text-white text-[13.5px] sm:text-[14.5px] font-bold shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.50)] flex items-center justify-center gap-2.5 transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] active:scale-[0.97] cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 fill-white text-white shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.134 8.134 0 0 1-1.25-4.38c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39a8.106 8.106 0 0 1 2.39 5.77c0 4.51-3.66 8.16-8.16 8.16zm4.47-6.11c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
                  </svg>
                  <span>
                    {selectedFinish ? `Cotizar con acabado "${selectedFinish}"` : 'Cotizar este producto por WhatsApp'}
                  </span>
                </a>

                {product.categorySlug ? (
                  <Link
                    to={`/categoria/${product.categorySlug}`}
                    onClick={onClose}
                    className="w-full h-[40px] sm:h-[42px] px-4 rounded-xl bg-[#7E04A1] hover:brightness-95 text-white font-bold shadow-[0_3px_12px_rgba(126,4,161,0.22)] hover:shadow-[0_5px_16px_rgba(126,4,161,0.35)] flex items-center justify-between text-xs sm:text-[13px] transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] group/link cursor-pointer"
                  >
                    <span>Ver más en {product.categoryName || product.categoryTitle}</span>
                    <ArrowRight className="w-4 h-4 text-white shrink-0 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}

export default memo(ProductQuickViewModal);

