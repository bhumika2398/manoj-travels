import { faqSchema } from "@/lib/structured-data";

export function FAQSchema({ faqs }) {
  if (!faqs?.length) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
    />
  );
}
