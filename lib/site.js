/**
 * Central site configuration: business identity, contact details, socials and the shared
 * metadata helper. The address and phone are confirmed business details. The public email
 * stays optional (NEXT_PUBLIC_CONTACT_EMAIL) and is hidden while empty.
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://weblogostudio.com";

const phoneDisplay = "(707) 564-6678";

export const siteConfig = {
  name: "Web Logo Studio",
  legalName: "Web Logo Studio LLC",
  shortName: "Web Logo Studio",
  tagline: "Brands for a brighter web",
  url: rawUrl.replace(/\/$/, ""),
  description:
    "Web Logo Studio LLC designs and builds websites, logos and brand identities for local businesses and growing companies. Based in Hicksville, NY.",
  manager: { name: "Corebyte Media LLC", url: "https://corebytemediallc.com" },
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
    phone: phoneDisplay,
    phoneHref: "tel:+17075646678",
    phoneE164: "+1-707-564-6678",
  },
  address: {
    street: "9 Loretta Lane",
    locality: "Hicksville",
    region: "NY",
    postalCode: "11801",
    country: "US",
  },
  socials: [
    { label: "Instagram", handle: "@_weblogostudio", href: "https://www.instagram.com/_weblogostudio/" },
    { label: "Facebook", handle: "Web Logo Studio", href: "https://www.facebook.com/profile.php?id=61595856567270" },
  ],
};

export const addressLines = [
  siteConfig.address.street,
  `${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`,
];

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`,
)}`;

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
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** LocalBusiness + WebSite structured data, rendered once from the root layout. */
export function businessJsonLd() {
  const { address, contact } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: absoluteUrl("/brand/logo-lockup.png"),
        image: absoluteUrl("/opengraph-image.png"),
        description: siteConfig.description,
        telephone: contact.phoneE164,
        ...(contact.email ? { email: contact.email } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: address.street,
          addressLocality: address.locality,
          addressRegion: address.region,
          postalCode: address.postalCode,
          addressCountry: address.country,
        },
        areaServed: { "@type": "Country", name: "United States" },
        sameAs: siteConfig.socials.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
}
