import { HONEYPOT_FIELD, MIN_FILL_MS } from "@/lib/forms";
import { deliverSubmission, rateLimited } from "@/lib/delivery";

const MAX_BODY_BYTES = 32 * 1024;

const messages = {
  not_configured:
    "Our online form is not connected to an inbox yet, so your message was not sent. Please try again later.",
  delivery_failed: "We could not send your message just now. Please try again in a few minutes.",
  rate_limited: "Too many submissions from this connection. Please wait a few minutes and try again.",
  bad_request: "Something went wrong reading your submission. Please refresh the page and try again.",
};

function json(body, status) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/**
 * Shared POST handler: size limit, rate limit, honeypot, timing check,
 * server-side validation, then delivery through lib/delivery.js.
 */
export async function handleSubmission(request, { kind, validate, build }) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ ok: false, code: "bad_request", message: messages.bad_request }, 413);

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(`${kind}:${ip}`)) {
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

  const result = await deliverSubmission({ kind, ...build(data), payload: data });
  if (result.ok) return json({ ok: true }, 200);

  const status = result.reason === "not_configured" ? 503 : 502;
  return json({ ok: false, code: result.reason, message: messages[result.reason] }, status);
}
