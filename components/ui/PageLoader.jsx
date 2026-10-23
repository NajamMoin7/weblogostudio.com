import Image from "next/image";
import mark from "@/public/brand/logo-mark.png";
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
        {/* The logo mark, centred in the ring */}
        <Image src={mark} alt="" sizes="28px" className="relative h-auto w-7" />
      </span>
      <p role="status" className="eyebrow text-subtle">
        {label}
      </p>
    </div>
  );
}
