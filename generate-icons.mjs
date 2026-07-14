import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const logoPath = 'F:/comissao ivc norte/public/logo.png';
const resDir = 'F:/comissao ivc norte/android/app/src/main/res';

const iconSizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

const splashSizes = {
  'drawable-mdpi': { w: 320, h: 480 },
  'drawable-hdpi': { w: 480, h: 720 },
  'drawable-xhdpi': { w: 640, h: 960 },
  'drawable-xxhdpi': { w: 960, h: 1440 },
  'drawable-xxxhdpi': { w: 1280, h: 1920 },
};

async function generate() {
  // Generate launcher icons
  for (const [folder, size] of Object.entries(iconSizes)) {
    const dir = join(resDir, folder);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    // Regular icon
    await sharp(logoPath)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(join(dir, 'ic_launcher.png'));

    // Round icon
    await sharp(logoPath)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(join(dir, 'ic_launcher_round.png'));

    console.log(`${folder}: ${size}x${size} OK`);
  }

  // Generate adaptive icon foreground
  const adaptiveDir = join(resDir, 'mipmap-anydpi-v26');
  if (!existsSync(adaptiveDir)) mkdirSync(adaptiveDir, { recursive: true });

  // Foreground: logo centered in 432x432 canvas (padding around)
  for (const [folder, size] of Object.entries({ 'mipmap-mdpi': 108, 'mipmap-hdpi': 162, 'mipmap-xhdpi': 216, 'mipmap-xxhdpi': 324, 'mipmap-xxxhdpi': 432 })) {
    const dir = join(resDir, folder);
    const logoSize = Math.round(size * 0.6);
    const offset = Math.round((size - logoSize) / 2);

    // Create transparent canvas with logo centered
    const canvas = Buffer.alloc(size * size * 4, 0);
    const logoImg = await sharp(logoPath)
      .resize(logoSize, logoSize, { fit: 'cover' })
      .png()
      .toBuffer();

    // Use sharp composite to place logo on transparent background
    const svgBg = `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="transparent"/></svg>`;
    await sharp(Buffer.from(svgBg))
      .composite([{ input: logoImg, left: offset, top: offset }])
      .png()
      .toFile(join(dir, 'ic_launcher_foreground.png'));

    console.log(`${folder}: foreground ${size}x${size} OK`);
  }

  // Generate splash screens (logo centered on dark background)
  for (const [folder, { w, h }] of Object.entries(splashSizes)) {
    const dir = join(resDir, folder);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    const logoSize = Math.round(Math.min(w, h) * 0.3);
    const svgBg = `<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#1B5E8C"/></svg>`;

    const logoBuffer = await sharp(logoPath)
      .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    await sharp(Buffer.from(svgBg))
      .composite([{
        input: logoBuffer,
        left: Math.round((w - logoSize) / 2),
        top: Math.round((h - logoSize) / 2),
      }])
      .png()
      .toFile(join(dir, 'splash.png'));

    console.log(`${folder}: splash ${w}x${h} OK`);
  }

  console.log('\nTodos os ícones e splash gerados!');
}

generate().catch(console.error);
