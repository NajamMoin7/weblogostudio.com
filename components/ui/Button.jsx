import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Spinner from "./Spinner";

/**
 * Button system.
 * Variants: primary, secondary, outline, text, icon, dark, outlineDark.
 * - Hover: colour/background transition; arrows nudge diagonally.
 * - Primary is the accent orange; secondary and outline are brand-green outlines that fill on hover.
 *   In .theme-forest sections the "brand" token turns cream, so outlines stay visible.
 * - `fill`: a forest-green fill slides in from the left (selected primary CTAs only).
 * - `swap`: an arrow chip travels from the end to the start while the label shifts across
 *   (transform-only; two chips so no layout property animates).
 * - Pressed: subtle scale-down. Focus: global accent focus ring (not colour-only: it is an outline).
 * - `loading`: spinner overlays the label while the label keeps its space, so width never changes;
 *   the button is disabled and marked aria-busy.
 * - Disabled: reduced opacity, no pointer events.
 */
const base =
  "group/btn relative isolate inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg font-semibold " +
  "transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-out-quint active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55";

const variants = {
  primary: "bg-orange-strong text-white shadow-[0_1px_2px_rgb(32_37_33/0.12)] hover:bg-orange-deep hover:shadow-[0_12px_28px_-14px_rgb(180_83_42/0.75)]",
  secondary: "border-[1.5px] border-brand/70 text-brand hover:border-brand hover:bg-brand hover:text-on-brand",
  outline: "border-[1.5px] border-brand text-brand hover:bg-brand hover:text-on-brand",
  text: "h-auto! px-0! text-fg underline decoration-orange/60 decoration-[1.5px] underline-offset-[6px] hover:decoration-orange hover:text-brand rounded-sm",
  icon: "size-11 rounded-full! border-[1.5px] border-line-strong p-0! text-fg hover:border-brand hover:bg-brand hover:text-on-brand",
  dark: "bg-forest text-cream hover:bg-forest-deep",
  outlineDark: "border-[1.5px] border-forest/40 text-forest hover:border-forest",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses({ variant = "primary", size = "md", fill = false, swap = false, className = "" } = {}) {
  const fillCls = fill && variant === "primary" ? "btn-fill" : "";
  const swapCls = swap ? "btn-swap" : "";
  const sizeCls = variant === "icon" ? "" : sizes[size];
  return `${base} ${variants[variant]} ${sizeCls} ${fillCls} ${swapCls} ${className}`;
}

function Arrow() {
  return (
    <ArrowUpRight
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-300 ease-out-quint group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
      strokeWidth={2}
    />
  );
}

/** Arrow chip for the swap style: one sits at the end, its twin waits off-screen at the start. */
function SwapChip({ position, variant }) {
  const tone = variant === "primary" ? "bg-white text-orange-strong" : "bg-brand text-on-brand";
  return (
    <span aria-hidden="true" className={`swap-chip swap-chip-${position} grid size-9 place-items-center rounded-full ${tone}`}>
      <ArrowUpRight className="size-4" strokeWidth={2.2} />
    </span>
  );
}

function Content({ children, arrow, loading, loadingLabel, swap, variant }) {
  return (
    <>
      {swap && <SwapChip position="start" variant={variant} />}
      <span className={`inline-flex items-center gap-2 transition-opacity duration-150 ${swap ? "swap-label" : ""} ${loading ? "opacity-0" : ""}`}>
        {children}
        {arrow && !swap && <Arrow />}
      </span>
      {swap && !loading && <SwapChip position="end" variant={variant} />}
      {loading && (
        <span className="absolute inset-0 grid place-items-center">
          <span className="inline-flex items-center gap-2">
            <Spinner size={16} />
            {loadingLabel && <span>{loadingLabel}</span>}
          </span>
        </span>
      )}
    </>
  );
}

export default function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  fill = false,
  swap = false,
  loading = false,
  loadingLabel,
  className = "",
  children,
  disabled,
  ...props
}) {
  const classes = buttonClasses({ variant, size, fill, swap, className });
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        <Content arrow={arrow} swap={swap} variant={variant}>
          {children}
        </Content>
      </Link>
    );
  }
  return (
    <button className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      <Content arrow={arrow} swap={swap} variant={variant} loading={loading} loadingLabel={loadingLabel}>
        {children}
      </Content>
    </button>
  );
}
