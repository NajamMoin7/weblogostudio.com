import { MessageCircle, MessageSquareText } from "lucide-react";
import SocialIcon from "@/components/ui/SocialIcon";
import { siteConfig } from "@/lib/site";

/**
 * Three ways to reach the studio about a paid order, each with the order reference already in
 * the message: Messenger (m.me), Instagram DM (ig.me) and a text message (sms:).
 * Messenger and SMS honour the prefilled text; Instagram opens the chat (it may ignore the text,
 * so the reference is also shown on screen).
 */
export default function ContactOrder({ reference }) {
  const { messengerPage, instagram } = siteConfig.messaging;
  const text = `Hi Web Logo Studio, this is about my $99 website order ${reference}.`;
  const t = encodeURIComponent(text);
  const links = [
    {
      label: "Messenger",
      href: `https://m.me/${messengerPage}?text=${t}`,
      icon: <MessageCircle className="size-[1.1rem]" aria-hidden="true" />,
      external: true,
    },
    {
      label: "Instagram DM",
      href: `https://ig.me/m/${instagram}?text=${t}`,
      icon: <SocialIcon name="Instagram" className="size-[1.1rem]" />,
      external: true,
    },
    {
      label: "Text us",
      // `?&body=` works on both iOS and Android.
      href: `${siteConfig.contact.phoneHref.replace(/^tel:/, "sms:")}?&body=${t}`,
      icon: <MessageSquareText className="size-[1.1rem]" aria-hidden="true" />,
    },
  ];

  return (
    <div className="mt-12 border-t border-line pt-8">
      <h2 className="font-display-wide text-2xl font-bold">Prefer to message us?</h2>
      <p className="mt-2 text-muted">
        Your order reference <strong className="font-semibold tabular-nums text-fg">{reference}</strong> is filled in for you.
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex h-12 items-center justify-center gap-2.5 rounded-md border-[1.5px] border-line-strong font-semibold text-fg transition-colors hover:border-fg hover:bg-fg hover:text-ink"
            >
              {l.icon}
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
