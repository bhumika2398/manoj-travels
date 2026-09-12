// "Services" is intentionally not a top-level nav item — the individual
// service types live under the Fleet mega-menu instead, since Fleet is the
// main booking flow (choose a service → choose a vehicle → book). The
// standalone /services page and its routes are untouched and still exist.
export const mainNav = [
  { label: "Home", href: "/" },
  {
    label: "Fleet",
    href: "/fleet",
    children: [
      {
        label: "One Way",
        href: "/fleet?service=one-way",
        description: "One-side outstation drop fare.",
      },
      {
        label: "Local Cabs",
        href: "/fleet?service=local",
        description: "Hourly packages for in-city travel.",
      },
      {
        label: "Outstation / Round Trip",
        href: "/fleet?service=round-trip",
        description: "Multi-day trips, billed per km.",
      },
      {
        label: "Airport Pick & Drop",
        href: "/fleet?service=airport",
        description: "Reliable transfers, any time of day.",
      },
    ],
  },
  { label: "Destinations", href: "/destinations" },
  { label: "Tours & Packages", href: "/tours-packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  explore: [
    { label: "Fleet", href: "/fleet" },
    { label: "Destinations", href: "/destinations" },
    { label: "Tours & Packages", href: "/tours-packages" },
    { label: "Gallery", href: "/gallery" },
    { label: "About Us", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ],
  services: [
    { label: "One Way Cabs", href: "/services/outstation-cabs" },
    { label: "Round Trip Cabs", href: "/services/round-trip-cabs" },
    { label: "Local Cabs", href: "/services/local-cabs" },
    { label: "Airport Transfer", href: "/services/airport-pickup-drop" },
  ],
};
