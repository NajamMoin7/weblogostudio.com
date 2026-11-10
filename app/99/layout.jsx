import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site";

/**
 * Stand-alone layout for the Meta-ads offer. No site navigation: the logo (not a link) and
 * one action, pay. The slim footer carries only what the law and trust require.
 */
export default function OfferLayout({ children }) {
  return (
    <>
      <header className="border-b border-line bg-ink">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-8">
          <Logo link={false} priority className="h-9 w-auto sm:h-10" />
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            {siteConfig.legalName} · 9 Loretta Lane, Hicksville, NY 11801 ·{" "}
            <a href={siteConfig.contact.phoneHref} className="underline-offset-4 hover:text-fg hover:underline">
              {siteConfig.contact.phone}
            </a>
          </p>
          <p className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-fg">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-fg">
              Terms
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
