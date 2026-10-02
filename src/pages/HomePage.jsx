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
  const [loadHeavySections, setLoadHeavySections] = React.useState(false);

  useEffect(() => {
    document.title = 'Maranatha Papelería Creativa | Eventos y Empaques en Cali';

    const enableSections = () => {
      setLoadHeavySections(true);
      window.removeEventListener('scroll', enableSections);
      window.removeEventListener('wheel', enableSections);
      window.removeEventListener('touchmove', enableSections);
    };

    // Montaje diferido tras 800ms o al primer intento de scroll/interacción
    const timer = setTimeout(enableSections, 800);

    window.addEventListener('scroll', enableSections, { passive: true, once: true });
    window.addEventListener('wheel', enableSections, { passive: true, once: true });
    window.addEventListener('touchmove', enableSections, { passive: true, once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', enableSections);
      window.removeEventListener('wheel', enableSections);
      window.removeEventListener('touchmove', enableSections);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#E7D1FF] selection:text-[#7E04A1]">
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
            <FinalCta />
          </main>

          {/* 3. Footer de Autor con Navegación Semántica, Datos Locales y Horarios */}
          <Footer />
        </Suspense>
      )}
    </div>
  );
}
