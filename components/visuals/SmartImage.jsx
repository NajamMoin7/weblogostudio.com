"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Optimised image with a reserved aspect ratio (no layout shift), a subtle skeleton
 * while loading, a fade-in on load, and a graceful fallback if the file fails.
 *
 * `fallback` is any node (for example a coded mockup) shown when the image errors.
 */
export default function SmartImage({ asset, alt, sizes, aspect = "aspect-[4/3]", priority = false, fallback = null, className = "" }) {
  const [state, setState] = useState("loading");
  if (state === "error" && fallback) return fallback;
  return (
    <div className={`relative w-full overflow-hidden bg-surface-2 ${aspect} ${className}`}>
      {state === "loading" && <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-surface-3/60" />}
      <Image
        src={asset.src}
        alt={alt ?? asset.alt ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={asset.blurDataURL ? "blur" : "empty"}
        blurDataURL={asset.blurDataURL}
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
        className={`object-cover transition-opacity duration-500 ease-out-quint ${state === "loaded" ? "opacity-100" : "opacity-0"}`}
      />
      {state === "error" && !fallback && (
        <span className="absolute inset-0 grid place-items-center text-sm text-subtle">Image unavailable</span>
      )}
    </div>
  );
}
