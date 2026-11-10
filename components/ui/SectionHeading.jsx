/**
 * Splits a string into words that rise into place when the heading scrolls into view
 * (see .reveal-words in globals.css). Non-string titles render as-is.
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
 * Section heading: condensed display title and an optional intro. No kicker above the title;
 * the heading carries its own weight. (`eyebrow` is accepted for compatibility and ignored.)
 */
export default function SectionHeading({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  align = "left",
  size = "md",
  className = "",
  id,
}) {
  const centered = align === "center";
  const scale =
    size === "lg"
      ? "text-[clamp(2.4rem,6vw,5rem)] leading-[0.95]"
      : "text-[clamp(2rem,4.6vw,3.6rem)] leading-[0.98]";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Tag
        id={id}
        className={`font-display-wide font-bold ${scale}`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`mt-5 max-w-2xl text-[1.06rem] leading-relaxed text-muted ${centered ? "mx-auto" : ""}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
