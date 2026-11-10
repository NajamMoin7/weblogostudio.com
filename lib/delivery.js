/**
 * Server-side delivery for form submissions. Import from route handlers only.
 *
 * Configure ONE of the following in the deployment environment (never in client code):
 *
 *   Option A: email through Resend (https://resend.com)
 *     RESEND_API_KEY    = re_...
 *     FORMS_TO_EMAIL    = inbox that should receive enquiries
 *     FORMS_FROM_EMAIL  = verified sender, e.g. "Web Logo Studio <forms@yourdomain.com>"
 *
 *   Option B: any webhook (Zapier, Make, n8n, Slack workflow, a CRM endpoint...)
 *     FORMS_WEBHOOK_URL    = https://...
 *     FORMS_WEBHOOK_SECRET = optional shared secret, sent as the X-Webhook-Secret header
 *
 * With neither configured, submissions are NOT delivered and the API reports
 * `not_configured`, so the website never claims a message was sent when it was not.
 *
 * Attachments (the /99 intake's logo and photos) go out as Resend email attachments, or as
 * base64 strings in the webhook payload under `attachments`.
 */

export function deliveryConfigured() {
  const resend = process.env.RESEND_API_KEY && process.env.FORMS_TO_EMAIL && process.env.FORMS_FROM_EMAIL;
  return Boolean(resend || process.env.FORMS_WEBHOOK_URL);
}

function toText(fields) {
  return fields.map(([label, value]) => `${label}:\n${value || "(not provided)"}\n`).join("\n");
}

/**
 * @param {{
 *   kind: "contact" | "quote" | "intake",
 *   subject: string,
 *   replyTo: string,
 *   fields: [string, string][],
 *   payload: object,
 *   attachments?: { filename: string, content: string, contentType?: string }[],
 * }} submission  `content` is base64.
 * @returns {Promise<{ ok: true } | { ok: false, reason: "not_configured" | "delivery_failed" }>}
 */
export async function deliverSubmission({ kind, subject, replyTo, fields, payload, attachments = [] }) {
  const { RESEND_API_KEY, FORMS_TO_EMAIL, FORMS_FROM_EMAIL, FORMS_WEBHOOK_URL, FORMS_WEBHOOK_SECRET } = process.env;

  try {
    if (RESEND_API_KEY && FORMS_TO_EMAIL && FORMS_FROM_EMAIL) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FORMS_FROM_EMAIL,
          to: FORMS_TO_EMAIL.split(",").map((s) => s.trim()),
          reply_to: replyTo,
          subject,
          text: toText(fields),
          ...(attachments.length
            ? { attachments: attachments.map((a) => ({ filename: a.filename, content: a.content })) }
            : {}),
        }),
        signal: AbortSignal.timeout(20000),
      });
      if (!res.ok) console.error(`[forms] ${kind} Resend responded ${res.status}`);
      return res.ok ? { ok: true } : { ok: false, reason: "delivery_failed" };
    }

    if (FORMS_WEBHOOK_URL) {
      const res = await fetch(FORMS_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(FORMS_WEBHOOK_SECRET ? { "X-Webhook-Secret": FORMS_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify({ kind, subject, submittedAt: new Date().toISOString(), data: payload, attachments }),
        signal: AbortSignal.timeout(20000),
      });
      if (!res.ok) console.error(`[forms] ${kind} webhook responded ${res.status}`);
      return res.ok ? { ok: true } : { ok: false, reason: "delivery_failed" };
    }
  } catch (error) {
    console.error(`[forms] ${kind} delivery error`, error);
    return { ok: false, reason: "delivery_failed" };
  }

  return { ok: false, reason: "not_configured" };
}

/** Best-effort, per-instance rate limit. Use a shared store (e.g. Redis) for strict limits. */
const hits = new Map();
export function rateLimited(key, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}
