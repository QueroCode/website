const sharp = require("sharp");
const path = require("path");

const SRC = path.resolve(__dirname, "../public/images/splash_illustration.original.png");
const OUT = path.resolve(__dirname, "../public/images/splash_illustration.png");

(async () => {
  const img = sharp(SRC);
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const total = width * height;

  // Auto-detect the dominant dark background by scanning the luminance histogram
  // among opaque pixels only (transparent corners are already alpha=0).
  const hist = new Array(256).fill(0);
  for (let i = 0; i < total; i++) {
    if (data[i * channels + 3] < 200) continue;
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];
    const lum = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
    hist[lum]++;
  }
  // Find brightest luminance in the bottom 25% of the range with significant population.
  let bgLum = 0;
  let bgCount = 0;
  for (let l = 0; l < 64; l++) {
    if (hist[l] > bgCount) {
      bgCount = hist[l];
      bgLum = l;
    }
  }
  console.log(`Detected opaque background luminance: ${bgLum} (count ${bgCount})`);

  // Convert: anything at or below the background+margin becomes fully transparent.
  // Brighter pixels get proportional alpha and are tinted toward white so lines stay visible.
  const out = Buffer.alloc(total * 4);
  const FLOOR = bgLum + 8; // cushion to wipe out anti-aliased edges of the bg fill
  const CEIL = 255;
  const range = CEIL - FLOOR;

  for (let i = 0; i < total; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    let alpha = 0;
    if (lum > FLOOR) {
      alpha = Math.min(255, Math.round(((lum - FLOOR) / range) * 255));
    }

    // Preserve the original hue but lift it toward white so faint lines stay legible
    // by normalising RGB against luminance.
    let outR = r, outG = g, outB = b;
    if (alpha > 0) {
      const scale = 255 / Math.max(lum, 1);
      outR = Math.min(255, Math.round(r * scale));
      outG = Math.min(255, Math.round(g * scale));
      outB = Math.min(255, Math.round(b * scale));
    }

    out[i * 4] = outR;
    out[i * 4 + 1] = outG;
    out[i * 4 + 2] = outB;
    out[i * 4 + 3] = alpha;
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  console.log(`Wrote ${OUT}`);
})();
