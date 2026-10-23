/**
 * Branded spinner: a track ring plus an arc in the logo orange.
 * Decorative by default; pass `label` to expose it to assistive technology.
 */
export default function Spinner({ size = 16, label, className = "" }) {
  const id = `sg-${size}`;
  return (
    <span
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-grid place-items-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} className="brand-spinner">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e0743f" />
            <stop offset="50%" stopColor="#c66a43" />
            <stop offset="100%" stopColor="#b4532a" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2.5" />
        <path d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5" fill="none" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}
