import LegalPage from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "The terms that apply to using the Web Logo Studio website and to projects carried out by Web Logo Studio.",
  path: "/terms-and-conditions",
});

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    body: [
      "These terms apply to your use of this website and set out the general conditions under which Web Logo Studio (\"we\", \"us\") provides design and development services.",
      "Each project is also governed by a written proposal or agreement. If that document conflicts with these terms, the project-specific document takes precedence.",
    ],
  },
  {
    id: "website-use",
    title: "Using this website",
    body: [
      "You may browse this website for personal and business purposes. You must not misuse it, attempt to gain unauthorised access, or submit content that is unlawful, misleading or harmful.",
      "Information on this website is provided for general guidance. Package descriptions are indicative and are confirmed only in a written proposal.",
    ],
  },
  {
    id: "proposals",
    title: "Proposals and quotes",
    body: [
      "Quotes and proposals are based on the information you provide and are valid for the period stated in the proposal. A project begins once you accept the proposal in writing and any agreed deposit is received.",
    ],
  },
  {
    id: "payment",
    title: "Fees and payment",
    body: [
      "Fees, payment schedules and accepted payment methods are set out in each proposal. Third-party costs, such as domains, hosting, licensed fonts, stock imagery, premium plugins and payment provider fees, are your responsibility unless the proposal states otherwise.",
    ],
  },
  {
    id: "one-page-offer",
    title: "The $99 one-page website offer",
    body: [
      "This section applies to orders placed through our $99 one-page website offer. The total price is $99: a $20 deposit when you order, and the remaining $79 after you approve your design.",
      "Deposit and refund window. The $20 deposit is taken by card through Stripe when you order. If you don't love your first concept, tell us within 24 hours of receiving it and we will refund the full $20 deposit. After that 24-hour window the deposit is non-refundable, because design work has been carried out.",
      "Saved card and consent to charge the balance. When you pay the deposit, you authorise us to save your card securely with Stripe and to charge the remaining $79 to it once you approve your design. We will not charge the balance before you approve. You can ask us to use a different payment method instead by contacting us before you approve.",
      "Preview hold. Your concept is published as a preview on our website and held for 7 days from when we send it. If we have not heard from you within those 7 days, we may take the preview down; the deposit is not refundable at that point, but you can contact us to restart the project.",
      "Going live. Once you approve the design and the balance is paid, your site goes live within 1 hour, provided the domain and hosting are ready.",
      "Files and domain. Website files, and any domain registered by us on your behalf, are handed over to you only after the full $99 (and any separately agreed domain or hosting fees) has been paid. Until then they remain ours, and the preview may not be copied or published elsewhere.",
      "Choosing a style. If you choose a style from our portfolio, we design a new site for you in a similar style using your own business details, text and images. We do not transfer or copy another client's website, content or branding.",
      "Concept timing. The 2-hour first-concept time applies to complete information received Monday to Friday, 9am to 6pm Eastern Time. Orders can be placed at any time; the clock starts once we have your information within those hours.",
    ],
  },
  {
    id: "revisions",
    title: "Revisions and changes",
    body: [
      "Each proposal specifies the number of revision rounds included. Additional revisions, or changes to the agreed scope, may be charged and will be agreed with you before the work is carried out.",
    ],
  },
  {
    id: "client-responsibilities",
    title: "Your responsibilities",
    body: [
      "To keep a project on schedule, you agree to:",
      [
        "Provide content, feedback and approvals within reasonable timeframes",
        "Ensure you have the rights to any text, images, logos or other materials you supply",
        "Review deliverables carefully before giving final approval",
      ],
      "Delays in feedback or materials may affect the timeline.",
    ],
  },
  {
    id: "ownership",
    title: "Ownership and intellectual property",
    body: [
      "Once the project is paid in full, ownership of the final approved deliverables transfers to you, as described in your proposal. Unused concepts and working files remain our property unless otherwise agreed.",
      "Third-party components, such as open-source software, licensed fonts, plugins and stock assets, remain subject to their own licences.",
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio use",
    body: [
      "We would like to show completed work in our portfolio. We will only do so with your permission, and we will never publish confidential information.",
    ],
  },
  {
    id: "third-party",
    title: "Third-party services",
    body: [
      "Websites often rely on hosting providers, payment gateways, plugins and other third-party services. We are not responsible for outages, changes or fees introduced by those providers, although we will help where our agreement allows.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: [
      "We take care to deliver high-quality work, but we cannot guarantee specific business outcomes such as search rankings, traffic, conversions or sales. To the extent permitted by law, our total liability for any project is limited to the fees paid for that project.",
    ],
  },
  {
    id: "termination",
    title: "Cancellation",
    body: [
      "Either party may end a project in writing as set out in the proposal. Work completed up to the date of cancellation is payable.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: [
      "We may update these terms from time to time. The version in force when you accept a proposal applies to that project.",
      "Questions about these terms? Please contact us using the contact form on this website.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      path="/terms-and-conditions"
      intro="The terms that apply to this website and to the projects we deliver."
      updated="11 November 2026"
      sections={sections}
    />
  );
}
