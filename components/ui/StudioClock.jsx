"use client";

import { useEffect, useState } from "react";
import { studioStatus } from "@/lib/studio-hours";

/**
 * Live Eastern-time studio clock, locked to the header like a timecode. It states whether the
 * 2-hour concept clock is running right now. Renders a fixed-width placeholder on the server
 * and before mount, so nothing shifts when the time appears.
 */
export default function StudioClock({ className = "", tone = "default" }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const tick = () => setStatus(studioStatus());
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);

  const dot = status?.open ? "bg-success" : "bg-subtle";
  return (
    <p className={`flex min-w-[15.5rem] items-center gap-2 text-[0.78rem] tabular-nums ${tone === "quiet" ? "text-subtle" : "text-muted"} ${className}`}>
      <span aria-hidden="true" className={`relative inline-flex size-2 rounded-full ${dot}`}>
        {status?.open && <span className="absolute inset-0 animate-ping rounded-full bg-success/60 motion-reduce:hidden" />}
      </span>
      {status ? (
        status.open ? (
          <span>
            <span className="font-semibold text-fg">Studio open</span> · {status.time} ET · 2-hr concept clock running
          </span>
        ) : (
          <span>
            <span className="font-semibold text-fg">Studio closed</span> · {status.time} ET · clock starts {status.opensLabel}
          </span>
        )
      ) : (
        <span>Studio hours Mon–Fri, 9 AM–6 PM ET</span>
      )}
    </p>
  );
}
