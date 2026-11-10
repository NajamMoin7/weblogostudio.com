import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { work } from "@/data/work";

/**
 * One static wall of real logos from the portfolio, rendered once (no duplicated marquee
 * copies). Named client logos first. Hover lifts the tile and names the client.
 */
export default function LogoShowcase({ title, intro, limit = 12, exclude = [] }) {
  const skip = new Set(exclude);
  const logos = work.filter((w) => w.category === "logos");
  const named = logos.filter((w) => w.titleSource === "source");
  const pool = [...named, ...logos.filter((w) => w.titleSource !== "source")].filter((w) => !skip.has(w.slug)).slice(0, limit);
  const styles = new Set(logos.map((l) => l.subcategory).filter(Boolean)).size;

  return (
    <section aria-labelledby="logos-title" className="border-t border-line py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="logos-title"
            title={title ?? `${logos.length} logos. Here are ${pool.length}.`}
            intro={intro ?? `Wordmarks, emblems and mascots across ${styles} styles, each delivered with full-colour, one-colour and icon versions.`}
          />
          <Link
            href="/portfolio?category=logos"
            className="group inline-flex shrink-0 items-center gap-2 self-start font-semibold underline decoration-line-strong decoration-2 underline-offset-[7px] hover:decoration-orange lg:self-auto"
          >
            Every logo <ArrowRight aria-hidden="true" className="arrow-nudge size-4" />
          </Link>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {pool.map((item) => (
            <li key={item.slug} className="reveal-card bg-surface">
              <Link
                href={`/portfolio/${item.slug}`}
                className="group relative block aspect-square overflow-hidden"
                style={{ background: item.background ?? "#ffffff" }}
              >
                <Image
                  src={item.thumbnail.src}
                  alt={`${item.displayTitle} logo`}
                  fill
                  sizes="(min-width: 1024px) 15vw, (min-width: 640px) 31vw, 48vw"
                  className="object-contain transition-transform duration-700 ease-out-quint group-hover:scale-[1.07]"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-fg px-3 py-2 text-[0.72rem] font-medium text-ink transition-transform duration-300 ease-out-quint group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  {item.displayTitle}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
