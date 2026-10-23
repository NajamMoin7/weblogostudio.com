import Image from "next/image";
import Link from "next/link";
import horizontal from "@/public/brand/logo-horizontal.png";
import lockup from "@/public/brand/logo-lockup.png";
import mark from "@/public/brand/logo-mark.png";

/**
 * The approved Web Logo Studio logo, built from logo/logo.jpeg by `npm run brand:assets`
 * (transparent background, artwork colours untouched).
 * - `horizontal` (default): the mark beside the "Weblogo Studio" wordmark, for the header.
 * - `lockup`: the master logo, mark above wordmark.
 * - `mark`: the W/L monogram alone.
 * The artwork is designed for light backgrounds; on forest green, place it on a cream panel.
 * Proportions are always preserved: callers set a height (or width) and the other follows.
 */
const sources = { horizontal, lockup, mark };
const sizes = { horizontal: "256px", lockup: "320px", mark: "96px" };

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
