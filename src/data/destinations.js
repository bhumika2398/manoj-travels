// Destination data is built strictly around the images already present in
// public/images/destinations/. Do not add destinations without a real image.
// Distances are well-known approximate one-way road distances from
// Bangalore, shown only as a general planning reference — always confirm
// the exact route/fare at the time of booking.

export const destinations = [
  {
    slug: "bangalore-palace",
    name: "Bangalore Palace",
    region: "Bangalore City",
    image: "/images/destinations/bangalore-palace.png",
    approxDistanceKm: 0,
    idealTripType: "Local Sightseeing",
    description:
      "A Tudor-style royal palace in the heart of Bangalore, popular for its architecture and landscaped grounds — an easy half-day stop on a local city tour.",
    keywords: ["bangalore palace taxi", "bangalore local sightseeing cab"],
  },
  {
    slug: "lalbagh",
    name: "Lalbagh Botanical Garden",
    region: "Bangalore City",
    image: "/images/destinations/lalbagh.png",
    approxDistanceKm: 0,
    idealTripType: "Local Sightseeing",
    description:
      "A historic botanical garden known for its glasshouse and rock formations — a relaxed, green escape within the city on a local cab package.",
    keywords: ["lalbagh taxi bangalore", "bangalore local sightseeing cab"],
  },
  {
    slug: "nandi-hills",
    name: "Nandi Hills",
    region: "Near Bangalore",
    image: "/images/destinations/nandi-hills.png",
    approxDistanceKm: 60,
    idealTripType: "Local / One Way",
    description:
      "A popular hilltop getaway near Bangalore known for its sunrise views — a favourite for early-morning drives and short day trips.",
    keywords: ["bangalore to nandi hills taxi", "nandi hills cab booking"],
  },
  {
    slug: "mysore",
    name: "Mysore Palace",
    region: "Karnataka",
    image: "/images/destinations/mysuru.png",
    approxDistanceKm: 145,
    idealTripType: "One Way / Round Trip",
    description:
      "The magnificently illuminated Mysore Palace and the city around it — one of the most requested day-trip and weekend destinations from Bangalore.",
    keywords: ["bangalore to mysore taxi", "mysore to bangalore cabs", "bangalore to mysore cabs", "bangalore to mandya taxi"],
  },
  {
    slug: "chikmagalur",
    name: "Chikmagalur",
    region: "Karnataka",
    image: "/images/destinations/chikamangaluru.png",
    approxDistanceKm: 245,
    idealTripType: "Round Trip / Tour Package",
    description:
      "A misty coffee-country hill town with viewpoints, estates and trekking trails — well suited for a multi-day round trip.",
    keywords: ["bangalore to chikkamangalore taxi", "chikkamangalore to bangalore taxi"],
  },
  {
    slug: "chitradurga",
    name: "Chitradurga Fort",
    region: "Karnataka",
    image: "/images/destinations/chitradurga.png",
    approxDistanceKm: 200,
    idealTripType: "One Way / Round Trip",
    description:
      "A massive hill fort with layered ramparts and a rich history — a popular stop for history and heritage travellers.",
    keywords: ["bangalore to chitradurga taxi", "chitradurga to bangalore taxi", "bangalore to challakere taxi", "challakere to bangalore taxi"],
  },
  {
    slug: "coorg",
    name: "Coorg (Madikeri)",
    region: "Karnataka",
    image: "/images/destinations/coorg.png",
    approxDistanceKm: 250,
    idealTripType: "Round Trip / Tour Package",
    description:
      "Karnataka's coffee and cardamom hill country, with waterfalls, plantations and cool weather — ideal for a relaxed multi-day round trip.",
    keywords: ["bangalore to coorg taxi", "coorg to bangalore taxi"],
  },
  {
    slug: "madikeri",
    name: "Madikeri",
    region: "Karnataka",
    image: "/images/destinations/madikeri.png",
    approxDistanceKm: 250,
    idealTripType: "Round Trip / Tour Package",
    description:
      "The misty hill town at the heart of Coorg, with Abbey Falls, Raja's Seat and Madikeri Fort nearby — a natural base for a Coorg round trip.",
    keywords: ["bangalore to madikeri taxi", "madikeri to bangalore taxi", "bangalore to kushalnagar taxi", "kushalnagar to bangalore taxi"],
  },
  {
    slug: "hassan",
    name: "Hassan",
    region: "Karnataka",
    image: "/images/destinations/hassan.png",
    approxDistanceKm: 185,
    idealTripType: "One Way / Round Trip",
    description:
      "A convenient base for exploring Belur, Halebidu and Shravanabelagola's Hoysala temples — a favourite heritage circuit from Bangalore.",
    keywords: ["bangalore to hassan taxi", "hassan to bangalore taxi"],
  },
  {
    slug: "sakleshpur",
    name: "Sakleshpur",
    region: "Karnataka",
    image: "/images/destinations/sakleshpura.png",
    approxDistanceKm: 220,
    idealTripType: "One Way / Round Trip",
    description:
      "A quiet Western Ghats hill town surrounded by coffee and spice estates — a favoured weekend round trip from Bangalore.",
    keywords: ["bangalore to sakleshpur taxi", "sakleshpur to bangalore taxi"],
  },
  {
    slug: "shivamogga",
    name: "Shivamogga",
    region: "Karnataka",
    image: "/images/destinations/shivmogga.png",
    approxDistanceKm: 275,
    idealTripType: "Round Trip / Tour Package",
    description:
      "Gateway to the Malnad region's waterfalls and forests — a good base for a longer outstation round trip.",
    keywords: ["bangalore to shivamogga taxi", "shivamogga to bangalore taxi"],
  },
  {
    slug: "malnad",
    name: "Malnad Region",
    region: "Karnataka",
    image: "/images/destinations/malnad.png",
    approxDistanceKm: 250,
    idealTripType: "Round Trip / Tour Package",
    description:
      "Karnataka's lush Western Ghats belt of forests, waterfalls and hill towns — best explored on a multi-day round trip package.",
    keywords: ["bangalore to malnad region taxi", "malnad tour package bangalore"],
  },
  {
    slug: "mangalore",
    name: "Mangalore",
    region: "Karnataka Coast",
    image: "/images/destinations/mangalore.png",
    approxDistanceKm: 350,
    idealTripType: "Round Trip / Tour Package",
    description:
      "A vibrant coastal city known for its beaches, temples and coastal cuisine — typically travelled as a round trip or longer tour.",
    keywords: ["bangalore to mangalore taxi", "mangalore to bangalore taxi"],
  },
  {
    slug: "udupi",
    name: "Udupi",
    region: "Karnataka Coast",
    image: "/images/destinations/udupi.png",
    approxDistanceKm: 420,
    idealTripType: "Round Trip / Tour Package",
    description:
      "Famous for the Krishna Temple and its coastal cuisine — usually combined with Mangalore or the coastal circuit on a round trip.",
    keywords: ["bangalore to udupi cabs", "udupi to bangalore cabs", "bangalore to manipal taxi", "manipal to bangalore taxi"],
  },
  {
    slug: "gokarna",
    name: "Gokarna",
    region: "Karnataka Coast",
    image: "/images/destinations/gokarna.png",
    approxDistanceKm: 490,
    idealTripType: "Round Trip / Tour Package",
    description:
      "A temple town on the Karnataka coast known for its beaches — usually planned as a multi-day round trip.",
    keywords: ["bangalore to gokarna taxi", "gokarna to bangalore taxi", "bangalore to karwar taxi", "bangalore to sirsi cabs"],
  },
  {
    slug: "murudeshwara",
    name: "Murudeshwara",
    region: "Karnataka Coast",
    image: "/images/destinations/murdeshwara.png",
    approxDistanceKm: 490,
    idealTripType: "Round Trip / Tour Package",
    description:
      "A coastal temple town known for its towering Shiva statue overlooking the Arabian Sea — often combined with Gokarna on a round trip.",
    keywords: ["bangalore to murudeshwar taxi", "murudeshwar to bangalore taxi", "bangalore to honnavar taxi", "bangalore to bhatkal taxi"],
  },
  {
    slug: "ooty",
    name: "Ooty",
    region: "Tamil Nadu",
    image: "/images/destinations/ooty.png",
    approxDistanceKm: 270,
    idealTripType: "Round Trip / Tour Package",
    description:
      "The Queen of the Nilgiris — tea gardens, lakes and cool weather make it one of the most popular round-trip hill station tours from Bangalore.",
    keywords: ["bangalore to ooty taxi", "ooty to bangalore taxi"],
  },
  {
    slug: "coonoor",
    name: "Coonoor",
    region: "Tamil Nadu",
    image: "/images/destinations/conoor.png",
    approxDistanceKm: 290,
    idealTripType: "Round Trip / Tour Package",
    description:
      "A quieter, greener neighbour to Ooty in the Nilgiris, known for viewpoints like Dolphin's Nose — often paired with an Ooty round trip.",
    keywords: ["bangalore to coonoor taxi", "coonoor to bangalore taxi"],
  },
  {
    slug: "kodaikanal",
    name: "Kodaikanal",
    region: "Tamil Nadu",
    image: "/images/destinations/kodaikanal.png",
    approxDistanceKm: 460,
    idealTripType: "Round Trip / Tour Package",
    description:
      "A serene hill station in the Palani Hills known for its lake and misty viewpoints — typically a multi-day round trip.",
    keywords: ["bangalore to kodaikanal taxi", "kodaikanal to bangalore taxi"],
  },
  {
    slug: "pondicherry",
    name: "Pondicherry",
    region: "Tamil Nadu",
    image: "/images/destinations/pondicherry.png",
    approxDistanceKm: 320,
    idealTripType: "Round Trip / Tour Package",
    description:
      "A seaside town with a French-quarter promenade and heritage streets — a popular multi-day round trip from Bangalore.",
    keywords: ["bangalore to pondicherry taxi", "pondicherry to bangalore taxi"],
  },
  {
    slug: "madurai",
    name: "Madurai",
    region: "Tamil Nadu",
    image: "/images/destinations/madurai.png",
    approxDistanceKm: 460,
    idealTripType: "Round Trip / Tour Package",
    description:
      "Home to the iconic Meenakshi Amman Temple — a key stop on South Indian temple tour itineraries.",
    keywords: ["bangalore to madurai taxi", "madurai to bangalore taxi"],
  },
  {
    slug: "rameshwaram",
    name: "Rameshwaram",
    region: "Tamil Nadu",
    image: "/images/destinations/rameshwaram.png",
    approxDistanceKm: 620,
    idealTripType: "Tour Package",
    description:
      "A major pilgrimage town on the coast, home to the Ramanathaswamy Temple — typically part of a longer South India temple tour package.",
    keywords: ["bangalore to rameshwaram taxi", "rameshwaram to bangalore taxi"],
  },
  {
    slug: "kanyakumari",
    name: "Kanyakumari",
    region: "Tamil Nadu",
    image: "/images/destinations/kanyakumari.png",
    approxDistanceKm: 630,
    idealTripType: "Tour Package",
    description:
      "India's southernmost tip, where three seas meet — usually combined with Rameshwaram and Madurai on a multi-day tour package.",
    keywords: ["bangalore to kanyakumari taxi", "kanyakumari to bangalore taxi"],
  },
  {
    slug: "munnar",
    name: "Munnar",
    region: "Kerala",
    image: "/images/destinations/munnar.png",
    approxDistanceKm: 470,
    idealTripType: "Round Trip / Tour Package",
    description:
      "Kerala's best-known hill station, wrapped in tea plantations and cool highland air — a popular multi-day round trip from Bangalore.",
    keywords: ["bangalore to munnar taxi", "munnar to bangalore taxi"],
  },
  {
    slug: "kerala-alleppey",
    name: "Kerala (Alleppey)",
    region: "Kerala",
    image: "/images/destinations/kerala-alleppey.png",
    approxDistanceKm: 700,
    idealTripType: "Tour Package",
    description:
      "God's Own Country's backwater heartland — houseboats and canals around Alleppey — best planned as a customised multi-day tour package.",
    keywords: ["bangalore to alappuzha taxi", "bangalore to kerala taxi", "kerala tour package from bangalore"],
  },
  {
    slug: "tirupati",
    name: "Tirupati Balaji",
    region: "Andhra Pradesh",
    image: "/images/destinations/tirupati.png",
    approxDistanceKm: 250,
    idealTripType: "One Way / Round Trip",
    description:
      "One of the most visited pilgrimage destinations in the country, home to the Tirumala Venkateswara Temple — a very frequently booked route from Bangalore.",
    keywords: ["bangalore to tirupati taxi", "tirupati to bangalore taxi"],
  },
  {
    slug: "mantralayam",
    name: "Mantralayam",
    region: "Andhra Pradesh",
    image: "/images/destinations/mantralayam.png",
    approxDistanceKm: 370,
    idealTripType: "Round Trip / Tour Package",
    description:
      "A significant pilgrimage town on the banks of the Tungabhadra, dedicated to Sri Raghavendra Swami — usually travelled as a round trip.",
    keywords: ["bangalore to mantralayam taxi", "mantralayam to bangalore taxi"],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    region: "Telangana",
    image: "/images/destinations/hyderabad.png",
    approxDistanceKm: 570,
    idealTripType: "One Way / Round Trip",
    description:
      "The City of Pearls, known for its history, food and IT corridor — booked both as a one-way drop and a round trip.",
    keywords: ["bangalore to hyderabad taxi", "hyderabad to bangalore taxi"],
  },
];

export const getDestinationBySlug = (slug) =>
  destinations.find((d) => d.slug === slug);
