import { business } from "./business.config";
import { siteConfig } from "./site.config";

export const defaultSeo = {
  titleTemplate: `%s | ${business.legalName}`,
  defaultTitle: `${business.legalName} | ${business.tradeName} — Cab & Taxi Service in Bangalore`,
  description: `${business.legalName}, also known as ${business.tradeName}, offers 24x7 one way cabs, round trip cabs, local cabs and airport pickup & drop across Bangalore, Karnataka. Call ${business.phone.primaryDisplay} to book.`,
  keywords: [
    "Manoj Tours and Travels",
    "Manoj Taxi Service",
    "taxi service in Bangalore",
    "cab service in Bangalore",
    "airport taxi Bangalore",
    "Bangalore airport pickup and drop",
    "one way cab Bangalore",
    "outstation cab Bangalore",
    "round trip taxi Bangalore",
    "local cab Bangalore",
  ],
  siteUrl: siteConfig.url,
};
