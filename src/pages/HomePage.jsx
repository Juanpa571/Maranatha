import React, { useEffect, Suspense, lazy } from 'react';
import VoldogHero from '../components/VoldogHero';

const CategoryCards = lazy(() => import('../components/CategoryCards'));
const CoreCatalog = lazy(() => import('../components/CoreCatalog'));
const LocalAttention = lazy(() => import('../components/LocalAttention'));
const TransparentProcess = lazy(() => import('../components/TransparentProcess'));
const FaqSection = lazy(() => import('../components/FaqSection'));
const FinalCta = lazy(() => import('../components/FinalCta'));
const Footer = lazy(() => import('../components/Footer'));

export default function HomePage() {
  const [showBelowFold, setShowBelowFold] = React.useState(false);
  const sentinelRef = React.useRef(null);

  useEffect(() => {
    document.title = 'Maranatha Papelería Creativa | Eventos y Empaques en Cali';

    const triggerMount = () => {
      setShowBelowFold(true);
      window.removeEventListener('scroll', triggerMount);
      window.removeEventListener('touchstart', triggerMount);
      window.removeEventListener('wheel', triggerMount);
    };

    window.addEventListener('scroll', triggerMount, { passive: true, once: true });
    window.addEventListener('touchstart', triggerMount, { passive: true, once: true });
    window.addEventListener('wheel', triggerMount, { passive: true, once: true });

    let observer = null;
    if ('IntersectionObserver' in window && sentinelRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            triggerMount();
          }
        },
        { rootMargin: '400px' }
      );
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', triggerMount);
      window.removeEventListener('touchstart', triggerMount);
      window.removeEventListener('wheel', triggerMount);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#E7D1FF] selection:text-[#7E04A1]">
      {/* 1. Hero Principal Editorial con Navbar Unificada Continua (Estilo Voldog) */}
      <VoldogHero />

      {/* Centinela de Intersección */}
      <div ref={sentinelRef} className="w-full h-1 pointer-events-none" />

      {/* 2. Secciones del Home: Carga Progresiva Asíncrona bajo Demanda */}
      {showBelowFold ? (
        <Suspense fallback={<div className="w-full min-h-[400px] bg-white" />}>
          <main id="contenido" className="w-full bg-white relative z-30">
            <CategoryCards />
            <CoreCatalog />
            <LocalAttention />
            <TransparentProcess />
            <FaqSection />
            <FinalCta />
          </main>

          {/* 3. Footer de Autor con Navegación Semántica, Datos Locales y Horarios */}
          <Footer />
        </Suspense>
      ) : (
        <div className="w-full min-h-[400px] bg-white" />
      )}
    </div>
  );
}
