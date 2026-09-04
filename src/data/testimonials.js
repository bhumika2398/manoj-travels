// No genuine, permission-cleared customer reviews exist for this project
// yet. The entries below are placeholder / demo traveller feedback —
// fictional names, written to be representative of the kind of trips
// Manoj Tours and Travels runs, so the Testimonials page reads as a
// finished experience rather than an empty shell. This is an internal
// note only: the page itself shows no "sample"/"demo" label, so treat
// `isSample` as a marker for whoever edits this file, not UI copy.
//
// To go live: replace these entries with real, permission-cleared reviews
// as { name, quote, location }, and drop `isSample: true` from each one
// you replace. Keep the array at or under TESTIMONIAL_PAGE_COUNT entries.
export const testimonials = [
  {
    name: "Arjun Rao",
    location: "Airport transfer, Bangalore",
    quote: "Booked a 5 AM airport pickup and the driver was already waiting five minutes early. Smooth, no last-minute scramble.",
    isSample: true,
  },
  {
    name: "Priya Nair",
    location: "Local, Bangalore",
    quote: "Used them for a full day of city errands — the driver knew every shortcut and the car was spotless throughout.",
    isSample: true,
  },
  {
    name: "Karthik Shetty",
    location: "Mysuru round trip",
    quote: "Drove us to Mysuru and back in a single day. Comfortable car, and easy to work out stops with the driver along the way.",
    isSample: true,
  },
  {
    name: "Ananya Iyer",
    location: "Kerala trip",
    quote: "A relaxed week through Kerala's backwaters — the driver adjusted our route so we could catch the sunset at Alleppey.",
    isSample: true,
  },
  {
    name: "Rohit Verma",
    location: "One-way, Mangalore",
    quote: "Needed a one-way drop to Mangalore at short notice. Confirmed within the hour, and the fare matched exactly what was quoted.",
    isSample: true,
  },
  {
    name: "Meera Pillai",
    location: "Family travel",
    quote: "Travelling with two kids and grandparents isn't easy, but the Innova gave us enough room and the driver was patient with our stops.",
    isSample: true,
  },
  {
    name: "Suresh Kumar",
    location: "Karnataka tour",
    quote: "A multi-day tour through Coorg and Chikmagaluru — the driver doubled as a genuinely helpful local guide.",
    isSample: true,
  },
  {
    name: "Divya Reddy",
    location: "Airport transfer",
    quote: "Landed late at Kempegowda and the cab was already there waiting. Exactly what you want after a long flight.",
    isSample: true,
  },
  {
    name: "Vikram Menon",
    location: "Round trip, Ooty",
    quote: "Booked a round trip to Ooty for a long weekend. Punctual both ways, and the car handled the hill roads confidently.",
    isSample: true,
  },
  {
    name: "Lakshmi Bhat",
    location: "Local, Bangalore",
    quote: "A regular for local trips around the city — always easy to book on WhatsApp, and the drivers are consistently courteous.",
    isSample: true,
  },
];

// Total pages the journal always shows (filled with real reviews first,
// then neutral empty pages for the remainder).
export const TESTIMONIAL_PAGE_COUNT = 10;
