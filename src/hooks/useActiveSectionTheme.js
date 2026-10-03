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

    // 2. Función de comprobación de la sección activa
    const updateActiveTheme = () => {
      tickingRef.current = false;

      const elements = Array.from(document.querySelectorAll('[data-theme]'));
      if (elements.length === 0) return;

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const isAtBottom = scrollY + viewportHeight >= docHeight - 70;

      let detectedTheme = defaultTheme;
      let detectedColor = defaultColor;

      if (isAtBottom) {
        // En el extremo inferior de la página, la última sección (ej. el Footer) es la activa
        const lastEl = elements[elements.length - 1];
        detectedTheme = lastEl.getAttribute('data-theme') || 'dark';
        detectedColor =
          lastEl.getAttribute('data-theme-color') ||
          (detectedTheme === 'dark' ? '#16161A' : '#ffffff');
      } else {
        // Buscar el elemento que intersecta la línea de sondeo (probeOffset)
        let found = false;
        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= probeOffset && rect.bottom > probeOffset) {
            detectedTheme = el.getAttribute('data-theme') || 'light';
            detectedColor =
              el.getAttribute('data-theme-color') ||
              (detectedTheme === 'dark' ? '#16161A' : '#ffffff');
            found = true;
            break;
          }
        }

        // Si ninguna sección cubre exactamente probeOffset (ej. espacio al inicio o transición),
        // tomamos la sección más cercana arriba de la línea de sondeo
        if (!found) {
          for (let i = elements.length - 1; i >= 0; i--) {
            const rect = elements[i].getBoundingClientRect();
            if (rect.top <= probeOffset) {
              detectedTheme = elements[i].getAttribute('data-theme') || 'light';
              detectedColor =
                elements[i].getAttribute('data-theme-color') ||
                (detectedTheme === 'dark' ? '#16161A' : '#ffffff');
              break;
            }
          }
        }
      }

      // La barra sticky se oscurece única y exclusivamente en la versión móvil (< 1024px)
      // En la versión de PC (pantallas >= 1024px), la barra sticky se mantiene siempre en su estado claro editorial
      const isMobile = window.innerWidth < 1024;
      const darkActive = isMobile && detectedTheme === 'dark';
      const effectiveTheme = isMobile ? detectedTheme : 'light';
      const effectiveColor = isMobile ? detectedColor : defaultColor;

      // 3. Sincronizar estado de React
      setTheme((prev) => (prev !== effectiveTheme ? effectiveTheme : prev));
      setThemeColor((prev) => (prev !== effectiveColor ? effectiveColor : prev));
      setIsDark((prev) => (prev !== darkActive ? darkActive : prev));

      // 4. Actualizar <meta name="theme-color">, document.documentElement y document.body
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

    const requestUpdate = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(updateActiveTheme);
      }
    };

    // 5. Escuchar eventos de scroll nativo y resize
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });

    // 6. Integración con Lenis Smooth Scroll si está activo
    if (window.lenis && typeof window.lenis.on === 'function') {
      window.lenis.on('scroll', requestUpdate);
    }

    // 7. MutationObserver para detectar secciones montadas bajo demanda (Lazy loading / Suspense)
    const mutationObserver = new MutationObserver(() => {
      requestUpdate();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Ejecutar verificación inicial
    requestUpdate();

    // 8. Limpieza al desmontar: restaurar colores base
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (window.lenis && typeof window.lenis.off === 'function') {
        window.lenis.off('scroll', requestUpdate);
      }
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
