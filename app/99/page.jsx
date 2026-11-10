import { Check, Minus, Phone, ShieldCheck } from "lucide-react";
import PayButton from "@/components/offer/PayButton";
import PhoneMockup from "@/components/offer/PhoneMockup";
import CheckoutNotice from "@/components/offer/CheckoutNotice";
import Reviews99 from "@/components/offer/Reviews99";
import Accordion from "@/components/ui/Accordion";
import PixelEvent from "@/components/analytics/PixelEvent";
import { domainHosting99, exampleSites, faqs99, heroSite, included99, pricing99, steps99 } from "@/data/offer99";
import { getWork } from "@/data/work";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: { absolute: "$99 Business Website · First Concept in 2 Hours | Web Logo Studio" },
  description: `Mobile-ready one-page website with call button, map, hours & reviews. Start for $${pricing99.deposit}, first concept in 2 hours, full $${pricing99.deposit} refund within 24 hours if you don't love it.`,
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

function examples(list) {
  return list
    .map((e) => {
      const w = getWork(e.slug);
      if (!w) return null;
      const img = w.images.find((i) => i.role === "full") ?? w.thumbnail;
      return { ...e, title: w.displayTitle, img };
    })
    .filter(Boolean);
}

const wrap = "mx-auto max-w-6xl px-4 sm:px-8";

export default function OfferPage() {
  const sites = examples(exampleSites);
  const [lead] = examples([heroSite]);
  const { phone, phoneHref } = siteConfig.contact;

  return (
    <>
      <PixelEvent
        name="ViewContent"
        params={{ content_name: "$99 One-Page Website", content_category: "Website", value: pricing99.deposit, currency: "USD" }}
      />

      {/* 1-3: headline, sub, pay. Static at first paint: the headline is the LCP element. */}
      <section aria-labelledby="offer-title" className="border-b border-line">
        <div className={`${wrap} grid gap-10 pb-12 pt-8 sm:pt-12 lg:grid-cols-12 lg:items-center lg:pb-16`}>
          <div className="lg:col-span-7">
            <CheckoutNotice />
            {/* One text block (inline lines + <br>) so the whole headline is the LCP element. */}
            <h1 id="offer-title" className="font-condensed text-[clamp(2rem,6vw,3.4rem)] font-bold leading-[1] text-fg">
              Your Business Website:
              <br />
              <span className="text-[2.75em] leading-[0.9] tracking-[-0.03em] text-brand">$99.</span>
              <br />
              Start for ${pricing99.deposit}.
              <br />
              First Concept in 2&nbsp;Hours.
            </h1>
            <p className="mt-6 max-w-[30ch] text-[clamp(1.15rem,2.4vw,1.4rem)] leading-snug text-muted">
              Mobile-ready one-page website with call button, map, hours &amp; reviews.
            </p>
            <PayButton className="mt-8" id="pay-top" />
          </div>
          {lead && (
            <div className="hidden lg:col-span-5 lg:block">
              <PhoneMockup src={lead.img.src} width={lead.img.width} height={lead.img.height} title={lead.title} industry={lead.industry} />
            </div>
          )}
        </div>
      </section>

      {/* 4: pick a style. Six real sites we built; the visitor starts THEIR site in that style. */}
      <section aria-labelledby="examples-title" className="border-b border-line py-14 lg:py-20">
        <div className={wrap}>
          <h2 id="examples-title" className="font-display-wide text-[clamp(2rem,5vw,3.2rem)] font-bold leading-none">
            Pick a style.
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            These are sites we designed for other businesses. Like one? Tap <strong className="text-fg">Build mine like this</strong>{" "}
            and we design <em>your</em> site in that style, with your own name, photos, services and colours. It&rsquo;s built new
            for you; nobody else&rsquo;s site or content is reused.{" "}
            <span className="hidden sm:inline">Hover a phone to scroll the page.</span>
            <span className="sm:hidden">Swipe through, and keep scrolling to see each page move.</span>
          </p>
        </div>
        <ul className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:mx-auto sm:grid sm:max-w-6xl sm:grid-cols-3 sm:gap-x-8 sm:gap-y-12 sm:overflow-visible sm:px-8 lg:grid-cols-6 lg:gap-x-5">
          {sites.map((s) => (
            <li key={s.slug} className="flex w-[62%] shrink-0 snap-center flex-col sm:w-auto">
              <PhoneMockup
                src={s.img.src}
                width={s.img.width}
                height={s.img.height}
                title={s.title}
                industry={s.industry}
                sizes="(min-width: 1024px) 180px, (min-width: 640px) 30vw, 62vw"
              />
              <PayButton
                variant="compact"
                style={s.slug}
                label="Build mine like this"
                ariaLabel={`Build my site in the style of ${s.title} (${s.industry}). Start for $${pricing99.deposit}`}
                className="mx-auto mt-4 w-full max-w-[16rem]"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* 5: how it works, with time stamps */}
      <section aria-labelledby="how-title" className="bg-surface py-14 lg:py-20">
        <div className={wrap}>
          <h2 id="how-title" className="font-display-wide text-[clamp(2rem,5vw,3.2rem)] font-bold leading-none">
            How it works
          </h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps99.map((s, i) => (
              <li key={s.title} className="flex flex-col bg-surface p-6">
                <span className="flex items-baseline justify-between">
                  <span className="grid size-9 place-items-center rounded-full bg-fg text-sm font-bold text-ink">{i + 1}</span>
                  <span className="font-condensed text-2xl font-bold tabular-nums text-brand">{s.stamp}</span>
                </span>
                <h3 className="font-display-wide mt-5 text-[1.5rem] font-bold leading-tight">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6-7: guarantee and small print */}
      <section aria-labelledby="guarantee-title" className="theme-forest">
        <div className={`${wrap} py-14 lg:py-20`}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <ShieldCheck aria-hidden="true" className="size-14 shrink-0 text-cyan sm:size-20" strokeWidth={1.5} />
            <h2 id="guarantee-title" className="font-condensed text-[clamp(2.1rem,5.6vw,3.9rem)] font-bold leading-[0.98]">
              Don&rsquo;t love your first concept? Tell us within 24&nbsp;hours for a full ${pricing99.deposit} refund.
            </h2>
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg">
            Your preview is hosted on our site and held for 7 days. Your site goes live within 1 hour of approval.
          </p>
          <p className="mt-6 max-w-2xl border-t border-line pt-5 text-sm leading-relaxed text-muted">
            2-hour concept applies to info received Mon–Fri, 9am–6pm ET. The clock starts once we receive your info.
          </p>
        </div>
      </section>

      {/* 8: what's included */}
      <section aria-labelledby="included-title" className="py-14 lg:py-20">
        <div className={`${wrap} grid gap-10 lg:grid-cols-12`}>
          <h2 id="included-title" className="font-display-wide text-[clamp(2rem,5vw,3.2rem)] font-bold leading-none lg:col-span-4">
            What&rsquo;s included
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            <ul className="border-t-2 border-fg">
              {included99.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-line py-3.5 text-lg">
                  <Check aria-hidden="true" className="size-5 shrink-0 text-success" strokeWidth={2.4} />
                  {item}
                </li>
              ))}
            </ul>
            <div>
              <ul className="border-t-2 border-fg">
                {[
                  ["Domain name", domainHosting99.domain],
                  ["Hosting", domainHosting99.hosting],
                ].map(([item, price]) => (
                  <li key={item} className="flex items-center gap-3 border-b border-line py-3.5 text-lg text-muted">
                    <Minus aria-hidden="true" className="size-5 shrink-0" />
                    <span className="flex-1">{item}</span>
                    <span className="font-semibold tabular-nums text-fg">{price ?? "Priced separately"}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 leading-relaxed text-muted">
                Domain and hosting aren&rsquo;t part of the ${pricing99.total}. Add them from us, or connect a domain you already own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9: three FAQs */}
      <section aria-labelledby="faq99-title" className="border-t border-line py-14 lg:py-20">
        <div className={`${wrap} grid gap-10 lg:grid-cols-12`}>
          <h2 id="faq99-title" className="font-display-wide text-[clamp(2rem,5vw,3.2rem)] font-bold leading-none lg:col-span-4">
            Questions
          </h2>
          <div className="lg:col-span-8">
            <Accordion items={faqs99} defaultOpen={0} />
          </div>
        </div>
      </section>

      {/* 11: real reviews only; renders nothing until data/offer99.js has entries */}
      <Reviews99 />

      {/* 10: repeat the action */}
      <section aria-labelledby="final-title" className="border-t border-line bg-surface">
        <div className={`${wrap} py-14 text-center lg:py-20`}>
          <h2 id="final-title" className="font-condensed text-[clamp(2.4rem,7vw,4.4rem)] font-bold leading-[0.95]">
            See your first concept in 2&nbsp;hours.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            ${pricing99.deposit} now. ${pricing99.balance} when you approve. Full ${pricing99.deposit} refund within 24&nbsp;hours if you
            don&rsquo;t love the first concept.
          </p>
          <div className="mt-8 flex justify-center">
            <PayButton id="pay-bottom" className="w-full sm:w-auto" />
          </div>
          <a href={phoneHref} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-fg underline decoration-line-strong underline-offset-4 hover:decoration-orange">
            <Phone aria-hidden="true" className="size-4" /> Questions? Call {phone}
          </a>
        </div>
      </section>
    </>
  );
}
