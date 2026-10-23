import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const LABELS = {
  logos: "Logo",
  "graphic-design": "Graphic Design",
  "web-design": "Web Design",
  branding: "Branding",
  "ui-ux": "UI/UX & Apps",
  "social-media": "Social Media",
};

/** Very tall full-page website shots are shown from the top in a 4:5 frame (display only). */
function frameFor(thumb) {
  const ratio = thumb.height / thumb.width;
  if (ratio > 1.35) return { aspectRatio: "4 / 5", fit: "object-cover object-top" };
  return { aspectRatio: `${thumb.width} / ${thumb.height}`, fit: "object-contain" };
}

/**
 * Portfolio card for a migrated project. Works in server and client components.
 * Hover/focus: image zoom, title emphasis, arrow movement and a soft lift. The whole card is one link.
 */
export default function WorkCard({ item, sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw", priority = false, headingLevel = "h3" }) {
  const Heading = headingLevel;
  const frame = frameFor(item.thumb);
  const label = LABELS[item.category] ?? item.category;
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group block rounded-xl transition-transform duration-300 ease-out-quint hover:-translate-y-1 focus-visible:-translate-y-1"
    >
      <div
        className="relative overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-[border-color,box-shadow] duration-300 ease-out-quint group-hover:border-line-strong group-hover:shadow-lift"
        style={{ aspectRatio: frame.aspectRatio, background: item.bg ?? undefined }}
      >
        <Image
          src={item.thumb.src}
          alt={`${item.title}, ${label.toLowerCase()} by Web Logo Studio`}
          fill
          sizes={sizes}
          priority={priority}
          className={`${frame.fit} transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]`}
        />
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-orange-strong text-white shadow-card transition-[opacity,transform,background-color,color] duration-300 ease-out-quint [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3 px-0.5">
        <Heading className="min-w-0 truncate text-[0.95rem] font-semibold text-fg transition-colors duration-200 group-hover:text-cyan">
          {item.title}
        </Heading>
        <span className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-subtle">
          {item.subcategory && item.category === "logos" ? item.subcategory.split(/[,&]/)[0].trim() : label}
        </span>
      </div>
    </Link>
  );
}
