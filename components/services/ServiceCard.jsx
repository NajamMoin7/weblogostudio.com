import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { serviceHref } from "@/data/services";

/**
 * Service card. The whole card is one link, so keyboard users get a single tab stop.
 * Hover: border lifts, a gradient rule draws in from the left, and the arrow nudges.
 */
export default function ServiceCard({ service, index, title, summary, headingLevel = "h3", image }) {
  const Heading = headingLevel;
  return (
    <Link
      href={serviceHref(service.slug)}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 shadow-card transition-[border-color,background-color,transform,box-shadow] duration-300 ease-out-quint hover:-translate-y-1 hover:border-brand/25 hover:shadow-lift active:translate-y-0 active:scale-[0.99]"
    >
      {image && (
        // Image reveal: the service photo fades in faintly behind the text on hover/focus.
        <span aria-hidden="true" className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 ease-out-quint group-hover:opacity-100 group-focus-visible:opacity-100">
          <Image src={image.src} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="scale-110 object-cover opacity-[0.12] transition-transform duration-700 ease-out-quint group-hover:scale-100" />
          <span className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-surface)_40%,color-mix(in_srgb,var(--color-surface)_70%,transparent))]" />
        </span>
      )}
      <span
        aria-hidden="true"
        className="brand-gradient absolute inset-x-7 top-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-out-quint group-hover:scale-x-100"
      />
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-full bg-forest text-cream transition-[background-color,transform] duration-300 ease-out-quint group-hover:-translate-y-0.5 group-hover:-rotate-6 group-hover:bg-orange-strong">
          <ServiceIcon name={service.icon} />
        </span>
        {typeof index === "number" && (
          <span className="text-xs font-semibold tabular-nums text-subtle">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>
      <Heading className="font-display-wide mt-7 text-[1.35rem] font-semibold leading-snug text-fg">{title ?? service.title}</Heading>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{summary ?? service.summary}</p>
      <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan">
        Explore service
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-[transform,opacity] duration-300 ease-out-quint [@media(hover:hover)]:-translate-x-1.5 [@media(hover:hover)]:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        />
      </span>
    </Link>
  );
}
