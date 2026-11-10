"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import still from "@/public/brand/logo-3d-still.webp";

/**
 * Home banner: the studio's WL mark rendered in 3D, looping (the pieces part, turn and lock back
 * together). The still paints first (it is the same frame the loop starts and ends on), so the
 * banner is complete without the video. The video is attached only after the page has loaded and
 * the browser is idle, fades in over the still once it is actually playing, and pauses whenever
 * it is off screen. Reduced motion and data-saver keep the still.
 * The tile colour matches the render's background exactly (#F6F6F1).
 */
export default function HeroLogo3D() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (navigator.connection?.saveData) return;
    const start = () => setLoad(true);
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 300));
    const run = () => idle(start, { timeout: 2500 });
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });
    return () => window.removeEventListener("load", run);
  }, []);

  useEffect(() => {
    if (!load || !ref.current) return;
    const io = new IntersectionObserver(([entry]) => {
      const v = videoRef.current;
      if (!v) return;
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [load]);

  return (
    <figure ref={ref} className="relative mx-auto w-full max-w-[34rem] lg:col-span-5 lg:max-w-none">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f6f6f1] shadow-lift">
        <Image
          src={still}
          alt="The Web Logo Studio WL mark in 3D: two green strokes, an orange cut and a charcoal base"
          priority
          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 34rem, 92vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {load && (
          <video
            ref={videoRef}
            aria-hidden="true"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            onPlaying={() => setPlaying(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
          >
            <source src="/brand/logo-3d-loop.webm" type="video/webm" />
            <source src="/brand/logo-3d-loop.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </figure>
  );
}
