import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import StockImage from "@/components/visuals/StockImage";

export default function CtaSection({
  title = "Have a project in mind? Let's build something exceptional.",
  text = "Tell us about your business, your ideas, and what you want to achieve. We'll help you find the right creative solution.",
  primary = { label: "Start Your Project", href: "/get-a-quote" },
  secondary = { label: "Contact Us", href: "/contact" },
}) {
  return (
    <section aria-labelledby="cta-title" className="pb-20 pt-4 lg:pb-28">
      <div className="container-page">
        <div className="grain relative overflow-hidden rounded-2xl border border-line-strong bg-surface-2 px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
          {/* Abstract brand-colour photography, kept behind a dark gradient for text contrast */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="parallax-soft absolute -inset-y-10 inset-x-0 opacity-70">
              <StockImage id="abstract-waves" sizes="(min-width: 1312px) 1216px, 100vw" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(95deg,#11141b_10%,rgb(17_20_27/0.85)_45%,rgb(17_20_27/0.2)_100%)]" />
          </div>
          {/* Two slanted ribbons, echoing the W in the logo */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[6%] hidden w-40 md:block">
            <span className="brand-gradient absolute -top-10 left-0 h-[140%] w-3 -skew-x-[24deg] opacity-90" />
            <span className="absolute -top-10 left-14 h-[140%] w-3 -skew-x-[24deg] bg-fg/10" />
          </div>
          <div className="relative max-w-3xl">
            <h2
              id="cta-title"
              className="font-display-wide text-[clamp(2.1rem,5.4vw,4.4rem)] font-bold leading-[1] tracking-[-0.03em]"
            >
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{text}</p>
            <div className="mt-10 flex flex-col gap-3 xs:flex-row">
              <Magnetic className="w-full xs:w-auto">
                <Button href={primary.href} size="lg" swap fill className="w-full xs:w-auto">
                  {primary.label}
                </Button>
              </Magnetic>
              <Button href={secondary.href} size="lg" variant="secondary" className="bg-ink/40 backdrop-blur-sm">
                {secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
