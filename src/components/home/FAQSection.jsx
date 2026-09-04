import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { generalFaqs } from "@/data/faqs";

export function FAQSection() {
  return (
    <Section tone="paper" id="faq">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions, answered"
            description="Everything you need to know before booking with Manoj Tours and Travels."
          />
          <Button href="/faq" variant="outline" size="sm" className="mt-6">
            View All FAQs
          </Button>
        </div>
        <Accordion items={generalFaqs.slice(0, 6)} />
      </div>
    </Section>
  );
}
