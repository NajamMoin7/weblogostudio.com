"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Monitor, X } from "lucide-react";
import PayButton from "@/components/offer/PayButton";
import Spinner from "@/components/ui/Spinner";
import { pricing99 } from "@/data/offer99";

/**
 * "View full design": opens the full desktop screenshot of a "Pick a style" site inside a
 * browser frame, scrollable top to bottom, with the "Build mine like this" checkout button
 * pinned at the bottom. Native <dialog>: focus trap, Escape to close, focus restored.
 */
export default function StylePreview({ slug, title, industry, img }) {
  const dialogRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  const open = () => {
    setMounted(true); // load the big image only when someone asks for it
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="mx-auto mt-4 inline-flex h-11 w-full max-w-[16rem] items-center justify-center gap-2 rounded-md border border-line-strong text-[0.95rem] font-semibold text-fg transition-[background-color,color,transform] duration-200 ease-out-quint hover:bg-fg hover:text-ink active:scale-[0.98]"
      >
        <Monitor aria-hidden="true" className="size-4" />
        View full design
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`${title}: full website design`}
        className="m-0 h-dvh max-h-none w-screen max-w-none theme-forest bg-ink/[0.97] p-0 text-fg backdrop:bg-forest-deep/80 backdrop:backdrop-blur-sm"
        onClick={(e) => e.target === dialogRef.current && close()}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="min-w-0">
              <span className="block truncate font-semibold">{title}</span>
              <span className="block truncate text-sm text-muted">{industry} · scroll to see the full page</span>
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close preview"
              autoFocus
              className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong transition-colors hover:bg-fg hover:text-ink"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="min-h-0 flex-1 px-3 sm:px-8">
            <div className="mx-auto flex h-full max-w-5xl flex-col overflow-hidden rounded-t-xl border border-line-strong bg-surface-2">
              {/* Browser chrome, so it reads as a desktop website, not a phone. */}
              <div aria-hidden="true" className="flex items-center gap-3 border-b border-line bg-charcoal px-4 py-2.5">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-white/25" />
                  <span className="size-2.5 rounded-full bg-white/25" />
                  <span className="size-2.5 rounded-full bg-white/25" />
                </span>
                <span className="flex-1 truncate rounded-md bg-white/10 px-3 py-1 text-center text-xs text-white/70">
                  yourbusiness.com
                </span>
              </div>
              <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain">
                {mounted && (
                  <>
                    {!loaded && (
                      <span className="absolute inset-x-0 top-24 grid place-items-center">
                        <Spinner size={32} label="Loading design" className="text-fg" />
                      </span>
                    )}
                    <Image
                      src={img.src}
                      alt={`${title} website design by Web Logo Studio, full page`}
                      width={img.width}
                      height={img.height}
                      sizes="(min-width: 1088px) 1024px, 96vw"
                      onLoad={() => setLoaded(true)}
                      className={`block h-auto w-full transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-line-strong bg-ink px-4 py-3 sm:px-6">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 sm:flex-row sm:justify-between">
              <p className="text-center text-sm text-muted sm:text-left">
                Your site in this style, with your name, photos and colours. ${pricing99.deposit} to start.
              </p>
              <PayButton
                variant="compact"
                style={slug}
                label="Build mine like this"
                ariaLabel={`Build my site in the style of ${title}. Start for $${pricing99.deposit}`}
                className="w-full sm:w-72"
              />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
