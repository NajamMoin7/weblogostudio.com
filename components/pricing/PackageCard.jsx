import Link from "next/link";
import { Check, Clock, RefreshCcw, Info } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

/** One pricing package. Never renders an unapproved price: `price: null` shows "Quote on request". */
export default function PackageCard({ pkg, serviceSlug }) {
  const highlighted = Boolean(pkg.highlighted);
  return (
    <article
      className={`group relative flex h-full flex-col rounded-2xl border p-7 shadow-card transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out-quint hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift focus-within:border-brand/30 sm:p-8 ${
        highlighted ? "border-brand/40 bg-surface ring-1 ring-brand/15" : "border-line bg-surface"
      }`}
    >
      {highlighted && (
        <>
          <span aria-hidden="true" className="brand-gradient absolute inset-x-8 top-0 h-px" />
          <span className="absolute right-6 top-6 rounded-md bg-forest px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cream">
            Recommended
          </span>
        </>
      )}
      <h3 className="font-display-wide text-2xl font-semibold">{pkg.name}</h3>
      <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-muted">{pkg.idealFor}</p>

      <div className="mt-6 border-y border-line py-5">
        <p className="text-2xl font-semibold text-fg">{pkg.price ?? "Quote on request"}</p>
        <dl className="mt-3 grid gap-1.5 text-sm text-muted">
          <div className="flex items-center gap-2">
            <Clock aria-hidden="true" className="size-3.5" />
            <dt className="sr-only">Timeline</dt>
            <dd>{pkg.timeline ?? "Timeline confirmed in your proposal"}</dd>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCcw aria-hidden="true" className="size-3.5" />
            <dt className="sr-only">Revisions</dt>
            <dd>{pkg.revisions}</dd>
          </div>
        </dl>
      </div>

      <h4 className="eyebrow mt-6 text-subtle">Deliverables</h4>
      <ul className="mt-4 flex-1 space-y-3">
        {pkg.deliverables.map((d) => (
          <li key={d} className="flex gap-3 text-[0.95rem] text-fg">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand transition-transform duration-300 ease-out-quint group-hover:scale-110" />
            {d}
          </li>
        ))}
      </ul>

      <p className="mt-6 flex gap-2.5 rounded-md bg-surface-2/70 p-3.5 text-xs leading-relaxed text-muted">
        <Info aria-hidden="true" className="mt-px size-3.5 shrink-0" />
        <span>
          <span className="sr-only">Scope and limitations: </span>
          {pkg.scope}
        </span>
      </p>

      <Link
        href={`/get-a-quote?service=${serviceSlug}`}
        className={buttonClasses({ variant: highlighted ? "primary" : "secondary", className: "mt-7 w-full" })}
      >
        Request a Quote
        <span className="sr-only"> for the {pkg.name} package</span>
      </Link>
    </article>
  );
}
