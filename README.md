# Web Logo Studio website

Marketing website for **Web Logo Studio**, covering website design, development, logo design and brand identity.
Built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, Motion, Stripe and Lucide icons. Components are written in JavaScript (JSX).

Web Logo Studio LLC · 9 Loretta Lane, Hicksville, NY 11801 · (707) 564-6678 · managed by Corebyte Media LLC.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run lint
npm run build && npm start
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Production URL for canonical links, Open Graph, sitemap and JSON-LD. Defaults to `https://weblogostudio.com`. |
| `STRIPE_SECRET_KEY` | For `/99` | Server-only Stripe secret key. Creates the $20 deposit Checkout Session and verifies payment on `/99/start`. Without it, the pay button returns to `/99` with a "call us" message. |
| `NEXT_PUBLIC_META_PIXEL_ID` | For ads | Meta Pixel ID. While empty, the Pixel is not loaded. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional | Public email shown in the footer and contact page. Hidden when empty. Phone and address live in `lib/site.js`. |
| `RESEND_API_KEY`, `FORMS_TO_EMAIL`, `FORMS_FROM_EMAIL` | Option A | Deliver contact, quote and `/99` intake submissions by email through Resend (intake photos arrive as attachments). The sender domain must be verified in Resend. |
| `FORMS_WEBHOOK_URL`, `FORMS_WEBHOOK_SECRET` | Option B | POST submissions as JSON to a webhook. Intake files arrive base64-encoded under `attachments`. The secret is sent as `X-Webhook-Secret`. |
| `HF_API_KEY_ID`, `HF_API_KEY_SECRET` | Image generation only | Higgsfield API key used by `npm run images:generate` on your machine. Not needed in the deployed site. |

Form delivery keys are read only on the server (`lib/delivery.js`) and are never sent to the browser.

**Until Option A or B is configured, forms do not deliver anything.** The API responds with `503 not_configured`, and visitors see "Our online form is not connected to an inbox yet, so your message was not sent." Configure delivery before launch.

## Imagery

The site uses three kinds of visuals, in this order of priority:

1. **Higgsfield-generated images**, when generated (see below). None exist yet because the account has no credits left.
2. **Free stock photography from Unsplash**, used today for the hero backdrop, service photos and supporting sections.
3. **Coded mockups**, used for every portfolio concept project, so stock photos are never presented as our work.

### Stock photography (Unsplash)

`data/stock-images.json` lists each photo with its Unsplash photo id, usage and alt text. Only standard-licence images from `images.unsplash.com` are used; Unsplash+ images are excluded. The [Unsplash License](https://unsplash.com/license) allows free commercial use without attribution, and the home service showcase credits Unsplash anyway.

```bash
npm run images:stock            # download anything not yet registered
npm run images:stock -- --force # re-download and regrade everything
```

The script downloads each photo, applies one light grade for consistency, writes a content-hashed WebP to `public/images/stock/` (so caches never serve a stale file), and registers it in `data/stock-assets.json`. Every photo was checked so none shows another company's branding or another designer's portfolio. To swap a photo, change its id in `data/stock-images.json` and rerun with `--force`.

### Higgsfield (optional)

Images are generated **ahead of time** with the [Higgsfield API](https://docs.higgsfield.ai) and served as static, optimised files. The website never calls Higgsfield while serving pages.

How it works:

1. `data/visual-assets.json` defines every image: id, usage, alt text, aspect ratio and an art-directed prompt. A shared style suffix keeps the look consistent, and each request passes the brand palette, or the project's own palette, through Recraft's `colors` and `background_color` controls.
2. `scripts/higgsfield-generate.mjs` calls the documented flow. It posts to `https://api.higgsfield.ai/recraft/v4.1/pro/text-to-image` with `Authorization: Key <id>:<secret>` and an `Idempotency-Key`, then polls `status_url` until the status is `completed`. It downloads the 2K result and converts it with sharp into `public/images/generated/<id>.webp` with a blur placeholder. It retries on rate limits (429) and server errors, and reports authentication, credit and moderation failures clearly.
3. Each result is registered in `data/generated-assets.json`. Components read that file at build time.
4. **If an asset is not registered, the site uses its coded illustration instead.** If a registered file fails to load, the coded illustration also takes over. Nothing breaks when images are missing.

```bash
# add HF_API_KEY_ID and HF_API_KEY_SECRET to .env.local first
npm run images:generate -- --dry-run          # print every request body, call nothing
npm run images:generate -- --only hero-showcase
npm run images:generate                        # everything not yet generated
npm run images:generate -- --force --only service-seo   # regenerate one
npm run build
```

| Asset ids | Where they appear |
| --- | --- |
| `hero-showcase` | Home hero, replacing the coded website mockup |
| `brand-ribbons` | Supporting abstract visual |
| `service-<slug>`, one per service | Hero banner of each service page |
| `project-<slug>`, one per project | Portfolio cards, home carousel and case-study cover |

Review every generated image before publishing. To reject one, delete its entry from `data/generated-assets.json` and its file. Check the Higgsfield terms for commercial use on your plan. Output URLs from Higgsfield expire after about seven days, which is why files are saved locally.

## Design system: "Type Specimen"

The site is set like a foundry specimen sheet: bright paper (`#FBFBF8`), ink (`#141815`), the logo green (`#0B4F3C`) as second ink and one orange marking ink (`#F26A1B`, `#C2470E` for text and buttons) used only on the path a visitor commits to. One variable font, Archivo, runs condensed for display lines and normal width for text. Sheets alternate between the paper colourway and the green colourway (`.theme-forest`). Tokens live in `app/globals.css`.

## Motion and interaction

| Feature | Implementation |
| --- | --- |
| First paint | Nothing above the fold is hidden or delayed. There is no loading screen and no opacity entrance on hero content. |
| Scroll reveals | `components/motion/RevealObserver.jsx`. After hydration, only elements that start below the viewport are marked `data-reveal="pending"`, then fade and rise once as they enter. Content in the first viewport is never touched. |
| Page transitions | `app/(site)/template.jsx` wraps each page in React's `<ViewTransition>`: the old sheet lifts away, the new one settles 8px into place. Client navigations only; the header stays anchored. |
| Hero specimen | `components/sections/Hero.jsx`. A real portfolio logo shown at sign, header, card, app-icon and favicon size. Caption rules draw in; text is static. |
| Live studio clock | `components/ui/StudioClock.jsx`. Eastern time, states whether the 2-hour concept clock is running (Mon–Fri, 9am–6pm ET). |
| Phone mockups | `components/offer/PhoneMockup.jsx` on `/99`. Hover pans through the page; on touch the page pans as you scroll (CSS scroll timeline). |
| Process rule, reading progress | CSS scroll timelines, no JavaScript. |
| Reduced motion | Everything above is disabled or made static under `prefers-reduced-motion`. |

## The $99 offer (`/99`, `/99/start`)

- `/99` is a static, `noindex` landing page for Meta ads, with no site navigation. It is not linked from the menu or the sitemap.
- "Start for $20" (and each "Build mine like this" button under "Pick a style") is a form POST to `app/api/checkout/route.js`, which creates a Stripe Checkout Session ($20, "Website Deposit ($20): $99 One-Page Site") and redirects to Stripe. An optional `style` field (one of the six portfolio slugs in `data/offer99.js`) is stored as `metadata.style`. The card is saved (`customer_creation: "always"`, `setup_future_usage: "off_session"`) so the $79 balance can be charged in Stripe after the customer approves. All amounts come from `pricing99` in `data/offer99.js`. Success returns to `/99/start?session_id={CHECKOUT_SESSION_ID}`; cancel returns to `/99`.
- `/99/start` verifies the session on the server (`lib/stripe.js`: paid, $20, USD, this offer). Anything else redirects to `/99`.
- The intake form (`components/forms/IntakeForm.jsx`) resizes photos in the browser and posts to `app/api/intake/route.js`, which re-verifies the Stripe session and delivers through the same pipeline as the contact form, with the session ID and files attached.
- Reviews: add real reviews to `reviews99` in `data/offer99.js`. The section stays hidden while the list is empty.
- Example sites: `exampleSites` in `data/offer99.js`.

### Meta Pixel events

| Event | When |
| --- | --- |
| `PageView` | Every page load and every client-side navigation (`components/analytics/MetaPixel.jsx`). |
| `ViewContent` | On `/99`. |
| `InitiateCheckout` `{ value: 20 }` | When "Start for $20" or "Build mine like this" is clicked (`components/offer/PayButton.jsx`). |
| `Purchase` `{ value: 20, currency: "USD" }` (from `DEPOSIT.amount`) | On `/99/start`, only after the server confirms payment. `eventID` is the Stripe session ID, and a local guard stops a refresh from sending it twice. |

## Forms

- `app/api/contact/route.js` and `app/api/quote/route.js` receive JSON submissions.
- `lib/forms.js` holds the validation rules shared by the browser and the server.
- `lib/submission.js` applies the body size limit, a per-instance rate limit, a honeypot field and a minimum fill time, then validates and delivers.
- The quote form populates service options from `data/services.js` and preselects a service from `?service=slug`.
- Direct file upload is intentionally not enabled, because it needs secure storage and scanning. Visitors can share a Google Drive or Dropbox link instead.
- The in-memory rate limit is best-effort on serverless hosting. Use a shared store such as Redis if stricter limits are needed.

## Editing content

All content lives in `data/`, separate from presentation.

| File | Contents |
| --- | --- |
| `data/services.js` | All 14 services. Drives cards, `/services/[slug]` pages, quote form options, footer links, sitemap and Service schema. |
| `data/portfolio-items.json` | The migrated portfolio: 696 projects with categories, industries, images and source URLs. Generated by `npm run portfolio:migrate`. |
| `data/work.js` | Helpers over the portfolio: lookup, filtering, related and adjacent projects, and service-page examples. |
| `data/work-featured.js` | Hand-picked projects for the home page carousel and service pages. |
| `data/concepts.js` | Fictional concept businesses, used only for the decorative coded mockups in the hero and service illustrations (labelled "Concept work"). Not part of the portfolio. |
| `data/content.js` | Value propositions, process, differentiators, expectations and general FAQs. |
| `data/testimonials.js` | Verified testimonials only. Empty by default. While empty, the home page shows "What to expect" instead. |
| `data/navigation.js` | Header and legal navigation. |
| `data/offer99.js` | `/99` content: example sites, steps, inclusions, FAQs and (real) reviews. |
| `lib/site.js` | Business name, address, phone, socials, LocalBusiness JSON-LD and the shared metadata helper. |

### Portfolio

The portfolio was migrated from https://portfolio.logodesignpartner.com, the complete source with 696 projects across six categories. The smaller page at www.logodesignpartner.com/portfolio was used to add client names and the web-design card previews.

```bash
npm run portfolio:migrate   # re-read the source, download originals, write web images and data
npm run portfolio:verify    # compare the live source with the dataset and write the report
```

- **Originals:** kept untouched in `portfolio-source/originals/`, which is git-ignored at about 265 MB. Back this folder up.
- **Web versions:** in `public/images/portfolio/<logos|graphics|web|branding|apps|social>/`, about 59 MB. They are resized only and converted to WebP, never cropped or recoloured, and transparency is kept.
- **Mapping:** `docs/portfolio-migration/asset-map.json` maps every source URL to its archived original and web file.
- **Report:** `docs/portfolio-migration/report.md` holds the verification results.
- **Untitled pieces:** projects without a name in the source get a neutral numbered title, such as "Abstract logo · 12". No client names, descriptions or results were invented.
- **Adding work:** append records to `data/portfolio-items.json` with the same shape and place images under `public/images/portfolio/`. Every project gets a page at `/portfolio/<slug>` and appears in the filters automatically.

### Social links

Instagram and Facebook are set in `siteConfig.socials` in `lib/site.js`. They appear in the footer and as `sameAs` in the LocalBusiness schema.

## Brand assets

The source logo is `logo/logo.jpeg`. Derived assets were generated from it without redrawing:

| Asset | Use |
| --- | --- |
| `public/brand/logo-lockup.png` | Full logo on a transparent background, for the About page |
| `public/brand/logo-lockup-white.png` | One-colour white knockout of the supplied `WebLogo Studio.png`, for the green footer |
| `public/brand/logo-wordmark.png` | "WEBLOGO STUDIO" without the tagline, for the header where the tagline would be illegible |
| `app/icon.png`, `app/apple-icon.png` | Favicon and touch icon cropped from the W mark |
| `app/opengraph-image.png`, `app/twitter-image.png` | Social sharing image |

Colours sampled from the logo, and defined as tokens in `app/globals.css`:

| Token | Hex | Source |
| --- | --- | --- |
| `blue` | `#0077FE` | W stroke, L stem |
| `cyan` | `#00E5FC` | W highlight, top of the L |
| `violet` | `#A634FC` | W ribbon, foot of the L |
| `fg` | `#EEF2F8` | Wordmark white |
| `muted` | `#A0AEC8` | Tagline steel |
| `ink` | `#050608` | Logo black background |

The logo was supplied as a JPEG on black. A vector (SVG) master would allow crisper rendering and a version for light backgrounds.

## Project structure

```
app/                 Routes, metadata, sitemap.js, robots.js, API routes, not-found and error pages
components/layout/   Header (client), Footer, MotionProvider
components/ui/       Button, SectionHeading, Accordion, Breadcrumbs, Logo, JsonLd, ServiceIcon, Carousel, Magnetic, Spinner, StudioClock
components/sections/ Home and shared page sections, PageHero, LegalPage
components/services/ ServiceCard, ServiceDetail template
components/portfolio/ProjectCard, PortfolioGrid (client filter)
components/offer/    /99 page: PayButton, PhoneMockup, CheckoutNotice, Reviews99
components/analytics/ MetaPixel, PixelEvent
components/forms/    ContactForm, QuoteForm, field primitives, useFormSubmission hook
components/visuals/  Coded mockups, service illustrations, SmartImage, BeforeAfter
scripts/             higgsfield-generate.mjs (offline image generation)
proxy.js             Real 404s for unknown service and portfolio slugs
data/                Content
lib/                 Site config, validation, delivery
```

## Implementation notes

- Cache Components is enabled. Pages are prerendered. The copyright year comes from a cached function.
- `/services/[slug]` and `/portfolio/[slug]` set `instant = false`, so unknown slugs return a true 404 status.
- Motion respects `prefers-reduced-motion`. Scroll reveals use CSS scroll-driven animations, with no JavaScript, and fall back to static content in browsers that lack support.
- Structured data includes LocalBusiness (with address, phone and socials), WebSite, Service, BreadcrumbList and FAQPage. No ratings or reviews are included.
- `/pricing` was retired and permanently redirects to `/get-a-quote` (`next.config.ts`).
- The privacy policy and terms are sensible starting points. Have them reviewed for your jurisdiction before launch.
