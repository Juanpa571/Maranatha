import React, { useEffect } from 'react';
import VoldogHero from '../components/VoldogHero';
import CategoryCards from '../components/CategoryCards';
import CoreCatalog from '../components/CoreCatalog';
import LocalAttention from '../components/LocalAttention';
import TransparentProcess from '../components/TransparentProcess';
import FaqSection from '../components/FaqSection';
import FinalCta from '../components/FinalCta';
import Footer from '../components/Footer';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Maranatha Papelería Creativa | Eventos y Empaques en Cali';
  }, []);
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#E7D1FF] selection:text-[#7E04A1]">
      {/* 1. Hero Principal Editorial con Navbar Unificada Continua (Estilo Voldog) */}
      <VoldogHero />

      {/* 2. Secciones del Home: Categorías, Catálogo, Atención Local, Proceso, FAQ y Gran Cierre CTA */}
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
    </div>
  );
}
