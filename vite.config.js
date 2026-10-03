import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function nonBlockingCss() {
  return {
    name: 'non-blocking-css',
    apply: 'build',
    transformIndexHtml(html) {
      return html
        .replace(
          /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
          '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="$1"></noscript>'
        )
        .replace(
          /<link rel="modulepreload" crossorigin href="[^"]*vendor-sanity[^"]*">\s*/g,
          ''
        );
    },
  };
}

export default defineConfig({
  plugins: [react(), nonBlockingCss()],
  build: {
    modulePreload: {
      filter(url) {
        return !url.includes('vendor-sanity') && !url.includes('sanity');
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/@sanity/')) {
            return 'vendor-sanity';
          }
        },
      },
    },
  },
  server: {
    host: true,
    port: 3000,
    open: false,
  },
});
