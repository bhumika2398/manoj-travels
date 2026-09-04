import { business } from "@/config/business.config";

export const generalFaqs = [
  {
    question: "Do you provide one-way taxi services from Bangalore?",
    answer:
      "Yes. Manoj Tours and Travels offers one-way outstation cabs where you pay only for the one-side drop fare, without any return-trip charge — available in sedan and SUV options.",
  },
  {
    question: "Do you provide airport pickup and drop?",
    answer:
      `Yes, we provide 24×7 airport pickup and drop to and from Kempegowda International Airport. Since exact airport fares can vary by vehicle and route, please call or WhatsApp us at ${business.phone.primaryDisplay} for the current rate.`,
  },
  {
    question: "Are your cab services available 24×7?",
    answer:
      "Yes, Manoj Tours and Travels (Manoj Taxi Service) operates 24 hours a day, 7 days a week, including early-morning and late-night pickups.",
  },
  {
    question: "What vehicles are available?",
    answer:
      "Our fleet includes sedans (Swift Dzire, Toyota Etios), SUVs (Toyota Innova, Toyota Innova Crysta) and a Force Urbania for larger groups. See the Fleet page for details on each vehicle.",
  },
  {
    question: "How is round-trip pricing calculated?",
    answer:
      "Round trip fares are billed per kilometre travelled, with a minimum running of 300 km per day and a daily driver allowance (Bata). Rates vary by vehicle — see the Round Trip pricing table for exact per-km rates.",
  },
  {
    question: "What is included in the local cab package?",
    answer:
      "Local packages are built around a base of 8 hours and 80 km. Usage beyond the base is billed at a fixed extra-km and extra-hour rate, shown clearly on the Local Cabs page for each vehicle.",
  },
  {
    question: "How can I book a cab with Manoj Tours and Travels?",
    answer:
      `You can book by calling or WhatsApping us at ${business.phone.primaryDisplay}, or by submitting an enquiry through the booking form on this website. We'll confirm your trip details directly with you.`,
  },
  {
    question: "How can I contact Manoj Taxi Service?",
    answer:
      `Call or WhatsApp ${business.phone.primaryDisplay} (alternate: ${business.phone.secondaryDisplay}), or email ${business.email}. We're based in Kaggalipura, Kanakapura Road, Bangalore, and available 24×7.`,
  },
  {
    question: "Are tolls and parking included in the fare?",
    answer:
      "No. Toll, parking and state permit charges, where applicable on a route, are additional and not included in the listed fares.",
  },
  {
    question: "Is Manoj Tours and Travels the same as Manoj Taxi Service?",
    answer:
      "Yes, Manoj Tours and Travels and Manoj Taxi Service are the same business, operating out of Bangalore, Karnataka.",
  },
];

const faqsByPricingType = {
  "one-way": [generalFaqs[0], generalFaqs[8], generalFaqs[6]],
  "round-trip": [generalFaqs[4], generalFaqs[8], generalFaqs[6]],
  local: [generalFaqs[5], generalFaqs[2], generalFaqs[6]],
  airport: [generalFaqs[1], generalFaqs[2], generalFaqs[6]],
};

export function getServiceFaqs(service) {
  return faqsByPricingType[service.pricingType] || generalFaqs.slice(0, 3);
}
