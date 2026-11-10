/**
 * Content for the /99 Meta-ads landing page.
 *
 * REVIEWS: real customer reviews only. Leave the array empty until a customer has given
 * permission to publish their words; while it is empty the reviews section is not rendered.
 * Shape: { quote: "Exact words.", name: "First name or full name", business: "Business name", source?: "Google" }
 */
export const reviews99 = [];

/** Desktop hero phone on /99 (not repeated in the six below). */
export const heroSite = { slug: "urban-health-group-web-design", industry: "Health clinic" };

/** Example sites from the portfolio, shown in phone frames. Slugs must exist in data/portfolio-items.json. */
export const exampleSites = [
  { slug: "alco-plumbing-and-heating-web-design", industry: "Plumbing & heating" },
  { slug: "myopia-kids-eye-care-web-design", industry: "Eye clinic" },
  { slug: "split-slab-tiling-web-design", industry: "Tiling contractor" },
  { slug: "sea-of-strengths-kung-fu-academy-web-design", industry: "Martial arts school" },
  { slug: "elcpa-accounting-and-taxation-web-design", industry: "Accounting firm" },
  { slug: "tieup-yacht-charters-web-design", industry: "Yacht charters" },
];

export const steps99 = [
  { stamp: "0:00", title: "Pay $50", text: "Secure checkout by Stripe. Takes about a minute." },
  { stamp: "0:05", title: "Send your info", text: "Business name, hours, address, logo and a few photos, on one short form." },
  { stamp: "2:00", title: "First concept in 2 hrs", text: "Your one-page site, designed and ready to review on your phone." },
  { stamp: "Done", title: "Approve, go live, pay the remaining $49", text: "Two rounds of changes are included before you approve." },
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
    a: "No. The $99 covers designing and building your one-page site. To go live it needs a domain (your web address) and hosting. We offer both separately, or we can connect a domain you already own.",
  },
  {
    q: "What if I want changes?",
    a: "Two rounds of changes are included after your first concept. Send your notes and we revise. Extra rounds or additional pages can be quoted separately before any work is done.",
  },
  {
    q: "How does the refund work?",
    a: "If you don't love your first concept, tell us and we refund your full $50 deposit. You only pay the remaining $49 after you approve the finished site.",
  },
];
