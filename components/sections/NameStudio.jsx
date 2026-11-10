"use client";

import { useEffect, useMemo, useState } from "react";
import { Phone, Shuffle } from "lucide-react";
import Button from "@/components/ui/Button";

/**
 * "See your name on it": the visitor types a business name and sees it set as a quick type
 * sketch on a shop sign, a business card, a phone website and a social profile. Built from the
 * site's own variable font (weight and width axes) and plain geometry, no image generation.
 * Until the visitor types, sample names type themselves in (off under reduced motion).
 */

const SAMPLES = ["Harbor Dental", "Northside Roofing", "Bloom Bakery", "Atlas Movers", "Oak & Ember"];

const STYLES = [
  { id: "condensed", label: "Condensed" },
  { id: "wide", label: "Wide" },
  { id: "refined", label: "Refined" },
  { id: "friendly", label: "Friendly" },
];

const PALETTES = [
  { id: "forest", label: "Forest & orange", dark: "#0b4f3c", light: "#fbfbf8", accent: "#f26a1b" },
  { id: "navy", label: "Navy & gold", dark: "#14264b", light: "#f7f3ea", accent: "#c9a227" },
  { id: "charcoal", label: "Charcoal & red", dark: "#1b1d1f", light: "#f5f5f2", accent: "#e0402b" },
  { id: "plum", label: "Plum & mint", dark: "#3b1f47", light: "#f6f1f7", accent: "#4fc39b" },
];

function initialsOf(name) {
  const words = name.replace(/[^\p{L}\p{N}& ]/gu, " ").split(/\s+/).filter((w) => w && w !== "&");
  if (!words.length) return "A";
  if (words.length === 1) return words[0].slice(0, 1).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function slugOf(name) {
  return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "").slice(0, 24) || "yourbusiness";
}

/** The type sketch. `size` is the wordmark size in em of the parent; `tone` picks the ground. */
function Lockup({ name, style, palette, tone = "light", size = 1, stacked = false }) {
  const ink = tone === "dark" ? palette.light : palette.dark;
  const ini = initialsOf(name);
  const fit = Math.min(1, 13 / Math.max(name.length, 7));
  const word = {
    condensed: { fontStretch: "68%", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.005em" },
    wide: { fontStretch: "125%", fontWeight: 600, letterSpacing: "-0.015em" },
    refined: { fontStretch: "100%", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.26em" },
    friendly: { fontStretch: "92%", fontWeight: 900, textTransform: "lowercase", letterSpacing: "-0.035em" },
  }[style];

  let mark = null;
  if (style === "condensed") {
    mark = (
      <span
        className="grid shrink-0 place-items-center font-extrabold"
        style={{ background: palette.accent, color: palette.light, width: "1.5em", height: "1.5em", transform: "skewX(-14deg)", fontStretch: "68%", fontSize: "1em" }}
      >
        <span style={{ transform: "skewX(14deg)" }}>{ini}</span>
      </span>
    );
  } else if (style === "wide") {
    mark = (
      <span
        className="grid shrink-0 place-items-center rounded-full font-semibold"
        style={{ border: `0.09em solid ${palette.accent}`, color: ink, width: "2.1em", height: "2.1em", fontSize: "0.72em", fontStretch: "100%", letterSpacing: "-0.02em" }}
      >
        {ini}
      </span>
    );
  } else if (style === "friendly") {
    mark = (
      <span
        className="grid shrink-0 place-items-center font-black"
        style={{ background: palette.accent, color: tone === "dark" ? palette.dark : palette.light, width: "1.45em", height: "1.45em", borderRadius: "0.42em", fontSize: "1em" }}
      >
        {ini.slice(0, 1).toLowerCase()}
      </span>
    );
  }

  return (
    <span
      className={`ns-lockup inline-flex max-w-full items-center leading-none ${stacked ? "flex-col gap-[0.35em] text-center" : "gap-[0.45em]"}`}
      style={{ color: ink, fontSize: `${size * fit}em` }}
    >
      {mark}
      <span className="flex min-w-0 flex-col items-center gap-[0.3em]">
        <span className="whitespace-nowrap" style={word}>
          {name}
        </span>
        {style === "refined" && (
          <span aria-hidden="true" className="block h-[0.07em] w-[2.2em]" style={{ background: palette.accent }} />
        )}
      </span>
    </span>
  );
}

function SignMock({ name, style, palette }) {
  return (
    <div className="@container relative aspect-[16/8] overflow-hidden rounded-xl bg-[#d8d4cb] lg:aspect-[16/7]">
      {/* Fascia board */}
      <div
        className="ns-surface absolute inset-x-[6%] top-[12%] grid h-[30%] place-items-center rounded-[0.6cqw] px-[4cqw] text-[3.6cqw] shadow-[0_1.4cqw_2cqw_-1cqw_rgb(0_0_0/0.35)]"
        style={{ background: palette.dark }}
      >
        <Lockup key={style} name={name} style={style} palette={palette} tone="dark" />
      </div>
      {/* Lamps */}
      {[22, 50, 78].map((x) => (
        <span key={x} aria-hidden="true" className="absolute top-[5%] h-[5%] w-[5%] -translate-x-1/2" style={{ left: `${x}%` }}>
          <span className="absolute left-1/2 top-0 h-[55%] w-[0.35cqw] -translate-x-1/2 bg-[#3a3c3a]" />
          <span className="absolute bottom-0 left-0 h-[45%] w-full rounded-t-full bg-[#3a3c3a]" />
        </span>
      ))}
      {/* Shop front: two windows and a door */}
      <div aria-hidden="true" className="absolute inset-x-[6%] bottom-0 top-[48%] grid grid-cols-[1fr_0.42fr_1fr] gap-[1.4cqw] border-t-[1cqw] pt-[1.4cqw]" style={{ borderColor: palette.dark }}>
        <span className="ns-surface rounded-t-[0.4cqw] bg-[#9fb2b4]">
          <span className="ml-[8%] mt-[10%] block h-[38%] w-[30%] bg-white/25" />
        </span>
        <span className="ns-surface relative rounded-t-[0.4cqw]" style={{ background: palette.dark }}>
          <span className="absolute right-[14%] top-1/2 size-[1.1cqw] rounded-full" style={{ background: palette.accent }} />
        </span>
        <span className="ns-surface grid place-items-center rounded-t-[0.4cqw] bg-[#9fb2b4] text-[1.6cqw]">
          <span className="rounded-[0.3cqw] px-[1.2cqw] py-[0.6cqw] font-bold uppercase tracking-[0.12em]" style={{ background: palette.light, color: palette.dark }}>
            Open
          </span>
        </span>
      </div>
    </div>
  );
}

function CardMock({ name, style, palette }) {
  const slug = slugOf(name);
  return (
    <div className="@container relative grid aspect-[5/4] place-items-center overflow-hidden rounded-xl bg-[#c9d8cf]">
      {/* Back of the card */}
      <div
        aria-hidden="true"
        className="ns-surface absolute left-[16%] top-[14%] grid aspect-[1.75] w-[64%] -rotate-[8deg] place-items-center rounded-[1.2cqw] text-[9cqw] shadow-[0_2cqw_3cqw_-2cqw_rgb(0_0_0/0.45)]"
        style={{ background: palette.dark }}
      >
        <span className="font-black" style={{ color: palette.accent }}>
          {initialsOf(name)}
        </span>
      </div>
      {/* Front */}
      <div
        className="ns-surface absolute bottom-[12%] right-[10%] flex aspect-[1.75] w-[64%] rotate-[4deg] flex-col justify-between rounded-[1.2cqw] p-[4cqw] shadow-[0_2.4cqw_3.4cqw_-2cqw_rgb(0_0_0/0.45)]"
        style={{ background: palette.light }}
      >
        <span className="text-[4.4cqw]">
          <Lockup key={style} name={name} style={style} palette={palette} />
        </span>
        <span className="text-[2.3cqw] leading-snug" style={{ color: palette.dark }}>
          <span className="block font-semibold">www.{slug}.com</span>
          <span className="block opacity-70">hello@{slug}.com</span>
        </span>
      </div>
    </div>
  );
}

function PhoneMock({ name, style, palette }) {
  return (
    <div className="@container grid aspect-[5/4] place-items-center overflow-hidden rounded-xl bg-[#e7e3da]">
      <div className="relative h-[92%] translate-y-[10%] rounded-[5cqw] bg-[#141815] p-[1.6cqw] shadow-[0_3cqw_4cqw_-3cqw_rgb(0_0_0/0.6)]" style={{ aspectRatio: "9 / 17" }}>
        <div className="@container flex h-full flex-col overflow-hidden rounded-[3.6cqw]" style={{ background: palette.light }}>
          <div className="flex items-center justify-between px-[7cqw] pb-[4cqw] pt-[12cqw]">
            <span className="text-[7cqw]">
              <Lockup key={style} name={name} style={style} palette={palette} />
            </span>
            <span aria-hidden="true" className="flex shrink-0 flex-col gap-[1.4cqw]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="block h-[0.9cqw] w-[6cqw]" style={{ background: palette.dark }} />
              ))}
            </span>
          </div>
          <div className="ns-surface flex flex-1 flex-col justify-end gap-[4cqw] p-[7cqw]" style={{ background: palette.dark }}>
            <span className="block text-[10cqw] font-extrabold leading-[0.95]" style={{ color: palette.light, fontStretch: "80%" }}>
              {name}
            </span>
            <span
              className="ns-surface inline-flex w-fit items-center gap-[2cqw] rounded-[1.6cqw] px-[5cqw] py-[3cqw] text-[5cqw] font-bold"
              style={{ background: palette.accent, color: palette.light }}
            >
              <Phone className="size-[5cqw]" aria-hidden="true" /> Call now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialMock({ name, style, palette }) {
  const slug = slugOf(name);
  const tiles = [palette.dark, palette.accent, palette.light, palette.accent, palette.dark, palette.light];
  return (
    <div className="@container flex aspect-[5/4] flex-col overflow-hidden rounded-xl bg-white p-[6cqw] text-[#141815]">
      <div className="flex items-center gap-[4cqw]">
        <span className="ns-surface grid size-[20cqw] shrink-0 place-items-center rounded-full text-[6cqw]" style={{ background: palette.dark }}>
          <span key={style} className="ns-lockup font-black tracking-[-0.02em]" style={{ color: palette.light }}>
            {initialsOf(name)}
          </span>
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[5.4cqw] font-bold">{name}</span>
          <span className="block truncate text-[4.2cqw] text-[#5b625d]">@{slug}</span>
          <span
            className="ns-surface mt-[2cqw] inline-block rounded-[1.4cqw] px-[4cqw] py-[1.4cqw] text-[3.8cqw] font-semibold"
            style={{ background: palette.accent, color: palette.light }}
          >
            Follow
          </span>
        </span>
      </div>
      <div aria-hidden="true" className="mt-[5cqw] grid flex-1 grid-cols-3 gap-[1.2cqw]">
        {tiles.map((bg, i) => (
          <span key={i} className="ns-surface grid place-items-center text-[4.6cqw]" style={{ background: bg }}>
            {i === 0 && (
              <span className="font-black" style={{ color: palette.accent }}>
                {initialsOf(name)}
              </span>
            )}
            {i === 4 && <span className="h-[0.25em] w-[2.4em]" style={{ background: palette.accent }} />}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function NameStudio() {
  const [typed, setTyped] = useState("");
  const [touched, setTouched] = useState(false);
  const [demo, setDemo] = useState(SAMPLES[0]);
  const [styleIdx, setStyleIdx] = useState(0);
  const [paletteIdx, setPaletteIdx] = useState(0);

  // Self-typing sample names until the visitor types (skipped under reduced motion).
  useEffect(() => {
    if (touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let sample = 0;
    let len = SAMPLES[0].length;
    let dir = -1;
    let hold = 18;
    const id = setInterval(() => {
      if (document.hidden) return;
      if (hold > 0) {
        hold -= 1;
        return;
      }
      len += dir;
      if (dir < 0 && len <= 0) {
        sample = (sample + 1) % SAMPLES.length;
        dir = 1;
        len = 0;
        if (sample % 2 === 0) setStyleIdx((s) => (s + 1) % STYLES.length);
        else setPaletteIdx((p) => (p + 1) % PALETTES.length);
        hold = 3;
      } else if (dir > 0 && len >= SAMPLES[sample].length) {
        dir = -1;
        hold = 22;
      }
      setDemo(SAMPLES[sample].slice(0, Math.max(len, 0)));
    }, 85);
    return () => clearInterval(id);
  }, [touched]);

  const name = (touched ? typed.trim() : demo) || (touched ? "Your Business" : " ");
  const style = STYLES[styleIdx].id;
  const palette = PALETTES[paletteIdx];
  const shownName = useMemo(() => name.replace(/\s+/g, " ").slice(0, 32), [name]);

  const shuffle = () => {
    setTouched(true);
    if (!typed) setTyped(demo.trim() || SAMPLES[0]);
    setStyleIdx((s) => (s + 1 + Math.floor(Math.random() * (STYLES.length - 1))) % STYLES.length);
    setPaletteIdx((p) => (p + 1 + Math.floor(Math.random() * (PALETTES.length - 1))) % PALETTES.length);
  };

  return (
    <section aria-labelledby="namestudio-title" className="theme-mint overflow-hidden py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="namestudio-title" className="font-display-wide text-[clamp(2.2rem,4.6vw,3.6rem)] font-bold leading-[0.98]">
              See your name on it.
            </h2>
            <p className="mt-5 max-w-md text-[1.06rem] leading-relaxed text-muted">
              Type your business name and watch it land on a shop sign, a business card and a phone.
            </p>

            <label htmlFor="ns-name" className="mt-8 block text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-subtle">
              Your business name
            </label>
            <input
              id="ns-name"
              type="text"
              inputMode="text"
              autoComplete="organization"
              maxLength={32}
              value={touched ? typed : ""}
              placeholder={touched ? "Your Business" : demo || " "}
              onFocus={() => {
                if (!touched) {
                  setTouched(true);
                  setTyped("");
                }
              }}
              onChange={(e) => {
                setTouched(true);
                setTyped(e.target.value);
              }}
              className="mt-2 h-14 w-full rounded-md border-[1.5px] border-line-strong bg-surface px-4 text-lg font-semibold text-fg outline-none transition-colors placeholder:text-fg/45 focus:border-fg"
            />

            <fieldset className="mt-6">
              <legend className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-subtle">Type style</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {STYLES.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={i === styleIdx}
                    onClick={() => {
                      setTouched(true);
                      if (!typed) setTyped(demo.trim() || SAMPLES[0]);
                      setStyleIdx(i);
                    }}
                    className={`h-10 rounded-md border-[1.5px] px-4 text-sm font-semibold transition-colors ${
                      i === styleIdx ? "border-fg bg-fg text-ink" : "border-line-strong text-fg hover:border-fg"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-subtle">Colours</legend>
              <div className="mt-2 flex flex-wrap items-center gap-2.5">
                {PALETTES.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={i === paletteIdx}
                    aria-label={p.label}
                    title={p.label}
                    onClick={() => {
                      setTouched(true);
                      if (!typed) setTyped(demo.trim() || SAMPLES[0]);
                      setPaletteIdx(i);
                    }}
                    className={`relative flex h-10 w-14 overflow-hidden rounded-md ring-offset-2 ring-offset-ink transition-shadow ${
                      i === paletteIdx ? "ring-2 ring-fg" : "ring-1 ring-line-strong hover:ring-fg"
                    }`}
                  >
                    <span className="flex-[2]" style={{ background: p.dark }} />
                    <span className="flex-1" style={{ background: p.accent }} />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={shuffle}
                  className="ml-1 inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-fg transition-colors hover:bg-fg/5"
                >
                  <Shuffle className="size-4" aria-hidden="true" /> Shuffle
                </button>
              </div>
            </fieldset>

            <div className="mt-9">
              <Button href="/get-a-quote?service=logo-design" size="lg" fill arrow className="w-full xs:w-auto">
                Get your real logo designed
              </Button>
              <p className="caption mt-4 max-w-sm">
                A quick type sketch to picture it. Your real logo is drawn from a brief, with research and revisions.
              </p>
            </div>
          </div>
        </div>

        <div className="ns-stage grid content-start gap-4 sm:grid-cols-2 lg:col-span-8 lg:gap-5">
          <p className="sr-only" aria-live="polite">
            {touched ? `Showing ${shownName} in the ${STYLES[styleIdx].label} style with ${palette.label}.` : ""}
          </p>
          <div className="sm:col-span-2" aria-hidden="true">
            <SignMock name={shownName} style={style} palette={palette} />
          </div>
          <div aria-hidden="true">
            <CardMock name={shownName} style={style} palette={palette} />
          </div>
          <div aria-hidden="true">
            <PhoneMock name={shownName} style={style} palette={palette} />
          </div>
          <div className="sm:hidden" aria-hidden="true">
            <SocialMock name={shownName} style={style} palette={palette} />
          </div>
        </div>
      </div>
    </section>
  );
}
