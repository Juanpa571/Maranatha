import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    let lenis = null;
    let unsub = false;
    let handleResize = null;
    let handleAnchorClick = null;

    import('lenis').then(({ default: Lenis }) => {
      if (unsub) return;

      lenis = new Lenis({
        autoRaf: true,
        autoResize: true,
        lerp: 0.085,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        infinite: false,
      });

      handleResize = () => lenis?.resize();
      window.addEventListener('resize', handleResize);
      window.addEventListener('load', handleResize);
      document.fonts?.ready?.then(handleResize);

      window.lenis = lenis;
      window.dispatchEvent(new CustomEvent('lenis-init', { detail: lenis }));

      handleAnchorClick = (e) => {
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
    });

    return () => {
      unsub = true;
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('load', handleResize);
      }
      if (handleAnchorClick) {
        document.removeEventListener('click', handleAnchorClick);
      }
      if (lenis) {
        lenis.destroy();
        delete window.lenis;
      }
    };
  }, []);

  return null;
}
