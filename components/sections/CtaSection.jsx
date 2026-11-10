import Button from "@/components/ui/Button";
import { RevealWords } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";

/** Closing sheet in the away colourway: one decisive line, the quote action and the phone. */
export default function CtaSection({
  title = "Tell us what you are building.",
  text = "Send a short brief. You get questions back, then a written scope, timeline and price. No payment until you approve it.",
  primary = { label: "Request a quote", href: "/get-a-quote" },
}) {
  const { phone, phoneHref } = siteConfig.contact;
  return (
    <section aria-labelledby="cta-title" className="theme-forest border-t border-line">
      <div className="container-page grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
        <h2
          id="cta-title"
          className="reveal-words font-condensed text-[clamp(2.8rem,7.4vw,6rem)] font-bold uppercase leading-[0.9] lg:col-span-8"
        >
          <RevealWords text={title} />
        </h2>
        <div className="lg:col-span-4">
          <p className="text-lg leading-relaxed text-muted">{text}</p>
          <div className="mt-8 flex flex-col gap-3">
            <Button href={primary.href} size="lg" fill arrow className="w-full">
              {primary.label}
            </Button>
            <a
              href={phoneHref}
              className="inline-flex h-14 items-center justify-center rounded-md border-[1.5px] border-fg/70 font-semibold transition-colors hover:bg-fg hover:text-ink"
            >
              Call {phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
