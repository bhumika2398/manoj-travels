import { articleSchema } from "@/lib/structured-data";

export function ArticleSchema(props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(props)) }}
    />
  );
}
