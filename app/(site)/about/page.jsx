import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Process from "@/components/sections/Process";
import CtaSection from "@/components/sections/CtaSection";
import SectionHeading from "@/components/ui/SectionHeading";
import MarkTest from "@/components/motion/MarkTest";
import { serviceGroups, getServicesByGroup } from "@/data/services";
import { work } from "@/data/work";
import { addressLines, pageMetadata, siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Web Logo Studio LLC is a design and development studio in Hicksville, NY that builds logos, brand identities and websites as one system.",
  path: "/about",
});

const principles = [
  {
    title: "The logo is designed for the website it will live on",
    text: "We test marks at favicon, header and sign size before you see them, so nothing has to be redrawn when the site goes live.",
  },
  {
    title: "Scope and price in writing first",
    text: "Every project starts with a proposal listing deliverables, revision rounds, timeline and price. Changes to any of those are agreed before the work.",
  },
  {
    title: "You own what you paid for",
    text: "Final files, domains and accounts are set up in your name. No hostage hosting, no locked templates.",
  },
  {
    title: "Plain answers",
    text: "If a feature, platform or service will not pay for itself, we say so and suggest what will.",
  },
];

const brandColours = [
  ["Studio green", "#0B4F3C"],
  ["Marking orange", "#F26A1B"],
  ["Ink", "#141815"],
  ["Paper", "#FBFBF8"],
];

export default function AboutPage() {
  const counts = {
    logos: work.filter((w) => w.category === "logos").length,
    web: work.filter((w) => w.category === "web-design").length,
  };
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "About", href: "/about" }]}
        title="Logos and websites from one studio, on one standard."
        intro={`Web Logo Studio LLC designs and builds brand identities and websites from ${addressLines[1]}. ${work.length} delivered projects so far, including ${counts.logos} logos and ${counts.web} websites.`}
      />

      <section aria-labelledby="story-title" className="py-20 lg:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="story-title" title="Why brand and web sit together here." />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
            <p>
              Most businesses collect their identity in pieces: a logo from a contest site, a website from a template,
              flyers from the print shop. Each is fine alone. Side by side they look like three different companies.
            </p>
            <p>
              We design the mark, the colours, the type and the website in the same room, then hand over files that
              keep them consistent on every sign, page and post you make after we are done.
            </p>
            <p className="text-fg">
              The studio is managed by{" "}
              <a href={siteConfig.manager.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-orange decoration-2 underline-offset-4">
                {siteConfig.manager.name}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="identity-title" className="theme-mint py-20 lg:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <MarkTest />
          </div>
          <div className="lg:col-span-5">
            <SectionHeading
              id="identity-title"
              title="Our own mark, held to the same test."
              intro="The green W and the orange-and-ink L are the two halves of the work, web and logo, meeting in one mark. This site is built from its four colours."
            />
            <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {brandColours.map(([name, hex]) => (
                <li key={hex} className="flex items-center gap-3 bg-surface p-3">
                  <span className="size-9 shrink-0 rounded-md border border-line-strong" style={{ background: hex }} />
                  <span>
                    <span className="block text-sm font-medium text-fg">{name}</span>
                    <span className="caption">{hex}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading id="principles-title" title="Four rules we work by." />
          <dl className="mt-12 grid gap-x-10 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="reveal border-t-2 border-fg py-6">
                <dt className="font-display-wide text-[1.6rem] font-bold leading-tight">{p.title}</dt>
                <dd className="mt-3 max-w-lg leading-relaxed text-muted">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Process />

      <section aria-labelledby="capabilities-title" className="theme-charcoal py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading id="capabilities-title" title="What you can hire us for." />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {serviceGroups.map((g) => (
              <div key={g.id} className="border-t-2 border-fg pt-5">
                <h3 className="font-display-wide text-[1.5rem] font-bold">{g.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{g.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {getServicesByGroup(g.id).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group inline-flex items-center gap-1.5 text-fg hover:text-cyan">
                        {s.navTitle ?? s.title}
                        <ArrowRight aria-hidden="true" className="arrow-nudge size-3.5 opacity-60" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
