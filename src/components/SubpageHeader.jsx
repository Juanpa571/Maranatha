import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import NavigationDrawer from './NavigationDrawer';

const NAV_CATEGORIES = [
  {
    slug: 'papeleria-creativa',
    title: 'Papelería Creativa',
  },
  {
    slug: 'insumos',
    title: 'Insumos de Papelería',
  },
  {
    slug: 'papeleria-empresarial',
    title: 'Papelería Empresarial',
  },
];

export default function SubpageHeader({ activeCategorySlug = null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogDropdownOpen, setIsCatalogDropdownOpen] = useState(false);
  const catalogDropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (catalogDropdownRef.current && !catalogDropdownRef.current.contains(e.target)) {
        setIsCatalogDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cerrar menú y dropdown en cambios de ruta
  useEffect(() => {
    setIsCatalogDropdownOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.03)] font-peridot transition-all">
        <div className="w-full h-[76px] sm:h-[80px] max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">
          
          {/* Navegación Izquierda: Catálogo desplegable con las 3 categorías + enlaces editoriales */}
          <nav className="flex items-center space-x-6 sm:space-x-8 text-[15px] sm:text-[16px] font-semibold tracking-[-0.01em] text-[#7E04A1]">
            {/* Dropdown Desplegable: Catálogo */}
            <div
              ref={catalogDropdownRef}
              className="relative py-2"
              onMouseEnter={() => setIsCatalogDropdownOpen(true)}
              onMouseLeave={() => setIsCatalogDropdownOpen(false)}
            >
              <Link
                to="/catalogo"
                onClick={(e) => {
                  if (window.innerWidth < 1024 && !isCatalogDropdownOpen) {
                    e.preventDefault();
                    setIsCatalogDropdownOpen(true);
                  } else {
                    setIsCatalogDropdownOpen(false);
                  }
                }}
                className="inline-flex items-center gap-1.5 hover:opacity-75 transition-opacity duration-150 py-1 cursor-pointer select-none group/btn"
                aria-expanded={isCatalogDropdownOpen}
                aria-haspopup="true"
              >
                <span>Catálogo</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 stroke-[2.2] transition-transform duration-300 ${
                    isCatalogDropdownOpen
                      ? 'rotate-180 text-[#7E04A1]'
                      : 'text-[#7E04A1]/80 group-hover/btn:rotate-180'
                  }`}
                />
                <span
                  className={`absolute bottom-1 left-0 h-[2.5px] bg-[#7E04A1] transition-all duration-300 ${
                    isCatalogDropdownOpen || location.pathname === '/catalogo'
                      ? 'w-full'
                      : 'w-0 group-hover/btn:w-full'
                  }`}
                />
              </Link>

              {/* Menú Desplegable Minimalista con Auténtico Estilo Maranatha */}
              <div
                className={`absolute left-0 top-full pt-2 z-50 min-w-[240px] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isCatalogDropdownOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                    : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                }`}
              >
                <div className="bg-white border border-[#EBD6FA] rounded-2xl p-2.5 shadow-[0_16px_40px_rgba(126,4,161,0.14)] font-peridot">
                  <div className="space-y-1">
                    <Link
                      to="/catalogo"
                      onClick={() => setIsCatalogDropdownOpen(false)}
                      className={`group/item flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                        location.pathname === '/catalogo'
                          ? 'bg-[#FAF3FF] text-[#7E04A1]'
                          : 'text-[#34076E] hover:text-[#7E04A1] hover:bg-[#FAF3FF]'
                      }`}
                    >
                      <span className="leading-snug tracking-tight font-bold">Ver Catálogo Completo</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#7E04A1] shrink-0 ml-2" />
                    </Link>

                    <div className="my-1 border-t border-[#F0E6FA]" />

                    {NAV_CATEGORIES.map((cat) => {
                      const isActive = activeCategorySlug === cat.slug;
                      return (
                        <Link
                          key={cat.slug}
                          to={`/categoria/${cat.slug}`}
                          onClick={() => setIsCatalogDropdownOpen(false)}
                          className={`group/item flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 whitespace-nowrap ${
                            isActive
                              ? 'bg-[#FAF3FF] text-[#7E04A1] font-bold'
                              : 'text-[#34076E] hover:text-[#7E04A1] hover:bg-[#FAF3FF]'
                          }`}
                        >
                          <span className="leading-snug tracking-tight">
                            {cat.title}
                          </span>
                          <ArrowRight className={`w-3.5 h-3.5 text-[#7E04A1] shrink-0 ml-3 transition-all duration-200 ${
                            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0'
                          }`} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              className="hover:opacity-75 transition-opacity duration-150 relative py-1 group cursor-default hidden sm:inline-block"
              title="Próximamente: Temporadas y eventos especiales"
            >
              Eventos
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#7E04A1] transition-all duration-300 group-hover:w-full" />
            </button>

            <Link
              to="/#proceso"
              className="hover:opacity-75 transition-opacity duration-150 relative py-1 group hidden md:inline-block cursor-pointer"
            >
              Cómo trabajamos
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#7E04A1] transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Isotipo Central: Siempre lleva a la landing page principal */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <Link
              to="/"
              title="Maranatha - Ir al inicio"
              className="font-['Pacifico',cursive] text-[28px] sm:text-[32px] md:text-[36px] text-[#7E04A1] tracking-tight leading-none hover:opacity-85 transition-opacity pb-1 whitespace-nowrap select-none cursor-pointer"
            >
              maranatha
            </Link>
          </div>

          {/* Acciones Derecha: Botón de WhatsApp oficial con icono SVG + Menú Drawer + FAQ */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4">
            {/* FAQ / Preguntas Frecuentes */}
            <Link
              to="/#preguntas-frecuentes"
              aria-label="Preguntas Frecuentes"
              title="Preguntas frecuentes y tiempos de entrega"
              className="p-2 hover:opacity-75 transition-opacity text-[#7E04A1] hidden sm:inline-flex"
            >
              <HelpCircle className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] stroke-[2.2]" />
            </Link>

            {/* Botón WhatsApp con Icono Oficial de WhatsApp */}
            <a
              href="https://wa.me/573145854213?text=Hola%20Maranatha%20%F0%9F%91%8B%2C%20quisiera%20recibir%20asesor%C3%ADa%20sobre%20sus%20productos."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-[42px] sm:h-[46px] px-4 sm:px-5.5 bg-[#7E04A1] hover:bg-[#5E0279] text-white text-[13.5px] sm:text-[14.5px] font-bold rounded-full shadow-[0_4px_18px_rgba(126,4,161,0.22)] hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer group/btn"
              title="Asesoría y cotizaciones por WhatsApp"
            >
              <svg
                className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current shrink-0 transform group-hover/btn:scale-110 transition-transform duration-300"
                viewBox="0 0 24 24"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.134 8.134 0 0 1-1.25-4.38c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39a8.106 8.106 0 0 1 2.39 5.77c0 4.51-3.66 8.16-8.16 8.16zm4.47-6.11c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Botón Circular Hamburguesa para abrir el menú lateral */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Abrir menú"
              className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] rounded-full bg-[#7E04A1] hover:bg-[#5E0279] text-white flex flex-col items-center justify-center gap-[4.5px] transition-all duration-300 active:scale-95 shadow-[0_4px_18px_rgba(126,4,161,0.22)] shrink-0 cursor-pointer"
            >
              <span className="w-4.5 sm:w-5 h-[2.5px] bg-white rounded-full" />
              <span className="w-4.5 sm:w-5 h-[2.5px] bg-white rounded-full" />
            </button>
          </div>

        </div>
      </header>

      {/* Menú lateral Drawer compartido */}
      <NavigationDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
