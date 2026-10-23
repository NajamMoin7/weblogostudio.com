import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Carousel from "@/components/ui/Carousel";
import WorkCard from "@/components/work/WorkCard";
import { featuredWork, work, workIndex } from "@/data/work";

/** Home page showcase of hand-picked migrated projects (see data/work-featured.js). */
export default function FeaturedWork() {
  const featured = new Set(featuredWork().map((w) => w.slug));
  const items = workIndex().filter((w) => featured.has(w.slug));
  // Keep the curated order.
  const order = featuredWork().map((w) => w.slug);
  items.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));

  return (
    <section aria-labelledby="work-title" className="theme-forest overflow-hidden py-20 lg:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title="Logos, identities and websites we have delivered."
            intro={`A few favourites from a portfolio of ${work.length} projects across logo design, branding, graphics, social media and web.`}
          />
          <Button href="/portfolio" variant="secondary" arrow className="shrink-0 self-start md:self-auto">
            View All Projects
          </Button>
        </div>

        <div className="mt-14">
          <Carousel
            label="Featured projects"
            slideClassName="basis-[78%] sm:basis-[46%] lg:basis-[31%]"
            options={{ containScroll: "trimSnaps" }}
          >
            {items.map((item) => (
              <WorkCard key={item.slug} item={item} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 78vw" />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
