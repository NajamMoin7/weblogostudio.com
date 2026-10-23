import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/layout/MotionProvider";
import Logo from "@/components/ui/Logo";
import JsonLd from "@/components/ui/JsonLd";
import RevealObserver from "@/components/motion/RevealObserver";
import { siteConfig, absoluteUrl } from "@/lib/site";

// Headings: Playfair Display (refined serif). Body and UI: Inter. Both are variable fonts.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Web Logo Studio | Website Design, Development & Logo Design",
    template: "%s | Web Logo Studio",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    url: "/",
    title: "Web Logo Studio | Website Design, Development & Logo Design",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Logo Studio | Website Design, Development & Logo Design",
    description: siteConfig.description,
  },
};

export const viewport = {
  themeColor: "#f5f0e6",
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl("/brand/logo-lockup.png"),
      slogan: "Brands for a brighter web",
      description: siteConfig.description,
      ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
      ...(siteConfig.socials.length ? { sameAs: siteConfig.socials.map((s) => s.href) } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal hidden states before first paint. Without JavaScript, content stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add(\"reveal-on\")" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-md bg-fg px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <div id="scroll-sentinel" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-2" />
        <MotionProvider>
          <Header logo={<Logo priority className="h-10 w-auto sm:h-[3.15rem]" />} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <RevealObserver />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
