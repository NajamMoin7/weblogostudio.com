import { ArrowRight, MessageCircle, MessageSquareText } from "lucide-react";
import SocialIcon from "@/components/ui/SocialIcon";
import { siteConfig } from "@/lib/site";

/**
 * The main next step after paying: start a conversation with the studio, with the order
 * reference (and picked style) already in the message.
 *
 * - Primary: a text message (sms:). US small-business owners answer texts fastest.
 * - Backup: Messenger (m.me) and Instagram DM (ig.me). Messenger honours the prefilled text;
 *   Instagram may ignore it, so the reference is also shown on screen.
 * - On a computer `sms:` often does nothing, so the number is printed for texting from a phone.
 */
export default function ContactOrder({ reference, styleLabel }) {
  const { messengerPage, instagram } = siteConfig.messaging;
  const { phone, phoneHref } = siteConfig.contact;
  const text = `Hi Web Logo Studio, I just paid for my website. Order ${reference}${
    styleLabel ? ` (style: ${styleLabel})` : ""
  }. My business name is: `;
  const t = encodeURIComponent(text);
  const smsHref = `${phoneHref.replace(/^tel:/, "sms:")}?&body=${t}`; // `?&body=` works on iOS and Android

  const backups = [
    {
      label: "Messenger",
      href: `https://m.me/${messengerPage}?text=${t}`,
      icon: <MessageCircle className="size-[1.1rem]" aria-hidden="true" />,
    },
    {
      label: "Instagram DM",
      href: `https://ig.me/m/${instagram}?text=${t}`,
      icon: <SocialIcon name="Instagram" className="size-[1.1rem]" />,
    },
  ];

  return (
    <section aria-labelledby="start-chat-title" className="mt-8 rounded-xl border-2 border-fg p-5 sm:p-7">
      <h2 id="start-chat-title" className="font-display-wide text-[clamp(1.5rem,4vw,2rem)] font-bold leading-tight">
        Step 2: Message us to start
      </h2>
      <p className="mt-2 text-muted">
        Say hi and send your logo and a few photos. Your order number{" "}
        <strong className="font-semibold tabular-nums text-fg">{reference}</strong> is already in the message.
      </p>

      <a
        href={smsHref}
        className="btn-fill group/btn mt-5 flex h-[4rem] w-full items-center justify-center gap-3 rounded-md bg-orange-strong px-6 text-[1.15rem] font-bold text-white transition-[background-color,transform] duration-200 ease-out-quint hover:bg-orange-deep active:scale-[0.98]"
      >
        <MessageSquareText aria-hidden="true" className="size-5" />
        Text us to start
        <ArrowRight aria-hidden="true" className="arrow-nudge size-5" strokeWidth={2.4} />
      </a>
      <p className="caption mt-2 text-center">
        On a computer? Text <span className="font-semibold tabular-nums text-fg">{phone}</span> from your phone and include{" "}
        <span className="font-semibold tabular-nums text-fg">{reference}</span>.
      </p>

      <p className="mt-6 text-center text-sm font-semibold text-muted">Or message us on</p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {backups.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2.5 rounded-md border-[1.5px] border-line-strong font-semibold text-fg transition-colors hover:border-fg hover:bg-fg hover:text-ink"
            >
              {l.icon}
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
