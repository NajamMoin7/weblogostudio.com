import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Process from "@/components/sections/Process";
import CtaSection from "@/components/sections/CtaSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Logo from "@/components/ui/Logo";
import { serviceGroups, getServicesByGroup } from "@/data/services";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Web Logo Studio is a design and development studio that brings logos, brand identity and websites together, so businesses look consistent and credible everywhere.",
  path: "/about",
});

const principles = [
  {
    title: "Identity first",
    text: "A website should feel like the brand it represents. We start with who you are, then design every pixel to support it.",
  },
  {
    title: "Clarity over decoration",
    text: "Every element has to earn its place. If it does not help a visitor understand, trust or act, it goes.",
  },
  {
    title: "Built to last",
    text: "Clean code, documented systems and organised files mean your brand and website stay easy to work with.",
  },
  {
    title: "Honest by default",
    text: "Clear proposals, realistic timelines and straight answers, including when something is not the right fit.",
  },
];

const brandColours = [
  ["Electric blue", "#0077FE"],
  ["Signal cyan", "#00E5FC"],
  ["Ultraviolet", "#A634FC"],
  ["Logo white", "#EEF2F8"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "About", href: "/about" }]}
        eyebrow="About the studio"
        title="Websites and logos, designed as one."
        intro="Web Logo Studio brings brand identity and web design under one roof. We help businesses look as good as the work they do, from the first sketch of a logo to the launch of a website."
      />

      <section aria-labelledby="story-title" className="py-20 lg:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="story-title" eyebrow="Our story" title="Why we bring brand and web together." />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
            <p>
              Too many businesses end up with a logo from one place, a website from another and marketing materials
              that match neither. Each piece might be fine on its own, but together they tell a fragmented story.
            </p>
            <p>
              We started Web Logo Studio to fix that. By designing identities and websites side by side, we make sure
              your colours, typography and tone carry from your logo to your homepage to your social posts, without
              anything getting lost in translation.
            </p>
            <p className="text-fg">
              Our name says what we do. Our tagline says why:{" "}
              <span className="text-gradient font-semibold">brands for a brighter web.</span>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="identity-title" className="border-y border-line bg-surface py-20 lg:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="grain grid-lines relative grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl border border-line bg-ink p-10 lg:col-span-7">
            <Logo variant="lockup" link={false} className="h-auto w-[78%] max-w-lg" />
          </div>
          <div className="lg:col-span-5">
            <SectionHeading
              id="identity-title"
              eyebrow="Our own identity"
              title="We hold our brand to the same standard."
              intro="The interlocking ribbons of the W and the gradient L represent the two halves of our work, web and logo, meeting in one mark. This website takes its palette directly from it."
            />
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {brandColours.map(([name, hex]) => (
                <li key={hex} className="flex items-center gap-3 rounded-lg border border-line p-3">
                  <span className="size-9 shrink-0 rounded-md border border-line-strong" style={{ background: hex }} />
                  <span>
                    <span className="block text-sm text-fg">{name}</span>
                    <span className="font-mono text-xs text-subtle">{hex}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading id="principles-title" eyebrow="What we believe" title="Principles that shape every project." />
          <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="reveal border-t border-line-strong pt-6">
                <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display-wide mt-3 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Process />

      <section aria-labelledby="capabilities-title" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading id="capabilities-title" eyebrow="Capabilities" title="What we can do for you." />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {serviceGroups.map((g) => (
              <div key={g.id} className="border-t border-line-strong pt-6">
                <h3 className="text-lg font-semibold text-fg">{g.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{g.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {getServicesByGroup(g.id).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group inline-flex items-center gap-1.5 text-fg hover:text-cyan">
                        {s.navTitle ?? s.title}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5 opacity-50 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
