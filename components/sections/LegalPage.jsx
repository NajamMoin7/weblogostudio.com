import PageHero from "@/components/sections/PageHero";

/**
 * Long-form legal layout with an in-page table of contents.
 * sections: [{ id, title, body: (string | string[])[] }]. A nested array renders as a list.
 */
export default function LegalPage({ title, path, intro, updated, sections }) {
  return (
    <>
      <PageHero breadcrumbs={[{ label: title, href: path }]} eyebrow="Legal" title={title} intro={intro}>
        <p className="rise-in mt-8 font-mono text-xs uppercase tracking-[0.16em] text-subtle" style={{ "--i": 3 }}>
          Last updated {updated}
        </p>
      </PageHero>
      <div className="container-page grid gap-14 py-16 lg:grid-cols-12 lg:py-24">
        <nav aria-label="On this page" className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <h2 className="eyebrow text-subtle">On this page</h2>
            <ol className="mt-5 space-y-2.5 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-3 text-muted transition-colors hover:text-fg">
                    <span className="font-mono text-xs leading-5 text-subtle">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <article className="max-w-3xl lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="border-t border-line py-10 first:border-t-0 first:pt-0">
              <h2 id={`${s.id}-h`} className="font-display-wide text-2xl font-semibold">
                <span className="mr-3 font-mono text-sm font-normal text-cyan">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-muted">
                {s.body.map((block, j) =>
                  Array.isArray(block) ? (
                    <ul key={j} className="space-y-2 pl-1">
                      {block.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-subtle" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j}>{block}</p>
                  ),
                )}
              </div>
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
