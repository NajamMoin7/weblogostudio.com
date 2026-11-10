/**
 * Content for the /99 Meta-ads landing page.
 *
 * REVIEWS: real customer reviews only. Leave the array empty until a customer has given
 * permission to publish their words; while it is empty the reviews section is not rendered.
 * Shape: { quote: "Exact words.", name: "First name or full name", business: "Business name", source?: "Google" }
 */
export const reviews99 = [];

/**
 * The offer's money, in one place. Stripe charges `deposit` (lib/stripe.js reads it), and all
 * copy on /99, the pay buttons and the Pixel values derive from these numbers.
 */
export const pricing99 = { total: 99, deposit: 20, balance: 79 };

/**
 * Domain and hosting, offered separately from the $99. Set the real prices here (strings as
 * they should read, e.g. "$15/year"). While a value is null the page says "priced separately".
 */
export const domainHosting99 = { domain: null, hosting: null };

/** Short, human order reference from a Stripe Checkout Session ID, e.g. "WLS-7F3K9QX2". */
export function orderRef(sessionId = "") {
  return `WLS-${sessionId.replace(/^cs_(test|live)_/, "").slice(-8).toUpperCase()}`;
}

/** Desktop hero phone on /99 (not repeated in the six below). */
export const heroSite = { slug: "urban-health-group-web-design", industry: "Health clinic" };

/**
 * "Pick a style": portfolio sites shown in phone frames. A visitor can start checkout with one of
 * these as the style for THEIR new site (sent as `style`, whitelisted by /api/checkout).
 * Slugs must exist in data/portfolio-items.json.
 */
export const exampleSites = [
  { slug: "alco-plumbing-and-heating-web-design", industry: "Plumbing & heating" },
  { slug: "myopia-kids-eye-care-web-design", industry: "Eye clinic" },
  { slug: "split-slab-tiling-web-design", industry: "Tiling contractor" },
  { slug: "sea-of-strengths-kung-fu-academy-web-design", industry: "Martial arts school" },
  { slug: "elcpa-accounting-and-taxation-web-design", industry: "Accounting firm" },
  { slug: "tieup-yacht-charters-web-design", industry: "Yacht charters" },
];

/** The only values /api/checkout accepts for `style`. */
export const styleSlugs99 = exampleSites.map((s) => s.slug);

export const steps99 = [
  { stamp: "0:00", title: `Start for $${pricing99.deposit}`, text: "Secure checkout by Stripe. Takes about a minute." },
  { stamp: "0:05", title: "Send your info", text: "Business name, hours, address, logo and a few photos, on one short form." },
  { stamp: "2:00", title: "First concept in 2 hrs", text: "Your one-page site, designed and ready to review on your phone." },
  { stamp: "Done", title: `Approve, go live, pay the remaining $${pricing99.balance}`, text: "Two rounds of changes are included. Your site goes live within 1 hour of approval." },
];

export const included99 = [
  "One mobile-ready page",
  "Up to 5 sections",
  "Tap-to-call button",
  "Map and directions",
  "Opening hours",
  "Reviews section",
  "2 rounds of changes",
];

export const faqs99 = [
  {
    q: "Are the domain and hosting included?",
    a: `No. The $${pricing99.total} covers designing and building your one-page site. To go live it needs a domain (your web address) and hosting. We offer both separately${
      domainHosting99.domain && domainHosting99.hosting ? ` (domain ${domainHosting99.domain}, hosting ${domainHosting99.hosting})` : ""
    }, or we can connect a domain you already own.`,
  },
  {
    q: "What if I want changes?",
    a: "Two rounds of changes are included after your first concept. Send your notes and we revise. Extra rounds or additional pages can be quoted separately before any work is done.",
  },
  {
    q: "How does the refund work?",
    a: `If you don't love your first concept, tell us within 24 hours of receiving it and we refund your full $${pricing99.deposit} deposit. The remaining $${pricing99.balance} is charged to the card you paid with only after you approve your design.`,
  },
];
