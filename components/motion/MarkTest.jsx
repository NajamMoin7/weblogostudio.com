"use client";

import { useEffect, useRef, useState } from "react";

/** The mark's four shards (same geometry as HeroMotif). */
const SHARDS = [
  "120,90 190,90 334,390 264,390",
  "230,90 300,90 444,390 374,390",
  "470,90 550,90 466,250 386,250",
  "480,284 526,360 616,360 588,390 452,390",
];

/** Each ground recolours the mark the way the brand guidelines would. */
const GROUNDS = [
  { id: "paper", label: "Paper", bg: "#fbfbf8", ink: "#141815", fills: ["#0b4f3c", "#12684f", "#f26a1b", "#141815"] },
  { id: "forest", label: "Forest", bg: "#0b4f3c", ink: "#fbfbf8", fills: ["#fbfbf8", "#8fbfab", "#f26a1b", "#fbfbf8"] },
  { id: "ink", label: "Ink", bg: "#141815", ink: "#fbfbf8", fills: ["#fbfbf8", "#8fbfab", "#f26a1b", "#fbfbf8"] },
  { id: "orange", label: "Orange", bg: "#f26a1b", ink: "#141815", fills: ["#141815", "#0b4f3c", "#fbfbf8", "#141815"] },
];

/** Real-world sizes, largest to smallest. `px` is the mark's width at that size. */
const SIZES = [
  { id: "billboard", label: "Billboard", px: 420 },
  { id: "sign", label: "Shop sign", px: 240 },
  { id: "card", label: "Business card", px: 112 },
  { id: "app", label: "App icon", px: 40 },
  { id: "favicon", label: "Browser tab", px: 16 },
];

function Mark({ fills, width }) {
  return (
    <svg
      viewBox="110 80 516 320"
      style={{ width: typeof width === "number" ? `${width}px` : width }}
      aria-hidden="true"
      focusable="false"
      className="mark-test-svg block h-auto"
    >
      {SHARDS.map((points, i) => (
        <polygon key={points} points={points} fill={fills[i]} />
      ))}
    </svg>
  );
}

/**
 * About page: the studio's own mark on a test bench. Pick a ground and a size, from billboard
 * down to a 16px browser tab, and the mark recolours and shrinks to show it still holds up.
 * Walks through the sizes by itself while visible until the visitor touches a control.
 */
export default function MarkTest() {
  const [ground, setGround] = useState(0);
  const [size, setSize] = useState(0);
  const touched = useRef(false);
  const bench = useRef(null);

  useEffect(() => {
    const el = bench.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    let step = 0;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    const timer = window.setInterval(() => {
      if (!visible || touched.current || document.hidden) return;
      step += 1;
      setSize(step % SIZES.length);
      if (step % SIZES.length === 0) setGround((g) => (g + 1) % GROUNDS.length);
    }, 1900);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const g = GROUNDS[ground];
  const s = SIZES[size];
  const take = (fn) => (v) => {
    touched.current = true;
    fn(v);
  };

  return (
    <div>
      <div
        ref={bench}
        className="mark-test @container relative grid aspect-[4/3] sm:aspect-[16/10] place-items-center overflow-hidden rounded-xl border border-line-strong"
        style={{ background: g.bg, color: g.ink }}
      >
        <p className="absolute left-4 top-4 text-xs font-semibold uppercase tracking-[0.14em] opacity-70">Size test</p>
        <p className="absolute right-4 top-4 text-xs font-semibold tabular-nums opacity-70">
          {s.label} · {s.px}px
        </p>

        <div className="relative grid place-items-center">
          {/* App icon and browser tab sit in their real context. */}
          <div className="grid place-items-center">
            {s.id === "favicon" ? (
              <span className="flex items-center gap-2 rounded-t-lg bg-[#e9e9e4] px-3 py-1.5 text-[11px] font-medium text-[#141815] shadow-card">
                <Mark fills={GROUNDS[0].fills} width={16} />
                Web Logo Studio
                <span aria-hidden="true" className="ml-2 text-[#141815]/50">
                  ×
                </span>
              </span>
            ) : s.id === "app" ? (
              <span className="grid size-[64px] place-items-center rounded-[16px] shadow-lift" style={{ background: GROUNDS[ground === 0 ? 2 : 0].bg }}>
                <Mark fills={GROUNDS[ground === 0 ? 2 : 0].fills} width={40} />
              </span>
            ) : (
              <Mark fills={g.fills} width={`min(${s.px}px, 60cqw)`} />
            )}
          </div>
          {s.px >= 112 && (
            <span aria-hidden="true" className="mark-test-rule mt-4 flex items-center gap-2 text-[11px] font-semibold tabular-nums opacity-60" style={{ width: `min(${s.px}px, 60cqw)` }}>
              <span className="h-2 border-l border-current" />
              <span className="h-px flex-1 bg-current" />
              {s.px}px
              <span className="h-px flex-1 bg-current" />
              <span className="h-2 border-r border-current" />
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div role="radiogroup" aria-label="Ground colour" className="flex gap-2">
          {GROUNDS.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="radio"
              aria-checked={i === ground}
              aria-label={x.label}
              onClick={() => take(setGround)(i)}
              className="mark-test-swatch size-9 rounded-full border-2 border-line-strong"
              style={{ background: x.bg }}
            />
          ))}
        </div>
        <div role="radiogroup" aria-label="Size" className="flex flex-wrap gap-1 rounded-full border border-line-strong p-1">
          {SIZES.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="radio"
              aria-checked={i === size}
              onClick={() => take(setSize)(i)}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-fg aria-checked:bg-fg aria-checked:text-ink"
            >
              {x.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
