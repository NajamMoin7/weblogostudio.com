"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { trackEvent } from "@/lib/pixel";
import Spinner from "@/components/ui/Spinner";

/**
 * "Pay $50 & Start" as a real form POST to /api/checkout, which redirects to Stripe.
 * Without JavaScript the form still works. With it, InitiateCheckout fires first and the
 * button shows a pending state, so a double tap never opens two checkouts.
 */
export default function PayButton({ className = "", id }) {
  const [pending, setPending] = useState(false);

  // Coming back from Stripe with the browser's Back button restores this page from the
  // back/forward cache with the button still pending; reset it.
  useEffect(() => {
    const onShow = (e) => e.persisted && setPending(false);
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  function onSubmit(e) {
    if (pending) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setPending(true);
    trackEvent("InitiateCheckout", { value: 50, currency: "USD", content_name: "Website Deposit: $99 One-Page Site", num_items: 1 });
    const form = e.currentTarget;
    // Give the Pixel request a moment to leave before the page navigates to Stripe.
    setTimeout(() => form.submit(), 180);
  }

  return (
    <form action="/api/checkout" method="post" onSubmit={onSubmit} className={className}>
      <button
        id={id}
        type="submit"
        aria-busy={pending || undefined}
        className="btn-fill group/btn relative isolate flex h-[4.25rem] w-full items-center justify-center gap-3 overflow-hidden rounded-md bg-orange-strong px-7 text-[1.2rem] font-bold text-white transition-[background-color,transform] duration-200 ease-out-quint hover:bg-orange-deep active:scale-[0.98] sm:w-auto sm:min-w-[22rem]"
      >
        <span className={`inline-flex items-center gap-3 transition-opacity ${pending ? "opacity-0" : ""}`}>
          Pay $50 &amp; Start
          <ArrowRight aria-hidden="true" className="arrow-nudge size-5" strokeWidth={2.4} />
        </span>
        {pending && (
          <span className="absolute inset-0 grid place-items-center">
            <span className="inline-flex items-center gap-2 text-base">
              <Spinner size={18} /> Opening secure checkout…
            </span>
          </span>
        )}
      </button>
      <p className="caption mt-3 flex items-center justify-center gap-1.5 sm:justify-start">
        <Lock aria-hidden="true" className="size-3" /> Secure checkout by Stripe · Remaining $49 only after you approve
      </p>
    </form>
  );
}
