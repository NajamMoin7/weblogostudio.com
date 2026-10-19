import SectionHeading from "@/components/ui/SectionHeading";
import { expectations } from "@/data/content";

export default function Expectations() {
  return (
    <section aria-labelledby="expect-title" className="border-y border-line bg-surface py-20 lg:py-32">
      <div className="container-page">
        <SectionHeading
          id="expect-title"
          eyebrow="Working with us"
          title="What to expect when you work with us."
          intro="Commitments we make on every project, whatever its size."
        />
        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {expectations.map((e, i) => (
            <li key={e.title} className="reveal border-t border-line-strong pt-6">
              <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-semibold text-fg">{e.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{e.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
