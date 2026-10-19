"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

/**
 * Accessible accordion. Each header is a real <button> with aria-expanded and aria-controls,
 * so Enter and Space toggle natively and Tab moves between items. Arrow keys, Home and End
 * move focus between headers, following the WAI-ARIA accordion pattern.
 * Height animates with a grid-rows transition: no measuring, no JS animation loop.
 */
export default function Accordion({ items, tone = "dark", defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();
  const paper = tone === "paper";
  const border = paper ? "border-paper-ink/15" : "border-line";

  function onKeyDown(e) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    const root = e.currentTarget.closest("[data-accordion]");
    const buttons = Array.from(root.querySelectorAll("[data-accordion-trigger]"));
    const i = buttons.indexOf(e.currentTarget);
    let next = i;
    if (e.key === "ArrowDown") next = (i + 1) % buttons.length;
    if (e.key === "ArrowUp") next = (i - 1 + buttons.length) % buttons.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = buttons.length - 1;
    e.preventDefault();
    buttons[next].focus();
  }

  return (
    <div data-accordion className={`border-t ${border}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const triggerId = `${baseId}-t-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={item.q} className={`border-b ${border}`}>
            <h3>
              <button
                id={triggerId}
                type="button"
                data-accordion-trigger
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                onKeyDown={onKeyDown}
                className={`group/acc flex w-full items-start justify-between gap-6 py-6 text-left text-[1.05rem] font-medium leading-snug transition-colors duration-150 ${
                  paper ? "text-paper-ink" : "text-fg hover:text-white"
                }`}
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-[transform,background-color,color,border-color] duration-300 ease-out-quint group-hover/acc:scale-110 group-active/acc:scale-95 ${
                    paper ? "border-paper-ink/20" : "border-line-strong group-hover/acc:border-fg/60"
                  } ${isOpen ? `rotate-45 ${paper ? "bg-paper-ink text-paper" : "bg-fg text-ink"}` : ""}`}
                >
                  <Plus className="size-3.5" strokeWidth={2.2} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out-quint ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className={`max-w-3xl pb-6 pr-4 leading-relaxed sm:pr-12 ${paper ? "text-paper-muted" : "text-muted"}`}>
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
