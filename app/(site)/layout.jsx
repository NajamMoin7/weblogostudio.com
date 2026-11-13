import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Logo from "@/components/ui/Logo";
import TiltGlare from "@/components/motion/TiltGlare";

/** Main marketing site: header, page, footer. The /99 ad page lives outside this group. */
export default function SiteLayout({ children }) {
  return (
    <>
      <div id="scroll-sentinel" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-2" />
      <Header logo={<Logo priority className="h-9 w-auto sm:h-11" />} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <TiltGlare />
    </>
  );
}
