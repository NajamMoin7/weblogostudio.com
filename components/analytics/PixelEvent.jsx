"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/pixel";

/**
 * Fires one Meta Pixel standard event when mounted.
 * With `onceKey`, the event is sent at most once per browser for that key (localStorage),
 * so refreshing a page never counts it twice. `eventID` lets Meta deduplicate as well.
 */
export default function PixelEvent({ name, params, eventID, onceKey }) {
  useEffect(() => {
    if (onceKey) {
      try {
        const key = `wls:px:${onceKey}`;
        if (window.localStorage.getItem(key)) return;
        window.localStorage.setItem(key, String(Date.now()));
      } catch {
        // Storage blocked (private mode): eventID still lets Meta drop duplicates.
      }
    }
    trackEvent(name, params, eventID);
    // Fire once per mount; params are static for a given page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, eventID, onceKey]);
  return null;
}
