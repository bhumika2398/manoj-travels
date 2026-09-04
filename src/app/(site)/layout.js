import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/common/FloatingActions";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { WebSiteSchema } from "@/components/seo/WebSiteSchema";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

// Chrome shared by every public marketing page — deliberately scoped to
// this (site) route group so /admin gets its own, unrelated shell instead
// of inheriting the navbar/footer/floating actions.
export default function SiteLayout({ children }) {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <LocalBusinessSchema />
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-text-on-dark)]"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
