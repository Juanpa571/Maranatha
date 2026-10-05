import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ZoomIn, ArrowRight } from 'lucide-react';
import { useCatalog } from '../hooks/useCatalog';
import SubpageHeader from '../components/SubpageHeader';
import SubpageVoldogHero from '../components/SubpageVoldogHero';
import Footer from '../components/Footer';
import ProductQuickViewModal from '../components/ProductQuickViewModal';

const CATEGORY_TICKERS = {
  'papeleria-creativa': [
    'PAPELERÍA CREATIVA',
    'CAJAS TEMÁTICAS',
    'FIESTAS & EVENTOS',
    'HECHO EN CALI',
    'CORTE & DETALLE',
    'MARANATHA',
  ],
  'insumos': [
    'INSUMOS DE PAPELERÍA',
    'VINILOS ADHESIVOS',
    'HERRAMIENTAS DE TALLER',
    'EN STOCK EN CALI',
    'ACABADOS RESISTENTES',
    'MARANATHA',
  ],
  'papeleria-empresarial': [
    'PAPELERÍA EMPRESARIAL',
    'STICKERS TROQUELADOS',
    'IDENTIDAD DE MARCA',
    'EMPAQUES COMERCIALES',
    'HECHO EN CALI',
    'MARANATHA',
  ],
};

export default function CategoriaPage() {
  const { categorySlug } = useParams();
  const { getCategory, categoriesList } = useCatalog();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const category = getCategory(categorySlug);

  const handleOpenProduct = useCallback((prod) => {
    setSelectedProduct({ ...prod, categorySlug: category.slug, categoryTitle: category.title });
  }, [category.slug, category.title]);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // Scroll al tope y título de pestaña según categoría
  useEffect(() => {
    if (category?.title) {
      document.title = `${category.title} en Cali | Maranatha`;
    }
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      window.lenis.resize();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [categorySlug, category]);

  const getWhatsappUrl = (text) => `https://wa.me/573145854213?text=${encodeURIComponent(text)}`;

  const formatPriceParts = (priceStr) => {
    if (!priceStr) return { prefix: '', val: '' };
    if (priceStr.startsWith('Desde ')) {
      return {
        prefix: 'Desde',
        val: priceStr.replace(/^Desde\s+/, ''),
      };
    }
    return { prefix: '', val: priceStr };
  };

  // Otras categorías para navegación cruzada
  const otherCategories = categoriesList.filter((cat) => cat.slug !== category.slug);

  const totalCatalogCount = categoriesList.reduce(
    (acc, c) => acc + (Array.isArray(c.products) ? c.products.length : 0),
    0
  );

  const tickerItems = CATEGORY_TICKERS[category.slug] || [
    category.title.toUpperCase(),
    'MARANATHA',
    'HECHO EN CALI',
    'PAPELERÍA PERSONALIZADA',
  ];

  return (
    <div className="min-h-[100dvh] bg-white font-peridot text-[#141517] selection:bg-[#E7D1FF] selection:text-[#7E04A1]">
      
      {/* 1. Header Minimalista con Catálogo dropdown, WhatsApp oficial y Drawer */}
      <SubpageHeader activeCategorySlug={category.slug} />

      {/* 2. Hero Monumental Voldog con Cinta Corrediza (Marquee) y Arco Escultórico */}
      <SubpageVoldogHero
        tickerItems={tickerItems}
        breadcrumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Catálogo', to: '/catalogo' },
          { label: category.title },
        ]}
        seoTitle={category.seoTitle || `${category.title} - Maranatha Papelería Creativa en Cali`}
        description={category.description}
      />

      {/* 3. Catálogo de Productos de la Categoría */}
      <section className="w-full px-4 sm:px-8 md:px-[6vw] lg:px-[8.5%] py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 sm:mb-12 border-b border-gray-200/80 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141517]">
                {category.sectionTitle || (
                  <>Catálogo de <span className="text-[#7E04A1]">{category.title}</span></>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                {category.sectionSubtitle || `${category.products?.length || 0} productos disponibles con asesoría y entrega en Cali`}
              </p>
            </div>

            <Link
              to="/catalogo"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7E04A1] hover:brightness-90 transition-colors"
            >
              <span>Ver catálogo completo ({totalCatalogCount} productos)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 items-stretch">
            {category.products.map((prod) => {
              const priceParts = formatPriceParts(prod.price);
              return (
                <div
                  key={prod.id}
                  className="group relative flex flex-col w-full rounded-2xl sm:rounded-[22px] md:rounded-[24px] overflow-hidden bg-white border border-[#DBC9DF] shadow-[0_4px_18px_rgba(126,4,161,0.06)] hover:shadow-[0_16px_40px_rgba(126,4,161,0.14)] hover-lift-sm transition-all duration-300"
                >
                  {/* Contenedor de Imagen: Foto a ancho completo con proporción limpia */}
                  <div className="relative w-full aspect-square overflow-hidden bg-[#DBC9DF]/15 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenProduct(prod)}
                      title={`Ver ${prod.title} en alta resolución`}
                      className="group/img block relative w-full h-full cursor-zoom-in text-left"
                    >
                      <img
                        src={prod.image}
                        alt={prod.alt}
                        width="500"
                        height="500"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full aspect-square object-cover object-center transform-gpu will-change-transform transition-transform duration-700 ease-out sm:group-hover/img:scale-105"
                        draggable={false}
                      />

                      {/* En desktop: Micro badge sutil de zoom al hacer hover */}
                      <div className="hidden sm:flex absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium items-center gap-1 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Zoom</span>
                      </div>
                    </button>
                  </div>

                  {/* Área de Detalles: Padding holgado y jerarquía limpia */}
                  <div className="p-4 sm:p-5 sm:pt-4 flex flex-col justify-between flex-1 min-w-0 bg-white">
                    <div>
                      {/* Título */}
                      <button
                        type="button"
                        onClick={() => handleOpenProduct(prod)}
                        className="block group/title cursor-pointer text-left w-full"
                        title={`Ver detalles de ${prod.title}`}
                      >
                        <h3 className="font-peridot text-[15.5px] xs:text-[16px] sm:text-[16.5px] font-bold sm:font-extrabold text-[#7E04A1] tracking-tight leading-snug line-clamp-2 group-hover/title:brightness-90 transition-colors">
                          {prod.title}
                        </h3>
                      </button>

                      {/* Subtítulo / Descripción real del producto */}
                      <p className="font-peridot text-[12px] text-[#6A6C7D] font-normal leading-[1.42] mt-1.5 line-clamp-2">
                        {prod.subtitle}
                      </p>
                    </div>

                    {/* Acciones: Fila de Precio + Botón Cotizar WhatsApp */}
                    <div className="pt-3.5 mt-3.5 sm:mt-4 border-t border-[#DBC9DF]/40 flex items-center justify-between gap-2">
                      {/* Precio Tipográfico */}
                      <div className="flex flex-col select-text leading-none py-0.5">
                        <span className="text-[11.5px] sm:text-xs text-[#6A6C7D] font-medium tracking-wide">
                          {priceParts.prefix || 'Desde'}
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-[17px] xs:text-[19px] sm:text-[21px] font-black text-[#141517] tracking-tight leading-none">
                            {priceParts.val.match(/^(\$[\d.]+)/) ? priceParts.val.match(/^(\$[\d.]+)/)[1] : priceParts.val}
                          </span>
                          <span className="text-[11.5px] sm:text-xs text-[#6A6C7D] font-semibold leading-none">
                            {priceParts.val.replace(/^(\$[\d.]+)\s*/, '')}
                          </span>
                        </div>
                      </div>

                      {/* Botón WhatsApp Cotizar Original */}
                      <a
                        href={getWhatsappUrl(prod.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Cotizar ${prod.title} por WhatsApp`}
                        aria-label={`Cotizar ${prod.title} por WhatsApp`}
                        className="inline-flex items-center gap-1.5 sm:gap-2 h-[36px] sm:h-[40px] px-4 sm:px-5 rounded-full bg-[#25D366] hover:bg-[#1faa4f] text-white text-[12.5px] sm:text-[13.5px] font-extrabold shadow-[0_3px_12px_rgba(37,211,102,0.30)] hover:shadow-[0_6px_18px_rgba(37,211,102,0.50)] transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 active:scale-[0.97] shrink-0 cursor-pointer"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3.5 h-3.5 sm:w-[17px] sm:h-[17px] fill-white text-white shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.134 8.134 0 0 1-1.25-4.38c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39a8.106 8.106 0 0 1 2.39 5.77c0 4.51-3.66 8.16-8.16 8.16zm4.47-6.11c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
                        </svg>
                        <span>Cotizar</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navegación cruzada entre las demás categorías */}
          <div className="mt-16 pt-10 border-t border-gray-200/80">
            <h2 className="text-center text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">
              Explorar otras líneas de Maranatha
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {otherCategories.map((other) => (
                <Link
                  key={other.slug}
                  to={`/categoria/${other.slug}`}
                  className="group flex items-center justify-between p-4 rounded-2xl border border-[#DBC9DF] bg-[#DBC9DF]/15 hover:bg-[#E7D1FF]/25 hover:border-[#7E04A1] transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#141517] group-hover:text-[#7E04A1] transition-colors">
                      {other.title}
                    </span>
                    <span className="text-xs text-gray-500 font-normal mt-0.5">
                      {other.products.length} productos disponibles
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-[#DBC9DF] text-[#7E04A1] flex items-center justify-center group-hover:bg-[#7E04A1] group-hover:text-white transition-all duration-300 shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Modal de Zoom y Vista Rápida en Alta Resolución */}
      <ProductQuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
      />

      {/* 4. Footer de Autor */}
      <Footer />
    </div>
  );
}
