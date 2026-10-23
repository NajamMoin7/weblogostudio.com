import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading, { RevealWords } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Gallery from "@/components/work/Gallery";
import WorkCard from "@/components/work/WorkCard";
import CtaSection from "@/components/sections/CtaSection";
import { adjacentWork, galleryImages, getCategory, getWork, relatedWork, work, workIndex } from "@/data/work";
import { pageMetadata } from "@/lib/site";

// Every project is prerendered; unknown slugs get a real 404 from proxy.js.
export const instant = false;

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

const serviceFor = {
  logos: { href: "/services/logo-design", label: "Logo Design" },
  branding: { href: "/services/brand-identity", label: "Brand Identity Design" },
  "graphic-design": { href: "/services/graphic-design", label: "Graphic Design" },
  "social-media": { href: "/services/social-media-design", label: "Social Media Design" },
  "web-design": { href: "/services/website-design", label: "Website Design" },
  "ui-ux": { href: "/services/ui-ux-design", label: "UI/UX Design" },
};

function summaryFor(item, category) {
  if (item.description) return item.description;
  const what = { logos: "Logo design", branding: "Brand identity work", "graphic-design": "Graphic design", "social-media": "Social media design", "web-design": "Website design", "ui-ux": "UI/UX design" }[item.category];
  const parts = [what];
  if (item.subcategory && item.category === "logos") parts.push(`in the ${item.subcategory} category`);
  else if (item.subcategory) parts.push(`(${item.subcategory.toLowerCase()})`);
  return `${parts.join(" ")} from the Web Logo Studio ${category.label.toLowerCase()} portfolio.`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return {};
  const category = getCategory(item.category);
  return {
    ...pageMetadata({ title: `${item.displayTitle} · ${category.label}`, description: summaryFor(item, category), path: `/portfolio/${item.slug}` }),
    openGraph: {
      title: `${item.displayTitle} · ${category.label} | Web Logo Studio`,
      description: summaryFor(item, category),
      url: `/portfolio/${item.slug}`,
      images: [{ url: galleryImages(item)[0].src, width: galleryImages(item)[0].width, height: galleryImages(item)[0].height, alt: item.displayTitle }],
    },
  };
}

export default async function WorkPage({ params }) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  const category = getCategory(item.category);
  const { prev, next, index, total } = adjacentWork(item);
  const relatedSlugs = new Set(relatedWork(item, 8).map((w) => w.slug));
  const related = workIndex().filter((w) => relatedSlugs.has(w.slug));
  const service = serviceFor[item.category];

  return (
    <>
      <section className="border-b border-line">
        <div className="container-page pb-12 pt-10 lg:pt-14">
          <Breadcrumbs
            items={[
              { label: "Portfolio", href: "/portfolio" },
              { label: category.label, href: `/portfolio?category=${category.id}` },
              { label: item.displayTitle, href: `/portfolio/${item.slug}` },
            ]}
          />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="rise-in eyebrow flex items-center gap-3 text-muted" style={{ "--i": 0 }}>
                <span aria-hidden="true" className="brand-gradient h-0.5 w-8 rounded-full" />
                {category.label}
                {item.subcategory ? ` · ${item.subcategory}` : ""}
              </p>
              <h1 className="reveal-words font-display-wide mt-6 text-[clamp(1.9rem,5.2vw,4.2rem)] font-bold leading-[1.02] [overflow-wrap:anywhere]">
                <RevealWords text={item.displayTitle} />
              </h1>
              <p className="rise-in mt-5 max-w-2xl text-lg leading-relaxed text-muted" style={{ "--i": 2 }}>
                {summaryFor(item, category)}
              </p>
            </div>
            <dl className="rise-in grid grid-cols-2 gap-x-6 gap-y-4 text-sm lg:col-span-4" style={{ "--i": 3 }}>
              <div className="border-t border-line pt-3">
                <dt className="eyebrow text-subtle">Category</dt>
                <dd className="mt-1.5 text-fg">{category.label}</dd>
              </div>
              {item.subcategory && (
                <div className="border-t border-line pt-3">
                  <dt className="eyebrow text-subtle">{item.category === "logos" ? "Industry" : "Type"}</dt>
                  <dd className="mt-1.5 text-fg">{item.subcategory}</dd>
                </div>
              )}
              <div className="border-t border-line pt-3">
                <dt className="eyebrow text-subtle">Images</dt>
                <dd className="mt-1.5 text-fg">{item.images.length}</dd>
              </div>
              <div className="border-t border-line pt-3">
                <dt className="eyebrow text-subtle">In {category.label}</dt>
                <dd className="mt-1.5 text-fg">
                  {index} of {total}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section aria-label="Project images" className="py-12 lg:py-16">
        <div className="container-page">
          <Gallery images={galleryImages(item)} title={item.displayTitle} background={item.background} />

          <nav aria-label="More projects in this category" className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/portfolio/${prev.slug}`}
                className="group flex min-w-0 items-center gap-4 rounded-xl border border-line p-5 transition-[border-color,background-color] duration-200 hover:border-line-strong hover:bg-surface"
              >
                <ArrowLeft aria-hidden="true" className="size-5 shrink-0 text-muted transition-transform duration-300 ease-out-quint group-hover:-translate-x-1 group-hover:text-fg" />
                <span className="min-w-0">
                  <span className="eyebrow block text-subtle">Previous</span>
                  <span className="mt-1 block truncate text-fg">{prev.displayTitle}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/portfolio/${next.slug}`}
                className="group flex min-w-0 items-center justify-end gap-4 rounded-xl border border-line p-5 text-right transition-[border-color,background-color] duration-200 hover:border-line-strong hover:bg-surface"
              >
                <span className="min-w-0">
                  <span className="eyebrow block text-subtle">Next</span>
                  <span className="mt-1 block truncate text-fg">{next.displayTitle}</span>
                </span>
                <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-muted transition-transform duration-300 ease-out-quint group-hover:translate-x-1 group-hover:text-fg" />
              </Link>
            )}
          </nav>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line py-20 lg:py-24">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                id="related-title"
                eyebrow={item.subcategory && item.category === "logos" ? item.subcategory : category.label}
                title="More work like this"
              />
              <Button href={`/portfolio?category=${category.id}`} variant="secondary" arrow className="shrink-0 self-start md:self-auto">
                All {category.label}
              </Button>
            </div>
            <ul className="mt-12 columns-2 gap-5 md:columns-3 xl:columns-4">
              {related.map((w) => (
                <li key={w.slug} className="reveal-card mb-6 break-inside-avoid">
                  <WorkCard item={w} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaSection
        title="Want something like this for your business?"
        text={`Tell us about your brand and goals. We will suggest an approach and send a clear proposal${service ? ` for ${service.label.toLowerCase()}` : ""}.`}
        primary={{ label: "Start a Similar Project", href: `/get-a-quote${service ? `?service=${service.href.split("/").pop()}` : ""}` }}
      />
    </>
  );
}
