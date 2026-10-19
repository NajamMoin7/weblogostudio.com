import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Info } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectVisual from "@/components/visuals/ProjectVisual";
import ProjectCard, { ConceptBadge } from "@/components/portfolio/ProjectCard";
import CtaSection from "@/components/sections/CtaSection";
import { getCategoryLabel, getProject, getRelatedProjects, projects } from "@/data/portfolio";
import { getService, serviceHref } from "@/data/services";
import { pageMetadata } from "@/lib/site";

// Every known slug is prerendered by generateStaticParams. Unknown slugs are allowed to
// block so notFound() can return a genuine 404 status instead of a streamed soft 404.
export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name}${project.concept ? " (Concept)" : ""}`,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
  });
}

function Meta({ label, children }) {
  return (
    <div className="border-t border-line pt-4">
      <dt className="eyebrow text-subtle">{label}</dt>
      <dd className="mt-2 text-fg">{children}</dd>
    </div>
  );
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project, 3);
  const services = project.services.map(getService).filter(Boolean);
  const palette = [
    ["Background", project.palette.bg],
    ["Surface", project.palette.surface],
    ["Accent", project.palette.accent],
    ["Ink", project.palette.ink],
  ];

  return (
    <>
      <section className="border-b border-line">
        <div className="container-page pb-14 pt-10 lg:pt-14">
          <Breadcrumbs
            items={[
              { label: "Portfolio", href: "/portfolio" },
              { label: project.name, href: `/portfolio/${project.slug}` },
            ]}
          />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="rise-in flex flex-wrap items-center gap-3" style={{ "--i": 0 }}>
                {project.concept && <ConceptBadge />}
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-subtle">
                  {project.categories.map(getCategoryLabel).join(" · ")}
                </span>
              </div>
              <h1
                className="rise-in font-display-wide mt-6 text-[clamp(2.3rem,5.6vw,4.4rem)] font-bold leading-[1.02]"
                style={{ "--i": 1 }}
              >
                {project.name}
              </h1>
              <p className="rise-in mt-6 max-w-2xl text-lg leading-relaxed text-muted" style={{ "--i": 2 }}>
                {project.summary}
              </p>
            </div>
            <dl className="rise-in grid grid-cols-2 gap-x-6 gap-y-5 text-sm lg:col-span-5" style={{ "--i": 3 }}>
              <Meta label="Sector">{project.sector}</Meta>
              <Meta label="Type">{project.concept ? "Concept project" : "Client project"}</Meta>
              <div className="col-span-2">
                <Meta label="Services">{services.map((s) => s.navTitle ?? s.title).join(", ")}</Meta>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="container-page pt-10 lg:pt-14">
        <div className="reveal-image overflow-hidden rounded-xl border border-line">
          <ProjectVisual project={project} kind={project.cover} aspect="aspect-[16/9]" sizes="(min-width: 1312px) 1216px, 94vw" />
        </div>
      </div>

      {project.concept && (
        <div className="container-page mt-8">
          <aside className="flex gap-4 rounded-xl border border-line-strong bg-surface-2 p-6">
            <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-violet" />
            <p className="leading-relaxed text-muted">
              <strong className="font-semibold text-fg">This is a concept project.</strong> {project.name} is a fictional
              business. We created this study to demonstrate our process and design thinking. It is not client work, and
              no commercial results are claimed.
            </p>
          </aside>
        </div>
      )}

      <section aria-labelledby="overview-title" className="py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="overview-title" eyebrow="Overview" title="The brief" />
            <p className="mt-6 text-lg leading-relaxed text-muted">{project.overview}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="eyebrow text-subtle">Objectives</h2>
            <ol className="mt-6 space-y-4">
              {project.objectives.map((o, i) => (
                <li key={o} className="flex gap-4 border-t border-line pt-4 text-fg">
                  <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                  {o}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="direction-title" className="border-y border-line bg-surface py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading id="direction-title" eyebrow="Creative direction" title="Look, feel and rationale" />
            <p className="mt-6 text-lg leading-relaxed text-muted">{project.direction}</p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-6" aria-label="Colour palette">
            {palette.map(([name, hex]) => (
              <li key={name}>
                <span
                  className="block aspect-[3/4] rounded-lg border border-line-strong"
                  style={{ background: hex }}
                />
                <span className="mt-3 block text-sm text-fg">{name}</span>
                <span className="font-mono text-xs uppercase text-subtle">{hex}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading id="approach-title" eyebrow="Design and development" title="Our approach" />
          <ol className="mt-14 grid gap-4 md:grid-cols-2">
            {project.approach.map((a, i) => (
              <li key={a.title} className="reveal rounded-xl border border-line p-7">
                <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold text-fg">{a.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{a.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14">
            <h3 className="eyebrow text-subtle">Services delivered</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={serviceHref(s.slug)}
                    className="group inline-flex items-center gap-1.5 rounded-md border border-line-strong px-4 py-2 text-sm text-fg transition-colors hover:border-fg/40"
                  >
                    {s.navTitle ?? s.title}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="gallery-title" className="border-t border-line py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            id="gallery-title"
            eyebrow="Mockups"
            title="Screens and applications"
            intro="Desktop, mobile and brand applications from the concept."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {project.gallery.map((g, i) => (
              <figure key={`${g.kind}-${i}`} className={i === 0 ? "md:col-span-2" : ""}>
                <div className="reveal-image overflow-hidden rounded-xl border border-line">
                  <ProjectVisual
                    project={project}
                    kind={g.kind}
                    aspect={i === 0 ? "aspect-[16/9]" : "aspect-[16/11]"}
                    label={`${project.name}: ${g.caption}`}
                  />
                </div>
                <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-subtle">
                  {String(i + 1).padStart(2, "0")} · {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="outcome-title" className="border-t border-line bg-surface py-16 lg:py-20">
        <div className="container-page grid gap-6 lg:grid-cols-12">
          <h2 id="outcome-title" className="font-display-wide text-2xl font-semibold lg:col-span-4">
            Outcome
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-muted lg:col-span-8">
            {project.outcome ??
              "As a concept project, there are no client results to report. The study demonstrates how we would approach a brief of this kind, from strategy and identity through to responsive design."}
          </p>
        </div>
      </section>

      <section aria-labelledby="related-title" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading id="related-title" eyebrow="More work" title="Related projects" />
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} aspect="aspect-[4/3.2]" showServices={false} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Want something like this for your business?"
        text="Tell us about your brand and goals. We will suggest an approach and send a clear proposal."
      />
    </>
  );
}
