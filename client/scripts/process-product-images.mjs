/**
 * Product image processing.
 *
 * Source: marketing collages in the root /images folder. Each collage is a
 * grid of individual product shots separated by thin gutters:
 *
 *   bright-product-image.png  (1536x1024) — light-theme shots
 *   dark-procuct-images.png   (1536x1024) — dark-theme shots
 *
 * Layout (both files):
 *   row 1: [ two cards scene | single card on podium ]
 *   row 2: [ gift box + card | gold 3M back | close-up ]
 *   row 3: brand banner (not used)
 *
 * Outputs (src/assets/images/, webp + png):
 *   product-bright   — card on white/gold podium (hero, light theme)
 *   product-dark     — card on gold podium, navy scene (hero, dark theme)
 *   product-duo-bright — two cards on marble (ProductShowcase, light)
 *   product-duo-dark   — two cards on stone (ProductShowcase, dark)
 *   product-secondary  — close-up crop (HowItWorks, Results)
 */
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, '..', '..', 'images');
const outDir = path.resolve(__dirname, '..', 'src', 'assets', 'images');

// Panel crops: [left, top, width, height] in source pixels (gutters excluded)
const bright = {
  podium: { left: 820, top: 4, width: 712, height: 502 },
  duo: { left: 4, top: 4, width: 800, height: 502 },
  closeup: { left: 1032, top: 521, width: 500, height: 275 },
};
const dark = {
  podium: { left: 894, top: 4, width: 638, height: 462 },
  duo: { left: 4, top: 4, width: 822, height: 462 },
  closeup: { left: 1032, top: 540, width: 500, height: 260 },
};

const jobs = [
  { src: 'bright-product-image.png', region: bright.podium, out: 'product-bright' },
  { src: 'dark-procuct-images.png', region: dark.podium, out: 'product-dark' },
  { src: 'bright-product-image.png', region: bright.duo, out: 'product-duo-bright' },
  { src: 'dark-procuct-images.png', region: dark.duo, out: 'product-duo-dark' },
  { src: 'dark-procuct-images.png', region: dark.closeup, out: 'product-secondary' },
];

for (const { src, region, out } of jobs) {
  const base = sharp(path.join(srcDir, src)).extract(region);
  await base.clone().webp({ quality: 82 }).toFile(path.join(outDir, `${out}.webp`));
  await base.clone().png({ compressionLevel: 9 }).toFile(path.join(outDir, `${out}.png`));
  const meta = await sharp(path.join(outDir, `${out}.webp`)).metadata();
  console.log(`${out}: ${meta.width}x${meta.height}`);
}

console.log('Done.');
