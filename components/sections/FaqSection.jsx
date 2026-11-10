import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import JsonLd from "@/components/ui/JsonLd";

/**
 * FAQ block with sticky heading and accessible accordion.
 * Pass `withSchema` on the one page per route that should emit FAQPage structured data.
 */
export default function FaqSection({
  faqs,
  title = "Questions we get before every project.",
  intro = "Straight answers. If yours is not here, call or send a message.",
  showAllLink = true,
  withSchema = false,
  tone = "mint",
}) {
  return (
    <section aria-labelledby="faq-title" className={`py-20 lg:py-28 ${tone === "mint" ? "theme-mint" : "border-t border-line"}`}>
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="faq-title" title={title} intro={intro} />
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              {showAllLink && (
                <Link href="/faq" className="underline decoration-line-strong decoration-2 underline-offset-[6px] hover:decoration-orange">
                  All FAQs
                </Link>
              )}
              <Link href="/contact" className="underline decoration-line-strong decoration-2 underline-offset-[6px] hover:decoration-orange">
                Ask a question
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={faqs} />
        </div>
      </div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
    </section>
  );
}
