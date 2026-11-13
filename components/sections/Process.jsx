import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/content";

/**
 * Process as a ruled timeline. The step number is real sequence, so it stays; the rule fills
 * in marking ink as the steps scroll through (CSS scroll timeline, no JavaScript). When the
 * steps reveal, an ink stamp slams onto each one in turn ("Approved", the last "Delivered"),
 * because every stage ends with something the client signs off.
 */
export default function Process({
  steps = processSteps,
  title = "How a custom project runs.",
  intro = "Four stages, each ending with something you approve before the next one starts.",
}) {
  return (
    <section aria-labelledby="process-title" className="theme-charcoal">
      <div className="container-page py-20 lg:py-28">
        <SectionHeading id="process-title" title={title} intro={intro} />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden="true" className="absolute inset-x-0 top-[1.1rem] hidden h-px bg-line-strong lg:block" />
          <span aria-hidden="true" className="timeline-fill absolute inset-x-0 top-[1.1rem] hidden h-[2px] -translate-y-px bg-brand lg:block" />
          {steps.map((step, i) => (
            <li key={step.title} className="reveal relative" style={{ "--i": i }}>
              <span className="process-num relative z-10 grid size-[2.2rem] place-items-center rounded-full bg-fg text-sm font-bold tabular-nums text-ink">
                {i + 1}
              </span>
              <span aria-hidden="true" className="process-stamp">
                {i === steps.length - 1 ? "Delivered" : "Approved"}
              </span>
              <h3 className="font-display-wide mt-6 text-[1.7rem] font-bold leading-tight">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
              {step.outputs && (
                <ul className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm text-muted">
                  {step.outputs.map((o) => (
                    <li key={o} className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="h-px w-3 bg-fg/50" />
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
