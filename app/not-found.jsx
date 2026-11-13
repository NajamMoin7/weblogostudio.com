import Link from "next/link";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import Flashlight from "@/components/motion/Flashlight";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

const suggestions = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Get a quote", href: "/get-a-quote" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <main id="main" className="theme-charcoal relative isolate min-h-screen overflow-hidden bg-[#070908]">
      <Flashlight />
      <div className="container-page relative border-b border-line py-5">
        <Logo variant="reverse" className="h-9 w-auto" />
      </div>
      <div className="container-page relative flex min-h-[78vh] flex-col justify-center py-20">
        <p className="eyebrow text-brand">Error 404</p>
        <h1 className="font-display-wide mt-4 max-w-3xl text-[clamp(2.4rem,6vw,4.8rem)] font-bold leading-[0.95]">
          We looked everywhere for this page.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          The link is broken or the page has moved. Try one of these, or call (707) 564-6678.
        </p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button href="/portfolio" variant="secondary" className="bg-[#070908]/60 backdrop-blur-sm">
            See the work
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
    </main>
  );
}
