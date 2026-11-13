import SpotlightStage from "@/components/sections/SpotlightStage";
import { getService, serviceHref } from "@/data/services";

/** The four services people come to us for first, each with a short label for its pill. */
const PICKS = [
  { slug: "logo-design", label: "Logos" },
  { slug: "website-design", label: "Websites" },
  { slug: "brand-identity", label: "Branding" },
  { slug: "social-media-design", label: "Social" },
];

/**
 * Home: a stage lamp that swings to whichever service you pick. Server wrapper so the big
 * services file stays out of the client bundle; the stage only gets the four rows it shows.
 */
export default function Spotlight() {
  const items = PICKS.map(({ slug, label }) => {
    const s = getService(slug);
    return { slug, label, title: s.title, summary: s.summary, href: serviceHref(slug) };
  });

  return (
    <section aria-labelledby="spotlight-title" className="theme-charcoal py-16 lg:py-24">
      <div className="container-page">
        <h2 id="spotlight-title" className="eyebrow text-center text-subtle">
          What we make
        </h2>
        <SpotlightStage items={items} />
      </div>
    </section>
  );
}
