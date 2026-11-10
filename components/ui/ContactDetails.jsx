import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { addressLines, mapsUrl, siteConfig } from "@/lib/site";

function Row({ icon: Icon, label, children }) {
  return (
    <li className="flex gap-4">
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-lg border border-line-strong text-fg"
      >
        <Icon className="size-[1.05rem]" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-subtle">{label}</p>
        <div className="mt-1 text-[0.98rem] leading-snug text-fg">{children}</div>
      </div>
    </li>
  );
}

const linkCls = "underline-offset-4 decoration-1 transition-colors hover:text-cyan hover:underline";

/**
 * Phone, studio address, email and hours as one consistent list: same icon tile, same label,
 * same body size. Used by the footer and the contact page.
 */
export default function ContactDetails({ className = "", showName = false }) {
  const { email, phone, phoneHref } = siteConfig.contact;
  return (
    <ul className={`space-y-5 ${className}`}>
      <Row icon={Phone} label="Call">
        <a href={phoneHref} className={`font-semibold tabular-nums ${linkCls}`}>
          {phone}
        </a>
      </Row>
      <Row icon={MapPin} label="Studio">
        <address className="not-italic">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
            {showName && <span className="block font-semibold">{siteConfig.legalName}</span>}
            {addressLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </a>
        </address>
      </Row>
      {email && (
        <Row icon={Mail} label="Email">
          <a href={`mailto:${email}`} className={`break-all ${linkCls}`}>
            {email}
          </a>
        </Row>
      )}
      <Row icon={Clock} label="Hours">
        <span className="block">Orders 24/7</span>
        <span className="block text-muted">Concepts Mon–Fri, 9am–6pm ET</span>
      </Row>
    </ul>
  );
}
