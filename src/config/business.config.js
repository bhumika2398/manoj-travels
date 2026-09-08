// Single source of truth for business identity & contact details.
// Update this file if any business detail changes — every component,
// schema and metadata block reads from here.

export const business = {
  legalName: "Manoj Tours and Travels",
  tradeName: "Manoj Taxi Service",
  fullName: "Manoj Tours and Travels (Manoj Taxi Service)",
  tagline: "Local • Outstation • Airport • Round Trips",
  description:
    "24x7 taxi and cab service in Bangalore offering one way cabs, round trip cabs, local cabs, airport pickup & drop, and tour packages across Karnataka and South India.",

  // Phone numbers. `active`/`activeDisplay`/`activeIntl` is whichever of the
  // two the admin has selected as the "Active Website Contact Number" — this
  // static default mirrors that default choice (Contact Number 1); the live,
  // admin-editable value comes from getBusinessInfo() (src/lib/siteContent.js).
  phone: {
    primary: "7899787478",
    primaryDisplay: "+91 78997 87478",
    primaryIntl: "+917899787478",
    secondary: "9110876296",
    secondaryDisplay: "+91 91108 76296",
    secondaryIntl: "+919110876296",
    active: "7899787478",
    activeDisplay: "+91 78997 87478",
    activeIntl: "+917899787478",
  },

  email: "manojtaxitravels@gmail.com",

  address: {
    line1: "No 34 Nesara Sandalwood",
    line2: "Uttari Village, Kaggalipura",
    line3: "Kanakapura Road",
    city: "Bangalore",
    postalCode: "560116",
    state: "Karnataka",
    country: "India",
    full: "No 34 Nesara Sandalwood, Uttari Village, Kaggalipura, Kanakapura Road, Bangalore - 560116, Karnataka, India",
  },

  geo: {
    // Approximate coordinates for Kaggalipura, Kanakapura Road, Bangalore
    latitude: 12.8225,
    longitude: 77.4855,
  },

  areaServed: ["Bangalore", "Karnataka", "South India"],

  availability: "24x7",
  availabilityLabel: "Available 24 × 7",

  whatsapp: {
    number: "917899787478",
    defaultMessage:
      "Hello Manoj Tours and Travels, I would like to enquire about a cab booking.",
  },
};

export const whatsappLink = (message = business.whatsapp.defaultMessage) =>
  `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const callLink = (number = business.phone.primary) => `tel:+91${number}`;

export const mapsLink =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(business.address.full);
