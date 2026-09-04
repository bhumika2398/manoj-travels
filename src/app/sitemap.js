import { siteConfig } from "@/config/site.config";
import { services } from "@/data/services";
import { destinations } from "@/data/destinations";
import { fleet } from "@/data/fleet";
import { blogPosts } from "@/data/blog";

export default function sitemap() {
  const url = (path) => `${siteConfig.url}${path}`;
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/fleet",
    "/destinations",
    "/gallery",
    "/faq",
    "/contact",
    "/blog",
  ].map((path) => ({
    url: url(path),
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: url(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const destinationRoutes = destinations.map((d) => ({
    url: url(`/destinations/${d.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const fleetRoutes = fleet.map((v) => ({
    url: url(`/fleet/${v.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...destinationRoutes,
    ...fleetRoutes,
    ...blogRoutes,
  ];
}
