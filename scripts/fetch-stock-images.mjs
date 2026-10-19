#!/usr/bin/env node
/**
 * Downloads the free Unsplash photos listed in data/stock-images.json, applies one
 * consistent light grade so the set feels cohesive with the brand, and writes
 * optimised WebP files plus blur placeholders to public/images/stock/.
 * Results are registered in data/stock-assets.json, which the site reads at build time.
 *
 * Usage: npm run images:stock            (skip images already registered)
 *        npm run images:stock -- --force (re-download everything)
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = JSON.parse(readFileSync(path.join(ROOT, "data", "stock-images.json"), "utf8"));
const REGISTRY = path.join(ROOT, "data", "stock-assets.json");
const OUT = path.join(ROOT, "public", "images", "stock");
const force = process.argv.includes("--force");

mkdirSync(OUT, { recursive: true });
const registry = existsSync(REGISTRY) ? JSON.parse(readFileSync(REGISTRY, "utf8")) : {};
let ok = 0;
const failed = [];

for (const img of MANIFEST.images) {
  if (registry[img.id] && !force) continue;
  const url = `https://images.unsplash.com/photo-${img.unsplash}?w=${img.width}&q=85&fm=jpg`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());
    // A gentle, consistent grade: slightly less saturated and a touch darker, so photos sit
    // calmly next to the dark brand palette without losing their colour.
    const graded = sharp(input).modulate({ saturation: 0.9, brightness: 0.96 }).linear(1.04, -4);
    // Content-hashed filenames, so caches (Next image optimiser, CDNs, browsers) never serve a stale photo.
    const buffer = await graded.clone().webp({ quality: 78 }).toBuffer({ resolveWithObject: true });
    const hash = createHash("sha256").update(buffer.data).digest("hex").slice(0, 8);
    const file = `${img.id}-${hash}.webp`;
    // Remove previous versions of this image only (exact id match, hashed or unhashed).
    const previous = new RegExp(`^${img.id}(-[0-9a-f]{8})?\\.webp$`);
    for (const old of readdirSync(OUT)) if (old !== file && previous.test(old)) unlinkSync(path.join(OUT, old));
    writeFileSync(path.join(OUT, file), buffer.data);
    const info = buffer.info;
    const blur = await sharp(input).resize(16).webp({ quality: 40 }).toBuffer();
    registry[img.id] = {
      src: `/images/stock/${file}`,
      width: info.width,
      height: info.height,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
      alt: img.alt,
      decorative: Boolean(img.decorative),
      source: "Unsplash",
      sourceUrl: `https://images.unsplash.com/photo-${img.unsplash}`,
      license: MANIFEST.license.url,
    };
    writeFileSync(REGISTRY, `${JSON.stringify(registry, null, 2)}\n`);
    console.log(`saved ${file} (${info.width}x${info.height})`);
    ok += 1;
  } catch (e) {
    console.error(`failed ${img.id}: ${e.message}`);
    failed.push(img.id);
  }
}
console.log(`\n${ok} downloaded, ${failed.length} failed${failed.length ? `: ${failed.join(", ")}` : ""}`);
if (failed.length) process.exitCode = 1;
