import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Process from "@/components/sections/Process";
import CtaSection from "@/components/sections/CtaSection";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/services/ServiceCard";
import { getServicesByGroup, serviceGroups } from "@/data/services";
import { pageMetadata } from "@/lib/site";

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
        title="Websites, brand identity and the work that keeps them running."
        intro="Fourteen services in three groups. Book one, or combine them so your logo, website and marketing come from the same hands and match on day one."
        actions={
          <>
            <Button href="/get-a-quote" size="lg" fill arrow>
              Request a quote
            </Button>
            <Button href="/portfolio" size="lg" variant="secondary">
              See the work
            </Button>
          </>
        }
      >
        <nav aria-label="Service categories" className="mt-12">
          <ul className="flex flex-wrap gap-2">
            {serviceGroups.map((g) => (
              <li key={g.id}>
                <Link
                  href={`#${g.id}`}
                  className="inline-flex rounded-md border border-line-strong px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-fg hover:text-fg"
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
            className={`py-20 lg:py-24 ${gi % 2 ? "border-y border-line bg-surface" : ""}`}
          >
            <div className="container-page">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <h2
                    id={`${group.id}-title`}
                    className="font-display-wide text-[clamp(2.2rem,4.6vw,3.6rem)] font-bold leading-[0.98]"
                  >
                    {group.label}
                  </h2>
                </div>
                <p className="leading-relaxed text-muted lg:col-span-5">{group.description}</p>
              </div>
              <ul className="mt-12 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((s) => (
                  <li key={s.slug} className="reveal">
                    <ServiceCard service={s} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="unsure-title" className="py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-8 border-y-2 border-fg py-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 id="unsure-title" className="font-display-wide text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-tight">
                Not sure which service you need?
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                Tell us what you sell and who buys it. We will recommend the smallest set of services that gets you
                there, and say plainly when you do not need something.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Button href="/contact" variant="secondary" size="lg" arrow>
                Ask for advice
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
