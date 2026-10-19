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
        eyebrow="FAQ"
        title="Frequently asked questions."
        intro="Everything you might want to know before starting a project with us. If your question is not here, we are happy to answer it directly."
      />
      <FaqSection
        faqs={generalFaqs}
        eyebrow="General"
        title="Working with Web Logo Studio"
        intro="Process, pricing, revisions and ownership."
        showAllLink={false}
        withSchema
      />
      <section aria-labelledby="service-faq-title" className="border-t border-line bg-surface py-20 lg:py-24">
        <div className="container-page">
          <h2 id="service-faq-title" className="font-display-wide text-[clamp(1.85rem,4vw,2.75rem)] font-semibold">
            Questions about a specific service?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Each service page has its own FAQ covering the details of that work.
          </p>
          <ul className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}#faq-title`}
                  className="flex items-center justify-between rounded-md border border-line px-4 py-3.5 text-fg transition-colors hover:border-line-strong hover:bg-surface-2"
                >
                  {s.navTitle ?? s.title}
                  <span className="font-mono text-xs text-subtle">{s.faqs.length} Q</span>
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
