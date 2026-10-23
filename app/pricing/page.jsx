import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";
import Button from "@/components/ui/Button";
import PackageCard from "@/components/pricing/PackageCard";
import { pricingCategories, pricingNotes } from "@/data/pricing";
import { generalFaqs } from "@/data/content";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Packages and Pricing",
  description:
    "Compare Starter, Professional and Premium packages for website design, development, e-commerce, logo design, brand identity and graphic design. Request a tailored quote.",
  path: "/pricing",
});

const pricingFaqTopics = ["Pricing", "Revisions", "Timelines", "Ownership"];

export default function PricingPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Pricing", href: "/pricing" }]}
        eyebrow="Packages"
        title="Clear packages. Honest quotes."
        intro="Every business is different, so we quote each project individually. These packages show what is typically included at each level, so you can see where your project fits before we talk numbers."
      />

      <nav
        aria-label="Pricing categories"
        className="sticky top-16 z-30 border-b border-line bg-ink/90 backdrop-blur-md lg:top-[4.5rem]"
      >
        <ul className="container-page flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
          {pricingCategories.map((c) => (
            <li key={c.id} className="shrink-0">
              <Link
                href={`#${c.id}`}
                className="block rounded-md px-3.5 py-2 text-sm text-muted transition-colors hover:bg-fg/5 hover:text-fg"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {pricingCategories.map((cat, i) => (
        <section
          key={cat.id}
          id={cat.id}
          aria-labelledby={`${cat.id}-title`}
          className={`scroll-mt-36 py-16 lg:py-24 ${i % 2 ? "border-y border-line bg-surface/50" : ""}`}
        >
          <div className="container-page">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-4 text-subtle">
                  {String(i + 1).padStart(2, "0")} / {String(pricingCategories.length).padStart(2, "0")}
                </p>
                <h2
                  id={`${cat.id}-title`}
                  className="font-display-wide text-[clamp(1.85rem,4vw,2.75rem)] font-semibold leading-[1.05]"
                >
                  {cat.label}
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{cat.intro}</p>
              </div>
              <Link
                href={`/services/${cat.serviceSlug}`}
                className="shrink-0 text-sm font-medium text-fg underline decoration-line-strong underline-offset-[6px] hover:decoration-cyan"
              >
                About this service
              </Link>
            </div>
            <ul className="mt-12 grid gap-4 lg:grid-cols-3">
              {cat.packages.map((pkg) => (
                <li key={pkg.name} className="reveal-card">
                  <PackageCard pkg={pkg} serviceSlug={cat.serviceSlug} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section aria-labelledby="custom-title" className="py-20 lg:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="custom-title" className="font-display-wide text-[clamp(1.85rem,4vw,2.75rem)] font-semibold leading-[1.05]">
              Need something custom?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Combining a new identity with a website, migrating a large store, or planning something unusual? We will
              scope it with you and build a proposal around your goals.
            </p>
            <Button href="/get-a-quote" size="lg" arrow className="mt-8">
              Request a Custom Quote
            </Button>
          </div>
          <ul className="space-y-4 lg:col-span-5 lg:col-start-8">
            {pricingNotes.map((n) => (
              <li key={n} className="border-t border-line pt-4 leading-relaxed text-muted">
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection
        faqs={generalFaqs.filter((f) => pricingFaqTopics.includes(f.topic))}
        eyebrow="Pricing FAQ"
        title="About quotes and packages"
      />
      <CtaSection />
    </>
  );
}
