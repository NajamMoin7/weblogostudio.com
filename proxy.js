import { NextResponse } from "next/server";
import { services } from "@/data/services";
import { work } from "@/data/work";

/**
 * Returns a genuine 404 status for unknown service and portfolio slugs.
 *
 * Known slugs are prerendered. Without this check, an unknown slug would stream the
 * prerendered shell first and then render not-found with a 200 status ("soft 404").
 * Rewriting to an unmatched internal path makes Next.js render app/not-found.jsx
 * with a 404 status, while the visitor's URL stays the same.
 * The check is a Set lookup against local data: no fetching, so it stays fast.
 */
const known = {
  services: new Set(services.map((s) => s.slug)),
  portfolio: new Set(work.map((p) => p.slug)),
};

export function proxy(request) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  if (slug && known[section] && !known[section].has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/_unknown-route", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/services/:slug", "/portfolio/:slug"],
};
