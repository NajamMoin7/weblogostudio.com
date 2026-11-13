"use client";

import { useRef } from "react";

const WORD = "WEB LOGO STUDIO";

function Word({ className }) {
  // SVG text with textLength fills the width exactly at every screen size.
  return (
    <svg viewBox="0 0 1000 132" className={`block h-auto w-full ${className}`} aria-hidden="true" focusable="false">
      <text
        x="0"
        y="118"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        fontSize="150"
        fontWeight="800"
        style={{ fontFamily: "var(--font-display)", fontStretch: "64%" }}
      >
        {WORD}
      </text>
    </svg>
  );
}

/**
 * Footer sign-off: the studio name in outline across the full width. Under the cursor the
 * letters fill with the logo's orange, like a torch on a painted sign; on touch screens a
 * soft light drifts along it by itself (see .wordmark-* in globals.css). Decorative.
 */
export default function FooterWordmark() {
  const ref = useRef(null);

  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--wx", `${e.clientX - r.left}px`);
    el.style.setProperty("--wy", `${e.clientY - r.top}px`);
    el.dataset.lit = "true";
  };
  const onLeave = () => {
    if (ref.current) ref.current.dataset.lit = "false";
  };

  return (
    <div ref={ref} className="wordmark relative mt-12 select-none" data-lit="false" onPointerMove={onMove} onPointerLeave={onLeave}>
      <Word className="wordmark-outline" />
      <Word className="wordmark-fill absolute inset-0" />
    </div>
  );
}
