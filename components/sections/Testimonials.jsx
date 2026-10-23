import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function TestimonialCard({ testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-8 shadow-card">
      <blockquote className="text-lg leading-relaxed text-fg">
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <figcaption className="mt-8 border-t border-line pt-5 text-sm">
        <span className="block font-semibold text-fg">{testimonial.name}</span>
        <span className="text-muted">
          {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Renders verified testimonials from data/testimonials.js.
 * Returns `fallback` (or nothing) when there are none, so no quote is ever invented.
 */
export default function Testimonials({ fallback = null }) {
  if (!testimonials.length) return fallback;
  return (
    <section aria-labelledby="testimonials-title" className="py-20 lg:py-32">
      <div className="container-page">
        <SectionHeading id="testimonials-title" eyebrow="Client words" title="What clients say about working with us." />
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={`${t.name}-${t.company}`}>
              <TestimonialCard testimonial={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
