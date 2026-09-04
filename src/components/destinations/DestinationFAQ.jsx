import { Accordion } from "@/components/ui/Accordion";
import { business } from "@/config/business.config";

export function DestinationFAQ({ destination }) {
  const faqs = [
    {
      question: `What's the best way to travel from Bangalore to ${destination.name}?`,
      answer: `A ${destination.idealTripType.toLowerCase()} cab is best suited for ${destination.name}. Share your travel dates and group size and we'll recommend the right vehicle and fare.`,
    },
    {
      question: `How is the fare to ${destination.name} calculated?`,
      answer:
        "One-way trips are charged a fixed one-side fare, while round trips are billed per kilometre with a minimum daily running and a driver allowance. See our pricing page for exact rates by vehicle.",
    },
    {
      question: `How do I book a cab to ${destination.name}?`,
      answer: `Call or WhatsApp us at ${business.phone.primaryDisplay}, or submit an enquiry on this page, and we'll confirm your booking.`,
    },
  ];

  return <Accordion items={faqs} />;
}
