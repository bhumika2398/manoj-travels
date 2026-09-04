// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR PRICING
// Sourced from the existing manojtoursandtravels.in pricing (One Way, Local,
// Round Trip). Airport pricing was not reliably available on the source site,
// so it intentionally carries no fixed rate — update `airport` below the
// moment exact rates are confirmed. Do not edit prices anywhere else in the
// codebase; every pricing surface reads from this file.
// ---------------------------------------------------------------------------

export const oneWayPricing = [
  {
    id: "one-way-4-1",
    capacity: "4+1",
    vehicleHint: "Sedan / Hatchback",
    price: 1200,
    unit: "drop",
    label: "Drop / Pick Up",
    note: null,
  },
  {
    id: "one-way-7-1-a",
    capacity: "7+1",
    vehicleHint: "SUV",
    price: 2200,
    unit: "drop",
    label: "Drop / Pick Up",
    note: "+ Toll",
  },
  {
    id: "one-way-7-1-b",
    capacity: "7+1",
    vehicleHint: "SUV (Premium)",
    price: 2400,
    unit: "drop",
    label: "Drop / Pick Up",
    note: "+ Toll",
  },
];

export const localPricing = [
  {
    id: "local-4-1",
    capacity: "4+1",
    vehicleHint: "Sedan / Hatchback",
    price: 2500,
    package: "8 hrs / 80 km",
    extraKm: 14,
    extraHour: 150,
  },
  {
    id: "local-7-1-a",
    capacity: "7+1",
    vehicleHint: "SUV",
    price: 3200,
    package: "8 hrs / 80 km",
    extraKm: 18,
    extraHour: 250,
  },
  {
    id: "local-7-1-b",
    capacity: "7+1 / 6+1",
    vehicleHint: "SUV (Premium)",
    price: 3500,
    package: "8 hrs / 80 km",
    extraKm: 18,
    extraHour: 250,
  },
];

export const roundTripPricing = [
  {
    id: "round-trip-4-1",
    capacity: "4+1",
    vehicleHint: "Sedan / Hatchback",
    perKm: 12,
    minKmPerDay: 300,
    driverBata: 400,
  },
  {
    id: "round-trip-7-1-a",
    capacity: "7+1",
    vehicleHint: "SUV",
    perKm: 17,
    minKmPerDay: 300,
    driverBata: 400,
  },
  {
    id: "round-trip-7-1-b",
    capacity: "7+1",
    vehicleHint: "SUV (Premium)",
    perKm: 18,
    minKmPerDay: 300,
    driverBata: 400,
  },
  {
    id: "round-trip-12-1-a",
    capacity: "12+1",
    vehicleHint: "Tempo Traveller",
    perKm: 20,
    minKmPerDay: 300,
    driverBata: 500,
  },
  {
    id: "round-trip-12-1-b",
    capacity: "12+1",
    vehicleHint: "Tempo Traveller (Premium)",
    perKm: 30,
    minKmPerDay: 300,
    driverBata: 600,
  },
  {
    id: "round-trip-16-1",
    capacity: "16+1",
    vehicleHint: "Tempo Traveller (Large)",
    perKm: 38,
    minKmPerDay: 300,
    driverBata: 800,
  },
];

// Airport pricing is intentionally not fabricated — display a contact
// prompt everywhere until exact rates are supplied.
export const airportPricing = {
  available: false,
  message: "Contact us for airport transfer pricing",
};

export const pricingNotes = [
  "Toll, parking and state permit charges, where applicable, are extra and not included in the fares above.",
  "Round trip fares are calculated on actual km travelled, subject to the minimum km per day shown.",
  "Driver Bata (allowance) is charged per day for outstation round trips.",
  "Local packages include the base hours/km shown; usage beyond that is billed at the extra km / extra hour rate.",
  "Fares are indicative based on our current tariff and may vary with route, season and vehicle availability — please confirm the final fare at the time of booking.",
];
