/**
 * Single source of truth for every service.
 * Used by: home page cards, /services, /services/[slug], quote form options,
 * footer links, pricing cross-links, sitemap and structured data.
 *
 * `icon` must match a key in components/ui/ServiceIcon.jsx.
 * `visual` selects an illustration in components/visuals/ServiceVisual.jsx.
 * `portfolioCategories` links each service to matching portfolio projects.
 */

export const serviceGroups = [
  {
    id: "web",
    label: "Websites",
    description: "Design, development and platforms that turn visitors into enquiries.",
  },
  {
    id: "brand",
    label: "Brand & Graphics",
    description: "Identity systems and visual assets that make a business recognisable.",
  },
  {
    id: "growth",
    label: "Growth & Care",
    description: "Search foundations and ongoing support that keep a website working.",
  },
];

export const services = [
  {
    slug: "website-design",
    title: "Website Design",
    group: "web",
    icon: "monitor",
    visual: "website-design",
    summary:
      "Considered, responsive website designs that explain what you do and guide visitors toward getting in touch.",
    metaDescription:
      "Custom website design for businesses: responsive layouts, wireframes, UI design systems and conversion-focused pages from Web Logo Studio.",
    hero: {
      eyebrow: "Website Design",
      heading: "Websites designed to earn trust in the first few seconds.",
      intro:
        "We design business, corporate and portfolio websites that look the part, read clearly and lead visitors to the next step. Every layout is planned for real content and every screen size from the start.",
    },
    problems: [
      {
        title: "Visitors leave before they understand you",
        text: "Unclear messaging and crowded layouts make people work too hard. We structure pages so the value is obvious at a glance.",
      },
      {
        title: "The site no longer reflects the business",
        text: "If your website looks dated next to competitors, it quietly undermines the quality of your work. A considered design closes that gap.",
      },
      {
        title: "Mobile feels like an afterthought",
        text: "Most visitors arrive on a phone. We design mobile layouts deliberately rather than shrinking a desktop page.",
      },
    ],
    features: [
      { title: "Business websites", text: "Clear, credible sites for service businesses, practices and local companies." },
      { title: "Corporate websites", text: "Structured multi-page sites for organisations with several audiences and offerings." },
      { title: "Portfolio websites", text: "Showcases for creatives, studios and consultants where the work leads." },
      { title: "Landing pages", text: "Focused single pages for campaigns, launches and lead generation." },
      { title: "Responsive layouts", text: "Designs adapted for phones, tablets, laptops and large displays." },
      { title: "UI/UX design", text: "Navigation, content hierarchy and interactions planned around how people browse." },
      { title: "Wireframes", text: "Low-fidelity page structures agreed before visual design begins." },
      { title: "Design systems", text: "Reusable type, colour, spacing and component rules that keep pages consistent." },
      { title: "Conversion-focused layouts", text: "Calls to action, proof points and forms placed where decisions happen." },
    ],
    benefits: [
      "A website that reflects the quality of your work",
      "Clearer messaging that shortens the path to an enquiry",
      "Consistent pages that are easier to extend later",
      "Developer-ready designs that reduce build surprises",
    ],
    process: [
      { title: "Discover", text: "We review your business, audience, competitors and existing content." },
      { title: "Structure", text: "Sitemap and wireframes define what goes where before styling starts." },
      { title: "Design", text: "High-fidelity page designs for desktop and mobile, refined with your feedback." },
      { title: "Handover", text: "A documented design system and assets ready for development." },
    ],
    faqs: [
      {
        q: "Do you design both desktop and mobile versions?",
        a: "Yes. Every key page is designed for mobile and desktop, with tablet behaviour defined in the design system.",
      },
      {
        q: "Can you work with our existing brand?",
        a: "Absolutely. We build on your existing logo and colours. If the brand needs attention, we can recommend a refresh as a separate scope.",
      },
      {
        q: "Which design tool do you use?",
        a: "We typically design in Figma and share interactive previews so you can review pages on your own devices.",
      },
      {
        q: "Will you also build the website?",
        a: "We can. Design and development can be quoted together or separately if you already have a development team.",
      },
    ],
    related: ["website-development", "ui-ux-design", "landing-page-design"],
    portfolioCategories: ["website-design"],
  },
  {
    slug: "website-development",
    title: "Website Development",
    group: "web",
    icon: "code",
    visual: "code",
    summary:
      "Fast, accessible websites built with modern tools, clean code and the integrations your business relies on.",
    metaDescription:
      "Custom website development with Next.js and React: responsive, accessible, performance-conscious builds with API integrations by Web Logo Studio.",
    hero: {
      eyebrow: "Website Development",
      heading: "Clean builds that load fast and stay easy to grow.",
      intro:
        "We turn approved designs into responsive, accessible websites using modern frameworks. The result is a site that performs well, is straightforward to update and is ready for the integrations you need.",
    },
    problems: [
      {
        title: "A slow site that frustrates visitors",
        text: "Heavy themes and unused scripts drag pages down. We build lean, so content appears quickly.",
      },
      {
        title: "Fragile code that is hard to change",
        text: "Small edits should not break other pages. Reusable components keep the codebase predictable.",
      },
      {
        title: "Disconnected tools and manual work",
        text: "Forms, CRMs and booking tools often sit in silos. We connect them where the project scope allows.",
      },
    ],
    features: [
      { title: "Custom website development", text: "Hand-built sites shaped around your design and content, not a generic theme." },
      { title: "Next.js websites", text: "Server-rendered and statically generated pages for speed and search visibility." },
      { title: "React interfaces", text: "Interactive components such as filters, calculators and multi-step forms." },
      { title: "Frontend development", text: "Semantic HTML, maintainable CSS and careful attention to detail." },
      { title: "Backend integration", text: "Connecting forms, content and data to the services you use, when included in scope." },
      { title: "API integration", text: "CRMs, email platforms, booking tools and headless CMS connections." },
      { title: "Performance optimisation", text: "Optimised images, efficient fonts and minimal client-side JavaScript." },
      { title: "Accessibility", text: "Keyboard support, sensible focus states, labelled forms and readable contrast." },
      { title: "Responsive development", text: "Layouts tested across phones, tablets and desktop screens." },
    ],
    benefits: [
      "Pages that load quickly on real devices",
      "A codebase your team or ours can extend safely",
      "Fewer manual tasks thanks to connected tools",
      "Accessible experiences that include more visitors",
    ],
    process: [
      { title: "Technical plan", text: "We confirm the stack, hosting, content workflow and integrations." },
      { title: "Build", text: "Reusable components and pages are developed against the approved design." },
      { title: "Test", text: "Cross-browser, responsive, accessibility and form testing before launch." },
      { title: "Launch", text: "Deployment, domain connection and a walkthrough of how to manage content." },
    ],
    faqs: [
      {
        q: "Which technologies do you use?",
        a: "We primarily build with Next.js and React, and with WordPress when a familiar editing experience matters most. We recommend the stack that fits your goals.",
      },
      {
        q: "Can you develop a design we already have?",
        a: "Yes. Share your design files and we will review them for feasibility, responsiveness and any missing states before quoting.",
      },
      {
        q: "Do you handle hosting?",
        a: "We can recommend and configure hosting. Hosting accounts are best owned by you so you retain full control.",
      },
      {
        q: "Will I be able to edit content myself?",
        a: "If content editing is in scope, we connect a content management system and show you how to use it.",
      },
    ],
    related: ["nextjs-development", "website-design", "website-maintenance"],
    portfolioCategories: ["website-development"],
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    group: "web",
    icon: "bag",
    visual: "commerce",
    summary:
      "Online stores with clear product pages, smooth checkout and a shopping experience built for mobile.",
    metaDescription:
      "E-commerce website design and development: product pages, cart and checkout, payment gateway integration and mobile shopping by Web Logo Studio.",
    hero: {
      eyebrow: "E-commerce Development",
      heading: "Online stores that make buying feel effortless.",
      intro:
        "We design and build online stores with clear product presentation, easy navigation and a checkout people can complete on any device. We help you choose the platform that suits your catalogue and how you run the business.",
    },
    problems: [
      {
        title: "Shoppers abandon at checkout",
        text: "Extra steps, surprise fields and slow pages cost sales. We keep the path to purchase short and clear.",
      },
      {
        title: "Products are hard to find",
        text: "Thoughtful categories, filtering and search help shoppers reach the right product quickly.",
      },
      {
        title: "The store looks unlike the brand",
        text: "A generic storefront erodes trust. We design stores that feel like a natural extension of your identity.",
      },
    ],
    features: [
      { title: "Online store design and development", text: "Storefronts designed around your products and brand." },
      { title: "Product pages", text: "Imagery, variants, details and calls to action arranged to support buying decisions." },
      { title: "Product categories", text: "Logical collections and navigation that scale with your catalogue." },
      { title: "Shopping cart and checkout", text: "A streamlined cart and checkout flow using your platform's secure checkout." },
      { title: "Payment gateway integration", text: "Connection to providers such as Stripe or PayPal, using accounts you own." },
      { title: "Product filtering and search", text: "Filters by attribute, price or category, plus on-site search." },
      { title: "Order management integration", text: "Links to fulfilment, inventory or accounting tools where your platform supports it." },
      { title: "Mobile shopping experiences", text: "Thumb-friendly navigation, fast images and a checkout that works on a phone." },
    ],
    benefits: [
      "A shopping experience that feels trustworthy",
      "Less friction between product page and purchase",
      "A catalogue structure that grows with you",
      "A store you can manage day to day",
    ],
    process: [
      { title: "Platform choice", text: "We compare options such as Shopify, WooCommerce or a custom headless build." },
      { title: "Store design", text: "Home, category, product, cart and checkout journeys designed together." },
      { title: "Build and configure", text: "Store setup, product templates, integrations and test orders." },
      { title: "Launch", text: "Final checks, payment testing in live mode and a handover session." },
    ],
    note: "Payment gateways, shipping rates, tax settings and third-party integrations require accounts in your name and may need additional setup or fees from those providers. We confirm exactly what is included in your proposal.",
    faqs: [
      {
        q: "Which e-commerce platform do you recommend?",
        a: "It depends on your catalogue size, budget and how you want to manage orders. Shopify suits many retailers, WooCommerce suits WordPress users, and a custom build suits unusual requirements.",
      },
      {
        q: "Can you migrate products from our current store?",
        a: "Usually, yes. Migration effort depends on how clean the existing data is, so we review an export before quoting.",
      },
      {
        q: "Do you set up payment processing?",
        a: "We integrate the payment provider using an account you create, which keeps payouts and compliance in your control.",
      },
      {
        q: "Will I be able to add products myself?",
        a: "Yes. We build product templates so new items follow the same layout, and we show you how to add them.",
      },
    ],
    related: ["website-development", "wordpress-development", "seo"],
    portfolioCategories: ["ecommerce"],
  },
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    group: "web",
    icon: "blocks",
    visual: "wordpress",
    summary:
      "Custom WordPress sites and WooCommerce stores that are fast, secure and easy for your team to edit.",
    metaDescription:
      "WordPress development services: custom themes, Elementor builds, WooCommerce stores, plugin configuration, speed optimisation and maintenance.",
    hero: {
      eyebrow: "WordPress Development",
      heading: "WordPress, built properly and easy to manage.",
      intro:
        "WordPress is a sensible choice when your team wants a familiar editor. We build lean themes, configure only the plugins you need and leave you with a site that is simple to update.",
    },
    problems: [
      {
        title: "Plugin overload",
        text: "Dozens of plugins slow sites down and widen the security surface. We keep the stack deliberate.",
      },
      {
        title: "Editing breaks the layout",
        text: "Well-structured blocks and templates let your team update pages without fighting the design.",
      },
      {
        title: "A theme that looks like everyone else",
        text: "Off-the-shelf themes are recognisable. A custom build gives you a site that is distinctly yours.",
      },
    ],
    features: [
      { title: "Business websites", text: "Professional WordPress sites with a clean editing experience." },
      { title: "Custom themes", text: "Lightweight themes built from your design, without unnecessary bloat." },
      { title: "Elementor development", text: "Structured Elementor builds with global styles and reusable templates." },
      { title: "WooCommerce stores", text: "Product catalogues, checkout and store settings configured for your business." },
      { title: "Website redesign", text: "Refreshing an existing WordPress site while preserving content and URLs." },
      { title: "Plugin configuration", text: "Carefully selected plugins for forms, SEO, caching and security." },
      { title: "Speed optimisation", text: "Caching, image optimisation and script clean-up for faster pages." },
      { title: "Maintenance", text: "Core, theme and plugin updates with backups, available as an ongoing service." },
    ],
    benefits: [
      "An editor your team already understands",
      "Fewer plugins and a faster site",
      "Reusable templates for consistent new pages",
      "Clear ownership of your hosting and content",
    ],
    process: [
      { title: "Audit or plan", text: "We review your current site or define requirements for a new one." },
      { title: "Design", text: "Page designs and editing patterns agreed before building." },
      { title: "Build", text: "Theme or page-builder development, plugin setup and content entry." },
      { title: "Train and launch", text: "Launch support and a walkthrough of updating pages and posts." },
    ],
    faqs: [
      {
        q: "Do you use page builders or custom themes?",
        a: "Both. Custom block themes are leaner, while Elementor offers more visual freedom for editors. We recommend one based on who will maintain the site.",
      },
      {
        q: "Can you fix or speed up our existing WordPress site?",
        a: "Yes. We start with an audit of themes, plugins and hosting, then propose specific improvements.",
      },
      {
        q: "Is WordPress secure?",
        a: "It can be, when kept up to date with a minimal set of reputable plugins and good hosting. Ongoing maintenance helps keep it that way.",
      },
      {
        q: "Who owns the site after launch?",
        a: "You do. We build on hosting and accounts in your name and hand over all admin access.",
      },
    ],
    related: ["website-maintenance", "ecommerce-development", "website-redesign"],
    portfolioCategories: ["website-development"],
  },
  {
    slug: "nextjs-development",
    title: "Next.js Development",
    group: "web",
    icon: "layers",
    visual: "code",
    summary:
      "Modern Next.js websites and web apps with server rendering, reusable components and strong SEO foundations.",
    metaDescription:
      "Next.js development: App Router websites, reusable React components, server rendering, static generation, API integrations and SEO-friendly structure.",
    hero: {
      eyebrow: "Next.js Development",
      heading: "Modern web experiences on a framework built for speed.",
      intro:
        "Next.js lets us combine fast static pages with dynamic features where they matter. We use the App Router, server components and a reusable component library to create sites that perform well and scale cleanly.",
    },
    problems: [
      {
        title: "Marketing sites that feel sluggish",
        text: "Client-heavy builds ship too much JavaScript. Server rendering keeps pages light and quick.",
      },
      {
        title: "Content that search engines struggle to read",
        text: "Pre-rendered HTML, metadata and structured data give crawlers a clear picture of every page.",
      },
      {
        title: "Products that outgrow their website",
        text: "A component-based architecture grows from a marketing site into an application without a rebuild.",
      },
    ],
    features: [
      { title: "Modern web applications", text: "Dashboards, portals and interactive tools built on React." },
      { title: "App Router websites", text: "Layouts, nested routes and streaming using current Next.js conventions." },
      { title: "Reusable React components", text: "A documented component library that keeps the interface consistent." },
      { title: "Server rendering and static generation", text: "The right rendering strategy chosen for each page." },
      { title: "API integrations", text: "Headless CMS, payments, authentication and third-party data sources." },
      { title: "SEO-friendly page structures", text: "Metadata, sitemaps, canonical URLs and structured data built in." },
      { title: "Performance optimisation", text: "Image optimisation, font loading and minimal client-side JavaScript." },
    ],
    benefits: [
      "Fast first loads and smooth navigation",
      "Strong technical SEO from day one",
      "Scales from a website into an application",
      "Deploys easily to modern hosting platforms",
    ],
    process: [
      { title: "Architecture", text: "Routes, data sources, rendering strategy and hosting are planned." },
      { title: "Component system", text: "Core UI components are built and documented first." },
      { title: "Pages and features", text: "Routes, integrations and interactions are assembled and tested." },
      { title: "Deploy", text: "Production deployment, environment configuration and monitoring setup." },
    ],
    faqs: [
      {
        q: "Is Next.js a good choice for a business website?",
        a: "Often, yes, especially when speed, SEO and future growth matter. If your team needs a very familiar editor, WordPress may suit better, and we will say so.",
      },
      {
        q: "Can non-developers edit a Next.js site?",
        a: "Yes, when it is connected to a headless CMS. Editors manage content in a friendly interface while the site stays fast.",
      },
      {
        q: "Where are Next.js sites hosted?",
        a: "Platforms such as Vercel and Netlify, or your own Node.js hosting. We help you choose and set it up under your account.",
      },
      {
        q: "Do you build full web applications?",
        a: "We build application interfaces and integrate with existing APIs. Larger backend systems are scoped individually.",
      },
    ],
    related: ["website-development", "seo", "ui-ux-design"],
    portfolioCategories: ["website-development"],
  },
  {
    slug: "landing-page-design",
    title: "Landing Page Design",
    group: "web",
    icon: "rocket",
    visual: "landing",
    summary:
      "Focused landing pages for campaigns, launches and lead generation, with one clear goal per page.",
    metaDescription:
      "Landing page design for lead generation, product launches and ad campaigns: conversion-focused layouts and call-to-action optimisation.",
    hero: {
      eyebrow: "Landing Page Design",
      heading: "One page, one goal, no distractions.",
      intro:
        "A good landing page answers a visitor's questions in the order they ask them, then makes the next step obvious. We design and build pages that match your campaign and give every click a clear destination.",
    },
    problems: [
      {
        title: "Ad traffic lands on a generic homepage",
        text: "Visitors expecting a specific offer get lost. A dedicated page keeps the message consistent.",
      },
      {
        title: "Too many choices",
        text: "Multiple competing links dilute attention. We focus each page on a single action.",
      },
      {
        title: "No way to measure what works",
        text: "We structure pages so analytics and A/B tests can show which messages perform.",
      },
    ],
    features: [
      { title: "Lead generation pages", text: "Pages built around a form, consultation booking or download." },
      { title: "Product launches", text: "Launch pages that build anticipation and capture early interest." },
      { title: "Advertising campaigns", text: "Message-matched pages for search and social ad campaigns." },
      { title: "Service landing pages", text: "Dedicated pages for individual services or locations." },
      { title: "Conversion-focused layouts", text: "Benefits, proof and objections handled in a deliberate sequence." },
      { title: "Call to action optimisation", text: "Clear button copy, placement and form design that reduce friction." },
    ],
    benefits: [
      "Campaign messages that carry through to the page",
      "Higher-quality enquiries from focused content",
      "Faster launches with reusable sections",
      "Measurable results through clean tracking",
    ],
    process: [
      { title: "Brief", text: "Audience, offer, traffic source and the single goal of the page." },
      { title: "Message and wireframe", text: "Headline, structure and objections mapped before design." },
      { title: "Design and build", text: "A responsive page built for speed with tracking in place." },
      { title: "Review", text: "Launch, then review the data and refine if ongoing support is agreed." },
    ],
    faqs: [
      {
        q: "Can a landing page live on our existing website?",
        a: "Yes. We can build it within your current site or as a standalone page on a subdomain.",
      },
      {
        q: "Do you write the copy?",
        a: "We can shape the structure and headline copy. Detailed copywriting can be included in the scope if needed.",
      },
      {
        q: "Can you connect the form to our CRM?",
        a: "Usually, yes. Most CRMs and email platforms offer integrations or APIs we can connect to.",
      },
      {
        q: "Do you guarantee a conversion rate?",
        a: "No one can honestly guarantee that. We apply proven principles and set the page up so results can be measured and improved.",
      },
    ],
    related: ["website-design", "seo", "social-media-design"],
    portfolioCategories: ["website-design"],
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    group: "web",
    icon: "refresh",
    visual: "redesign",
    summary:
      "A modern, mobile-friendly redesign that keeps what works, fixes what does not and protects your search presence.",
    metaDescription:
      "Website redesign services: modern visuals, better mobile experience, improved navigation and UX, faster performance and careful SEO migration planning.",
    hero: {
      eyebrow: "Website Redesign",
      heading: "Your business has moved on. Your website should too.",
      intro:
        "We redesign websites that feel dated, perform poorly on mobile or no longer match the business. We start by understanding what already works, then rebuild the rest while protecting the search visibility you have earned.",
    },
    problems: [
      {
        title: "An outdated visual identity",
        text: "Old styling signals an old business. A refresh brings the site in line with your current quality.",
      },
      {
        title: "Poor mobile experience",
        text: "Pinch-to-zoom pages and tiny buttons push mobile visitors away. We rebuild for touch first.",
      },
      {
        title: "Confusing navigation",
        text: "Years of additions leave menus cluttered. We reorganise content around how visitors look for it.",
      },
    ],
    features: [
      { title: "Visual identity refresh", text: "Updated typography, colour and layout aligned with your brand." },
      { title: "Mobile experience", text: "Layouts and interactions redesigned for phones and tablets." },
      { title: "Navigation improvements", text: "A clearer menu structure and better internal linking." },
      { title: "UX improvements", text: "Simplified journeys, clearer calls to action and better forms." },
      { title: "Performance improvements", text: "Leaner pages, optimised images and modern hosting." },
      { title: "Content and SEO migration planning", text: "URL mapping, redirects and metadata carried across carefully." },
    ],
    benefits: [
      "A site that matches the business you are today",
      "Better experience for mobile visitors",
      "Protected search visibility through careful migration",
      "A cleaner foundation for future updates",
    ],
    process: [
      { title: "Audit", text: "Content, analytics, page speed and search visibility are reviewed." },
      { title: "Restructure", text: "A new sitemap and redirect plan based on what visitors need." },
      { title: "Redesign and build", text: "New designs and development, migrating content as agreed." },
      { title: "Migrate and launch", text: "Redirects, metadata checks and post-launch monitoring." },
    ],
    faqs: [
      {
        q: "Will a redesign hurt our search rankings?",
        a: "A redesign carries some risk, which is why we map old URLs to new ones, preserve metadata and set up redirects. Careful migration minimises disruption.",
      },
      {
        q: "Can we keep our existing content?",
        a: "Yes. We review it together, keep what performs, and edit or consolidate the rest.",
      },
      {
        q: "Do we need a new logo as part of a redesign?",
        a: "Not necessarily. If your brand still works, we design around it. If it needs attention, we can quote a refresh separately.",
      },
      {
        q: "Can you redesign a site built on any platform?",
        a: "We can redesign most sites. Sometimes moving to a new platform is the better option, and we will explain the trade-offs.",
      },
    ],
    related: ["website-design", "seo", "website-development"],
    portfolioCategories: ["website-design", "website-development"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    group: "web",
    icon: "frame",
    visual: "uiux",
    summary:
      "User flows, wireframes, prototypes and interface design for websites and digital products people find easy to use.",
    metaDescription:
      "UI/UX design services: user flows, information architecture, wireframes, prototypes and interface design systems for websites and web apps.",
    hero: {
      eyebrow: "UI/UX Design",
      heading: "Interfaces that feel obvious, because the thinking was done first.",
      intro:
        "Good UX removes hesitation. We map how people move through your website or product, prototype the key journeys and design interfaces that are clear, consistent and accessible.",
    },
    problems: [
      {
        title: "Users get stuck",
        text: "Confusing flows lead to support requests and drop-off. We find the friction and design it out.",
      },
      {
        title: "Inconsistent screens",
        text: "Without a system, every page looks slightly different. A shared component library fixes that.",
      },
      {
        title: "Features built on assumptions",
        text: "Prototypes let you test ideas with real people before investing in development.",
      },
    ],
    features: [
      { title: "User flows", text: "Maps of the paths users take to complete key tasks." },
      { title: "Information architecture", text: "Content organised into a logical, navigable structure." },
      { title: "Wireframes", text: "Layout and hierarchy agreed before visual design." },
      { title: "Interactive prototypes", text: "Clickable prototypes to review and test journeys." },
      { title: "Interface design", text: "Polished screens with clear states for loading, errors and empty content." },
      { title: "Design systems", text: "Components, tokens and usage guidelines for consistent products." },
      { title: "Accessibility review", text: "Contrast, focus order and keyboard behaviour considered throughout." },
    ],
    benefits: [
      "Fewer support requests and drop-offs",
      "Faster development from a clear specification",
      "A consistent product as it grows",
      "Decisions grounded in how people actually behave",
    ],
    process: [
      { title: "Understand", text: "Stakeholder interviews, existing analytics and user goals." },
      { title: "Map", text: "Flows and information architecture for the key journeys." },
      { title: "Prototype", text: "Wireframes and prototypes reviewed and refined." },
      { title: "Design system", text: "Final UI and a component library ready for developers." },
    ],
    faqs: [
      {
        q: "What is the difference between UI and UX?",
        a: "UX is how the experience works: structure, flow and ease of use. UI is how it looks and feels: layout, type, colour and components. We handle both.",
      },
      {
        q: "Do you conduct user testing?",
        a: "We can run lightweight usability sessions on prototypes. Larger research programmes are scoped separately.",
      },
      {
        q: "Can you improve an existing product?",
        a: "Yes. We often start with a UX audit that identifies the highest-impact improvements.",
      },
      {
        q: "What do developers receive?",
        a: "Organised design files, documented components, spacing and colour tokens, and annotated interaction states.",
      },
    ],
    related: ["website-design", "nextjs-development", "website-redesign"],
    portfolioCategories: ["website-design"],
  },
  {
    slug: "logo-design",
    title: "Logo Design",
    group: "brand",
    icon: "pen",
    visual: "logo",
    summary:
      "Distinctive logos built on strategy, with variations and export formats for every place your brand appears.",
    metaDescription:
      "Professional logo design: wordmarks, lettermarks, symbols and combination marks with full logo variations and export formats by Web Logo Studio.",
    hero: {
      eyebrow: "Logo Design",
      heading: "A mark that is unmistakably yours.",
      intro:
        "Your logo is often the first thing people remember. We design marks rooted in your positioning, tested at every size and delivered with the variations and file formats you need to use them well.",
    },
    problems: [
      {
        title: "A logo that looks like a template",
        text: "Generic icons and trendy fonts make a business forgettable. We design for distinctiveness.",
      },
      {
        title: "It falls apart at small sizes",
        text: "Detailed marks become blurry on mobile and in favicons. We design for clarity from 16 pixels upward.",
      },
      {
        title: "Missing files when you need them",
        text: "You should never have to hunt for a transparent PNG. We deliver an organised export package.",
      },
    ],
    features: [
      { title: "Wordmark logos", text: "Custom-lettered names that make the brand name itself memorable." },
      { title: "Lettermark logos", text: "Monograms and initials for names that benefit from a compact form." },
      { title: "Symbol and icon logos", text: "Standalone marks that represent the brand without words." },
      { title: "Combination marks", text: "Symbol and wordmark designed to work together and apart." },
      { title: "Minimalist logos", text: "Reduced, confident forms that stay clear at any size." },
      { title: "Corporate logos", text: "Measured, credible marks for professional and established organisations." },
      { title: "Brand-specific directions", text: "Concepts grounded in your audience, values and competitive landscape." },
      { title: "Variations and export formats", text: "Horizontal, stacked, icon and mono versions in SVG, PNG and PDF." },
    ],
    benefits: [
      "Instant recognition across every touchpoint",
      "A professional first impression",
      "Files ready for web, print and social media",
      "A strong base for a complete brand identity",
    ],
    process: [
      { title: "Brand questionnaire", text: "Your audience, values, competitors and the impression you want to make." },
      { title: "Concepts", text: "A focused set of distinct logo directions presented in context." },
      { title: "Refinement", text: "The chosen direction is refined within the revision rounds agreed in your proposal." },
      { title: "Final files", text: "Logo variations, colour versions and export formats, plus basic usage notes." },
    ],
    faqs: [
      {
        q: "How many logo concepts will I see?",
        a: "The number of initial concepts depends on the package you choose and is stated in your proposal.",
      },
      {
        q: "How many revisions are included?",
        a: "Each package includes a defined number of revision rounds, agreed before work begins. Additional rounds can be added if needed.",
      },
      {
        q: "Which file formats will I receive?",
        a: "Typically SVG, PNG with transparent backgrounds, PDF and, where relevant, EPS, in full colour, black and white versions.",
      },
      {
        q: "Do I own the final logo?",
        a: "Yes. Once the project is paid in full, ownership of the final approved logo transfers to you, as set out in our terms.",
      },
    ],
    related: ["brand-identity", "graphic-design", "social-media-design"],
    portfolioCategories: ["logo-design", "branding"],
  },
  {
    slug: "brand-identity",
    title: "Brand Identity Design",
    group: "brand",
    icon: "palette",
    visual: "identity",
    summary:
      "Complete identity systems: logo, colour, typography and guidelines that keep your brand consistent everywhere.",
    metaDescription:
      "Brand identity design: logo systems, colour palettes, typography, visual identity guidelines, stationery and social media identity.",
    hero: {
      eyebrow: "Brand Identity Design",
      heading: "A complete visual language, not just a logo.",
      intro:
        "A brand identity gives every touchpoint the same voice. We create the logo system, colours, typography and rules that make your business instantly recognisable, then document them so anyone can apply them correctly.",
    },
    problems: [
      {
        title: "Every touchpoint looks different",
        text: "Inconsistent colours and fonts make a business look smaller than it is. A system brings everything together.",
      },
      {
        title: "No guidance for your team",
        text: "Without guidelines, every new flyer is guesswork. Clear rules make brand use straightforward.",
      },
      {
        title: "A brand that no longer fits",
        text: "As businesses grow, early branding can hold them back. A considered identity supports where you are heading.",
      },
    ],
    features: [
      { title: "Logo systems", text: "Primary, secondary and icon marks with clear usage rules." },
      { title: "Brand colour palettes", text: "Primary and supporting colours with accessible combinations." },
      { title: "Typography systems", text: "Typefaces and hierarchy for headings, body text and details." },
      { title: "Visual identity guidelines", text: "A practical guide covering logo, colour, type and imagery." },
      { title: "Brand stationery", text: "Business cards, letterheads, email signatures and documents." },
      { title: "Social media identity", text: "Profile images, cover designs and post templates." },
      { title: "Consistent digital presentation", text: "Rules that carry the identity across websites and presentations." },
    ],
    benefits: [
      "Recognition that builds with every interaction",
      "Confidence that materials always look right",
      "Faster production of new marketing assets",
      "A brand that supports premium positioning",
    ],
    process: [
      { title: "Strategy", text: "Positioning, audience, personality and competitive review." },
      { title: "Identity concepts", text: "Logo and visual directions shown across real applications." },
      { title: "System development", text: "Colour, type, graphic elements and imagery direction." },
      { title: "Guidelines", text: "A brand guide and organised asset library delivered to your team." },
    ],
    faqs: [
      {
        q: "What is the difference between a logo and a brand identity?",
        a: "A logo is one element. A brand identity is the full system of logo, colour, type, imagery and rules that makes everything look like it belongs together.",
      },
      {
        q: "Can you build an identity around our existing logo?",
        a: "Yes. If your logo is working, we can develop the wider system around it.",
      },
      {
        q: "What does the brand guide include?",
        a: "Typically logo usage, clear space, colour values for print and screen, typography, graphic elements and examples of correct use.",
      },
      {
        q: "Do you design marketing materials too?",
        a: "Yes. Stationery and social templates can be included, and further materials can be added through our graphic design service.",
      },
    ],
    related: ["logo-design", "graphic-design", "website-design"],
    portfolioCategories: ["branding", "logo-design"],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    group: "brand",
    icon: "shapes",
    visual: "print",
    summary:
      "Print and digital marketing materials designed to your brand, from business cards to presentations.",
    metaDescription:
      "Graphic design services: business cards, flyers, brochures, posters, banners, digital ads, presentation design and brand collateral.",
    hero: {
      eyebrow: "Graphic Design",
      heading: "Marketing materials that look as good as your work.",
      intro:
        "From business cards to sales presentations, we design materials that communicate clearly and stay true to your brand. Every piece is prepared correctly for print or screen.",
    },
    problems: [
      {
        title: "Materials that undersell you",
        text: "Cluttered flyers and inconsistent decks weaken your message. We design with clarity and restraint.",
      },
      {
        title: "Files that fail at the printer",
        text: "Wrong colour modes and missing bleed cause delays. We supply print-ready files.",
      },
      {
        title: "Off-brand improvisation",
        text: "When materials are made ad hoc, the brand drifts. We keep every piece aligned.",
      },
    ],
    features: [
      { title: "Business cards", text: "Cards that make a confident, tactile first impression." },
      { title: "Flyers and brochures", text: "Information arranged for quick scanning and clear action." },
      { title: "Posters and banners", text: "Large-format designs readable from a distance." },
      { title: "Marketing creatives", text: "Campaign visuals across print and digital channels." },
      { title: "Digital advertising graphics", text: "Display and social ad sets in the sizes each platform needs." },
      { title: "Presentation design", text: "Sales decks and pitch presentations with editable templates." },
      { title: "Brand collateral", text: "Letterheads, email signatures, certificates and signage." },
    ],
    benefits: [
      "Consistent, on-brand materials",
      "Print-ready files with no surprises",
      "Editable templates where helpful",
      "Clear communication that drives action",
    ],
    process: [
      { title: "Brief", text: "Purpose, audience, format, content and deadlines." },
      { title: "Design", text: "Initial design following your brand guidelines." },
      { title: "Revise", text: "Refinements within the agreed revision rounds." },
      { title: "Deliver", text: "Print-ready or digital files in the formats you need." },
    ],
    faqs: [
      {
        q: "Do you handle printing?",
        a: "We prepare print-ready files and can liaise with your chosen printer. Printing costs are paid to the printer directly.",
      },
      {
        q: "Can you work with our brand guidelines?",
        a: "Yes. We follow existing guidelines closely, or help establish them if they do not exist yet.",
      },
      {
        q: "Will we get editable files?",
        a: "Where useful, such as presentation templates, we provide editable versions. Source file arrangements are confirmed in your proposal.",
      },
      {
        q: "Can you design ongoing materials each month?",
        a: "Yes. Regular design support can be arranged through a separate monthly agreement.",
      },
    ],
    related: ["brand-identity", "social-media-design", "logo-design"],
    portfolioCategories: ["graphic-design"],
  },
  {
    slug: "social-media-design",
    title: "Social Media Design",
    group: "brand",
    icon: "megaphone",
    visual: "social",
    summary:
      "On-brand posts, covers, carousels and campaign graphics, plus templates that keep your feed consistent.",
    metaDescription:
      "Social media design: branded post templates, cover images, carousel designs, campaign graphics and promotional creatives.",
    hero: {
      eyebrow: "Social Media Design",
      heading: "A feed people recognise before they read the name.",
      intro:
        "Consistent social design builds recognition with every scroll. We create post designs, carousels and campaign graphics, along with templates your team can reuse confidently.",
    },
    problems: [
      {
        title: "An inconsistent feed",
        text: "Mixed styles make it hard for followers to recognise your posts. A template system solves that.",
      },
      {
        title: "Creating every post from scratch",
        text: "Designing each post individually is slow. Flexible templates speed production.",
      },
      {
        title: "Graphics that get lost",
        text: "Busy designs fail at feed size. We design for the small screen first.",
      },
    ],
    features: [
      { title: "Social media posts", text: "Single-image posts for announcements, tips and promotions." },
      { title: "Cover images", text: "Profile covers and banners sized correctly for each platform." },
      { title: "Campaign graphics", text: "Coordinated sets for launches, events and seasonal campaigns." },
      { title: "Carousel designs", text: "Multi-slide posts that teach, explain or tell a story." },
      { title: "Promotional creatives", text: "Offer and product graphics for organic and paid posts." },
      { title: "Brand templates", text: "Editable templates for Canva or Figma that keep content on brand." },
    ],
    benefits: [
      "Instant recognition in busy feeds",
      "Faster content production",
      "Consistency across platforms",
      "Designs your team can update",
    ],
    process: [
      { title: "Audit", text: "Review your current profiles, audience and platforms." },
      { title: "Visual direction", text: "Layouts, typography and graphic devices for your feed." },
      { title: "Design", text: "Posts, carousels and covers designed in the right sizes." },
      { title: "Templates", text: "Editable templates and a short guide for your team." },
    ],
    faqs: [
      {
        q: "Do you post content for us?",
        a: "Our focus is design. Scheduling and community management are not included unless agreed separately.",
      },
      {
        q: "Which platforms do you design for?",
        a: "Instagram, Facebook, LinkedIn, X, Pinterest and others, with the correct sizes for each.",
      },
      {
        q: "Can templates be edited in Canva?",
        a: "Yes. We can provide Canva templates so your team can create new posts easily.",
      },
      {
        q: "Do you write captions?",
        a: "Caption writing is not included by default, but on-graphic headlines can be refined as part of the design.",
      },
    ],
    related: ["graphic-design", "brand-identity", "landing-page-design"],
    portfolioCategories: ["graphic-design", "branding"],
  },
  {
    slug: "seo",
    title: "Search Engine Optimization",
    navTitle: "SEO",
    group: "growth",
    icon: "search",
    visual: "seo",
    summary:
      "Technical and on-page SEO foundations that help search engines understand and present your website.",
    metaDescription:
      "SEO services covering technical foundations, on-page optimisation, metadata, heading structure, internal linking, image optimisation and sitemaps.",
    hero: {
      eyebrow: "Search Engine Optimization",
      heading: "Make it easy for search engines to understand you.",
      intro:
        "Strong SEO starts with a well-built website. We put the technical and on-page foundations in place so search engines can crawl, understand and present your pages accurately.",
    },
    problems: [
      {
        title: "Pages search engines cannot read",
        text: "Missing metadata, broken links and poor structure leave crawlers guessing. We fix the fundamentals.",
      },
      {
        title: "Content that competes with itself",
        text: "Similar pages targeting the same terms dilute each other. Clear structure resolves that.",
      },
      {
        title: "A slow, heavy website",
        text: "Performance and accessibility affect user experience and search visibility. We address both.",
      },
    ],
    features: [
      { title: "Technical SEO foundations", text: "Crawlability, indexing, canonical URLs and clean URL structure." },
      { title: "On-page SEO", text: "Content aligned with how your audience searches." },
      { title: "Metadata", text: "Unique titles and descriptions written for each page." },
      { title: "Heading structure", text: "A logical heading hierarchy on every page." },
      { title: "Internal linking", text: "Links that connect related pages and distribute authority." },
      { title: "Image optimisation", text: "Compressed, correctly sized images with descriptive alt text." },
      { title: "Sitemap and robots", text: "XML sitemaps and robots rules configured correctly." },
      { title: "Performance and accessibility", text: "Core Web Vitals and accessibility improvements." },
    ],
    benefits: [
      "A website search engines can crawl efficiently",
      "Pages that present well in search results",
      "Better experience for visitors and crawlers",
      "A foundation for long-term content growth",
    ],
    process: [
      { title: "Audit", text: "Technical crawl, metadata, content and performance review." },
      { title: "Prioritise", text: "A prioritised list of fixes by impact and effort." },
      { title: "Implement", text: "Technical and on-page changes made to your site." },
      { title: "Report", text: "A summary of changes and recommendations for next steps." },
    ],
    note: "No one can guarantee specific rankings or traffic levels. Search results depend on competition, content, search engine algorithms and many factors outside any agency's control. We focus on doing the fundamentals properly and transparently.",
    faqs: [
      {
        q: "Can you guarantee first-page rankings?",
        a: "No, and you should be cautious of anyone who does. We build strong foundations and follow search engine guidelines, which gives your content the best chance to perform.",
      },
      {
        q: "How long does SEO take to show results?",
        a: "Technical fixes can take effect as pages are recrawled, but meaningful changes in visibility typically take months and depend on competition.",
      },
      {
        q: "Do you write SEO content?",
        a: "We can optimise existing content and advise on new pages. Ongoing content writing is scoped separately.",
      },
      {
        q: "Is SEO included with your websites?",
        a: "Every website we build includes solid technical foundations such as metadata, sitemaps and semantic structure. Deeper SEO work is a separate service.",
      },
    ],
    related: ["website-redesign", "nextjs-development", "website-maintenance"],
    portfolioCategories: ["website-development"],
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance and Support",
    navTitle: "Website Maintenance",
    group: "growth",
    icon: "wrench",
    visual: "maintenance",
    summary:
      "Ongoing updates, fixes, backups and technical help so your website stays secure, fast and current.",
    metaDescription:
      "Website maintenance and support: content updates, bug fixes, dependency and security updates, backups, performance checks and technical assistance.",
    hero: {
      eyebrow: "Website Maintenance",
      heading: "Keep your website secure, current and working.",
      intro:
        "Websites need regular care. We handle updates, fixes and routine checks so you can focus on running your business, with clear communication about what was done and why.",
    },
    problems: [
      {
        title: "Outdated software",
        text: "Unpatched plugins and dependencies create security risks. Regular updates reduce them.",
      },
      {
        title: "Small issues that linger",
        text: "Broken links and layout bugs erode trust. We fix them promptly.",
      },
      {
        title: "No time for routine updates",
        text: "Content changes pile up when no one owns them. We take care of them for you.",
      },
    ],
    features: [
      { title: "Content updates", text: "Text, image and page changes handled on request." },
      { title: "Bug fixes", text: "Layout problems, broken features and errors investigated and resolved." },
      { title: "Dependency updates", text: "Framework, theme, plugin and package updates tested before release." },
      { title: "Backups", text: "Regular backups where your hosting platform supports them." },
      { title: "Security maintenance", text: "Updates, monitoring and hardening appropriate to your platform." },
      { title: "Performance checks", text: "Periodic reviews of speed and Core Web Vitals." },
      { title: "Technical assistance", text: "Help with domains, hosting, email setup and integrations." },
    ],
    benefits: [
      "Reduced security risk",
      "A website that keeps working as expected",
      "A reliable point of contact for changes",
      "More time to focus on your business",
    ],
    process: [
      { title: "Onboarding", text: "Access, hosting review and a baseline health check." },
      { title: "Routine care", text: "Scheduled updates, backups and checks as agreed." },
      { title: "Requests", text: "Content changes and fixes handled through a simple request process." },
      { title: "Reporting", text: "Regular summaries of the work completed." },
    ],
    note: "Ongoing maintenance is provided under a separate agreement that sets out the included hours, response times and responsibilities. Backups and some security measures depend on what your hosting platform supports.",
    faqs: [
      {
        q: "Do you maintain websites you did not build?",
        a: "Often, yes. We start with a review to understand the site's condition before agreeing a plan.",
      },
      {
        q: "How do I request changes?",
        a: "Through the channel agreed in your maintenance plan. We confirm the request and keep you updated on progress.",
      },
      {
        q: "Is maintenance included after launch?",
        a: "A short period of post-launch support may be included in your project. Ongoing maintenance is a separate agreement.",
      },
      {
        q: "What happens if my site goes down?",
        a: "Response expectations are defined in your maintenance agreement, and we work with your hosting provider to restore service.",
      },
    ],
    related: ["website-development", "wordpress-development", "seo"],
    portfolioCategories: ["website-development"],
  },
];

/** Services highlighted on the home page, in display order. */
export const featuredServiceSlugs = [
  "website-design",
  "website-development",
  "ecommerce-development",
  "wordpress-development",
  "nextjs-development",
  "logo-design",
  "brand-identity",
  "graphic-design",
];

/** Display overrides for the home page cards. */
export const featuredOverrides = {
  "graphic-design": {
    title: "Graphic & Social Media Design",
    summary:
      "Print collateral, campaign graphics and social templates designed to keep every channel consistent.",
  },
};

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}

export function getServicesByGroup(groupId) {
  return services.filter((s) => s.group === groupId);
}

export function serviceHref(slug) {
  return `/services/${slug}`;
}
