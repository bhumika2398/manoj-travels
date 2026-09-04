// Fleet data is built strictly around the vehicle images already present in
// public/images/fleet/. Do not add vehicles that don't have a real image.
// Pricing references pull from src/data/pricing.js so rates stay in sync.

export const fleet = [
  {
    slug: "swift-dzire",
    name: "Swift Dzire",
    category: "Sedan",
    image: "/images/fleet/swift-dezire.png",
    capacity: "4+1",
    seatLabel: "4 Passengers + Driver",
    tripTypes: ["One Way", "Round Trip", "Local", "Airport Transfer"],
    description:
      "A comfortable, fuel-efficient sedan suited for small families and solo/business travel — ideal for city runs, airport transfers and one-way outstation drops.",
    pricingIds: ["one-way-4-1", "local-4-1", "round-trip-4-1"],
  },
  {
    slug: "toyota-etios",
    name: "Toyota Etios",
    category: "Sedan",
    image: "/images/fleet/toyoto-etios.png",
    capacity: "4+1",
    seatLabel: "4 Passengers + Driver",
    tripTypes: ["One Way", "Round Trip", "Local", "Airport Transfer"],
    description:
      "A spacious, reliable sedan with a large boot — a dependable choice for local commutes, airport pickups and short outstation trips.",
    pricingIds: ["one-way-4-1", "local-4-1", "round-trip-4-1"],
  },
  {
    slug: "toyota-innova",
    name: "Toyota Innova",
    category: "SUV",
    image: "/images/fleet/innova.png",
    capacity: "7+1",
    seatLabel: "Up to 7 Passengers + Driver",
    tripTypes: ["One Way", "Round Trip", "Local", "Airport Transfer", "Tour Package"],
    description:
      "A tried-and-tested MUV with generous cabin space and luggage room — a popular pick for families and groups travelling together across Karnataka.",
    pricingIds: ["one-way-7-1-a", "local-7-1-a", "round-trip-7-1-a"],
  },
  {
    slug: "toyota-innova-crysta",
    name: "Toyota Innova Crysta",
    category: "Premium SUV",
    image: "/images/fleet/innova-crysta.png",
    capacity: "7+1",
    seatLabel: "Up to 7 Passengers + Driver",
    tripTypes: ["One Way", "Round Trip", "Local", "Airport Transfer", "Tour Package"],
    description:
      "The refined, higher-trim version of the Innova — extra comfort, quieter ride and a more premium cabin for outstation tours and long round trips.",
    pricingIds: ["one-way-7-1-b", "local-7-1-b", "round-trip-7-1-b"],
  },
  {
    slug: "force-urbania",
    name: "Force Urbania",
    category: "Tempo Traveller / Van",
    image: "/images/fleet/urbania.png",
    capacity: "12+1 / 16+1",
    seatLabel: "Large Group Seating",
    tripTypes: ["Round Trip", "Local", "Tour Package"],
    description:
      "A spacious van built for large groups and family reunions on tour — well suited for multi-day outstation round trips and group temple/hill-station tours.",
    pricingIds: ["round-trip-12-1-a", "round-trip-12-1-b", "round-trip-16-1"],
  },
  {
    slug: "tempo-traveller",
    name: "Tempo Traveller",
    category: "Tempo Traveller / Van",
    image: "/images/fleet/tempo-traveller.jpg",
    capacity: "12+1 / 16+1",
    seatLabel: "Large Group Seating",
    tripTypes: ["Round Trip", "Local", "Tour Package"],
    description:
      "Our dedicated Tempo Traveller for large groups — roomy bench seating and luggage space, well suited for multi-day outstation tours and group travel.",
    pricingIds: ["round-trip-12-1-a", "round-trip-12-1-b", "round-trip-16-1"],
  },
];

export const getFleetBySlug = (slug) => fleet.find((v) => v.slug === slug);
