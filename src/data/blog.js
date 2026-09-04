// Practical, factual travel guides built from our own service and pricing
// data — no fabricated claims, reviews or statistics.

export const blogPosts = [
  {
    slug: "one-way-vs-round-trip-cab-bangalore",
    title: "One Way vs Round Trip Cabs: Which Should You Book?",
    excerpt:
      "A quick guide to choosing between a one-way drop and a round-trip package for your next outstation trip from Bangalore.",
    image: "/images/destinations/mysuru.png",
    content: [
      "If you're travelling to another city and not returning the same way, a one-way cab is usually the more economical choice — you pay a fixed one-side fare instead of a per-km round-trip rate.",
      "If you plan to travel to a destination, spend time there, and return with the same cab (or need the cab to wait across multiple days), a round trip package is the better fit. Round trips are billed per kilometre with a minimum running of 300 km per day, plus a daily driver allowance.",
      "For short outstation drops like Mysore or Tirupati where you're not returning immediately, one-way is typically cheaper. For multi-day tours to hill stations like Ooty, Coorg or Chikmagalur, round trip works out simpler since the same vehicle stays with you throughout.",
    ],
    relatedServiceSlug: "outstation-cabs",
  },
  {
    slug: "bangalore-airport-transfer-guide",
    title: "Planning a Bangalore Airport Pickup or Drop: What to Know",
    excerpt:
      "How airport transfers work with Manoj Tours and Travels, and what to share with us before your flight.",
    image: "/images/destinations/bangalore-palace.png",
    content: [
      "We offer airport pickup and drop to and from Kempegowda International Airport, 24×7, including early morning and late night flights.",
      "Since traffic and flight timings vary, we recommend sharing your flight number and expected landing/departure time when you enquire, so we can coordinate the pickup time accurately.",
      "Exact airport transfer fares depend on your pickup/drop location and vehicle choice — call or WhatsApp us for the current rate before you book.",
    ],
    relatedServiceSlug: "airport-pickup-drop",
  },
  {
    slug: "local-cab-package-explained",
    title: "How Local Cab Packages Work in Bangalore",
    excerpt:
      "Understanding the 8 hrs/80 km base package and how extra km/hour charges are calculated.",
    image: "/images/destinations/lalbagh.png",
    content: [
      "Our local cab packages are built around a base of 8 hours and 80 km, useful for city sightseeing, errands or a day of meetings.",
      "If your usage goes beyond the base hours or kilometres, extra time and distance are billed at a fixed extra-km and extra-hour rate — shown clearly for each vehicle on our Local Cabs page.",
      "Choose a sedan for smaller groups or an SUV/Innova for families — see the Fleet page to compare seating capacity before booking.",
    ],
    relatedServiceSlug: "local-cabs",
  },
  {
    slug: "planning-a-hill-station-round-trip",
    title: "Planning a Hill Station Round Trip from Bangalore",
    excerpt:
      "A look at popular hill-station round trips — Ooty, Coonoor, Coorg and Chikmagalur — and how the pricing works.",
    image: "/images/destinations/coorg.png",
    content: [
      "Ooty, Coonoor, Coorg (Madikeri) and Chikmagalur are among the most requested multi-day round trips from Bangalore, each roughly 245–290 km away by road.",
      "Round trip fares are billed per kilometre travelled, with a minimum of 300 km running per day and a daily driver allowance — this covers the vehicle staying with you for the length of the trip.",
      "For larger family groups, the Force Urbania offers more seating than a sedan or Innova — check the Fleet page for capacity details.",
    ],
    relatedServiceSlug: "round-trip-cabs",
  },
];

export const getBlogPostBySlug = (slug) => blogPosts.find((p) => p.slug === slug);
