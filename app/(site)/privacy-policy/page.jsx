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
      "This policy explains what personal information Web Logo Studio LLC (\"we\", \"us\"), 9 Loretta Lane, Hicksville, NY 11801, collects when you use this website, why we collect it and how we look after it. The studio is managed by Corebyte Media LLC.",
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
      "If you order the $99 one-page website, we also collect the details you send on the order form: business name and type, contact name, phone, email, business address and hours, your notes, and the logo and photos you upload. Uploaded images are resized in your browser and delivered to our inbox to build your site.",
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
        "Take payment for orders and match each payment to its order",
        "Measure which of our ads lead to enquiries and orders",
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
    title: "Sharing, service providers and payments",
    body: [
      "We share personal information only with service providers that help us operate, such as our website hosting provider and the email or automation service that delivers form submissions to us. These providers process data on our behalf and only for that purpose.",
      "Payments are processed by Stripe, Inc. When you pay a deposit, you enter your card details on Stripe's secure checkout page; we never see or store your full card number. Stripe shares with us your name, email, phone number, the amount paid and a payment reference (the checkout session ID), which we use to confirm and fulfil your order. Stripe's own use of your data is described in the Stripe Privacy Policy at stripe.com/privacy.",
      "We may disclose information where required by law or to protect our legal rights.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies, the Meta Pixel and advertising",
    body: [
      "This website uses the Meta Pixel, a measurement tool from Meta Platforms, Inc. (Facebook and Instagram). It sets cookies and sends Meta information about your visit, such as the pages you view, your browser and device, your IP address, and actions you take on the site: viewing the $99 offer, starting checkout, and completing a payment (the amount, currency and an order reference, never your card details). Meta may link this to your Facebook or Instagram account. We use it to measure our ads and show them to people likely to find them useful.",
      "You can limit this tracking in your Facebook and Instagram ad settings (facebook.com/adpreferences), by blocking third-party cookies in your browser, or with an ad or tracker blocker. Meta's use of the data is described in its Privacy Policy at facebook.com/privacy/policy.",
      "We do not sell your personal information. Apart from the Meta Pixel and the cookies Stripe sets on its own checkout page, this website does not use advertising cookies.",
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
      "To make a request, call (707) 564-6678, write to 9 Loretta Lane, Hicksville, NY 11801, or use the contact form on this website.",
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
      updated="10 November 2026"
      sections={sections}
    />
  );
}
