"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Accessible horizontal carousel built on Embla.
 * - Touch and mouse drag, previous/next buttons and a progress bar.
 * - Arrow keys move between slides when the carousel has focus.
 * - Tabbing to a link inside an off-screen slide scrolls that slide into view,
 *   so all content is reachable without swiping.
 * - No autoplay. Progress updates write a transform directly (no re-render per scroll frame).
 * - Slides are server-rendered children, so content exists in the HTML without JavaScript.
 *
 * @param {object} props
 * @param {string} props.label           Accessible name, e.g. "Featured projects"
 * @param {string} [props.slideClassName] Width classes for each slide (flex-basis)
 * @param {boolean} [props.dimInactive]  Fade slides that are not selected
 * @param {object} [props.options]       Embla options
 */
export default function Carousel({ label, children, slideClassName = "basis-[85%]", dimInactive = false, options = {}, controlsPosition = "bottom" }) {
  const slides = Children.toArray(children);
  const [viewportRef, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", ...options });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const progressRef = useRef(null);

  const onSelect = useCallback((emblaApi) => {
    setSelected(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, []);

  const onScroll = useCallback((emblaApi) => {
    const p = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${0.08 + p * 0.92})`;
  }, []);

  useEffect(() => {
    if (!api) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    api.on("select", onSelect).on("reInit", onSelect).on("scroll", onScroll).on("reInit", onScroll);
    // reInit emits "reInit", which syncs the initial button and progress state through the listeners.
    api.reInit(reduce ? { duration: 10 } : {});
    return () => {
      api.off("select", onSelect).off("reInit", onSelect).off("scroll", onScroll).off("reInit", onScroll);
    };
  }, [api, onSelect, onScroll]);

  function onKeyDown(e) {
    if (!api) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      api.scrollNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      api.scrollPrev();
    }
  }

  function onFocusSlide(index) {
    if (!api) return;
    // Keep focused content visible when tabbing through slides.
    if (!api.slidesInView().includes(index)) api.scrollTo(index);
  }

  const controls = (
    <div className="flex items-center gap-4">
      <div className="relative h-px w-28 overflow-hidden bg-line-strong sm:w-40" aria-hidden="true">
        <span
          ref={progressRef}
          className="brand-gradient absolute inset-0 origin-left"
          style={{ transform: "scaleX(0.08)" }}
        />
      </div>
      <span className="font-mono text-xs tabular-nums text-subtle" aria-hidden="true">
        {String(selected + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </span>
      <div className="ml-auto flex gap-2">
        {[
          { dir: "prev", Icon: ArrowLeft, can: canPrev, fn: () => api?.scrollPrev(), label: "Previous slide" },
          { dir: "next", Icon: ArrowRight, can: canNext, fn: () => api?.scrollNext(), label: "Next slide" },
        ].map(({ dir, Icon, can, fn, label: l }) => (
          <button
            key={dir}
            type="button"
            onClick={fn}
            disabled={!can}
            aria-label={l}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-[background-color,color,border-color,transform,opacity] duration-200 ease-out-quint hover:border-fg hover:bg-fg hover:text-ink active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-fg"
          >
            <Icon aria-hidden="true" className="size-4" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section aria-roledescription="carousel" aria-label={label} className="relative">
      {controlsPosition === "top" && <div className="mb-8">{controls}</div>}
      <div
        ref={viewportRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={`${label}: use the left and right arrow keys to browse`}
        className="-mx-1 overflow-hidden rounded-sm px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-cyan"
      >
        <ul className="-ml-5 flex touch-pan-y">
          {slides.map((child, i) => (
            <li
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              onFocusCapture={() => onFocusSlide(i)}
              className={`min-w-0 shrink-0 grow-0 pl-5 transition-opacity duration-500 ease-out-quint ${slideClassName} ${
                dimInactive && i !== selected ? "lg:opacity-45" : "opacity-100"
              }`}
            >
              {child}
            </li>
          ))}
        </ul>
      </div>
      {controlsPosition === "bottom" && <div className="mt-8">{controls}</div>}
    </section>
  );
}
