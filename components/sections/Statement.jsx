const statement =
  "Most businesses do not need more pages. They need a brand people remember and a website that earns trust in seconds. That is what we design.";

const points = [
  { k: "Design-led", v: "Every page and mark starts from how your business should be perceived." },
  { k: "Built for every screen", v: "Phone, tablet and desktop layouts are designed, not squeezed." },
  { k: "Clear and honest", v: "Written proposals, agreed milestones and plain-language updates." },
];

/**
 * Editorial typography section. Words brighten as the paragraph scrolls through the
 * viewport (CSS scroll timeline, no JavaScript). Without support, or with reduced motion,
 * the text is simply fully visible.
 */
export default function Statement() {
  const words = statement.split(" ");
  return (
    <section aria-labelledby="statement-title" className="relative border-t border-line py-24 lg:py-40">
      <div className="container-page">
        <h2 id="statement-title" className="eyebrow mb-10 flex items-center gap-3 text-muted">
          <span aria-hidden="true" className="brand-gradient h-px w-8" />
          Why it matters
        </h2>
        <p className="scroll-words font-display-wide max-w-6xl text-[clamp(1.9rem,4.6vw,4.2rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-fg">
          {words.map((w, i) => (
            <span key={i}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <dl className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-3 lg:mt-24">
          {points.map((p, i) => (
            <div key={p.k} className="reveal">
              <dt className="flex items-baseline gap-3 font-semibold text-fg">
                <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                {p.k}
              </dt>
              <dd className="mt-2 pl-8 leading-relaxed text-muted">{p.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
