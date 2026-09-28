const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generate() {
  console.log('Generating complete Favicon suite...');

  // 1. Read base SVG and crop exactly to the circular mark
  const svgPath = path.resolve(__dirname, '../public/logo.svg');
  let svgContent = fs.readFileSync(svgPath, 'utf8');

  // Exact circle: cx="10840.74" cy="12354.02" r="8696.31"
  // minX = 2144, minY = 3657, size = 17394
  const croppedSvg = svgContent
    .replace(/viewBox="[^"]+"/, 'viewBox="2144 3657 17394 17394"')
    .replace(/width="[^"]+"/, 'width="512"')
    .replace(/height="[^"]+"/, 'height="512"');

  // Save clean square SVG
  const publicDir = path.resolve(__dirname, '../public');
  const rootDir = path.resolve(__dirname, '..');
  
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), croppedSvg, 'utf8');
  fs.writeFileSync(path.join(rootDir, 'favicon.svg'), croppedSvg, 'utf8');
  console.log('Saved favicon.svg in public/ and root');

  // Render high-res master PNG buffer
  const masterBuf = await sharp(Buffer.from(croppedSvg))
    .resize(512, 512)
    .png()
    .toBuffer();

  // Generate resolutions: 16, 32, 48, 96, 144, 180 (Apple), 192 (Android/Google), 512
  const png16 = await sharp(masterBuf).resize(16, 16).png().toBuffer();
  const png32 = await sharp(masterBuf).resize(32, 32).png().toBuffer();
  const png48 = await sharp(masterBuf).resize(48, 48).png().toBuffer();
  const png96 = await sharp(masterBuf).resize(96, 96).png().toBuffer();
  const png144 = await sharp(masterBuf).resize(144, 144).png().toBuffer();
  const png180 = await sharp(masterBuf).resize(180, 180).png().toBuffer();
  const png192 = await sharp(masterBuf).resize(192, 192).png().toBuffer();
  const png512 = await sharp(masterBuf).resize(512, 512).png().toBuffer();

  // Write PNG files to public/ AND root (to strictly follow guidelines)
  const targets = [
    { name: 'favicon.png', buf: png48 },
    { name: 'favicon-48x48.png', buf: png48 },
    { name: 'favicon-96x96.png', buf: png96 },
    { name: 'favicon-144x144.png', buf: png144 },
    { name: 'favicon-192x192.png', buf: png192 },
    { name: 'apple-touch-icon.png', buf: png180 },
    { name: 'apple-touch-icon-precomposed.png', buf: png180 },
    { name: 'icon-512.png', buf: png512 }
  ];

  for (const t of targets) {
    fs.writeFileSync(path.join(publicDir, t.name), t.buf);
    fs.writeFileSync(path.join(rootDir, t.name), t.buf);
  }
  console.log('Wrote all PNG targets to public/ and root');

  // Build binary multi-resolution .ICO (16x16, 32x32, 48x48)
  const icoBuffers = [
    { width: 16, height: 16, buf: png16 },
    { width: 32, height: 32, buf: png32 },
    { width: 48, height: 48, buf: png48 }
  ];

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(icoBuffers.length, 4); // Count of images

  let offset = 6 + (icoBuffers.length * 16);
  const dirEntries = [];
  for (const img of icoBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buf.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset
    dirEntries.push(entry);
    offset += img.buf.length;
  }

  const icoFinal = Buffer.concat([
    header,
    ...dirEntries,
    ...icoBuffers.map(b => b.buf)
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoFinal);
  fs.writeFileSync(path.join(rootDir, 'favicon.ico'), icoFinal);
  console.log(`Generated favicon.ico (${icoFinal.length} bytes) containing 16x16, 32x32, 48x48 in public/ and root`);
}

generate().catch(console.error);
