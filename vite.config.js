import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function nonBlockingCss() {
  return {
    name: 'non-blocking-css',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
        '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="$1"></noscript>'
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), nonBlockingCss()],
  server: {
    host: true,
    port: 3000,
    open: false,
  },
});
