"use client";

import { useEffect, useState } from "react";
import { useHeroMotion } from "./HeroMotion";

/**
 * Flow-inspired headline.
 * - Static lines: each word rises out of a mask and sharpens from a blur, staggered (CSS only).
 * - Rotating phrase: characters swap with a soft vertical blur. All phrases share one grid cell,
 *   so the reserved width and height never change and nothing below the headline moves.
 * - Pointer highlight: an aria-hidden copy of the static lines in the brand gradient is revealed
 *   under the cursor via a CSS mask (set by HeroMotion). The real text is never moved, so
 *   selection and readability are unaffected.
 * - Screen readers get one plain sentence. Rotation stops for reduced motion, when paused,
 *   and when the hero is off screen.
 */

const STOPS = [
  [0, 229, 252],
  [0, 119, 254],
  [166, 52, 252],
];

function gradientAt(t) {
  const seg = t < 0.5 ? 0 : 1;
  const local = seg === 0 ? t / 0.5 : (t - 0.5) / 0.5;
  const a = STOPS[seg];
  const b = STOPS[seg + 1];
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * local));
  // Lift lightness a little so text stays bright on black.
  return `rgb(${c.map((v) => Math.min(255, v + 34)).join(" ")})`;
}

function Words({ lines, animate }) {
  let w = 0;
  return lines.map((line, li) => (
    <span key={li} className="block">
      {line.split(" ").map((word, wi, arr) => {
        const index = w++;
        return (
          <span key={wi}>
            <span className="word-mask">
              <span className="word" style={animate ? { "--w": index } : undefined}>
                {word}
              </span>
            </span>
            {wi < arr.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  ));
}

function Rotator({ phrases, interval = 3000, startDelay = 1600 }) {
  const { paused, reduced } = useHeroMotion();
  const [{ index, prev }, setRotation] = useState({ index: 0, prev: null });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (paused || reduced || !started) return;
    const t = setInterval(() => {
      setRotation((r) => ({ index: (r.index + 1) % phrases.length, prev: r.index }));
    }, interval);
    return () => clearInterval(t);
  }, [paused, reduced, started, interval, phrases.length]);

  return (
    <span className="rotator" aria-hidden="true">
      {phrases.map((phrase, pi) => {
        let state = "idle";
        if (pi === index) state = reduced || prev === null ? "static" : "active";
        else if (pi === prev) state = "exit";
        const total = Array.from(phrase.replace(/ /g, "")).length;
        let c = 0;
        // Characters are grouped into nowrap words so long phrases wrap between words on small screens.
        return (
          <span key={phrase} className="phrase" data-state={state}>
            {phrase.split(" ").map((word, wi, words) => (
              <span key={wi}>
                <span className="rw">
                  {Array.from(word).map((ch) => {
                    const ci = c++;
                    return (
                      <span
                        key={ci}
                        className="ch"
                        style={{ "--c": ci, color: gradientAt(total > 1 ? ci / (total - 1) : 0) }}
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>
                {wi < words.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}

export default function AnimatedHeadline({ id, lines, phrases, srText, className = "" }) {
  return (
    <h1 id={id} className={className}>
      <span className="sr-only">{srText}</span>
      <span aria-hidden="true" className="relative block">
        <span data-highlight-root className="relative block">
          <Words lines={lines} animate />
          {/* Gradient highlight layer, revealed under the pointer only. */}
          <span className="headline-highlight text-gradient no-reveal absolute inset-0 block">
            <Words lines={lines} animate={false} />
          </span>
        </span>
        <span className="block">
          <span className="word-mask">
            <span className="word" style={{ "--w": lines.join(" ").split(" ").length }}>
              <Rotator phrases={phrases} />
            </span>
          </span>
        </span>
      </span>
    </h1>
  );
}
