import Stripe from "stripe";

/**
 * Server-only Stripe client. The secret key is read from STRIPE_SECRET_KEY and never
 * hardcoded or exposed to the browser. Returns null when the key is not configured.
 */
let client = null;
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!client) client = new Stripe(key, { appInfo: { name: "weblogostudio.com" } });
  return client;
}

export const DEPOSIT = {
  amount: 5000,
  currency: "usd",
  productName: "Website Deposit: $99 One-Page Site",
};

const SESSION_RE = /^cs_(test|live)_[A-Za-z0-9]{10,200}$/;

/**
 * Looks up a Checkout Session and confirms it is a paid $50 deposit.
 * @returns {Promise<{ paid: true, session: import("stripe").Stripe.Checkout.Session } | { paid: false }>}
 */
export async function verifyDepositSession(sessionId) {
  if (typeof sessionId !== "string" || !SESSION_RE.test(sessionId)) return { paid: false };
  const stripe = getStripe();
  if (!stripe) return { paid: false };
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid =
      session.payment_status === "paid" &&
      session.amount_total === DEPOSIT.amount &&
      session.currency === DEPOSIT.currency &&
      session.metadata?.offer === "99-one-page";
    return paid ? { paid: true, session } : { paid: false };
  } catch (error) {
    console.error("[stripe] session lookup failed", error?.message ?? error);
    return { paid: false };
  }
}
