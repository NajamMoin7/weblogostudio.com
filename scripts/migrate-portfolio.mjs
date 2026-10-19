#!/usr/bin/env node
/**
 * Portfolio migration: portfolio.logodesignpartner.com -> Web Logo Studio.
 *
 * Source structure (verified by inspection):
 *   - Category pages /logos, /web-design, /branding, /ui-ux, /social-media, /graphic-design.
 *   - Each page embeds its COMPLETE item list in the server-rendered payload as
 *     service.items = [{ file, w, h, alt, cat?, bg? }]; "Load More" only reveals more of it.
 *   - Originals live at https://portfolio.logodesignpartner.com/work/<category>/<file>.
 *   - www.logodesignpartner.com/portfolio shows a 170-item subset with client names in alt text,
 *     plus separate card thumbnails for web designs (/work/web-design/card/<file>).
 *
 * Output:
 *   - portfolio-source/originals/<category>/<file>   untouched originals (git-ignored archive)
 *   - public/images/portfolio/<category>/<slug>.webp resized for the web (no crop, no recolour)
 *   - data/portfolio-items.json                      the centralized dataset used by the site
 *   - docs/portfolio-migration/asset-map.json         source URL -> local original -> web file
 *   - docs/portfolio-migration/report.md              verification report
 *
 * Usage: npm run portfolio:migrate            (re-uses downloaded originals)
 *        npm run portfolio:migrate -- --refresh (re-download originals)
 */
import { existsSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SUB = "https://portfolio.logodesignpartner.com";
const MAIN = "https://www.logodesignpartner.com";
const REFRESH = process.argv.includes("--refresh");
const CONCURRENCY = 8;
const UA = { "User-Agent": "Mozilla/5.0 (WebLogoStudio portfolio migration)" };

/** Source category -> destination category id, label and folder. */
const CATEGORIES = [
  { source: "logos", id: "logos", label: "Logos", folder: "logos" },
  { source: "graphic-design", id: "graphic-design", label: "Graphic Design", folder: "graphics" },
  { source: "web-design", id: "web-design", label: "Web Design", folder: "web" },
  { source: "branding", id: "branding", label: "Branding", folder: "branding" },
  { source: "ui-ux", id: "ui-ux", label: "UI/UX & Apps", folder: "apps" },
  { source: "social-media", id: "social-media", label: "Social Media", folder: "social" },
];

/** Web sizing: resize only, never upscale, never crop. Long web pages keep their full height. */
const MAX_WIDTH = { logos: 1400, "graphic-design": 1800, "web-design": 1440, branding: 1600, "ui-ux": 1600, "social-media": 1600 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const slugify = (s) =>
  s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

async function get(url, as = "text", tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(120000) });
      if (r.ok) return as === "buffer" ? Buffer.from(await r.arrayBuffer()) : r.text();
      if (r.status === 404) throw new Error("404");
    } catch (e) {
      if (e.message === "404" || i === tries - 1) throw e;
    }
    await sleep(1000 * 2 ** i);
  }
}

function rscPayload(html) {
  return [...html.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)].map((m) => JSON.parse(`"${m[1]}"`)).join("");
}

function extractService(html) {
  const all = rscPayload(html);
  const i = all.indexOf('"service":{');
  if (i < 0) throw new Error("service payload not found");
  let depth = 0, j = i + 10;
  for (; j < all.length; j++) {
    if (all[j] === "{") depth++;
    else if (all[j] === "}" && --depth === 0) break;
  }
  return JSON.parse(all.slice(i + 10, j + 1));
}

function extractJsonLd(html) {
  const out = {};
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try { data = JSON.parse(m[1]); } catch { continue; }
    const walk = (o) => {
      if (Array.isArray(o)) return o.forEach(walk);
      if (o && typeof o === "object") {
        if (o["@type"] === "ImageObject" && o.contentUrl) out[new URL(o.contentUrl).pathname] = { name: o.name, description: o.description };
        Object.values(o).forEach(walk);
      }
    };
    walk(data);
  }
  return out;
}

/** "The Dot Connecting Group Abstract logo design by Logo Design Partner" -> "The Dot Connecting Group" */
function titleFromMainAlt(alt, category, industry) {
  let t = alt.replace(/\s*,?\s*(?:by )?Logo Design Partner\s*$/i, "").trim();
  t = t.replace(/\s+by$/i, "");
  if (category === "logos") {
    if (industry) t = t.replace(new RegExp(`\\s+${industry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+logo design$`, "i"), "");
    t = t.replace(/\s+logo design$/i, "");
  } else {
    t = t.replace(/,\s*(?:website design|graphic design|brand identity design|ui\/ux design|app ui design|social media design|branding)$/i, "");
  }
  return t.trim();
}

/** Readable title from a filename, used only for web/social/UI items whose files carry the project name. */
function titleFromFile(file) {
  return file
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b(landing page|landing|page|website|web|design|mockup|copy|scaled|final)\b/gi, " ")
    .replace(/\s+\d+$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  const report = { started: new Date().toISOString(), categories: {}, failures: [], notes: [] };
  const assetMap = [];

  // 1. Main site: client names (alt text) and web-design card thumbnails.
  const mainHtml = await get(`${MAIN}/portfolio`);
  const mainAlt = {};
  for (const m of mainHtml.matchAll(/<img[^>]+>/g)) {
    const tag = m[0];
    const src = (tag.match(/src="(\/work\/[^"]+)"/) || [])[1];
    const alt = (tag.match(/alt="([^"]*)"/) || [])[1];
    if (src) mainAlt[src] = decode(alt || "");
  }
  report.mainSiteItems = Object.keys(mainAlt).length;

  const items = [];
  const seenSlugs = new Set();
  const seenFiles = new Set();

  for (const cat of CATEGORIES) {
    const html = await get(`${SUB}/${cat.source}`);
    const svc = extractService(html);
    const jsonLd = extractJsonLd(html);
    const origDir = path.join(ROOT, "portfolio-source", "originals", cat.source);
    const webDir = path.join(ROOT, "public", "images", "portfolio", cat.folder);
    mkdirSync(origDir, { recursive: true });
    mkdirSync(webDir, { recursive: true });
    const stats = { sourceCount: svc.items.length, migrated: 0, failed: 0, withClientName: 0, withDescription: 0, multiImage: 0, industries: {} };
    let seq = 0;
    const tasks = [];

    // Phase 1 (sequential, deterministic): metadata, titles and unique slugs.
    for (const it of svc.items) {
      seq += 1;
      const sourcePath = `/work/${cat.source}/${it.file}`;
      const sourceUrl = `${SUB}/work/${cat.source}/${encodeURIComponent(it.file)}`;
      const key = `${cat.source}/${it.file}`;
      if (seenFiles.has(key)) {
        report.notes.push(`Duplicate record skipped: ${key}`);
        continue;
      }
      seenFiles.add(key);

      const industry = cat.source === "logos" && it.cat ? decode(it.cat) : undefined;
      if (industry) stats.industries[industry] = (stats.industries[industry] || 0) + 1;
      const fromMain = mainAlt[sourcePath];
      const ld = jsonLd[sourcePath];
      // Web designs: the main site has a card thumbnail (and the client name) for the same project.
      const base = it.file.replace(/\.[a-z0-9]+$/i, "");
      const cardKey =
        cat.source === "web-design" ? Object.keys(mainAlt).find((p) => p.startsWith(`/work/web-design/card/${base}.`)) : undefined;

      let clientName = fromMain ? titleFromMainAlt(fromMain, cat.source, industry) : undefined;
      if (!clientName && cardKey && mainAlt[cardKey]) clientName = titleFromMainAlt(mainAlt[cardKey], cat.source);
      let altDescription;
      if (!clientName && it.alt && !/^(logo|branding|ui\/ux|graphic design)$/i.test(it.alt)) {
        const a = decode(it.alt).replace(/\s+logo design$/i, "").replace(/\s+designed by Logo Design Partner$/i, "");
        if (!/^stationary \d+$/i.test(a)) {
          // "Oli's Roofing Company social media campaign: welcome, ... posts" -> title + description.
          const [head, ...rest] = a.split(":");
          clientName = head
            .trim()
            .split(/\s+/)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
          if (rest.length) altDescription = `${rest.join(":").trim().replace(/^\w/, (m) => m.toUpperCase())}.`;
        }
      }
      const titleSource0 = clientName ? "source" : "derived";
      let titleSource = titleSource0;
      let title = clientName;
      if (!title && ["web-design", "social-media"].includes(cat.source)) {
        title = titleFromFile(it.file);
        titleSource = "filename";
      }
      if (!title) title = industry ? `${industry} logo` : `${cat.label} project`;
      // Source alt text such as "Stationary 18" describes the piece type; the spelling is normalised.
      // Only alt text shaped like "<Type> <number>" (e.g. "Stationary 18") is a piece type.
      const graphicType =
        cat.source === "graphic-design" && it.alt && /^[A-Za-z][A-Za-z &]* \d+$/.test(decode(it.alt).trim())
          ? decode(it.alt).replace(/\s+\d+$/, "").replace(/^Stationary$/i, "Stationery")
          : undefined;
      const description =
        ld?.description && !/^.{0,40} by Logo Design Partner$/i.test(ld.description) && !/^Stationary \d+$/i.test(ld.description)
          ? ld.description.replace(/\s*(?:designed )?by Logo Design Partner\s*$/i, "")
          : altDescription;
      if (clientName) stats.withClientName++;
      if (description) stats.withDescription++;

      let slug = slugify(`${title}-${cat.id === "logos" ? "logo" : cat.id}`) || slugify(`${cat.id}-${seq}`);
      if (seenSlugs.has(slug)) {
        let n = 2;
        while (seenSlugs.has(`${slug}-${n}`)) n++;
        slug = `${slug}-${n}`;
      }
      seenSlugs.add(slug);
      tasks.push({ it, seq, slug, title, titleSource, industry, graphicType, description, sourceUrl, cardKey });
    }

    // Phase 2 (parallel): download originals (untouched) and write web versions.
    async function processTask(t) {
      const origPath = path.join(origDir, t.it.file);
      const fetchOriginal = async () => writeFileSync(origPath, await get(t.sourceUrl, "buffer"));
      if (REFRESH || !existsSync(origPath) || statSync(origPath).size === 0) await fetchOriginal();
      let meta;
      try {
        meta = await sharp(origPath).metadata();
        await sharp(origPath).stats();
      } catch {
        await fetchOriginal(); // a partial file from an interrupted run: download it again
        meta = await sharp(origPath).metadata();
      }
      const images = [];
      const webFile = `${t.slug}.webp`;
      await sharp(origPath)
        .rotate()
        .resize({ width: MAX_WIDTH[cat.source], withoutEnlargement: true })
        .webp({ quality: cat.source === "logos" ? 88 : 82, alphaQuality: 100, effort: 5 })
        .toFile(path.join(webDir, webFile));
      const out = await sharp(path.join(webDir, webFile)).metadata();
      images.push({
        src: `/images/portfolio/${cat.folder}/${webFile}`,
        width: out.width,
        height: out.height,
        role: "full",
        original: { width: meta.width, height: meta.height, format: meta.format, hasAlpha: Boolean(meta.hasAlpha) },
      });
      const assets = [{ slug: t.slug, role: "full", sourceUrl: t.sourceUrl, original: path.relative(ROOT, origPath).replaceAll("\\", "/"), web: images[0].src }];
      if (t.cardKey) {
        const cardOrig = path.join(ROOT, "portfolio-source", "originals", "web-design-card", path.basename(t.cardKey));
        mkdirSync(path.dirname(cardOrig), { recursive: true });
        const cardUrl = `${MAIN}${encodeURI(t.cardKey)}`;
        if (REFRESH || !existsSync(cardOrig) || statSync(cardOrig).size === 0) writeFileSync(cardOrig, await get(cardUrl, "buffer"));
        const cardFile = `${t.slug}-card.webp`;
        await sharp(cardOrig).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(webDir, cardFile));
        const cm = await sharp(path.join(webDir, cardFile)).metadata();
        images.unshift({ src: `/images/portfolio/${cat.folder}/${cardFile}`, width: cm.width, height: cm.height, role: "card" });
        assets.push({ slug: t.slug, role: "card", sourceUrl: cardUrl, original: path.relative(ROOT, cardOrig).replaceAll("\\", "/"), web: images[0].src });
      }
      return {
        assets,
        record: {
          id: `lp-${cat.source}-${t.seq}`,
          slug: t.slug,
          title: t.title,
          titleSource: t.titleSource,
          category: cat.id,
          ...(t.industry ? { subcategory: t.industry } : {}),
          ...(t.graphicType ? { subcategory: t.graphicType } : {}),
          ...(t.description ? { description: t.description } : {}),
          ...(t.it.bg ? { background: t.it.bg } : {}),
          thumbnail: images.find((x) => x.role === "card") ?? images[0],
          images,
          sourceUrl: t.sourceUrl,
          sourceOrder: t.seq,
        },
      };
    }

    const results = new Array(tasks.length);
    let next = 0;
    let done = 0;
    async function worker() {
      while (next < tasks.length) {
        const i = next++;
        try {
          results[i] = await processTask(tasks[i]);
        } catch (e) {
          results[i] = { error: e.message, task: tasks[i] };
        }
        if (++done % 25 === 0) console.log(`${cat.source}: ${done}/${tasks.length}`);
      }
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));

    for (const r of results) {
      if (r.error) {
        stats.failed++;
        report.failures.push({ category: cat.source, file: r.task.it.file, sourceUrl: r.task.sourceUrl, error: r.error });
        continue;
      }
      items.push(r.record);
      assetMap.push(...r.assets);
      stats.migrated++;
      if (r.record.images.length > 1) stats.multiImage++;
    }
    report.categories[cat.source] = stats;
    console.log(`${cat.source}: ${stats.migrated}/${stats.sourceCount} migrated, ${stats.failed} failed`);
  }

  // Main-site items that did not map onto a subdomain record.
  const mapped = new Set(assetMap.map((a) => new URL(a.sourceUrl).pathname).map(decodeURIComponent));
  report.mainSiteUnmapped = Object.keys(mainAlt).filter((p) => !mapped.has(p));

  writeFileSync(path.join(ROOT, "data", "portfolio-items.json"), `${JSON.stringify({ source: SUB, migratedAt: report.started, categories: CATEGORIES.map(({ id, label, folder }) => ({ id, label, folder })), items }, null, 1)}\n`);
  mkdirSync(path.join(ROOT, "docs", "portfolio-migration"), { recursive: true });
  writeFileSync(path.join(ROOT, "docs", "portfolio-migration", "asset-map.json"), `${JSON.stringify(assetMap, null, 1)}\n`);
  writeFileSync(path.join(ROOT, "docs", "portfolio-migration", "report.json"), `${JSON.stringify({ ...report, totalSource: Object.values(report.categories).reduce((a, c) => a + c.sourceCount, 0), totalMigrated: items.length, assets: assetMap.length }, null, 1)}\n`);
  console.log(`\nDone: ${items.length} projects, ${assetMap.length} assets, ${report.failures.length} failures.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
