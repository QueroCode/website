const sharp = require("sharp");
const path = require("path");

const SRC = path.resolve(__dirname, "../public/images/splash_illustration.original.png");

(async () => {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const hist = new Array(256).fill(0);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];
    const lum = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
    hist[lum]++;
  }

  console.log("Top 10 luminance buckets:");
  hist
    .map((c, l) => ({ l, c }))
    .sort((a, b) => b.c - a.c)
    .slice(0, 10)
    .forEach((b) => console.log(`  lum ${b.l.toString().padStart(3)}  count ${b.c}`));

  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);
  const i = (cy * width + cx) * channels;
  console.log(`Center pixel rgb(${data[i]}, ${data[i + 1]}, ${data[i + 2]})  alpha=${data[i + 3]}`);

  // Sample 10 pixels along the diagonal
  for (let k = 1; k <= 10; k++) {
    const x = Math.floor((width * k) / 11);
    const y = Math.floor((height * k) / 11);
    const idx = (y * width + x) * channels;
    console.log(`  (${x},${y}) rgb(${data[idx]}, ${data[idx + 1]}, ${data[idx + 2]}) a=${data[idx + 3]}`);
  }
})();
