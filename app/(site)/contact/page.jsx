import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { addressLines, mapsUrl, pageMetadata, siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Call Web Logo Studio on (707) 564-6678, visit us at 9 Loretta Lane, Hicksville, NY 11801, or send a message about your website, logo or brand project.",
  path: "/contact",
});

const routes = [
  {
    title: "Planning a project?",
    text: "A quote request gives us what we need to send a written scope, timeline and price.",
    href: "/get-a-quote",
    cta: "Request a quote",
  },
  {
    title: "Have a quick question?",
    text: "The FAQ covers timelines, revisions, file ownership and maintenance.",
    href: "/faq",
    cta: "Read the FAQ",
  },
];

export default function ContactPage() {
  const { email, phone, phoneHref } = siteConfig.contact;
  const mapQuery = encodeURIComponent(addressLines.join(", "));
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
        title="Call, write or come by the studio."
        intro="Questions, a brief or a half-formed idea: the person who replies is the person who will work on it."
      />
      <section className="py-14 lg:py-20">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="space-y-8">
              <div>
                <h2 className="eyebrow text-subtle">Phone</h2>
                <a
                  href={phoneHref}
                  className="font-display-wide mt-3 flex items-center gap-3 text-[2.2rem] font-bold leading-none transition-colors hover:text-cyan"
                >
                  <Phone aria-hidden="true" className="size-6 shrink-0" />
                  {phone}
                </a>
                <p className="caption mt-2">Mon–Fri, 9 AM–6 PM Eastern</p>
              </div>
              <div>
                <h2 className="eyebrow text-subtle">Studio</h2>
                <address className="mt-3 not-italic">
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex gap-3 text-lg leading-snug">
                    <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0" />
                    <span>
                      <span className="block font-semibold">{siteConfig.legalName}</span>
                      {addressLines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                      <span className="mt-1 block text-sm font-semibold text-cyan underline-offset-4 group-hover:underline">
                        Open in Google Maps
                      </span>
                    </span>
                  </a>
                </address>
              </div>
              {email && (
                <div>
                  <h2 className="eyebrow text-subtle">Email</h2>
                  <a href={`mailto:${email}`} className="mt-3 block break-all text-lg hover:text-cyan">
                    {email}
                  </a>
                </div>
              )}
              <ul className="border-t border-line">
                {routes.map((r) => (
                  <li key={r.href} className="border-b border-line">
                    <Link href={r.href} className="group block py-5">
                      <span className="font-semibold text-fg">{r.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">{r.text}</span>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan">
                        {r.cta} <ArrowRight aria-hidden="true" className="arrow-nudge size-3.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-line-strong bg-surface p-6 sm:p-10">
              <h2 className="font-display-wide mb-8 text-[2rem] font-bold leading-none">Send a message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <section aria-label="Map" className="border-t border-line">
        <iframe
          title={`Map: ${addressLines.join(", ")}`}
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[360px] w-full border-0 grayscale-[35%]"
        />
      </section>
    </>
  );
}
