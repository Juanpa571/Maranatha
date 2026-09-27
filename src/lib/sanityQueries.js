/**
 * Consultas GROQ optimizadas para el catálogo de Maranatha
 */

// Consulta de todas las categorías con sus productos anidados y ordenados
export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    alias,
    seoTitle,
    sectionTitle,
    sectionSubtitle,
    headline,
    subheadline,
    description,
    "bannerImage": bannerImage.asset->url,
    order,
    "products": *[_type == "product" && references(^._id)] | order(order asc, _createdAt asc) {
      _id,
      "id": slug.current,
      title,
      subtitle,
      description,
      price,
      priceNum,
      unit,
      "image": image.asset->url,
      alt,
      whatsapp,
      isFeatured,
      order
    }
  }
`;

// Consulta de todos los productos individuales con la información de su categoría
export const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(order asc, _createdAt asc) {
    _id,
    "id": slug.current,
    title,
    subtitle,
    description,
    price,
    priceNum,
    unit,
    "image": image.asset->url,
    alt,
    whatsapp,
    isFeatured,
    order,
    "categorySlug": category->slug.current,
    "categoryTitle": category->title
  }
`;

// Consulta de productos destacados para la Home (CoreCatalog)
export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && isFeatured == true] | order(order asc, _createdAt asc) [0...6] {
    _id,
    "id": slug.current,
    title,
    subtitle,
    description,
    price,
    priceNum,
    unit,
    "image": image.asset->url,
    alt,
    whatsapp,
    isFeatured,
    order,
    "categorySlug": category->slug.current,
    "categoryName": category->title
  }
`;
