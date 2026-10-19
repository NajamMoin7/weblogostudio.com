/**
 * Package framework for the pricing page.
 *
 * PRICES ARE NOT SET. `price` is `null` on every package, so the page shows
 * "Quote on request". To publish a price once it has been approved, set it as a
 * display string, for example: price: "From $1,500".
 *
 * `timeline` is also `null` until approved timelines are agreed; the page then
 * shows "Confirmed in your proposal". Example once approved: timeline: "2 to 3 weeks".
 *
 * Revision allowances are a proposed starting point and are always confirmed in
 * the written proposal for each project.
 */

export const pricingCategories = [
  {
    id: "website-design",
    label: "Website Design",
    serviceSlug: "website-design",
    intro: "Design-only packages, ready for our team or yours to develop.",
    packages: [
      {
        name: "Starter",
        idealFor: "New businesses that need a credible, focused web presence.",
        deliverables: [
          "Up to 5 page designs",
          "Desktop and mobile layouts",
          "Basic style guide (colour, type, buttons)",
          "Contact form design",
        ],
        scope: "Uses your existing logo and supplied content. Copywriting is not included.",
        revisions: "2 rounds of revisions",
        price: null,
        timeline: null,
      },
      {
        name: "Professional",
        idealFor: "Established businesses that want a distinctive, conversion-focused site.",
        highlighted: true,
        deliverables: [
          "Up to 10 page designs",
          "Sitemap and wireframes",
          "Desktop, tablet and mobile layouts",
          "Reusable component library",
          "Interactive prototype",
        ],
        scope: "Includes content structure guidance. Photography and full copywriting are quoted separately.",
        revisions: "3 rounds of revisions",
        price: null,
        timeline: null,
      },
      {
        name: "Premium",
        idealFor: "Organisations with several audiences, services or complex content.",
        deliverables: [
          "Custom page count agreed in discovery",
          "Discovery workshop and UX planning",
          "Full design system with documentation",
          "Interaction and motion specifications",
          "Developer handover session",
        ],
        scope: "Scope is defined during discovery and set out in a detailed proposal.",
        revisions: "Revision rounds agreed per phase",
        price: null,
        timeline: null,
      },
    ],
  },
  {
    id: "website-development",
    label: "Website Development",
    serviceSlug: "website-development",
    intro: "Design and build packages, delivered as a working, responsive website.",
    packages: [
      {
        name: "Starter",
        idealFor: "Small businesses launching their first professional website.",
        deliverables: [
          "Up to 5 responsive pages",
          "Contact form integration",
          "Basic on-page SEO setup",
          "Launch and domain connection",
        ],
        scope: "Built from a refined template-based layout. Content supplied by you.",
        revisions: "2 rounds of revisions",
        price: null,
        timeline: null,
      },
      {
        name: "Professional",
        idealFor: "Growing businesses that need a custom site they can manage.",
        highlighted: true,
        deliverables: [
          "Up to 12 custom-designed pages",
          "Content management system",
          "Technical SEO foundations",
          "Performance and accessibility checks",
          "Analytics setup",
        ],
        scope: "Includes up to two standard integrations, such as a CRM or newsletter.",
        revisions: "3 rounds of revisions",
        price: null,
        timeline: null,
      },
      {
        name: "Premium",
        idealFor: "Businesses with complex content, integrations or custom features.",
        deliverables: [
          "Custom page and feature scope",
          "Next.js or custom WordPress build",
          "API and third-party integrations",
          "Component library and documentation",
          "Post-launch support period",
        ],
        scope: "Integrations depend on third-party services and accounts in your name.",
        revisions: "Revision rounds agreed per phase",
        price: null,
        timeline: null,
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    serviceSlug: "ecommerce-development",
    intro: "Online stores designed for your products and built to sell on any device.",
    packages: [
      {
        name: "Starter",
        idealFor: "Brands selling a small range of products online for the first time.",
        deliverables: [
          "Store setup on a hosted platform",
          "Home, collection and product templates",
          "Up to 20 products added",
          "Payment provider connection",
        ],
        scope: "Payment, shipping and tax accounts are created and owned by you.",
        revisions: "2 rounds of revisions",
        price: null,
        timeline: null,
      },
      {
        name: "Professional",
        idealFor: "Retailers who want a distinctive store with better product discovery.",
        highlighted: true,
        deliverables: [
          "Custom store design",
          "Filtering and search configuration",
          "Up to 100 products added or migrated",
          "Email and analytics integration",
          "Mobile checkout testing",
        ],
        scope: "Product data migration depends on the quality of the export provided.",
        revisions: "3 rounds of revisions",
        price: null,
        timeline: null,
      },
      {
        name: "Premium",
        idealFor: "Larger catalogues or stores needing custom features and integrations.",
        deliverables: [
          "Custom or headless commerce build",
          "Inventory, fulfilment or ERP integrations",
          "Advanced filtering and merchandising",
          "Performance optimisation",
          "Team training session",
        ],
        scope: "Third-party integrations may carry their own fees and setup requirements.",
        revisions: "Revision rounds agreed per phase",
        price: null,
        timeline: null,
      },
    ],
  },
  {
    id: "logo-design",
    label: "Logo Design",
    serviceSlug: "logo-design",
    intro: "Logo packages that include the files you need to use your mark properly.",
    packages: [
      {
        name: "Starter",
        idealFor: "Start-ups and side projects that need a clean, professional mark.",
        deliverables: [
          "2 initial logo concepts",
          "Final logo in colour, black and white",
          "PNG and SVG exports",
        ],
        scope: "Wordmark or simple combination mark.",
        revisions: "2 rounds of revisions",
        price: null,
        timeline: null,
      },
      {
        name: "Professional",
        idealFor: "Businesses that want a distinctive mark with flexible variations.",
        highlighted: true,
        deliverables: [
          "3 initial logo concepts",
          "Primary, secondary and icon variations",
          "Full export package (SVG, PNG, PDF, EPS)",
          "Basic usage guide",
        ],
        scope: "Includes a short brand questionnaire and competitor review.",
        revisions: "3 rounds of revisions",
        price: null,
        timeline: null,
      },
      {
        name: "Premium",
        idealFor: "Brands that want a strategically led mark ready for a full identity.",
        deliverables: [
          "Strategy workshop",
          "4 initial logo concepts shown in context",
          "Complete logo system and variations",
          "Colour palette and typography pairing",
          "Logo usage guidelines",
        ],
        scope: "A natural foundation for a full brand identity project.",
        revisions: "4 rounds of revisions",
        price: null,
        timeline: null,
      },
    ],
  },
  {
    id: "brand-identity",
    label: "Brand Identity",
    serviceSlug: "brand-identity",
    intro: "Identity systems that keep every touchpoint consistent.",
    packages: [
      {
        name: "Starter",
        idealFor: "New businesses that need the essentials of a consistent brand.",
        deliverables: [
          "Logo and variations",
          "Colour palette",
          "Typography selection",
          "One-page brand sheet",
        ],
        scope: "Covers the core visual elements only.",
        revisions: "2 rounds of revisions",
        price: null,
        timeline: null,
      },
      {
        name: "Professional",
        idealFor: "Growing businesses ready to look consistent across every channel.",
        highlighted: true,
        deliverables: [
          "Logo system",
          "Colour and typography system",
          "Brand guidelines document",
          "Business card and email signature",
          "Social media profile assets",
        ],
        scope: "Includes a brand discovery session.",
        revisions: "3 rounds of revisions",
        price: null,
        timeline: null,
      },
      {
        name: "Premium",
        idealFor: "Organisations rebranding or launching with a comprehensive identity.",
        deliverables: [
          "Brand strategy and positioning",
          "Complete identity system",
          "Detailed brand guidelines",
          "Stationery suite",
          "Social media template set",
          "Brand asset library",
        ],
        scope: "Scope is tailored to your touchpoints and confirmed in your proposal.",
        revisions: "Revision rounds agreed per phase",
        price: null,
        timeline: null,
      },
    ],
  },
  {
    id: "graphic-design",
    label: "Graphic Design",
    serviceSlug: "graphic-design",
    intro: "Print and digital materials designed to your brand.",
    packages: [
      {
        name: "Starter",
        idealFor: "Single pieces such as a business card, flyer or social graphic.",
        deliverables: ["One design item", "Print-ready or digital files"],
        scope: "Based on your existing brand assets.",
        revisions: "2 rounds of revisions",
        price: null,
        timeline: null,
      },
      {
        name: "Professional",
        idealFor: "Campaigns that need several coordinated pieces.",
        highlighted: true,
        deliverables: [
          "Up to 5 coordinated design items",
          "Print and digital formats",
          "One editable template",
        ],
        scope: "Copy supplied by you. Printing costs paid directly to the printer.",
        revisions: "3 rounds of revisions",
        price: null,
        timeline: null,
      },
      {
        name: "Premium",
        idealFor: "Ongoing design needs or large collateral projects.",
        deliverables: [
          "Agreed volume of design items",
          "Brochures, presentations or catalogues",
          "Editable template library",
          "Priority scheduling",
        ],
        scope: "Monthly arrangements are set out in a separate agreement.",
        revisions: "Revision rounds agreed per item",
        price: null,
        timeline: null,
      },
    ],
  },
];

export const pricingNotes = [
  "Every project receives a written proposal that confirms scope, deliverables, revisions, timeline and price before work begins.",
  "Third-party costs such as domains, hosting, premium plugins, fonts, stock imagery and payment provider fees are separate unless stated.",
  "Need something that does not fit a package? Request a custom quote and we will scope it with you.",
];
