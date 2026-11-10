import Breadcrumbs from "@/components/ui/Breadcrumbs";
import HeroMotif from "@/components/motion/HeroMotif";

/** Stable small number from a string, so each page gets its own shard entrance. */
function seedFrom(value) {
  const s = typeof value === "string" ? value : "";
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Inner-page banner on the logo-green band. Words on the left are static at first paint (the H1
 * is the LCP element); the construction drawing on the right assembles the logo's shards and
 * keeps moving. With an `aside` (service illustrations) the drawing sits behind it instead.
 * (`eyebrow` is accepted for compatibility and ignored: no kickers above headings.)
 */
export default function PageHero({ breadcrumbs, title, intro, actions, aside, children, seed }) {
  const key = seed ?? seedFrom(breadcrumbs?.at(-1)?.href ?? (typeof title === "string" ? title : ""));
  return (
    <section className="theme-forest relative overflow-hidden">
      <div className="container-page relative pb-14 pt-8 lg:pb-20 lg:pt-12">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="relative z-10 lg:col-span-7">
            <h1
              className={`font-display-wide font-bold leading-[0.95] ${
                aside ? "text-[clamp(2.4rem,5vw,4.4rem)]" : "text-[clamp(2.6rem,5.6vw,5.2rem)]"
              }`}
            >
              {title}
            </h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
            {actions && <div className="mt-9 flex flex-col gap-3 xs:flex-row">{actions}</div>}
            {children}
          </div>

          {aside ? (
            <div className="relative lg:col-span-5">
              <div className="theme-paper relative rounded-xl shadow-lift">{aside}</div>
              <HeroMotif
                compact
                seed={key}
                className="pointer-events-none absolute -bottom-7 -left-4 z-10 w-32 sm:-left-6 sm:w-40"
              />
            </div>
          ) : (
            <div className="mx-auto w-full max-w-md sm:max-w-lg lg:col-span-5 lg:max-w-none">
              <HeroMotif seed={key} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
