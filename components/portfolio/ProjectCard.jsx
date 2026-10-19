import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectVisual from "@/components/visuals/ProjectVisual";
import { getCategoryLabel } from "@/data/portfolio";
import { getService } from "@/data/services";

export function ConceptBadge({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border border-line-strong px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted ${className}`}
      title="A self-initiated concept project, not client work"
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-violet" />
      Concept
    </span>
  );
}

export default function ProjectCard({ project, aspect = "aspect-[16/10]", headingLevel = "h3", showServices = true }) {
  const Heading = headingLevel;
  return (
    <article className="group relative">
      <div className="reveal-image overflow-hidden rounded-[10px] border border-line bg-surface">
        <div className="relative">
          <div className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]">
            <ProjectVisual project={project} aspect={aspect} />
          </div>
          {/* Hover reveal on pointer devices; always visible on touch (no hover-only content). */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/85 px-3.5 py-1.5 text-xs font-medium text-fg backdrop-blur-sm transition-[opacity,transform] duration-300 ease-out-quint [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
          >
            <span className="size-1.5 rounded-full bg-cyan" />
            {project.sector} · View project
          </span>
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {project.concept && <ConceptBadge />}
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-subtle">
              {project.categories.map(getCategoryLabel).join(" · ")}
            </p>
          </div>
          <Heading className="mt-3 text-xl font-semibold text-fg">
            <Link href={`/portfolio/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {project.name}
            </Link>
          </Heading>
          <p className="mt-2 max-w-xl leading-relaxed text-muted">{project.summary}</p>
          {showServices && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Services">
              {project.services.map((slug) => (
                <li key={slug} className="rounded-sm bg-surface-2 px-2.5 py-1 text-xs text-muted">
                  {getService(slug)?.navTitle ?? getService(slug)?.title}
                </li>
              ))}
            </ul>
          )}
          <span aria-hidden="true" className="mt-5 inline-block text-sm font-medium text-fg underline decoration-line-strong underline-offset-[6px] transition-colors duration-300 group-hover:decoration-cyan">
            View project
          </span>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-[background-color,color,transform] duration-300 ease-out-quint group-hover:rotate-45 group-hover:bg-fg group-hover:text-ink"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </article>
  );
}
