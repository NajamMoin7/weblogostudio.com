import Marquee from "@/components/ui/Marquee";
import { RevealWords } from "@/components/ui/SectionHeading";
import { tools } from "@/data/tools";

/** "Tools we work with" logo ticker. Logos are trademarks of their owners; no endorsement implied. */
export default function ToolsMarquee() {
  return (
    <section aria-labelledby="tools-title" className="border-t border-line py-16 lg:py-20">
      <div className="container-page">
        <div className="mb-10 flex items-end justify-between gap-6 pr-12">
          <h2 id="tools-title" className="reveal-words font-display-wide text-xl font-semibold text-fg sm:text-2xl">
            <RevealWords text="Designed and built with the tools modern brands rely on" />
          </h2>
        </div>
        <Marquee label="Tools we work with" duration={45} itemClassName="px-6 sm:px-9">
          {tools.map((t) => (
            <span
              key={t.slug}
              className="group flex items-center gap-3 text-muted transition-colors duration-300 hover:text-fg"
            >
              <svg viewBox="0 0 24 24" className="size-7 fill-current" role="img" aria-hidden="true">
                <path d={t.path} />
              </svg>
              <span className="whitespace-nowrap text-base font-medium sm:text-lg">{t.name}</span>
            </span>
          ))}
        </Marquee>
        <p className="mt-8 text-xs text-subtle">
          Product names and logos are trademarks of their respective owners and indicate tools we work with only.
        </p>
      </div>
    </section>
  );
}
