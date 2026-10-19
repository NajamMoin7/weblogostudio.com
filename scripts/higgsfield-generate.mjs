#!/usr/bin/env node
/**
 * Offline image generation with the Higgsfield API (https://docs.higgsfield.ai).
 *
 * Uses the documented REST flow:
 *   POST https://api.higgsfield.ai/recraft/v4.1/pro/text-to-image
 *     Authorization: Key <HF_API_KEY_ID>:<HF_API_KEY_SECRET>
 *     Idempotency-Key: <stable per asset + prompt>
 *   -> { status: "queued", request_id, status_url, cancel_url }
 *   GET status_url until status is completed | failed | nsfw | canceled
 *   -> completed: { images: [{ url }] }
 *
 * Downloads each result, optimises it with sharp into public/images/generated/<id>.webp,
 * and registers it in data/generated-assets.json. The website reads only that file at
 * build time and never calls Higgsfield while serving pages.
 *
 * Usage:
 *   npm run images:generate                     # generate assets missing from the registry
 *   npm run images:generate -- --only hero-showcase,service-seo
 *   npm run images:generate -- --force          # regenerate even if registered
 *   npm run images:generate -- --dry-run        # print requests, call nothing
 *
 * Credentials (server/CLI only, never NEXT_PUBLIC_): HF_API_KEY_ID and HF_API_KEY_SECRET,
 * read from the environment or from .env.local.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://api.higgsfield.ai";
const OUT_DIR = path.join(ROOT, "public", "images", "generated");
const REGISTRY = path.join(ROOT, "data", "generated-assets.json");
const MANIFEST = path.join(ROOT, "data", "visual-assets.json");
const POLL_MS = 4000;
const TIMEOUT_MS = 6 * 60 * 1000;
const WIDTHS = { "16:9": 2000, "14:10": 1600, "4:3": 1600 };

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const onlyArg = args.find((a, i) => args[i - 1] === "--only") ?? args.find((a) => a.startsWith("--only="))?.split("=")[1];
const only = onlyArg ? onlyArg.split(",").map((s) => s.trim()) : null;

function loadEnvLocal() {
  for (const file of [".env.local", ".env"]) {
    const p = path.join(ROOT, file);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function request(url, init, attempt = 0) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(60000) });
  if (res.status === 429 && attempt < 5) {
    const wait = Number(res.headers.get("retry-after")) * 1000 || 2000 * 2 ** attempt;
    console.warn(`  rate limited, retrying in ${Math.round(wait / 1000)}s`);
    await sleep(wait);
    return request(url, init, attempt + 1);
  }
  if (res.status >= 500 && attempt < 3) {
    await sleep(2000 * 2 ** attempt);
    return request(url, init, attempt + 1);
  }
  return res;
}

function explain(status, body) {
  const hints = {
    401: "Authentication failed. Check HF_API_KEY_ID and HF_API_KEY_SECRET.",
    402: "Insufficient credits on the Higgsfield account.",
    403: "This key is not allowed to use the model.",
    422: "The request body was rejected. Check the prompt and parameters.",
  };
  return `${status} ${hints[status] ?? ""} ${typeof body === "string" ? body.slice(0, 300) : JSON.stringify(body).slice(0, 300)}`;
}

async function generate(asset, body, auth) {
  const idempotencyKey = createHash("sha256").update(asset.id + JSON.stringify(body)).digest("hex").slice(0, 32);
  const submit = await request(`${API}/${MANIFEST_DATA.model}`, {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
    body: JSON.stringify(body),
  });
  const submitted = await submit.json().catch(() => ({}));
  if (!submit.ok) throw new Error(explain(submit.status, submitted));

  const statusUrl = submitted.status_url ?? `${API}/requests/${submitted.request_id}/status`;
  const started = Date.now();
  let last = submitted;
  while (!["completed", "failed", "nsfw", "canceled"].includes(last.status)) {
    if (Date.now() - started > TIMEOUT_MS) throw new Error(`timed out waiting for ${submitted.request_id}`);
    await sleep(POLL_MS);
    const res = await request(statusUrl, { headers: { Authorization: auth } });
    last = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(explain(res.status, last));
    process.stdout.write(`  ${last.status}\r`);
  }
  if (last.status !== "completed") throw new Error(`generation ${last.status}${last.error ? `: ${JSON.stringify(last.error)}` : ""}`);
  const url = last.images?.[0]?.url;
  if (!url) throw new Error("completed without an image URL");
  return { url, requestId: submitted.request_id };
}

async function optimise(asset, url) {
  const res = await request(url, {});
  if (!res.ok) throw new Error(`download failed: ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());
  const file = `${asset.id}.webp`;
  const width = WIDTHS[asset.aspect_ratio] ?? 1600;
  const info = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(OUT_DIR, file));
  const blur = await sharp(input).resize(16).webp({ quality: 40 }).toBuffer();
  return {
    src: `/images/generated/${file}`,
    width: info.width,
    height: info.height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
}

const MANIFEST_DATA = JSON.parse(readFileSync(MANIFEST, "utf8"));

async function main() {
  loadEnvLocal();
  const { HF_API_KEY_ID, HF_API_KEY_SECRET } = process.env;
  const dryRun = flag("dry-run");
  if (!dryRun && (!HF_API_KEY_ID || !HF_API_KEY_SECRET)) {
    console.error("Missing HF_API_KEY_ID or HF_API_KEY_SECRET. Create keys at https://console.higgsfield.ai and add them to .env.local.");
    process.exit(1);
  }
  const auth = `Key ${HF_API_KEY_ID}:${HF_API_KEY_SECRET}`;
  const { projects } = await import("../data/portfolio.js");
  const registry = existsSync(REGISTRY) ? JSON.parse(readFileSync(REGISTRY, "utf8")) : {};
  mkdirSync(OUT_DIR, { recursive: true });

  const queue = MANIFEST_DATA.assets.filter(
    (a) => (!only || only.includes(a.id)) && (flag("force") || !registry[a.id]),
  );
  if (!queue.length) return console.log("Nothing to generate. Use --force to regenerate.");

  let ok = 0;
  const failures = [];
  for (const asset of queue) {
    let colors = MANIFEST_DATA.palettes.studio;
    let background = MANIFEST_DATA.palettes.studioBackground;
    if (asset.palette === "project") {
      const p = projects.find((x) => `project-${x.slug}` === asset.id)?.palette;
      if (p) {
        colors = [p.accent, p.surface, p.ink, p.text].map(hexToRgb);
        background = hexToRgb(p.bg);
      }
    }
    const body = {
      prompt: `${asset.prompt} ${MANIFEST_DATA.styleSuffix}`,
      resolution: "2k",
      aspect_ratio: asset.aspect_ratio,
      output_format: "png",
      colors: colors.map((rgb) => ({ rgb })),
      background_color: { rgb: background },
    };
    console.log(`\n${asset.id} (${asset.aspect_ratio})`);
    if (dryRun) {
      console.log(JSON.stringify(body, null, 2));
      continue;
    }
    try {
      const { url, requestId } = await generate(asset, body, auth);
      const optimised = await optimise(asset, url);
      registry[asset.id] = {
        ...optimised,
        alt: asset.alt,
        model: MANIFEST_DATA.model,
        requestId,
        generatedAt: new Date().toISOString(),
      };
      writeFileSync(REGISTRY, `${JSON.stringify(registry, null, 2)}\n`);
      console.log(`  saved ${optimised.src} (${optimised.width}x${optimised.height})`);
      ok += 1;
    } catch (error) {
      console.error(`  failed: ${error.message}`);
      failures.push(asset.id);
    }
  }
  if (!dryRun) {
    console.log(`\nDone: ${ok} generated, ${failures.length} failed${failures.length ? ` (${failures.join(", ")})` : ""}.`);
    console.log("Review the images in public/images/generated/. Remove any entry from data/generated-assets.json to fall back to the coded visual.");
    if (failures.length) process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
