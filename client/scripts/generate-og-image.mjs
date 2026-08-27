import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the logo PNG
const logoBuffer = readFileSync(join(__dirname, '../src/assets/images/logo.png'));

// Create the SVG composition
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#060a14"/>
      <stop offset="50%" stop-color="#0a0e1a"/>
      <stop offset="100%" stop-color="#0f1629"/>
    </linearGradient>
    <radialGradient id="glow-blue" cx="75%" cy="40%" r="40%">
      <stop offset="0%" stop-color="rgba(37,99,235,0.15)"/>
      <stop offset="100%" stop-color="rgba(37,99,235,0)"/>
    </radialGradient>
    <radialGradient id="glow-gold" cx="25%" cy="70%" r="35%">
      <stop offset="0%" stop-color="rgba(212,168,67,0.08)"/>
      <stop offset="100%" stop-color="rgba(212,168,67,0)"/>
    </radialGradient>
    <filter id="text-shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg-grad)"/>

  <!-- Glow effects -->
  <rect width="1200" height="630" fill="url(#glow-blue)"/>
  <rect width="1200" height="630" fill="url(#glow-gold)"/>

  <!-- Subtle grid pattern -->
  <g opacity="0.03">
    ${Array.from({ length: 16 }, (_, i) => `<line x1="${i * 80}" y1="0" x2="${i * 80}" y2="630" stroke="#2563eb" stroke-width="1"/>`).join('\n    ')}
    ${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${i * 80}" x2="1200" y2="${i * 80}" stroke="#2563eb" stroke-width="1"/>`).join('\n    ')}
  </g>

  <!-- Gold accent line top -->
  <rect x="0" y="0" width="1200" height="2" fill="url(#gold-line)" opacity="0.6"/>
  <defs>
    <linearGradient id="gold-line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="30%" stop-color="#d4a843"/>
      <stop offset="50%" stop-color="#d4a843"/>
      <stop offset="70%" stop-color="#d4a843"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
  </defs>

  <!-- Gold accent line bottom -->
  <rect x="0" y="628" width="1200" height="2" fill="url(#gold-line)" opacity="0.6"/>

  <!-- Logo image (centered) -->
  <image
    href="data:image/png;base64,${logoBuffer.toString('base64')}"
    x="420" y="60" width="360" height="360"
    preserveAspectRatio="xMidYMid meet"
  />

  <!-- Tagline -->
  <text
    x="600" y="490"
    text-anchor="middle"
    font-family="Inter, system-ui, -apple-system, sans-serif"
    font-size="28"
    font-weight="600"
    letter-spacing="8"
    fill="#ffffff"
    filter="url(#text-shadow)"
  >TAP. REVIEW. GROW.</text>

  <!-- Subtle blue bar -->
  <rect x="520" y="520" width="160" height="3" rx="1.5" fill="#2563eb" opacity="0.8"/>

  <!-- URL -->
  <text
    x="600" y="565"
    text-anchor="middle"
    font-family="Inter, system-ui, -apple-system, sans-serif"
    font-size="16"
    font-weight="400"
    fill="rgba(255,255,255,0.4)"
    letter-spacing="2"
  >reviewboost.lt</text>
</svg>`;

async function generate() {
  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(__dirname, '../public/og-image.png'));

  console.log('✅ OG image generated: client/public/og-image.png (1200×630)');
}

generate().catch(console.error);
