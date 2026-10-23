import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import HeroMotion, { HeroPauseButton } from "@/components/motion/HeroMotion";
import AnimatedHeadline from "@/components/motion/AnimatedHeadline";
import ProjectVisual from "@/components/visuals/ProjectVisual";
import { getProject } from "@/data/concepts";

const pillars = [
  { n: "01", title: "Websites", text: "Designed and built to earn trust in the first few seconds.", href: "/services/website-design" },
  { n: "02", title: "Logos & identity", text: "Marks and brand systems people recognise and remember.", href: "/services/logo-design" },
  { n: "03", title: "Online presence", text: "One consistent, professional look everywhere customers find you.", href: "/services/brand-identity" },
];

export default function Hero() {
  const web = getProject("lumen-dental-studio");
  const brand = getProject("northfold-coffee-roasters");

  return (
    <HeroMotion labelledBy="hero-title" className="overflow-hidden">
      <div className="container-page relative grid items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-7">
          <p className="rise-in eyebrow mb-7 flex items-center gap-3 text-subtle" style={{ "--i": 0 }}>
            <span aria-hidden="true" className="brand-gradient h-0.5 w-8 rounded-full" />
            <span>
              <span className="hidden sm:inline">Web Logo Studio · </span>
              <span className="text-cyan">Websites &amp; brand identity</span>
            </span>
          </p>

          <AnimatedHeadline
            id="hero-title"
            lines={["Digital experiences", "that make your brand"]}
            phrases={["stand out.", "get remembered.", "inspire confidence.", "make an impact."]}
            srText="Digital experiences that make your brand stand out, get remembered, inspire confidence and make an impact."
            className="font-display-wide max-w-3xl text-[clamp(2.5rem,5.2vw,4.4rem)] font-bold leading-[1.04] text-brand"
          />

          <p className="rise-in mt-7 max-w-xl text-[1.06rem] leading-relaxed text-muted sm:text-lg" style={{ "--i": 6 }}>
            From distinctive logos to exceptional websites, we transform ideas into digital experiences that make
            businesses stand out.
          </p>
          <div className="rise-in mt-9 flex flex-col gap-3 xs:flex-row xs:items-center" style={{ "--i": 7 }}>
            <Magnetic className="w-full xs:w-auto">
              <Button href="/get-a-quote" size="lg" swap fill className="w-full xs:w-auto">
                Start Your Project
              </Button>
            </Magnetic>
            <Button href="/portfolio" size="lg" variant="secondary" arrow className="w-full xs:w-auto">
              Explore Our Work
            </Button>
            <HeroPauseButton className="self-start xs:ml-2 xs:self-auto" />
          </div>
        </div>

        {/* Stage: brand shapes from the logo palette with concept mockups layered at different depths. */}
        <div className="rise-in relative lg:col-span-5" style={{ "--i": 4 }}>
          <div className="relative mx-auto aspect-[5/4] max-w-xl lg:aspect-[4/5]">
            <div aria-hidden="true" className="absolute inset-0">
              <div className="depth absolute inset-y-0 right-0 w-[86%] rounded-[2rem] rounded-tl-[48%] bg-forest" style={{ "--depth": -6 }} />
              <div className="ambient absolute -bottom-[6%] -right-[8%] aspect-square w-[46%] rounded-full bg-orange/90" />
              <div className="absolute inset-y-0 right-0 w-[86%] overflow-hidden rounded-[2rem] rounded-tl-[48%]">
                <span className="absolute -left-[10%] top-[14%] h-[130%] w-[14%] -skew-x-[22deg] bg-cream/[0.06]" />
                <span className="absolute left-[22%] top-[14%] h-[130%] w-[6%] -skew-x-[22deg] bg-cream/[0.05]" />
              </div>
            </div>

            <div className="depth absolute bottom-[10%] left-0 w-[78%]" style={{ "--depth": 16 }}>
              <div className="parallax-soft overflow-hidden rounded-xl border border-line bg-surface shadow-lift">
                <ProjectVisual project={web} kind="web" label="Concept website design for a dental practice" />
              </div>
            </div>
            <div className="depth absolute right-[5%] top-[8%] w-[46%]" style={{ "--depth": 26 }}>
              <div className="parallax-lift overflow-hidden rounded-xl border border-cream/20 shadow-lift">
                <ProjectVisual project={brand} kind="brand" aspect="aspect-[4/3]" label="Concept logo and palette for a coffee roaster" />
              </div>
            </div>
            <p className="absolute right-[5%] top-[2%] -translate-y-full rounded-md bg-surface px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-subtle shadow-card">
              Concept work
            </p>
          </div>
        </div>
      </div>

      <div className="container-page pb-20 lg:pb-28">
        <ul className="grid gap-4 lg:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.n} className="reveal-card">
              <Link
                href={p.href}
                className="group flex h-full items-start gap-5 rounded-2xl border border-line bg-surface p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out-quint hover:-translate-y-1 hover:border-brand/25 hover:shadow-lift sm:p-7"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest text-xs font-semibold tabular-nums text-cream transition-colors duration-300 group-hover:bg-orange-strong">
                  {p.n}
                </span>
                <span className="flex-1 text-left">
                  <span className="font-display-wide flex items-center justify-between gap-3 text-xl font-semibold text-fg">
                    {p.title}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-muted transition-[transform,color] duration-200 ease-out-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan"
                    />
                  </span>
                  <span className="mt-2 block leading-relaxed text-muted">{p.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </HeroMotion>
  );
}
