"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { PIXEL_ID, trackEvent } from "@/lib/pixel";

/**
 * Site-wide Meta Pixel. Loads with next/script (lazyOnload: during browser idle after the
 * page has loaded), so its ~110 KB script never competes with first paint or hydration on
 * paid mobile traffic. Events fired before it loads are queued (lib/pixel.js) and replayed.
 * Sends PageView on the first load (inside the snippet) and again on every client-side
 * navigation. Renders nothing while NEXT_PUBLIC_META_PIXEL_ID is unset.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (!PIXEL_ID) return;
    if (first.current) {
      first.current = false;
      return;
    }
    trackEvent("PageView");
  }, [pathname]);

  if (!PIXEL_ID) return null;

  const id = JSON.stringify(PIXEL_ID);
  return (
    <>
      <Script id="meta-pixel" strategy="lazyOnload">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init',${id});fbq('track','PageView');window.__wlsPxReady=true;
(window.__wlsPx||[]).forEach(function(a){fbq.apply(null,a)});window.__wlsPx=[];`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${encodeURIComponent(PIXEL_ID)}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
