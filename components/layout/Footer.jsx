import Link from "next/link";
import { cacheLife } from "next/cache";
import Logo from "@/components/ui/Logo";
import ContactDetails from "@/components/ui/ContactDetails";
import SocialIcon from "@/components/ui/SocialIcon";
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
      <h2 className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-subtle">{title}</h2>
      <ul className="space-y-2.5 text-[0.95rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="group/fl relative inline-block text-muted transition-colors duration-150 hover:text-fg"
      >
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-orange transition-transform duration-300 ease-out-quint group-hover/fl:scale-x-100"
        />
      </Link>
    </li>
  );
}

export default function Footer() {
  const webServices = getServicesByGroup("web");
  const otherServices = [...getServicesByGroup("brand"), ...getServicesByGroup("growth")];

  return (
    <footer className="theme-charcoal">
      <div className="container-page pb-10 pt-16 lg:pt-20">
        <div className="flex flex-col gap-8 border-b border-line pb-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <Logo variant="reverse" className="h-9 w-auto lg:h-10" />
            <p className="mt-5 leading-relaxed text-muted">
              Websites, logos and brand systems, designed and built in one studio in Hicksville, New York.
            </p>
          </div>
          <ul className="flex gap-3" aria-label="Social media">
            {siteConfig.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label}: ${s.handle}`}
                  className="grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-orange hover:bg-orange hover:text-charcoal"
                >
                  <SocialIcon name={s.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-12 pt-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FooterColumn title="Contact">
              <li className="list-none">
                <ContactDetails className="mt-1" />
              </li>
            </FooterColumn>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
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
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-sm text-subtle lg:flex-row lg:items-center lg:justify-between">
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
