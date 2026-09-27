import { createClient } from '@sanity/client';
import { ALL_CATEGORIES_QUERY, ALL_PRODUCTS_QUERY, FEATURED_PRODUCTS_QUERY } from '../src/lib/sanityQueries.js';

const client = createClient({
  projectId: 'yajv6uzt',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function main() {
  const categories = await client.fetch(ALL_CATEGORIES_QUERY);
  console.log(`LIVE ALL_CATEGORIES_QUERY: ${categories.length} categories`);
  categories.forEach(cat => {
    console.log(`- [${cat.slug}] "${cat.title}" (products: ${cat.products?.length || 0})`);
  });

  const featured = await client.fetch(FEATURED_PRODUCTS_QUERY);
  console.log(`\nLIVE FEATURED_PRODUCTS_QUERY: ${featured.length} items`);
  featured.forEach(item => {
    console.log(`- [${item.id}] "${item.title}" (${item.categorySlug}) -> ${item.price}`);
  });

  const newProducts = await client.fetch('*[_type == "product" && (slug.current == "botones-publicitarios" || slug.current == "tarjeta-agradecimiento")]{ title, price, "categorySlug": category->slug.current, "catName": category->title }');
  console.log('\nVERIFYING NEW PRODUCTS IN SANITY:');
  newProducts.forEach(np => {
    console.log(`✓ "${np.title}" | Categoría: ${np.catName} (${np.categorySlug}) | Precio: ${np.price}`);
  });
}

main().catch(err => {
  console.error('Fetch error:', err);
  process.exit(1);
});
