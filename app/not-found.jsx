import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

const suggestions = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="grain relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[12%] hidden w-40 md:block">
        <span className="absolute -top-10 left-0 h-[140%] w-8 -skew-x-[24deg] bg-forest/90" />
        <span className="brand-gradient absolute -top-10 left-14 h-[140%] w-8 -skew-x-[24deg]" />
      </div>
      <div className="container-page relative flex min-h-[72vh] flex-col justify-center py-24">
        <p className="eyebrow text-muted">Error 404</p>
        <h1 className="font-display-wide mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.8rem)] font-bold leading-[1]">
          This page took a <span className="text-gradient">wrong turn.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          The page you are looking for does not exist or has moved. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <Button href="/" arrow>
            Back to Home
          </Button>
          <Button href="/get-a-quote" variant="secondary">
            Get a Quote
          </Button>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="text-muted underline-offset-4 hover:text-fg hover:underline">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
