import { business } from "@/config/business.config";
import { siteConfig } from "@/config/site.config";

const url = (path = "") => `${siteConfig.url}${path}`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": url("/#business"),
    name: business.legalName,
    alternateName: business.tradeName,
    description: business.description,
    url: siteConfig.url,
    telephone: business.phone.primaryIntl,
    email: business.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.line1}, ${business.address.line2}, ${business.address.line3}`,
      addressLocality: business.address.city,
      postalCode: business.address.postalCode,
      addressRegion: business.address.state,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    areaServed: business.areaServed.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [],
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": url("/#organization"),
    name: business.legalName,
    alternateName: business.tradeName,
    url: siteConfig.url,
    logo: url("/icon"),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: business.phone.primaryIntl,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "kn", "hi"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": url("/#website"),
    url: siteConfig.url,
    name: business.legalName,
    publisher: { "@id": url("/#organization") },
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: url(item.href),
    })),
  };
}

export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: { "@id": url("/#business") },
    areaServed: business.areaServed.map((name) => ({ "@type": "Place", name })),
    description: service.summary,
    url: url(`/services/${service.slug}`),
  };
}

export function articleSchema({ title, description, image, slug, datePublished }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image ? url(image) : undefined,
    url: url(`/blog/${slug}`),
    datePublished,
    author: { "@type": "Organization", name: business.legalName },
    publisher: { "@id": url("/#organization") },
  };
}
