import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ServiceShowcase from "@/components/services/ServiceShowcase";
import { featuredOverrides, featuredServiceSlugs, getService } from "@/data/services";
import { getAsset } from "@/lib/assets";

export default function FeaturedServices() {
  const items = featuredServiceSlugs.map(getService).map((s) => ({
    slug: s.slug,
    title: featuredOverrides[s.slug]?.title ?? s.title,
    summary: featuredOverrides[s.slug]?.summary ?? s.summary,
    icon: s.icon,
    image: getAsset(`service-${s.slug}`),
  }));
  return (
    <section aria-labelledby="services-title" className="overflow-x-clip py-24 lg:py-36">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Services"
            title="Everything your brand needs to look the part online."
          />
          <Button href="/services" variant="secondary" arrow className="shrink-0 self-start md:self-auto">
            All 14 Services
          </Button>
        </div>
        <div className="mt-14">
          <ServiceShowcase items={items} />
        </div>
      </div>
    </section>
  );
}
