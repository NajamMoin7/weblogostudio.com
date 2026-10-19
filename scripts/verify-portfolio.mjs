#!/usr/bin/env node
/**
 * Independent verification of the portfolio migration.
 * Re-reads the live source category pages, compares them record by record with
 * data/portfolio-items.json, checks every referenced file exists on disk, and writes
 * docs/portfolio-migration/report.md.
 *
 * Usage: npm run portfolio:verify
 */
import { existsSync, readFileSync, statSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SUB = "https://portfolio.logodesignpartner.com";
const SOURCES = ["logos", "graphic-design", "web-design", "branding", "ui-ux", "social-media"];

const dataset = JSON.parse(readFileSync(path.join(ROOT, "data", "portfolio-items.json"), "utf8"));
const migration = JSON.parse(readFileSync(path.join(ROOT, "docs", "portfolio-migration", "report.json"), "utf8"));
const assetMap = JSON.parse(readFileSync(path.join(ROOT, "docs", "portfolio-migration", "asset-map.json"), "utf8"));

function payload(html) {
  return [...html.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)].map((m) => JSON.parse(`"${m[1]}"`)).join("");
}
function serviceItems(html) {
  const all = payload(html);
  const i = all.indexOf('"service":{');
  let d = 0, j = i + 10;
  for (; j < all.length; j++) {
    if (all[j] === "{") d++;
    else if (all[j] === "}" && --d === 0) break;
  }
  return JSON.parse(all.slice(i + 10, j + 1)).items;
}
async function sourceCounts() {
  const home = await (await fetch(SUB, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
  const counts = {};
  for (const m of home.matchAll(/href="\/([a-z-]+)"[^>]*>[\s\S]{0,400}?(\d+)\s*(?:<!-- -->)?\s*projects/g)) counts[m[1]] = Number(m[2]);
  return counts;
}

const lines = [];
const out = (s = "") => lines.push(s);

const advertised = await sourceCounts();
const bySourceUrl = new Map(dataset.items.map((it) => [decodeURIComponent(new URL(it.sourceUrl).pathname), it]));
const missing = [];
const perCat = [];
let sourceTotal = 0;
for (const cat of SOURCES) {
  const html = await (await fetch(`${SUB}/${cat}`, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
  const items = serviceItems(html);
  sourceTotal += items.length;
  const present = items.filter((it) => bySourceUrl.has(`/work/${cat}/${it.file}`));
  items.filter((it) => !bySourceUrl.has(`/work/${cat}/${it.file}`)).forEach((it) => missing.push(`${cat}/${it.file}`));
  perCat.push({ cat, advertised: advertised[cat] ?? "n/a", source: items.length, migrated: present.length });
}

// File checks.
const missingFiles = [];
let webBytes = 0;
for (const it of dataset.items) for (const img of it.images) {
  const p = path.join(ROOT, "public", img.src);
  if (!existsSync(p)) missingFiles.push(img.src);
  else webBytes += statSync(p).size;
}
const missingOriginals = assetMap.filter((a) => !existsSync(path.join(ROOT, a.original))).map((a) => a.original);
let origBytes = 0;
for (const a of assetMap) if (existsSync(path.join(ROOT, a.original))) origBytes += statSync(path.join(ROOT, a.original)).size;

// Orphans: web files on disk not referenced by any record.
const referenced = new Set(dataset.items.flatMap((it) => it.images.map((i) => i.src)));
const orphans = [];
const webRoot = path.join(ROOT, "public", "images", "portfolio");
for (const dir of readdirSync(webRoot)) for (const f of readdirSync(path.join(webRoot, dir))) {
  const src = `/images/portfolio/${dir}/${f}`;
  if (!referenced.has(src)) orphans.push(src);
}

const ids = dataset.items.map((i) => i.id);
const slugs = dataset.items.map((i) => i.slug);
const dupIds = ids.filter((v, i) => ids.indexOf(v) !== i);
const dupSlugs = slugs.filter((v, i) => slugs.indexOf(v) !== i);
const multi = dataset.items.filter((i) => i.images.length > 1);
const named = dataset.items.filter((i) => i.titleSource === "source");
const fromFile = dataset.items.filter((i) => i.titleSource === "filename");
const untitled = dataset.items.filter((i) => i.titleSource === "derived");
const withDescription = dataset.items.filter((i) => i.description);
const alpha = dataset.items.filter((i) => i.images.some((im) => im.original?.hasAlpha));
const slugAdjusted = dataset.items.filter((i) => /-\d+$/.test(i.slug) && dataset.items.some((o) => o !== i && i.slug.startsWith(o.slug)));

const complete = missing.length === 0 && missingFiles.length === 0 && missingOriginals.length === 0 && migration.failures.length === 0 && dataset.items.length === sourceTotal;

out("# Portfolio migration report");
out();
out(`Source: ${SUB} (verified against the live site on ${new Date().toISOString().slice(0, 10)}).`);
out(`Destination: \`data/portfolio-items.json\`, images in \`public/images/portfolio/\`, originals archived in \`portfolio-source/originals/\` (git-ignored).`);
out();
out(`**Result: ${complete ? "every source record was migrated, and every referenced file exists" : "INCOMPLETE, see the sections below"}.**`);
out();
out("## Totals");
out();
out("| Measure | Count |");
out("| --- | --- |");
out(`| Source projects discovered (all categories, including items behind Load More) | ${sourceTotal} |`);
out(`| Projects migrated | ${dataset.items.length} |`);
out(`| Original images downloaded | ${assetMap.length} (${(origBytes / 1e6).toFixed(1)} MB) |`);
out(`| Images that failed to download | ${migration.failures.length} |`);
out(`| Web images written | ${dataset.items.reduce((a, i) => a + i.images.length, 0)} (${(webBytes / 1e6).toFixed(1)} MB) |`);
out(`| Projects with multiple images | ${multi.length} |`);
out(`| Logos with transparency preserved | ${alpha.length} |`);
out();
out("## By category");
out();
out("| Source category | Count shown on source home page | Records in source data | Migrated |");
out("| --- | --- | --- | --- |");
for (const c of perCat) out(`| ${c.cat} | ${c.advertised} | ${c.source} | ${c.migrated} |`);
out();
const ind = migration.categories.logos?.industries ?? {};
out(`Logo industries (subcategories): ${Object.keys(ind).length}.`);
out();
out(Object.entries(ind).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} (${v})`).join(", "));
out();
out("## Metadata completeness");
out();
out(`- **Client or project name from the source:** ${named.length} projects. Names come from the main site's portfolio (www.logodesignpartner.com/portfolio) alt text, matched by image path, or from the subdomain's own alt text.`);
out(`- **Name taken from the image filename:** ${fromFile.length} web and social projects whose files carry the project name (for example "Ace Logistics").`);
out(`- **No name in the source:** ${untitled.length} projects. They are titled by category and numbered (for example "Abstract logo · 12"), with no invented client names.`);
out(`- **Description from the source:** ${withDescription.length} projects. The source has no descriptions for the others, so none were written.`);
out("- **Not available anywhere in the source:** individual project pages, case-study text, dates, and results. None were invented.");
out("- **Spelling:** the source alt text \"Stationary\" is used as a graphic-design type and normalised to \"Stationery\".");
out();
out("## Duplicates and identity");
out();
out(`- **Duplicate source records:** ${migration.notes.filter((n) => n.startsWith("Duplicate")).length}.`);
out(`- **Duplicate ids:** ${dupIds.length}. **Duplicate slugs:** ${dupSlugs.length}.`);
out(`- **Shared titles:** ${slugAdjusted.length} projects share a title with another project. Their slugs got a numeric suffix so nothing was dropped.`);
out("- **Similar filenames:** files that look like variants, such as \"Abstract-290-scaled\" and \"Abstract-290-copy\", are different clients according to the main site, so each stays a separate project.");
out();
out("## Multiple images");
out();
out(`${multi.length} web-design projects have two images: the card preview from www.logodesignpartner.com/portfolio and the full-length page from the subdomain.`);
out();
out("## Checks");
out();
out(`- **Source records missing from the destination:** ${missing.length}${missing.length ? `: ${missing.slice(0, 20).join(", ")}` : ""}.`);
out(`- **Referenced web images missing on disk:** ${missingFiles.length}.`);
out(`- **Archived originals missing on disk:** ${missingOriginals.length}.`);
out(`- **Unreferenced web files in public/images/portfolio:** ${orphans.length}${orphans.length ? `: ${orphans.slice(0, 10).join(", ")}` : ""}.`);
out(`- **Main-site images not mapped to a subdomain record:** ${migration.mainSiteUnmapped?.length ?? 0}.`);
if (migration.failures.length) {
  out();
  out("### Failures");
  for (const f of migration.failures) out(`- ${f.category}/${f.file}: ${f.error}`);
}
out();
out("## Asset mapping");
out();
out("`docs/portfolio-migration/asset-map.json` lists every asset: project slug, role (full or card), source URL, archived original and web file.");
out();
out("## Image handling");
out();
out("- **Originals:** kept byte-for-byte in `portfolio-source/originals/`.");
out("- **Web versions:** resized only, never cropped, recoloured or upscaled, and converted to WebP. Transparency is kept. Maximum widths are 1,400px for logos, 1,800px for graphics, 1,440px for full-length web pages and 1,600px otherwise.");
out("- **Tall pages:** full website pages keep their full height. The grid shows their source card preview, or the top of the page in a 4:5 frame, as a display crop only.");

writeFileSync(path.join(ROOT, "docs", "portfolio-migration", "report.md"), `${lines.join("\n")}\n`);
console.log(lines.slice(0, 30).join("\n"));
if (!complete) process.exitCode = 1;
