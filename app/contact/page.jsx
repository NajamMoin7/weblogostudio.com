import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Web Logo Studio about website design, development, logo design or brand identity. Send us a message and we will reply personally.",
  path: "/contact",
});

const routes = [
  {
    title: "Planning a project?",
    text: "A quote request gives us everything we need to reply with a proposal.",
    href: "/get-a-quote",
    cta: "Request a quote",
  },
  {
    title: "Comparing options?",
    text: "See what each package includes before you get in touch.",
    href: "/pricing",
    cta: "View packages",
  },
  {
    title: "Have a quick question?",
    text: "Our FAQ covers timelines, revisions, ownership and more.",
    href: "/faq",
    cta: "Read the FAQ",
  },
];

export default function ContactPage() {
  const { email, phone } = siteConfig.contact;
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
        eyebrow="Contact"
        title="Let's talk about what you are building."
        intro="Questions, ideas or a project brief: send us a message and a member of the team will reply personally."
      />
      <section className="py-16 lg:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <h2 className="eyebrow text-subtle">Other ways to start</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {routes.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="group block py-6">
                    <span className="flex items-center justify-between gap-4 font-semibold text-fg">
                      {r.title}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                      />
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-muted">{r.text}</span>
                    <span className="mt-3 block text-sm font-medium text-cyan">{r.cta}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {(email || phone) && (
              <div className="mt-10">
                <h2 className="eyebrow text-subtle">Direct</h2>
                <ul className="mt-4 space-y-2 text-fg">
                  {email && (
                    <li>
                      <a href={`mailto:${email}`} className="break-all hover:text-cyan">
                        {email}
                      </a>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-cyan">
                        {phone}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </aside>
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
              <h2 className="font-display-wide mb-8 text-2xl font-semibold">Send a message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
