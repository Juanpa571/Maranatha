import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';

const CatalogoPage = lazy(() => import('./pages/CatalogoPage'));
const CategoriaPage = lazy(() => import('./pages/CategoriaPage'));
const PrivacidadPage = lazy(() => import('./pages/PrivacidadPage'));
const TerminosPage = lazy(() => import('./pages/TerminosPage'));

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/categoria/:categorySlug" element={<CategoriaPage />} />
          <Route path="/politica-de-privacidad" element={<PrivacidadPage />} />
          <Route path="/terminos-y-condiciones" element={<TerminosPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}


