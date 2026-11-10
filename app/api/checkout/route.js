import { DEPOSIT, getStripe } from "@/lib/stripe";
import { rateLimited } from "@/lib/delivery";
import { siteConfig } from "@/lib/site";
import { pricing99, styleSlugs99 } from "@/data/offer99";

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
 * Creates a Stripe Checkout Session for the deposit on the $99 one-page site and redirects the
 * browser to Stripe (303). Works as a plain HTML form POST, so the pay button still works if
 * JavaScript fails. Keys come only from STRIPE_SECRET_KEY.
 *
 * Optional form field `style`: a portfolio slug from the "Pick a style" section, accepted only if
 * it is in the whitelist (styleSlugs99) and stored as metadata.style.
 * The card is saved (customer + setup_future_usage "off_session") so the balance can be charged
 * after the customer approves their design; the Terms explain this consent.
 */
export async function POST(request) {
  const origin = returnOrigin(request);
  const back = (reason) => Response.redirect(`${origin}/99?checkout=${reason}`, 303);

  const stripe = getStripe();
  if (!stripe) {
    console.error("[checkout] STRIPE_SECRET_KEY is not set");
    return back("unavailable");
  }

  let style = null;
  try {
    const form = await request.formData();
    const value = form.get("style");
    if (typeof value === "string" && styleSlugs99.includes(value)) style = value;
  } catch {
    // No form body (or not form-encoded): checkout without a style.
  }
  const metadata = { offer: "99-one-page", ...(style ? { style } : {}) };

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
              description: `Deposit toward a $${pricing99.total} one-page website. Remaining $${pricing99.balance} due when you approve your design.`,
            },
          },
        },
      ],
      metadata,
      customer_creation: "always",
      payment_intent_data: {
        description: DEPOSIT.productName,
        metadata,
        setup_future_usage: "off_session",
      },
      custom_text: {
        submit: {
          message: `$${pricing99.deposit} today. The remaining $${pricing99.balance} is charged only after you approve your design.`,
        },
      },
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
