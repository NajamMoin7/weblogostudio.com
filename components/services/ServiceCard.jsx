import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceHref } from "@/data/services";

/**
 * Service entry, set as a ruled specimen row rather than an icon card: condensed name,
 * one-line summary, arrow. The whole entry is one link; hover draws the marking-ink rule.
 */
export default function ServiceCard({ service, title, summary, headingLevel = "h3" }) {
  const Heading = headingLevel;
  return (
    <Link href={serviceHref(service.slug)} className="group relative flex h-full flex-col border-t-2 border-fg pb-6 pt-5">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -top-[2px] h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out-quint group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
      <Heading className="font-display-wide text-[1.6rem] font-bold leading-tight text-fg transition-colors group-hover:text-brand">
        {title ?? service.title}
      </Heading>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{summary ?? service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-fg">
        What is included
        <ArrowRight aria-hidden="true" className="arrow-nudge size-4" />
      </span>
    </Link>
  );
}
