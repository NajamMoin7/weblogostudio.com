import Image from "next/image";

/**
 * A phone frame drawn in CSS around a real portfolio screenshot. The screen is a size
 * container; hover (or scroll on touch) pans the page from top to bottom (see .phone-page).
 * Fixed aspect ratio, so nothing shifts while the image loads.
 */
export default function PhoneMockup({ src, width, height, title, industry, priority = false, sizes = "260px" }) {
  return (
    <figure className="phone group" tabIndex={0} aria-label={`${title}, ${industry}: example website`}>
      <div className="relative mx-auto aspect-[9/19] w-full max-w-[16rem] rounded-[2.4rem] bg-charcoal p-[0.55rem] shadow-[0_28px_50px_-30px_rgb(20_24_21/0.7)] ring-1 ring-black/10">
        <span aria-hidden="true" className="absolute left-1/2 top-[0.95rem] z-10 h-[1.05rem] w-[4.6rem] -translate-x-1/2 rounded-full bg-charcoal" />
        <div className="phone-screen relative h-full overflow-hidden rounded-[1.9rem] bg-surface-2">
          <Image
            src={src}
            alt={`${title} website design by Web Logo Studio`}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            className="phone-page block h-auto w-full"
          />
        </div>
      </div>
      <figcaption className="mt-4 text-center">
        <span className="block font-semibold leading-tight text-fg">{title}</span>
        <span className="caption">{industry}</span>
      </figcaption>
    </figure>
  );
}
