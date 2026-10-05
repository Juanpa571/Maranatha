import React, { useEffect, Suspense, lazy } from 'react';
import VoldogHero from '../components/VoldogHero';

const CategoryCards = lazy(() => import('../components/CategoryCards'));
const CoreCatalog = lazy(() => import('../components/CoreCatalog'));
const LocalAttention = lazy(() => import('../components/LocalAttention'));
const TransparentProcess = lazy(() => import('../components/TransparentProcess'));
const FaqSection = lazy(() => import('../components/FaqSection'));
const Footer = lazy(() => import('../components/Footer'));

export default function HomePage() {
  const [loadHeavySections, setLoadHeavySections] = React.useState(false);

  useEffect(() => {
    document.title = 'Maranatha Papelería Creativa | Eventos y Empaques en Cali';

    let isCleanedUp = false;
    let idleId = null;
    let timerId = null;

    const cleanupListeners = () => {
      window.removeEventListener('scroll', enableSections);
      window.removeEventListener('wheel', enableSections);
      window.removeEventListener('touchmove', enableSections);
    };

    const enableSections = () => {
      if (isCleanedUp) return;
      cleanupListeners();
      setLoadHeavySections(true);
    };

    window.addEventListener('scroll', enableSections, { passive: true, once: true });
    window.addEventListener('wheel', enableSections, { passive: true, once: true });
    window.addEventListener('touchmove', enableSections, { passive: true, once: true });

    // Carga de secciones inferiores por interacción o en tiempo ocioso (requestIdleCallback)
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(enableSections, { timeout: 3500 });
    } else {
      timerId = setTimeout(enableSections, 2500);
    }

    return () => {
      isCleanedUp = true;
      cleanupListeners();
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return (
    <div className="min-h-[100dvh] bg-white text-gray-900 selection:bg-[#E7D1FF] selection:text-[#7E04A1]">
      {/* 1. Hero Principal Editorial con Navbar Unificada Continua (Estilo Voldog) */}
      <VoldogHero />

      {/* 2. Secciones del Home: Montaje diferido tras estabilización del Hero */}
      {loadHeavySections && (
        <Suspense fallback={<div className="w-full min-h-[400px] bg-white" />}>
          <main id="contenido" className="w-full bg-white relative z-30">
            <CategoryCards />
            <CoreCatalog />
            <LocalAttention />
            <TransparentProcess />
            <FaqSection />
          </main>

          {/* 3. Footer de Autor con Navegación Semántica, Datos Locales y Horarios */}
          <Footer />
        </Suspense>
      )}
    </div>
  );
}
