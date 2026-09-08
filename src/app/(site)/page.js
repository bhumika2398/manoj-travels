import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhySection } from "@/components/home/WhySection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { CinematicSection } from "@/components/home/CinematicSection";
import { CTASection } from "@/components/home/CTASection";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { buildMetadata } from "@/lib/metadata";
import { generalFaqs } from "@/data/faqs";

export const metadata = buildMetadata({
  path: "/",
});

// A cinematic, minimal landing page — not a sitemap. The full fleet catalogue,
// every destination and the deeper enquiry flows still live on their own
// pages; this is the introduction plus the site's one homepage enquiry form
// (built directly into the hero itself — visible on load, no scrolling
// required — no duplicate contact form elsewhere on this page). Fleet has
// no preview section here — it's reached through the navbar and its own
// page. The full testimonial journal lives on its own /testimonials page.
// No video plays directly below the hero.
export default function HomePage() {
  return (
    <>
      <FAQSchema faqs={generalFaqs} />
      <Hero />
      <Intro />
      <ServicesSection />
      <WhySection />
      <DestinationsSection />
      <CinematicSection />
      <CTASection />
    </>
  );
}
