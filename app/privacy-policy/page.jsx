import LegalPage from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Web Logo Studio collects, uses and protects the personal information you share through this website.",
  path: "/privacy-policy",
});

const sections = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "This policy explains what personal information Web Logo Studio (\"we\", \"us\") collects when you use this website, why we collect it and how we look after it.",
      "We collect only what we need to respond to enquiries and deliver our services, and we never sell your personal information.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: [
      "When you use our contact or quote forms, we collect the details you choose to provide, which may include:",
      [
        "Your name and email address",
        "Your business name",
        "The services you are interested in, your budget range and timeline",
        "Your message or project description",
        "Links you share, such as a reference website or a file-sharing link",
      ],
      "Like most websites, our hosting provider may automatically record technical information such as your IP address, browser type and the pages you visit. This is used to keep the website secure and working correctly.",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: [
      "We use the information you provide to:",
      [
        "Respond to your enquiry or quote request",
        "Prepare proposals and deliver agreed services",
        "Communicate with you about an active project",
        "Protect the website against spam and abuse",
      ],
      "We will not add you to a marketing list without your separate, explicit consent.",
    ],
  },
  {
    id: "legal-basis",
    title: "Legal basis",
    body: [
      "Where data protection law requires a legal basis, we rely on your consent when you submit a form, on steps taken at your request before entering into a contract, and on our legitimate interest in running a secure website and responding to enquiries.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing and service providers",
    body: [
      "We share personal information only with service providers that help us operate, such as our website hosting provider and the email or automation service that delivers form submissions to us. These providers process data on our behalf and only for that purpose.",
      "We may disclose information where required by law or to protect our legal rights.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: [
      "This website does not use advertising cookies. If we add analytics or other non-essential cookies in the future, we will update this policy and, where required, ask for your consent first.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep information",
    body: [
      "We keep enquiry information for as long as needed to respond and, if we work together, for the duration of the project and any period required for legal, tax or accounting purposes. Enquiries that do not lead to a project are deleted when they are no longer needed.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "Form submissions are transmitted over an encrypted connection. We take reasonable technical and organisational measures to protect your information, although no online service can guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: [
      "Depending on where you live, you may have the right to access, correct or delete your personal information, to object to or restrict certain processing, and to withdraw consent at any time. You may also have the right to complain to a data protection authority.",
      "To make a request, please contact us using the contact form on this website.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The date at the top of this page shows when it was last revised.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      intro="How we collect, use and protect the information you share with us."
      updated="18 October 2026"
      sections={sections}
    />
  );
}
