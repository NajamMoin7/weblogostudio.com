import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Spinner from "./Spinner";

/**
 * Button system.
 * Variants: primary, secondary, outline, text, icon, dark, outlineDark.
 * - Hover: colour/background transition; arrows nudge diagonally.
 * - `fill`: a directional brand-blue fill slides in from the left (selected primary CTAs only).
 * - `swap`: an arrow chip travels from the end to the start while the label shifts across
 *   (transform-only; two chips so no layout property animates).
 * - Pressed: subtle scale-down. Focus: global cyan focus ring (not colour-only: it is an outline).
 * - `loading`: spinner overlays the label while the label keeps its space, so width never changes;
 *   the button is disabled and marked aria-busy.
 * - Disabled: reduced opacity, no pointer events.
 */
const base =
  "group/btn relative isolate inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md font-medium " +
  "transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-out-quint active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55";

const variants = {
  primary: "bg-fg text-ink hover:bg-white hover:shadow-[0_10px_30px_-12px_rgb(0_119_254/0.6)]",
  secondary: "border border-line-strong text-fg hover:border-fg/50 hover:bg-white/[0.05]",
  outline: "border border-fg/70 text-fg hover:border-fg hover:bg-fg hover:text-ink",
  text: "h-auto! px-0! text-fg underline decoration-line-strong underline-offset-[6px] hover:decoration-cyan rounded-sm",
  icon: "size-11 rounded-full! border border-line-strong p-0! text-fg hover:border-fg hover:bg-fg hover:text-ink",
  dark: "bg-paper-ink text-paper hover:bg-black",
  outlineDark: "border border-paper-ink/25 text-paper-ink hover:border-paper-ink/60",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses({ variant = "primary", size = "md", fill = false, swap = false, className = "" } = {}) {
  const fillCls = fill && variant === "primary" ? "btn-fill hover:text-white hover:bg-fg" : "";
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
  const tone = variant === "primary" ? "bg-ink text-fg" : "bg-fg text-ink";
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
