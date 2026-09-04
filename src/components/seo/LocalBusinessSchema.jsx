import { localBusinessSchema } from "@/lib/structured-data";

export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
    />
  );
}
