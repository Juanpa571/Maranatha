import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ZoomIn } from 'lucide-react';
import { useCatalog } from '../hooks/useCatalog';
import { usePageSeo } from '../hooks/usePageSeo';
import SubpageHeader from '../components/SubpageHeader';
import SubpageVoldogHero from '../components/SubpageVoldogHero';
import Footer from '../components/Footer';
import ProductQuickViewModal from '../components/ProductQuickViewModal';
import { getProductTactileSpecs } from '../utils/productSpecs';

export default function CatalogoPage() {
  const { allProducts, categories, categoriesList } = useCatalog();
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const tabs = useMemo(() => {
    return [
      { id: 'todos', label: 'Todos', count: allProducts.length },
      ...categoriesList.map((cat) => ({
        id: cat.slug,
        label: cat.title,
        count: cat.products?.length || 0,
        slug: cat.slug,
      })),
    ];
  }, [allProducts.length, categoriesList]);

  // Schema.org BreadcrumbList + ItemList según SEO Bible 3.0 (Módulos 08 y 12)
  const catalogSchema = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: 'https://maranathapapeleria.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Catálogo',
              item: 'https://maranathapapeleria.com/catalogo',
            },
          ],
        },
        {
          '@type': 'ItemList',
          name: 'Catálogo de Papelería Creativa, Empaques e Insumos en Cali | Maranatha',
          description:
            'Catálogo completo de stickers troquelados, empaques personalizados, cajas 3D, insumos y papelería empresarial en Cali.',
          numberOfItems: allProducts.length,
          itemListElement: allProducts.map((prod, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: prod.title,
            item: {
              '@type': 'Product',
              name: prod.title,
              image: prod.image?.startsWith('http')
                ? prod.image
                : `https://maranathapapeleria.com${prod.image}`,
              description: prod.description || prod.subtitle || prod.title,
              offers: {
                '@type': 'Offer',
                price: String(prod.priceNum || 0),
                priceCurrency: 'COP',
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'Organization',
                  name: 'Maranatha Papelería Creativa',
                },
              },
            },
          })),
        },
      ],
    };
  }, [allProducts]);

  usePageSeo({
    title: 'Catálogo de Papelería y Empaques en Cali | Maranatha',
    description:
      'Catálogo completo en Cali: stickers troquelados, cajas temáticas 3D, insumos, tarjetas de presentación y empaques comerciales. Cotiza al +57 314 585 4213.',
    canonical: 'https://maranathapapeleria.com/catalogo',
    schema: catalogSchema,
  });

  const handleOpenProduct = useCallback((prod) => {
    setSelectedProduct(prod);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      window.lenis.resize();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

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

  const filteredProducts =
    activeTab === 'todos'
      ? allProducts
      : allProducts.filter((prod) => prod.categorySlug === activeTab);

  const currentCategoryData = categories[activeTab] || null;

  return (
    <div className="min-h-[100dvh] bg-white font-peridot text-[#141517] selection:bg-[#E7D1FF] selection:text-[#7E04A1]">
      
      {/* 1. Header Minimalista y Funcional con Dropdown de Catálogo, WhatsApp oficial y Drawer */}
      <SubpageHeader />

      {/* 2. Hero Monumental Voldog con Cinta Corrediza (Marquee) y Arco Escultórico */}
      <SubpageVoldogHero
        tickerItems={[
          'CATÁLOGO COMPLETO',
          'MARANATHA',
          'HECHO EN CALI',
          'PAPELERÍA & EMPAQUES',
          'SIN MÍNIMOS',
          'CALIDAD ARTESANAL',
        ]}
        breadcrumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Catálogo Completo' },
        ]}
        seoTitle="Maranatha | Catálogo de Papelería Creativa, Cajas y Stickers en Cali"
        description="Explora nuestra vitrina completa de cajas temáticas, stickers troquelados, insumos y papelería para marcas sin mínimos de producción y con entrega rápida en Cali."
      />

      {/* 3. Cuadrícula de Productos con Filtros por Pestaña */}
      <section className="w-full px-4 sm:px-8 md:px-[6vw] lg:px-[8.5%] py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* H2 Semántico para ordenar la jerarquía del catálogo (SEO Bible) */}
          <h2 className="sr-only">Vitrina Completa de Productos: Cajas, Stickers, Invitaciones e Insumos</h2>

          {/* Barra de Filtros Instantáneos (Tabs Horizontales Tipográficos - Cero Cápsulas) */}
          <div className="mb-10 sm:mb-12 border-b border-gray-200/80 pb-3 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-3 text-xs sm:text-sm font-semibold transition-all relative cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-[#7E04A1]'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`ml-1.5 text-[11px] font-normal ${isActive ? 'text-[#7E04A1]' : 'text-gray-400'}`}>
                      ({tab.count})
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#7E04A1] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Enlace contextual a la categoría si está filtrado */}
            {currentCategoryData && (
              <Link
                to={`/categoria/${currentCategoryData.slug}`}
                className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-[#7E04A1] hover:underline shrink-0"
              >
                <span>Ver categoría {currentCategoryData.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Cuadrícula de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 items-stretch w-full">
            {filteredProducts.map((prod) => {
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

                      {/* Micro-fichas táctiles (Build in Amsterdam) */}
                      {(() => {
                        const specs = getProductTactileSpecs(prod);
                        return (
                          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10.5px] font-semibold text-[#7E04A1] bg-[#DBC9DF]/30 px-2 py-0.5 rounded-md truncate max-w-[140px]">
                              {specs.acabado.value}
                            </span>
                            <span className="text-[10.5px] font-medium text-[#55555C] bg-gray-100 px-2 py-0.5 rounded-md">
                              {specs.tiraje.value}
                            </span>
                          </div>
                        );
                      })()}
                    </div>

                      <div className="pt-3.5 mt-3.5 sm:mt-4 border-t border-[#DBC9DF]/40 flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
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

                        {/* Enlace contextual a la Categoría */}
                        <Link
                          to={`/categoria/${prod.categorySlug}`}
                          className="w-full pt-1 pb-0.5 text-center text-[12px] sm:text-[12.5px] font-bold text-[#7E04A1] hover:brightness-90 flex items-center justify-center gap-1.5 transition-colors group/cat cursor-pointer"
                        >
                          <span>Ver más en {prod.categoryName || prod.categoryTitle}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#7E04A1] shrink-0 transform group-hover/cat:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enlaces a las subpáginas específicas de categoría */}
          <div className="mt-14 pt-8 border-t border-gray-200/70 text-center">
            <h2 className="text-xs sm:text-sm text-gray-500 font-medium">
              Explorar por categoría especializada:
            </h2>
            <div className="mt-3 flex items-center justify-center gap-4 sm:gap-6 flex-wrap text-xs sm:text-sm font-semibold text-[#7E04A1]">
              <Link to="/categoria/papeleria-creativa" className="hover:underline">
                Papelería Creativa →
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/categoria/papeleria-empresarial" className="hover:underline">
                Papelería Empresarial →
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/categoria/insumos" className="hover:underline">
                Insumos de Papelería →
              </Link>
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

      {/* 4. Footer de Autor con Navegación Semántica y Horarios */}
      <Footer />
    </div>
  );
}
