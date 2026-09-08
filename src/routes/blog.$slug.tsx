import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { SocialIcons } from "@/components/site/SocialIcons";
import { blogPosts, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found | Vaishnavi Marble" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Vaishnavi Marble` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-6">
        <Link to="/blog" className="flex items-center gap-1 text-sm text-primary">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        <p className="mt-5 text-xs font-semibold text-primary">{post.category}</p>
        <h1 className="mt-1 text-2xl font-extrabold leading-tight sm:text-3xl">{post.title}</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          {post.date} · {post.readTime}
        </p>
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          width={1200}
          height={800}
          className="mt-5 aspect-[3/2] w-full rounded-xl object-cover"
        />
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/90">
          {post.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-card p-5 shadow-sm">
          <h2 className="font-bold">Planning your project?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Send us your room size and we will suggest tiles that fit your budget.
          </p>
          <a
            href={whatsappLink(`Hi, I read your article "${post.title}" and want a suggestion.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 block rounded-md bg-primary py-3 text-center font-semibold text-primary-foreground"
          >
            WhatsApp Enquiry
          </a>
          <div className="mt-5">
            <SocialIcons variant="plain" />
          </div>
        </div>
      </article>
    </Layout>
  );
}
