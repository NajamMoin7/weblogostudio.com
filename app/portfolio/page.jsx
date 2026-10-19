import { Suspense } from "react";
import PageHero from "@/components/sections/PageHero";
import CtaSection from "@/components/sections/CtaSection";
import WorkGrid from "@/components/work/WorkGrid";
import { RevealWords } from "@/components/ui/SectionHeading";
import { work, workCategories, workIndex } from "@/data/work";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Portfolio",
  description: `Explore ${work.length} projects by Web Logo Studio: logos, brand identities, graphic design, social media design, websites and UI/UX.`,
  path: "/portfolio",
});

/** Skeleton shown only while the client grid initialises (it reads filters from the URL). */
function GridSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className="h-10 w-28 rounded-md bg-surface-2" />
        ))}
      </div>
      <div className="mt-14 columns-2 gap-5 md:columns-3 xl:columns-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="mb-6 break-inside-avoid">
            <div className="rounded-xl bg-surface-2" style={{ aspectRatio: i % 3 === 0 ? "4 / 5" : "1 / 1" }} />
            <div className="mt-3 h-3 w-2/3 rounded bg-surface-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const counts = Object.fromEntries(workCategories.map((c) => [c.id, work.filter((w) => w.category === c.id).length]));
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Portfolio", href: "/portfolio" }]}
        eyebrow="Portfolio"
        title={
          <span className="reveal-words">
            <RevealWords text="A closer look at what we create." />
          </span>
        }
        intro="Explore our collection of logos, brand identities, graphic design, social media and digital experiences, every piece shown as it was delivered."
      >
        <ul className="rise-in mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-sm" style={{ "--i": 4 }}>
          <li>
            <span className="font-display-wide text-2xl font-semibold text-fg">{work.length}</span>
            <span className="ml-2 text-muted">projects</span>
          </li>
          {workCategories.map((c) => (
            <li key={c.id}>
              <span className="font-display-wide text-2xl font-semibold text-fg">{counts[c.id]}</span>
              <span className="ml-2 text-muted">{c.label}</span>
            </li>
          ))}
        </ul>
      </PageHero>
      <section aria-label="Projects" className="py-14 lg:py-20">
        <div className="container-page">
          <Suspense fallback={<GridSkeleton />}>
            <WorkGrid items={workIndex()} categories={workCategories} />
          </Suspense>
        </div>
      </section>
      <CtaSection
        title="Have a project in mind? Let's add it to the collection."
        text="Tell us about your brand, your audience and what you need. We will reply with questions, ideas and a clear proposal."
      />
    </>
  );
}
