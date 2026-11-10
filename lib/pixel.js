/**
 * Meta Pixel helpers (browser only). Calls made before the Pixel snippet has run are queued
 * on window.__wlsPx and replayed by the snippet right after `fbq('init')`, so an event fired
 * during hydration is never lost or sent without a Pixel ID.
 */
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

export function fbq(...args) {
  if (typeof window === "undefined" || !PIXEL_ID) return;
  if (typeof window.fbq === "function" && window.__wlsPxReady) {
    window.fbq(...args);
  } else {
    (window.__wlsPx ||= []).push(args);
  }
}

/** Standard event, with an optional eventID for deduplication. */
export function trackEvent(name, params = {}, eventID) {
  fbq("track", name, params, eventID ? { eventID } : undefined);
}
