import { HONEYPOT_FIELD, MIN_FILL_MS } from "@/lib/forms";
import { deliverSubmission, rateLimited } from "@/lib/delivery";

const DEFAULT_MAX_BODY_BYTES = 32 * 1024;

const messages = {
  not_configured:
    "Our online form is not connected to an inbox yet, so your message was not sent. Please call us or try again later.",
  delivery_failed: "We could not send your message just now. Please try again in a few minutes.",
  rate_limited: "Too many submissions from this connection. Please wait a few minutes and try again.",
  bad_request: "Something went wrong reading your submission. Please refresh the page and try again.",
  too_large: "Your files are too large to send together. Please remove a photo or two and try again.",
};

function json(body, status) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/**
 * Shared POST handler: size limit, rate limit, honeypot, timing check, server-side
 * validation, optional extra verification, then delivery through lib/delivery.js.
 *
 * @param {Request} request
 * @param {{
 *   kind: string,
 *   validate: (body: object) => { data: object, errors: object, valid: boolean },
 *   build: (data: object, context?: object) => { subject, replyTo, fields, attachments?, payload? },
 *   maxBytes?: number,
 *   rateLimit?: { limit?: number, windowMs?: number },
 *   verify?: (data: object) => Promise<{ ok: true, context?: object } | { ok: false, status: number, code: string, message: string }>,
 * }} options
 */
export async function handleSubmission(request, { kind, validate, build, maxBytes = DEFAULT_MAX_BODY_BYTES, rateLimit, verify }) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > maxBytes) {
    const code = maxBytes > DEFAULT_MAX_BODY_BYTES ? "too_large" : "bad_request";
    return json({ ok: false, code, message: messages[code] }, 413);
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(`${kind}:${ip}`, rateLimit)) {
    return json({ ok: false, code: "rate_limited", message: messages.rate_limited }, 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, code: "bad_request", message: messages.bad_request }, 400);
  }

  // Spam checks: respond as if successful so bots learn nothing, but deliver nothing.
  const elapsed = Date.now() - Number(body.startedAt ?? 0);
  if (body[HONEYPOT_FIELD] || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return json({ ok: true }, 200);
  }

  const { data, errors, valid } = validate(body);
  if (!valid) return json({ ok: false, code: "invalid", errors }, 422);

  let context;
  if (verify) {
    const check = await verify(data);
    if (!check.ok) return json({ ok: false, code: check.code, message: check.message }, check.status);
    context = check.context;
  }

  const built = build(data, context);
  const result = await deliverSubmission({ kind, payload: data, ...built });
  if (result.ok) return json({ ok: true }, 200);

  const status = result.reason === "not_configured" ? 503 : 502;
  return json({ ok: false, code: result.reason, message: messages[result.reason] }, status);
}
