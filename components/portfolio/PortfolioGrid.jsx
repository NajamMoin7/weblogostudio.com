"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

const EASE_OUT = [0.23, 1, 0.32, 1];

/**
 * Client-side portfolio filter. Cards are rendered on the server and passed in
 * as elements, so the mockup markup never ships as client JavaScript.
 *
 * @param {{ categories: {id: string, label: string}[], items: {slug: string, categories: string[], card: React.ReactNode}[] }} props
 */
export default function PortfolioGrid({ categories, items }) {
  const [active, setActive] = useState("all");
  const filters = [{ id: "all", label: "All work" }, ...categories];
  const visible = active === "all" ? items : items.filter((i) => i.categories.includes(active));
  const countFor = (id) => (id === "all" ? items.length : items.filter((i) => i.categories.includes(id)).length);
  const activeLabel = filters.find((f) => f.id === active)?.label;

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        <LayoutGroup id="portfolio-filters">
          {filters.map((f) => {
            const selected = active === f.id;
            const count = countFor(f.id);
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={selected}
                disabled={count === 0}
                onClick={() => setActive(f.id)}
                className={`relative inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm transition-colors duration-200 active:scale-[0.97] disabled:opacity-40 ${
                  selected ? "text-ink" : "border border-line-strong text-muted hover:border-fg/40 hover:text-fg"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="filter-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-md bg-fg"
                    transition={{ type: "spring", duration: 0.4, bounce: 0.12 }}
                  />
                )}
                <span className="relative">{f.label}</span>
                <span className={`relative font-mono text-[0.7rem] ${selected ? "text-ink/60" : "text-subtle"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"} in {activeLabel}
      </p>

      <motion.ul layout className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item) => (
            <motion.li
              key={item.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              {item.card}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="mt-12 rounded-xl border border-line p-10 text-center text-muted">
          No projects in this category yet. New work is added regularly.
        </p>
      )}
    </div>
  );
}
