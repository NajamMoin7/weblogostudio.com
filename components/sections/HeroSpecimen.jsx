"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroMotif from "@/components/motion/HeroMotif";
import lazRide from "@/public/images/specimen/laz-ride-mark.webp";

const sizes = [
  { px: 96, label: "Website header" },
  { px: 56, label: "Business card" },
  { px: 32, label: "App icon" },
  { px: 16, label: "Favicon" },
];

/** Autoplay order: sign size, then down the ladder, then back to sign size. */
const CYCLE = [null, 96, 56, 32, 16];
const STEP_MS = 2200;

/**
 * The hero specimen and its size scrubber. The large tile shows one real logo at sign size and,
 * until the visitor touches it, steps the mark down through its real sizes on its own. Hovering,
 * focusing or tapping a size takes over and stops the autoplay for good. The tile has a fixed
 * aspect ratio, so nothing around it moves, and the first paint is the static sign size.
 * Reduced motion: no autoplay. The construction drawing sits behind the card.
 */
export default function HeroSpecimen() {
  const [active, setActive] = useState(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = setInterval(() => {
      if (document.hidden) return;
      i = (i + 1) % CYCLE.length;
      setActive(CYCLE[i]);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [touched]);

  const take = (px) => {
    setTouched(true);
    setActive(px);
  };
  const current = sizes.find((s) => s.px === active);

  return (
    <figure className="relative lg:col-span-5 lg:pt-2">
      <HeroMotif compact seed={1} className="pointer-events-none absolute -right-3 -top-7 z-10 w-28 sm:-right-5 sm:w-36" />
      <div className="theme-paper relative overflow-hidden rounded-xl bg-surface shadow-lift">
        <div className="grid-lines grid aspect-[16/9] place-items-center border-b border-line px-8">
          <Image
            src={lazRide}
            alt="Laz Ride logo by Web Logo Studio, shown at sign size"
            priority
            sizes="(min-width: 1024px) 34vw, 80vw"
            className="spec-mark h-auto max-w-full"
            style={{ width: current ? `${current.px}px` : "78%" }}
          />
        </div>
        <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4" onPointerLeave={() => touched && setActive(null)}>
          {sizes.map((s) => {
            const on = active === s.px;
            return (
              <li key={s.px} className="bg-surface">
                <button
                  type="button"
                  aria-pressed={on}
                  onPointerEnter={() => take(s.px)}
                  onFocus={() => take(s.px)}
                  onBlur={() => setActive(null)}
                  onClick={() => (on && touched ? setActive(null) : take(s.px))}
                  className={`relative flex w-full flex-col justify-between gap-4 p-4 text-left transition-colors duration-300 ${
                    on ? "bg-surface-2" : "hover:bg-surface-2"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-[3px] origin-left bg-orange transition-transform duration-500 ease-out-quint ${
                      on ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                  <span className="grid h-16 w-full place-items-center">
                    <Image src={lazRide} alt="" sizes="(min-width: 1024px) 34vw, 80vw" className="h-auto max-w-full" style={{ width: s.px }} />
                  </span>
                  <span className="caption block leading-tight">
                    <span className={on ? "font-semibold text-fg" : ""}>{s.px}px</span>
                    <span className="block text-fg/70">{s.label}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <figcaption className="caption relative mt-3 flex justify-between gap-4" aria-live={touched ? "polite" : "off"}>
        <Link href="/portfolio/laz-ride-logo" className="underline-offset-2 hover:text-fg hover:underline">
          Laz Ride · logo design
        </Link>
        <span>{current ? `Shown at ${current.px}px: ${current.label.toLowerCase()}` : "Tap or hover a size to see it at true size"}</span>
      </figcaption>
    </figure>
  );
}
