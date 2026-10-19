import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import HeroMotion, { HeroPauseButton } from "@/components/motion/HeroMotion";
import AnimatedHeadline from "@/components/motion/AnimatedHeadline";
import ProjectVisual from "@/components/visuals/ProjectVisual";
import StockImage from "@/components/visuals/StockImage";
import Mark from "@/components/visuals/Mark";
import { getProject } from "@/data/concepts";

const pillars = [
  { n: "01", title: "Websites", text: "Designed and built to earn trust in the first few seconds.", href: "/services/website-design" },
  { n: "02", title: "Logos & identity", text: "Marks and brand systems people recognise and remember.", href: "/services/logo-design" },
  { n: "03", title: "Online presence", text: "One consistent, professional look everywhere customers find you.", href: "/services/brand-identity" },
];

export default function Hero() {
  const web = getProject("lumen-dental-studio");
  const brand = getProject("northfold-coffee-roasters");
  const orbit = getProject("orbit-analytics");

  return (
    <HeroMotion labelledBy="hero-title" className="overflow-hidden">
      {/* Ambient brand-colour light, blurred and slowly drifting (paused with the hero control). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[78%] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_38%,#000_20%,transparent_75%)]">
          <div className="ambient absolute -inset-[12%] opacity-70 blur-3xl saturate-[1.6]">
            <StockImage id="abstract-waves" sizes="640px" priority />
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgb(5_6_8/0.35)_45%,#050608_80%)]" />
      </div>

      <div className="container-page relative pt-14 text-center sm:pt-20 lg:pt-24">
        <p className="rise-in eyebrow mb-8 inline-flex items-center gap-3 text-muted" style={{ "--i": 0 }}>
          <span aria-hidden="true" className="brand-gradient hidden h-px w-8 sm:block" />
          <span className="hidden sm:inline">Web Logo Studio · </span>Websites &amp; brand identity
          <span aria-hidden="true" className="brand-gradient hidden h-px w-8 sm:block" />
        </p>

        <AnimatedHeadline
          id="hero-title"
          lines={["Digital experiences", "that make your brand"]}
          phrases={["stand out.", "get remembered.", "inspire confidence.", "make an impact."]}
          srText="Digital experiences that make your brand stand out, get remembered, inspire confidence and make an impact."
          className="font-display-wide mx-auto max-w-6xl text-[clamp(2.55rem,6.3vw,5.8rem)] font-bold leading-[0.98] tracking-[-0.035em]"
        />

        <p
          className="rise-in mx-auto mt-8 max-w-2xl text-[1.06rem] leading-relaxed text-muted sm:text-lg"
          style={{ "--i": 6 }}
        >
          From distinctive logos to exceptional websites, we transform ideas into digital experiences that make
          businesses stand out.
        </p>
        <div className="rise-in mt-10 flex flex-col items-center justify-center gap-3 xs:flex-row" style={{ "--i": 7 }}>
          <Magnetic className="w-full xs:w-auto">
            <Button href="/get-a-quote" size="lg" swap fill className="w-full xs:w-auto">
              Start Your Project
            </Button>
          </Magnetic>
          <Button href="/portfolio" size="lg" variant="secondary" arrow className="w-full xs:w-auto">
            Explore Our Work
          </Button>
        </div>
        <div className="mt-6 flex justify-center sm:absolute sm:bottom-1 sm:right-5 sm:mt-0 lg:right-12">
          <HeroPauseButton />
        </div>
      </div>

      {/* Stage: a real workspace photo with concept mockups layered at different depths. */}
      <div className="container-page relative mt-16 pb-24 lg:mt-20 lg:pb-32">
        <div className="rise-in relative" style={{ "--i": 8 }}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line sm:aspect-[16/9] lg:aspect-[21/9]">
            <div className="depth absolute -inset-6" style={{ "--depth": -10 }}>
              <StockImage id="hero-stage" sizes="(min-width: 1312px) 1280px, 100vw" priority className="opacity-80" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(100deg,rgb(5_6_8/0.85)_0%,rgb(5_6_8/0.35)_55%,rgb(5_6_8/0.7)_100%)]" />
          </div>

          <div className="depth absolute bottom-[-7%] left-[4%] w-[60%] sm:w-[48%]" style={{ "--depth": 16 }}>
            <div className="parallax-soft overflow-hidden rounded-xl shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
              <ProjectVisual project={web} kind="web" label="Concept website design for a dental practice" />
            </div>
          </div>
          <div className="depth absolute right-[4%] top-[10%] w-[40%] sm:w-[28%]" style={{ "--depth": 26 }}>
            <div className="parallax-lift overflow-hidden rounded-xl border border-line-strong shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
              <ProjectVisual project={brand} kind="brand" aspect="aspect-[4/3]" label="Concept logo and palette for a coffee roaster" />
            </div>
          </div>
          <div className="depth absolute left-[44%] top-[12%] hidden w-[11%] sm:block" style={{ "--depth": 38 }}>
            <div
              className="grid aspect-square place-items-center rounded-xl border border-white/10 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)]"
              style={{ background: orbit.palette.bg }}
            >
              <Mark type={orbit.brand.mark} color={orbit.palette.accent} className="w-1/2" title="Concept mark for an analytics product" />
            </div>
          </div>
          <p className="absolute left-4 top-4 rounded-sm bg-ink/70 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted backdrop-blur-sm">
            Concept work
          </p>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:mt-24 md:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.n} className="reveal-card bg-ink">
              <Link
                href={p.href}
                className="group flex h-full items-start gap-5 p-6 transition-colors duration-200 ease-out-quint hover:bg-surface-2 sm:p-8"
              >
                <span className="font-mono text-xs text-cyan">{p.n}</span>
                <span className="flex-1 text-left">
                  <span className="font-display-wide flex items-center justify-between gap-3 text-xl font-semibold text-fg">
                    {p.title}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-muted transition-[transform,color] duration-200 ease-out-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
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
