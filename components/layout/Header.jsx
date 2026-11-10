"use client";

import { useEffect, useRef, useState } from "react";
import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { buttonClasses } from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import StudioClock from "@/components/ui/StudioClock";
import { siteConfig } from "@/lib/site";

const EASE_OUT = [0.16, 1, 0.3, 1];

/** Fixed-size pending dot, shown only when a navigation is genuinely slow. */
function PendingHint() {
  const { pending } = useLinkStatus();
  return (
    <span aria-hidden="true" className={`link-hint absolute -right-1 top-1 ${pending ? "is-pending" : ""}`}>
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
  const { phone, phoneHref } = siteConfig.contact;

  // Close the mobile menu after navigation (state adjusted during render, not in an effect).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const sentinel = document.getElementById("scroll-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

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

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={`sticky top-0 z-50 border-b border-line bg-ink transition-shadow duration-300 ${
        scrolled && !menuOpen ? "shadow-[0_8px_24px_-20px_rgb(20_24_21/0.45)]" : ""
      }`}
    >
      {/* Sheet strip: live studio clock and the studio's address, like a specimen's running head. */}
      <div className="hidden border-b border-line md:block">
        <div className="container-page flex h-8 items-center justify-between gap-6">
          <StudioClock />
          <p className="caption flex items-center gap-4">
            <span>Hicksville, NY</span>
            <a href={phoneHref} className="text-muted transition-colors hover:text-fg">
              {phone}
            </a>
          </p>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-3 sm:gap-6 lg:h-[4.25rem]">
        {logo}

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group/nav relative block py-2 text-[0.95rem] font-medium transition-colors duration-150 ${
                      active ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0.5 h-[2px] origin-left bg-orange transition-transform duration-300 ease-out-quint ${
                        active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100 group-hover/nav:bg-fg/40"
                      }`}
                    />
                    <PendingHint />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={phoneHref}
            aria-label={`Call ${phone}`}
            className="grid size-11 place-items-center rounded-md text-fg transition-colors hover:bg-fg/5 md:hidden"
          >
            <Phone className="size-[1.15rem]" aria-hidden="true" />
          </a>
          {/* Wrapper carries the breakpoint: the button's own inline-flex would override `hidden`. */}
          <div className="hidden min-[380px]:block">
            <Link href="/get-a-quote" className={buttonClasses({ size: "sm", fill: true })}>
              Get a quote
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
            <nav aria-label="Mobile" className="container-page flex min-h-full flex-col justify-between py-6">
              <ul>
                {mainNav.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.03 + i * 0.035 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="font-condensed flex items-baseline justify-between border-b border-line py-4 text-[2.4rem] font-bold uppercase leading-none"
                      >
                        <span className={active ? "text-fg" : "text-fg/70"}>{item.label}</span>
                        {active && <span aria-hidden="true" className="size-2.5 rounded-full bg-orange" />}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.24 }}
                className="mt-10 grid gap-3"
              >
                <Link href="/get-a-quote" className={buttonClasses({ size: "lg", fill: true, className: "w-full" })}>
                  Get a quote
                </Link>
                <a href={phoneHref} className={buttonClasses({ size: "lg", variant: "secondary", className: "w-full" })}>
                  <Phone className="size-4" aria-hidden="true" /> Call {phone}
                </a>
                <StudioClock className="mt-3 justify-center" tone="quiet" />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <span aria-hidden="true" className="scroll-progress pointer-events-none absolute inset-x-0 -bottom-px h-px bg-brand" />
    </header>
  );
}
