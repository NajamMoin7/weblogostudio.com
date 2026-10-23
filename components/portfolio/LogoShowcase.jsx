import Image from "next/image";
import Link from "next/link";
import Marquee from "@/components/ui/Marquee";
import MarqueeGroup from "@/components/portfolio/MarqueeGroup";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { work } from "@/data/work";

function LogoTile({ item }) {
  const img = item.thumbnail;
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group relative block size-36 overflow-hidden rounded-xl border border-line shadow-card transition-[border-color,transform,box-shadow] duration-300 ease-out-quint hover:-translate-y-1 hover:border-line-strong hover:shadow-lift sm:size-44"
      style={{ background: item.background ?? "#ffffff" }}
    >
      <Image
        src={img.src}
        alt={`${item.displayTitle} logo`}
        fill
        sizes="176px"
        className="object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />
      <span className="absolute inset-x-0 bottom-0 translate-y-full bg-forest/90 px-3 py-2 text-[0.7rem] font-medium text-cream backdrop-blur-sm transition-transform duration-300 ease-out-quint group-hover:translate-y-0 group-focus-visible:translate-y-0">
        <span className="block truncate">{item.displayTitle}</span>
      </span>
    </Link>
  );
}

/** Two counter-moving rows of real logos from the migrated portfolio. */
export default function LogoShowcase({
  eyebrow = "Logo design",
  title = "Marks built to be remembered.",
  intro,
  limit = 40,
}) {
  // Logos with a client name from the source first; then the rest, in source order.
  const logos = work.filter((w) => w.category === "logos");
  const named = logos.filter((w) => w.titleSource === "source");
  const pool = [...named, ...logos.filter((w) => w.titleSource !== "source")].slice(0, limit);
  const half = Math.ceil(pool.length / 2);
  const rows = [pool.slice(0, half), pool.slice(half)];

  return (
    <section aria-labelledby="logos-title" className="overflow-hidden border-t border-line py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="logos-title"
            eyebrow={eyebrow}
            title={title}
            intro={intro ?? `${logos.length} logos across ${new Set(logos.map((l) => l.subcategory)).size} industries, from abstract marks to mascots.`}
          />
          <Button href="/portfolio?category=logos" variant="secondary" arrow className="shrink-0 self-start md:self-auto">
            Browse All Logos
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <MarqueeGroup label="logo showcase" controlClassName="container-page">
        {rows.map((row, i) => (
          <Marquee
            key={i}
            label={i === 0 ? "Logo showcase row one" : "Logo showcase row two"}
            direction={i === 0 ? "left" : "right"}
            duration={70}
            itemClassName="px-2.5"
          >
            {row.map((item) => (
              <LogoTile key={item.slug} item={item} />
            ))}
          </Marquee>
        ))}
        </MarqueeGroup>
      </div>
    </section>
  );
}
