import Spinner from "./Spinner";

/**
 * Route-level loading UI (used by app/loading.jsx). It fades in only after ~300ms,
 * so fast or prefetched navigations never flash a loader.
 */
export default function PageLoader({ label = "Loading page" }) {
  return (
    <div className="appear-late container-page flex min-h-[60vh] flex-col items-center justify-center gap-5 py-24">
      <span className="relative grid size-16 place-items-center">
        <Spinner size={64} className="absolute inset-0 text-fg" />
        {/* A simplified W mark from the logo, centred in the ring */}
        <svg viewBox="0 0 40 28" className="relative w-6" aria-hidden="true">
          <defs>
            <linearGradient id="loader-w" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00e5fc" />
              <stop offset="55%" stopColor="#0077fe" />
              <stop offset="100%" stopColor="#a634fc" />
            </linearGradient>
          </defs>
          <path d="M0 0h8l6 18 6-18 6 18 6-18h8L30 28h-8l-2-6-2 6h-8Z" fill="url(#loader-w)" />
        </svg>
      </span>
      <p role="status" className="eyebrow text-subtle">
        {label}
      </p>
    </div>
  );
}
