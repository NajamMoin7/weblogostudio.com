import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { getServicesByGroup, serviceGroups } from "@/data/services";

/**
 * Services as a specimen index: each group is a column of condensed service names with one
 * line on what is delivered. Rows are single links; hover traces the row in marking ink.
 */
export default function ServiceIndex() {
  return (
    <section aria-labelledby="services-title" className="theme-mint py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            title="Fourteen services, one standard."
            intro="Hire us for one piece or the whole set. The logo, the site and the social templates come out of the same studio, so nothing has to be matched up later."
          />
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 self-start font-semibold underline decoration-line-strong decoration-2 underline-offset-[7px] hover:decoration-orange lg:self-auto"
          >
            All services <ArrowRight aria-hidden="true" className="arrow-nudge size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-12 lg:grid-cols-3">
          {serviceGroups.map((g) => (
            <div key={g.id} className="reveal">
              <h3 className="eyebrow border-b-2 border-fg pb-3 text-fg">{g.label}</h3>
              <ul>
                {getServicesByGroup(g.id).map((s) => (
                  <li key={s.slug} className="border-b border-line">
                    <Link href={`/services/${s.slug}`} className="group relative flex items-start justify-between gap-4 py-4">
                      <span>
                        <span className="font-display-wide block text-[1.45rem] font-bold leading-tight transition-colors group-hover:text-brand">
                          {s.navTitle ?? s.title}
                        </span>
                        <span className="mt-1 block text-sm leading-snug text-muted">{s.summary}</span>
                      </span>
                      <ArrowRight aria-hidden="true" className="arrow-nudge mt-1.5 size-4 shrink-0 text-subtle group-hover:text-brand" />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-px h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out-quint group-hover:scale-x-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
