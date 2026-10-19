import StockImage from "@/components/visuals/StockImage";
import Image from "next/image";
import Link from "next/link";
import { getWork } from "@/data/work";

const rows = [
  ["Pages assembled from a template", "Every page designed around your identity"],
  ["Logo, colours and type drift between channels", "One visual language across web, print and social"],
  ["Designed for desktop, squeezed onto mobile", "Layouts planned for every screen size"],
  ["Launched, then left alone", "Clean foundations that are easy to grow"],
];

/** Asymmetric image + text composition contrasting "just a website" with a cohesive brand. */
export default function WhyUs() {
  // A real brand identity project from the migrated portfolio.
  const brand = getWork("w12-garage-brand-identity-branding") ?? getWork("duro-athletics-brand-identity-branding");
  return (
    <section aria-labelledby="why-title" className="overflow-hidden py-24 lg:py-36">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5">
          <div className="reveal-image relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
            <div className="parallax-soft absolute -inset-y-8 inset-x-0">
              <StockImage id="studio-swatches" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(5_6_8/0.6),transparent_50%)]" />
          </div>
          {brand && (
            <Link
              href={`/portfolio/${brand.slug}`}
              className="parallax-lift group absolute -bottom-10 -right-4 block w-[62%] overflow-hidden rounded-xl border border-line-strong shadow-[0_30px_70px_-25px_rgb(0_0_0/0.9)] sm:-right-10"
            >
              <Image
                src={brand.thumbnail.src}
                alt={`${brand.displayTitle}, brand identity by Web Logo Studio`}
                width={brand.thumbnail.width}
                height={brand.thumbnail.height}
                sizes="(min-width: 1024px) 26vw, 60vw"
                className="h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
              />
              <span className="absolute left-3 top-3 rounded-sm bg-ink/80 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fg backdrop-blur-sm">
                From the portfolio
              </span>
            </Link>
          )}
        </div>

        <div className="lg:col-span-7">
          <p className="eyebrow mb-6 flex items-center gap-3 text-muted">
            <span aria-hidden="true" className="brand-gradient h-px w-8" />
            Why Web Logo Studio
          </p>
          <h2 id="why-title" className="font-display-wide text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            A website is a page. A brand is a promise kept on <span className="text-gradient">every page.</span>
          </h2>

          <div className="mt-12" role="table" aria-label="Just a website compared with a cohesive digital brand">
            <div role="row" className="grid grid-cols-2 gap-6 border-b border-line pb-3">
              <span role="columnheader" className="eyebrow text-subtle">Just a website</span>
              <span role="columnheader" className="eyebrow text-fg">A cohesive brand</span>
            </div>
            {rows.map(([a, b]) => (
              <div
                role="row"
                key={a}
                className="group grid grid-cols-2 gap-6 border-b border-line py-4 transition-colors duration-200 hover:bg-white/[0.02]"
              >
                <span role="cell" className="text-[0.95rem] leading-snug text-subtle line-through decoration-subtle/40">
                  {a}
                </span>
                <span role="cell" className="flex gap-3 text-[0.95rem] leading-snug text-fg">
                  <span aria-hidden="true" className="brand-gradient mt-[0.55rem] h-px w-4 shrink-0 transition-[width] duration-300 ease-out-quint group-hover:w-6" />
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
