import { Info } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Process from "@/components/sections/Process";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";
import ServiceVisual from "@/components/visuals/ServiceVisual";
import ServiceCard from "@/components/services/ServiceCard";
import WorkCard from "@/components/work/WorkCard";
import LogoShowcase from "@/components/portfolio/LogoShowcase";
import { getService } from "@/data/services";
import { workForService, workIndex } from "@/data/work";
import { absoluteUrl, siteConfig } from "@/lib/site";

/** Reusable landing-page template driven entirely by a service entry in data/services.js. */
export default function ServiceDetail({ service }) {
  const related = service.related.map(getService).filter(Boolean);
  const exampleSlugs = workForService(service.slug, 8).map((w) => w.slug);
  const projects = workIndex()
    .filter((w) => exampleSlugs.includes(w.slug))
    .sort((a, b) => exampleSlugs.indexOf(a.slug) - exampleSlugs.indexOf(b.slug));
  const path = `/services/${service.slug}`;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.navTitle ?? service.title, href: path },
        ]}
        eyebrow={service.hero.eyebrow}
        title={service.hero.heading}
        intro={service.hero.intro}
        actions={
          <>
            <Button href={`/get-a-quote?service=${service.slug}`} size="lg" arrow>
              Start Your Project
            </Button>
            <Button href="/pricing" size="lg" variant="secondary">
              View Packages
            </Button>
          </>
        }
        aside={<ServiceVisual service={service} />}
      />

      {/* Problems */}
      <section aria-labelledby="problems-title" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            id="problems-title"
            eyebrow="The challenge"
            title="Problems we solve"
            intro="Common reasons businesses come to us, and how we help."
          />
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {service.problems.map((p, i) => (
              <li key={p.title} className="reveal rounded-xl border border-line bg-surface p-7">
                <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="features-title" className="border-y border-line bg-surface py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="features-title"
                eyebrow={`${service.navTitle ?? service.title}`}
                title="What is included"
                intro="The exact mix is tailored to your project and confirmed in your proposal."
              />
            </div>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {service.features.map((f) => (
              <li key={f.title} className="bg-surface p-7 sm:[&:last-child:nth-child(odd)]:col-span-2">
                <h3 className="flex items-center gap-3 font-semibold text-fg">
                  <span aria-hidden="true" className="brand-gradient h-px w-4" />
                  {f.title}
                </h3>
                <p className="mt-2 pl-7 leading-relaxed text-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-title" className="py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="benefits-title"
            className="lg:col-span-5"
            eyebrow="The benefit"
            title="What it means for your business"
          />
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-7">
            {service.benefits.map((b) => (
              <li key={b} className="reveal flex gap-4 border-t border-line-strong pt-5 text-lg leading-snug text-fg">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        {service.note && (
          <div className="container-page mt-14">
            <aside className="flex gap-4 rounded-xl border border-line-strong bg-surface-2 p-6 sm:p-7">
              <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-cyan" />
              <div>
                <h3 className="font-semibold text-fg">Good to know</h3>
                <p className="mt-1.5 max-w-3xl leading-relaxed text-muted">{service.note}</p>
              </div>
            </aside>
          </div>
        )}
      </section>

      <Process
        steps={service.process}
        eyebrow={`${service.navTitle ?? service.title} process`}
        title="From brief to delivery, step by step."
        intro="A structured approach with clear milestones and review points."
      />

      {projects.length > 0 && (
        <section aria-labelledby="examples-title" className="py-20 lg:py-28">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading
                id="examples-title"
                eyebrow="Related work"
                title="Examples from our portfolio"
                intro="Real work from our portfolio in this discipline."
              />
              <Button href="/portfolio" variant="secondary" arrow className="shrink-0 self-start md:self-auto">
                View All Projects
              </Button>
            </div>
            <ul className="mt-14 columns-2 gap-5 md:columns-3 xl:columns-4">
              {projects.map((p) => (
                <li key={p.slug} className="reveal-card mb-6 break-inside-avoid">
                  <WorkCard item={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {["logo-design", "brand-identity"].includes(service.slug) && (
        <LogoShowcase eyebrow="From the portfolio" title="Logos we have designed" />
      )}

      <section aria-labelledby="related-title" className="border-t border-line bg-surface py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading id="related-title" eyebrow="Related services" title="Often paired with" />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <ServiceCard service={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection
        faqs={service.faqs}
        eyebrow={`${service.navTitle ?? service.title} FAQ`}
        title="Common questions"
        intro="Answers specific to this service. For general questions, see our full FAQ."
        withSchema
      />

      <CtaSection
        title="Ready to start? Let's talk about your project."
        text="Share a few details about your project and we will reply with questions, recommendations and a clear proposal."
        primary={{ label: "Request a Quote", href: `/get-a-quote?service=${service.slug}` }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          serviceType: service.title,
          description: service.metaDescription,
          url: absoluteUrl(path),
          provider: { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name },
        }}
      />
    </>
  );
}
