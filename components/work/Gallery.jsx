"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

/**
 * Project image gallery with an accessible lightbox.
 * - Inline: every image is shown in full (logos never cropped). Very tall website pages are
 *   shown in a fixed-height frame that scrolls, so the whole page stays viewable.
 * - Lightbox: native <dialog> (focus trap, Escape to close, focus restored), previous/next buttons,
 *   arrow keys, swipe gestures, counter, and a branded spinner until each image has loaded.
 */
export default function Gallery({ images, title, background }) {
  const dialogRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [loadedSrc, setLoadedSrc] = useState(null);
  const touch = useRef(null);
  const count = images.length;
  const current = images[index];
  const tall = (img) => img.height / img.width > 1.6;

  const open = (i) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const go = useCallback((d) => setIndex((i) => (i + d + count) % count), [count]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e) => {
      if (!dlg.open) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <>
      <ul className="grid gap-6">
        {images.map((img, i) => (
          <li key={img.src}>
            {/* Never upscale: small source previews keep their natural width. */}
            <figure style={img.role === "card" ? { maxWidth: img.width } : undefined}>
              <div
                className={`reveal-image group relative overflow-hidden rounded-xl border border-line ${tall(img) ? "max-h-[80vh] overflow-y-auto" : ""}`}
                style={{ background: background ?? "var(--color-surface-2)" }}
              >
                <Image
                  src={img.src}
                  alt={`${title}${count > 1 ? `, image ${i + 1} of ${count}` : ""}`}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1312px) 1216px, 94vw"
                  priority={i === 0}
                  className="h-auto w-full"
                />
                <button
                  type="button"
                  onClick={() => open(i)}
                  className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-ink/80 px-3.5 py-2 text-xs font-medium text-fg backdrop-blur-sm transition-[background-color,color,transform] duration-200 ease-out-quint hover:bg-fg hover:text-ink active:scale-95"
                >
                  <Maximize2 aria-hidden="true" className="size-3.5" />
                  View larger
                </button>
              </div>
              {img.role === "card" && (
                <figcaption className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">Portfolio preview image</figcaption>
              )}
              {img.role === "full" && tall(img) && (
                <figcaption className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">
                  Full page · scroll inside the frame
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${title} gallery`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-fg backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
        onClick={(e) => e.target === dialogRef.current && close()}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="truncate text-sm text-muted">
              {title}
              {count > 1 && (
                <span className="ml-3 font-mono text-xs text-subtle">
                  {index + 1} / {count}
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              autoFocus
              className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:bg-fg hover:text-ink"
            >
              <X className="size-5" />
            </button>
          </div>
          <div
            className="relative flex-1 overflow-auto"
            onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touch.current == null) return;
              const dx = e.changedTouches[0].clientX - touch.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touch.current = null;
            }}
          >
            {current && (
              <div className={`mx-auto flex min-h-full max-w-6xl justify-center px-4 pb-6 sm:px-16 ${tall(current) ? "items-start" : "items-center"}`}>
                <div className="relative w-full" style={{ background: background ?? undefined }}>
                  {loadedSrc !== current.src && (
                    <span className="absolute inset-0 grid place-items-center">
                      <Spinner size={36} label="Loading image" className="text-fg" />
                    </span>
                  )}
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={`${title}, image ${index + 1} of ${count}`}
                    width={current.width}
                    height={current.height}
                    sizes="(min-width: 1152px) 1152px, 100vw"
                    onLoad={() => setLoadedSrc(current.src)}
                    className={`mx-auto h-auto w-full transition-opacity duration-300 ${loadedSrc === current.src ? "opacity-100" : "opacity-0"} ${
                      tall(current) ? "" : "max-h-[calc(100dvh-7rem)] object-contain"
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-ink/70 transition-colors hover:bg-fg hover:text-ink"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-ink/70 transition-colors hover:bg-fg hover:text-ink"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
