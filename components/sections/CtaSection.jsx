import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";

export default function CtaSection({
  title = "Have a project in mind? Let's build something exceptional.",
  text = "Tell us about your business, your ideas, and what you want to achieve. We'll help you find the right creative solution.",
  primary = { label: "Start Your Project", href: "/get-a-quote" },
  secondary = { label: "Contact Us", href: "/contact" },
}) {
  return (
    <section aria-labelledby="cta-title" className="pb-20 pt-4 lg:pb-28">
      <div className="container-page">
        <div className="theme-forest grain relative overflow-hidden rounded-3xl px-6 py-16 shadow-lift sm:px-12 lg:px-16 lg:py-24">
          {/* Slanted ribbons and an orange disc, echoing the W/L mark in the logo */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <span className="absolute -bottom-24 -right-16 size-72 rounded-full bg-orange/85 sm:size-96" />
            <div className="parallax-soft absolute inset-y-0 right-[8%] hidden w-56 md:block">
              <span className="absolute -top-10 left-0 h-[140%] w-10 -skew-x-[24deg] bg-cream/[0.07]" />
              <span className="absolute -top-10 left-20 h-[140%] w-10 -skew-x-[24deg] bg-cream/[0.05]" />
            </div>
          </div>
          <div className="relative max-w-3xl">
            <h2
              id="cta-title"
              className="font-display-wide text-[clamp(2.1rem,5vw,4rem)] font-bold leading-[1.05]"
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
              <Button href={secondary.href} size="lg" variant="secondary" className="w-full xs:w-auto">
                {secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
