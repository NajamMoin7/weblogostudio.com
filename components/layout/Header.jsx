"use client";

import { useEffect, useRef, useState } from "react";
import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { buttonClasses } from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

const EASE_OUT = [0.23, 1, 0.32, 1];

/**
 * Fixed-size pending dot for a nav link. It appears only if a navigation is genuinely
 * slow (not prefetched) and fades in after a short delay, so fast navigations show nothing.
 */
function PendingHint() {
  const { pending } = useLinkStatus();
  return (
    <span aria-hidden="true" className={`link-hint absolute right-0.5 top-1.5 ${pending ? "is-pending" : ""}`}>
      <Spinner size={8} />
    </span>
  );
}

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header({ logo }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // Close the mobile menu after navigation (state adjusted during render, not in an effect).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  // Detect scroll with an IntersectionObserver on a sentinel instead of a scroll listener.
  useEffect(() => {
    const sentinel = document.getElementById("scroll-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Mobile menu: lock page scroll, close on Escape, move focus into the panel.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const toggle = toggleRef.current;
    panelRef.current?.querySelector("a")?.focus();
    function onKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  // backdrop-filter creates a containing block for fixed children, so it is
  // dropped while the menu is open to let the panel cover the viewport.
  const surface = menuOpen
    ? "border-line bg-ink"
    : scrolled
      ? "border-line bg-ink/90 shadow-[0_6px_24px_-18px_rgb(32_37_33/0.35)] backdrop-blur-md"
      : "border-transparent bg-ink";

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300 ease-out-quint ${surface}`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        {logo}

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group/nav relative block px-3.5 py-2 text-[0.92rem] transition-colors duration-150 ${
                      active ? "font-medium text-brand" : "font-medium text-fg/80 hover:text-brand"
                    }`}
                  >
                    {item.label}
                    {!active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 -bottom-px h-px origin-left scale-x-0 bg-orange/60 transition-transform duration-300 ease-out-quint group-hover/nav:scale-x-100"
                      />
                    )}
                    <PendingHint />
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        aria-hidden="true"
                        className="brand-gradient absolute inset-x-3.5 -bottom-px h-[2px] rounded-full"
                        transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden min-[360px]:block">
            <Link href="/get-a-quote" className={buttonClasses({ size: "sm", fill: true })}>
              Get a Quote
            </Link>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 grid size-11 place-items-center rounded-md text-fg transition-colors hover:bg-fg/5 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.18, ease: EASE_OUT }}
                className="grid place-items-center"
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: EASE_OUT } }}
            transition={{ duration: 0.26, ease: EASE_OUT }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-ink lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page flex min-h-full flex-col justify-between py-8">
              <ul className="space-y-1">
                {mainNav.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.04 + i * 0.035 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`font-display-wide flex items-center justify-between border-b border-line py-4 text-[1.7rem] font-semibold ${
                          active ? "text-brand" : "text-fg/75"
                        }`}
                      >
                        {item.label}
                        {active && <span aria-hidden="true" className="brand-gradient size-2 rounded-full" />}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.28 }}
                className="mt-10 grid gap-3"
              >
                <Link href="/get-a-quote" className={buttonClasses({ size: "lg", fill: true, className: "w-full" })}>
                  Get a Quote
                </Link>
                <p className="eyebrow pt-4 text-center text-subtle">Brands for a brighter web</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Scroll-aware reading progress, driven purely by CSS scroll timelines */}
      <span aria-hidden="true" className="scroll-progress brand-gradient pointer-events-none absolute inset-x-0 -bottom-px h-px" />
    </header>
  );
}
