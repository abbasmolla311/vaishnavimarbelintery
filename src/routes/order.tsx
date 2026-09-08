import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { OrderForm } from "@/components/site/OrderForm";
import { business } from "@/lib/site";

type OrderSearch = { product?: string };

export const Route = createFileRoute("/order")({
  validateSearch: (search: Record<string, unknown>): OrderSearch => ({
    product: typeof search['product'] === "string" ? search['product'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Place An Order | Vaishnavi Marble Kolkata" },
      {
        name: "description",
        content:
          "Send your marble, granite or tile order request to Vaishnavi Marble, Kestopur Kolkata. Share product, size and quantity and we call you back with rates.",
      },
      { property: "og:title", content: "Place An Order | Vaishnavi Marble" },
      {
        property: "og:description",
        content: "Order marble, granite and designer tiles from our Kestopur showroom.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { product } = Route.useSearch();

  return (
    <Layout>
      <div className="bg-navy px-4 py-8 text-navy-foreground">
        <h1 className="mx-auto max-w-6xl text-2xl font-extrabold">
          Place An <span className="text-primary">Order</span>
        </h1>
        <p className="mx-auto mt-2 max-w-6xl text-sm text-navy-foreground/75">
          Tell us the product and quantity. We confirm rates and delivery on a call.
        </p>
      </div>

      <section className="mx-auto max-w-3xl px-4 py-8">
        <OrderForm defaultProduct={product ?? ""} />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Prefer to talk? Call{" "}
          <a href={`tel:${business.phone}`} className="font-semibold text-primary">
            {business.phoneDisplay}
          </a>
        </p>
      </section>
    </Layout>
  );
}
