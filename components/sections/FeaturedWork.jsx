import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Carousel from "@/components/ui/Carousel";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { featuredProjectSlugs, getProject } from "@/data/portfolio";

export default function FeaturedWork() {
  const items = featuredProjectSlugs.map(getProject);
  return (
    <section aria-labelledby="work-title" className="overflow-hidden border-t border-line py-20 lg:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title="Websites, stores and identities, shaped with care."
            intro="These concept projects show how we approach different industries and briefs. They are self-initiated studies, not client work, and are labelled as such."
          />
          <Button href="/portfolio" variant="secondary" arrow className="shrink-0 self-start md:self-auto">
            View Portfolio
          </Button>
        </div>

        <div className="mt-14">
          <Carousel
            label="Featured projects"
            slideClassName="basis-[88%] sm:basis-[72%] lg:basis-[58%]"
            dimInactive
            options={{ containScroll: false }}
          >
            {items.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
