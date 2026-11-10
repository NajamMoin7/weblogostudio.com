import Image from "next/image";
import Link from "next/link";
import horizontal from "@/public/brand/logo-horizontal.png";
import lockup from "@/public/brand/logo-lockup.png";
import reverse from "@/public/brand/logo-horizontal-reverse.png";
import mark from "@/public/brand/logo-mark.png";

/**
 * The approved Web Logo Studio logo (artwork never redrawn).
 * - `horizontal` (default): mark beside the wordmark, for the header.
 * - `lockup`: mark above wordmark, full colour, for light grounds.
 * - `reverse`: the horizontal logo for dark grounds: strokes in paper white, the orange cut kept.
 * - `mark`: the W/L monogram alone.
 * Proportions are always preserved: callers set a height (or width) and the other follows.
 */
const sources = { horizontal, lockup, reverse, mark };
const sizes = { horizontal: "256px", lockup: "320px", reverse: "256px", mark: "96px" };

export default function Logo({ variant = "horizontal", className = "h-9 w-auto", priority = false, link = true }) {
  const img = (
    <Image
      src={sources[variant] ?? horizontal}
      alt="Web Logo Studio"
      priority={priority}
      className={className}
      sizes={sizes[variant] ?? sizes.horizontal}
    />
  );
  if (!link) return img;
  return (
    <Link href="/" aria-label="Web Logo Studio home" className="inline-flex shrink-0 items-center rounded-sm">
      {img}
    </Link>
  );
}
