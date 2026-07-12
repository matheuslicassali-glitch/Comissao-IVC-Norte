import sharp from 'sharp';
import { mkdirSync, existsSync, copyFileSync } from 'fs';
import { join } from 'path';

const projectDir = 'F:/comissao ivc norte';
const logoPath = join(projectDir, 'public/logo.png');
const resDir = join(projectDir, 'android/app/src/main/res');

async function generate() {
  if (!existsSync(logoPath)) {
    console.log('Logo nao encontrada, copiando do projeto anterior...');
    copyFileSync('F:/par-quia-conecta-main/par-quia-conecta-main/public/logo.jpg', logoPath);
  }

  const metadata = await sharp(logoPath).metadata();
  console.log(`Logo: ${metadata.width}x${metadata.height}`);

  // === ICONES ANDROID ===
  const sizes = {
    'mipmap-mdpi': 48, 'mipmap-hdpi': 72, 'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144, 'mipmap-xxxhdpi': 192,
  };
  const fgSizes = {
    'mipmap-mdpi': 108, 'mipmap-hdpi': 162, 'mipmap-xhdpi': 216,
    'mipmap-xxhdpi': 324, 'mipmap-xxxhdpi': 432,
  };

  for (const [folder, size] of Object.entries(sizes)) {
    const dir = join(resDir, folder);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    await sharp(logoPath)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 248, b: 240, alpha: 1 } })
      .png().toFile(join(dir, 'ic_launcher.png'));

    await sharp(logoPath)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 248, b: 240, alpha: 0 } })
      .png().toFile(join(dir, 'ic_launcher_round.png'));

    console.log(`  icon ${folder}: ${size}x${size} OK`);
  }

  for (const [folder, size] of Object.entries(fgSizes)) {
    const dir = join(resDir, folder);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    await sharp(logoPath)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 248, b: 240, alpha: 0 } })
      .png().toFile(join(dir, 'ic_launcher_foreground.png'));

    console.log(`  fg ${folder}: ${size}x${size} OK`);
  }

  // Drawable foreground
  const drawableDir = join(resDir, 'drawable');
  if (!existsSync(drawableDir)) mkdirSync(drawableDir, { recursive: true });
  await sharp(logoPath)
    .resize(432, 432, { fit: 'contain', background: { r: 255, g: 248, b: 240, alpha: 0 } })
    .png().toFile(join(drawableDir, 'ic_launcher_foreground.png'));

  // === SPLASH SCREEN ===
  const portraitSizes = {
    'drawable-mdpi': { w: 320, h: 480 }, 'drawable-hdpi': { w: 480, h: 720 },
    'drawable-xhdpi': { w: 720, h: 960 }, 'drawable-xxhdpi': { w: 960, h: 1280 },
    'drawable-xxxhdpi': { w: 1280, h: 1920 },
  };
  const landscapeSizes = {
    'drawable-land-mdpi': { w: 480, h: 320 }, 'drawable-land-hdpi': { w: 720, h: 480 },
    'drawable-land-xhdpi': { w: 960, h: 720 }, 'drawable-land-xxhdpi': { w: 1280, h: 960 },
    'drawable-land-xxxhdpi': { w: 1920, h: 1280 },
  };

  const bg = { r: 255, g: 248, b: 240, alpha: 1 };

  async function genSplash(w, h) {
    const logoSize = Math.round(Math.min(w, h) * 0.35);
    const resizedLogo = await sharp(logoPath)
      .resize(logoSize, logoSize, { fit: 'contain', background: bg })
      .toBuffer();
    return sharp({ create: { width: w, height: h, channels: 4, background: bg } })
      .composite([{ input: resizedLogo, gravity: 'center' }])
      .png().toBuffer();
  }

  for (const [folder, { w, h }] of Object.entries(portraitSizes)) {
    const dir = join(resDir, folder);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const buf = await genSplash(w, h);
    await sharp(buf).toFile(join(dir, 'splash.png'));
    console.log(`  splash ${folder}: ${w}x${h} OK`);
  }

  for (const [folder, { w, h }] of Object.entries(landscapeSizes)) {
    const dir = join(resDir, folder);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const buf = await genSplash(w, h);
    await sharp(buf).toFile(join(dir, 'splash.png'));
    console.log(`  splash ${folder}: ${w}x${h} OK`);
  }

  const fallbackBuf = await genSplash(320, 480);
  await sharp(fallbackBuf).toFile(join(drawableDir, 'splash.png'));
  console.log(`  splash drawable: fallback OK`);

  console.log('\nTodos os recursos gerados com sucesso!');
}

generate().catch(console.error);
