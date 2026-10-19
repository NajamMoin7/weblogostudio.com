import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Process from "@/components/sections/Process";
import CtaSection from "@/components/sections/CtaSection";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/services/ServiceCard";
import { getServicesByGroup, serviceGroups } from "@/data/services";
import { pageMetadata } from "@/lib/site";
import { getAsset } from "@/lib/assets";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Website design and development, e-commerce, WordPress, Next.js, logo design, brand identity, graphic design, SEO and website maintenance from Web Logo Studio.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Services", href: "/services" }]}
        eyebrow="Services"
        title="Design, development and branding under one roof."
        intro="Fourteen focused services across websites, brand identity and ongoing growth. Choose one, or combine them so your logo, website and marketing work as a single system."
        actions={
          <>
            <Button href="/get-a-quote" size="lg" arrow>
              Start Your Project
            </Button>
            <Button href="/pricing" size="lg" variant="secondary">
              View Packages
            </Button>
          </>
        }
      >
        <nav aria-label="Service categories" className="rise-in mt-12" style={{ "--i": 4 }}>
          <ul className="flex flex-wrap gap-2">
            {serviceGroups.map((g) => (
              <li key={g.id}>
                <Link
                  href={`#${g.id}`}
                  className="inline-flex rounded-md border border-line-strong px-4 py-2 text-sm text-muted transition-colors hover:border-fg/40 hover:text-fg"
                >
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {serviceGroups.map((group, gi) => {
        const items = getServicesByGroup(group.id);
        return (
          <section
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-title`}
            className={`py-20 lg:py-28 ${gi % 2 ? "border-y border-line bg-surface" : ""}`}
          >
            <div className="container-page">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <p className="eyebrow mb-4 font-mono text-subtle">
                    {String(gi + 1).padStart(2, "0")} / {String(serviceGroups.length).padStart(2, "0")}
                  </p>
                  <h2
                    id={`${group.id}-title`}
                    className="font-display-wide text-[clamp(1.85rem,4vw,3rem)] font-semibold leading-[1.05]"
                  >
                    {group.label}
                  </h2>
                </div>
                <p className="leading-relaxed text-muted lg:col-span-5">{group.description}</p>
              </div>
              <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((s) => (
                  <li key={s.slug} className="reveal">
                    <ServiceCard service={s} image={getAsset(`service-${s.slug}`)} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="unsure-title" className="py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-8 rounded-2xl border border-line p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 id="unsure-title" className="font-display-wide text-3xl font-semibold leading-tight">
                Not sure which service you need?
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                Tell us what you are trying to achieve. We will recommend the right combination, explain why, and keep
                the scope to what genuinely helps.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Button href="/contact" variant="secondary" size="lg" arrow>
                Ask for Advice
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Process />
      <CtaSection />
    </>
  );
}
