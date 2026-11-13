"use client";

import { useEffect, useRef } from "react";

/**
 * 404 backdrop: a dark brick wall that only shows what the torch is pointed at. The pointer
 * steers the torch; until it moves (and on touch screens) the torch sweeps the wall on its own.
 * The wall hides a giant 404, a note and the logo's lost shards. Decorative only: the page's
 * heading and links sit above it at full contrast. Reduced motion: the torch rests on the 404.
 */
export default function Flashlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = (x, y) => {
      el.style.setProperty("--lx", `${x}px`);
      el.style.setProperty("--ly", `${y}px`);
    };
    const rest = () => {
      const r = el.getBoundingClientRect();
      set(r.width * 0.72, r.height * 0.5);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rest();
      window.addEventListener("resize", rest);
      return () => window.removeEventListener("resize", rest);
    }

    let manual = false;
    let raf = 0;
    const t0 = performance.now();
    const sweep = (now) => {
      if (manual) return;
      const r = el.getBoundingClientRect();
      const t = (now - t0) / 1000;
      // A slow figure-of-eight that keeps returning to the hidden 404 on the right.
      // On phones the text fills the top, so the torch keeps to the empty lower part.
      const narrow = r.width < 640;
      const x = r.width * (0.6 + 0.3 * Math.sin(t * 0.55));
      const y = r.height * (narrow ? 0.78 + 0.12 * Math.sin(t * 1.1 + 0.6) : 0.5 + 0.28 * Math.sin(t * 1.1 + 0.6));
      set(x, y);
      raf = requestAnimationFrame(sweep);
    };
    raf = requestAnimationFrame(sweep);

    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      manual = true;
      cancelAnimationFrame(raf);
      const r = el.getBoundingClientRect();
      set(e.clientX - r.left, e.clientY - r.top);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="torch absolute inset-0 overflow-hidden">
      <svg className="torch-wall absolute inset-0 size-full" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="torch-bricks" width="120" height="56" patternUnits="userSpaceOnUse">
            <path d="M0 0.5H120 M0 28.5H120 M0.5 0V28 M60.5 28V56" stroke="rgb(251 251 248 / 0.1)" strokeWidth="1.5" fill="none" />
          </pattern>
        </defs>
        <rect width="1200" height="760" fill="#161a17" />
        <rect width="1200" height="760" fill="url(#torch-bricks)" />
        <text
          x="1150"
          y="500"
          textAnchor="end"
          fontSize="400"
          fontWeight="800"
          fill="none"
          stroke="#ff8a45"
          strokeWidth="3"
          style={{ fontFamily: "var(--font-display)", fontStretch: "64%" }}
        >
          404
        </text>
        <text
          x="1130"
          y="586"
          textAnchor="end"
          fontSize="30"
          fontWeight="600"
          fill="#9fe0c4"
          transform="rotate(-3 1130 586)"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          It was here a minute ago.
        </text>
        <path
          d="M790 640 C700 700 560 700 470 650"
          fill="none"
          stroke="rgb(251 251 248 / 0.55)"
          strokeWidth="3"
          strokeDasharray="10 9"
          strokeLinecap="round"
        />
        <path d="M486 632 L466 650 L492 660" fill="none" stroke="rgb(251 251 248 / 0.55)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <g opacity="0.85">
          <polygon points="0,0 28,0 86,120 58,120" fill="#12684f" transform="translate(640 90) rotate(-28)" />
          <polygon points="0,0 28,0 86,120 58,120" fill="#8fbfab" transform="translate(1060 70) rotate(18)" />
          <polygon points="0,0 32,0 0,64 -32,64" fill="#f26a1b" transform="translate(560 420) rotate(-50)" />
          <polygon points="0,0 18,30 54,30 43,42 -11,42" fill="#fbfbf8" transform="translate(930 640) rotate(12)" />
        </g>
      </svg>
      <div className="torch-beam absolute inset-0" />
    </div>
  );
}
