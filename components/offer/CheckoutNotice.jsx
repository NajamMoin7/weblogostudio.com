"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

const messages = {
  unavailable: "Online payment is not available right now. Please call (707) 564-6678 and we will take your order by phone.",
  error: "Stripe could not open checkout just now. Please try again in a moment, or call (707) 564-6678.",
  busy: "Too many attempts from this connection. Please wait a few minutes and try again.",
};

/**
 * Shows a message when /api/checkout sends the visitor back with ?checkout=<reason>.
 * Reads the URL on the client so /99 itself stays fully static (fast first paint).
 * Takes no space until there is something to say.
 */
export default function CheckoutNotice() {
  const [reason, setReason] = useState(null);
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("checkout");
    // Reading the URL is only possible after mount; this runs once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (r && messages[r]) setReason(r);
  }, []);
  if (!reason) return null;
  return (
    <div role="alert" className="mb-6 flex gap-3 rounded-md border border-danger/40 bg-danger/10 p-4 text-sm text-fg">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-danger" />
      <p>{messages[reason]}</p>
    </div>
  );
}
