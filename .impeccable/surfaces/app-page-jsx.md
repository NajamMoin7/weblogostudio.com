---
version: 1
slug: "app-page-jsx"
primary_target: "app/page.jsx"
related_targets: ["app/99/page.jsx","app/layout.jsx"]
---

# Surface brief: Web Logo Studio marketing site + /99 ad landing

Scope: whole marketing site (home, inner pages, footer) and /99 + /99/start. Visitor mode: Persuade.
Audience: local small businesses (many on phones from Meta ads) and growing companies. Job: decide to request a quote (main site) or pay the $50 deposit (/99).
Proof: real portfolio (logos, web, branding). No testimonials yet. Constraints: mobile LCP < 2.5s, motion never hides above-fold content, reduced-motion respected.

## Direction contract

THESIS: The studio's work set like a foundry specimen sheet: every logo and site shown at the sizes it must survive, billboard to favicon. Refuses the cream-serif-terracotta agency hero over three icon cards.

OWN-WORLD: Bright specimen paper #FBFBF8, rich ink #141815, logo green #0B4F3C as the second ink, one orange marking ink #F26A1B (accessible #C2470E for text) used only on the path the visitor commits to. One variable grotesk, Archivo, swinging condensed (wdth 62) to expanded (wdth 125). Hairline rules, point-size captions ("96 / Archivo Condensed Bold"), tabular figures. Home/away colorways: paper sheets and inverse green sheets. No cards with icons, no eyebrows, no gradients.

STORY: Visitor sees real work at real sizes, understands the three things sold (websites, logos, brand systems), believes the specifics (deliverables, times), and acts: quote request, or on /99 pays $50.

FIRST VIEWPORT: Thin sheet header (live ET studio clock stating whether the 2-hour concept clock runs; location; phone). No sheet number: the clock is the running head. Left 7/12: the offer set as a size ladder, largest line ~clamp(3rem,8vw,7rem) condensed, steps down in sizes with point captions; primary orange button under it. Right 5/12: one real portfolio logo shown at five sizes (hero tile to 16px favicon) with size captions. Static at first paint; no opacity entrance.

FORM: Type Specimen, position 5 on the ordered list (1 Printer's Proof, 2 Swatch book, 3 Sign-shop lettering, 4 Studio pin-up wall, 5 Type specimen, 6 Identity manual, 7 Stationery flat-lay). Seed key 86d9d5b0. Raises: live ET clock (broadcast), single marking ink on committed path (pattern envelope), home/away colorways (kit), tabular time stamps in process (daylight). Signature interaction: size scrubber — hovering/focusing a size cell sets the mark at that true pixel width on the measuring grid; page transitions as a sheet change (view transition crossfade + 8px rise of the new sheet).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
