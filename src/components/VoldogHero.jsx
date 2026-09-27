import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle, MapPin, Clock, ChevronDown } from 'lucide-react';
import NavigationDrawer from './NavigationDrawer';

// Easing cúbico suave: aceleración inicial y desaceleración elástica al final (exacto referencia Voldog)
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

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

export default function VoldogHero() {
  const trackRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogDropdownOpen, setIsCatalogDropdownOpen] = useState(false);
  const catalogDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (catalogDropdownRef.current && !catalogDropdownRef.current.contains(e.target)) {
        setIsCatalogDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Progreso de scroll normalizado de 0 a 1
  const [progress, setProgress] = useState(0);
  const [config, setConfig] = useState({
    viewportHeight: 900,
    viewportWidth: 1200,
    isWorkspaceDisplay: true,
    exteriorPad: 35,
    interiorPadY: 48,
    interiorPadX: 48,
    initialRadius: 50,
    compactRadius: 28,
    compactHeight: 155,
    stickyPadX: 80,
    scrollDistance: 450,
    logoScale: 3.8,
    logoTranslateY: 145,
    circleMarginTop: 215,
    circleSize: 400,
    buttonConfig: {
      height: 94,
      paddingLeft: 48,
      paddingRight: 16,
      gap: 28,
      fontSize: 24,
      arrowSize: 78,
      iconSize: 32,
    },
  });

  useEffect(() => {
    const updateConfig = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const navH = 80;

      // Detección exacta del monitor del espacio de trabajo del usuario (1920x1080 estándar / pantallas grandes)
      const isWorkspaceDisplay = vw >= 1536 && vh >= 850;

      if (isWorkspaceDisplay) {
        // 1. ESPACIO DE TRABAJO DEL USUARIO: 100% INTACTO E INMUTABLE (DIMENSIONES EXACTAS ORIGINALES)
        const extPad = 35;
        const compactH = 155;
        const gap = 35;
        const finalHeroBot = (navH - 1) + compactH;
        const dist = Math.max(360, vh - (finalHeroBot + gap));
        setConfig({
          viewportHeight: vh,
          viewportWidth: vw,
          isWorkspaceDisplay: true,
          exteriorPad: extPad,
          interiorPadY: 48,
          interiorPadX: 48,
          initialRadius: 50,
          compactRadius: 28,
          compactHeight: compactH,
          stickyPadX: 80,
          scrollDistance: dist,
          logoScale: 3.8,
          logoTranslateY: 145,
          circleMarginTop: 215,
          circleSize: 400,
          buttonConfig: {
            height: 94,
            paddingLeft: 48,
            paddingRight: 16,
            gap: 28,
            fontSize: 24,
            arrowSize: 78,
            iconSize: 32,
          },
        });
      } else if (vw >= 1024) {
        // 2. LAPTOPS & MACBOOK (e.g. MacBook Air/Pro 13"/14", 1440x900, 1512x982, 1366x768, o ventanas con vh < 850)
        // Adaptación armónica impecable sin desbordamiento ni recorte del botón inferior
        const extPad = 26;
        const compactH = 140;
        const gap = 28;
        const finalHeroBot = (navH - 1) + compactH;
        const dist = Math.max(320, vh - (finalHeroBot + gap));

        // El círculo y los márgenes se escalan con proporción armónica para que todo quede perfectamente dentro del viewport
        const availableCenterH = Math.max(360, vh - (extPad * 2) - 80 - 72 - 52);
        const dynamicCircle = Math.min(290, Math.max(220, Math.round(availableCenterH * 0.62)));
        const dynamicMarginTop = Math.min(125, Math.max(90, Math.round(availableCenterH * 0.26)));
        const dynamicLogoY = Math.min(105, Math.max(78, Math.round(availableCenterH * 0.21)));

        setConfig({
          viewportHeight: vh,
          viewportWidth: vw,
          isWorkspaceDisplay: false,
          exteriorPad: extPad,
          interiorPadY: 26,
          interiorPadX: 36,
          initialRadius: 42,
          compactRadius: 24,
          compactHeight: compactH,
          stickyPadX: 50,
          scrollDistance: dist,
          logoScale: 3.05,
          logoTranslateY: dynamicLogoY,
          circleMarginTop: dynamicMarginTop,
          circleSize: dynamicCircle,
          buttonConfig: {
            height: 72,
            paddingLeft: 32,
            paddingRight: 12,
            gap: 20,
            fontSize: 18,
            arrowSize: 58,
            iconSize: 24,
          },
        });
      } else if (vw >= 768) {
        // 3. TABLETS (iPad en vertical u horizontal compacta, 768px a 1023px)
        const extPad = 22;
        const compactH = 130;
        const gap = 24;
        const finalHeroBot = (navH - 1) + compactH;
        const dist = Math.max(300, vh - (finalHeroBot + gap));

        const availableCenterH = Math.max(340, vh - (extPad * 2) - 80 - 68 - 48);
        const dynamicCircle = Math.min(270, Math.max(210, Math.round(availableCenterH * 0.60)));
        const dynamicMarginTop = Math.min(120, Math.max(85, Math.round(availableCenterH * 0.25)));
        const dynamicLogoY = Math.min(100, Math.max(75, Math.round(availableCenterH * 0.20)));

        setConfig({
          viewportHeight: vh,
          viewportWidth: vw,
          isWorkspaceDisplay: false,
          exteriorPad: extPad,
          interiorPadY: 24,
          interiorPadX: 30,
          initialRadius: 36,
          compactRadius: 22,
          compactHeight: compactH,
          stickyPadX: 36,
          scrollDistance: dist,
          logoScale: 2.85,
          logoTranslateY: dynamicLogoY,
          circleMarginTop: dynamicMarginTop,
          circleSize: dynamicCircle,
          buttonConfig: {
            height: 68,
            paddingLeft: 28,
            paddingRight: 10,
            gap: 16,
            fontSize: 17,
            arrowSize: 54,
            iconSize: 22,
          },
        });
      } else {
        // 4. MÓVILES (iPhone, Android, pantallas estrechas < 768px)
        const extPad = 12;
        const compactH = 115;
        const gap = 16;
        const finalHeroBot = (navH - 1) + compactH;
        const dist = Math.max(280, vh - (finalHeroBot + gap));

        const isShortPhone = vh < 700;
        const circleSize = isShortPhone ? 185 : 215;
        const circleMarginTop = isShortPhone ? 88 : 105;
        const logoTranslateY = isShortPhone ? 68 : 82;
        const logoScale = isShortPhone ? 2.2 : 2.45;
        const btnH = isShortPhone ? 56 : 62;
        const btnFontSize = isShortPhone ? 14.5 : 15.5;
        const arrowSize = isShortPhone ? 44 : 50;
        const iconSize = isShortPhone ? 18 : 20;

        setConfig({
          viewportHeight: vh,
          viewportWidth: vw,
          isWorkspaceDisplay: false,
          exteriorPad: extPad,
          interiorPadY: 16,
          interiorPadX: 16,
          initialRadius: 26,
          compactRadius: 18,
          compactHeight: compactH,
          stickyPadX: 16,
          scrollDistance: dist,
          logoScale: logoScale,
          logoTranslateY: logoTranslateY,
          circleMarginTop: circleMarginTop,
          circleSize: circleSize,
          buttonConfig: {
            height: btnH,
            paddingLeft: 24,
            paddingRight: 8,
            gap: 14,
            fontSize: btnFontSize,
            arrowSize: arrowSize,
            iconSize: iconSize,
          },
        });
      }
    };

    updateConfig();
    window.addEventListener('resize', updateConfig);
    return () => window.removeEventListener('resize', updateConfig);
  }, []);

  useEffect(() => {
    const handleScrollPos = (scrollY) => {
      const rawProgress = Math.min(1, Math.max(0, scrollY / config.scrollDistance));
      setProgress((prev) => {
        if (Math.abs(prev - rawProgress) < 0.0005) return prev;
        return rawProgress;
      });
    };

    let unsubLenis = null;
    const subscribeLenis = (lenisInstance) => {
      if (unsubLenis) return;
      unsubLenis = lenisInstance.on('scroll', ({ scroll }) => {
        handleScrollPos(scroll);
      });
      handleScrollPos(lenisInstance.scroll || window.scrollY || 0);
    };

    if (window.lenis) {
      subscribeLenis(window.lenis);
    } else {
      const onInit = (e) => subscribeLenis(e.detail);
      window.addEventListener('lenis-init', onInit, { once: true });
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollPos(window.scrollY || window.pageYOffset || 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScrollPos(window.scrollY || 0);

    return () => {
      if (unsubLenis) unsubLenis();
      window.removeEventListener('scroll', onScroll);
    };
  }, [config.scrollDistance]);

  const eased = easeInOutCubic(progress);

  const {
    viewportHeight,
    viewportWidth,
    exteriorPad,
    interiorPadY,
    interiorPadX,
    initialRadius,
    compactRadius,
    compactHeight,
    stickyPadX,
    scrollDistance,
  } = config;

  // 1. POSICIONAMIENTO Y TRANSFORMACIÓN CONTINUA DE LA NAVBAR
  // Navbar única anclada a top: 0, cuyos elementos internos se interpolan fluidamente sin crear capas duplicadas ni franjas
  const navHeight = 80;
  const initialNavTop = exteriorPad + interiorPadY;
  const navItemTranslateY = (1 - eased) * initialNavTop;

  // Padding horizontal de la navbar: de (exteriorPad + interiorPadX) a stickyPadX
  const initialNavPadX = exteriorPad + interiorPadX;
  const navPadX = (1 - eased) * initialNavPadX + eased * stickyPadX;

  // Opacidad del fondo blanco y blur sticky: interpolación suave y sincronizada
  const bgEased = Math.max(0, (eased - 0.15) / 0.85);

  // 2. HERO CONTAINER (#E7D1FF)
  // Sincronización continua exacta usando 'eased' para evitar cualquier desfasaje con la navbar
  const initialHeroHeight = Math.max(480, viewportHeight - exteriorPad * 2);
  const heroHeight = initialHeroHeight - eased * (initialHeroHeight - compactHeight);

  // Posición superior del hero card:
  // Inicialmente en exteriorPad (35px en desktop). Al compactarse, se acopla exactamente a la base de la navbar sticky (navHeight - 1),
  // eliminando totalmente cualquier franja o hueco blanco intermedio.
  const heroCardTop = (1 - eased) * exteriorPad + eased * (navHeight - 1);

  // Radio de esquinas redondeadas:
  // Las esquinas inferiores conservan su curvatura premium.
  // Las esquinas superiores se acoplan al ras con la barra sticky para evitar franjas blancas en esquinas.
  const currentTopRadius = (1 - eased) * initialRadius;
  const currentBottomRadius = initialRadius - eased * (initialRadius - compactRadius);

  // 3. LOGO 'MARANATHA' UNIFICADO (Transformación continua hero → sticky navbar)
  // Escala inicial monumental en el hero que se contrae con precisión al tamaño exacto de la navbar (1.0)
  const initialLogoScale = config.logoScale;
  const initialLogoTranslateY = config.logoTranslateY;

  const logoScale = (1 - eased) * initialLogoScale + eased * 1.0;
  const logoTranslateY = (1 - eased) * initialLogoTranslateY;

  const heroCircleSize = config.circleSize;
  const heroMarginTop = config.circleMarginTop;
  const heroButtonConfig = config.buttonConfig;

  // Interpolación de color continua: de Blanco Puro (#FFFFFF: 255, 255, 255) a Morado Maranatha (#7E04A1: 126, 4, 161)
  const logoR = Math.round((1 - eased) * 255 + eased * 126);
  const logoG = Math.round((1 - eased) * 255 + eased * 4);
  const logoB = Math.round((1 - eased) * 255 + eased * 161);
  const logoColor = `rgb(${logoR}, ${logoG}, ${logoB})`;

  // Sombra volumétrica del hero que se disuelve progresivamente hasta 'none' en la navbar
  const shadowAlpha = (1 - eased) * 0.22;
  const logoFilter = shadowAlpha > 0.01 ? `drop-shadow(0 4px 18px rgba(0, 0, 0, ${shadowAlpha.toFixed(3)}))` : 'none';

  // Video circular central: escala y desvanecimiento sutil progresivo (cero cortes bruscos)
  const videoScale = 1 - eased * 0.45;
  const videoTranslateY = -eased * (viewportWidth >= 768 ? 80 : 50);
  // Disolución suave y natural que desaparece de forma gradual y sedosa
  const videoOpacity = Math.max(0, 1 - eased * 1.6);

  // Padding interior dinámico de la tarjeta lavanda
  const currentPadY = (1 - eased) * interiorPadY + eased * 16;
  const currentPadX = (1 - eased) * interiorPadX + eased * 24;

  // Píldora inferior (Papelería Creativa en Cali)
  const bottomCtaOpacity = Math.max(0, 1 - eased * 2.4);
  const bottomCtaTranslateY = eased * 40;

  // 4. POSICIONAMIENTO CONTINUO DEL CONTENIDO SIGUIENTE (CERO SOLAPAMIENTO Y CERO HUECOS VACÍOS)
  const trackHeight = viewportHeight + scrollDistance;

  // Margen de separación exacto con el Hero (35px en desktop, 24px en tablet, 16px en móvil):
  const gapBelowHero = viewportWidth >= 1024 ? 35 : viewportWidth >= 768 ? 24 : 16;

  // Margen estático definitivo: 100% constante, elimina toda mutación de document.scrollHeight durante el scroll
  // Al ser -scrollDistance, trackHeight + finalMarginBottom = viewportHeight (cero solapamiento a scroll 0)
  const finalMarginBottom = -scrollDistance;

  return (
    <>
      {/* 1. NAVBAR UNIFICADA (Una sola navbar anclada a top: 0 con transformación progresiva continua) */}
      <header
        className="fixed left-0 top-0 w-full z-50 flex items-center font-peridot pointer-events-auto"
        style={{
          height: `${navHeight}px`,
          backgroundColor: `rgba(255, 255, 255, ${0.85 * bgEased})`,
          borderBottom: `1px solid rgba(229, 231, 235, ${0.75 * bgEased})`,
          boxShadow: bgEased <= 0.05
            ? 'none'
            : `0 4px 30px rgba(0, 0, 0, ${0.04 * bgEased})`,
          backdropFilter: bgEased <= 0.05
            ? 'none'
            : `blur(${12 * bgEased}px)`,
          WebkitBackdropFilter: bgEased <= 0.05
            ? 'none'
            : `blur(${12 * bgEased}px)`,
        }}
      >
          <div 
            className="w-full h-full flex items-center justify-between gap-4 will-change-transform"
            style={{
              paddingLeft: `${navPadX}px`,
              paddingRight: `${navPadX}px`,
              transform: `translateY(${navItemTranslateY}px)`,
            }}
          >
            {/* Navegación Izquierda - Escala generosa y presencia editorial */}
            <nav className="flex items-center space-x-7 sm:space-x-9 text-[15px] sm:text-[16px] md:text-[17px] font-semibold tracking-[-0.01em] text-[#7E04A1]">
              {/* Dropdown Desplegable: Catálogo y las 3 Categorías */}
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
                      isCatalogDropdownOpen ? 'w-full' : 'w-0 group-hover/btn:w-full'
                    }`}
                  />
                </Link>

                {/* Menú Desplegable Minimalista con Auténtico Estilo Maranatha */}
                <div
                  className={`absolute left-0 top-full pt-2 z-50 min-w-[230px] sm:min-w-[245px] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCatalogDropdownOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                      : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                  }`}
                >
                  <div className="bg-white border border-[#EBD6FA] rounded-2xl p-2 shadow-[0_16px_40px_rgba(126,4,161,0.12)] font-peridot">
                    <div className="space-y-1">
                      {NAV_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={`/categoria/${cat.slug}`}
                          onClick={() => setIsCatalogDropdownOpen(false)}
                          className="group/item flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] sm:text-[14.5px] font-semibold text-[#34076E] hover:text-[#7E04A1] hover:bg-[#FAF3FF] transition-all duration-200 whitespace-nowrap"
                        >
                          <span className="leading-snug tracking-tight">
                            {cat.title}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#7E04A1] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0 ml-3" />
                        </Link>
                      ))}
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
              <a
                href="#proceso"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('proceso');
                  if (target) {
                    if (window.lenis) {
                      window.lenis.scrollTo(target, { offset: 0, duration: 1.2 });
                    } else {
                      target.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="hover:opacity-75 transition-opacity duration-150 relative py-1 group hidden md:inline-block cursor-pointer"
              >
                Cómo trabajamos
                <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#7E04A1] transition-all duration-300 group-hover:w-full" />
              </a>
            </nav>

            {/* Isotipo Central y Logotipo Unificado: Unicornio al inicio y transformación continua del texto maranatha */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full flex items-center justify-center pointer-events-none">
              {/* Unicornio visible en estado inicial del Hero - Silueta blanca pura estilo Voldog */}
              <div
                className="flex items-center justify-center will-change-transform"
                style={{
                  opacity: Math.max(0, 1 - eased * 2.8),
                  transform: `scale(${1 - eased * 0.25})`,
                  pointerEvents: eased > 0.3 ? 'none' : 'auto',
                }}
              >
                <img
                  src="/unicornio-white.svg"
                  alt="Maranatha"
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[86px] lg:h-[86px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
                />
              </div>

              {/* Logotipo Único Maranatha: Un solo elemento visual continuo hero → sticky navbar con interpolación de escala, posición y color */}
              <Link
                to="/"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    if (window.lenis) {
                      window.lenis.scrollTo(0, { duration: 1.0 });
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }
                }}
                title="Maranatha - Ir al inicio"
                className="absolute left-1/2 top-1/2 font-['Pacifico',cursive] text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] tracking-tight leading-none hover:opacity-85 transition-opacity pb-1 whitespace-nowrap select-none pointer-events-auto will-change-transform cursor-pointer"
                style={{
                  color: logoColor,
                  transform: `translate3d(-50%, calc(-50% + ${logoTranslateY}px), 0) scale(${logoScale})`,
                  transformOrigin: 'center center',
                  filter: logoFilter,
                }}
              >
                maranatha
              </Link>
            </div>

            {/* Acciones Derecha - Escala Protagónica */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
              <div className="flex items-center gap-2.5 text-[#7E04A1]">
                {/* FAQ / Preguntas Frecuentes - Icono puro */}
                <a
                  href="#preguntas-frecuentes"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('preguntas-frecuentes');
                    if (target) {
                      if (window.lenis) {
                        window.lenis.scrollTo(target, { offset: 0, duration: 1.2 });
                      } else {
                        target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  aria-label="Preguntas Frecuentes"
                  title="Preguntas frecuentes y tiempos de entrega"
                  className="p-2 hover:opacity-75 transition-opacity text-[#7E04A1] cursor-pointer"
                >
                  <HelpCircle className="w-[22px] h-[22px] sm:w-[25px] sm:h-[25px] stroke-[2.2]" />
                </a>
              </div>

              {/* Botón Directo a WhatsApp */}
              <a
                href="https://wa.me/573145854213?text=Hola%20Maranatha%20%F0%9F%91%8B%2C%20quisiera%20recibir%20asesor%C3%ADa%20sobre%20sus%20productos."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center justify-center gap-2.5 h-[48px] sm:h-[52px] px-6 sm:px-8 bg-[#7E04A1] hover:bg-[#5E0279] text-white text-[14px] sm:text-[15px] font-bold rounded-full shadow-[0_4px_18px_rgba(126,4,161,0.28)] hover:shadow-xl transition-all duration-300 active:scale-95 font-peridot cursor-pointer group/btn"
              >
                <svg
                  className="w-5 h-5 fill-current shrink-0 transform group-hover/btn:scale-110 transition-transform duration-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.134 8.134 0 0 1-1.25-4.38c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39a8.106 8.106 0 0 1 2.39 5.77c0 4.51-3.66 8.16-8.16 8.16zm4.47-6.11c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Botón Circular Hamburguesa para abrir el menú */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Abrir menú"
                className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-full bg-[#7E04A1] hover:bg-[#5E0279] text-white flex flex-col items-center justify-center gap-[5px] transition-all duration-300 active:scale-95 shadow-[0_4px_18px_rgba(126,4,161,0.28)] shrink-0 cursor-pointer"
              >
                <span className="w-5 sm:w-6 h-[2.5px] bg-white rounded-full" />
                <span className="w-5 sm:w-6 h-[2.5px] bg-white rounded-full" />
              </button>
            </div>
          </div>
        </header>

      {/* 2. TRACK DE SCROLL Y CONTENEDOR HERO */}
      <section 
        ref={trackRef} 
        className="relative w-full z-20"
        style={{ 
          height: `${trackHeight}px`,
          marginBottom: `${finalMarginBottom}px`,
        }}
      >
        {/* CONTENEDOR STICKY PINNED EN VIEWPORT */}
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-transparent select-none pointer-events-none">

          {/* 2. CONTENEDOR LAVANDA DEL HERO (#E7D1FF) CON DIMENSIONES Y PADDING ORIGINALES */}
        <div
          className="absolute left-0 right-0 mx-auto bg-[#E7D1FF] overflow-hidden flex flex-col justify-between pointer-events-auto will-change-transform"
          style={{
            top: `${heroCardTop}px`,
            height: `${heroHeight}px`,
            width: `calc(100% - ${exteriorPad * 2}px)`,
            borderTopLeftRadius: `${currentTopRadius}px`,
            borderTopRightRadius: `${currentTopRadius}px`,
            borderBottomLeftRadius: `${currentBottomRadius}px`,
            borderBottomRightRadius: `${currentBottomRadius}px`,
            paddingTop: `${currentPadY}px`,
            paddingBottom: `${currentPadY}px`,
            paddingLeft: `${currentPadX}px`,
            paddingRight: `${currentPadX}px`,
          }}
        >
          {/* Espacio superior correspondiente al header */}
          <div className="w-full shrink-0" style={{ height: `${(1 - eased) * navHeight}px` }} />

          {/* ESCENARIO CENTRAL INTERNO: CAJA TIPOGRÁFICA EXACTA DE VOLDOG (Sin corte de overflow) */}
          <div className="relative flex-grow flex flex-col items-center justify-center w-full my-auto">
            
            {/* H1 Semántico para Google SEO */}
            <h1 className="sr-only">Maranatha | Papelería Creativa y Empaques Personalizados en Cali</h1>



            {/* Contenedor Central con el Emblema Animado (Desvanecimiento sutil continuo sin cortes) */}
            <div
              id="hero-video-container"
              className="relative z-20 flex items-center justify-center aspect-square select-none pointer-events-none will-change-transform"
              style={{
                width: `${heroCircleSize}px`,
                height: `${heroCircleSize}px`,
                marginTop: `${(1 - eased) * heroMarginTop}px`,
                opacity: videoOpacity,
                transform: `translateY(${videoTranslateY}px) scale(${videoScale})`,
              }}
            >
              <div
                className="w-full h-full rounded-full overflow-hidden shadow-[0_12px_45px_rgba(0,0,0,0.18)]"
                style={{
                  clipPath: 'circle(48.5% at 50% 50%)',
                  WebkitClipPath: 'circle(48.5% at 50% 50%)',
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                >
                  <source src="/logo-circle.mp4" type="video/mp4" />
                  <source src="/logo-animado.mp4" type="video/mp4" />
                  Tu navegador no soporta video HTML5.
                </video>
              </div>
            </div>

          </div>

          {/* 3. ELEMENTO INFERIOR: BOTÓN PRINCIPAL CON ASIMETRÍA LIMPIA - ESCALA PROTAGÓNICA */}
          <footer 
            className="relative z-30 w-full flex items-center justify-start font-peridot will-change-transform"
            style={{
              opacity: bottomCtaOpacity,
              transform: `translateY(${bottomCtaTranslateY}px)`,
              pointerEvents: eased > 0.35 ? 'none' : 'auto',
            }}
          >
            {/* Botón Izquierdo: Explorar Catálogo */}
            <Link
              to="/catalogo"
              className="relative inline-flex items-center justify-between rounded-full bg-white text-gray-900 shadow-[0_16px_50px_rgba(0,0,0,0.22)] hover:shadow-[0_20px_60px_rgba(126,4,161,0.38)] transition-shadow duration-300 group active:scale-95 overflow-hidden select-none cursor-pointer"
              style={{
                height: `${heroButtonConfig.height}px`,
                paddingLeft: `${heroButtonConfig.paddingLeft}px`,
                paddingRight: `${heroButtonConfig.paddingRight}px`,
                gap: `${heroButtonConfig.gap}px`,
              }}
            >
              <div className="voldog-btn-expand" />

              <span 
                className="relative z-10 font-bold tracking-tight text-[#1C1D20] group-hover:text-white transition-colors duration-500 pointer-events-none whitespace-nowrap"
                style={{ fontSize: `${heroButtonConfig.fontSize}px` }}
              >
                Explorar Catálogo
              </span>

              <div 
                className="relative z-10 rounded-full flex items-center justify-center text-white shrink-0 pointer-events-none"
                style={{
                  width: `${heroButtonConfig.arrowSize}px`,
                  height: `${heroButtonConfig.arrowSize}px`,
                }}
              >
                <ArrowRight 
                  className="stroke-[2.5]" 
                  style={{
                    width: `${heroButtonConfig.iconSize}px`,
                    height: `${heroButtonConfig.iconSize}px`,
                  }}
                />
              </div>
            </Link>
          </footer>

        </div>

      </div>

      </section>

      {/* 3. Menú Lateral Drawer */}
      <NavigationDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
