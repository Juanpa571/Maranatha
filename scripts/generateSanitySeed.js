import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importar los datos existentes
import { CATEGORIES_DATA } from '../src/data/categoriesData.js';

const documents = [];

let catOrder = 1;
for (const [slug, cat] of Object.entries(CATEGORIES_DATA)) {
  const catDocId = `category-${slug}`;
  
  // Documento de Categoría
  documents.push({
    _id: catDocId,
    _type: 'category',
    title: cat.title,
    slug: { _type: 'slug', current: slug },
    alias: cat.alias || '',
    seoTitle: cat.seoTitle || '',
    sectionTitle: cat.sectionTitle || '',
    sectionSubtitle: cat.sectionSubtitle || '',
    headline: cat.headline || '',
    subheadline: cat.subheadline || '',
    description: cat.description || '',
    order: catOrder++,
  });

  // Documentos de Productos
  let prodOrder = 1;
  const featuredIds = ['cajas-personalizadas', 'stickers-personalizados', 'vinilos-adhesivos'];

  for (const prod of cat.products) {
    const prodDocId = `product-${prod.id}`;
    documents.push({
      _id: prodDocId,
      _type: 'product',
      title: prod.title,
      slug: { _type: 'slug', current: prod.id },
      subtitle: prod.subtitle || '',
      description: prod.description || prod.subtitle || '',
      price: prod.price || '',
      priceNum: prod.priceNum || 0,
      unit: prod.unit || '',
      category: {
        _type: 'reference',
        _ref: catDocId,
      },
      alt: prod.alt || prod.title,
      whatsapp: prod.whatsapp || 'Hola Maranatha, quisiera cotizar este producto.',
      isFeatured: featuredIds.includes(prod.id),
      order: prodOrder++,
    });
  }
}

// Asegurar carpeta de destino
const studioDataDir = path.resolve(__dirname, '../studio/data');
if (!fs.existsSync(studioDataDir)) {
  fs.mkdirSync(studioDataDir, { recursive: true });
}

const outputFile = path.join(studioDataDir, 'maranatha-seed.ndjson');
const ndjsonContent = documents.map((doc) => JSON.stringify(doc)).join('\n');
fs.writeFileSync(outputFile, ndjsonContent, 'utf-8');

console.log(`✅ Archivo seed generado exitosamente con ${documents.length} documentos (3 categorías y 14 productos).`);
console.log(`📁 Ubicación: ${outputFile}`);
console.log('\nPara importar a Sanity en 2 segundos ejecuta en terminal:');
console.log('cd studio && npx sanity dataset import ./data/maranatha-seed.ndjson production');
