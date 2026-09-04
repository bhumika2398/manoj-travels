import { websiteSchema } from "@/lib/structured-data";

export function WebSiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
    />
  );
}
