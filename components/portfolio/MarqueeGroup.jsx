"use client";

import { Children, cloneElement, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Several marquee rows sharing one visible pause/play control (WCAG 2.2.2).
 * Children must be <Marquee> elements; each still pauses on its own hover/focus.
 */
export default function MarqueeGroup({ children, label, controlClassName = "" }) {
  const [paused, setPaused] = useState(false);
  return (
    <div>
      <div className={`flex justify-end ${controlClassName}`}>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? `Play ${label} animation` : `Pause ${label} animation`}
          className="grid size-9 place-items-center rounded-full border border-line-strong text-muted transition-[color,border-color,transform] duration-200 ease-out-quint hover:border-fg hover:text-fg active:scale-95 motion-reduce:hidden"
        >
          {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
        </button>
      </div>
      <div className="mt-4 space-y-5">
        {Children.map(children, (child) => cloneElement(child, { paused, showControl: false }))}
      </div>
    </div>
  );
}
