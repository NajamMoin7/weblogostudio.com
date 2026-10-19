# Web Logo Studio website

Marketing website for **Web Logo Studio**, covering website design, development, logo design and brand identity.
Built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, Motion and Lucide icons. Components are written in JavaScript (JSX).

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
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional | Public email shown in the footer, contact page and Organization schema. Hidden when empty. |
| `NEXT_PUBLIC_CONTACT_PHONE` | Optional | Public phone number. Hidden when empty. |
| `RESEND_API_KEY`, `FORMS_TO_EMAIL`, `FORMS_FROM_EMAIL` | Option A | Deliver form submissions by email through Resend. The sender domain must be verified in Resend. |
| `FORMS_WEBHOOK_URL`, `FORMS_WEBHOOK_SECRET` | Option B | POST submissions as JSON to a webhook. The secret is sent as `X-Webhook-Secret`. |
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

## Motion and interaction

| Feature | Implementation |
| --- | --- |
| Animated headline | `components/motion/AnimatedHeadline.jsx`. Flow-inspired: words rise out of masks and sharpen from a blur, then the last phrase rotates character by character between "stand out.", "get remembered.", "inspire confidence." and "make an impact.". All phrases share one grid cell, so nothing below moves. Screen readers get one plain sentence. |
| Pause control | `HeroPauseButton` in `components/motion/HeroMotion.jsx`. Pauses the rotating phrase and the ambient background. Motion also pauses when the hero is off screen or the tab is hidden, and is off entirely for reduced motion. |
| Cursor highlight and parallax | `components/motion/HeroMotion.jsx`. One pointer listener writes CSS variables inside requestAnimationFrame: a brand-gradient copy of the headline is revealed under the cursor, and the stage mockups shift at different depths. No React renders, no letter movement, fine pointers only. |
| Service showcase | `components/services/ServiceShowcase.jsx`. A large typographic service list; hover or focus cross-fades the matching photo. Rows show thumbnails on phones, so nothing depends on hover. |
| Buttons | `components/ui/Button.jsx`. Variants primary, secondary, outline, text, icon, dark and outlineDark. `fill` adds a directional slide-in fill on selected primary CTAs. `loading` overlays the branded spinner without changing the button size and sets `aria-busy`. |
| Motion tokens | Durations, easing and stagger live as CSS custom properties in `app/globals.css` and are mirrored for Motion in `lib/motion.js`. |
| Magnetic CTAs | `components/ui/Magnetic.jsx`, used on the hero and final call-to-action buttons. Desktop only. Clicking and keyboard use are unchanged. |
| Carousels | `components/ui/Carousel.jsx` (Embla), used for featured work on the home page and the logo showcase on the home, logo design and brand identity pages. It has buttons, a progress bar, arrow keys and swipe, with no autoplay. Focusing a link in an off-screen slide scrolls it into view. |
| Statement section | `components/sections/Statement.jsx`. Large editorial text whose words brighten as it scrolls through the viewport, using CSS only. |
| Before and after | `components/visuals/BeforeAfter.jsx` on the Website Redesign page. A native range input handles keyboard control, and dragging works with mouse or touch. |
| Scroll reveals | `components/motion/RevealObserver.jsx` plus CSS in `app/globals.css`. One IntersectionObserver reveals elements once as they enter the viewport: `.reveal` fades up, `.reveal-card` lifts and scales in, `.reveal-words` headings sharpen word by word from a blur (all section headings do this automatically), and `.reveal-image` opens a rounded clip-path mask while the image settles from a slight zoom. Items entering together are staggered. Hidden states only apply under `html.reveal-on`, set by an inline script before first paint, so nothing is hidden without JavaScript. |
| Logo marquee | `components/ui/Marquee.jsx`, used by `components/sections/ToolsMarquee.jsx`. Two identical copies translate by exactly -50% for a seamless loop, with edge-fade masking, pause on hover or focus, and a visible pause button. The duplicate is aria-hidden. Under reduced motion it becomes a static, scrollable row. Tool icons come from Simple Icons (CC0) in `data/tools.js`; the names are trademarks of their owners. |
| Swap button | `swap` prop on `components/ui/Button.jsx`. On hover or keyboard focus, the arrow chip travels from the end to the start while the label shifts across. It uses two chips and transforms only. |
| Other scroll effects | CSS scroll timelines still drive the hero parallax, the statement word highlight, the process timeline fill and the header reading progress. |
| Reduced motion | All of the above are disabled or simplified under `prefers-reduced-motion`. |

## Loading behaviour

- **Route loading:** `app/loading.jsx` shows a branded spinner with the W mark only when a route genuinely waits. It fades in after about 300ms, so prefetched static pages never flash it.
- **Slow navigations:** each header link carries a small pending indicator via `useLinkStatus`. It only appears when a navigation was not prefetched and takes time.
- **Forms:** submit buttons switch to a branded spinner and "Sending Request…" or "Sending Message…". Duplicate submits are blocked and values are preserved. Success only shows after the server confirms delivery.
- **Images:** generated images reserve their aspect ratio, show a skeleton and blur placeholder, fade in on load, and fall back to the coded illustration on error.
- **Unknown slugs:** `proxy.js` returns a real 404 for unknown `/services/*` and `/portfolio/*` URLs before rendering. Without it, the prerendered fallback shell would stream a 200 "soft 404".

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
| `data/portfolio.js` | Portfolio projects and filter categories. |
| `data/pricing.js` | Package framework. `price` and `timeline` are `null` and display "Quote on request" until approved values are added. |
| `data/content.js` | Value propositions, process, differentiators, expectations and general FAQs. |
| `data/testimonials.js` | Verified testimonials only. Empty by default. While empty, the home page shows "What to expect" instead. |
| `data/navigation.js` | Header and legal navigation. |
| `lib/site.js` | Site name, URL, contact details, social links and the shared metadata helper. |

### Portfolio projects

All current projects are **concept projects for fictional businesses**, marked `concept: true`. They display a "Concept" badge and an explicit disclaimer, and they claim no results. Their mockups are drawn in code by `components/visuals/ProjectVisual.jsx` from each project's palette.

To add real client work, add an entry with `concept: false`, use details the client has approved, and only set `outcome` to results that can be verified.

### Social links

Add genuine profile URLs to `siteConfig.socials` in `lib/site.js`. They then appear in the footer and as `sameAs` in the Organization schema.

## Brand assets

The source logo is `logo/logo.jpeg`. Derived assets were generated from it without redrawing:

| Asset | Use |
| --- | --- |
| `public/brand/logo-lockup.png` | Full logo with tagline on a transparent background, for the footer and About page |
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
components/ui/       Button, SectionHeading, Accordion, Breadcrumbs, Logo, JsonLd, ServiceIcon, Carousel, Magnetic, Spinner, PageLoader
components/sections/ Home and shared page sections, PageHero, LegalPage
components/services/ ServiceCard, ServiceDetail template
components/portfolio/ProjectCard, PortfolioGrid (client filter)
components/pricing/  PackageCard
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
- Structured data includes Organization, WebSite, Service, BreadcrumbList and FAQPage. No address, ratings or reviews are included.
- The privacy policy and terms are sensible starting points. Have them reviewed for your jurisdiction before launch.
