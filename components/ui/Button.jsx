import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Spinner from "./Spinner";

/**
 * Button system, set like specimen labels: square-cut, semibold, tight.
 * Variants: primary (the orange marking ink, reserved for the committed path), secondary
 * (ink outline that fills on hover), dark, text and icon.
 * - `fill`: a deeper ink slides in from the left on hover (transform only).
 * - `arrow` / `swap`: a trailing arrow that nudges forward on hover.
 * - `loading`: spinner overlays the label while the label keeps its space, so width never changes.
 */
const base =
  "group/btn relative isolate inline-flex select-none items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-md font-semibold tracking-[-0.005em] " +
  "transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-out-quint active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55";

const variants = {
  primary: "bg-orange-strong text-white hover:bg-orange-deep",
  secondary: "border-[1.5px] border-fg/80 text-fg hover:bg-fg hover:text-ink",
  outline: "border-[1.5px] border-brand text-brand hover:bg-brand hover:text-on-brand",
  text: "h-auto! px-0! text-fg underline decoration-orange decoration-2 underline-offset-[6px] hover:decoration-fg rounded-sm",
  icon: "size-11 rounded-full! border-[1.5px] border-line-strong p-0! text-fg hover:border-fg hover:bg-fg hover:text-ink",
  dark: "bg-forest text-cream hover:bg-forest-deep",
  outlineDark: "border-[1.5px] border-forest/40 text-forest hover:border-forest",
};

const sizes = {
  sm: "h-10 px-4 text-[0.9rem]",
  md: "h-12 px-5 text-[0.95rem]",
  lg: "h-14 px-6 text-base",
  xl: "h-16 px-7 text-[1.1rem]",
};

export function buttonClasses({ variant = "primary", size = "md", fill = false, className = "" } = {}) {
  const fillCls = fill && variant === "primary" ? "btn-fill" : "";
  const sizeCls = variant === "icon" ? "" : sizes[size];
  return `${base} ${variants[variant]} ${sizeCls} ${fillCls} ${className}`;
}

function Content({ children, arrow, loading, loadingLabel }) {
  return (
    <>
      <span className={`inline-flex items-center gap-2.5 transition-opacity duration-150 ${loading ? "opacity-0" : ""}`}>
        {children}
        {arrow && <ArrowRight aria-hidden="true" className="arrow-nudge size-[1.1em] shrink-0" strokeWidth={2.2} />}
      </span>
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
  const classes = buttonClasses({ variant, size, fill, className });
  const showArrow = arrow || swap;
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        <Content arrow={showArrow}>{children}</Content>
      </Link>
    );
  }
  return (
    <button className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      <Content arrow={showArrow} loading={loading} loadingLabel={loadingLabel}>
        {children}
      </Content>
    </button>
  );
}
