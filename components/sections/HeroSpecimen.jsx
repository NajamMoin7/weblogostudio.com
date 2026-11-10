"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import lazRide from "@/public/images/specimen/laz-ride-mark.webp";

const sizes = [
  { px: 96, label: "Website header" },
  { px: 56, label: "Business card" },
  { px: 32, label: "App icon" },
  { px: 16, label: "Favicon" },
];

/**
 * The hero specimen and its size scrubber. The large tile shows one real logo at sign size;
 * hovering or focusing a size cell sets the same mark at that true pixel width on the
 * measuring grid, and the caption follows. The tile has a fixed aspect ratio, so the
 * change never moves anything around it, and the first paint is the static sign size.
 */
export default function HeroSpecimen() {
  const [active, setActive] = useState(null);
  const current = sizes.find((s) => s.px === active);

  return (
    <figure className="lg:col-span-5 lg:pt-2">
      <div className="overflow-hidden rounded-xl border border-line-strong bg-surface">
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
        <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4" onPointerLeave={() => setActive(null)}>
          {sizes.map((s) => {
            const on = active === s.px;
            return (
              <li key={s.px} className="bg-surface">
                <button
                  type="button"
                  aria-pressed={on}
                  onPointerEnter={() => setActive(s.px)}
                  onFocus={() => setActive(s.px)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(on ? null : s.px)}
                  className={`flex w-full flex-col justify-between gap-4 p-4 text-left transition-colors ${on ? "bg-surface-2" : "hover:bg-surface-2"}`}
                >
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
      <figcaption className="caption mt-3 flex justify-between gap-4" aria-live="polite">
        <Link href="/portfolio/laz-ride-logo" className="underline-offset-2 hover:text-fg hover:underline">
          Laz Ride · logo design
        </Link>
        <span>{current ? `Shown at ${current.px}px: ${current.label.toLowerCase()}` : "Tap or hover a size to see it at true size"}</span>
      </figcaption>
    </figure>
  );
}
