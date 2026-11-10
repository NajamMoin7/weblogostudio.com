import { DEPOSIT, getStripe } from "@/lib/stripe";
import { rateLimited } from "@/lib/delivery";
import { siteConfig } from "@/lib/site";

/**
 * The origin to send the buyer back to. Hosts like Netlify hand the function an internal
 * deploy URL in `request.url`, so prefer the browser's Origin header, but only when it is
 * this site, a local dev server or a Netlify/Vercel preview; anything else gets the canonical URL.
 */
function returnOrigin(request) {
  const header = request.headers.get("origin");
  if (header) {
    try {
      const { origin, hostname } = new URL(header);
      const canonical = new URL(siteConfig.url).hostname.replace(/^www\./, "");
      if (
        hostname === canonical ||
        hostname === `www.${canonical}` ||
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname.endsWith(".netlify.app") ||
        hostname.endsWith(".vercel.app")
      ) {
        return origin;
      }
    } catch {
      // Malformed header: fall through to the canonical URL.
    }
  }
  return siteConfig.url;
}

/**
 * Creates a Stripe Checkout Session for the $50 deposit on the $99 one-page site and
 * redirects the browser to Stripe (303). Works as a plain HTML form POST, so the pay button
 * still works if JavaScript fails. Keys come only from STRIPE_SECRET_KEY.
 */
export async function POST(request) {
  const origin = returnOrigin(request);
  const back = (reason) => Response.redirect(`${origin}/99?checkout=${reason}`, 303);

  const stripe = getStripe();
  if (!stripe) {
    console.error("[checkout] STRIPE_SECRET_KEY is not set");
    return back("unavailable");
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(`checkout:${ip}`, { limit: 10, windowMs: 10 * 60 * 1000 })) return back("busy");

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: DEPOSIT.currency,
            unit_amount: DEPOSIT.amount,
            product_data: {
              name: DEPOSIT.productName,
              description: "Deposit toward a $99 mobile-ready one-page website. Remaining $49 due on approval.",
            },
          },
        },
      ],
      metadata: { offer: "99-one-page" },
      payment_intent_data: { description: DEPOSIT.productName, metadata: { offer: "99-one-page" } },
      phone_number_collection: { enabled: true },
      success_url: `${origin}/99/start?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/99`,
    });
    return Response.redirect(session.url, 303);
  } catch (error) {
    console.error("[checkout] session create failed", error?.message ?? error);
    return back("error");
  }
}
