// Default Tours & Packages shown on the public site until an admin adds or
// edits packages via /admin/tours — same "static default, Supabase override"
// pattern as src/data/pricing.js and business.config.js.
export const tourPackages = [
  {
    id: "bangalore-to-mysore-one-way",
    title: "Bangalore to Mysore One-Way Sightseeing",
    description: "A one-way sightseeing trip from Bangalore to Mysore at an affordable price.",
    price: 1500,
    priceUnit: "per head",
    image: null,
    active: true,
  },
];
