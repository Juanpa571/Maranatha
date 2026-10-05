import { useState, useEffect, useRef } from 'react';

/**
 * useActiveSectionTheme
 * Hook que monitorea la sección activa bajo el Sticky Header (o borde superior del Viewport)
 * y sincroniza:
 * 1. El estado del tema del Header ('light' | 'dark').
 * 2. La metaetiqueta <meta name="theme-color"> de iOS Safari.
 * 3. El color de fondo de document.documentElement (etiqueta <html>) para forzar a Safari
 *    a pintar la barra de estado (notch) del color exacto de la sección activa.
 * 4. El color de fondo de document.body para el overscroll elástico en móviles.
 *
 * Busca elementos en el DOM con atributos:
 * - data-theme="dark" | "light"
 * - data-theme-color="#HEX" (opcional para colores exactos)
 *
 * Compatible 100% con Lenis Scroll y scroll nativo del navegador.
 */
export function useActiveSectionTheme({
  defaultTheme = 'light',
  defaultColor = '#ffffff',
  probeOffset = 80, // Distancia desde top:0 donde se sondea la sección activa (debajo del header)
} = {}) {
  const [theme, setTheme] = useState(defaultTheme);
  const [themeColor, setThemeColor] = useState(defaultColor);
  const [isDark, setIsDark] = useState(defaultTheme === 'dark');

  const tickingRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Obtener o crear la etiqueta <meta name="theme-color">
    let metaTag = document.querySelector('meta[name="theme-color"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'theme-color';
      metaTag.content = defaultColor;
      document.head.appendChild(metaTag);
    }

    // 2. Función de comprobación basada en IntersectionObserver (Cero Reflows Forzados)
    const updateHeaderTheme = (detectedTheme, detectedColor) => {
      const isMobile = window.innerWidth < 1024;
      const darkActive = isMobile && detectedTheme === 'dark';
      const effectiveTheme = isMobile ? detectedTheme : 'light';
      const effectiveColor = isMobile ? detectedColor : defaultColor;

      setTheme((prev) => (prev !== effectiveTheme ? effectiveTheme : prev));
      setThemeColor((prev) => (prev !== effectiveColor ? effectiveColor : prev));
      setIsDark((prev) => (prev !== darkActive ? darkActive : prev));

      if (metaTag && metaTag.getAttribute('content') !== effectiveColor) {
        metaTag.setAttribute('content', effectiveColor);
      }
      if (document.documentElement.style.backgroundColor !== effectiveColor) {
        document.documentElement.style.backgroundColor = effectiveColor;
      }
      if (document.body.style.backgroundColor !== effectiveColor) {
        document.body.style.backgroundColor = effectiveColor;
      }
    };

    let observer = null;
    const observedElements = new Set();

    const setupObserver = () => {
      if (observer) {
        observer.disconnect();
        observedElements.clear();
      }

      // Root margin que sondea la franja superior alrededor de probeOffset (navbar)
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const detectedTheme = el.getAttribute('data-theme') || defaultTheme;
              const detectedColor =
                el.getAttribute('data-theme-color') ||
                (detectedTheme === 'dark' ? '#16161A' : '#ffffff');
              updateHeaderTheme(detectedTheme, detectedColor);
            }
          });
        },
        {
          rootMargin: `-${probeOffset}px 0px -70% 0px`,
          threshold: [0, 0.1],
        }
      );

      const elements = document.querySelectorAll('[data-theme]');
      elements.forEach((el) => {
        observer.observe(el);
        observedElements.add(el);
      });
    };

    setupObserver();

    // MutationObserver ligero para detectar secciones montadas en diferido sin forzar lecturas geométricas
    const mutationObserver = new MutationObserver(() => {
      const elements = document.querySelectorAll('[data-theme]');
      elements.forEach((el) => {
        if (!observedElements.has(el) && observer) {
          observer.observe(el);
          observedElements.add(el);
        }
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Limpieza al desmontar: restaurar colores base
    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
      document.documentElement.style.backgroundColor = defaultColor;
      document.body.style.backgroundColor = defaultColor;
      if (metaTag) {
        metaTag.setAttribute('content', defaultColor);
      }
    };
  }, [defaultTheme, defaultColor, probeOffset]);

  return {
    theme,
    themeColor,
    isDark,
  };
}

export default useActiveSectionTheme;
