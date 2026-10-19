import Image from "next/image";
import Link from "next/link";
import wordmark from "@/public/brand/logo-wordmark.png";
import lockup from "@/public/brand/logo-lockup.png";

/**
 * The real Web Logo Studio logo, extracted from logo/logo.jpeg with a transparent background.
 * `variant="wordmark"` (WEBLOGO + STUDIO) suits the header, where the tagline would be too small to read.
 * `variant="lockup"` is the complete logo including "Brands for a brighter web".
 * Proportions are always preserved: callers set a height and the width follows.
 */
export default function Logo({ variant = "wordmark", className = "h-9 w-auto", priority = false, link = true }) {
  const src = variant === "lockup" ? lockup : wordmark;
  const img = (
    <Image
      src={src}
      alt="Web Logo Studio"
      priority={priority}
      className={className}
      sizes={variant === "lockup" ? "320px" : "180px"}
    />
  );
  if (!link) return img;
  return (
    <Link href="/" aria-label="Web Logo Studio home" className="inline-flex shrink-0 items-center rounded-sm">
      {img}
    </Link>
  );
}
