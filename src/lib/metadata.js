import { defaultSeo } from "@/config/seo.config";
import { siteConfig } from "@/config/site.config";

/**
 * Build a Next.js Metadata object for a route.
 * @param {{title?: string, description?: string, path?: string, keywords?: string[], noIndex?: boolean}} opts
 */
export function buildMetadata({
  title,
  description = defaultSeo.description,
  path = "/",
  keywords,
  noIndex = false,
} = {}) {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const fullTitle = title ? `${title} | ${defaultSeo.titleTemplate.replace("%s | ", "")}` : defaultSeo.defaultTitle;

  return {
    title: title || defaultSeo.defaultTitle,
    description,
    keywords: keywords || defaultSeo.keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: defaultSeo.defaultTitle,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
