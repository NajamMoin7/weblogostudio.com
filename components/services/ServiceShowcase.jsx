"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceIcon from "@/components/ui/ServiceIcon";

/**
 * Interactive service list with an image preview.
 * - Desktop: hovering or focusing a row cross-fades the matching photo in a sticky frame.
 *   State changes only on hover/focus (not per pointer move).
 * - Mobile/touch: each row shows its own thumbnail, so nothing depends on hover.
 * - Every row is a single link to its service page; no nested interactive elements.
 *
 * @param {{ items: { slug: string, title: string, summary: string, icon: string, image: object | null }[] }} props
 */
export default function ServiceShowcase({ items }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <ol className="lg:col-span-7">
        {items.map((item, i) => {
          const on = i === active;
          return (
            <li key={item.slug} className="border-b border-line first:border-t">
              <Link
                href={`/services/${item.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-describedby={`svc-${item.slug}`}
                className="group relative isolate flex items-center gap-5 py-5 sm:py-6"
              >
                {/* Hover/active sweep */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 -left-2 -right-2 -z-10 origin-left lg:-left-4 lg:-right-4 rounded-lg bg-surface-2 transition-[transform,opacity] duration-300 ease-out-quint ${
                    on ? "scale-x-100 opacity-100" : "scale-x-95 opacity-0"
                  }`}
                />
                {/* Mobile thumbnail */}
                {item.image && (
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-md border border-line lg:hidden">
                    <Image src={item.image.src} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                )}
                <span className="hidden text-xs font-semibold tabular-nums text-subtle lg:inline">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`font-display-wide block text-[clamp(1.25rem,2.4vw,2rem)] font-semibold leading-tight transition-[color,transform] duration-300 ease-out-quint ${
                      on ? "translate-x-1 text-fg" : "text-muted group-hover:text-fg"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span id={`svc-${item.slug}`} className="mt-1 block text-sm leading-relaxed text-subtle lg:sr-only">
                    {item.summary}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`grid size-10 shrink-0 place-items-center rounded-full border transition-[background-color,color,border-color,transform] duration-300 ease-out-quint ${
                    on ? "-rotate-45 border-orange-strong bg-orange-strong text-white" : "border-line-strong text-muted group-hover:border-brand/50"
                  }`}
                >
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Desktop preview */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-forest shadow-lift">
            {items.map((item, i) =>
              item.image ? (
                <Image
                  key={item.slug}
                  src={item.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 34vw, 0px"
                  placeholder={item.image.blurDataURL ? "blur" : "empty"}
                  blurDataURL={item.image.blurDataURL}
                  className={`object-cover transition-[opacity,transform] duration-700 ease-out-quint ${
                    i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                  }`}
                />
              ) : null,
            )}
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(17_44_36/0.94),rgb(17_44_36/0.08)_58%)]" />
            <div className="theme-forest absolute inset-x-0 bottom-0 bg-transparent p-7">
              <span className="grid size-11 place-items-center rounded-full bg-orange-strong text-white">
                <ServiceIcon name={current.icon} />
              </span>
              <p className="font-display-wide mt-5 text-2xl font-semibold text-fg">{current.title}</p>
              <p className="mt-2 max-w-sm leading-relaxed text-muted">{current.summary}</p>
            </div>
          </div>
          <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-subtle">Photography: Unsplash</p>
        </div>
      </div>
    </div>
  );
}
