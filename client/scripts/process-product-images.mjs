/**
 * Product image asset pipeline (re-runnable).
 *
 * Sources (repo root /images/):
 *   bright-product-main.jfif — styled scene, warm background  -> light theme
 *   dark-product-main.jfif   — single card on navy backdrop   -> dark theme
 *
 * Outputs (client/src/assets/images/, filenames the app already imports):
 *   product-bright.webp/.png   — full bright photo, 1100px wide
 *   product-dark.webp/.png     — full dark photo, 1100px wide
 *   product-secondary.webp/.png— card close-up cropped from the dark photo
 *
 * Run from client/:  node scripts/process-product-images.mjs
 */
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientRoot = path.resolve(__dirname, '..');
const srcDir = path.resolve(clientRoot, '..', 'images');
const outDir = path.resolve(clientRoot, 'src', 'assets', 'images');

async function writePair(pipeline, outBase, targetWidth) {
  const resized = pipeline.clone().resize({ width: targetWidth, withoutEnlargement: true });
  const outPng = path.join(outDir, `${outBase}.png`);
  const outWebp = path.join(outDir, `${outBase}.webp`);
  await resized.clone().webp({ quality: 84 }).toFile(outWebp);
  await resized.clone().png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(outPng);
  const meta = await sharp(outWebp).metadata();
  console.log(
    `  ${outBase}: ${meta.width}x${meta.height}  ` +
      `webp=${(fs.statSync(outWebp).size / 1024).toFixed(0)}kB  ` +
      `png=${(fs.statSync(outPng).size / 1024).toFixed(0)}kB`
  );
}

await fs.promises.mkdir(outDir, { recursive: true });

const bright = sharp(path.join(srcDir, 'bright-product-main.jfif'));
const dark = sharp(path.join(srcDir, 'dark-product-main.jfif'));

console.log('Processing bright-product-main.jfif...');
await writePair(bright, 'product-bright', 1100);

console.log('Processing dark-product-main.jfif...');
await writePair(dark, 'product-dark', 1100);

// Card close-up for detail slots (HowItWorks, Benefits, ProductShowcase detail).
// Card occupies roughly x 32-74%, y 15-80% of the dark photo; crop with padding.
console.log('Cropping card close-up from dark photo...');
{
  const meta = await dark.metadata();
  const left = Math.round(meta.width * 0.28);
  const top = Math.round(meta.height * 0.10);
  const width = Math.round(meta.width * 0.49);
  const height = Math.round(meta.height * 0.76);
  await writePair(dark.extract({ left, top, width, height }), 'product-secondary', 700);
}

console.log('Done.');
