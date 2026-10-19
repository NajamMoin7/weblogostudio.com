import Link from "next/link";
import { cacheLife } from "next/cache";
import Logo from "@/components/ui/Logo";
import { mainNav, legalNav } from "@/data/navigation";
import { getServicesByGroup, serviceHref } from "@/data/services";
import { siteConfig } from "@/lib/site";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h2 className="eyebrow mb-5 text-subtle">{title}</h2>
      <ul className="space-y-3 text-[0.95rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="text-muted transition-colors duration-150 hover:text-fg">
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  const webServices = getServicesByGroup("web");
  const otherServices = [...getServicesByGroup("brand"), ...getServicesByGroup("growth")];
  const { email, phone } = siteConfig.contact;

  return (
    <footer className="grain border-t border-line bg-surface">
      <div className="container-page pb-10 pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="lockup" className="h-auto w-56" />
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              Websites, logos and brand identities for businesses that want to look credible, stand apart and grow
              online.
            </p>
            <Link
              href="/get-a-quote"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-fg underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-cyan"
            >
              Start a project
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <FooterColumn title="Studio">
              {mainNav.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
              <FooterLink href="/faq">FAQ</FooterLink>
            </FooterColumn>

            <FooterColumn title="Websites">
              {webServices.map((s) => (
                <FooterLink key={s.slug} href={serviceHref(s.slug)}>
                  {s.navTitle ?? s.title}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Brand & Growth">
              {otherServices.map((s) => (
                <FooterLink key={s.slug} href={serviceHref(s.slug)}>
                  {s.navTitle ?? s.title}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Contact">
              <FooterLink href="/contact">Contact form</FooterLink>
              <FooterLink href="/get-a-quote">Request a quote</FooterLink>
              {/* Shown only once genuine details are configured (NEXT_PUBLIC_CONTACT_EMAIL / _PHONE). */}
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="break-all text-muted transition-colors hover:text-fg">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-muted transition-colors hover:text-fg">
                    {phone}
                  </a>
                </li>
              )}
              {siteConfig.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="noopener noreferrer" target="_blank" className="text-muted hover:text-fg">
                    {s.label}
                  </a>
                </li>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-sm text-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
