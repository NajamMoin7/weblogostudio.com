"use client";

import { useEffect, useState } from "react";

const SHARDS = [
  { points: "120,90 190,90 334,390 264,390", fill: "#0b4f3c" },
  { points: "230,90 300,90 444,390 374,390", fill: "#12684f" },
  { points: "470,90 550,90 466,250 386,250", fill: "#f26a1b" },
  { points: "480,284 526,360 616,360 588,390 452,390", fill: "#141815" },
];

/**
 * Thank-you page: the brief slides into an envelope, the flap folds shut and a postmark
 * ("RECEIVED", today's date, Hicksville NY) is stamped on. Plays once on load; the envelope
 * then floats gently. CSS in globals.css (.post-*); reduced motion shows the sealed envelope.
 */
export default function Postmark({ className = "" }) {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase());
  }, []);

  const sans = { fontFamily: "var(--font-sans)" };

  return (
    <svg viewBox="0 50 480 345" aria-hidden="true" focusable="false" className={`post block h-auto w-full overflow-visible ${className}`}>
      <defs>
        <path id="post-top" d="M330 262 A46 46 0 0 1 422 262" />
        <path id="post-bottom" d="M326 262 A50 50 0 0 0 426 262" />
      </defs>

      <g className="post-float">
        {/* back of the envelope */}
        <rect x="40" y="170" width="400" height="210" rx="12" fill="#d9d2c1" />
        {/* open flap, behind the letter */}
        <path className="post-flap-open" d="M40 172 L240 58 L440 172 Z" fill="#cfc7b4" />

        {/* the brief */}
        <g className="post-letter">
          <rect x="78" y="90" width="324" height="190" rx="6" fill="#fbfbf8" stroke="rgb(20 24 21 / 0.12)" />
          <g transform="translate(98 108) scale(0.09)">
            {SHARDS.map((s) => (
              <polygon key={s.points} points={s.points} fill={s.fill} />
            ))}
          </g>
          <text x="160" y="132" fontSize="15" fontWeight="700" fill="#141815" style={sans}>
            Project brief
          </text>
          <g stroke="rgb(20 24 21 / 0.18)" strokeWidth="5" strokeLinecap="round">
            <path d="M100 168H380 M100 190H350 M100 212H372 M100 234H300" />
          </g>
        </g>

        {/* front pocket of the envelope */}
        <path d="M40 172 L240 292 L440 172 V368 a12 12 0 0 1 -12 12 H52 a12 12 0 0 1 -12 -12 Z" fill="#ebe5d6" />
        <path d="M40 368 L196 268 M440 368 L284 268" stroke="rgb(20 24 21 / 0.08)" strokeWidth="2" />
        {/* closed flap, in front */}
        <path className="post-flap-shut" d="M38 171 L240 302 L442 171 Z" fill="#e2dbca" stroke="rgb(20 24 21 / 0.06)" />

        {/* postmark */}
        <g className="post-stamp" fill="none" stroke="#c4501a" strokeWidth="3">
          <circle cx="376" cy="262" r="58" />
          <circle cx="376" cy="262" r="50" strokeWidth="1.5" />
          <path d="M200 236 q14 -10 28 0 t28 0 t28 0 t28 0 M200 254 q14 -10 28 0 t28 0 t28 0 t28 0 M200 272 q14 -10 28 0 t28 0 t28 0 t28 0 M200 290 q14 -10 28 0 t28 0 t28 0 t28 0" strokeWidth="2.5" />
          <g fill="#c4501a" stroke="none" fontWeight="800" style={sans}>
            <text fontSize="13" letterSpacing="3">
              <textPath href="#post-top" startOffset="50%" textAnchor="middle">
                RECEIVED
              </textPath>
            </text>
            <text fontSize="10" letterSpacing="2">
              <textPath href="#post-bottom" startOffset="50%" textAnchor="middle">
                HICKSVILLE NY
              </textPath>
            </text>
            <text x="376" y="267" fontSize="13" textAnchor="middle">
              {date}
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
}
