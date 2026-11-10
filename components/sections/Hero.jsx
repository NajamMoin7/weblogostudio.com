import Link from "next/link";
import Button from "@/components/ui/Button";
import HeroSpecimen from "@/components/sections/HeroSpecimen";
import { work } from "@/data/work";

/**
 * Home hero, set as a type specimen sheet.
 * Left: the offer as a size ladder (display, subhead, text), each rung captioned with its
 * size at desktop width. Right: one real logo from the portfolio and the size scrubber, over the banner construction
 * drawing. The band is the logo green.
 * Everything is static at first paint; only the decorative caption rules draw in.
 */
function Rung({ caption, i, children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <p aria-hidden="true" className="caption mt-3 flex items-center gap-3">
        <span className="spec-rule h-px w-10 bg-orange" style={{ "--i": i }} />
        {caption}
      </p>
    </div>
  );
}

export default function Hero() {
  const total = work.length;
  return (
    <section aria-labelledby="hero-title" className="theme-forest relative overflow-hidden">
      <div className="container-page grid gap-12 pb-14 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-16">
        <div className="lg:col-span-7">
          <Rung caption="96 / Archivo Condensed Bold" i={0}>
            <h1
              id="hero-title"
              className="font-condensed text-[clamp(3.1rem,8.6vw,6rem)] font-bold uppercase leading-[0.9] text-fg"
            >
              Websites, logos <span className="text-cyan">&amp;&nbsp;brand systems</span>
            </h1>
          </Rung>

          <Rung caption="28 / Archivo Regular" i={1} className="mt-8">
            <p className="max-w-[34ch] text-[clamp(1.3rem,2.2vw,1.75rem)] leading-[1.25] text-fg">
              Designed and built in one studio, so your sign, site and social posts finally look like the same business.
            </p>
          </Rung>

          <Rung caption="16 / Archivo Regular" i={2} className="mt-7">
            <p className="max-w-[56ch] leading-relaxed text-muted">
              {total} projects delivered for contractors, clinics, lenders, schools and software teams. Every custom project
              starts with a written scope and price, before you pay anything.
            </p>
          </Rung>

          <div className="mt-9 flex flex-col gap-4 xs:flex-row xs:items-center">
            <Button href="/get-a-quote" size="lg" fill arrow className="w-full xs:w-auto">
              Request a quote
            </Button>
            <Link
              href="/portfolio"
              className="group inline-flex items-center justify-center gap-2 py-3 font-semibold text-fg underline decoration-line-strong decoration-2 underline-offset-[7px] transition-colors hover:decoration-fg"
            >
              See all {total} projects
            </Link>
          </div>
        </div>

        <HeroSpecimen />
      </div>
    </section>
  );
}
