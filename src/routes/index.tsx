import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Truck, Ruler } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Reviews } from "@/components/site/Reviews";
import { MapEmbed } from "@/components/site/MapEmbed";
import { business, categories, blogPosts, whatsappLink } from "@/lib/site";
import hero from "@/assets/hero-showroom.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaishnavi Marble | Marble, Granite & Tiles in Kestopur, Kolkata" },
      {
        name: "description",
        content:
          "Vaishnavi Marble showroom in Kestopur, Kolkata. Italian marble, granite, vitrified, bathroom and outdoor tiles. Rated 4.4 by 164 customers.",
      },
      { property: "og:title", content: "Vaishnavi Marble | Marble & Tiles in Kolkata" },
      {
        property: "og:description",
        content: "Visit our Kestopur showroom for marble, granite and designer tiles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Layout>
      <section className="relative">
        <img
          src={hero}
          alt="Vaishnavi Marble showroom with polished marble slabs on display"
          width={1600}
          height={1008}
          className="h-[54vw] max-h-[420px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center px-5 text-navy-foreground">
          <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">
            Marble, Granite &amp; <span className="text-primary">Designer Tiles</span>
          </h1>
          <p className="mt-2 max-w-md text-sm text-navy-foreground/85 sm:text-base">
            Kolkata's trusted showroom in Kestopur for premium natural stone and tiles.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              WhatsApp Enquiry
            </a>
            <Link
              to="/categories"
              className="rounded-md border border-navy-foreground/50 px-4 py-2.5 text-sm font-semibold"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { Icon: ShieldCheck, label: "Genuine Stone" },
            { Icon: Truck, label: "Kolkata Delivery" },
            { Icon: Ruler, label: "Free Site Guidance" },
          ].map(({ Icon, label }) => (
            <div key={label} className="rounded-xl bg-card p-4 shadow-sm">
              <Icon className="mx-auto text-primary" size={26} />
              <p className="mt-2 text-xs font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Shop By Category</h2>
          <Link to="/categories" className="flex items-center gap-1 text-sm text-primary">
            Show All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.name} to="/categories" className="group">
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                width={800}
                height={800}
                className="aspect-square w-full rounded-xl object-cover"
              />
              <p className="mt-2 text-center text-sm font-medium">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Latest From Our Blog</h2>
          <Link to="/blog" className="flex items-center gap-1 text-sm text-primary">
            All Articles <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          {blogPosts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="overflow-hidden rounded-xl bg-card shadow-sm"
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                width={1200}
                height={800}
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="p-4">
                <p className="text-xs font-semibold text-primary">{p.category}</p>
                <h3 className="mt-1 font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  {p.date} · {p.readTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <Reviews />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="mb-4 text-xl font-bold">Find Our Showroom</h2>
        <MapEmbed />
        <p className="mt-3 text-sm text-muted-foreground">{business.address}</p>
      </section>
    </Layout>
  );
}
