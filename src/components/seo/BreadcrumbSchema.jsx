import { breadcrumbSchema } from "@/lib/structured-data";

export function BreadcrumbSchema({ items }) {
  if (!items?.length) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(items)) }}
    />
  );
}
