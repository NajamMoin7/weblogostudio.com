/**
 * Content for the instant sketch on /99 ("See it with your name"): a template one-page site
 * rendered live in a phone frame from the visitor's business name, trade, look and colours.
 *
 * It is a sketch, and the page says so: sample copy and a stock scene, not the visitor's real
 * site. The real concept is designed by a person after the deposit.
 *
 * The ids here are also the only values /api/checkout accepts for `trade`, `look` and `palette`.
 */

/** Scenes generated in the studio's Magnific project "Web Logo Studio – Website film & preview". */
const img = (name) => `/images/sketch/${name}.webp`;

export const TRADES = [
  {
    id: "plumbing",
    label: "Plumbing & HVAC",
    sample: "Rivera Plumbing",
    image: img("plumbing"),
    headline: "Leaks fixed today.",
    sub: "Upfront prices and same-day visits across town.",
    cta: "Call now",
    services: ["Emergency repairs", "Water heaters", "Drain cleaning"],
    hours: "Mon–Sat · 7am–7pm",
  },
  {
    id: "cleaning",
    label: "Cleaning",
    sample: "Bright Home Cleaning",
    image: img("cleaning"),
    headline: "Come home to clean.",
    sub: "Weekly, fortnightly or one-off cleans, booked in a minute.",
    cta: "Get a quote",
    services: ["Regular home cleans", "Deep cleans", "Move-out cleans"],
    hours: "Mon–Fri · 8am–6pm",
  },
  {
    id: "salon",
    label: "Salon & barber",
    sample: "Studio Nine Hair",
    image: img("salon"),
    headline: "Your best hair day.",
    sub: "Cuts, colour and styling by people who listen first.",
    cta: "Book a chair",
    services: ["Cut & style", "Colour", "Beard & shave"],
    hours: "Tue–Sat · 9am–7pm",
  },
  {
    id: "restaurant",
    label: "Restaurant & café",
    sample: "Oak & Ember Kitchen",
    image: img("restaurant"),
    headline: "Cooked over fire.",
    sub: "A short menu that changes with the season.",
    cta: "Book a table",
    services: ["Dinner", "Weekend brunch", "Private parties"],
    hours: "Wed–Sun · 5pm–10pm",
  },
  {
    id: "auto",
    label: "Auto repair",
    sample: "Northside Auto",
    image: img("auto"),
    headline: "Back on the road.",
    sub: "Honest diagnostics and a price before any work starts.",
    cta: "Call the shop",
    services: ["Brakes & tyres", "Oil & service", "Diagnostics"],
    hours: "Mon–Fri · 8am–6pm",
  },
  {
    id: "clinic",
    label: "Dental & clinic",
    sample: "Harbor Dental",
    image: img("clinic"),
    headline: "Gentle care, close by.",
    sub: "New patients welcome, with evening appointments.",
    cta: "Book a visit",
    services: ["Check-ups", "Whitening", "Emergency visits"],
    hours: "Mon–Thu · 8am–8pm",
  },
  {
    id: "landscaping",
    label: "Landscaping",
    sample: "Mow & Grow",
    image: img("landscaping"),
    headline: "A yard worth showing.",
    sub: "Mowing, planting and clean-ups on a schedule that suits you.",
    cta: "Get a quote",
    services: ["Lawn care", "Planting & beds", "Seasonal clean-ups"],
    hours: "Mon–Sat · 7am–5pm",
  },
  {
    id: "shop",
    label: "Shop or other",
    sample: "Corner Goods",
    image: img("shop"),
    headline: "Open on Main Street.",
    sub: "Everything people need to find you, call you and walk in.",
    cta: "Call us",
    services: ["What we sell", "Opening hours", "How to find us"],
    hours: "Mon–Sat · 9am–6pm",
  },
];

export const LOOKS = [
  { id: "bold", label: "Bold" },
  { id: "clean", label: "Clean" },
  { id: "warm", label: "Warm" },
];

export const SKETCH_PALETTES = [
  { id: "forest", label: "Forest & orange", dark: "#0b4f3c", light: "#fbfbf8", accent: "#f26a1b", onAccent: "#141815" },
  { id: "navy", label: "Navy & gold", dark: "#14264b", light: "#f7f3ea", accent: "#d9b23a", onAccent: "#14264b" },
  { id: "charcoal", label: "Charcoal & red", dark: "#1b1d1f", light: "#f5f5f2", accent: "#e0402b", onAccent: "#ffffff" },
  { id: "plum", label: "Plum & mint", dark: "#3b1f47", light: "#f6f1f7", accent: "#4fc39b", onAccent: "#1d0f24" },
];

/** The "Clean" look's fixed neutrals: a white customer site, whatever palette is picked. */
export const SKETCH_NEUTRALS = {
  ground: "#ffffff",
  ink: "#16181a",
  soft: "#4d5357",
  line: "rgb(22 24 26 / 0.14)",
  panel: "#f3f4f2",
};

export const tradeIds99 =TRADES.map((t) => t.id);
export const lookIds99 = LOOKS.map((l) => l.id);
export const paletteIds99 = SKETCH_PALETTES.map((p) => p.id);

/**
 * The sketch a buyer started from, read back from Stripe session metadata. Returns null when the
 * order did not come from the sketch. Every value is re-checked against the whitelists.
 */
export function readSketch(metadata) {
  const trade = TRADES.find((t) => t.id === metadata?.trade);
  const look = LOOKS.find((l) => l.id === metadata?.look);
  const palette = SKETCH_PALETTES.find((p) => p.id === metadata?.palette);
  if (!trade || !look) return null;
  const biz = cleanBizName(metadata?.biz);
  return {
    biz,
    trade: trade.label,
    look: look.label,
    palette: palette?.label ?? "",
    summary: [biz, trade.label, `${look.label} look`, palette?.label].filter(Boolean).join(" · "),
  };
}

export const BIZ_MAX = 48;

/**
 * A business name as typed by a visitor, made safe to store and show: control characters and
 * angle brackets removed, whitespace collapsed, capped at BIZ_MAX. Returns "" when nothing is left.
 */
export function cleanBizName(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, BIZ_MAX);
}
