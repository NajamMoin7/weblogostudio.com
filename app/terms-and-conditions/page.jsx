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
      updated="18 October 2026"
      sections={sections}
    />
  );
}
