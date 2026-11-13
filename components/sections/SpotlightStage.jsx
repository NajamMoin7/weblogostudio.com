"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
 * Geometry of the lamp drawing (SVG viewBox 120 x 132, drawn at 0.8 scale = 96 x 105.6 px).
 * The lamp tilts about its knuckle; the beam leaves from just under the lens.
 */
const SCALE = 0.8;
const PIVOT = { x: 60 * SCALE, y: 12 * SCALE };
const BEAM_FROM = 112 * SCALE - PIVOT.y; // px below the knuckle
const BEAM_PAST = 22; // let the beam run a little past the pill centre, then fade

/** Dust caught in the beam: fixed positions so server and client render the same markup. */
const MOTES = [
  [38, 22, 0], [52, 40, 1.4], [46, 63, 2.6], [58, 78, 0.8], [42, 88, 3.4],
  [55, 30, 4.2], [49, 52, 5.1], [61, 66, 1.9], [36, 72, 4.7],
];

/**
 * A stage lamp over a row of service pills. Pick a pill (hover, tap or arrow keys) and the
 * lamp swings to it, the beam lands on it, and the title above crossfades to that service.
 * It switches on with a flicker the first time it scrolls into view and walks through the
 * services by itself until the visitor touches it. Reduced motion: no flicker, no swing
 * animation, no dust, no autoplay.
 */
export default function SpotlightStage({ items }) {
  const [active, setActive] = useState(0);
  const [aim, setAim] = useState(null);
  const [on, setOn] = useState(false);
  const stageRef = useRef(null);
  const pivotRef = useRef(null);
  const tabRefs = useRef([]);
  const touched = useRef(false);
  const id = useId();

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const pivot = pivotRef.current;
    const tab = tabRefs.current[active];
    if (!stage || !pivot || !tab) return;
    const s = stage.getBoundingClientRect();
    const p = pivot.getBoundingClientRect();
    const t = tab.getBoundingClientRect();
    const dx = t.left + t.width / 2 - p.left;
    const dy = t.top + t.height / 2 - p.top;
    setAim({
      // 0deg points straight down; CSS rotation is clockwise, so aiming right is negative.
      angle: (-Math.atan2(dx, dy) * 180) / Math.PI,
      len: Math.max(40, Math.hypot(dx, dy) - BEAM_FROM + BEAM_PAST),
      x: t.left + t.width / 2 - s.left,
      y: t.top + t.height / 2 - s.top,
    });
  }, [active]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(stage);
    return () => ro.disconnect();
  }, [measure]);

  // Switch on when first seen; walk through the services while visible and untouched.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) setOn(true);
      },
      { threshold: 0.45 },
    );
    io.observe(stage);
    const timer = still
      ? null
      : window.setInterval(() => {
          if (visible && !touched.current && !document.hidden) {
            setActive((a) => (a + 1) % items.length);
          }
        }, 3400);
    return () => {
      io.disconnect();
      if (timer) window.clearInterval(timer);
    };
  }, [items.length]);

  const select = (i) => {
    touched.current = true;
    setActive(i);
  };

  const onKeyDown = (e) => {
    const last = items.length - 1;
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = next < 0 ? last : next > last ? 0 : next;
    select(i);
    tabRefs.current[i]?.focus();
  };

  const current = items[active];

  return (
    <div
      ref={stageRef}
      className="spot-stage"
      data-on={on && aim ? "true" : "false"}
      style={
        aim
          ? {
              "--spot-angle": `${aim.angle}deg`,
              "--spot-len": `${aim.len}px`,
              "--spot-x": `${aim.x}px`,
              "--spot-y": `${aim.y}px`,
            }
          : undefined
      }
    >
      <div aria-hidden="true" className="spot-ambient" />

      {/* Titles: stacked in one cell so they crossfade without the stage changing height. */}
      <div className="relative z-10 grid px-5 pt-10 text-center sm:pt-14">
        {items.map((it, i) => (
          <div
            key={it.slug}
            id={`${id}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${i}`}
            aria-hidden={i !== active}
            inert={i !== active}
            data-active={i === active}
            className="spot-panel [grid-area:1/1]"
          >
            <h3 className="font-display-wide text-[clamp(2.3rem,7vw,4.25rem)] font-bold leading-[0.95] text-fg">
              {it.title}
            </h3>
            <p className="mx-auto mt-3 max-w-[34rem] text-[0.98rem] leading-snug text-muted sm:text-[1.05rem]">
              {it.summary}
            </p>
          </div>
        ))}
      </div>

      {/* The lamp: a fixed neck, then a head that tilts about its knuckle. */}
      <div aria-hidden="true" className="relative mx-auto mt-5 h-[150px] w-px sm:mt-7 sm:h-[200px]">
        <span className="spot-neck" />
        <span ref={pivotRef} className="absolute left-0 top-[36px] size-0" />
        <div className="spot-head" style={{ top: 36 }}>
          <div className="spot-beam" style={{ top: BEAM_FROM }}>
            <div className="spot-glow">
              <div className="spot-cone" />
            </div>
            <div className="spot-motes">
              {MOTES.map(([x, y, d], i) => (
                <span key={i} className="spot-mote" style={{ left: `${x}%`, top: `${y}%`, "--md": `${d}s` }} />
              ))}
            </div>
          </div>
          <Lamp />
        </div>
      </div>

      <div aria-hidden="true" className="spot-pool" />

      <div className="relative z-10 flex flex-col items-center px-3 pb-10 pt-6 sm:pb-14 sm:pt-10">
        <div role="tablist" aria-label="Services" className="spot-bar" onKeyDown={onKeyDown}>
          {items.map((it, i) => (
            <button
              key={it.slug}
              ref={(el) => (tabRefs.current[i] = el)}
              id={`${id}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              onPointerEnter={(e) => e.pointerType === "mouse" && select(i)}
              className="spot-pill"
            >
              {it.label}
            </button>
          ))}
        </div>

        <Link
          href={current.href}
          className="group mt-7 inline-flex items-center gap-2 font-semibold text-fg underline decoration-line-strong decoration-2 underline-offset-[7px] transition-colors hover:decoration-brand"
        >
          See {current.title}
          <ArrowRight aria-hidden="true" className="arrow-nudge size-4" />
        </Link>
      </div>
    </div>
  );
}

/** Fresnel-style stage lamp, drawn pointing down, with the studio's orange band on the barrel. */
function Lamp() {
  return (
    <svg
      viewBox="0 0 120 132"
      width={120 * SCALE}
      height={132 * SCALE}
      className="absolute"
      style={{ left: -PIVOT.x, top: -PIVOT.y }}
    >
      <defs>
        <linearGradient id="spot-barrel" x1="0" x2="1">
          <stop offset="0" stopColor="#0e100f" />
          <stop offset="0.32" stopColor="#4b524e" />
          <stop offset="0.5" stopColor="#2b302d" />
          <stop offset="1" stopColor="#0c0e0d" />
        </linearGradient>
        <linearGradient id="spot-yoke" x1="0" x2="1">
          <stop offset="0" stopColor="#3d4440" />
          <stop offset="1" stopColor="#1d211f" />
        </linearGradient>
        <radialGradient id="spot-lens" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="0.45" stopColor="#ffd59c" />
          <stop offset="1" stopColor="#e07a2e" />
        </radialGradient>
        <radialGradient id="spot-halo">
          <stop offset="0" stopColor="#ffd8a6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ff9a4a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* yoke */}
      <path d="M60 12 V25 M20 25 H100 M20 25 V68 M100 25 V68" fill="none" stroke="url(#spot-yoke)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="20" cy="68" r="5.5" fill="#2a2f2c" stroke="#4e5551" strokeWidth="1.5" />
      <circle cx="100" cy="68" r="5.5" fill="#2a2f2c" stroke="#4e5551" strokeWidth="1.5" />
      <circle cx="60" cy="12" r="7.5" fill="#2a2f2c" stroke="#59605c" strokeWidth="1.5" />
      {/* barrel */}
      <rect x="34" y="28" width="52" height="9" rx="3" fill="#262a28" />
      <rect x="29" y="34" width="62" height="68" rx="7" fill="url(#spot-barrel)" />
      <g stroke="#070808" strokeOpacity="0.7" strokeWidth="2">
        <path d="M31 44 H89 M31 51 H89 M31 58 H89 M31 65 H89" />
      </g>
      <rect x="29" y="84" width="62" height="5" fill="#ff6a1a" />
      {/* bezel + lens */}
      <rect x="25" y="99" width="70" height="10" rx="3" fill="#1e2220" stroke="#454c48" strokeWidth="1" />
      <ellipse className="spot-light" cx="60" cy="114" rx="44" ry="12" fill="url(#spot-halo)" />
      <ellipse cx="60" cy="109.5" rx="29" ry="4.5" fill="#3b2a1d" />
      <ellipse className="spot-light" cx="60" cy="109.5" rx="29" ry="4.5" fill="url(#spot-lens)" />
    </svg>
  );
}
