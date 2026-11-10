"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <h1 className="font-display-wide max-w-2xl text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[0.98]">
        We could not load this page.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        This is usually temporary. Try again, or head back to the home page.
      </p>
      <div className="mt-10 flex flex-col gap-3 xs:flex-row">
        <button type="button" onClick={() => reset()} className={buttonClasses()}>
          Try again
        </button>
        <Link href="/" className={buttonClasses({ variant: "secondary" })}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
