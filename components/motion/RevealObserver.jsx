"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = ".reveal, .reveal-card, .reveal-words, .reveal-image";
const STAGGER_MS = 80;
const MAX_STAGGER = 6;

/**
 * One IntersectionObserver for every scroll reveal on the page.
 * - Marks elements with data-revealed once they enter the viewport (they stay revealed).
 * - Elements entering in the same batch are staggered via the --rd custom property.
 * - Re-scans after client-side navigation and when new nodes appear.
 * The matching CSS lives in app/globals.css; hidden states apply only under html.reveal-on,
 * which an inline script sets before first paint, so content never depends on JavaScript.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("reveal-on")) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((e) => e.isIntersecting).map((e) => e.target);
        entering
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left)
          .forEach((el, i) => {
            if (!reduced) el.style.setProperty("--rd", `${Math.min(i, MAX_STAGGER) * STAGGER_MS}ms`);
            el.setAttribute("data-revealed", "");
            io.unobserve(el);
          });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const scan = () => document.querySelectorAll(SELECTOR).forEach((el) => !el.hasAttribute("data-revealed") && io.observe(el));
    scan();

    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
