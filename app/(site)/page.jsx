import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import SiteShowcase from "@/components/sections/SiteShowcase";
import NameStudio from "@/components/sections/NameStudio";
import ServiceIndex from "@/components/sections/ServiceIndex";
import LogoShowcase from "@/components/portfolio/LogoShowcase";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Expectations from "@/components/sections/Expectations";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";
import { generalFaqs } from "@/data/content";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata = {
  ...pageMetadata({
    title: null,
    description: siteConfig.description,
    path: "/",
  }),
  title: { absolute: "Web Logo Studio | Websites, Logos & Brand Identity" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SiteShowcase />
      <NameStudio />
      <FeaturedWork />
      <ServiceIndex />
      <LogoShowcase />
      <Process />
      <Testimonials fallback={<Expectations />} />
      <FaqSection faqs={generalFaqs.slice(0, 6)} />
      <CtaSection />
    </>
  );
}
