// Default Tours & Packages shown on the public site until an admin adds or
// edits packages via /admin/tours — same "static default, Supabase override"
// pattern as src/data/pricing.js and business.config.js.
//
// `vehicleTypes` mirrors the real round-trip fleet categories already priced
// on the site (src/data/pricing.js roundTripPricing) — not invented per
// package. `price`/`priceUnit` are intentionally null for round-trip
// packages: exact fare depends on route/vehicle/season (see Pricing page),
// so the card/detail page shows "Price on request" instead of a fabricated
// figure. `image` is null where no matching photo exists yet in
// public/images/destinations — do not point these at an unrelated image.
export const tourPackages = [
  {
    id: "bangalore-to-mysore-one-way",
    title: "Bangalore to Mysore One-Way Sightseeing",
    description: "A one-way sightseeing trip from Bangalore to Mysore at an affordable price.",
    price: 1500,
    priceUnit: "per head",
    image: "/images/destinations/mysuru.png",
    active: true,
  },
  {
    id: "bangalore-to-coorg-tour-package",
    title: "Bangalore to Coorg Tour Package",
    description:
      "A round trip tour package from Bangalore to Coorg (Madikeri) — coffee estates, waterfalls and cool hill-country weather.",
    image: "/images/destinations/coorg.png",
    state: "Karnataka",
    category: "Hill Station",
    vehicleTypes: ["Sedan", "SUV", "Tempo Traveller"],
    featured: true,
    price: null,
    priceUnit: null,
    active: true,
  },
  {
    id: "bangalore-to-munnar-tour-package",
    title: "Bangalore to Munnar Tour Package",
    description:
      "A round trip tour package from Bangalore to Munnar — Kerala's best-known tea-garden hill station.",
    image: "/images/destinations/munnar.png",
    state: "Kerala",
    category: "Hill Station",
    vehicleTypes: ["Sedan", "SUV", "Tempo Traveller"],
    featured: true,
    price: null,
    priceUnit: null,
    active: true,
  },
  {
    id: "bangalore-to-goa-tour-package",
    title: "Bangalore to Goa Tour Package",
    description: "A round trip tour package from Bangalore to Goa.",
    // No Goa-specific photo exists in the project yet — reusing the closest
    // existing coastal/beach image on site until a real Goa photo is added.
    image: "/images/destinations/gokarna.png",
    state: "Goa",
    category: "Beach",
    vehicleTypes: ["Sedan", "SUV", "Tempo Traveller"],
    featured: false,
    price: null,
    priceUnit: null,
    active: true,
  },
  {
    id: "bangalore-to-ooty-tour-package",
    title: "Bangalore to Ooty Tour Package",
    description:
      "A round trip tour package from Bangalore to Ooty — tea gardens, lakes and the Nilgiri hills.",
    image: "/images/destinations/ooty.png",
    state: "Tamil Nadu",
    category: "Hill Station",
    vehicleTypes: ["Sedan", "SUV", "Tempo Traveller"],
    featured: true,
    price: null,
    priceUnit: null,
    active: true,
  },
  {
    id: "bangalore-to-chikmagalur-tour-package",
    title: "Bangalore to Chikmagalur Tour Package",
    description:
      "A round trip tour package from Bangalore to Chikmagalur — misty coffee country, viewpoints and trekking trails.",
    image: "/images/destinations/chikamangaluru.png",
    state: "Karnataka",
    category: "Hill Station",
    vehicleTypes: ["Sedan", "SUV", "Tempo Traveller"],
    featured: false,
    price: null,
    priceUnit: null,
    active: true,
  },
  {
    id: "bangalore-to-gokarna-tour-package",
    title: "Bangalore to Gokarna Tour Package",
    description: "A round trip tour package from Bangalore to Gokarna — beaches and a coastal temple town.",
    image: "/images/destinations/gokarna.png",
    state: "Karnataka",
    category: "Beach",
    vehicleTypes: ["Sedan", "SUV", "Tempo Traveller"],
    featured: false,
    price: null,
    priceUnit: null,
    active: true,
  },
  {
    id: "bangalore-to-sakleshpur-tour-package",
    title: "Bangalore to Sakleshpur Tour Package",
    description:
      "A round trip tour package from Bangalore to Sakleshpur — a quiet Western Ghats hill town surrounded by coffee and spice estates.",
    image: "/images/destinations/sakleshpura.png",
    state: "Karnataka",
    category: "Hill Station",
    vehicleTypes: ["Sedan", "SUV", "Tempo Traveller"],
    featured: false,
    price: null,
    priceUnit: null,
    active: true,
  },
  {
    id: "bangalore-to-kodaikanal-tour-package",
    title: "Bangalore to Kodaikanal Tour Package",
    description:
      "A round trip tour package from Bangalore to Kodaikanal — a serene hill station in the Palani Hills known for its lake and misty viewpoints.",
    image: "/images/destinations/kodaikanal.png",
    state: "Tamil Nadu",
    category: "Hill Station",
    vehicleTypes: ["Sedan", "SUV", "Tempo Traveller"],
    featured: false,
    price: null,
    priceUnit: null,
    active: true,
  },
  {
    id: "bangalore-to-pondicherry-tour-package",
    title: "Bangalore to Pondicherry Tour Package",
    description:
      "A round trip tour package from Bangalore to Pondicherry — a seaside town with a French-quarter promenade and heritage streets.",
    image: "/images/destinations/pondicherry.png",
    state: "Puducherry",
    category: "Heritage",
    vehicleTypes: ["Sedan", "SUV", "Tempo Traveller"],
    featured: false,
    price: null,
    priceUnit: null,
    active: true,
  },
  {
    id: "bangalore-to-wayanad-tour-package",
    title: "Bangalore to Wayanad Tour Package",
    description: "A round trip tour package from Bangalore to Wayanad.",
    // No Wayanad-specific photo exists in the project yet — reusing the
    // closest existing Western Ghats hill/greenery image until a real
    // Wayanad photo is added.
    image: "/images/destinations/chikamangaluru.png",
    state: "Kerala",
    category: "Hill Station",
    vehicleTypes: ["Sedan", "SUV", "Tempo Traveller"],
    featured: false,
    price: null,
    priceUnit: null,
    active: true,
  },
  {
    id: "bangalore-to-hampi-tour-package",
    title: "Bangalore to Hampi Tour Package",
    description: "A round trip tour package from Bangalore to Hampi.",
    // No Hampi-specific photo exists in the project yet — reusing the
    // closest existing fort/heritage-ruins image until a real Hampi photo
    // is added.
    image: "/images/destinations/chitradurga.png",
    state: "Karnataka",
    category: "Heritage",
    vehicleTypes: ["Sedan", "SUV", "Tempo Traveller"],
    featured: false,
    price: null,
    priceUnit: null,
    active: true,
  },
  {
    id: "bangalore-to-tirupati-tour-package",
    title: "Bangalore to Tirupati Tour Package",
    description:
      "A round trip tour package from Bangalore to Tirupati — home to the Tirumala Venkateswara Temple, one of the most visited pilgrimage destinations in the country.",
    image: "/images/destinations/tirupati.png",
    state: "Andhra Pradesh",
    category: "Pilgrimage",
    vehicleTypes: ["Sedan", "SUV", "Tempo Traveller"],
    featured: false,
    price: null,
    priceUnit: null,
    active: true,
  },
];
