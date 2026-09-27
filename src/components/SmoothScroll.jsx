import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function SmoothScroll() {
  useEffect(() => {
    // Inicialización del motor de Smooth Scroll (Lenis) con lerp continuo de alta fidelidad
    const lenis = new Lenis({
      autoRaf: true, // Sincronización nativa directa con el ciclo de refresco de pantalla
      autoResize: true, // Auto-sincronización estable de dimensiones y límites al cargar imágenes o cambiar viewport
      lerp: 0.085, // Interpolación lineal ultra sedosa y continua (física fluida sin reinicios de temporizador)
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    // Recalcular dimensiones cuando la ventana cambie de tamaño físicamente o terminen de cargar fuentes/imágenes
    const handleResize = () => lenis.resize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);
    document.fonts?.ready?.then(handleResize);
    setTimeout(handleResize, 100);

    // Exponer instancia global para sincronización con ScrollToTop y eventos de navegación
    window.lenis = lenis;
    window.dispatchEvent(new CustomEvent('lenis-init', { detail: lenis }));

    // Interceptar clics en enlaces ancla (#productos, /#proceso, etc.) para scroll suave sincronizado con offset: 0
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"], a[href^="/#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#' && href !== '/#') {
          const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
          const isCurrentPageAnchor = href.startsWith('#') || (isHomePage && href.startsWith('/#'));

          if (isCurrentPageAnchor) {
            const hash = href.startsWith('/#') ? href.substring(1) : href;
            const targetElement = document.querySelector(hash);
            if (targetElement) {
              e.preventDefault();
              lenis.resize();
              lenis.scrollTo(targetElement, { offset: 0, duration: 1.2 });
              if (window.location.hash !== hash) {
                window.history.pushState(null, '', hash);
              }
            }
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return null;
}
