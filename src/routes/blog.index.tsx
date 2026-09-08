import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { blogPosts } from "@/lib/site";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Tile & Marble Blog | Vaishnavi Marble Kolkata" },
      {
        name: "description",
        content:
          "Design ideas and buying guides for marble, granite and tiles from the Vaishnavi Marble team in Kolkata.",
      },
      { property: "og:title", content: "Tile & Marble Blog | Vaishnavi Marble" },
      {
        property: "og:description",
        content: "Design ideas and buying guides for marble, granite and tiles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All Blogs");
  const cats = ["All Blogs", ...new Set(blogPosts.map((p) => p.category))];

  const posts = blogPosts.filter(
    (p) =>
      (cat === "All Blogs" || p.category === cat) &&
      p.title.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex overflow-hidden rounded-lg border border-border bg-card">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Blog"
            aria-label="Search blog"
            className="w-full bg-transparent px-4 py-3 text-base outline-none"
          />
          <span className="flex w-14 items-center justify-center bg-primary text-primary-foreground">
            <Search size={20} />
          </span>
        </div>

        <h1 className="mt-8 text-2xl font-extrabold">Explore Categories</h1>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <h2 className="mt-8 text-xl font-bold">Latest Articles</h2>
        <div className="mt-4 space-y-6">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="block overflow-hidden rounded-xl bg-card shadow-sm"
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="aspect-[3/2] w-full object-cover"
                />
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-card px-3 py-1 text-xs font-medium">
                  <BookOpen size={14} className="text-primary" /> {p.readTime}
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-primary">{p.category}</p>
                <h3 className="mt-1 text-lg font-bold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">{p.date}</p>
              </div>
            </Link>
          ))}
          {posts.length === 0 && (
            <p className="py-10 text-center text-muted-foreground">No articles found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
