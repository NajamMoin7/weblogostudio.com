/**
 * Builds the website's logo files from the approved master logo (logo/logo.jpeg).
 *
 *   npm run brand:assets
 *
 * - Removes the off-white background with colour-to-alpha (un-blending from white), so antialiased edges stay exact on any light background. Artwork colours are untouched.
 * - Splits the master into the mark (W/L monogram) and the wordmark ("Weblogo Studio") by finding
 *   the empty band between them, then trims each.
 * - Writes:
 *     public/brand/logo-lockup.png      stacked master logo (mark above wordmark), transparent
 *     public/brand/logo-mark.png        monogram only, transparent
 *     public/brand/logo-wordmark.png    wordmark only, transparent
 *     public/brand/logo-horizontal.png  mark beside wordmark, for the header
 *     app/icon.png, app/apple-icon.png  mark on the brand cream
 *     app/opengraph-image.png, app/twitter-image.png  master logo on cream
 * Nothing is stretched: every resize keeps the source aspect ratio.
 */
import sharp from "sharp";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const SRC = path.join(root, "logo/logo.jpeg");
const CREAM = { r: 245, g: 240, b: 230 };

async function transparentMaster() {
  const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  // Un-blend from white: the paper is near-white (252-255), which falls under the noise floor below.
  const paper = [255, 255, 255];

  const out = Buffer.alloc(width * height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    // Ink amount = the largest per-channel distance from paper.
    let d = 0;
    for (let c = 0; c < 3; c++) d = Math.max(d, (paper[c] - data[i + c]) / paper[c]);
    // Paper noise (d < 0.05) is fully transparent. Anything at least 80% inked (the lightest
    // artwork colour, the orange, is ~87%) is fully opaque, so solid areas keep their exact
    // colour; only antialiased edges become partially transparent.
    const a = d < 0.05 ? 0 : Math.min(1, (d - 0.05) / 0.75);
    for (let c = 0; c < 3; c++) {
      const v = data[i + c];
      out[j + c] = a > 0 ? Math.max(0, Math.min(255, Math.round((v - paper[c] * (1 - a)) / a))) : 0;
    }
    out[j + 3] = Math.round(a * 255);
  }
  return { data: out, width, height };
}

/** Row ranges that contain artwork, separated by empty bands. */
function rowBands({ data, width, height }) {
  const bands = [];
  let start = -1;
  for (let y = 0; y < height; y++) {
    let ink = 0;
    for (let x = 0; x < width; x++) if (data[(y * width + x) * 4 + 3] > 40) ink++;
    if (ink > 2 && start < 0) start = y;
    if (ink <= 2 && start >= 0) {
      bands.push([start, y]);
      start = -1;
    }
  }
  if (start >= 0) bands.push([start, height]);
  return bands.filter(([a, b]) => b - a > 8);
}

function region(master, top, bottom) {
  return sharp(master.data, { raw: { width: master.width, height: master.height, channels: 4 } })
    .extract({ left: 0, top, width: master.width, height: bottom - top })
    .png()
    .toBuffer()
    .then((b) => sharp(b).trim({ threshold: 1 }).png().toBuffer());
}

const master = await transparentMaster();
const bands = rowBands(master);
if (bands.length < 2) throw new Error(`Expected mark and wordmark bands, found ${bands.length}`);
// The mark is the tallest band; the wordmark is everything below it.
const markBand = bands.reduce((a, b) => (b[1] - b[0] > a[1] - a[0] ? b : a));
const below = bands.filter((b) => b[0] >= markBand[1]);
const wordBand = [below[0][0], below[below.length - 1][1]];

const mark = await region(master, markBand[0], markBand[1]);
const word = await region(master, wordBand[0], wordBand[1]);
const lockup = await region(master, markBand[0], wordBand[1]);

const brand = (f) => path.join(root, "public/brand", f);
await sharp(mark).toFile(brand("logo-mark.png"));
await sharp(word).toFile(brand("logo-wordmark.png"));
await sharp(lockup).toFile(brand("logo-lockup.png"));

// Horizontal lockup: mark beside the wordmark, wordmark ~40% of the mark height, centred.
const MARK_H = 240;
const markImg = await sharp(mark).resize({ height: MARK_H }).png().toBuffer();
const markMeta = await sharp(markImg).metadata();
const WORD_H = Math.round(MARK_H * 0.4);
const wordImg = await sharp(word).resize({ height: WORD_H }).png().toBuffer();
const wordMeta = await sharp(wordImg).metadata();
const GAP = Math.round(MARK_H * 0.2);
// The canvas is padded to exactly 4:1 (width a multiple of 4), so every width the Next.js image
// optimizer produces (256, 384, 640, 828, 1080...) maps to a whole-pixel height and no variant is squashed.
const H_W = Math.ceil((markMeta.width + GAP + wordMeta.width) / 4) * 4;
const H_H = H_W / 4;
const PAD = Math.round((H_H - MARK_H) / 2);
await sharp({ create: { width: H_W, height: H_H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([
    { input: markImg, left: 0, top: PAD },
    { input: wordImg, left: markMeta.width + GAP, top: PAD + Math.round((MARK_H - WORD_H) / 2) },
  ])
  .png()
  .toFile(brand("logo-horizontal.png"));

async function onCream(input, width, height, fitW, fitH, file) {
  const img = await sharp(input).resize({ width: fitW, height: fitH, fit: "inside" }).png().toBuffer();
  const m = await sharp(img).metadata();
  await sharp({ create: { width, height, channels: 4, background: { ...CREAM, alpha: 1 } } })
    .composite([{ input: img, left: Math.round((width - m.width) / 2), top: Math.round((height - m.height) / 2) }])
    .png()
    .toFile(path.join(root, file));
}

await onCream(mark, 512, 512, 400, 400, "app/icon.png");
await onCream(mark, 180, 180, 136, 136, "app/apple-icon.png");
await onCream(lockup, 1200, 630, 760, 420, "app/opengraph-image.png");
await onCream(lockup, 1200, 630, 760, 420, "app/twitter-image.png");

console.log("Bands:", bands, "mark:", markBand, "wordmark:", wordBand);
console.log("Brand assets written.");
