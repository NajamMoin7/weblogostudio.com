/**
 * CONCEPT illustrations (fictional businesses), used only for decorative coded mockups in the
 * home hero, the Why us section and service illustrations. They are labelled "Concept work"
 * where shown and are NOT part of the portfolio. The real portfolio lives in data/work.js.
 */

export const portfolioCategories = [
  { id: "website-design", label: "Website Design" },
  { id: "website-development", label: "Website Development" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "logo-design", label: "Logo Design" },
  { id: "branding", label: "Branding" },
  { id: "graphic-design", label: "Graphic Design" },
];

export const projects = [
  {
    slug: "northfold-coffee-roasters",
    name: "Northfold Coffee Roasters",
    concept: true,
    sector: "Specialty coffee",
    categories: ["branding", "logo-design", "ecommerce"],
    services: ["brand-identity", "logo-design", "ecommerce-development"],
    summary:
      "An identity and online shop for a small-batch roaster, built around a folded-mountain mark and warm, tactile colour.",
    palette: { bg: "#1d2a22", surface: "#e9dfc8", accent: "#c8642c", ink: "#0f1411", text: "#f4efe3" },
    brand: { mark: "fold", letter: "N", wordmark: "NORTHFOLD", domain: "northfold.example" },
    headline: "Small-batch coffee, roasted for slow mornings.",
    cover: "brand",
    overview:
      "Northfold is an imagined specialty roaster selling single-origin beans online and through local cafés. The concept explores how a young coffee brand can feel crafted and premium without leaning on the usual coffee clichés.",
    objectives: [
      "Create a mark that works on bags, cups, stamps and a favicon",
      "Build a warm palette that stands out on a crowded shelf",
      "Design a shop where origin stories help people choose",
      "Keep subscription sign-up simple on mobile",
    ],
    direction:
      "The mark folds the letter N into a mountain ridge, a nod to the brand name and the high-altitude farms the beans come from. Deep forest green and cream give a calm base, while a copper accent marks roast levels and calls to action.",
    approach: [
      { title: "Identity system", text: "Primary mark, wordmark and a roast-level stamp system that labels each bag at a glance." },
      { title: "Packaging direction", text: "A modular label layout that keeps origin, process and tasting notes in consistent places." },
      { title: "Shop experience", text: "Product pages lead with taste and origin, with grind and size choices kept in one clear row." },
      { title: "Subscriptions", text: "A three-step subscription flow designed for thumbs, with clear frequency and pause options." },
    ],
    gallery: [
      { kind: "brand", caption: "Primary mark and colour palette" },
      { kind: "shop", caption: "Online shop product listing" },
      { kind: "print", caption: "Packaging label and stamp system" },
      { kind: "mobile", caption: "Mobile shop experience" },
    ],
    outcome: null,
  },
  {
    slug: "lumen-dental-studio",
    name: "Lumen Dental Studio",
    concept: true,
    sector: "Healthcare",
    categories: ["website-design", "website-development"],
    services: ["website-design", "website-development", "seo"],
    summary:
      "A calm, reassuring website for a family dental practice, designed to make booking an appointment feel easy.",
    palette: { bg: "#f3f7fa", surface: "#ffffff", accent: "#2a9d99", ink: "#0f3b5f", text: "#0f3b5f" },
    brand: { mark: "arc", letter: "L", wordmark: "Lumen", domain: "lumendental.example" },
    headline: "Calm, modern dentistry for the whole family.",
    cover: "web",
    overview:
      "Lumen is an imagined dental practice whose patients often feel anxious before a visit. The concept focuses on a website that reassures first and sells second, while keeping booking one tap away.",
    objectives: [
      "Reduce anxiety with a calm, human tone and gentle visuals",
      "Make treatments and pricing information easy to find",
      "Put appointment booking within reach on every page",
      "Build strong local search foundations",
    ],
    direction:
      "Soft white space, a deep navy for trust and a mint accent for freshness. Rounded shapes echo the arc in the logo, and photography direction favours natural light and real smiles over clinical close-ups.",
    approach: [
      { title: "Information architecture", text: "Treatments grouped by patient need, such as routine care, cosmetic and emergency." },
      { title: "Booking journey", text: "A persistent booking button and a short form that asks only what the practice needs." },
      { title: "Accessibility", text: "Large type, strong contrast and clear focus states for patients of every age." },
      { title: "Local SEO structure", text: "Individual treatment pages with unique metadata and structured data for the practice." },
    ],
    gallery: [
      { kind: "web", caption: "Home page on desktop" },
      { kind: "mobile", caption: "Mobile home page with booking button" },
      { kind: "brand", caption: "Logo and colour palette" },
    ],
    outcome: null,
  },
  {
    slug: "atlas-freight",
    name: "Atlas Freight",
    concept: true,
    sector: "Logistics",
    categories: ["website-design", "website-development"],
    services: ["website-redesign", "website-development", "ui-ux-design"],
    summary:
      "A redesign concept for a freight forwarder, replacing a cluttered legacy site with a clear, quote-led experience.",
    palette: { bg: "#0d1b2a", surface: "#1b2c3f", accent: "#f2b705", ink: "#0d1b2a", text: "#e7ecef" },
    brand: { mark: "chevron", letter: "A", wordmark: "ATLAS", domain: "atlasfreight.example" },
    headline: "Freight forwarding without the guesswork.",
    cover: "web",
    overview:
      "Atlas is an imagined mid-sized freight company whose old website had grown into dozens of disconnected pages. This redesign concept restructures the site around the questions shippers actually ask.",
    objectives: [
      "Simplify navigation from dozens of pages to a clear service structure",
      "Make requesting a freight quote the primary action",
      "Modernise the visual identity while respecting brand recognition",
      "Plan URL redirects to protect existing search visibility",
    ],
    direction:
      "A deep navy base communicates reliability, with a signal-yellow accent borrowed from hazard markings and shipping labels. Strong typography and generous spacing replace the dense layout of the original.",
    approach: [
      { title: "Content audit", text: "Every legacy page mapped, merged or retired, with a redirect plan for each URL." },
      { title: "Quote-first UX", text: "A multi-step quote form that collects route, cargo and timing without overwhelming users." },
      { title: "Service templates", text: "Reusable templates for air, sea and road freight pages." },
      { title: "Performance", text: "A static-first build with optimised imagery for fast loads on site and in the warehouse." },
    ],
    gallery: [
      { kind: "web", caption: "Redesigned home page" },
      { kind: "mobile", caption: "Mobile quote journey" },
      { kind: "brand", caption: "Refreshed mark and palette" },
    ],
    outcome: null,
  },
  {
    slug: "verdant-botanics",
    name: "Verdant Botanics",
    concept: true,
    sector: "Skincare retail",
    categories: ["ecommerce", "website-design"],
    services: ["ecommerce-development", "website-design", "brand-identity"],
    summary:
      "An online store concept for a botanical skincare brand, pairing editorial product storytelling with a quick checkout.",
    palette: { bg: "#ede7df", surface: "#f8f5f0", accent: "#c98b74", ink: "#2f4a3a", text: "#2f4a3a" },
    brand: { mark: "leaf", letter: "V", wordmark: "Verdant", domain: "verdant.example" },
    headline: "Botanical skincare, made in small batches.",
    cover: "shop",
    overview:
      "Verdant is an imagined skincare brand with a small, considered product range. The concept explores an e-commerce experience that feels like a beautiful magazine but shops like a modern store.",
    objectives: [
      "Present ingredients and rituals with an editorial feel",
      "Help shoppers filter by skin type and concern",
      "Keep checkout short and familiar",
      "Design product templates the team can reuse for new launches",
    ],
    direction:
      "Warm stone neutrals, a botanical green and a clay accent create a quiet, natural palette. Product photography direction focuses on texture and shadow, with plenty of space around each item.",
    approach: [
      { title: "Collection structure", text: "Shop by routine, skin type or concern, with filters that update instantly." },
      { title: "Product pages", text: "Ingredients, how-to-use and size options arranged so the add-to-bag button is never far away." },
      { title: "Checkout", text: "Designed around the platform's secure hosted checkout to keep payment handling safe." },
      { title: "Mobile-first", text: "Sticky add-to-bag, thumb-friendly filters and lightweight images for mobile shoppers." },
    ],
    gallery: [
      { kind: "shop", caption: "Collection page with filters" },
      { kind: "mobile", caption: "Mobile product page" },
      { kind: "brand", caption: "Wordmark and palette" },
    ],
    outcome: null,
  },
  {
    slug: "kinetic-fitness-club",
    name: "Kinetic Fitness Club",
    concept: true,
    sector: "Fitness",
    categories: ["logo-design", "branding", "graphic-design"],
    services: ["logo-design", "social-media-design", "graphic-design"],
    summary:
      "A high-energy logo and social media system for a strength-training gym, designed to stop the scroll.",
    palette: { bg: "#111111", surface: "#1c1c1c", accent: "#d4ff3a", ink: "#111111", text: "#f2f2f2" },
    brand: { mark: "bolt", letter: "K", wordmark: "KINETIC", domain: "kinetic.example" },
    headline: "Train with intent.",
    cover: "social",
    overview:
      "Kinetic is an imagined independent gym focused on strength training and small-group classes. The concept delivers a bold mark and a set of social templates that let the team post consistently every week.",
    objectives: [
      "Create a bold, energetic mark that works on apparel and signage",
      "Build a recognisable social media look",
      "Give the team templates for class schedules, tips and announcements",
      "Keep everything legible at small feed sizes",
    ],
    direction:
      "High-contrast black with an electric lime accent gives the brand instant presence. The K is cut on a forward angle to suggest momentum, and heavy condensed type carries short, punchy headlines.",
    approach: [
      { title: "Logo", text: "A slanted K monogram and wordmark, tested on apparel, signage and app icons." },
      { title: "Social system", text: "Templates for schedules, member spotlights, tips and promotions with a strict grid." },
      { title: "Campaign graphics", text: "A launch campaign set across posts, stories and print posters." },
      { title: "Editable templates", text: "Canva-ready versions so staff can create new posts in minutes." },
    ],
    gallery: [
      { kind: "social", caption: "Social media template system" },
      { kind: "brand", caption: "Monogram and colour palette" },
      { kind: "print", caption: "Poster and membership card" },
    ],
    outcome: null,
  },
  {
    slug: "orbit-analytics",
    name: "Orbit Analytics",
    concept: true,
    sector: "Software",
    categories: ["website-development", "website-design"],
    services: ["nextjs-development", "landing-page-design", "ui-ux-design"],
    summary:
      "A Next.js marketing site and product landing page concept for an analytics startup preparing to launch.",
    palette: { bg: "#0b0f1e", surface: "#151a2e", accent: "#7c5cff", ink: "#0b0f1e", text: "#e6e8f2" },
    brand: { mark: "orbit", letter: "O", wordmark: "orbit", domain: "orbit.example" },
    headline: "See every metric that matters in one place.",
    cover: "web",
    overview:
      "Orbit is an imagined analytics product for small teams. The concept covers a launch landing page and a scalable marketing site built with Next.js, ready to grow alongside the product.",
    objectives: [
      "Explain a technical product in plain language",
      "Capture early-access sign-ups before launch",
      "Build a component library shared by marketing and product",
      "Achieve fast load times with server-rendered pages",
    ],
    direction:
      "A deep space-navy interface with a single violet accent keeps the focus on product screenshots. Interface illustrations are built from real UI components rather than abstract shapes.",
    approach: [
      { title: "Landing page", text: "Problem, product, proof points and a sign-up form in a clear, scannable sequence." },
      { title: "Next.js architecture", text: "App Router, static generation for marketing pages and server components by default." },
      { title: "Component library", text: "Buttons, cards, pricing tables and feature blocks shared across the site." },
      { title: "Technical SEO", text: "Metadata, Open Graph images, a sitemap and structured data generated from content." },
    ],
    gallery: [
      { kind: "web", caption: "Launch landing page" },
      { kind: "mobile", caption: "Mobile landing page" },
      { kind: "brand", caption: "Orbit mark and interface palette" },
    ],
    outcome: null,
  },
  {
    slug: "halden-architects",
    name: "Halden & Co. Architects",
    concept: true,
    sector: "Architecture",
    categories: ["branding", "logo-design", "website-design"],
    services: ["brand-identity", "logo-design", "website-design"],
    summary:
      "A restrained identity and portfolio website for an architecture studio where the buildings do the talking.",
    palette: { bg: "#f1eee9", surface: "#ffffff", accent: "#8c7b6b", ink: "#1a1a1a", text: "#1a1a1a" },
    brand: { mark: "frame", letter: "H", wordmark: "HALDEN & CO.", domain: "halden.example" },
    headline: "Buildings shaped by light, material and place.",
    cover: "brand",
    overview:
      "Halden & Co. is an imagined residential architecture studio. The concept pairs a quiet, architectural identity with a portfolio website designed to give large project photography room to breathe.",
    objectives: [
      "Create an identity as considered as the studio's buildings",
      "Design a portfolio that puts photography first",
      "Present projects with consistent, detailed case studies",
      "Produce stationery for proposals and planning documents",
    ],
    direction:
      "A monogram built from a simple frame, set beside a widely spaced wordmark. Warm paper tones, near-black text and a single earth accent reference materials such as timber and stone.",
    approach: [
      { title: "Monogram", text: "An H drawn as a door frame, used as a stamp on drawings and documents." },
      { title: "Typography", text: "A precise sans serif with generous tracking for headings and a readable text face." },
      { title: "Portfolio website", text: "Full-bleed imagery, project facts in a consistent sidebar and minimal navigation." },
      { title: "Stationery", text: "Letterhead, proposal covers and drawing title blocks using a shared grid." },
    ],
    gallery: [
      { kind: "brand", caption: "Monogram and wordmark" },
      { kind: "web", caption: "Portfolio website home page" },
      { kind: "print", caption: "Stationery and business card" },
    ],
    outcome: null,
  },
  {
    slug: "saffron-table",
    name: "Saffron Table",
    concept: true,
    sector: "Hospitality",
    categories: ["branding", "graphic-design", "logo-design"],
    services: ["brand-identity", "graphic-design", "social-media-design"],
    summary:
      "A warm restaurant identity with menus, signage and social graphics inspired by spice markets and shared tables.",
    palette: { bg: "#2b1a12", surface: "#3a251a", accent: "#f2a93b", ink: "#2b1a12", text: "#f6eedf" },
    brand: { mark: "sun", letter: "S", wordmark: "Saffron", domain: "saffrontable.example" },
    headline: "Shared plates, slow evenings.",
    cover: "print",
    overview:
      "Saffron Table is an imagined neighbourhood restaurant serving sharing plates. The concept builds a warm, generous identity that carries from the front door to the menu and onto social media.",
    objectives: [
      "Create an inviting identity with a sense of place",
      "Design menus that are easy to read in low light",
      "Build social templates for specials and events",
      "Keep print costs sensible with a two-colour system",
    ],
    direction:
      "A saffron-gold sunburst mark on deep spice brown, with a cream paper stock. Rounded serif-inspired lettering in the wordmark feels hospitable without becoming fussy.",
    approach: [
      { title: "Identity", text: "Sunburst mark, wordmark and a pattern drawn from the mark's rays." },
      { title: "Menus", text: "Clear hierarchy, generous line spacing and high contrast for dim dining rooms." },
      { title: "Signage and print", text: "Window decals, table cards and gift vouchers in a two-colour print palette." },
      { title: "Social media", text: "Templates for weekly specials, events and behind-the-scenes posts." },
    ],
    gallery: [
      { kind: "print", caption: "Menu and table card" },
      { kind: "brand", caption: "Sunburst mark and palette" },
      { kind: "social", caption: "Social media templates" },
    ],
    outcome: null,
  },
];

export const featuredProjectSlugs = [
  "northfold-coffee-roasters",
  "lumen-dental-studio",
  "verdant-botanics",
  "kinetic-fitness-club",
  "orbit-analytics",
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getCategoryLabel(id) {
  return portfolioCategories.find((c) => c.id === id)?.label ?? id;
}

export function getProjectsForService(service, limit = 3) {
  const matches = projects.filter(
    (p) =>
      p.services.includes(service.slug) ||
      p.categories.some((c) => service.portfolioCategories.includes(c)),
  );
  // Prefer projects that list the service directly.
  matches.sort(
    (a, b) => Number(b.services.includes(service.slug)) - Number(a.services.includes(service.slug)),
  );
  return matches.slice(0, limit);
}

export function getRelatedProjects(project, limit = 3) {
  return projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({ p, score: p.categories.filter((c) => project.categories.includes(c)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}
