/**
 * Original geometric marks for the concept projects.
 * Each draws in a 100x100 box and uses `color` for the main form.
 */
export default function Mark({ type, color = "currentColor", bg = "transparent", className = "", title }) {
  const stroke = { fill: "none", stroke: color, strokeLinecap: "square", strokeLinejoin: "miter" };
  let body;
  switch (type) {
    case "fold":
      body = (
        <>
          <path d="M24 84V20l52 60V16" {...stroke} strokeWidth="10" />
          <path d="M24 20 50 50" stroke={bg} strokeWidth="2.5" />
        </>
      );
      break;
    case "arc":
      body = (
        <>
          <path d="M20 70a30 30 0 0 1 60 0" {...stroke} strokeWidth="9" strokeLinecap="round" />
          <circle cx="50" cy="32" r="8" fill={color} />
        </>
      );
      break;
    case "chevron":
      body = (
        <>
          <path d="M16 82 50 20l34 62" {...stroke} strokeWidth="10" />
          <path d="M36 62h28" {...stroke} strokeWidth="9" />
        </>
      );
      break;
    case "leaf":
      body = (
        <>
          <path d="M50 86C20 66 22 32 50 14c28 18 30 52 0 72Z" fill={color} />
          <path d="M50 30v52" stroke={bg} strokeWidth="4" />
          <path d="M50 52 36 42M50 64l14-10" stroke={bg} strokeWidth="3.5" />
        </>
      );
      break;
    case "bolt":
      body = (
        <>
          <path d="M30 16h16L34 84H18Z" fill={color} />
          <path d="M42 54 82 16M46 52l30 32" {...stroke} strokeWidth="12" />
        </>
      );
      break;
    case "orbit":
      body = (
        <>
          <circle cx="50" cy="50" r="15" fill={color} />
          <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(-24 50 50)" {...stroke} strokeWidth="5" />
        </>
      );
      break;
    case "frame":
      body = (
        <>
          <path d="M26 86V16h48v70" {...stroke} strokeWidth="7" />
          <path d="M26 50h48" {...stroke} strokeWidth="7" />
        </>
      );
      break;
    case "sun":
      body = (
        <>
          <circle cx="50" cy="50" r="15" fill={color} />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            const x1 = 50 + Math.cos(a) * 24;
            const y1 = 50 + Math.sin(a) * 24;
            const x2 = 50 + Math.cos(a) * 38;
            const y2 = 50 + Math.sin(a) * 38;
            return (
              <line
                key={i}
                x1={x1.toFixed(2)}
                y1={y1.toFixed(2)}
                x2={x2.toFixed(2)}
                y2={y2.toFixed(2)}
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
              />
            );
          })}
        </>
      );
      break;
    default:
      body = <circle cx="50" cy="50" r="30" fill={color} />;
  }
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {body}
    </svg>
  );
}
