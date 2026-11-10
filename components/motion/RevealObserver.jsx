"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = ".reveal, .reveal-card, .reveal-words, .reveal-image, [data-reveal-group]";
const STAGGER_MS = 70;
const MAX_STAGGER = 6;

/**
 * One IntersectionObserver for every scroll reveal.
 *
 * Content is never hidden by CSS alone. After hydration, only elements that start BELOW the
 * viewport are marked data-reveal="pending" (they are off screen, so nothing visibly
 * disappears). Everything in the first viewport stays exactly as it painted, which keeps LCP
 * and above-the-fold content untouched. Reduced motion skips the whole mechanism.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target)
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left)
          .forEach((el, i) => {
            el.style.setProperty("--rd", `${Math.min(i, MAX_STAGGER) * STAGGER_MS}ms`);
            el.setAttribute("data-reveal", "in");
            io.unobserve(el);
          });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    const scan = () => {
      const fold = window.innerHeight;
      document.querySelectorAll(SELECTOR).forEach((el) => {
        // Already shown: leave it. Still "pending" from an earlier observer (a route Next.js kept
        // alive and restored on back/forward, or a cleanup mid-scroll): pick it up again, or it
        // would stay hidden forever.
        if (el.getAttribute("data-reveal") === "in") return;
        if (el.getBoundingClientRect().top < fold) {
          el.setAttribute("data-reveal", "in");
          return;
        }
        el.setAttribute("data-reveal", "pending");
        io.observe(el);
      });
    };
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
