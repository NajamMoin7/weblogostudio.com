import SectionHeading from "@/components/ui/SectionHeading";
import { expectations } from "@/data/content";

/** What every client gets, set as a two-column definition list rather than a card grid. */
export default function Expectations() {
  return (
    <section aria-labelledby="expect-title" className="py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="expect-title"
              title="What you can hold us to."
              intro="Commitments on every project, from a one-page site to a full identity."
            />
          </div>
        </div>
        <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {expectations.map((e) => (
            <div key={e.title} className="reveal border-t border-line-strong py-6">
              <dt className="font-display-wide text-[1.35rem] font-bold leading-snug text-fg">{e.title}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{e.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
