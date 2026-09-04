import { oneWayPricing, localPricing, roundTripPricing, airportPricing } from "./pricing";

export const services = [
  {
    slug: "outstation-cabs",
    name: "One Way Cabs",
    shortName: "One Way",
    tagline: "Pay for a one side drop, not the return leg.",
    heroImage: "/images/fleet/swift-dezire.png",
    summary:
      "Travelling one-way to another city? Book a one-way outstation cab and pay only for the distance you travel, without bearing the cost of the return journey.",
    features: [
      "One-side fare — no return-trip charges",
      "Sedan and SUV options available",
      "Point-to-point pickup and drop",
      "Available 24×7 across Bangalore",
    ],
    pricing: oneWayPricing,
    pricingType: "one-way",
    idealFor: [
      "One-way trips to Mysore, Chennai, Tirupati and nearby cities",
      "Single travellers and small families",
      "Employees relocating or travelling on work",
    ],
  },
  {
    slug: "round-trip-cabs",
    name: "Round Trip Cabs",
    shortName: "Round Trip",
    tagline: "Outstation round trips, billed transparently per km.",
    heroImage: "/images/fleet/innova-crysta.png",
    summary:
      "Planning a multi-day outstation trip? Round trip cabs are billed per kilometre with a minimum daily running of 300 km, plus a daily driver allowance — ideal for tours, pilgrimages and family trips.",
    features: [
      "Transparent per-km billing",
      "Minimum 300 km/day running",
      "Daily driver allowance (Bata) applies",
      "Sedan, SUV and Tempo Traveller options",
    ],
    pricing: roundTripPricing,
    pricingType: "round-trip",
    idealFor: [
      "Multi-day tours to Ooty, Coorg, Chikmagalur and Kerala",
      "Family and group pilgrimages",
      "Custom outstation itineraries",
    ],
  },
  {
    slug: "local-cabs",
    name: "Local Cabs",
    shortName: "Local",
    tagline: "Hourly city packages for local travel and sightseeing.",
    heroImage: "/images/fleet/toyoto-etios.png",
    summary:
      "For city errands, local sightseeing or a full day around Bangalore, book an hourly local package with a fixed base of hours and kilometres, and clearly defined extra km/hour rates.",
    features: [
      "8 hrs / 80 km base packages",
      "Clear extra km and extra hour rates",
      "Sedan and SUV options",
      "Well suited for local sightseeing and city errands",
    ],
    pricing: localPricing,
    pricingType: "local",
    idealFor: [
      "Local sightseeing around Bangalore",
      "City errands, meetings and events",
      "Half-day and full-day local hire",
    ],
  },
  {
    slug: "airport-pickup-drop",
    name: "Airport Transfer",
    shortName: "Airport",
    tagline: "Reliable pickup and drop to Kempegowda International Airport.",
    heroImage: "/images/fleet/innova.png",
    summary:
      "Book a dependable airport pickup or drop, any time of day or night. Share your flight details and we'll coordinate the timing with you directly on call or WhatsApp.",
    features: [
      "Available 24×7, including late-night and early-morning flights",
      "Sedan and SUV options",
      "Doorstep pickup and drop",
      "Coordinate timing directly over call/WhatsApp",
    ],
    pricing: null,
    pricingType: "airport",
    airportNotice: airportPricing.message,
    idealFor: [
      "Airport pickup for arriving guests and family",
      "Airport drop for outbound flights",
      "Early morning and late night transfers",
    ],
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
