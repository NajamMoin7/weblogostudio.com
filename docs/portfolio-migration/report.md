# Portfolio migration report

Source: https://portfolio.logodesignpartner.com (verified against the live site on 2026-10-19).
Destination: `data/portfolio-items.json`, images in `public/images/portfolio/`, originals archived in `portfolio-source/originals/` (git-ignored).

**Result: every source record was migrated, and every referenced file exists.**

## Totals

| Measure | Count |
| --- | --- |
| Source projects discovered (all categories, including items behind Load More) | 696 |
| Projects migrated | 696 |
| Original images downloaded | 756 (265.2 MB) |
| Images that failed to download | 0 |
| Web images written | 756 (58.7 MB) |
| Projects with multiple images | 60 |
| Logos with transparency preserved | 12 |

## By category

| Source category | Count shown on source home page | Records in source data | Migrated |
| --- | --- | --- | --- |
| logos | 501 | 501 | 501 |
| graphic-design | 101 | 101 | 101 |
| web-design | 60 | 60 | 60 |
| branding | 18 | 18 | 18 |
| ui-ux | 8 | 8 | 8 |
| social-media | 8 | 8 | 8 |

Logo industries (subcategories): 34.

Accounting & Financial (27), Arts & Entertainment (26), Pet Care & Veterinary (23), Automotive (18), Landscaping (17), Sports (17), Beauty, Skin Care & Cosmetics (16), Cleaning Services (16), Construction, Roofing & Interior Design (16), Fashion & Athletic Apparel (16), Health & Wellness (16), HVAC & Plumbing (16), IT & Tech (16), Npo, Charity & Fundraising (16), Photography (16), Textbased (16), Travel & Tours (16), E-Commerce & Retail Shops (15), Education & E-Learning (15), Legal & Law (15), Restaurant & Food Truck (15), Font + Meaning (14), Abstract (12), Initials (12), Recruitment & Staffing Solutions (12), Telecommunications (12), Badges, Crest & Anniversary (11), Mascots (11), Agriculture (10), App Icons (10), Architectural (10), Pool (10), Religious (10), Logistics & Transport (3)

## Metadata completeness

- **Client or project name from the source:** 249 projects. Names come from the main site's portfolio (www.logodesignpartner.com/portfolio) alt text, matched by image path, or from the subdomain's own alt text.
- **Name taken from the image filename:** 1 web and social projects whose files carry the project name (for example "Ace Logistics").
- **No name in the source:** 446 projects. They are titled by category and numbered (for example "Abstract logo · 12"), with no invented client names.
- **Description from the source:** 31 projects. The source has no descriptions for the others, so none were written.
- **Not available anywhere in the source:** individual project pages, case-study text, dates, and results. None were invented.
- **Spelling:** the source alt text "Stationary" is used as a graphic-design type and normalised to "Stationery".

## Duplicates and identity

- **Duplicate source records:** 0.
- **Duplicate ids:** 0. **Duplicate slugs:** 0.
- **Shared titles:** 410 projects share a title with another project. Their slugs got a numeric suffix so nothing was dropped.
- **Similar filenames:** files that look like variants, such as "Abstract-290-scaled" and "Abstract-290-copy", are different clients according to the main site, so each stays a separate project.

## Multiple images

60 web-design projects have two images: the card preview from www.logodesignpartner.com/portfolio and the full-length page from the subdomain.

## Checks

- **Source records missing from the destination:** 0.
- **Referenced web images missing on disk:** 0.
- **Archived originals missing on disk:** 0.
- **Unreferenced web files in public/images/portfolio:** 0.
- **Main-site images not mapped to a subdomain record:** 0.

## Asset mapping

`docs/portfolio-migration/asset-map.json` lists every asset: project slug, role (full or card), source URL, archived original and web file.

## Image handling

- **Originals:** kept byte-for-byte in `portfolio-source/originals/`.
- **Web versions:** resized only, never cropped, recoloured or upscaled, and converted to WebP. Transparency is kept. Maximum widths are 1,400px for logos, 1,800px for graphics, 1,440px for full-length web pages and 1,600px otherwise.
- **Tall pages:** full website pages keep their full height. The grid shows their source card preview, or the top of the page in a 4:5 frame, as a display crop only.
