import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'yajv6uzt';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // CDN rápido y con caché global edge de Sanity
  perspective: 'published',
});

const builder = imageUrlBuilder(sanityClient);

/**
 * Genera la URL optimizada para una imagen de Sanity con soporte automático para WebP.
 * Si la imagen ya es una ruta relativa local (string fallback), la retorna directamente.
 */
export function urlFor(source) {
  if (!source) return '';
  if (typeof source === 'string') return source;
  try {
    return builder.image(source).auto('format').fit('max');
  } catch (err) {
    console.warn('Error resolviendo imagen de Sanity:', err);
    return '';
  }
}
