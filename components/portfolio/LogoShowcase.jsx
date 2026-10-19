import Link from "next/link";
import Mark from "@/components/visuals/Mark";
import Carousel from "@/components/ui/Carousel";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/portfolio";

function LogoCard({ project }) {
  const p = project.palette;
  const swatches = [p.bg, p.surface, p.accent, p.ink].filter((c, i, a) => a.indexOf(c) === i);
  return (
    <article
      className="group relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-xl border border-line bg-surface p-6 transition-[border-color] duration-500 ease-out-quint hover:border-line-strong focus-within:border-line-strong"
      style={{ "--brand-bg": p.bg, "--brand-fg": p.text, "--brand-accent": p.accent }}
    >
      {/* The card cross-fades into the project's own palette on hover or keyboard focus. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[var(--brand-bg)] opacity-0 transition-opacity duration-500 ease-out-quint group-hover:opacity-100 group-focus-within:opacity-100"
      />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-subtle transition-colors duration-500 group-hover:text-[var(--brand-fg)] group-focus-within:text-[var(--brand-fg)]">
          {project.sector}
        </span>
        {project.concept && (
          <span className="rounded-sm border border-line-strong px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted transition-colors duration-500 group-hover:border-current group-hover:text-[var(--brand-fg)] group-focus-within:text-[var(--brand-fg)]">
            Concept
          </span>
        )}
      </div>

      <div className="grid place-items-center">
        <span className="text-fg transition-[color,transform] duration-500 ease-out-quint group-hover:scale-105 group-hover:text-[var(--brand-accent)] group-focus-within:text-[var(--brand-accent)]">
          <Mark type={project.brand.mark} color="currentColor" bg={p.bg} className="size-28" />
        </span>
        <p className="font-display-wide mt-5 text-lg font-bold tracking-tight text-fg transition-colors duration-500 group-hover:text-[var(--brand-fg)] group-focus-within:text-[var(--brand-fg)]">
          {project.brand.wordmark}
        </p>
      </div>

      <div className="flex items-end justify-between gap-3">
        <h3 className="text-sm font-medium text-muted transition-colors duration-500 group-hover:text-[var(--brand-fg)] group-focus-within:text-[var(--brand-fg)]">
          <Link href={`/portfolio/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {project.name}
          </Link>
        </h3>
        <ul
          aria-label="Colour palette"
          className="flex gap-1 transition-[opacity,transform] duration-500 ease-out-quint [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          {swatches.map((c) => (
            <li key={c} title={c} className="size-4 rounded-full border border-white/20" style={{ background: c }}>
              <span className="sr-only">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Horizontal showcase of the concept logo marks. Each card links to its case study. */
export default function LogoShowcase({
  eyebrow = "Logo & identity",
  title = "Marks built to be remembered.",
  intro = "A selection of concept marks from our identity studies. Hover or focus a mark to see it in its own palette.",
  filter,
}) {
  const items = projects.filter((p) => (filter ? filter(p) : true));
  return (
    <section aria-labelledby="logos-title" className="overflow-hidden border-t border-line py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading id="logos-title" eyebrow={eyebrow} title={title} intro={intro} />
        <div className="mt-12">
          <Carousel
            label="Logo showcase"
            slideClassName="basis-[72%] xs:basis-[46%] md:basis-[34%] lg:basis-[25%]"
            options={{ dragFree: true }}
          >
            {items.map((p) => (
              <LogoCard key={p.slug} project={p} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
