import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
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
    <section className="grain relative overflow-hidden">
      <div className="container-page flex min-h-[70vh] flex-col justify-center py-24">
        <div className="max-w-3xl">
          <CheckCircle2 aria-hidden="true" className="rise-in size-10 text-success" style={{ "--i": 0 }} />
          <h1
            className="rise-in font-display-wide mt-8 text-[clamp(2.3rem,5.6vw,4.4rem)] font-bold leading-[1.02]"
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
                <span className="font-mono text-xs leading-7 text-cyan">{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ol>
          <div className="rise-in mt-12 flex flex-col gap-3 xs:flex-row" style={{ "--i": 4 }}>
            <Button href="/portfolio" arrow>
              Explore Our Work
            </Button>
            <Button href="/" variant="secondary">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
