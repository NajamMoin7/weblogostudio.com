import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import ToolsMarquee from "@/components/sections/ToolsMarquee";
import FeaturedServices from "@/components/sections/FeaturedServices";
import FeaturedWork from "@/components/sections/FeaturedWork";
import LogoShowcase from "@/components/portfolio/LogoShowcase";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
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
  title: { absolute: "Web Logo Studio | Website Design, Development & Logo Design" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolsMarquee />
      <Statement />
      <FeaturedServices />
      <FeaturedWork />
      <LogoShowcase />
      <Process />
      <WhyUs />
      <Testimonials fallback={<Expectations />} />
      <FaqSection faqs={generalFaqs.slice(0, 6)} />
      <CtaSection />
    </>
  );
}
