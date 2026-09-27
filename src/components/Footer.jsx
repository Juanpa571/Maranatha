import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, MapPin, Clock, ArrowUp, Mail } from 'lucide-react';

export default function Footer() {
  const location = useLocation();

  const handleScrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const whatsappNumber = '+57 314 5854213';
  const whatsappUrl = `https://wa.me/573145854213?text=${encodeURIComponent('Hola Maranatha 👋, me comunico desde la página web y quisiera cotizar un pedido en Cali.')}`;

  // Navegación inteligente a anclas de HomePage con offset: 0 y soporte SPA
  const renderAnchorLink = (anchor, label) => {
    if (location.pathname === '/') {
      return (
        <a
          href={anchor}
          onClick={(e) => {
            e.preventDefault();
            const el = document.querySelector(anchor);
            if (el) {
              if (window.lenis) {
                window.lenis.resize();
                window.lenis.scrollTo(el, { offset: 0, duration: 1.2 });
              } else {
                el.scrollIntoView({ behavior: 'smooth' });
              }
              if (window.location.hash !== anchor) {
                window.history.pushState(null, '', anchor);
              }
            }
          }}
          className="text-[#9898A4] hover:text-white transition-colors duration-200 block whitespace-nowrap cursor-pointer"
        >
          {label}
        </a>
      );
    }
    return (
      <Link
        to={`/${anchor}`}
        className="text-[#9898A4] hover:text-white transition-colors duration-200 block whitespace-nowrap cursor-pointer"
      >
        {label}
      </Link>
    );
  };

  return (
    <footer
      id="footer"
      className="w-full bg-[#16161A] text-white font-peridot border-t border-[#25252D] selection:bg-[#7E04A1] selection:text-white relative overflow-hidden"
    >
      {/* Contenedor Principal del Footer */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 pt-16 sm:pt-20 md:pt-22 pb-10 sm:pb-12">
        
        {/* Layout de 4 Columnas Amplio y Separado (Calcado al Boceto) */}
        <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-between items-start gap-10 sm:gap-12 lg:gap-8 xl:gap-14 pb-14 sm:pb-16 w-full">
          
          {/* ======================================================== */}
          {/* COLUMNA 1: Marca, Identidad y Tarjeta de Karla           */}
          {/* ======================================================== */}
          <div className="w-full sm:w-[300px] lg:w-[320px] xl:w-[350px] shrink-0 flex flex-col justify-between">
            <div>
              {/* Logotipo en Pacifico Color Rosa/Lavanda (#EDA3FF) */}
              <Link
                to="/"
                onClick={location.pathname === '/' ? handleScrollToTop : undefined}
                className="font-pacifico text-[34px] sm:text-[38px] text-[#EDA3FF] tracking-tight hover:opacity-90 transition-opacity inline-block leading-none pb-1"
              >
                maranatha
              </Link>

              {/* Subtítulo en dos líneas */}
              <h3 className="text-[#E2E2EA] text-[15px] sm:text-[15.5px] font-normal leading-[1.3] mt-2.5">
                Papelería Creativa &<br />
                Taller Artesanal
              </h3>

              {/* Párrafo descriptivo exacto */}
              <p className="text-[#9898A4] text-[13.5px] sm:text-[14px] leading-[1.5] mt-3.5 max-w-[280px]">
                Papelería creativa, stickers, cajas y productos personalizados hechos en Cali.
              </p>
            </div>

            {/* Tarjeta de Karla - Recepcionista del taller */}
            <div className="mt-6 sm:mt-7 relative rounded-[20px] bg-[#1F1D26] border border-[#2F2C3A] p-3 sm:p-3.5 flex items-center gap-3 sm:gap-3.5 max-w-[340px] sm:max-w-[350px] shadow-[0_6px_20px_rgba(0,0,0,0.25)] group hover:border-[#7E04A1]/40 transition-all duration-300 overflow-hidden">
              {/* Foto de Karla sin fondo */}
              <div className="relative w-[90px] sm:w-[96px] h-[86px] sm:h-[92px] shrink-0 flex items-end justify-center">
                <img
                  src="/karla-face.png"
                  alt="Karla - Recepcionista del taller"
                  className="w-full h-full object-contain object-bottom transform group-hover:scale-105 transition-transform duration-300"
                  draggable={false}
                />
                {/* Corazón doodle morado flotante sobre Karla */}
                <div className="absolute -top-0.5 right-0 pointer-events-none transform rotate-12">
                  <svg className="w-3.5 h-3.5 text-[#C084FC] fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
              </div>

              {/* Información de Karla */}
              <div className="flex-1 min-w-0 pr-0.5">
                <div className="flex items-center gap-1.5">
                  {/* Icono huella */}
                  <svg className="w-4 h-4 text-[#EDA3FF] fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 11c-1.65 0-3 1.35-3 3 0 1.25.75 2.5 3 2.5s3-1.25 3-2.5c0-1.65-1.35-3-3-3z"/>
                    <circle cx="7" cy="8.5" r="1.75"/>
                    <circle cx="10.25" cy="5.5" r="1.75"/>
                    <circle cx="13.75" cy="5.5" r="1.75"/>
                    <circle cx="17" cy="8.5" r="1.75"/>
                  </svg>
                  <span className="font-pacifico text-[19px] sm:text-[21px] text-[#EDA3FF] leading-none pt-0.5">
                    Karla
                  </span>
                </div>

                <p className="text-[12.5px] sm:text-[13px] font-medium text-[#E2E2EA] leading-snug mt-1">
                  Recepcionista del taller
                </p>

                <p className="text-[11px] sm:text-[11.5px] text-[#9898A4] leading-[1.35] mt-1 font-normal">
                  Experta en recibir visitas y supervisar todo el taller.
                </p>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* COLUMNA 2: EXPLORA                                       */}
          {/* ======================================================== */}
          <div className="shrink-0 min-w-[140px] xl:min-w-[160px]">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white mb-4 sm:mb-5">
              EXPLORA
            </h4>
            <nav aria-label="Navegación Explora">
              <ul className="space-y-2.5 sm:space-y-3 text-[13.5px] sm:text-[14px]">
                <li>
                  {renderAnchorLink('#catalogo-destacado', 'Productos')}
                </li>
                <li>
                  <Link
                    to="/categoria/papeleria-creativa"
                    className="text-[#9898A4] hover:text-white transition-colors duration-200 block whitespace-nowrap"
                  >
                    Papelería creativa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categoria/papeleria-creativa"
                    className="text-[#9898A4] hover:text-white transition-colors duration-200 block whitespace-nowrap"
                  >
                    Cajas y empaques
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categoria/papeleria-empresarial"
                    className="text-[#9898A4] hover:text-white transition-colors duration-200 block whitespace-nowrap"
                  >
                    Stickers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categoria/insumos"
                    className="text-[#9898A4] hover:text-white transition-colors duration-200 block whitespace-nowrap"
                  >
                    Insumos
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => e.preventDefault()}
                    className="text-[#9898A4] hover:text-white transition-colors duration-200 block whitespace-nowrap cursor-default"
                    title="Próximamente: Temporadas y eventos especiales"
                  >
                    Eventos (Próximamente)
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* ======================================================== */}
          {/* COLUMNA 3: AYUDA                                         */}
          {/* ======================================================== */}
          <div className="shrink-0 min-w-[170px] xl:min-w-[190px]">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white mb-4 sm:mb-5">
              AYUDA
            </h4>
            <nav aria-label="Navegación Ayuda">
              <ul className="space-y-2.5 sm:space-y-3 text-[13.5px] sm:text-[14px]">
                <li>
                  {renderAnchorLink('#proceso', 'Cómo trabajamos')}
                </li>
                <li>
                  {renderAnchorLink('#preguntas-frecuentes', 'Preguntas frecuentes')}
                </li>
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9898A4] hover:text-white transition-colors duration-200 block whitespace-nowrap"
                  >
                    Cotizar
                  </a>
                </li>
                <li>
                  {renderAnchorLink('#contacto', 'Contacto')}
                </li>
                <li>
                  <Link
                    to="/politica-de-privacidad"
                    className="text-[#9898A4] hover:text-white transition-colors duration-200 block text-left cursor-pointer whitespace-nowrap"
                  >
                    Políticas de privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terminos-y-condiciones"
                    className="text-[#9898A4] hover:text-white transition-colors duration-200 block text-left cursor-pointer whitespace-nowrap"
                  >
                    Términos y condiciones
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* ======================================================== */}
          {/* COLUMNA 4: CONTACTO                                      */}
          {/* ======================================================== */}
          <div className="w-full sm:w-[260px] lg:w-[280px] xl:w-[300px] shrink-0">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white mb-4 sm:mb-5">
              CONTACTO
            </h4>
            
            <div className="space-y-4 sm:space-y-4.5 text-[13.5px]">
              
              {/* Fila 1: WhatsApp Oficial Nítido */}
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#EDA3FF] fill-current shrink-0 mt-0.5" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.134 8.134 0 0 1-1.25-4.38c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39a8.106 8.106 0 0 1 2.39 5.77c0 4.51-3.66 8.16-8.16 8.16zm4.47-6.11c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
                </svg>
                <div className="leading-snug">
                  <span className="block text-[#9898A4] text-xs">WhatsApp</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-[#EDA3FF] transition-colors text-[14.5px]"
                  >
                    {whatsappNumber}
                  </a>
                </div>
              </div>

              {/* Fila 2: Correo Electrónico Oficial */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-[#EDA3FF] stroke-[1.9] shrink-0" />
                <div className="leading-snug">
                  <span className="block text-[#9898A4] text-xs">Correo electrónico</span>
                  <a
                    href="mailto:hola@maranathapapeleria.com"
                    className="font-medium text-white hover:text-[#EDA3FF] transition-colors text-[13.5px]"
                  >
                    hola@maranathapapeleria.com
                  </a>
                </div>
              </div>

              {/* Fila 3: Cali, Valle del Cauca */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-[#EDA3FF] stroke-[1.9] shrink-0" />
                <div className="leading-snug">
                  <span className="block text-white font-normal text-[13.5px]">
                    Cali, Valle del Cauca
                  </span>
                  <span className="text-[#9898A4] text-xs">
                    Colombia
                  </span>
                </div>
              </div>

              {/* Fila 4: Horario de atención */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 text-[#EDA3FF] stroke-[1.9] shrink-0" />
                <div className="leading-snug space-y-0.5">
                  <span className="block text-white font-normal text-[13.5px]">
                    Horario de atención
                  </span>
                  <p className="text-[#9898A4] text-xs">
                    Lunes a Viernes: 09:00 – 18:00
                  </p>
                  <p className="text-[#9898A4] text-xs">
                    Sábados y Domingos: Cerrado
                  </p>
                </div>
              </div>

              {/* Fila 5: Redes Sociales Oficiales */}
              <div className="flex items-start gap-3 pt-1">
                <svg className="w-5 h-5 mt-0.5 text-[#EDA3FF] fill-none stroke-current stroke-[1.9] shrink-0" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <div className="leading-snug">
                  <span className="block text-[#9898A4] text-xs">Redes sociales</span>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-[13px]">
                    <a
                      href="https://www.instagram.com/maranathacalico"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#EDA3FF] transition-colors font-medium"
                    >
                      IG: @maranathacalico
                    </a>
                    <span className="text-[#444650]">•</span>
                    <a
                      href="https://www.tiktok.com/@maranathacalico"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#EDA3FF] transition-colors font-medium"
                    >
                      TikTok
                    </a>
                    <span className="text-[#444650]">•</span>
                    <a
                      href="https://www.facebook.com/maranatha.calico"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#EDA3FF] transition-colors font-medium"
                    >
                      FB: @maranatha.calico
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* BARRA INFERIOR / SUB-FOOTER CALCADO AL BOCETO            */}
        {/* ======================================================== */}
        <div className="pt-6 sm:pt-7 border-t border-[#25252D] flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Lado Izquierdo: Copyright exacto */}
          <div className="text-[12px] sm:text-[12.5px] text-[#7E828E] text-center md:text-left leading-relaxed">
            <span>© 2026 Maranatha Papelería Creativa. Cali, Colombia.</span>
            <span className="mx-2.5 inline-block text-[#444650]">•</span>
            <span>Todos los derechos reservados.</span>
          </div>

          {/* Lado Derecho: Iconos Sociales + Divisor + Volver Arriba */}
          <div className="flex items-center gap-4 sm:gap-5">
            
            {/* Redes Sociales Oficiales */}
            <div className="flex items-center gap-3 text-[#D0D0D8]">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/maranathacalico"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-[#EDA3FF] transition-colors"
                title="Instagram: @maranathacalico"
                aria-label="Instagram de Maranatha Papelería"
              >
                <svg className="w-[18px] h-[18px] fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@maranathacalico"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-[#EDA3FF] transition-colors"
                title="TikTok: @maranathacalico"
                aria-label="TikTok de Maranatha Papelería"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.87-4.49V8.62a8.16 8.16 0 0 0 4.77 1.52v-3.45h-.87z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/maranatha.calico"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-[#EDA3FF] transition-colors"
                title="Facebook: @maranatha.calico"
                aria-label="Facebook de Maranatha Papelería"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* WhatsApp Icon */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-[#EDA3FF] transition-colors"
                title="WhatsApp: +57 314 5854213"
                aria-label="Chat directo de WhatsApp"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.134 8.134 0 0 1-1.25-4.38c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39a8.106 8.106 0 0 1 2.39 5.77c0 4.51-3.66 8.16-8.16 8.16zm4.47-6.11c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
                </svg>
              </a>
            </div>

            {/* Separador vertical fino */}
            <div className="h-4 w-px bg-white/20 shrink-0" />

            {/* Botón Volver arriba calcado con flecha morada */}
            <button
              onClick={handleScrollToTop}
              className="inline-flex items-center gap-1.5 text-[12.5px] sm:text-[13px] text-[#EDA3FF] hover:brightness-125 transition-all cursor-pointer font-medium select-none group"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.2] transform group-hover:-translate-y-0.5 transition-transform" />
              <span>Volver arriba</span>
            </button>

          </div>

        </div>

      </div>
    </footer>
  );
}
