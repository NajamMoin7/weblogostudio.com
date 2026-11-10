import { validateIntake, INTAKE_LIMITS } from "@/lib/forms";
import { handleSubmission } from "@/lib/submission";
import { verifyDepositSession } from "@/lib/stripe";
import { ORIGINAL_STYLE, orderRef } from "@/data/offer99";

/**
 * Intake for paid $99 site orders (/99/start). Reuses the contact-form pipeline
 * (lib/submission.js + lib/delivery.js), adds the Stripe session ID, and only delivers
 * when Stripe confirms that session as a paid deposit.
 */
export async function POST(request) {
  return handleSubmission(request, {
    kind: "intake",
    validate: validateIntake,
    maxBytes: Math.ceil(INTAKE_LIMITS.maxTotalBytes * 1.4) + 64 * 1024,
    rateLimit: { limit: 6, windowMs: 10 * 60 * 1000 },
    verify: async (d) => {
      const result = await verifyDepositSession(d.sessionId);
      if (!result.paid) {
        return {
          ok: false,
          status: 402,
          code: "unpaid",
          message: "We could not confirm the payment for this order. Please call (707) 564-6678 and we will sort it out.",
        };
      }
      const s = result.session;
      return {
        ok: true,
        context: {
          stripeEmail: s.customer_details?.email ?? "",
          stripeName: s.customer_details?.name ?? "",
          amount: `$${(s.amount_total / 100).toFixed(2)} ${s.currency.toUpperCase()}`,
          style: s.metadata?.style ?? "",
          reference: orderRef(s.id),
        },
      };
    },
    build: (d, ctx) => {
      const files = [
        ...(d.logo ? [{ ...d.logo, name: `logo-${d.logo.name}` }] : []),
        ...d.photos.map((p, i) => ({ ...p, name: `photo-${i + 1}-${p.name}` })),
      ];
      return {
        subject: `Paid $99 site: ${d.businessName} (${d.businessType})`,
        replyTo: d.email,
        fields: [
          ["Order reference", ctx.reference],
          ["Stripe session ID", d.sessionId],
          [
            "Style picked",
            ctx.style === ORIGINAL_STYLE ? "Original design (designer's own direction)" : ctx.style || "None (no style chosen)",
          ],
          ["Deposit paid", ctx.amount],
          ["Stripe customer", [ctx.stripeName, ctx.stripeEmail].filter(Boolean).join(" · ")],
          ["Business name", d.businessName],
          ["Business type", d.businessType],
          ["Contact name", d.contactName],
          ["Phone", d.phone],
          ["Email", d.email],
          ["Address", d.address],
          ["Business hours", d.hours],
          ["Notes", d.notes],
          ["Files attached", files.length ? files.map((f) => f.name).join(", ") : "None"],
        ],
        attachments: files.map((f) => ({ filename: f.name, content: f.data, contentType: f.type })),
        // Webhook payload without the base64 file bodies (they travel once, in `attachments`).
        payload: {
          ...d,
          logo: d.logo ? { name: d.logo.name, type: d.logo.type, bytes: d.logo.bytes } : null,
          photos: d.photos.map((p) => ({ name: p.name, type: p.type, bytes: p.bytes })),
          stripe: ctx,
        },
      };
    },
  });
}
