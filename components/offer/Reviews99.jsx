import { reviews99 } from "@/data/offer99";

/**
 * Reviews for the /99 page. Built and styled, but hidden until real reviews are added to
 * data/offer99.js. Nothing is ever invented: with an empty list this renders nothing.
 */
export default function Reviews99() {
  if (!reviews99.length) return null;
  return (
    <section aria-labelledby="reviews99-title" className="border-t border-line py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <h2 id="reviews99-title" className="font-display-wide text-[clamp(2rem,5vw,3.2rem)] font-bold leading-none">
          What owners said
        </h2>
        <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews99.map((r) => (
            <li key={`${r.name}-${r.business}`} className="border-t-2 border-fg pt-5">
              <figure>
                <blockquote className="text-lg leading-relaxed text-fg">
                  <p>&ldquo;{r.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-fg">{r.name}</span>
                  <span className="text-muted">
                    {" "}
                    · {r.business}
                    {r.source ? ` · via ${r.source}` : ""}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
