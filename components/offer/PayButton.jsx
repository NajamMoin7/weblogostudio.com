"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { trackEvent } from "@/lib/pixel";
import Spinner from "@/components/ui/Spinner";
import { pricing99 } from "@/data/offer99";

const CONTENT_NAME = `Website Deposit ($${pricing99.deposit}): $${pricing99.total} One-Page Site`;

/**
 * Starts the $99 order as a real form POST to /api/checkout, which redirects to Stripe.
 * Without JavaScript the form still works. With it, InitiateCheckout fires first and the
 * button shows a pending state, so a double tap never opens two checkouts.
 *
 * - `style`: a portfolio slug from "Pick a style"; sent as a hidden field (the API whitelists it).
 * - `variant`: "hero" (the big orange button with the Stripe note) or "compact" (one per phone).
 * - `label` / `ariaLabel`: the visible text and, for compact buttons, a fuller accessible name.
 */
export default function PayButton({
  className = "",
  id,
  style,
  variant = "hero",
  label = `Start for $${pricing99.deposit}`,
  ariaLabel,
}) {
  const [pending, setPending] = useState(false);

  // Coming back from Stripe with the browser's Back button restores this page from the
  // back/forward cache with the button still pending; reset it.
  useEffect(() => {
    const onShow = (e) => e.persisted && setPending(false);
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    trackEvent("InitiateCheckout", {
      value: pricing99.deposit,
      currency: "USD",
      content_name: CONTENT_NAME,
      num_items: 1,
      ...(style ? { content_category: `style:${style}` } : {}),
    });
    const form = e.currentTarget;
    // Give the Pixel request a moment to leave before the page navigates to Stripe.
    setTimeout(() => form.submit(), 180);
  }

  const hero = variant === "hero";
  const buttonCls = hero
    ? "h-[4.25rem] w-full px-7 text-[1.2rem] font-bold sm:w-auto sm:min-w-[22rem]"
    : "h-12 w-full px-4 text-[0.98rem] font-bold";

  return (
    <form action="/api/checkout" method="post" onSubmit={onSubmit} className={className}>
      {style && <input type="hidden" name="style" value={style} />}
      <button
        id={id}
        type="submit"
        aria-busy={pending || undefined}
        aria-label={ariaLabel}
        className={`btn-fill group/btn relative isolate flex items-center justify-center gap-3 overflow-hidden rounded-md bg-orange-strong text-white transition-[background-color,transform] duration-200 ease-out-quint hover:bg-orange-deep active:scale-[0.98] ${buttonCls}`}
      >
        <span className={`inline-flex items-center gap-2.5 transition-opacity ${pending ? "opacity-0" : ""}`}>
          {label}
          <ArrowRight aria-hidden="true" className={`arrow-nudge ${hero ? "size-5" : "size-4"}`} strokeWidth={2.4} />
        </span>
        {pending && (
          <span className="absolute inset-0 grid place-items-center">
            <span className={`inline-flex items-center gap-2 ${hero ? "text-base" : "text-sm"}`}>
              <Spinner size={hero ? 18 : 15} /> Opening secure checkout…
            </span>
          </span>
        )}
      </button>
      {hero && (
        <p className="caption mt-3 flex items-center justify-center gap-1.5 sm:justify-start">
          <Lock aria-hidden="true" className="size-3" /> Secure checkout by Stripe · Remaining ${pricing99.balance} only after you
          approve
        </p>
      )}
    </form>
  );
}
