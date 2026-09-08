import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { categories, navGroups, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Shop Marble, Granite & Tiles | Vaishnavi Marble Kolkata" },
      {
        name: "description",
        content:
          "Browse every category at Vaishnavi Marble: Italian marble, granite, vitrified, wall, bathroom, kitchen, outdoor and parking tiles.",
      },
      { property: "og:title", content: "Shop Marble, Granite & Tiles | Vaishnavi Marble" },
      {
        property: "og:description",
        content: "Full range of marble, granite and designer tiles at our Kestopur showroom.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <Layout>
      <div className="bg-navy px-4 py-8 text-navy-foreground">
        <h1 className="mx-auto max-w-6xl text-2xl font-extrabold">
          Shop <span className="text-primary">All Products</span>
        </h1>
        <p className="mx-auto mt-2 max-w-6xl text-sm text-navy-foreground/75">
          Every range we stock in the Kestopur showroom.
        </p>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-lg font-bold">Popular Right Now</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((c) => (
            <div key={c.name}>
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                width={800}
                height={800}
                className="aspect-square w-full rounded-xl object-cover"
              />
              <p className="mt-2 text-center text-sm font-medium">{c.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="text-lg font-bold">All Categories</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {navGroups.map((g) => (
            <div key={g.label} className="rounded-xl bg-card p-5 shadow-sm">
              <h3 className="font-semibold text-primary">{g.label}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {g.items.map((i) => (
                  <li key={i} className="border-b border-border pb-2 last:border-0">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <a
          href={whatsappLink("Hi, please share rates and available designs.")}
          target="_blank"
          rel="noreferrer"
          className="mt-6 block rounded-md bg-primary py-3 text-center font-semibold text-primary-foreground"
        >
          Ask For Price On WhatsApp
        </a>
      </section>
    </Layout>
  );
}
