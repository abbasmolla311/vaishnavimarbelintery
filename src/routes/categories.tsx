import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { navGroups, products, whatsappLink } from "@/lib/site";

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
        <h2 className="text-lg font-bold">Our Products</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {products.map((p) => (
            <div key={p.name} className="overflow-hidden rounded-xl bg-card shadow-sm">
              <img
                src={p.image}
                alt={`${p.name} — ${p.size}`}
                loading="lazy"
                width={768}
                height={768}
                className="aspect-square w-full object-cover"
              />
              <div className="p-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{p.category}</p>
                <h3 className="mt-1 text-sm font-semibold leading-snug">{p.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">Size: {p.size}</p>
                <p className="mt-1 text-base font-bold text-primary">{p.price}</p>
                <Link
                  to="/order"
                  search={{ product: p.name }}
                  className="mt-3 block rounded-md bg-primary py-2 text-center text-sm font-semibold text-primary-foreground"
                >
                  Buy Now
                </Link>
              </div>
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
