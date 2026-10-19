/**
 * Splits a string into words that sharpen from a blur one after another when the
 * heading scrolls into view (see .reveal-words in globals.css). Non-string titles render as-is.
 */
export function RevealWords({ text }) {
  if (typeof text !== "string") return text;
  const words = text.split(" ");
  return words.map((word, i) => (
    <span key={i}>
      <span className="rw-word" style={{ "--w": i }}>
        {word}
      </span>
      {i < words.length - 1 ? " " : ""}
    </span>
  ));
}

/**
 * Consistent section heading: spaced mono eyebrow, wide display title, optional intro.
 * The title reveals word by word; eyebrow and intro fade up.
 * `tone="paper"` adapts colours for light sections.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  align = "left",
  tone = "dark",
  className = "",
  id,
}) {
  const centered = align === "center";
  const muted = tone === "paper" ? "text-paper-muted" : "text-muted";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`reveal eyebrow mb-5 flex items-center gap-3 ${muted} ${centered ? "justify-center" : ""}`}>
          <span aria-hidden="true" className="brand-gradient h-px w-8" />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={`font-display-wide text-[clamp(1.85rem,4.2vw,3.25rem)] font-semibold leading-[1.05] ${
          typeof title === "string" ? "reveal-words" : "reveal"
        }`}
      >
        <RevealWords text={title} />
      </Tag>
      {intro && (
        <p className={`reveal mt-5 max-w-2xl text-[1.05rem] leading-relaxed ${muted} ${centered ? "mx-auto" : ""}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
