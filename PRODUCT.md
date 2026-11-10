# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Small local businesses** (trades, clinics, restaurants, salons, professional offices) that need a credible website, logo and brand without agency overhead. Many arrive on a phone from paid Meta ads.
- **Growing companies** (funded startups, mid-size firms) buying larger custom websites, e-commerce builds and brand identity systems.
- Ad visitors land on `/99`: they decide in seconds, on mobile, whether to pay a $50 deposit.

## Product Purpose

Web Logo Studio LLC designs and builds websites, logos and brand identities. The main site wins custom projects through quote requests. `/99` sells one fixed product: a mobile-ready one-page business website for $99 ($50 upfront, $49 on approval), with the first concept in 2 hours. Success means paid deposits on `/99` and qualified quote requests on the main site.

## Positioning

- Speed and certainty on the entry offer: first concept within 2 business hours of receiving the client's info (Mon–Fri, 9am–6pm ET), a fixed price, and a full $50 refund if the client doesn't love the first concept.
- A large body of real delivered work (about 696 projects across logos, branding, web, UI/UX, graphics and social), presented as the team's own.

## Operating Context

- Business: Web Logo Studio LLC, 9 Loretta Lane, Hicksville, NY 11801. Phone (707) 564-6678. Managed by Corebyte Media LLC (https://corebytemediallc.com).
- Socials: Instagram https://www.instagram.com/_weblogostudio/, Facebook https://www.facebook.com/profile.php?id=61595856567270.
- Payments through Stripe Checkout. Ad attribution through Meta Pixel. Form delivery through Resend or a webhook (`lib/delivery.js`).

## Capabilities and Constraints

- Next.js 16 App Router with Cache Components, React 19, Tailwind 4, JSX components.
- `/99` offer scope: one page, up to 5 sections, 2 rounds of changes. Domain and hosting are not included (offered separately).
- No public pricing page for custom work. Custom projects are quoted individually.
- Paid traffic: mobile LCP under 2.5s. Motion must never hide or delay above-the-fold content.

## Brand Commitments

- Name "Web Logo Studio". Logo artwork in `logo/logo.jpeg` and `public/brand/` (supplied asset, preserved).
- Voice: polished studio. Refined and design-forward, but specific: numbers, deadlines and deliverables over adjectives.

## Evidence on Hand

- Portfolio: `data/portfolio-items.json`, images in `public/images/portfolio/` (logos 501, web 60 projects, graphics, branding, apps, social).
- No testimonials, reviews, client counts, awards or years-in-business figures. Never invent any of these. `/99` reviews stay hidden until real ones exist.

## Product Principles

1. Specific beats impressive: every claim names a deliverable, a time or a number the studio can honour.
2. Show the work: real portfolio pieces carry the proof, not adjectives.
3. Speed is the product on `/99`: nothing on that page slows the path to paying.
4. Honest states: forms and payments never claim success the server has not confirmed.

## Accessibility & Inclusion

WCAG 2.2 AA. Respect `prefers-reduced-motion`. Tap targets at least 44px. Phone number tappable on mobile.
