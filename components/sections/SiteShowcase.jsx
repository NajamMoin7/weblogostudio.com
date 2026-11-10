import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getWork } from "@/data/work";

/** Delivered websites shown full length. Slugs must exist in data/portfolio-items.json. */
const SHOWCASE = [
  { slug: "integrity-home-lending-web-design", industry: "Mortgage lender" },
  { slug: "ace-logistics-web-design", industry: "Freight & logistics" },
  { slug: "the-organizing-interior-design-web-design", industry: "Interior design studio" },
  { slug: "theater-academy-web-design", industry: "Performing arts school" },
];

/**
 * Home: four delivered websites, each scrolling top to bottom inside a browser frame while the
 * visitor scrolls past (CSS scroll-driven animation, see .showcase-* in globals.css). Server
 * rendered, no JavaScript; images load lazily below the fold.
 */
export default function SiteShowcase() {
  const items = SHOWCASE.map((s) => {
    const work = getWork(s.slug);
    if (!work) return null;
    const full = work.images.find((i) => i.role === "full") ?? work.images[0];
    return { ...s, work, full };
  }).filter(Boolean);

  return (
    <section aria-labelledby="showcase-title" className="theme-charcoal">
      <div className="container-page pt-20 lg:pt-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2
            id="showcase-title"
            className="font-display-wide text-[clamp(2.2rem,4.6vw,3.6rem)] font-bold leading-[0.98] lg:col-span-7"
          >
            Scroll through four websites we built.
          </h2>
          <p className="max-w-xl text-[1.06rem] leading-relaxed text-muted lg:col-span-5">
            Full pages, top to bottom, exactly as they were handed over. Keep scrolling and each one plays through.
          </p>
        </div>
      </div>

      {items.map(({ slug, industry, work, full }, i) => (
        <div key={slug} className="showcase-stage relative">
          <div className="showcase-sticky flex items-center py-10 lg:py-12">
            <div className="container-page grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="showcase-caption lg:col-span-4">
                <p className="caption tabular-nums">
                  Website {i + 1} of {items.length}
                </p>
                <h3 className="font-display-wide mt-3 text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold leading-[1.02]">
                  {work.displayTitle}
                </h3>
                <p className="mt-2 text-muted">{industry}</p>
                <Link
                  href={`/portfolio/${slug}`}
                  className="group mt-6 inline-flex items-center gap-2 font-semibold text-fg underline decoration-orange decoration-2 underline-offset-[7px] transition-colors hover:decoration-fg"
                >
                  View the project <ArrowRight aria-hidden="true" className="arrow-nudge size-4" />
                </Link>
              </div>

              <figure className="lg:col-span-8">
                <div className="overflow-hidden rounded-xl bg-[#2a302c] shadow-lift ring-1 ring-white/10">
                  <div aria-hidden="true" className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                    <span className="flex gap-1.5">
                      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="size-2.5 rounded-full bg-[#febc2e]" />
                      <span className="size-2.5 rounded-full bg-[#28c840]" />
                    </span>
                    <span className="mx-auto truncate rounded-md bg-white/8 px-6 py-1 text-xs text-white/60">{work.displayTitle}</span>
                    <span className="w-[3.25rem]" />
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden bg-white [container-type:size] sm:aspect-[16/10]">
                    <Image
                      src={full.src}
                      width={full.width}
                      height={full.height}
                      alt={`${work.displayTitle} website, full page`}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="showcase-page block h-auto w-full"
                    />
                  </div>
                  <div aria-hidden="true" className="h-[3px] bg-white/10">
                    <span className="showcase-progress block h-full w-full bg-orange" />
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </div>
      ))}
      <div aria-hidden="true" className="h-12 lg:h-20" />
    </section>
  );
}
