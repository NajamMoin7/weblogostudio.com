import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import HeroMotif from "@/components/motion/HeroMotif";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Thank You",
  description: "Your quote request has been received by Web Logo Studio.",
  path: "/thank-you",
  noIndex: true,
});

const steps = [
  "We review your project details.",
  "We reply by email with any questions.",
  "You receive a written proposal with scope, timeline and price.",
];

export default function ThankYouPage() {
  return (
    <section className="theme-forest relative overflow-hidden">
      <div className="container-page grid min-h-[70vh] items-center gap-12 py-24 lg:grid-cols-12">
        <div className="max-w-3xl lg:col-span-7">
          <CheckCircle2 aria-hidden="true" className="rise-in size-10 text-cyan" style={{ "--i": 0 }} />
          <h1
            className="font-display-wide mt-8 text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[0.95]"
            style={{ "--i": 1 }}
          >
            Thank you. Your request is with us.
          </h1>
          <p className="rise-in mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ "--i": 2 }}>
            We have received your project details. Here is what happens next.
          </p>
          <ol className="rise-in mt-10 space-y-4 border-t border-line pt-8" style={{ "--i": 3 }}>
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4 text-fg">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-fg text-xs font-bold text-ink">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <div className="rise-in mt-12 flex flex-col gap-3 xs:flex-row" style={{ "--i": 4 }}>
            <Button href="/portfolio" arrow>
              See the work
            </Button>
            <Button href="/" variant="secondary">
              Back to home
            </Button>
          </div>
        </div>
        <div className="hidden lg:col-span-5 lg:block">
          <HeroMotif seed={3} />
        </div>
      </div>
    </section>
  );
}
