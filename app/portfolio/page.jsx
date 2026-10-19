import PageHero from "@/components/sections/PageHero";
import CtaSection from "@/components/sections/CtaSection";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { portfolioCategories, projects } from "@/data/portfolio";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Website design, e-commerce, logo and brand identity concept projects from Web Logo Studio, with case studies showing our approach.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const items = projects.map((p) => ({
    slug: p.slug,
    categories: p.categories,
    card: <ProjectCard project={p} headingLevel="h2" />,
  }));

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Portfolio", href: "/portfolio" }]}
        eyebrow="Portfolio"
        title="Work that shows how we think."
        intro="Websites, online stores, logos and identities. The projects below are self-initiated concept studies for fictional businesses, created to demonstrate our process. Each one is clearly labelled, and none claims client results."
      />
      <section aria-label="Projects" className="py-16 lg:py-24">
        <div className="container-page">
          <PortfolioGrid categories={portfolioCategories} items={items} />
        </div>
      </section>
      <CtaSection
        title="Your project could be next."
        text="We are building our client portfolio with businesses who care about design. Tell us about yours."
      />
    </>
  );
}
