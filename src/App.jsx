import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import CategoriaPage from './pages/CategoriaPage';
import CatalogoPage from './pages/CatalogoPage';
import PrivacidadPage from './pages/PrivacidadPage';
import TerminosPage from './pages/TerminosPage';

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/categoria/:categorySlug" element={<CategoriaPage />} />
        <Route path="/politica-de-privacidad" element={<PrivacidadPage />} />
        <Route path="/terminos-y-condiciones" element={<TerminosPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}


