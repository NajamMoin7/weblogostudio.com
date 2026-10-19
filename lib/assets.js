import generated from "@/data/generated-assets.json";
import stock from "@/data/stock-assets.json";

/**
 * Image registry lookup. Higgsfield-generated images (scripts/higgsfield-generate.mjs) take
 * priority, then free stock photography (scripts/fetch-stock-images.mjs). Returns null when
 * neither exists, so callers fall back to coded visuals and the site never depends on either.
 */
export function getAsset(id) {
  const a = generated[id] ?? stock[id];
  return a && a.src ? a : null;
}
