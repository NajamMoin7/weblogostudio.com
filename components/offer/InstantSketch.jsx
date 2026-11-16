"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, MapPin, Menu, Phone, Star } from "lucide-react";
import PayButton from "@/components/offer/PayButton";
import { trackEvent } from "@/lib/pixel";
import { pricing99 } from "@/data/offer99";
import { BIZ_MAX, LOOKS, SKETCH_NEUTRALS, SKETCH_PALETTES, TRADES, cleanBizName } from "@/data/sketch99";

/**
 * "See it with your name" (/99). The visitor types a business name, picks a trade, a look and
 * colours, and a template one-page site redraws live inside a phone they can scroll. The pay
 * button under it starts the $20 checkout and carries the choices along (name, trade, look,
 * palette), so the studio sees what the visitor liked.
 *
 * It is a sketch and says so: sample copy and a stock scene. Nothing here is the visitor's real
 * site, and no human work happens before the deposit.
 *
 * The mock site is sized in container units (cqw), so it scales with the phone, and it is built
 * from the site's own variable font: no extra fonts, no image generation in the browser.
 */

/** The name set as a quick logo sketch, one treatment per look. */
function Lockup({ name, look, palette, ink }) {
  // Long names shrink a little, then truncate: a logo line never drops below a readable size.
  const fit = Math.max(0.74, Math.min(1, 15 / Math.max(name.length, 9)));
  const words = name.replace(/[^\p{L}\p{N}& ]/gu, " ").split(/\s+/).filter((w) => w && w !== "&");
  const ini = !words.length ? "A" : words.length === 1 ? words[0][0].toUpperCase() : (words[0][0] + words[1][0]).toUpperCase();

  const word = {
    bold: { fontStretch: "66%", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.01em" },
    clean: { fontStretch: "112%", fontWeight: 600, letterSpacing: "-0.02em" },
    warm: { fontStretch: "92%", fontWeight: 900, textTransform: "lowercase", letterSpacing: "-0.035em" },
  }[look];

  const mark = {
    bold: (
      <span
        className="grid shrink-0 place-items-center font-extrabold"
        style={{ background: palette.accent, color: palette.onAccent, width: "1.55em", height: "1.55em", transform: "skewX(-12deg)", fontStretch: "66%" }}
      >
        <span style={{ transform: "skewX(12deg)" }}>{ini}</span>
      </span>
    ),
    clean: (
      <span
        className="grid shrink-0 place-items-center rounded-full font-semibold"
        style={{ border: `0.1em solid ${palette.accent}`, color: ink, width: "2em", height: "2em", fontSize: "0.74em" }}
      >
        {ini}
      </span>
    ),
    warm: (
      <span
        className="grid shrink-0 place-items-center font-black"
        style={{ background: palette.accent, color: palette.onAccent, width: "1.5em", height: "1.5em", borderRadius: "0.42em" }}
      >
        {ini.slice(0, 1).toLowerCase()}
      </span>
    ),
  }[look];

  return (
    <span className="ns-lockup flex min-w-0 flex-1 items-center gap-[0.45em] pr-[0.8em] leading-none" style={{ color: ink, fontSize: `${fit}em` }}>
      {mark}
      <span className="truncate" style={word}>
        {name}
      </span>
    </span>
  );
}

/** The template site. Every size is in cqw of the phone screen. */
function SketchSite({ name, trade, look, palette }) {
  const p = palette;
  const t = {
    bold: {
      ground: p.dark,
      ink: p.light,
      soft: "rgb(255 255 255 / 0.72)",
      line: "rgb(255 255 255 / 0.2)",
      panel: "rgb(255 255 255 / 0.08)",
      headline: { fontStretch: "66%", fontWeight: 800, textTransform: "uppercase", fontSize: "13cqw", lineHeight: 0.92, letterSpacing: "0" },
      button: { background: p.accent, color: p.onAccent, borderRadius: "1.2cqw", textTransform: "uppercase", fontStretch: "80%", letterSpacing: "0.04em" },
    },
    clean: {
      ...SKETCH_NEUTRALS,
      headline: { fontStretch: "100%", fontWeight: 600, fontSize: "10cqw", lineHeight: 1.02, letterSpacing: "-0.03em" },
      button: { background: p.dark, color: p.light, borderRadius: "1.8cqw" },
    },
    warm: {
      ground: p.light,
      ink: p.dark,
      soft: `color-mix(in srgb, ${p.dark} 72%, ${p.light})`,
      line: `color-mix(in srgb, ${p.dark} 18%, transparent)`,
      panel: `color-mix(in srgb, ${p.dark} 7%, ${p.light})`,
      headline: { fontStretch: "92%", fontWeight: 900, fontSize: "11cqw", lineHeight: 0.98, letterSpacing: "-0.035em" },
      button: { background: p.accent, color: p.onAccent, borderRadius: "999px" },
    },
  }[look];

  const photo = (
    <Image
      key={trade.id}
      src={trade.image}
      alt=""
      fill
      sizes="(min-width: 1024px) 320px, 78vw"
      className="sk-photo object-cover"
    />
  );
  const callButton = (
    <span className="ns-surface flex items-center justify-center gap-[2cqw] font-bold" style={{ ...t.button, height: "12.5cqw", fontSize: "4.4cqw" }}>
      <Phone style={{ width: "4.4cqw", height: "4.4cqw" }} strokeWidth={2.4} />
      {trade.cta}
    </span>
  );
  const label = { fontSize: "2.9cqw", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: t.soft };

  return (
    <div className="ns-surface min-h-full" style={{ background: t.ground, color: t.ink }}>
      {/* Header */}
      <div
        className="ns-surface sticky top-0 z-10 flex items-center justify-between"
        style={{ background: t.ground, padding: "9cqw 5cqw 3.4cqw", borderBottom: look === "warm" ? "none" : `1px solid ${t.line}`, fontSize: "5cqw" }}
      >
        <Lockup key={look} name={name} look={look} palette={p} ink={t.ink} />
        <Menu style={{ width: "6cqw", height: "6cqw", flexShrink: 0 }} strokeWidth={2} />
      </div>

      {/* Hero, one composition per look */}
      {look === "bold" && (
        <div className="relative" style={{ minHeight: "118cqw" }}>
          {photo}
          <span className="absolute inset-0" style={{ background: "rgb(0 0 0 / 0.52)" }} />
          <div className="relative flex flex-col justify-end" style={{ minHeight: "118cqw", padding: "6cqw 5cqw", color: "#ffffff" }}>
            <p style={t.headline}>{trade.headline}</p>
            <p style={{ fontSize: "4.3cqw", lineHeight: 1.35, marginTop: "3cqw", color: "rgb(255 255 255 / 0.86)" }}>{trade.sub}</p>
            <div style={{ marginTop: "5cqw" }}>{callButton}</div>
          </div>
        </div>
      )}
      {look === "clean" && (
        <div style={{ padding: "7cqw 5cqw 0" }}>
          <p style={t.headline}>{trade.headline}</p>
          <p style={{ fontSize: "4.3cqw", lineHeight: 1.4, marginTop: "3cqw", color: t.soft }}>{trade.sub}</p>
          <div className="grid grid-cols-2" style={{ gap: "2.4cqw", marginTop: "5cqw" }}>
            {callButton}
            <span className="flex items-center justify-center font-semibold" style={{ height: "12.5cqw", fontSize: "4.2cqw", border: `1.5px solid ${t.ink}`, borderRadius: "1.8cqw" }}>
              Directions
            </span>
          </div>
          <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3", marginTop: "6cqw", borderRadius: "3cqw" }}>
            {photo}
          </div>
        </div>
      )}
      {look === "warm" && (
        <div>
          <div className="relative overflow-hidden" style={{ aspectRatio: "1 / 1", margin: "0 3cqw", borderRadius: "7cqw" }}>
            {photo}
          </div>
          <div style={{ padding: "6cqw 5cqw 0" }}>
            <p style={t.headline}>{trade.headline}</p>
            <p style={{ fontSize: "4.3cqw", lineHeight: 1.4, marginTop: "3cqw", color: t.soft }}>{trade.sub}</p>
            <div style={{ marginTop: "5cqw" }}>{callButton}</div>
          </div>
        </div>
      )}

      {/* Services */}
      <div style={{ padding: "9cqw 5cqw 0" }}>
        <p style={label}>What we do</p>
        <ul style={{ marginTop: "2.4cqw", borderTop: `2px solid ${t.ink}` }}>
          {trade.services.map((s) => (
            <li key={s} className="flex items-center justify-between font-semibold" style={{ padding: "3.6cqw 0", borderBottom: `1px solid ${t.line}`, fontSize: "4.6cqw" }}>
              {s}
              <span className="ns-surface rounded-full" style={{ width: "2.2cqw", height: "2.2cqw", background: p.accent }} />
            </li>
          ))}
        </ul>
      </div>

      {/* Hours and map */}
      <div className="grid grid-cols-2" style={{ gap: "2.4cqw", padding: "7cqw 5cqw 0" }}>
        <div className="ns-surface" style={{ background: t.panel, padding: "4cqw", borderRadius: "2cqw" }}>
          <p style={label}>Hours</p>
          <p className="font-semibold" style={{ fontSize: "3.9cqw", lineHeight: 1.3, marginTop: "1.6cqw" }}>{trade.hours}</p>
        </div>
        <div className="ns-surface" style={{ background: t.panel, padding: "4cqw", borderRadius: "2cqw" }}>
          <p style={label}>Find us</p>
          <p className="flex items-center font-semibold" style={{ gap: "1.4cqw", fontSize: "3.9cqw", lineHeight: 1.3, marginTop: "1.6cqw" }}>
            <MapPin style={{ width: "4.2cqw", height: "4.2cqw", flexShrink: 0, color: look === "bold" ? p.accent : t.ink }} strokeWidth={2.2} />
            Map &amp; directions
          </p>
        </div>
      </div>

      {/* Reviews: a placeholder, never invented quotes */}
      <div style={{ padding: "7cqw 5cqw 0" }}>
        <p style={label}>Reviews</p>
        <div className="flex" style={{ gap: "1cqw", marginTop: "2.4cqw" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} style={{ width: "5cqw", height: "5cqw", color: look === "clean" ? p.dark : p.accent }} strokeWidth={2} />
          ))}
        </div>
        <p style={{ fontSize: "4cqw", lineHeight: 1.4, marginTop: "2cqw", color: t.soft }}>Your Google reviews show here.</p>
      </div>

      {/* Footer */}
      <div style={{ margin: "8cqw 5cqw 0", padding: "5cqw 0 9cqw", borderTop: `1px solid ${t.line}` }}>
        <p className="truncate font-bold" style={{ fontSize: "4.4cqw" }}>{name}</p>
        <p style={{ fontSize: "3.6cqw", marginTop: "1cqw", color: t.soft }}>Your address · Your phone number</p>
      </div>
    </div>
  );
}

const setLabel = "text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-subtle";

export default function InstantSketch() {
  const [typed, setTyped] = useState("");
  const [tradeIdx, setTradeIdx] = useState(0);
  const [lookIdx, setLookIdx] = useState(0);
  const [paletteIdx, setPaletteIdx] = useState(0);
  const tracked = useRef(false);
  const screenRef = useRef(null);

  const trade = TRADES[tradeIdx];
  const look = LOOKS[lookIdx];
  const palette = SKETCH_PALETTES[paletteIdx];
  const biz = useMemo(() => cleanBizName(typed), [typed]);
  const shownName = biz || trade.sample;

  // One Pixel signal per visit once someone has really typed a name: a mid-funnel event Meta
  // can learn from while purchases are still rare.
  useEffect(() => {
    if (tracked.current || biz.length < 3) return;
    const id = setTimeout(() => {
      tracked.current = true;
      trackEvent("CustomizeProduct", { content_name: "Instant site sketch", content_category: `trade:${trade.id}` });
    }, 1200);
    return () => clearTimeout(id);
  }, [biz, trade.id]);

  // A new trade or look starts the mock site from the top again.
  useEffect(() => {
    screenRef.current?.scrollTo({ top: 0 });
  }, [tradeIdx, lookIdx]);

  return (
    <section aria-labelledby="sketch-title" className="theme-mint border-b border-line py-14 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-9 px-4 sm:px-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
        <div className="lg:col-span-6">
          <h2 id="sketch-title" className="font-display-wide text-[clamp(2rem,5vw,3.2rem)] font-bold leading-none">
            See it with your name.
          </h2>
          <p className="mt-3 max-w-md text-muted">
            Type your business name and a one-page site draws itself around it. Like the direction? We design the real
            one in 2&nbsp;hours.
          </p>

          <label htmlFor="sketch-name" className={`mt-7 block ${setLabel}`}>
            Your business name
          </label>
          <input
            id="sketch-name"
            type="text"
            autoComplete="organization"
            enterKeyHint="done"
            maxLength={BIZ_MAX}
            value={typed}
            placeholder={trade.sample}
            onChange={(e) => setTyped(e.target.value)}
            className="mt-2 h-14 w-full rounded-md border-[1.5px] border-line-strong bg-surface px-4 text-lg font-semibold text-fg outline-none transition-colors placeholder:font-medium placeholder:text-fg/40 focus:border-fg"
          />

          <label htmlFor="sketch-trade" className={`mt-5 block ${setLabel}`}>
            Your kind of business
          </label>
          <div className="relative mt-2">
            <select
              id="sketch-trade"
              value={tradeIdx}
              onChange={(e) => setTradeIdx(Number(e.target.value))}
              className="h-12 w-full appearance-none rounded-md border-[1.5px] border-line-strong bg-surface pl-4 pr-11 font-semibold text-fg outline-none transition-colors focus:border-fg"
            >
              {TRADES.map((t, i) => (
                <option key={t.id} value={i}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 size-5 -translate-y-1/2 text-subtle" />
          </div>
        </div>

        {/* The phone. On desktop it spans both rows of the left column. */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
          <p className="sr-only" aria-live="polite">
            {`Sketch for ${shownName}: ${trade.label}, ${look.label} look, ${palette.label}.`}
          </p>
          <div className="relative mx-auto aspect-[9/19] w-[78%] max-w-[20rem] rounded-[2.6rem] bg-charcoal p-[0.6rem] shadow-[0_28px_50px_-30px_rgb(20_24_21/0.7)] ring-1 ring-black/10">
            <span aria-hidden="true" className="absolute left-1/2 top-[1.05rem] z-20 h-[1.1rem] w-[5rem] -translate-x-1/2 rounded-full bg-charcoal" />
            <div
              ref={screenRef}
              tabIndex={0}
              role="img"
              aria-label={`Website sketch for ${shownName}. Scroll to see the whole page.`}
              className="sk-screen @container h-full overflow-y-auto overscroll-contain rounded-[2.05rem] bg-surface-2"
            >
              <div aria-hidden="true" className="h-full">
                <SketchSite name={shownName} trade={trade} look={look.id} palette={palette} />
              </div>
            </div>
          </div>
          <p className="caption mx-auto mt-4 max-w-[20rem] text-center">
            Scroll inside the phone. An instant sketch with sample text and a stock scene; your real concept is designed by a
            person from your logo, photos and services.
          </p>
        </div>

        <div className="lg:col-span-6">
          <fieldset>
            <legend className={setLabel}>Look</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {LOOKS.map((l, i) => (
                <button
                  key={l.id}
                  type="button"
                  aria-pressed={i === lookIdx}
                  onClick={() => setLookIdx(i)}
                  className={`h-11 rounded-md border-[1.5px] px-5 text-sm font-semibold transition-colors ${
                    i === lookIdx ? "border-fg bg-fg text-ink" : "border-line-strong text-fg hover:border-fg"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className={setLabel}>Colours</legend>
            <div className="mt-2 flex flex-wrap items-center gap-2.5">
              {SKETCH_PALETTES.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={i === paletteIdx}
                  aria-label={p.label}
                  title={p.label}
                  onClick={() => setPaletteIdx(i)}
                  className={`relative flex h-11 w-14 overflow-hidden rounded-md ring-offset-2 ring-offset-ink transition-shadow ${
                    i === paletteIdx ? "ring-2 ring-fg" : "ring-1 ring-line-strong hover:ring-fg"
                  }`}
                >
                  <span className="flex-[2]" style={{ background: p.dark }} />
                  <span className="flex-1" style={{ background: p.accent }} />
                </button>
              ))}
            </div>
          </fieldset>

          <PayButton
            id="pay-sketch"
            className="mt-9"
            label={`Make it real for $${pricing99.deposit}`}
            fields={{ biz, trade: trade.id, look: look.id, palette: palette.id }}
            category={`sketch:${trade.id}:${look.id}`}
          />
        </div>
      </div>
    </section>
  );
}
