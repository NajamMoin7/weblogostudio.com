import Image from "next/image";
import { getAsset } from "@/lib/assets";

/**
 * Server-rendered registry image that fills its (positioned, sized) parent.
 * Decorative images get empty alt text. Renders nothing if the asset is missing.
 */
export default function StockImage({ id, sizes = "100vw", priority = false, className = "", alt }) {
  const asset = getAsset(id);
  if (!asset) return null;
  return (
    <Image
      src={asset.src}
      alt={asset.decorative ? "" : (alt ?? asset.alt ?? "")}
      fill
      sizes={sizes}
      priority={priority}
      placeholder={asset.blurDataURL ? "blur" : "empty"}
      blurDataURL={asset.blurDataURL}
      className={`object-cover ${className}`}
    />
  );
}
