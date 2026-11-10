import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Carousel from "@/components/ui/Carousel";
import WorkCard from "@/components/work/WorkCard";
import { featuredWork, work, workIndex } from "@/data/work";

/** Home: hand-picked delivered projects on the away (green) sheet. */
export default function FeaturedWork() {
  const order = featuredWork().map((w) => w.slug);
  const items = workIndex()
    .filter((w) => order.includes(w.slug))
    .sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));

  return (
    <section aria-labelledby="work-title" className="overflow-hidden py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="work-title"
            title="Recent work for roofers, lenders, schools and software teams."
            intro={`Fifteen pieces from ${work.length} delivered projects: logos, identities, websites, apps and campaigns, shown exactly as handed over.`}
          />
          <Button href="/portfolio" variant="secondary" arrow className="shrink-0 self-start md:self-auto">
            Browse the portfolio
          </Button>
        </div>

        <div className="mt-12">
          <Carousel
            label="Featured projects"
            slideClassName="basis-[80%] sm:basis-[46%] lg:basis-[31%]"
            options={{ containScroll: "trimSnaps" }}
          >
            {items.map((item) => (
              <WorkCard key={item.slug} item={item} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 80vw" />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
