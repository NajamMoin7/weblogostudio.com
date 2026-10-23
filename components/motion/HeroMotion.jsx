"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Hero motion controller.
 * - One pointer listener for the whole hero writes CSS variables (--hx/--hy for the headline
 *   highlight, --px/--py for stage parallax) inside a requestAnimationFrame. No React renders.
 * - Pointer effects run only for fine pointers with hover and without reduced motion.
 * - Provides a shared `paused` state for the rotating headline and ambient background,
 *   controlled by a visible pause button (WCAG 2.2.2), and pauses automatically when the
 *   hero is off screen or the tab is hidden.
 */
const MotionCtx = createContext({ paused: false, reduced: false, userPaused: false, toggle: () => {} });
export const useHeroMotion = () => useContext(MotionCtx);

export default function HeroMotion({ children, className = "", labelledBy }) {
  const ref = useRef(null);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Pause when off screen or when the tab is hidden.
  useEffect(() => {
    const el = ref.current;
    // Two independent signals, so one can never overwrite the other.
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Pointer tracking (fine pointers only).
  useEffect(() => {
    const section = ref.current;
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let cleanup = () => {};

    function enable() {
      let frame = 0;
      let last = null;
      const highlight = section.querySelector("[data-highlight-root]");
      function apply() {
        frame = 0;
        if (!last) return;
        const r = section.getBoundingClientRect();
        section.style.setProperty("--px", (((last.x - r.left) / r.width) * 2 - 1).toFixed(3));
        section.style.setProperty("--py", (((last.y - r.top) / r.height) * 2 - 1).toFixed(3));
        if (highlight) {
          const h = highlight.getBoundingClientRect();
          highlight.style.setProperty("--hx", `${last.x - h.left}px`);
          highlight.style.setProperty("--hy", `${last.y - h.top}px`);
        }
      }
      const onMove = (e) => {
        last = { x: e.clientX, y: e.clientY };
        if (!frame) frame = requestAnimationFrame(apply);
      };
      const onEnter = () => (section.dataset.pointer = "on");
      const onLeave = () => {
        section.dataset.pointer = "off";
        section.style.setProperty("--px", "0");
        section.style.setProperty("--py", "0");
      };
      section.addEventListener("pointermove", onMove, { passive: true });
      section.addEventListener("pointerenter", onEnter);
      section.addEventListener("pointerleave", onLeave);
      return () => {
        cancelAnimationFrame(frame);
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerenter", onEnter);
        section.removeEventListener("pointerleave", onLeave);
        onLeave();
      };
    }
    function sync() {
      cleanup();
      cleanup = media.matches ? enable() : () => {};
    }
    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      cleanup();
    };
  }, []);

  const paused = userPaused || !inView || !tabVisible || reduced;

  return (
    <MotionCtx.Provider value={{ paused, reduced, userPaused, toggle: () => setUserPaused((v) => !v) }}>
      <section
        ref={ref}
        aria-labelledby={labelledBy}
        data-paused={paused}
        data-pointer="off"
        className={`relative isolate ${className}`}
      >
        {children}
      </section>
    </MotionCtx.Provider>
  );
}

/** Visible pause/play control for the hero motion (rotating headline and ambient drift). */
export function HeroPauseButton({ className = "" }) {
  const { reduced, userPaused, toggle } = useHeroMotion();
  if (reduced) return null;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={userPaused}
      aria-label={userPaused ? "Play hero animation" : "Pause hero animation"}
      className={`grid size-11 place-items-center rounded-full border-[1.5px] border-line-strong bg-surface text-fg transition-[background-color,color,border-color,transform] duration-200 ease-out-quint hover:border-brand hover:bg-brand hover:text-on-brand active:scale-95 ${className}`}
    >
      {userPaused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
    </button>
  );
}
