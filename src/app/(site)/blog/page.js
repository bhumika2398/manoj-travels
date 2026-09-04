import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Image } from "@/components/ui/Image";
import { blogPosts } from "@/data/blog";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Travel Guides",
  description: "Practical guides on booking one way, round trip, local and airport cabs with Manoj Tours and Travels.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <Section tone="paper" className="pt-36 md:pt-44">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Travel Guides", href: "/blog" }]} />
      <SectionHeading
        className="mt-6"
        eyebrow="Travel Guides"
        title="Practical guides for planning your trip"
        description="Straightforward guides on how our services and pricing work."
      />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
          >
            <div className="relative h-44">
              <Image
                src={post.image}
                alt=""
                wrapperClassName="h-44"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h2 className="font-display text-lg text-[var(--color-ink)]">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
