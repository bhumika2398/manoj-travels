"use client";

import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminCard } from "@/components/admin/AdminCard";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { blogPosts } from "@/data/blog";

const FIELDS = [
  { name: "title", label: "Title", placeholder: "Article title" },
  { name: "excerpt", label: "Excerpt", as: "textarea" },
  { name: "image", label: "Image Path", placeholder: "/images/destinations/your-file.jpg" },
];

const COLUMNS = [
  { key: "title", label: "Title" },
  { key: "excerpt", label: "Excerpt", render: (p) => <span className="line-clamp-1">{p.excerpt}</span> },
];

export default function AdminBlogPage() {
  return (
    <>
      <AdminTopbar title="Blog" />
      <div className="p-4 md:p-8">
        <AdminCard>
          <p className="mb-5 text-sm text-gray-500">
            Source of truth for the public site is{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 text-[13px]">src/data/blog.js</code>. Keep articles
            factual — no fabricated statistics or claims.
          </p>
          <ResourceManager title="Article" fields={FIELDS} initialItems={blogPosts} columns={COLUMNS} />
        </AdminCard>
      </div>
    </>
  );
}
