import Mark from "./Mark";
import SmartImage from "./SmartImage";
import { getAsset } from "@/lib/assets";

/**
 * Coded mockups for portfolio concept projects. Everything scales with the
 * container (cqw units), so one component serves cards, heroes and galleries.
 *
 * kinds: "web" | "mobile" | "shop" | "brand" | "social" | "print"
 */

function isLight(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 150;
}

function Bar({ w, h = "0.9cqw", color, opacity = 1, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`block rounded-full ${className}`}
      style={{ width: w, height: h, background: color, opacity }}
    />
  );
}

function BrowserChrome({ p, light, children, domain }) {
  const chrome = light ? "#ffffff" : "#0d0f15";
  const line = light ? "rgb(0 0 0 / 0.08)" : "rgb(255 255 255 / 0.08)";
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-[1.2cqw] shadow-[0_2cqw_5cqw_-1cqw_rgb(0_0_0/0.55)]"
      style={{ background: p.bg, border: `1px solid ${line}` }}
    >
      <div
        className="flex items-center gap-[0.8cqw] px-[1.6cqw] py-[1.1cqw]"
        style={{ background: chrome, borderBottom: `1px solid ${line}` }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="size-[0.95cqw] rounded-full" style={{ background: c, opacity: 0.9 }} />
        ))}
        <span
          className="mx-auto truncate rounded-[0.6cqw] px-[3cqw] py-[0.35cqw] font-mono text-[1.15cqw]"
          style={{ background: light ? "#f1f3f6" : "#161922", color: light ? "#6b7280" : "#8b93a7" }}
        >
          {domain}
        </span>
        <span className="w-[4cqw]" />
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function SiteNav({ project, light }) {
  const p = project.palette;
  return (
    <div className="flex items-center justify-between px-[4cqw] py-[2.2cqw]">
      <div className="flex items-center gap-[1cqw]">
        <Mark type={project.brand.mark} color={p.accent} bg={p.bg} className="size-[3cqw]" />
        <span className="font-display-wide text-[1.7cqw] font-bold" style={{ color: p.text }}>
          {project.brand.wordmark}
        </span>
      </div>
      <div className="flex items-center gap-[2.2cqw]">
        {[5, 6, 4.5, 5.5].map((w, i) => (
          <Bar key={i} w={`${w}cqw`} h="0.7cqw" color={p.text} opacity={light ? 0.35 : 0.4} />
        ))}
        <span className="rounded-[0.6cqw] px-[1.8cqw] py-[0.8cqw]" style={{ background: p.accent }}>
          <Bar w="5cqw" h="0.7cqw" color={isLight(p.accent) ? p.ink : "#fff"} opacity={0.9} />
        </span>
      </div>
    </div>
  );
}

function WebVisual({ project }) {
  const p = project.palette;
  const light = isLight(p.bg);
  return (
    <BrowserChrome p={p} light={light} domain={project.brand.domain}>
      <SiteNav project={project} light={light} />
      <div className="grid grid-cols-[1.1fr_1fr] gap-[3.5cqw] px-[4cqw] pt-[3cqw]">
        <div>
          <span
            className="mb-[1.6cqw] inline-block rounded-full px-[1.3cqw] py-[0.4cqw] font-mono text-[1cqw] uppercase tracking-widest"
            style={{ color: p.accent, border: `1px solid ${p.accent}` }}
          >
            {project.sector}
          </span>
          <p
            className="font-display-wide text-[3.6cqw] font-bold leading-[1.02]"
            style={{ color: p.text }}
          >
            {project.headline}
          </p>
          <div className="mt-[2.4cqw] space-y-[1cqw]">
            <Bar w="92%" color={p.text} opacity={0.28} />
            <Bar w="74%" color={p.text} opacity={0.28} />
          </div>
          <div className="mt-[3cqw] flex gap-[1.2cqw]">
            <span className="rounded-[0.6cqw] px-[2.4cqw] py-[1.2cqw]" style={{ background: p.accent }}>
              <Bar w="7cqw" color={isLight(p.accent) ? p.ink : "#fff"} />
            </span>
            <span className="rounded-[0.6cqw] px-[2.4cqw] py-[1.2cqw]" style={{ border: `1px solid ${p.text}40` }}>
              <Bar w="6cqw" color={p.text} opacity={0.6} />
            </span>
          </div>
        </div>
        <div
          className="relative aspect-[4/3.4] overflow-hidden rounded-[1.4cqw]"
          style={{ background: light ? p.ink : p.surface }}
        >
          <div
            className="absolute -bottom-[18%] -right-[12%] aspect-square w-[78%] rounded-full"
            style={{ background: p.accent, opacity: 0.9 }}
          />
          <div
            className="absolute left-[10%] top-[12%] aspect-square w-[34%] rounded-[1cqw]"
            style={{ background: light ? p.bg : p.bg, opacity: 0.95 }}
          />
          <Mark
            type={project.brand.mark}
            color={light ? p.bg : p.text}
            bg={p.accent}
            className="absolute bottom-[14%] left-[12%] size-[30%] opacity-90"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[2cqw] px-[4cqw] pt-[4cqw]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-[1cqw] p-[1.8cqw]"
            style={{ background: light ? p.surface : p.surface, border: `1px solid ${p.text}14` }}
          >
            <span className="mb-[1.4cqw] block size-[2.6cqw] rounded-[0.6cqw]" style={{ background: p.accent, opacity: 0.85 }} />
            <Bar w="70%" color={p.text} opacity={0.55} />
            <Bar w="90%" color={p.text} opacity={0.22} className="mt-[1cqw]" />
            <Bar w="60%" color={p.text} opacity={0.22} className="mt-[0.7cqw]" />
          </div>
        ))}
      </div>
    </BrowserChrome>
  );
}

function Phone({ project, variant = 0 }) {
  const p = project.palette;
  const light = isLight(p.bg);
  return (
    <div
      className="relative h-[88%] aspect-[9/19] overflow-hidden rounded-[3.2cqw] p-[0.7cqw] shadow-[0_2cqw_5cqw_-1cqw_rgb(0_0_0/0.6)]"
      style={{ background: "#0a0a0c" }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.6cqw]" style={{ background: p.bg }}>
        <span className="absolute left-1/2 top-[1.1cqw] z-10 h-[1.4cqw] w-[7cqw] -translate-x-1/2 rounded-full bg-black" />
        <div className="flex items-center justify-between px-[2.2cqw] pb-[1.6cqw] pt-[4.2cqw]">
          <div className="flex items-center gap-[0.7cqw]">
            <Mark type={project.brand.mark} color={p.accent} bg={p.bg} className="size-[2.6cqw]" />
            <span className="font-display-wide text-[1.3cqw] font-bold" style={{ color: p.text }}>
              {project.brand.wordmark}
            </span>
          </div>
          <span className="space-y-[0.45cqw]">
            <Bar w="2.4cqw" h="0.35cqw" color={p.text} opacity={0.7} />
            <Bar w="2.4cqw" h="0.35cqw" color={p.text} opacity={0.7} />
          </span>
        </div>
        {variant === 0 ? (
          <div className="px-[2.2cqw]">
            <p className="font-display-wide text-[2.25cqw] font-bold leading-[1.05]" style={{ color: p.text }}>
              {project.headline}
            </p>
            <div className="mt-[1.6cqw] space-y-[0.7cqw]">
              <Bar w="95%" h="0.6cqw" color={p.text} opacity={0.28} />
              <Bar w="70%" h="0.6cqw" color={p.text} opacity={0.28} />
            </div>
            <span className="mt-[2cqw] block rounded-[0.6cqw] py-[1.2cqw]" style={{ background: p.accent }}>
              <Bar w="40%" h="0.6cqw" color={isLight(p.accent) ? p.ink : "#fff"} className="mx-auto" />
            </span>
            <div
              className="relative mt-[2.4cqw] aspect-[4/3] overflow-hidden rounded-[1.2cqw]"
              style={{ background: light ? p.ink : p.surface }}
            >
              <div className="absolute -bottom-1/4 -right-1/4 aspect-square w-3/4 rounded-full" style={{ background: p.accent }} />
              <Mark type={project.brand.mark} color={light ? p.bg : p.text} bg={p.accent} className="absolute left-[12%] top-[16%] size-[34%]" />
            </div>
          </div>
        ) : (
          <div className="px-[2.2cqw]">
            <div className="grid grid-cols-2 gap-[1.2cqw]">
              {[0, 1, 2, 3].map((i) => (
                <div key={i}>
                  <div
                    className="grid aspect-[4/5] place-items-center rounded-[1cqw]"
                    style={{ background: i % 3 === 0 ? p.surface : light ? p.ink + "12" : p.surface }}
                  >
                    <span
                      className="block h-[46%] w-[30%] rounded-t-[1.6cqw] rounded-b-[0.6cqw]"
                      style={{ background: i % 2 ? p.accent : light ? p.ink : p.text, opacity: 0.9 }}
                    />
                  </div>
                  <Bar w="80%" h="0.55cqw" color={p.text} opacity={0.55} className="mt-[0.9cqw]" />
                  <Bar w="40%" h="0.55cqw" color={p.text} opacity={0.3} className="mt-[0.5cqw]" />
                </div>
              ))}
            </div>
            <span className="mt-[2cqw] block rounded-[0.6cqw] py-[1.2cqw]" style={{ background: p.accent }}>
              <Bar w="40%" h="0.6cqw" color={isLight(p.accent) ? p.ink : "#fff"} className="mx-auto" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileVisual({ project }) {
  const p = project.palette;
  return (
    <div
      className="flex h-full w-full items-center justify-center gap-[5cqw] overflow-hidden rounded-[1.2cqw]"
      style={{ background: isLight(p.bg) ? p.ink : p.surface }}
    >
      <Phone project={project} variant={0} />
      <div className="translate-y-[6%] h-full flex items-center">
        <Phone project={project} variant={1} />
      </div>
    </div>
  );
}

function ShopVisual({ project }) {
  const p = project.palette;
  const light = isLight(p.bg);
  const filters = ["All", "Cleanse", "Treat", "Hydrate", "Sets"];
  return (
    <BrowserChrome p={p} light={light} domain={project.brand.domain}>
      <SiteNav project={project} light={light} />
      <div className="px-[4cqw] pt-[1.5cqw]">
        <div className="flex items-end justify-between">
          <p className="font-display-wide text-[3.2cqw] font-bold" style={{ color: p.text }}>
            Shop all
          </p>
          <div className="flex gap-[0.8cqw]">
            {filters.map((f, i) => (
              <span
                key={f}
                className="rounded-full px-[1.4cqw] py-[0.5cqw] text-[1.1cqw]"
                style={
                  i === 0
                    ? { background: p.text, color: p.bg }
                    : { border: `1px solid ${p.text}33`, color: p.text }
                }
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-[2.6cqw] grid grid-cols-4 gap-[1.8cqw]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <div
                className="relative grid aspect-[4/5] place-items-end justify-center overflow-hidden rounded-[1cqw] pb-[12%]"
                style={{ background: i % 2 ? p.surface : light ? `${p.ink}14` : p.surface }}
              >
                <span
                  className="absolute top-[18%] aspect-square w-[64%] rounded-full"
                  style={{ background: p.accent, opacity: 0.22 }}
                />
                <span className="relative flex flex-col items-center">
                  <span className="h-[2.2cqw] w-[3.2cqw] rounded-t-[0.5cqw]" style={{ background: p.ink }} />
                  <span
                    className="grid h-[11cqw] w-[7cqw] place-items-center rounded-[1.2cqw]"
                    style={{ background: i === 1 ? p.accent : i === 3 ? p.ink : p.bg, border: `1px solid ${p.ink}26` }}
                  >
                    <Mark
                      type={project.brand.mark}
                      color={i === 3 ? p.bg : p.ink}
                      bg={i === 1 ? p.accent : p.bg}
                      className="size-[3cqw] opacity-80"
                    />
                  </span>
                </span>
              </div>
              <Bar w="75%" color={p.text} opacity={0.6} className="mt-[1.2cqw]" />
              <Bar w="35%" color={p.text} opacity={0.3} className="mt-[0.7cqw]" />
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

function BrandVisual({ project }) {
  const p = project.palette;
  const light = isLight(p.bg);
  const swatches = [p.bg, p.surface, p.accent, p.ink].filter((c, i, a) => a.indexOf(c) === i);
  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.2cqw] p-[5cqw]"
      style={{ background: p.bg }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${p.text}12 1px, transparent 1px), linear-gradient(to bottom, ${p.text}12 1px, transparent 1px)`,
          backgroundSize: "6cqw 6cqw",
        }}
      />
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[1.2cqw] uppercase tracking-[0.25em]" style={{ color: p.text, opacity: 0.6 }}>
          Identity / {project.sector}
        </span>
        <span className="font-mono text-[1.2cqw] uppercase tracking-[0.25em]" style={{ color: p.text, opacity: 0.6 }}>
          Concept
        </span>
      </div>
      <div className="relative flex items-center gap-[4cqw]">
        <Mark type={project.brand.mark} color={p.accent} bg={p.bg} className="size-[18cqw] shrink-0" />
        <div>
          <p className="font-display-wide text-[6.4cqw] font-bold leading-none" style={{ color: p.text }}>
            {project.brand.wordmark}
          </p>
          <p className="mt-[1.6cqw] text-[1.6cqw]" style={{ color: p.text, opacity: 0.65 }}>
            {project.headline}
          </p>
        </div>
      </div>
      <div className="relative flex items-end justify-between gap-[2cqw]">
        <div className="flex gap-[1.2cqw]">
          {swatches.map((c) => (
            <div key={c}>
              <span
                className="block size-[6.5cqw] rounded-[0.8cqw]"
                style={{ background: c, border: `1px solid ${light ? "#00000018" : "#ffffff1f"}` }}
              />
              <span className="mt-[0.8cqw] block font-mono text-[1.05cqw] uppercase" style={{ color: p.text, opacity: 0.6 }}>
                {c}
              </span>
            </div>
          ))}
        </div>
        <p className="font-display-wide text-[9cqw] font-bold leading-[0.8]" style={{ color: p.text, opacity: 0.9 }}>
          Aa
        </p>
      </div>
    </div>
  );
}

function SocialVisual({ project }) {
  const p = project.palette;
  const light = isLight(p.bg);
  const tiles = [
    { bg: p.accent, fg: isLight(p.accent) ? p.ink : "#fff", type: "headline" },
    { bg: p.surface, fg: p.text, type: "mark" },
    { bg: p.bg, fg: p.text, type: "list" },
    { bg: p.bg, fg: p.text, type: "quote" },
    { bg: p.accent, fg: isLight(p.accent) ? p.ink : "#fff", type: "mark" },
    { bg: p.surface, fg: p.text, type: "headline2" },
  ];
  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-hidden rounded-[1.2cqw]"
      style={{ background: light ? p.ink : "#0b0b0d" }}
    >
      <div className="grid w-[74%] grid-cols-3 gap-[1.4cqw]">
        {tiles.map((t, i) => (
          <div
            key={i}
            className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-[0.8cqw] p-[1.8cqw]"
            style={{ background: t.bg, color: t.fg, border: `1px solid ${p.text}14` }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display-wide text-[1.1cqw] font-bold">{project.brand.wordmark}</span>
              <span className="font-mono text-[0.9cqw] opacity-70">0{i + 1}</span>
            </div>
            {t.type === "headline" && (
              <p className="font-display-wide text-[2.9cqw] font-black uppercase leading-[0.92]">{project.headline}</p>
            )}
            {t.type === "headline2" && (
              <p className="font-display-wide text-[2.5cqw] font-black uppercase leading-[0.92]">
                New season.
                <br />
                Same intent.
              </p>
            )}
            {t.type === "mark" && (
              <Mark type={project.brand.mark} color={t.fg} bg={t.bg} className="mx-auto size-[9cqw]" />
            )}
            {t.type === "list" && (
              <div className="space-y-[0.9cqw]">
                {["Strength", "Conditioning", "Mobility"].map((x) => (
                  <div key={x} className="flex items-center justify-between border-b pb-[0.6cqw]" style={{ borderColor: `${t.fg}26` }}>
                    <span className="text-[1.2cqw] font-semibold uppercase">{x}</span>
                    <span className="size-[1cqw] rounded-full" style={{ background: p.accent }} />
                  </div>
                ))}
              </div>
            )}
            {t.type === "quote" && (
              <p className="text-[1.6cqw] font-semibold leading-snug">
                <span style={{ color: p.accent }}>“</span>Show up. Do the work. Repeat.
                <span style={{ color: p.accent }}>”</span>
              </p>
            )}
            <span />
          </div>
        ))}
      </div>
    </div>
  );
}

function PrintVisual({ project }) {
  const p = project.palette;
  const light = isLight(p.bg);
  const paper = light ? p.surface : p.text;
  const paperInk = light ? p.ink : p.ink;
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[1.2cqw]"
      style={{ background: light ? p.paper ?? "#d9d4cc" : p.surface }}
    >
      {/* Poster / menu */}
      <div
        className="absolute left-[12%] top-[8%] flex aspect-[3/4.2] w-[34%] rotate-[-4deg] flex-col justify-between p-[2.6cqw] shadow-[0_2cqw_4cqw_-1cqw_rgb(0_0_0/0.55)]"
        style={{ background: p.bg, color: light ? p.ink : p.text }}
      >
        <div className="flex items-center gap-[1cqw]">
          <Mark type={project.brand.mark} color={p.accent} bg={p.bg} className="size-[4cqw]" />
          <span className="font-display-wide text-[1.8cqw] font-bold">{project.brand.wordmark}</span>
        </div>
        <div className="space-y-[1.4cqw]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between gap-[1cqw]">
              <Bar w={`${[60, 48, 66, 52][i]}%`} h="0.75cqw" color={light ? p.ink : p.text} opacity={0.55} />
              <Bar w="10%" h="0.75cqw" color={p.accent} />
            </div>
          ))}
        </div>
        <p className="font-display-wide text-[2.2cqw] font-bold leading-tight">{project.headline}</p>
      </div>
      {/* Business card front */}
      <div
        className="absolute right-[10%] top-[16%] grid aspect-[1.75] w-[38%] rotate-[5deg] place-items-center shadow-[0_2cqw_4cqw_-1cqw_rgb(0_0_0/0.5)]"
        style={{ background: p.accent }}
      >
        <Mark type={project.brand.mark} color={isLight(p.accent) ? p.ink : "#fff"} bg={p.accent} className="size-[9cqw]" />
      </div>
      {/* Business card back */}
      <div
        className="absolute bottom-[10%] right-[16%] flex aspect-[1.75] w-[38%] rotate-[-3deg] flex-col justify-between p-[2.2cqw] shadow-[0_2cqw_4cqw_-1cqw_rgb(0_0_0/0.5)]"
        style={{ background: paper, color: paperInk }}
      >
        <span className="font-display-wide text-[1.9cqw] font-bold">{project.brand.wordmark}</span>
        <div className="space-y-[0.8cqw]">
          <Bar w="50%" h="0.65cqw" color={paperInk} opacity={0.7} />
          <Bar w="70%" h="0.65cqw" color={paperInk} opacity={0.35} />
          <Bar w="40%" h="0.65cqw" color={paperInk} opacity={0.35} />
        </div>
      </div>
    </div>
  );
}

const renderers = {
  web: WebVisual,
  mobile: MobileVisual,
  shop: ShopVisual,
  brand: BrandVisual,
  social: SocialVisual,
  print: PrintVisual,
};

/**
 * @param {object} props
 * @param {object} props.project  A project from data/portfolio.js
 * @param {string} [props.kind]   Defaults to the project's cover kind
 * @param {string} [props.aspect] Tailwind aspect class
 * @param {string} [props.label]  Accessible description; defaults to a sensible label
 */
export default function ProjectVisual({ project, kind, aspect = "aspect-[16/10]", className = "", label, sizes = "(min-width: 1024px) 50vw, 100vw" }) {
  const k = kind ?? project.cover;
  const Renderer = renderers[k] ?? WebVisual;
  const alt =
    label ??
    `${project.name} concept: ${
      { web: "website design", mobile: "mobile layouts", shop: "online store", brand: "logo and colour palette", social: "social media templates", print: "print collateral" }[k]
    } mockup`;
  const coded = (
    <div role="img" aria-label={alt} className={`@container relative w-full select-none ${aspect} ${className}`}>
      <div className="absolute inset-0">
        <Renderer project={project} />
      </div>
    </div>
  );

  // The cover uses a generated image when one has been registered (see scripts/higgsfield-generate.mjs).
  const photo = !kind || kind === project.cover ? getAsset(`project-${project.slug}`) : null;
  if (!photo) return coded;
  return (
    <SmartImage
      asset={photo}
      alt={label ?? photo.alt}
      aspect={aspect}
      sizes={sizes}
      className={className}
      fallback={coded}
    />
  );
}
