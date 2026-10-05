import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si hay un hash (#proceso, #preguntas-frecuentes, #productos, etc.)
    if (hash) {
      let timeoutId;
      let rafId;

      // 1. Si cambiamos de ruta (ej. de /catalogo a /#proceso), restablecer baseline a 0 inmediatamente
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
        window.lenis.resize();
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }

      // 2. Esperar que React monte el DOM de la nueva página y se estabilicen las dimensiones
      rafId = requestAnimationFrame(() => {
        rafId = requestAnimationFrame(() => {
          timeoutId = setTimeout(() => {
            if (window.lenis) {
              window.lenis.resize();
            }
            const element = document.querySelector(hash);
            if (element) {
              if (window.lenis) {
                window.lenis.scrollTo(element, { offset: -84, duration: 1.2 });
              } else {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }, 80);
        });
      });

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    // De lo contrario (navegación estándar sin hash), restablecer la vista al inicio inmediato
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
      window.lenis.resize();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}
