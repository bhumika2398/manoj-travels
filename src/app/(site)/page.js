import { Hero } from "@/components/home/Hero";
import { BookingBar } from "@/components/home/BookingBar";
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

// A cinematic, minimal landing page — not a sitemap. Detailed pricing, the
// full fleet, every destination and the enquiry form all live on their own
// pages; this is the introduction only. Fleet has no preview section here —
// it's reached through the navbar and its own page. The full testimonial
// journal lives on its own /testimonials page, not inline here. No video
// plays directly below the hero — a premium booking/search bar does.
export default function HomePage() {
  return (
    <>
      <FAQSchema faqs={generalFaqs} />
      <Hero />
      <BookingBar />
      <Intro />
      <ServicesSection />
      <WhySection />
      <DestinationsSection />
      <CinematicSection />
      <CTASection />
    </>
  );
}
