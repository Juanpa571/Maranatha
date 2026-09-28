import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { sanityClient } from '../lib/sanity';
import { ALL_CATEGORIES_QUERY, ALL_PRODUCTS_QUERY, FEATURED_PRODUCTS_QUERY } from '../lib/sanityQueries';
import { CATEGORIES_DATA } from '../data/categoriesData';

const CatalogContext = createContext(null);

// Flatten estático inicial para fallback
function computeInitialAllProducts() {
  return Object.values(CATEGORIES_DATA).flatMap((cat) =>
    cat.products.map((p) => ({
      ...p,
      categorySlug: cat.slug,
      categoryTitle: cat.title,
    }))
  );
}

export function CatalogProvider({ children }) {
  const [categoriesMap, setCategoriesMap] = useState(() => CATEGORIES_DATA);
  const [allProductsList, setAllProductsList] = useState(() => computeInitialAllProducts());
  const [featuredProductsList, setFeaturedProductsList] = useState(() => [
    {
      id: 'cajas-personalizadas',
      title: 'Cajas Personalizadas',
      description: 'Diseñamos empaques que cuentan tu historia.',
      pricePrefix: 'Desde',
      priceVal: '$2.800 COP',
      image: '/catalogo/cajas-personalizadas.webp',
      alt: 'Cajas personalizadas para fiestas y marcas en Cali',
      whatsapp: 'Hola Maranatha, quisiera cotizar cajas personalizadas para un evento o marca en Cali.',
      categorySlug: 'papeleria-creativa',
      categoryName: 'Papelería Creativa',
      delay: '150ms',
    },
    {
      id: 'stickers-personalizados',
      title: 'Stickers Personalizados',
      description: 'Vinilo impermeable troquelado al contorno para tu marca.',
      pricePrefix: 'Desde',
      priceVal: '$25.000 / 50 und',
      image: '/catalogo/stickers-personalizados.webp',
      alt: 'Stickers personalizados troquelados en Cali',
      whatsapp: 'Hola Maranatha, quisiera cotizar stickers personalizados desde 50 unidades en Cali.',
      categorySlug: 'papeleria-creativa',
      categoryName: 'Papelería Creativa',
      delay: '300ms',
    },
    {
      id: 'vinilos-adhesivos',
      title: 'Vinilos Adhesivos',
      description: 'Para paredes, vitrinas y espacios que quieras transformar.',
      pricePrefix: 'Desde',
      priceVal: '$35.000 COP',
      image: '/catalogo/vinilos-adhesivos.webp',
      alt: 'Vinilos adhesivos para paredes y vitrinas en Cali',
      whatsapp: 'Hola Maranatha, quisiera cotizar vinilos adhesivos para pared o vitrinas en Cali.',
      categorySlug: 'insumos',
      categoryName: 'Insumos de Papelería',
      delay: '450ms',
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSanityLive, setIsSanityLive] = useState(false);

  const fetchCatalogData = useCallback(async () => {
    try {
      const [sanityCategories, sanityProducts, sanityFeatured] = await Promise.all([
        sanityClient.fetch(ALL_CATEGORIES_QUERY),
        sanityClient.fetch(ALL_PRODUCTS_QUERY),
        sanityClient.fetch(FEATURED_PRODUCTS_QUERY),
      ]);

      // Si Sanity tiene categorías publicadas, transformamos a mapa por slug
      if (Array.isArray(sanityCategories) && sanityCategories.length > 0) {
        const newMap = {};
        sanityCategories.forEach((cat) => {
          if (!cat.slug) return;
          const fallbackCategory = CATEGORIES_DATA[cat.slug];
          
          const rawProducts = Array.isArray(cat.products) && cat.products.length > 0
            ? cat.products
            : (fallbackCategory?.products || []);

          const hydratedProducts = rawProducts.map((p) => {
            const fallbackProd = fallbackCategory?.products?.find(
              (fp) => fp.id === p.id || fp.id === p.slug
            );
            return {
              ...p,
              id: p.id || p.slug || fallbackProd?.id,
              image: p.image || fallbackProd?.image || '',
              alt: p.alt || fallbackProd?.alt || p.title,
              whatsapp: p.whatsapp || fallbackProd?.whatsapp || 'Hola Maranatha, quisiera cotizar este producto.',
            };
          });

          newMap[cat.slug] = {
            ...cat,
            bannerImage: cat.bannerImage || fallbackCategory?.bannerImage || '',
            products: hydratedProducts,
          };
        });

        // Aseguramos que si falta alguna categoría esencial, preserve el fallback local
        Object.entries(CATEGORIES_DATA).forEach(([slug, fallbackCat]) => {
          if (!newMap[slug]) {
            newMap[slug] = fallbackCat;
          }
        });

        setCategoriesMap(newMap);
        setIsSanityLive(true);
      }

      if (Array.isArray(sanityProducts) && sanityProducts.length > 0) {
        const hydratedAll = sanityProducts.map((p) => {
          const fallbackProd = CATEGORIES_DATA[p.categorySlug]?.products?.find(
            (fp) => fp.id === p.id || fp.id === p.slug
          );
          return {
            ...p,
            id: p.id || p.slug || fallbackProd?.id,
            image: p.image || fallbackProd?.image || '',
            alt: p.alt || fallbackProd?.alt || p.title,
            whatsapp: p.whatsapp || fallbackProd?.whatsapp || 'Hola Maranatha, quisiera cotizar este producto.',
          };
        });
        setAllProductsList(hydratedAll);
        setIsSanityLive(true);
      }

      if (Array.isArray(sanityFeatured) && sanityFeatured.length > 0) {
        const hydratedFeatured = sanityFeatured.map((p, idx) => {
          const fallbackProd = CATEGORIES_DATA[p.categorySlug]?.products?.find(
            (fp) => fp.id === p.id || fp.id === p.slug
          );
          const rawPrice = p.price || fallbackProd?.price || '';
          const priceParts = rawPrice.startsWith('Desde ')
            ? { prefix: 'Desde', value: rawPrice.replace('Desde ', '').trim() }
            : { prefix: '', value: rawPrice };

          return {
            ...p,
            id: p.id || p.slug || fallbackProd?.id,
            image: p.image || fallbackProd?.image || '',
            alt: p.alt || fallbackProd?.alt || p.title,
            whatsapp: p.whatsapp || fallbackProd?.whatsapp || 'Hola Maranatha, quisiera cotizar este producto.',
            categoryName: p.categoryName || (p.categorySlug === 'insumos' ? 'Insumos de Papelería' : 'Papelería Creativa'),
            pricePrefix: priceParts.prefix,
            priceVal: priceParts.value,
            delay: `${(idx + 1) * 150}ms`,
          };
        });
        setFeaturedProductsList(hydratedFeatured);
      }
    } catch (err) {
      console.warn('Sanity CMS no disponible o sin conexión. Usando catálogo local fallback.', err);
      setIsSanityLive(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Revalidación asíncrona en idle: no compite con LCP ni bloquea el render inicial
    let idleId = null;
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => fetchCatalogData(), { timeout: 2500 });
      } else {
        fetchCatalogData();
      }
    }, 1200);

    return () => {
      clearTimeout(timer);
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [fetchCatalogData]);

  const getCategory = useCallback(
    (slugOrAlias) => {
      if (!slugOrAlias) return categoriesMap['papeleria-creativa'];
      const normalized = slugOrAlias === 'insumos-papeleria' ? 'insumos' : slugOrAlias;
      return categoriesMap[normalized] || CATEGORIES_DATA[normalized] || categoriesMap['papeleria-creativa'];
    },
    [categoriesMap]
  );

  const value = useMemo(
    () => ({
      categories: categoriesMap,
      categoriesList: Object.values(categoriesMap),
      allProducts: allProductsList,
      featuredProducts: featuredProductsList,
      getCategory,
      isLoading,
      isSanityLive,
      refetch: fetchCatalogData,
    }),
    [categoriesMap, allProductsList, featuredProductsList, getCategory, isLoading, isSanityLive, fetchCatalogData]
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog debe ser utilizado dentro de un <CatalogProvider>');
  }
  return context;
}
