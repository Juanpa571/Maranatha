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

  useEffect(() => {
    document.title = 'Maranatha Papelería Creativa | Eventos y Empaques en Cali';

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => setShowBelowFold(true), { timeout: 1200 });
      } else {
        const timer = setTimeout(() => setShowBelowFold(true), 100);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#E7D1FF] selection:text-[#7E04A1]">
      {/* 1. Hero Principal Editorial con Navbar Unificada Continua (Estilo Voldog) */}
      <VoldogHero />

      {/* 2. Secciones del Home: Carga Progresiva Asíncrona */}
      {showBelowFold ? (
        <Suspense fallback={<div className="w-full min-h-[400px] bg-white" />}>
          <main id="contenido" className="w-full bg-white relative z-10">
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
