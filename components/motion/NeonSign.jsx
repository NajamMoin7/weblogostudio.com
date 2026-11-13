/**
 * Contact banner: a neon shop sign, "ORDERS / OPEN / 24/7", hung on two wires. Each tube is a
 * single stroke drawn three times (wide blurred glow, coloured tube, hot core) over the unlit
 * glass. Tubes buzz on one after another on load, and the N stutters now and then.
 * Pure SVG + CSS (.neon-* in globals.css); reduced motion shows the sign simply lit.
 */

const OPEN = [
  "M82 100 C104 100 117 122 117 150 C117 178 104 200 82 200 C60 200 47 178 47 150 C47 122 60 100 82 100 Z",
  "M139 200 V100 H180 C198 100 209 112 209 128 C209 144 198 156 180 156 H139",
  "M301 100 H231 V200 H301 M231 150 H288",
  "M323 200 V100 L393 200 V100",
];

const HOURS = [
  "M125 242 C125 232 133 228 143 228 C155 228 163 234 163 244 C163 256 151 264 125 284 H163",
  "M207 284 V228 L179 266 H217",
  "M233 284 L261 228",
  "M277 228 H315 L291 284",
];

function Tube({ d, n, width, color, core, buzz = false }) {
  const lit = (
    <g className="neon-lit" style={{ "--n": n }}>
      <path d={d} stroke={color} strokeWidth={width * 2.2} filter="url(#neon-blur)" opacity="0.85" />
      <path d={d} stroke={color} strokeWidth={width} />
      <path d={d} stroke={core} strokeWidth={width * 0.4} />
    </g>
  );
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke="rgb(255 255 255 / 0.09)" strokeWidth={width} />
      {buzz ? <g className="neon-buzz">{lit}</g> : lit}
    </g>
  );
}

export default function NeonSign({ className = "" }) {
  return (
    <svg
      viewBox="0 0 440 330"
      role="img"
      aria-label="Neon sign: Orders open 24/7"
      className={`block h-auto w-full overflow-visible ${className}`}
    >
      <defs>
        <filter id="neon-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <radialGradient id="neon-wash-fill">
          <stop offset="0" stopColor="#ff7a2e" stopOpacity="0.32" />
          <stop offset="1" stopColor="#ff7a2e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* wires and board */}
      <path d="M110 0 V54 M330 0 V54" stroke="#6b736e" strokeWidth="1.5" />
      <rect x="20" y="50" width="400" height="270" rx="22" fill="#0c100e" stroke="rgb(255 255 255 / 0.09)" />
      <rect x="20" y="50" width="400" height="270" rx="22" fill="url(#neon-wash-fill)" className="neon-wash" />
      {[
        [42, 72],
        [398, 72],
        [42, 298],
        [398, 298],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="#262b28" stroke="#3d4440" />
      ))}

      {/* ORDERS: thin mint lettering */}
      <g className="neon-lit" style={{ "--n": 0 }}>
        <text
          x="220"
          y="86"
          textAnchor="middle"
          fontSize="19"
          fontWeight="700"
          letterSpacing="9"
          fill="none"
          stroke="#9fe0c4"
          strokeWidth="1.6"
          filter="url(#neon-blur)"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          ORDERS
        </text>
        <text
          x="220"
          y="86"
          textAnchor="middle"
          fontSize="19"
          fontWeight="700"
          letterSpacing="9"
          fill="none"
          stroke="#d9fff0"
          strokeWidth="1.2"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          ORDERS
        </text>
      </g>

      {OPEN.map((d, i) => (
        <Tube key={d} d={d} n={i + 1} width={9} color="#ff6a1a" core="#ffe3cc" buzz={i === 3} />
      ))}
      {HOURS.map((d, i) => (
        <Tube key={d} d={d} n={i + 5} width={6.5} color="#5fd1a4" core="#e0fff2" />
      ))}
    </svg>
  );
}
