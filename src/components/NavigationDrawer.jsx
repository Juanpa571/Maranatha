import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, ArrowRight, MessageCircle, MapPin, Clock, HelpCircle, Sparkles, ChevronRight } from 'lucide-react';

export default function NavigationDrawer({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [caliStatus, setCaliStatus] = useState({
    isOpen: true,
    label: 'Taller Abierto',
    detail: 'Atendiendo pedidos en Cali',
  });

  // Cálculo en tiempo real del horario del taller en Cali (UTC-5)
  useEffect(() => {
    const calculateStatus = () => {
      try {
        const now = new Date();
        const caliTimeStr = now.toLocaleString('en-US', { timeZone: 'America/Bogota' });
        const caliDate = new Date(caliTimeStr);
        const day = caliDate.getDay(); // 0 domingo, 6 sábado
        const hour = caliDate.getHours();
        const isWeekday = day >= 1 && day <= 5;
        const openNow = isWeekday && hour >= 9 && hour < 18;

        setCaliStatus({
          isOpen: openNow,
          label: openNow ? 'Atención Activa' : 'Atención Cerrada por hoy',
          detail: openNow
            ? 'Cotizaciones y pedidos por WhatsApp en vivo'
            : 'Escríbenos por WhatsApp, te responderemos a primera hora (09:00 AM)',
        });
      } catch (e) {
        // Fallback defensivo
        setCaliStatus({
          isOpen: true,
          label: 'Atención por WhatsApp',
          detail: 'Lunes a Viernes: 09:00 – 18:00',
        });
      }
    };

    calculateStatus();
    const interval = setInterval(calculateStatus, 60000); // Actualiza cada minuto
    return () => clearInterval(interval);
  }, []);

  // Bloqueo de scroll y escucha de tecla Escape cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) {
        window.lenis.stop();
      }
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        if (window.lenis) {
          window.lenis.start();
        }
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    }
  }, [isOpen, onClose]);

  const handleNavClick = (anchor) => {
    onClose();
    if (!anchor.startsWith('#')) return;

    if (location.pathname !== '/') {
      navigate(`/${anchor}`);
      return;
    }

    setTimeout(() => {
      const el = document.querySelector(anchor);
      if (el) {
        if (window.lenis) {
          window.lenis.resize();
          window.lenis.scrollTo(el, { offset: 0, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 150);
  };

  const whatsappUrl =
    'https://wa.me/573145854213?text=' +
    encodeURIComponent('Hola Maranatha 👋, me comunico desde el menú web y quisiera cotizar un pedido en Cali.');

  const drawerContent = (
    <>
      {/* 1. Backdrop con transición de opacidad */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Panel Drawer Lateral deslizante desde la derecha */}
      <aside
        data-lenis-prevent
        data-lenis-prevent-touch
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación principal"
        className={`fixed top-0 right-0 z-[70] h-full h-[100dvh] max-h-[100dvh] w-full max-w-[420px] bg-white font-peridot shadow-[-10px_0_40px_rgba(0,0,0,0.18)] flex flex-col justify-between transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cabecera del Drawer */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
          <Link
            to="/"
            onClick={onClose}
            title="Ir a la página principal de Maranatha"
            className="font-['Pacifico',cursive] text-[26px] text-[#7E04A1] tracking-tight leading-none pb-1 select-none hover:opacity-85 transition-opacity cursor-pointer"
          >
            maranatha
          </Link>

          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#FAF5FE] hover:text-[#7E04A1] text-gray-700 flex items-center justify-center transition-colors duration-200 cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Contenido Scrollable Interior con soporte táctil nativo garantizado para móviles */}
        <div
          data-lenis-prevent
          data-lenis-prevent-touch
          onTouchMove={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 py-5 sm:py-6 space-y-5 sm:space-y-6 touch-pan-y"
          style={{ WebkitOverflowScrolling: 'touch', overscrollBehaviorY: 'contain' }}
        >
          
          {/* Card de Estado del Taller en Vivo en Cali */}
          <div className="rounded-2xl bg-[#FAF6FD] border border-[#EBD6FA] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    caliStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`}
                />
                <span className="text-xs font-bold text-[#7E04A1] tracking-wide uppercase">
                  {caliStatus.label}
                </span>
              </div>
              <span className="text-[11px] font-medium text-gray-500">
                Cali, Colombia
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1.5 leading-snug">
              {caliStatus.detail}
            </p>
            <div className="mt-2.5 pt-2 border-t border-[#EBD6FA]/60 flex items-center justify-between text-[11px] text-gray-500 font-medium">
              <span>Lun a Vie: 09:00 – 18:00</span>
              <button
                type="button"
                onClick={() => handleNavClick('#proceso')}
                className="text-[#7E04A1] font-semibold hover:underline cursor-pointer"
              >
                Cómo trabajamos →
              </button>
            </div>
          </div>

          {/* Menú de Navegación */}
          <nav aria-label="Enlaces principales">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400 block mb-2 px-1">
              Catálogo y Secciones
            </span>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/catalogo"
                  onClick={onClose}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-[#FAF5FE] text-left text-base font-semibold text-[#7E04A1] flex items-center justify-between group transition-colors"
                >
                  <span>Catálogo Completo (Todos los productos)</span>
                  <ChevronRight className="w-4 h-4 text-[#7E04A1] group-hover:translate-x-0.5 transition-all" />
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#productos')}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-[#FAF5FE] text-left text-base font-semibold text-gray-900 hover:text-[#7E04A1] flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <span>Categorías Principales</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#7E04A1] group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>
              <li>
                <Link
                  to="/categoria/papeleria-creativa"
                  onClick={onClose}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-[#FAF5FE] text-left text-sm font-medium text-gray-700 hover:text-[#7E04A1] flex items-center justify-between group transition-colors pl-6"
                >
                  <span>• Papelería Creativa</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#7E04A1] group-hover:translate-x-0.5 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  to="/categoria/insumos"
                  onClick={onClose}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-[#FAF5FE] text-left text-sm font-medium text-gray-700 hover:text-[#7E04A1] flex items-center justify-between group transition-colors pl-6"
                >
                  <span>• Insumos de Papelería</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#7E04A1] group-hover:translate-x-0.5 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  to="/categoria/papeleria-empresarial"
                  onClick={onClose}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-[#FAF5FE] text-left text-sm font-medium text-gray-700 hover:text-[#7E04A1] flex items-center justify-between group transition-colors pl-6"
                >
                  <span>• Papelería Empresarial</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#7E04A1] group-hover:translate-x-0.5 transition-all" />
                </Link>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => handleNavClick('#proceso')}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-[#FAF5FE] text-left text-base font-semibold text-gray-900 hover:text-[#7E04A1] flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <span>Cómo trabajamos (Proceso)</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#7E04A1] group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#preguntas-frecuentes')}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-[#FAF5FE] text-left text-base font-semibold text-gray-900 hover:text-[#7E04A1] flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#7E04A1]" />
                    <span>Preguntas Frecuentes</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#7E04A1] group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#contacto')}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-[#FAF5FE] text-left text-base font-semibold text-gray-900 hover:text-[#7E04A1] flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#7E04A1]" />
                    <span>Ubicación y Contacto</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#7E04A1] group-hover:translate-x-0.5 transition-all" />
                </button>
              </li>
            </ul>
          </nav>

          {/* Tarjeta de Karla en el menú */}
          <div className="rounded-2xl bg-[#FAF8FD] border border-gray-100 p-3.5 flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-[#EBD6FA] shrink-0 flex items-center justify-center">
              <img
                src="/karla-face.webp"
                alt="Karla"
                width="56"
                height="56"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain object-bottom"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-['Pacifico',cursive] text-base text-[#7E04A1]">
                Karla
              </span>
              <p className="text-xs text-gray-600 font-medium">
                Recepcionista oficial de Maranatha
              </p>
              <p className="text-[11px] text-gray-400">
                Supervisando cada detalle en Cali
              </p>
            </div>
          </div>

        </div>

        {/* Footer del Drawer con Botón Principal de WhatsApp */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-[#FAF8FD] shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 sm:py-3.5 px-4 sm:px-5 rounded-2xl bg-[#7E04A1] hover:bg-[#680385] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-2.5 shadow-[0_6px_20px_rgba(126,4,161,0.28)] hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
            <span>Hablar por WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          </a>
          <p className="text-[10.5px] sm:text-[11px] text-center text-gray-500 mt-2 sm:mt-2.5">
            +57 314 5854213 • Cali, Valle del Cauca
          </p>

          {/* Enlaces a Redes Sociales Oficiales */}
          <div className="flex items-center justify-center gap-3.5 mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-[#EBD6FA]/70 text-[#7E04A1]">
            <a
              href="https://www.instagram.com/maranathacalico"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-white hover:text-[#5E0279] transition-colors"
              title="Instagram: @maranathacalico"
              aria-label="Instagram de Maranatha"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@maranathacalico"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-white hover:text-[#5E0279] transition-colors"
              title="TikTok: @maranathacalico"
              aria-label="TikTok de Maranatha"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.87-4.49V8.62a8.16 8.16 0 0 0 4.77 1.52v-3.45h-.87z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/maranatha.calico"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full hover:bg-white hover:text-[#5E0279] transition-colors"
              title="Facebook: @maranatha.calico"
              aria-label="Facebook de Maranatha"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </aside>
    </>
  );

  return typeof document !== 'undefined' ? createPortal(drawerContent, document.body) : drawerContent;
}
