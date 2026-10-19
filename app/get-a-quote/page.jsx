import { Suspense } from "react";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import QuoteForm from "@/components/forms/QuoteForm";
import { serviceGroups, getServicesByGroup } from "@/data/services";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Request a Quote",
  description:
    "Request a quote for website design, development, e-commerce, logo design or branding. Tell us about your project and we will reply with a clear proposal.",
  path: "/get-a-quote",
});

const nextSteps = [
  { title: "We review your brief", text: "We read every request carefully and note any questions." },
  { title: "We follow up", text: "We reply by email to clarify details, or suggest a short call if it helps." },
  { title: "You receive a proposal", text: "Scope, deliverables, revisions, timeline and price, in writing." },
  { title: "We get started", text: "Once you approve the proposal, we schedule the kickoff." },
];

function FormSkeleton() {
  return (
    <div aria-hidden="true" className="grid animate-pulse gap-6">
      <div className="h-4 w-2/3 max-w-64 rounded bg-surface-3" />
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="h-12 rounded-md bg-surface-2" />
        <div className="h-12 rounded-md bg-surface-2" />
      </div>
      <div className="h-12 rounded-md bg-surface-2" />
      <div className="grid gap-2 sm:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-11 rounded-md bg-surface-2" />
        ))}
      </div>
      <div className="h-40 rounded-md bg-surface-2" />
    </div>
  );
}

export default function GetAQuotePage() {
  const serviceOptions = serviceGroups.map((g) => ({
    group: g.label,
    items: getServicesByGroup(g.id).map((s) => ({ value: s.slug, label: s.navTitle ?? s.title })),
  }));

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Get a Quote", href: "/get-a-quote" }]}
        eyebrow="Get a quote"
        title="Tell us about your project."
        intro="The more we know, the more useful our reply. Share what you need and we will come back with questions, recommendations and a clear proposal."
      />
      <section className="py-16 lg:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
              <Suspense fallback={<FormSkeleton />}>
                <QuoteForm serviceOptions={serviceOptions} />
              </Suspense>
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="eyebrow text-subtle">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-xs text-fg">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-fg">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-10 rounded-xl border border-line p-6 text-sm leading-relaxed text-muted">
                <p>
                  Just have a question?{" "}
                  <Link href="/contact" className="text-fg underline underline-offset-4 hover:text-cyan">
                    Send us a message
                  </Link>{" "}
                  instead.
                </p>
                <p className="mt-3">
                  Your details are used only to respond to your enquiry. See our{" "}
                  <Link href="/privacy-policy" className="text-fg underline underline-offset-4 hover:text-cyan">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
