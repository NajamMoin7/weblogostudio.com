"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Search, X } from "lucide-react";
import WorkCard from "./WorkCard";
import { buttonClasses } from "@/components/ui/Button";

const PAGE = 24;
const EASE_OUT = [0.23, 1, 0.32, 1];

/**
 * Filterable, searchable portfolio grid over the full migrated dataset.
 * - Category pills (with counts) and, for logos, industry chips.
 * - Search across titles, categories and industries.
 * - "Load more" reveals the next batch; filters always apply to the whole dataset.
 * - State is mirrored to the URL (?category=&industry=&q=) with the native History API,
 *   so filtered views are shareable and filtering never reloads the page.
 */
export default function WorkGrid({ items, categories }) {
  const params = useSearchParams();
  const [category, setCategory] = useState(() => {
    const c = params.get("category");
    return categories.some((x) => x.id === c) ? c : "all";
  });
  const [industry, setIndustry] = useState(() => params.get("industry") ?? "all");
  const [query, setQuery] = useState(() => params.get("q") ?? "");
  const [limit, setLimit] = useState(PAGE);

  const counts = useMemo(() => {
    const c = { all: items.length };
    for (const it of items) c[it.category] = (c[it.category] || 0) + 1;
    return c;
  }, [items]);

  const industries = useMemo(() => {
    const m = new Map();
    for (const it of items) if (it.category === "logos" && it.subcategory) m.set(it.subcategory, (m.get(it.subcategory) || 0) + 1);
    return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (category !== "all" && it.category !== category) return false;
      if (category === "logos" && industry !== "all" && it.subcategory !== industry) return false;
      if (!q) return true;
      return `${it.title} ${it.category} ${it.subcategory ?? ""}`.toLowerCase().includes(q);
    });
  }, [items, category, industry, query]);

  const visible = filtered.slice(0, limit);

  function sync(next) {
    const url = new URL(window.location.href);
    for (const [k, v] of Object.entries(next)) {
      if (!v || v === "all") url.searchParams.delete(k);
      else url.searchParams.set(k, v);
    }
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }

  function chooseCategory(id) {
    setCategory(id);
    setIndustry("all");
    setLimit(PAGE);
    sync({ category: id, industry: "all" });
  }

  function chooseIndustry(id) {
    setIndustry(id);
    setLimit(PAGE);
    sync({ industry: id });
  }

  function onSearch(value) {
    setQuery(value);
    setLimit(PAGE);
    sync({ q: value });
  }

  function reset() {
    setCategory("all");
    setIndustry("all");
    setQuery("");
    setLimit(PAGE);
    sync({ category: "all", industry: "all", q: "" });
  }

  const filters = [{ id: "all", label: "All work" }, ...categories];
  const activeLabel = filters.find((f) => f.id === category)?.label;

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          <LayoutGroup id="work-filters">
            {filters.map((f) => {
              const on = category === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => chooseCategory(f.id)}
                  className={`relative inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-200 active:scale-[0.97] ${
                    on ? "text-cream" : "border border-line-strong bg-surface text-muted hover:border-brand/40 hover:text-brand"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="work-filter-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-forest"
                      transition={{ type: "spring", duration: 0.4, bounce: 0.12 }}
                    />
                  )}
                  <span className="relative">{f.label}</span>
                  <span className={`relative font-mono text-[0.7rem] ${on ? "text-cream/75" : "text-subtle"}`}>{counts[f.id] ?? 0}</span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>
        <label className="relative block w-full lg:w-72">
          <span className="sr-only">Search projects</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search projects or industries"
            className="h-10 w-full rounded-full border border-line-strong bg-surface pl-10 pr-9 text-sm text-fg placeholder:text-subtle/80 transition-[border-color,box-shadow] duration-150 hover:border-fg/30 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15"
          />
          {query && (
            <button
              type="button"
              onClick={() => onSearch("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-subtle hover:text-fg"
            >
              <X className="size-4" />
            </button>
          )}
        </label>
      </div>

      <AnimatePresence initial={false}>
        {category === "logos" && (
          <motion.div
            key="industries"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div role="group" aria-label="Filter logos by industry" className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
              {[["all", counts.logos], ...industries].map(([name, n]) => {
                const on = industry === name;
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={on}
                    onClick={() => chooseIndustry(name)}
                    className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs transition-colors duration-200 ${
                      on ? "border-orange-strong bg-orange/10 text-fg" : "border-line bg-surface text-muted hover:border-brand/30 hover:text-brand"
                    }`}
                  >
                    {name === "all" ? "All industries" : name}
                    <span className="font-mono text-[0.65rem] text-subtle">{n}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p aria-live="polite" className="mt-8 text-sm text-subtle">
        Showing <span className="text-fg">{visible.length}</span> of {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        {category !== "all" ? ` in ${activeLabel}` : ""}
        {category === "logos" && industry !== "all" ? ` · ${industry}` : ""}
        {query ? ` matching “${query}”` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-line-strong p-12 text-center">
          <p className="font-display-wide text-xl font-semibold text-fg">No projects match that search.</p>
          <p className="mt-2 text-muted">Try another word, or browse every category.</p>
          <button type="button" onClick={reset} className={buttonClasses({ variant: "secondary", className: "mt-6" })}>
            Show all work
          </button>
        </div>
      ) : (
        <ul className="mt-6 columns-2 gap-4 sm:gap-5 md:columns-3 xl:columns-4">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((item, i) => (
              <motion.li
                key={item.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT, delay: Math.min(i % PAGE, 12) * 0.025 } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="mb-6 break-inside-avoid"
              >
                <WorkCard item={item} priority={i < 4} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {visible.length < filtered.length && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <button type="button" onClick={() => setLimit((l) => l + PAGE)} className={buttonClasses({ variant: "secondary", size: "lg" })}>
            Load more
            <span className="font-mono text-xs text-subtle">{filtered.length - visible.length} left</span>
          </button>
        </div>
      )}
    </div>
  );
}
