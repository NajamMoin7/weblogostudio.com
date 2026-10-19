import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/content";

/**
 * Four-step process on a light "paper" band for editorial contrast.
 * `steps` can be overridden by service pages with service-specific steps.
 */
export default function Process({
  steps = processSteps,
  eyebrow = "How we work",
  title = "A clear process from first conversation to launch.",
  intro = "Every project follows the same four stages, so you always know where things stand and what comes next.",
}) {
  return (
    <section aria-labelledby="process-title" className="bg-paper text-paper-ink">
      <div className="container-page py-20 lg:py-32">
        <SectionHeading id="process-title" tone="paper" eyebrow={eyebrow} title={title} intro={intro} />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Progress rule connecting the steps on large screens */}
          <span aria-hidden="true" className="absolute inset-x-0 top-[1.15rem] hidden h-px bg-paper-ink/15 lg:block" />
          {/* Fills left to right as the timeline scrolls into view (CSS scroll timeline, no JS) */}
          <span aria-hidden="true" className="timeline-fill brand-gradient absolute inset-x-0 top-[1.15rem] hidden h-[2px] -translate-y-px lg:block" />
          {steps.map((step, i) => (
            <li key={step.title} className="reveal relative" style={{ animationRangeEnd: `entry ${40 + i * 12}%` }}>
              <span className="relative z-10 grid size-[2.3rem] place-items-center rounded-full border border-paper-ink/20 bg-paper font-mono text-xs font-medium">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display-wide mt-6 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-paper-muted">{step.text}</p>
              {step.outputs && (
                <ul className="mt-5 space-y-1.5 border-t border-paper-ink/10 pt-4 text-sm text-paper-muted">
                  {step.outputs.map((o) => (
                    <li key={o} className="flex items-center gap-2">
                      <span aria-hidden="true" className="h-px w-3 bg-blue" />
                      {o}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
