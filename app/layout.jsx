import { Archivo } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/ui/JsonLd";
import RevealObserver from "@/components/motion/RevealObserver";
import MetaPixel from "@/components/analytics/MetaPixel";
import { siteConfig, businessJsonLd } from "@/lib/site";

// One variable family for the whole system: Archivo with its width axis, so display lines can
// run condensed and labels expanded from a single font file.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Web Logo Studio | Websites, Logos & Brand Identity",
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
    title: "Web Logo Studio | Websites, Logos & Brand Identity",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Logo Studio | Websites, Logos & Brand Identity",
    description: siteConfig.description,
  },
};

export const viewport = {
  themeColor: "#fbfbf8",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-md bg-fg px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
        <RevealObserver />
        <MetaPixel />
        <JsonLd data={businessJsonLd()} />
      </body>
    </html>
  );
}
