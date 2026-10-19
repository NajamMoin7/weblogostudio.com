"use client";

import { Children, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Seamless infinite marquee (CSS keyframes, transform only).
 * - The content is rendered twice; the track translates by exactly one copy (-50%), so the
 *   loop boundary is invisible. The second copy is aria-hidden.
 * - Pauses on hover and keyboard focus, and via a visible pause button (WCAG 2.2.2).
 * - Edge fade via a CSS mask; the wrapper clips overflow, so the page never scrolls sideways.
 * - Reduced motion: no animation; the row becomes a static, scrollable list without the duplicate.
 */
export default function Marquee({
  children,
  label,
  duration = 40,
  direction = "left",
  className = "",
  itemClassName = "",
  paused: pausedProp,
  showControl = true,
}) {
  const [pausedState, setPaused] = useState(false);
  // Controlled when a parent (e.g. a group of rows) owns the pause state.
  const paused = pausedProp ?? pausedState;
  const items = Children.toArray(children);

  const copy = (hidden) => (
    <ul
      className="marquee-copy flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : label}
    >
      {items.map((child, i) => (
        <li key={i} className={`shrink-0 ${itemClassName}`}>
          {child}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`relative ${className}`}>
      <div
        className="marquee overflow-hidden"
        data-direction={direction}
        data-paused={paused}
        style={{ "--marquee-duration": `${duration}s` }}
      >
        <div className="marquee-track">
          {copy(false)}
          {copy(true)}
        </div>
      </div>
      {showControl && (
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? `Play ${label} animation` : `Pause ${label} animation`}
        className="absolute -top-14 right-0 grid size-9 place-items-center rounded-full border border-line-strong text-muted transition-[color,border-color,background-color,transform] duration-200 ease-out-quint hover:border-fg hover:text-fg active:scale-95 motion-reduce:hidden"
      >
        {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
      </button>
      )}
    </div>
  );
}
