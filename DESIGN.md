---
name: Web Logo Studio
description: Websites, logos and brand systems, set like a foundry type specimen sheet.
colors:
  specimen-paper: "#fbfbf8"
  specimen-ink: "#141815"
  sheet-white: "#ffffff"
  paper-shade: "#f1f1ec"
  paper-shade-deep: "#e6e6df"
  ink-muted: "#464d48"
  ink-subtle: "#5b625d"
  hairline: "rgb(20 24 21 / 0.12)"
  hairline-strong: "rgb(20 24 21 / 0.3)"
  logo-green: "#0b4f3c"
  logo-green-deep: "#083d2e"
  away-surface: "#0e5a45"
  away-muted: "#d3e2db"
  away-subtle: "#b9cfc5"
  away-hairline: "rgb(251 251 248 / 0.16)"
  marking-orange: "#f26a1b"
  marking-orange-strong: "#c2470e"
  marking-orange-deep: "#a33a0a"
  marking-orange-text: "#b8430c"
  marking-orange-on-green: "#ffa36b"
  danger: "#b42318"
  success: "#13704f"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.1rem, 8.6vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.015em"
    fontVariation: "\"wdth\" 64"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 78"
  page-title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.4vw, 5.6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 78"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 78"
  lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  button:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.005em"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.06em"
    fontVariation: "\"wdth\" 112"
  caption:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.02em"
    fontFeature: "\"tnum\" 1"
rounded:
  sm: "4px"
  md: "4px"
  lg: "5px"
  xl: "6px"
  full: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "32px"
  gutter-lg: "48px"
  stack: "48px"
  section-compact: "56px"
  section: "80px"
  section-lg: "112px"
  container: "84rem"
components:
  button-primary:
    backgroundColor: "{colors.marking-orange-strong}"
    textColor: "{colors.sheet-white}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.marking-orange-deep}"
    textColor: "{colors.sheet-white}"
  button-primary-lg:
    backgroundColor: "{colors.marking-orange-strong}"
    textColor: "{colors.sheet-white}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "56px"
  button-pay:
    backgroundColor: "{colors.marking-orange-strong}"
    textColor: "{colors.sheet-white}"
    rounded: "{rounded.md}"
    padding: "0 28px"
    height: "68px"
  button-secondary:
    textColor: "{colors.specimen-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.specimen-ink}"
    textColor: "{colors.specimen-paper}"
  button-dark:
    backgroundColor: "{colors.logo-green}"
    textColor: "{colors.specimen-paper}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  button-dark-hover:
    backgroundColor: "{colors.logo-green-deep}"
  button-icon:
    textColor: "{colors.specimen-ink}"
    rounded: "{rounded.full}"
    size: "44px"
  input:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.specimen-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "0 16px"
    height: "48px"
  nav-link:
    textColor: "{colors.ink-muted}"
    typography: "{typography.body}"
  nav-link-active:
    textColor: "{colors.specimen-ink}"
  specimen-tile:
    backgroundColor: "{colors.sheet-white}"
    rounded: "{rounded.xl}"
    padding: "16px"
  work-card:
    backgroundColor: "{colors.sheet-white}"
    rounded: "{rounded.xl}"
  step-numeral:
    backgroundColor: "{colors.specimen-ink}"
    textColor: "{colors.specimen-paper}"
    rounded: "{rounded.full}"
    size: "35px"
  away-sheet:
    backgroundColor: "{colors.logo-green}"
    textColor: "{colors.specimen-paper}"
    padding: "80px 16px"
---

# Design System: Web Logo Studio

## Overview

**Creative North Star: "The Foundry Specimen Sheet"**

The studio's work is presented the way a type foundry presents a typeface: on bright specimen paper, in rich ink, at the sizes it has to survive. The home hero sets the offer as a size ladder (display, subhead, text), each rung annotated with a point-size caption and a short hairline rule, beside one real portfolio logo shown at sign, header, business-card, app-icon and favicon sizes. Everything else on the site borrows that sheet's grammar: condensed headings, ruled lists, tabular figures, small annotations that state facts.

The system is two inks and one marking pen. Ink (specimen-ink) on paper (specimen-paper) carries all reading. Logo green is the second ink: a word of emphasis on paper, or a whole sheet when a section turns to the away colourway. Orange is the marking pen a proofreader would use: it traces the action the visitor commits to and the place they are, and nothing else. Density is editorial rather than dashboard: generous section rhythm (80 to 112px), long measures held to 56ch, content separated by hairlines rather than boxes.

One variable family does all of it. Archivo's width axis swings from condensed (64%) for the biggest specimen lines, through a narrowed heading width (78%), to normal text, to a slightly expanded width (112%) for small set labels. Motion is a print metaphor too: hairline rules draw in, frames open like a sheet slid out of a sleeve, and a page change reads as one sheet replacing another. The first viewport is always static.

**Key Characteristics:**
- Bright specimen paper, rich green-black ink, logo green as second ink, one orange marking ink.
- Home and away colourways: paper sheets and full logo-green sheets, switched by a single theme class.
- One variable grotesk (Archivo) whose width axis carries the hierarchy.
- Hairline rules and ruled lists instead of cards and boxes.
- Point-size captions with tabular figures annotating real measurements, times and sizes.
- Print-sharp corners (4 to 6px); circles only for small controls.
- Flat at rest; lift appears only on hovered work.

## Colors

A cool, slightly green-tinted paper-and-ink palette with one deep brand green and a single orange used as a marking ink.

### Primary
- **Logo Green** (#0b4f3c): the second ink. On paper it sets emphasis words inside display lines ("& brand systems", "$99."), time stamps in the /99 process, and the dark button. As a ground it is the away colourway: featured work, the closing call-to-action sheet, the /99 guarantee and the footer.
- **Logo Green Deep** (#083d2e): hover state of the dark button.

### Secondary
- **Marking Orange** (#f26a1b): the pen itself, for strokes and fills only, never for text on paper. Active-nav underline, the header reading-progress hairline, the process timeline fill, hover rules under service rows, underline decoration on text links, the text selection colour and the spinner arc.
- **Marking Orange Strong** (#c2470e): the fill of every primary button and the pay button, with white text. Also the open-state fill of the accordion toggle.
- **Marking Orange Deep** (#a33a0a): primary button hover, and the fill that slides in from the left on filled buttons.
- **Marking Orange Text** (#b8430c): orange as text or outline on paper: hovered service names, hovered work titles, active specimen captions, required-field asterisks and the global focus outline.
- **Marking Orange on Green** (#ffa36b): the same accent role inside the away colourway, where it replaces the text orange for links, focus and icons.

### Neutral
- **Specimen Paper** (#fbfbf8): page ground in the home colourway; text and button label colour on green.
- **Specimen Ink** (#141815): all primary text, the secondary button's outline and hover fill, step numerals.
- **Sheet White** (#ffffff): raised sheets on paper: the hero specimen tile, work card frames, form controls, and alternate sections such as Process and the /99 steps.
- **Paper Shade** (#f1f1ec) and **Paper Shade Deep** (#e6e6df): image wells and quiet fills behind screenshots.
- **Ink Muted** (#464d48): intros, body copy in lists, inactive nav links.
- **Ink Subtle** (#5b625d): captions, set labels, optional-field hints.
- **Hairline** (rgb(20 24 21 / 0.12)) and **Hairline Strong** (rgb(20 24 21 / 0.3)): section borders, row rules, tile borders; the strong weight for caption rules, form control borders and the base of the process timeline.
- **Away Surface** (#0e5a45), **Away Muted** (#d3e2db), **Away Subtle** (#b9cfc5), **Away Hairline** (rgb(251 251 248 / 0.16)): the same semantic roles re-pointed inside green sheets.
- **Danger** (#b42318) and **Success** (#13704f): form errors and checkout notices; the "studio open" dot and included-item checks.

### Named Rules
**The Marking Ink Rule.** Orange marks only what the visitor commits to and where they are: the primary action, the active nav item, the open accordion item, progress through the page or the process. It never fills a section, never decorates an illustration, and is never a gradient.

**The Three Oranges Rule.** Each orange has one job. #f26a1b is a stroke and fill colour only; #c2470e is the button fill under white text; #b8430c is orange as text on paper; #ffa36b is orange on green. Never set #f26a1b as text on paper.

**The Colourway Rule.** Components use semantic tokens (ground, text, muted, line, accent) and never hard-code a colourway. A sheet turns away by adding the theme-forest class; the same component then reads paper-on-green with no class changes.

## Typography

**Display Font:** Archivo (variable, width axis), with ui-sans-serif, system-ui, sans-serif
**Body Font:** Archivo (same family, normal width)
**Label/Mono Font:** Archivo; the mono token also resolves to Archivo, so the system has exactly one family.

**Character:** A sturdy grotesk pushed along its width axis: condensed and bold for specimen lines that must hold a billboard, normal and plain for reading, slightly expanded for small labels. Hierarchy comes from width and weight together, never from a second face.

### Hierarchy
- **Display** (700, clamp(3.1rem, 8.6vw, 6rem), line-height 0.9, width 64%, uppercase): the home hero line and the closing call-to-action line (up to clamp(2.8rem, 7.4vw, 6rem)), the mobile menu items (2.4rem), the /99 headline and guarantee.
- **Page Title** (700, clamp(2.6rem, 6.4vw, 5.6rem), line-height 0.95, width 78%): inner-page H1. With an aside beside it, clamp(2.4rem, 5vw, 4.4rem).
- **Headline** (700, clamp(2rem, 4.6vw, 3.6rem), line-height 0.98, width 78%): section headings. The large variant is clamp(2.4rem, 6vw, 5rem) at 0.95.
- **Title** (700, 1.35 to 1.7rem, tight leading, width 78%): service names in ruled indexes, process step titles, definition-list terms, the footer phone number.
- **Lead** (400, clamp(1.3rem, 2.2vw, 1.75rem), line-height 1.25): the hero subhead, held to 34ch. Inner-page intros use 1.125rem relaxed.
- **Body** (400, 1rem to 1.06rem, line-height 1.625): running text, held to 56ch in the hero and max-w-2xl in intros. Headings balance their wrap; paragraphs use pretty wrapping.
- **Label** (600, 0.72rem, letter-spacing 0.06em, width 112%, uppercase): set labels for columns and fields: footer column titles, service group heads, contact block heads, portfolio metadata terms, form group labels.
- **Caption** (500, 0.6875rem, letter-spacing 0.02em, tabular figures, ink-subtle): the specimen's annotation voice: point-size captions ("Display · Archivo Condensed Bold"), pixel sizes under the specimen tiles, phone-mockup industries, checkout reassurance, the header address strip.

### Named Rules
**The One Family Rule.** Archivo is the only typeface. Hierarchy moves along the width axis (64% display, 78% headings and titles, 100% text, 112% labels), never to a second family.

**The Headline Stands Alone Rule.** No label, kicker or eyebrow sits above a heading. Set labels name columns, fields and metadata; they never introduce a section title.

**The Caption Rule.** Captions annotate something measurable: a size, a time, a face, a source. They use tabular figures so numbers align, and they are never decoration.

## Layout

The page is a single centered column, max 84rem, with side gutters of 16px, 32px from 640px and 48px from 1024px. The /99 landing uses a narrower 72rem column with the same 16 and 32px gutters. Desktop compositions sit on a 12-column grid: the home hero splits 7/5 (size ladder left, specimen right); FAQ and Expectations split 4/8 with the heading column sticky at 8rem from the top; the closing sheet splits 8/4 with the action column bottom-aligned.

Vertical rhythm is sectional. Main-site sections use 80px padding, rising to 112px from 1024px; /99 sections run tighter at 56px and 80px so the pay path stays short. Section headings sit 48 to 56px above their content. Heroes carry 32px top padding on mobile and 64px on desktop.

Sections are separated by full-width hairlines (top or bottom borders), and by a switch of ground (sheet white or the away green), never by floating panels. Lists are ruled: each row has a bottom hairline, each group or column opens with a 2px ink rule. On mobile everything stacks to one column; the featured work becomes a swipeable carousel at 80% slide width, and the /99 example phones become a horizontal snap row at 62% width. Breakpoints are Tailwind's (640, 768, 1024, 1280px) plus an extra xs step at 26rem (416px) where button rows go side by side.

### Named Rules
**The Hairline Rule.** Structure is drawn with 1px rules and 2px ink heads, not boxes. If a group needs separating, rule it; if a section needs separating, border it or change its ground.

**The Static First Viewport Rule.** Nothing above the fold is hidden, delayed or faded in. Scroll reveals apply only to elements that start below the viewport, once, with a 70ms stagger capped at six items.

## Elevation & Depth

Print is flat. Surfaces sit at rest with no shadow beyond a 1px hairline-weight drop on work cards, and depth comes from ground changes (paper, sheet white, away green) and hairline borders. Lift appears only as a response: a hovered work card or hero specimen tile takes a soft green-tinted lift shadow, the sticky header gains a faint underside shadow once the page has scrolled, and the CSS phone mockups carry one device shadow because they depict a physical object. In the away colourway the same shadows switch to neutral black at higher opacity.

### Shadow Vocabulary
- **Card rest** (`box-shadow: 0 1px 0 rgb(20 24 21 / 0.04)`): work-card frames at rest.
- **Lift** (`box-shadow: 0 18px 40px -22px rgb(11 79 60 / 0.38), 0 2px 6px -2px rgb(20 24 21 / 0.08)`): hovered work cards and the hovered hero specimen tile.
- **Header scrolled** (`box-shadow: 0 8px 24px -20px rgb(20 24 21 / 0.45)`): the sticky header after the scroll sentinel leaves view.
- **Device** (`box-shadow: 0 28px 50px -30px rgb(20 24 21 / 0.7)`): CSS phone frames on /99.

### Named Rules
**The Flat Print Rule.** Surfaces are flat at rest. A shadow appears only when something genuinely lifts under the pointer, or when the header detaches from the page.

## Shapes

Corners are print-sharp. Buttons, nav hit areas and notices use a 4px radius; form controls 5px; the hero specimen tile, work-card frames and the /99 steps strip 6px. Full circles are reserved for small, single-purpose controls: the 44px icon button, process step numerals, the accordion plus toggle, the work-card arrow badge, status dots and the active-item dot in the mobile menu. The only large rounded form is the CSS phone frame (outer 2.4rem, screen 1.9rem), which draws a real device.

Specimen surfaces are measuring surfaces: the hero's large logo sits on a 24px construction grid of hairlines, and tile rows are divided by 1px gaps that show the hairline ground through. Image reveals clip from the top edge (an inset that opens downward), so frames appear to slide out rather than fade.

### Named Rules
**The Print-Sharp Rule.** Rectangles stay at 4 to 6px. Pills and circles are for small controls only, never for primary buttons, cards or sections.

## Components

### Buttons
Square-cut specimen labels: semibold, slightly negative tracking, a 4px corner.
- **Shape:** gently squared (4px), heights 40 / 48 / 56 / 64px by size, horizontal padding 16 to 28px, 10px gap to a trailing arrow.
- **Primary:** marking-orange-strong fill with white label. Reserved for the committed path: "Request a quote", "Get a quote", "Pay $50 & Start".
- **Hover / Focus:** fill deepens to marking-orange-deep; with the fill option, the deeper ink slides in from the left over 480ms (transform only). The trailing arrow travels 3px forward. Press scales to 0.98. Focus uses the global 2px accent outline at 3px offset.
- **Loading:** a spinner overlays the label while the label keeps its width, so the button never resizes.
- **Secondary:** transparent with a 1.5px ink outline; hover fills with ink and flips the label to paper. Used for "Browse the portfolio" and the phone call action.
- **Dark:** logo-green fill with paper label; hover deepens.
- **Text link:** ink text with a 2px underline at 6 to 7px offset; the underline is hairline-strong at rest and turns marking orange on hover (or orange at rest on the text variant).
- **Icon:** 44px circle, 1.5px hairline-strong outline, fills with ink on hover.
- **Pay button (/99):** 68px tall, 1.2rem bold label, minimum 22rem wide from 640px, full width on phones, with a caption below it stating the Stripe and $49-on-approval terms.

### Cards / Containers
The system avoids content cards. Two framed surfaces exist, both for showing work.
- **Work card:** the whole card is one link. A 6px-corner frame with a hairline border and sheet-white ground holds the image at its own aspect ratio (very tall site shots crop to 4:5 from the top). Hover lifts the card 4px, strengthens the border, applies the lift shadow, zooms the image to 1.06 over 900ms and reveals a 36px orange arrow badge. Below the frame: a 0.95rem semibold title (turns accent on hover) and a small uppercase category label.
- **Specimen tile:** the hero figure. A 6px-corner frame with a hairline-strong border; a 16:9 construction-grid well holds the logo at sign size, above a 2-by-2 (4-across from 640px) grid of size cells separated by 1px hairline gaps. Each cell shows the mark at a real pixel width with a caption naming the size and use.

### Inputs / Fields
- **Style:** sheet-white ground, hairline-strong border, 5px corners, 48px tall, 16px horizontal padding; placeholders in ink-subtle.
- **Label:** 0.875rem medium ink above the control, with a required asterisk in the accent colour or an "Optional" note in subtle text on the right.
- **Hover / Focus:** border darkens on hover; on focus the border turns logo green with a 4px logo-green ring at 15% opacity (the browser outline is suppressed).
- **Error:** danger border and ring, and a small dot-led danger message under the control.
- **Select:** same control with a chevron at the right.

### Navigation
- **Header:** sticky, paper ground, bottom hairline. From 768px a 32px running-head strip sits above it with the live studio clock on the left and the town and phone number as captions on the right.
- **Main nav (from 1024px):** 0.95rem medium links, ink-muted at rest, ink when hovered or current. The current page carries a 2px marking-orange underline; hover draws a 2px underline in faded ink from the left over 300ms.
- **Reading progress:** a 1px marking-orange hairline along the header's bottom edge grows with the page's scroll position (scroll-driven, no script; hidden where unsupported).
- **Mobile:** a 44px menu toggle opens a full-height paper panel below the header. Items are set as condensed display lines (2.4rem, uppercase) on ruled rows; the current item gets an orange dot. The panel ends with the full-width quote button, a call button and the studio clock.
- **Footer:** an away (logo-green) sheet. Address and a large phone number in heading width on the left; four columns of links under set labels on the right; legal links under a hairline.

### Accordion
Ruled rows, no boxes. Each question is a full-width button (1.05rem medium) with a 28px circular plus toggle at the right that scales on hover; when open the toggle rotates 45 degrees and fills marking-orange-strong. Panels expand by animating grid rows over 300ms. Arrow keys, Home and End move between questions.

### Studio Clock (signature)
A live Eastern-time line in the header strip and under the /99 pay button: a status dot (success green with a soft ping when open, subtle grey when closed), then "Studio open · 2:14 PM ET · 2-hr concept clock running" or the time the clock next starts, at 0.78rem with tabular figures. It reserves a fixed width before mount so nothing shifts when the time appears.

### Specimen Size Ladder (signature)
The hero's left column. Each rung (display line, subhead, body) is followed by a caption naming its style, led by a 40px hairline-strong rule that draws in on load with a 70ms stagger. Hovering or focusing a specimen cell scales its mark to 1.06 and turns its caption to the accent colour.

### Ruled Index Rows
Services and process outputs are set as ruled lists, not tiles. A service row is one link: a heading-width title (1.45rem bold), a one-line summary in muted text and a trailing arrow; hover turns the title and arrow to the accent colour and draws a 2px marking-orange rule along the row's base from the left over 500ms. Process steps sit on a hairline timeline with 35px ink numerals; from 1024px a 2px orange fill grows along the timeline as the steps scroll through.

### Sheet Transitions
Client-side page changes use the View Transitions API: the old sheet leaves in 140ms (fade and 6px rise), the new sheet settles in over 300ms after a 60ms delay (fade and 8px rise). The header is anchored and does not animate. First loads never animate.

## Do's and Don'ts

### Do:
- **Do** keep the first viewport static: no opacity entrance, no delay on anything above the fold; reveal only what starts below it.
- **Do** switch a whole section to the away colourway with the theme class (featured work, closing call to action, guarantee, footer) rather than recolouring components one by one.
- **Do** set section headings in Archivo at 78% width, bold, with leading under 1, and the largest lines at 64% width uppercase.
- **Do** annotate real values with captions: pixel sizes, times, faces, payment terms, in tabular figures.
- **Do** separate groups with hairlines and open lists and columns with a 2px ink rule.
- **Do** keep tap targets at 44px or more (icon buttons, menu toggle, inputs at 48px) and keep every motion behind the reduced-motion query, which removes reveals, rule draws, the progress bar, phone panning and sheet transitions.
- **Do** keep button widths stable across states: loading spinners overlay the label instead of replacing it.

### Don't:
- **Don't** use gradients anywhere; the legacy gradient utilities are flat marking-orange fills and flat accent text.
- **Don't** set marking orange #f26a1b as text on paper, or use any orange outside the committed path and current-position markers.
- **Don't** put a label, kicker or eyebrow above a heading.
- **Don't** build card grids with icons for services, features or values; use ruled index rows and definition lists.
- **Don't** introduce a second typeface; vary Archivo's width and weight instead.
- **Don't** round primary buttons, cards or sections into pills; corners stay at 4 to 6px.
- **Don't** add shadows to surfaces at rest, or noise and grain textures; print sheets are flat and clean.
