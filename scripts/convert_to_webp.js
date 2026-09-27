import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.png')) {
      // Don't convert favicon.png
      if (entry.name === 'favicon.png') continue;

      const webpName = entry.name.replace(/\.png$/, '.webp');
      const webpPath = path.join(dir, webpName);

      const metadata = await sharp(fullPath).metadata();
      let pipeline = sharp(fullPath);

      // Downscale if ridiculously large for its display purpose
      if (entry.name.startsWith('faq-') || entry.name.includes('rays') || entry.name.includes('bubble') || entry.name.includes('heart')) {
        if (metadata.width > 200) {
          pipeline = pipeline.resize({ width: 200, withoutEnlargement: true });
        }
      } else if (entry.name.includes('note-') || entry.name.endsWith('-note.png')) {
        if (metadata.width > 600) {
          pipeline = pipeline.resize({ width: 600, withoutEnlargement: true });
        }
      } else if (dir.includes('catalogo')) {
        if (metadata.width > 800) {
          pipeline = pipeline.resize({ width: 800, withoutEnlargement: true });
        }
      } else if (dir.includes('seccion-final') || dir.includes('escritorio')) {
        if (metadata.width > 1000) {
          pipeline = pipeline.resize({ width: 1000, withoutEnlargement: true });
        }
      } else if (metadata.width > 1200) {
        pipeline = pipeline.resize({ width: 1200, withoutEnlargement: true });
      }

      await pipeline
        .webp({ quality: 82, effort: 6 })
        .toFile(webpPath);

      const oldSize = fs.statSync(fullPath).size;
      const newSize = fs.statSync(webpPath).size;
      const saved = ((oldSize - newSize) / oldSize * 100).toFixed(1);

      console.log(`Converted: ${path.relative(PUBLIC_DIR, fullPath)} (${Math.round(oldSize / 1024)} KB) -> ${webpName} (${Math.round(newSize / 1024)} KB) [-${saved}%]`);
    }
  }
}

async function run() {
  console.log('Starting image conversion to WebP...');
  await processDirectory(PUBLIC_DIR);
  console.log('Done converting images!');
}

run().catch(console.error);
