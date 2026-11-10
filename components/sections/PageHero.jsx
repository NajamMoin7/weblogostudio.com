import Breadcrumbs from "@/components/ui/Breadcrumbs";

/**
 * Hero for inner pages, set as the head of a specimen sheet: breadcrumbs as the running head,
 * a condensed H1, intro, optional actions and aside. Static at first paint.
 * (`eyebrow` is accepted for compatibility and ignored: no kickers above headings.)
 */
export default function PageHero({ breadcrumbs, title, intro, actions, aside, children }) {
  return (
    <section className="relative border-b border-line">
      <div className="container-page pb-14 pt-8 lg:pb-20 lg:pt-12">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={aside ? "grid items-center gap-12 lg:grid-cols-12" : ""}>
          <div className={aside ? "lg:col-span-6" : "max-w-5xl"}>
            <h1
              className={`font-display-wide font-bold leading-[0.95] ${
                aside ? "text-[clamp(2.4rem,5vw,4.4rem)]" : "text-[clamp(2.6rem,6.4vw,5.6rem)]"
              }`}
            >
              {title}
            </h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
            {actions && <div className="mt-9 flex flex-col gap-3 xs:flex-row">{actions}</div>}
            {children}
          </div>
          {aside && <div className="lg:col-span-6">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
