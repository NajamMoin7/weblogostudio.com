import Breadcrumbs from "@/components/ui/Breadcrumbs";

/** Hero for inner pages: breadcrumbs, eyebrow, H1, intro, optional actions and aside. */
export default function PageHero({ breadcrumbs, eyebrow, title, intro, actions, aside, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="container-page pb-16 pt-10 lg:pb-24 lg:pt-14">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={aside ? "grid items-center gap-12 lg:grid-cols-12" : ""}>
          <div className={aside ? "lg:col-span-6" : "max-w-4xl"}>
            {eyebrow && (
              <p className="rise-in eyebrow mb-6 flex items-center gap-3 text-muted" style={{ "--i": 0 }}>
                <span aria-hidden="true" className="brand-gradient h-0.5 w-8 rounded-full" />
                {eyebrow}
              </p>
            )}
            <h1
              className={`rise-in font-display-wide font-bold leading-[1.02] ${aside ? "text-[clamp(2.2rem,4.4vw,3.7rem)]" : "text-[clamp(2.3rem,5.6vw,4.4rem)]"}`}
              style={{ "--i": 1 }}
            >
              {title}
            </h1>
            {intro && (
              <p className="rise-in mt-6 max-w-2xl text-lg leading-relaxed text-muted" style={{ "--i": 2 }}>
                {intro}
              </p>
            )}
            {actions && (
              <div className="rise-in mt-9 flex flex-col gap-3 xs:flex-row" style={{ "--i": 3 }}>
                {actions}
              </div>
            )}
            {children}
          </div>
          {aside && (
            <div className="rise-in lg:col-span-6" style={{ "--i": 2 }}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
