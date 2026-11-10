import { Suspense } from "react";
import { redirect } from "next/navigation";
import IntakeForm from "@/components/forms/IntakeForm";
import PixelEvent from "@/components/analytics/PixelEvent";
import Spinner from "@/components/ui/Spinner";
import { verifyDepositSession } from "@/lib/stripe";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: { absolute: "Payment received · Send your details | Web Logo Studio" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

function Verifying() {
  return (
    <div className="flex min-h-[40vh] items-center gap-3 text-lg text-muted" role="status">
      <Spinner size={22} /> Confirming your payment with Stripe…
    </div>
  );
}

/**
 * Server-side check of the Stripe Checkout Session. Unpaid, unknown or missing sessions go
 * back to /99. Nothing claims payment, and no Purchase event fires, until Stripe confirms
 * payment_status "paid" for this exact deposit.
 */
async function PaidIntake({ searchParams }) {
  const { session_id: sessionId } = await searchParams;
  const result = await verifyDepositSession(typeof sessionId === "string" ? sessionId : "");
  if (!result.paid) redirect("/99");

  const { session } = result;
  const defaults = {
    name: session.customer_details?.name ?? "",
    email: session.customer_details?.email ?? "",
    phone: session.customer_details?.phone ?? "",
  };

  return (
    <>
      {/* Once per Stripe session: eventID lets Meta deduplicate, and a local guard ignores refreshes. */}
      <PixelEvent
        name="Purchase"
        params={{ value: 50, currency: "USD", content_name: "Website Deposit: $99 One-Page Site" }}
        eventID={session.id}
        onceKey={`purchase:${session.id}`}
      />
      <h1 className="font-condensed text-[clamp(2.6rem,9vw,4.6rem)] font-bold leading-[0.92]">
        Payment received <span aria-hidden="true">✅</span>
      </h1>
      <p className="mt-5 max-w-2xl text-[clamp(1.1rem,2.4vw,1.3rem)] leading-snug text-fg">
        Send your details below and your first concept arrives within 2 hours (business hours ET).
      </p>
      <p className="caption mt-3">
        Mon–Fri, 9am–6pm ET. Stuck? Call{" "}
        <a href={siteConfig.contact.phoneHref} className="font-semibold text-fg underline underline-offset-2">
          {siteConfig.contact.phone}
        </a>
        .
      </p>
      <div className="mt-10">
        <IntakeForm sessionId={session.id} defaults={defaults} />
      </div>
    </>
  );
}

export default function StartPage({ searchParams }) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-8 sm:pt-12">
        <Suspense fallback={<Verifying />}>
          <PaidIntake searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
