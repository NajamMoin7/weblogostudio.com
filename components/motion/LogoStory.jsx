"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";
import still from "@/public/brand/logo-3d-still.webp";

/**
 * Home scroll story in six acts: the studio's 3D mark parts, a website opens out of it, the
 * website starts selling (a cart fills), checkout is paid, the page folds into a phone, and the
 * mark locks back together beside the call to action. The stage pins under the header and the
 * page's scroll position is the only clock: nothing plays on its own.
 *
 * - The mark is the studio's own 3D render, scrubbed frame by frame on a canvas
 *   (public/story/logo, cut from public/brand/logo-3d-loop.mp4). The still paints first.
 * - Everything else is real DOM: a sample shop built from the site's font. JavaScript writes
 *   five numbers on the stage (--open, --cart, --pay, --phone, --end); CSS derives every
 *   transform, opacity and clip from them. The shop is a demo and the caption says so.
 * - Reduced motion and no-JavaScript never see the pinned stage: CSS swaps in six plain panels
 *   (.story-stills), which is also what assistive tech reads.
 */

const FRAMES = 56;
const pad = (n) => String(n).padStart(4, "0");
const clamp = (v) => Math.min(1, Math.max(0, v));
const seg = (p, a, b) => clamp((p - a) / (b - a));
const smooth = (t) => t * t * (3 - 2 * t);

const ACTS = [
  { end: 0.15, title: "It starts with a mark.", note: "A logo drawn to hold up at every size, from the shop sign to the browser tab." },
  { end: 0.33, title: "The mark opens a website.", note: "One page or fifty, built around what your customers look for first." },
  { end: 0.52, title: "The website starts selling.", note: "Products and a cart, set up so adding an item takes one tap." },
  { end: 0.65, title: "Checkout gets paid.", note: "Secure card payment, with the order confirmed on screen and by email." },
  { end: 0.84, title: "It fits the phone in their hand.", note: "Every page is designed for the small screen first, because that is where local customers are." },
  { end: 1, title: "One studio for all of it.", note: "Mark, website and shop, designed and built together." },
];

/** The demo shop's own colours and stock. Sample data, shown as a sample. */
const SHOP = { dark: "#14264b", light: "#f7f3ea", tile: "#efe8d8", accent: "#d9b23a", line: "rgb(20 38 75 / 0.16)" };
const PRODUCTS = [
  { id: "loaf", name: "Sourdough loaf", price: 9, src: "/story/loaf.webp" },
  { id: "croissants", name: "Croissants, box of 4", price: 14, src: "/story/croissants.webp" },
  { id: "buns", name: "Cinnamon buns", price: 11, src: "/story/buns.webp" },
];
const TOTAL = PRODUCTS.reduce((sum, p) => sum + p.price, 0);

function ShopMark({ size = "1em" }) {
  return (
    <span className="inline-flex items-center gap-[0.4em] font-black lowercase leading-none tracking-[-0.035em]" style={{ fontSize: size }}>
      <span className="grid place-items-center" style={{ width: "1.5em", height: "1.5em", borderRadius: "0.42em", background: SHOP.accent, color: SHOP.dark }}>
        b
      </span>
      bloom bakery
    </span>
  );
}

function Bag({ count, size }) {
  return (
    <span className="relative grid shrink-0 place-items-center rounded-full" style={{ width: size, height: size, border: `1.5px solid ${SHOP.dark}` }}>
      <ShoppingBag style={{ width: "50%", height: "50%" }} strokeWidth={2.2} />
      <span
        key={count}
        className="story-pop absolute grid place-items-center rounded-full font-bold tabular-nums"
        style={{ top: "-22%", right: "-22%", width: "56%", height: "56%", fontSize: `calc(${size} * 0.32)`, background: SHOP.accent, opacity: count ? 1 : 0 }}
      >
        {count}
      </span>
    </span>
  );
}

/** The sample shop page, desktop layout. Sizes are in cqw of the plate, so it scales as one object. */
function ShopPage({ count }) {
  return (
    <div style={{ background: SHOP.light, color: SHOP.dark }}>
      <div className="flex items-center justify-between" style={{ padding: "2.2cqw 3.4cqw", borderBottom: `1px solid ${SHOP.line}` }}>
        <ShopMark size="2.5cqw" />
        <span className="flex items-center font-semibold" style={{ gap: "3cqw", fontSize: "1.75cqw" }}>
          <span className="hidden sm:inline">Bread</span>
          <span className="hidden sm:inline">Pastry</span>
          <span className="hidden sm:inline">Visit</span>
          <Bag count={count} size="4.6cqw" />
        </span>
      </div>

      <div className="relative" style={{ aspectRatio: "1280 / 507" }}>
        <Image src="/story/bakery.webp" alt="" fill sizes="(min-width: 1024px) 58rem, 92vw" className="object-cover" />
        <span className="absolute inset-0" style={{ background: "rgb(20 38 75 / 0.5)" }} />
        <div className="absolute inset-0 flex flex-col justify-end" style={{ padding: "3.6cqw 3.4cqw", color: SHOP.light }}>
          <p className="font-black tracking-[-0.035em]" style={{ fontSize: "6.4cqw", lineHeight: 0.96 }}>
            Baked before sunrise.
          </p>
          <p style={{ fontSize: "2.1cqw", marginTop: "1.2cqw", opacity: 0.9 }}>Order by 8pm, collect warm from 7am.</p>
        </div>
      </div>

      <div data-story-grid style={{ padding: "3.2cqw 3.4cqw 0" }}>
        <p className="flex items-baseline justify-between font-black tracking-[-0.03em]" style={{ fontSize: "3.1cqw" }}>
          This week&rsquo;s bake
          <span className="font-semibold tracking-normal" style={{ fontSize: "1.6cqw", opacity: 0.7 }}>
            3 items
          </span>
        </p>
        <div className="grid grid-cols-3" style={{ gap: "2.2cqw", marginTop: "2cqw" }}>
          {PRODUCTS.map((p, i) => {
            const added = count > i;
            return (
              <div key={p.id}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "1 / 1", borderRadius: "1.6cqw", background: SHOP.tile }}>
                  <Image src={p.src} alt="" fill sizes="(min-width: 1024px) 18rem, 30vw" className="object-cover" />
                </div>
                <p className="font-bold" style={{ fontSize: "1.9cqw", marginTop: "1.4cqw", lineHeight: 1.2 }}>
                  {p.name}
                </p>
                <p className="tabular-nums" style={{ fontSize: "1.8cqw", marginTop: "0.3cqw", opacity: 0.75 }}>
                  ${p.price}.00
                </p>
                <span
                  className="flex items-center justify-center font-bold transition-colors duration-300"
                  style={{
                    gap: "0.8cqw",
                    height: "5cqw",
                    marginTop: "1.2cqw",
                    borderRadius: "999px",
                    fontSize: "1.7cqw",
                    border: `1.5px solid ${SHOP.dark}`,
                    background: added ? SHOP.dark : "transparent",
                    color: added ? SHOP.light : SHOP.dark,
                  }}
                >
                  {added && <Check style={{ width: "1.9cqw", height: "1.9cqw" }} strokeWidth={3} />}
                  {added ? "Added" : "Add to cart"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="font-semibold" style={{ margin: "3.4cqw 3.4cqw 0", padding: "2cqw 0 3cqw", borderTop: `1px solid ${SHOP.line}`, fontSize: "1.6cqw", opacity: 0.75 }}>
        Open Tue–Sun · 7am–3pm · 12 Sample Street
      </p>
    </div>
  );
}

/** The same shop on a phone: one column, the order already placed. Sizes in cqw of the screen. */
function ShopPhone() {
  return (
    <div style={{ background: SHOP.light, color: SHOP.dark }}>
      <div className="flex items-center justify-between" style={{ padding: "11cqw 5cqw 3.4cqw" }}>
        <ShopMark size="5.4cqw" />
        <Bag count={3} size="9cqw" />
      </div>
      <p className="flex items-center font-bold" style={{ gap: "2cqw", padding: "2.6cqw 5cqw", fontSize: "3.6cqw", background: SHOP.dark, color: SHOP.light }}>
        <Check style={{ width: "4cqw", height: "4cqw", color: SHOP.accent }} strokeWidth={3} />
        Order confirmed · pickup 7:00 AM
      </p>
      <div className="relative" style={{ aspectRatio: "4 / 3" }}>
        <Image src="/story/bakery.webp" alt="" fill sizes="20rem" className="object-cover" />
        <span className="absolute inset-0" style={{ background: "rgb(20 38 75 / 0.5)" }} />
        <p className="absolute font-black tracking-[-0.035em]" style={{ left: "5cqw", right: "5cqw", bottom: "5cqw", fontSize: "10.5cqw", lineHeight: 0.96, color: SHOP.light }}>
          Baked before sunrise.
        </p>
      </div>
      <div style={{ padding: "6cqw 5cqw 0" }}>
        <p className="font-black tracking-[-0.03em]" style={{ fontSize: "6.2cqw" }}>
          This week&rsquo;s bake
        </p>
        <ul style={{ marginTop: "3cqw", borderTop: `2px solid ${SHOP.dark}` }}>
          {PRODUCTS.map((p) => (
            <li key={p.id} className="flex items-center" style={{ gap: "3.6cqw", padding: "3.4cqw 0", borderBottom: `1px solid ${SHOP.line}` }}>
              <span className="relative shrink-0 overflow-hidden" style={{ width: "22cqw", height: "22cqw", borderRadius: "3cqw", background: SHOP.tile }}>
                <Image src={p.src} alt="" fill sizes="96px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold" style={{ fontSize: "4.4cqw", lineHeight: 1.2 }}>
                  {p.name}
                </span>
                <span className="block tabular-nums" style={{ fontSize: "4cqw", marginTop: "0.6cqw", opacity: 0.75 }}>
                  ${p.price}.00
                </span>
              </span>
              <span className="grid shrink-0 place-items-center rounded-full" style={{ width: "9cqw", height: "9cqw", background: SHOP.dark, color: SHOP.light }}>
                <Check style={{ width: "4.6cqw", height: "4.6cqw" }} strokeWidth={3} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="font-semibold" style={{ padding: "5cqw 5cqw 10cqw", fontSize: "3.4cqw", opacity: 0.75 }}>
        Open Tue–Sun · 7am–3pm
      </p>
    </div>
  );
}

/** The cart, with the paid confirmation stacked over it (cross-faded by --pay). Sizes in cqw of the panel. */
function CartPanel({ count, pressed = false }) {
  const subtotal = PRODUCTS.slice(0, count).reduce((sum, p) => sum + p.price, 0);
  return (
    <div className="relative h-full" style={{ background: SHOP.light, color: SHOP.dark }}>
      <div className="story-pay-list flex h-full flex-col" style={{ padding: "7cqw" }}>
        <p className="flex items-baseline justify-between font-black tracking-[-0.03em]" style={{ fontSize: "8.5cqw" }}>
          Your cart
          <span className="font-semibold tabular-nums tracking-normal" style={{ fontSize: "4.6cqw", opacity: 0.7 }}>
            {count} {count === 1 ? "item" : "items"}
          </span>
        </p>
        <ul className="flex-1" style={{ marginTop: "4cqw", borderTop: `2px solid ${SHOP.dark}` }}>
          {PRODUCTS.map((p, i) => (
            <li key={p.id} className="story-line flex items-center" data-in={count > i} style={{ gap: "4cqw", padding: "4cqw 0", borderBottom: `1px solid ${SHOP.line}` }}>
              <span className="relative shrink-0 overflow-hidden" style={{ width: "17cqw", height: "17cqw", borderRadius: "2.4cqw", background: SHOP.tile }}>
                <Image src={p.src} alt="" fill sizes="96px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1 font-bold" style={{ fontSize: "5cqw", lineHeight: 1.2 }}>
                {p.name}
              </span>
              <span className="font-semibold tabular-nums" style={{ fontSize: "5cqw" }}>
                ${p.price}
              </span>
            </li>
          ))}
        </ul>
        <p className="flex items-baseline justify-between font-bold" style={{ fontSize: "5.4cqw", marginTop: "5cqw" }}>
          Subtotal
          <span key={subtotal} className="story-pop tabular-nums">
            ${subtotal}.00
          </span>
        </p>
        <span
          className="flex items-center justify-center font-bold transition-[background-color,color,transform] duration-300"
          style={{
            height: "15cqw",
            marginTop: "4cqw",
            borderRadius: "999px",
            fontSize: "5.2cqw",
            background: pressed ? SHOP.dark : SHOP.accent,
            color: pressed ? SHOP.light : SHOP.dark,
            transform: pressed ? "scale(0.97)" : "none",
          }}
        >
          {pressed ? "Paying" : "Checkout"}
        </span>
      </div>

      <div className="story-pay-done absolute inset-0 flex flex-col items-center justify-center text-center" style={{ padding: "8cqw", background: SHOP.light }}>
        <span className="grid place-items-center rounded-full" style={{ width: "26cqw", height: "26cqw", background: SHOP.accent }}>
          <Check style={{ width: "13cqw", height: "13cqw" }} strokeWidth={3} />
        </span>
        <p className="font-black tracking-[-0.03em]" style={{ fontSize: "9cqw", marginTop: "6cqw", lineHeight: 1 }}>
          Order confirmed
        </p>
        <p className="font-semibold tabular-nums" style={{ fontSize: "5.4cqw", marginTop: "3cqw" }}>
          ${TOTAL}.00 paid
        </p>
        <p style={{ fontSize: "4.6cqw", marginTop: "5cqw", lineHeight: 1.35, opacity: 0.8 }}>
          Pickup tomorrow from 7:00 AM.
          <br />
          Receipt sent by email.
        </p>
      </div>
    </div>
  );
}

const phoneFrame = "relative aspect-[9/19] rounded-[2.4rem] bg-charcoal p-[0.55rem] shadow-[0_28px_50px_-30px_rgb(20_24_21/0.7)] ring-1 ring-black/10";
const phoneNotch = "absolute left-1/2 top-[0.95rem] z-10 h-[1.05rem] w-[4.6rem] -translate-x-1/2 rounded-full bg-charcoal";

export default function LogoStory() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const pageRef = useRef(null);
  const screenRef = useRef(null);
  const phonePageRef = useRef(null);
  const tickRefs = useRef([]);
  const [act, setAct] = useState(0);
  const [count, setCount] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 720;
    canvas.height = 720;

    const imgs = new Array(FRAMES);
    let alive = true;
    let raf = 0;
    let cur = 0;
    let target = 0;
    let drawn = -1;
    const last = { act: 0, count: 0, pressed: false };

    const usable = (i) => imgs[i]?.complete && imgs[i].naturalWidth > 0;
    const nearest = (i) => {
      for (let d = 0; d < FRAMES; d++) {
        if (usable(i - d)) return i - d;
        if (usable(i + d)) return i + d;
      }
      return -1;
    };
    const set = (name, v) => stage.style.setProperty(name, v.toFixed(4));

    const paint = () => {
      const p = cur;

      // The mark parts on the way in, and locks back together at the end.
      const parted = p < 0.5 ? seg(p, 0.01, 0.15) : 1 - seg(p, 0.86, 0.96);
      const f = nearest(Math.round(parted * (FRAMES - 1)));
      if (f >= 0 && f !== drawn) {
        ctx.drawImage(imgs[f], 0, 0, 720, 720);
        if (drawn === -1) setLive(true);
        drawn = f;
      }

      const phone = smooth(seg(p, 0.66, 0.77));
      set("--open", smooth(seg(p, 0.13, 0.25)));
      set("--cart", smooth(seg(p, 0.33, 0.41)) * (1 - smooth(seg(p, 0.645, 0.7))));
      set("--pay", smooth(seg(p, 0.565, 0.62)));
      set("--phone", phone);
      set("--end", smooth(seg(p, 0.85, 0.95)));

      // The desktop page scrolls down to its products; the phone page does the same later.
      const roll = (frame, page, t, toGrid) => {
        if (!frame || !page) return;
        const overflow = Math.max(0, page.offsetHeight - frame.clientHeight);
        const grid = toGrid ? page.querySelector("[data-story-grid]") : null;
        const want = grid ? Math.max(0, grid.offsetTop - frame.clientHeight * 0.1) : overflow;
        page.style.transform = `translate3d(0, ${(-t * Math.min(overflow, want)).toFixed(1)}px, 0)`;
      };
      roll(frameRef.current, pageRef.current, smooth(seg(p, 0.25, 0.33)), true);
      roll(screenRef.current, phonePageRef.current, smooth(seg(p, 0.75, 0.84)) * 0.45, false);

      let a = 0;
      while (a < ACTS.length - 1 && p >= ACTS[a].end) a++;
      if (a !== last.act) {
        last.act = a;
        setAct(a);
      }
      const c = p > 0.49 ? 3 : p > 0.46 ? 2 : p > 0.43 ? 1 : 0;
      if (c !== last.count) {
        last.count = c;
        setCount(c);
      }
      const pr = p > 0.545;
      if (pr !== last.pressed) {
        last.pressed = pr;
        setPressed(pr);
      }
      tickRefs.current.forEach((el, k) => {
        if (el) el.style.transform = `scaleX(${seg(p, k ? ACTS[k - 1].end : 0, ACTS[k].end)})`;
      });
    };

    const step = () => {
      raf = 0;
      if (!alive) return;
      cur += (target - cur) * 0.2;
      if (Math.abs(target - cur) < 0.0003) cur = target;
      paint();
      if (cur !== target) raf = requestAnimationFrame(step);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };
    const measure = () => {
      const rect = track.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(stage).top) || 0;
      target = clamp((top - rect.top) / (rect.height - stage.offsetHeight));
      schedule();
    };

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        for (let i = 0; i < FRAMES; i++) {
          const im = new window.Image();
          im.decoding = "async";
          im.onload = () => {
            if (!alive) return;
            if (drawn >= 0) drawn = -2; // a closer frame may now exist: repaint
            schedule();
          };
          im.src = `/story/logo/${pad(i + 1)}.webp`;
          imgs[i] = im;
        }
        measure();
      },
      { rootMargin: "100% 0px" },
    );
    near.observe(track);

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      alive = false;
      near.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const isLast = act === ACTS.length - 1;

  return (
    <section aria-labelledby="story-title" className="border-b border-line bg-[#f6f6f1]">
      <h2 id="story-title" className="sr-only">
        From a logo to a website to a shop
      </h2>

      <div ref={trackRef} className="story-track" style={{ "--story-acts": ACTS.length }}>
        <div ref={stageRef} className="story-stage sticky top-16 overflow-hidden md:top-24 lg:top-[6.25rem]">
          <div className="container-page flex h-full flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
            {/* Titles */}
            <div className="relative z-10 shrink-0 pb-6 pt-4 lg:col-span-4 lg:py-0">
              <div aria-hidden="true">
                <div className="flex gap-1.5">
                  {ACTS.map((a, i) => (
                    <span key={a.title} className="h-0.5 flex-1 overflow-hidden bg-line-strong">
                      <span
                        ref={(el) => {
                          tickRefs.current[i] = el;
                        }}
                        className="block h-full origin-left bg-orange"
                        style={{ transform: "scaleX(0)" }}
                      />
                    </span>
                  ))}
                </div>
                <p key={`t${act}`} className="story-cut font-display-wide mt-4 text-[clamp(1.8rem,4vw,3.4rem)] font-bold leading-[0.98] lg:mt-7">
                  {ACTS[act].title}
                </p>
                <p key={`n${act}`} className="story-cut story-cut-late mt-2.5 max-w-[34ch] text-[clamp(1rem,1.5vw,1.2rem)] leading-snug text-muted lg:mt-5">
                  {ACTS[act].note}
                </p>
              </div>
              {isLast ? (
                <div className="story-cut story-cut-late mt-4 flex flex-col gap-3 xs:flex-row xs:items-center lg:mt-8">
                  <Button href="/get-a-quote" size="lg" fill arrow className="w-full xs:w-auto">
                    Request a quote
                  </Button>
                  <Button href="/portfolio" variant="secondary" size="lg" className="w-full xs:w-auto">
                    See the work
                  </Button>
                </div>
              ) : (
                <p className="caption mt-3 lg:mt-8" aria-hidden="true">
                  {act + 1} of {ACTS.length} · Keep scrolling{act > 0 ? " · Sample shop made for this demo" : ""}
                </p>
              )}
            </div>

            {/* Scene */}
            <div className="story-scene relative min-h-0 flex-1 lg:col-span-8 lg:h-full" aria-hidden="true">
              <div className="story-logo absolute inset-0 grid place-items-center">
                <div className="story-logo-tile relative">
                  <Image src={still} alt="" fill sizes="(min-width: 1024px) 34rem, 80vw" className="object-contain" />
                  <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${live ? "opacity-100" : "opacity-0"}`} />
                </div>
              </div>

              <div className="absolute inset-0 grid place-items-center">
                <div className="story-plate relative w-full max-w-[58rem]">
                  <div ref={frameRef} className="story-frame @container overflow-hidden rounded-xl border border-line-strong">
                    <div ref={pageRef} className="will-change-transform">
                      <ShopPage count={count} />
                    </div>
                  </div>
                  <div className="story-cart @container absolute overflow-hidden rounded-xl border border-line-strong">
                    <CartPanel count={count} pressed={pressed} />
                  </div>
                </div>
              </div>

              <div className="story-phone absolute inset-0 grid place-items-center">
                <div className={`${phoneFrame} h-[min(94%,37rem)]`}>
                  <span className={phoneNotch} />
                  <div ref={screenRef} className="@container h-full overflow-hidden rounded-[1.9rem]" style={{ background: SHOP.light }}>
                    <div ref={phonePageRef} className="will-change-transform">
                      <ShopPhone />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plain version: read by assistive tech always; shown instead of the stage with reduced motion or no JS. */}
      <ol className="story-stills container-page">
        {ACTS.map((a, i) => (
          <li key={a.title}>
            <div
              className="@container relative grid aspect-[4/3] place-items-center overflow-hidden rounded-xl border border-line bg-surface"
              style={{ "--pay": i === 3 ? 1 : 0 }}
              aria-hidden="true"
            >
              {(i === 0 || i === 5) && <Image src={still} alt="" fill sizes="(min-width: 1024px) 30vw, 92vw" className="object-contain p-6" />}
              {i === 1 && (
                <div className="absolute inset-0">
                  <ShopPage count={0} />
                </div>
              )}
              {(i === 2 || i === 3) && (
                <div className="@container h-full w-[62%]">
                  <CartPanel count={3} pressed={i === 3} />
                </div>
              )}
              {i === 4 && (
                <div className={`${phoneFrame} h-[92%]`}>
                  <span className={phoneNotch} />
                  <div className="@container h-full overflow-hidden rounded-[1.9rem]" style={{ background: SHOP.light }}>
                    <ShopPhone />
                  </div>
                </div>
              )}
            </div>
            <p className="font-display-wide mt-4 text-[1.45rem] font-bold leading-tight">{a.title}</p>
            <p className="mt-1 text-muted">{a.note}</p>
          </li>
        ))}
      </ol>
      <noscript>
        <style>{`.story-track{display:none}.story-stills{position:static;width:auto;height:auto;overflow:visible;clip-path:none;white-space:normal;display:grid;gap:2.5rem 2rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));padding-block:4rem}`}</style>
      </noscript>
    </section>
  );
}
