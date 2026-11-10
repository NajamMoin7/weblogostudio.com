import Link from "next/link";
import { cacheLife } from "next/cache";
import Logo from "@/components/ui/Logo";
import { mainNav, legalNav } from "@/data/navigation";
import { getServicesByGroup, serviceHref } from "@/data/services";
import { addressLines, mapsUrl, siteConfig } from "@/lib/site";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h2 className="eyebrow mb-5 text-subtle">{title}</h2>
      <ul className="space-y-2.5 text-[0.95rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, external }) {
  return (
    <li>
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="text-muted underline-offset-4 transition-colors duration-150 hover:text-fg hover:underline"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  const webServices = getServicesByGroup("web");
  const otherServices = [...getServicesByGroup("brand"), ...getServicesByGroup("growth")];
  const { email, phone, phoneHref } = siteConfig.contact;

  return (
    <footer className="theme-forest">
      <div className="container-page pb-10 pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="lockupWhite" className="h-auto w-48 sm:w-56" />
            <address className="mt-8 not-italic leading-relaxed text-muted">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-fg">
                {addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </a>
              <a href={phoneHref} className="font-display-wide mt-4 block text-3xl font-bold text-fg transition-colors hover:text-cyan">
                {phone}
              </a>
              {email && (
                <a href={`mailto:${email}`} className="mt-2 block break-all transition-colors hover:text-fg">
                  {email}
                </a>
              )}
            </address>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <FooterColumn title="Studio">
              <FooterLink href="/">Home</FooterLink>
              {mainNav.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
              <FooterLink href="/get-a-quote">Get a quote</FooterLink>
            </FooterColumn>

            <FooterColumn title="Websites">
              {webServices.map((s) => (
                <FooterLink key={s.slug} href={serviceHref(s.slug)}>
                  {s.navTitle ?? s.title}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Brand & growth">
              {otherServices.map((s) => (
                <FooterLink key={s.slug} href={serviceHref(s.slug)}>
                  {s.navTitle ?? s.title}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Follow">
              {siteConfig.socials.map((s) => (
                <FooterLink key={s.href} href={s.href} external>
                  {s.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-sm text-subtle lg:flex-row lg:items-center lg:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.legalName} ·{" "}
            <a
              href={siteConfig.manager.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
            >
              Managed by {siteConfig.manager.name}
            </a>
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
