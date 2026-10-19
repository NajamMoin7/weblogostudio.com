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
  eyebrow = "FAQ",
  title = "Questions, answered.",
  intro = "Straight answers to the questions we hear most. Cannot find yours? Ask us directly.",
  showAllLink = true,
  withSchema = false,
}) {
  return (
    <section aria-labelledby="faq-title" className="py-20 lg:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq-title" eyebrow={eyebrow} title={title} intro={intro} />
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
              {showAllLink && (
                <Link href="/faq" className="text-fg underline decoration-line-strong underline-offset-[6px] hover:decoration-cyan">
                  All FAQs
                </Link>
              )}
              <Link href="/contact" className="text-fg underline decoration-line-strong underline-offset-[6px] hover:decoration-cyan">
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
