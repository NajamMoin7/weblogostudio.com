/**
 * Spinner: a track ring plus an arc in the marking ink.
 * Decorative by default; pass `label` to expose it to assistive technology.
 */
export default function Spinner({ size = 16, label, className = "" }) {
  return (
    <span
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-grid place-items-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} className="brand-spinner">
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" />
        <path d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5" fill="none" stroke="#f26a1b" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}
