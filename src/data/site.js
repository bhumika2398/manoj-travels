// Convenience re-export so components can pull identity + site settings
// from a single `@/data/site` import. The actual values live in
// src/config/business.config.js and src/config/site.config.js — edit there.
export { business, whatsappLink, callLink, mapsLink } from "@/config/business.config";
export { siteConfig } from "@/config/site.config";
