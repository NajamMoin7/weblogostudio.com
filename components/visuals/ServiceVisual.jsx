import { Check } from "lucide-react";
import ProjectVisual from "./ProjectVisual";
import Mark from "./Mark";
import { getProject } from "@/data/portfolio";
import { getAsset } from "@/lib/assets";
import SmartImage from "./SmartImage";
import BeforeAfter from "./BeforeAfter";

/**
 * Service-specific illustrations, keyed by `service.visual` in data/services.js.
 * Built in code with the studio palette, or reusing concept project mockups.
 */

function Panel({ children, className = "" }) {
  return (
    <div className={`@container relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-line bg-surface ${className}`}>
      {children}
    </div>
  );
}

function Line({ w, c = "bg-fg/15", h = "h-[0.9cqw]" }) {
  return <span aria-hidden="true" className={`block rounded-full ${h} ${c}`} style={{ width: w }} />;
}

function WebsiteDesign() {
  return (
    <Panel className="grid-lines">
      {/* Wireframe behind */}
      <div className="absolute left-[5%] top-[7%] w-[56%] rounded-[1cqw] border border-dashed border-fg/25 bg-ink/60 p-[2.5cqw]">
        <div className="mb-[2cqw] flex justify-between">
          <span className="h-[2cqw] w-[10cqw] rounded-sm border border-fg/30" />
          <span className="h-[2cqw] w-[16cqw] rounded-sm border border-fg/20" />
        </div>
        <div className="grid grid-cols-2 gap-[2cqw]">
          <div className="space-y-[1.2cqw]">
            <Line w="90%" c="bg-fg/25" h="h-[2cqw]" />
            <Line w="70%" c="bg-fg/25" h="h-[2cqw]" />
            <Line w="80%" />
            <span className="mt-[1.5cqw] block h-[3cqw] w-[12cqw] rounded-sm border border-fg/30" />
          </div>
          <div className="relative aspect-[4/3] rounded-sm border border-fg/25">
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
              <path d="M0 0 100 100M100 0 0 100" stroke="rgb(238 242 248 / 0.18)" strokeWidth="0.6" />
            </svg>
          </div>
        </div>
        <span className="eyebrow mt-[2cqw] block text-[1.1cqw] text-subtle">Wireframe</span>
      </div>
      {/* Final design in front */}
      <div className="absolute bottom-[6%] right-[4%] w-[62%]">
        <ProjectVisual project={getProject("lumen-dental-studio")} kind="web" label="Finished website design mockup" />
      </div>
    </Panel>
  );
}

function CodeVisual() {
  const lines = [
    [["text-violet", "export default"], ["text-fg", " async function "], ["text-cyan", "Page"], ["text-fg", "() {"]],
    [["text-fg/60", "  // Rendered on the server, cached at build"]],
    [["text-violet", "  const"], ["text-fg", " services = "], ["text-violet", "await"], ["text-cyan", " getServices"], ["text-fg", "()"]],
    [["text-violet", "  return"], ["text-fg", " ("]],
    [["text-fg", "    <"], ["text-blue-bright", "Layout"], ["text-fg", ">"]],
    [["text-fg", "      <"], ["text-blue-bright", "Hero"], ["text-cyan", " title"], ["text-fg", "="], ["text-[#9fe6b8]", '"Built to perform"'], ["text-fg", " />"]],
    [["text-fg", "      <"], ["text-blue-bright", "ServiceGrid"], ["text-cyan", " items"], ["text-fg", "={services} />"]],
    [["text-fg", "    </"], ["text-blue-bright", "Layout"], ["text-fg", ">"]],
    [["text-fg", "  )"]],
    [["text-fg", "}"]],
  ];
  return (
    <Panel>
      <div className="absolute inset-[5%] right-[22%] overflow-hidden rounded-[1.2cqw] border border-line bg-ink">
        <div className="flex items-center gap-[0.8cqw] border-b border-line px-[2cqw] py-[1.3cqw]">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="size-[1cqw] rounded-full" style={{ background: c }} />
          ))}
          <span className="ml-[2cqw] font-mono text-[1.3cqw] text-muted">app/page.jsx</span>
        </div>
        <pre className="p-[2.4cqw] font-mono text-[1.75cqw] leading-[1.75]">
          {lines.map((tokens, i) => (
            <div key={i} className="flex">
              <span className="w-[4cqw] shrink-0 select-none text-subtle/60">{i + 1}</span>
              <code>
                {tokens.map(([c, t], j) => (
                  <span key={j} className={c}>
                    {t}
                  </span>
                ))}
              </code>
            </div>
          ))}
        </pre>
      </div>
      <div className="absolute bottom-[8%] right-[4%] w-[34%] rounded-[1cqw] border border-line bg-surface-2 p-[2cqw] shadow-2xl">
        <span className="eyebrow block text-[1.05cqw] text-muted">Build output</span>
        <ul className="mt-[1.4cqw] space-y-[1cqw] font-mono text-[1.35cqw] text-fg">
          {["Static pages generated", "Images optimised", "Metadata complete", "No console errors"].map((t) => (
            <li key={t} className="flex items-center gap-[1cqw]">
              <Check className="size-[1.8cqw] text-cyan" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

function WordPressVisual() {
  const blocks = ["Cover", "Heading", "Columns", "Gallery", "Buttons", "Query loop"];
  return (
    <Panel>
      <div className="absolute inset-[5%] flex overflow-hidden rounded-[1.2cqw] border border-line bg-ink">
        <aside className="w-[28%] border-r border-line p-[2cqw]">
          <span className="eyebrow block text-[1.05cqw] text-subtle">Blocks</span>
          <ul className="mt-[1.6cqw] space-y-[0.9cqw]">
            {blocks.map((b, i) => (
              <li
                key={b}
                className={`rounded-[0.6cqw] px-[1.2cqw] py-[0.9cqw] text-[1.35cqw] ${
                  i === 2 ? "bg-blue/20 text-fg ring-1 ring-blue/60" : "bg-surface-2 text-muted"
                }`}
              >
                {b}
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex-1 p-[2.4cqw]">
          <div className="rounded-[0.8cqw] bg-paper p-[2.4cqw]">
            <Line w="60%" c="bg-paper-ink/80" h="h-[2.2cqw]" />
            <Line w="40%" c="bg-paper-ink/80" h="h-[2.2cqw]" />
            <div className="mt-[2cqw] grid grid-cols-3 gap-[1.4cqw] rounded-[0.6cqw] p-[0.8cqw] ring-2 ring-blue">
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-[0.8cqw]">
                  <span className="block aspect-[4/3] rounded-[0.5cqw] bg-paper-2" />
                  <Line w="80%" c="bg-paper-ink/50" h="h-[0.8cqw]" />
                  <Line w="60%" c="bg-paper-ink/25" h="h-[0.8cqw]" />
                </div>
              ))}
            </div>
            <span className="mt-[2cqw] inline-block rounded-[0.5cqw] bg-paper-ink px-[2cqw] py-[1cqw]">
              <Line w="8cqw" c="bg-paper/90" h="h-[0.8cqw]" />
            </span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function OldSite() {
  // A deliberately dated, cluttered page: tiny nav, crowded grid, dense text.
  return (
    <div className="@container relative aspect-[16/11] w-full overflow-hidden bg-[#d8d8d8] p-[3cqw] grayscale">
      <div className="mb-[2cqw] flex items-center justify-between border-b-4 border-[#8d8d8d] pb-[1.5cqw]">
        <span className="h-[3.4cqw] w-[16cqw] bg-[#7f7f7f]" />
        <div className="flex flex-wrap gap-[0.8cqw]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="h-[1.8cqw] w-[6cqw] bg-[#9a9a9a]" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[1.2cqw]">
        <span className="col-span-3 h-[22cqw] bg-[#b3b3b3]" />
        <div className="space-y-[1cqw]">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="block h-[3.6cqw] bg-[#a5a5a5]" />
          ))}
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="h-[7cqw] bg-[#bdbdbd]" />
        ))}
      </div>
      <div className="mt-[2cqw] space-y-[0.9cqw]">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="block h-[1.1cqw] bg-[#9f9f9f]" style={{ width: `${94 - i * 6}%` }} />
        ))}
      </div>
    </div>
  );
}

function RedesignVisual() {
  return (
    <BeforeAfter
      before={<OldSite />}
      after={
        <ProjectVisual project={getProject("atlas-freight")} kind="web" aspect="aspect-[16/11]" label="Redesigned website mockup" />
      }
      labelBefore="Before"
      labelAfter="After"
      initial={50}
    />
  );
}

function UiUxVisual() {
  const screens = ["Landing", "Choose service", "Details", "Confirm"];
  return (
    <Panel className="grid-lines">
      <div className="absolute inset-x-[5%] top-1/2 flex -translate-y-1/2 items-center justify-between">
        {screens.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className="w-[17cqw]">
              <div className={`rounded-[1cqw] border p-[1.4cqw] ${i === 2 ? "border-cyan/70 bg-surface-3" : "border-line-strong bg-ink"}`}>
                <Line w="60%" c="bg-fg/50" h="h-[1cqw]" />
                <div className="mt-[1.2cqw] space-y-[0.7cqw]">
                  <span className="block h-[5cqw] rounded-[0.5cqw] bg-fg/10" />
                  <Line w="90%" c="bg-fg/15" h="h-[0.7cqw]" />
                  <Line w="70%" c="bg-fg/15" h="h-[0.7cqw]" />
                </div>
                <span className={`mt-[1.4cqw] block h-[2.2cqw] rounded-[0.5cqw] ${i === 2 ? "brand-gradient" : "bg-fg/25"}`} />
              </div>
              <p className="mt-[1.2cqw] text-center font-mono text-[1.2cqw] text-muted">
                {String(i + 1).padStart(2, "0")} {s}
              </p>
            </div>
            {i < screens.length - 1 && (
              <svg viewBox="0 0 40 10" className="mx-[0.6cqw] w-[5cqw]" aria-hidden="true">
                <path d="M0 5h34m-5-4 5 4-5 4" fill="none" stroke="rgb(160 174 200 / 0.6)" strokeWidth="1.2" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function LogoVisual() {
  return (
    <Panel className="grid-lines">
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative aspect-square w-[46%]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <g fill="none" stroke="rgb(0 229 252 / 0.45)" strokeWidth="0.35">
              <circle cx="50" cy="50" r="46" />
              <circle cx="50" cy="50" r="30" />
              <circle cx="50" cy="38" r="12" />
              <path d="M4 50h92M50 4v92M14 14l72 72M86 14 14 86" strokeDasharray="1.5 1.5" />
            </g>
          </svg>
          <Mark type="fold" color="#eef2f8" className="absolute inset-[18%]" />
          {[
            ["top-0 left-[-4%]", "Optical centre"],
            ["bottom-[2%] right-[-6%]", "Stroke 9u"],
          ].map(([pos, t]) => (
            <span key={t} className={`absolute ${pos} font-mono text-[1.25cqw] text-cyan`}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-[6%] left-[5%] flex gap-[1.2cqw]">
        {[16, 32, 64].map((s) => (
          <div key={s} className="grid place-items-center rounded-[0.8cqw] border border-line bg-ink p-[1.2cqw]">
            <Mark type="fold" color="#eef2f8" className="size-[3.5cqw]" />
            <span className="mt-[0.8cqw] font-mono text-[1cqw] text-subtle">{s}px</span>
          </div>
        ))}
      </div>
      <span className="eyebrow absolute right-[5%] top-[6%] text-[1.1cqw] text-subtle">Construction</span>
    </Panel>
  );
}

function SeoVisual({ service }) {
  const checks = ["Unique title tag", "Meta description", "Canonical URL", "Heading hierarchy", "Structured data", "XML sitemap", "Image alt text"];
  return (
    <Panel>
      <div className="absolute inset-[5%] grid grid-cols-[1.25fr_1fr] gap-[3cqw]">
        <div className="space-y-[2cqw]">
          <div className="flex items-center gap-[1.2cqw] rounded-full border border-line bg-ink px-[2cqw] py-[1.2cqw]">
            <span className="size-[1.6cqw] rounded-full border-2 border-muted" />
            <span className="text-[1.5cqw] text-muted">website design studio</span>
          </div>
          {[0, 1].map((i) => (
            <div key={i} className={`rounded-[1cqw] p-[2cqw] ${i === 0 ? "border border-cyan/40 bg-surface-2" : "opacity-50"}`}>
              <p className="font-mono text-[1.15cqw] text-subtle">example.com › services</p>
              <p className="mt-[0.6cqw] text-[1.9cqw] font-medium text-blue-bright">
                {i === 0 ? `${service.title} | Your Business` : "A clear, descriptive page title"}
              </p>
              <p className="mt-[0.6cqw] text-[1.35cqw] leading-relaxed text-muted">
                {i === 0
                  ? "A concise, accurate description that tells searchers exactly what the page offers."
                  : "Each page earns its own description and heading structure."}
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-[1cqw] border border-line bg-ink p-[2cqw]">
          <span className="eyebrow block text-[1.05cqw] text-subtle">On-page checklist</span>
          <ul className="mt-[1.6cqw] space-y-[1.2cqw]">
            {checks.map((c) => (
              <li key={c} className="flex items-center gap-[1cqw] text-[1.4cqw] text-fg">
                <span className="grid size-[2.2cqw] place-items-center rounded-full bg-cyan/15">
                  <Check className="size-[1.4cqw] text-cyan" aria-hidden="true" />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}

function MaintenanceVisual() {
  const tasks = [
    ["Dependency updates applied", "Done"],
    ["Backup verified", "Done"],
    ["Broken link on /contact fixed", "Done"],
    ["Performance check", "In review"],
    ["Content update: team page", "Queued"],
  ];
  const tone = { Done: "bg-success/15 text-success", "In review": "bg-blue/20 text-blue-bright", Queued: "bg-fg/10 text-muted" };
  return (
    <Panel>
      <div className="absolute inset-[6%] rounded-[1.2cqw] border border-line bg-ink p-[3cqw]">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-[1.15cqw] text-subtle">Maintenance log</span>
          <span className="flex items-center gap-[0.8cqw] text-[1.3cqw] text-success">
            <span className="size-[1cqw] rounded-full bg-success" />
            Site online
          </span>
        </div>
        <ul className="mt-[2.6cqw] divide-y divide-line">
          {tasks.map(([t, s]) => (
            <li key={t} className="flex items-center justify-between py-[1.6cqw]">
              <span className="text-[1.6cqw] text-fg">{t}</span>
              <span className={`rounded-full px-[1.4cqw] py-[0.5cqw] font-mono text-[1.1cqw] ${tone[s]}`}>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

function ProjectPanel({ slug, kind }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <ProjectVisual project={getProject(slug)} kind={kind} aspect="aspect-[16/11]" />
    </div>
  );
}

function renderVisual(service) {
  switch (service.visual) {
    case "website-design":
      return <WebsiteDesign />;
    case "code":
      return <CodeVisual />;
    case "commerce":
      return <ProjectPanel slug="verdant-botanics" kind="shop" />;
    case "wordpress":
      return <WordPressVisual />;
    case "landing":
      return <ProjectPanel slug="orbit-analytics" kind="web" />;
    case "redesign":
      return <RedesignVisual />;
    case "uiux":
      return <UiUxVisual />;
    case "logo":
      return <LogoVisual />;
    case "identity":
      return <ProjectPanel slug="halden-architects" kind="brand" />;
    case "print":
      return <ProjectPanel slug="saffron-table" kind="print" />;
    case "social":
      return <ProjectPanel slug="kinetic-fitness-club" kind="social" />;
    case "seo":
      return <SeoVisual service={service} />;
    case "maintenance":
      return <MaintenanceVisual />;
    default:
      return <ProjectPanel slug="lumen-dental-studio" kind="web" />;
  }
}

export default function ServiceVisual({ service }) {
  // The redesign comparison is interactive, so it must not sit inside role="img".
  if (service.visual === "redesign") return <RedesignVisual />;

  // Prefer a generated service banner when one is registered; the coded illustration is the fallback.
  const photo = getAsset(`service-${service.slug}`);
  if (photo) {
    return (
      <SmartImage
        asset={photo}
        aspect="aspect-[16/11]"
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority
        className="rounded-xl border border-line"
        fallback={<div role="img" aria-label={`Illustration: ${service.title}`}>{renderVisual(service)}</div>}
      />
    );
  }
  return (
    <div role="img" aria-label={`Illustration: ${service.title}`}>
      {renderVisual(service)}
    </div>
  );
}
