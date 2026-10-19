"use client";

import { useRef } from "react";

/**
 * Before/after comparison. A native range input provides keyboard and screen-reader
 * control; pointer dragging anywhere on the image updates the same value.
 * Position is written to a CSS variable, so dragging never re-renders React.
 * `before` and `after` are server-rendered nodes passed in as props.
 */
export default function BeforeAfter({ before, after, labelBefore = "Before", labelAfter = "After", initial = 50 }) {
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const dragging = useRef(false);

  function set(value) {
    const v = Math.min(100, Math.max(0, value));
    rootRef.current?.style.setProperty("--pos", `${v}%`);
    if (inputRef.current) inputRef.current.value = String(Math.round(v));
  }

  function fromPointer(e) {
    const rect = rootRef.current.getBoundingClientRect();
    set(((e.clientX - rect.left) / rect.width) * 100);
  }

  return (
    <div
      ref={rootRef}
      className="group relative w-full touch-pan-y select-none overflow-hidden rounded-xl border border-line"
      style={{ "--pos": `${initial}%` }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        fromPointer(e);
      }}
      onPointerMove={(e) => dragging.current && fromPointer(e)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <div>{after}</div>
      <div className="absolute inset-0" style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }} aria-hidden="true">
        {before}
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-ink/80 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-fg">
        {labelBefore}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-fg px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink">
        {labelAfter}
      </span>

      {/* Divider and handle */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0" style={{ left: "var(--pos)" }}>
        <span className="absolute inset-y-0 -left-px w-0.5 bg-fg" />
        <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink/20 bg-fg text-ink shadow-lg transition-transform duration-200 ease-out-quint group-active:scale-95">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>

      <input
        ref={inputRef}
        type="range"
        min="0"
        max="100"
        defaultValue={initial}
        aria-label="Compare the old and redesigned website. Use arrow keys to move the divider."
        onInput={(e) => set(Number(e.currentTarget.value))}
        className="peer absolute inset-x-0 bottom-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-cyan opacity-0 peer-focus-visible:opacity-100"
      />
    </div>
  );
}
