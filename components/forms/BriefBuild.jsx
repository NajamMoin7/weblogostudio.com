"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

/** The logo's four shards (same geometry as HeroMotif), one per part of the brief. */
const SHARDS = [
  { points: "120,90 190,90 334,390 264,390", fill: "#0b4f3c", from: [-150, -60, -16] },
  { points: "230,90 300,90 444,390 374,390", fill: "#12684f", from: [-60, 170, 12] },
  { points: "470,90 550,90 466,250 386,250", fill: "#f26a1b", from: [170, -110, 22] },
  { points: "480,284 526,360 616,360 588,390 452,390", fill: "#141815", from: [160, 120, -14] },
];

const field = (form, name) => form.elements.namedItem(name)?.value?.trim() ?? "";

const PARTS = [
  { label: "About you", done: (f) => field(f, "name") !== "" && /\S+@\S+\.\S+/.test(field(f, "email")) },
  { label: "Services", done: (f) => f.querySelector('input[name="services"]:checked') !== null },
  { label: "Budget and timing", done: (f) => field(f, "budget") !== "" && field(f, "timeline") !== "" },
  { label: "Your project", done: (f) => field(f, "description").length >= 20 },
];

/**
 * Quote page sidebar: the studio mark assembles while the visitor fills in the brief. Each of
 * the four parts of the form brings one shard into place; with all four the ring closes.
 * Reads the form's own DOM (#quote-form) so the form component stays untouched.
 */
export default function BriefBuild({ formId = "quote-form" }) {
  const [done, setDone] = useState([false, false, false, false]);

  useEffect(() => {
    // The form streams in behind a Suspense boundary, so listen at the document and look the
    // form up on every check; a MutationObserver catches the moment it first appears.
    let frame = 0;
    const check = () => {
      frame = 0;
      const form = document.getElementById(formId);
      if (!form) return;
      const next = PARTS.map((p) => p.done(form));
      setDone((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const events = ["input", "change", "click"];
    events.forEach((t) => document.addEventListener(t, schedule));
    let mo = null;
    if (document.getElementById(formId)) schedule();
    else {
      mo = new MutationObserver(() => {
        if (document.getElementById(formId)) {
          mo.disconnect();
          schedule();
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }
    return () => {
      events.forEach((t) => document.removeEventListener(t, schedule));
      mo?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [formId]);

  const count = done.filter(Boolean).length;
  const complete = count === PARTS.length;

  return (
    <div className="brief-build rounded-xl border border-line-strong bg-surface p-5" data-complete={complete}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-display-wide text-[1.35rem] font-bold leading-none">
          {complete ? "Ready to send." : "Your brief, taking shape"}
        </p>
        <p className="text-sm font-semibold tabular-nums text-subtle">{count} of 4</p>
      </div>

      <svg viewBox="50 40 620 400" aria-hidden="true" focusable="false" className="mt-4 block h-auto w-full rounded-lg">
        <rect x="50" y="40" width="620" height="400" rx="28" fill="#f3f3ee" />
        <g stroke="rgb(20 24 21 / 0.14)" strokeWidth="1.2" fill="none">
          <path d="M60 90H660 M60 390H660 M60 250H660" />
          <path d="M120 60 L334 420 M230 60 L444 420" strokeDasharray="4 6" />
        </g>
        <circle className="brief-ring" cx="368" cy="240" r="186" pathLength="1" fill="none" stroke="#f26a1b" strokeWidth="2.5" />
        {SHARDS.map((s, i) => (
          <g key={s.points}>
            <polygon
              points={s.points}
              fill="none"
              stroke="rgb(20 24 21 / 0.28)"
              strokeWidth="2"
              strokeDasharray="7 7"
              className="transition-opacity duration-300"
              opacity={done[i] ? 0 : 1}
            />
            <polygon
              points={s.points}
              fill={s.fill}
              className="brief-shard"
              data-in={done[i]}
              style={{ "--fx": `${s.from[0]}px`, "--fy": `${s.from[1]}px`, "--fr": `${s.from[2]}deg` }}
            />
          </g>
        ))}
      </svg>

      <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        {PARTS.map((p, i) => (
          <li key={p.label} className={`flex items-center gap-2 transition-colors ${done[i] ? "text-fg" : "text-subtle"}`}>
            <span
              aria-hidden="true"
              className={`grid size-5 shrink-0 place-items-center rounded-full border transition-colors ${
                done[i] ? "border-transparent bg-brand text-on-brand" : "border-line-strong"
              }`}
            >
              {done[i] && <Check className="size-3" strokeWidth={3} />}
            </span>
            {p.label}
          </li>
        ))}
      </ul>
      <p className="sr-only" aria-live="polite">
        {count} of 4 parts of the brief filled in.
      </p>
    </div>
  );
}
