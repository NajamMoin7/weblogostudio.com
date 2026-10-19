/**
 * Central site configuration.
 * Contact details and social profiles are intentionally empty until genuine
 * values are supplied. Set them through environment variables (see README).
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://weblogostudio.com";

export const siteConfig = {
  name: "Web Logo Studio",
  shortName: "Web Logo Studio",
  tagline: "Brands for a brighter web",
  url: rawUrl.replace(/\/$/, ""),
  description:
    "Web Logo Studio designs and builds websites, logos and brand identities for businesses that want to look credible, stand apart and grow online.",
  contact: {
    // Shown only when provided. Never hardcode an address that has not been confirmed.
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || null,
  },
  // Add genuine profile URLs only, e.g. { label: "Instagram", href: "https://instagram.com/..." }
  socials: [],
};

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

/** Generated from logo/logo.jpeg; served by app/opengraph-image.png. */
const ogImage = { url: "/opengraph-image.png", width: 1200, height: 630, alt: "Web Logo Studio" };

/** Shared helper so every page gets a canonical URL and consistent social metadata. */
export function pageMetadata({ title, description, path = "/", noIndex = false }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description,
      images: [ogImage.url],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
