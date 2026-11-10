/**
 * Banner construction drawing: the logo's four slanted shards (two green strokes, the orange
 * cut and the charcoal base) assembled on a construction sheet with cap line, baseline, slant
 * guide, compass ring and a ruler. Pure SVG + CSS (see .motif-* in globals.css), no JavaScript,
 * aria-hidden. `seed` changes where the shards fly in from, so each page lands differently.
 */

const ENTRIES = [
  // [fx, fy, fr] per shard
  [
    [-140, -40, -14],
    [-60, 120, 10],
    [140, -90, 16],
    [160, 80, -12],
  ],
  [
    [0, -180, -20],
    [60, -150, 14],
    [180, 0, 24],
    [40, 160, -10],
  ],
  [
    [-180, 60, 12],
    [-120, -120, -16],
    [80, 160, -20],
    [200, -40, 14],
  ],
  [
    [120, 140, 18],
    [-140, 90, -10],
    [0, -170, 12],
    [-60, 170, 20],
  ],
];

const SHARDS = [
  {
    points: "120,90 190,90 334,390 264,390",
    fill: "#fbfbf8",
    drift: ["-4px", "-9px"],
  },
  {
    points: "230,90 300,90 444,390 374,390",
    fill: "#8fbfab",
    drift: ["5px", "-6px"],
  },
  {
    points: "470,90 550,90 466,250 386,250",
    fill: "#f26a1b",
    drift: ["7px", "-10px"],
  },
  {
    points: "480,284 526,360 616,360 588,390 452,390",
    fill: "#141815",
    drift: ["-6px", "-5px"],
  },
];

/** On the paper badge the shards take the logo's own colours. */
const COMPACT_FILLS = ["#0b4f3c", "#12684f", "#f26a1b", "#141815"];

const ticks = Array.from({ length: 30 }, (_, i) => {
  const x = 40 + i * 20;
  const h = i % 5 === 0 ? 14 : 7;
  return `M${x} 432v${h}`;
}).join("");

export default function HeroMotif({
  seed = 0,
  className = "",
  compact = false,
}) {
  const entry = ENTRIES[Math.abs(seed) % ENTRIES.length];
  const guide = {
    stroke: compact ? "rgb(20 24 21 / 0.2)" : "rgb(251 251 248 / 0.3)",
    strokeWidth: 1,
    fill: "none",
  };

  return (
    <svg
      viewBox={compact ? "50 40 620 400" : "0 0 640 470"}
      aria-hidden="true"
      focusable="false"
      className={`block h-auto ${compact ? "overflow-hidden rounded-[0.6rem] shadow-lift" : "w-full overflow-visible"} ${className}`}
    >
      {/* Compact: a badge tile for a banner card's corner (shards, ring and two guides only). */}
      {compact && (
        <rect x="50" y="40" width="620" height="400" rx="40" fill="#fbfbf8" />
      )}

      {/* Construction guides draw in first. */}
      <path
        pathLength="1"
        className="motif-guide"
        style={{ "--d": 0 }}
        d="M30 90H630"
        {...guide}
      />
      <path
        pathLength="1"
        className="motif-guide"
        style={{ "--d": 1 }}
        d="M10 390H630"
        {...guide}
      />
      {!compact && (
        <>
          <path
            pathLength="1"
            className="motif-guide"
            style={{ "--d": 2 }}
            d="M30 250H630"
            {...guide}
            opacity="0.6"
          />
          <path
            pathLength="1"
            className="motif-guide"
            style={{ "--d": 3 }}
            d="M120 30V450"
            {...guide}
          />
          <path
            pathLength="1"
            className="motif-guide"
            style={{ "--d": 4 }}
            d="M96 40L312 490"
            {...guide}
          />
          <path
            pathLength="1"
            className="motif-guide"
            style={{ "--d": 5 }}
            d="M574 40L376 420"
            {...guide}
          />
          <path
            pathLength="1"
            className="motif-guide"
            style={{ "--d": 6 }}
            d={`M40 432H620${ticks}`}
            {...guide}
          />
          <path
            pathLength="1"
            className="motif-guide"
            style={{ "--d": 7 }}
            d="M264 390 A 58 58 0 0 0 238 342"
            stroke="#f26a1b"
            strokeWidth="1.5"
            fill="none"
          />
        </>
      )}

      {/* Compass ring: turns slowly around the join of the W and the L. */}
      <g className="motif-ring" style={{ "--ox": "444px", "--oy": "250px" }}>
        <circle
          cx="444"
          cy="250"
          r="168"
          fill="none"
          stroke={compact ? "rgb(20 24 21 / 0.22)" : "rgb(251 251 248 / 0.22)"}
          strokeDasharray="2 9"
        />
        <circle cx="444" cy="82" r="4" fill="#f26a1b" />
      </g>

      {/* The four shards land in sequence, then drift. */}
      {SHARDS.map((s, i) => (
        <polygon
          key={s.points}
          points={s.points}
          fill={compact ? COMPACT_FILLS[i] : s.fill}
          className="motif-shard"
          style={{
            "--d": i,
            "--fx": `${entry[i][0]}px`,
            "--fy": `${entry[i][1]}px`,
            "--fr": `${entry[i][2]}deg`,
            "--dx": s.drift[0],
            "--dy": s.drift[1],
          }}
        />
      ))}

      {!compact && (
        <>
          {/* Measuring line sweeping from cap line to baseline. */}
          <g className="motif-scan" style={{ "--scan": "300px" }}>
            <path d="M20 90H630" stroke="#f26a1b" strokeWidth="1.5" />
            <circle cx="20" cy="90" r="3.5" fill="#f26a1b" />
          </g>

          {/* Annotations, in the specimen's caption voice. */}
          <g
            fill="rgb(251 251 248 / 0.72)"
            fontSize="13"
            letterSpacing="0.04em"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            <text x="30" y="80" className="motif-label" style={{ "--d": 0 }}>
              CAP LINE
            </text>
            <text x="10" y="410" className="motif-label" style={{ "--d": 1 }}>
              BASELINE
            </text>
            <text
              x="208"
              y="356"
              className="motif-label"
              style={{ "--d": 2 }}
              fill="#ffa36b"
            >
              64°
            </text>
            <text x="40" y="466" className="motif-label" style={{ "--d": 3 }}>
              0
            </text>
            <text x="596" y="466" className="motif-label" style={{ "--d": 4 }}>
              580
            </text>
          </g>
        </>
      )}
    </svg>
  );
}
