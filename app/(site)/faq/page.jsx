import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";
import { generalFaqs } from "@/data/content";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about website design, development, logo design, e-commerce, project timelines, pricing, revisions, maintenance and file ownership at Web Logo Studio.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "FAQ", href: "/faq" }]}
        title="Before you hire us."
        intro="Timelines, revisions, ownership, maintenance and how quotes work. If your question is not here, call (707) 564-6678."
      />
      <FaqSection
        faqs={generalFaqs}
        title="Working with the studio"
        intro="How quotes, revisions and ownership work."
        showAllLink={false}
        withSchema
      />
      <section aria-labelledby="service-faq-title" className="border-t border-line bg-surface py-20 lg:py-24">
        <div className="container-page">
          <h2 id="service-faq-title" className="font-display-wide text-[clamp(2rem,4.2vw,3.2rem)] font-bold leading-none">
            Questions about a specific service?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Each service page has its own FAQ covering the details of that work.
          </p>
          <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}#faq-title`}
                  className="flex items-center justify-between border-b border-line py-3.5 font-medium text-fg transition-colors hover:text-cyan"
                >
                  {s.navTitle ?? s.title}
                  <span className="caption">{s.faqs.length} questions</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
